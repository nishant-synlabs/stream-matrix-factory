import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import elegantCookware from '../assets/elegant_cookware_set_minimal.jpg';
import modernCookware from '../assets/modern_cookware_set.jpg';
import premiumBakeware from '../assets/premium_bakeware_minimal.jpg';
import kitchenKnives from '../assets/kitchen_knives_set_elegant.jpg';
import kitchenStorage from '../assets/kitchen_storage_containers_minimalist.jpg';
import kitchenUtensils from '../assets/kitchen_utensils_clean_white.jpg';
import premiumGlassware from '../assets/premium_glassware_drinkware_collection.jpg';
import stylishDinnerware from '../assets/stylish_dinnerware_plates_bowls_premium.jpg';

const ArrowLeft = Icons['ArrowLeft'] || Icons['HelpCircle'];
const MessageCircle = Icons['MessageCircle'] || Icons['HelpCircle'];
const Tag = Icons['Tag'] || Icons['HelpCircle'];
const Layers = Icons['Layers'] || Icons['HelpCircle'];
const Package = Icons['Package'] || Icons['HelpCircle'];
const Star = Icons['Star'] || Icons['HelpCircle'];
const ShieldCheck = Icons['ShieldCheck'] || Icons['HelpCircle'];
const Truck = Icons['Truck'] || Icons['HelpCircle'];

const FALLBACK_IMAGES = {
  cookware: elegantCookware,
  bakeware: premiumBakeware,
  knives: kitchenKnives,
  storage: kitchenStorage,
  utensils: kitchenUtensils,
  glassware: premiumGlassware,
  dinnerware: stylishDinnerware,
  default: modernCookware,
};

const WHATSAPP_NUMBER = '918008890044';

function buildWhatsAppLink(product) {
  const name = product?.name ?? 'this product';
  const sku = product?.sku ? ` (SKU: ${product.sku})` : '';
  const msg = encodeURIComponent(
    `Hello NC Nandini Collections! I am interested in *${name}*${sku}. Could you please share more details and pricing?`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
}

function InfoRow({ icon: IconComp, label, value }) {
  if (!value) return null;
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="flex items-start gap-4 py-4 border-b border-[#f5f5f5] last:border-0"
    >
      <span className="mt-0.5 text-[#D4AF37] shrink-0">
        <IconComp size={16} strokeWidth={1.8} />
      </span>
      <span className="font-raleway text-xs uppercase tracking-[0.12em] text-[#b8956a] w-28 shrink-0 pt-0.5">
        {label}
      </span>
      <span className="font-raleway text-sm text-[#3b1c03] leading-relaxed flex-1">
        {value}
      </span>
    </motion.div>
  );
}

function BadgePill({ text }) {
  if (!text) return null;
  return (
    <span className="inline-block font-raleway text-[10px] uppercase tracking-[0.18em] text-[#D4AF37] border border-[#D4AF37]/40 rounded-full px-3 py-1 bg-[#D4AF37]/5">
      {text}
    </span>
  );
}

export default function ProductDetail({ product, onBack }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [whatsappPulse, setWhatsappPulse] = useState(false);

  useEffect(() => {
    setImgLoaded(false);
    setImgError(false);
  }, [product?.id]);

  useEffect(() => {
    const timer = setTimeout(() => setWhatsappPulse(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="font-raleway text-sm text-[#b8956a] tracking-widest uppercase">No product selected.</p>
      </div>
    );
  }

  const categoryKey = product?.category?.toLowerCase() ?? 'default';
  const fallbackSrc = FALLBACK_IMAGES[categoryKey] ?? FALLBACK_IMAGES.default;
  const imageSrc = imgError ? fallbackSrc : (product?.image ?? fallbackSrc);
  const whatsappHref = buildWhatsAppLink(product);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#fdfcf8] to-[#f9f6ef] pb-32">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#D4AF37]/4 blur-3xl" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative max-w-xl mx-auto px-4 pt-8 pb-10"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <button
            onClick={() => onBack?.()}
            className="group inline-flex items-center gap-2 font-raleway text-xs uppercase tracking-[0.14em] text-[#b8956a] hover:text-[#D4AF37] transition-colors duration-300"
            aria-label="Go back"
          >
            <ArrowLeft
              size={14}
              strokeWidth={2}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            Back to Catalog
          </button>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="relative w-full rounded-2xl overflow-hidden bg-[#f5f5f5] shadow-sm"
          style={{ aspectRatio: '4/3' }}
        >
          <AnimatePresence>
            {!imgLoaded && !imgError && (
              <motion.div
                key="skeleton"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 bg-gradient-to-br from-[#f5f5f5] via-[#ede9e0] to-[#f5f5f5] animate-pulse"
              />
            )}
          </AnimatePresence>
          <motion.img
            key={imageSrc}
            src={imageSrc}
            alt={product?.name ?? 'Product image'}
            onLoad={() => setImgLoaded(true)}
            onError={(e) => {
              setImgError(true);
              e.currentTarget.src = fallbackSrc;
            }}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={imgLoaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="w-full h-full object-cover"
          />
          {product?.badge && (
            <div className="absolute top-4 left-4">
              <BadgePill text={product.badge} />
            </div>
          )}
        </motion.div>

        <motion.div variants={itemVariants} className="mt-8 space-y-2">
          {product?.category && (
            <p className="font-raleway text-[10px] uppercase tracking-[0.2em] text-[#D4AF37]">
              {product.category}
            </p>
          )}
          <h1 className="font-playfair text-3xl md:text-4xl text-[#3b1c03] leading-tight">
            {product?.name ?? 'Unnamed Product'}
          </h1>
        </motion.div>

        {product?.tagline && (
          <motion.p
            variants={itemVariants}
            className="mt-3 font-raleway text-sm italic text-[#b8956a] tracking-wide leading-relaxed"
          >
            {product.tagline}
          </motion.p>
        )}

        {product?.description && (
          <motion.p
            variants={itemVariants}
            className="mt-5 font-raleway text-sm text-[#5c3d1e] leading-[1.85] tracking-wide"
          >
            {product.description}
          </motion.p>
        )}

        <motion.div variants={itemVariants} className="mt-8 rounded-xl bg-white shadow-sm border border-[#f5f5f5] overflow-hidden">
          <div className="px-5 py-2">
            <InfoRow icon={Tag} label="Category" value={product?.category} />
            <InfoRow icon={Layers} label="Material" value={product?.material} />
            <InfoRow icon={Package} label="Weight" value={product?.weight} />
            <InfoRow icon={Star} label="Finish" value={product?.finish} />
            <InfoRow icon={ShieldCheck} label="Care" value={product?.care} />
            <InfoRow icon={Truck} label="MOQ" value={product?.moq} />
          </div>
        </motion.div>

        {product?.features && product.features.length > 0 && (
          <motion.div variants={itemVariants} className="mt-8">
            <p className="font-raleway text-[10px] uppercase tracking-[0.18em] text-[#b8956a] mb-4">
              Key Features
            </p>
            <ul className="space-y-2">
              {product.features.map((feat, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.35, ease: 'easeOut' }}
                  className="flex items-start gap-3"
                >
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-[#D4AF37] shrink-0" />
                  <span className="font-raleway text-sm text-[#3b1c03] leading-relaxed">{feat}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}

        {product?.sku && (
          <motion.p
            variants={itemVariants}
            className="mt-8 font-raleway text-[10px] uppercase tracking-[0.18em] text-[#ccc] text-center"
          >
            SKU: {product.sku}
          </motion.p>
        )}
      </motion.div>

      <AnimatePresence>
        {whatsappPulse && (
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm px-4"
          >
            <motion.a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, boxShadow: '0 8px 32px rgba(212,175,55,0.35)' }}
              whileTap={{ scale: 0.97 }}
              aria-label="Enquire on WhatsApp"
              className="flex items-center justify-center gap-3 w-full bg-[#D4AF37] text-white font-raleway text-xs uppercase tracking-[0.18em] py-4 px-8 rounded-full shadow-md hover:bg-[#c9a42e] transition-colors duration-300"
            >
              <MessageCircle size={16} strokeWidth={2} />
              Enquire on WhatsApp
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
