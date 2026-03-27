import React from 'react'
import { motion } from 'framer-motion'
import { 
  FileCheck, 
  Download, 
  Eye, 
  Calendar,
  MoreHorizontal,
  Edit,
  Trash2,
  CreditCard,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

const InvoiceCard = ({ invoice, onView, onEdit, onDelete, onPay }) => {
  const statusColors = {
    draft: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    sent: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    paid: 'bg-green-500/20 text-green-400 border-green-500/30',
    overdue: 'bg-red-500/20 text-red-400 border-red-500/30',
    cancelled: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
  }

  const statusLabels = {
    draft: 'Taslak',
    sent: 'Gönderildi',
    paid: 'Ödendi',
    overdue: 'Gecikmiş',
    cancelled: 'İptal Edildi'
  }

  const statusIcons = {
    draft: Clock,
    sent: FileCheck,
    paid: CheckCircle,
    overdue: AlertCircle,
    cancelled: AlertCircle
  }

  const Icon = statusIcons[invoice.status]

  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: currency
    }).format(amount)
  }

  const isOverdue = invoice.status === 'sent' && new Date(invoice.due_date) < new Date()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card glass neon className="h-full">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center space-x-2 ${
                  isOverdue ? 'bg-red-500/20 text-red-400 border-red-500/30' : statusColors[invoice.status]
                }`}>
                  <Icon className="w-3 h-3" />
                  {isOverdue ? 'Gecikmiş' : statusLabels[invoice.status]}
                </span>
                
                <span className="text-xs text-gray-400 font-mono">
                  {invoice.invoice_no}
                </span>
              </div>
              
              {invoice.project_name && (
                <div className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                  <span>Proje:</span>
                  <span className="text-cyan-400">{invoice.project_name}</span>
                </div>
              )}
            </div>
            
            {/* Actions Dropdown */}
            <div className="relative group">
              <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
              
              <div className="absolute right-0 top-8 w-48 glass border border-white/10 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                <div className="py-2">
                  <button
                    onClick={() => onView(invoice)}
                    className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors flex items-center space-x-2"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Görüntüle</span>
                  </button>
                  <button
                    onClick={() => onEdit(invoice)}
                    className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors flex items-center space-x-2"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Düzenle</span>
                  </button>
                  {invoice.status === 'sent' && (
                    <button
                      onClick={() => onPay(invoice)}
                      className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors flex items-center space-x-2"
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Öde</span>
                    </button>
                  )}
                  <button
                    onClick={() => window.open(`/api/invoices/${invoice.id}/download`, '_blank')}
                    className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors flex items-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>İndir</span>
                  </button>
                  <button
                    onClick={() => onDelete(invoice)}
                    className="w-full px-4 py-2 text-left text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors flex items-center space-x-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Sil</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Amount */}
          <div className="text-center py-4 bg-gray-800/50 rounded-lg">
            <div className="text-3xl font-bold gradient-text">
              {formatCurrency(invoice.amount, invoice.currency)}
            </div>
            <div className="text-sm text-gray-400">
              {invoice.currency}
            </div>
          </div>

          {/* Dates */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm text-gray-400">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>Kesim Tarihi:</span>
              </div>
              <span>{new Date(invoice.issue_date).toLocaleDateString('tr-TR')}</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>Son Ödeme:</span>
              </div>
              <span className={
                isOverdue ? 'text-red-400 font-medium' : 
                invoice.status === 'paid' ? 'text-green-400' : 
                'text-gray-400'
              }>
                {new Date(invoice.due_date).toLocaleDateString('tr-TR')}
              </span>
            </div>

            {invoice.paid_date && (
              <div className="flex items-center justify-between text-sm text-green-400">
                <span>Ödeme Tarihi:</span>
                <span>{new Date(invoice.paid_date).toLocaleDateString('tr-TR')}</span>
              </div>
            )}
          </div>

          {/* Client Info */}
          {invoice.client_name && (
            <div className="p-3 bg-gray-800/50 rounded-lg">
              <div className="text-sm text-gray-400 mb-1">Müşteri</div>
              <div className="text-white font-medium">{invoice.client_name}</div>
              {invoice.client_company && (
                <div className="text-sm text-gray-400">{invoice.client_company}</div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex space-x-2 pt-4 border-t border-gray-700">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onView(invoice)}
              className="flex-1"
            >
              <Eye className="w-4 h-4 mr-2" />
              Görüntüle
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.open(`/api/invoices/${invoice.id}/download`, '_blank')}
            >
              <Download className="w-4 h-4" />
            </Button>
            
            {invoice.status === 'sent' && (
              <Button
                size="sm"
                onClick={() => onPay(invoice)}
                className="flex-1"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Öde
              </Button>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

export default InvoiceCard
