import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import slide1Img from '../assets/premium_kitchenware_hero_background.jpg';
import slide2Img from '../assets/elegant_cookware_set_minimal.jpg';
import slide3Img from '../assets/modern_kitchen_aesthetic.jpg';

const DEFAULT_SLIDES = [
  {
    id: 1,
    image: slide1Img,
    headline: 'Crafted for the Discerning Kitchen',
    subHeadline: 'Where precision meets elegance — premium kitchenware for modern living.',
    accent: 'New Collection 2025',
  },
  {
    id: 2,
    image: slide2Img,
    headline: 'Cookware That Inspires',
    subHeadline: 'Timeless materials, refined by artisan hands. Elevate every meal.',
    accent: 'Signature Series',
  },
  {
    id: 3,
    image: slide3Img,
    headline: 'A Legacy of Culinary Excellence',
    subHeadline: 'NC Nandini Collections — where every piece tells a story of quality.',
    accent: 'Est. Heritage Line',
  },
];

const ChevronLeftIcon = Icons['ChevronLeft'] || Icons['HelpCircle'];
const ChevronRightIcon = Icons['ChevronRight'] || Icons['HelpCircle'];

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction > 0 ? '-100%' : '100%',
    opacity: 0,
  }),
};

const contentVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: 'easeOut',
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const childVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function HeroSlider({ slides }) {
  const resolvedSlides = slides?.length ? slides : DEFAULT_SLIDES;
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const [imgErrors, setImgErrors] = useState({});

  const total = resolvedSlides?.length ?? 0;

  const goTo = useCallback(
    (index, dir) => {
      setDirection(dir);
      setCurrent(index);
    },
    []
  );

  const goPrev = useCallback(() => {
    const prevIndex = (current - 1 + total) % total;
    goTo(prevIndex, -1);
  }, [current, total, goTo]);

  const goNext = useCallback(() => {
    const nextIndex = (current + 1) % total;
    goTo(nextIndex, 1);
  }, [current, total, goTo]);

  useEffect(() => {
    if (paused || total < 2) return;
    const timer = setTimeout(() => {
      goNext();
    }, 5500);
    return () => clearTimeout(timer);
  }, [current, paused, goNext, total]);

  const handleImgError = (id) => {
    setImgErrors((prev) => ({ ...prev, [id]: true }));
  };

  const slide = resolvedSlides?.[current];

  return (
    <section
      className="relative w-full min-h-[64vh] overflow-hidden bg-[#1a0e04] select-none"
      aria-label="NC Nandini Collections Hero Slider"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence initial={false} custom={direction} mode="sync">
        <motion.div
          key={slide?.id}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.72, ease: 'easeInOut' }}
          className="absolute inset-0 w-full h-full"
        >
          {!imgErrors?.[slide?.id] ? (
            <img
              src={slide?.image}
              alt={slide?.headline}
              onError={() => handleImgError(slide?.id)}
              className="w-full h-full object-cover object-center"
              draggable={false}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#3b1c03] to-[#1a0e04]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/65" />
          <div
            className="absolute inset-0"
            style={{}}
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.07)_0%,transparent_70%)]" />
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-[64vh] px-6 py-16 md:px-12 lg:px-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${slide?.id}`}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -16, transition: { duration: 0.3 } }}
            className="flex flex-col items-center text-center max-w-3xl mx-auto"
          >
            <motion.div variants={childVariant} className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-[#D4AF37]" />
              <span className="text-[#D4AF37] font-raleway text-xs tracking-[0.22em] uppercase font-semibold">
                {slide?.accent}
              </span>
              <span className="w-8 h-px bg-[#D4AF37]" />
            </motion.div>

            <motion.div variants={childVariant} className="mb-5">
              <span
                className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
                style={{ textShadow: '0 4px 32px rgba(0,0,0,0.45)' }}
              >
                {slide?.headline}
              </span>
            </motion.div>

            <motion.div
              variants={childVariant}
              className="w-14 h-[2px] bg-[#D4AF37] mb-5 rounded-full"
            />

            <motion.p
              variants={childVariant}
              className="font-raleway text-base md:text-lg text-white/80 leading-relaxed max-w-xl font-light tracking-wide"
            >
              {slide?.subHeadline}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.button
        aria-label="Previous slide"
        onClick={goPrev}
        whileHover={{ scale: 1.08, boxShadow: '0 0 18px 2px rgba(212,175,55,0.32)' }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-13 md:h-13 rounded-full border border-[#D4AF37]/60 bg-black/20 backdrop-blur-sm flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
      >
        <ChevronLeftIcon size={20} strokeWidth={1.5} />
      </motion.button>

      <motion.button
        aria-label="Next slide"
        onClick={goNext}
        whileHover={{ scale: 1.08, boxShadow: '0 0 18px 2px rgba(212,175,55,0.32)' }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-13 md:h-13 rounded-full border border-[#D4AF37]/60 bg-black/20 backdrop-blur-sm flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
      >
        <ChevronRightIcon size={20} strokeWidth={1.5} />
      </motion.button>

      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3" role="tablist" aria-label="Slide indicators">
        {resolvedSlides?.map((s, i) => (
          <motion.button
            key={s?.id ?? i}
            role="tab"
            aria-selected={i === current}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goTo(i, i > current ? 1 : -1)}
            animate={{
              width: i === current ? 28 : 8,
              backgroundColor: i === current ? '#D4AF37' : 'rgba(212,175,55,0.35)',
              opacity: i === current ? 1 : 0.7,
            }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="h-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] cursor-pointer"
          />
        ))}
      </div>

      <div className="absolute top-7 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 pointer-events-none">
        <span
          className="font-playfair text-[#D4AF37] text-2xl font-bold tracking-widest"
          style={{ textShadow: '0 2px 12px rgba(212,175,55,0.35)' }}
        >
          NC
        </span>
        <span className="w-6 h-px bg-[#D4AF37]/60" />
      </div>
    </section>
  );
}