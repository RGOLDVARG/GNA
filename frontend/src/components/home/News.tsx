'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { fetchNews, NewsItem } from '@/api/content';

export default function News() {
  const [articles, setArticles] = useState<NewsItem[]>([]);

  useEffect(() => {
    fetchNews()
      .then(data => {
        setArticles(data.slice(0, 3));
      })
      .catch(err => console.error('Failed to fetch news', err));
  }, []);

  // Fallback data if DB is empty
  const displayNews = articles.length > 0 ? articles : [
    {
      id: 1,
      category: 'Research',
      published_at: '2026-04-08T10:00:00Z',
      title: 'New Study: The Impact of Neuro-Inclusive Workplace Policies',
      content: 'GNA-funded research project reveals a 40% increase in long-term retention for specialists in neuro-inclusive environments.',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80'
    },
    {
      id: 2,
      category: 'Advocacy',
      published_at: '2026-04-02T10:00:00Z',
      title: 'GNA Joins Global Neurodiversity Alliance',
      content: 'A landmark partnership aims to create universally recognized accreditation for ADHD practitioners and educators.',
      image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80'
    },
    {
      id: 3,
      category: 'Innovation',
      published_at: '2026-03-28T10:00:00Z',
      title: 'Introducing GNA-Pulse™: AI-Driven Career Mapping',
      content: 'The next generation of professional development is here, helping members identify skill gaps and certification pathways.',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80'
    }
  ];

  return (
    <section className="news-section">
      <div className="container">
        <div className="news-header">
          <div>
            <h2 className="news-title">Latest News</h2>
            <p className="news-subtext">Stay informed on the latest trends, research, and association updates.</p>
          </div>
          <Link href="/news" className="header-btn-link">
            <button className="btn-pill btn-outline header-btn">Read All Stories →</button>
          </Link>
        </div>

        <div className="news-grid">
          {displayNews.map((item) => (
            <div key={item.id} className="news-card">
              <div className="news-image-container">
                 <img src={item.image_url || item.image || ''} alt={item.title} className="news-image" />
              </div>
              <div className="news-content">
                <div className="news-meta">
                   <span className="news-category">{item.category}</span>
                   <span className="news-date">{new Date(item.published_at).toLocaleDateString()}</span>
                </div>
                <h3 className="news-card-title">{item.title}</h3>
                <p className="news-desc">{item.content.substring(0, 150)}...</p>
                <Link href={`/news/${item.id}`} className="news-link">
                  Read Article <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .news-section {
          background: #FAF8F5;
          padding: 80px 0;
        }
        .news-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 60px;
        }
        .news-title {
          font-size: 48px;
          font-weight: 800;
          color: #1E1139;
          margin-bottom: 16px;
        }
        .news-subtext {
          font-size: 18px;
          color: #64748B;
        }
        .header-btn-link {
          text-decoration: none;
        }
        .news-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 32px;
        }
        .news-card {
          background: #FFFFFF;
          border-radius: 24px;
          overflow: hidden;
          border: 1px solid #E2E8F0;
          display: flex;
          flex-direction: column;
          transition: transform 0.3s ease;
        }
        .news-card:hover {
          transform: translateY(-4px);
        }
        .news-image-container {
          height: 240px;
          overflow: hidden;
        }
        .news-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .news-content {
          padding: 32px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .news-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        .news-category {
          font-size: 12px;
          font-weight: 800;
          color: #3A0F7E;
          text-transform: uppercase;
        }
        .news-date {
          font-size: 14px;
          color: #94A3B8;
        }
        .news-card-title {
          font-size: 22px;
          font-weight: 700;
          margin-bottom: 16px;
          color: #1E1139;
        }
        .news-desc {
          font-size: 15px;
          color: #64748B;
          line-height: 1.6;
          margin-bottom: 24px;
          flex: 1;
        }
        .news-link {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #3A0F7E;
          font-weight: 700;
          font-size: 15px;
          text-decoration: none;
        }

        @media (max-width: 768px) {
          .news-section {
            padding: 60px 0;
          }
          .news-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 24px;
            margin-bottom: 40px;
          }
          .news-title {
            font-size: 32px;
          }
          .header-btn-link {
            width: 100%;
          }
          .header-btn {
            width: 100%;
            justify-content: center;
          }
          .news-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .news-card {
            border-radius: 20px;
          }
          .news-content {
            padding: 24px;
          }
          .news-card-title {
            font-size: 20px;
          }
        }
      `}</style>
    </section>
  );
}
