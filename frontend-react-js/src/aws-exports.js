const awsExports = {
  Auth: {
    region: process.env.REACT_APP_AWS_COGNITO_REGION,
    userPoolId: process.env.REACT_APP_AWS_COGNITO_USER_POOLS_ID,
    userPoolWebClientId: process.env.REACT_APP_CLIENT_ID,
    mandatorySignIn: true,
    authenticationFlowType: "USER_SRP_AUTH",
  },
};

export default awsExports;







