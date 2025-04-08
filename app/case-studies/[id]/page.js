// app/case-studies/[id]/page.js

import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebaseConfig";
import CaseStudyDetailClient from "./CaseStudyDetailClient";

// Step 1: Pre-generate all paths for static export
export async function generateStaticParams() {
  const querySnapshot = await getDocs(collection(db, "Case-Studies"));
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
  }));
}

// Step 2: Fetch case study data at build time
export async function generateMetadata({ params }) {
  return {
    title: `Case Study - ${params.id}`,
  };
}

export default async function CaseStudyPage({ params }) {
  const { id } = params;

  // Static export + Firebase workaround
  let caseStudyData = null;

  try {
    const caseStudyRef = doc(db, "Case-Studies", id);
    const caseStudySnap = await getDoc(caseStudyRef);

    if (caseStudySnap.exists()) {
      caseStudyData = { id: caseStudySnap.id, ...caseStudySnap.data() };
    }
  } catch (error) {
    console.error("Error fetching case study:", error);
  }

  return (
    <div>
      <CaseStudyDetailClient caseStudy={caseStudyData} />
    </div>
  );
}
