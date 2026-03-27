import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input, { Textarea } from '@/components/ui/Input'
import Card from '@/components/ui/Card'
import api from '@/services/api'
import { contactSchema, validate } from '@/utils/schemas'
import { toast } from 'react-toastify'

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [formErrors, setFormErrors] = useState({})

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
    // Clear error when user starts typing
    if (formErrors[e.target.name]) {
      setFormErrors(prev => ({ ...prev, [e.target.name]: null }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // 1. Zod ile Frontend Validasyonu
    const { data: validData, error: validationError } = validate(contactSchema, formData)
    
    if (validationError) {
      // Hataları formErrors state'ine basıyoruz
      const formattedErrors = {}
      Object.keys(validationError).forEach(key => {
        if (key !== '_errors' && validationError[key]?._errors) {
          formattedErrors[key] = validationError[key]._errors[0]
        }
      })
      setFormErrors(formattedErrors)
      toast.warning('Lütfen formdaki hataları düzeltin.')
      return
    }

    setLoading(true)

    try {
      // 2. Merkezi API İstemcisi ile İstek
      // Başarı veya Hata bildirimini api.js interceptor'ı otomatik halledecek!
      await api.post('/contact', validData)
      
      // Formu temizle
      setFormData({ name: '', email: '', subject: '', message: '' })
      
      // Track successful submission
      if (window.gtag) {
        window.gtag('event', 'form_submission', { form_name: 'contact' })
      }
    } catch (error) {
      console.error('Contact Form submission failed', error)
    } finally {
      setLoading(false)
    }
  }

  const contactInfo = [
    { icon: Mail, label: 'E-posta', value: 'info@axiar.io', href: 'mailto:info@axiar.io' },
    { icon: Phone, label: 'Telefon', value: '+90 212 555 0123', href: 'tel:+902125550123' },
    { icon: MapPin, label: 'Adres', value: 'İstanbul, Türkiye', href: '#' }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <section id="contact" className="py-20 bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">İletişime</span>
            <span className="gradient-text block">Geçin</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-xl text-gray-300 max-w-3xl mx-auto">
            Projeleriniz hakkında konuşmak veya sorularınızı cevaplamak için buradayız.
          </motion.p>
        </motion.div>

        {/* Content */}
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <Card glass neon>
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white mb-6">Mesaj Gönderin</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Input name="name" placeholder="Adınız Soyadınız" value={formData.name} onChange={handleChange} />
                      {formErrors.name && <p className="text-red-400 text-xs mt-1 ml-1">{formErrors.name}</p>}
                    </div>
                    <div>
                      <Input name="email" type="email" placeholder="E-posta Adresiniz" value={formData.email} onChange={handleChange} />
                      {formErrors.email && <p className="text-red-400 text-xs mt-1 ml-1">{formErrors.email}</p>}
                    </div>
                  </div>
                  <div>
                    <Input name="subject" placeholder="Konu" value={formData.subject} onChange={handleChange} />
                    {formErrors.subject && <p className="text-red-400 text-xs mt-1 ml-1">{formErrors.subject}</p>}
                  </div>
                  <div>
                    <Textarea name="message" rows={5} placeholder="Mesajınız..." value={formData.message} onChange={handleChange} />
                    {formErrors.message && <p className="text-red-400 text-xs mt-1 ml-1">{formErrors.message}</p>}
                  </div>
                  
                  <Button type="submit" className="w-full" loading={loading} disabled={loading}>
                    <Send className="w-4 h-4 mr-2" />
                    {loading ? 'Gönderiliyor...' : 'Mesaj Gönder'}
                  </Button>
                </form>
              </div>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-6">
            <Card glass>
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white mb-6">İletişim Bilgileri</h3>
                {contactInfo.map((info, index) => (
                  <a key={index} href={info.href} className="flex items-center space-x-4 p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors group">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <info.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">{info.label}</p>
                      <p className="text-white font-medium">{info.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </Card>

            <Card glass>
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white">Çalışma Saatleri</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-gray-400">Pazartesi - Cuma</span><span className="text-white">09:00 - 18:00</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Cumartesi</span><span className="text-white">10:00 - 16:00</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Pazar</span><span className="text-white">Kapalı</span></div>
                </div>
              </div>
            </Card>
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}

export default ContactSection
