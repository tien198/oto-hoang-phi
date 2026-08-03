'use server'

import { getPayload } from 'payload'
import payloadConfig from '@payload-config'
import fs from 'fs/promises'
import path from 'path'
import { contactSchema, type ContactFormState } from './contract-validate'

export async function submitContactAction(
  prevState: ContactFormState | null,
  formData: FormData,
): Promise<ContactFormState> {
  const { sendEmail } = await getPayload({ config: payloadConfig })

  const APP_SCRIPT = process.env.APP_SCRIPT ?? ''
  const name = (formData.get('name') as string) || ''
  const email = (formData.get('email') as string) || ''
  const phone = (formData.get('phone') as string) || ''
  const message = (formData.get('message') as string) || ''

  const result = contactSchema.safeParse({ name, email, phone, message })

  if (!result.success) {
    return {
      success: false,
      fieldErrors: result.error.flatten().fieldErrors as ContactFormState['fieldErrors'],
    }
  }

  const data = result.data
  try {
    if (APP_SCRIPT) {
      await fetch(APP_SCRIPT, {
        method: 'POST',
        body: JSON.stringify(data),
      })
    }

    // Read the HTML template
    const templatePath = path.resolve(
      process.cwd(),
      'src',
      'actions',
      'submit-contact',
      'inform-contact.html',
    )
    let htmlContent = await fs.readFile(templatePath, 'utf8')

    // Replace placeholders with actual data
    htmlContent = htmlContent
      .replace(/\$\{name\}/g, name)
      .replace(/\$\{email\}/g, email)
      .replace(/\$\{phone\}/g, phone)
      .replace(/\$\{message\}/g, message)

    await sendEmail({
      to: process.env.RECEIVE_INFORM_ADDRESS ?? '',
      subject: 'Thông Báo Liên Hệ Mới',
      html: htmlContent,
    })

    return { success: true }
  } catch (error) {
    console.error('Error submitting contact form:', error)
    return { error: 'Đã có lỗi xảy ra. Vui lòng thử lại sau.' }
  }
}
