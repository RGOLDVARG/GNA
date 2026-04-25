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
          {articles.length === 0 ? (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px', color: '#64748B' }}>
              No news articles found in the database.
            </div>
          ) : articles.map((item) => (
            <div key={item.id} className="news-card">
              <div className="news-image-container">
                 <img src={(item as any).image_url || (item as any).image || ''} alt={item.title} className="news-image" />
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
