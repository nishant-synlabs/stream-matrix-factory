import { useState } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

const WhatsAppSVG = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.417A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.5 9.5c.167.833.9 2.7 2.5 3.5s2.667 1.333 3 1.5c.167.083.6.1 1-.5.5-.7.667-.933.667-.933s1.333.667 2 1c.133.067.4.4 0 1-.5.767-1.467 1.933-2.667 1.933-1.2 0-3.333-.933-5.333-3.167C7.667 11.6 7.167 9.433 7.5 8.5c.267-.733 1.067-1.333 1.5-1.5.5-.2.867-.033 1 .167.133.2.5 1.167.5 1.333z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText('nandinicollections01@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const MapPinIcon = Icons['MapPin'] || Icons['HelpCircle'];
  const MailIcon = Icons['Mail'] || Icons['HelpCircle'];
  const ClockIcon = Icons['Clock'] || Icons['HelpCircle'];
  const CheckIcon = Icons['Check'] || Icons['HelpCircle'];

  return (
    <section
      id="contact"
      className="w-full py-24 md:py-32 px-4 sm:px-6 lg:px-8 border-t border-[#D4AF37]/20"
      style={{ backgroundColor: '#ffffff' }}
    >
      <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* Left Side: Main Text & WhatsApp CTA */}
        <motion.div 
          className="flex-1 flex flex-col justify-center items-start"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <span
            className="inline-block text-xs font-bold tracking-[0.25em] uppercase mb-6"
            style={{ color: '#23272c', opacity: 0.5 }}
          >
            Connect With Us
          </span>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-8"
            style={{ fontFamily: 'Raleway, sans-serif', color: '#23272c' }}
          >
            Get in Touch
          </h2>
          <p
            className="text-lg md:text-xl max-w-xl mb-12 leading-relaxed"
            style={{ fontFamily: 'Raleway, sans-serif', color: '#23272c', opacity: 0.7 }}
          >
            Visit our store in Namdevwada, Nizamabad, or reach out directly via WhatsApp. We are here to help you find the perfect premium kitchenware.
          </p>
          
          <motion.a
            href="https://wa.me/918008890044"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 py-4 px-10 rounded-full text-white font-bold text-base tracking-wide transition-all duration-300"
            style={{
              backgroundColor: '#25D366',
              fontFamily: 'Raleway, sans-serif',
              boxShadow: '0 8px 32px rgba(37, 211, 102, 0.25)',
            }}
            whileHover={{ scale: 1.02, boxShadow: '0 12px 40px rgba(37, 211, 102, 0.4)' }}
            whileTap={{ scale: 0.98 }}
          >
            <WhatsAppSVG size={22} />
            <span>Inquire on WhatsApp</span>
          </motion.a>
        </motion.div>

        {/* Right Side: Contact Details (No Cards, Clean List) */}
        <motion.div 
          className="flex-1 flex flex-col justify-center gap-10"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
        >
          {/* Address */}
          <div className="flex items-start gap-6">
            <div className="flex items-center justify-center w-10 h-10 flex-shrink-0 mt-1">
              <MapPinIcon className="w-6 h-6" style={{ color: '#D4AF37' }} />
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-[0.15em] mb-2" style={{ color: '#23272c', opacity: 0.5 }}>Location</h3>
              <p className="text-lg font-medium leading-relaxed" style={{ fontFamily: 'Raleway, sans-serif', color: '#23272c' }}>
                Namdevwada, Nizamabad<br />
                Telangana, India
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-6">
            <div className="flex items-center justify-center w-10 h-10 flex-shrink-0 mt-1">
              {copied ? <CheckIcon className="w-6 h-6" style={{ color: '#22c55e' }} /> : <MailIcon className="w-6 h-6" style={{ color: '#D4AF37' }} />}
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-[0.15em] mb-2" style={{ color: '#23272c', opacity: 0.5 }}>Email Us</h3>
              <button onClick={handleCopy} className="text-lg font-medium text-left hover:opacity-70 transition-opacity" style={{ fontFamily: 'Raleway, sans-serif', color: '#23272c' }}>
                {copied ? 'Copied to clipboard!' : 'nandinicollections01@gmail.com'}
              </button>
            </div>          </div>

          {/* Hours */}
          <div className="flex items-start gap-6">
            <div className="flex items-center justify-center w-10 h-10 flex-shrink-0 mt-1">
              <ClockIcon className="w-6 h-6" style={{ color: '#D4AF37' }} />
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-[0.15em] mb-2" style={{ color: '#23272c', opacity: 0.5 }}>Store Hours</h3>
              <p className="text-lg font-medium leading-relaxed" style={{ fontFamily: 'Raleway, sans-serif', color: '#23272c' }}>
                Mon – Sat: 9:00 AM – 8:00 PM<br />
                Sunday: 10:00 AM – 6:00 PM
              </p>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
