import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  Mail, 
  Phone, 
  Building, 
  Shield, 
  Key, 
  Bell,
  Save,
  Camera,
  Trash2,
  Eye,
  EyeOff
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Input'
import Card from '@/components/ui/Card'

const Settings = () => {
  const { profile, updateProfile, user } = useAuth()
  const [activeTab, setActiveTab] = useState('profile')
  const [formData, setFormData] = useState({
    full_name: '',
    company: '',
    phone: '',
    avatar_url: '',
    bio: ''
  })
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [passwordData, setPasswordData] = useState({
    current_password: '',
    new_password: '',
    confirm_password: ''
  })
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState('')

  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        company: profile.company || '',
        phone: profile.phone || '',
        avatar_url: profile.avatar_url || '',
        bio: profile.bio || ''
      })
      setAvatarPreview(profile.avatar_url || '')
    }
  }, [profile])

  const tabs = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'security', label: 'Güvenlik', icon: Shield },
    { id: 'notifications', label: 'Bildirimler', icon: Bell }
  ]

  const handleProfileSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await updateProfile(formData)
    } catch (error) {
      console.error('Profile update error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()

    if (passwordData.new_password !== passwordData.confirm_password) {
      alert('Yeni şifreler eşleşmiyor!')
      return
    }

    if (passwordData.new_password.length < 8) {
      alert('Şifre en az 8 karakter olmalı!')
      return
    }

    setLoading(true)
    try {
      // TODO: Implement password change API
      console.log('Password change:', passwordData)
      alert('Şifre başarıyla güncellendi!')
      setPasswordData({
        current_password: '',
        new_password: '',
        confirm_password: ''
      })
      setShowPasswordForm(false)
    } catch (error) {
      console.error('Password change error:', error)
      alert('Şifre güncellenemedi!')
    } finally {
      setLoading(false)
    }
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result)
        setFormData(prev => ({ ...prev, avatar_url: reader.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAvatarRemove = () => {
    setAvatarPreview('')
    setFormData(prev => ({ ...prev, avatar_url: '' }))
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Ayarlar</h1>
        <p className="text-gray-400">
          Hesap ayarlarınızı ve tercihlerinizi yönetin
        </p>
      </div>

      {/* Tabs */}
      <Card glass>
        <div className="flex space-x-1 border-b border-gray-700">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-cyan-500 text-cyan-400'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </Card>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        variants={itemVariants}
        className="mt-6"
      >
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <Card glass>
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white mb-6">Profil Bilgileri</h2>
              
              {/* Avatar */}
              <div className="flex items-center space-x-6">
                <div className="relative">
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="Avatar"
                      className="w-24 h-24 rounded-full object-cover border-2 border-cyan-500"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                      <User className="w-12 h-12 text-white" />
                    </div>
                  )}
                  
                  <div className="absolute bottom-0 right-0 flex space-x-1">
                    <label className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-cyan-600 transition-colors">
                      <Camera className="w-4 h-4 text-white" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="hidden"
                      />
                    </label>
                    
                    {avatarPreview && (
                      <button
                        onClick={handleAvatarRemove}
                        className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-white" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex-1">
                  <div className="text-sm text-gray-400 mb-1">E-posta</div>
                  <div className="text-white font-medium">{user?.email}</div>
                  <div className="text-xs text-gray-500">E-posta adresi değiştirilemez</div>
                </div>
              </div>

              {/* Profile Form */}
              <form onSubmit={handleProfileSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    name="full_name"
                    label="Ad Soyad"
                    placeholder="Adınızı ve soyadınızı girin"
                    value={formData.full_name}
                    onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                    required
                    icon={User}
                  />

                  <Input
                    name="company"
                    label="Şirket"
                    placeholder="Şirket adı"
                    value={formData.company}
                    onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                    icon={Building}
                  />
                </div>

                <Input
                  name="phone"
                  label="Telefon"
                  placeholder="+90 555 0123"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  icon={Phone}
                />

                <div>
                  <label className="text-sm font-medium text-gray-300 block mb-2">
                    Hakkında
                  </label>
                  <Textarea
                    name="bio"
                    placeholder="Kendinizden kısaca bahsedin..."
                    value={formData.bio}
                    onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                    rows={4}
                  />
                </div>

                <Button
                  type="submit"
                  loading={loading}
                  disabled={loading}
                  className="w-full"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {loading ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
                </Button>
              </form>
            </div>
          </Card>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <Card glass>
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white mb-6">Güvenlik Ayarları</h2>
              
              {/* Password Change */}
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-white font-medium">Şifre Değiştir</h3>
                    <p className="text-sm text-gray-400">Hesabınızın güvenliği için şifrenizi düzenli olarak değiştirin</p>
                  </div>
                  
                  <Button
                    variant="secondary"
                    onClick={() => setShowPasswordForm(!showPasswordForm)}
                  >
                    <Key className="w-4 h-4 mr-2" />
                    {showPasswordForm ? 'İptal' : 'Şifre Değiştir'}
                  </Button>
                </div>

                {showPasswordForm && (
                  <form onSubmit={handlePasswordSubmit} className="space-y-4 mt-4">
                    <div>
                      <label className="text-sm font-medium text-gray-300 block mb-2">
                        Mevcut Şifre
                      </label>
                      <div className="relative">
                        <Input
                          type={showCurrentPassword ? 'text' : 'password'}
                          name="current_password"
                          placeholder="Mevcut şifreniz"
                          value={passwordData.current_password}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, current_password: e.target.value }))}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                        >
                          {showCurrentPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-300 block mb-2">
                        Yeni Şifre
                      </label>
                      <div className="relative">
                        <Input
                          type={showNewPassword ? 'text' : 'password'}
                          name="new_password"
                          placeholder="Yeni şifreniz"
                          value={passwordData.new_password}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, new_password: e.target.value }))}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                        >
                          {showNewPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-300 block mb-2">
                        Yeni Şifre Tekrar
                      </label>
                      <div className="relative">
                        <Input
                          type={showConfirmPassword ? 'text' : 'password'}
                          name="confirm_password"
                          placeholder="Yeni şifrenizi tekrar girin"
                          value={passwordData.confirm_password}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, confirm_password: e.target.value }))}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="text-xs text-gray-400 mt-2">
                      Şifre en az 8 karakter olmalıdır
                    </div>

                    <Button
                      type="submit"
                      loading={loading}
                      disabled={loading}
                      className="w-full"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {loading ? 'Güncelleniyor...' : 'Şifreyi Güncelle'}
                    </Button>
                  </form>
                )}
              </div>

              {/* Two-Factor Authentication */}
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">İki Faktörlü Kimlik Doğrulama</h3>
                    <p className="text-sm text-gray-400">Hesabınız için ek güvenlik katmanı ekleyin</p>
                  </div>
                  
                  <Button variant="secondary" disabled>
                    <Shield className="w-4 h-4 mr-2" />
                    Yakında
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <Card glass>
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white mb-6">Bildirim Ayarları</h2>
              
              {/* Email Notifications */}
              <div className="space-y-4">
                <h3 className="text-white font-medium">E-posta Bildirimleri</h3>
                
                <div className="space-y-3">
                  {[
                    { id: 'projects', label: 'Proje güncellemeleri', description: 'Proje durumları değiştiğinde bildirim al' },
                    { id: 'invoices', label: 'Fatura hatırlatmaları', description: 'Fatura ödeme tarihi yaklaştığında bildirim al' },
                    { id: 'reports', label: 'Rapor yüklemeleri', description: 'Yeni rapor yüklendiğinde bildirim al' },
                    { id: 'security', label: 'Güvenlik uyarıları', description: 'Hesap güvenliği ile ilgili önemli bildirimler' }
                  ].map((notification) => (
                    <div key={notification.id} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <div>
                        <div className="text-white font-medium">{notification.label}</div>
                        <div className="text-sm text-gray-400">{notification.description}</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only" />
                        <div className="w-11 h-6 bg-gray-600 rounded-full transition-colors"></div>
                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Push Notifications */}
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">Push Bildirimleri</h3>
                    <p className="text-sm text-gray-400">Tarayıcı bildirimlerini etkinleştirin</p>
                  </div>
                  
                  <Button variant="secondary" disabled>
                    <Bell className="w-4 h-4 mr-2" />
                    Yakında
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}
      </motion.div>
    </motion.div>
  )
}

export default Settings
