import React, { useState } from 'react';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      await onLogin({ username, password });
    } catch (e) {
      setErr('Login failed');
    }
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      {err && <div className="text-red-600">{err}</div>}
      <input placeholder="Username" className="w-full border p-2 rounded" value={username} onChange={e=>setUsername(e.target.value)} />
      <input placeholder="Password" type="password" className="w-full border p-2 rounded" value={password} onChange={e=>setPassword(e.target.value)} />
      <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded">Login</button>
    </form>
  );
}