import payloadConfig from '@payload-config'
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'

export async function GET(req: Request) {
  const { sendEmail } = await getPayload({ config: payloadConfig })

  await sendEmail({
    to: 'tienvn998@gmail.com',
    subject: 'Kiểm tra',
    html: `
      <div style="font-family: sans-serif; text-align: center; padding: 20px; color: #333;">
        <h1 style="color: #007bff;">Xin chào!</h1>
        <p>Email này được tạo ra để kiểm tra cấu hình gửi mail.</p>
        <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Demo Image" style="max-width: 100%; border-radius: 8px; margin-top: 20px;" />
      </div>
    `,
    // text: 'Kiểm tra xem chạy đc ko :v',
  })

  return NextResponse.json({ success: 1 })
}
