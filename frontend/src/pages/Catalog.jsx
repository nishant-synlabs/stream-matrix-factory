import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductGrid from '../components/ProductGrid';
import LoginModal from '../components/LoginModal';
import { useAuth } from '../AuthContext';

function CatalogPage() {
  const [loginOpen, setLoginOpen] = useState(false);
  const authContext = useAuth();
  const login = authContext?.login;

  const handleLoginSuccess = (userData) => {
    login?.(userData);
    setLoginOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header onLoginClick={() => setLoginOpen(true)} />
      <main className="flex-1 w-full">
        <ProductGrid />
      </main>
      <Footer />
      <LoginModal
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}

export default CatalogPage;
