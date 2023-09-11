<template>
  <div>
      <h1>{{ mydata }}</h1>
      <input type="text" v-model = "mydata">
      <br>
      <br>
      <button @click="updateCount()" type="button">
          {{ count }} </button>

      <br><br>
      <h1 v-if="count >= 11 "> count &ge; 11 - show</h1>
      <h1 v-else="count < 11"> count &lt; 11 - hidden</h1>
      <ul>
          <li v-for="(item, index) in data_list"
              :key="'dl_' +index">
              {{ index+1 }} - {{ item }}
          </li>
      </ul>
      <hr>
      <h1>แม่สูตรคูณ</h1>
      <input type="number" id="number" />
      <br /><br /><br />
      <div id="result"></div>





  </div>
</template>

<script setup lang="ts">

import {ref} from 'vue';

let mydata = ref("Data");
let count = ref(0);

let data_list = ref(['a','b','c'])

function updateCount() {
  count.value++;

}






</script>


<style scoped>
input, button{
  height: 30px;
  width: 200px;
  font-size: 16pt;

}

ul{
  font-size: 20px;
}
</style>
