<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Toaster } from '@/components/ui/toast'
import { useToast } from '@/components/ui/toast/use-toast'

const { toast } = useToast()
</script>

<template>
  <Toaster/>
  <Button
    @click="() => {
      toast({
        title: '登入成功',
        // description: '登入成功',
      });
    }"
  >
    Add to calendar
  </Button>
</template>