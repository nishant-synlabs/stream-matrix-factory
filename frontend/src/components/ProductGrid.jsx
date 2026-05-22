import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';

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
        swatches: [],
      },
      {
        id: 102,
        title: "PDD Falcon 'Fine Chop' Vegetable Chopper",
        subtitle: 'Easy-press mechanism, odour-free stainless steel container.',
        badge: 'Coming Soon',
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
        swatches: [],
      },
      {
        id: 106,
        title: 'Signoraware Steel Lunch Box Big',
        subtitle: '700ml capacity, heavy-duty insulated round thermal lunch carrier.',
        badge: 'Ready Stock',
        swatches: [],
      },
      {
        id: 107,
        title: "PDD Falcon 'Lunch Mate' Box Set",
        subtitle: '100% leakproof rectangular multi-tier design. Includes 750ml + 180ml containers.',
        badge: 'Ready Stock',
        swatches: [],
      },
      {
        id: 108,
        title: 'Tedemei Pastel Kids Lunch Box',
        subtitle: 'Playful square modular trays, built-in spoon compartment, pastel accent seals.',
        badge: 'Ready Stock',
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
        swatches: [],
      },
      {
        id: 110,
        title: 'PDD Falcon Kids Sipper Straw Glass',
        subtitle: '450ml air-tight stainless steel tumblers with protective animal decals: Crocodile, Bear, Panda, Lion, Unicorn.',
        badge: 'Ready Stock',
        swatches: [],
      },
      {
        id: 111,
        title: 'Aesthetic Clear Spray Bottles',
        subtitle: '100ml compact misting containers with soft floral patterns for beauty and home care.',
        badge: 'Ready Stock',
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
        swatches: [],
      },
      {
        id: 113,
        title: 'Relaxing Electric Scalp Massager',
        subtitle: 'Waterproof, 4 structural 360 degree deep-kneading massage heads, metallic blue ergonomics.',
        badge: 'Ready Stock',
        swatches: [],
      },
      {
        id: 114,
        title: '5D Texture Geometric Bathroom Mats',
        subtitle: 'High-definition vibrant dimensional floral and stone patterns, non-slip quick-dry backing.',
        badge: 'Ready Stock',
        swatches: [],
      },
      {
        id: 115,
        title: 'Desktop Mini USB Strawberry Fan',
        subtitle: 'Rechargeable travel cooling fan with integrated desktop dock stand.',
        badge: 'Ready Stock',
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
        swatches: [],
      },
      {
        id: 117,
        title: 'Mechanical Switch LED Keyboard Keychain',
        subtitle: 'RGB illuminated clicky fidget accessory with transparent custom keycaps.',
        badge: 'Ready Stock',
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

function PlaceholderVisual({ title }) {
  return (
    <div className="relative flex h-full min-h-[260px] w-full items-center justify-center overflow-hidden bg-[#F6F0E8] px-6 py-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#ffffff_0%,transparent_50%)] opacity-70" />
      <div className="absolute left-6 top-6 h-14 w-14 rounded-full border border-[#D56F4C]/20" />
      <div className="absolute bottom-6 right-6 h-20 w-20 rounded-full border border-[#2D2B2A]/8" />
      <div className="absolute inset-x-8 bottom-8 h-px bg-gradient-to-r from-transparent via-[#D56F4C]/40 to-transparent" />
      <div className="relative flex max-w-[220px] flex-col items-center gap-4 text-center">
        <div className="flex gap-2">
          <span className="h-2 w-2 rounded-full bg-[#D56F4C]" />
          <span className="h-2 w-2 rounded-full bg-[#D56F4C]/50" />
          <span className="h-2 w-2 rounded-full bg-[#D56F4C]/25" />
        </div>
        <p className="font-playfair text-2xl leading-tight text-[#2D2B2A]">{title}</p>
        <p className="font-raleway text-[11px] uppercase tracking-[0.32em] text-[#2D2B2A]/45">Curated catalog preview</p>
      </div>
    </div>
  );
}

function VariantSwatches({ product }) {
  const swatches = product?.swatches || [];
  const [activeVariant, setActiveVariant] = useState(swatches?.[0]?.value || 'Standard Selection');

  if (!swatches.length) {
    return (
      <div className="flex min-h-14 flex-col gap-2">
        <p className="font-raleway text-[11px] uppercase tracking-[0.22em] text-[#2D2B2A]/35">Selection</p>
        <p className="font-raleway text-sm text-[#2D2B2A]/65">Standard Selection</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <p className="font-raleway text-[11px] uppercase tracking-[0.22em] text-[#2D2B2A]/35">Variant</p>
        <p className="font-raleway text-xs text-[#D56F4C]">{activeVariant}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {swatches.map((swatch, index) => {
          const isActive = activeVariant === swatch?.value;
          return (
            <button
              key={`${swatch?.type}-${swatch?.value}-${index}`}
              type="button"
              onClick={() => setActiveVariant(swatch?.value)}
              aria-label={`${swatch?.type}: ${swatch?.value}`}
              className={`rounded-full border px-3 py-1.5 font-raleway text-[11px] uppercase tracking-[0.16em] transition-all duration-200 ${
                isActive
                  ? 'border-[#D56F4C] bg-[#D56F4C] text-white'
                  : 'border-[#2D2B2A]/12 bg-white text-[#2D2B2A]/60 hover:border-[#D56F4C]/50 hover:text-[#D56F4C]'
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

  const badgeTone = product?.badge?.toLowerCase()?.includes('coming')
    ? 'border-[#2D2B2A]/15 text-[#2D2B2A]/55 bg-white/80'
    : product?.badge?.toLowerCase()?.includes('limited')
      ? 'border-[#D56F4C]/30 text-[#D56F4C] bg-[#fff7f3]'
      : 'border-[#2D2B2A]/12 text-[#2D2B2A]/70 bg-white';

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
      whileHover={{ y: -6 }}
      onClick={() => navigate(`/product/${product?.id}`)}
      className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-[28px] border border-[#2D2B2A]/8 bg-white shadow-[0_18px_60px_rgba(45,43,42,0.06)] transition-all duration-300"
    >
      <div className="overflow-hidden">
        <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3, ease: 'easeOut' }} className="h-full w-full">
          <PlaceholderVisual title={product?.title} />
        </motion.div>
      </div>

      <div className="flex flex-1 flex-col gap-5 p-6 md:p-7">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3">
            <p className="font-raleway text-[11px] uppercase tracking-[0.28em] text-[#D56F4C]">{product?.collectionTitle}</p>
            <h3 className="font-playfair text-[1.55rem] leading-tight text-[#2D2B2A]">{product?.title}</h3>
          </div>
          <span className={`shrink-0 rounded-full border px-3 py-1.5 text-[10px] font-raleway uppercase tracking-[0.24em] ${badgeTone}`}>
            {product?.badge}
          </span>
        </div>

        <p className="font-raleway text-sm leading-7 text-[#2D2B2A]/68">{product?.subtitle}</p>

        <VariantSwatches product={product} />

        <div className="mt-auto flex items-center justify-between gap-4 border-t border-[#2D2B2A]/8 pt-5">
          <button
            type="button"
            onClick={handleWhatsApp}
            aria-label={`Inquire about ${product?.title} on WhatsApp`}
            className="inline-flex items-center gap-2 rounded-full bg-[#D56F4C] px-5 py-3 font-raleway text-[11px] uppercase tracking-[0.24em] text-white transition-all duration-300 hover:bg-[#c95f3e]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            Inquire on WhatsApp
          </button>

          <span className="font-raleway text-[11px] uppercase tracking-[0.24em] text-[#2D2B2A]/35">
            View Detail
          </span>
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
            <h2 className="font-playfair text-4xl leading-tight md:text-6xl">Our Curated Collections</h2>
            <p className="mx-auto max-w-2xl font-raleway text-sm leading-8 text-[#2D2B2A]/62 md:text-base">
              Explore 17 refined essentials across kitchen innovation, food storage, hydration, and smart home living. Each piece is arranged in a calm, premium browsing experience aligned with the Nandini Collections aesthetic.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3" aria-label="Category filter navigation" role="tablist">
            {FILTERS.map((filter) => {
              const isActive = activeFilter === filter?.key;
              return (
                <button
                  key={filter?.key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveFilter(filter?.key)}
                  className={`rounded-full border px-5 py-3 font-raleway text-[11px] uppercase tracking-[0.26em] transition-all duration-300 ${
                    isActive
                      ? 'border-[#D56F4C] bg-[#D56F4C] text-white shadow-[0_12px_32px_rgba(213,111,76,0.22)]'
                      : 'border-[#2D2B2A]/10 bg-white text-[#2D2B2A]/62 hover:border-[#D56F4C]/35 hover:text-[#D56F4C]'
                  }`}
                >
                  {filter?.label}
                </button>
              );
            })}
          </div>

          <p className="font-raleway text-[11px] uppercase tracking-[0.3em] text-[#2D2B2A]/34">
            Showing {visibleProducts.length} products across {visibleCollections.length} collection{visibleCollections.length > 1 ? 's' : ''}
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="flex flex-col gap-16"
          >
            {visibleCollections.map((collection) => {
              const collectionProducts = allProducts.filter((product) => product?.collectionKey === collection?.key);
              return (
                <section key={collection?.key} className="flex flex-col gap-8">
                  <div className="flex flex-col gap-4 border-b border-[#2D2B2A]/8 pb-6 md:flex-row md:items-end md:justify-between">
                    <div className="space-y-3">
                      <p className="font-raleway text-[11px] uppercase tracking-[0.32em] text-[#D56F4C]">Collection</p>
                      <h3 className="font-playfair text-3xl leading-tight md:text-4xl">{collection?.title}</h3>
                    </div>
                    <p className="max-w-2xl font-raleway text-sm leading-7 text-[#2D2B2A]/58 md:text-right">{collection?.description}</p>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
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
