import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';

const UploadIcon = Icons['Upload'] || Icons['HelpCircle'];
const XIcon = Icons['X'] || Icons['HelpCircle'];
const ImageIcon = Icons['Image'] || Icons['HelpCircle'];
const CheckIcon = Icons['Check'] || Icons['HelpCircle'];
const AlertCircleIcon = Icons['AlertCircle'] || Icons['HelpCircle'];

const GOLD = '#D4AF37';
const DARK_BROWN = '#3b1c03';

function validate(fields) {
  const errors = {};
  if (!fields.name?.trim()) errors.name = 'Product name is required.';
  if (!fields.category) errors.category = 'Please select a category.';
  if (!fields.description?.trim()) errors.description = 'Description is required.';
  else if (fields.description.trim().length < 20) errors.description = 'Description must be at least 20 characters.';
  return errors;
}

export default function DashboardProductFormModal({ product, categories, onSubmit, onClose }) {
  const isEditing = Boolean(product?.id);

  const [fields, setFields] = useState({
    name: product?.name || '',
    category: product?.category || '',
    description: product?.description || '',
    imageUrl: product?.imageUrl || '',
  });

  const [previewSrc, setPreviewSrc] = useState(product?.imageUrl || '');
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose?.(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  function handleChange(e) {
    const { name, value } = e.currentTarget;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const newErrors = validate({ ...fields, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: newErrors[name] }));
    }
  }

  function handleBlur(e) {
    const { name } = e.currentTarget;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const newErrors = validate(fields);
    setErrors((prev) => ({ ...prev, [name]: newErrors[name] }));
  }

  function handleFile(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result;
      setPreviewSrc(result);
      setFields((prev) => ({ ...prev, imageUrl: result }));
    };
    reader.readAsDataURL(file);
  }

  function handleFileInput(e) {
    const file = e.currentTarget.files?.[0];
    handleFile(file);
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer?.files?.[0];
    handleFile(file);
  }

  function handleDragOver(e) {
    e.preventDefault();
    setDragOver(true);
  }

  function handleDragLeave() {
    setDragOver(false);
  }

  function removeImage() {
    setPreviewSrc('');
    setFields((prev) => ({ ...prev, imageUrl: '' }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const allTouched = { name: true, category: true, description: true };
    setTouched(allTouched);
    const validationErrors = validate(fields);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsLoading(true);
    setErrors({});
    await new Promise((res) => setTimeout(res, 900));
    setIsLoading(false);
    setIsSuccess(true);
    await new Promise((res) => setTimeout(res, 600));
    onSubmit?.({ ...fields, id: product?.id || Date.now() });
  }

  const inputBase =
    'w-full rounded-xl border bg-white px-4 py-3 text-sm font-raleway text-[#3b1c03] placeholder-[#b89c7a] outline-none transition-all duration-200 focus:ring-2';
  const inputNormal = `${inputBase} border-[#e8d9c0] focus:border-[#D4AF37] focus:ring-[#D4AF37]/20`;
  const inputError = `${inputBase} border-red-300 focus:border-red-400 focus:ring-red-100`;

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{}}
        aria-modal="true"
        role="dialog"
        aria-label={isEditing ? 'Edit product' : 'Add product'}
      >
        <div
          className="absolute inset-0 bg-[#3b1c03]/30 backdrop-blur-sm"
          onClick={onClose}
        />

        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 24 }}
          transition={{ duration: 0.32, ease: 'easeOut' }}
          className="relative z-10 w-full max-w-[480px] rounded-3xl bg-white shadow-[0_24px_64px_rgba(59,28,3,0.13)] overflow-hidden"
        >
          <div className="relative h-1.5 w-full bg-[#f5ede0]">
            <motion.div
              className="absolute left-0 top-0 h-full rounded-full bg-[#D4AF37]"
              initial={{ width: '0%' }}
              animate={{ width: isLoading ? '70%' : isSuccess ? '100%' : '0%' }}
              transition={{ duration: isSuccess ? 0.3 : 0.7, ease: 'easeInOut' }}
            />
          </div>

          <div className="px-8 pt-8 pb-2 flex items-start justify-between">
            <div>
              <h2 className="font-playfair text-2xl font-bold text-[#3b1c03] leading-tight tracking-tight">
                {isEditing ? 'Edit Product' : 'Add New Product'}
              </h2>
              <p className="mt-1 text-xs font-raleway text-[#9c7c5a] tracking-wide">
                {isEditing ? 'Update the details below.' : 'Fill in the details to list a new product.'}
              </p>
            </div>
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="ml-4 mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#e8d9c0] bg-[#fdf8f2] text-[#9c7c5a] transition-all duration-150 hover:border-[#D4AF37] hover:text-[#D4AF37] hover:bg-[#fef9ee]"
            >
              <XIcon size={16} strokeWidth={2} />
            </button>
          </div>

          <div className="h-px mx-8 my-5 bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />

          <form onSubmit={handleSubmit} noValidate className="px-8 pb-8 space-y-5">

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.28, ease: 'easeOut' }}
            >
              <label className="block mb-1.5 text-xs font-semibold font-raleway text-[#6b4c2a] uppercase tracking-widest">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                value={fields.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="e.g. Stainless Steel Wok"
                className={errors.name && touched.name ? inputError : inputNormal}
                autoComplete="off"
                aria-describedby={errors.name && touched.name ? 'name-error' : undefined}
              />
              <AnimatePresence>
                {errors.name && touched.name && (
                  <motion.p
                    id="name-error"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.18 }}
                    className="mt-1.5 flex items-center gap-1 text-[11px] font-raleway text-red-500"
                  >
                    <AlertCircleIcon size={11} strokeWidth={2} />
                    {errors.name}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.28, ease: 'easeOut' }}
            >
              <label className="block mb-1.5 text-xs font-semibold font-raleway text-[#6b4c2a] uppercase tracking-widest">
                Category
              </label>
              <div className="relative">
                <select
                  name="category"
                  value={fields.category}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-describedby={errors.category && touched.category ? 'category-error' : undefined}
                  className={`${errors.category && touched.category ? inputError : inputNormal} appearance-none pr-10 cursor-pointer`}
                >
                  <option value="">Select a category…</option>
                  {categories?.map((cat) => (
                    <option key={cat?.id ?? cat} value={cat?.value ?? cat}>
                      {cat?.label ?? cat}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#D4AF37]">
                  {(() => { const ChevronDown = Icons['ChevronDown'] || Icons['HelpCircle']; return <ChevronDown size={15} strokeWidth={2} />; })()}
                </span>
              </div>
              <AnimatePresence>
                {errors.category && touched.category && (
                  <motion.p
                    id="category-error"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.18 }}
                    className="mt-1.5 flex items-center gap-1 text-[11px] font-raleway text-red-500"
                  >
                    <AlertCircleIcon size={11} strokeWidth={2} />
                    {errors.category}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.28, ease: 'easeOut' }}
            >
              <label className="block mb-1.5 text-xs font-semibold font-raleway text-[#6b4c2a] uppercase tracking-widest">
                Product Image
              </label>
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current?.click()}
                className={`relative flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-200 py-6 ${
                  dragOver
                    ? 'border-[#D4AF37] bg-[#fef9ee] scale-[1.01]'
                    : 'border-[#e0ccaa] bg-[#fdf8f2] hover:border-[#D4AF37] hover:bg-[#fef9ee]'
                }`}
                aria-label="Upload product image"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') fileInputRef.current?.click(); }}
              >
                {previewSrc ? (
                  <>
                    <img
                      src={previewSrc}
                      alt="Product preview"
                      className="h-24 w-24 rounded-full object-cover border-2 border-[#D4AF37]/40 shadow-md"
                      onError={(e) => { e.currentTarget.src = 'https://placehold.co/96x96/f5ede0/D4AF37?text=IMG'; }}
                    />
                    <p className="text-xs font-raleway text-[#9c7c5a]">Click or drag to replace image</p>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); removeImage(); }}
                      className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-50 border border-red-200 text-red-400 hover:bg-red-100 transition-colors"
                      aria-label="Remove image"
                    >
                      <XIcon size={13} strokeWidth={2.5} />
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-dashed border-[#D4AF37]/60 bg-white">
                      <ImageIcon size={22} strokeWidth={1.5} className="text-[#D4AF37]" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-semibold font-raleway text-[#3b1c03]">
                        <span className="text-[#D4AF37]">Click to upload</span> or drag & drop
                      </p>
                      <p className="mt-0.5 text-[11px] font-raleway text-[#9c7c5a]">PNG, JPG, WEBP — max 5MB</p>
                    </div>
                  </>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileInput}
                  aria-label="File input for product image"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.28, ease: 'easeOut' }}
            >
              <label className="block mb-1.5 text-xs font-semibold font-raleway text-[#6b4c2a] uppercase tracking-widest">
                Description
              </label>
              <textarea
                name="description"
                value={fields.description}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Describe the product's material, features, and care instructions…"
                rows={4}
                className={`${errors.description && touched.description ? inputError : inputNormal} resize-none leading-relaxed`}
                aria-describedby={errors.description && touched.description ? 'description-error' : undefined}
              />
              <AnimatePresence>
                {errors.description && touched.description && (
                  <motion.p
                    id="description-error"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.18 }}
                    className="mt-1.5 flex items-center gap-1 text-[11px] font-raleway text-red-500"
                  >
                    <AlertCircleIcon size={11} strokeWidth={2} />
                    {errors.description}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.28, ease: 'easeOut' }}
              className="pt-2 space-y-3"
            >
              <motion.button
                type="submit"
                disabled={isLoading || isSuccess}
                whileHover={!isLoading && !isSuccess ? { scale: 1.015, boxShadow: '0 0 0 4px rgba(212,175,55,0.18)' } : {}}
                whileTap={!isLoading && !isSuccess ? { scale: 0.98 } : {}}
                className="relative w-full rounded-full bg-[#D4AF37] py-4 text-sm font-semibold font-raleway text-white tracking-wide shadow-md transition-all duration-200 disabled:opacity-80 overflow-hidden"
                aria-live="polite"
              >
                <AnimatePresence mode="wait">
                  {isSuccess ? (
                    <motion.span
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center justify-center gap-2"
                    >
                      <CheckIcon size={16} strokeWidth={2.5} />
                      Saved!
                    </motion.span>
                  ) : isLoading ? (
                    <motion.span
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="flex items-center justify-center gap-2"
                    >
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 0.7, ease: 'linear' }}
                        className="inline-block h-4 w-4 rounded-full border-2 border-white/40 border-t-white"
                      />
                      Saving…
                    </motion.span>
                  ) : (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="flex items-center justify-center gap-2"
                    >
                      <UploadIcon size={15} strokeWidth={2} />
                      {isEditing ? 'Update Product' : 'Save Product'}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              <button
                type="button"
                onClick={onClose}
                className="w-full rounded-full border border-[#e8d9c0] bg-transparent py-3.5 text-sm font-raleway font-medium text-[#9c7c5a] tracking-wide transition-all duration-200 hover:border-[#D4AF37] hover:text-[#3b1c03] hover:bg-[#fdf8f2]"
              >
                Cancel
              </button>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
