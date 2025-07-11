import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [useCase, setUseCase] = useState('facebook');
  const [output, setOutput] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const handleGenerate = async () => {
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, useCase }),
    });
    const data = await res.json();
    setOutput(data.result);
  };

  return (
    <div className={darkMode ? 'dark bg-gray-900 text-white min-h-screen p-6' : 'bg-white text-black min-h-screen p-6'}>
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">HIH Content Creator</h1>
          <label className="flex items-center gap-2 cursor-pointer">
            <span>Dark</span>
            <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
          </label>
        </div>

        <div className="space-y-4">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt..."
            className="w-full p-2 border rounded"
          />
          <select value={useCase} onChange={(e) => setUseCase(e.target.value)} className="w-full p-2 border rounded">
            <option value="facebook">Facebook Post</option>
            <option value="email">Email</option>
            <option value="blog">Blog Intro</option>
          </select>
          <button onClick={handleGenerate} className="bg-blue-600 text-white px-4 py-2 rounded">Generate</button>
        </div>

        {output && (
          <div className="mt-6 p-4 border rounded bg-gray-100 whitespace-pre-wrap">{output}</div>
        )}
      </div>
    </div>
  );
}