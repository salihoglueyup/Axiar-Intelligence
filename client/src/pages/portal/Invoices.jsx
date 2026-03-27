import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  Filter, 
  Plus, 
  Download,
  FileCheck,
  CreditCard,
  Calendar,
  TrendingUp,
  AlertTriangle
} from 'lucide-react'
import InvoiceCard from '@/components/portal/InvoiceCard'
import InvoiceModal from '@/components/portal/InvoiceModal'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Card from '@/components/ui/Card'

const Invoices = () => {
  const [invoices, setInvoices] = useState([])
  const [filteredInvoices, setFilteredInvoices] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortBy, setSortBy] = useState('created_at')
  const [loading, setLoading] = useState(false)

  // Mock data - real implementation would use Supabase
  const mockInvoices = [
    {
      id: '1',
      invoice_no: 'AXR-2024-001',
      client_id: 'client-1',
      client_name: 'Ahmet Yılmaz',
      client_company: 'TechCorp',
      project_id: '1',
      project_name: 'CyberGuard AI',
      amount: 150000,
      currency: 'TRY',
      status: 'sent',
      issue_date: '2024-03-01',
      due_date: '2024-03-15',
      notes: 'Ocak ayı hizmet bedeli'
    },
    {
      id: '2',
      invoice_no: 'AXR-2024-002',
      client_id: 'client-2',
      client_name: 'Mehmet Kaya',
      client_company: 'FinanceHub',
      project_id: '2',
      project_name: 'Metazon Capital OS',
      amount: 250000,
      currency: 'TRY',
      status: 'paid',
      issue_date: '2024-02-15',
      due_date: '2024-03-01',
      paid_date: '2024-02-28',
      notes: 'Şubat ayı hizmet bedeli - erken ödeme indirimi uygulandı'
    },
    {
      id: '3',
      invoice_no: 'AXR-2024-003',
      client_id: 'client-3',
      client_name: 'Ayşe Demir',
      client_company: 'ShopMax',
      project_id: '3',
      project_name: 'E-Commerce Platform',
      amount: 75000,
      currency: 'USD',
      status: 'overdue',
      issue_date: '2024-01-10',
      due_date: '2024-02-10',
      notes: 'Ocak ayı hizmet bedeli'
    },
    {
      id: '4',
      invoice_no: 'AXR-2024-004',
      client_id: 'client-4',
      client_name: 'Fatma Öztürk',
      client_company: 'BankTech',
      project_id: '4',
      project_name: 'Mobile Banking App',
      amount: 180000,
      currency: 'TRY',
      status: 'draft',
      issue_date: '2024-03-20',
      due_date: '2024-04-20',
      notes: 'Mart ayı hizmet bedeli - onay bekliyor'
    },
    {
      id: '5',
      invoice_no: 'AXR-2024-005',
      client_id: 'client-1',
      client_name: 'Ahmet Yılmaz',
      client_company: 'TechCorp',
      project_id: null,
      project_name: 'Genel Hizmetler',
      amount: 50000,
      currency: 'TRY',
      status: 'cancelled',
      issue_date: '2024-02-20',
      due_date: '2024-03-20',
      notes: 'İptal edilen fatura'
    }
  ]

  useEffect(() => {
    setInvoices(mockInvoices)
    setFilteredInvoices(mockInvoices)
  }, [])

  useEffect(() => {
    let filtered = [...invoices]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(invoice =>
        invoice.invoice_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.client_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.client_company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.project_name?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(invoice => invoice.status === statusFilter)
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'invoice_no':
          return a.invoice_no.localeCompare(b.invoice_no)
        case 'amount':
          return b.amount - a.amount
        case 'due_date':
          return new Date(a.due_date) - new Date(b.due_date)
        default:
          return new Date(b.created_at) - new Date(a.created_at)
      }
    })

    setFilteredInvoices(filtered)
  }, [invoices, searchTerm, statusFilter, sortBy])

  const handleCreateInvoice = () => {
    setSelectedInvoice(null)
    setIsModalOpen(true)
  }

  const handleEditInvoice = (invoice) => {
    setSelectedInvoice(invoice)
    setIsModalOpen(true)
  }

  const handleSaveInvoice = async (invoiceData) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      if (selectedInvoice) {
        // Update existing invoice
        setInvoices(prev => prev.map(i => 
          i.id === selectedInvoice.id 
            ? { ...i, ...invoiceData, updated_at: new Date().toISOString() }
            : i
        ))
      } else {
        // Create new invoice
        const newInvoice = {
          id: Date.now().toString(),
          invoice_no: `AXR-2024-${String(invoices.length + 1).padStart(3, '0')}`,
          ...invoiceData,
          created_at: new Date().toISOString(),
          client_name: 'New Client',
          client_company: 'New Company'
        }
        setInvoices(prev => [newInvoice, ...prev])
      }
    } catch (error) {
      console.error('Save invoice error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteInvoice = async (invoiceId) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setInvoices(prev => prev.filter(i => i.id !== invoiceId))
    } catch (error) {
      console.error('Delete invoice error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePayInvoice = (invoice) => {
    // TODO: Implement payment modal
    console.log('Pay invoice:', invoice)
    alert(`Ödeme sayfasına yönlendiriliyorsunuz: ${invoice.invoice_no}`)
  }

  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: currency
    }).format(amount)
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Faturalar</h1>
          <p className="text-gray-400">
            Toplam {filteredInvoices.length} fatura bulundu
          </p>
        </div>

        <Button onClick={handleCreateInvoice}>
          <Plus className="w-4 h-4 mr-2" />
          Yeni Fatura
        </Button>
      </div>

      {/* Filters and Search */}
      <Card glass>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Fatura ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-gray-900/50 border border-gray-800 rounded-lg text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-200"
          >
            <option value="all">Tüm Durumlar</option>
            <option value="draft">Taslak</option>
            <option value="sent">Gönderildi</option>
            <option value="paid">Ödendi</option>
            <option value="overdue">Gecikmiş</option>
            <option value="cancelled">İptal Edildi</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-gray-900/50 border border-gray-800 rounded-lg text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-200"
          >
            <option value="created_at">Oluşturulma Tarihi</option>
            <option value="invoice_no">Fatura No</option>
            <option value="amount">Tutar</option>
            <option value="due_date">Son Ödeme</option>
          </select>

          <div className="flex items-center space-x-2 text-gray-400">
            <Filter className="w-4 h-4" />
            <span className="text-sm">Filtreler</span>
          </div>
        </div>
      </Card>

      {/* Invoices Grid */}
      {filteredInvoices.length > 0 ? (
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredInvoices.map((invoice) => (
            <motion.div
              key={invoice.id}
              variants={itemVariants}
            >
              <InvoiceCard
                invoice={invoice}
                onEdit={handleEditInvoice}
                onDelete={handleDeleteInvoice}
                onView={(invoice) => console.log('View invoice:', invoice)}
                onPay={handlePayInvoice}
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <Card glass>
          <div className="text-center py-12">
            <FileCheck className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">
              Fatura Bulunamadı
            </h3>
            <p className="text-gray-400 mb-6">
              {searchTerm || statusFilter !== 'all' 
                ? 'Arama kriterlerinize uygun fatura bulunamadı.'
                : 'Henüz fatura oluşturulmamış.'
              }
            </p>
            {!searchTerm && statusFilter === 'all' && (
              <Button onClick={handleCreateInvoice}>
                <Plus className="w-4 h-4 mr-2" />
                İlk Fatura Oluştur
              </Button>
            )}
          </div>
        </Card>
      )}

      {/* Statistics */}
      <Card glass>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-3">
              <FileCheck className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold gradient-text mb-1">
              {invoices.filter(i => i.status === 'paid').length}
            </div>
            <div className="text-sm text-gray-400">Ödenen Fatura</div>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-3">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold gradient-text mb-1">
              {invoices.filter(i => i.status === 'sent').length}
            </div>
            <div className="text-sm text-gray-400">Bekleyen Fatura</div>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-3">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold gradient-text mb-1">
              {invoices.filter(i => i.status === 'overdue').length}
            </div>
            <div className="text-sm text-gray-400">Geciken Fatura</div>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold gradient-text mb-1">
              {formatCurrency(
                invoices
                  .filter(i => i.status !== 'cancelled' && i.status !== 'draft')
                  .reduce((total, i) => {
                    // Convert to TRY for total calculation
                    const amount = i.currency === 'USD' ? i.amount * 32 : i.amount
                    return total + amount
                  }, 0),
                'TRY'
              )}
            </div>
            <div className="text-sm text-gray-400">Toplam Tutar (TRY)</div>
          </div>
        </div>
      </Card>

      {/* Invoice Modal */}
      <InvoiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        invoice={selectedInvoice}
        onSave={handleSaveInvoice}
        onDelete={handleDeleteInvoice}
      />
    </motion.div>
  )
}

export default Invoices
