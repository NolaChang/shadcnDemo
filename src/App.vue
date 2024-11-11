<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue'
import Tabs from "./views/Tabs.vue";
import TagsInput from "./views/TagsInput.vue";
import Textarea from "./views/Textarea.vue";
import Toaster from "./views/Toaster.vue";
import UseTable from "./views/UseTable.vue";
</script>

<template>
  <!-- <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" /> -->
  <!-- <div id="demo" class="mx-5">
    <br />
    <Tabs />
    <br />
    <TagsInput />
    <br /><br />
    <Textarea />
    <br />
    <Toaster />
  </div> -->
  <UseTable />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
