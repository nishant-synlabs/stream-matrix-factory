import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import * as Icons from 'lucide-react';
import modernKitchenImg from '../assets/modern_kitchen_interior_white.jpg';
import premiumCookwareImg from '../assets/premium_kitchenware_cookware_set.jpg';
import elegantServingImg from '../assets/elegant_serving_set.jpg';
import stainlessCookwareImg from '../assets/stainless_steel_cookware_premium.jpg';

const MapPinIcon = Icons['MapPin'] || Icons['HelpCircle'];
const AwardIcon = Icons['Award'] || Icons['HelpCircle'];
const LeafIcon = Icons['Leaf'] || Icons['HelpCircle'];
const ShieldCheckIcon = Icons['ShieldCheck'] || Icons['HelpCircle'];
const StarIcon = Icons['Star'] || Icons['HelpCircle'];
const UsersIcon = Icons['Users'] || Icons['HelpCircle'];
const PackageIcon = Icons['Package'] || Icons['HelpCircle'];
const ChevronDownIcon = Icons['ChevronDown'] || Icons['HelpCircle'];

const VALUES = [
  {
    icon: 'Award',
    title: 'Heritage Craftsmanship',
    description: 'Decades of manufacturing excellence passed through generations of artisans in Nizamabad.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Premium Quality Assurance',
    description: 'Every piece undergoes rigorous quality checks to meet international standards before reaching your kitchen.',
  },
  {
    icon: 'Leaf',
    title: 'Sustainable Sourcing',
    description: 'We partner with responsible suppliers to ensure eco-conscious materials and ethical production.',
  },
  {
    icon: 'Users',
    title: 'Community Rooted',
    description: 'Proudly supporting local employment and artisan communities in Namdevwada and surrounding regions.',
  },
  {
    icon: 'Star',
    title: 'Trusted by Thousands',
    description: 'From home cooks to professional kitchens, NC Nandini Collections is a name synonymous with trust.',
  },
];

const GALLERY_IMAGES = [
  { src: premiumCookwareImg, alt: 'Premium cookware set', label: 'Cookware' },
  { src: elegantServingImg, alt: 'Elegant serving set', label: 'Serving' },
  { src: stainlessCookwareImg, alt: 'Stainless steel cookware', label: 'Stainless Steel' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

function GoldDivider() {
  return (
    <div className="flex items-center gap-3 my-6">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#D4AF37] opacity-40" />
      <div className="w-2 h-2 rounded-full bg-[#D4AF37] opacity-80" />
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#D4AF37] opacity-40" />
    </div>
  );
}

function ValueCard({ item, index }) {
  const Icon = Icons[item?.icon] || Icons['HelpCircle'];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      variants={itemVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      whileHover={{ y: -4, boxShadow: '0 8px 32px 0 rgba(212,175,55,0.13)' }}
      className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-[#D4AF37]/10 shadow-sm cursor-default"
      data-imagine-id={`about-brand-value-card-${index}`}
    >
      <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center">
        <Icon size={22} className="text-[#D4AF37]" />
      </div>
      <div>
        <h4
          className="font-playfair text-[#1a1a1a] text-base font-semibold mb-1"
          data-imagine-id={`about-brand-value-title-${index}`}
        >
          {item?.title}
        </h4>
        <p
          className="font-raleway text-[#555] text-sm leading-relaxed"
          data-imagine-id={`about-brand-value-desc-${index}`}
        >
          {item?.description}
        </p>
      </div>
    </motion.div>
  );
}

function MapPin() {
  const [active, setActive] = useState(false);

  return (
    <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden bg-[#f5f0e6] border border-[#D4AF37]/20 shadow-sm">
      <div
        className="absolute inset-0"
        style={{}}
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#D4AF37" strokeWidth="0.3" opacity="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          <circle cx="50%" cy="50%" r="80" fill="#D4AF37" fillOpacity="0.06" />
          <circle cx="50%" cy="50%" r="50" fill="#D4AF37" fillOpacity="0.08" />
        </svg>
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
        <motion.button
          onClick={() => setActive(v => !v)}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.95 }}
          className="flex flex-col items-center gap-1 focus:outline-none"
          aria-label="Show location details"
        >
          <motion.div
            animate={active ? { y: [0, -6, 0] } : {}}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="w-12 h-12 rounded-full bg-[#D4AF37] flex items-center justify-center shadow-lg"
          >
            <MapPinIcon size={24} className="text-white" />
          </motion.div>
          <span className="text-[#D4AF37] font-raleway text-xs font-semibold tracking-widest uppercase">
            Namdevwada
          </span>
        </motion.button>

        <motion.div
          initial={false}
          animate={active ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.92, y: 8 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="mt-2 bg-white/95 backdrop-blur-sm border border-[#D4AF37]/30 rounded-xl px-5 py-3 shadow-md text-center"
        >
          <p
            className="font-playfair text-[#1a1a1a] text-sm font-semibold"
            data-imagine-id="about-brand-map-location-title"
          >
            Namdevwada, Nizamabad
          </p>
          <p
            className="font-raleway text-[#888] text-xs mt-0.5"
            data-imagine-id="about-brand-map-location-state"
          >
            Telangana, India
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default function AboutBrandSection() {
  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const valuesRef = useRef(null);
  const originRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, margin: '-80px' });
  const storyInView = useInView(storyRef, { once: true, margin: '-80px' });
  const valuesInView = useInView(valuesRef, { once: true, margin: '-80px' });
  const originInView = useInView(originRef, { once: true, margin: '-80px' });

  return (
    <section className="relative w-full bg-white overflow-hidden">

      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#D4AF37] opacity-[0.03] blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-1/3 left-0 w-80 h-80 rounded-full bg-[#D4AF37] opacity-[0.04] blur-3xl -translate-x-1/2" />
      </div>

      <div
        ref={heroRef}
        className="relative w-full h-[480px] md:h-[560px] overflow-hidden"
      >
        <motion.img
          src={modernKitchenImg}
          alt="NC Nandini Collections kitchen"
          initial={{ scale: 1.08, opacity: 0 }}
          animate={heroInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 1.1, ease: 'easeOut' }}
          className="absolute inset-0 w-full h-full object-cover"
          onError={e => { e.currentTarget.style.display = 'none'; }}
          data-imagine-id="about-brand-hero-image"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-white" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="font-raleway text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-4"
            data-imagine-id="about-brand-hero-eyebrow"
          >
            Our Story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35, ease: 'easeOut' }}
            className="font-playfair text-white text-4xl md:text-6xl font-bold leading-tight max-w-3xl"
            data-imagine-id="about-brand-hero-title"
          >
            Crafted with Purpose,
            <br />
            <span className="text-[#D4AF37]">Born in Nizamabad</span>
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={heroInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.7, ease: 'easeOut' }}
            className="mt-6 w-16 h-0.5 bg-[#D4AF37] origin-center"
          />
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 md:px-8 py-16 md:py-24">

        <motion.div
          ref={storyRef}
          variants={containerVariants}
          initial="hidden"
          animate={storyInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20 md:mb-28"
        >
          <motion.div variants={fadeInLeft}>
            <p
              className="font-raleway text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-4"
              data-imagine-id="about-brand-story-eyebrow"
            >
              Who We Are
            </p>
            <h2
              className="font-playfair text-[#1a1a1a] text-3xl md:text-4xl font-bold leading-snug mb-6"
              data-imagine-id="about-brand-story-heading"
            >
              NC Nandini Collections
            </h2>
            <p className="font-raleway text-[#444] text-base leading-relaxed mb-5">
              <span className="float-left text-6xl leading-none font-playfair text-[#D4AF37] mr-2 mt-1">N</span>
              <span data-imagine-id="about-brand-story-para1">
                C Nandini Collections was founded with a singular vision: to bring premium kitchenware to every household without compromise. Nestled in the heart of Namdevwada, our factory is where tradition meets modern design.
              </span>
            </p>
            <p
              className="font-raleway text-[#555] text-base leading-relaxed mb-5"
              data-imagine-id="about-brand-story-para2"
            >
              From the selection of raw materials to the final polish on every product, our team of skilled craftspeople ensures that each piece leaving our workshop reflects the excellence NC Nandini stands for.
            </p>
            <p
              className="font-raleway text-[#555] text-base leading-relaxed"
              data-imagine-id="about-brand-story-para3"
            >
              Our catalog spans an extensive range — from high-grade stainless steel cookware to artisan serving sets — all designed to elevate your culinary experience, whether you are a passionate home cook or a seasoned professional chef.
            </p>

            <GoldDivider />

            <div className="flex flex-wrap gap-6 mt-2">
              {[
                { icon: 'Package', label: '500+ Products' },
                { icon: 'Users', label: '10,000+ Customers' },
                { icon: 'Award', label: '15+ Years Experience' },
              ].map((stat, idx) => {
                const StatIcon = Icons[stat?.icon] || Icons['HelpCircle'];
                return (
                  <div key={idx} className="flex items-center gap-2">
                    <StatIcon size={16} className="text-[#D4AF37]" />
                    <span
                      className="font-raleway text-[#1a1a1a] text-sm font-semibold"
                      data-imagine-id={`about-brand-stat-${idx}`}
                    >
                      {stat?.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div variants={fadeInRight} className="grid grid-cols-2 gap-3">
            {GALLERY_IMAGES.map((img, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className={`relative overflow-hidden rounded-2xl shadow-md ${
                  idx === 0 ? 'col-span-2 h-52 md:h-64' : 'h-36 md:h-44'
                }`}
              >
                <img
                  src={img?.src}
                  alt={img?.alt}
                  className="w-full h-full object-cover"
                  onError={e => { e.currentTarget.style.display = 'none'; }}
                  data-imagine-id={`about-brand-gallery-img-${idx}`}
                />
                <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-gradient-to-t from-black/50 to-transparent">
                  <span
                    className="font-raleway text-white text-xs tracking-widest uppercase"
                    data-imagine-id={`about-brand-gallery-label-${idx}`}
                  >
                    {img?.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          ref={valuesRef}
          initial="hidden"
          animate={valuesInView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="mb-20 md:mb-28"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <p
              className="font-raleway text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-3"
              data-imagine-id="about-brand-values-eyebrow"
            >
              Our Principles
            </p>
            <h2
              className="font-playfair text-[#1a1a1a] text-3xl md:text-4xl font-bold"
              data-imagine-id="about-brand-values-heading"
            >
              Heritage & Quality Values
            </h2>
            <div className="flex justify-center mt-4">
              <div className="w-12 h-0.5 bg-[#D4AF37]" />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {VALUES.map((val, idx) => (
              <ValueCard key={idx} item={val} index={idx} />
            ))}
          </div>
        </motion.div>

        <motion.div
          ref={originRef}
          initial="hidden"
          animate={originInView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start"
        >
          <motion.div variants={fadeInLeft}>
            <div className="relative bg-gradient-to-br from-[#D4AF37] to-[#b8952e] rounded-3xl p-8 md:p-10 text-white shadow-xl overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-white opacity-5 translate-x-12 -translate-y-12" />
              <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-white opacity-5 -translate-x-8 translate-y-8" />

              <div className="relative z-10">
                <p
                  className="font-raleway text-white/70 text-xs tracking-[0.3em] uppercase mb-4"
                  data-imagine-id="about-brand-origin-eyebrow"
                >
                  Our Origin
                </p>
                <h3
                  className="font-playfair text-white text-2xl md:text-3xl font-bold mb-6 leading-snug"
                  data-imagine-id="about-brand-origin-heading"
                >
                  Rooted in Namdevwada,
                  <br />Thriving in Nizamabad
                </h3>

                <div className="space-y-4">
                  {[
                    { icon: 'MapPin', label: 'Location', value: 'Namdevwada, Nizamabad' },
                    { icon: 'Package', label: 'District', value: 'Nizamabad, Telangana' },
                    { icon: 'Star', label: 'Established', value: 'Over 15 Years in Business' },
                    { icon: 'Users', label: 'Community', value: 'Local Artisans & Craftspeople' },
                  ].map((detail, idx) => {
                    const DetailIcon = Icons[detail?.icon] || Icons['HelpCircle'];
                    return (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <DetailIcon size={15} className="text-white" />
                        </div>
                        <div>
                          <p
                            className="font-raleway text-white/60 text-xs uppercase tracking-wider"
                            data-imagine-id={`about-brand-origin-label-${idx}`}
                          >
                            {detail?.label}
                          </p>
                          <p
                            className="font-raleway text-white text-sm font-semibold mt-0.5"
                            data-imagine-id={`about-brand-origin-value-${idx}`}
                          >
                            {detail?.value}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 pt-6 border-t border-white/20">
                  <p
                    className="font-raleway text-white/80 text-sm leading-relaxed"
                    data-imagine-id="about-brand-origin-quote"
                  >
                    "Every product we craft carries the soul of Namdevwada — a legacy of precision, pride, and an unwavering commitment to quality that has made NC Nandini Collections a household name across Telangana."
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeInRight} className="space-y-6">
            <div>
              <p
                className="font-raleway text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-3"
                data-imagine-id="about-brand-location-eyebrow"
              >
                Find Us
              </p>
              <h3
                className="font-playfair text-[#1a1a1a] text-2xl md:text-3xl font-bold mb-2"
                data-imagine-id="about-brand-location-heading"
              >
                Visit Our Factory
              </h3>
              <p
                className="font-raleway text-[#666] text-sm leading-relaxed"
                data-imagine-id="about-brand-location-desc"
              >
                We welcome trade inquiries and visits to our manufacturing facility in Namdevwada. Experience our craft firsthand.
              </p>
            </div>

            <MapPin />

            <div className="flex flex-col sm:flex-row gap-3">
              <motion.a
                href="https://wa.me/918008890044"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2 bg-[#D4AF37] text-white font-raleway font-semibold text-sm tracking-wide uppercase py-4 px-8 rounded-2xl shadow-md hover:bg-[#c49d2a] transition-colors"
                data-imagine-id="about-brand-whatsapp-cta"
              >
                <Icons.MessageCircle size={16} />
                WhatsApp Inquiry
              </motion.a>
              <motion.a
                href="/#contact"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2 bg-white text-[#1a1a1a] border border-[#D4AF37]/40 font-raleway font-semibold text-sm tracking-wide uppercase py-4 px-8 rounded-2xl shadow-sm hover:border-[#D4AF37] transition-colors"
                data-imagine-id="about-brand-contact-cta"
              >
                <Icons.Mail size={16} />
                Contact Us
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
