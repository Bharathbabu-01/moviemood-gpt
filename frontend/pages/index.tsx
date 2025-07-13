import { useState } from 'react';

export default function Home() {
  const [mood, setMood] = useState('happy');
  const [recs, setRecs] = useState<string[]>([]);

  async function fetchRecs() {
    const res = await fetch('http://localhost:5000/recommend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mood }),
    });
    const data = await res.json();
    setRecs(data.recommendations);
  }

  return (
    <main className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">MovieMood GPT</h1>
      <input className="border p-2 w-full" value={mood} onChange={e => setMood(e.target.value)} />
      <button className="bg-blue-600 text-white px-4 py-2 mt-2" onClick={fetchRecs}>Get Recommendations</button>
      <ul className="mt-4 list-disc pl-5">
        {recs.map(r => <li key={r}>{r}</li>)}
      </ul>
    </main>
  );
}
