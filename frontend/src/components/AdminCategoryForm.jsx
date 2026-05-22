import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';

const XIcon = Icons['X'] || Icons['HelpCircle'];
const TagIcon = Icons['Tag'] || Icons['HelpCircle'];
const CheckIcon = Icons['Check'] || Icons['HelpCircle'];

export default function AdminCategoryForm({ category, onSubmit, onCancel }) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const isEditing = Boolean(category?.id);

  useEffect(() => {
    setName(category?.name ?? '');
    setError('');
    setSuccess(false);
  }, [category]);

  function validate(value) {
    if (!value?.trim()) return 'Category name is required.';
    if (value.trim().length < 2) return 'Name must be at least 2 characters.';
    if (value.trim().length > 60) return 'Name must be under 60 characters.';
    return '';
  }

  function handleChange(e) {
    const val = e.currentTarget.value;
    setName(val);
    if (error) setError(validate(val));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationError = validate(name);
    if (validationError) {
      setError(validationError);
      return;
    }
    setLoading(true);
    setError('');
    await new Promise((res) => setTimeout(res, 700));
    setLoading(false);
    setSuccess(true);
    await new Promise((res) => setTimeout(res, 500));
    onSubmit?.({ ...(category ?? {}), name: name.trim() });
  }

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.94, y: 24 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.94, y: 24 },
  };

  return (
    <AnimatePresence>
      <motion.div
        key="admin-category-form-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center px-4"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.22, ease: 'easeOut' }}
        style={{ background: 'rgba(26,26,26,0.38)', backdropFilter: 'blur(4px)' }}
        onMouseDown={(e) => { if (e.currentTarget === e.target) onCancel?.(); }}
        aria-modal="true"
        role="dialog"
        aria-labelledby="admin-category-form-title"
      >
        <motion.div
          key="admin-category-form-modal"
          className="relative w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.28, ease: 'easeOut' }}
          style={{ boxShadow: '0 8px 48px 0 rgba(212,175,55,0.13), 0 2px 16px 0 rgba(0,0,0,0.08)' }}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <div
            className="h-1 w-full"
            style={{ background: 'linear-gradient(90deg, #D4AF37 60%, #f5e49a 100%)' }}
          />

          <div className="p-8 md:p-10">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <span
                  className="flex items-center justify-center w-10 h-10 rounded-xl"
                  style={{ background: 'rgba(212,175,55,0.10)' }}
                >
                  <TagIcon size={20} style={{ color: '#D4AF37' }} />
                </span>
                <h2
                  id="admin-category-form-title"
                  data-imagine-id="admincategoryform-title"
                  className="font-cinzel text-xl font-semibold tracking-widest text-neutral-800 uppercase"
                  style={{ fontFamily: 'Cinzel, serif', letterSpacing: '0.12em' }}
                >
                  {isEditing ? 'Edit Category' : 'New Category'}
                </h2>
              </div>
              <motion.button
                onClick={onCancel}
                className="flex items-center justify-center w-9 h-9 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                aria-label="Close"
              >
                <XIcon size={18} />
              </motion.button>
            </div>

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="category-name-input"
                  data-imagine-id="admincategoryform-name-label"
                  className="text-xs font-semibold tracking-widest uppercase text-neutral-500"
                  style={{ fontFamily: 'Raleway, Arial, sans-serif', letterSpacing: '0.13em' }}
                >
                  Category Name
                </label>
                <input
                  id="category-name-input"
                  type="text"
                  value={name}
                  onChange={handleChange}
                  autoFocus
                  autoComplete="off"
                  maxLength={60}
                  placeholder="e.g. Cookware, Bakeware…"
                  className="w-full px-5 py-4 rounded-2xl border text-neutral-800 text-base outline-none transition-all bg-neutral-50 placeholder:text-neutral-300"
                  style={{
                    fontFamily: 'Raleway, Arial, sans-serif',
                    borderColor: error ? '#ef4444' : name ? '#D4AF37' : '#e5e7eb',
                    boxShadow: name && !error
                      ? '0 0 0 3px rgba(212,175,55,0.10)'
                      : error
                      ? '0 0 0 3px rgba(239,68,68,0.08)'
                      : 'none',
                  }}
                  aria-describedby={error ? 'category-name-error' : undefined}
                />
                <AnimatePresence>
                  {error && (
                    <motion.p
                      key="category-name-error"
                      id="category-name-error"
                      data-imagine-id="admincategoryform-error"
                      className="text-xs text-red-500 mt-1"
                      style={{ fontFamily: 'Raleway, Arial, sans-serif' }}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      role="alert"
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-2">
                <motion.button
                  type="button"
                  onClick={onCancel}
                  className="px-8 py-4 rounded-2xl text-sm font-semibold tracking-widest uppercase text-neutral-500 bg-neutral-100 hover:bg-neutral-200 transition-colors"
                  style={{ fontFamily: 'Raleway, Arial, sans-serif', letterSpacing: '0.10em' }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  data-imagine-id="admincategoryform-cancel-btn"
                >
                  Cancel
                </motion.button>

                <motion.button
                  type="submit"
                  disabled={loading || success}
                  className="relative px-8 py-4 rounded-2xl text-sm font-semibold tracking-widest uppercase text-white overflow-hidden transition-all disabled:opacity-70"
                  style={{
                    fontFamily: 'Raleway, Arial, sans-serif',
                    letterSpacing: '0.10em',
                    background: success
                      ? '#22c55e'
                      : 'linear-gradient(90deg, #D4AF37 0%, #c9a227 100%)',
                    boxShadow: '0 4px 18px 0 rgba(212,175,55,0.22)',
                  }}
                  whileHover={!loading && !success ? { scale: 1.03, boxShadow: '0 6px 24px 0 rgba(212,175,55,0.32)' } : {}}
                  whileTap={!loading && !success ? { scale: 0.97 } : {}}
                  data-imagine-id="admincategoryform-submit-btn"
                >
                  <AnimatePresence mode="wait">
                    {loading && (
                      <motion.span
                        key="loading"
                        className="flex items-center justify-center gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        <motion.span
                          className="block w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 0.7, ease: 'linear' }}
                        />
                        <span data-imagine-id="admincategoryform-loading-text">Saving…</span>
                      </motion.span>
                    )}
                    {success && !loading && (
                      <motion.span
                        key="success"
                        className="flex items-center justify-center gap-2"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.18 }}
                      >
                        <CheckIcon size={16} />
                        <span data-imagine-id="admincategoryform-success-text">Saved</span>
                      </motion.span>
                    )}
                    {!loading && !success && (
                      <motion.span
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        data-imagine-id="admincategoryform-submit-text"
                      >
                        {isEditing ? 'Update Category' : 'Add Category'}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
