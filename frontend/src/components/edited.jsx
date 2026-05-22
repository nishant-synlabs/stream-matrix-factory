import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductDetailCard from '../components/ProductDetailCard';
import LoginModal from '../components/LoginModal';
import { useAuth } from '../AuthContext';

const API_BASE = '/api';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const authContext = useAuth();
  const user = authContext?.user;
  const login = authContext?.login;

  const ArrowLeftIcon = Icons['ArrowLeft'] || Icons['HelpCircle'];
  const SparklesIcon = Icons['Sparkles'] || Icons['HelpCircle'];

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    fetch(`${API_BASE}/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then((data) => {
        const normalized = {
          id: data?.id,
          name: data?.name,
          description: data?.description,
          price: data?.price,
          category: data?.category_id,
          image: data?.image_url,
          is_featured: data?.is_featured,
        };
        setProduct(normalized);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        navigate('/', { replace: true });
      });
  }, [id, navigate]);

  const handleLoginSuccess = (userData) => {
    login?.(userData);
    setLoginModalOpen(false);
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-white via-[#fdfbf5] to-[#f9f5ea]">
      <Header
        isLoggedIn={!!user}
        onLoginClick={() => setLoginModalOpen(true)}
      />

      <main className="flex-grow w-full">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 pt-10 pb-4">
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <Link
              to="/catalog"
              className="inline-flex items-center gap-2 group"
              data-imagine-id="productdetailpage-back-link"
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-full border border-[#D4AF37]/30 text-[#D4AF37] group-hover:bg-[#D4AF37]/10 transition-colors duration-200">
                <ArrowLeftIcon size={14} />
              </span>
              <span
                className="font-raleway text-[11px] font-semibold uppercase tracking-[0.22em] text-[#212121]/45 group-hover:text-[#D4AF37] transition-colors duration-200"
                data-imagine-id="productdetailpage-back-label"
              >
                Back to Catalog
              </span>
            </Link>
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-40 gap-5"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                className="w-10 h-10 rounded-full border-2 border-[#D4AF37]/20 border-t-[#D4AF37]"
              />
              <p
                className="font-raleway text-xs tracking-[0.28em] uppercase text-[#212121]/35"
                data-imagine-id="productdetailpage-loading-text"
              >
                Loading product…
              </p>
            </motion.div>
          ) : product ? (
            <motion.div
              key="product"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <ProductDetailCard product={product} />

              <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-10">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.35, ease: 'easeOut' }}
                  className="flex items-center gap-3 border-t border-[#D4AF37]/15 pt-8"
                >
                  <SparklesIcon size={13} className="text-[#D4AF37]" />
                  <p
                    className="font-raleway text-[11px] tracking-[0.22em] uppercase text-[#212121]/35"
                    data-imagine-id="productdetailpage-assurance-text"
                  >
                    Premium quality guaranteed · NC Nandini Collections, Nizamabad
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
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

export { ProductDetailPage };
