<template>
  <div class="w-1/2 bg-white p-7">
    <p>網站名稱</p>
    <Textarea rows="1" placeholder="請輸入網站名稱"/>
    <p>網站關鍵詞</p>
    <Textarea rows="2" placeholder="請輸入網站關鍵詞"/>
    <p>網站描述</p>
    <Textarea rows="3" placeholder="請輸入網站描述"/>
    <button></button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Textarea } from "@/components/ui/textarea";
const web_name = ref();
console.log(web_name.value);

</script>
