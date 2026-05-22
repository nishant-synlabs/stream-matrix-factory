import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import { useAuth } from '../AuthContext';

const NAV_LINKS = [
  { label: 'Home', route: '/' },
  { label: 'Catalog', route: '/catalog' },
  { label: 'About', route: '/about' },
];

export default function Header({ isLoggedIn, onLoginClick }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
  const avatarRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();
  const activeRoute = location.pathname;

  const authContext = useAuth();
  const user = authContext?.user;
  const logout = authContext?.logout;
  const isAdmin = user?.role === 'admin';

  const loggedIn = isLoggedIn !== undefined ? isLoggedIn : !!user;

  const MenuIcon = Icons['Menu'] || Icons['HelpCircle'];
  const XIcon = Icons['X'] || Icons['HelpCircle'];
  const LogInIcon = Icons['LogIn'] || Icons['HelpCircle'];
  const LogOutIcon = Icons['LogOut'] || Icons['HelpCircle'];
  const ShieldIcon = Icons['ShieldCheck'] || Icons['HelpCircle'];
  const ChevronDownIcon = Icons['ChevronDown'] || Icons['HelpCircle'];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (avatarRef.current && !avatarRef.current.contains(e.target)) {
        setAvatarMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (e, route) => {
    e.preventDefault();
    setMobileOpen(false);
    setAvatarMenuOpen(false);
    
    if (location.pathname === route) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate(route);
    }
  };

  const handleLoginClick = () => {
    setMobileOpen(false);
    if (onLoginClick) {
      onLoginClick();
    } else {
      window.location.href = '/login';
    }
  };

  const handleLogout = () => {
    setAvatarMenuOpen(false);
    setMobileOpen(false);
    logout?.();
  };

  const userInitials = user?.name
    ? user.name.split(' ').map((n) => n?.[0]).slice(0, 2).join('').toUpperCase()
    : 'U';

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`sticky top-0 z-40 w-full transition-all duration-500 ${
        scrolled
          ? 'bg-white/97 backdrop-blur-lg shadow-[0_2px_32px_rgba(212,175,55,0.10)] border-b border-[#D4AF37]/18'
          : 'bg-white/90 backdrop-blur-sm border-b border-[#D4AF37]/10'
      }`}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 md:px-12 lg:px-16">

        <motion.a
          href="/"
          onClick={(e) => handleNavClick(e, '/')}
          className="flex items-center gap-2.5 select-none group"
          whileHover={{ opacity: 0.85 }}
          transition={{ duration: 0.2 }}
          data-imagine-id="header-logo-link"
        >
          <div className="flex flex-col leading-none">
            <span
              data-imagine-id="header-logo-monogram"
              className="font-raleway text-[10px] font-bold uppercase tracking-[0.36em] text-[#D4AF37] mb-[3px]"
            >
              NC
            </span>
            <span
              data-imagine-id="header-logo-brand"
              className="font-raleway text-[16px] font-semibold tracking-[0.20em] text-[#212121] uppercase leading-none"
            >
              Nandini
            </span>
            <span
              data-imagine-id="header-logo-sub"
              className="font-raleway text-[8.5px] font-medium tracking-[0.30em] text-[#212121]/40 uppercase mt-[3px]"
            >
              Collections
            </span>
          </div>
          <div className="w-px h-9 bg-gradient-to-b from-transparent via-[#D4AF37]/45 to-transparent" />
        </motion.a>

        <nav className="hidden md:flex items-center gap-10" aria-label="Primary navigation">
          {NAV_LINKS.map((link, index) => {
            const isActive = activeRoute === link?.route;
            return (
              <motion.div
                key={link?.label || index}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + 1), duration: 0.38, ease: 'easeOut' }}
              >
                <a
                  href={link?.route || '/'}
                  onClick={(e) => handleNavClick(e, link?.route || '/')}
                  className="group relative font-raleway text-[12.5px] font-semibold uppercase tracking-[0.18em] text-[#212121] transition-colors duration-300 hover:text-[#D4AF37]"
                  data-imagine-id={`header-nav-${index}`}
                >
                  <span data-imagine-id={`header-nav-label-${index}`}>{link?.label}</span>
                  <span
                    className={`absolute -bottom-1 left-0 h-[1.5px] bg-gradient-to-r from-[#D4AF37] to-[#C59B27] transition-all duration-300 ease-out ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </a>
              </motion.div>
            );
          })}

          {loggedIn ? (
            <div className="flex items-center gap-3" ref={avatarRef}>
              {isAdmin && (
                <motion.a
                  href="/admin"
                  onClick={(e) => handleNavClick(e, '/admin')}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.32 }}
                  whileHover={{ scale: 1.03 }}
                  className="flex items-center gap-2 font-raleway text-[11.5px] font-bold uppercase tracking-[0.18em] text-white bg-[#212121] px-4 py-2.5 rounded-full hover:bg-[#D4AF37] hover:text-[#212121] transition-colors duration-300 shadow-[0_2px_16px_rgba(212,175,55,0.18)]"
                  data-imagine-id="header-admin-btn"
                >
                  <ShieldIcon size={12} />
                  <span data-imagine-id="header-admin-label">Dashboard</span>
                </motion.a>
              )}
              <div className="relative">
                <button
                  onClick={() => setAvatarMenuOpen((prev) => !prev)}
                  className="flex items-center gap-1.5 group"
                  aria-label="User menu"
                  aria-expanded={avatarMenuOpen}
                  data-imagine-id="header-avatar-btn"
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#D4AF37]/25 to-[#D4AF37]/8 border-2 border-[#D4AF37]/55 flex items-center justify-center shadow-[0_0_0_3px_rgba(212,175,55,0.12)] transition-all duration-200 group-hover:border-[#D4AF37]/80">
                    <span
                      className="font-raleway text-[11px] font-bold text-[#D4AF37] uppercase tracking-wide"
                      data-imagine-id="header-avatar-initials"
                    >
                      {userInitials}
                    </span>
                  </div>
                  <ChevronDownIcon
                    size={13}
                    className={`text-[#212121]/45 transition-transform duration-200 ${
                      avatarMenuOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {avatarMenuOpen && (
                    <motion.div
                      key="avatar-dropdown"
                      initial={{ opacity: 0, y: -8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.96 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="absolute right-0 top-12 w-48 bg-white rounded-2xl shadow-[0_8px_40px_rgba(212,175,55,0.16)] border border-[#D4AF37]/18 overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-[#D4AF37]/12">
                        <p
                          className="font-raleway text-[11px] font-semibold text-[#212121] truncate"
                          data-imagine-id="header-dropdown-username"
                        >
                          {user?.name || 'Account'}
                        </p>
                        <p
                          className="font-raleway text-[10px] text-[#212121]/40 truncate mt-0.5"
                          data-imagine-id="header-dropdown-email"
                        >
                          {user?.email || ''}
                        </p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2.5 w-full px-4 py-3 font-raleway text-[12px] font-semibold text-[#212121]/65 hover:text-[#D4AF37] hover:bg-[#D4AF37]/6 transition-colors duration-200"
                        data-imagine-id="header-dropdown-logout"
                      >
                        <LogOutIcon size={13} />
                        <span data-imagine-id="header-dropdown-logout-label">Sign Out</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ) : (
            <motion.button
              onClick={handleLoginClick}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, delay: 0.42 }}
              whileHover={{ scale: 1.04, boxShadow: '0 4px 24px rgba(212,175,55,0.28)' }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 font-raleway text-[12.5px] font-bold uppercase tracking-[0.18em] text-[#212121] bg-transparent border-2 border-[#D4AF37] px-5 py-2.5 rounded-full hover:bg-[#D4AF37] hover:text-white transition-all duration-300 shadow-[0_2px_16px_rgba(212,175,55,0.12)]"
              data-imagine-id="header-login-btn"
            >
              <LogInIcon size={13} />
              <span data-imagine-id="header-login-label">Login</span>
            </motion.button>
          )}
        </nav>

        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          className="flex md:hidden h-10 w-10 items-center justify-center rounded-full text-[#212121] hover:bg-[#D4AF37]/10 transition-colors duration-200"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
          data-imagine-id="header-mobile-toggle"
        >
          {mobileOpen ? <XIcon size={21} /> : <MenuIcon size={21} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden md:hidden bg-white border-t border-[#D4AF37]/12"
          >
            <ul className="flex flex-col items-center gap-0 px-6 py-6">
              {NAV_LINKS.map((link, index) => (
                <motion.li
                  key={link?.label || index}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * index, duration: 0.26 }}
                  className="w-full"
                >
                  <a
                    href={link?.route || '/'}
                    onClick={(e) => handleNavClick(e, link?.route || '/')}
                    className="block w-full py-3.5 font-raleway text-[13px] font-semibold uppercase tracking-[0.20em] text-[#212121] hover:text-[#D4AF37] transition-colors duration-200 border-b border-[#D4AF37]/12 text-center"
                    data-imagine-id={`header-mobile-nav-${index}`}
                  >
                    <span data-imagine-id={`header-mobile-nav-label-${index}`}>{link?.label}</span>
                  </a>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.04 * NAV_LINKS.length, duration: 0.26 }}
                className="w-full pt-5"
              >
                {loggedIn ? (
                  <div className="flex flex-col gap-2.5">
                    {isAdmin && (
                      <a
                        href="/admin"
                        onClick={(e) => handleNavClick(e, '/admin')}
                        className="flex items-center justify-center gap-2 w-full py-3 font-raleway text-[12.5px] font-bold uppercase tracking-[0.18em] text-white bg-[#212121] rounded-full hover:bg-[#D4AF37] hover:text-[#212121] transition-colors duration-300 shadow-[0_2px_16px_rgba(212,175,55,0.18)]"
                        data-imagine-id="header-mobile-admin-btn"
                      >
                        <ShieldIcon size={13} />
                        <span data-imagine-id="header-mobile-admin-label">Admin Dashboard</span>
                      </a>
                    )}
                    <button
                      onClick={handleLogout}
                      className="flex items-center justify-center gap-2 w-full py-3 font-raleway text-[12.5px] font-semibold text-[#212121]/60 border border-[#D4AF37]/30 rounded-full hover:bg-[#D4AF37]/8 hover:text-[#D4AF37] transition-colors duration-200"
                      data-imagine-id="header-mobile-logout-btn"
                    >
                      <LogOutIcon size={13} />
                      <span data-imagine-id="header-mobile-logout-label">Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleLoginClick}
                    className="flex items-center justify-center gap-2 w-full py-3 font-raleway text-[12.5px] font-bold uppercase tracking-[0.18em] text-[#212121] border-2 border-[#D4AF37] rounded-full hover:bg-[#D4AF37] hover:text-white transition-all duration-300 shadow-[0_2px_16px_rgba(212,175,55,0.12)]"
                    data-imagine-id="header-mobile-login-btn"
                  >
                    <LogInIcon size={13} />
                    <span data-imagine-id="header-mobile-login-label">Login</span>
                  </button>
                )}
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
