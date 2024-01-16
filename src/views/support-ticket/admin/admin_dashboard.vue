<template>
  <div class="box">
    <CRow>
      <CCol>
      <count_ticket />
      </CCol>
    </CRow>

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
                                <span>20</span>
                              </li>
                              <li class="list_roles">
                                <span>14</span>
                              </li>
                              <li class="list_roles">
                                <span>5</span>
                              </li>
                              <li class="list_roles">
                                <span>5</span>
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
                                data: [20, 10, 5, 2],
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
                                <span>20</span>
                              </li>
                              <li class="list_roles">
                                <span>14</span>
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
                                data: [40, 60],
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

    <CRow>
      <CCol>
        <CCard class="mt-3">
          <CCardTitle>
            <CButton
              variant="ghost"
              class="border border-0 bg-body ms-auto d-flex"
              ><img :src="Close_fullscreen"
            /></CButton>
          </CCardTitle>
          <CCardBody>
            <h1>Priority Category</h1>
            
            <hr />
            <PriorityChart />
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
  components: { CRow, CCol, CChart, count_ticket, CIcon, PriorityChart },
  setup() {
    const columns = [
      {
        key: 'number',
        label: '#',
        _style: { width: '10%' },
      },
      {
        key: 'ticket_id',
        label: 'TICKET ID',
        _style: { width: '10%' },
      },
      {
        key: 'owner',
        label: 'OWNER',
        _style: { width: '15%' },
      },
      {
        key: 'start_date',
        label: 'START DATE(D/M/Y)',
        _style: { width: '15%' },
      },
      {
        key: 'status',
        label: 'STATUS',
        _style: { width: '10%' },
      },
      {
        key: 'type',
        label: 'TYPE',
        _style: { width: '10%' },
      },
      // {
      //   key: 'book_mark',
      //   label: 'BOOKMARK',
      //   _style: { width: '10%' },
      //   filter: false,
      //   sorter: false,
      // },
      { key: 'MORE', _style: { width: '5%' }, filter: false, sorter: false },
    ]
    const items = ref([])
    const getBadge = (tkt_status) => {
      switch (tkt_status) {
        case 'Pending':
          return 'warning'
        case 'Open':
          return 'primary'
        case 'Closed':
          return 'danger'
        default:
          return 'secondary' // Return a default color if none of the cases match.
      }
    }

    const toggleDetails = async (item) => {
      item.BOOKMARK = !item.BOOKMARK
      console.log(item.BOOKMARK)
      console.log(item)
      try {
        const itemId = item._id.toString()
        // ทำการอัปเดตข้อมูลใน MongoDB โดยใช้ Axios
        await axios.put(
          `${process.env.VUE_APP_URL}/mongoose/update/stts_tickets/${itemId}`,
          {
            data: {
              tkt_book: item.BOOKMARK,
            },
          },
        )

        // หลังจากอัปเดตสำเร็จ คุณสามารถทำสิ่งอื่นที่คุณต้องการได้ที่นี่
        console.log('อัปเดต BOOKMARK และส่งข้อมูลไปยัง MongoDB สำเร็จ')
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการอัปเดตข้อมูล:', error)
      }
    }
    return {
      columns,
      items,
      getBadge,
      toggleDetails,
      Open_in_full,
      Close_fullscreen,
      icon,
    }
  },
  data() {
    return {
      countAll: '',
      countSoftware: '',
      countHardware: '',
      countServiceRequest: '',
      countHigh: '',
      countMedium: '',
      countLow: '',
      percentLow: '',
      percentHigh: '',
      percentMedium: '',
      countAllWeek: '',
      countOpenWeek: '',
      countPendingWeek: '',
      countCloseWeek: '',
    }
  },
  methods: {
    async contactIt(item) {
      const itemId = item._id.toString()

      this.$router.push({ name: 'ST - comment Ticket', params: { itemId } })
      console.log('Item ID:', itemId)
    },
    async buttonCancel(item) {
      try {
        const itemId = item._id.toString()
        // ทำการอัปเดตข้อมูลใน MongoDB โดยใช้ Axios
        await axios.put(
          `${process.env.VUE_APP_URL}/mongoose/update/stts_tickets/${itemId}`,
          {
            data: {
              tkt_status: 'Cancel',
            },
          },
        )

        // หลังจากอัปเดตสำเร็จ คุณสามารถทำสิ่งอื่นที่คุณต้องการได้ที่นี่
        console.log('อัปเดต BOOKMARK และส่งข้อมูลไปยัง MongoDB สำเร็จ')
        // รีเฟรชหน้า
        window.location.reload()
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการอัปเดตข้อมูล:', error)
      }
    },
    async toggleButton(item) {
      item.MORE = !item.MORE
    },
    async getTicketPending() {
      try {
        const response = await axios.post(
          `${process.env.VUE_APP_URL}/mongoose/get/stts_tickets`,
          {
            where: {
              tkt_status: 'Pending',
            },
            populate: 'tkt_act',
          },
        )
        console.log(response.data)
        // นำข้อมูลที่ได้รับมาใส่ในตัวแปร items
        this.items = response.data.map((element, index) => ({
          number: index + 1, // หมายเลขแถว
          _id: element._id,
          ticket_id: element.tkt_number, // ข้อมูล TicketID จาก response
          owner: `${
            element.tkt_act.act_first_name_eng
          } ${element.tkt_act.act_last_name_eng.charAt(0)}.`, // ข้อมูล tkt_title จาก response
          // นำข้อมูลอื่นๆ จาก response มาใส่ตามที่คุณต้องการ
          // ตามลำดับของ columns ในตัวแปร columns
          // เพิ่มเติมตามความต้องการ
          start_date: element.tkt_time,
          status: element.tkt_status,
          type: element.tkt_types,
          _toggled: false, // ให้เริ่มต้นเป็น false สำหรับการแสดงรายละเอียด
        }))
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    async getAllTicket() {
      try {
        const response = await axios.post(
          `${process.env.VUE_APP_URL}/mongoose/get/stts_tickets`,
          {
            where: {
              tkt_status: { $ne: 'Cancel' },
            },
            populate: 'tkt_act',
          },
        )

        response.data.forEach((element) => {
          this.countAll++
          if (element.tkt_types == 'Software') {
            this.countSoftware++
          } else if (element.tkt_types == 'Hardware') {
            this.countHardware++
          } else if (element.tkt_types == 'Service') {
            this.countServiceRequest++
          }
          if (element.tkt_priorities == 'High') {
            this.countHigh++
          } else if (element.tkt_priorities == 'Medium') {
            this.countMedium++
          } else if (element.tkt_priorities == 'Low') {
            this.countLow++
          }
          this.percentHigh = Math.round((this.countHigh / this.countAll) * 100)
          this.percentMedium = Math.round(
            (this.countMedium / this.countAll) * 100,
          )
          this.percentLow = Math.round((this.countLow / this.countAll) * 100)
        })
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    async getTicketOnWeek() {
      try {
        const currentDate = moment() // Get the current date
        const sevenDaysAgo = currentDate.clone().subtract(7, 'days') // Calculate 7 days ago

        const response = await axios.post(
          `${process.env.VUE_APP_URL}/mongoose/get/stts_tickets`,
          {
            where: {
              tkt_status: { $ne: 'Cancel' },
              tkt_time: { $gte: sevenDaysAgo.toISOString() }, // Filter by date within the last 7 days
            },
            populate: 'tkt_act',
          },
        )

        response.data.forEach((element) => {
          this.countAllWeek++

          if (element.tkt_status == 'Open') {
            this.countOpenWeek++
          } else if (element.tkt_status == 'Pending') {
            this.countPendingWeek++
          } else if (
            element.tkt_status == 'Close' ||
            element.tkt_status == 'Close Bug'
          ) {
            this.countCloseWeek++
          }
        })

        console.log(response.data)
        // Handle the retrieved data as needed
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
  },
  mounted() {
    //เรียกใช้ฟังชั่นเมื่อโหลดหน้า
    this.getTicketPending()
    this.getAllTicket()
    this.getTicketOnWeek()
  },
}
</script>

<style>
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
  padding-top: 30px;
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
