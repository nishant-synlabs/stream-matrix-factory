import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';

const XIcon = Icons['X'] || Icons['HelpCircle'];
const TagIcon = Icons['Tag'] || Icons['HelpCircle'];

export default function DashboardCategoryFormModal({ category, onSubmit, onClose }) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (category?.name) {
      setName(category.name);
    } else {
      setName('');
    }
    setError('');
    setSuccess(false);
  }, [category]);

  function validate() {
    if (!name?.trim()) {
      setError('Category name is required.');
      return false;
    }
    if (name.trim().length < 2) {
      setError('Name must be at least 2 characters.');
      return false;
    }
    if (name.trim().length > 60) {
      setError('Name must be 60 characters or fewer.');
      return false;
    }
    setError('');
    return true;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise((res) => setTimeout(res, 800));
    setLoading(false);
    setSuccess(true);
    onSubmit?.({ ...category, name: name.trim() });
  }

  function handleNameChange(e) {
    setName(e.currentTarget.value);
    if (error) setError('');
  }

  const isEditing = Boolean(category?.id);

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
      >
        <motion.div
          className="absolute inset-0 bg-[#3b1c03]/20 backdrop-blur-[2px]"
          onClick={onClose}
          aria-label="Close modal overlay"
        />

        <motion.div
          key="modal"
          className="relative z-10 w-[320px] bg-white rounded-2xl shadow-[0_8px_40px_rgba(59,28,3,0.13)] overflow-hidden"
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          role="dialog"
          aria-modal="true"
          aria-label={isEditing ? 'Edit Category' : 'Add Category'}
        >
          <div className="h-[3px] w-full bg-gradient-to-r from-[#D4AF37] via-[#f0d060] to-[#D4AF37]" />

          <div className="px-7 pt-7 pb-7">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#D4AF37]/10">
                  <TagIcon size={15} className="text-[#D4AF37]" strokeWidth={1.8} />
                </span>
                <h2 className="font-playfair text-[#3b1c03] text-[1.15rem] font-bold leading-tight tracking-wide">
                  {isEditing ? 'Edit Category' : 'Add Category'}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex items-center justify-center w-7 h-7 rounded-full text-[#3b1c03]/40 hover:text-[#3b1c03]/80 hover:bg-[#3b1c03]/06 transition-colors duration-150"
                aria-label="Close"
              >
                <XIcon size={15} strokeWidth={2} />
              </button>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-5">
                <label
                  htmlFor="category-name"
                  className="block font-raleway text-[#3b1c03]/70 text-[11px] font-semibold uppercase tracking-[0.1em] mb-2"
                >
                  Category Name
                </label>
                <input
                  id="category-name"
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  placeholder="e.g. Cookware, Bakeware"
                  autoComplete="off"
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? 'category-name-error' : undefined}
                  className={[
                    'w-full font-playfair text-[#3b1c03] text-[0.97rem] font-medium',
                    'bg-white border rounded-[10px] px-4 py-3',
                    'outline-none transition-all duration-200',
                    'placeholder:text-[#3b1c03]/25 placeholder:font-raleway placeholder:text-sm',
                    error
                      ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                      : 'border-[#e8dcc8] focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/15',
                  ].join(' ')}
                />
                <AnimatePresence>
                  {error && (
                    <motion.p
                      id="category-name-error"
                      role="alert"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      className="mt-2 text-red-500 font-raleway"
                      style={{}}
                    >
                      <span className="text-[12px] leading-snug">{error}</span>
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex gap-3 mt-6">
                <motion.button
                  type="button"
                  onClick={onClose}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex-1 py-3 px-4 rounded-full border border-[#e8dcc8] bg-white text-[#3b1c03]/60 font-raleway text-[13px] font-semibold tracking-wide hover:border-[#D4AF37]/50 hover:text-[#3b1c03] transition-colors duration-200"
                >
                  Cancel
                </motion.button>

                <motion.button
                  type="submit"
                  disabled={loading || success}
                  whileHover={!loading && !success ? { scale: 1.03 } : {}}
                  whileTap={!loading && !success ? { scale: 0.97 } : {}}
                  className={[
                    'flex-1 py-3 px-4 rounded-full font-raleway text-[13px] font-semibold tracking-wide transition-all duration-200',
                    success
                      ? 'bg-green-500 text-white shadow-none'
                      : 'bg-[#D4AF37] text-white shadow-[0_2px_12px_rgba(212,175,55,0.28)] hover:shadow-[0_4px_20px_rgba(212,175,55,0.40)]',
                    (loading || success) ? 'opacity-80 cursor-not-allowed' : '',
                  ].join(' ')}
                  aria-busy={loading}
                >
                  <AnimatePresence mode="wait">
                    {loading && (
                      <motion.span
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center gap-2"
                      >
                        <span className="inline-block w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        Saving
                      </motion.span>
                    )}
                    {!loading && success && (
                      <motion.span
                        key="success"
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        Saved!
                      </motion.span>
                    )}
                    {!loading && !success && (
                      <motion.span
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {isEditing ? 'Update' : 'Save'}
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