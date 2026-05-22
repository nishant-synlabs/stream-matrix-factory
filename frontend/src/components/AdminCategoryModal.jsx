import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';

export default function AdminCategoryModal({ category, onSave, onClose, isOpen = true }) {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setName(category?.name || '');
    setError('');
  }, [category]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError('Category name is required');
      return;
    }
    setError('');
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsLoading(false);
    onSave?.({ ...(category || {}), name: trimmed });
    onClose?.();
  };

  const handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      onClose?.();
    }
  };

  const CloseIcon = Icons['X'] || Icons['HelpCircle'];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 md:px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
        >
          <div className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm" />

          <motion.div
            className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl px-6 py-6 md:px-10 md:py-10"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <button
              type="button"
              onClick={() => onClose?.()}
              className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full hover:bg-neutral-100 transition-colors"
              aria-label="Close"
            >
              <CloseIcon className="w-5 h-5 text-black" />
            </button>

            <h2 className="text-2xl md:text-3xl font-medium text-black tracking-tight font-sans mb-8">
              {category?.id ? 'Edit Category' : 'New Category'}
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              <div>
                <label
                  htmlFor="category-name"
                  className="block text-sm font-medium text-neutral-500 mb-3 font-sans"
                >
                  Category Name
                </label>
                <input
                  id="category-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.currentTarget.value)}
                  className="w-full px-5 py-4 text-lg bg-neutral-50 border border-neutral-200 rounded-xl text-black placeholder:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all font-sans"
                  placeholder="Enter category name"
                />
                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 text-sm text-red-500 font-sans overflow-hidden"
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex items-center justify-end gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => onClose?.()}
                  disabled={isLoading}
                  className="px-8 py-4 rounded-full text-sm font-medium text-neutral-600 bg-neutral-100 hover:bg-neutral-200 disabled:opacity-50 transition-colors font-sans"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-8 py-4 rounded-full text-sm font-medium text-white bg-black hover:bg-neutral-800 disabled:opacity-50 transition-all font-sans shadow-lg"
                >
                  {isLoading ? 'Saving...' : 'Save Category'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
