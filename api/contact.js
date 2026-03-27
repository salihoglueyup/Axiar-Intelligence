import { withCors, withRateLimit, withValidation, withMiddleware } from './_lib/middleware'
import { z } from 'zod'
import { ContactService } from './_services/contact.service'

// 1. Validation Schema
const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  subject: z.string().min(3).max(200),
  message: z.string().min(10).max(2000)
})

// 2. Route Handler
const postContactHandler = async (req, res) => {
  // Method Check (POST ONLY)
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  const contact = await ContactService.saveMessage(req.validatedData)
  return res.status(201).json({
    success: true,
    message: 'Contact message received successfully',
    data: contact
  })
}

// 3. Export with Middleware Chain
export default withMiddleware(
  postContactHandler,
  withCors,
  withValidation(contactSchema),
  (handler) => withRateLimit(handler, { max: 5, windowMs: 60000 }) // max 5 messages per minute
)
