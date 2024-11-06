<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
</script>

<template>
  <Tabs default-value="account">
    <TabsList>
      <TabsTrigger
        class=" bg-white shadow-tab-choose z-10"
        value="account"
      >
        基本資料
      </TabsTrigger>
      <TabsTrigger
        class="bg-tab-gray"
        value="password"
      >
        交易帳號
      </TabsTrigger>
    </TabsList>
    <TabsContent value="account">
      Make changes to your account here.
    </TabsContent>
    <TabsContent value="password"> Change your password here. </TabsContent>
  </Tabs>
</template>
