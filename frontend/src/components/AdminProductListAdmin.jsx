import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';

const SearchIcon = Icons['Search'] || Icons['HelpCircle'];
const PlusIcon = Icons['Plus'] || Icons['HelpCircle'];
const EditIcon = Icons['Pencil'] || Icons['HelpCircle'];
const DeleteIcon = Icons['Trash2'] || Icons['HelpCircle'];
const PackageIcon = Icons['Package'] || Icons['HelpCircle'];

const rowVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.045, duration: 0.32, ease: 'easeOut' },
  }),
  exit: { opacity: 0, x: -24, transition: { duration: 0.22, ease: 'easeIn' } },
};

const containerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.42, ease: 'easeOut' } },
};

export default function AdminProductListAdmin({ products = [], onEdit, onDelete, onAdd }) {
  const [search, setSearch] = useState('');

  const filtered = products.filter((p) => {
    const q = search.toLowerCase();
    return (
      p?.name?.toLowerCase().includes(q) ||
      p?.category?.toLowerCase().includes(q)
    );
  });

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-screen-xl mx-auto px-4 md:px-8 py-10"
    >
      <div
        className="bg-white rounded-2xl shadow-lg border border-yellow-100"
        style={{ boxShadow: '0 2px 32px 0 rgba(212,175,55,0.10)' }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-6 md:px-8 pt-8 pb-6 border-b border-yellow-100">
          <div className="flex items-center gap-3">
            <PackageIcon className="text-yellow-500 w-6 h-6 shrink-0" />
            <h2
              data-imagine-id="admin-product-list-admin-heading"
              className="text-xl md:text-2xl font-bold tracking-widest uppercase text-stone-900"
              style={{ fontFamily: 'Cinzel, Arial, serif' }}
            >
              Product Management
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-yellow-400 pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.currentTarget.value)}
                placeholder="Search products..."
                aria-label="Search products"
                className="pl-9 pr-4 py-2.5 rounded-xl border border-yellow-200 bg-yellow-50 text-stone-700 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition w-full sm:w-56"
                style={{ fontFamily: 'Raleway, Arial, sans-serif' }}
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.04, backgroundColor: '#b8942c' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onAdd?.()}
              aria-label="Add new product"
              className="flex items-center gap-2 px-6 py-2.5 bg-yellow-500 text-white font-semibold rounded-xl shadow transition text-sm tracking-wide"
              style={{ fontFamily: 'Raleway, Arial, sans-serif', backgroundColor: '#D4AF37' }}
              data-imagine-id="admin-product-list-admin-add-btn"
            >
              <PlusIcon className="w-4 h-4" />
              Add Product
            </motion.button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-b-2xl">
          <table className="w-full text-sm" style={{ fontFamily: 'Raleway, Arial, sans-serif' }}>
            <thead>
              <tr className="sticky top-0 z-10 bg-yellow-50 border-b border-yellow-100">
                <th
                  data-imagine-id="admin-product-list-admin-th-name"
                  className="text-left px-6 py-4 text-xs font-bold uppercase tracking-widest text-yellow-700"
                  style={{ fontFamily: 'Cinzel, Arial, serif' }}
                >
                  Product Name
                </th>
                <th
                  data-imagine-id="admin-product-list-admin-th-category"
                  className="text-left px-4 py-4 text-xs font-bold uppercase tracking-widest text-yellow-700"
                  style={{ fontFamily: 'Cinzel, Arial, serif' }}
                >
                  Category
                </th>
                <th
                  data-imagine-id="admin-product-list-admin-th-price"
                  className="text-left px-4 py-4 text-xs font-bold uppercase tracking-widest text-yellow-700"
                  style={{ fontFamily: 'Cinzel, Arial, serif' }}
                >
                  Price
                </th>
                <th
                  data-imagine-id="admin-product-list-admin-th-actions"
                  className="text-center px-4 py-4 text-xs font-bold uppercase tracking-widest text-yellow-700"
                  style={{ fontFamily: 'Cinzel, Arial, serif' }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence initial={false}>
                {filtered.length === 0 && (
                  <motion.tr
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <td colSpan={4} className="text-center py-16 text-stone-400">
                      <span data-imagine-id="admin-product-list-admin-empty-msg" style={{ fontFamily: 'Raleway, Arial, sans-serif' }}>
                        No products found.
                      </span>
                    </td>
                  </motion.tr>
                )}
                {filtered.map((product, i) => (
                  <motion.tr
                    key={product?.id ?? i}
                    custom={i}
                    variants={rowVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    layout
                    className={`border-b border-stone-100 transition-colors ${
                      i % 2 === 0 ? 'bg-white' : 'bg-stone-50'
                    } hover:bg-yellow-50`}
                  >
                    <td className="px-6 py-4 font-semibold text-stone-800 whitespace-nowrap">
                      <span data-imagine-id={`admin-product-list-admin-row-${i}-name`}>
                        {product?.name}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span
                        data-imagine-id={`admin-product-list-admin-row-${i}-category`}
                        className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wide border border-yellow-200 text-yellow-700 bg-yellow-50"
                      >
                        {product?.category}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-stone-700 whitespace-nowrap">
                      <span data-imagine-id={`admin-product-list-admin-row-${i}-price`}>
                        {product?.price !== undefined && product?.price !== null
                          ? `₹${Number(product.price).toLocaleString('en-IN')}`
                          : '—'}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <motion.button
                          whileHover={{ scale: 1.18, color: '#D4AF37' }}
                          whileTap={{ scale: 0.92 }}
                          onClick={() => onEdit?.(product)}
                          aria-label={`Edit ${product?.name}`}
                          className="p-2 rounded-lg text-stone-400 hover:text-yellow-500 hover:bg-yellow-50 transition-colors"
                        >
                          <EditIcon className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.18, color: '#D4AF37' }}
                          whileTap={{ scale: 0.92 }}
                          onClick={() => onDelete?.(product?.id ?? product)}
                          aria-label={`Delete ${product?.name}`}
                          className="p-2 rounded-lg text-stone-400 hover:text-yellow-500 hover:bg-yellow-50 transition-colors"
                        >
                          <DeleteIcon className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {filtered.length > 0 && (
          <div className="px-6 md:px-8 py-4 border-t border-yellow-100 flex items-center justify-between">
            <p
              data-imagine-id="admin-product-list-admin-count"
              className="text-xs text-stone-400"
              style={{ fontFamily: 'Raleway, Arial, sans-serif' }}
            >
              Showing <span className="font-semibold text-stone-600">{filtered.length}</span> of{' '}
              <span className="font-semibold text-stone-600">{products.length}</span> products
            </p>
          </div>
        )}
      </div>
    </motion.section>
  );
}
