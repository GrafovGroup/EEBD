export function contentSecurityPolicy(mode='preview') {
  return `default-src 'self'; script-src 'self'${mode==='production'?' https://www.googletagmanager.com':''}; style-src 'self' 'unsafe-inline'; img-src 'self'; connect-src ${mode==='production'?'https://formspree.io https://www.google-analytics.com https://region1.google-analytics.com':"'none'"}; frame-src 'self'; frame-ancestors 'self'; form-action 'none'; base-uri 'self'; object-src 'none'`;
}
