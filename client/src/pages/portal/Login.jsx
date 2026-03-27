import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Shield, Mail, Lock, Eye, EyeOff, LogIn, ArrowRight } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  
  const from = location.state?.from?.pathname || '/portal/dashboard'

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await signIn(formData.email, formData.password)
      navigate(from, { replace: true })
    } catch (error) {
      // Error handled in context
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Form Header */}
      <div className="space-y-2">
        <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
          OPERATÖR <span className="text-[var(--color-neon)]">GİRİŞİ</span>
        </h2>
        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
          Terminal erişimi için kimlik doğrulayın
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-4">
          <Input
            type="email"
            name="email"
            placeholder="E-POSTA ADRESİ"
            value={formData.email}
            onChange={handleChange}
            required
            icon={Mail}
            className="bg-black/20 border-white/5 py-4 text-xs font-bold tracking-widest uppercase placeholder:text-gray-700"
          />

          <div className="relative group">
            <Input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="GÜVENLİK ANAHTARI"
              value={formData.password}
              onChange={handleChange}
              required
              icon={Lock}
              className="bg-black/20 border-white/5 py-4 text-xs font-bold tracking-widest uppercase placeholder:text-gray-700"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-[var(--color-neon)] transition-colors p-1"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-end">
          <Link
            to="/portal/forgot-password"
            className="text-[10px] font-bold text-gray-600 hover:text-[var(--color-neon)] uppercase tracking-widest transition-colors"
          >
            Şifremi Unuttum?
          </Link>
        </div>

        <Button
          type="submit"
          className="w-full py-6 group relative overflow-hidden text-sm uppercase tracking-[0.2em]"
          loading={loading}
          disabled={loading}
          icon={LogIn}
        >
          <span>{loading ? 'DOĞRULANIYOR...' : 'ERİŞİM İZNİ AL'}</span>
        </Button>
      </form>

      {/* Footer Actions */}
      <div className="pt-6 border-t border-white/5 space-y-4">
        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest">
          <span className="text-gray-600">Henüz kaydınız yok mu?</span>
          <Link
            to="/portal/register"
            className="flex items-center text-[var(--color-neon)] hover:brightness-125 transition-all group"
          >
            Yeni Hesap Oluştur
            <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        {/* Demo Credentials Helper */}
        <div className="p-4 bg-white/5 rounded-xl border border-white/5 flex items-start space-x-3 group">
          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--color-neon)]/10 transition-colors">
            <Shield className="w-4 h-4 text-gray-600 group-hover:text-[var(--color-neon)]" />
          </div>
          <div className="space-y-1">
            <p className="text-[9px] font-black text-white/40 uppercase tracking-widest leading-none">Demo Modu Aktif</p>
            <p className="text-[10px] font-bold text-gray-600">admin@axiar.io / demo123</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Login
