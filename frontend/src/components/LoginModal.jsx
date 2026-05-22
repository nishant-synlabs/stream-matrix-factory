import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';

const ADMIN_EMAIL = 'admin@nandini.com';
const ADMIN_PASSWORD = 'admin123';

function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const EyeIcon = Icons['Eye'] || Icons['HelpCircle'];
  const EyeOffIcon = Icons['EyeOff'] || Icons['HelpCircle'];
  const XIcon = Icons['X'] || Icons['HelpCircle'];
  const LockIcon = Icons['Lock'] || Icons['HelpCircle'];
  const MailIcon = Icons['Mail'] || Icons['HelpCircle'];
  const ShieldIcon = Icons['Shield'] || Icons['HelpCircle'];

  const handleClose = useCallback(() => {
    setEmail('');
    setPassword('');
    setError('');
    setLoading(false);
    setShowPassword(false);
    onClose?.();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }
    if (!password.trim()) {
      setError('Please enter your password.');
      return;
    }

    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 900));

    if (email.trim().toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setLoading(false);
      handleClose();
      onLoginSuccess?.({ email: ADMIN_EMAIL, role: 'admin' });
    } else {
      setLoading(false);
      setError('Invalid credentials. Please try again.');
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 32, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
    exit: {
      opacity: 0,
      y: 20,
      scale: 0.97,
      transition: { duration: 0.25, ease: 'easeIn' },
    },
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.18 + i * 0.08, duration: 0.35, ease: 'easeOut' },
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
          <div
            className="absolute inset-0 bg-[#212121]/60 backdrop-blur-sm"
            onClick={handleClose}
            aria-hidden="true"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="login-modal-title"
            className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
            style={{ boxShadow: '0 8px 48px 0 rgba(212,175,55,0.18), 0 2px 12px 0 rgba(33,33,33,0.10)' }}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="h-1 w-full bg-gradient-to-r from-[#D4AF37]/40 via-[#D4AF37] to-[#D4AF37]/40" />

            <div className="px-8 pt-10 pb-10 md:px-10 md:pt-12 md:pb-12">
              <button
                onClick={handleClose}
                aria-label="Close login modal"
                className="absolute top-5 right-5 p-2 rounded-full text-[#212121]/40 hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all duration-200"
              >
                <XIcon size={18} />
              </button>

              <motion.div
                className="flex flex-col items-center mb-8"
                custom={0}
                variants={fieldVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/5 border border-[#D4AF37]/30 mb-4">
                  <ShieldIcon size={24} className="text-[#D4AF37]" />
                </div>
                <h2
                  id="login-modal-title"
                  data-imagine-id="loginmodal-title"
                  className="text-2xl font-bold tracking-tight text-[#212121] font-raleway"
                >
                  Admin Access
                </h2>
                <p
                  data-imagine-id="loginmodal-subtitle"
                  className="mt-1 text-sm text-[#212121]/50 font-raleway tracking-wide"
                >
                  NC Nandini Collections
                </p>
              </motion.div>

              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                <motion.div
                  custom={1}
                  variants={fieldVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <label
                    htmlFor="login-email"
                    data-imagine-id="loginmodal-email-label"
                    className="block text-xs font-semibold tracking-widest uppercase text-[#212121]/50 mb-2 font-raleway"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]/70 pointer-events-none">
                      <MailIcon size={16} />
                    </span>
                    <input
                      id="login-email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => { setEmail(e.currentTarget.value); setError(''); }}
                      placeholder="admin@nandini.com"
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-[#D4AF37]/25 bg-[#FDFAF3] text-[#212121] placeholder-[#212121]/30 text-sm font-raleway focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all duration-200"
                    />
                  </div>
                </motion.div>

                <motion.div
                  custom={2}
                  variants={fieldVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <label
                    htmlFor="login-password"
                    data-imagine-id="loginmodal-password-label"
                    className="block text-xs font-semibold tracking-widest uppercase text-[#212121]/50 mb-2 font-raleway"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]/70 pointer-events-none">
                      <LockIcon size={16} />
                    </span>
                    <input
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => { setPassword(e.currentTarget.value); setError(''); }}
                      placeholder="Enter your password"
                      className="w-full pl-10 pr-12 py-3.5 rounded-xl border border-[#D4AF37]/25 bg-[#FDFAF3] text-[#212121] placeholder-[#212121]/30 text-sm font-raleway focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all duration-200"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-[#212121]/30 hover:text-[#D4AF37] transition-colors duration-200"
                    >
                      {showPassword ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
                    </button>
                  </div>
                </motion.div>

                <AnimatePresence>
                  {error && (
                    <motion.p
                      data-imagine-id="loginmodal-error"
                      role="alert"
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.22, ease: 'easeOut' }}
                      className="text-xs font-semibold text-[#D4AF37] bg-[#D4AF37]/8 border border-[#D4AF37]/20 rounded-lg px-4 py-2.5 font-raleway"
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>

                <motion.div
                  custom={3}
                  variants={fieldVariants}
                  initial="hidden"
                  animate="visible"
                  className="pt-1"
                >
                  <motion.button
                    type="submit"
                    disabled={loading}
                    data-imagine-id="loginmodal-submit-btn"
                    whileHover={{ scale: loading ? 1 : 1.015 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                    className="w-full py-4 px-8 rounded-xl bg-[#D4AF37] text-white font-bold text-sm tracking-widest uppercase font-raleway shadow-md hover:bg-[#BF9A2D] disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-2"
                    style={{ boxShadow: '0 2px 16px 0 rgba(212,175,55,0.28)' }}
                  >
                    {loading ? (
                      <>
                        <span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        <span data-imagine-id="loginmodal-loading-text">Authenticating…</span>
                      </>
                    ) : (
                      <span data-imagine-id="loginmodal-btn-text">Sign In</span>
                    )}
                  </motion.button>
                </motion.div>
              </form>

              <motion.p
                data-imagine-id="loginmodal-footer-note"
                custom={4}
                variants={fieldVariants}
                initial="hidden"
                animate="visible"
                className="mt-6 text-center text-xs text-[#212121]/35 font-raleway tracking-wide"
              >
                Protected access · NC Nandini Collections Admin
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default LoginModal;
