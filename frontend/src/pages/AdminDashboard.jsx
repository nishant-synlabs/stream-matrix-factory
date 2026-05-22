import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AdminProductList from '../components/AdminProductList';
import AddEditProductForm from '../components/AddEditProductForm';
import ManageCategoriesPanel from '../components/ManageCategoriesPanel';
import { useAuth } from '../AuthContext';

import stainlessImg from '../assets/stainless_steel_cookware_premium.jpg';
import bakewareImg from '../assets/elegant_bakeware_collection_kitchen.jpg';
import knivesImg from '../assets/premium_kitchen_knives_cutlery_set.jpg';
import servingImg from '../assets/elegant_serving_dishes_platters_premium.jpg';
import storageImg from '../assets/stylish_kitchen_storage_containers_jars.jpg';

const ShieldIcon = Icons['ShieldCheck'] || Icons['HelpCircle'];
const PackageIcon = Icons['Package'] || Icons['HelpCircle'];
const TagIcon = Icons['Tag'] || Icons['HelpCircle'];
const CheckIcon = Icons['Check'] || Icons['HelpCircle'];
const PlusIcon = Icons['Plus'] || Icons['HelpCircle'];
const LogOutIcon = Icons['LogOut'] || Icons['HelpCircle'];

const INITIAL_CATEGORIES = [
  { id: 1, name: 'Cookware', usedBy: 2 },
  { id: 2, name: 'Bakeware', usedBy: 1 },
  { id: 3, name: 'Knives & Cutlery', usedBy: 1 },
  { id: 4, name: 'Serveware', usedBy: 1 },
  { id: 5, name: 'Storage', usedBy: 1 },
];

const INITIAL_PRODUCTS = [
  { id: 1, name: 'Premium Stainless Cookware Set', category: 'Cookware', price: 4999, featured: true, image: stainlessImg, description: '5-piece premium stainless steel cookware set.' },
  { id: 2, name: 'Elegant Bakeware Collection', category: 'Bakeware', price: 2499, featured: false, image: bakewareImg, description: 'Non-stick bakeware for professional home baking.' },
  { id: 3, name: "Chef's Knife Set", category: 'Knives & Cutlery', price: 3299, featured: true, image: knivesImg, description: 'Precision-forged kitchen knife set with full-tang handles.' },
  { id: 4, name: 'Serving Platters Set', category: 'Serveware', price: 1899, featured: false, image: servingImg, description: 'Elegant ceramic serving platters for premium dining.' },
  { id: 5, name: 'Kitchen Storage Jars', category: 'Storage', price: 999, featured: false, image: storageImg, description: 'Airtight glass jars with gold-finish lids.' },
];

function genId() {
  return Date.now() + Math.floor(Math.random() * 9999);
}

export default function AdminDashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout?.();
    navigate('/');
  };

  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast({ msg });
    setTimeout(() => setToast(null), 2800);
  };

  const handleOpenAdd = () => { setEditingProduct(null); setFormOpen(true); };
  const handleOpenEdit = (p) => { setEditingProduct(p); setFormOpen(true); };

  const handleProductSave = (payload) => {
    if (payload?.id && products.find((p) => p?.id === payload.id)) {
      setProducts((prev) => prev.map((p) => p?.id === payload.id ? { ...p, ...payload } : p));
      showToast('Product updated.');
    } else {
      setProducts((prev) => [...prev, { ...payload, id: genId() }]);
      showToast('Product added.');
    }
    setFormOpen(false);
    setEditingProduct(null);
  };

  const handleProductDelete = (id) => {
    const resolvedId = typeof id === 'object' ? id?.id : id;
    setProducts((prev) => prev.filter((p) => p?.id !== resolvedId));
    showToast('Product deleted.');
  };

  const tabs = [
    { key: 'products', label: 'Products', icon: PackageIcon, count: products?.length },
    { key: 'categories', label: 'Categories', icon: TagIcon, count: categories?.length },
  ];

  const formProductForDrawer = editingProduct
    ? {
        id: editingProduct.id,
        name: editingProduct.name,
        description: editingProduct.description,
        price: editingProduct.price,
        category: editingProduct.category,
        featured: editingProduct.featured,
        image: editingProduct.image,
      }
    : null;

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f5f0]">
      <Header />

      <main className="flex-1 py-10 md:py-16 px-4 md:px-10">
        <div className="max-w-screen-xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, ease: 'easeOut' }}
            className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          >
            <div>
              <div className="inline-flex items-center gap-2 bg-white border border-[#D4AF37]/25 rounded-full px-4 py-1.5 mb-4 shadow-sm">
                <ShieldIcon size={11} className="text-[#D4AF37]" />
                <span data-imagine-id="admindashboard-secure-badge" className="text-[10px] font-raleway font-bold uppercase tracking-[0.22em] text-[#D4AF37]">Secure Admin Portal</span>
              </div>
              <h1 data-imagine-id="admindashboard-heading" className="font-raleway text-3xl md:text-4xl font-bold text-[#212121] tracking-tight leading-tight">Admin Dashboard</h1>
              <p data-imagine-id="admindashboard-subhead" className="font-raleway text-sm text-[#212121]/45 mt-1.5">NC Nandini Collections &mdash; Catalog & Inventory Management</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end gap-0.5">
                <span data-imagine-id="admindashboard-user-email" className="font-raleway text-xs font-semibold text-[#212121]/70">{currentUser?.email}</span>
                <span data-imagine-id="admindashboard-user-role" className="font-raleway text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">Administrator</span>
              </div>
              <button
                onClick={handleLogout}
                data-imagine-id="admindashboard-logout-btn"
                className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#212121]/12 bg-white text-[#212121]/55 hover:text-red-500 hover:border-red-300 hover:bg-red-50 transition-all duration-200 font-raleway text-xs font-semibold tracking-wide shadow-sm cursor-pointer"
                aria-label="Logout"
              >
                <LogOutIcon size={13} />
                <span data-imagine-id="admindashboard-logout-label">Sign Out</span>
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.46, delay: 0.1, ease: 'easeOut' }}
            className="mb-3"
          >
            <div className="flex items-center gap-1 bg-white rounded-2xl p-1.5 border border-[#e8e0cc] shadow-sm w-fit">
              {tabs.map((tab) => {
                const TabIcon = tab.icon || PackageIcon;
                const active = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={[
                      'flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold font-raleway uppercase tracking-widest transition-all duration-200 cursor-pointer',
                      active
                        ? 'bg-[#212121] text-white shadow-md'
                        : 'text-[#212121]/45 hover:text-[#212121] hover:bg-[#f5f0e8]',
                    ].join(' ')}
                    aria-selected={active}
                    role="tab"
                  >
                    <TabIcon size={13} />
                    {tab.label}
                    <span
                      className={[
                        'ml-0.5 text-[10px] font-bold rounded-full px-1.5 py-0.5',
                        active ? 'bg-white/20 text-white' : 'bg-[#D4AF37]/15 text-[#D4AF37]',
                      ].join(' ')}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18, ease: 'easeOut' }}
          >
            <AnimatePresence mode="wait">
              {activeTab === 'products' && (
                <motion.div
                  key="products-tab"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                >
                  <div className="mb-4 flex justify-end">
                    <button
                      onClick={handleOpenAdd}
                      data-imagine-id="admindashboard-add-product-btn"
                      className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#D4AF37] text-white font-raleway text-xs font-bold uppercase tracking-widest hover:bg-[#b8952e] transition-colors duration-200 shadow-md cursor-pointer"
                    >
                      <PlusIcon size={14} />
                      <span data-imagine-id="admindashboard-add-product-label">Add Product</span>
                    </button>
                  </div>
                  <AdminProductList
                    products={products}
                  />
                </motion.div>
              )}

              {activeTab === 'categories' && (
                <motion.div
                  key="categories-tab"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  className="py-6"
                >
                  <ManageCategoriesPanel categories={categories} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </main>

      <Footer />

      <AnimatePresence>
        {formOpen && (
          <AddEditProductForm
            key="product-form-drawer"
            product={formProductForDrawer}
            categories={categories?.map((c) => c?.name)}
            onSave={handleProductSave}
            onClose={() => { setFormOpen(false); setEditingProduct(null); }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-6 py-3.5 rounded-full shadow-xl font-raleway text-sm font-semibold bg-[#212121] text-[#D4AF37] border border-[#D4AF37]/30"
          >
            <CheckIcon size={15} />
            <span data-imagine-id="admindashboard-toast-msg">{toast?.msg}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
