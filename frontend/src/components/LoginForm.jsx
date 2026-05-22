import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';

const EyeIcon = Icons['Eye'] || Icons['HelpCircle'];
const EyeOffIcon = Icons['EyeOff'] || Icons['HelpCircle'];
const LockIcon = Icons['Lock'] || Icons['HelpCircle'];
const MailIcon = Icons['Mail'] || Icons['HelpCircle'];
const ShieldIcon = Icons['Shield'] || Icons['HelpCircle'];

const ADMIN_EMAIL = 'admin@nandini.com';
const ADMIN_PASSWORD = 'Nandini@2024';

function LoginForm({ onLogin, error }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState('');
  const [touched, setTouched] = useState({ email: false, password: false });

  const emailError = touched.email && !email.trim() ? 'Email is required' : touched.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? 'Enter a valid email' : '';
  const passwordError = touched.password && !password.trim() ? 'Password is required' : touched.password && password.length < 6 ? 'Password must be at least 6 characters' : '';

  const displayError = error || localError;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (!email.trim() || !password.trim() || emailError || passwordError) return;

    setLoading(true);
    setLocalError('');

    await new Promise((resolve) => setTimeout(resolve, 900));

    if (email.trim().toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const session = { email: ADMIN_EMAIL, role: 'admin', loggedInAt: new Date().toISOString() };
      localStorage.setItem('nc_admin_session', JSON.stringify(session));
      setLoading(false);
      onLogin?.(session);
    } else {
      setLocalError('Invalid credentials. Please try again.');
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 32, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.55, ease: 'easeOut', staggerChildren: 0.1, delayChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-12"
      style={{
        background: 'linear-gradient(135deg, #fdf8f2 0%, #faf3e8 40%, #f5ebe0 100%)'
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(212,175,55,0.07) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(59,28,3,0.04) 0%, transparent 50%)'
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative w-full"
        style={{ minWidth: '320px', maxWidth: '450px' }}
      >
        <div
          className="bg-white rounded-3xl px-10 py-12 flex flex-col"
          style={{
            boxShadow: '0 8px 48px rgba(59,28,3,0.10), 0 1.5px 6px rgba(212,175,55,0.08)',
            borderTop: '3.5px solid #D4AF37'
          }}
        >
          <motion.div variants={itemVariants} className="flex flex-col items-center mb-10">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mb-5"
              style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #b8962e 100%)', boxShadow: '0 4px 16px rgba(212,175,55,0.28)' }}
            >
              <ShieldIcon size={22} color="#fff" strokeWidth={1.8} />
            </div>
            <h1
              className="font-playfair text-3xl font-bold tracking-wide text-center leading-tight"
              style={{ color: '#3b1c03', letterSpacing: '0.01em' }}
            >
              Admin Login
            </h1>
            <p
              className="mt-2 text-sm text-center font-raleway tracking-wide"
              style={{ color: '#9a7a5a', fontFamily: 'Raleway, sans-serif' }}
            >
              NC Nandini Collections — Secure Portal
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
            <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
              <label
                htmlFor="login-email"
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: '#3b1c03', fontFamily: 'Playfair Display, serif', letterSpacing: '0.12em' }}
              >
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <MailIcon size={16} strokeWidth={1.8} style={{ color: emailError ? '#dc2626' : email ? '#D4AF37' : '#c4a882' }} />
                </span>
                <input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.currentTarget.value);
                    setLocalError('');
                  }}
                  onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                  placeholder="admin@nandini.com"
                  className="w-full pl-10 pr-4 py-3.5 text-sm rounded-2xl outline-none transition-all duration-200"
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    color: '#3b1c03',
                    background: '#fdf8f2',
                    border: emailError ? '1.5px solid #dc2626' : '1.5px solid #e8d9c4',
                    boxShadow: emailError ? '0 0 0 3px rgba(220,38,38,0.08)' : 'none'
                  }}
                  onFocus={(e) => {
                    if (!emailError) {
                      e.currentTarget.style.border = '1.5px solid #D4AF37';
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(212,175,55,0.13)';
                    }
                  }}
                  onBlurCapture={(e) => {
                    if (!emailError) {
                      e.currentTarget.style.border = '1.5px solid #e8d9c4';
                      e.currentTarget.style.boxShadow = 'none';
                    }
                  }}
                  aria-invalid={!!emailError}
                  aria-describedby={emailError ? 'email-error' : undefined}
                />
              </div>
              <AnimatePresence>
                {emailError && (
                  <motion.p
                    id="email-error"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="text-xs font-medium"
                    style={{ color: '#dc2626', fontFamily: 'Raleway, sans-serif' }}
                  >
                    {emailError}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
              <label
                htmlFor="login-password"
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: '#3b1c03', fontFamily: 'Raleway, sans-serif', letterSpacing: '0.12em' }}
              >
                Password
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <LockIcon size={16} strokeWidth={1.8} style={{ color: passwordError ? '#dc2626' : password ? '#D4AF37' : '#c4a882' }} />
                </span>
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.currentTarget.value);
                    setLocalError('');
                  }}
                  onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-12 py-3.5 text-sm rounded-2xl outline-none transition-all duration-200"
                  style={{
                    fontFamily: 'Raleway, sans-serif',
                    color: '#3b1c03',
                    background: '#fdf8f2',
                    border: passwordError ? '1.5px solid #dc2626' : '1.5px solid #e8d9c4',
                    boxShadow: passwordError ? '0 0 0 3px rgba(220,38,38,0.08)' : 'none'
                  }}
                  onFocus={(e) => {
                    if (!passwordError) {
                      e.currentTarget.style.border = '1.5px solid #D4AF37';
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(212,175,55,0.13)';
                    }
                  }}
                  onBlurCapture={(e) => {
                    if (!passwordError) {
                      e.currentTarget.style.border = '1.5px solid #e8d9c4';
                      e.currentTarget.style.boxShadow = 'none';
                    }
                  }}
                  aria-invalid={!!passwordError}
                  aria-describedby={passwordError ? 'password-error' : undefined}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-0.5 rounded-lg transition-opacity duration-150 hover:opacity-70"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword
                    ? <EyeOffIcon size={16} strokeWidth={1.8} style={{ color: '#c4a882' }} />
                    : <EyeIcon size={16} strokeWidth={1.8} style={{ color: '#c4a882' }} />}
                </button>
              </div>
              <AnimatePresence>
                {passwordError && (
                  <motion.p
                    id="password-error"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="text-xs font-medium"
                    style={{ color: '#dc2626', fontFamily: 'Raleway, sans-serif' }}
                  >
                    {passwordError}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            <AnimatePresence>
              {displayError && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.97, y: -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97, y: -4 }}
                  transition={{ duration: 0.22 }}
                  className="flex items-center gap-2.5 px-4 py-3 rounded-2xl"
                  style={{ background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.18)' }}
                  role="alert"
                >
                  {(() => {
                    const AlertIcon = Icons['AlertCircle'] || Icons['HelpCircle'];
                    return <AlertIcon size={15} strokeWidth={1.8} style={{ color: '#dc2626', flexShrink: 0 }} />;
                  })()}
                  <p className="text-xs font-medium" style={{ color: '#dc2626', fontFamily: 'Raleway, sans-serif' }}>
                    {displayError}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div variants={itemVariants}>
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={!loading ? { scale: 1.018, boxShadow: '0 8px 32px rgba(212,175,55,0.38)' } : {}}
                whileTap={!loading ? { scale: 0.985 } : {}}
                transition={{ duration: 0.18 }}
                className="w-full py-4 px-8 rounded-full font-semibold text-sm tracking-widest uppercase transition-all duration-200 flex items-center justify-center gap-2.5 relative overflow-hidden"
                style={{
                  background: loading ? 'linear-gradient(135deg, #e8d098 0%, #c9a830 100%)' : 'linear-gradient(135deg, #D4AF37 0%, #b8962e 100%)',
                  color: '#ffffff',
                  fontFamily: 'Raleway, sans-serif',
                  letterSpacing: '0.13em',
                  boxShadow: '0 4px 20px rgba(212,175,55,0.25)',
                  cursor: loading ? 'not-allowed' : 'pointer'
                }}
                aria-busy={loading}
              >
                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.span
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2.5"
                    >
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                        className="block w-4 h-4 rounded-full"
                        style={{ border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff' }}
                      />
                      Authenticating…
                    </motion.span>
                  ) : (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      {(() => {
                        const LoginIcon = Icons['LogIn'] || Icons['HelpCircle'];
                        return <LoginIcon size={16} strokeWidth={2} />;
                      })()}
                      Login
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
          </form>

          <motion.div
            variants={itemVariants}
            className="mt-8 pt-6 flex items-center justify-center gap-2"
            style={{ borderTop: '1px solid #f0e4d0' }}
          >
            <div className="w-5 h-px" style={{ background: '#D4AF37', opacity: 0.5 }} />
            <p className="text-xs text-center" style={{ color: '#c4a882', fontFamily: 'Raleway, sans-serif', letterSpacing: '0.06em' }}>
              NC Nandini Collections &mdash; Admin Portal
            </p>
            <div className="w-5 h-px" style={{ background: '#D4AF37', opacity: 0.5 }} />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default LoginForm;
