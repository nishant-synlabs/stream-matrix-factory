import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';

const XIcon = Icons['X'] || Icons['HelpCircle'];
const UploadIcon = Icons['Upload'] || Icons['HelpCircle'];
const ImageIcon = Icons['Image'] || Icons['HelpCircle'];
const CheckIcon = Icons['Check'] || Icons['HelpCircle'];
const AlertCircleIcon = Icons['AlertCircle'] || Icons['HelpCircle'];
const TagIcon = Icons['Tag'] || Icons['HelpCircle'];
const StarIcon = Icons['Star'] || Icons['HelpCircle'];
const TypeIcon = Icons['Type'] || Icons['HelpCircle'];
const AlignLeftIcon = Icons['AlignLeft'] || Icons['HelpCircle'];
const DollarSignIcon = Icons['DollarSign'] || Icons['HelpCircle'];
const TrashIcon = Icons['Trash2'] || Icons['HelpCircle'];

const ACCENT = '#D4AF37';

function FieldError({ message }) {
  if (!message) return null;
  return (
    <motion.p
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="flex items-center gap-1.5 mt-1.5 text-xs font-medium"
      style={{ color: ACCENT }}
      data-imagine-id="addeditproductform-field-error"
    >
      <AlertCircleIcon size={12} />
      {message}
    </motion.p>
  );
}

function FeaturedSwitch({ checked, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="relative inline-flex items-center w-12 h-6 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      style={{
        backgroundColor: checked ? ACCENT : '#e5e7eb',
        boxShadow: checked ? `0 0 0 2px rgba(212,175,55,0.25)` : 'none',
      }}
    >
      <span
        className="inline-block w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300"
        style={{ transform: checked ? 'translateX(26px)' : 'translateX(2px)' }}
      />
    </button>
  );
}

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export default function AddEditProductForm({ product, categories, onClose, onSave }) {
  const isEdit = Boolean(product?.id);

  const initialForm = {
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price !== undefined ? String(product.price) : '',
    category: product?.category || (categories?.[0] || ''),
    featured: product?.featured || false,
    imagePreview: product?.image || null,
    imageFile: null,
  };

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isDragging, setIsDragging] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef(null);
  const drawerRef = useRef(null);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const setField = useCallback((field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  const processImageFile = useCallback((file) => {
    if (!file) return;
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setErrors((prev) => ({ ...prev, image: 'Only JPEG, PNG, or WEBP files are accepted.' }));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, image: 'File size must be under 5MB.' }));
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      setForm((prev) => ({ ...prev, imagePreview: ev.target?.result, imageFile: file }));
      setErrors((prev) => ({ ...prev, image: undefined }));
    };
    reader.readAsDataURL(file);
  }, []);

  const handleFileChange = (e) => {
    const file = e.currentTarget.files?.[0];
    processImageFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    processImageFile(file);
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Product name is required.';
    if (!form.description.trim()) next.description = 'Description is required.';
    if (!form.price.trim() || isNaN(Number(form.price)) || Number(form.price) <= 0) {
      next.price = 'Enter a valid price.';
    }
    if (!form.category) next.category = 'Please select a category.';
    if (!form.imagePreview && !isEdit) next.image = 'Product image is required.';
    return next;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSaving(true);
    await new Promise((res) => setTimeout(res, 1000));
    setSaving(false);
    setSaved(true);
    const payload = {
      id: product?.id || Date.now(),
      name: form.name.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      category: form.category,
      featured: form.featured,
      image: form.imagePreview,
    };
    await new Promise((res) => setTimeout(res, 600));
    onSave?.(payload);
    onClose?.();
  };

  const labelClass = "block text-xs font-semibold tracking-widest uppercase text-zinc-500 mb-2";
  const inputClass = "w-full rounded-xl border bg-white px-4 py-3.5 text-sm font-medium text-zinc-800 placeholder-zinc-300 transition-all duration-200 outline-none focus:ring-2 focus:ring-offset-0";
  const inputStyle = (hasError) => ({
    borderColor: hasError ? ACCENT : '#e4e4e7',
    boxShadow: hasError ? `0 0 0 2px rgba(212,175,55,0.15)` : 'none',
  });
  const focusStyle = `focus:border-[#D4AF37] focus:ring-[rgba(212,175,55,0.18)]`;

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06 } },
  };
  const item = {
    hidden: { opacity: 0, x: 24 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: 'easeOut' } },
  };

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-50 flex justify-end"
        style={{ backgroundColor: 'rgba(10,10,10,0.45)', backdropFilter: 'blur(4px)' }}
        onClick={(e) => { if (e.target === e.currentTarget) onClose?.(); }}
        aria-modal="true"
        role="dialog"
        aria-label={isEdit ? 'Edit Product' : 'Add New Product'}
      >
        <motion.aside
          ref={drawerRef}
          key="drawer"
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 260 }}
          className="relative flex flex-col w-full max-w-lg h-full bg-white overflow-hidden shadow-2xl"
          style={{ boxShadow: '-8px 0 48px rgba(212,175,55,0.10)' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="absolute top-0 left-0 right-0 h-1"
            style={{ background: `linear-gradient(90deg, ${ACCENT}, #f0d060, ${ACCENT})` }}
          />

          <div className="flex items-center justify-between px-8 pt-8 pb-6 border-b border-zinc-100">
            <div>
              <h2
                data-imagine-id="addeditproductform-drawer-title"
                className="text-xl font-bold tracking-tight text-zinc-900 font-raleway"
              >
                {isEdit ? 'Edit Product' : 'Add New Product'}
              </h2>
              <p
                data-imagine-id="addeditproductform-drawer-subtitle"
                className="text-xs text-zinc-400 mt-0.5 tracking-wide"
              >
                {isEdit ? 'Update the details below.' : 'Fill in the details to add a new item.'}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close drawer"
              className="flex items-center justify-center w-9 h-9 rounded-full border border-zinc-200 text-zinc-400 hover:text-zinc-700 hover:border-zinc-300 transition-colors duration-200"
            >
              <XIcon size={16} />
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex-1 overflow-y-auto px-8 py-8"
          >
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <motion.div variants={item}>
                <label
                  data-imagine-id="addeditproductform-label-name"
                  htmlFor="prod-name"
                  className={labelClass}
                >
                  <span className="flex items-center gap-1.5"><TypeIcon size={11} /> Product Name</span>
                </label>
                <input
                  id="prod-name"
                  type="text"
                  value={form.name}
                  onChange={(e) => setField('name', e.currentTarget.value)}
                  placeholder="e.g. Premium Cookware Set"
                  className={`${inputClass} ${focusStyle}`}
                  style={inputStyle(errors.name)}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'err-name' : undefined}
                />
                <AnimatePresence><FieldError message={errors.name} /></AnimatePresence>
              </motion.div>

              <motion.div variants={item}>
                <label
                  data-imagine-id="addeditproductform-label-description"
                  htmlFor="prod-desc"
                  className={labelClass}
                >
                  <span className="flex items-center gap-1.5"><AlignLeftIcon size={11} /> Description</span>
                </label>
                <textarea
                  id="prod-desc"
                  rows={4}
                  value={form.description}
                  onChange={(e) => setField('description', e.currentTarget.value)}
                  placeholder="Describe the product's materials, use, and features…"
                  className={`${inputClass} ${focusStyle} resize-none leading-relaxed`}
                  style={inputStyle(errors.description)}
                  aria-invalid={Boolean(errors.description)}
                />
                <AnimatePresence><FieldError message={errors.description} /></AnimatePresence>
              </motion.div>

              <motion.div variants={item} className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    data-imagine-id="addeditproductform-label-price"
                    htmlFor="prod-price"
                    className={labelClass}
                  >
                    <span className="flex items-center gap-1.5"><DollarSignIcon size={11} /> Price</span>
                  </label>
                  <div className="relative">
                    <span
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold"
                      style={{ color: ACCENT }}
                    >₹</span>
                    <input
                      id="prod-price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={form.price}
                      onChange={(e) => setField('price', e.currentTarget.value)}
                      placeholder="0.00"
                      className={`${inputClass} ${focusStyle} pl-8`}
                      style={inputStyle(errors.price)}
                      aria-invalid={Boolean(errors.price)}
                    />
                  </div>
                  <AnimatePresence><FieldError message={errors.price} /></AnimatePresence>
                </div>

                <div>
                  <label
                    data-imagine-id="addeditproductform-label-category"
                    htmlFor="prod-category"
                    className={labelClass}
                  >
                    <span className="flex items-center gap-1.5"><TagIcon size={11} /> Category</span>
                  </label>
                  <div className="relative">
                    <select
                      id="prod-category"
                      value={form.category}
                      onChange={(e) => setField('category', e.currentTarget.value)}
                      className={`${inputClass} ${focusStyle} pr-8 appearance-none cursor-pointer`}
                      style={{
                        ...inputStyle(errors.category),
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23D4AF37' stroke-width='2.5'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 12px center',
                      }}
                      aria-invalid={Boolean(errors.category)}
                    >
                      {categories?.map((cat, idx) => (
                        <option key={idx} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <AnimatePresence><FieldError message={errors.category} /></AnimatePresence>
                </div>
              </motion.div>

              <motion.div variants={item}>
                <label
                  data-imagine-id="addeditproductform-label-image"
                  className={labelClass}
                >
                  <span className="flex items-center gap-1.5"><ImageIcon size={11} /> Product Image</span>
                </label>

                <AnimatePresence mode="wait">
                  {form.imagePreview ? (
                    <motion.div
                      key="preview"
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="relative w-full rounded-2xl overflow-hidden border"
                      style={{ borderColor: ACCENT, boxShadow: `0 2px 24px rgba(212,175,55,0.15)` }}
                    >
                      <img
                        src={form.imagePreview}
                        alt="Product preview"
                        data-imagine-id="addeditproductform-image-preview"
                        className="w-full h-52 object-cover"
                        onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x300/f4f4f5/a1a1aa?text=Image'; }}
                      />
                      <button
                        type="button"
                        onClick={() => setForm((prev) => ({ ...prev, imagePreview: null, imageFile: null }))}
                        className="absolute top-3 right-3 flex items-center justify-center w-8 h-8 bg-white rounded-full shadow-md border border-zinc-200 text-zinc-500 hover:text-red-500 transition-colors duration-200"
                        aria-label="Remove image"
                      >
                        <TrashIcon size={14} />
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="dropzone"
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className="flex flex-col items-center justify-center gap-3 w-full h-44 rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-200"
                      style={{
                        borderColor: isDragging ? ACCENT : (errors.image ? ACCENT : '#d4d4d8'),
                        backgroundColor: isDragging ? 'rgba(212,175,55,0.05)' : 'transparent',
                        boxShadow: isDragging ? `0 0 0 3px rgba(212,175,55,0.15)` : 'none',
                      }}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') fileInputRef.current?.click(); }}
                      aria-label="Upload product image"
                    >
                      <div
                        className="flex items-center justify-center w-12 h-12 rounded-full"
                        style={{ backgroundColor: 'rgba(212,175,55,0.10)' }}
                      >
                        <UploadIcon size={20} style={{ color: ACCENT }} />
                      </div>
                      <p
                        data-imagine-id="addeditproductform-dropzone-primary"
                        className="text-sm font-semibold text-zinc-600"
                      >
                        Drop image here or <span style={{ color: ACCENT }}>browse</span>
                      </p>
                      <p
                        data-imagine-id="addeditproductform-dropzone-secondary"
                        className="text-xs text-zinc-400"
                      >
                        JPEG, PNG, WEBP · Max 5MB
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={handleFileChange}
                  aria-hidden="true"
                />
                <AnimatePresence><FieldError message={errors.image} /></AnimatePresence>
              </motion.div>

              <motion.div variants={item}>
                <div className="flex items-center justify-between p-4 rounded-2xl border border-zinc-100 bg-zinc-50/60">
                  <div>
                    <p
                      data-imagine-id="addeditproductform-featured-label"
                      className="text-sm font-semibold text-zinc-800 flex items-center gap-2"
                    >
                      <StarIcon size={14} style={{ color: ACCENT }} />
                      Featured Product
                    </p>
                    <p
                      data-imagine-id="addeditproductform-featured-hint"
                      className="text-xs text-zinc-400 mt-0.5"
                    >
                      Highlight this product on the catalog homepage.
                    </p>
                  </div>
                  <FeaturedSwitch
                    checked={form.featured}
                    onChange={(val) => setField('featured', val)}
                  />
                </div>
              </motion.div>
            </motion.div>
          </form>

          <div className="flex items-center gap-3 px-8 py-6 border-t border-zinc-100 bg-white">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              disabled={saving || saved}
              className="flex-1 flex items-center justify-center gap-2.5 py-4 px-8 rounded-full text-sm font-bold tracking-wide text-white transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
              style={{
                background: saved
                  ? '#22c55e'
                  : `linear-gradient(135deg, #D4AF37, #f0d060, #b8942a)`,
                boxShadow: saved
                  ? '0 4px 20px rgba(34,197,94,0.25)'
                  : '0 4px 24px rgba(212,175,55,0.35)',
              }}
              data-imagine-id="addeditproductform-btn-save"
            >
              {saving ? (
                <>
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                    className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                  />
                  Saving…
                </>
              ) : saved ? (
                <><CheckIcon size={15} /> Saved!</>
              ) : (
                isEdit ? 'Update Product' : 'Add Product'
              )}
            </motion.button>

            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              disabled={saving}
              className="flex items-center justify-center py-4 px-8 rounded-full border text-sm font-bold tracking-wide text-zinc-700 bg-white transition-all duration-200 hover:border-zinc-400 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ borderColor: '#d4d4d8' }}
              data-imagine-id="addeditproductform-btn-cancel"
            >
              Cancel
            </motion.button>
          </div>
        </motion.aside>
      </motion.div>
    </AnimatePresence>
  );
}
