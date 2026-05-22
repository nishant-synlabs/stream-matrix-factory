import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import heroImg from '../assets/premium_kitchenware_hero_background.jpg';

const MessageCircleIcon = Icons['MessageCircle'] || Icons['HelpCircle'];
const MapPinIcon = Icons['MapPin'] || Icons['HelpCircle'];

export default function HeroBrandIntro() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.2,
      },
    },
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 36 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.72, ease: 'easeOut' },
    },
  };

  const underlineVariants = {
    hidden: { scaleX: 0, originX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 0.6, ease: 'easeOut', delay: 0.8 },
    },
  };

  return (
    <section
      className="relative w-full min-h-screen flex items-center overflow-hidden bg-white"
      aria-label="Hero Brand Introduction"
    >
      <div
        className="absolute inset-0 w-full h-full pointer-events-none select-none"
        aria-hidden="true"
      >
        <img
          src={heroImg}
          alt="Premium kitchenware background"
          data-imagine-id="herobrandintro-bg-image"
          className="w-full h-full object-cover object-center opacity-30 md:opacity-100"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-white md:via-white/30 md:to-white" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/50 to-white md:from-white/10 md:via-transparent md:to-white" />
      </div>

      <div className="relative z-10 w-full max-w-screen-xl mx-auto px-6 md:px-12 lg:px-16 py-24">
        <div className="flex flex-col items-center text-center md:items-end md:text-right md:ml-auto md:w-1/2 lg:w-5/12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center md:items-end gap-6"
          >
            <motion.div variants={fadeUpVariants} className="flex flex-col items-center md:items-end">
              <span
                data-imagine-id="herobrandintro-brand-label"
                className="font-raleway text-xs tracking-[0.3em] uppercase text-amber-600 mb-3 block"
              >
                Nandini Collections
              </span>
              <h1
                data-imagine-id="herobrandintro-main-title"
                className="font-playfair text-7xl md:text-8xl lg:text-9xl font-bold leading-none tracking-tight"
                style={{
                  background: 'linear-gradient(135deg, #b8962e 0%, #D4AF37 40%, #f5e27a 65%, #D4AF37 80%, #9a7a1e 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 2px 16px rgba(212,175,55,0.18))',
                }}
              >
                Nandini
              </h1>
            </motion.div>

            <motion.div
              variants={fadeUpVariants}
              className="flex flex-col items-center md:items-end gap-1"
            >
              <p
                data-imagine-id="herobrandintro-subtitle"
                className="font-raleway text-base md:text-lg tracking-widest text-neutral-700 uppercase font-medium"
              >
                Premium Kitchenware
              </p>
              <div className="flex items-center gap-2 justify-center md:justify-end">
                <MapPinIcon className="w-3.5 h-3.5 text-amber-500" />
                <span
                  data-imagine-id="herobrandintro-location"
                  className="font-raleway text-sm tracking-widest text-neutral-500 uppercase"
                >
                  Namdevwada, Nizamabad
                </span>
              </div>
            </motion.div>

            <motion.div variants={underlineVariants} className="w-24 h-px bg-amber-400 origin-left" />

            <motion.p
              variants={fadeUpVariants}
              data-imagine-id="herobrandintro-description"
              className="font-raleway text-sm md:text-base text-neutral-500 leading-relaxed max-w-xs md:max-w-sm"
            >
              Curated kitchenware crafted for the discerning home. Quality you can feel, elegance you can see.
            </motion.p>

            <motion.div variants={fadeUpVariants}>
              <motion.a
                href="https://wa.me/918008890044"
                target="_blank"
                rel="noopener noreferrer"
                data-imagine-id="herobrandintro-whatsapp-cta"
                aria-label="Inquire on WhatsApp"
                className="inline-flex items-center gap-3 bg-amber-400 hover:bg-amber-500 text-white font-raleway font-semibold tracking-wide text-sm uppercase px-10 py-4 rounded-full shadow-lg transition-colors duration-200"
                whileHover={{ scale: 1.04, boxShadow: '0 8px 32px 0 rgba(212,175,55,0.32)' }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 340, damping: 22 }}
              >
                <MessageCircleIcon className="w-4 h-4" />
                <span data-imagine-id="herobrandintro-cta-label">Inquire on WhatsApp</span>
              </motion.a>
            </motion.div>

            <motion.p
              variants={fadeUpVariants}
              data-imagine-id="herobrandintro-contact-hint"
              className="font-raleway text-xs text-neutral-400 tracking-wide"
            >
              +91 80088 90044 &mdash; We respond within minutes
            </motion.p>
          </motion.div>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        aria-hidden="true"
      >
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: [0, 1, 0], y: [0, 10, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 1.8 }}
          className="w-px h-10 bg-gradient-to-b from-amber-400 to-transparent"
        />
      </div>
    </section>
  );
}