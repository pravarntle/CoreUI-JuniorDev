  <template>
    <div class="box" >
      <CRow>
        <count_ticket/>
      </CRow>
      <CRow >
        <CRow>
          <CCard style="width: 100%; height: auto; background: white; border-radius: 18px">
            <CCardBody>
              <CRow>
                <CCol style="height: auto; width: 30px;">
                  <h5>User Roles</h5>
                  <div>
                    <CIcon :icon="icon.cilCalendar" size="xxl"/>
                    <label>&nbsp; | 26 Jul 2021 </label>
                  </div>
                  <CChart
                    type="pie"
                    class="d-flex"
                    :data="{
                      labels: [
                      'Employee',
                      'IT Support',
                      'Admin',
                      'Manager',
                    ],
                    datasets: [
                      {
                        backgroundColor: [
                          '#0071FF',
                          '#EE5731',
                          '#F860E9',
                          '#62BB1E',
                        ],
                        data: [40, 20, 10, 5],
                      },
                    ],
                  }"
                  :options="{
                    plugins: {
                      legend: {
                        display: true,
                        position: 'left',
                        labels: {
                          usePointStyle: true,
                          fontSize: 12,
                          radius: 0,
                        },
                      },
                    },
                  }"
                />
                </CCol>
                <CCol class="vl"></CCol>
                <CCol style="height: auto;">
                  <h5>User Status</h5>
                    <label>| now update</label>
                  <CChart
                        type="pie"
                        class="d-flex"
                        :data="{
                          labels: [
                            'Active',
                            'Inactive'
                          ],
                          datasets: [
                            {
                              backgroundColor: [
                                '#0071FF',
                                '#EE5731'
                              ],
                              data: [60, 40],
                            },
                          ],
                        }"
                      :options="{
                        plugins: {
                          legend: {
                            display: true,
                            position: 'left',
                            labels: {
                              usePointStyle: true,
                              fontSize: 12,
                              radius: 0,
                            },
                          },
                        },
                      }"
                    />
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CRow>
        <CRow><br></CRow>
        <CRow>
          <CCard style="width: 100%; height: auto; background: white; border-radius: 18px">
            <CCardBody>
              <h1>Priority Category</h1>
              <div>
                <CIcon :icon="icon.cilCalendar" size="xxl"/>
                <label>&nbsp; | 26 Jul 2021 </label>
              </div>
              <hr>
              <PriorityChart />
            </CCardBody>
          </CCard>
        </CRow>
      </CRow>
      <UserList />
    </div>
  </template>
<style>
.vl {
  margin-left: 20%;
  border-left: 3px solid rgba(194, 197, 204, .5);
  height: auto;
}
</style>

<script>
  import { CIcon } from '@coreui/icons-vue';
  import * as icon from '@coreui/icons';
  import { CCard, CCardBody, CCol, CRow } from '@coreui/vue-pro'
  import count_ticket from '@/components/CountTicket.vue'
  import PriorityChart from '../../../components/PriorityBar.vue'
  import UserList from '@/components/UserList.vue'
  import { CChart } from '@coreui/vue-chartjs';
  export default {
    name: 'admin_dashboard',
    components: {
      CRow,
      CCol,
      count_ticket,
      PriorityChart,
      CCard,
      CCardBody,
      UserList,
      CIcon,
      CChart
    },
    setup() {
    return {
      icon,
    }
  }
}
</script>
