<script setup lang="ts">
import { cn } from '@/lib/utils'
import { TabsList, type TabsListProps } from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<TabsListProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>
<!-- 'inline-flex items-center justify-center rounded-md bg-muted p-1 text-muted-foreground', -->
<template>
  <TabsList
    v-bind="delegatedProps"
    :class="cn(
      
    )"
  >
    <slot />
  </TabsList>
</template>
