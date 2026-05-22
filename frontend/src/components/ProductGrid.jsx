import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';

// Import Assets
import kitchenImg1 from '../assets/kitchen.jpeg';
import kitchenImg2 from '../assets/kitchen2.jpeg';
import kitchenImg3 from '../assets/kitchen3.jpeg';
import kitchenImg4 from '../assets/kitchen4.jpeg';
import kitchenImg5 from '../assets/kitchen5.jpeg';
import lunchImg1 from '../assets/lunch.jpeg';
import lunchImg2 from '../assets/lunch2.jpeg';
import lunchImg3 from '../assets/lunch3.jpeg';
import lunchImg4 from '../assets/lunch4.jpeg';
import bottleImg1 from '../assets/bottle.jpeg';
import bottleImg2 from '../assets/bottle2.jpeg';
import bottleImg3 from '../assets/bottle3.jpeg';
import bottleImg4 from '../assets/bottle4.jpeg';
import electricImg1 from '../assets/electric.jpeg';
import electricImg2 from '../assets/electric2.jpeg';
import fanImg from '../assets/fan.jpeg';
import keychainImg from '../assets/keychain.jpeg';
import shoeImg from '../assets/shoe1.jpeg';
import paintingImg from '../assets/painting.jpeg';

const WHATSAPP_NUMBER = '918008890044';

const FILTERS = [
  { key: 'All Essentials', label: 'All Essentials' },
  { key: 'Smart Kitchen Innovation', label: 'Kitchenware' },
  { key: 'Premium Food Storage', label: 'Food Storage' },
  { key: 'Designer Hydration & Glassware', label: 'Hydration' },
  { key: 'Modern Home & Smart Wellness', label: 'Home & Wellness' },
];

const PRODUCT_COLLECTIONS = [
  {
    key: 'Smart Kitchen Innovation',
    title: 'Smart Kitchen Innovation',
    description: 'Elevated prep and cooking essentials for modern kitchens, curated with compact utility and premium finishes.',
    products: [
      {
        id: 101,
        title: 'Gropa Infrared Cooktop / Cooker (3500W)',
        subtitle: 'Universal crystal glass top, 4 preset cooking modes, precision touch panel.',
        badge: 'Ready Stock / Limited Stock',
        image: kitchenImg1,
        swatches: [],
      },
      {
        id: 102,
        title: "PDD Falcon 'Fine Chop' Vegetable Chopper",
        subtitle: 'Easy-press mechanism, odour-free stainless steel container.',
        badge: 'Coming Soon',
        image: kitchenImg2,
        swatches: [
          { type: 'Size', value: 'Small: 700ml' },
          { type: 'Size', value: 'Big: 900ml' },
        ],
      },
      {
        id: 103,
        title: "Dubblin 'Swing' Stainless Steel Travel Mug",
        subtitle: 'Premium double-wall insulation for tea & coffee with travel strap.',
        badge: 'Ready Stock',
        image: kitchenImg3,
        swatches: [
          { type: 'Color', value: 'Mint Green' },
          { type: 'Color', value: 'Off-White' },
          { type: 'Color', value: 'Black' },
          { type: 'Color', value: 'Emerald Green' },
          { type: 'Color', value: 'Soft Pink' },
        ],
      },
    ],
  },
  {
    key: 'Premium Food Storage',
    title: 'Premium Food Storage',
    description: 'Refined lunch, storage, and everyday organization pieces designed for clean routines and practical elegance.',
    products: [
      {
        id: 104,
        title: "PDD Falcon 'Tuff' Double Wall Containers",
        subtitle: 'Food-grade 204 Cu stainless steel inner shell, stackable leakproof design.',
        badge: 'Coming Soon',
        image: lunchImg1,
        swatches: [
          { type: 'Size', value: '350ml' },
          { type: 'Size', value: '525ml' },
        ],
      },
      {
        id: 105,
        title: 'Minimalist Stainless Steel Snacks Box',
        subtitle: '550ml capacity, 304 food-grade steel, clean matte cream lid lock.',
        badge: 'Coming Soon',
        image: lunchImg2,
        swatches: [],
      },
      {
        id: 106,
        title: 'Signoraware Steel Lunch Box Big',
        subtitle: '700ml capacity, heavy-duty insulated round thermal lunch carrier.',
        badge: 'Ready Stock',
        image: lunchImg3,
        swatches: [],
      },
      {
        id: 107,
        title: "PDD Falcon 'Lunch Mate' Box Set",
        subtitle: '100% leakproof rectangular multi-tier design. Includes 750ml + 180ml containers.',
        badge: 'Ready Stock',
        image: lunchImg4,
        swatches: [],
      },
      {
        id: 108,
        title: 'Tedemei Pastel Kids Lunch Box',
        subtitle: 'Playful square modular trays, built-in spoon compartment, pastel accent seals.',
        badge: 'Ready Stock',
        image: kitchenImg4,
        swatches: [],
      },
    ],
  },
  {
    key: 'Designer Hydration & Glassware',
    title: 'Designer Hydration & Glassware',
    description: 'Portable drinkware and specialty vessels with expressive prints, child-friendly detailing, and functional silhouettes.',
    products: [
      {
        id: 109,
        title: 'Brazik Mini Printed Art Flask',
        subtitle: '300ml vacuum insulated luxury bottle featuring premium peacock & butterfly floral prints.',
        badge: 'Coming Soon',
        image: bottleImg1,
        swatches: [],
      },
      {
        id: 110,
        title: 'PDD Falcon Kids Sipper Straw Glass',
        subtitle: '450ml air-tight stainless steel tumblers with protective animal decals: Crocodile, Bear, Panda, Lion, Unicorn.',
        badge: 'Ready Stock',
        image: bottleImg2,
        swatches: [],
      },
      {
        id: 111,
        title: 'Aesthetic Clear Spray Bottles',
        subtitle: '100ml compact misting containers with soft floral patterns for beauty and home care.',
        badge: 'Ready Stock',
        image: bottleImg3,
        swatches: [],
      },
    ],
  },
  {
    key: 'Modern Home & Smart Wellness',
    title: 'Modern Home & Smart Wellness',
    description: 'Thoughtful home accessories and compact wellness pieces balancing utility, delight, and contemporary styling.',
    products: [
      {
        id: 112,
        title: 'STC Deep Tissue Gun Massager 203',
        subtitle: 'Minimalist white high-speed percussion motor, long-lasting battery, 4 specialized attachment heads.',
        badge: 'Ready Stock',
        image: electricImg1,
        swatches: [],
      },
      {
        id: 113,
        title: 'Relaxing Electric Scalp Massager',
        subtitle: 'Waterproof, 4 structural 360 degree deep-kneading massage heads, metallic blue ergonomics.',
        badge: 'Ready Stock',
        image: electricImg2,
        swatches: [],
      },
      {
        id: 114,
        title: '5D Texture Geometric Bathroom Mats',
        subtitle: 'High-definition vibrant dimensional floral and stone patterns, non-slip quick-dry backing.',
        badge: 'Ready Stock',
        image: paintingImg,
        swatches: [],
      },
      {
        id: 115,
        title: 'Desktop Mini USB Strawberry Fan',
        subtitle: 'Rechargeable travel cooling fan with integrated desktop dock stand.',
        badge: 'Ready Stock',
        image: fanImg,
        swatches: [
          { type: 'Color', value: 'Green' },
          { type: 'Color', value: 'Pink' },
          { type: 'Color', value: 'Yellow' },
          { type: 'Color', value: 'Orange' },
        ],
      },
      {
        id: 116,
        title: 'Brazik Quick Shoe Wipes',
        subtitle: 'Portable 80-wipe travel pack for instant cleaning on all leather and sneaker materials.',
        badge: 'Ready Stock',
        image: shoeImg,
        swatches: [],
      },
      {
        id: 117,
        title: 'Mechanical Switch LED Keyboard Keychain',
        subtitle: 'RGB illuminated clicky fidget accessory with transparent custom keycaps.',
        badge: 'Ready Stock',
        image: keychainImg,
        swatches: [],
      },
    ],
  },
];

const allProducts = PRODUCT_COLLECTIONS.flatMap((collection) =>
  collection?.products?.map((product) => ({
    ...product,
    collectionKey: collection?.key,
    collectionTitle: collection?.title,
  }))
);

function ProductVisual({ product }) {
  return (
    <div className="relative aspect-[3/2] w-full overflow-hidden bg-[#FBFBFB] p-6">
      {/* Subtle depth effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.8)_0%,transparent_100%)] opacity-40" />
      
      <img
        src={product.image}
        alt={product.title}
        className="relative z-10 h-full w-full object-contain transition-transform duration-1000 ease-in-out group-hover:scale-105"
      />
      
      {/* Elegant inner hairline */}
      <div className="absolute inset-0 border-[0.5px] border-black/[0.04] pointer-events-none" />
    </div>
  );
}

function VariantSwatches({ product }) {
  const swatches = product?.swatches || [];
  const [activeVariant, setActiveVariant] = useState(swatches?.[0]?.value || 'Standard Selection');

  if (!swatches.length) {
    return (
      <div className="flex items-center gap-1.5">
        <div className="h-0.5 w-0.5 rounded-full bg-[#D56F4C]/60" />
        <p className="font-raleway text-[8px] uppercase tracking-widest text-[#2D2B2A]/40 font-bold">Standard Selection</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <p className="font-raleway text-[8px] uppercase tracking-widest text-[#2D2B2A]/30 font-black">Variant</p>
        <span className="font-raleway text-[9px] font-bold text-[#D56F4C] tracking-wide">{activeVariant}</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {swatches.map((swatch, index) => {
          const isActive = activeVariant === swatch?.value;
          return (
            <button
              key={`${swatch?.type}-${swatch?.value}-${index}`}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveVariant(swatch?.value);
              }}
              className={`rounded-none border px-2.5 py-1.5 font-raleway text-[8px] uppercase tracking-wider font-black transition-all duration-300 ${
                isActive
                  ? 'border-[#D56F4C] bg-[#D56F4C] text-white'
                  : 'border-[#2D2B2A]/10 bg-white text-[#2D2B2A]/50 hover:border-[#D56F4C]/40 hover:text-[#D56F4C]'
              }`}
            >
              {swatch?.value}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ProductCard({ product }) {
  const navigate = useNavigate();
  const MessageCircle = Icons['MessageCircle'] || Icons['MessageSquare'];

  const badgeStyles = product?.badge?.toLowerCase()?.includes('coming')
    ? 'bg-black/80 text-white border-white/10'
    : product?.badge?.toLowerCase()?.includes('limited')
      ? 'bg-[#D56F4C] text-white border-transparent'
      : 'bg-white/95 text-[#2D2B2A] border-[#2D2B2A]/10 shadow-sm';

  const handleWhatsApp = (event) => {
    event?.stopPropagation();
    const encodedMessage = encodeURIComponent(
      `Hi! I am looking to inquire about the ${product?.title} (${product?.badge}) shown in your catalog.`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.article
      layout
      whileHover={{ y: -4 }}
      onClick={() => navigate(`/product/${product?.id}`)}
      className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-xl border border-[#2D2B2A]/10 bg-white transition-all duration-500 hover:border-[#D56F4C]/30"
    >
      <div className="relative overflow-hidden">
        <ProductVisual product={product} />
        <div className="absolute right-4 top-4 z-10">
          <span className={`inline-block rounded-none border px-3 py-1.5 text-[7px] font-black uppercase tracking-[0.2em] ${badgeStyles}`}>
            {product?.badge}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-5 p-5 md:p-6">
        <div className="space-y-2.5">
          <div className="flex items-center gap-2">
            <span className="h-[1px] w-4 bg-[#D56F4C]/60" />
            <p className="font-raleway text-[8px] font-black uppercase tracking-widest text-[#D56F4C]">{product?.collectionTitle}</p>
          </div>
          <div className="flex flex-col gap-1.5">
            <h3 className="font-playfair text-xl leading-snug text-[#2D2B2A] group-hover:text-[#D56F4C] transition-colors duration-400">
              {product?.title}
            </h3>
            <p className="font-raleway text-[13px] font-black text-[#D56F4C] tracking-wide">₹299 – ₹799</p>
          </div>
          <p className="line-clamp-2 min-h-[34px] font-raleway text-xs leading-relaxed text-[#2D2B2A]/50">
            {product?.subtitle}
          </p>
        </div>

        <div className="mt-auto flex flex-col gap-5">
          <div className="h-[1px] w-full bg-[#2D2B2A]/5" />
          
          <VariantSwatches product={product} />

          <button
            type="button"
            onClick={handleWhatsApp}
            className="group/btn relative flex w-full items-center justify-between overflow-hidden rounded-none border border-[#2D2B2A] bg-transparent px-6 py-3 font-raleway text-[10px] font-black uppercase tracking-widest text-[#2D2B2A] transition-all duration-400 hover:bg-[#2D2B2A] hover:text-white"
          >
            <span className="relative z-10">Chat on WhatsApp</span>
            <MessageCircle size={16} strokeWidth={2} className="relative z-10 transition-transform duration-400 group-hover/btn:translate-x-1" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

function ProductGrid() {
  const Sparkles = Icons['Sparkles'] || Icons['HelpCircle'];
  const [activeFilter, setActiveFilter] = useState('All Essentials');

  const visibleCollections = useMemo(() => {
    if (activeFilter === 'All Essentials') {
      return PRODUCT_COLLECTIONS;
    }
    return PRODUCT_COLLECTIONS.filter((collection) => collection?.key === activeFilter);
  }, [activeFilter]);

  const visibleProducts = useMemo(() => {
    if (activeFilter === 'All Essentials') {
      return allProducts;
    }
    return allProducts.filter((product) => product?.collectionKey === activeFilter);
  }, [activeFilter]);

  return (
    <section className="w-full bg-[#FDFBF7] px-4 py-16 text-[#2D2B2A] md:px-8 md:py-24">
      <div className="mx-auto flex max-w-[1320px] flex-col gap-14">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D56F4C]/20 bg-white px-4 py-2 text-[#D56F4C] shadow-[0_10px_30px_rgba(213,111,76,0.08)]">
            <Sparkles size={14} strokeWidth={1.7} />
            <span className="font-raleway text-[11px] uppercase tracking-[0.34em]">Editorial Category Catalog</span>
          </div>

          <div className="space-y-4">
            <h2 className="font-playfair text-3xl leading-tight md:text-6xl">Our Curated Collections</h2>
            <p className="mx-auto max-w-2xl font-raleway text-xs leading-relaxed text-[#2D2B2A]/62 md:text-base">
              Explore 17 refined essentials across kitchen innovation, food storage, hydration, and smart home living. Each piece is arranged in a calm, premium browsing experience aligned with the Nandini Collections aesthetic.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3" aria-label="Category filter navigation" role="tablist">
            {FILTERS.map((filter) => {
              const isActive = activeFilter === filter?.key;
              return (
                <button
                  key={filter?.key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveFilter(filter?.key)}
                  className={`rounded-none border px-4 md:px-6 py-2 md:py-2.5 font-raleway text-[9px] md:text-[10px] uppercase tracking-widest transition-all duration-400 ${
                    isActive
                      ? 'border-[#2D2B2A] bg-[#2D2B2A] text-white shadow-lg shadow-black/5'
                      : 'border-[#2D2B2A]/10 bg-white text-[#2D2B2A]/60 hover:border-[#2D2B2A]/30 hover:text-[#2D2B2A]'
                  }`}
                >
                  {filter?.label}
                </button>
              );
            })}
          </div>

          <p className="font-raleway text-[10px] uppercase tracking-widest text-[#2D2B2A]/30">
            Showing {visibleProducts.length} products across {visibleCollections.length} collection{visibleCollections.length > 1 ? 's' : ''}
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="flex flex-col gap-20"
          >
            {visibleCollections.map((collection) => {
              const collectionProducts = allProducts.filter((product) => product?.collectionKey === collection?.key);
              return (
                <section key={collection?.key} className="flex flex-col gap-10">
                  <div className="flex flex-col gap-5 border-b-[0.5px] border-[#2D2B2A]/10 pb-4 md:flex-row md:items-end md:justify-between">
                    <div className="space-y-2">
                      <p className="font-raleway text-[10px] uppercase tracking-widest text-[#D56F4C]">Collection</p>
                      <h3 className="font-playfair text-2xl leading-tight md:text-3xl">{collection?.title}</h3>
                    </div>
                    <p className="max-w-2xl font-raleway text-xs leading-relaxed text-[#2D2B2A]/50 md:text-right">{collection?.description}</p>
                  </div>

                  <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                    {collectionProducts.map((product) => (
                      <ProductCard key={product?.id} product={product} />
                    ))}
                  </div>
                </section>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

export default ProductGrid;
