import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db } from '../firebase'
import { Eye, EyeOff, ArrowLeft } from 'lucide-react'

export default function Login() {
  const [isRegister, setIsRegister] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (isRegister) {
        const cred = await createUserWithEmailAndPassword(auth, email, password)
        await setDoc(doc(db, 'users', cred.user.uid), {
          name,
          email,
          role: 'client',
          createdAt: new Date().toISOString(),
        })
        navigate('/portal')
      } else {
        await signInWithEmailAndPassword(auth, email, password)
        navigate('/admin')
      }
    } catch (err) {
      const messages = {
        'auth/invalid-credential': 'Invalid email or password.',
        'auth/email-already-in-use': 'An account with this email already exists.',
        'auth/weak-password': 'Password must be at least 6 characters.',
        'auth/invalid-email': 'Please enter a valid email address.',
      }
      setError(messages[err.code] || err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center p-4 relative">
      {/* Background */}
      <div className="fixed inset-0 z-0 grid-bg pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-violet-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Back to site */}
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to site
        </Link>

        {/* Card */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center">
              <span className="text-white text-sm font-bold">M</span>
            </div>
            <span className="font-mono text-[11px] tracking-[2px] uppercase text-white/60">Media Minds AI</span>
          </div>

          <h1 className="text-2xl font-display font-bold text-white mb-1">
            {isRegister ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p className="text-sm text-white/50 mb-8">
            {isRegister ? 'Set up your client portal account.' : 'Sign in to your dashboard.'}
          </p>

          {error && (
            <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-300">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div>
                <label className="block text-xs text-white/50 uppercase tracking-wider mb-2">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500/30"
                  placeholder="John Smith"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-xs text-white/50 uppercase tracking-wider mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500/30"
                placeholder="you@company.com"
                required
              />
            </div>

            <div>
              <label className="block text-xs text-white/50 uppercase tracking-wider mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/[0.05] px-4 py-3 pr-10 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500/30"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-violet-600 py-3 text-sm font-semibold text-white hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {isRegister ? 'Creating...' : 'Signing in...'}
                </span>
              ) : (
                isRegister ? 'Create Account' : 'Sign In'
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-white/50">
            {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={() => { setIsRegister(!isRegister); setError('') }}
              className="text-violet-400 hover:text-violet-300 transition-colors"
            >
              {isRegister ? 'Sign In' : 'Register'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
