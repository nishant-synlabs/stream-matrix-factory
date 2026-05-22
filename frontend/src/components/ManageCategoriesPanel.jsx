import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';

const PencilIcon = Icons['Pencil'] || Icons['HelpCircle'];
const TrashIcon = Icons['Trash2'] || Icons['HelpCircle'];
const PlusIcon = Icons['Plus'] || Icons['HelpCircle'];
const CheckIcon = Icons['Check'] || Icons['HelpCircle'];
const XIcon = Icons['X'] || Icons['HelpCircle'];
const AlertIcon = Icons['AlertTriangle'] || Icons['HelpCircle'];
const TagIcon = Icons['Tag'] || Icons['HelpCircle'];

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const rowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.2, ease: 'easeIn' } },
};

const INITIAL_CATEGORIES = [
  { id: 1, name: 'Cookware', usedBy: 4 },
  { id: 2, name: 'Bakeware', usedBy: 2 },
  { id: 3, name: 'Cutlery', usedBy: 3 },
  { id: 4, name: 'Storage', usedBy: 0 },
];

export default function ManageCategoriesPanel({ categories: categoriesProp }) {
  const [categories, setCategories] = useState(
    Array.isArray(categoriesProp) && categoriesProp.length > 0
      ? categoriesProp
      : INITIAL_CATEGORIES
  );
  const [addInput, setAddInput] = useState('');
  const [addError, setAddError] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editInput, setEditInput] = useState('');
  const [editError, setEditError] = useState('');
  const [deleteError, setDeleteError] = useState(null);
  const [saving, setSaving] = useState(false);

  function validateName(name, excludeId) {
    const trimmed = name?.trim() ?? '';
    if (!trimmed) return 'Category name cannot be empty.';
    const duplicate = categories.find(
      (c) => c?.name?.toLowerCase() === trimmed.toLowerCase() && c?.id !== excludeId
    );
    if (duplicate) return 'A category with this name already exists.';
    return '';
  }

  function handleAddSubmit() {
    const err = validateName(addInput, null);
    if (err) { setAddError(err); return; }
    setSaving(true);
    setTimeout(() => {
      const newCategory = {
        id: Date.now(),
        name: addInput.trim(),
        usedBy: 0,
      };
      setCategories((prev) => [...prev, newCategory]);
      setAddInput('');
      setAddError('');
      setIsAdding(false);
      setSaving(false);
    }, 500);
  }

  function handleEditStart(cat) {
    setEditId(cat?.id ?? null);
    setEditInput(cat?.name ?? '');
    setEditError('');
    setDeleteError(null);
  }

  function handleEditSubmit(id) {
    const err = validateName(editInput, id);
    if (err) { setEditError(err); return; }
    setSaving(true);
    setTimeout(() => {
      setCategories((prev) =>
        prev.map((c) => (c?.id === id ? { ...c, name: editInput.trim() } : c))
      );
      setEditId(null);
      setEditInput('');
      setEditError('');
      setSaving(false);
    }, 400);
  }

  function handleDelete(cat) {
    if ((cat?.usedBy ?? 0) > 0) {
      setDeleteError(cat?.id ?? null);
      return;
    }
    setDeleteError(null);
    setCategories((prev) => prev.filter((c) => c?.id !== cat?.id));
  }

  function handleCancelAdd() {
    setIsAdding(false);
    setAddInput('');
    setAddError('');
  }

  function handleCancelEdit() {
    setEditId(null);
    setEditInput('');
    setEditError('');
  }

  return (
    <section className="w-full max-w-2xl mx-auto">
      <div
        className="bg-white rounded-2xl shadow-md border border-[#f0e9d6] overflow-hidden"
        style={{ boxShadow: '2px 12px 32px rgba(212,175,55,0.10)' }}
      >
        <div className="px-6 py-6 md:px-8 md:py-7 border-b border-[#f5eed8] flex items-center justify-between gap-4 bg-gradient-to-r from-white to-[#fdf8ee]">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#fdf3d0] text-[#D4AF37]">
              <TagIcon size={18} strokeWidth={1.8} />
            </span>
            <div>
              <h2
                data-imagine-id="managecategoriespanel-title"
                className="text-lg font-semibold text-[#212121] tracking-tight font-raleway"
              >
                Manage Categories
              </h2>
              <p
                data-imagine-id="managecategoriespanel-subtitle"
                className="text-xs text-[#9a8c72] font-raleway mt-0.5"
              >
                {categories?.length ?? 0} {(categories?.length ?? 0) === 1 ? 'category' : 'categories'} total
              </p>
            </div>
          </div>
          <AnimatePresence mode="wait">
            {!isAdding && (
              <motion.button
                key="add-btn"
                data-imagine-id="managecategoriespanel-add-btn"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                onClick={() => {
                  setIsAdding(true);
                  setDeleteError(null);
                  setEditId(null);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37] text-white text-sm font-semibold font-raleway hover:bg-[#b8952e] transition-colors duration-200 shadow-sm"
              >
                <PlusIcon size={15} strokeWidth={2.5} />
                <span data-imagine-id="managecategoriespanel-add-btn-label">Add Category</span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <div className="px-6 md:px-8 py-4">
          <AnimatePresence>
            {isAdding && (
              <motion.div
                key="add-form"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="overflow-hidden"
              >
                <div className="py-4 border-b border-[#f5eed8]">
                  <p
                    data-imagine-id="managecategoriespanel-add-label"
                    className="text-xs font-semibold text-[#D4AF37] uppercase tracking-widest mb-3 font-raleway"
                  >
                    New Category
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={addInput}
                        onChange={(e) => {
                          setAddInput(e.currentTarget.value);
                          setAddError('');
                        }}
                        onKeyDown={(e) => { if (e.key === 'Enter') handleAddSubmit(); if (e.key === 'Escape') handleCancelAdd(); }}
                        placeholder="e.g. Glassware"
                        aria-label="New category name"
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm font-raleway text-[#212121] placeholder-[#c4b99a] bg-white outline-none transition-all duration-200 focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] ${addError ? 'border-red-400' : 'border-[#e8dfc8]'}`}
                      />
                      <AnimatePresence>
                        {addError && (
                          <motion.p
                            data-imagine-id="managecategoriespanel-add-error"
                            key="add-err"
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="text-xs text-red-500 mt-1.5 flex items-center gap-1 font-raleway"
                          >
                            <AlertIcon size={12} /> {addError}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                    <div className="flex gap-2 sm:flex-none">
                      <button
                        data-imagine-id="managecategoriespanel-add-confirm"
                        onClick={handleAddSubmit}
                        disabled={saving}
                        aria-label="Confirm add category"
                        className="flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#D4AF37] text-white text-sm font-semibold font-raleway hover:bg-[#b8952e] transition-colors disabled:opacity-60 shadow-sm"
                      >
                        {saving ? (
                          <span data-imagine-id="managecategoriespanel-saving-label" className="text-xs">Saving…</span>
                        ) : (
                          <><CheckIcon size={15} strokeWidth={2.5} /> <span data-imagine-id="managecategoriespanel-save-label">Save</span></>
                        )}
                      </button>
                      <button
                        data-imagine-id="managecategoriespanel-add-cancel"
                        onClick={handleCancelAdd}
                        aria-label="Cancel add category"
                        className="flex items-center justify-center w-10 h-10 rounded-xl border border-[#e8dfc8] text-[#9a8c72] hover:bg-[#fdf8ee] transition-colors"
                      >
                        <XIcon size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {(categories?.length ?? 0) === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-14 flex flex-col items-center gap-3 text-[#c4b99a]"
            >
              <TagIcon size={32} strokeWidth={1.3} />
              <p data-imagine-id="managecategoriespanel-empty" className="text-sm font-raleway">No categories yet. Add one above.</p>
            </motion.div>
          ) : (
            <div className="hidden md:block mt-2">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#f0e9d6]">
                    <th
                      data-imagine-id="managecategoriespanel-th-name"
                      className="py-3 text-left text-xs font-semibold text-[#9a8c72] uppercase tracking-wider font-raleway pl-0"
                    >
                      Name
                    </th>
                    <th
                      data-imagine-id="managecategoriespanel-th-products"
                      className="py-3 text-center text-xs font-semibold text-[#9a8c72] uppercase tracking-wider font-raleway"
                    >
                      Products
                    </th>
                    <th className="py-3 text-right text-xs font-semibold text-[#9a8c72] uppercase tracking-wider font-raleway">
                      <span data-imagine-id="managecategoriespanel-th-actions">Actions</span>
                    </th>
                  </tr>
                </thead>
                <motion.tbody variants={listVariants} initial="hidden" animate="visible">
                  <AnimatePresence initial={false}>
                    {categories?.map((cat, idx) => (
                      <motion.tr
                        key={cat?.id}
                        variants={rowVariants}
                        exit="exit"
                        layout
                        className="border-b border-[#faf5ea] last:border-0 group"
                      >
                        <td className="py-3.5 pr-4 pl-0 w-full">
                          {editId === cat?.id ? (
                            <div>
                              <input
                                type="text"
                                value={editInput}
                                onChange={(e) => {
                                  setEditInput(e.currentTarget.value);
                                  setEditError('');
                                }}
                                onKeyDown={(e) => { if (e.key === 'Enter') handleEditSubmit(cat?.id); if (e.key === 'Escape') handleCancelEdit(); }}
                                aria-label="Edit category name"
                                autoFocus
                                className={`w-full px-3 py-2 rounded-xl border text-sm font-raleway text-[#212121] bg-white outline-none transition-all duration-200 focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] ${editError ? 'border-red-400' : 'border-[#e8dfc8]'}`}
                              />
                              <AnimatePresence>
                                {editError && (
                                  <motion.p
                                    data-imagine-id={`managecategoriespanel-edit-error-${idx}`}
                                    key="edit-err"
                                    initial={{ opacity: 0, y: -4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="text-xs text-red-500 mt-1 flex items-center gap-1 font-raleway"
                                  >
                                    <AlertIcon size={11} /> {editError}
                                  </motion.p>
                                )}
                              </AnimatePresence>
                            </div>
                          ) : (
                            <span
                              data-imagine-id={`managecategoriespanel-row-${idx}-name`}
                              className="font-medium text-[#212121] font-raleway"
                            >
                              {cat?.name}
                            </span>
                          )}
                          <AnimatePresence>
                            {deleteError === cat?.id && (
                              <motion.p
                                data-imagine-id={`managecategoriespanel-delete-error-${idx}`}
                                key="del-err"
                                initial={{ opacity: 0, y: -4 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="text-xs text-amber-600 mt-1 flex items-center gap-1 font-raleway"
                              >
                                <AlertIcon size={11} /> Cannot delete — {cat?.usedBy} product{(cat?.usedBy ?? 0) !== 1 ? 's' : ''} assigned.
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </td>
                        <td className="py-3.5 text-center">
                          <span
                            data-imagine-id={`managecategoriespanel-row-${idx}-count`}
                            className={`inline-block px-3 py-0.5 rounded-full text-xs font-semibold font-raleway ${
                              (cat?.usedBy ?? 0) > 0
                                ? 'bg-[#fdf3d0] text-[#b8952e]'
                                : 'bg-[#f5f5f5] text-[#aaa]'
                            }`}
                          >
                            {cat?.usedBy ?? 0}
                          </span>
                        </td>
                        <td className="py-3.5 text-right">
                          {editId === cat?.id ? (
                            <div className="flex items-center justify-end gap-2">
                              <button
                                data-imagine-id={`managecategoriespanel-edit-save-${idx}`}
                                onClick={() => handleEditSubmit(cat?.id)}
                                disabled={saving}
                                aria-label="Save edit"
                                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#D4AF37] text-white text-xs font-semibold font-raleway hover:bg-[#b8952e] transition-colors disabled:opacity-60"
                              >
                                <CheckIcon size={13} strokeWidth={2.5} />
                                <span data-imagine-id={`managecategoriespanel-edit-save-label-${idx}`}>Save</span>
                              </button>
                              <button
                                data-imagine-id={`managecategoriespanel-edit-cancel-${idx}`}
                                onClick={handleCancelEdit}
                                aria-label="Cancel edit"
                                className="flex items-center justify-center w-7 h-7 rounded-lg border border-[#e8dfc8] text-[#9a8c72] hover:bg-[#fdf8ee] transition-colors"
                              >
                                <XIcon size={13} />
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center justify-end gap-1.5">
                              <motion.button
                                data-imagine-id={`managecategoriespanel-edit-btn-${idx}`}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => { handleEditStart(cat); }}
                                aria-label={`Edit ${cat?.name}`}
                                className="flex items-center justify-center w-8 h-8 rounded-lg text-[#b8952e] hover:bg-[#fdf3d0] transition-colors"
                              >
                                <PencilIcon size={14} strokeWidth={1.8} />
                              </motion.button>
                              <motion.button
                                data-imagine-id={`managecategoriespanel-delete-btn-${idx}`}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleDelete(cat)}
                                aria-label={`Delete ${cat?.name}`}
                                className="flex items-center justify-center w-8 h-8 rounded-lg text-[#c0392b] hover:bg-[#fdf0ee] transition-colors"
                              >
                                <TrashIcon size={14} strokeWidth={1.8} />
                              </motion.button>
                            </div>
                          )}
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </motion.tbody>
              </table>
            </div>
          )}

          <div className="md:hidden mt-2">
            <motion.ul variants={listVariants} initial="hidden" animate="visible" className="space-y-3 py-2">
              <AnimatePresence initial={false}>
                {categories?.map((cat, idx) => (
                  <motion.li
                    key={cat?.id}
                    variants={rowVariants}
                    exit="exit"
                    layout
                    className="rounded-xl border border-[#f0e9d6] bg-[#fdfbf5] px-4 py-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        {editId === cat?.id ? (
                          <div>
                            <input
                              type="text"
                              value={editInput}
                              onChange={(e) => {
                                setEditInput(e.currentTarget.value);
                                setEditError('');
                              }}
                              onKeyDown={(e) => { if (e.key === 'Enter') handleEditSubmit(cat?.id); if (e.key === 'Escape') handleCancelEdit(); }}
                              aria-label="Edit category name"
                              autoFocus
                              className={`w-full px-3 py-2 rounded-xl border text-sm font-raleway text-[#212121] bg-white outline-none transition-all duration-200 focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] ${editError ? 'border-red-400' : 'border-[#e8dfc8]'}`}
                            />
                            <AnimatePresence>
                              {editError && (
                                <motion.p
                                  data-imagine-id={`managecategoriespanel-mob-edit-error-${idx}`}
                                  key="mob-edit-err"
                                  initial={{ opacity: 0, y: -4 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0 }}
                                  className="text-xs text-red-500 mt-1 flex items-center gap-1 font-raleway"
                                >
                                  <AlertIcon size={11} /> {editError}
                                </motion.p>
                              )}
                            </AnimatePresence>
                          </div>
                        ) : (
                          <span
                            data-imagine-id={`managecategoriespanel-mob-row-${idx}-name`}
                            className="font-semibold text-[#212121] text-sm font-raleway block truncate"
                          >
                            {cat?.name}
                          </span>
                        )}
                        <span
                          data-imagine-id={`managecategoriespanel-mob-row-${idx}-count`}
                          className={`mt-1 inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold font-raleway ${
                            (cat?.usedBy ?? 0) > 0
                              ? 'bg-[#fdf3d0] text-[#b8952e]'
                              : 'bg-[#f5f5f5] text-[#aaa]'
                          }`}
                        >
                          {cat?.usedBy ?? 0} product{(cat?.usedBy ?? 0) !== 1 ? 's' : ''}
                        </span>
                        <AnimatePresence>
                          {deleteError === cat?.id && (
                            <motion.p
                              data-imagine-id={`managecategoriespanel-mob-delete-error-${idx}`}
                              key="mob-del-err"
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              className="text-xs text-amber-600 mt-1.5 flex items-center gap-1 font-raleway"
                            >
                              <AlertIcon size={11} /> Cannot delete — {cat?.usedBy} product{(cat?.usedBy ?? 0) !== 1 ? 's' : ''} assigned.
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {editId === cat?.id ? (
                          <>
                            <button
                              data-imagine-id={`managecategoriespanel-mob-save-${idx}`}
                              onClick={() => handleEditSubmit(cat?.id)}
                              disabled={saving}
                              aria-label="Save edit"
                              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#D4AF37] text-white text-xs font-semibold font-raleway hover:bg-[#b8952e] transition-colors disabled:opacity-60"
                            >
                              <CheckIcon size={13} strokeWidth={2.5} />
                              <span data-imagine-id={`managecategoriespanel-mob-save-label-${idx}`}>Save</span>
                            </button>
                            <button
                              data-imagine-id={`managecategoriespanel-mob-cancel-${idx}`}
                              onClick={handleCancelEdit}
                              aria-label="Cancel edit"
                              className="flex items-center justify-center w-8 h-8 rounded-lg border border-[#e8dfc8] text-[#9a8c72] hover:bg-[#fdf8ee] transition-colors"
                            >
                              <XIcon size={14} />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              data-imagine-id={`managecategoriespanel-mob-edit-${idx}`}
                              onClick={() => handleEditStart(cat)}
                              aria-label={`Edit ${cat?.name}`}
                              className="flex items-center justify-center w-9 h-9 rounded-lg text-[#b8952e] hover:bg-[#fdf3d0] transition-colors"
                            >
                              <PencilIcon size={15} strokeWidth={1.8} />
                            </button>
                            <button
                              data-imagine-id={`managecategoriespanel-mob-delete-${idx}`}
                              onClick={() => handleDelete(cat)}
                              aria-label={`Delete ${cat?.name}`}
                              className="flex items-center justify-center w-9 h-9 rounded-lg text-[#c0392b] hover:bg-[#fdf0ee] transition-colors"
                            >
                              <TrashIcon size={15} strokeWidth={1.8} />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          </div>
        </div>

        {(categories?.length ?? 0) > 0 && (
          <div className="px-6 md:px-8 py-4 bg-gradient-to-r from-[#fdf8ee] to-white border-t border-[#f5eed8]">
            <p
              data-imagine-id="managecategoriespanel-footer-note"
              className="text-xs text-[#b8ad96] font-raleway"
            >
              Categories with assigned products cannot be deleted.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
