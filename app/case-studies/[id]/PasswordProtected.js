// app/case-studies/[id]/PasswordProtected.js
'use client'; // This ensures the file is treated as a client-side component

import { useState } from 'react';

export default function PasswordProtected({ onUnlock }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === "macandcheese123") { // Replace with your desired password or logic
      onUnlock();
    } else {
      setError(true);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          required
        />
        <button type="submit">Submit</button>
        {error && <p style={{ color: "red" }}>Incorrect password</p>}
      </form>
    </div>
  );
}
