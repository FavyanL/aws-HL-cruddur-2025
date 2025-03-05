const awsExports = {
    Auth: {
      region: process.env.REACT_APP_AWS_PROJECT_REGION,  
      userPoolId: process.env.REACT_APP_AWS_COGNITO_USER_POOLS_ID, 
      userPoolWebClientId: process.env.REACT_APP_CLIENT_ID,
      oauth: {
        domain: process.env.REACT_APP_AWS_COGNITO_DOMAIN,
        scope: ["email", "profile", "openid"],
        redirectSignIn: process.env.REACT_APP_REDIRECT_SIGN_IN,
        redirectSignOut: process.env.REACT_APP_REDIRECT_SIGN_OUT,
        responseType: "code",
      }
    }
  };
  
  export default awsExports;
  