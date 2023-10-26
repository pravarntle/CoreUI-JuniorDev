<template>
    <div class="box">
        <my_tickets/>
      
    </div>
  </template>
  
  
  <script>
  import { CCol, CRow } from '@coreui/vue-pro'
  
  import my_tickets from '@/components/my_tickets.vue'
  import { CBadge } from '@coreui/vue-pro'
  export default {
    name: 'SmartTableBasixExample',
  
  
      components: { CRow, CCol , my_tickets },
      
    }
  </script>
  