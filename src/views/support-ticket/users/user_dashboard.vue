<template>
  <div class="box">
    <CRow>
        <count_ticket/>
    </CRow>
      <my_tickets/>
    
  </div>
</template>


<script>
import { CCol, CRow } from '@coreui/vue-pro'

import my_tickets from '@/components/MyTicket.vue'
import count_ticket from '@/components/CountTicket.vue'
import { CBadge } from '@coreui/vue-pro'
export default {
  name: 'SmartTableBasixExample',


    components: { CRow, CCol , my_tickets , count_ticket},
    
  }
</script>
