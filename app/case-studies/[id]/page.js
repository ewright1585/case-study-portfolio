// app/case-studies/[id]/page.js
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebaseConfig'; // Adjust the import based on your project structure
import CaseStudyDetailClient from './CaseStudyDetailClient';

// Static params for generating static pages
export async function generateStaticParams() {
  const caseStudiesRef = collection(db, 'Case-Studies');
  const querySnapshot = await getDocs(caseStudiesRef);
  const caseStudyIds = querySnapshot.docs.map((doc) => doc.id); // Get all case study IDs

  return caseStudyIds.map((id) => ({
    id: id,
  }));
}

export default async function CaseStudyPage({ params }) {
  const { id } = params;

  // Fetch the case study data during SSR
  const caseStudyRef = doc(db, 'Case-Studies', id);
  const docSnap = await getDoc(caseStudyRef);

  if (!docSnap.exists()) {
    return <div>Case study not found</div>;
  }

  const caseStudyData = docSnap.data();

  return (
    <div>
      <CaseStudyDetailClient caseStudy={caseStudyData} />
    </div>
  );
}
