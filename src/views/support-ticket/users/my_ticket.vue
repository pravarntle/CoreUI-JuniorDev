<template>
    <div class="box">
        <my_tickets :showBookmark="true"/>
      
    </div>
  </template>
  
  
  <script>
  import { CCol, CRow } from '@coreui/vue-pro'
  
  import my_tickets from '@/components/MyTicket.vue'
  import { CBadge } from '@coreui/vue-pro'
  export default {
    name: 'SmartTableBasixExample',
  
  
      components: { CRow, CCol , my_tickets },
      
    }
  </script>
  