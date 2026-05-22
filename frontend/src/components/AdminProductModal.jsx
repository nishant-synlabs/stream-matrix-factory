import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';

function AdminProductModal({ isOpen, onClose, product, categories, onSave }) {
  const [form, setForm] = useState({
    name: '',
    category: '',
    description: '',
    specs: '',
    image_url: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (product) {
        setForm({
          name: product?.name || '',
          category: product?.category || '',
          description: product?.description || '',
          specs: product?.specs || '',
          image_url: product?.image_url || ''
        });
      } else {
        setForm({
          name: '',
          category: categories?.[0] || '',
          description: '',
          specs: '',
          image_url: ''
        });
      }
      setError('');
    }
  }, [isOpen, product, categories]);

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form?.name?.trim()) {
      setError('Product name is required');
      return;
    }
    onSave?.({ ...form, id: product?.id });
    onClose?.();
  };

  const handleCancel = () => {
    onClose?.();
  };

  const CloseIcon = Icons['X'] || Icons['HelpCircle'];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={handleCancel}
          />
          <motion.div
            className="relative z-10 w-full max-w-md bg-white rounded-2xl px-8 py-8 shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <button
              type="button"
              onClick={handleCancel}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close modal"
            >
              <CloseIcon className="w-5 h-5 text-gray-500" />
            </button>

            <h2 className="text-2xl font-medium text-black mb-8 tracking-tight">
              {product ? 'Edit Product' : 'New Product'}
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700 uppercase tracking-wider">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter product name"
                  className="w-full text-lg bg-gray-50 border-0 rounded-xl px-6 py-4 text-black placeholder:text-gray-400 shadow-sm focus:shadow-md focus:ring-2 focus:ring-gray-200 outline-none transition-all"
                />
                {error && (
                  <span className="text-sm text-red-500 mt-1">{error}</span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700 uppercase tracking-wider">
                  Category
                </label>
                <div className="relative">
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full text-lg bg-gray-50 border-0 rounded-xl px-6 py-4 text-black shadow-sm focus:shadow-md focus:ring-2 focus:ring-gray-200 outline-none transition-all appearance-none"
                  >
                    {categories?.map((cat, idx) => (
                      <option key={`${cat}-${idx}`} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <Icons['ChevronDown'] className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700 uppercase tracking-wider">
                  Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Product description"
                  rows={3}
                  className="w-full text-lg bg-gray-50 border-0 rounded-xl px-6 py-4 text-black placeholder:text-gray-400 shadow-sm focus:shadow-md focus:ring-2 focus:ring-gray-200 outline-none transition-all resize-none"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700 uppercase tracking-wider">
                  Specifications
                </label>
                <textarea
                  name="specs"
                  value={form.specs}
                  onChange={handleChange}
                  placeholder="Technical specs, materials, dimensions..."
                  rows={3}
                  className="w-full text-lg bg-gray-50 border-0 rounded-xl px-6 py-4 text-black placeholder:text-gray-400 shadow-sm focus:shadow-md focus:ring-2 focus:ring-gray-200 outline-none transition-all resize-none"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700 uppercase tracking-wider">
                  Image URL
                </label>
                <input
                  type="text"
                  name="image_url"
                  value={form.image_url}
                  onChange={handleChange}
                  placeholder="Paste image URL"
                  className="w-full text-lg bg-gray-50 border-0 rounded-xl px-6 py-4 text-black placeholder:text-gray-400 shadow-sm focus:shadow-md focus:ring-2 focus:ring-gray-200 outline-none transition-all"
                />
              </div>

              <div className="flex items-center gap-4 pt-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 py-4 px-8 rounded-full bg-gray-100 text-black font-medium hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-4 px-8 rounded-full bg-[#24d366] text-white font-medium hover:bg-[#1cb855] transition-colors shadow-sm"
                >
                  Save
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AdminProductModal;