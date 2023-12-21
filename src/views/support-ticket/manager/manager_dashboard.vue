<template>
  <div class="box" style="width: 100%">
    <CRow>
      <count_ticket/>
    </CRow>
    <CRow style="height: auto;">
      <CCol style="width: 30%;">
        <CCard>
          <CCardBody>
            <h4>Support Tracker</h4>
            <p>Last 7 Days</p>
            <br>
            <h1>164</h1>
            <h4>Total Tickets</h4>
            <br><br>
          </CCardBody>
        </CCard>

      </CCol>
      <CCol style="width: 30%;">
        <CRow>
          <CCard>
            <CCardBody>
              <CRow>
                <CCol>
                  <h1 stype="Bold">Type Chart</h1>
                </CCol>
                <CCol>
                  <CChartDoughnut :data="defaultData"
                  style="height: 300px; max-height: 300px; margin-top: 40px"/>
                </CCol>
              </CRow>
            </CCardBody>
        </CCard>
        </CRow>
        <CRow>
          <h2>2nd line</h2>
        </CRow>
      </CCol>
    </CRow>

  </div>

</template>


<script>
import { CCol, CRow} from '@coreui/vue-pro'
import { CChartDoughnut } from '@coreui/vue-chartjs'
import count_ticket from '@/components/CountTicket.vue'

const doughnutLabel = {
  id: 'doughnutLabel'
}

export default {
  name: 'CChartDoughnut',
  components: {
    CRow,
    CCol,
    CChartDoughnut,
    count_ticket },
  computed: {
    defaultData() {
      return {
        labels: ['VueJs', 'EmberJs', 'VueJs', 'AngularJs'],
        datasets: [
          {
            backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
            data: [40, 20, 80, 10],
          },
        ],
        plugins: [doughnutLabel]
      }
    },
  },
}
</script>
