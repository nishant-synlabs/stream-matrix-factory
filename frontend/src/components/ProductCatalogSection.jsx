import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const WhatsAppSVG = ({ size = 16 }) => (
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function ProductCatalogSection({ products = [] }) {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [hoveredCard, setHoveredCard] = useState(null);

  const categories = ['all', 'cookware', 'bakeware', 'storage', 'cutlery'];

  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p?.category === activeCategory));
    }
  }, [activeCategory, products]);

  const handleWhatsAppClick = (product) => {
    const phoneNumber = '918008890044';
    const message = `Hi, I am interested in buying this product. Can you guide me further? Product: ${product?.title || 'this product'}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  const getCategoryLabel = (cat) => {
    const labels = {
      all: 'All Products',
      cookware: 'Cookware',
      bakeware: 'Bakeware',
      storage: 'Storage',
      cutlery: 'Cutlery',
    };
    return labels[cat] || cat;
  };

  return (
    <section
      id="catalog"
      className="relative w-full py-20 md:py-28"
      style={{
        background: 'linear-gradient(180deg, #f8fafb 0%, #eef2f5 50%, #f8fafb 100%)',
      }}
    >
      <div className="max-w-screen-xl mx-auto px-6 md:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <span
            className="inline-block text-xs font-medium tracking-[0.2em] uppercase mb-4"
            style={{ color: '#23272c', opacity: 0.5 }}
          >
            Curated Collection
          </span>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-6"
            style={{ fontFamily: 'Raleway, sans-serif', color: '#23272c' }}
          >
            Our Catalog
          </h2>
          <p
            className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: '#23272c', opacity: 0.6, fontFamily: 'Raleway, sans-serif' }}
          >
            Premium kitchenware crafted for the modern home. Each piece reflects our commitment to quality and timeless design.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-14"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="relative px-6 py-2.5 text-sm font-medium tracking-wide transition-all duration-300"
              style={{
                fontFamily: 'Raleway, sans-serif',
                borderRadius: '999px',
                backgroundColor: activeCategory === cat ? '#23272c' : 'transparent',
                color: activeCategory === cat ? '#ffffff' : '#23272c',
                border: activeCategory === cat ? '1.5px solid #23272c' : '1.5px solid #d5e1e7',
              }}
              onMouseEnter={(e) => {
                if (activeCategory !== cat) {
                  e.currentTarget.style.borderColor = '#23272c';
                  e.currentTarget.style.color = '#23272c';
                }
              }}
              onMouseLeave={(e) => {
                if (activeCategory !== cat) {
                  e.currentTarget.style.borderColor = '#d5e1e7';
                  e.currentTarget.style.color = '#23272c';
                }
              }}
            >
              {getCategoryLabel(cat)}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6"
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product?.id || index}
                variants={cardVariants}
                className="group relative flex flex-col bg-white p-3 sm:p-6 transition-all duration-500 cursor-pointer"
                style={{
                  borderRadius: '24px',
                  border: '1px solid #d5e1e7',
                  boxShadow: '0 4px 32px rgba(30, 40, 64, 0.14)',
                }}
                onMouseEnter={() => setHoveredCard(product?.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => navigate(`/product/${product?.id}`)}
                whileHover={{
                  y: -6,
                  boxShadow: '0 12px 48px rgba(30, 40, 64, 0.18)',
                  transition: { duration: 0.4, ease: 'easeOut' },
                }}
              >
                <div
                  className="relative w-full overflow-hidden mb-5"
                  style={{ borderRadius: '18px', aspectRatio: '4/3' }}
                >
                  <motion.img
                    src={product?.image}
                    alt={product?.title || 'Product'}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://placehold.co/600x450/e2e8f0/64748b?text=Product';
                    }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  />
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(180deg, transparent 60%, rgba(35, 39, 44, 0.04) 100%)',
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredCard === product?.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                <div className="flex flex-col flex-grow">
                  <h3
                    className="text-sm sm:text-lg font-semibold tracking-tight mb-1 leading-snug"
                    style={{ fontFamily: 'Raleway, sans-serif', color: '#23272c' }}
                  >
                    {product?.title || 'Premium Product'}
                  </h3>
                  <p
                    className="text-xs font-medium tracking-wide uppercase mb-2 sm:mb-3"
                    style={{ fontFamily: 'Raleway, sans-serif', color: '#23272c', opacity: 0.45 }}
                  >
                    {product?.brand || 'NC Nandini Collections'}
                  </p>
                  <p
                    className="hidden sm:block text-sm mb-5 leading-relaxed"
                    style={{ fontFamily: 'Raleway, sans-serif', color: '#23272c', opacity: 0.55 }}
                  >
                    {product?.description || 'Premium kitchenware for your modern home.'}
                  </p>

                  <div className="mt-auto pt-3 sm:pt-4" style={{ borderTop: '1px solid rgba(213, 225, 231, 0.6)' }}>
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className="text-base sm:text-xl font-semibold"
                        style={{ fontFamily: 'Raleway, sans-serif', color: '#23272c' }}
                      >
                        {product?.price || '₹0'}
                      </span>
                      <span
                        className="hidden sm:block text-xs font-medium tracking-wide"
                        style={{ fontFamily: 'Raleway, sans-serif', color: '#23272c', opacity: 0.4 }}
                      >
                        {product?.category || 'Kitchenware'}
                      </span>
                    </div>

                    <motion.button
                      onClick={(e) => { e.stopPropagation(); handleWhatsAppClick(product); }}
                      className="w-full flex items-center justify-center gap-1.5 sm:gap-2.5 py-2.5 sm:py-3.5 px-3 sm:px-6 text-xs sm:text-sm font-semibold tracking-wide text-white transition-all duration-300"
                      style={{
                        borderRadius: '999px',
                        backgroundColor: '#22c55e',
                        fontFamily: 'Raleway, sans-serif',
                      }}
                      whileHover={{
                        scale: 1.02,
                        boxShadow: '0 4px 20px rgba(34, 197, 94, 0.35)',
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div
                        animate={hoveredCard === product?.id ? {
                          scale: [1, 1.15, 1],
                          transition: { duration: 0.8, repeat: Infinity, ease: 'easeInOut' },
                        } : {}}
                      >
                        <WhatsAppSVG size={16} />
                      </motion.div>
                      <span className="hidden sm:inline">Inquire on </span>WhatsApp
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p
              className="text-lg"
              style={{ fontFamily: 'Raleway, sans-serif', color: '#23272c', opacity: 0.5 }}
            >
              No products found in this category.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
