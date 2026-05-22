import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Catalog', href: '/catalog' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
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
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
      className="w-full bg-[#212121] text-white relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[340px] rounded-full bg-[#D4AF37]/[0.04] blur-[80px]" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-[#D4AF37]/[0.03] blur-[60px]" />
        <div className="absolute inset-0 opacity-[0.018]" style={{backgroundImage: 'radial-gradient(circle, #D4AF37 1px, transparent 1px)', backgroundSize: '40px 40px'}} />
      </div>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/80 to-transparent" />

      <div className="relative max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16 pt-16 pb-12 md:pt-20 md:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14 md:gap-10 lg:gap-20">

          <motion.div variants={itemVariants} className="flex flex-col gap-7">
            <div>
              <span
                data-imagine-id="footer-logo-monogram"
                className="font-raleway text-[28px] font-bold tracking-[0.22em] text-[#D4AF37] block"
              >
                NC
              </span>
              <span
                data-imagine-id="footer-logo-brand-name"
                className="font-raleway text-[10px] font-medium tracking-[0.32em] uppercase text-[#D4AF37]/50 block mt-1"
              >
                Nandini Collections
              </span>
            </div>

            <div className="w-8 h-px bg-gradient-to-r from-[#D4AF37]/70 to-transparent" />

            <p
              data-imagine-id="footer-brand-tagline"
              className="font-raleway text-[13px] text-white/40 leading-[1.85] max-w-[240px]"
            >
              Premium kitchenware for modern homes. Cookware, bakeware &amp; dining essentials — Nizamabad.
            </p>

            <div className="flex items-center gap-2.5">
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.92 }}
                aria-label="Instagram"
                data-imagine-id="footer-social-instagram"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-white/30 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/8 transition-all duration-300"
              >
                <InstagramIcon size={16} strokeWidth={1.5} />
              </motion.a>

              <motion.a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.92 }}
                aria-label="YouTube"
                data-imagine-id="footer-social-youtube"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-white/30 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/8 transition-all duration-300"
              >
                <YoutubeIcon size={16} strokeWidth={1.5} />
              </motion.a>

              <motion.a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.92 }}
                aria-label="WhatsApp"
                data-imagine-id="footer-social-whatsapp"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-white/30 hover:text-[#25D366] hover:border-[#25D366]/40 hover:bg-[#25D366]/8 transition-all duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </motion.a>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <div>
              <h4
                data-imagine-id="footer-quicklinks-heading"
                className="font-raleway text-[9px] font-semibold tracking-[0.38em] uppercase text-[#D4AF37]"
              >
                Navigation
              </h4>
              <div className="w-6 h-px bg-[#D4AF37]/40 mt-3" />
            </div>
            <ul className="flex flex-col gap-1">
              {quickLinks.map((link, idx) => (
                <li key={link?.label}>
                  <motion.a
                    href={link?.href}
                    data-imagine-id={`footer-quicklink-${idx}`}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="font-raleway text-[13px] font-medium tracking-[0.06em] uppercase text-white/35 hover:text-[#D4AF37] transition-colors duration-300 flex items-center gap-3 group py-1.5"
                  >
                    <span className="block w-0 h-px bg-[#D4AF37] group-hover:w-4 transition-all duration-300" />
                    {link?.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <div>
              <h4
                data-imagine-id="footer-contact-heading"
                className="font-raleway text-[9px] font-semibold tracking-[0.38em] uppercase text-[#D4AF37]"
              >
                Get in Touch
              </h4>
              <div className="w-6 h-px bg-[#D4AF37]/40 mt-3" />
            </div>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3.5">
                <MapPinIcon size={13} strokeWidth={1.5} className="text-[#D4AF37] mt-0.5 shrink-0" />
                <span
                  data-imagine-id="footer-contact-address"
                  className="font-raleway text-[13px] text-white/38 leading-relaxed"
                >
                  Namdevwada, Nizamabad,<br />Telangana, India
                </span>
              </li>
              <li className="flex items-center gap-3.5">
                <PhoneIcon size={13} strokeWidth={1.5} className="text-[#D4AF37] shrink-0" />
                <a
                  href="tel:+919876543210"
                  data-imagine-id="footer-contact-phone"
                  className="font-raleway text-[13px] text-white/38 hover:text-[#D4AF37] transition-colors duration-300"
                >
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-3.5">
                <MailIcon size={13} strokeWidth={1.5} className="text-[#D4AF37] shrink-0" />
                <a
                  href="mailto:nandinicollections@gmail.com"
                  data-imagine-id="footer-contact-email"
                  className="font-raleway text-[13px] text-white/38 hover:text-[#D4AF37] transition-colors duration-300 break-all"
                >
                  nandinicollections@gmail.com
                </a>
              </li>
            </ul>

            <motion.a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              data-imagine-id="footer-whatsapp-cta"
              className="mt-1 inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-[#D4AF37]/30 text-[#D4AF37] font-raleway text-[10px] font-semibold tracking-[0.22em] uppercase hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/60 transition-all duration-300 w-fit"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              WhatsApp Inquiry
            </motion.a>
          </motion.div>

        </div>
      </div>

      <div className="relative">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/8 to-transparent" />
        </div>
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p
            data-imagine-id="footer-copyright"
            className="font-raleway text-[11px] text-white/20 tracking-wide"
          >
            &copy; {currentYear} NC Nandini Collections. All rights reserved.
          </p>
          <p
            data-imagine-id="footer-location-tagline"
            className="font-raleway text-[10px] text-[#D4AF37]/30 tracking-[0.25em] uppercase"
          >
            Namdevwada &nbsp;&middot;&nbsp; Nizamabad &nbsp;&middot;&nbsp; Telangana
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
