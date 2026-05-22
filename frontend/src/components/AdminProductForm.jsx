import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';

const UploadIcon = Icons['Upload'] || Icons['HelpCircle'];
const XIcon = Icons['X'] || Icons['HelpCircle'];
const ImageIcon = Icons['Image'] || Icons['HelpCircle'];
const CheckIcon = Icons['Check'] || Icons['HelpCircle'];
const AlertCircleIcon = Icons['AlertCircle'] || Icons['HelpCircle'];
const ChevronDownIcon = Icons['ChevronDown'] || Icons['HelpCircle'];

const EMPTY_FORM = {
  name: '',
  category: '',
  priceMin: '',
  priceMax: '',
  description: '',
  imageFile: null,
  imagePreview: '',
};

function validate(fields) {
  const errors = {};
  if (!fields?.name?.trim()) errors.name = 'Product name is required.';
  if (!fields?.category) errors.category = 'Please select a category.';
  if (!fields?.priceMin || isNaN(Number(fields?.priceMin)) || Number(fields?.priceMin) < 0)
    errors.priceMin = 'Enter a valid minimum price.';
  if (
    fields?.priceMax &&
    (isNaN(Number(fields?.priceMax)) || Number(fields?.priceMax) < Number(fields?.priceMin))
  )
    errors.priceMax = 'Max price must be ≥ min price.';
  if (!fields?.description?.trim()) errors.description = 'Description is required.';
  return errors;
}

export default function AdminProductForm({ product, categories, onSubmit, onCancel }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const fileInputRef = useRef(null);
  const dropRef = useRef(null);

  const safeCategories = Array.isArray(categories) && categories.length > 0
    ? categories
    : ['Cookware', 'Bakeware', 'Cutlery', 'Storage', 'Utensils', 'Serveware', 'Glassware'];

  useEffect(() => {
    if (product) {
      setForm({
        name: product?.name || '',
        category: product?.category || '',
        priceMin: product?.priceMin != null ? String(product.priceMin) : '',
        priceMax: product?.priceMax != null ? String(product.priceMax) : '',
        description: product?.description || '',
        imageFile: null,
        imagePreview: product?.imageUrl || '',
      });
    } else {
      setForm(EMPTY_FORM);
    }
    setErrors({});
    setIsSuccess(false);
  }, [product]);

  const handleField = useCallback((key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  const applyImage = useCallback((file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setErrors((prev) => ({ ...prev, imageFile: 'Only image files are accepted.' }));
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setForm((prev) => ({
        ...prev,
        imageFile: file,
        imagePreview: e?.currentTarget?.result || '',
      }));
      setErrors((prev) => {
        const next = { ...prev };
        delete next.imageFile;
        return next;
      });
    };
    reader.readAsDataURL(file);
  }, []);

  const handleFileChange = (e) => {
    applyImage(e?.currentTarget?.files?.[0]);
  };

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer?.files?.[0];
      applyImage(file);
    },
    [applyImage]
  );

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const removeImage = () => {
    setForm((prev) => ({ ...prev, imageFile: null, imagePreview: '' }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 900));
    setIsLoading(false);
    setIsSuccess(true);
    const payload = {
      name: form.name.trim(),
      category: form.category,
      priceMin: Number(form.priceMin),
      priceMax: form.priceMax ? Number(form.priceMax) : null,
      description: form.description.trim(),
      imageFile: form.imageFile,
      imagePreview: form.imagePreview,
    };
    if (product?.id) payload.id = product.id;
    setTimeout(() => {
      onSubmit?.(payload);
    }, 600);
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const panelVariants = {
    hidden: { opacity: 0, y: 32, scale: 0.97 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 24, scale: 0.98 },
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.07, duration: 0.38, ease: 'easeOut' },
    }),
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.28, ease: 'easeOut' }}
        aria-modal="true"
        role="dialog"
        aria-labelledby="apf-title"
      >
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={onCancel}
          aria-hidden="true"
        />

        <motion.div
          className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
          style={{}}
          variants={panelVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.42, ease: 'easeOut' }}
        >
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-600" />

          <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-amber-50 opacity-40 translate-x-16 -translate-y-16 pointer-events-none" />

          <div className="relative px-8 pt-10 pb-8">
            <div className="flex items-start justify-between mb-8">
              <div>
                <p
                  data-imagine-id="adminproductform-eyebrow"
                  className="text-xs font-medium tracking-widest text-amber-500 uppercase mb-1 font-raleway"
                >
                  NC Nandini Collections
                </p>
                <h2
                  id="apf-title"
                  data-imagine-id="adminproductform-title"
                  className="text-2xl font-playfair font-semibold text-stone-900 leading-tight"
                >
                  {product ? 'Edit Product' : 'Add New Product'}
                </h2>
                <div className="mt-2 w-10 h-0.5 bg-amber-400" />
              </div>
              <motion.button
                type="button"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.92 }}
                transition={{ duration: 0.2 }}
                onClick={onCancel}
                className="p-2 rounded-full hover:bg-amber-50 text-stone-400 hover:text-amber-600 transition-colors"
                aria-label="Close form"
              >
                <XIcon size={20} />
              </motion.button>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="space-y-6">
                <motion.div custom={0} variants={fieldVariants} initial="hidden" animate="visible">
                  <label
                    data-imagine-id="adminproductform-label-name"
                    className="block text-xs font-medium tracking-widest text-stone-500 uppercase mb-2 font-raleway"
                    htmlFor="apf-name"
                  >
                    Product Name
                  </label>
                  <div className="relative">
                    <input
                      id="apf-name"
                      type="text"
                      value={form.name}
                      onChange={(e) => handleField('name', e.currentTarget.value)}
                      placeholder="e.g. Stainless Steel Pressure Cooker"
                      className={`w-full bg-transparent border-0 border-b-2 px-0 py-3 text-stone-800 placeholder-stone-300 font-raleway text-base focus:outline-none transition-colors ${
                        errors.name ? 'border-red-400' : 'border-stone-200 focus:border-amber-400'
                      }`}
                      aria-describedby={errors.name ? 'apf-name-err' : undefined}
                    />
                  </div>
                  <AnimatePresence>
                    {errors.name && (
                      <motion.p
                        id="apf-name-err"
                        data-imagine-id="adminproductform-error-name"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-1.5 text-xs text-red-500 flex items-center gap-1"
                      >
                        <AlertCircleIcon size={12} />
                        {errors.name}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                <motion.div custom={1} variants={fieldVariants} initial="hidden" animate="visible">
                  <label
                    data-imagine-id="adminproductform-label-category"
                    className="block text-xs font-medium tracking-widest text-stone-500 uppercase mb-2 font-raleway"
                    htmlFor="apf-category"
                  >
                    Category
                  </label>
                  <div className="relative">
                    <button
                      id="apf-category"
                      type="button"
                      onClick={() => setCategoryOpen((o) => !o)}
                      className={`w-full flex items-center justify-between bg-transparent border-0 border-b-2 px-0 py-3 text-base font-raleway focus:outline-none transition-colors ${
                        errors.category
                          ? 'border-red-400 text-stone-800'
                          : categoryOpen
                          ? 'border-amber-400 text-stone-800'
                          : 'border-stone-200 text-stone-800 hover:border-amber-300'
                      } ${!form.category ? 'text-stone-300' : 'text-stone-800'}`}
                      aria-haspopup="listbox"
                      aria-expanded={categoryOpen}
                      data-imagine-id="adminproductform-category-trigger"
                    >
                      <span>{form.category || 'Select a category'}</span>
                      <motion.span
                        animate={{ rotate: categoryOpen ? 180 : 0 }}
                        transition={{ duration: 0.22 }}
                      >
                        <ChevronDownIcon size={16} className="text-amber-500" />
                      </motion.span>
                    </button>

                    <AnimatePresence>
                      {categoryOpen && (
                        <motion.ul
                          role="listbox"
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.22, ease: 'easeOut' }}
                          className="absolute z-20 left-0 right-0 mt-1 bg-white border border-amber-100 rounded-xl shadow-lg overflow-hidden py-1"
                        >
                          {safeCategories.map((cat, idx) => (
                            <li
                              key={cat}
                              role="option"
                              aria-selected={form.category === cat}
                              onClick={() => {
                                handleField('category', cat);
                                setCategoryOpen(false);
                              }}
                              data-imagine-id={`adminproductform-cat-option-${idx}`}
                              className={`px-5 py-3 text-sm font-raleway cursor-pointer transition-colors ${
                                form.category === cat
                                  ? 'bg-amber-50 text-amber-700 font-medium'
                                  : 'text-stone-700 hover:bg-amber-50 hover:text-amber-600'
                              }`}
                            >
                              {cat}
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                  <AnimatePresence>
                    {errors.category && (
                      <motion.p
                        data-imagine-id="adminproductform-error-category"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-1.5 text-xs text-red-500 flex items-center gap-1"
                      >
                        <AlertCircleIcon size={12} />
                        {errors.category}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                <motion.div custom={2} variants={fieldVariants} initial="hidden" animate="visible">
                  <label
                    data-imagine-id="adminproductform-label-price"
                    className="block text-xs font-medium tracking-widest text-stone-500 uppercase mb-2 font-raleway"
                  >
                    Price Range (₹)
                  </label>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="relative">
                        <span className="absolute left-0 top-3 text-stone-400 text-sm font-raleway">₹</span>
                        <input
                          type="number"
                          min="0"
                          value={form.priceMin}
                          onChange={(e) => handleField('priceMin', e.currentTarget.value)}
                          placeholder="Min"
                          className={`w-full bg-transparent border-0 border-b-2 pl-5 pr-0 py-3 text-stone-800 placeholder-stone-300 font-raleway text-base focus:outline-none transition-colors ${
                            errors.priceMin ? 'border-red-400' : 'border-stone-200 focus:border-amber-400'
                          }`}
                          aria-label="Minimum price"
                        />
                      </div>
                      <AnimatePresence>
                        {errors.priceMin && (
                          <motion.p
                            data-imagine-id="adminproductform-error-pricemin"
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="mt-1.5 text-xs text-red-500 flex items-center gap-1"
                          >
                            <AlertCircleIcon size={12} />
                            {errors.priceMin}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                    <div>
                      <div className="relative">
                        <span className="absolute left-0 top-3 text-stone-400 text-sm font-raleway">₹</span>
                        <input
                          type="number"
                          min="0"
                          value={form.priceMax}
                          onChange={(e) => handleField('priceMax', e.currentTarget.value)}
                          placeholder="Max (optional)"
                          className={`w-full bg-transparent border-0 border-b-2 pl-5 pr-0 py-3 text-stone-800 placeholder-stone-300 font-raleway text-base focus:outline-none transition-colors ${
                            errors.priceMax ? 'border-red-400' : 'border-stone-200 focus:border-amber-400'
                          }`}
                          aria-label="Maximum price"
                        />
                      </div>
                      <AnimatePresence>
                        {errors.priceMax && (
                          <motion.p
                            data-imagine-id="adminproductform-error-pricemax"
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="mt-1.5 text-xs text-red-500 flex items-center gap-1"
                          >
                            <AlertCircleIcon size={12} />
                            {errors.priceMax}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>

                <motion.div custom={3} variants={fieldVariants} initial="hidden" animate="visible">
                  <label
                    data-imagine-id="adminproductform-label-description"
                    className="block text-xs font-medium tracking-widest text-stone-500 uppercase mb-2 font-raleway"
                    htmlFor="apf-description"
                  >
                    Description
                  </label>
                  <textarea
                    id="apf-description"
                    value={form.description}
                    onChange={(e) => handleField('description', e.currentTarget.value)}
                    rows={3}
                    placeholder="Describe the product — material, use case, premium features…"
                    className={`w-full bg-transparent border-0 border-b-2 px-0 py-3 text-stone-800 placeholder-stone-300 font-raleway text-base focus:outline-none transition-colors resize-none ${
                      errors.description ? 'border-red-400' : 'border-stone-200 focus:border-amber-400'
                    }`}
                    aria-describedby={errors.description ? 'apf-desc-err' : undefined}
                  />
                  <AnimatePresence>
                    {errors.description && (
                      <motion.p
                        id="apf-desc-err"
                        data-imagine-id="adminproductform-error-description"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-1.5 text-xs text-red-500 flex items-center gap-1"
                      >
                        <AlertCircleIcon size={12} />
                        {errors.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                <motion.div custom={4} variants={fieldVariants} initial="hidden" animate="visible">
                  <label
                    data-imagine-id="adminproductform-label-image"
                    className="block text-xs font-medium tracking-widest text-stone-500 uppercase mb-2 font-raleway"
                  >
                    Product Image
                  </label>

                  {form.imagePreview ? (
                    <div className="relative rounded-xl overflow-hidden border border-amber-100 bg-stone-50">
                      <img
                        src={form.imagePreview}
                        alt="Product preview"
                        data-imagine-id="adminproductform-image-preview"
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                          e.currentTarget.src = 'https://placehold.co/600x300/fef9e7/d4af37?text=Preview';
                        }}
                      />
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={removeImage}
                        className="absolute top-3 right-3 bg-white/90 rounded-full p-1.5 shadow-md text-stone-500 hover:text-red-500 transition-colors"
                        aria-label="Remove image"
                      >
                        <XIcon size={14} />
                      </motion.button>
                      <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                  ) : (
                    <div
                      ref={dropRef}
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onClick={() => fileInputRef.current?.click()}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') fileInputRef.current?.click(); }}
                      aria-label="Upload product image dropzone"
                      className={`flex flex-col items-center justify-center gap-3 h-40 rounded-xl border-2 border-dashed cursor-pointer transition-all ${
                        isDragging
                          ? 'border-amber-400 bg-amber-50/60'
                          : 'border-stone-200 bg-stone-50/60 hover:border-amber-300 hover:bg-amber-50/30'
                      }`}
                    >
                      <motion.div
                        animate={{ scale: isDragging ? 1.15 : 1 }}
                        transition={{ duration: 0.22 }}
                        className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center"
                      >
                        <UploadIcon size={22} className="text-amber-500" />
                      </motion.div>
                      <div className="text-center">
                        <p
                          data-imagine-id="adminproductform-dropzone-label"
                          className="text-sm font-medium text-stone-600 font-raleway"
                        >
                          {isDragging ? 'Release to upload' : 'Drag & drop or click to upload'}
                        </p>
                        <p
                          data-imagine-id="adminproductform-dropzone-hint"
                          className="text-xs text-stone-400 font-raleway mt-0.5"
                        >
                          PNG, JPG, WEBP — max 5 MB
                        </p>
                      </div>
                    </div>
                  )}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    aria-hidden="true"
                  />

                  <AnimatePresence>
                    {errors.imageFile && (
                      <motion.p
                        data-imagine-id="adminproductform-error-image"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-1.5 text-xs text-red-500 flex items-center gap-1"
                      >
                        <AlertCircleIcon size={12} />
                        {errors.imageFile}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>

              <motion.div
                custom={5}
                variants={fieldVariants}
                initial="hidden"
                animate="visible"
                className="flex items-center gap-4 mt-10"
              >
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onCancel}
                  disabled={isLoading}
                  data-imagine-id="adminproductform-btn-cancel"
                  className="flex-1 py-4 px-8 rounded-xl border-2 border-stone-200 text-stone-600 font-medium font-raleway text-sm tracking-wide hover:border-amber-300 hover:text-amber-700 transition-colors disabled:opacity-50"
                >
                  Cancel
                </motion.button>

                <motion.button
                  type="submit"
                  whileHover={{ scale: isLoading || isSuccess ? 1 : 1.02 }}
                  whileTap={{ scale: isLoading || isSuccess ? 1 : 0.97 }}
                  disabled={isLoading || isSuccess}
                  data-imagine-id="adminproductform-btn-submit"
                  className="flex-[2] py-4 px-8 rounded-xl text-sm font-medium font-raleway tracking-wide transition-all disabled:opacity-80 overflow-hidden relative"
                  style={{}}
                >
                  <span
                    className={`absolute inset-0 rounded-xl transition-opacity duration-300 ${
                      isSuccess
                        ? 'bg-emerald-500 opacity-100'
                        : 'opacity-0'
                    }`}
                  />
                  <span
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500"
                    style={{ opacity: isSuccess ? 0 : 1, transition: 'opacity 0.3s' }}
                  />
                  <span className="relative flex items-center justify-center gap-2 text-white">
                    {isLoading ? (
                      <>
                        <motion.span
                          className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white inline-block"
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 0.75, ease: 'linear' }}
                        />
                        <span data-imagine-id="adminproductform-btn-saving">Saving…</span>
                      </>
                    ) : isSuccess ? (
                      <>
                        <CheckIcon size={16} />
                        <span data-imagine-id="adminproductform-btn-saved">Saved!</span>
                      </>
                    ) : (
                      <span data-imagine-id="adminproductform-btn-save">
                        {product ? 'Update Product' : 'Add Product'}
                      </span>
                    )}
                  </span>
                </motion.button>
              </motion.div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
