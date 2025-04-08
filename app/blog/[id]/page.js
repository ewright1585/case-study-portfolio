// app/blog/[id]/page.js

import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebaseConfig";
import BlogDetailClient from "./BlogDetailClient";

// ✅ Pre-generates paths for static build
export async function generateStaticParams() {
  const snapshot = await getDocs(collection(db, "Blog"));
  return snapshot.docs.map(doc => ({ id: doc.id }));
}

// ✅ Forces static generation (important for export builds)
export const dynamic = "force-static";

export default async function BlogPostPage({ params }) {
  const { id } = params;

  const blogRef = doc(db, "Blog", id);
  const blogSnap = await getDoc(blogRef);

  if (!blogSnap.exists()) {
    return <div>Blog post not found.</div>;
  }

  const blogData = { id: blogSnap.id, ...blogSnap.data() };

  return (
    <main>
      <BlogDetailClient blog={blogData} />
    </main>
  );
}
