export { default as Tabs } from "./Tabs.vue";
export { default as TabsContent } from "./TabsContent.vue";
export { default as TabsList } from "./TabsList.vue";
export { default as TabsTrigger } from "./TabsTrigger.vue";
import { cva, type VariantProps } from "class-variance-authority";

// 使用 cva 定義 Tab 的變體和樣式
export const tabVariants = cva(
  "align-baseline relative z-0 rounded-t-[10px] px-[24px] py-[10px] text-[16px] cursor-pointer text-tab-text",
  {
    variants: {
      // Tab 的風格
      variant: {
        // default:'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
        choose: "bg-white shadow-tab-choose z-10",
        unchoose: "bg-tab-gray z-0",
        first_choose: "bg-white shadow-tab-first_choose z-10",
      },
      // Tab 的大小
      size: {
        default: "",
      },
    },
    // 預設的變體
    defaultVariants: {
      variant: "first_choose",
      size: "default",
    },
  }
);

export type TabVariants = VariantProps<typeof tabVariants>;
