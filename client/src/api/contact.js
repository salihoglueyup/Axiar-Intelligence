// Contact API endpoint
import { z } from 'zod'

// Form validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'İsim en az 2 karakter olmalı').max(50, 'İsim 50 karakterden fazla olamaz'),
  email: z.string().email('Geçerli bir e-posta adresi gerekli'),
  subject: z.string().min(5, 'Konu en az 5 karakter olmalı').max(100, 'Konu 100 karakterden fazla olamaz'),
  message: z.string().min(10, 'Mesaj en az 10 karakter olmalı').max(1000, 'Mesaj 1000 karakterden fazla olamaz')
})

// Mock database for demo purposes
const submissions = []
let submissionId = 1

export const POST = async (req, res) => {
  try {
    // Validate request body
    const validatedData = contactSchema.parse(req.body)
    
    // Create submission record
    const submission = {
      id: submissionId++,
      ...validatedData,
      timestamp: new Date().toISOString(),
      ip: req.ip || 'unknown',
      userAgent: req.get('User-Agent') || 'unknown'
    }
    
    submissions.push(submission)
    
    // Log submission
    console.log('Contact form submission:', submission)
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Success response
    res.status(200).json({
      success: true,
      message: 'Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.',
      submissionId: submission.id
    })
    
  } catch (error) {
    console.error('Contact form error:', error)
    
    // Error response
    if (error.errors) {
      // Validation errors
      res.status(400).json({
        success: false,
        message: 'Form validation hatası',
        errors: error.errors
      })
    } else {
      // Server error
      res.status(500).json({
        success: false,
        message: 'Sunucu hatası. Lütfen daha sonra tekrar deneyin.'
      })
    }
  }
}

export const GET = async (req, res) => {
  try {
    // Return recent submissions for admin (mock functionality)
    res.status(200).json({
      submissions: submissions.slice(-10), // Last 10 submissions
      total: submissions.length
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Veriler alınamadı'
    })
  }
}
