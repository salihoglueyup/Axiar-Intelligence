import { supabaseAdmin } from '../_lib/supabase-admin'

export const InvoiceService = {
  /**
   * Process all overdue and upcoming invoice reminders
   */
  async processReminders() {
    const now = new Date().toISOString().split('T')[0]
    const results = { overdue: 0, upcoming: 0 }

    // 1. Handle Overdue Invoices
    const { data: overdueInvoices } = await supabaseAdmin
      .from('invoices')
      .select(`*, client:profiles(id, email)`)
      .eq('status', 'sent')
      .lt('due_date', now)
      .is('paid_date', null)

    for (const invoice of overdueInvoices || []) {
      await this.sendOverdueReminder(invoice)
      results.overdue++
    }

    // 2. Handle Upcoming Invoices (3 days before)
    const threeDaysFromNow = new Date()
    threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3)
    const targetDate = threeDaysFromNow.toISOString().split('T')[0]

    const { data: upcomingInvoices } = await supabaseAdmin
      .from('invoices')
      .select(`*, client:profiles(id, email)`)
      .eq('status', 'sent')
      .eq('due_date', targetDate)

    for (const invoice of upcomingInvoices || []) {
      await this.sendUpcomingReminder(invoice)
      results.upcoming++
    }

    return results
  },

  async sendOverdueReminder(invoice) {
    // Update Status
    await supabaseAdmin.from('invoices').update({ status: 'overdue' }).eq('id', invoice.id)
    
    // Notify
    await supabaseAdmin.from('notifications').insert({
      user_id: invoice.client_id,
      title: 'Fatura Hatırlatması',
      message: `"${invoice.invoice_no}" numaralı faturanızın ödeme tarihi geçmiştir.`,
      type: 'warning'
    })
  },

  async sendUpcomingReminder(invoice) {
    // Notify
    await supabaseAdmin.from('notifications').insert({
      user_id: invoice.client_id,
      title: 'Fatura Ödeme Hatırlatması',
      message: `"${invoice.invoice_no}" numaralı faturanız 3 gün içinde ödenecektir.`,
      type: 'info'
    })
  }
}
