<script setup lang="ts">
import { cn } from '@/lib/utils'
import { TabsContent, type TabsContentProps } from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<TabsContentProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <TabsContent
    :class="cn('bg-white z-20 relative w-1/2 h-[150px] p-5', props.class)"
    v-bind="delegatedProps"
  >
    <slot />
  </TabsContent>
</template>
