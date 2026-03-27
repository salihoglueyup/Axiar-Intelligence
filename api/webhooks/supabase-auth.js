import { withCors, withErrorHandling } from '../_lib/middleware.js'
import { sendSuccess, sendError } from '../_lib/errors.js'
import { supabaseAdmin } from '../_lib/supabase-admin.js'

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return sendError(res, 'notFound', 'Method not allowed')
  }

  try {
    const { type, user, record } = req.body

    console.log('Supabase auth webhook:', { type, userId: user?.id })

    switch (type) {
      case 'signup':
        // User signed up - profile will be created automatically by trigger
        console.log('New user signed up:', user.email)
        
        // Send welcome notification
        await supabaseAdmin
          .from('notifications')
          .insert({
            user_id: user.id,
            title: 'Hoş Geldiniz!',
            message: 'Axiar Intelligence platformuna hoş geldiniz. Hesabınız başarıyla oluşturuldu.',
            type: 'success'
          })

        // Log activity
        await supabaseAdmin
          .from('activities')
          .insert({
            user_id: user.id,
            action: 'user_registered',
            description: `${user.email} kullanıcı olarak kayıt oldu`,
            metadata: { email: user.email }
          })

        return sendSuccess(res, { message: 'User processed successfully' })

      case 'login':
        // User logged in
        console.log('User logged in:', user.email)
        return sendSuccess(res, { message: 'Login processed successfully' })

      case 'user.deleted':
        // User deleted - cleanup related data
        console.log('User deleted:', user.email)
        
        // Note: Due to foreign key constraints with ON DELETE CASCADE,
        // related records will be automatically deleted
        
        return sendSuccess(res, { message: 'User cleanup processed successfully' })

      default:
        return sendSuccess(res, { message: 'Webhook processed successfully' })
    }
  } catch (error) {
    console.error('Supabase auth webhook error:', error)
    return sendError(res, 'serverError', 'Failed to process webhook')
  }
}

export default withCors(withErrorHandling(handler))
