import React, { useState, useEffect } from 'react';
import { listHabits, createHabit, deleteHabit, markHabit } from '../api';
import HabitForm from './HabitForm';
import AIChat from './AIChat';

function ColorDot({ color }) {
  const map = { indigo: 'bg-indigo-500', green: 'bg-green-500', pink: 'bg-pink-500', yellow: 'bg-yellow-400' };
  return <span className={`inline-block w-4 h-4 rounded-full ${map[color] || 'bg-indigo-500'}`}></span>;
}

export default function Dashboard({ user, onLogout }) {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await listHabits();
      setHabits(res.data);
    } catch (e) {
      setHabits([]);
    }
    setLoading(false);
  };
  useEffect(()=>{ load(); }, []);

  const onCreate = async (data) => {
    await createHabit(data);
    load();
  };

  const onDelete = async (id) => {
    await deleteHabit(id);
    load();
  };

  const onMark = async (id, payload) => {
    await markHabit(id, payload);
    load();
  };

  const total = habits.length;
  const completedToday = habits.filter(h => h.entries && h.entries.some(e => e.date === new Date().toISOString().slice(0,10) && e.status === 'done')).length;

  return (
    <div className="app-container">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">AI-Integrated Habit Tracker</h1>
        <div className="flex gap-3 items-center">
          <div className="text-sm text-gray-600">Hello, <strong>{user.username}</strong></div>
          <button onClick={onLogout} className="bg-gray-200 px-3 py-1 rounded">Logout</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="card mb-4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold">Your Habits</h2>
              <div className="text-sm text-gray-500">Total: {total} • Done today: {completedToday}</div>
            </div>
            <HabitForm onCreate={onCreate}/>
          </div>

          <div className="card">
            {loading ? <div>Loading...</div> :
              (habits.length === 0 ? <div>No habits. Create one.</div> :
              habits.map(h => (
                <div key={h.id} className="p-3 border-b flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-2">
                      <ColorDot color={h.color} />
                      <div className="font-medium">{h.title}</div>
                    </div>
                    <div className="text-sm text-gray-500">{h.description}</div>
                    <div className="text-xs text-gray-400">Frequency: {h.frequency} • Tags: {h.tags}</div>
                    <div className="text-xs text-gray-400 mt-1">Streak: --</div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={()=>onMark(h.id, {status:'done'})} className="bg-green-500 text-white px-3 py-1 rounded">Done</button>
                    <button onClick={()=>onMark(h.id, {status:'skipped'})} className="bg-yellow-400 px-3 py-1 rounded">Skip</button>
                    <button onClick={()=>onDelete(h.id)} className="bg-red-500 text-white px-3 py-1 rounded">Del</button>
                  </div>
                </div>
              )))
            }
          </div>
        </div>

        <div>
          <div className="card">
            <h3 className="font-semibold mb-2">AI Habit Coach</h3>
            <AIChat />
          </div>
          <div className="card mt-4">
            <h4 className="font-semibold">Quick Stats</h4>
            <div className="mt-2 text-sm text-gray-600">Use this panel to show weekly completion, streaks, etc.</div>
          </div>
        </div>
      </div>
    </div>
  );
}