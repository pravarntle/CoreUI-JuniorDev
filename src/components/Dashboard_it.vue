<template>
  <div class="box">
    <CRow>
      <CCol sm="8">
        <CCard class="mt-3 chart-container">
          <CCardBody>
            <CCardTitle class="d-flex fs-2"
              ><b>Category Chart</b>
              <CButton
                variant="ghost"
                class="border border-0 bg-body ms-auto d-flex"
                @click="
                  () => {
                    visibleA = !visibleA
                    visibleB = !visibleB
                  }
                "
                ><img :src="Close_fullscreen"
              /></CButton>
            </CCardTitle>
            <CCollapse :visible="visibleA">
              <CRow>
                <CCol>
                  <CCardSubtitle class="text-muted fs-1"
                    >All Ticket</CCardSubtitle
                  >
                  <CCardText class="fs-1"
                    ><b>{{ countAll }}</b></CCardText
                  >
                  <hr />
                  <CCol class="d-flex align-items-center">
                    <ul>
                      <li id="software">
                        <span class="me-2">Software </span>
                        <span class="ms-5">{{ countSoftware }}</span>
                      </li>
                      <li id="hardware">
                        <span class="me-2">Hardware</span>
                        <span class="ms-5">{{ countHardware }}</span>
                      </li>
                      <li id="ServiceRequest">
                        <span>Service Request</span>
                        <span class="ms-2 p-1">{{ countServiceRequest }}</span>
                      </li>
                    </ul>
                  </CCol>
                </CCol>
                <CCol>
                  <CChart
                    class="pie_chart"
                    type="pie"
                    :data="{
                      labels: ['Software', 'Hardware', 'Service Request'],
                      datasets: [
                        {
                          backgroundColor: ['#0071ff', '#f9a825', '#ee5731'],
                          data: [
                            countSoftware,
                            countHardware,
                            countServiceRequest,
                          ],
                        },
                      ],
                    }"
                    :options="{
                      plugins: {
                        title: {
                          display: true,
                          text: 'All ticket',
                        },
                        legend: {
                          display: false, // ตั้งค่าเป็น false เพื่อที่จะซ่อน Legend
                        },
                      },
                    }"
                  />
                </CCol>
              </CRow>
            </CCollapse>
          </CCardBody>
          <!-- Ticket Priority  -->
        </CCard>

        <CCard class="mt-3 pt-2 pb-4 chart-container">
          <CCardBody>
            <CCardTitle class="d-flex fs-2"
              ><b>Ticket Priority</b>
              <CButton
                variant="ghost"
                class="border border-0 bg-body ms-auto d-flex"
                @click="
                  () => {
                    visibleA = !visibleA
                    visibleB = !visibleB
                  }
                "
                ><img :src="Close_fullscreen"
              /></CButton>
            </CCardTitle>
            <CCollapse :visible="visibleA">
              <div class="row align-items-center border border-white">
                <div class="col-md-2 col-sm-12 ps-5">
                  <h6>High</h6>
                </div>
                <div class="col-md-7 col-sm-12 ps-5">
                  <input
                    class="w-100"
                    type="range"
                    :value="percentHigh"
                    min="1"
                    max="100"
                    oninput="this.nextElementSibling.value = this.value"
                  />
                </div>
                <output class="col-md-3 col-sm-12 ps-5"
                  >{{ percentHigh }}%</output
                >
              </div>

              <br />
              <div class="row align-items-center border border-white">
                <div class="col-md-2 col-sm-12 ps-5">
                  <h6>Medium</h6>
                </div>
                <div class="col-md-7 col-sm-12 ps-5">
                  <input
                    class="w-100"
                    type="range"
                    :value="percentMedium"
                    min="1"
                    max="100"
                    oninput="this.nextElementSibling.value = this.value"
                  />
                </div>
                <output class="col-md-3 col-sm-12 ps-5"
                  >{{ percentMedium }}%</output
                >
              </div>
              <br />
              <div class="row align-items-center border border-white">
                <div class="col-md-2 col-sm-12 ps-5">
                  <h6>Low</h6>
                </div>
                <div class="col-md-7 col-sm-12 ps-5">
                  <input
                    class="w-100"
                    type="range"
                    :value="percentLow"
                    min="1"
                    max="100"
                    oninput="this.nextElementSibling.value = this.value"
                  />
                </div>
                <output class="col-md-3 col-sm-12 ps-5"
                  >{{ percentLow }}%</output
                >
              </div>
              <br />
              <div class="row align-items-center ">
                <div class="col-md-2 col-sm-12 ps-5">
                  <h6>Other</h6>
                </div>
                <div class="col-md-7 col-sm-12 ps-5">
                  <input class="w-100" type="range" :value="percenOther" min="1" max="100"
                    oninput="this.nextElementSibling.value = this.value" />
                </div>
                <output class="col-md-3 col-sm-12 ps-5">{{ percenOther }}%</output><br/>
              </div>
            </CCollapse>
          </CCardBody>
        </CCard>

        <!-- Support Tracker  -->
      </CCol>
      <CCol sm="4">
        <CCard class="mt-3 chart-container">
          <CCardBody class="ps-4">
            <CCardTitle class="d-flex fs-2"
              ><b>Support Tracker</b>
              <CButton
                variant="ghost"
                class="border border-0 bg-body ms-auto d-flex"
                @click="
                  () => {
                    visibleA = !visibleA
                    visibleB = !visibleB
                  }
                "
                ><img :src="Close_fullscreen"
              /></CButton>
            </CCardTitle>

            <CCardText class="text-secondary"></CCardText>
            <CFormInput
              type="month"
              id="selected-month"
              v-model="selectedMonth"
              @change="onMonthChange"
            >
              <template #label>Mont Pick</template>
            </CFormInput>
            <CCollapse :visible="visibleA">
              <CCardText id="support_tracker" class="mt-0">
                {{ countAllWeek }}
                <CCardText class="pt-3 text-body-secondary fs-5"
                  >Total Ticket</CCardText
                >
              </CCardText>
              <CRow class="d-flex align-items-center mb-4">
                <CCol class="rounded-3 ms-1 pt-2 with-flex" id="new_ticket">
                  <CImage
                    :src="newticketicon"
                    alt="New Ticket Icon"
                    width="54"
                    height="54"
                    class="icon_new_ticket"
                  />
                  <CCol class="with-margin-left">
                    <CCardText class="fs-5 mb-1">New Tickets</CCardText>
                    <CCardText class="text-body-secondary">{{
                      countPendingWeek || 0
                    }}</CCardText>
                  </CCol>
                </CCol>
              </CRow>

              <CRow class="d-flex align-items-center mb-4">
                <CCol class="rounded-3 ms-1 pt-2 with-flex" id="open_ticket">
                  <CImage
                    :src="OpenTickets"
                    alt="Open Ticket Icon"
                    width="54"
                    height="54"
                    class="icon_Open_ticket"
                  />
                  <CCol class="with-margin-left">
                    <CCardText class="fs-5 mb-1"
                      >Open Tickets
                      <CCardText class="text-body-secondary">
                        {{ countOpenWeek || 0 }}
                      </CCardText>
                    </CCardText>
                  </CCol>
                </CCol>
              </CRow>
              <CRow class="d-flex align-items-center mb-4">
                <CCol class="rounded-3 ms-1 pt-2 with-flex" id="closed_ticket">
                  <CImage
                    :src="ClosedTicket"
                    alt="Closed Ticket Icon"
                    width="54"
                    height="54"
                    class="icon_Close_ticket"
                  />
                  <CCol class="with-margin-left">
                    <CCardText class="fs-5 mb-1"
                      >Closed Tickets
                      <CCardText class="text-body-secondary">
                        {{ countCloseWeek || 0 }}
                      </CCardText>
                    </CCardText>
                  </CCol>
                </CCol>
              </CRow>
              <br />
            </CCollapse>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import { ref } from 'vue'
import { CCardText, CCol, CRow } from '@coreui/vue-pro'
import count_ticket from '@/components/CountTicket.vue'
import { CChart } from '@coreui/vue-chartjs'
import { CIcon } from '@coreui/icons-vue'
import axios, { all } from 'axios'
import * as icon from '@coreui/icons'
import Open_in_full from '@/assets/images/open_in_full.png'
import Close_fullscreen from '@/assets/images/close_fullscreen.png'
import moment from 'moment'
import newticketicon from '@/assets/images/newticketicon.png'
import OpenTickets from '@/assets/images/OpenTickets.png'
import ClosedTicket from '@/assets/images/ClosedTicket.png'
import Iconinbox from '@/assets/images/Icon_Inbox.png'

export default {
  name: 'dashboard_it',
  components: { CRow, CCol, CChart, count_ticket, CIcon, CCardText },
  setup() {
    return {
      Open_in_full,
      Close_fullscreen,
      icon,
      newticketicon,
      OpenTickets,
      ClosedTicket,
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
      visibleA: true,
      visibleB: true,
      Iconinbox: Iconinbox,
      selectedMonth: moment().format('YYYY-MM'),
      countOther: 0,
      percenOther:''
    }
  },
  methods: {
    async acceptTicket(item) {
      const itemId = item._id.toString()

      this.$router.push({ name: 'ST - it/it_accept_task', params: { itemId } })
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
            populate: [
              'tkt_priorities',
              'tkt_act',
            ],
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
          start_date: element.tkt_time,
          status: element.tkt_status,
          type: element.tkt_types,
          title: element.tkt_title,
          priorities: element.tkt_priorities,
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
          this.percentHigh = ((this.countHigh / this.countAll) * 100).toFixed(1)
          this.percentMedium = (
            (this.countMedium / this.countAll) *
            100
          ).toFixed(1)
          this.percentLow = ((this.countLow / this.countAll) * 100).toFixed(1)
          this.percenOther = ((this.countOther / this.countAll) * 100).toFixed(1);
        })
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    async getTicketOnMonth() {
      try {
        const startDate = this.selectedMonth
          ? moment(this.selectedMonth).startOf('month').toISOString()
          : null
        const endDate = this.selectedMonth
          ? moment(this.selectedMonth).endOf('month').toISOString()
          : null

        // Use startDate and endDate to filter tickets within the selected month and year
        const response = await axios.post(
          `${process.env.VUE_APP_URL}/mongoose/get/stts_tickets`,
          {
            where: {
              tkt_status: { $ne: 'Cancel' },
              tkt_last_update: {
                $gte: startDate,
                $lte: endDate,
              },
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
            element.tkt_status == 'Closed' ||
            element.tkt_status == 'Closed Bug'
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
    onMonthChange() {
      this.countOpenWeek = 0
      this.countAllWeek = 0
      this.countPendingWeek = 0
      this.countCloseWeek = 0
      console.log(this.selectedMonth)
      this.getTicketOnMonth()
    },
  },
  mounted() {
    //เรียกใช้ฟังชั่นเมื่อโหลดหน้า
    this.getTicketPending()
    this.getAllTicket()
    this.getTicketOnMonth()
  },
}
</script>

<style>
input[type='range'] {
  height: 8px;
  pointer-events: none;
  /* ป้องกันการเลื่อน */
  opacity: 0.7;
  /* ความโปร่งใส */
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
  overflow: hidden;
  -moz-range-track: none;
}

output {
  pointer-events: none;
  /* ป้องกันการคลิก */
}

.chart-container {
  position: relative;
  border-radius: 18px;
}

#style-ticket-id {
  color: #5e5adb;
}

.style-bookmark {
  padding-bottom: 10px;
  margin-right: 50px;
}

.style-action {
  margin-right: 10px;
}

.style-button {
  max-width: 20px;
  max-height: 20px;
}

#style-underline {
  width: 140px;
  border-bottom: 2px solid transparent;
  border-image: linear-gradient(to right, red, blue);
  border-image-slice: 1;
}

.clearfix {
  flex-shrink: 0;
}

.text-end {
  padding-left: 0px;
  flex-shrink: 0;
  color: #000;
  padding-left: 0%;
  margin-left: 0px;
}

.line {
  margin-top: auto;
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

#software {
  color: #0071ff;
  font-size: 24px;
}

#hardware {
  color: #f9a825;
  font-size: 24px;
}

#ServiceRequest {
  color: #ee5731;
  font-size: 24px;
}

#support_tracker {
  font-size: 50px;
}

#custom_icon_header {
  width: auto;
  height: 30px;
}

#underline_header {
  display: inline-block;
  border-bottom: 5px solid transparent;
  border-image: linear-gradient(to right, #ea5252, #030303);
  border-image-slice: 1;
  padding: 3px;
}

#style-icon-support-tracker {
  width: '54';
  height: '54';
}

span {
  color: black;
  font-size: 16px;
}

#support_tracker {
  font-size: 80px;
}

.fs-5 {
  color: grey;
}

.with-margin-left {
  margin-left: 10px;
}

.with-flex {
  display: flex;
  align-items: center;
}
</style>
