import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';

function AdminCategoryTable({ categories = [] }) {
  const [categoryList, setCategoryList] = useState(categories || []);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [formName, setFormName] = useState('');
  const [formCount, setFormCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [nameError, setNameError] = useState('');

  useEffect(() => {
    setCategoryList(categories || []);
  }, [categories]);

  const PlusIcon = Icons['Plus'] || Icons['HelpCircle'];
  const PencilIcon = Icons['Pencil'] || Icons['Edit'] || Icons['HelpCircle'];
  const TrashIcon = Icons['Trash2'] || Icons['Trash'] || Icons['HelpCircle'];
  const XIcon = Icons['X'] || Icons['HelpCircle'];
  const AlertIcon = Icons['AlertTriangle'] || Icons['HelpCircle'];

  const openCreate = () => {
    setFormName('');
    setFormCount(0);
    setNameError('');
    setIsCreateOpen(true);
  };

  const openEdit = (cat) => {
    setSelectedId(cat?.id);
    setFormName(cat?.name || '');
    setFormCount(cat?.productCount || 0);
    setNameError('');
    setIsEditOpen(true);
  };

  const openDelete = (cat) => {
    setSelectedId(cat?.id);
    setIsDeleteOpen(true);
  };

  const closeModals = () => {
    setIsCreateOpen(false);
    setIsEditOpen(false);
    setIsDeleteOpen(false);
    setSelectedId(null);
    setIsSubmitting(false);
    setNameError('');
  };

  const validateName = (val) => {
    if (!val.trim()) setNameError('Category name is required');
    else setNameError('');
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!formName.trim()) {
      setNameError('Category name is required');
      return;
    }
    setIsSubmitting(true);
    await new Promise((res) => setTimeout(res, 600));
    const newCategory = {
      id: Date.now().toString(),
      name: formName.trim(),
      productCount: Number(formCount) || 0,
    };
    setCategoryList((prev) => [...prev, newCategory]);
    closeModals();
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    if (!formName.trim()) {
      setNameError('Category name is required');
      return;
    }
    if (!selectedId) return;
    setIsSubmitting(true);
    await new Promise((res) => setTimeout(res, 600));
    setCategoryList((prev) =>
      prev.map((c) =>
        c?.id === selectedId
          ? { ...c, name: formName.trim(), productCount: Number(formCount) || 0 }
          : c
      )
    );
    closeModals();
  };

  const handleDelete = async () => {
    if (!selectedId) return;
    setIsSubmitting(true);
    await new Promise((res) => setTimeout(res, 600));
    setCategoryList((prev) => prev.filter((c) => c?.id !== selectedId));
    closeModals();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.25, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex flex-col w-full max-w-screen-xl mx-auto"
    >
      <motion.div variants={rowVariants} className="flex items-center justify-end mb-6">
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-full bg-black text-white px-6 py-3 text-sm font-medium tracking-wide hover:bg-gray-800 transition-colors shadow-sm font-raleway"
        >
          <PlusIcon className="w-4 h-4" />
          Create New
        </button>
      </motion.div>

      <motion.div variants={rowVariants} className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="py-3 px-8 text-xs font-semibold uppercase tracking-wider text-gray-400 font-raleway">
                  Name
                </th>
                <th className="py-3 px-8 text-xs font-semibold uppercase tracking-wider text-gray-400 font-raleway w-40">
                  Num Products
                </th>
                <th className="py-3 px-8 text-xs font-semibold uppercase tracking-wider text-gray-400 font-raleway w-32 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <AnimatePresence>
                {categoryList?.map((category) => (
                  <motion.tr
                    key={category?.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="group hover:bg-gray-50/60 transition-colors"
                  >
                    <td className="py-3 px-8 text-sm font-medium text-gray-900 font-raleway">
                      {category?.name}
                    </td>
                    <td className="py-3 px-8 text-sm text-gray-500 font-raleway">
                      {category?.productCount ?? 0}
                    </td>
                    <td className="py-3 px-8 text-right">
                      <div className="inline-flex items-center gap-3">
                        <button
                          onClick={() => openEdit(category)}
                          aria-label="Edit category"
                          className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 text-gray-700 hover:bg-black hover:text-white hover:border-black transition-all duration-200"
                        >
                          <PencilIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openDelete(category)}
                          aria-label="Delete category"
                          className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-200"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
              {categoryList?.length === 0 && (
                <tr>
                  <td colSpan={3} className="py-12 px-8 text-center text-sm text-gray-400 font-raleway">
                    No categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      <AnimatePresence>
        {(isCreateOpen || isEditOpen) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4"
            onClick={closeModals}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-xl w-full max-w-lg p-10 flex flex-col gap-8"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 font-raleway">
                  {isCreateOpen ? 'Create Category' : 'Edit Category'}
                </h2>
                <button
                  onClick={closeModals}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors text-gray-500"
                  aria-label="Close modal"
                >
                  <XIcon className="w-5 h-5" />
                </button>
              </div>

              <form
                onSubmit={isCreateOpen ? handleCreate : handleEdit}
                className="flex flex-col gap-8"
              >
                <div className="flex flex-col gap-3">
                  <label htmlFor="catName" className="text-sm font-medium text-gray-700 font-raleway">
                    Category Name
                  </label>
                  <input
                    id="catName"
                    type="text"
                    value={formName}
                    onChange={(e) => {
                      const val = e.currentTarget.value;
                      setFormName(val);
                      validateName(val);
                    }}
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-black focus:bg-white transition-all font-raleway"
                    placeholder="e.g. Cookware"
                  />
                  {nameError && (
                    <span className="text-xs text-red-500 font-raleway">{nameError}</span>
                  )}
                </div>

                <div className="flex flex-col gap-3">
                  <label htmlFor="catCount" className="text-sm font-medium text-gray-700 font-raleway">
                    Product Count
                  </label>
                  <input
                    id="catCount"
                    type="number"
                    min="0"
                    value={formCount}
                    onChange={(e) => setFormCount(Number(e.currentTarget.value))}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-black focus:bg-white transition-all font-raleway"
                    placeholder="0"
                  />
                </div>

                <div className="flex items-center justify-end gap-4 pt-2">
                  <button
                    type="button"
                    onClick={closeModals}
                    className="rounded-full px-8 py-4 text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors font-raleway"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-full bg-black text-white px-8 py-4 text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm font-raleway"
                  >
                    {isSubmitting ? 'Saving...' : isCreateOpen ? 'Create' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isDeleteOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4"
            onClick={closeModals}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-xl w-full max-w-md p-10 flex flex-col gap-8 text-center"
            >
              <div className="mx-auto inline-flex items-center justify-center w-14 h-14 rounded-full bg-red-50 text-red-500">
                <AlertIcon className="w-7 h-7" />
              </div>
              <div className="flex flex-col gap-3">
                <h2 className="text-xl font-semibold text-gray-900 font-raleway">
                  Delete Category?
                </h2>
                <p className="text-sm text-gray-500 font-raleway leading-relaxed">
                  This action cannot be undone. The category will be permanently removed from your catalog.
                </p>
              </div>
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={closeModals}
                  className="rounded-full px-8 py-4 text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors font-raleway"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isSubmitting}
                  className="rounded-full bg-red-500 text-white px-8 py-4 text-sm font-medium hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm font-raleway"
                >
                  {isSubmitting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default AdminCategoryTable;