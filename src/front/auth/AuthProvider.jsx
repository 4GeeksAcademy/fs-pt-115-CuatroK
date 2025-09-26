import { Auth0Provider } from "@auth0/auth0-react";

export const AuthProviderGoogle = ({ children }) => {
  return (
    <Auth0Provider
      domain="dev-tdd1v2rlnjeo3xo1.us.auth0.com"
      clientId="eQKomBWWaboFLdcnRiozmJj9Mru4fQaD"
      authorizationParams={{
        redirect_uri: window.location.origin,
        connection:
          'google-oauth2'
      }}
      cacheLocation="localstorage"
    >
      {children}
    </Auth0Provider>
  );
};


