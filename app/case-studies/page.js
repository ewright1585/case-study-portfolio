// app/case-studies/page.js
"use client";
import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebaseConfig";
import styles from "@/styles/caseStudies.module.scss";
import Image from "next/image";

export default function CaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedIndustry, setSelectedIndustry] = useState("");

  const allTags = [...new Set(caseStudies.flatMap(cs => cs.tags || []))];
  const allIndustries = [...new Set(caseStudies.map(cs => cs.industry).filter(Boolean))];

  useEffect(() => {
    const fetchData = async () => {
      const ref = collection(db, "Case-Studies");
      const snapshot = await getDocs(ref);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCaseStudies(data);
      setFiltered(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    let result = caseStudies;

    if (searchTerm) {
      result = result.filter(cs =>
        cs.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedTags.length > 0) {
      result = result.filter(cs =>
        selectedTags.every(tag => cs.tags?.includes(tag))
      );
    }

    if (selectedIndustry) {
      result = result.filter(cs => cs.industry === selectedIndustry);
    }

    setFiltered(result);
  }, [searchTerm, selectedTags, selectedIndustry, caseStudies]);

  const toggleTag = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  return (
    <main className={styles.container}>
      <header>
        <h1>📁 Case Studies</h1>
        <p>Explore my work across industries and tools.</p>
      </header>

      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className={styles.tags}>
          {allTags.map(tag => (
            <button
              key={tag}
              className={selectedTags.includes(tag) ? styles.activeTag : ""}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        <select
          value={selectedIndustry}
          onChange={(e) => setSelectedIndustry(e.target.value)}
        >
          <option value="">All Industries</option>
          {allIndustries.map(ind => (
            <option key={ind} value={ind}>{ind}</option>
          ))}
        </select>
      </div>

      <div className={styles.grid}>
        {filtered.map(cs => (
          <div key={cs.id} className={styles.card}>
         <Image src={cs.image} alt="case study image" width={500} height={300 } />
         

            <div className={styles.body}>
            <h3>{cs.title}</h3>
            <p>{cs.description?.substring(0, 100)}...</p>
            <a href={`/case-studies/${cs.id}`}>Preview</a>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
