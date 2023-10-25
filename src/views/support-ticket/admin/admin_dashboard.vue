  <template>
    <div class="box">
      <CRow>
        <count_ticket/>
      </CRow>
    </div>
  </template>
  
  
  <script>
   import { CCol, CRow } from '@coreui/vue-pro'
   import count_ticket from '@/components/count_ticket.vue'
  export default {
    name: 'amin_dashboard',
  
  
      components: { CRow, CCol , count_ticket},
      
    }
  </script>
  