import React, {useState} from 'react';
import { register } from '../api';

export default function Register() {
  const [form, setForm] = useState({ username:'', email:'', password:''});
  const [msg, setMsg] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await register(form);
      setMsg('Registered. Please login.');
    } catch (e) {
      setMsg('Registration failed');
    }
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      {msg && <div className="text-green-600">{msg}</div>}
      <input placeholder="Username" className="w-full border p-2 rounded" value={form.username} onChange={e=>setForm({...form, username:e.target.value})} />
      <input placeholder="Email" className="w-full border p-2 rounded" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
      <input placeholder="Password" type="password" className="w-full border p-2 rounded" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} />
      <button className="w-full bg-green-600 hover:bg-green-700 text-white p-2 rounded">Register</button>
    </form>
  );
}
