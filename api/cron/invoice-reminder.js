import { withMiddleware } from '../_lib/middleware'
import { InvoiceService } from '../_services/invoice.service'
import { UnauthorizedError } from '../_lib/errors'

// 1. Cron Handler
const invoiceReminderCronHandler = async (req, res) => {
  // Method Check (POST ONLY)
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  // Security Check: CRON_SECRET
  // In a real app, you would check a secret key passed in headers
  const cronSecret = req.headers['x-cron-secret']
  if (process.env.CRON_SECRET && cronSecret !== process.env.CRON_SECRET) {
    throw new UnauthorizedError('Unauthorized cron request')
  }

  console.log('[CRON] Starting invoice reminders...')
  const results = await InvoiceService.processReminders()
  
  return res.status(200).json({
    success: true,
    message: 'Invoice reminders processed',
    data: results
  })
}

// 2. Export with Middleware
export default withMiddleware(invoiceReminderCronHandler)
// Note: We don't use withAuth here because it's a server-to-server cron job
