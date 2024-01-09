<template>
  <div class="box">
    <CRow>
      <count_ticket />
    </CRow>

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
                    >ALL TICKET</CCardSubtitle
                  >
                  <CCardText class="fs-1"
                    ><b>{{ countAll }}</b></CCardText
                  >
                  <hr />
                  <CCol class="d-flex align-items-center">
                    <ul>
                      <li id="software">
                        <span>Software</span>
                      </li>
                      <li id="hardware">
                        <span>Hardware</span>
                      </li>
                      <li id="ServiceRequest">
                        <span>Service Request</span>
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
                          text: 'all ticket',
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

        <CCard class="mt-3">
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
                <div class="col-md-2 col-sm-12 ps-5"><h5>High</h5></div>
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
                <div class="col-md-2 col-sm-12 ps-5"><h5>Medium</h5></div>
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
                <div class="col-md-2 col-sm-12 ps-5"><h5>Low</h5></div>
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
            </CCollapse>
          </CCardBody>
        </CCard>

        <!-- Support Tracker  -->
      </CCol>
      <CCol sm="4">
        <CCard class="mt-3">
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

            <CCardText class="fs-5 text-secondary">Last 7 Days</CCardText>

            <h1 id="support_tracker" class="text-body-secondary mt-0">
              {{ countAllWeek }}
            </h1>
          <CCollapse :visible="visibleA">
            <h5 class="pt-3 text-body-secondary">Total Ticket</h5>

            <CRow class="pt-5">
              <CCol sm="2" class="rounded-3 ms-1 pt-2" id="new_ticket">
                <CIcon
                  :icon="icon.cilPlus"
                  size="xxl"
                  class="icon_new_ticket"
                />
              </CCol>

              <CCol sm="10">
                <b class="fs-5">New Ticket</b>
                <p class="text-body-secondary">
                  {{ countPendingWeek || 0 }}
                </p>
              </CCol>
            </CRow>
            <CRow class="pt-3">
              <CCol sm="2" class="rounded-3 ms-1 pt-2" id="open_ticket">
                <CIcon
                  :icon="icon.cilCheckCircle"
                  size="xxl"
                  class="icon_open_ticket"
                />
              </CCol>
              <CCol sm="10">
                <b class="fs-5">Open Ticket</b>
                <p class="text-body-secondary">
                  {{ countOpenWeek || 0 }}
                </p>
              </CCol>
            </CRow>
            <CRow class="pt-3 mb-5">
              <CCol sm="2" class="rounded-3 ms-1 pt-2" id="response_time">
                <CIcon :icon="icon.cilClock" size="xxl" class="response_time" />
              </CCol>
              <CCol sm="10">
                <b class="fs-5">Close Ticket</b>
                <p class="text-body-secondary">
                  {{ countCloseWeek || 0 }}
                </p>
              </CCol>
            </CRow>
          </CCollapse>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>

    <!-- inbox -->
    <CCard class="d-block mt-2">
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
        <CSmartTable
          clickableRows
          :tableProps="{
            striped: true,
            hover: true,
          }"
          :activePage="2"
          header
          :items="items"
          :columns="columns"
          columnFilter
          tableFilter
          cleaner
          itemsPerPageSelect
          items-per-page-select
          :itemsPerPage="5"
          columnSorter
          :sorterValue="{ column: 'status', state: 'asc' }"
          pagination
        >
          <template #status="{ item }">
            <td>
              <CBadge :color="getBadge(item.status)"
                ><li>{{ item.status }}</li></CBadge
              >
            </td>
          </template>
          <template #type="{ item }">
            <td>
              <CBadge :color="getBadge(item.type)">{{ item.type }}</CBadge>
            </td>
          </template>

          <!-- <template #BOOKMARK="{ item, index }" >
            <td class="text-center">
              <CButton
                variant="outline"
                square
                size="xl"
                @click="toggleDetails(item, index)"
              >
              {{ Boolean(item.BOOKMARK) ? '👁️' : '🙈' }}
              </CButton>
            </td>
          </template> -->
          <template #MORE="{ item, index }">
            <td class="text-center">
              <CButton
                color="primary"
                variant="outline"
                square
                size="xl"
                @click="toggleButton(item, index)"
              >
                {{ Boolean(item.MORE) ? 'Hide' : 'Show' }}
              </CButton>
            </td>
          </template>
          <template #details="{ item, index }">
            <CCollapse :visible="Boolean(item.MORE)">
              <CCardBody>
                <h4>
                  {{ item.tkt_title }}
                </h4>
                <CButton
                  size="sm"
                  color="info"
                  class=""
                  @click="acceptTicket(item, index)"
                >
                  ติดต่อ It Suport
                </CButton>
                <CButton
                  size="sm"
                  color="danger"
                  class="ml-3"
                  @click="buttonCancel(item, index)"
                >
                  Cancel
                </CButton>
              </CCardBody>
            </CCollapse>
          </template>
        </CSmartTable>
      </div>
    </CCard>
  </div>
</template>

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
import moment from 'moment'

export default {
  components: { CRow, CCol, CChart, count_ticket, CIcon },
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
      visibleA: true,
      visibleB: true,
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

#new_ticket {
  background-color: #e8e7fb;
  width: 15%;
  height: 50%;
}

#open_ticket {
  background-color: #e5f7fb;
  width: 15%;
  height: 50%;
}

#response_time {
  background-color: #fdf0e4;
  width: 15%;
  height: 50%;
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
}
</style>
