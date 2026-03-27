import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Shield, Mail, Lock, Eye, EyeOff, UserPlus, ArrowLeft, User } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const { signUp } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      // Toast handles this or we can add a local error state
      return
    }

    setLoading(true)
    try {
      await signUp(formData.email, formData.password, formData.fullName)
      // Redirect to login or show success message
      // navigate('/portal/login')
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
          YENİ <span className="text-[var(--color-neon)]">OPERATÖR</span>
        </h2>
        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
          Sistem erişim protokolü başlatın
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-4">
          <Input
            type="text"
            name="fullName"
            placeholder="AD SOYAD"
            value={formData.fullName}
            onChange={handleChange}
            required
            icon={User}
            className="bg-black/20 border-white/5 py-4 text-xs font-bold tracking-widest uppercase placeholder:text-gray-700"
          />

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

          <Input
            type="password"
            name="confirmPassword"
            placeholder="ANAHTARI DOĞRULA"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            icon={Shield}
            className="bg-black/20 border-white/5 py-4 text-xs font-bold tracking-widest uppercase placeholder:text-gray-700"
          />
        </div>

        <Button
          type="submit"
          className="w-full py-6 group relative overflow-hidden text-sm uppercase tracking-[0.2em]"
          loading={loading}
          disabled={loading}
          icon={UserPlus}
        >
          <span>{loading ? 'KAYDEDİLİYOR...' : 'PROTOKOLÜ BAŞLAT'}</span>
        </Button>
      </form>

      {/* Footer Actions */}
      <div className="pt-6 border-t border-white/5">
        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest">
          <span className="text-gray-600">Zaten hesabınız var mı?</span>
          <Link
            to="/portal/login"
            className="flex items-center text-[var(--color-neon)] hover:brightness-125 transition-all group"
          >
            <ArrowLeft className="w-3 h-3 mr-2 group-hover:-translate-x-1 transition-transform" />
            Giriş Yap
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default Register
