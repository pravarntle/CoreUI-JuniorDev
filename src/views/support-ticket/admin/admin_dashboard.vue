  <template>
  <div class="box">
    <CRow>
      <count_ticket />
    </CRow>

    <CRow>
      <CCol xs="12">
        <CCard>
          <CCard xs="6">
            <CCardTitle>
              <CButton
                variant="ghost"
                class="border border-0 bg-body ms-auto d-flex"
                ><img :src="Close_fullscreen"
              /></CButton>
              
              <CCard>
                
              </CCard>
            </CCardTitle>
          </CCard>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>
  
  
  <script>
import { CCol, CRow } from '@coreui/vue-pro'
import count_ticket from '@/components/CountTicket.vue'
import Open_in_full from '@/assets/images/open_in_full.png'
import Close_fullscreen from '@/assets/images/close_fullscreen.png'
import { CChart } from '@coreui/vue-chartjs'
import { CIcon } from '@coreui/icons-vue'
export default {
  name: 'amin_dashboard',
  components: { CRow, CCol, count_ticket, CIcon },
  setup() {
    return {
      Open_in_full,
      Close_fullscreen,
    }
  },
}
</script>
  