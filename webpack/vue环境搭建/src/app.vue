<template>
  <div id="main" style="color:red">{{book.name}}</div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
type Book = {
  name: string;
  test:number
};
const b:Book = {name:'s',test:2}
console.log({...b})
export default defineComponent({
  data() {
    return {
      book: {
        name: "测试",
      } as Book,
    };
  },
});
</script>
<style scoped>
 #main{
   
   height: 100px;
   width: 100px;
 }
</style>