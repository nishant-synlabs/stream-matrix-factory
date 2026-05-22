import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';

const PlusIcon = Icons['Plus'] || Icons['HelpCircle'];
const EditIcon = Icons['Pencil'] || Icons['HelpCircle'];
const DeleteIcon = Icons['Trash2'] || Icons['HelpCircle'];
const CheckIcon = Icons['Check'] || Icons['HelpCircle'];
const XIcon = Icons['X'] || Icons['HelpCircle'];
const TagIcon = Icons['Tag'] || Icons['HelpCircle'];

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { opacity: 0, x: 12, transition: { duration: 0.2, ease: 'easeIn' } },
};

export default function AdminCategoryList({ categories = [], onEdit, onDelete, onAdd }) {
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [newName, setNewName] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [addError, setAddError] = useState('');
  const [editError, setEditError] = useState('');

  function handleEditStart(cat) {
    setEditingId(cat?.id);
    setEditValue(cat?.name ?? '');
    setEditError('');
  }

  function handleEditCancel() {
    setEditingId(null);
    setEditValue('');
    setEditError('');
  }

  function handleEditSave(cat) {
    const trimmed = editValue.trim();
    if (!trimmed) {
      setEditError('Name cannot be empty.');
      return;
    }
    onEdit?.({ ...cat, name: trimmed });
    setEditingId(null);
    setEditValue('');
    setEditError('');
  }

  function handleDelete(cat) {
    onDelete?.(cat?.id);
  }

  function handleAddToggle() {
    setShowAdd((v) => !v);
    setNewName('');
    setAddError('');
  }

  function handleAddSave() {
    const trimmed = newName.trim();
    if (!trimmed) {
      setAddError('Category name is required.');
      return;
    }
    onAdd?.(trimmed);
    setNewName('');
    setShowAdd(false);
    setAddError('');
  }

  return (
    <div
      className="bg-white rounded-2xl shadow-md border border-[#f0e8c8] flex flex-col"
      style={{ boxShadow: '0 2px 16px 0 rgba(212,175,55,0.08)' }}
    >
      <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-[#f5edd5]">
        <div className="flex items-center gap-2">
          <TagIcon className="w-4 h-4 text-[#D4AF37]" />
          <h3
            className="text-sm font-semibold tracking-widest uppercase text-[#1a1a1a] font-cinzel"
            data-imagine-id="admincategorylist-heading"
          >
            Categories
          </h3>
        </div>
        <motion.button
          onClick={handleAddToggle}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Add new category"
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#D4AF37] text-white text-xs font-semibold tracking-wide transition-colors hover:bg-[#b8962e] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-1"
          data-imagine-id="admincategorylist-add-btn"
        >
          <PlusIcon className="w-3.5 h-3.5" />
          Add
        </motion.button>
      </div>

      <AnimatePresence>
        {showAdd && (
          <motion.div
            key="add-row"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="px-5 pt-3 pb-2 border-b border-[#f5edd5] overflow-hidden"
          >
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newName}
                onChange={(e) => {
                  setNewName(e.currentTarget.value);
                  setAddError('');
                }}
                onKeyDown={(e) => { if (e.key === 'Enter') handleAddSave(); if (e.key === 'Escape') handleAddToggle(); }}
                placeholder="New category name…"
                aria-label="New category name"
                className="flex-1 text-xs rounded-lg border border-[#e8d89a] bg-[#fdfaf3] px-3 py-2 text-[#1a1a1a] placeholder-[#c9b96a] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition font-raleway"
                autoFocus
              />
              <motion.button
                onClick={handleAddSave}
                whileTap={{ scale: 0.92 }}
                aria-label="Confirm add category"
                className="p-1.5 rounded-lg bg-[#D4AF37] text-white hover:bg-[#b8962e] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition"
                data-imagine-id="admincategorylist-add-confirm-btn"
              >
                <CheckIcon className="w-3.5 h-3.5" />
              </motion.button>
              <motion.button
                onClick={handleAddToggle}
                whileTap={{ scale: 0.92 }}
                aria-label="Cancel add category"
                className="p-1.5 rounded-lg border border-[#e8d89a] text-[#D4AF37] hover:bg-[#fdf6e3] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition"
                data-imagine-id="admincategorylist-add-cancel-btn"
              >
                <XIcon className="w-3.5 h-3.5" />
              </motion.button>
            </div>
            {addError && (
              <p className="text-red-500 text-xs mt-1 pl-1 font-raleway" data-imagine-id="admincategorylist-add-error">
                {addError}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.ul
        variants={listVariants}
        initial="hidden"
        animate="visible"
        className="flex-1 overflow-y-auto divide-y divide-[#f5edd5] max-h-72 px-0"
        role="list"
        aria-label="Category list"
      >
        <AnimatePresence initial={false}>
          {categories?.length === 0 && (
            <motion.li
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center py-8"
            >
              <span className="text-xs text-[#c9b96a] tracking-wide font-raleway" data-imagine-id="admincategorylist-empty-msg">
                No categories yet. Add one above.
              </span>
            </motion.li>
          )}
          {categories?.map((cat, idx) => (
            <motion.li
              key={cat?.id ?? idx}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
              className="flex items-center gap-2 px-5 py-2.5 group hover:bg-[#fdfaf3] transition-colors"
              role="listitem"
            >
              {editingId === cat?.id ? (
                <div className="flex flex-col flex-1 gap-1">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => {
                        setEditValue(e.currentTarget.value);
                        setEditError('');
                      }}
                      onKeyDown={(e) => { if (e.key === 'Enter') handleEditSave(cat); if (e.key === 'Escape') handleEditCancel(); }}
                      aria-label={`Edit category name for ${cat?.name}`}
                      className="flex-1 text-xs rounded-lg border border-[#e8d89a] bg-[#fdfaf3] px-3 py-1.5 text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition font-raleway"
                      autoFocus
                    />
                    <motion.button
                      onClick={() => handleEditSave(cat)}
                      whileTap={{ scale: 0.92 }}
                      aria-label="Save edit"
                      className="p-1.5 rounded-lg bg-[#D4AF37] text-white hover:bg-[#b8962e] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition"
                      data-imagine-id={`admincategorylist-edit-save-${idx}`}
                    >
                      <CheckIcon className="w-3 h-3" />
                    </motion.button>
                    <motion.button
                      onClick={handleEditCancel}
                      whileTap={{ scale: 0.92 }}
                      aria-label="Cancel edit"
                      className="p-1.5 rounded-lg border border-[#e8d89a] text-[#D4AF37] hover:bg-[#fdf6e3] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition"
                      data-imagine-id={`admincategorylist-edit-cancel-${idx}`}
                    >
                      <XIcon className="w-3 h-3" />
                    </motion.button>
                  </div>
                  {editError && (
                    <p className="text-red-500 text-xs pl-1 font-raleway" data-imagine-id={`admincategorylist-edit-error-${idx}`}>
                      {editError}
                    </p>
                  )}
                </div>
              ) : (
                <>
                  <span
                    className="flex-1 text-xs text-[#1a1a1a] truncate font-raleway tracking-wide"
                    data-imagine-id={`admincategorylist-item-name-${idx}`}
                  >
                    {cat?.name}
                  </span>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <motion.button
                      onClick={() => handleEditStart(cat)}
                      whileHover={{ scale: 1.18 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label={`Edit ${cat?.name}`}
                      className="p-1 rounded-md text-[#D4AF37] hover:bg-[#fdf6e3] focus:outline-none focus:ring-1 focus:ring-[#D4AF37] transition"
                      data-imagine-id={`admincategorylist-edit-btn-${idx}`}
                    >
                      <EditIcon className="w-3 h-3" />
                    </motion.button>
                    <motion.button
                      onClick={() => handleDelete(cat)}
                      whileHover={{ scale: 1.18 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label={`Delete ${cat?.name}`}
                      className="p-1 rounded-md text-red-400 hover:bg-red-50 focus:outline-none focus:ring-1 focus:ring-red-300 transition"
                      data-imagine-id={`admincategorylist-delete-btn-${idx}`}
                    >
                      <DeleteIcon className="w-3 h-3" />
                    </motion.button>
                  </div>
                </>
              )}
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <div className="px-5 py-2.5 border-t border-[#f5edd5]">
        <p
          className="text-xs text-[#c9b96a] tracking-wide font-raleway"
          data-imagine-id="admincategorylist-count"
        >
          {categories?.length ?? 0} {categories?.length === 1 ? 'category' : 'categories'}
        </p>
      </div>
    </div>
  );
}
