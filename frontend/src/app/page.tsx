import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import CertCards from '@/components/home/CertCards';
import RecentSpecialists from '@/components/home/RecentSpecialists';
import Resources from '@/components/home/Resources';
import Events from '@/components/home/Events';
import News from '@/components/home/News';
import CertTicker from '@/components/home/CertTicker';

export default function Home() {
  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar />
      <Hero />
      <CertCards />
      <RecentSpecialists />
      <Resources />
      <Events />
      <News />
      <CertTicker />
      <Footer />
    </div>
  );
}
