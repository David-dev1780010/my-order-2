import React, { useState, useEffect } from 'react';
import Auth from './Auth';
import Profile from './Profile';
import { WebApp } from '@twa-dev/sdk';
import './App.css';

function App() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('mahaai_profile');
    if (saved) {
      setProfile(JSON.parse(saved));
    }
  }, []);

  const handleAuth = (profileData) => {
    setProfile(profileData);
  };

  const handleLogout = () => {
    localStorage.removeItem('mahaai_profile');
    setProfile(null);
  };

  return (
    <div className="App">
      {!profile ? (
        <Auth onAuth={handleAuth} />
      ) : (
        <Profile profile={profile} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App; 