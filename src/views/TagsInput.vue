<template>
  <botton
    class="tag"
    v-for="item in defaultValue"
    v-text="item"
    @click="showContent(item)"
  ></botton>
  <br /><br />
  <TagsInput v-model="modelValue">
    <TagsInputItem v-for="item in modelValue" :key="item" :value="item">
      <TagsInputItemText />
      <TagsInputItemDelete />
    </TagsInputItem>
    <TagsInputInput placeholder="風格" />
  </TagsInput>

  <br />
  <button id="clear" @click="clear()">清空</button>
</template>

<script setup lang="ts">
import {
  TagsInput,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemDelete,
  TagsInputItemText,
} from "@/components/ui/tags-input";
import { ref } from "vue";

const modelValue = ref([]);
const defaultValue = ref(["Apple", "Banana"]);

const showContent = (item) => {
  // console.log(item);
  if(modelValue.value.indexOf(item)===-1){
    modelValue.value.push(item);
  }
};

const clear = () => {
  modelValue.value.splice(0)
}
</script>

<style scoped>
.tag {
  font-size: 16px;
  background-color: darkgrey;
  color: black;
  margin-left: 10px;
  padding: 5px;
  cursor: pointer;
}
#clear {
  border: 1px solid gray;
  padding: 5px;

}
</style>
