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
import awsConfig from './aws-exports';

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// ✅ Debugging: Log environment variables
console.log("Amplify Config - User Pool ID:", process.env.REACT_APP_AWS_COGNITO_USER_POOLS_ID);
console.log("Amplify Config - Client ID:", process.env.REACT_APP_CLIENT_ID);
console.log("Amplify Config - OAuth Domain:", process.env.REACT_APP_OAUTH_DOMAIN);

// ✅ Configure Amplify
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
                  <h1>Welcome, {user?.signInDetails?.loginId || user?.username || 'User'}</h1>
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
