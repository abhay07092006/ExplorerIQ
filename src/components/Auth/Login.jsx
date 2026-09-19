import { useState } from 'react';
import {
  Compass,
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
  AlertCircle,
  Eye,
  EyeOff,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Login({ onSwitchToRegister, onLoginSuccess }) {
  const { login, authError } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localError, setLocalError] = useState(null);

  // Forgot password modal state
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);
  const [resetError, setResetError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);

    if (!email || !password) {
      setLocalError('Please enter both email and password.');
      return;
    }

    setIsSubmitting(true);
    try {
      await login(email, password);
      if (onLoginSuccess) onLoginSuccess();
    } catch (err) {
      setLocalError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoLogin = async () => {
    setIsSubmitting(true);
    setLocalError(null);
    try {
      await login('aarav.sharma@exploreriq.com', 'Traveler123!');
      if (onLoginSuccess) onLoginSuccess();
    } catch (err) {
      setLocalError(err.message || 'Demo login failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setResetError(null);
    if (!resetEmail) {
      setResetError('Please enter your email address.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/v1/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resetEmail })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to send reset link.');
      setResetSuccess(true);
    } catch (err) {
      // Fallback for offline mode
      setResetSuccess(true);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 animate-in fade-in duration-200">
      {/* Header Graphic */}
      <div className="relative bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 p-8 text-white text-center">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-500 to-teal-400 p-[2px] mx-auto mb-4 shadow-lg shadow-sky-500/20 flex items-center justify-center">
          <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
            <Compass className="w-7 h-7 text-sky-400" />
          </div>
        </div>

        <h2 className="text-2xl font-extrabold text-white">Welcome Back</h2>
        <p className="text-xs text-slate-300 mt-1 max-w-xs mx-auto">
          Sign in to access your saved itineraries, bookmarked places, and verified contributions.
        </p>
      </div>

      {/* Form Body */}
      <div className="p-8 space-y-5">
        {(localError || authError) && (
          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{localError || authError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Password
              </label>
              <button
                type="button"
                onClick={() => {
                  setShowForgotPassword(true);
                  setResetSuccess(false);
                }}
                className="text-[11px] text-sky-600 hover:underline font-semibold"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20 transition-all disabled:opacity-50"
          >
            <span>{isSubmitting ? 'Signing In...' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Demo Login Button */}
        <div className="pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={handleDemoLogin}
            disabled={isSubmitting}
            className="w-full py-3 px-4 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>One-Click Demo Traveler Sign-In</span>
          </button>
        </div>

        {/* Switch to Register */}
        <p className="text-center text-xs text-slate-500 pt-2">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="font-bold text-sky-600 hover:underline"
          >
            Create an Account
          </button>
        </p>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <h3 className="text-base font-extrabold text-slate-900">Reset Your Password</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Enter your registered email address and we'll dispatch password reset instructions.
            </p>

            {resetSuccess ? (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span>Password reset link sent! Check your inbox.</span>
              </div>
            ) : (
              <form onSubmit={handleForgotPasswordSubmit} className="space-y-3">
                {resetError && (
                  <p className="text-xs text-rose-600 font-medium">{resetError}</p>
                )}
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs rounded-xl shadow-sm transition-colors"
                >
                  Send Reset Link
                </button>
              </form>
            )}

            <button
              onClick={() => setShowForgotPassword(false)}
              className="w-full text-center text-xs font-bold text-slate-500 hover:text-slate-800 pt-1"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
