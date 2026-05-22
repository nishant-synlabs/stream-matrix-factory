import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ContactSection = lazy(() => import('../components/ContactSection'));

const NAV_LINKS = [
  { label: 'Home', route: '/' },
  { label: 'Catalog', route: '/catalog' },
  { label: 'About', route: '/about' },
  { label: 'Contact', route: '/contact' },
];

const FOOTER_LINKS = [
  { label: 'Catalog', route: '/catalog' },
  { label: 'About', route: '/about' },
  { label: 'Contact', route: '/contact' },
];

const WhatsAppSVGLarge = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 175.216 175.552"
    className="w-full h-full"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="wa-grad" x1="85.915%" x2="14.083%" y1="14.084%" y2="85.916%">
        <stop offset="0%" stopColor="#57d163" />
        <stop offset="100%" stopColor="#23b33a" />
      </linearGradient>
    </defs>
    <path
      fill="url(#wa-grad)"
      d="M87.608 0C39.222 0 0 39.222 0 87.608c0 16.04 4.374 31.04 11.994 43.956L0 175.552l45.357-11.867A87.302 87.302 0 0087.608 175.216c48.386 0 87.608-39.222 87.608-87.608C175.216 39.222 135.994 0 87.608 0z"
    />
    <path
      fill="#fff"
      d="M131.204 101.91c-1.95-.975-11.544-5.696-13.334-6.347-1.79-.651-3.093-.975-4.395.975-1.303 1.95-5.046 6.347-6.186 7.65-1.14 1.302-2.28 1.465-4.232.488-1.95-.975-8.228-3.035-15.669-9.668-5.79-5.17-9.7-11.552-10.84-13.503-1.14-1.95-.122-3.003.856-3.973.878-.871 1.95-2.276 2.927-3.415.975-1.14 1.302-1.95 1.952-3.253.651-1.302.326-2.44-.163-3.415-.488-.975-4.395-10.57-6.022-14.476-1.583-3.8-3.19-3.285-4.395-3.347-1.14-.057-2.44-.069-3.742-.069-1.303 0-3.415.488-5.208 2.44-1.79 1.95-6.836 6.672-6.836 16.268s6.998 18.87 7.975 20.173c.976 1.302 13.77 21.02 33.375 29.477 4.662 2.013 8.306 3.213 11.143 4.115 4.682 1.488 8.942 1.278 12.305.775 3.753-.56 11.544-4.72 13.172-9.28 1.628-4.558 1.628-8.468 1.14-9.28-.488-.813-1.79-1.302-3.742-2.277z"
    />
  </svg>
);

const GoldMapPinSVG = () => (
  <svg
    viewBox="0 0 120 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
    aria-hidden="true"
  >
    <ellipse cx="60" cy="155" rx="28" ry="5" fill="#D4AF37" opacity="0.18" />
    <path
      d="M60 8C36.804 8 18 26.804 18 50c0 30 42 98 42 98s42-68 42-98C102 26.804 83.196 8 60 8z"
      fill="#D4AF37"
      opacity="0.15"
      stroke="#D4AF37"
      strokeWidth="2"
    />
    <path
      d="M60 12C38.46 12 21 29.46 21 51c0 29.5 39 94 39 94s39-64.5 39-94C99 29.46 81.54 12 60 12z"
      stroke="#D4AF37"
      strokeWidth="2.5"
      fill="none"
    />
    <circle cx="60" cy="50" r="16" stroke="#D4AF37" strokeWidth="2.5" fill="none" />
    <circle cx="60" cy="50" r="6" fill="#D4AF37" opacity="0.7" />
    <circle cx="60" cy="50" r="3" fill="#D4AF37" />
    <line x1="60" y1="34" x2="60" y2="30" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="60" y1="70" x2="60" y2="66" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="44" y1="50" x2="40" y2="50" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="80" y1="50" x2="76" y2="50" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const WHATSAPP_PHONE = '918008890044';
const WHATSAPP_MESSAGE = 'Hi, I am interested in buying this product. Can you guide me further?';

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.13, delayChildren: 0.08 },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' } },
};

const leftVariant = {
  hidden: { opacity: 0, x: -36 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.72, ease: 'easeOut' } },
};

const rightVariant = {
  hidden: { opacity: 0, x: 36 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.72, ease: 'easeOut', delay: 0.18 } },
};

function ContactHeroSection() {
  const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <section
      id="contact"
      className="w-full bg-white min-h-[72vh] flex items-center py-20 md:py-28 lg:py-32"
    >
      <div className="max-w-screen-xl mx-auto w-full px-6 md:px-12 lg:px-16">
        <motion.div
          className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
          variants={sectionVariants}
        >
          <motion.div
            className="flex-1 flex flex-col items-start justify-center w-full"
            variants={leftVariant}
          >
            <motion.span
              variants={itemVariant}
              className="inline-block font-raleway text-[10px] font-bold tracking-[0.38em] uppercase text-[#D4AF37] mb-5 border border-[#D4AF37]/30 px-4 py-1.5 rounded-full"
            >
              Contact Us
            </motion.span>

            <motion.h1
              variants={itemVariant}
              className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold text-[#3b1c03] leading-[1.08] tracking-tight mb-6"
            >
              Let&apos;s
              <br />
              <span className="text-[#D4AF37]">Connect.</span>
            </motion.h1>

            <motion.p
              variants={itemVariant}
              className="font-raleway text-base md:text-lg text-[#3b1c03]/65 max-w-md leading-relaxed mb-10"
            >
              Visit our showroom in Namdevwada, Nizamabad or reach out instantly
              on WhatsApp. We&apos;re here to guide you to the finest premium kitchenware.
            </motion.p>

            <motion.div
              variants={itemVariant}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full"
            >
              <motion.a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#25D366] text-white font-raleway font-bold text-sm uppercase tracking-[0.18em] px-9 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.03, backgroundColor: '#1ebe59' }}
                whileTap={{ scale: 0.97 }}
                aria-label="Chat on WhatsApp with pre-filled message"
              >
                <span className="w-6 h-6 flex-shrink-0">
                  <WhatsAppSVGLarge />
                </span>
                WhatsApp Us
              </motion.a>

              <motion.a
                href={`tel:+${WHATSAPP_PHONE}`}
                className="inline-flex items-center gap-2 font-raleway text-sm font-semibold text-[#3b1c03] uppercase tracking-[0.14em] border-b-2 border-[#D4AF37] pb-0.5 hover:text-[#D4AF37] transition-colors duration-200"
                whileHover={{ x: 4 }}
                aria-label="Call NC Kitchenware"
              >
                Call Us
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex-1 flex flex-col justify-center w-full gap-10"
            variants={rightVariant}
          >
            <motion.div
              className="flex items-start gap-5 pb-8 border-b border-[#D4AF37]/20"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-14 h-14 flex-shrink-0">
                <GoldMapPinSVG />
              </div>
              <div>
                <p className="font-raleway text-[10px] font-bold uppercase tracking-[0.28em] text-[#D4AF37] mb-2">
                  Location
                </p>
                <p className="font-playfair text-xl font-semibold text-[#3b1c03] leading-snug mb-1">
                  Namdevwada, Nizamabad
                </p>
                <p className="font-raleway text-sm text-[#3b1c03]/55">
                  Telangana, India
                </p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-start gap-5 pb-8 border-b border-[#D4AF37]/20"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-14 h-14 flex-shrink-0 flex items-center justify-center">
                <span className="w-10 h-10 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" aria-hidden="true">
                    <rect x="3" y="5" width="18" height="14" rx="2" stroke="#D4AF37" strokeWidth="1.6" />
                    <path d="M3 8l9 5 9-5" stroke="#D4AF37" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </span>
              </div>
              <div>
                <p className="font-raleway text-[10px] font-bold uppercase tracking-[0.28em] text-[#D4AF37] mb-2">
                  WhatsApp
                </p>
                <motion.a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-playfair text-xl font-semibold text-[#3b1c03] leading-snug hover:text-[#D4AF37] transition-colors duration-200"
                  whileHover={{ scale: 1.01 }}
                  aria-label="Open WhatsApp chat"
                >
                  Message Us
                </motion.a>
                <p className="font-raleway text-sm text-[#3b1c03]/55 mt-0.5">
                  Pre-filled: &ldquo;Hi, I am interested in buying this product. Can you guide me further?&rdquo;
                </p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-start gap-5"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-14 h-14 flex-shrink-0 flex items-center justify-center">
                <span className="w-10 h-10 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" stroke="#D4AF37" strokeWidth="1.6" />
                    <path d="M12 7v5l3 3" stroke="#D4AF37" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
              <div>
                <p className="font-raleway text-[10px] font-bold uppercase tracking-[0.28em] text-[#D4AF37] mb-2">
                  Store Hours
                </p>
                <p className="font-playfair text-base font-semibold text-[#3b1c03] leading-relaxed">
                  Mon – Sat: 9:00 AM – 8:00 PM
                </p>
                <p className="font-raleway text-sm text-[#3b1c03]/55">
                  Sunday: 10:00 AM – 6:00 PM
                </p>
              </div>
            </motion.div>

            <motion.a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-full border-t border-b border-[#D4AF37]/20 bg-white py-8 px-6 md:px-10 flex items-center gap-5 md:gap-8 overflow-hidden"
              whileHover={{ backgroundColor: '#fcfaf4' }}
              whileTap={{ scale: 0.998 }}
              aria-label="Open WhatsApp with pre-filled message"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#25D366]/4 via-transparent to-[#D4AF37]/6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <div className="w-12 h-12 md:w-14 md:h-14 flex-shrink-0 relative z-10">
                <WhatsAppSVGLarge />
              </div>
              <div className="flex flex-col items-start relative z-10 flex-1 min-w-0">
                <span className="font-raleway text-[10px] md:text-xs font-bold uppercase tracking-[0.28em] text-[#D4AF37]">
                  Quick Chat
                </span>
                <span className="font-playfair text-lg md:text-2xl font-semibold text-[#3b1c03] leading-snug">
                  Say &ldquo;Hi, I am interested in buying this product. Can you guide me further?&rdquo;
                </span>
              </div>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-5 h-5 md:w-6 md:h-6 text-[#D4AF37] relative z-10 group-hover:translate-x-1 transition-transform duration-200 flex-shrink-0"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function ContactDecorator() {
  return (
    <div className="w-full bg-[#f5f5f5] py-12 overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-16">
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-[1.5px] bg-[#D4AF37]" />
            <p className="font-raleway text-xs font-bold uppercase tracking-[0.3em] text-[#3b1c03]/50">
              NC Nandini Collections
            </p>
          </div>
          <div className="hidden md:flex items-center gap-3">
            {['Premium Quality', 'Artisan Crafted', 'Direct Factory'].map((tag, i) => (
              <span
                key={i}
                className="font-raleway text-[10px] font-bold uppercase tracking-[0.22em] text-[#3b1c03]/40 border border-[#D4AF37]/25 rounded-full px-4 py-1.5"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <p className="font-raleway text-xs font-bold uppercase tracking-[0.3em] text-[#3b1c03]/50">
              Namdevwada · Nizamabad
            </p>
            <div className="w-10 h-[1.5px] bg-[#D4AF37]" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function Contact() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header navLinks={NAV_LINKS} />
      <main className="flex-1 flex flex-col">
        <ContactHeroSection />
        <ContactDecorator />
        <Suspense
          fallback={
            <div className="w-full py-32 flex items-center justify-center">
              <span className="font-raleway text-sm uppercase tracking-[0.2em] text-[#D4AF37] animate-pulse">
                Loading&hellip;
              </span>
            </div>
          }
        >
          <ContactSection />
        </Suspense>
      </main>
      <Footer footer_links={FOOTER_LINKS} />
    </div>
  );
}
