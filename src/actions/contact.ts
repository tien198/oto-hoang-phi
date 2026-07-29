'use server'

import { error } from 'console'

export async function submitContactForm(prevState: any, formData: FormData) {
  try {
    const name = formData.get('name')
    const email = formData.get('email')
    const phone = formData.get('phone')
    const message = formData.get('message')

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000))
    if (!name || !email || !phone || !message) {
      throw { error: 'Vui lòng điền đầy đủ thông tin.' }
    }

    // Here you would typically send an email or save to database
    console.log('Contact form submission:', { name, email, phone, message })

    return { success: true }
  } catch (error) {
    return { error: 'Đã có lỗi xảy ra. Vui lòng thử lại sau.' }
  }
}
