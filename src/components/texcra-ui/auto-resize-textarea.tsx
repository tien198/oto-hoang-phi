import { cn } from '@/lib/utils'
import type { InputEvent, TextareaHTMLAttributes } from 'react'
import { useRef } from 'react'

type Props = TextareaHTMLAttributes<HTMLTextAreaElement>

export function AutoResizeTextarea({ className, onInput, ...props }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  const handleInput = (e: InputEvent<HTMLTextAreaElement>) => {
    const textarea = e.target as HTMLTextAreaElement

    // 1. Reset chiều cao về auto để lấy kích thước thật khi người dùng xóa bớt text
    textarea.style.height = 'auto'

    // 2. Đặt chiều cao mới bằng đúng scrollHeight (tổng chiều cao nội dung bên trong)
    textarea.style.height = `${textarea.scrollHeight}px`
  }
  return (
    <textarea
      ref={textareaRef}
      onInput={handleInput}
      {...props}
      className={cn('overflow-hidden', className)}
    />
  )
}
