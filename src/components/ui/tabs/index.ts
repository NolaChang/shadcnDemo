export { default as Tabs } from './Tabs.vue'
export { default as TabsContent } from './TabsContent.vue'
export { default as TabsList } from './TabsList.vue'
export { default as TabsTrigger } from './TabsTrigger.vue'
import { cva, type VariantProps } from 'class-variance-authority'

// 使用 cva 定義 Tab 的變體和樣式
export const tabVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      // Tab 的風格
      variant: {

      },
      // Tab 的大小
      size: {
      },
    },
    // 預設的變體
    defaultVariants: {
      // variant: 'default',
      // size: 'default',
    },
  }
)

export type TabVariants = VariantProps<typeof tabVariants>

