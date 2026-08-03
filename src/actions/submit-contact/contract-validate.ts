import z from 'zod'

export const contactSchema = z.object({
  name: z.string().min(1, 'Chúng tôi có thể gọi bạn là gì'),
  email: z.email('Email không hợp lệ'),
  phone: z
    .string()
    .min(1, 'Bạn quên nhập số điện thoại')
    .regex(/^[0-9]{9,11}$/, 'Số điện thoại không hợp lệ'),
  message: z.string().optional(),
})

export type ContactFormState = {
  success?: boolean
  error?: string
  fieldErrors?: {
    name?: string[]
    email?: string[]
    phone?: string[]
    message?: string[]
  }
}
