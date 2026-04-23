const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface NewsItem {
  id: number;
  title: string;
  slug: string;
  category: 'RESEARCH' | 'ADVOCACY' | 'INNOVATION' | 'ASSOCIATION';
  content: string;
  image: string | null;
  published_at: string;
  updated_at: string;
}

export interface EventItem {
  id: number;
  title: string;
  description: string;
  event_type: 'WEBINAR' | 'CONFERENCE' | 'WORKSHOP' | 'MEETING';
  start_date: string;
  end_date: string;
  location: string;
  image: string | null;
  is_active: boolean;
}

export const fetchNews = async (): Promise<NewsItem[]> => {
  const res = await fetch(`${API_URL}/api/content/public/news/`);
  if (!res.ok) throw new Error('Failed to fetch news');
  const data = await res.json();
  return Array.isArray(data) ? data : (data.results || []);
};

export const fetchEvents = async (): Promise<EventItem[]> => {
  const res = await fetch(`${API_URL}/api/content/public/events/`);
  if (!res.ok) throw new Error('Failed to fetch events');
  const data = await res.json();
  return Array.isArray(data) ? data : (data.results || []);
};
