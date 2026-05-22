import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';

import elegantCookware from '../assets/elegant_cookware_set_minimal.jpg';
import modernCookware from '../assets/modern_cookware_set_minimal.jpg';
import premiumKitchenware from '../assets/premium_kitchenware_white_background.jpg';
import stainlessCookware from '../assets/stainless_steel_cookware_premium.jpg';

const ChevronLeft = Icons['ChevronLeft'] || Icons['HelpCircle'];
const ChevronRight = Icons['ChevronRight'] || Icons['HelpCircle'];
const X = Icons['X'] || Icons['HelpCircle'];
const MessageCircle = Icons['MessageCircle'] || Icons['HelpCircle'];
const Tag = Icons['Tag'] || Icons['HelpCircle'];
const Package = Icons['Package'] || Icons['HelpCircle'];

const FALLBACK_IMAGES = [
  elegantCookware,
  modernCookware,
  premiumKitchenware,
  stainlessCookware,
];

function ImageCarousel({ images }) {
  const [current, setCurrent] = useState(0);
  const [imgError, setImgError] = useState({});

  const safeImages = images?.length > 0 ? images : FALLBACK_IMAGES;
  const total = safeImages.length;

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + total) % total);
  }, [total]);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % total);
  }, [total]);

  const handleImgError = (idx) => {
    setImgError((prev) => ({ ...prev, [idx]: true }));
  };

  return (
    <div className="relative w-full h-full flex flex-col gap-3">
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-stone-50 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={imgError[current] ? FALLBACK_IMAGES[current % FALLBACK_IMAGES.length] : safeImages[current]}
            alt={`Product image ${current + 1}`}
            onError={() => handleImgError(current)}
            className="w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.38, ease: 'easeInOut' }}
          />
        </AnimatePresence>

        {total > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm border border-stone-200 flex items-center justify-center shadow-sm hover:bg-white hover:border-amber-400 transition-all duration-200 z-10"
            >
              <ChevronLeft size={15} className="text-stone-600" />
            </button>
            <button
              onClick={next}
              aria-label="Next image"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm border border-stone-200 flex items-center justify-center shadow-sm hover:bg-white hover:border-amber-400 transition-all duration-200 z-10"
            >
              <ChevronRight size={15} className="text-stone-600" />
            </button>
          </>
        )}
      </div>

      {total > 1 && (
        <div className="flex items-center justify-center gap-1.5">
          {safeImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              aria-label={`Go to image ${idx + 1}`}
              className={`transition-all duration-300 rounded-full ${
                idx === current
                  ? 'w-5 h-1.5 bg-amber-500'
                  : 'w-1.5 h-1.5 bg-stone-300 hover:bg-amber-300'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function SpecGrid({ specs }) {
  if (!specs || specs.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-3">
      {specs.map((spec, idx) => (
        <div key={idx} className="flex flex-col gap-0.5">
          <span className="text-xs font-medium text-amber-600 uppercase tracking-widest font-raleway">
            {spec?.label}
          </span>
          <span className="text-sm text-stone-700 leading-snug font-raleway">
            {spec?.value}
          </span>
        </div>
      ))}
    </div>
  );
}

function ProductDetailModal({ product, onClose }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!product) return null;

  const whatsappNumber = '918008890044';
  const message = encodeURIComponent(
    `Hi, I am interested in buying this product. Can you guide me further? Product: ${product?.name ?? 'your product'}`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  const images = product?.images?.length > 0
    ? product.images
    : product?.image
    ? [product.image]
    : [];

  const specs = product?.specs ?? [];
  const category = product?.category ?? '';
  const name = product?.name ?? '';
  const description = product?.description ?? '';
  const material = product?.material ?? '';
  const origin = product?.origin ?? '';

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
      >
        <motion.div
          className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm"
          onClick={onClose}
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
        />

        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`Product details for ${name}`}
          className="relative z-10 w-full max-w-[90vw] md:max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.38, ease: 'easeOut' }}
        >
          <button
            onClick={onClose}
            aria-label="Close product detail modal"
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-stone-100 hover:bg-amber-50 border border-stone-200 hover:border-amber-300 flex items-center justify-center transition-all duration-200 shadow-sm"
          >
            <X size={16} className="text-stone-500 hover:text-amber-600" />
          </button>

          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-[45%] p-6 md:p-8 bg-stone-50/60 flex flex-col justify-between gap-4">
              <ImageCarousel images={images} />
            </div>

            <div className="w-full md:w-[55%] p-6 md:p-8 flex flex-col gap-5 overflow-y-auto max-h-[80vh] md:max-h-[85vh]">
              <motion.div
                className="flex flex-col gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12, duration: 0.32, ease: 'easeOut' }}
              >
                {category && (
                  <div className="flex items-center gap-1.5">
                    <Tag size={11} className="text-amber-500" strokeWidth={2} />
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-600 font-raleway">
                      {category}
                    </span>
                  </div>
                )}

                <h2 className="text-2xl md:text-3xl font-bold text-stone-900 leading-tight font-playfair">
                  {name}
                </h2>
              </motion.div>

              <motion.div
                className="h-px bg-gradient-to-r from-amber-400 via-amber-200 to-transparent"
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.2, duration: 0.45, ease: 'easeOut' }}
              />

              {description && (
                <motion.p
                  className="text-sm leading-relaxed text-stone-600 font-raleway"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.22, duration: 0.32, ease: 'easeOut' }}
                >
                  {description}
                </motion.p>
              )}

              {(material || origin) && (
                <motion.div
                  className="flex flex-wrap gap-2"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.28, duration: 0.32, ease: 'easeOut' }}
                >
                  {material && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-medium text-amber-700 font-raleway">
                      <Package size={11} strokeWidth={2} />
                      {material}
                    </span>
                  )}
                  {origin && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-xs font-medium text-stone-600 font-raleway">
                      {origin}
                    </span>
                  )}
                </motion.div>
              )}

              {specs.length > 0 && (
                <motion.div
                  className="flex flex-col gap-3"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.32, duration: 0.32, ease: 'easeOut' }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-widest text-stone-400 font-raleway">
                      Specifications
                    </span>
                    <div className="flex-1 h-px bg-stone-100" />
                  </div>
                  <SpecGrid specs={specs} />
                </motion.div>
              )}

              <motion.div
                className="mt-auto pt-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38, duration: 0.32, ease: 'easeOut' }}
              >
                <motion.a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Inquire about ${name} on WhatsApp`}
                  className="flex items-center justify-center gap-2.5 w-full py-4 px-6 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm tracking-wide font-raleway shadow-md transition-colors duration-200"
                  whileHover={{ scale: 1.02, boxShadow: '0 8px 28px rgba(212,175,55,0.35)' }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.18 }}
                >
                  <MessageCircle size={17} strokeWidth={2} />
                  Inquire on WhatsApp
                </motion.a>

                <p className="text-center text-xs text-stone-400 mt-3 font-raleway">
                  We typically respond within a few hours.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default ProductDetailModal;
