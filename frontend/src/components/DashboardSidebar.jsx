import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';

const NAV_ITEMS = [
  { key: 'products', label: 'Products', icon: 'Package' },
  { key: 'categories', label: 'Categories', icon: 'LayoutGrid' },
];

const sidebarVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeOut', staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { x: -12, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.3, ease: 'easeOut' } },
};

function DashboardSidebar({ activeSection, onSectionChange, onLogout }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const MenuIcon = Icons['Menu'] || Icons['HelpCircle'];
  const XIcon = Icons['X'] || Icons['HelpCircle'];
  const LogOutIcon = Icons['LogOut'] || Icons['HelpCircle'];
  const SparklesIcon = Icons['Sparkles'] || Icons['HelpCircle'];

  const SidebarContent = () => (
    <motion.aside
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col h-full bg-white border-r-2 border-[#D4AF37] px-5 pt-8 pb-8 min-w-[112px] w-[220px] z-30 select-none"
    >
      <motion.div variants={itemVariants} className="flex flex-col items-start gap-1 mb-10">
        <div className="flex items-center gap-2 mb-1">
          <SparklesIcon size={16} strokeWidth={1.5} className="text-[#D4AF37]" />
          <span className="font-playfair text-[11px] tracking-[0.18em] uppercase text-[#D4AF37] font-medium">
            Admin
          </span>
        </div>
        <span className="font-playfair text-[#3b1c03] text-[17px] font-semibold leading-tight tracking-wide">
          NC Nandini
        </span>
        <span className="font-playfair text-[#3b1c03] text-[13px] font-medium leading-tight tracking-widest opacity-60">
          Collections
        </span>
        <div className="mt-3 w-8 h-[1.5px] bg-[#D4AF37] rounded-full opacity-60" />
      </motion.div>

      <nav className="flex flex-col gap-3 flex-1">
        {NAV_ITEMS.map((item) => {
          const NavIcon = Icons[item.icon] || Icons['HelpCircle'];
          const isActive = activeSection === item.key;
          return (
            <motion.button
              key={item.key}
              variants={itemVariants}
              whileHover={{ x: 3, transition: { duration: 0.18, ease: 'easeOut' } }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                onSectionChange?.(item.key);
                setMobileOpen(false);
              }}
              aria-label={`Navigate to ${item.label}`}
              aria-current={isActive ? 'page' : undefined}
              className={[
                'flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-left transition-all duration-200 group',
                isActive
                  ? 'bg-[#D4AF37]/10 text-[#D4AF37] shadow-sm'
                  : 'text-[#3b1c03]/60 hover:bg-[#D4AF37]/5 hover:text-[#D4AF37]',
              ].join(' ')}
            >
              <NavIcon
                size={17}
                strokeWidth={isActive ? 2 : 1.5}
                className={isActive ? 'text-[#D4AF37]' : 'text-[#3b1c03]/40 group-hover:text-[#D4AF37] transition-colors duration-200'}
              />
              <span
                className={[
                  'font-playfair text-[13.5px] tracking-wide font-medium transition-colors duration-200',
                  isActive ? 'text-[#D4AF37]' : 'text-[#3b1c03]/70 group-hover:text-[#D4AF37]',
                ].join(' ')}
              >
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="ml-auto w-1 h-1 rounded-full bg-[#D4AF37]"
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                />
              )}
            </motion.button>
          );
        })}
      </nav>

      <motion.div variants={itemVariants} className="mt-auto pt-6">
        <div className="w-full h-[1.5px] bg-[#D4AF37]/20 rounded-full mb-6" />
        <motion.button
          whileHover={{
            scale: 1.02,
            boxShadow: '0 0 14px 2px rgba(212,175,55,0.18)',
            transition: { duration: 0.2, ease: 'easeOut' },
          }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onLogout?.()}
          aria-label="Logout from admin dashboard"
          className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-full border border-[#D4AF37] text-[#D4AF37] bg-transparent hover:bg-[#D4AF37]/8 transition-colors duration-200 group"
        >
          <LogOutIcon
            size={15}
            strokeWidth={1.5}
            className="text-[#D4AF37] group-hover:translate-x-0.5 transition-transform duration-200"
          />
          <span className="font-playfair text-[13px] tracking-wide font-medium">
            Logout
          </span>
        </motion.button>
      </motion.div>
    </motion.aside>
  );

  return (
    <>
      <div className="hidden md:flex h-full sticky top-0">
        <SidebarContent />
      </div>

      <div className="md:hidden">
        <motion.button
          whileTap={{ scale: 0.93 }}
          onClick={() => setMobileOpen(true)}
          aria-label="Open navigation menu"
          className="fixed top-4 left-4 z-50 w-10 h-10 rounded-full bg-white border border-[#D4AF37]/40 shadow-md flex items-center justify-center"
        >
          <MenuIcon size={18} strokeWidth={1.5} className="text-[#D4AF37]" />
        </motion.button>

        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.div
                key="overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22 }}
                onClick={() => setMobileOpen(false)}
                className="fixed inset-0 z-40 bg-[#3b1c03]/20 backdrop-blur-sm"
              />
              <motion.div
                key="drawer"
                initial={{ x: '-100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '-100%', opacity: 0 }}
                transition={{ duration: 0.32, ease: 'easeOut' }}
                className="fixed top-0 left-0 h-full z-50 shadow-2xl"
              >
                <div className="relative h-full">
                  <button
                    onClick={() => setMobileOpen(false)}
                    aria-label="Close navigation menu"
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full border border-[#D4AF37]/30 bg-white z-10"
                  >
                    <XIcon size={14} strokeWidth={1.5} className="text-[#3b1c03]/60" />
                  </button>
                  <SidebarContent />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default DashboardSidebar;
