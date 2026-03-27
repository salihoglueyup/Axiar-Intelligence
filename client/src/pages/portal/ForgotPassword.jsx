import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, ArrowLeft, Send, CheckCircle2 } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  
  const { resetPassword } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await resetPassword(email)
      setSubmitted(true)
    } catch (error) {
      // Error handled in context
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8 text-center"
      >
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-[var(--color-neon)]/10 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-[var(--color-neon)]" />
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-white uppercase tracking-tighter">İSTEK <span className="text-[var(--color-neon)]">GÖNDERİLDİ</span></h2>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest leading-relaxed">
            Şifre sıfırlama talimatları <br /> <span className="text-white">{email}</span> <br /> adresine iletildi.
          </p>
        </div>
        <Link to="/portal/login" className="block">
          <Button className="w-full py-6 text-sm uppercase tracking-[0.2em]" icon={ArrowLeft}>
            GİRİŞE DÖN
          </Button>
        </Link>
      </motion.div>
    )
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
          ANAHTAR <span className="text-[var(--color-neon)]">KURTARMA</span>
        </h2>
        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
          Sistem erişim anahtarınızı sıfırlayın
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-4">
          <Input
            type="email"
            name="email"
            placeholder="KAYITLI E-POSTA ADRESİ"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            icon={Mail}
            className="bg-black/20 border-white/5 py-4 text-xs font-bold tracking-widest uppercase placeholder:text-gray-700"
          />
        </div>

        <Button
          type="submit"
          className="w-full py-6 group relative overflow-hidden text-sm uppercase tracking-[0.2em]"
          loading={loading}
          disabled={loading}
          icon={Send}
        >
          <span>{loading ? 'GÖNDERİLİYOR...' : 'SIFIRLAMA BAĞLANTISI GÖNDER'}</span>
        </Button>
      </form>

      {/* Footer Actions */}
      <div className="pt-6 border-t border-white/5">
        <div className="flex items-center justify-center text-[10px] font-bold uppercase tracking-widest">
          <Link
            to="/portal/login"
            className="flex items-center text-gray-600 hover:text-[var(--color-neon)] transition-all group"
          >
            <ArrowLeft className="w-3 h-3 mr-2 group-hover:-translate-x-1 transition-transform" />
            Giriş Paneline Dön
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default ForgotPassword
