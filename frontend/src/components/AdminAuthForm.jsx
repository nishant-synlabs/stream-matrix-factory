import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';

const VALID_EMAIL = 'imaginebo81@gmail.com';
const VALID_PASSWORD = '1234567890';

export default function AdminAuthForm({ onSubmit, error }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState('');

  const EyeIcon = Icons['Eye'] || Icons['HelpCircle'];
  const EyeOffIcon = Icons['EyeOff'] || Icons['HelpCircle'];
  const LockIcon = Icons['Lock'] || Icons['HelpCircle'];
  const MailIcon = Icons['Mail'] || Icons['HelpCircle'];
  const ShieldIcon = Icons['Shield'] || Icons['HelpCircle'];
  const AlertCircleIcon = Icons['AlertCircle'] || Icons['HelpCircle'];
  const ArrowRightIcon = Icons['ArrowRight'] || Icons['HelpCircle'];

  const displayError = localError || error || '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');

    if (!email.trim()) {
      setLocalError('Email address is required.');
      return;
    }
    if (!password.trim()) {
      setLocalError('Password is required.');
      return;
    }
    if (email.trim() !== VALID_EMAIL || password !== VALID_PASSWORD) {
      setLocalError('Invalid credentials. Access denied.');
      return;
    }

    setLoading(true);
    await new Promise((res) => setTimeout(res, 1200));
    setLoading(false);
    onSubmit?.({ email: email.trim(), password });
  };

  return (
    <section className="min-h-screen w-full flex items-center justify-center px-4 py-16 relative overflow-hidden bg-white">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#D4AF37] opacity-5 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#D4AF37] opacity-5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[#D4AF37] opacity-5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-[#D4AF37] opacity-5" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="relative w-full max-w-md bg-white rounded-2xl shadow-[0_8px_48px_0_rgba(212,175,55,0.13)] border border-[#D4AF37]/30 px-10 py-12"
      >
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.45, ease: 'easeOut' }}
          className="flex flex-col items-center mb-10"
        >
          <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center mb-5">
            <ShieldIcon className="w-7 h-7 text-[#D4AF37]" strokeWidth={1.5} />
          </div>
          <h1
            data-imagine-id="adminauthform-title"
            className="font-playfair text-2xl font-bold tracking-tight text-[#1a1a1a] text-center"
          >
            Admin Access
          </h1>
          <p
            data-imagine-id="adminauthform-subtitle"
            className="font-[Raleway,Arial,sans-serif] text-sm text-[#888] mt-2 text-center tracking-wide"
          >
            NC Nandini Collections — Restricted Area
          </p>
          <div className="w-10 h-[2px] bg-[#D4AF37] rounded-full mt-4" />
        </motion.div>

        <AnimatePresence mode="wait">
          {displayError && (
            <motion.div
              key="error-bar"
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="overflow-hidden mb-6"
            >
              <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                <AlertCircleIcon className="w-4 h-4 text-red-500 shrink-0" strokeWidth={2} />
                <p
                  data-imagine-id="adminauthform-error-message"
                  className="font-[Raleway,Arial,sans-serif] text-sm text-red-600"
                >
                  {displayError}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25, duration: 0.4, ease: 'easeOut' }}
            className="flex flex-col gap-2"
          >
            <label
              data-imagine-id="adminauthform-email-label"
              htmlFor="admin-email"
              className="font-[Raleway,Arial,sans-serif] text-xs font-semibold tracking-widest text-[#888] uppercase"
            >
              Email Address
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]">
                <MailIcon className="w-4 h-4" strokeWidth={1.8} />
              </span>
              <input
                id="admin-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.currentTarget.value);
                  setLocalError('');
                }}
                placeholder="admin@nandini.com"
                className="w-full pl-11 pr-4 py-4 rounded-xl border border-[#D4AF37]/30 bg-white font-[Raleway,Arial,sans-serif] text-sm text-[#1a1a1a] placeholder-[#ccc] outline-none transition-all duration-200 focus:border-[#D4AF37] focus:shadow-[0_0_0_3px_rgba(212,175,55,0.12)]"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35, duration: 0.4, ease: 'easeOut' }}
            className="flex flex-col gap-2"
          >
            <label
              data-imagine-id="adminauthform-password-label"
              htmlFor="admin-password"
              className="font-[Raleway,Arial,sans-serif] text-xs font-semibold tracking-widest text-[#888] uppercase"
            >
              Password
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]">
                <LockIcon className="w-4 h-4" strokeWidth={1.8} />
              </span>
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.currentTarget.value);
                  setLocalError('');
                }}
                placeholder="••••••••••"
                className="w-full pl-11 pr-12 py-4 rounded-xl border border-[#D4AF37]/30 bg-white font-[Raleway,Arial,sans-serif] text-sm text-[#1a1a1a] placeholder-[#ccc] outline-none transition-all duration-200 focus:border-[#D4AF37] focus:shadow-[0_0_0_3px_rgba(212,175,55,0.12)]"
              />
              <button
                type="button"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#bbb] hover:text-[#D4AF37] transition-colors duration-200"
              >
                {showPassword ? (
                  <EyeOffIcon className="w-4 h-4" strokeWidth={1.8} />
                ) : (
                  <EyeIcon className="w-4 h-4" strokeWidth={1.8} />
                )}
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.4, ease: 'easeOut' }}
            className="pt-2"
          >
            <motion.button
              data-imagine-id="adminauthform-submit-button"
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              transition={{ duration: 0.18 }}
              className="w-full flex items-center justify-center gap-3 bg-[#D4AF37] hover:bg-[#c49e2f] disabled:opacity-70 disabled:cursor-not-allowed text-white font-[Raleway,Arial,sans-serif] font-semibold text-sm tracking-widest uppercase rounded-full py-4 px-8 shadow-[0_4px_20px_0_rgba(212,175,55,0.35)] transition-colors duration-200"
            >
              {loading ? (
                <>
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                    className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                  />
                  <span data-imagine-id="adminauthform-loading-text">Verifying…</span>
                </>
              ) : (
                <>
                  <span data-imagine-id="adminauthform-button-text">Sign In</span>
                  <ArrowRightIcon className="w-4 h-4" strokeWidth={2} />
                </>
              )}
            </motion.button>
          </motion.div>
        </form>

        <motion.p
          data-imagine-id="adminauthform-footer-note"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="font-[Raleway,Arial,sans-serif] text-xs text-[#bbb] text-center mt-8 tracking-wide"
        >
          Authorized personnel only · NC Nandini Collections
        </motion.p>
      </motion.div>
    </section>
  );
}
