import { useParams, Link, Navigate } from 'react-router-dom';
import { CalendarDays, ArrowLeft } from 'lucide-react';
import PageTransition from '../components/PageTransition.jsx';
import { getBlogPostById, blogPosts } from '../data/blog.js';

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function BlogDetails() {
  const { id } = useParams();
  const post = getBlogPostById(id);
  if (!post) return <Navigate to="/404" replace />;

  const others = blogPosts.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <PageTransition>
      <section className="page-hero blog-hero">
        <div className="container">
          <Link to="/blog" className="back-link"><ArrowLeft size={16} /> Back to Articles</Link>
          <span className="pill-tag light">{post.category}</span>
          <h1>{post.title}</h1>
          <span className="blog-date"><CalendarDays size={14} /> {formatDate(post.date)}</span>
        </div>
      </section>

      <section className="section">
        <div className="container blog-body">
          {post.body.split('\n\n').map((para, i) => <p key={i}>{para}</p>)}
        </div>
      </section>

      {others.length > 0 && (
        <section className="section related-blog">
          <div className="container">
            <h2>More Articles</h2>
            <div className="grid-3">
              {others.map((o) => (
                <Link to={`/blog/${o.id}`} className="related-card card" key={o.id}>
                  <span className="pill-tag">{o.category}</span>
                  <h3>{o.title}</h3>
                  <p>{o.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <style>{`
        .blog-hero { background: var(--grad-hero); padding: 150px 0 60px; }
        .back-link { display: inline-flex; align-items: center; gap: 8px; color: rgba(255,255,255,0.75); font-size: 0.88rem; margin-bottom: 20px; }
        .back-link:hover { color: var(--white); }
        .pill-tag.light { background: rgba(255,255,255,0.12); color: var(--cyan); }
        .blog-hero h1 { color: var(--white); font-size: clamp(1.8rem, 3.6vw, 2.6rem); margin: 14px 0 12px; max-width: 760px; }
        .blog-hero .blog-date { display: flex; align-items: center; gap: 6px; color: rgba(255,255,255,0.6); font-size: 0.85rem; }
        .blog-body { max-width: 720px; }
        .blog-body p { color: var(--text-soft); line-height: 1.75; font-size: 1.02rem; margin-bottom: 20px; }
        .related-blog { background: var(--off-white); }
        .related-blog h2 { margin-bottom: 24px; }
        .related-card { display: block; padding: 24px; }
        .related-card .pill-tag { margin-bottom: 10px; }
        .related-card h3 { font-size: 1rem; margin-bottom: 8px; }
        .related-card p { color: var(--text-soft); font-size: 0.88rem; line-height: 1.5; }
      `}</style>
    </PageTransition>
  );
}
