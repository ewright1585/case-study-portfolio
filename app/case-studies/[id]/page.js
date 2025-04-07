// app/case-studies/[id]/page.js

import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebaseConfig';
import CaseStudyDetailClient from './CaseStudyDetailClient';

export async function generateStaticParams() {
  const querySnapshot = await getDocs(collection(db, 'Case-Studies'));

  return querySnapshot.docs.map(doc => ({
    id: doc.id,
  }));
}

export default async function CaseStudyPage({ params }) {
  const id = params.id;

  const caseStudyRef = doc(db, 'Case-Studies', id);
  const caseStudySnap = await getDoc(caseStudyRef);

  let caseStudyData = null;
  if (caseStudySnap.exists()) {
    caseStudyData = { id: caseStudySnap.id, ...caseStudySnap.data() };
  }

  return (
    <div>
      <CaseStudyDetailClient caseStudy={caseStudyData} />
    </div>
  );
}
