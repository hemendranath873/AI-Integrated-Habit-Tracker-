import React, { useState } from 'react';
import { suggestHabits, summarizeProgress } from '../api';

export default function AIChat(){
  const [text, setText] = useState('');
  const [resp, setResp] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSuggest = async () => {
    setLoading(true);
    const r = await suggestHabits({ text });
    setResp(r.data.raw || r.data);
    setLoading(false);
  };

  const onSummarize = async () => {
    setLoading(true);
    const r = await summarizeProgress({ logs: text });
    setResp(r.data.summary || r.data);
    setLoading(false);
  };

  return (
    <div className="space-y-2">
      <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="Describe your goals or paste logs" className="w-full border p-2 rounded" rows="4"/>
      <div className="flex gap-2">
        <button onClick={onSuggest} className="bg-indigo-600 text-white px-3 py-1 rounded">{loading ? '...' : 'Suggest Habits'}</button>
        <button onClick={onSummarize} className="bg-gray-800 text-white px-3 py-1 rounded">Summarize Progress</button>
      </div>
      {resp && <pre className="bg-gray-100 p-2 rounded text-sm overflow-auto">{typeof resp === 'string' ? resp : JSON.stringify(resp, null, 2)}</pre>}
    </div>
  );
}
