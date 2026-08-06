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
            'hidden',
            // Desktop
            'md:grid md:grid-cols-[220px_1fr_200px] xl:grid-cols-[320px_1fr_260px] bg-primary',
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
            className={clsx(
              // Base / Mobile
              'flex flex-col w-full border-b border-primary last:border-b-0 h-88',
              // Desktop
              'md:grid md:grid-cols-[220px_1fr_200px] xl:grid-cols-[320px_1fr_260px]',
            )}
          >
            {/* Image Column */}
            <div
              className={clsx(
                // Base / Mobile
                'flex flex-col items-center justify-center py-6 border-b border-primary',
                // Desktop
                'md:py-8 md:border-b-0 xl:py-10',
              )}
            >
              <div className="h-32 w-full max-w-[200px] md:max-w-none bg-muted rounded" />
            </div>

            {/* Specs Column */}
            <div
              className={clsx(
                // Base / Mobile
                'flex flex-col gap-4 px-4 py-6 border-b border-primary',
                // Desktop
                'md:gap-4 md:px-6 md:py-8 md:border-r md:border-b-0 md:border-primary xl:gap-6 xl:px-8 xl:py-10',
              )}
            >
              <div className="flex flex-1 flex-col gap-2">
                <div className="h-6 w-3/4 bg-muted rounded" />
                <div className="h-8 w-1/3 bg-muted rounded-full" />
              </div>

              <div
                className={clsx(
                  // Base / Mobile
                  'grid grid-cols-1 gap-2',
                  // Tablet
                  'sm:grid-cols-2 sm:gap-4',
                  // Desktop
                  'md:gap-6 xl:gap-8',
                )}
              >
                <div className="h-4 w-full bg-muted rounded" />
                <div className="h-4 w-3/4 bg-muted rounded" />
              </div>
            </div>

            {/* Application Column */}
            <div
              className={clsx(
                // Base / Mobile
                'flex flex-col gap-2 py-6 px-4',
                // Desktop
                'md:px-0',
              )}
            >
              <div className="h-4 w-full bg-muted rounded" />
              <div className="h-4 w-4/5 bg-muted rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
