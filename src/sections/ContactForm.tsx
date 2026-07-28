import { AutoResizeTextarea } from '@/components/texcra-ui/auto-resize-textarea'
import { cn } from '@/lib/utils'
import clsx from 'clsx'

export function ContactForm({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        `flex-1 w-full max-w-xl bg-white border border-accent rounded-xl p-8 md:p-10 flex flex-col gap-6 shadow-sm duration-300`,
        className,
      )}
    >
      <div className="flex flex-col gap-2">
        <label className="text-accent-foreground text-sm font-medium">Họ và tên</label>
        <input
          type="text"
          placeholder="Nhập họ và tên..."
          className="w-full h-12 px-4 rounded-md border border-ring bg-accent text-accent-foreground text-sm outline-none focus:border-primary transition-colors"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-accent-foreground text-sm font-medium">Email</label>
        <input
          type="email"
          placeholder="Nhập email..."
          className="w-full h-12 px-4 rounded-md border border-ring bg-accent text-accent-foreground text-sm outline-none focus:border-primary transition-colors"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-accent-foreground text-sm font-medium">Số điện thoại</label>
        <input
          type="tel"
          placeholder="Nhập số điện thoại..."
          className="w-full h-12 px-4 rounded-md border border-ring bg-accent text-accent-foreground text-sm outline-none focus:border-primary transition-colors"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-accent-foreground text-sm font-medium">
          Quy khách đang cần những gì ?
        </label>
        <AutoResizeTextarea
          placeholder="Nhập nội dung tin nhắn..."
          className="w-full min-h-32 p-4 rounded-md border border-ring bg-accent text-accent-foreground text-sm outline-none focus:border-primary transition-colors resize-none"
        />
      </div>
      <button
        className={clsx(
          'w-full h-12 bg-primary text-accent font-semibold text-base rounded-md mt-2',
          'hover:italic hover:bg-accent hover:text-primary hover:border hover:border-primary transition-color',
        )}
      >
        Gửi
      </button>
    </div>
  )
}
