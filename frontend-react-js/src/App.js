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
import '@aws-amplify/ui-react/dist/styles.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 🔹 Removed incorrect `createBrowserRouter`
Amplify.configure({
  Auth: {
    region: process.env.REACT_APP_AWS_PROJECT_REGION,  
    userPoolId: process.env.REACT_APP_AWS_COGNITO_USER_POOLS_ID, 
    userPoolWebClientId: process.env.REACT_APP_CLIENT_ID
  },
  oauth: {} // Ensure this remains empty unless using OAuth
});

function App() {
  return (
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
      </Routes>
    </Router>
  );
}

export default App;
