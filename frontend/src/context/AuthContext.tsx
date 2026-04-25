'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  tier: string;
  profession: string;
  country: string;
  city: string;
  gna_id: string;
  avatar: string | null;
  certification_status: string;
  verified_since: string | null;
  date_joined: string;
  bio?: string;
  education?: string;
  experience?: string;
  licenses?: string;
  publications?: string;
  languages?: string;
  expertise?: string;
  linkedin_url?: string;
  website_url?: string;
  is_staff: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (access: string, refresh: string) => void;
  logout: () => void;
  fetchProfile: () => void;
  authenticatedFetch: (url: string, options?: RequestInit) => Promise<Response>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: () => {},
  logout: () => {},
  fetchProfile: () => {},
  authenticatedFetch: async () => new Response(),
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

  const refreshToken = async () => {
    const refresh = localStorage.getItem('refresh_token');
    if (!refresh) return null;

    try {
      const res = await fetch(`${API_URL}/api/token/refresh/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh })
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('access_token', data.access);
        return data.access;
      }
    } catch (err) {
      console.error('Failed to refresh token', err);
    }
    
    logout();
    return null;
  };

  const authenticatedFetch = async (url: string, options: RequestInit = {}) => {
    let token = localStorage.getItem('access_token');
    
    const headers = {
      ...options.headers,
      'Authorization': `Bearer ${token}`
    };

    let res = await fetch(url, { ...options, headers });

    if (res.status === 401) {
      const newToken = await refreshToken();
      if (newToken) {
        const retryHeaders = {
          ...options.headers,
          'Authorization': `Bearer ${newToken}`
        };
        res = await fetch(url, { ...options, headers: retryHeaders });
      }
    }
    return res;
  };

  const fetchProfile = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await authenticatedFetch(`${API_URL}/api/profile/`);
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error('Error fetching profile', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const login = (access: string, refresh: string) => {
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
    fetchProfile();
    router.push('/dashboard');
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, fetchProfile, authenticatedFetch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
