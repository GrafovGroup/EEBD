import os, json, hashlib, tarfile, shutil, datetime, sys
from indexnow import legacy_pages, notify
from pathlib import Path
base=Path('/home/nqgwub76'); private=base/'eebd-deployment-backups'; live=base/'eebd.ca'
assert len(sys.argv)==5,'Usage: activate.py COMMIT ARCHIVE_SHA256 PREVIOUS_COMMIT EXPECTED_FILES'
commit, expected, previous_commit, expected_files = sys.argv[1:]
assert len(commit)==40 and all(c in '0123456789abcdef' for c in commit)
short=commit[:7]
archive=private/('eebd-release-'+short+'.tar.gz')
assert hashlib.sha256(archive.read_bytes()).hexdigest()==expected,'Archive hash mismatch'
os.chmod(str(archive),0o600)
previous=json.loads((private/('release-'+previous_commit[:7]+'-manifest.json')).read_text())
assert previous['sourceCommit']==previous_commit
previous_pages=previous.get('indexNow',{}).get('pages') or legacy_pages(live)
oldfiles=[x for x in previous['files'] if x['path'].startswith('web-root/')]
for entry in oldfiles:
 p=live/entry['path'][len('web-root/'):]
 assert p.is_file() and hashlib.sha256(p.read_bytes()).hexdigest()==entry['sha256'],'Current site changed: '+entry['path']
known=set(x['path'][len('web-root/'):] for x in oldfiles)
for root,dirs,files in os.walk(str(live)):
 dirs[:]=[d for d in dirs if d not in ['.well-known','cgi-bin']]
 for f in files:
  rel=os.path.relpath(os.path.join(root,f),str(live)); assert rel in known,'Unknown live file: '+rel
stage=base/('eebd-release-'+short); backup=private/('full-before-'+short)
assert not stage.exists() and not backup.exists(),'Unique release paths already exist'
stage.mkdir(mode=0o700)
with tarfile.open(str(archive),'r:gz') as tar:
 for member in tar.getmembers():
  parts=Path(member.name).parts
  assert member.isfile() or member.isdir()
  assert not member.name.startswith('/') and '..' not in parts and not member.issym() and not member.islnk()
  assert parts[0] in ['web-root','manifest.json','deployment']
 tar.extractall(str(stage))
manifest=json.loads((stage/'manifest.json').read_text())
assert manifest['sourceCommit']==commit and manifest['sourceDirty'] is False
public=[x for x in manifest['files'] if x['path'].startswith('web-root/')]
assert len(public)==int(expected_files)
for entry in manifest['files']:
 if entry['path'].startswith('deployment/'):
  assert hashlib.sha256((stage/entry['path']).read_bytes()).hexdigest()==entry['sha256']
for entry in public:
 p=stage/entry['path']; assert hashlib.sha256(p.read_bytes()).hexdigest()==entry['sha256']; os.chmod(str(p),0o644)
for root,dirs,files in os.walk(str(stage/'web-root')):os.chmod(root,0o755)
for keep in ['.well-known','cgi-bin']:
 if (live/keep).exists():shutil.copytree(str(live/keep),str(stage/'web-root'/keep))
os.replace(str(live),str(backup))
try:os.replace(str(stage/'web-root'),str(live))
except BaseException:
 os.replace(str(backup),str(live));raise
record={'sourceCommit':commit,'deployedAt':datetime.datetime.utcnow().isoformat()+'Z','publicFiles':len(public),'archiveSha256':expected,'backup':str(backup)}
for name,value in [('release-'+short+'-manifest.json',manifest),('release-'+short+'-deployment.json',record)]:
 p=private/name;p.write_text(json.dumps(value,indent=2));os.chmod(str(p),0o600)
print('EEBD_RELEASE_ACTIVATED '+json.dumps(record))

try:
 receipt=notify(manifest,previous_pages,private/'indexnow-state.json')
 print('EEBD_INDEXNOW '+json.dumps(receipt))
except Exception as error:
 print('EEBD_INDEXNOW_PENDING '+str(error))
 retry={'pages':previous_pages,'error':str(error)}
 if not (private/'indexnow-state.json').exists():
  from indexnow import save
  save(private/'indexnow-state.json',retry)
