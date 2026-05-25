import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Catalog', href: '/catalog' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/#contact' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const MapPinIcon = Icons['MapPin'] || Icons['HelpCircle'];
  const PhoneIcon = Icons['Phone'] || Icons['HelpCircle'];
  const MailIcon = Icons['Mail'] || Icons['HelpCircle'];
  const InstagramIcon = Icons['Instagram'] || Icons['HelpCircle'];
  const YoutubeIcon = Icons['Youtube'] || Icons['HelpCircle'];

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      variants={containerVariants}
      className="w-full bg-[#1a1a1a] text-white relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[480px] h-[480px] rounded-full bg-[#D4AF37]/[0.025] blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[360px] h-[360px] rounded-full bg-[#D4AF37]/[0.03] blur-3xl" />
        <div className="absolute top-1/2 left-0 w-px h-full bg-gradient-to-b from-transparent via-[#D4AF37]/10 to-transparent" />
      </div>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent" />

      <div className="relative max-w-screen-xl mx-auto px-6 md:px-10 lg:px-14 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10 lg:gap-16">

          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <div className="flex flex-col gap-1.5">
              <span
                data-imagine-id="footer-logo-monogram"
                className="font-cinzel text-3xl font-semibold tracking-[0.18em] text-[#D4AF37]"
              >
                NC
              </span>
              <span
                data-imagine-id="footer-logo-brand-name"
                className="font-playfair text-[11px] tracking-[0.3em] uppercase text-[#e8d9a0]/60 leading-relaxed"
              >
                Nandini Collections
              </span>
            </div>

            <div className="w-10 h-px bg-gradient-to-r from-[#D4AF37]/60 to-transparent" />

            <p
              data-imagine-id="footer-brand-tagline"
              className="font-raleway text-sm text-white/45 leading-relaxed max-w-[260px]"
            >
              Premium kitchenware crafted for modern homes. Curated cookware, bakeware, and dining essentials — Nizamabad.
            </p>

            <div className="flex items-center gap-3 pt-1">
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, borderColor: '#D4AF37' }}
                whileTap={{ scale: 0.93 }}
                aria-label="Instagram"
                data-imagine-id="footer-social-instagram"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-white/10 text-white/35 hover:text-[#D4AF37] transition-colors duration-300"
              >
                <InstagramIcon size={15} strokeWidth={1.5} />
              </motion.a>

              <motion.a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.93 }}
                aria-label="YouTube"
                data-imagine-id="footer-social-youtube"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-white/10 text-white/35 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-all duration-300"
              >
                <YoutubeIcon size={15} strokeWidth={1.5} />
              </motion.a>

              <motion.a
                href="https://wa.me/918008890044"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.93 }}
                aria-label="WhatsApp"
                data-imagine-id="footer-social-whatsapp"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-white/10 text-white/35 hover:text-[#25D366] hover:border-[#25D366]/40 transition-all duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </motion.a>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col gap-5">
            <h4
              data-imagine-id="footer-quicklinks-heading"
              className="font-raleway text-[10px] font-semibold tracking-[0.3em] uppercase text-[#D4AF37]"
            >
              Quick Links
            </h4>
            <div className="w-7 h-px bg-[#D4AF37]/35 -mt-1" />
            <ul className="flex flex-col gap-3.5">
              {quickLinks.map((link, idx) => (
                <li key={link?.label}>
                  <a
                    href={link?.href}
                    data-imagine-id={`footer-quicklink-${idx}`}
                    className="font-raleway text-sm text-white/45 hover:text-[#D4AF37] transition-colors duration-300 flex items-center gap-3 group"
                  >
                    <span className="block w-3 h-px bg-white/20 group-hover:bg-[#D4AF37] group-hover:w-5 transition-all duration-300" />
                    {link?.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col gap-5">
            <h4
              data-imagine-id="footer-contact-heading"
              className="font-raleway text-[10px] font-semibold tracking-[0.3em] uppercase text-[#D4AF37]"
            >
              Get in Touch
            </h4>
            <div className="w-7 h-px bg-[#D4AF37]/35 -mt-1" />
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <MapPinIcon size={14} strokeWidth={1.5} className="text-[#D4AF37] mt-0.5 shrink-0" />
                <span
                  data-imagine-id="footer-contact-address"
                  className="font-raleway text-sm text-white/45 leading-relaxed"
                >
                  Home no 6-13-31near Sri Sai Nilayam, Namdevwada<br />Telangana 503002
                </span>
              </li>
              <li className="flex items-center gap-3">
                <PhoneIcon size={14} strokeWidth={1.5} className="text-[#D4AF37] shrink-0" />
                <a
                  href="tel:+918008890044"
                  data-imagine-id="footer-contact-phone"
                  className="font-raleway text-sm text-white/45 hover:text-[#D4AF37] transition-colors duration-300"
                >
                  +91 80088 90044
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MailIcon size={14} strokeWidth={1.5} className="text-[#D4AF37] shrink-0" />
                <a
                  href="mailto:nandinicollections01@gmail.com"
                  data-imagine-id="footer-contact-email"
                  className="font-raleway text-sm text-white/45 hover:text-[#D4AF37] transition-colors duration-300 break-all"
                >
                  nandinicollections01@gmail.com
                </a>
              </li>
            </ul>

            <motion.a
              href="https://wa.me/918008890044"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              data-imagine-id="footer-whatsapp-cta"
              className="mt-2 inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-[#D4AF37]/35 text-[#D4AF37] font-raleway text-[11px] tracking-[0.2em] uppercase hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/60 transition-all duration-300 w-fit"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              WhatsApp Inquiry
            </motion.a>
          </motion.div>

        </div>
      </div>

      <div className="relative border-t border-white/[0.07]">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-14 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p
            data-imagine-id="footer-copyright"
            className="font-raleway text-xs text-white/22 tracking-wide"
          >
            &copy; {currentYear} NC Nandini Collections. All rights reserved.
          </p>
          <p
            data-imagine-id="footer-location-tagline"
            className="font-raleway text-[10px] text-white/15 tracking-[0.2em] uppercase"
          >
            Namdevwada &nbsp;&middot;&nbsp; Nizamabad &nbsp;&middot;&nbsp; Telangana
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
