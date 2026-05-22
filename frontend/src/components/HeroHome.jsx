import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import heroImg from '../assets/premium_kitchenware_hero_white_background.jpg';

const ArrowRight = Icons['ArrowRight'] || Icons['HelpCircle'];
const MessageCircle = Icons['MessageCircle'] || Icons['HelpCircle'];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.94, x: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { duration: 0.9, ease: 'easeOut', delay: 0.3 },
  },
};

function HeroHome() {
  const navigate = useNavigate();

  const handleBrowse = () => {
    navigate('/catalog');
  };

  const handleContact = () => {
    const el = document.getElementById('contact-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/contact');
    }
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-white"
      aria-label="Hero Section"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-amber-50/60 via-white/0 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/2 h-40 bg-gradient-to-t from-stone-50/80 to-transparent" />
        <svg
          className="absolute top-10 left-[-60px] opacity-5"
          width="420"
          height="420"
          viewBox="0 0 420 420"
          fill="none"
        >
          <circle cx="210" cy="210" r="210" stroke="#D4AF37" strokeWidth="1.5" />
          <circle cx="210" cy="210" r="160" stroke="#D4AF37" strokeWidth="1" />
          <circle cx="210" cy="210" r="110" stroke="#D4AF37" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="relative max-w-screen-xl mx-auto px-6 md:px-12 lg:px-16 py-20 md:py-28 lg:py-32 flex flex-col lg:flex-row items-center gap-14 lg:gap-20">
        <motion.div
          className="flex-1 flex flex-col items-start gap-7 z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <span
              data-imagine-id="herohome-eyebrow"
              className="inline-block text-xs font-semibold tracking-[0.22em] uppercase text-amber-600 bg-amber-50 border border-amber-200 rounded-full px-4 py-1.5"
            >
              NC Nandini Collections
            </span>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col gap-3">
            <h1
              data-imagine-id="herohome-title"
              className="font-raleway text-4xl md:text-5xl lg:text-6xl font-bold text-stone-900 leading-tight tracking-tight"
            >
              Elevate Every
              <br />
              <span className="relative inline-block">
                <span
                  data-imagine-id="herohome-title-accent"
                  className="text-stone-900"
                >
                  Kitchen Moment
                </span>
                <motion.span
                  aria-hidden="true"
                  className="absolute left-0 -bottom-1.5 h-[3px] w-full rounded-full"
                  style={{}}
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, ease: 'easeOut', delay: 0.9 }}
                >
                  <span
                    className="block h-full w-full rounded-full"
                    style={{ background: 'linear-gradient(90deg, #D4AF37 0%, #f5d97b 60%, #D4AF37 100%)' }}
                  />
                </motion.span>
              </span>
            </h1>
          </motion.div>

          <motion.p
            data-imagine-id="herohome-tagline"
            variants={itemVariants}
            className="text-base md:text-lg text-stone-500 font-light leading-relaxed max-w-md font-raleway"
          >
            Premium cookware, bakeware, and serving collections crafted for the modern home. Designed for beauty, built for performance.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto"
          >
            <motion.button
              data-imagine-id="herohome-cta-browse"
              onClick={handleBrowse}
              className="inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-sm font-semibold tracking-wide text-white shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 font-raleway"
              style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #c49b22 100%)', boxShadow: '0 4px 24px 0 rgba(212,175,55,0.28)' }}
              whileHover={{ scale: 1.045, boxShadow: '0 8px 32px 0 rgba(212,175,55,0.38)' }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.18 }}
              aria-label="Browse the full product collection"
            >
              Browse Collection
              <ArrowRight size={16} strokeWidth={2.2} />
            </motion.button>

            <motion.button
              data-imagine-id="herohome-cta-contact"
              onClick={handleContact}
              className="inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-sm font-semibold tracking-wide text-amber-700 bg-white border-2 border-amber-300 hover:border-amber-500 hover:text-amber-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 font-raleway transition-colors duration-200"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.18 }}
              aria-label="Contact us via WhatsApp or form"
            >
              <MessageCircle size={16} strokeWidth={2.2} />
              Contact Us
            </motion.button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex items-center gap-8 pt-2"
          >
            {[
              { value: '200+', label: 'Products' },
              { value: '15+', label: 'Years Crafting' },
              { value: '50K+', label: 'Happy Homes' },
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col items-start gap-0.5">
                <span
                  data-imagine-id={`herohome-stat-${idx}-value`}
                  className="text-xl font-bold text-stone-900 font-raleway"
                >
                  {stat?.value}
                </span>
                <span
                  data-imagine-id={`herohome-stat-${idx}-label`}
                  className="text-xs text-stone-400 tracking-wide font-raleway"
                >
                  {stat?.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="flex-1 w-full flex items-center justify-center z-10"
          variants={imageVariants}
          initial="hidden"
          animate="visible"
        >
          <div
            className="relative w-full max-w-lg lg:max-w-xl"
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-3xl"
              style={{
                background: 'radial-gradient(ellipse at 60% 60%, rgba(212,175,55,0.13) 0%, transparent 72%)',
                filter: 'blur(2px)',
                transform: 'scale(1.06)',
              }}
            />
            <motion.div
              className="relative rounded-3xl overflow-hidden"
              style={{ boxShadow: '0 8px 48px 0 rgba(212,175,55,0.18), 0 2px 12px 0 rgba(30,20,0,0.10)' }}
              whileHover={{ scale: 1.018, boxShadow: '0 16px 64px 0 rgba(212,175,55,0.28), 0 4px 20px 0 rgba(30,20,0,0.12)' }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <img
                data-imagine-id="herohome-product-image"
                src={heroImg}
                alt="Premium NC Nandini Collections kitchenware set on white background"
                className="w-full h-[340px] md:h-[420px] lg:h-[500px] object-cover block"
                onError={(e) => {
                  e.currentTarget.src = 'https://placehold.co/800x500/f5f0e8/D4AF37?text=NC+Nandini+Collections';
                }}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{ boxShadow: 'inset 0 0 0 1.5px rgba(212,175,55,0.22)' }}
              />
            </motion.div>

            <motion.div
              className="absolute -bottom-5 -left-5 bg-white rounded-2xl px-5 py-3.5 flex items-center gap-3"
              style={{ boxShadow: '0 4px 24px 0 rgba(212,175,55,0.16), 0 1px 6px 0 rgba(0,0,0,0.07)' }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.55, ease: 'easeOut' }}
            >
              <span
                className="flex items-center justify-center w-9 h-9 rounded-full"
                style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #f5d97b 100%)' }}
                aria-hidden="true"
              >
                <Icons.Star size={16} fill="#fff" stroke="#fff" />
              </span>
              <div className="flex flex-col">
                <span
                  data-imagine-id="herohome-badge-title"
                  className="text-xs font-semibold text-stone-800 font-raleway leading-tight"
                >
                  Premium Quality
                </span>
                <span
                  data-imagine-id="herohome-badge-sub"
                  className="text-[11px] text-stone-400 font-raleway"
                >
                  ISI Certified
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default HeroHome;
