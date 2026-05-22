import { useState, useReducer, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';

const PlusIcon = Icons['Plus'] || Icons['HelpCircle'];
const TrashIcon = Icons['Trash2'] || Icons['HelpCircle'];
const EditIcon = Icons['Pencil'] || Icons['HelpCircle'];
const XIcon = Icons['X'] || Icons['HelpCircle'];
const CheckIcon = Icons['Check'] || Icons['HelpCircle'];
const PackageIcon = Icons['Package'] || Icons['HelpCircle'];
const TagIcon = Icons['Tag'] || Icons['HelpCircle'];
const SaveIcon = Icons['Save'] || Icons['HelpCircle'];
const AlertIcon = Icons['AlertCircle'] || Icons['HelpCircle'];

const INITIAL_CATEGORIES = [
  { id: 'cat-1', name: 'Cookware', description: 'Pots, pans, and cooking vessels' },
  { id: 'cat-2', name: 'Bakeware', description: 'Baking trays, molds, and pans' },
  { id: 'cat-3', name: 'Knives & Cutlery', description: 'Precision kitchen knives and cutlery sets' },
  { id: 'cat-4', name: 'Serveware', description: 'Serving platters, bowls, and dishes' },
  { id: 'cat-5', name: 'Storage', description: 'Kitchen storage containers and jars' },
];

const INITIAL_PRODUCTS = [
  { id: 'p-1', name: 'Premium Stainless Cookware Set', description: '5-piece premium stainless steel cookware set with ergonomic handles.', category: 'cat-1', image: '../assets/stainless_steel_cookware_premium.jpg', price: '4,999' },
  { id: 'p-2', name: 'Elegant Bakeware Collection', description: 'Non-stick bakeware collection for professional home baking.', category: 'cat-2', image: '../assets/elegant_bakeware_collection_kitchen.jpg', price: '2,499' },
  { id: 'p-3', name: 'Chef\'s Knife Set', description: 'Precision-forged kitchen knife set with full-tang handles.', category: 'cat-3', image: '../assets/premium_kitchen_knives_cutlery_set.jpg', price: '3,299' },
  { id: 'p-4', name: 'Serving Platters Set', description: 'Elegant ceramic serving platters for premium dining.', category: 'cat-4', image: '../assets/elegant_serving_dishes_platters_premium.jpg', price: '1,899' },
  { id: 'p-5', name: 'Kitchen Storage Jars', description: 'Airtight glass jars with gold-finish lids for stylish storage.', category: 'cat-5', image: '../assets/stylish_kitchen_storage_containers_jars.jpg', price: '999' },
];

const ASSET_OPTIONS = [
  { label: 'Stainless Cookware', value: '../assets/stainless_steel_cookware_premium.jpg' },
  { label: 'Bakeware Collection', value: '../assets/elegant_bakeware_collection_kitchen.jpg' },
  { label: 'Bakeware Pans', value: '../assets/elegant_bakeware_pans.jpg' },
  { label: 'Cookware Set Minimal', value: '../assets/elegant_cookware_set_minimal.jpg' },
  { label: 'Serving Dishes', value: '../assets/elegant_serving_dishes_platters_premium.jpg' },
  { label: 'Kitchen Knives', value: '../assets/kitchen_knives_set_elegant.jpg' },
  { label: 'Storage Containers', value: '../assets/kitchen_storage_containers_minimalist.jpg' },
  { label: 'Kitchen Utensils', value: '../assets/kitchen_utensils_clean_white.jpg' },
  { label: 'Modern Cookware', value: '../assets/modern_cookware_set.jpg' },
  { label: 'Premium Bakeware', value: '../assets/premium_bakeware_minimal.jpg' },
  { label: 'Glassware Collection', value: '../assets/premium_glassware_drinkware_collection.jpg' },
  { label: 'Premium Knives', value: '../assets/premium_kitchen_knives_cutlery_set.jpg' },
  { label: 'Dinnerware', value: '../assets/stylish_dinnerware_plates_bowls_premium.jpg' },
  { label: 'Storage Jars', value: '../assets/stylish_kitchen_storage_containers_jars.jpg' },
];

function genId() {
  return `id-${Date.now()}-${Math.floor(Math.random() * 9999)}`;
}

const EMPTY_PRODUCT = { id: '', name: '', description: '', category: '', image: '', price: '' };
const EMPTY_CATEGORY = { id: '', name: '', description: '' };

function validate(fields, rules) {
  const errs = {};
  rules.forEach(({ key, label }) => {
    if (!fields[key]?.trim()) errs[key] = `${label} is required.`;
  });
  return errs;
}

const PRODUCT_RULES = [
  { key: 'name', label: 'Product name' },
  { key: 'category', label: 'Category' },
  { key: 'price', label: 'Price' },
];
const CATEGORY_RULES = [{ key: 'name', label: 'Category name' }];

function FieldError({ msg }) {
  if (!msg) return null;
  return (
    <motion.p
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-1 text-xs mt-1"
      style={{ color: '#b45309' }}
    >
      <AlertIcon size={12} />
      {msg}
    </motion.p>
  );
}

function GoldButton({ children, onClick, type = 'button', outlined = false, small = false, disabled = false }) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      className={[
        'font-raleway tracking-widest uppercase font-semibold transition-all duration-200 border rounded-full',
        small ? 'text-xs px-4 py-1.5' : 'text-sm px-7 py-3',
        outlined
          ? 'border-[#D4AF37] text-[#D4AF37] bg-transparent hover:bg-[#D4AF37] hover:text-white'
          : 'border-[#D4AF37] bg-[#D4AF37] text-white hover:bg-[#b8971f] hover:border-[#b8971f]',
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
      ].join(' ')}
    >
      {children}
    </motion.button>
  );
}

function ProductModal({ open, product, categories, onClose, onSave }) {
  const isEdit = !!product?.id;
  const [form, setForm] = useState(EMPTY_PRODUCT);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      setForm(product ? { ...product } : { ...EMPTY_PRODUCT, id: '' });
      setErrors({});
    }
  }, [open, product]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.currentTarget;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(form, PRODUCT_RULES);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 500));
    setSaving(false);
    onSave({ ...form, id: form.id || genId() });
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(59,28,3,0.35)', backdropFilter: 'blur(4px)' }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.97 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="bg-white rounded-3xl shadow-xl w-full max-w-lg overflow-hidden border border-[#D4AF37]/30"
          >
            <div className="flex items-center justify-between px-8 py-6 border-b border-[#D4AF37]/20">
              <h3 className="font-playfair text-xl text-[#3b1c03]">{isEdit ? 'Edit Product' : 'Add New Product'}</h3>
              <button onClick={onClose} className="text-[#3b1c03]/40 hover:text-[#D4AF37] transition-colors cursor-pointer">
                <XIcon size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="px-8 py-7 space-y-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-[#3b1c03]/60 mb-1.5">Product Name *</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Stainless Steel Wok"
                  className="w-full border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-sm font-raleway text-[#3b1c03] bg-[#fdfaf5] outline-none focus:border-[#D4AF37] transition-colors"
                />
                <FieldError msg={errors.name} />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-[#3b1c03]/60 mb-1.5">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Short product description..."
                  rows={3}
                  className="w-full border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-sm font-raleway text-[#3b1c03] bg-[#fdfaf5] outline-none focus:border-[#D4AF37] transition-colors resize-none"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-[#3b1c03]/60 mb-1.5">Category *</label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-sm font-raleway text-[#3b1c03] bg-[#fdfaf5] outline-none focus:border-[#D4AF37] transition-colors cursor-pointer"
                  >
                    <option value="">Select category</option>
                    {categories?.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                  <FieldError msg={errors.category} />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-[#3b1c03]/60 mb-1.5">Price (₹) *</label>
                  <input
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="e.g. 2,499"
                    className="w-full border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-sm font-raleway text-[#3b1c03] bg-[#fdfaf5] outline-none focus:border-[#D4AF37] transition-colors"
                  />
                  <FieldError msg={errors.price} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-[#3b1c03]/60 mb-1.5">Image</label>
                <select
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  className="w-full border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-sm font-raleway text-[#3b1c03] bg-[#fdfaf5] outline-none focus:border-[#D4AF37] transition-colors cursor-pointer"
                >
                  <option value="">Select image</option>
                  {ASSET_OPTIONS.map((a) => (
                    <option key={a.value} value={a.value}>{a.label}</option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-3">
                <GoldButton outlined onClick={onClose} type="button">Cancel</GoldButton>
                <GoldButton type="submit" disabled={saving}>
                  {saving ? 'Saving...' : isEdit ? 'Update' : 'Add Product'}
                </GoldButton>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ConfirmModal({ open, message, onConfirm, onCancel }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(59,28,3,0.35)', backdropFilter: 'blur(4px)' }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full border border-[#D4AF37]/30 text-center"
          >
            <div className="flex justify-center mb-4">
              <span className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#fef3c7' }}>
                <TrashIcon size={22} style={{ color: '#D4AF37' }} />
              </span>
            </div>
            <p className="font-raleway text-[#3b1c03] text-base mb-6">{message}</p>
            <div className="flex justify-center gap-3">
              <GoldButton outlined onClick={onCancel}>Cancel</GoldButton>
              <GoldButton onClick={onConfirm}>Delete</GoldButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ProductRow({ product, categories, onEdit, onDelete, index }) {
  const cat = categories?.find((c) => c.id === product?.category);
  return (
    <motion.tr
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 12 }}
      transition={{ duration: 0.22, delay: index * 0.04, ease: 'easeOut' }}
      className="group border-b border-[#D4AF37]/10 hover:bg-[#fdfaf5] transition-colors"
    >
      <td className="py-4 px-3 md:px-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 border border-[#D4AF37]/20">
            <img
              src={product?.image || ''}
              alt={product?.name}
              className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.src = 'https://placehold.co/80x80/fdfaf5/D4AF37?text=NC'; }}
            />
          </div>
          <div>
            <p className="font-raleway font-semibold text-sm text-[#3b1c03] leading-tight">{product?.name}</p>
            <p className="text-xs text-[#3b1c03]/50 mt-0.5 line-clamp-1 hidden md:block">{product?.description}</p>
          </div>
        </div>
      </td>
      <td className="py-4 px-3 md:px-5 hidden sm:table-cell">
        <span className="inline-block text-xs font-raleway font-medium px-2.5 py-1 rounded-full" style={{ backgroundColor: '#fef3c7', color: '#92400e' }}>
          {cat?.name || '—'}
        </span>
      </td>
      <td className="py-4 px-3 md:px-5">
        <span className="font-raleway text-sm font-semibold text-[#D4AF37]">₹{product?.price}</span>
      </td>
      <td className="py-4 px-3 md:px-5">
        <div className="flex items-center gap-2 justify-end">
          <motion.button
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => onEdit(product)}
            className="w-8 h-8 rounded-full flex items-center justify-center border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white transition-all cursor-pointer"
            aria-label="Edit product"
          >
            <EditIcon size={13} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => onDelete(product)}
            className="w-8 h-8 rounded-full flex items-center justify-center border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-red-50 hover:border-red-300 hover:text-red-500 transition-all cursor-pointer"
            aria-label="Delete product"
          >
            <TrashIcon size={13} />
          </motion.button>
        </div>
      </td>
    </motion.tr>
  );
}

function ProductsMobileCard({ product, categories, onEdit, onDelete, index }) {
  const cat = categories?.find((c) => c.id === product?.category);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.22, delay: index * 0.05, ease: 'easeOut' }}
      className="flex items-start gap-4 p-4 rounded-xl border border-[#D4AF37]/15 bg-[#fdfaf5] hover:border-[#D4AF37]/40 transition-all"
    >
      <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border border-[#D4AF37]/20">
        <img
          src={product?.image || ''}
          alt={product?.name}
          className="w-full h-full object-cover"
          onError={(e) => { e.currentTarget.src = 'https://placehold.co/80x80/fdfaf5/D4AF37?text=NC'; }}
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-raleway font-semibold text-sm text-[#3b1c03] leading-snug">{product?.name}</p>
        <p className="text-xs text-[#3b1c03]/50 mt-0.5 line-clamp-2">{product?.description}</p>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-xs font-raleway font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: '#fef3c7', color: '#92400e' }}>{cat?.name || '—'}</span>
          <span className="font-raleway text-xs font-bold text-[#D4AF37]">₹{product?.price}</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => onEdit(product)} className="w-8 h-8 rounded-full flex items-center justify-center border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white transition-all cursor-pointer" aria-label="Edit">
          <EditIcon size={13} />
        </motion.button>
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => onDelete(product)} className="w-8 h-8 rounded-full flex items-center justify-center border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-red-50 hover:text-red-500 transition-all cursor-pointer" aria-label="Delete">
          <TrashIcon size={13} />
        </motion.button>
      </div>
    </motion.div>
  );
}

function CategoryInlineRow({ cat, onSave, onDelete, index }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: cat?.name || '', description: cat?.description || '' });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSave = async () => {
    const errs = validate(form, CATEGORY_RULES);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 400));
    setSaving(false);
    onSave({ ...cat, ...form });
    setEditing(false);
  };

  const handleCancel = () => {
    setForm({ name: cat?.name || '', description: cat?.description || '' });
    setErrors({});
    setEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ duration: 0.2, delay: index * 0.04, ease: 'easeOut' }}
      className="flex flex-col sm:flex-row sm:items-start gap-3 p-4 rounded-xl border border-[#D4AF37]/15 bg-[#fdfaf5] hover:border-[#D4AF37]/30 transition-all"
    >
      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: '#fef3c7' }}>
        <TagIcon size={14} style={{ color: '#D4AF37' }} />
      </div>
      {editing ? (
        <div className="flex-1 space-y-2">
          <div>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Category name"
              className="w-full border border-[#D4AF37]/40 rounded-lg px-3 py-2 text-sm font-raleway text-[#3b1c03] bg-white outline-none focus:border-[#D4AF37] transition-colors"
            />
            <FieldError msg={errors.name} />
          </div>
          <input
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Short description (optional)"
            className="w-full border border-[#D4AF37]/40 rounded-lg px-3 py-2 text-sm font-raleway text-[#3b1c03] bg-white outline-none focus:border-[#D4AF37] transition-colors"
          />
          <div className="flex gap-2 pt-1">
            <GoldButton small onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : 'Save'}</GoldButton>
            <GoldButton small outlined onClick={handleCancel}>Cancel</GoldButton>
          </div>
        </div>
      ) : (
        <div className="flex-1">
          <p className="font-raleway font-semibold text-sm text-[#3b1c03]">{cat?.name}</p>
          {cat?.description && <p className="text-xs text-[#3b1c03]/50 mt-0.5">{cat.description}</p>}
        </div>
      )}
      {!editing && (
        <div className="flex gap-2">
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setEditing(true)} className="w-8 h-8 rounded-full flex items-center justify-center border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white transition-all cursor-pointer" aria-label="Edit category">
            <EditIcon size={13} />
          </motion.button>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => onDelete(cat)} className="w-8 h-8 rounded-full flex items-center justify-center border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-all cursor-pointer" aria-label="Delete category">
            <TrashIcon size={13} />
          </motion.button>
        </div>
      )}
    </motion.div>
  );
}

function AddCategoryForm({ onAdd }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', description: '' });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleAdd = async () => {
    const errs = validate(form, CATEGORY_RULES);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 400));
    setSaving(false);
    onAdd({ id: genId(), name: form.name.trim(), description: form.description.trim() });
    setForm({ name: '', description: '' });
    setOpen(false);
  };

  return (
    <div className="mt-4">
      <AnimatePresence>
        {!open ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <GoldButton outlined small onClick={() => setOpen(true)}>
              <span className="flex items-center gap-1.5"><PlusIcon size={13} /> Add Category</span>
            </GoldButton>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="p-5 rounded-xl border border-[#D4AF37]/30 bg-[#fdfaf5] space-y-3"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37] font-raleway">New Category</p>
            <div>
              <input name="name" value={form.name} onChange={handleChange} placeholder="Category name *" className="w-full border border-[#D4AF37]/30 rounded-lg px-3 py-2.5 text-sm font-raleway text-[#3b1c03] bg-white outline-none focus:border-[#D4AF37] transition-colors" />
              <FieldError msg={errors.name} />
            </div>
            <input name="description" value={form.description} onChange={handleChange} placeholder="Description (optional)" className="w-full border border-[#D4AF37]/30 rounded-lg px-3 py-2.5 text-sm font-raleway text-[#3b1c03] bg-white outline-none focus:border-[#D4AF37] transition-colors" />
            <div className="flex gap-2 pt-1">
              <GoldButton small onClick={handleAdd} disabled={saving}>{saving ? 'Adding...' : 'Add'}</GoldButton>
              <GoldButton small outlined onClick={() => { setOpen(false); setForm({ name: '', description: '' }); setErrors({}); }}>Cancel</GoldButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AdminDashboard({ products: propProducts, categories: propCategories }) {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState(() => propProducts?.length ? propProducts : INITIAL_PRODUCTS);
  const [categories, setCategories] = useState(() => propCategories?.length ? propCategories : INITIAL_CATEGORIES);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteType, setDeleteType] = useState('product');

  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2800);
  };

  const handleOpenAdd = () => { setEditingProduct(null); setModalOpen(true); };
  const handleOpenEdit = (p) => { setEditingProduct(p); setModalOpen(true); };

  const handleProductSave = (saved) => {
    setProducts((prev) => {
      const exists = prev.find((p) => p.id === saved.id);
      if (exists) return prev.map((p) => p.id === saved.id ? saved : p);
      return [...prev, saved];
    });
    setModalOpen(false);
    showToast(editingProduct ? 'Product updated.' : 'Product added.');
  };

  const handleDeleteRequest = (item, type) => {
    setDeleteTarget(item);
    setDeleteType(type);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deleteType === 'product') {
      setProducts((prev) => prev.filter((p) => p.id !== deleteTarget?.id));
      showToast('Product deleted.');
    } else {
      setCategories((prev) => prev.filter((c) => c.id !== deleteTarget?.id));
      showToast('Category deleted.');
    }
    setConfirmOpen(false);
    setDeleteTarget(null);
  };

  const handleCategoryUpdate = (updated) => {
    setCategories((prev) => prev.map((c) => c.id === updated.id ? updated : c));
    showToast('Category updated.');
  };

  const handleCategoryAdd = (added) => {
    setCategories((prev) => [...prev, added]);
    showToast('Category added.');
  };

  const tabs = [
    { key: 'products', label: 'Products', icon: PackageIcon, count: products?.length },
    { key: 'categories', label: 'Categories', icon: TagIcon, count: categories?.length },
  ];

  return (
    <>
      <section
        className="min-h-screen py-16 px-4"
        style={{
          background: 'linear-gradient(135deg, #fffef9 0%, #fdfaf3 40%, #faf4e8 100%)',
        }}
      >
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="mb-8 text-center"
          >
            <p className="text-xs uppercase tracking-[0.25em] font-raleway font-semibold mb-2" style={{ color: '#D4AF37' }}>NC Nandini Collections</p>
            <h1 className="font-playfair text-3xl md:text-4xl text-[#3b1c03] leading-tight">Admin Dashboard</h1>
            <div className="mt-3 mx-auto w-16 h-0.5" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.48, delay: 0.1, ease: 'easeOut' }}
            className="bg-white rounded-2xl shadow-md border mt-2 mb-12"
            style={{ borderColor: 'rgba(212,175,55,0.35)' }}
          >
            <div className="flex border-b" style={{ borderColor: 'rgba(212,175,55,0.2)' }}>
              {tabs.map((tab) => {
                const TabIcon = tab.icon;
                const active = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={[
                      'flex-1 flex items-center justify-center gap-2 py-4 px-3 text-sm font-semibold font-raleway uppercase tracking-widest transition-all duration-200 cursor-pointer',
                      active
                        ? 'text-[#D4AF37] border-b-2 border-[#D4AF37] bg-[#fdfaf5]'
                        : 'text-[#3b1c03]/40 hover:text-[#D4AF37] hover:bg-[#fdfaf5]',
                    ].join(' ')}
                    aria-selected={active}
                    role="tab"
                  >
                    <TabIcon size={15} />
                    {tab.label}
                    <span
                      className="ml-1 text-xs font-raleway font-bold rounded-full px-1.5 py-0.5"
                      style={{ backgroundColor: active ? '#fef3c7' : '#f5f5f5', color: active ? '#92400e' : '#9ca3af' }}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="px-6 py-8">
              <AnimatePresence mode="wait">
                {activeTab === 'products' && (
                  <motion.div
                    key="products"
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                  >
                    <div className="flex items-center justify-between mb-5">
                      <h2 className="font-playfair text-lg text-[#3b1c03]">Products</h2>
                      <motion.button
                        whileHover={{ scale: 1.06 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleOpenAdd}
                        className="flex items-center gap-2 text-xs font-semibold font-raleway uppercase tracking-widest px-4 py-2 rounded-full border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white transition-all cursor-pointer"
                        aria-label="Add product"
                      >
                        <PlusIcon size={13} /> Add Product
                      </motion.button>
                    </div>

                    {products?.length === 0 ? (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-16 text-center">
                        <PackageIcon size={36} className="mx-auto mb-3" style={{ color: '#D4AF37', opacity: 0.4 }} />
                        <p className="font-raleway text-sm text-[#3b1c03]/40">No products yet. Add your first product.</p>
                      </motion.div>
                    ) : (
                      <>
                        <div className="hidden sm:block overflow-x-auto rounded-xl border" style={{ borderColor: 'rgba(212,175,55,0.15)' }}>
                          <table className="w-full text-left min-w-[480px]">
                            <thead>
                              <tr style={{ borderBottom: '1px solid rgba(212,175,55,0.2)', backgroundColor: '#fdfaf5' }}>
                                <th className="py-3 px-5 text-xs font-semibold uppercase tracking-widest font-raleway" style={{ color: '#D4AF37' }}>Product</th>
                                <th className="py-3 px-5 text-xs font-semibold uppercase tracking-widest font-raleway hidden sm:table-cell" style={{ color: '#D4AF37' }}>Category</th>
                                <th className="py-3 px-5 text-xs font-semibold uppercase tracking-widest font-raleway" style={{ color: '#D4AF37' }}>Price</th>
                                <th className="py-3 px-5 text-xs font-semibold uppercase tracking-widest font-raleway text-right" style={{ color: '#D4AF37' }}>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              <AnimatePresence>
                                {products?.map((p, i) => (
                                  <ProductRow
                                    key={p?.id}
                                    product={p}
                                    categories={categories}
                                    onEdit={handleOpenEdit}
                                    onDelete={(item) => handleDeleteRequest(item, 'product')}
                                    index={i}
                                  />
                                ))}
                              </AnimatePresence>
                            </tbody>
                          </table>
                        </div>

                        <div className="sm:hidden space-y-3">
                          <AnimatePresence>
                            {products?.map((p, i) => (
                              <ProductsMobileCard
                                key={p?.id}
                                product={p}
                                categories={categories}
                                onEdit={handleOpenEdit}
                                onDelete={(item) => handleDeleteRequest(item, 'product')}
                                index={i}
                              />
                            ))}
                          </AnimatePresence>
                        </div>
                      </>
                    )}
                  </motion.div>
                )}

                {activeTab === 'categories' && (
                  <motion.div
                    key="categories"
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                  >
                    <div className="flex items-center justify-between mb-5">
                      <h2 className="font-playfair text-lg text-[#3b1c03]">Categories</h2>
                      <span className="text-xs font-raleway text-[#3b1c03]/40">{categories?.length} total</span>
                    </div>

                    {categories?.length === 0 ? (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-16 text-center">
                        <TagIcon size={36} className="mx-auto mb-3" style={{ color: '#D4AF37', opacity: 0.4 }} />
                        <p className="font-raleway text-sm text-[#3b1c03]/40">No categories yet.</p>
                      </motion.div>
                    ) : (
                      <div className="space-y-3">
                        <AnimatePresence>
                          {categories?.map((c, i) => (
                            <CategoryInlineRow
                              key={c?.id}
                              cat={c}
                              onSave={handleCategoryUpdate}
                              onDelete={(item) => handleDeleteRequest(item, 'category')}
                              index={i}
                            />
                          ))}
                        </AnimatePresence>
                      </div>
                    )}

                    <AddCategoryForm onAdd={handleCategoryAdd} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      <ProductModal
        open={modalOpen}
        product={editingProduct}
        categories={categories}
        onClose={() => setModalOpen(false)}
        onSave={handleProductSave}
      />

      <ConfirmModal
        open={confirmOpen}
        message={`Delete "${deleteTarget?.name}"? This action cannot be undone.`}
        onConfirm={handleConfirmDelete}
        onCancel={() => { setConfirmOpen(false); setDeleteTarget(null); }}
      />

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-6 py-3.5 rounded-full shadow-lg font-raleway text-sm font-medium"
            style={{ backgroundColor: '#3b1c03', color: '#D4AF37', border: '1px solid rgba(212,175,55,0.4)' }}
          >
            <CheckIcon size={15} />
            {toast?.msg}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
