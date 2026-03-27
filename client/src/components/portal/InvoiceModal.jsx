import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Save, Plus, Trash2, Calculator } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Input'
import Card from '@/components/ui/Card'

const InvoiceModal = ({ isOpen, onClose, invoice, onSave, onDelete }) => {
  const [formData, setFormData] = useState({
    client_id: '',
    project_id: '',
    amount: '',
    currency: 'TRY',
    due_date: '',
    issue_date: '',
    notes: ''
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (invoice) {
      setFormData({
        client_id: invoice.client_id || '',
        project_id: invoice.project_id || '',
        amount: invoice.amount || '',
        currency: invoice.currency || 'TRY',
        due_date: invoice.due_date?.split('T')[0] || '',
        issue_date: invoice.issue_date?.split('T')[0] || '',
        notes: invoice.notes || ''
      })
    } else {
      setFormData({
        client_id: '',
        project_id: '',
        amount: '',
        currency: 'TRY',
        due_date: '',
        issue_date: new Date().toISOString().split('T')[0],
        notes: ''
      })
    }
  }, [invoice, isOpen])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await onSave(formData)
      onClose()
    } catch (error) {
      console.error('Invoice save error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (window.confirm('Bu faturayı silmek istediğinizden emin misiniz?')) {
      setLoading(true)
      try {
        await onDelete(invoice.id)
        onClose()
      } catch (error) {
        console.error('Invoice delete error:', error)
      } finally {
        setLoading(false)
      }
    }
  }

  const calculateTotal = () => {
    const amount = parseFloat(formData.amount) || 0
    const currency = formData.currency
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: currency
    }).format(amount)
  }

  const modalVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }

  const contentVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { scale: 1, opacity: 1 }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Card glass neon>
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">
                    {invoice ? 'Fatura Düzenle' : 'Yeni Fatura'}
                  </h2>
                  <Button variant="ghost" size="icon" onClick={onClose}>
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      name="client_id"
                      label="Müşteri ID"
                      placeholder="Müşteri ID'sini girin"
                      value={formData.client_id}
                      onChange={handleChange}
                      required
                    />

                    <Input
                      name="project_id"
                      label="Proje ID (Opsiyonel)"
                      placeholder="Proje ID'sini girin"
                      value={formData.project_id}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                      name="amount"
                      type="number"
                      step="0.01"
                      min="0"
                      label="Tutar"
                      placeholder="0.00"
                      value={formData.amount}
                      onChange={handleChange}
                      required
                    />

                    <div>
                      <label className="text-sm font-medium text-gray-300 block mb-2">
                        Para Birimi
                      </label>
                      <select
                        name="currency"
                        value={formData.currency}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-900/50 border border-gray-800 rounded-lg text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-200"
                      >
                        <option value="TRY">TRY - Türk Lirası</option>
                        <option value="USD">USD - Dolar</option>
                        <option value="EUR">EUR - Euro</option>
                      </select>
                    </div>

                    <Input
                      name="due_date"
                      type="date"
                      label="Son Ödeme Tarihi"
                      value={formData.due_date}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      name="issue_date"
                      type="date"
                      label="Kesim Tarihi"
                      value={formData.issue_date}
                      onChange={handleChange}
                      required
                    />

                    <div className="flex items-end">
                      <div className="w-full p-3 bg-gray-800/50 rounded-lg border border-gray-800">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-400">Toplam:</span>
                          <span className="text-xl font-bold gradient-text">
                            {calculateTotal()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Textarea
                    name="notes"
                    label="Notlar (Opsiyonel)"
                    placeholder="Fatura notlarını girin..."
                    value={formData.notes}
                    onChange={handleChange}
                    rows={3}
                  />

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                    <div className="flex space-x-3">
                      <Button
                        type="submit"
                        loading={loading}
                        disabled={loading}
                      >
                        <Save className="w-4 h-4 mr-2" />
                        {loading ? 'Kaydediliyor...' : 'Kaydet'}
                      </Button>
                      
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={onClose}
                      >
                        İptal
                      </Button>
                    </div>

                    {invoice && (
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={handleDelete}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Sil
                      </Button>
                    )}
                  </div>
                </form>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default InvoiceModal
