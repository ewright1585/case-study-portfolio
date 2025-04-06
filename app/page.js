// app/page.js
'use client';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '/app/lib/firebaseConfig.js';
import styles from '@/styles/home.module.scss';

export default function Home() {
  const [caseStudies, setCaseStudies] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const caseStudiesRef = collection(db, 'Case-Studies');
      const blogRef = collection(db, 'Blog');

      const caseStudiesSnap = await getDocs(query(caseStudiesRef, orderBy('date', 'desc'), limit(2)));
      const blogSnap = await getDocs(query(blogRef, orderBy('date', 'desc'), limit(3)));

      setCaseStudies(caseStudiesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setBlogPosts(blogSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchData();
  }, []);

  return (
    <main className={styles.home}>
      <header>
        <h1>👋 Hi, I'm a Front-End Developer</h1>
        <p>I create modern, responsive web apps with clean, accessible UI.</p>
      </header>

      <section className={styles.section}>
        <h2>📂 Latest Case Studies</h2>
        <div className={styles.grid}>
          {caseStudies.map(cs => (
            <div key={cs.id} className={styles.card} style={{"color": "#2a2a2a"}}>
              <img src={cs.image} style={{"width": "100%"}}/>
              <h3>{cs.title}</h3>
              <p>{cs.description?.substring(0, 100)}...</p>
              <a href={`/case-studies/${cs.id}`}>Read More</a>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.cta}>
        <h2>🚀 Available for Work</h2>
        <p>Looking for your next Front-End Engineer? Let’s chat.</p>
        <a className={styles.ctaButton} href="/contact">Contact Me</a>
      </section>

      <section className={styles.section}>
        <h2>📝 Latest Blog Posts</h2>
        <div className={styles.grid}>
          {blogPosts.map(post => (
            <div key={post.id} className={styles.card}>
              <h3>{post.title}</h3>
              <p>{post.content?.substring(0, 100)}...</p>
              <a href={`/blog/${post.id}`}>Read More</a>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
