import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import heroImg from '../assets/premium_kitchenware_hero_background.jpg';

export default function HeroSection({ cta_action }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: 'easeOut',
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.96 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: 'easeOut',
        delay: 0.4,
      },
    },
  };

  const ArrowRightIcon = Icons['ArrowRight'] || Icons['HelpCircle'];

  return (
    <section
      className="relative min-h-[70vh] w-full overflow-hidden bg-white"
      style={{ zIndex: 1 }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 100%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.3) 40%, rgba(255,255,255,0) 70%)',
        }}
      />

      <div className="relative max-w-screen-xl mx-auto px-8 py-8 md:px-10 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-16 min-h-[70vh]">
          <motion.div
            className="flex flex-col items-center md:items-start text-center md:text-left max-w-2xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.span
              className="inline-block text-xs md:text-sm font-medium uppercase tracking-[0.25em] text-[#23272c]/70 mb-6"
              variants={itemVariants}
            >
              Premium Kitchenware — Namdevwada, Nizamabad
            </motion.span>

            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight text-[#23272c] mb-6"
              style={{ fontFamily: "'Raleway', sans-serif" }}
              variants={itemVariants}
            >
              Nandini
            </motion.h1>

            <motion.p
              className="text-base md:text-lg text-[#23272c]/65 leading-relaxed max-w-lg mb-10"
              variants={itemVariants}
            >
              Crafted for the modern kitchen. Curated with precision, delivered
              with care. Experience kitchenware that elevates every meal you
              prepare.
            </motion.p>

            <motion.button
              onClick={cta_action}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-[#23272c] text-white text-sm font-semibold uppercase tracking-wider rounded-full shadow-[0_4px_32px_rgba(30,40,64,0.14)] transition-all duration-300 hover:shadow-[0_8px_48px_rgba(30,40,64,0.22)] hover:scale-[1.02] active:scale-[0.98]"
              variants={itemVariants}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              Chat on WhatsApp
              <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.button>
          </motion.div>

          <motion.div
            className="relative w-full md:w-1/2 lg:w-[45%] flex-shrink-0"
            variants={imageVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-[0_4px_32px_rgba(30,40,64,0.14)]">
              <img
                src={heroImg}
                alt="Premium kitchenware collection with elegant diffused lighting"
                className="w-full h-auto object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              {/* Left-edge fade overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0.55) 22%, rgba(255,255,255,0) 55%)',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
