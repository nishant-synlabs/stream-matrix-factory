import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';

const PlusIcon = Icons['Plus'] || Icons['HelpCircle'];
const EditIcon = Icons['Pencil'] || Icons['HelpCircle'];
const DeleteIcon = Icons['Trash2'] || Icons['HelpCircle'];
const XIcon = Icons['X'] || Icons['HelpCircle'];
const CheckIcon = Icons['Check'] || Icons['HelpCircle'];
const TagIcon = Icons['Tag'] || Icons['HelpCircle'];
const AlertIcon = Icons['AlertTriangle'] || Icons['HelpCircle'];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
};

const rowVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
  exit: { opacity: 0, x: -24, transition: { duration: 0.25, ease: 'easeIn' } },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.94, y: 12 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { opacity: 0, scale: 0.94, y: 12, transition: { duration: 0.2, ease: 'easeIn' } },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export default function DashboardCategoriesTable({ categories = [], onAdd, onEdit, onDelete }) {
  const [modalMode, setModalMode] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  function openAddModal() {
    setModalMode('add');
    setActiveCategory(null);
    setInputValue('');
    setInputError('');
  }

  function openEditModal(category) {
    setModalMode('edit');
    setActiveCategory(category);
    setInputValue(category?.name || '');
    setInputError('');
  }

  function closeModal() {
    setModalMode(null);
    setActiveCategory(null);
    setInputValue('');
    setInputError('');
    setIsSubmitting(false);
  }

  function openDeleteConfirm(category) {
    setDeleteTarget(category);
  }

  function closeDeleteConfirm() {
    setDeleteTarget(null);
    setIsDeleting(false);
  }

  function validate(value) {
    if (!value?.trim()) return 'Category name is required.';
    if (value.trim().length < 2) return 'Name must be at least 2 characters.';
    if (value.trim().length > 60) return 'Name must be under 60 characters.';
    return '';
  }

  async function handleSubmit() {
    const error = validate(inputValue);
    if (error) {
      setInputError(error);
      return;
    }
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    if (modalMode === 'add') {
      onAdd?.(inputValue.trim());
    } else if (modalMode === 'edit') {
      onEdit?.(activeCategory?.id, inputValue.trim());
    }
    setIsSubmitting(false);
    closeModal();
  }

  async function handleDelete() {
    setIsDeleting(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    onDelete?.(deleteTarget?.id);
    setIsDeleting(false);
    closeDeleteConfirm();
  }

  function handleInputChange(e) {
    const val = e.currentTarget.value;
    setInputValue(val);
    if (inputError) setInputError(validate(val));
  }

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="bg-white rounded-3xl shadow-[0_6px_32px_rgba(59,28,3,0.07)] overflow-hidden"
      >
        <div className="px-8 pt-8 pb-6 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between border-b border-[#f5ede0]">
          <div className="flex flex-col gap-1">
            <h2 className="font-playfair text-2xl font-bold text-[#3b1c03] tracking-wide leading-snug">
              Categories
            </h2>
            <p className="font-raleway text-sm text-[#a07850]">
              {categories?.length ?? 0} {categories?.length === 1 ? 'category' : 'categories'} in catalog
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: '0 0 18px rgba(212,175,55,0.35)' }}
            whileTap={{ scale: 0.97 }}
            onClick={openAddModal}
            className="flex items-center gap-2 bg-[#D4AF37] text-white font-raleway font-semibold text-sm px-6 py-3 rounded-full shadow-[0_2px_12px_rgba(212,175,55,0.25)] transition-colors hover:bg-[#c49f2a] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2 whitespace-nowrap"
            aria-label="Add new category"
          >
            <PlusIcon size={16} strokeWidth={2} />
            Add Category
          </motion.button>
        </div>

        {categories?.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center justify-center py-20 gap-4"
          >
            <div className="w-14 h-14 rounded-full bg-[#fdf6e9] flex items-center justify-center">
              <TagIcon size={22} strokeWidth={1.5} className="text-[#D4AF37]" />
            </div>
            <p className="font-raleway text-[#b08050] text-sm">No categories yet. Add your first one.</p>
          </motion.div>
        ) : (
          <motion.ul
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="divide-y divide-[#faf3ea] px-2 py-2"
            role="list"
            aria-label="Category list"
          >
            <AnimatePresence initial={false}>
              {categories?.map((category) => (
                <motion.li
                  key={category?.id}
                  variants={rowVariants}
                  exit="exit"
                  layout
                  className="flex items-center justify-between px-6 py-4 rounded-2xl hover:bg-[#fdf8f0] transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-xl bg-[#fdf6e9] flex items-center justify-center flex-shrink-0">
                      <TagIcon size={14} strokeWidth={1.5} className="text-[#D4AF37]" />
                    </div>
                    <span className="font-raleway font-bold text-[#3b1c03] text-[15px] truncate">
                      {category?.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <motion.button
                      whileHover={{ scale: 1.12 }}
                      whileTap={{ scale: 0.93 }}
                      onClick={() => openEditModal(category)}
                      className="w-9 h-9 flex items-center justify-center rounded-xl text-[#D4AF37] hover:bg-[#fdf0cc] transition-colors focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-1"
                      aria-label={`Edit ${category?.name}`}
                    >
                      <EditIcon size={15} strokeWidth={1.75} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.12 }}
                      whileTap={{ scale: 0.93 }}
                      onClick={() => openDeleteConfirm(category)}
                      className="w-9 h-9 flex items-center justify-center rounded-xl text-[#c0856a] hover:bg-[#fdf0ec] transition-colors focus:outline-none focus:ring-2 focus:ring-[#c0856a] focus:ring-offset-1"
                      aria-label={`Delete ${category?.name}`}
                    >
                      <DeleteIcon size={15} strokeWidth={1.75} />
                    </motion.button>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        )}
      </motion.div>

      <AnimatePresence>
        {(modalMode === 'add' || modalMode === 'edit') && (
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(59,28,3,0.18)] backdrop-blur-[3px]"
            onClick={closeModal}
            aria-modal="true"
            role="dialog"
            aria-label={modalMode === 'add' ? 'Add Category' : 'Edit Category'}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-[0_16px_64px_rgba(59,28,3,0.13)] w-full max-w-md p-8 flex flex-col gap-6"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-playfair text-xl font-bold text-[#3b1c03] tracking-wide">
                  {modalMode === 'add' ? 'New Category' : 'Edit Category'}
                </h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={closeModal}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-[#f7f0e6] text-[#a07850] hover:bg-[#f0e4cc] transition-colors focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  aria-label="Close modal"
                >
                  <XIcon size={15} strokeWidth={2} />
                </motion.button>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="category-name-input"
                  className="font-raleway text-xs font-semibold text-[#a07850] uppercase tracking-widest"
                >
                  Category Name
                </label>
                <input
                  id="category-name-input"
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="e.g. Cookware, Bakeware..."
                  className={`w-full font-raleway text-[15px] text-[#3b1c03] bg-[#fdf8f2] border rounded-xl px-4 py-3.5 outline-none transition-all placeholder-[#c9a878] focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] ${
                    inputError ? 'border-[#d97b5a] ring-1 ring-[#d97b5a]' : 'border-[#ecdfc8]'
                  }`}
                  autoFocus
                  aria-describedby={inputError ? 'category-name-error' : undefined}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit(); }}
                />
                <AnimatePresence>
                  {inputError && (
                    <motion.p
                      id="category-name-error"
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      className="font-raleway text-xs text-[#c0856a] flex items-center gap-1.5"
                      role="alert"
                    >
                      <AlertIcon size={12} strokeWidth={2} />
                      {inputError}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex gap-3 pt-1">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={closeModal}
                  disabled={isSubmitting}
                  className="flex-1 font-raleway font-semibold text-sm text-[#a07850] bg-[#f7f0e6] hover:bg-[#f0e4cc] rounded-full py-3.5 transition-colors focus:outline-none focus:ring-2 focus:ring-[#D4AF37] disabled:opacity-50"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: '0 0 20px rgba(212,175,55,0.4)' }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1 flex items-center justify-center gap-2 font-raleway font-semibold text-sm text-white bg-[#D4AF37] hover:bg-[#c49f2a] rounded-full py-3.5 transition-colors shadow-[0_2px_12px_rgba(212,175,55,0.28)] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2 disabled:opacity-60"
                  aria-label={isSubmitting ? 'Saving...' : modalMode === 'add' ? 'Add category' : 'Save changes'}
                >
                  {isSubmitting ? (
                    <>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full inline-block"
                      />
                      Saving…
                    </>
                  ) : (
                    <>
                      <CheckIcon size={15} strokeWidth={2.5} />
                      {modalMode === 'add' ? 'Add Category' : 'Save Changes'}
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deleteTarget && (
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(59,28,3,0.18)] backdrop-blur-[3px]"
            onClick={closeDeleteConfirm}
            aria-modal="true"
            role="dialog"
            aria-label="Confirm delete category"
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-[0_16px_64px_rgba(59,28,3,0.13)] w-full max-w-sm p-8 flex flex-col gap-6 items-center text-center"
            >
              <div className="w-14 h-14 rounded-full bg-[#fdf0ec] flex items-center justify-center">
                <AlertIcon size={22} strokeWidth={1.5} className="text-[#c0856a]" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-playfair text-xl font-bold text-[#3b1c03] tracking-wide">
                  Remove Category?
                </h3>
                <p className="font-raleway text-sm text-[#a07850] leading-relaxed">
                  <span className="font-bold text-[#3b1c03]">{deleteTarget?.name}</span> will be permanently removed from the catalog.
                </p>
              </div>
              <div className="flex gap-3 w-full pt-1">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={closeDeleteConfirm}
                  disabled={isDeleting}
                  className="flex-1 font-raleway font-semibold text-sm text-[#a07850] bg-[#f7f0e6] hover:bg-[#f0e4cc] rounded-full py-3.5 transition-colors focus:outline-none focus:ring-2 focus:ring-[#D4AF37] disabled:opacity-50"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: '0 0 18px rgba(192,133,106,0.4)' }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="flex-1 flex items-center justify-center gap-2 font-raleway font-semibold text-sm text-white bg-[#c0856a] hover:bg-[#a96b50] rounded-full py-3.5 transition-colors focus:outline-none focus:ring-2 focus:ring-[#c0856a] focus:ring-offset-2 disabled:opacity-60"
                  aria-label={isDeleting ? 'Deleting...' : `Confirm delete ${deleteTarget?.name}`}
                >
                  {isDeleting ? (
                    <>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full inline-block"
                      />
                      Removing…
                    </>
                  ) : (
                    <>
                      <DeleteIcon size={15} strokeWidth={2} />
                      Remove
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}