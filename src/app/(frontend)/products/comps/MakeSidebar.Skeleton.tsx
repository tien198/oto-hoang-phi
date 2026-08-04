import { ChevronRight } from 'lucide-react'

export function MakesListSkeleton() {
  return (
    <div className="flex flex-col animate-pulse">
      {Array.from({ length: 6 }).map((_, idx) => (
        <div
          key={idx}
          className={`flex items-center justify-between p-4 ${idx % 2 === 0 ? '' : 'bg-secondary'}`}
        >
          <div className="h-4 w-24 bg-gray-200 rounded" />
          <ChevronRight className="w-4 h-4 text-foreground" />
        </div>
      ))}
    </div>
  )
}
