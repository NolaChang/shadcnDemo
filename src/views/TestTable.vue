<template>
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          <draggable 
            v-model="currentPageData"
            @start="onDragStart"
            @end="onDragEnd"
            item-key="id"
            tag="tr"
          >
            <template #item="{ element }">
              <tr :key="element.id">
                <td>{{ element.name }}</td>
                <td>{{ element.age }}</td>
              </tr>
            </template>
          </draggable>
        </tbody>
      </table>
  
      <!-- 分頁按鈕 -->
      <div class="pagination">
        <button
          v-for="page in totalPages"
          :key="page"
          @dragenter="onPageHover(page)"
          @dragover.prevent
          @mouseleave="clearPageChangeTimer"
        >
          {{ page }}
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import { defineComponent, reactive, ref, computed } from 'vue';
  import draggable from 'vuedraggable';
  
  export default defineComponent({
    components: {
      draggable,
    },
    setup() {
      const columns = reactive([
        { accessor: 'name', header: 'Name' },
        { accessor: 'age', header: 'Age' },
      ]);
  
      const data = reactive(
        Array.from({ length: 50 }, (_, i) => ({
          id: i + 1,
          name: `User ${i + 1}`,
          age: Math.floor(Math.random() * 50) + 20,
        }))
      );
  
      const rowsPerPage = 5;
      const totalPages = Math.ceil(data.length / rowsPerPage);
      const currentPage = ref(1);
      let pageChangeTimeout = null;
      let draggedItem = null;  // 暫存被拖曳的資料項
  
      // 計算當前頁面的資料
      const currentPageData = computed(() => {
        const start = (currentPage.value - 1) * rowsPerPage;
        return data.slice(start, start + rowsPerPage);
      });
  
      const onDragStart = (event) => {
        // 儲存被拖曳的資料項
        draggedItem = event.item._underlying_vm_;
      };
  
      const onDragEnd = (event) => {
        if (draggedItem) {
          const start = (currentPage.value - 1) * rowsPerPage;
          const newIndex = start + event.newIndex;
  
          // 刪除被拖曳的資料項並插入到新位置
          data.splice(data.findIndex(item => item.id === draggedItem.id), 1);
          data.splice(newIndex, 0, draggedItem);
        }
        draggedItem = null;  // 清除暫存資料
      };
  
      const changePage = (page) => {
        currentPage.value = page;
        clearTimeout(pageChangeTimeout);
      };
  
      const onPageHover = (page) => {
        clearTimeout(pageChangeTimeout);
        pageChangeTimeout = setTimeout(() => changePage(page), 1000); // 停留1秒後切換頁面
      };
  
      const clearPageChangeTimer = () => {
        clearTimeout(pageChangeTimeout);
      };
  
      return {
        columns,
        currentPageData,
        totalPages,
        currentPage,
        onDragStart,
        onDragEnd,
        onPageHover,
        clearPageChangeTimer,
      };
    },
  });
  </script>
  
  <style>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  td, th {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  
  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  
  tr:hover {
    background-color: #f1f1f1;
  }
  
  .pagination {
    display: flex;
    gap: 8px;
    margin-top: 16px;
    justify-content: center;
  }
  
  button {
    padding: 6px 12px;
    border: 1px solid #ddd;
    background-color: #fff;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #f0f0f0;
  }
  
  button:focus {
    outline: none;
    border-color: #999;
  }
  </style>
  