import { z } from 'zod'

// Contact form validator
export const contactSchema = z.object({
  name: z.string().min(2, 'İsim en az 2 karakter olmalı').max(100),
  email: z.string().email('Geçerli bir e-posta adresi girin'),
  subject: z.string().min(3, 'Konu en az 3 karakter olmalı').max(200),
  message: z.string().min(10, 'Mesaj en az 10 karakter olmalı').max(1000)
})

// Project validator
export const projectSchema = z.object({
  title: z.string().min(3, 'Proje adı en az 3 karakter olmalı').max(200),
  description: z.string().min(10, 'Açıklama en az 10 karakter olmalı').max(2000),
  status: z.enum(['planning', 'in_progress', 'review', 'completed']),
  progress: z.number().min(0).max(100),
  start_date: z.string().optional(),
  due_date: z.string().optional(),
  metadata: z.record(z.any()).optional()
})

// Invoice validator
export const invoiceSchema = z.object({
  client_id: z.string().uuid(),
  project_id: z.string().uuid().optional(),
  amount: z.number().min(0, 'Tutar 0 veya daha büyük olmalı'),
  currency: z.enum(['TRY', 'USD', 'EUR']),
  due_date: z.string(),
  issue_date: z.string().optional()
})

// Profile validator
export const profileSchema = z.object({
  full_name: z.string().min(2, 'İsim en az 2 karakter olmalı').max(100),
  company: z.string().max(100).optional(),
  phone: z.string().max(20).optional(),
  avatar_url: z.string().url().optional()
})

// Report validator
export const reportSchema = z.object({
  project_id: z.string().uuid(),
  title: z.string().min(3, 'Başlık en az 3 karakter olmalı').max(200),
  summary: z.string().max(2000).optional(),
  file_url: z.string().url().optional(),
  type: z.enum(['analysis', 'performance', 'security'])
})

// Notification validator
export const notificationSchema = z.object({
  user_id: z.string().uuid(),
  title: z.string().min(1, 'Başlık boş olamaz').max(200),
  message: z.string().min(1, 'Mesaj boş olamaz').max(500),
  type: z.enum(['info', 'success', 'warning']),
  link: z.string().url().optional()
})

// Validation helper
export const validate = (schema) => (data) => {
  try {
    return schema.parse(data)
  } catch (error) {
    throw new Error(error.errors?.[0]?.message || 'Validation failed')
  }
}
