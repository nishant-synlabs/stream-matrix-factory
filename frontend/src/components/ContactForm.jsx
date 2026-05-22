import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

const PhoneIcon = Icons['Phone'] || Icons['HelpCircle'];
const MapPinIcon = Icons['MapPin'] || Icons['HelpCircle'];
const MailIcon = Icons['Mail'] || Icons['HelpCircle'];
const MessageCircleIcon = Icons['MessageCircle'] || Icons['HelpCircle'];

const PHONE_NUMBER = '8008890044';
const WHATSAPP_LINK = `https://wa.me/918008890044`;
const EMAIL = 'nandinicollections01@gmail.com';
const ADDRESS = 'NC Nandini Collections, Industrial Estate, Sector 12, Hyderabad — 500 001, Telangana, India';

const containerVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut', staggerChildren: 0.12, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

export default function ContactForm() {
  return (
    <section className="relative w-full bg-white py-20 px-4 md:px-12 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{}}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(212,175,55,0.07)_0%,transparent_70%)]" />
      </div>

      <div className="relative max-w-2xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="bg-[#212121] rounded-3xl shadow-[0_2px_48px_0_rgba(212,175,55,0.13)] p-10 md:p-14 flex flex-col gap-8"
        >
          <motion.div variants={itemVariants} className="flex flex-col gap-1">
            <h2
              data-imagine-id="contactform-heading"
              className="font-raleway text-3xl md:text-4xl font-bold tracking-tight text-white"
            >
              Contact Us
            </h2>
            <div className="w-10 h-[2.5px] bg-[#D4AF37] rounded-full mt-2" />
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center gap-4">
            <span className="flex items-center justify-center w-11 h-11 rounded-full bg-[#D4AF37]/10 shrink-0">
              <PhoneIcon size={20} className="text-[#D4AF37]" strokeWidth={1.8} />
            </span>
            <div className="flex flex-col gap-0.5">
              <span
                data-imagine-id="contactform-phone-label"
                className="font-raleway text-xs uppercase tracking-widest text-white/40"
              >
                Phone
              </span>
              <a
                href={`tel:${PHONE_NUMBER}`}
                data-imagine-id="contactform-phone-number"
                className="font-raleway text-xl font-semibold text-[#D4AF37] tracking-wide hover:text-[#f0cf6e] transition-colors duration-200"
                aria-label="Call NC Nandini Collections"
              >
                {PHONE_NUMBER}
              </a>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center gap-4">
            <span className="flex items-center justify-center w-11 h-11 rounded-full bg-[#D4AF37]/10 shrink-0">
              <MessageCircleIcon size={20} className="text-[#D4AF37]" strokeWidth={1.8} />
            </span>
            <div className="flex flex-col gap-2">
              <span
                data-imagine-id="contactform-whatsapp-label"
                className="font-raleway text-xs uppercase tracking-widest text-white/40"
              >
                WhatsApp Inquiry
              </span>
              <motion.a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                data-imagine-id="contactform-whatsapp-cta"
                aria-label="Open WhatsApp chat with NC Nandini Collections"
                className="inline-flex items-center gap-2 bg-[#D4AF37] text-[#212121] font-raleway font-bold text-sm uppercase tracking-widest py-3 px-7 rounded-full shadow-[0_2px_18px_0_rgba(212,175,55,0.22)] transition-all duration-200"
                whileHover={{ scale: 1.04, boxShadow: '0 4px 32px 0 rgba(212,175,55,0.38)' }}
                whileTap={{ scale: 0.97 }}
              >
                <MessageCircleIcon size={15} strokeWidth={2.2} />
                Chat on WhatsApp
              </motion.a>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-start gap-4">
            <span className="flex items-center justify-center w-11 h-11 rounded-full bg-[#D4AF37]/10 shrink-0 mt-0.5">
              <MapPinIcon size={20} className="text-[#D4AF37]" strokeWidth={1.8} />
            </span>
            <div className="flex flex-col gap-0.5">
              <span
                data-imagine-id="contactform-address-label"
                className="font-raleway text-xs uppercase tracking-widest text-white/40"
              >
                Address
              </span>
              <address
                data-imagine-id="contactform-address"
                className="font-raleway not-italic text-sm text-white/70 leading-relaxed"
                style={{ fontVariant: 'small-caps' }}
              >
                {ADDRESS}
              </address>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center gap-4">
            <span className="flex items-center justify-center w-11 h-11 rounded-full bg-[#D4AF37]/10 shrink-0">
              <MailIcon size={20} className="text-[#D4AF37]" strokeWidth={1.8} />
            </span>
            <div className="flex flex-col gap-0.5">
              <span
                data-imagine-id="contactform-email-label"
                className="font-raleway text-xs uppercase tracking-widest text-white/40"
              >
                Email
              </span>
              <a
                href={`mailto:${EMAIL}`}
                data-imagine-id="contactform-email"
                className="font-raleway text-sm font-medium text-white/60 hover:text-[#D4AF37] transition-colors duration-200 tracking-wide"
                aria-label="Send email to NC Nandini Collections"
              >
                {EMAIL}
              </a>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="border-t border-white/10 pt-6 mt-2"
          >
            <p
              data-imagine-id="contactform-tagline"
              className="font-raleway text-xs text-white/30 tracking-widest uppercase text-center"
            >
              NC Nandini Collections &mdash; Premium Kitchenware, Crafted for Life
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
