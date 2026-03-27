import { z } from 'zod'

/**
 * Shared Validation Schemas
 * These match the backend schemas for consistency.
 */

export const organizationSchema = z.object({
  name: z.string().min(2, 'Organizasyon ismi en az 2 karakter olmalıdır').max(100),
  description: z.string().max(500, 'Açıklama 500 karakteri geçemez').optional(),
  industry: z.enum(['technology', 'healthcare', 'finance', 'education', 'retail', 'manufacturing', 'other']).optional(),
  size: z.enum(['1-10', '11-50', '51-200', '201-500', '500+']).optional()
})

export const contactSchema = z.object({
  name: z.string().min(2, 'İsim en az 2 karakter olmalıdır'),
  email: z.string().email('Geçerli bir e-posta adresi girin'),
  subject: z.string().min(3, 'Konu en az 3 karakter olmalıdır'),
  message: z.string().min(10, 'Mesaj en az 10 karakter olmalıdır')
})

export const aiModelSchema = z.object({
  name: z.string().min(1, 'Model ismi gereklidir'),
  type: z.enum(['classification', 'regression', 'clustering', 'nlp', 'computer_vision', 'custom']),
  version: z.string().min(1, 'Sürüm bilgisi gereklidir')
})

/**
 * Validation Helper
 * Returns { data, error } object
 */
export const validate = (schema, data) => {
  const result = schema.safeParse(data)
  if (!result.success) {
    // Format error message for easy display
    return { 
      data: null, 
      error: result.error.format() 
    }
  }
  return { data: result.data, error: null }
}
