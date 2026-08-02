import clsx from 'clsx'

export default function ProductListSkeleton() {
  return (
    <div className="flex flex-col gap-6 w-full flex-1 animate-pulse">
      <div className="flex flex-col gap-2">
        <div className="h-7 w-52 bg-muted rounded" />
        <div className="h-0.5 bg-primary w-30" />
      </div>

      <div className="flex flex-col">
        {/* Table Header */}
        <div
          className={clsx(
            'grid grid-cols-[320px_1fr_260px] bg-primary',
            'text-base font-semibold text-primary-foreground',
          )}
        >
          <div className="px-6 h-full border border-accent py-4">
            <span># HÌNH ẢNH</span>
          </div>
          <div className="px-6 h-full border border-accent py-4">
            <span>THÔNG TIN</span>
          </div>
          <div className="px-6 h-full border border-accent py-4">
            <span>MÔ TẢ TƯƠNG THÍCH</span>
          </div>
        </div>

        {/* Skeleton Rows */}
        {Array.from({ length: 5 }).map((_, idx) => (
          <div
            key={idx}
            className="grid grid-cols-[320px_1fr_260px] border-b border-border"
          >
            <div className="px-6 py-4 border-x border-border">
              <div className="h-32 w-full bg-muted rounded" />
            </div>
            <div className="px-6 py-4 border-r border-border flex flex-col gap-2">
              <div className="h-5 w-3/4 bg-muted rounded" />
              <div className="h-4 w-1/2 bg-muted rounded" />
              <div className="h-4 w-2/3 bg-muted rounded" />
            </div>
            <div className="px-6 py-4 border-r border-border flex flex-col gap-2">
              <div className="h-4 w-full bg-muted rounded" />
              <div className="h-4 w-4/5 bg-muted rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
