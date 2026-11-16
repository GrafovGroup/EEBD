export function contentSecurityPolicy(mode='preview') {
  return `default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self'; connect-src ${mode==='production'?'https://formspree.io':"'none'"}; frame-src 'self'; frame-ancestors 'self'; form-action 'none'; base-uri 'self'; object-src 'none'`;
}
