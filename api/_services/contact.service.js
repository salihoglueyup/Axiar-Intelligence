import { supabaseAdmin } from '../_lib/supabase-admin'
import { BadRequestError } from '../_lib/errors'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export const ContactService = {
  /**
   * Save a new contact message and send notification
   */
  async saveMessage(contactData) {
    const { data: contact, error } = await supabaseAdmin
      .from('contacts')
      .insert({
        ...contactData,
        status: 'new',
        created_at: new Date().toISOString()
      })
      .select()
      .single()

    if (error) {
      console.error('[ContactService] Error saving message:', error)
      throw new BadRequestError('Failed to save contact message')
    }

    // Send notification email via Resend
    try {
      if (process.env.RESEND_API_KEY) {
        await resend.emails.send({
          from: 'Axiar Intelligence <notifications@axiar.io>',
          to: ['admin@axiar.io'], // Replace with actual admin email
          subject: `Yeni İletişim Mesajı: ${contactData.subject}`,
          html: `
            <h3>Yeni İletişim Mesajı Alındı</h3>
            <p><strong>Gönderen:</strong> ${contactData.name} (${contactData.email})</p>
            <p><strong>Konu:</strong> ${contactData.subject}</p>
            <p><strong>Mesaj:</strong></p>
            <p>${contactData.message}</p>
          `
        })
      }
    } catch (emailError) {
      console.error('[ContactService] Email send error:', emailError)
      // We don't throw here to not fail the whole request if only email fails
    }

    return contact
  }
}
