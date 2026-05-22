import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import elegantCookware from '../assets/elegant_cookware_set_minimal.jpg';
import modernCookware from '../assets/modern_cookware_set.jpg';
import kitchenKnives from '../assets/kitchen_knives_set_elegant.jpg';
import premiumBakeware from '../assets/premium_bakeware_minimal.jpg';
import glassware from '../assets/premium_glassware_drinkware_collection.jpg';
import storageContainers from '../assets/kitchen_storage_containers_minimalist.jpg';
import servingDishes from '../assets/elegant_serving_dishes_platters_premium.jpg';
import kitchenUtensils from '../assets/kitchen_utensils_clean_white.jpg';

const PencilIcon = Icons['Pencil'] || Icons['HelpCircle'];
const TrashIcon = Icons['Trash2'] || Icons['HelpCircle'];
const PlusIcon = Icons['Plus'] || Icons['HelpCircle'];
const PackageIcon = Icons['Package'] || Icons['HelpCircle'];
const AlertCircleIcon = Icons['AlertCircle'] || Icons['HelpCircle'];

const FALLBACK_SRC = 'https://placehold.co/80x80/f5f0e8/D4AF37?text=NC';

const containerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut', staggerChildren: 0.07 }
  }
};

const rowVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: 'easeOut' } },
  exit: { opacity: 0, x: 20, transition: { duration: 0.25, ease: 'easeIn' } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.25, ease: 'easeIn' } }
};

function ConfirmModal({ productName, onConfirm, onCancel }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#3b1c03]/20 backdrop-blur-sm px-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 8 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="bg-white rounded-3xl shadow-[0_12px_48px_rgba(59,28,3,0.12)] p-10 max-w-sm w-full flex flex-col items-center gap-6"
      >
        <div className="w-14 h-14 rounded-full bg-amber-50 flex items-center justify-center">
          <AlertCircleIcon size={28} className="text-[#D4AF37]" strokeWidth={1.5} />
        </div>
        <div className="text-center">
          <h3 className="font-playfair text-xl font-bold text-[#3b1c03] leading-snug mb-2">Remove Product</h3>
          <p className="font-raleway text-sm text-[#3b1c03]/60 leading-relaxed">
            Are you sure you want to remove <span className="font-semibold text-[#3b1c03]">{productName}</span>? This action cannot be undone.
          </p>
        </div>
        <div className="flex gap-3 w-full">
          <button
            onClick={onCancel}
            className="flex-1 py-3 px-6 rounded-full border border-[#3b1c03]/15 font-raleway text-sm font-medium text-[#3b1c03]/70 hover:border-[#D4AF37]/50 hover:text-[#3b1c03] transition-all duration-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 px-6 rounded-full bg-[#D4AF37] font-raleway text-sm font-semibold text-white hover:bg-[#c49d2a] shadow-[0_4px_16px_rgba(212,175,55,0.35)] hover:shadow-[0_6px_24px_rgba(212,175,55,0.5)] transition-all duration-200"
          >
            Remove
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function DashboardProductsTable({ products, onAdd, onEdit, onDelete }) {
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [imgErrors, setImgErrors] = useState({});

  const handleDeleteRequest = (product) => {
    setDeleteTarget(product);
  };

  const handleDeleteConfirm = () => {
    if (deleteTarget && onDelete) {
      onDelete(deleteTarget.id);
    }
    setDeleteTarget(null);
  };

  const handleDeleteCancel = () => {
    setDeleteTarget(null);
  };

  const handleImgError = (id) => {
    setImgErrors((prev) => ({ ...prev, [id]: true }));
  };

  const safeProducts = Array.isArray(products) ? products : [];

  return (
    <>
      <AnimatePresence>
        {deleteTarget && (
          <ConfirmModal
            key="confirm-modal"
            productName={deleteTarget?.name}
            onConfirm={handleDeleteConfirm}
            onCancel={handleDeleteCancel}
          />
        )}
      </AnimatePresence>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full bg-white rounded-3xl shadow-[0_6px_32px_rgba(59,28,3,0.07)] py-8 md:py-10 px-6 md:px-10"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center">
              <PackageIcon size={20} className="text-[#D4AF37]" strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="font-playfair text-2xl font-bold text-[#3b1c03] leading-tight">Products</h2>
              <p className="font-raleway text-xs text-[#3b1c03]/45 mt-0.5">{safeProducts.length} item{safeProducts.length !== 1 ? 's' : ''} in catalog</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.03, boxShadow: '0 8px 28px rgba(212,175,55,0.45)' }}
            whileTap={{ scale: 0.97 }}
            onClick={onAdd}
            className="inline-flex items-center gap-2 bg-[#D4AF37] text-white font-raleway text-sm font-semibold px-6 py-3 rounded-full shadow-[0_4px_18px_rgba(212,175,55,0.32)] transition-colors duration-200 hover:bg-[#c49d2a] self-start sm:self-auto"
          >
            <PlusIcon size={16} strokeWidth={2.5} />
            Add Product
          </motion.button>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent mb-6" />

        {safeProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-16 gap-4"
          >
            <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center">
              <PackageIcon size={32} className="text-[#D4AF37]/60" strokeWidth={1} />
            </div>
            <p className="font-playfair text-lg text-[#3b1c03]/40">No products yet</p>
            <p className="font-raleway text-sm text-[#3b1c03]/30">Add your first product to get started.</p>
          </motion.div>
        ) : (
          <>
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left font-playfair text-sm font-bold text-[#D4AF37] tracking-wide pb-4 pr-6 whitespace-nowrap" style={{letterSpacing: '0.04em'}}>Product</th>
                    <th className="text-left font-playfair text-sm font-bold text-[#D4AF37] tracking-wide pb-4 pr-6 whitespace-nowrap" style={{letterSpacing: '0.04em'}}>Category</th>
                    <th className="text-left font-playfair text-sm font-bold text-[#D4AF37] tracking-wide pb-4 pr-6 whitespace-nowrap" style={{letterSpacing: '0.04em'}}>Price</th>
                    <th className="text-right font-playfair text-sm font-bold text-[#D4AF37] tracking-wide pb-4 whitespace-nowrap" style={{letterSpacing: '0.04em'}}>Actions</th>
                  </tr>
                  <tr>
                    <td colSpan={4} className="pb-2">
                      <div className="h-px bg-[#D4AF37]/15" />
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence mode="popLayout">
                    {safeProducts.map((product, index) => (
                      <motion.tr
                        key={product?.id ?? index}
                        variants={rowVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        layout
                        className="group cursor-default"
                      >
                        <td className="py-4 pr-6">
                          <motion.div
                            whileHover={{ boxShadow: '0 4px_20px_rgba(212,175,55,0.22)' }}
                            className="flex items-center gap-4"
                          >
                            <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 bg-amber-50 border border-[#D4AF37]/10">
                              <img
                                src={imgErrors[product?.id] ? FALLBACK_SRC : (product?.image || FALLBACK_SRC)}
                                alt={product?.name || 'Product'}
                                onError={() => handleImgError(product?.id)}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                            </div>
                            <div>
                              <p className="font-raleway font-semibold text-[#3b1c03] text-sm leading-[1.4] group-hover:text-[#D4AF37] transition-colors duration-200">{product?.name}</p>
                              {product?.sku && (
                                <p className="font-raleway text-xs text-[#3b1c03]/35 mt-0.5">SKU: {product?.sku}</p>
                              )}
                            </div>
                          </motion.div>
                        </td>
                        <td className="py-4 pr-6">
                          <span className="inline-flex items-center px-3 py-1 rounded-full bg-amber-50 font-raleway text-xs font-medium text-[#D4AF37] border border-[#D4AF37]/20">
                            {product?.category || '—'}
                          </span>
                        </td>
                        <td className="py-4 pr-6">
                          <span className="font-raleway text-sm font-semibold text-[#3b1c03]/80">
                            {product?.price ? `₹${Number(product.price).toLocaleString('en-IN')}` : '—'}
                          </span>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center justify-end gap-2">
                            <motion.button
                              whileHover={{ scale: 1.12, boxShadow: '0 4px 16px rgba(212,175,55,0.3)' }}
                              whileTap={{ scale: 0.93 }}
                              onClick={() => onEdit && onEdit(product)}
                              className="w-9 h-9 rounded-full border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37]/8 hover:border-[#D4AF37] transition-all duration-200"
                              aria-label={`Edit ${product?.name}`}
                            >
                              <PencilIcon size={15} strokeWidth={1.8} />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.12, boxShadow: '0 4px 16px rgba(212,175,55,0.3)' }}
                              whileTap={{ scale: 0.93 }}
                              onClick={() => handleDeleteRequest(product)}
                              className="w-9 h-9 rounded-full border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37]/8 hover:border-[#D4AF37] transition-all duration-200"
                              aria-label={`Delete ${product?.name}`}
                            >
                              <TrashIcon size={15} strokeWidth={1.8} />
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>

            <div className="md:hidden flex flex-col gap-4">
              <AnimatePresence mode="popLayout">
                {safeProducts.map((product, index) => (
                  <motion.div
                    key={product?.id ?? index}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    layout
                    className="flex items-center gap-4 p-4 rounded-2xl border border-[#D4AF37]/12 bg-white shadow-[0_2px_12px_rgba(59,28,3,0.05)] hover:shadow-[0_4px_20px_rgba(212,175,55,0.14)] hover:border-[#D4AF37]/30 transition-all duration-250"
                  >
                    <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 bg-amber-50 border border-[#D4AF37]/10">
                      <img
                        src={imgErrors[product?.id] ? FALLBACK_SRC : (product?.image || FALLBACK_SRC)}
                        alt={product?.name || 'Product'}
                        onError={() => handleImgError(product?.id)}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-raleway font-semibold text-[#3b1c03] text-sm leading-[1.4] truncate">{product?.name}</p>
                      <span className="inline-flex items-center mt-1 px-2.5 py-0.5 rounded-full bg-amber-50 font-raleway text-xs font-medium text-[#D4AF37] border border-[#D4AF37]/20">
                        {product?.category || '—'}
                      </span>
                      {product?.price && (
                        <p className="font-raleway text-xs font-semibold text-[#3b1c03]/60 mt-1">
                          ₹{Number(product.price).toLocaleString('en-IN')}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-2 flex-shrink-0">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.92 }}
                        onClick={() => onEdit && onEdit(product)}
                        className="w-9 h-9 rounded-full border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] hover:bg-amber-50 transition-all duration-200"
                        aria-label={`Edit ${product?.name}`}
                      >
                        <PencilIcon size={15} strokeWidth={1.8} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.92 }}
                        onClick={() => handleDeleteRequest(product)}
                        className="w-9 h-9 rounded-full border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] hover:bg-amber-50 transition-all duration-200"
                        aria-label={`Delete ${product?.name}`}
                      >
                        <TrashIcon size={15} strokeWidth={1.8} />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </>
        )}

        {safeProducts.length > 0 && (
          <div className="mt-8 pt-5 border-t border-[#D4AF37]/12 flex items-center justify-between">
            <p className="font-raleway text-xs text-[#3b1c03]/35">
              Showing {safeProducts.length} product{safeProducts.length !== 1 ? 's' : ''}
            </p>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/40" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/70" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
            </div>
          </div>
        )}
      </motion.div>
    </>
  );
}

export default DashboardProductsTable;
