'use client';
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Calendar, MapPin, Video, ArrowRight, Newspaper, Bell } from 'lucide-react';
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

interface EventItem {
  id: number;
  title: string;
  description: string;
  event_type: string;
  start_date: string;
  location: string;
  image: string | null;
}

export default function NewsAndEventsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [newsRes, eventsRes] = await Promise.all([
          fetch(`${API_URL}/api/content/public/news/`),
          fetch(`${API_URL}/api/content/public/events/`)
        ]);
        
        const newsData = await newsRes.json();
        const eventsData = await eventsRes.json();
        
        setNews(Array.isArray(newsData) ? newsData : (newsData.results || []));
        setEvents(Array.isArray(eventsData) ? eventsData : (eventsData.results || []));
      } catch (err) {
        console.error('Failed to fetch content', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <main style={{ backgroundColor: '#FDFCFB', minHeight: '100vh' }}>
      <Navbar />

      {/* Hero Section */}
      <section className="news-hero">
        <div className="container" style={{ textAlign: 'center' }}>
           <div className="tag-style">ASSOCIATION NEWS & GLOBAL EVENTS</div>
           <h1 className="h1-style">Institutional <br/> <span style={{ color: '#C5A059' }}>Insights</span> & Progress</h1>
           <p className="subtext-style">Stay updated with the latest research, advocacy efforts, and global gatherings of the GNA community.</p>
        </div>
      </section>

      <div className="container content-section">
         <div className="main-grid">
            
            {/* News Feed */}
            <div className="news-feed">
               <div className="section-header">
                  <Newspaper size={32} color="#3A0F7E" />
                  <h2>Latest Insights</h2>
               </div>

               {news.length === 0 && !loading && <div className="empty-state">No articles published yet.</div>}

               <div className="articles-grid">
                  {news.map(item => (
                    <div key={item.id} className="news-article">
                       {(item.image_url || item.image) && <img src={item.image_url || item.image || ''} alt={item.title} className="article-image" />}
                       <div className="article-content">
                          <div className="article-meta">
                             {item.category} • {new Date(item.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                          </div>
                          <h3 className="article-title">{item.title}</h3>
                          <p className="article-excerpt">{item.content.substring(0, 200)}...</p>
                          <Link href={`/news/${item.id}`} className="read-more-btn">
                             Read Full Article <ArrowRight size={18} />
                          </Link>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            {/* Events Sidebar */}
            <aside className="sidebar">
               <div className="sidebar-sticky">
                  <div className="section-header">
                     <Calendar size={32} color="#3A0F7E" />
                     <h2>Calendar</h2>
                  </div>

                  <div className="events-list">
                     {events.map(ev => {
                        const date = new Date(ev.start_date);
                        return (
                          <div key={ev.id} className="event-card">
                             <div className="event-date">
                                <div className="date-day">{date.getDate()}</div>
                                <div className="date-month">{date.toLocaleString('default', { month: 'short' }).toUpperCase()}</div>
                             </div>
                             <div style={{ flex: 1 }}>
                                <h4 className="event-title">{ev.title}</h4>
                                <div className="event-meta">
                                   {ev.event_type === 'WEBINAR' ? <Video size={14} /> : <MapPin size={14} />} {ev.location}
                                </div>
                             </div>
                          </div>
                        );
                     })}
                  </div>

                  {/* Newsletter Signup */}
                  <div className="newsletter-box">
                     <Bell size={40} color="#C5A059" style={{ marginBottom: '24px' }} />
                     <h3>GNA Weekly Digest</h3>
                     <p>Receive the latest research and regulatory updates directly to your inbox.</p>
                     <input type="email" placeholder="Professional Email" className="news-input" />
                     <button className="news-btn">Subscribe</button>
                  </div>
               </div>
            </aside>

         </div>
      </div>

      <Footer />

      <style jsx>{`
        .news-hero {
          background: #120A2B;
          padding: 140px 0;
          position: relative;
          overflow: hidden;
        }
        .tag-style {
          font-size: 12px;
          font-weight: 900;
          color: #C5A059;
          letter-spacing: 0.3em;
          margin-bottom: 32px;
        }
        .h1-style {
          font-size: 4.5rem;
          font-weight: 900;
          color: white;
          line-height: 1.1;
          letter-spacing: -0.03em;
          margin-bottom: 32px;
        }
        .subtext-style {
          font-size: 1.4rem;
          color: rgba(255,255,255,0.6);
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.6;
        }
        .content-section {
          padding: 100px 0;
        }
        .main-grid {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 80px;
        }
        .section-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 48px;
        }
        .section-header h2 {
          font-size: 32px;
          font-weight: 900;
          color: #120A2B;
          margin: 0;
        }
        .empty-state {
          padding: 60px;
          text-align: center;
          background: white;
          border-radius: 32px;
          border: 1px solid #E2E8F0;
          color: #64748B;
        }
        .articles-grid {
          display: grid;
          gap: 48px;
        }
        .news-article {
          background: white;
          border-radius: 40px;
          overflow: hidden;
          border: 1px solid #E2E8F0;
          box-shadow: 0 10px 40px rgba(0,0,0,0.02);
        }
        .article-image {
          width: 100%;
          height: 400px;
          object-fit: cover;
        }
        .article-content {
          padding: 40px;
        }
        .article-meta {
          display: flex;
          gap: 20px;
          margin-bottom: 20px;
          font-size: 12px;
          font-weight: 900;
          color: #C5A059;
          text-transform: uppercase;
        }
        .article-title {
          font-size: 28px;
          font-weight: 900;
          color: #120A2B;
          margin-bottom: 20px;
          line-height: 1.2;
        }
        .article-excerpt {
          font-size: 17px;
          color: #64748B;
          line-height: 1.8;
          margin-bottom: 32px;
        }
        .read-more-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          color: #3A0F7E;
          font-weight: 900;
          font-size: 16px;
          text-decoration: none;
        }
        .sidebar-sticky {
          position: sticky;
          top: 120px;
        }
        .events-list {
          display: grid;
          gap: 24px;
        }
        .event-card {
          background: white;
          padding: 24px;
          border-radius: 24px;
          border: 1px solid #E2E8F0;
          display: flex;
          gap: 20px;
          align-items: center;
        }
        .event-date {
          width: 60px;
          height: 60px;
          border-radius: 14px;
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #3A0F7E;
          flex-shrink: 0;
        }
        .date-day {
          font-size: 24px;
          font-weight: 900;
          line-height: 1;
        }
        .date-month {
          font-size: 10px;
          font-weight: 900;
        }
        .event-title {
          font-size: 16px;
          font-weight: 800;
          color: #120A2B;
          margin-bottom: 8px;
          line-height: 1.3;
        }
        .event-meta {
          font-size: 12px;
          color: #64748B;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .newsletter-box {
          margin-top: 60px;
          background: #1E1139;
          padding: 48px;
          border-radius: 40px;
          border: 1px solid rgba(197, 160, 89, 0.2);
          text-align: center;
        }
        .newsletter-box h3 {
          font-size: 20px;
          font-weight: 900;
          color: white;
          margin-bottom: 12px;
        }
        .newsletter-box p {
          font-size: 14px;
          color: rgba(255,255,255,0.6);
          margin-bottom: 24px;
        }
        .news-input {
          width: 100%;
          padding: 16px;
          border-radius: 12px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: white;
          margin-bottom: 16px;
          outline: none;
        }
        .news-btn {
          width: 100%;
          padding: 16px;
          border-radius: 12px;
          background: #C5A059;
          color: #120A2B;
          font-weight: 900;
          border: none;
          cursor: pointer;
        }

        @media (max-width: 991px) {
          .main-grid {
            grid-template-columns: 1fr;
            gap: 60px;
          }
          .sidebar-sticky {
            position: static;
          }
        }

        @media (max-width: 768px) {
          .news-hero {
            padding: 80px 0 60px;
          }
          .h1-style {
            font-size: 2.5rem;
          }
          .subtext-style {
            font-size: 1.1rem;
          }
          .content-section {
            padding: 60px 0;
          }
          .section-header h2 {
            font-size: 28px;
          }
          .article-image {
            height: 240px;
          }
          .article-content {
            padding: 24px;
          }
          .article-title {
            font-size: 22px;
          }
          .newsletter-box {
            padding: 32px 24px;
            border-radius: 24px;
          }
        }
      `}</style>
    </main>
  );
}
