import { MapPin, Phone, Mail } from 'lucide-react';

export const ContactSection = () => {
  return (
    <section id="contact" className="w-full bg-[#fafafa] py-16 md:py-20 px-5 md:px-20 flex flex-col lg:flex-row gap-16 justify-center">
      <div className="flex-1 flex flex-col gap-8 max-w-xl">
        <div className="flex flex-col gap-4">
          <h2 className="text-[#9f0712] text-3xl md:text-[36px] font-bold leading-[1.2]">
            Kết nối với chúng tôi
          </h2>
          <p className="text-[#737373] text-base leading-[1.6]">
            Hãy để lại thông tin, đội ngũ tư vấn của Phụ tùng Ô tô Hoàng Phi sẽ liên hệ lại với quý khách trong thời gian sớm nhất.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <MapPin className="text-[#9f0712] w-5 h-5 shrink-0" />
            <span className="text-[#0a0a0a] text-base">123 Đường Công Nghiệp, Quận 1, TP. HCM, Việt Nam</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="text-[#9f0712] w-5 h-5 shrink-0" />
            <span className="text-[#0a0a0a] text-base">+84 123 456 789</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="text-[#9f0712] w-5 h-5 shrink-0" />
            <span className="text-[#0a0a0a] text-base">contact@hoangphi-autoparts.vn</span>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full max-w-xl bg-white border border-[#e5e5e5] rounded-xl p-8 md:p-10 flex flex-col gap-6 shadow-sm">
        <div className="flex flex-col gap-2">
          <label className="text-[#0a0a0a] text-sm font-medium">Họ và tên</label>
          <input 
            type="text" 
            placeholder="Nhập họ và tên..." 
            className="w-full h-12 px-4 rounded-md border border-[#e5e5e5] bg-[#fafafa] text-[#737373] text-sm outline-none focus:border-[#9f0712] transition-colors"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[#0a0a0a] text-sm font-medium">Email</label>
          <input 
            type="email" 
            placeholder="Nhập email..." 
            className="w-full h-12 px-4 rounded-md border border-[#e5e5e5] bg-[#fafafa] text-[#737373] text-sm outline-none focus:border-[#9f0712] transition-colors"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[#0a0a0a] text-sm font-medium">Số điện thoại</label>
          <input 
            type="tel" 
            placeholder="Nhập số điện thoại..." 
            className="w-full h-12 px-4 rounded-md border border-[#e5e5e5] bg-[#fafafa] text-[#737373] text-sm outline-none focus:border-[#9f0712] transition-colors"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[#0a0a0a] text-sm font-medium">Quy khách đang cần những gì ?</label>
          <textarea 
            placeholder="Nhập nội dung tin nhắn..." 
            className="w-full h-[120px] p-4 rounded-md border border-[#e5e5e5] bg-[#fafafa] text-[#737373] text-sm outline-none focus:border-[#9f0712] transition-colors resize-none"
          ></textarea>
        </div>
        <button className="w-full h-12 bg-[#9f0712] text-[#fef2f2] font-semibold text-base rounded-md hover:bg-red-800 transition-colors mt-2">
          Gửi Tin Nhắn
        </button>
      </div>
    </section>
  );
};
