<script setup lang="ts">
import { cn } from "@/lib/utils";
import { TabsTrigger, type TabsTriggerProps, useForwardProps } from "radix-vue";
import { computed, type HTMLAttributes } from "vue";
import { type TabVariants, tabVariants } from ".";
import { Primitive, type PrimitiveProps } from 'radix-vue'

// interface Props extends PrimitiveProps {
//   variant?: TabVariants['variant']
//   size?: TabVariants['size']
//   class?: HTMLAttributes['class']
// }
// const props = withDefaults(defineProps<Props>(), {
//   as: 'tabs-trigger',
// })
const props = defineProps<
  TabsTriggerProps & { class?: HTMLAttributes["class"] }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>
<!-- 'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm' -->
<template>
  <TabsTrigger
    v-bind="forwardedProps"
    :class="
      cn(
        // tabVariants({variant, size}),
        'align-baseline relative z-0 rounded-t-tab px-[24px] py-[10px] text-[16px] cursor-pointer text-tab-text',
        props.class
      )
    "
  >
    <span class="truncate">
      <slot />
    </span>
  </TabsTrigger>
</template>
