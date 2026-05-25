import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import * as Icons from 'lucide-react';
import modernKitchenImg from '../assets/modern_kitchen_aesthetic.jpg';

const MapPinIcon = Icons['MapPin'] || Icons['HelpCircle'];
const AwardIcon = Icons['Award'] || Icons['HelpCircle'];
const LeafIcon = Icons['Leaf'] || Icons['HelpCircle'];
const HeartIcon = Icons['Heart'] || Icons['HelpCircle'];
const ArrowRightIcon = Icons['ArrowRight'] || Icons['HelpCircle'];

const pillars = [
  {
    icon: AwardIcon,
    title: 'Craftsmanship',
    desc: 'Every piece designed with meticulous attention to detail, ensuring lasting quality in your kitchen.',
  },
  {
    icon: LeafIcon,
    title: 'Sustainability',
    desc: 'Eco-conscious materials and processes that respect both your home and the environment.',
  },
  {
    icon: HeartIcon,
    title: 'Community',
    desc: 'Rooted in Namdevwada, serving families across Nizamabad with warmth and dedication.',
  },
];

const stats = [
  { value: '500+', label: 'Products' },
  { value: '10K+', label: 'Customers' },
  { value: '15+', label: 'Years' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' } },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: 'easeOut' } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: 'easeOut', delay: 0.18 } },
};

export default function AboutSection() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#1a1a1a]"
    >
      {/* Ambient gold glows — matching footer */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[480px] h-[480px] rounded-full bg-[#D4AF37]/[0.025] blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[360px] h-[360px] rounded-full bg-[#D4AF37]/[0.03] blur-3xl" />
      </div>

      {/* Top gold rule */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent" />

      <motion.div
        ref={sectionRef}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={containerVariants}
        className="relative max-w-screen-xl mx-auto px-6 md:px-10 lg:px-14 py-20 md:py-28"
      >
        {/* Section eyebrow */}
        <motion.div variants={itemVariants} className="flex flex-col items-center text-center mb-16 md:mb-20">
          <p className="font-raleway text-[10px] font-semibold tracking-[0.35em] uppercase text-[#D4AF37] mb-4">
            Our Story
          </p>
          <h2 className="font-cinzel text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight max-w-2xl">
            Where Elegance Meets{' '}
            <span className="text-[#D4AF37]">Everyday Cooking</span>
          </h2>
          <div className="mt-6 w-14 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* LEFT — image */}
          <motion.div
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={fadeLeft}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-3xl aspect-[4/5] shadow-[0_24px_60px_rgba(0,0,0,0.5)]">
              <motion.img
                src={modernKitchenImg}
                alt="NC Nandini Collections kitchen"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/70 via-transparent to-transparent" />
              {/* Gold border accent */}
              <div className="absolute inset-0 rounded-3xl ring-1 ring-[#D4AF37]/20 pointer-events-none" />
              {/* Location badge */}
              <div className="absolute bottom-6 left-6 flex items-center gap-2.5 bg-[#1a1a1a]/85 backdrop-blur-sm rounded-full px-4 py-2.5 border border-[#D4AF37]/30">
                <MapPinIcon size={13} className="text-[#D4AF37] shrink-0" />
                <span className="font-raleway text-xs font-semibold tracking-wider text-white/80 uppercase">
                  Namdevwada, Nizamabad
                </span>
              </div>
            </div>

            {/* Stats bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
              className="mt-5 grid grid-cols-3 gap-3"
            >
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center py-4 px-2 rounded-2xl border border-[#D4AF37]/20 bg-white/[0.03]"
                >
                  <span className="font-cinzel text-xl font-semibold text-[#D4AF37]">{s.value}</span>
                  <span className="font-raleway text-[10px] tracking-[0.2em] uppercase text-white/35 mt-0.5">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT — text content */}
          <motion.div
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={fadeRight}
            className="flex flex-col gap-8"
          >
            <div className="space-y-5">
              <p className="font-raleway text-base md:text-lg text-white/60 leading-relaxed font-light">
                <span className="float-left font-cinzel text-5xl leading-none text-[#D4AF37] mr-2 mt-1">N</span>
                C Nandini Collections was founded with a singular vision: to bring premium kitchenware to every household without compromise. Nestled in the heart of Namdevwada, our factory is where tradition meets modern design.
              </p>
              <p className="font-raleway text-sm text-white/40 leading-relaxed font-light">
                From the selection of raw materials to the final polish on every product, our team of skilled craftspeople ensures that each piece leaving our workshop reflects the excellence NC Nandini stands for.
              </p>
              <p className="font-raleway text-sm text-white/40 leading-relaxed font-light">
                Our catalog spans premium stainless steel cookware, artisan serving sets, and precision tools — all curated to elevate your culinary experience.
              </p>
            </div>

            {/* Gold divider */}
            <div className="w-full h-px bg-gradient-to-r from-[#D4AF37]/40 via-[#D4AF37]/20 to-transparent" />

            {/* Three pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {pillars.map((p, i) => {
                const Icon = p.icon;
                return (
                  <motion.div
                    key={i}
                    whileHover={{ y: -4, boxShadow: '0 8px 28px rgba(212,175,55,0.10)' }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col gap-3 p-5 rounded-2xl bg-white/[0.04] border border-[#D4AF37]/15 cursor-default"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center shrink-0">
                      <Icon size={17} className="text-[#D4AF37]" />
                    </div>
                    <div>
                      <h4 className="font-raleway text-xs font-semibold tracking-[0.18em] uppercase text-white/80 mb-1.5">
                        {p.title}
                      </h4>
                      <p className="font-raleway text-xs text-white/35 leading-relaxed">
                        {p.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA row */}
            <div className="flex flex-wrap gap-4 pt-2">
              <motion.a
                href="/catalog"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2.5 bg-[#D4AF37] text-[#1a1a1a] font-raleway text-xs font-semibold tracking-[0.18em] uppercase px-7 py-3.5 rounded-full shadow-md hover:bg-[#e0c050] transition-colors duration-300"
              >
                View Catalog
                <ArrowRightIcon size={13} />
              </motion.a>
              <motion.a
                href="https://wa.me/918008890044?text=Hi%2C%20I%20am%20interested%20in%20buying%20this%20product.%20Can%20you%20guide%20me%20further%3F"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2.5 border border-[#D4AF37]/40 text-[#D4AF37] font-raleway text-xs font-semibold tracking-[0.18em] uppercase px-7 py-3.5 rounded-full hover:bg-[#D4AF37]/10 hover:border-[#D4AF37] transition-all duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
                WhatsApp Inquiry
              </motion.a>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom gold rule */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
    </section>
  );
}
