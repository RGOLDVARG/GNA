'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Calendar, Tag, ArrowLeft, Share2 } from 'lucide-react';
import Link from 'next/link';

interface NewsItem {
  id: number;
  title: string;
  category: string;
  content: string;
  image: string | null;
  image_url?: string | null;
  published_at: string;
}

export default function NewsDetailPage() {
  const { id } = useParams();
  const [article, setArticle] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setLoading(true);
    fetch(`/api/content/public/news/${id}/`)
      .then(res => {
        if (!res.ok) throw new Error('Article not found');
        return res.json();
      })
      .then(data => {
        setArticle(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Article fetch failed', err);
        setArticle(null);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading Article...</div>;
  if (!article) return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Article not found.</div>;

  return (
    <main style={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
      <Navbar />

      <article>
         {/* Article Header */}
         <div style={{ padding: '80px 0', borderBottom: '1px solid #F1F5F9' }}>
            <div className="container" style={{ maxWidth: '900px' }}>
               <Link href="/news" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#64748B', textDecoration: 'none', marginBottom: '40px', fontWeight: 700, fontSize: '14px' }}>
                  <ArrowLeft size={16} /> BACK TO INSIGHTS
               </Link>
               
               <div style={{ display: 'flex', gap: '20px', marginBottom: '24px', fontSize: '12px', fontWeight: 900, color: '#C5A059', textTransform: 'uppercase' }}>
                  <Tag size={14} /> {article.category}
               </div>

               <h1 style={{ fontSize: '64px', fontWeight: 900, color: '#120A2B', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '32px' }}>
                  {article.title}
               </h1>

               <div style={{ display: 'flex', alignItems: 'center', gap: '24px', color: '#64748B', fontSize: '15px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                     <Calendar size={18} /> {new Date(article.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                     <Share2 size={18} /> Share Insight
                  </div>
               </div>
            </div>
         </div>

         {/* Cover Image */}
         {(article.image_url || article.image) && (
           <div className="container" style={{ maxWidth: '1100px', margin: '-40px auto 80px auto' }}>
              <img src={article.image_url || article.image || ''} alt={article.title} style={{ width: '100%', height: '600px', objectFit: 'cover', borderRadius: '48px', boxShadow: '0 40px 80px rgba(0,0,0,0.1)' }} />
           </div>
         )}

         {/* Content */}
         <div className="container" style={{ maxWidth: '800px', paddingBottom: '160px' }}>
            <div style={{ fontSize: '20px', lineHeight: 1.9, color: '#1E1139', whiteSpace: 'pre-wrap' }}>
               {article.content}
            </div>
            
            <div style={{ marginTop: '100px', padding: '48px', background: '#F8FAFC', borderRadius: '32px', border: '1px solid #E2E8F0' }}>
               <h4 style={{ fontSize: '20px', fontWeight: 900, color: '#120A2B', marginBottom: '16px' }}>Regulatory Disclosure</h4>
               <p style={{ fontSize: '15px', color: '#64748B', lineHeight: 1.6 }}>
                  This publication is part of GNA's continuous effort to provide accredited specialists with the latest research and advocacy updates. 
                  Views expressed in research summaries are based on peer-reviewed findings and GNA institutional standards.
               </p>
            </div>
         </div>
      </article>

      <Footer />
    </main>
  );
}
