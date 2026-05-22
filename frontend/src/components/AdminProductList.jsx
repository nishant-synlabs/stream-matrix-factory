import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import bakewareTray from '../assets/bakeware_tray_set.jpg';
import cutlerySet from '../assets/cutlery_silverware_set.jpg';
import cookwareSet from '../assets/elegant_cookware_set_minimal.jpg';
import knivesSet from '../assets/kitchen_knives_set_elegant.jpg';
import storageContainers from '../assets/kitchen_storage_containers.jpg';

const PencilIcon = Icons['Pencil'] || Icons['HelpCircle'];
const TrashIcon = Icons['Trash2'] || Icons['HelpCircle'];
const StarIcon = Icons['Star'] || Icons['HelpCircle'];
const StarOffIcon = Icons['StarOff'] || Icons['HelpCircle'];
const XIcon = Icons['X'] || Icons['HelpCircle'];
const AlertTriangleIcon = Icons['AlertTriangle'] || Icons['HelpCircle'];
const CheckIcon = Icons['Check'] || Icons['HelpCircle'];
const LoaderIcon = Icons['Loader2'] || Icons['HelpCircle'];
const ChevronLeftIcon = Icons['ChevronLeft'] || Icons['HelpCircle'];
const ChevronRightIcon = Icons['ChevronRight'] || Icons['HelpCircle'];

const INITIAL_PRODUCTS = [
  { id: 1, name: 'Artisan Bakeware Tray Set', category: 'Bakeware', price: 3200, featured: true, image: bakewareTray },
  { id: 2, name: 'Sterling Cutlery Collection', category: 'Cutlery', price: 5800, featured: false, image: cutlerySet },
  { id: 3, name: 'Minimal Cookware Set', category: 'Cookware', price: 8500, featured: true, image: cookwareSet },
  { id: 4, name: 'Precision Kitchen Knives', category: 'Knives', price: 4200, featured: false, image: knivesSet },
  { id: 5, name: 'Modular Storage Containers', category: 'Storage', price: 2100, featured: false, image: storageContainers },
];

const PAGE_SIZE = 4;

const rowVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.35, ease: 'easeOut' } }),
  exit: { opacity: 0, x: -24, transition: { duration: 0.25, ease: 'easeIn' } },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.28, ease: 'easeOut' } },
  exit: { opacity: 0, scale: 0.94, transition: { duration: 0.2, ease: 'easeIn' } },
};

function EditModal({ product, onClose, onSave }) {
  const [form, setForm] = useState({ name: product?.name ?? '', category: product?.category ?? '', price: product?.price ?? 0 });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    setForm((prev) => ({ ...prev, [name]: name === 'price' ? Number(value) : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSuccess(true);
    await new Promise((r) => setTimeout(r, 600));
    onSave({ ...product, ...form });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
      <AnimatePresence>
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8"
          style={{ boxShadow: '0 2px 32px 0 rgba(212,175,55,0.13)' }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 data-imagine-id="adminproductlist-edit-modal-title" className="text-xl font-semibold text-[#212121] font-raleway tracking-tight">Edit Product</h2>
            <button onClick={onClose} aria-label="Close" className="p-2 rounded-xl hover:bg-[#D4AF37]/10 transition-colors">
              <XIcon size={18} className="text-[#212121]" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label data-imagine-id="adminproductlist-edit-name-label" htmlFor="edit-name" className="text-xs font-semibold uppercase tracking-widest text-[#212121]/50">Product Name</label>
              <input
                id="edit-name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="border border-[#212121]/10 rounded-xl px-4 py-3 text-sm text-[#212121] font-raleway bg-[#fafafa] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 transition"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label data-imagine-id="adminproductlist-edit-category-label" htmlFor="edit-category" className="text-xs font-semibold uppercase tracking-widest text-[#212121]/50">Category</label>
              <input
                id="edit-category"
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                className="border border-[#212121]/10 rounded-xl px-4 py-3 text-sm text-[#212121] font-raleway bg-[#fafafa] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 transition"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label data-imagine-id="adminproductlist-edit-price-label" htmlFor="edit-price" className="text-xs font-semibold uppercase tracking-widest text-[#212121]/50">Price (₹)</label>
              <input
                id="edit-price"
                name="price"
                type="number"
                min={0}
                value={form.price}
                onChange={handleChange}
                required
                className="border border-[#212121]/10 rounded-xl px-4 py-3 text-sm text-[#212121] font-raleway bg-[#fafafa] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 transition"
              />
            </div>
            <button
              type="submit"
              disabled={loading || success}
              data-imagine-id="adminproductlist-edit-save-btn"
              className="mt-2 py-4 px-8 rounded-xl bg-[#D4AF37] text-white font-semibold text-sm tracking-wide hover:bg-[#b8962e] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading && <LoaderIcon size={16} className="animate-spin" />}
              {success && <CheckIcon size={16} />}
              {loading ? 'Saving...' : success ? 'Saved!' : 'Save Changes'}
            </button>
          </form>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function DeleteModal({ product, onClose, onConfirm }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    onConfirm(product?.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
      <AnimatePresence>
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 flex flex-col items-center text-center"
          style={{ boxShadow: '0 2px 32px 0 rgba(212,175,55,0.13)' }}
        >
          <div className="w-14 h-14 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mb-5">
            <AlertTriangleIcon size={26} className="text-[#D4AF37]" />
          </div>
          <h2 data-imagine-id="adminproductlist-delete-modal-title" className="text-lg font-semibold text-[#212121] font-raleway mb-2">Delete Product?</h2>
          <p data-imagine-id="adminproductlist-delete-modal-desc" className="text-sm text-[#212121]/55 mb-7 font-raleway">
            <span className="font-semibold text-[#212121]">{product?.name}</span> will be permanently removed from the catalog.
          </p>
          <div className="flex gap-3 w-full">
            <button
              onClick={onClose}
              data-imagine-id="adminproductlist-delete-cancel-btn"
              className="flex-1 py-3 px-4 rounded-xl border border-[#212121]/10 text-sm font-semibold text-[#212121] hover:bg-[#f5f5f5] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={loading}
              data-imagine-id="adminproductlist-delete-confirm-btn"
              className="flex-1 py-3 px-4 rounded-xl bg-[#D4AF37] text-white text-sm font-semibold hover:bg-[#b8962e] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading && <LoaderIcon size={14} className="animate-spin" />}
              {loading ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function AdminProductList({ products: propProducts }) {
  const [products, setProducts] = useState(propProducts ?? INITIAL_PRODUCTS);
  const [selectedId, setSelectedId] = useState(null);
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [togglingId, setTogglingId] = useState(null);

  const totalPages = Math.max(1, Math.ceil(products.length / PAGE_SIZE));
  const paginated = products.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleToggleFeatured = useCallback(async (id) => {
    setTogglingId(id);
    await new Promise((r) => setTimeout(r, 500));
    setProducts((prev) => prev.map((p) => p?.id === id ? { ...p, featured: !p.featured } : p));
    setTogglingId(null);
  }, []);

  const handleSaveEdit = useCallback((updated) => {
    setProducts((prev) => prev.map((p) => p?.id === updated?.id ? updated : p));
    setEditTarget(null);
  }, []);

  const handleConfirmDelete = useCallback((id) => {
    setProducts((prev) => prev.filter((p) => p?.id !== id));
    setDeleteTarget(null);
    setSelectedId(null);
    setCurrentPage((prev) => {
      const newTotal = Math.max(1, Math.ceil((products.length - 1) / PAGE_SIZE));
      return prev > newTotal ? newTotal : prev;
    });
  }, [products.length]);

  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-[#fafaf8] via-white to-[#f9f6ef] px-4 md:px-10 py-10">
      <div className="max-w-screen-xl mx-auto">

        <div className="mb-8">
          <h1 data-imagine-id="adminproductlist-section-title" className="text-2xl md:text-3xl font-semibold text-[#212121] tracking-tight font-raleway">Product Inventory</h1>
          <p data-imagine-id="adminproductlist-section-desc" className="text-sm text-[#212121]/45 mt-1 font-raleway">{products.length} product{products.length !== 1 ? 's' : ''} in catalog</p>
        </div>

        <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: '0 2px 32px 0 rgba(212,175,55,0.12)' }}>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b-2 border-[#D4AF37]/30">
                  <th data-imagine-id="adminproductlist-col-thumb" className="text-left text-xs font-semibold uppercase tracking-widest text-[#212121]/40 px-5 py-4 w-16">Thumb</th>
                  <th data-imagine-id="adminproductlist-col-name" className="text-left text-xs font-semibold uppercase tracking-widest text-[#212121]/40 px-4 py-4">Name</th>
                  <th data-imagine-id="adminproductlist-col-category" className="text-left text-xs font-semibold uppercase tracking-widest text-[#212121]/40 px-4 py-4 hidden sm:table-cell">Category</th>
                  <th data-imagine-id="adminproductlist-col-price" className="text-left text-xs font-semibold uppercase tracking-widest text-[#212121]/40 px-4 py-4 hidden md:table-cell">Price</th>
                  <th data-imagine-id="adminproductlist-col-featured" className="text-center text-xs font-semibold uppercase tracking-widest text-[#212121]/40 px-4 py-4">Featured</th>
                  <th data-imagine-id="adminproductlist-col-actions" className="text-center text-xs font-semibold uppercase tracking-widest text-[#212121]/40 px-5 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence mode="popLayout">
                  {paginated.map((product, i) => {
                    const isSelected = selectedId === product?.id;
                    const isToggling = togglingId === product?.id;
                    return (
                      <motion.tr
                        key={product?.id}
                        custom={i}
                        variants={rowVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        layout
                        onClick={() => setSelectedId(isSelected ? null : product?.id)}
                        className={`cursor-pointer border-b border-[#212121]/5 transition-colors duration-200 ${
                          isSelected ? 'bg-[#D4AF37]/8' : 'hover:bg-[#D4AF37]/4'
                        }`}
                        style={isSelected ? { background: 'rgba(212,175,55,0.07)' } : {}}
                      >
                        <td className="px-5 py-3">
                          <div className="w-10 h-10 rounded-xl overflow-hidden border border-[#212121]/8 bg-[#f5f5f3]">
                            <img
                              data-imagine-id={`adminproductlist-row-${product?.id}-thumb`}
                              src={product?.image}
                              alt={product?.name}
                              className="w-full h-full object-cover"
                              onError={(e) => { e.currentTarget.src = 'https://placehold.co/40x40/f5f5f3/D4AF37?text=NC'; }}
                            />
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span data-imagine-id={`adminproductlist-row-${product?.id}-name`} className="text-sm font-semibold text-[#212121] font-raleway tracking-tight">{product?.name}</span>
                        </td>
                        <td className="px-4 py-3 hidden sm:table-cell">
                          <span data-imagine-id={`adminproductlist-row-${product?.id}-category`} className="text-xs font-medium text-[#212121]/50 bg-[#D4AF37]/10 px-2.5 py-1 rounded-full font-raleway">{product?.category}</span>
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          <span data-imagine-id={`adminproductlist-row-${product?.id}-price`} className="text-sm font-semibold text-[#212121] font-raleway">₹{product?.price?.toLocaleString('en-IN')}</span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={(e) => { e.stopPropagation(); handleToggleFeatured(product?.id); }}
                            aria-label={product?.featured ? 'Unfeature product' : 'Feature product'}
                            disabled={isToggling}
                            className="inline-flex items-center justify-center w-9 h-9 rounded-xl transition-colors hover:bg-[#D4AF37]/10 disabled:opacity-50"
                          >
                            {isToggling
                              ? <LoaderIcon size={16} className="animate-spin text-[#D4AF37]" />
                              : product?.featured
                                ? <StarIcon size={17} className="text-[#D4AF37] fill-[#D4AF37]" />
                                : <StarOffIcon size={17} className="text-[#212121]/30" />}
                          </button>
                        </td>
                        <td className="px-5 py-3 text-center">
                          <div className="flex items-center justify-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => setEditTarget(product)}
                              aria-label="Edit product"
                              className="inline-flex items-center justify-center w-9 h-9 rounded-xl border border-[#212121]/10 hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/8 transition-all group"
                            >
                              <PencilIcon size={15} className="text-[#212121]/50 group-hover:text-[#D4AF37] transition-colors" />
                            </button>
                            <button
                              onClick={() => setDeleteTarget(product)}
                              aria-label="Delete product"
                              className="inline-flex items-center justify-center w-9 h-9 rounded-xl border border-[#212121]/10 hover:border-[#D4AF37]/60 hover:bg-[#D4AF37]/10 transition-all group"
                            >
                              <TrashIcon size={15} className="text-[#D4AF37]/70 group-hover:text-[#D4AF37] transition-colors" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
                {paginated.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center py-14">
                      <p data-imagine-id="adminproductlist-empty-state" className="text-sm text-[#212121]/35 font-raleway">No products found.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between px-5 py-4 border-t border-[#212121]/6">
              <span data-imagine-id="adminproductlist-pagination-info" className="text-xs text-[#212121]/40 font-raleway">Page {currentPage} of {totalPages}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                  data-imagine-id="adminproductlist-prev-page-btn"
                  className="w-8 h-8 rounded-xl border border-[#212121]/10 flex items-center justify-center hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/40 transition-all disabled:opacity-30"
                >
                  <ChevronLeftIcon size={15} className="text-[#212121]" />
                </button>
                {Array.from({ length: totalPages }, (_, idx) => (
                  <button
                    key={idx + 1}
                    onClick={() => setCurrentPage(idx + 1)}
                    data-imagine-id={`adminproductlist-page-${idx + 1}-btn`}
                    className={`w-8 h-8 rounded-xl text-xs font-semibold transition-all ${
                      currentPage === idx + 1
                        ? 'bg-[#D4AF37] text-white shadow-sm'
                        : 'border border-[#212121]/10 text-[#212121]/50 hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/40'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                  data-imagine-id="adminproductlist-next-page-btn"
                  className="w-8 h-8 rounded-xl border border-[#212121]/10 flex items-center justify-center hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/40 transition-all disabled:opacity-30"
                >
                  <ChevronRightIcon size={15} className="text-[#212121]" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {editTarget && (
          <EditModal
            key="edit-modal"
            product={editTarget}
            onClose={() => setEditTarget(null)}
            onSave={handleSaveEdit}
          />
        )}
        {deleteTarget && (
          <DeleteModal
            key="delete-modal"
            product={deleteTarget}
            onClose={() => setDeleteTarget(null)}
            onConfirm={handleConfirmDelete}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
