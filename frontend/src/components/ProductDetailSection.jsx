import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import fallbackImg from '../assets/modern_cookware_set.jpg';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export default function ProductDetailSection({ product_info = {} }) {
  const ArrowLeftIcon = Icons['ArrowLeft'] || Icons['HelpCircle'];
  const MessageCircleIcon = Icons['MessageCircle'] || Icons['HelpCircle'];
  const ShieldCheckIcon = Icons['ShieldCheck'] || Icons['HelpCircle'];

  const name = product_info?.name || 'Premium Kitchenware';
  const description = product_info?.description || 'Crafted for the modern culinary enthusiast, this piece combines timeless design with exceptional functionality. Engineered from premium materials to deliver professional results in your home kitchen.';
  const specs = product_info?.specs || ['Premium stainless steel construction', 'Ergonomic heat-resistant handles', 'Dishwasher safe and easy to clean', 'Compatible with all cooktops including induction'];
  const image = product_info?.image || fallbackImg;
  const price = product_info?.price || '';

  const whatsappText = encodeURIComponent(`Hello, I am interested in: ${name}. Could you please provide more details?`);
  const whatsappUrl = `https://wa.me/?text=${whatsappText}`;

  return (
    <section className="flex flex-col px-6 md:px-60 py-12 bg-white font-raleway">
      <motion.div 
        className="w-full max-w-screen-xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.a 
          href="/#catalog"
          variants={itemVariants}
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-black transition-colors duration-300 mb-10 group"
        >
          <ArrowLeftIcon className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
          Back to Catalog
        </motion.a>

        <div className="flex flex-col md:flex-row gap-12 md:gap-20">
          
          <div className="flex-1 flex flex-col gap-10">
            <motion.div 
              variants={itemVariants}
              className="w-full aspect-[4/3] bg-[#f8fafc] rounded-xl flex items-center justify-center p-8 md:p-12 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)]"
            >
              <img 
                src={image} 
                alt={name} 
                className="w-full h-full object-contain drop-shadow-md"
                onError={(e) => { e.currentTarget.src = fallbackImg; }}
              />
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col gap-6">
              <h1 className="text-3xl md:text-4xl font-bold text-black tracking-tight leading-tight">
                {name}
              </h1>
              
              {price && (
                <p className="text-xl font-medium text-gray-500">
                  {price}
                </p>
              )}

              <p className="text-base text-gray-600 leading-relaxed max-w-2xl">
                {description}
              </p>

              <div className="flex flex-col gap-4 mt-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400">
                  <ShieldCheckIcon className="w-4 h-4" />
                  Specifications
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                  {specs?.map((spec, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm font-semibold text-gray-500">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#24d366] shrink-0" />
                      <span className="leading-snug">{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          <div className="md:w-80 flex-shrink-0">
            <div className="sticky bottom-0 md:relative bg-white md:bg-transparent border-t md:border-t-0 border-gray-100 z-40 pt-4 pb-6 md:pt-0 md:pb-0 shadow-[0_-8px_30px_rgba(0,0,0,0.06)] md:shadow-none">
              <motion.div variants={itemVariants} className="flex flex-col gap-6">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full bg-[#24d366] hover:bg-[#1fb955] text-white font-bold py-4 px-8 rounded-full shadow-lg shadow-[#24d366]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#24d366]/30 active:scale-[0.98]"
                >
                  <MessageCircleIcon className="w-5 h-5" />
                  Inquire on WhatsApp
                </a>

                <div className="hidden md:flex flex-col gap-4 p-6 bg-[#f8fafc] rounded-xl border border-gray-100">
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Interested in this piece? Our team is ready to assist you with availability, pricing, and delivery options.
                  </p>
                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-[#24d366] animate-pulse" />
                    Usually replies instantly
                  </div>
                </div>

                <p className="md:hidden text-center text-xs text-gray-400 mt-2">
                  Typical reply within minutes
                </p>
              </motion.div>
            </div>
          </div>

        </div>
      </motion.div>
    </section>
  );
}
