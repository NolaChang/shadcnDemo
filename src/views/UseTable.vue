<template>
  <HelloTable
    :title="table_title"
    :content="table_content"
    :page-size="4"
    :total-items="15"
    :check-box="true"
  >
  <button>展開</button>
    <!-- <button class="editbtn" style="margin: 3px; color: darkorange; border: 1px solid darkorange; padding:3px 5px; border-radius:8px">編輯</button>
    <button class="deletebtn" style="margin: 3px; color: red; border: 1px solid red; padding:3px 5px; border-radius:8px">刪除</button> -->
  </HelloTable>
</template>

<script setup lang="ts">
import HelloTable from "../components/HelloTable.vue";
import { reactive } from "vue";
const table_title = ["id", "name", "age"];
const table_content = reactive(
  Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    age: Math.floor(Math.random() * 50) + 20,
  }))
);
</script>
