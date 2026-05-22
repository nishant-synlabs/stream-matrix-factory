import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductDetailSection from '../components/ProductDetailSection';
import elegantCookware from '../assets/elegant_cookware_set_minimal.jpg';
import modernCookware from '../assets/modern_cookware_set.jpg';
import premiumBakeware from '../assets/premium_bakeware_minimal.jpg';
import kitchenKnives from '../assets/kitchen_knives_set_elegant.jpg';
import kitchenStorage from '../assets/kitchen_storage_containers_minimalist.jpg';
import kitchenUtensils from '../assets/kitchen_utensils_clean_white.jpg';
import premiumGlassware from '../assets/premium_glassware_drinkware_collection.jpg';
import stylishDinnerware from '../assets/stylish_dinnerware_plates_bowls_premium.jpg';
import elegantBakeware from '../assets/elegant_bakeware_collection_kitchen.jpg';
import modernKitchenUtensils from '../assets/modern_kitchen_utensils_tools_set.jpg';
import premiumKitchenKnives from '../assets/premium_kitchen_knives_cutlery_set.jpg';
import stainlessCookware from '../assets/stainless_steel_cookware_premium.jpg';
import stylishStorage from '../assets/stylish_kitchen_storage_containers_jars.jpg';

const ArrowLeftIcon = Icons['ArrowLeft'] || Icons['HelpCircle'];

const CATEGORY_IMAGES = {
  cookware: elegantCookware,
  bakeware: premiumBakeware,
  knives: kitchenKnives,
  storage: kitchenStorage,
  utensils: kitchenUtensils,
  glassware: premiumGlassware,
  dinnerware: stylishDinnerware,
  default: modernCookware,
};

const PRODUCTS_DB = [
  {
    id: '1',
    name: 'Heritage Tri-Ply Cookware Set',
    tagline: 'Where culinary tradition meets modern precision.',
    category: 'Cookware',
    price: '₹4,500 – ₹9,800',
    description: 'Crafted from premium 3-ply stainless steel with an aluminum core, this Heritage set distributes heat with extraordinary evenness. Each piece is hand-polished to a mirror finish and designed to last generations — bringing both artistry and performance to your kitchen.',
    specs: [
      '18/10 Stainless Steel, Aluminum Core',
      'Mirror Polish finish',
      'Oven safe up to 260°C',
      'Induction compatible, Dishwasher safe',
      'MOQ: 10 sets — SKU: NC-CW-001',
    ],
    image: elegantCookware,
    badge: 'Bestseller',
  },
  {
    id: '2',
    name: 'Artisan Bakeware Collection',
    tagline: 'Precision-engineered for the serious baker.',
    category: 'Bakeware',
    price: '₹2,200 – ₹5,400',
    description: 'The Artisan Bakeware Collection features heavy-gauge aluminized steel construction with a proprietary non-stick ceramic coating. Engineered for professional-grade results — from flaky croissants to risen soufflés.',
    specs: [
      'Heavy-gauge aluminized steel, Ceramic coating',
      'Ceramic Non-Stick finish',
      'Oven safe up to 230°C',
      'PTFE & PFOA-free, Hand wash recommended',
      'MOQ: 12 sets — SKU: NC-BW-002',
    ],
    image: elegantBakeware,
    badge: 'New Arrival',
  },
  {
    id: '3',
    name: 'Precision Forged Knife Set',
    tagline: 'A blade for every culinary intention.',
    category: 'Knives',
    price: '₹3,800 – ₹7,200',
    description: 'Each knife in this premium set is individually forged from a single billet of German high-carbon stainless steel. The 15° edge angle provides razor-sharp precision while the full-bolster construction ensures perfect balance.',
    specs: [
      'X50CrMoV15 High-Carbon German Steel',
      'Satin Taper-Ground finish',
      'Full-tang, triple-riveted pakkawood handles',
      'Rockwell hardness: 58 HRC',
      'MOQ: 6 sets — SKU: NC-KN-003',
    ],
    image: premiumKitchenKnives,
    badge: 'Premium',
  },
  {
    id: '4',
    name: 'Modular Storage System',
    tagline: 'Intelligent organization meets minimal design.',
    category: 'Storage',
    price: '₹1,800 – ₹3,600',
    description: 'A thoughtfully designed modular storage system that unifies functionality with aesthetic clarity. Each container features an airtight silicone seal and is manufactured from BPA-free borosilicate glass.',
    specs: [
      'Borosilicate Glass, Silicone Seals, Bamboo Lids',
      'Airtight silicone gasket for extended freshness',
      'BPA-free and food-grade certified',
      'Microwave and freezer safe glass body',
      'MOQ: 15 sets — SKU: NC-ST-004',
    ],
    image: stylishStorage,
    badge: null,
  },
  {
    id: '5',
    name: 'Professional Utensil Collection',
    tagline: 'Built for chefs, refined for your kitchen.',
    category: 'Utensils',
    price: '₹900 – ₹2,200',
    description: 'Forged and cast with precision, this professional-grade utensil collection features heat-resistant handles up to 220°C and food-safe stainless steel heads. Every silhouette is designed for maximum ergonomic efficiency.',
    specs: [
      'Stainless Steel, Heat-Resistant Nylon',
      'Handles resistant up to 220°C',
      'Non-scratch nylon spatulas included',
      'Dishwasher safe, BPA-free',
      'MOQ: 20 sets — SKU: NC-UT-005',
    ],
    image: modernKitchenUtensils,
    badge: null,
  },
  {
    id: '6',
    name: 'Crystal Glassware Collection',
    tagline: 'Elevate every pour, every occasion.',
    category: 'Glassware',
    price: '₹2,600 – ₹5,800',
    description: 'Lead-free crystal hand-blown in small batches. Each glass carries the subtle imperfections that mark authentic artisanship. The ultra-thin rim enhances the sensory experience while a weighted base ensures stability.',
    specs: [
      'Lead-Free Crystal Glass',
      'Ultra-thin 1mm rim',
      'Hand-blown artisan quality',
      'Weighted base for stability',
      'MOQ: 8 sets — SKU: NC-GL-006',
    ],
    image: premiumGlassware,
    badge: 'Limited Edition',
  },
  {
    id: '7',
    name: 'Contemporary Dinnerware Set',
    tagline: 'Setting the table for extraordinary moments.',
    category: 'Dinnerware',
    price: '₹3,200 – ₹6,500',
    description: 'Crafted from high-fired vitrified porcelain, each piece achieves a perfect equilibrium between delicacy and durability. The matte-glaze exterior contrasts with a glossy interior — elevating any table setting.',
    specs: [
      'High-fired Vitrified Porcelain',
      'Matte Exterior / Gloss Interior finish',
      'Chip-resistant construction',
      'Microwave, dishwasher and oven safe',
      'MOQ: 8 sets — SKU: NC-DN-007',
    ],
    image: stylishDinnerware,
    badge: 'Bestseller',
  },
  {
    id: '8',
    name: 'Stainless Steel Cookware Pro',
    tagline: 'Industrial performance, refined aesthetics.',
    category: 'Cookware',
    price: '₹5,200 – ₹11,000',
    description: 'Engineered for high-volume cooking without compromising elegance. The brushed exterior resists fingerprints while the mirror-polished interior is non-reactive — preserving the pure flavour of every ingredient.',
    specs: [
      '304 Grade Stainless Steel',
      'Brushed Exterior / Mirror Interior',
      'Encapsulated 5-ply base',
      'Induction compatible, Dishwasher safe',
      'MOQ: 8 sets — SKU: NC-CW-008',
    ],
    image: stainlessCookware,
    badge: null,
  },
];

function getProductIdFromURL() {
  const parts = window.location.pathname.split('/');
  return parts[parts.length - 1] ?? null;
}

function LoadingState() {
  return (
    <motion.div
      key="loader"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-[70vh] flex flex-col items-center justify-center gap-5"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
        className="w-8 h-8 rounded-full border-2 border-[#D4AF37]/30 border-t-[#D4AF37]"
      />
      <p
        data-imagine-id="productdetail-loading-label"
        className="font-raleway text-[10px] uppercase tracking-[0.22em] text-[#b8956a]"
      >
        Loading product
      </p>
    </motion.div>
  );
}

function NotFoundState() {
  return (
    <motion.div
      key="notfound"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="min-h-[60vh] flex flex-col items-center justify-center bg-white px-6"
    >
      <p
        data-imagine-id="productdetail-404-label"
        className="font-raleway text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] mb-4"
      >
        404
      </p>
      <h2
        data-imagine-id="productdetail-404-heading"
        className="font-playfair text-3xl text-[#3b1c03] mb-3"
      >
        Product Not Found
      </h2>
      <p
        data-imagine-id="productdetail-404-desc"
        className="font-raleway text-sm text-[#b8956a] tracking-wide mb-8 text-center max-w-sm"
      >
        The product you are looking for does not exist or may have been removed.
      </p>
      <motion.a
        href="/catalog"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        data-imagine-id="productdetail-404-back-link"
        className="inline-flex items-center gap-2 font-raleway text-[11px] uppercase tracking-[0.18em] text-white bg-[#3b1c03] py-3.5 px-8 rounded-full hover:bg-[#D4AF37] transition-colors duration-300"
      >
        <ArrowLeftIcon size={13} strokeWidth={2} />
        Back to Catalog
      </motion.a>
    </motion.div>
  );
}

export default function ProductDetail() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const productId = getProductIdFromURL();
    setLoading(true);
    setNotFound(false);

    const timeout = setTimeout(() => {
      const found = PRODUCTS_DB.find((p) => p?.id === productId) ?? null;
      if (found) {
        setProduct(found);
      } else {
        setNotFound(true);
      }
      setLoading(false);
    }, 420);

    return () => clearTimeout(timeout);
  }, []);

  const categoryKey = product?.category?.toLowerCase() ?? 'default';
  const fallbackImage = CATEGORY_IMAGES[categoryKey] ?? CATEGORY_IMAGES.default;

  const productInfo = product
    ? {
        name: product.name,
        description: product.description,
        specs: product.specs,
        image: product.image ?? fallbackImage,
        price: product.price ?? '',
        badge: product.badge ?? null,
        tagline: product.tagline ?? '',
        category: product.category ?? '',
      }
    : {};

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {loading && <LoadingState key="loading" />}
          {!loading && notFound && <NotFoundState key="notfound" />}
          {!loading && !notFound && product && (
            <motion.div
              key={product?.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <ProductDetailSection product_info={productInfo} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
