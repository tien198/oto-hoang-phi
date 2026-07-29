'use client'
import { AutoResizeTextarea } from '@/components/texcra-ui/auto-resize-textarea'
import { cn } from '@/lib/utils'
import clsx from 'clsx'
import { useActionState } from 'react'
import { submitContactForm } from '@/actions/contact'

export function ContactForm({ className }: { className?: string }) {
  const [state, action, isPending] = useActionState(submitContactForm, null)

  return (
    <form
      action={action}
      className={cn(
        `flex-1 w-full max-w-xl bg-white border border-accent rounded-xl p-8 md:p-10 flex flex-col gap-6 shadow-sm duration-300`,
        className,
      )}
    >
      <div className="flex flex-col gap-2">
        <label className="text-accent-foreground text-sm font-medium">Họ và tên</label>
        <input
          type="text"
          name="name"
          required
          placeholder="Nhập họ và tên..."
          className="w-full h-12 px-4 rounded-md border border-ring bg-accent text-accent-foreground text-sm outline-none focus:border-primary transition-colors"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-accent-foreground text-sm font-medium">Email</label>
        <input
          type="email"
          name="email"
          required
          placeholder="Nhập email..."
          className="w-full h-12 px-4 rounded-md border border-ring bg-accent text-accent-foreground text-sm outline-none focus:border-primary transition-colors"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-accent-foreground text-sm font-medium">Số điện thoại</label>
        <input
          type="tel"
          name="phone"
          required
          placeholder="Nhập số điện thoại..."
          className="w-full h-12 px-4 rounded-md border border-ring bg-accent text-accent-foreground text-sm outline-none focus:border-primary transition-colors"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-accent-foreground text-sm font-medium">
          Quy khách đang cần những gì ?
        </label>
        <AutoResizeTextarea
          name="message"
          required
          placeholder="Nhập nội dung tin nhắn..."
          className="w-full min-h-32 p-4 rounded-md border border-ring bg-accent text-accent-foreground text-sm outline-none focus:border-primary transition-colors resize-none"
        />
      </div>

      {state?.error && <p className="text-error text-sm font-medium">{state.error}</p>}
      {state?.success && (
        <p className="text-green-600 text-sm font-medium">Gửi tin nhắn thành công!</p>
      )}

      <button
        disabled={isPending}
        className={clsx(
          'w-full h-12 bg-primary text-accent font-semibold text-base rounded-md mt-2 disabled:opacity-50 disabled:cursor-not-allowed',
          'hover:italic hover:bg-accent hover:text-primary hover:border hover:border-primary transition-color',
        )}
      >
        {isPending ? 'Đang gửi...' : 'Gửi'}
      </button>
    </form>
  )
}
