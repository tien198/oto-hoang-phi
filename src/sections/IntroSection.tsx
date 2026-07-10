export const IntroSection = () => {
  return (
    <section className="w-full bg-[#fafafa] py-16 md:py-20 px-5 md:px-20 flex flex-col lg:flex-row items-center gap-16">
      <div className="flex-1 flex flex-col gap-6">
        <h2 className="text-[#9f0712] text-3xl md:text-[36px] font-bold leading-[1.2]">
          Đối tác đáng tin cậy trong nhập khẩu và cung cấp các sản phẩm phụ tùng ô tô
        </h2>
        <p className="text-[#737373] text-base leading-[1.6]">
          Cửa hàng phụ tùng ô tô Hoàng Phi là đơn vị nhập khẩu trực tiếp và phân phối các sản phẩm
          chính hãng, chất lượng cao các hãng xe Toyota, Hyundai, Kia, Ford, Mazda, Honda,
          Mitsubishi, Nissan, Suzuki... Với nhiều năm kinh nghiệm kinh doanh mặt hàng phụ tùng ô tô.
          Chúng tôi cam kết cung cấp các giải pháp về phụ tùng ô tô chính hãng, cao cấp linh hoạt,
          đáp ứng tiêu chuẩn chất lượng khắt khe nhất để mang lại sự an toàn tuyệt đối trên mọi hành
          trình.
        </p>
      </div>
      <div className="flex-1 w-full rounded-xl overflow-hidden shadow-lg h-[400px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/api/media/file/generated-1783491206653.png"
          alt="Intro Image"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  )
}
