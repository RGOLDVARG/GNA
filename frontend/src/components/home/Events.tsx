'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, MapPin, Video } from 'lucide-react';
import { fetchEvents, EventItem } from '@/api/content';

export default function Events() {
  const [items, setItems] = useState<EventItem[]>([]);

  useEffect(() => {
    fetchEvents()
      .then(data => {
        setItems(data.slice(0, 3));
      })
      .catch(err => console.error('Failed to fetch events', err));
  }, []);

  const displayEvents = items.length > 0 ? items : [
    {
      id: 1,
      title: 'GNA Global Neurodiversity Summit 2026',
      event_type: 'CONFERENCE',
      start_date: '2026-05-15T09:00:00Z',
      location: 'London, UK / Online'
    },
    {
      id: 2,
      title: 'ADHD-Informed Coaching in Corporate Environments',
      event_type: 'WEBINAR',
      start_date: '2026-05-22T15:00:00Z',
      location: 'Online Only'
    },
    {
      id: 3,
      title: 'Executive Function Support Strategies',
      event_type: 'WORKSHOP',
      start_date: '2026-06-04T10:00:00Z',
      location: 'Berlin, Germany'
    }
  ];

  return (
    <section className="events-section">
      <div className="container">
        
        <div className="events-header">
          <div>
            <h2 className="events-title">Events & Highlights</h2>
            <p className="events-subtext">Connect with professionals and advance your knowledge at our global gatherings.</p>
          </div>
          <Link href="/events" className="header-btn-link">
            <button className="btn-pill btn-outline header-btn">View All Events →</button>
          </Link>
        </div>

        <div className="events-grid">
          {displayEvents.map((event) => {
            const date = new Date(event.start_date);
            const isPast = date < new Date();
            const day = date.getDate().toString().padStart(2, '0');
            const month = date.toLocaleString('default', { month: 'short' }).toUpperCase();

            return (
              <div key={event.id} className="event-card">
                {/* Date Box */}
                <div className="date-box" style={{ opacity: isPast ? 0.7 : 1 }}>
                  <span className="date-day">{day}</span>
                  <span className="date-month">{month}</span>
                </div>

                {/* Event Info */}
                <div className="event-info">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                     <span style={{ fontSize: '11px', fontWeight: 800, color: isPast ? '#64748B' : '#3A0F7E', background: isPast ? '#F1F5F9' : '#F0EAFF', padding: '2px 8px', borderRadius: '4px' }}>
                       {isPast ? 'PAST EVENT' : 'UPCOMING'}
                     </span>
                  </div>
                  <h3 className="event-card-title">{event.title}</h3>
                  <div className="event-details">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {event.event_type === 'WEBINAR' ? <Video size={16} /> : <MapPin size={16} />}
                      {event.event_type}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Calendar size={16} />
                      {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} GMT
                    </div>
                  </div>
                  <button className="register-btn" style={{ color: isPast ? '#64748B' : '#3A0F7E' }}>
                    {isPast ? 'View Recording →' : 'Register for Event →'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .events-section {
          background: #FAF8F5;
          padding: 80px 0;
        }
        .events-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 60px;
        }
        .events-title {
          font-size: 48px;
          font-weight: 800;
          color: #1E1139;
          margin-bottom: 16px;
        }
        .events-subtext {
          font-size: 18px;
          color: #64748B;
        }
        .header-btn-link {
          text-decoration: none;
        }
        .events-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 24px;
        }
        .event-card {
          background: #FFFFFF;
          padding: 32px;
          border-radius: 24px;
          display: flex;
          gap: 24px;
          border: 1px solid #E2E8F0;
          transition: transform 0.3s ease;
        }
        .event-card:hover {
          transform: translateY(-4px);
        }
        .date-box {
          flex: 0 0 80px;
          height: 80px;
          background: #F0EAFF;
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #3A0F7E;
        }
        .date-day {
          font-size: 28px;
          font-weight: 800;
        }
        .date-month {
          font-size: 12px;
          font-weight: 700;
        }
        .event-info {
          flex: 1;
        }
        .event-card-title {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 16px;
          color: #1E1139;
          line-height: 1.4;
        }
        .event-details {
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 14px;
          color: #64748B;
        }
        .register-btn {
          margin-top: 24px;
          background: none;
          border: none;
          font-weight: 700;
          font-size: 14px;
          padding: 0;
          cursor: pointer;
        }

        @media (max-width: 768px) {
          .events-section {
            padding: 60px 0;
          }
          .events-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 24px;
            margin-bottom: 40px;
          }
          .events-title {
            font-size: 32px;
          }
          .header-btn-link {
            width: 100%;
          }
          .header-btn {
            width: 100%;
            justify-content: center;
          }
          .events-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .event-card {
            padding: 24px 20px;
            gap: 16px;
            border-radius: 20px;
          }
          .date-box {
            flex: 0 0 64px;
            height: 64px;
            border-radius: 12px;
          }
          .date-day {
            font-size: 24px;
          }
          .date-month {
            font-size: 11px;
          }
          .event-card-title {
            font-size: 18px;
            margin-bottom: 12px;
          }
          .event-details {
            font-size: 13px;
          }
        }
      `}</style>
    </section>
  );
}
