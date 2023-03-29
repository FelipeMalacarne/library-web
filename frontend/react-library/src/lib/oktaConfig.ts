export const oktaConfig = {
  clientId: '0oa8wpmnspnATK0OG5d7',
  issuer: 'https://dev-59845298.okta.com/oauth2/default',
  redirectUri: 'http://localhost:3000/login/callback',
  scopes: ['openid', 'profile', 'email'],
  pkce: true,
  disableHttpsCheck: true
}