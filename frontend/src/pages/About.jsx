import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AboutSection from '../components/AboutSection';
import LoginModal from '../components/LoginModal';
import { useAuth } from '../AuthContext';

export default function About() {
  const [loginOpen, setLoginOpen] = useState(false);
  const authContext = useAuth();
  const handleLoginSuccess = (userData) => {
    authContext?.login?.(userData);
    setLoginOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="min-h-screen flex flex-col bg-white"
    >
      <Header onLoginClick={() => setLoginOpen(true)} />
      <main className="flex-1">
        <AboutSection />
      </main>
      <Footer />
      <LoginModal
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </motion.div>
  );
}
