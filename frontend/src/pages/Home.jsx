import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroHome from '../components/HeroHome';
import FeaturedProductsGrid from '../components/FeaturedProductsGrid';
import AboutSection from '../components/AboutSection';
import ContactForm from '../components/ContactForm';
import LoginModal from '../components/LoginModal';
import { useAuth } from '../AuthContext';

export default function Home() {
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const authContext = useAuth();
  const login = authContext?.login;

  const handleLoginSuccess = (userData) => {
    login?.(userData);
  };

  useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#contact') {
      const el = document.getElementById('contact-section');
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 300);
      }
    }
  }, []);

  return (
    <div className="min-h-screen w-full bg-white overflow-x-hidden">
      <Header
        onLoginClick={() => setLoginModalOpen(true)}
      />
      <main className="flex flex-col">
        <HeroHome />
        <FeaturedProductsGrid />
        <AboutSection />
        <div id="contact-section">
          <ContactForm />
        </div>
      </main>
      <Footer />
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}
