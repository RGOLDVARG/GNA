'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Menu, X, Search, User as UserIcon, LogOut, ChevronRight, ShieldCheck } from 'lucide-react';
import InquiryModal from '@/components/modals/InquiryModal';

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/registry?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { label: 'Specialist Registry', href: '/registry' },
    { label: 'Accredited Partners', href: '/partners' },
    { label: 'Membership', href: '/membership' },
    { label: 'Ethics & Standards', href: '/ethics' },
    { label: 'News & Events', href: '/news' },
    { label: 'About GNA', href: '/about' },
  ];

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 1000, backgroundColor: 'white', borderBottom: isScrolled ? '1px solid #E5E5E5' : '1px solid transparent', transition: 'all 0.3s ease' }}>
      <div className="desktop-only-utility" style={{ borderBottom: '1px solid #F0F0F0', padding: '8px 0', backgroundColor: '#FAF8F5' }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '24px', fontSize: '11px', fontWeight: 800 }}>
            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                {user.is_staff && (
                  <Link href="/gna-management-gateway" style={{ color: '#D97706', fontWeight: 800, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <ShieldCheck size={14} /> Management
                  </Link>
                )}
                <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#3A0F7E', fontWeight: 800, textDecoration: 'none' }}>
                  Member Dashboard
                </Link>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <Link href="/login" style={{ color: '#120A2B', textDecoration: 'none' }}>Log in</Link>
                <button onClick={() => setIsModalOpen(true)} style={{ backgroundColor: '#120A2B', color: 'white', padding: '6px 16px', borderRadius: '4px', textTransform: 'uppercase', fontSize: '10px', fontWeight: 900, border: 'none', cursor: 'pointer' }}>Join Association</button>
              </div>
            )}
          </div>
      </div>

      <div className="container" style={{ display: 'flex', alignItems: 'center', height: '80px', padding: '0 20px' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', zIndex: 1100, textDecoration: 'none', marginRight: '60px' }}>
          <div style={{ height: '40px', flexShrink: 0 }}>
            <img src="/images/gna_logo_trimmed.svg" alt="GNA" style={{ height: '100%', width: 'auto', display: 'block' }} />
          </div>
          <div style={{ height: '22px', width: '1px', backgroundColor: '#E2E8F0', flexShrink: 0 }}></div>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.2' }}>
            <span style={{ fontSize: '8px', fontWeight: 800, color: '#120A2B', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Global</span>
            <span style={{ fontSize: '8px', fontWeight: 800, color: '#120A2B', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Neurodiversity</span>
            <span style={{ fontSize: '8px', fontWeight: 800, color: '#120A2B', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Association</span>
          </div>
        </Link>
 
        <nav className="desktop-only-nav" style={{ display: 'flex', gap: '4px', alignItems: 'center', flex: 1 }}>
          {navLinks.map(link => (
            <Link key={link.label} href={link.href} style={desktopNavLinkStyle}>{link.label}</Link>
          ))}
          
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
            <form onSubmit={handleSearch} style={{ position: 'relative' }}>
               <Search size={16} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
               <input 
                 type="text" 
                 placeholder="Search Registry..." 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '8px 12px 8px 36px', borderRadius: '100px', fontSize: '13px', outline: 'none', width: '180px' }}
               />
            </form>
          </div>
        </nav>
 
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', zIndex: 1100, color: '#120A2B', marginLeft: 'auto' }} className="mobile-toggle">
          {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'white', zIndex: 1050, paddingTop: '100px', padding: '100px 24px 40px' }}>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {navLinks.map(link => (
              <Link key={link.label} href={link.href} onClick={() => setIsMenuOpen(false)} style={{ fontSize: '24px', fontWeight: 800, color: '#120A2B', textDecoration: 'none' }}>
                {link.label}
              </Link>
            ))}
            <div style={{ marginTop: '40px', paddingTop: '40px', borderTop: '1px solid #F0F0F0' }}>
               {!user && (
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                   <Link href="/login" onClick={() => setIsMenuOpen(false)} style={{ fontSize: '18px', fontWeight: 700, color: '#120A2B', textDecoration: 'none' }}>Log in</Link>
                   <button onClick={() => { setIsModalOpen(true); setIsMenuOpen(false); }} className="btn-pill btn-dark" style={{ width: '100%' }}>Join Association</button>
                 </div>
               )}
            </div>
          </nav>
        </div>
      )}

      <InquiryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        type="MEMBERSHIP"
        title="Join the Association"
      />

      <style jsx>{`
        .desktop-only-utility, .desktop-only-nav { display: block; }
        .desktop-only-nav { display: flex; }
        .mobile-toggle { display: none; }
        @media (max-width: 1200px) {
          .desktop-only-utility, .desktop-only-nav { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
      `}</style>
    </header>
  );
}

const desktopNavLinkStyle: React.CSSProperties = { fontSize: '13px', fontWeight: 700, color: '#120A2B', padding: '12px 14px', borderRadius: '4px', textDecoration: 'none', transition: 'all 0.2s ease' };
