import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { productsData } from '../productsData';

import cookwareImg from '../assets/modern_cookware_set.jpg';
import bakewareImg from '../assets/elegant_bakeware_pans.jpg';
import storageImg from '../assets/kitchen_storage_containers_minimalist.jpg';
import cutleryImg from '../assets/premium_kitchen_knives_cutlery_set.jpg';

const imageMap = {
  modern_cookware_set: cookwareImg,
  elegant_bakeware_pans: bakewareImg,
  kitchen_storage_containers_minimalist: storageImg,
  premium_kitchen_knives_cutlery_set: cutleryImg,
};

const navLinks = [
  { label: 'Home', route: '/' },
  { label: 'About', route: '/#about' },
  { label: 'Catalog', route: '/#catalog' },
  { label: 'Contact', route: '/#contact' },
];

const footerLinks = [
  { label: 'Home', route: '/' },
  { label: 'About', route: '/#about' },
  { label: 'Contact', route: '/#contact' },
];

const WhatsAppSVG = ({ size = 22 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.417A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.5 9.5c.167.833.9 2.7 2.5 3.5s2.667 1.333 3 1.5c.167.083.6.1 1-.5.5-.7.667-.933.667-.933s1.333.667 2 1c.133.067.4.4 0 1-.5.767-1.467 1.933-2.667 1.933-1.2 0-3.333-.933-5.333-3.167C7.667 11.6 7.167 9.433 7.5 8.5c.267-.733 1.067-1.333 1.5-1.5.5-.2.867-.033 1 .167.133.2.5 1.167.5 1.333z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  const ArrowLeft = Icons['ArrowLeft'] || Icons['HelpCircle'];
  const CheckCircle2 = Icons['CheckCircle2'] || Icons['Check'] || Icons['HelpCircle'];

  useEffect(() => {
    window.scrollTo(0, 0);
    const found = productsData.find((p) => String(p?.id) === String(id));
    if (found) {
      setProduct(found);
    } else {
      navigate('/catalog', { replace: true });
    }
  }, [id, navigate]);

  const handleWhatsAppClick = () => {
    const phoneNumber = '918008890044';
    const message = `Hi, I am interested in buying this product. Can you guide me further? Product: ${product?.title || product?.name}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  if (!product) return null;

  const productImg = imageMap[product.imageKey] || cookwareImg;

  return (
    <div className="min-h-screen w-full bg-[#f8fafb] flex flex-col">
      <Header nav_links={navLinks} />

      <main className="flex-grow w-full max-w-screen-xl mx-auto px-6 md:px-10 lg:px-12 py-28 md:py-36">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[#23272c]/50 hover:text-[#23272c] transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          <span
            className="text-sm font-semibold tracking-wide uppercase"
            style={{ fontFamily: 'Raleway, sans-serif' }}
          >
            Back to Catalog
          </span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="w-full aspect-square rounded-[32px] overflow-hidden bg-white border border-[#d5e1e7] shadow-[0_8px_48px_rgba(30,40,64,0.10)]">
              <img
                src={productImg}
                alt={product.title || product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="flex flex-col"
          >
            <div className="mb-6">
              <span
                className="inline-block text-xs font-bold tracking-[0.18em] uppercase mb-3"
                style={{ fontFamily: 'Raleway, sans-serif', color: '#23272c', opacity: 0.45 }}
              >
                {product.category}
              </span>
              <h1
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.1] mb-4"
                style={{ fontFamily: 'Raleway, sans-serif', color: '#23272c' }}
              >
                {product.title || product.name}
              </h1>
              <p
                className="text-2xl lg:text-3xl font-semibold"
                style={{ fontFamily: 'Raleway, sans-serif', color: '#23272c' }}
              >
                ₹{product.price}
              </p>
            </div>

            <div className="h-px w-full bg-[#d5e1e7] mb-8" />

            <div className="mb-8">
              <h3
                className="text-base font-bold mb-3"
                style={{ fontFamily: 'Raleway, sans-serif', color: '#23272c' }}
              >
                Description
              </h3>
              <p
                className="text-[15px] leading-relaxed"
                style={{ fontFamily: 'Raleway, sans-serif', color: '#23272c', opacity: 0.65 }}
              >
                {product.longDescription || product.description}
              </p>
            </div>

            {product.features?.length > 0 && (
              <div className="mb-8">
                <h3
                  className="text-base font-bold mb-4"
                  style={{ fontFamily: 'Raleway, sans-serif', color: '#23272c' }}
                >
                  Key Features
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#25D366' }} />
                      <span
                        className="text-sm leading-snug"
                        style={{ fontFamily: 'Raleway, sans-serif', color: '#23272c', opacity: 0.75 }}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {(product.material || product.careInstruction) && (
              <div
                className="rounded-2xl p-5 mb-10 border border-[#d5e1e7]"
                style={{ background: '#eef2f5' }}
              >
                <div className="flex flex-col sm:flex-row gap-5">
                  {product.material && (
                    <div className="flex-1">
                      <span
                        className="block text-xs font-bold uppercase tracking-wider mb-1"
                        style={{ fontFamily: 'Raleway, sans-serif', color: '#23272c', opacity: 0.45 }}
                      >
                        Material
                      </span>
                      <span
                        className="block text-sm font-semibold"
                        style={{ fontFamily: 'Raleway, sans-serif', color: '#23272c' }}
                      >
                        {product.material}
                      </span>
                    </div>
                  )}
                  {product.material && product.careInstruction && (
                    <div className="hidden sm:block w-px bg-[#d5e1e7]" />
                  )}
                  {product.careInstruction && (
                    <div className="flex-1">
                      <span
                        className="block text-xs font-bold uppercase tracking-wider mb-1"
                        style={{ fontFamily: 'Raleway, sans-serif', color: '#23272c', opacity: 0.45 }}
                      >
                        Care
                      </span>
                      <span
                        className="block text-sm font-semibold"
                        style={{ fontFamily: 'Raleway, sans-serif', color: '#23272c' }}
                      >
                        {product.careInstruction}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <motion.button
              onClick={handleWhatsAppClick}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-3 py-5 px-8 text-white rounded-full transition-all duration-300"
              style={{
                backgroundColor: '#25D366',
                boxShadow: '0 8px 32px rgba(37,211,102,0.3)',
                fontFamily: 'Raleway, sans-serif',
              }}
              aria-label={`Inquire about ${product.title || product.name} on WhatsApp`}
            >
              <WhatsAppSVG size={22} />
              <span className="text-lg font-bold tracking-wide">Inquire on WhatsApp</span>
            </motion.button>
          </motion.div>
        </div>
      </main>

      <Footer footer_links={footerLinks} />
    </div>
  );
}
