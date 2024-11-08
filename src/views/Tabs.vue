<template>
  <Tabs :default-value="current_tab">
    <TabsList>
      <TabsTrigger
        value="account"
        :variant="(current_tab === 'account') ? 'first_choose' : 'unchoose'"
        @click="onChangeTab('account')"
      >
        基本資料
      </TabsTrigger>
      <TabsTrigger
        class=""
        value="password"
        :variant="(current_tab === 'password') ? 'choose' : 'unchoose'"
        @click="onChangeTab('password')"
      >
        交易帳號
      </TabsTrigger>
      <TabsTrigger
        class=""
        value="tabdemo"
        :variant="(current_tab === 'tabdemo') ? 'choose' : 'unchoose'"
        @click="onChangeTab('tabdemo')"
      >
        Tab Demo
      </TabsTrigger>
    </TabsList>
    <TabsContent value="account">
      Make changes to your account here.
    </TabsContent>
    <TabsContent value="password"> Change your password here. </TabsContent>
    <TabsContent value="tabdemo"> Here is Tab Content </TabsContent>
  </Tabs>
</template>

<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ref } from "vue";

let current_tab = ref("account");
const onChangeTab = (tab_str: string) => {
  current_tab.value = tab_str;
};
</script>
