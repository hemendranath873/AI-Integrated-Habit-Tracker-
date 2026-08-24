import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import { token, me, setAuthToken } from './api';

function App() {
  const [user, setUser] = useState(null);
  const [jwt, setJwt] = useState(localStorage.getItem('access') || '');

  useEffect(() => {
    if (jwt) {
      setAuthToken(jwt);
      me().then(res => setUser(res.data)).catch(()=> {
        setUser(null);
        setAuthToken(null);
      });
    }
  }, [jwt]);

  const onLogin = async (creds) => {
    const res = await token(creds);
    const access = res.data.access;
    localStorage.setItem('access', access);
    setJwt(access);
    setAuthToken(access);
    const userRes = await me();
    setUser(userRes.data);
  };

  const onLogout = () => {
    localStorage.removeItem('access');
    setJwt('');
    setAuthToken(null);
    setUser(null);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-semibold mb-4">AI-Integrated Habit Tracker</h2>
          <Login onLogin={onLogin}/>
          <hr className="my-4"/>
          <Register />
        </div>
      </div>
    );
  }

  return <Dashboard user={user} onLogout={onLogout} />;
}

export default App;