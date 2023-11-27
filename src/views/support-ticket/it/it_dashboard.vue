<template>
  <div class="box">
    <CRow>
      <count_ticket />
    </CRow>

    <CCard>
      <CCard class="d-flex flex-row-reverse">
        <CChart
          class="ItCharetDoughnut w-25 d-inline"
          type="doughnut"
          width="1000"
          :data="{
            labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
            datasets: [
              {
                backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
                data: [40, 20, 80, 10],
                cutout: 70
              },
            ],
            
          }"
          :options="{
            
            plugins: {
              
              title: {
                display: true,
                text: 'ALL ticket',
              },
              legend: {
                display: true,
                position: 'left',
                labels: {
                  usePointStyle: true, // ใช้รูปจุดแทนข้อความ
                },
              },
              
            },
          }"
        />
      </CCard>
    </CCard>

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
                  @click="contactIt(item, index)"
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
import axios from 'axios'
import * as icon from '@coreui/icons'
import Chart from 'chart.js/auto'

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
      icon,
    }
  },
  data() {
    return {}
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
    async getTicket() {
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
  },
  mounted() {
    //เรียกใช้ฟังชั่นเมื่อโหลดหน้า
    this.getTicket()
  },
}
</script>
