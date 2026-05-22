import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import elegantBakewareCollection from '../assets/elegant_bakeware_collection_kitchen.jpg';
import elegantBakewarePans from '../assets/elegant_bakeware_pans.jpg';
import elegantCookwareSet from '../assets/elegant_cookware_set_minimal.jpg';
import elegantServingDishes from '../assets/elegant_serving_dishes_platters_premium.jpg';
import kitchenKnivesSet from '../assets/kitchen_knives_set_elegant.jpg';
import kitchenStorage from '../assets/kitchen_storage_containers_minimalist.jpg';
import kitchenUtensils from '../assets/kitchen_utensils_clean_white.jpg';
import modernCookwareSet from '../assets/modern_cookware_set.jpg';
import modernKitchenKnives from '../assets/modern_kitchen_knives_set_premium.jpg';
import modernKitchenUtensils from '../assets/modern_kitchen_utensils_tools_set.jpg';
import premiumBakeware from '../assets/premium_bakeware_minimal.jpg';
import premiumGlassware from '../assets/premium_glassware_drinkware_collection.jpg';
import premiumKnifesCutlery from '../assets/premium_kitchen_knives_cutlery_set.jpg';
import premiumKitchenware from '../assets/premium_kitchenware_white_background.jpg';
import stainlessCookware from '../assets/stainless_steel_cookware_premium.jpg';
import stylishDinnerware from '../assets/stylish_dinnerware_plates_bowls_premium.jpg';
import stylishStorage from '../assets/stylish_kitchen_storage_containers_jars.jpg';
import modernMinimalist from '../assets/premium_modern_kitchenware_cookware_set_minimalist.jpg';

const WHATSAPP_NUMBER = '918008890044';

const FALLBACK_PRODUCTS = [
  {
    id: 1,
    title: 'Artisan Stainless Cookware Set',
    description: 'Premium 5-piece stainless steel cookware set with mirror-polished finish. Tri-ply construction for even heat distribution.',
    category: 'Cookware',
    price: '₹4,500',
    image: stainlessCookware,
  },
  {
    id: 2,
    title: 'Elegant Serving Platters',
    description: 'Handcrafted serving dishes and platters for the modern kitchen. Perfect for entertaining and everyday use.',
    category: 'Serveware',
    price: '₹2,200',
    image: elegantServingDishes,
  },
  {
    id: 3,
    title: 'Chef\'s Knife Collection',
    description: 'Professional-grade kitchen knives with ergonomic handles. German steel blades for precision cuts every time.',
    category: 'Cutlery',
    price: '₹3,800',
    image: kitchenKnivesSet,
  },
  {
    id: 4,
    title: 'Minimal Bakeware Set',
    description: 'Complete bakeware collection for the passionate home baker. Non-stick coating with reinforced edges.',
    category: 'Bakeware',
    price: '₹2,900',
    image: premiumBakeware,
  },
  {
    id: 5,
    title: 'Modern Cookware Collection',
    description: 'Sleek, modern cookware designed for the contemporary kitchen. Compatible with all hob types including induction.',
    category: 'Cookware',
    price: '₹5,200',
    image: modernCookwareSet,
  },
  {
    id: 6,
    title: 'Premium Glassware Set',
    description: 'Crystal-clear glassware for everyday drinking and elegant entertaining. Dishwasher safe and durable.',
    category: 'Drinkware',
    price: '₹1,800',
    image: premiumGlassware,
  },
  {
    id: 7,
    title: 'Minimalist Storage Jars',
    description: 'Airtight kitchen storage containers with gold-accented lids. Keep your pantry fresh and beautifully organised.',
    category: 'Storage',
    price: '₹1,400',
    image: stylishStorage,
  },
  {
    id: 8,
    title: 'Kitchen Utensils Set',
    description: 'Complete set of essential kitchen tools in stainless steel and silicone. Heat-resistant and dishwasher safe.',
    category: 'Utensils',
    price: '₹1,600',
    image: kitchenUtensils,
  },
  {
    id: 9,
    title: 'Bakeware Pans Collection',
    description: 'Versatile baking pans in multiple sizes. Heavy-gauge steel with non-stick surface for effortless baking.',
    category: 'Bakeware',
    price: '₹2,100',
    image: elegantBakewarePans,
  },
  {
    id: 10,
    title: 'Precision Cutlery Set',
    description: 'Razor-sharp premium cutlery set for professional-grade meal preparation. Full tang construction for balance.',
    category: 'Cutlery',
    price: '₹4,100',
    image: premiumKnifesCutlery,
  },
  {
    id: 11,
    title: 'Elegant Cookware Range',
    description: 'Timeless cookware in a minimalist white palette. Enamel-coated cast iron for superior heat retention.',
    category: 'Cookware',
    price: '₹6,800',
    image: elegantCookwareSet,
  },
  {
    id: 12,
    title: 'Stylish Dinnerware Set',
    description: 'Curated plates and bowls in a premium matte finish. Stackable design for effortless storage and display.',
    category: 'Dinnerware',
    price: '₹3,200',
    image: stylishDinnerware,
  },
  {
    id: 13,
    title: 'Modern Utility Tools',
    description: 'Ergonomically designed kitchen utility tools for daily cooking. Soft-grip handles, rust-resistant steel.',
    category: 'Utensils',
    price: '₹1,200',
    image: modernKitchenUtensils,
  },
  {
    id: 14,
    title: 'Artisan Bakeware Collection',
    description: 'Professional-grade bakeware for cakes, breads, and pastries. Gold-anodised aluminium for even browning.',
    category: 'Bakeware',
    price: '₹3,500',
    image: elegantBakewareCollection,
  },
  {
    id: 15,
    title: 'Storage Container Set',
    description: 'BPA-free modular storage containers in staggered sizes. Airtight seal locks in freshness for weeks.',
    category: 'Storage',
    price: '₹1,900',
    image: kitchenStorage,
  },
  {
    id: 16,
    title: 'Minimalist Cookware Set',
    description: 'Understated luxury in every piece. Matte black exterior with stainless interior for the modern kitchen.',
    category: 'Cookware',
    price: '₹7,200',
    image: modernMinimalist,
  },
  {
    id: 17,
    title: 'Modern Knife Set',
    description: 'Damascus-pattern high-carbon steel blades with pakkawood handles. Comes in a premium wooden block.',
    category: 'Cutlery',
    price: '₹5,600',
    image: modernKitchenKnives,
  },
  {
    id: 18,
    title: 'Premium White Kitchenware',
    description: 'Full kitchen essentials bundle in a cohesive white and gold palette. The perfect starter set for new homes.',
    category: 'Bundle',
    price: '₹8,900',
    image: premiumKitchenware,
  },
];

const CATEGORIES = ['All', 'Cookware', 'Bakeware', 'Cutlery', 'Serveware', 'Drinkware', 'Dinnerware', 'Utensils', 'Storage', 'Bundle'];

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.557 4.122 1.529 5.857L.057 23.882l6.186-1.623A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.8 9.8 0 01-4.988-1.361l-.357-.212-3.676.964.981-3.585-.233-.369A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
  </svg>
);

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: -16,
    transition: { duration: 0.25, ease: 'easeIn' },
  },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.35, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 20,
    transition: { duration: 0.25, ease: 'easeIn' },
  },
};

function ProductCard({ product, onOpenDetail, index }) {
  const MessageSquare = Icons['MessageSquare'] || Icons['HelpCircle'];

  const handleWhatsApp = useCallback(
    (e) => {
      e.stopPropagation();
      const msg = encodeURIComponent(
        `Hi, I am interested in buying this product. Can you guide me further? Product: ${product?.title}`
      );
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank', 'noopener,noreferrer');
    },
    [product]
  );

  const [imgError, setImgError] = useState(false);

  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -6, boxShadow: '0 8px 32px 0 rgba(212,175,55,0.18)' }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      onClick={() => onOpenDetail(product)}
      className="group bg-white rounded-2xl border border-[#e8d89a] shadow-sm cursor-pointer overflow-hidden flex flex-col"
      aria-label={`View details for ${product?.title}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onOpenDetail(product)}
    >
      <div className="relative overflow-hidden bg-[#f9f5eb] w-full" style={{paddingTop: '66.67%'}}>
        {!imgError ? (
          <img
            src={product?.image}
            alt={product?.title}
            onError={() => setImgError(true)}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[#f5f0e8]">
            <span className="text-[#c8a84b] text-xs font-raleway tracking-widest uppercase">NC Collections</span>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span className="bg-white/80 backdrop-blur-sm text-[#3b1c03] text-[10px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full border border-[#e8d89a]">
            {product?.category}
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5 gap-3">
        <h3 className="text-[17px] font-bold font-playfair text-[#3b1c03] leading-snug line-clamp-2">
          {product?.title}
        </h3>
        <p className="text-[13.5px] font-raleway text-[#6b4226] leading-relaxed line-clamp-2 flex-1">
          {product?.description}
        </p>
        <div className="flex items-center justify-between mt-1 pt-3 border-t border-[#f0e8c8]">
          <span className="text-[15px] font-bold font-playfair text-[#D4AF37]">
            {product?.price}
          </span>
          <motion.button
            whileHover={{ backgroundColor: '#D4AF37', color: '#ffffff', boxShadow: '0 0 18px 2px rgba(212,175,55,0.35)' }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.18 }}
            onClick={handleWhatsApp}
            className="flex items-center gap-1.5 border border-[#D4AF37] text-[#D4AF37] text-[11px] font-semibold font-raleway tracking-widest uppercase px-4 py-2 rounded-full transition-colors duration-200"
            aria-label={`Inquire about ${product?.title} on WhatsApp`}
          >
            <WhatsAppIcon />
            Inquire
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}

function ProductDetailModal({ product, onClose }) {
  const X = Icons['X'] || Icons['HelpCircle'];
  const Tag = Icons['Tag'] || Icons['HelpCircle'];
  const [imgError, setImgError] = useState(false);

  const handleWhatsApp = useCallback(() => {
    const msg = encodeURIComponent(
      `Hi, I am interested in buying this product. Can you guide me further? Product: ${product?.title}`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank', 'noopener,noreferrer');
  }, [product]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <motion.div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close modal backdrop"
      />
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full mx-auto overflow-hidden z-10"
        role="dialog"
        aria-modal="true"
        aria-label={product?.title}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-white/80 backdrop-blur-sm border border-[#e8d89a] text-[#3b1c03] rounded-full p-2 hover:bg-[#D4AF37] hover:text-white transition-colors duration-200"
          aria-label="Close product detail"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="relative bg-[#f9f5eb] w-full" style={{paddingTop: '55%'}}>
          {!imgError ? (
            <img
              src={product?.image}
              alt={product?.title}
              onError={() => setImgError(true)}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-[#f5f0e8]">
              <span className="text-[#c8a84b] text-sm font-raleway tracking-widest uppercase">NC Collections</span>
            </div>
          )}
          <div className="absolute bottom-4 left-4">
            <span className="bg-white/85 backdrop-blur-sm text-[#3b1c03] text-[10px] font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full border border-[#e8d89a] flex items-center gap-1.5">
              <Tag className="w-3 h-3" />
              {product?.category}
            </span>
          </div>
        </div>

        <div className="p-7 flex flex-col gap-4">
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-2xl font-bold font-playfair text-[#3b1c03] leading-tight">
              {product?.title}
            </h2>
            <span className="text-xl font-bold font-playfair text-[#D4AF37] whitespace-nowrap">
              {product?.price}
            </span>
          </div>
          <p className="text-[14px] font-raleway text-[#5a3520] leading-relaxed">
            {product?.description}
          </p>
          <div className="flex flex-col gap-3 pt-2">
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 0 24px 4px rgba(212,175,55,0.35)' }}
              whileTap={{ scale: 0.97 }}
              onClick={handleWhatsApp}
              className="flex items-center justify-center gap-2.5 bg-[#D4AF37] text-white font-semibold font-raleway tracking-widest uppercase text-[13px] py-4 px-8 rounded-full w-full transition-colors duration-200"
              aria-label="Inquire on WhatsApp"
            >
              <WhatsAppIcon />
              Inquire on WhatsApp
            </motion.button>
            <button
              onClick={onClose}
              className="text-[12px] font-raleway text-[#9b7e60] tracking-widest uppercase hover:text-[#D4AF37] transition-colors duration-200 text-center py-2"
            >
              Back to Catalog
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProductCatalog({ products }) {
  const sourceProducts = (products && products.length > 0) ? products : FALLBACK_PRODUCTS;

  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const Search = Icons['Search'] || Icons['HelpCircle'];
  const SlidersHorizontal = Icons['SlidersHorizontal'] || Icons['HelpCircle'];

  const filteredProducts = sourceProducts.filter((p) => {
    const matchesCategory = activeCategory === 'All' || p?.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      p?.title?.toLowerCase().includes(q) ||
      p?.description?.toLowerCase().includes(q) ||
      p?.category?.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const availableCategories = CATEGORIES.filter(
    (cat) => cat === 'All' || sourceProducts.some((p) => p?.category === cat)
  );

  return (
    <section
      className="w-full min-h-screen bg-white"
      aria-label="NC Nandini Collections Product Catalog"
    >
      <div
        className="w-full py-14 px-4 md:px-24"
        style={{
          background:
            'linear-gradient(135deg, #fffef9 0%, #fdf6e3 40%, #fefefe 100%)',
        }}
      >
        <div className="max-w-screen-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center mb-10"
          >
            <span className="inline-block text-[11px] font-raleway font-semibold tracking-[0.3em] uppercase text-[#D4AF37] mb-3">
              NC Nandini Collections · Nizamabad
            </span>
            <h1 className="text-4xl md:text-5xl font-bold font-playfair text-[#3b1c03] mb-4 leading-tight">
              Our Product Catalog
            </h1>
            <p className="text-[15px] font-raleway text-[#7a5230] max-w-xl mx-auto leading-relaxed">
              Explore our curated collection of premium kitchenware, crafted for
              the modern culinary lifestyle.
            </p>
            <div className="w-16 h-[2px] bg-[#D4AF37] mx-auto mt-6 rounded-full" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
            className="flex flex-col md:flex-row items-center gap-4 mb-8"
          >
            <div className="relative w-full md:max-w-sm">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c8a84b]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.currentTarget.value)}
                placeholder="Search products…"
                className="w-full pl-10 pr-4 py-3 rounded-full border border-[#e8d89a] bg-white text-[#3b1c03] font-raleway text-[14px] placeholder:text-[#c8a84b] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40 focus:border-[#D4AF37] transition-all duration-200"
                aria-label="Search products"
              />
            </div>
            <div className="flex items-center gap-1.5 flex-wrap justify-center md:justify-start">
              <SlidersHorizontal className="w-4 h-4 text-[#c8a84b] mr-1 hidden md:block" />
              {availableCategories.map((cat) => (
                <motion.button
                  key={cat}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-[11px] font-raleway font-semibold tracking-widest uppercase px-4 py-2 rounded-full border transition-all duration-200 ${
                    activeCategory === cat
                      ? 'bg-[#D4AF37] text-white border-[#D4AF37] shadow-md'
                      : 'bg-white text-[#7a5230] border-[#e8d89a] hover:border-[#D4AF37] hover:text-[#D4AF37]'
                  }`}
                  aria-pressed={activeCategory === cat}
                  aria-label={`Filter by ${cat}`}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {filteredProducts.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center justify-center py-20 gap-4"
              >
                <span className="text-5xl">🍳</span>
                <p className="font-playfair text-xl text-[#3b1c03] font-bold">
                  No products found
                </p>
                <p className="font-raleway text-sm text-[#9b7e60]">
                  Try adjusting your search or category filter.
                </p>
                <button
                  onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                  className="mt-2 text-[12px] font-raleway font-semibold tracking-widest uppercase text-[#D4AF37] border border-[#D4AF37] px-6 py-2.5 rounded-full hover:bg-[#D4AF37] hover:text-white transition-colors duration-200"
                >
                  Clear Filters
                </button>
              </motion.div>
            ) : (
              <motion.div
                key={`${activeCategory}-${searchQuery}`}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8"
              >
                {filteredProducts.map((product, index) => (
                  <ProductCard
                    key={product?.id}
                    product={product}
                    index={index}
                    onOpenDetail={setSelectedProduct}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {filteredProducts.length > 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="text-center font-raleway text-[12px] text-[#b89a60] tracking-widest uppercase mt-10"
            >
              Showing {filteredProducts.length} of {sourceProducts.length} products
            </motion.p>
          )}
        </div>
      </div>

      <AnimatePresence>
        {selectedProduct && (
          <ProductDetailModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

export default ProductCatalog;
