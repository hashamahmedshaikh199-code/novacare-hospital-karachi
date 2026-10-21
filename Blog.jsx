import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CalendarDays } from 'lucide-react';
import PageTransition from '../components/PageTransition.jsx';
import { blogPosts } from '../data/blog.js';

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function Blog() {
  return (
    <PageTransition>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Health & Wellness</span>
          <h1>NovaCare Health Articles</h1>
          <p>Practical, easy-to-follow guidance from our fictional specialist team.</p>
        </div>
      </section>

      <section className="section">
        <div className="container grid-3">
          {blogPosts.map((post, i) => (
            <motion.div
              className="blog-card card"
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
            >
              <div className="blog-card-image" aria-hidden="true">{post.category[0]}</div>
              <div className="blog-card-body">
                <span className="pill-tag">{post.category}</span>
                <span className="blog-date"><CalendarDays size={13} /> {formatDate(post.date)}</span>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <Link to={`/blog/${post.id}`} className="blog-read-more">Read More <ArrowRight size={15} /></Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <style>{`
        .page-hero { background: var(--grad-hero); padding: 150px 0 70px; }
        .page-hero .eyebrow { color: var(--cyan); }
        .page-hero h1 { color: var(--white); font-size: clamp(2rem, 4vw, 2.9rem); margin: 12px 0 16px; }
        .page-hero p { color: rgba(255,255,255,0.78); max-width: 560px; font-size: 1.02rem; }

        .blog-card { overflow: hidden; display: flex; flex-direction: column; }
        .blog-card-image {
          height: 150px; background: var(--grad-hero); color: var(--cyan);
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-display); font-size: 2.4rem; font-weight: 600;
        }
        .blog-card-body { padding: 24px; display: flex; flex-direction: column; gap: 8px; }
        .blog-date { display: flex; align-items: center; gap: 6px; color: var(--text-faint); font-size: 0.8rem; margin-top: 2px; }
        .blog-card h3 { font-size: 1.05rem; margin: 4px 0 4px; }
        .blog-card p { color: var(--text-soft); font-size: 0.9rem; line-height: 1.55; flex-grow: 1; }
        .blog-read-more { display: flex; align-items: center; gap: 6px; color: var(--blue); font-weight: 600; font-size: 0.88rem; margin-top: 8px; }
      `}</style>
    </PageTransition>
  );
}
