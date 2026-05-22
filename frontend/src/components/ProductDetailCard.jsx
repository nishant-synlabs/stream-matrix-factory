import { useState } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

const MessageCircle = Icons['MessageCircle'] || Icons['HelpCircle'];
const Tag = Icons['Tag'] || Icons['HelpCircle'];
const ChevronLeft = Icons['ChevronLeft'] || Icons['HelpCircle'];
const ZoomIn = Icons['ZoomIn'] || Icons['HelpCircle'];

const WHATSAPP_NUMBER = '918008890044';

function buildWhatsAppUrl(product) {
  const message = encodeURIComponent(
    `Hi, I am interested in buying this product. Can you guide me further? Product: ${product?.name}`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}

export default function ProductDetailCard({ product }) {
  const [imgError, setImgError] = useState(false);

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-64 text-[#9a8c6a] font-raleway">
        <p data-imagine-id="productdetailcard-empty">No product selected.</p>
      </div>
    );
  }

  const whatsappUrl = buildWhatsAppUrl(product);

  const containerVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        staggerChildren: 0.12,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.97 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.65, ease: 'easeOut' } },
  };

  return (
    <section className="w-full bg-gradient-to-br from-white via-[#fdfbf5] to-[#f9f5ea] py-12 px-4 md:px-12">
      <div className="max-w-screen-xl mx-auto">
        <motion.div
          className="bg-white rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-0"
          style={{
            boxShadow: '0 2px 48px 0 rgba(212,175,55,0.13), 0 1px 8px 0 rgba(0,0,0,0.06)',
          }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="relative bg-[#fafaf7] flex items-center justify-center p-8 md:p-12 min-h-72 md:min-h-[480px]"
            variants={imageVariants}
          >
            <div
              className="absolute inset-0 rounded-l-3xl"
              style={{
                background:
                  'radial-gradient(ellipse at 60% 40%, rgba(212,175,55,0.08) 0%, transparent 70%)',
              }}
            />
            <motion.img
              src={imgError ? 'https://placehold.co/600x600/f5f0e8/D4AF37?text=NC+Nandini' : product?.image}
              alt={product?.name}
              className="relative z-10 w-full max-w-md object-contain rounded-2xl"
              style={{ maxHeight: '420px' }}
              onError={() => setImgError(true)}
              data-imagine-id="productdetailcard-image"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            />
            <motion.div
              className="absolute bottom-5 right-5 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md cursor-pointer"
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(212,175,55,0.12)' }}
              transition={{ duration: 0.2 }}
              aria-label="Zoom image"
            >
              <ZoomIn size={18} className="text-[#D4AF37]" />
            </motion.div>
          </motion.div>

          <div className="flex flex-col justify-center p-8 md:p-12 gap-6">
            <motion.div variants={childVariants}>
              <span
                className="inline-flex items-center gap-1.5 bg-[#D4AF37]/10 text-[#b8932a] text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full border border-[#D4AF37]/25"
                data-imagine-id="productdetailcard-category-badge"
              >
                <Tag size={12} />
                {product?.category}
              </span>
            </motion.div>

            <motion.div variants={childVariants} className="space-y-3">
              <h1
                className="text-3xl md:text-4xl font-bold text-[#1a1a1a] leading-tight font-raleway tracking-tight"
                data-imagine-id="productdetailcard-name"
              >
                {product?.name}
              </h1>
              <div className="flex items-baseline gap-2">
                <span
                  className="text-2xl md:text-3xl font-bold text-[#D4AF37] font-raleway"
                  data-imagine-id="productdetailcard-price"
                >
                  ₹{product?.price?.toLocaleString('en-IN')}
                </span>
                {product?.unit && (
                  <span
                    className="text-sm text-[#9a8c6a] font-raleway"
                    data-imagine-id="productdetailcard-unit"
                  >
                    / {product?.unit}
                  </span>
                )}
              </div>
            </motion.div>

            {product?.description && (
              <motion.p
                className="text-[#555] font-raleway text-base leading-relaxed"
                variants={childVariants}
                data-imagine-id="productdetailcard-description"
              >
                {product?.description}
              </motion.p>
            )}

            {product?.features && product.features.length > 0 && (
              <motion.ul
                className="space-y-2"
                variants={childVariants}
              >
                {product.features.map((feat, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 text-sm text-[#444] font-raleway"
                    data-imagine-id={`productdetailcard-feature-${idx}`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] flex-shrink-0" />
                    {feat}
                  </li>
                ))}
              </motion.ul>
            )}

            <motion.div variants={childVariants} className="pt-2">
              <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full bg-[#D4AF37] hover:bg-[#c9a42e] text-white font-semibold font-raleway text-base py-4 px-8 rounded-xl transition-colors duration-200 shadow-md"
                whileHover={{
                  scale: 1.025,
                  boxShadow: '0 6px 32px 0 rgba(212,175,55,0.38)',
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                data-imagine-id="productdetailcard-whatsapp-cta"
                aria-label={`Inquire about ${product?.name} on WhatsApp`}
              >
                <MessageCircle size={20} />
                Inquire on WhatsApp
              </motion.a>
            </motion.div>

            {product?.sku && (
              <motion.p
                className="text-xs text-[#bbb] font-raleway tracking-wider"
                variants={childVariants}
                data-imagine-id="productdetailcard-sku"
              >
                SKU: {product?.sku}
              </motion.p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
