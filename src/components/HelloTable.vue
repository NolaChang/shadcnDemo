<template>
  <table>
    <thead>
      <tr>
        <th v-show="props.checkBox">
          <input
            type="checkbox"
            name="check_all"
            v-model="selectAll"
            @change="toggleAllCheck"
          />
        </th>
        <th v-for="th_text in props.title">
          {{ th_text }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item, index) in show_table"
        :id="item.id"
        :style="{ backgroundColor: rowStyles[item.id] }"
      >
        <th v-show="props.checkBox">
          <input
            type="checkbox"
            name="check_data"
            v-model="selectedItems[index]"
          />
        </th>
        <td v-for="item_value in item">
          <p v-if="item_value.indexOf('http') < 0">{{ item_value }}</p>
          <img v-else :src="item_value" />
        </td>
        <td v-show="false"><slot /></td>
      </tr>
    </tbody>
  </table>

  <button
    class="pagination"
    :key="page"
    v-for="page in totalPages"
    @click="chagePage(page)"
    :style="{ backgroundColor: page === current_page ? 'aliceblue' : 'white' }"
  >
    {{ page }}
  </button>
  <br /><br />
  <button id="getCheckBoxbtn" @click="getCheckBox">getCheckBox</button>

  <ul id="menu" class="context-menu hidden">
    <li v-show="!cutStatus" id="cut">剪下</li>
    <li v-show="cutStatus" id="paste" @click="insertInto">向下插入</li>
    <li v-show="cutStatus" id="cancel" @click="cancelChoose">取消選取</li>
  </ul>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch, nextTick } from "vue";
const props = defineProps({
  title: Array,
  content: {
    type: Array,
    default: [1, 2, 3],
  },
  pageSize: {
    type: Number,
    default: 3,
  },
  totalItems: {
    type: Number,
    default: 10,
  },
  checkBox: {
    type: Boolean,
    default: false,
  },
  sortColumn: {
    type: Array,
    default: [],
  },
});

// const sort_column = ref<any[]>([]);
const cut = ref<HTMLElement | null>(null);
const cut_id = ref<string>("");
const insertedId = ref<string>("");
const cutStatus = ref<boolean>(false);
const current_page = ref<number>(1);
const show_table = ref<any[]>(props.content.slice(0, props.pageSize));
const totalPages = Math.ceil(props.totalItems / props.pageSize);
const chagePage = (page: number) => {
  current_page.value = page;
  // 當切換頁面時，重設當前頁面的選擇狀態
  selectedItems.value = Array(show_table.value.length).fill(false);
};

//chat
const rowStyles = ref<Record<number, string>>({}); // 儲存每行的背景顏色
// 用來存儲每一行的選擇狀態
const selectedItems = ref<boolean[]>([]);

// 用來控制是否全選
const selectAll = ref(false);

// 當 selectAll 改變時，切換所有選項的勾選狀態
const toggleAllCheck = () => {
  selectedItems.value = Array(show_table.value.length).fill(selectAll.value);
};

// 取得勾選欄位值
const getCheckBox = () => {
  for (let i = 0; i <= selectedItems.value.length; i++) {
    if (selectedItems.value[i]) {
      console.log(show_table.value.at(i));
    }
  }
};

// 當某一行的勾選狀態改變時，檢查是否需要更新 selectAll
watch(
  selectedItems,
  (newSelectedItems) => {
    selectAll.value = newSelectedItems.every((item) => item);
  },
  { deep: true }
);

watch(current_page, () => {
  const start = (current_page.value - 1) * props.pageSize;
  show_table.value = props.content.slice(start, start + props.pageSize);
  addListener();
});

// 監聽 table_content 的變化，並觸發更新分頁資料
watch(
  () => props.content,
  (newValue) => {
    console.log("table_content 更新了", newValue);
    setTimeout(() => {
      const start = (current_page.value - 1) * props.pageSize;
      show_table.value = props.content.slice(start, start + props.pageSize);
      addListener();
      addSortBtn();
    }, 3000);
  },
  { deep: true }
);
// props data 更動後
watch(
  () => props,
  () => {
    // to something
  }
);
// onMounted(()=>{
// 	addSortBtn();
// })
const addSortBtn = () => {
  console.log(props.sortColumn);
  let items = document.querySelectorAll("thead th");
  items.forEach((item, _) => {
    if (props.sortColumn.indexOf(item.innerText) > -1) {
      item.innerHTML += `<button>^</button>`;
    }
  });
};
const addListener = () => {
  console.log("addListener");
  // 等資料加載完對tr加監聽，不然加不到
  nextTick(() => {
    let items = document.querySelectorAll("tbody tr");
    console.log(items);
    items.forEach((item, index) => {
      item.addEventListener("contextmenu", (e: MouseEvent | any) => {
        e.preventDefault();
        console.log("click id: " + e.currentTarget.getAttribute("id"));
        let targetId = e.currentTarget.getAttribute("id");
        let menu = document.getElementById("menu");
        if (menu !== null) {
          menu.style.top = `${e.clientY}px`;
          menu.style.left = `${e.clientX}px`;
          menu.classList.remove("hidden");
        }
        //   let menuList: any;
        if (!cutStatus.value) {
          console.log("現在在剪");
          let cutMenu = document.getElementById("cut");
          // 點擊剪下
          cutMenu.onclick = () => {
            cut.value = document.getElementById(targetId);
            console.log("剪下: ");
            console.log(cut);
            // 使用 rowStyles 儲存背景顏色
            rowStyles.value[targetId] = "gray";
            cutStatus.value = true;
            cut_id.value = targetId;
            console.log(cut_id);
          };
        } else {
          // console.log(cutStatus);
          insertedId.value = targetId;
        }
      });
    });
    document.addEventListener("click", () => {
      let menu = document.getElementById("menu");
      menu?.classList.add("hidden");
    });
  });
};
// 取消選取
const cancelChoose = () => {
  rowStyles.value = {};
  cutStatus.value = false;
  cut.value = null;
};
// 向下插入
const insertInto = async () => {
  rowStyles.value = {};
  console.log(`Switch ${insertedId.value} & ${cut_id.value}`);
  const indexToMove = Number(
    props.content.findIndex((temp: any) => temp.id == cut_id.value)
  );
  const newIndex =
    Number(
      props.content.findIndex((temp: any) => temp.id == insertedId.value)
    ) + 1;
  console.log(props.content);
  //   const content = [...props.content];
  const [movedItem] = props.content.splice(indexToMove, 1);

  props.content.splice(newIndex, 0, movedItem);

  // 資料更新後，重新更新顯示的當前頁面資料
  // setTimeout(() => {
  //   const start = (current_page.value - 1) * props.pageSize;
  //   show_table.value = props.content.slice(start, start + props.pageSize);
  // }, 5000);

  cutStatus.value = false;
};
</script>
<style scoped>
.context-menu {
  position: fixed;
  border: 1px solid #ccc;
  list-style: none;
  padding: 4px;
  border-radius: 4px;
  box-shadow: 0px 2px 6px 2px #ddd;
  background-color: #fff;
  li {
    padding: 8px 12px;
    border-bottom: 1px solid #f0f2f5;
    user-select: none;
    transition: all 0.1s;

    &:last-child {
      border-bottom: none;
    }
    &:hover {
      cursor: pointer;
      background-color: #0170fe;
      color: #fff;
    }
    &:active {
      background-color: #f0f2f7;
    }
  }
}

.hidden {
  display: none;
}

td,
th {
  padding: 8px 10px;
  /* pointer-events: none; */
}
tbody tr {
  /* border: 2px solid black; */
  &:nth-child(even) {
    background-color: #ffefe3;
  }
  &:hover {
    background-color: #fff4ec;
  }
}
thead tr {
  background-color: rgb(238, 238, 238);
}
table {
  border-collapse: collapse;
  border: 2px solid black;
  width: auto;
}
.pagination {
  margin: 20px 5px 5px 5px;
  width: 30px;
  height: 30px;
  border-radius: 50px;
  border: 2px solid grey;
}
button:hover {
  background-color: azure;
}
input[type="checkbox"] {
  cursor: pointer;
}
#getCheckBoxbtn {
  padding: 8px 10px;
  background-color: aliceblue;
  border: 3px solid cornflowerblue;
  border-radius: 15px;
}
</style>
