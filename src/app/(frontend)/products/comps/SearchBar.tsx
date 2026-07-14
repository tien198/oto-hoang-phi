import { Search, ChevronsRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import clsx from 'clsx'

export default function SearchBar() {
  return (
    <div
      className={clsx(
        'flex items-center gap-4 p-4 md:px-6 bg-card border-b border-accent-foreground w-full flex-wrap',
        'sticky top-0',
      )}
    >
      <div className="flex items-center gap-2">
        <ChevronsRight className="w-6 h-6 text-primary" />
      </div>
      <div className="flex items-center gap-2 flex-1 min-w-[200px] border border-accent-foreground rounded-md px-4 bg-card h-10">
        <Input
          className={clsx(
            'border-none shadow-none outline-0 bg-transparent px-0 text-primary placeholder:text-primary',
            'focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0',
          )}
          placeholder="Nhập tên phụ tùng..."
        />
        <Search className="w-4 h-4 text-[#737373]" />
      </div>
      <div className="flex items-center gap-4 flex-wrap">
        <Select defaultValue="toyota">
          <SelectTrigger className="w-[180px] bg-card border-accent-foreground text-primary">
            <SelectValue placeholder="Brand" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="toyota">TOYOTA</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="innova">
          <SelectTrigger className="w-[180px] bg-card border-accent-foreground text-primary">
            <SelectValue placeholder="Model" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="innova">INNOVA</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="2000">
          <SelectTrigger className="w-[180px] bg-card border-accent-foreground text-primary">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2000">2000</SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          className={clsx(
            'bg-card border-accent-foreground shadow-sm px-6 h-10',
            'hover:bg-primary hover:text-accent',
          )}
        >
          Tìm kiếm
        </Button>
      </div>
    </div>
  )
}
