<template>
  <div class="box">
    <CRow>
        <count_ticket/>
        <my_tickets/>
    </CRow>
  </div>
  <CElementCover v-if="loading" :opacity="0.5" />
</template>

<style>
</style>

<script setup>
// import { CCol, CRow } from '@coreui/vue-pro'
import { ref, onMounted } from 'vue'
import my_tickets from '@/components/MyTicket.vue'
import count_ticket from '@/components/CountTicket.vue'
// import { CBadge } from '@coreui/vue-pro'
const loading = ref(false)

//  on mounted
onMounted(() => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
})

// export default {
//   // name: 'SmartTableBasixExample',


//     components: { CRow, CCol , my_tickets , count_ticket},
    
//   }
</script>
