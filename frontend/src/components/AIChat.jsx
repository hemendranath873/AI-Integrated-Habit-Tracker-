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

  
}