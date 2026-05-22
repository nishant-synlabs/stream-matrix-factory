import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import { Link } from 'react-router-dom';

const MessageCircle = Icons['MessageCircle'] || Icons['HelpCircle'];
const SlidersHorizontal = Icons['SlidersHorizontal'] || Icons['HelpCircle'];
const Eye = Icons['Eye'] || Icons['HelpCircle'];
const ChevronDown = Icons['ChevronDown'] || Icons['HelpCircle'];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.52, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    y: -16,
    scale: 0.96,
    transition: { duration: 0.28, ease: 'easeIn' },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

function ProductCard({ product }) {
  const whatsappNumber = '918008890044';
  const whatsappMessage = encodeURIComponent(
    `Hi, I am interested in buying this product. Can you guide me further? Product: ${product?.name}`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6, boxShadow: '0 16px 48px rgba(212,175,55,0.13), 0 4px 24px rgba(59,28,3,0.07)' }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className="bg-white rounded-3xl overflow-hidden group cursor-pointer"
      style={{ boxShadow: '0 6px 24px rgba(59,28,3,0.05)' }}
    >
      <div className="relative overflow-hidden aspect-square bg-stone-50">
        <img
          src={product?.image}
          alt={product?.name || 'Product'}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-107"
          onError={(e) => {
            e.currentTarget.src = 'https://placehold.co/600x600/f5f0eb/D4AF37?text=NC+Nandini';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
        >
          <Link
            to={`/product/${product?.id}`}
            className="flex items-center gap-1.5 bg-white/95 backdrop-blur-sm text-stone-800 text-xs font-medium tracking-wide px-4 py-2 rounded-full shadow-md hover:bg-white transition-colors duration-200"
            style={{ fontFamily: 'Raleway, sans-serif' }}
          >
            <Eye size={13} strokeWidth={2} />
            View
          </Link>
        </motion.div>
        {product?.isNew && (
          <span
            className="absolute top-4 left-4 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full"
            style={{
              backgroundColor: '#D4AF37',
              color: '#fff',
              fontFamily: 'Raleway, sans-serif',
              letterSpacing: '0.1em',
            }}
          >
            New
          </span>
        )}
      </div>

      <div className="p-6 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p
              className="text-xs font-semibold tracking-widest uppercase mb-1.5"
              style={{ color: '#D4AF37', fontFamily: 'Raleway, sans-serif' }}
            >
              {product?.category}
            </p>
            <h3
              className="text-lg font-bold leading-snug text-stone-900 line-clamp-2"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              {product?.name}
            </h3>
          </div>
        </div>

        <p
          className="text-sm leading-relaxed line-clamp-2"
          style={{ color: '#7a6652', fontFamily: 'Raleway, sans-serif' }}
        >
          {product?.description}
        </p>

        <div
          className="w-8 h-px mt-1"
          style={{ backgroundColor: '#D4AF37', opacity: 0.5 }}
        />

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center justify-center gap-2 w-full py-3 rounded-full font-semibold text-sm tracking-wide transition-all duration-300 mt-1"
          style={{
            backgroundColor: '#D4AF37',
            color: '#fff',
            fontFamily: 'Raleway, sans-serif',
            letterSpacing: '0.05em',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#b8962e';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(212,175,55,0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#D4AF37';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <MessageCircle size={15} strokeWidth={2} />
          Enquire on WhatsApp
        </a>
      </div>
    </motion.div>
  );
}

function CatalogGrid({ products = [], categories = [] }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filterOpen, setFilterOpen] = useState(false);

  const allCategories = useMemo(() => {
    const cats = categories?.length > 0 ? categories : [];
    return ['All', ...cats];
  }, [categories]);

  const filtered = useMemo(() => {
    if (!products?.length) return [];
    if (selectedCategory === 'All') return products;
    return products.filter((p) => p?.category === selectedCategory);
  }, [products, selectedCategory]);

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    setFilterOpen(false);
  };

  return (
    <section className="w-full bg-white">
      <div
        className="w-full py-16 px-4"
        style={{
          background: 'linear-gradient(180deg, #faf8f5 0%, #ffffff 60%)',
        }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={headingVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="text-center mb-12"
          >
            <span
              className="inline-block text-xs font-semibold tracking-widest uppercase mb-4"
              style={{ color: '#D4AF37', fontFamily: 'Raleway, sans-serif' }}
            >
              NC Nandini Collections
            </span>
            <h2
              className="text-4xl md:text-5xl font-bold leading-tight mb-4"
              style={{ color: '#3b1c03', fontFamily: 'Playfair Display, serif' }}
            >
              Our Premium Collection
            </h2>
            <div
              className="w-16 h-0.5 mx-auto mb-5"
              style={{ backgroundColor: '#D4AF37' }}
            />
            <p
              className="text-base max-w-lg mx-auto leading-relaxed"
              style={{ color: '#7a6652', fontFamily: 'Raleway, sans-serif' }}
            >
              Refined kitchenware crafted for those who believe the kitchen is the heart of every home.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-12"
          >
            <div className="hidden md:flex flex-wrap items-center justify-center gap-2">
              {allCategories.map((cat) => (
                <motion.button
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-5 py-2 rounded-full text-sm font-semibold tracking-wide transition-all duration-250 border"
                  style={{
                    fontFamily: 'Raleway, sans-serif',
                    backgroundColor: selectedCategory === cat ? '#D4AF37' : 'transparent',
                    color: selectedCategory === cat ? '#fff' : '#3b1c03',
                    borderColor: selectedCategory === cat ? '#D4AF37' : 'rgba(212,175,55,0.35)',
                    boxShadow:
                      selectedCategory === cat
                        ? '0 4px 16px rgba(212,175,55,0.3)'
                        : 'none',
                  }}
                >
                  {cat}
                </motion.button>
              ))}
            </div>

            <div className="md:hidden relative w-full max-w-xs">
              <button
                onClick={() => setFilterOpen((v) => !v)}
                className="w-full flex items-center justify-between gap-2 px-5 py-3 rounded-full border text-sm font-semibold"
                style={{
                  fontFamily: 'Raleway, sans-serif',
                  backgroundColor: '#fff',
                  color: '#3b1c03',
                  borderColor: 'rgba(212,175,55,0.5)',
                  boxShadow: '0 2px 12px rgba(59,28,3,0.06)',
                }}
              >
                <span className="flex items-center gap-2">
                  <SlidersHorizontal size={15} strokeWidth={2} style={{ color: '#D4AF37' }} />
                  {selectedCategory}
                </span>
                <motion.span
                  animate={{ rotate: filterOpen ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <ChevronDown size={15} strokeWidth={2} />
                </motion.span>
              </button>

              <AnimatePresence>
                {filterOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.97 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl overflow-hidden z-20"
                    style={{ boxShadow: '0 12px 36px rgba(59,28,3,0.1)', border: '1px solid rgba(212,175,55,0.2)' }}
                  >
                    {allCategories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => handleCategorySelect(cat)}
                        className="w-full text-left px-5 py-3 text-sm font-medium transition-colors duration-150"
                        style={{
                          fontFamily: 'Raleway, sans-serif',
                          color: selectedCategory === cat ? '#D4AF37' : '#3b1c03',
                          backgroundColor:
                            selectedCategory === cat ? 'rgba(212,175,55,0.06)' : 'transparent',
                        }}
                      >
                        {cat}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="text-center py-20"
              >
                <p
                  className="text-lg font-medium"
                  style={{ color: '#a08c74', fontFamily: 'Raleway, sans-serif' }}
                >
                  No products found in this category.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key={selectedCategory}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8"
              >
                {filtered.map((product) => (
                  <ProductCard key={product?.id} product={product} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {filtered.length > 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="text-center mt-10 text-sm"
              style={{ color: '#b8a898', fontFamily: 'Raleway, sans-serif' }}
            >
              Showing {filtered.length} {filtered.length === 1 ? 'product' : 'products'}
              {selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
}

export default CatalogGrid;
