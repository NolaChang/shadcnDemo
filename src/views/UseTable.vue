<template>
  <HelloTable
    :title="table_title"
    :content="table_content"
    :page-size="per_page"
    :total-items="total_items"
    :check-box="true"
    :sort-column = "sort_column"
  >
  </HelloTable>
  <!-- <button>展開</button> -->
  <!-- <button class="editbtn" style="margin: 3px; color: darkorange; border: 1px solid darkorange; padding:3px 5px; border-radius:8px">編輯</button>
<button class="deletebtn" style="margin: 3px; color: red; border: 1px solid red; padding:3px 5px; border-radius:8px">刪除</button> -->
</template>

<script setup lang="ts">
import HelloTable from "../components/HelloTable.vue";
import { reactive, ref } from "vue";
import axios from "axios";
interface User {
  [key: string]: any;
}
const dataList = ref<any[]>([]);
const table_title = ref<string[]>([]);
const table_content = ref<User[]>([]);
const per_page = ref<number>();
const total_items = ref<number>();
const sort_column = ['username', 'role'];
async function getData() {
  await setTimeout(() => {
    axios
      .get("/mock/getUserList")
      .then((res: any) => {
        // console.log(res);
        dataList.value = res.data.data;
        console.log(dataList.value);
        table_content.value = res.data.data.users;
        table_title.value = Object.keys(res.data.data.users[0]);
        // console.log(Object.keys(res.data.data.users[0]));
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("抓到API資料");
  }, 0);
}
getData();

// const table_title = ["id", "name", "age"];
// const table_content = reactive(
//   Array.from({ length: 15 }, (_, i) => ({
//     id: i + 1,
//     name: `User ${i + 1}`,
//     age: Math.floor(Math.random() * 50) + 20,
//   }))
// );
</script>
