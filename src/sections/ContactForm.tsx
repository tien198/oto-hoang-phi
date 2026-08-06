'use client'

import { AutoResizeTextarea } from '@/components/texcra-ui/auto-resize-textarea'
import { cn } from '@/lib/utils'
import clsx from 'clsx'
import { startTransition, useActionState, useState } from 'react'
import { submitContactAction } from '@/actions/submit-contact/contact'
import { ContactFormState, contactSchema } from '@/actions/submit-contact/contract-validate'

export function ContactForm({ className }: { className?: string }) {
  const [state, action, pending] = useActionState(submitContactAction, null)
  const [clientErrors, setClientErrors] = useState<ContactFormState['fieldErrors']>({})
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const result = contactSchema.safeParse(formValues)

    if (!result.success) {
      setClientErrors(result.error.flatten().fieldErrors)
      return
    }

    setClientErrors({})
    const formData = new FormData(e.currentTarget)
    startTransition(() => {
      action(formData)
    })
  }

  const errors = Object.keys(clientErrors || {}).length > 0 ? clientErrors : state?.fieldErrors

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        clsx(
          // Base Layout & Styling
          'flex-1 w-full max-w-xl flex flex-col gap-6 bg-white border border-accent rounded-xl shadow-sm duration-300',
          'py-16 px-5',
          'md:p-10',
        ),
        className,
      )}
    >
      <div className="flex flex-col gap-2">
        <label className="text-accent-foreground text-sm font-medium">Họ và tên</label>
        <input
          type="text"
          name="name"
          value={formValues.name}
          onChange={handleChange}
          placeholder="Nhập họ và tên..."
          className="w-full h-12 px-4 rounded-md border border-ring bg-accent text-accent-foreground text-sm outline-none focus:border-primary transition-colors"
        />
        {errors?.name && <p className="text-error text-xs mt-1">{errors.name[0]}</p>}
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-accent-foreground text-sm font-medium">Email</label>
        <input
          type="text"
          name="email"
          value={formValues.email}
          onChange={handleChange}
          placeholder="Nhập email..."
          className="w-full h-12 px-4 rounded-md border border-ring bg-accent text-accent-foreground text-sm outline-none focus:border-primary transition-colors"
        />
        {errors?.email && <p className="text-error text-xs mt-1">{errors.email[0]}</p>}
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-accent-foreground text-sm font-medium">Số điện thoại</label>
        <input
          type="tel"
          name="phone"
          value={formValues.phone}
          onChange={handleChange}
          placeholder="Nhập số điện thoại..."
          className="w-full h-12 px-4 rounded-md border border-ring bg-accent text-accent-foreground text-sm outline-none focus:border-primary transition-colors"
        />
        {errors?.phone && <p className="text-error text-xs mt-1">{errors.phone[0]}</p>}
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-accent-foreground text-sm font-medium">
          Quy khách đang cần những gì ?
        </label>
        <AutoResizeTextarea
          name="message"
          value={formValues.message}
          onChange={handleChange}
          placeholder="Nhập nội dung tin nhắn..."
          className="w-full min-h-32 p-4 rounded-md border border-ring bg-accent text-accent-foreground text-sm outline-none focus:border-primary transition-colors resize-none"
        />
        {errors?.message && <p className="text-error text-xs mt-1">{errors.message[0]}</p>}
      </div>

      {state?.error && <p className="text-error text-sm font-medium">{state.error}</p>}
      {state?.success && (
        <p className="text-green-600 text-sm font-medium">Gửi tin nhắn thành công!</p>
      )}

      <button
        disabled={pending}
        className={clsx(
          'w-full h-12 bg-primary text-accent font-semibold text-base rounded-md mt-2 disabled:opacity-50 disabled:cursor-not-allowed',
          'hover:italic hover:bg-accent hover:text-primary hover:border hover:border-primary transition-color',
        )}
      >
        {pending ? 'Đang gửi...' : 'Gửi'}
      </button>
    </form>
  )
}
