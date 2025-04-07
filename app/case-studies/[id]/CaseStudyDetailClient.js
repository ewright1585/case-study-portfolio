// app/case-studies/[id]/CaseStudyDetailClient.js

'use client';  // Add this to mark this file as a client-side component

import { useState, useEffect } from 'react';

export default function CaseStudyDetailClient({ caseStudy }) {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    const storedPassword = caseStudy?.password; // Assuming password is stored in the case study document
    if (password === storedPassword) {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  if (!isAuthenticated) {
    return (
      <div>
        <h1>Enter Password</h1>
        <form onSubmit={handlePasswordSubmit}>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter password"
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h1>{caseStudy.title}</h1>
      <p>{caseStudy.description}</p>
      {/* Render additional case study content here */}
    </div>
  );
}
