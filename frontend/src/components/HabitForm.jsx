import React, {useState} from 'react';

export default function HabitForm({ onCreate }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState('daily');
  const [color, setColor] = useState('indigo');

  const submit = async (e) => {
    e.preventDefault();
    await onCreate({ title, description, frequency, color });
    setTitle(''); setDescription(''); setFrequency('daily'); setColor('indigo');
  };

  return (
    <form onSubmit={submit} className="space-y-2">
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Habit title" className="w-full border p-2 rounded" required/>
      <input value={description} onChange={e=>setDescription(e.target.value)} placeholder="Description (optional)" className="w-full border p-2 rounded"/>
      <div className="flex gap-2">
        <select value={frequency} onChange={e=>setFrequency(e.target.value)} className="border p-2 rounded">
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="custom">Custom</option>
        </select>
        <select value={color} onChange={e=>setColor(e.target.value)} className="border p-2 rounded">
          <option value="indigo">Indigo</option>
          <option value="green">Green</option>
          <option value="pink">Pink</option>
          <option value="yellow">Yellow</option>
        </select>
      </div>
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Add Habit</button>
    </form>
  );
}