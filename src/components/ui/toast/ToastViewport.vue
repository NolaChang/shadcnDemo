<script setup lang="ts">
import { cn } from "@/lib/utils";
import { ToastViewport, type ToastViewportProps } from "radix-vue";
import { computed, type HTMLAttributes } from "vue";

const props = defineProps<
  ToastViewportProps & { class?: HTMLAttributes["class"] }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <ToastViewport
    style="margin-left: 44%;"
    v-bind="delegatedProps"
    :class="
      cn(
        // 'fixed flex top-0 z-[100] max-h-screen w-full flex-col-reverse pt-4 sm:top-0 sm:inset-y-0 sm:flex-col md:max-w-[420px]',
        'fixed flex max-h-screen w-fit z-[100] top-0 pt-4 m-auto',
        props.class
      )
    "
  />
</template>
