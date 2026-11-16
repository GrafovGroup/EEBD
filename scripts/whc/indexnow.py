"""Run after a verified WHC release. State and receipts stay outside the web root."""
import hashlib, json, re, time, urllib.request, urllib.error
from pathlib import Path
ENDPOINT = 'https://api.indexnow.org/indexnow'
ORIGIN = 'https://eebd.ca'

def content_hash(html):
    def part(pattern):
        found = re.search(pattern, html, re.S)
        return found.group(1) if found else ''
    title = part(r'<title>(.*?)</title>')
    description = part(r'<meta name="description" content="([^"]*)"')
    main = part(r'<main id="main">(.*?)</main>')
    text = re.sub(r'<script\b[^>]*>.*?</script>', '', main, flags=re.S)
    text = re.sub(r'\s+', ' ', re.sub(r'<[^>]*>', ' ', text)).strip()
    return hashlib.sha256(json.dumps({'title':title,'description':description,'text':text},ensure_ascii=False,separators=(',',':')).encode()).hexdigest()

def legacy_pages(web):
    sitemap = (web/'sitemap.xml').read_text()
    return {url:content_hash((web/url[len(ORIGIN):].lstrip('/')/'index.html').read_text()) for url in re.findall(r'<loc>(https://eebd\.ca/[^<]+)</loc>',sitemap)}

def changes(previous, current):
    for url, digest in list(previous.items())+list(current.items()):
        if not re.fullmatch(r'https://eebd\.ca/(en|fr)/(?:[a-z0-9-]+/)*',url):raise ValueError('Unexpected IndexNow URL')
        if not re.fullmatch(r'[a-f0-9]{64}',digest):raise ValueError('Invalid content digest')
    return sorted(url for url in set(previous)|set(current) if previous.get(url)!=current.get(url))

def request(url, data=None):
    req=urllib.request.Request(url,data=data,headers={'User-Agent':'EEBD-Release/1.0','Content-Type':'application/json; charset=utf-8'} if data else {'User-Agent':'EEBD-Release/1.0'})
    try:
        with urllib.request.urlopen(req,timeout=30) as response:return response.status,response.read().decode(),dict(response.headers)
    except urllib.error.HTTPError as error:return error.code,error.read().decode(),dict(error.headers)

def save(path, value):
    temp=path.with_suffix('.tmp');temp.write_text(json.dumps(value,indent=2));temp.chmod(0o600);temp.replace(path)

def notify(manifest, previous, state_path, transport=request):
    if manifest['mode']!='production-candidate' or manifest['sourceDirty']:raise ValueError('Only clean production releases can notify')
    current=manifest['indexNow']['pages']; key=manifest['indexNow']['key']
    if not re.fullmatch(r'[a-f0-9]{8,128}',key):raise ValueError('Invalid ownership key')
    state=json.loads(state_path.read_text()) if state_path.exists() else {'pages':previous}
    urls=changes(state['pages'],current)
    receipt={'sourceCommit':manifest['sourceCommit'],'at':int(time.time()),'urls':urls}
    if not urls:receipt['result']='unchanged';return receipt
    if state.get('retryAfter',0)>time.time():receipt['result']='deferred';return receipt
    status,body,_=transport(ORIGIN+'/'+key+'.txt')
    if status!=200 or body.strip()!=key:raise RuntimeError('Public IndexNow ownership file is not verified')
    # Make sure content is live before telling a search engine to fetch it.
    for url in urls:
        status,body,_=transport(url)
        if url in current:
            if status!=200 or content_hash(body)!=current[url]:raise RuntimeError('Live content not verified: '+url)
        elif status not in (404,410):raise RuntimeError('Removed URL still responds: '+url)
    payload=json.dumps({'host':'eebd.ca','key':key,'keyLocation':ORIGIN+'/'+key+'.txt','urlList':urls}).encode()
    status,_,headers=transport(ENDPOINT,payload)
    receipt.update({'httpStatus':status,'result':{200:'received',202:'key-validation-pending',429:'rate-limited'}.get(status,'failed')})
    next_state={'pages':current if status==200 else state['pages'],'lastReceipt':receipt}
    if status!=200:
        delay=headers.get('Retry-After','3600')
        next_state['retryAfter']=int(time.time())+max(60,int(delay) if delay.isdigit() else 3600)
    save(state_path,next_state)
    save(state_path.parent/('indexnow-'+manifest['sourceCommit'][:7]+'.json'),receipt)
    return receipt
