<template>
  <div class="box">
    <CRow>
      <CCol>
        <CCard class="mt-3 chart-container rounded-4">
          <CCardTitle>
            <CButton
              variant="ghost"
              class="border border-0 bg-body ms-auto d-flex"
              ><img :src="Close_fullscreen"
            /></CButton>
          </CCardTitle>
          <CCardBody>
            <CRow>
              <CCol class="ms-5">
                <CRow>
                  <CCol>
                    <CRow>
                      <!-- User Roles -->
                      <CCol xxl="2" xl="6">
                        <CCardText class="pt-2 fs-2">User Roles</CCardText>
                        <CCardText class="ps-2 fs-5 text-black-50">| now update</CCardText>
                        <div class="d-flex">
                          <div style="width: 50px">
                            <ul>
                              <li id="employee">
                                <span>Employee</span>
                              </li>
                              <li id="it_support">
                                <span>IT Support</span>
                              </li>
                              <li id="admin">
                                <span>Admin</span>
                              </li>
                              <li id="manager">
                                <span>Manager</span>
                              </li>
                            </ul>
                          </div>
                          <div>
                            <ul class="text-end">
                              <li class="list_roles">
                                <span>{{countEmployee}}</span>
                              </li>
                              <li class="list_roles">
                                <span>{{countItSup}}</span>
                              </li>
                              <li class="list_roles">
                                <span>{{countAdmin}}</span>
                              </li>
                              <li class="list_roles">
                                <span>{{countManager}}</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </CCol>
                      <CCol xxl="3" xl="6">
                        <CChart
                          class="pie_chart"
                          type="pie"
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
                                  '#2EB85C',
                                  '#F91818',
                                  '#281AC8',
                                  '#F9B115',
                                ],
                                data: [countEmployee, countItSup, countAdmin, countManager],
                              },
                            ],
                          }"
                          :options="{
                            plugins: {
                              title: {
                                display: true,
                              },
                              legend: {
                                display: false, // ตั้งค่าเป็น false เพื่อที่จะซ่อน Legend
                              },
                            },
                          }"
                        />
                      </CCol>

                      <CCol class="vl"></CCol>
                      <!-- Chart User status -->
                      <CCol xxl="2" xl="6">
                        <CCardText class="pt-2 fs-2">User Status</CCardText>
                        <CCardText class="ps-2 fs-5 text-black-50">| now update</CCardText>
                        <div class="d-flex">
                          <div style="width: 50px">
                            <ul>
                              <li id="active">
                                <span>Active</span>
                              </li>
                              <li id="inactive">
                                <span>Inactive</span>
                              </li>
                            </ul>
                          </div>
                          <div>
                            <ul class="text-end">
                              <li class="list_roles">
                                <span>{{countActive}}</span>
                              </li>
                              <li class="list_roles">
                                <span>{{ countInactive}}</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </CCol>
                      <CCol xxl="3" xl="6">
                        <CChart
                          class="pie_chart"
                          type="pie"
                          :data="{
                            labels: ['Active', 'Inactive'],
                            datasets: [
                              {
                                backgroundColor: ['#2EB85C', '#A5AFBF'],
                                data: [countActive, countInactive],
                              },
                            ],
                          }"
                          :options="{
                            plugins: {
                              title: {
                                display: true,
                              },
                              legend: {
                                display: false, // ตั้งค่าเป็น false เพื่อที่จะซ่อน Legend
                              },
                            },
                          }"
                        />
                      </CCol>
                    </CRow>
                  </CCol>
                </CRow>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>

    <!-- inbox -->
    <!-- <CCard class="d-block mt-2">
      <h1
        class="d-block ms-2"
        style="
          width: 140px;
          border-bottom: 2px solid transparent;
          border-image: linear-gradient(to right, red, blue);
          border-image-slice: 1;
          lable: asd;
        "
      >
        <CIcon :icon="icon.cilInbox" size="xxl" />Inbox
      </h1>
      <div class="table-responsive table-borderless">
        <UserList/>
      </div>
    </CCard> -->
  </div>
</template>
<style>
.vl {
  margin-left: 5%;
  border-left: 3px solid rgba(194, 197, 204, 0.5);
  height: auto;
}
@media screen and (max-width: 1440px) {
  .vl {
    display: none; /* ซ่อน element เมื่อหน้าจอเล็กกว่าหรือเท่ากับ 600px */
  }
}
</style>

<script>
import { ref } from 'vue'
import { CCol, CRow } from '@coreui/vue-pro'
import count_ticket from '@/components/CountTicket.vue'
import { CChart } from '@coreui/vue-chartjs'
import { CIcon } from '@coreui/icons-vue'
import axios, { all } from 'axios'
import * as icon from '@coreui/icons'
import Open_in_full from '@/assets/images/open_in_full.png'
import Close_fullscreen from '@/assets/images/close_fullscreen.png'
import UserList from '@/components/UserList.vue'
import moment from 'moment'
import PriorityChart from '@/components/PriorityBar.vue'

export default {
  name: 'dashboard_manager',
  components: { CRow, CCol, CChart, count_ticket, CIcon,},
  setup() {
    return {
      Open_in_full,
      Close_fullscreen,
      icon,
    }
  },
  data() {
    return {
      countActive: '0',
      countEmployee: '0',
      countItSup: '0',
      countAdmin: '0',
      countManager: '0',
      countInactive: '0',

    }
  },
  methods: {
    async getAllAccounts() {
      try {
        const response = await axios.post(
          `${process.env.VUE_APP_URL}/mongoose/get/stts_accounts`,
          {
            populate: 'act_role',
          },
        )
        response.data.forEach((element) => {
          if(element.act_status=='Delete'){
              this.countInactive++
          }else{
           
              this.countActive++
              if (element.act_role.rol_name === 'Employee') {
                this.countEmployee++
              } else if (element.act_role.rol_name === 'ItSupport') {
                this.countItSup++
              } else if (element.act_role.rol_name === 'Admin') {
                this.countAdmin++
              } else if (element.act_role.rol_name === 'Manager') {
                this.countManager++
              }
            

            
          }
        })
         

        
        console.log(this.countAdmin)
        console.log(this.countItSup)
        console.log(this.countEmployee)
        console.log(this.countManager)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    
   
    
  },
  mounted() {
    //เรียกใช้ฟังชั่นเมื่อโหลดหน้า
    this.getAllAccounts();
  },
}
</script>

<style scoped>
input[type='range'] {
  height: 8px;
  pointer-events: none; /* ป้องกันการเลื่อน */
  opacity: 0.7; /* ความโปร่งใส */
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
  overflow: hidden;
  -moz-range-track: none;
}

output {
  pointer-events: none; /* ป้องกันการคลิก */
}

.chart-container {
  position: relative;
}

.custom-text {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(-50%);
  text-align: right;
  font-size: 16px;
  color: black;
  /* สไตล์เพิ่มเติมตามความต้องการ */
}

.pie_chart {
  height: 300px;
  width: 300px;
}

#employee {
  color: #2eb85c;
  font-size: 24px;
}

#it_support {
  color: #f91818;
  font-size: 24px;
}

#admin {
  color: #281ac8;
  font-size: 24px;
}

#manager {
  color: #f9b115;
  font-size: 24px;
}

#active {
  color: #2eb85c;
  font-size: 24px;
}

#inactive {
  color: #a5afbf;
  font-size: 24px;
}

li {
  font-size: 24px;
}

.list_roles {
  list-style-type: none;
  width: 80px;
}

.icon_new_ticket {
  margin-bottom: 10px;
  color: #7167e8;
}

.icon_open_ticket {
  margin-bottom: 10px;
  color: #69cfe6;
}

.response_time {
  margin-bottom: 10px;
  color: #f2a356;
}

span {
  color: black;
  font-size: 16px;
  font-weight: bold;
}

.d-flex ul {
  width: 170px;
}
</style>
