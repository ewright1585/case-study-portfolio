// app/blog/page.js
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebaseConfig";
import Link from "next/link";
import styles from "@/styles/blogList.module.scss";

export const dynamic = "force-static"; // Forces static generation

export default async function BlogPage() {
  const snapshot = await getDocs(collection(db, "Blog"));
  const blogs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  return (
    <main className={styles.container}>
      <h1>📝 Blog</h1>
      <ul>
        {blogs.map(blog => (
          <li key={blog.id}>
            <Link href={`/blog/${blog.id}`}>
              <h2>{blog.title}</h2>
            </Link>
            <p>{blog.description?.slice(0, 100)}...</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
