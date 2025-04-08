'use client';

import React from 'react';
import Image from 'next/image';
import styles from '@/styles/blogDetail.module.scss';

export default function BlogDetailClient({ blog }) {
  if (!blog) {
    return <p>Sorry, blog post not found.</p>;
  }

  return (
    <article className={styles.blogDetail}>
      {blog.image && (
        <div className={styles.imageWrapper}>
          <Image
            src={blog.image}
            alt={blog.title}
            width={800}
            height={400}
            className={styles.heroImage}
          />
        </div>
      )}

      <h1>{blog.title}</h1>

      {blog.publishedAt && (
        <p className={styles.date}>
          Published: {new Date(blog.publishedAt).toLocaleDateString()}
        </p>
      )}

      {blog.author && (
        <p className={styles.author}>By {blog.author}</p>
      )}

      <div className={styles.content}>
        {blog.content?.split('\n').map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    </article>
  );
}
