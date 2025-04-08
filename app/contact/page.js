import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebaseConfig";
import styles from "@/styles/about.module.scss";

export const dynamic = "force-static"; // Forces static rendering

// ✅ Fetch about data at build time
export async function generateStaticParams() {
  const snapshot = await getDocs(collection(db, "About"));
  return snapshot.docs.map(doc => ({ id: doc.id }));
}

export default async function ContactPage() {
  // Fetch your about page data at build time (e.g., from Firestore)
  const snapshot = await getDocs(collection(db, "Contact"));
  const aboutData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  return (
    <main className={styles.container}>
      <h1>About Us</h1>
      <div>
        {aboutData.map((data) => (
          <div key={data.id}>
            <h2>{data.title}</h2>
            <p>{data.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
