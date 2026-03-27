import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Shield, Mail, Phone, MapPin, Github, Twitter, 
  Linkedin, Youtube, ArrowRight, Zap, Globe, 
  CheckCircle, Cpu, BarChart3, Settings
} from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: 'Çözümler',
      links: [
        { name: 'AI Platform', href: '/ai', icon: Cpu },
        { name: 'Analitik', href: '/analytics', icon: BarChart3 },
        { name: 'Enterprise', href: '/enterprise', icon: Shield },
        { name: 'Entegrasyonlar', href: '/integrations', icon: Settings },
        { name: 'Küresel Ağ', href: '/global', icon: Globe }
      ]
    },
    {
      title: 'Şirket',
      links: [
        { name: 'Hakkımızda', href: '#about' },
        { name: 'Kariyer', href: '#careers' },
        { name: 'Marka Kiti', href: '#brand' },
        { name: 'Haberler', href: '#news' },
        { name: 'İletişim', href: '#contact' }
      ]
    },
    {
      title: 'Kaynaklar',
      links: [
        { name: 'Dokümantasyon', href: '#docs' },
        { name: 'API Referansı', href: '#api' },
        { name: 'Sistem Durumu', href: '#status' },
        { name: 'Güvenlik Raporu', href: '#security' },
        { name: 'Topluluk', href: '#community' }
      ]
    },
    {
      title: 'Yasal',
      links: [
        { name: 'Gizlilik', href: '#privacy' },
        { name: 'Koşullar', href: '#terms' },
        { name: 'KVKK', href: '#kvkk' },
        { name: 'Çerezler', href: '#cookies' }
      ]
    }
  ]

  const socials = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Youtube, href: '#', label: 'YouTube' }
  ]

  return (
    <footer className="relative bg-gray-900 pt-20 pb-10 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="relative z-10 glass border border-white/10 rounded-3xl p-8 md:p-12 mb-20 overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <Zap className="w-32 h-32 text-cyan-400 rotate-12" />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-white mb-4">
                Gelecekten <span className="gradient-text">Haberdar Olun</span>
              </h3>
              <p className="text-gray-400 text-lg max-w-md">
                En yeni AI güvenlik güncellemelerini ve kurumsal çözümlerimizi kaçırmayın.
              </p>
            </div>
            
            <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
              <div className="flex-1">
                <Input 
                  type="email" 
                  placeholder="E-posta adresiniz" 
                  className="w-full bg-gray-800/50 border-white/10 focus:border-cyan-500/50"
                />
              </div>
              <Button className="px-8 shadow-lg shadow-cyan-500/20 whitespace-nowrap">
                Abone Ol
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-6 group">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white tracking-tight">Axiar</span>
                <span className="text-[10px] text-cyan-400 font-medium uppercase tracking-[0.2em]">Intelligence</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Modern AI altyapısıyla verinizi koruyun ve sisteminizi optimize edin. Küresel ölçekte güvenli teknoloji.
            </p>
            <div className="flex space-x-3">
              {socials.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ y: -3, scale: 1.1 }}
                  className="w-10 h-10 rounded-lg bg-gray-800 border border-white/5 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-white font-bold mb-6 tracking-wider uppercase text-xs">{section.title}</h4>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-cyan-400 text-sm transition-colors flex items-center group"
                    >
                      {link.icon && <link.icon className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 -ml-6 transition-all" />}
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-6">
            <p className="text-gray-500 text-sm">
              &copy; {currentYear} Axiar Intelligence Platform.
            </p>
            <div className="hidden sm:flex items-center px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest">Sistem Online</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-8 text-sm text-gray-500">
            <Link to="/global" className="hover:text-cyan-400 transition-colors flex items-center">
              <Globe className="w-4 h-4 mr-2" />
              Türkiye (TR)
            </Link>
            <p className="flex items-center">
              Crafted with <Zap className="w-3 h-3 mx-1 text-cyan-400" /> by Axiar Team
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
