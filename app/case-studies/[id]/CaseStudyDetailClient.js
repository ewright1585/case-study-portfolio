'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '/app/lib/firebaseConfig';
import styles from './style.module.scss';

export default function CaseStudyDetailClient() {
  const { id } = useParams();
  const [caseStudy, setCaseStudy] = useState(null);
  const [passwordInput, setPasswordInput] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [error, setError] = useState('');

  // Fetch shared access password from Firestore
  const getAccessPassword = async () => {
    const docRef = doc(db, 'AccessPasswords', 'current');
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data().password : null;
  };

  useEffect(() => {
    const fetchCaseStudy = async () => {
      if (!id) return;

      const docRef = doc(db, 'Case-Studies', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setCaseStudy(docSnap.data());
      }

      // Check session storage for access
      const granted = sessionStorage.getItem('caseStudyAccessGranted') === 'true';
      setIsAuthorized(granted);
    };

    fetchCaseStudy();
  }, [id]);

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    const storedPassword = await getAccessPassword();

    if (passwordInput === storedPassword) {
      sessionStorage.setItem('caseStudyAccessGranted', 'true');
      setIsAuthorized(true);
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  if (!caseStudy) return <p>Loading case study...</p>;

  return (
    <main className={styles.wrapper}>
      <header className={styles.header}>
        <h1>{caseStudy.title}</h1>
        <p>{caseStudy.description}</p>
      </header>

      {!isAuthorized ? (
        <section className={styles.preview}>
          <p><strong>Client:</strong> {caseStudy.client}</p>
          <p><strong>Industry:</strong> {caseStudy.industry}</p>
          <p><strong>Role:</strong> {caseStudy.role}</p>
          <img src={caseStudy.header_image} alt={caseStudy.title} className={styles.headerImage} />

          <form onSubmit={handlePasswordSubmit} className={styles.passwordForm}>
            <label htmlFor="password">Enter password to view full case study:</label>
            <input
              type="password"
              id="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              required
              placeholder="••••••••"
            />
            <button type="submit">Unlock</button>
            {error && <p className={styles.error}>{error}</p>}
          </form>
        </section>
      ) : (
        <section className={styles.fullContent}>
          <h2>Challenges</h2>
          <ul>
            {caseStudy.challenges?.map((item, idx) => <li key={idx}>{item}</li>)}
          </ul>

          <h2>Solutions</h2>
          <p>{caseStudy.solution}</p>

          <h2>Outcomes</h2>
          <ul>
            {caseStudy.outcomes?.map((item, idx) => <li key={idx}>{item}</li>)}
          </ul>

          <h2>Key Takeaways</h2>
          <p>{caseStudy.keyTakeaways}</p>

          {caseStudy.mockups?.map((url, idx) => (
            <img key={idx} src={url} alt={`Mockup ${idx + 1}`} className={styles.mockup} />
          ))}

          <h2>Timeline</h2>
          <ul>
            {caseStudy.timeline?.map((event, idx) => (
              <li key={idx}><strong>{event.date}</strong>: {event.event}</li>
            ))}
          </ul>

          <h2>Target Audience</h2>
          <p>Age: {caseStudy.target_audience?.age_range}</p>
          <p>Location: {caseStudy.target_audience?.location}</p>
          <p>Industry: {caseStudy.target_audience?.industry}</p>

          <h2>Features</h2>
          <ul>
            {caseStudy.features?.map((f, idx) => (
              <li key={idx}>{f.icon} {f.feature}</li>
            ))}
          </ul>

          <h2>Testimonials</h2>
          {caseStudy.testimonials?.map((t, idx) => (
            <div key={idx} className={styles.testimonial}>
              <img src={t.avatar} alt={t.name} />
              <p><strong>{t.name}</strong>, {t.role}</p>
              <blockquote>{t.testimonial}</blockquote>
            </div>
          ))}

          <h2>Videos</h2>
          {caseStudy.videos?.main_video && (
            <video src={caseStudy.videos.main_video} controls />
          )}
          {caseStudy.videos?.additional_videos?.map((vid, idx) => (
            <video key={idx} src={vid} controls />
          ))}
        </section>
      )}
    </main>
  );
}
