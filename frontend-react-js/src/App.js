import './App.css';
import HomeFeedPage from './pages/HomeFeedPage';
import NotificationsFeedPage from './pages/NotificationsFeedPage';
import UserFeedPage from './pages/UserFeedPage';
import SignupPage from './pages/SignupPage';
import SigninPage from './pages/SigninPage';
import RecoverPage from './pages/RecoverPage';
import MessageGroupsPage from './pages/MessageGroupsPage';
import MessageGroupPage from './pages/MessageGroupPage';
import ConfirmationPage from './pages/ConfirmationPage';

import React from 'react';
import { Amplify } from 'aws-amplify';
import { Auth } from '@aws-amplify';
import awsConfig from './aws-exports';

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Debugging: Log environment variables
console.log("Amplify Config - User Pool ID:", process.env.REACT_APP_AWS_COGNITO_USER_POOLS_ID);
console.log("Amplify Config - Client ID:", process.env.REACT_APP_CLIENT_ID);
console.log("Amplify Config - OAuth Domain:", process.env.REACT_APP_OAUTH_DOMAIN);

// Define Amplify configuration
const amplifyConfig = {
  Auth: {
    region: process.env.REACT_APP_AWS_COGNITO_REGION,
    userPoolId: process.env.REACT_APP_AWS_COGNITO_USER_POOLS_ID,
    userPoolWebClientId: process.env.REACT_APP_CLIENT_ID,
    mandatorySignIn: true,
    authenticationFlowType: 'USER_SRP_AUTH'
  }
};

// Only include OAuth if a domain is provided
if (process.env.REACT_APP_OAUTH_DOMAIN) {
  amplifyConfig.oauth = {
    domain: process.env.REACT_APP_OAUTH_DOMAIN,
    scope: ['email', 'openid', 'profile'],
    redirectSignIn: process.env.REACT_APP_REDIRECT_SIGN_IN,
    redirectSignOut: process.env.REACT_APP_REDIRECT_SIGN_OUT,
    responseType: 'code'
  };
}

// Configure Amplify
//Amplify.configure(amplifyConfig);
Amplify.configure(awsConfig);

function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <Router>
          <Routes>
            <Route path="/" element={<HomeFeedPage />} />
            <Route path="/notifications" element={<NotificationsFeedPage />} />
            <Route path="/@:handle" element={<UserFeedPage />} />
            <Route path="/messages" element={<MessageGroupsPage />} />
            <Route path="/messages/@:handle" element={<MessageGroupPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/signin" element={<SigninPage />} />
            <Route path="/confirm" element={<ConfirmationPage />} />
            <Route path="/forgot" element={<RecoverPage />} />
            <Route
              path="/profile"
              element={
                <div>
                  <h1>Welcome, {user?.username}</h1>
                  <button onClick={signOut}>Sign Out</button>
                </div>
              }
            />
          </Routes>
        </Router>
      )}
    </Authenticator>
  );
}

export default App;
