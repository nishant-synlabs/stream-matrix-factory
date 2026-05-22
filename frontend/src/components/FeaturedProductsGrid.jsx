import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import kitchen1 from '../assets/kitchen.jpeg';
import kitchen2 from '../assets/kitchen2.jpeg';
import kitchen3 from '../assets/kitchen3.jpeg';
import kitchen4 from '../assets/kitchen4.jpeg';
import kitchen5 from '../assets/kitchen5.jpeg';
import bottle3 from '../assets/bottle3.jpeg';

const DEFAULT_PRODUCTS = [
  {
    id: 1,
    name: 'Gourmet Kitchen Collection',
    priceRange: '₹2,499 – ₹4,599',
    image: kitchen1,
    description: 'A complete set of premium kitchen essentials for the modern home.',
    whatsappMsg: 'Hello, I am interested in the Gourmet Kitchen Collection from NC Nandini Collections.',
  },
  {
    id: 2,
    name: 'Pro-Series Culinary Set',
    priceRange: '₹299 – ₹799',
    image: kitchen2,
    description: 'Professional grade tools designed for precision and durability.',
    whatsappMsg: 'Hello, I am interested in the Pro-Series Culinary Set from NC Nandini Collections.',
  },
  {
    id: 3,
    name: 'Modern Kitchenware Essentials',
    priceRange: '₹299 – ₹799',
    image: kitchen3,
    description: 'Elegant and functional pieces that elevate your daily cooking experience.',
    whatsappMsg: 'Hello, I am interested in the Modern Kitchenware Essentials from NC Nandini Collections.',
  },
  {
    id: 4,
    name: "Signature Chef's Selection",
    priceRange: '₹299 – ₹799',
    image: kitchen4,
    description: 'Handpicked selection of our finest kitchenware for discerning chefs.',
    whatsappMsg: 'Hello, I am interested in the Signature Chef\'s Selection from NC Nandini Collections.',
  },
  {
    id: 5,
    name: 'Premium Home Cook Set',
    priceRange: '₹299 – ₹799',
    image: kitchen5,
    description: 'Quality kitchenware that brings professional performance to your home.',
    whatsappMsg: 'Hello, I am interested in the Premium Home Cook Set from NC Nandini Collections.',
  },
  {
    id: 6,
    name: 'Elite Insulated Flask',
    priceRange: '₹299 – ₹799',
    image: bottle3,
    description: 'High-performance insulated flask to keep your beverages at the perfect temperature.',
    whatsappMsg: 'Hello, I am interested in the Elite Insulated Flask from NC Nandini Collections.',
  },
];

const WHATSAPP_NUMBER = '918008890044';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

function FeaturedProductsGrid({ products }) {
  const MessageCircle = Icons['MessageCircle'] || Icons['HelpCircle'];

  const displayProducts = Array.isArray(products) && products.length > 0 ? products : DEFAULT_PRODUCTS;

  function buildWhatsAppUrl(msg) {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg ?? '')}`;
  }

  return (
    <section className="w-full bg-white py-20 px-4 md:px-8">
      <div className="max-w-screen-xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p
            data-imagine-id="featured-products-grid-eyebrow"
            className="text-xs tracking-[0.25em] uppercase font-raleway text-amber-600 mb-3 font-semibold"
            style={{}}
          >
            Curated Selection
          </p>
          <h2
            data-imagine-id="featured-products-grid-heading"
            className="font-cinzel text-3xl md:text-4xl font-bold tracking-widest uppercase text-neutral-900 leading-tight"
          >
            Featured Products
          </h2>
          <div className="mx-auto mt-5 h-px w-20 bg-amber-400 rounded-full" />
          <p
            data-imagine-id="featured-products-grid-subheading"
            className="mt-5 font-raleway text-neutral-500 text-base md:text-lg max-w-xl mx-auto leading-relaxed"
          >
            Premium kitchenware crafted for discerning homes. Inquire directly via WhatsApp for pricing and availability.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {displayProducts?.map((product, idx) => (
            <motion.article
              key={product?.id ?? idx}
              variants={cardVariants}
              whileHover={{ y: -6, boxShadow: '0 12px 40px 0 rgba(212,175,55,0.18)' }}
              className="bg-white rounded-2xl overflow-hidden border border-amber-200 shadow-md flex flex-col group"
            >
              <div className="relative overflow-hidden aspect-[4/3] bg-neutral-50 p-3 md:p-4">
                <img
                  data-imagine-id={`featured-products-grid-img-${idx}`}
                  src={product?.image}
                  alt={product?.name ?? 'Product image'}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = 'https://placehold.co/480x360/f9f6ee/b8972a?text=NC+Nandini';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              </div>

              <div className="flex flex-col flex-1 p-5 md:p-8 gap-4">
                <div>
                  <h3
                    data-imagine-id={`featured-products-grid-name-${idx}`}
                    className="font-cinzel text-base md:text-lg font-bold uppercase tracking-wider text-neutral-900 leading-snug mb-2"
                  >
                    {product?.name ?? 'Unnamed Product'}
                  </h3>
                  <p
                    data-imagine-id={`featured-products-grid-desc-${idx}`}
                    className="font-raleway text-neutral-500 text-sm leading-relaxed"
                  >
                    {product?.description ?? ''}
                  </p>
                </div>

                <div className="h-px w-full bg-amber-100 rounded-full" />

                <p
                  data-imagine-id={`featured-products-grid-price-${idx}`}
                  className="font-raleway font-semibold text-amber-700 text-base tracking-wide"
                >
                  {product?.priceRange ?? 'Price on request'}
                </p>

                <div className="mt-auto pt-2">
                  <motion.a
                    data-imagine-id={`featured-products-grid-cta-${idx}`}
                    href={buildWhatsAppUrl(product?.whatsappMsg ?? `I am interested in ${product?.name ?? 'your product'}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="flex items-center justify-center gap-2 w-full py-4 px-6 rounded-full bg-amber-400 hover:bg-amber-500 text-white font-raleway font-semibold text-sm tracking-widest uppercase transition-colors duration-200 shadow-sm"
                    aria-label={`Inquire about ${product?.name ?? 'product'} on WhatsApp`}
                  >
                    <MessageCircle size={16} strokeWidth={2.2} />
                    <span data-imagine-id={`featured-products-grid-cta-label-${idx}`}>Inquire on WhatsApp</span>
                  </motion.a>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default FeaturedProductsGrid;
