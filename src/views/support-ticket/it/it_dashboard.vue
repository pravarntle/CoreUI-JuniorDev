<template>
  <div class="box">
    <CRow>
      <count_ticket />
    </CRow>

    <CCard class="d-flex docs-highlight" style="width: 66%; border-radius: 15px;">

      <CCard class="ps-3 flex-fill docs-highlight" style="width: 30%;">
        <h2 >Category Chart</h2>
      </CCard>

      <CCard class="d-inline w-50 h-75  " >
        <CChart
          style="height: 50px;"
          class="d-inline "
          type="doughnut"
          :data="{
            labels: ['Software', 'Hardware', 'Typeone', 'Typetwo', 'Service Request'],
            datasets: [
              {
                backgroundColor: ['#0071FF', '#EE5731', '#F860E9', '#62BB1E', '#F9A825'],
                data: [40, 20, 50, 50, 10],
                cutout: 80
              },
            ],
            
          }"
          :options="{
            
            plugins: {
              
              title: {
                display: true,
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

    

    <CCard class="mt-3 ps-3 pb-3" style="width: 66%;">
      <h2>Ticket Priority</h2>
      <div class="d-inline border border-white">
        <h5 class="d-inline ms-5">High</h5>
        <input disabled class="w-50 d-inline mx-5" type="range" value="20" min="1" max="100" oninput="this.nextElementSibling.value = this.value" >
        <output>20</output> %
      </div>

      <div class="d-inline border border-white">
        <h5 class="d-inline ms-5">Normal</h5>
        <input disabled class="w-50 d-inline ms-4 me-5 " type="range" value="10" min="1" max="100" oninput="this.nextElementSibling.value = this.value" >
        <output>10</output> %
      </div>

      <div class="d-inline border border-0">
        <h5 class="d-inline ms-5 me-2">Low</h5>
        <input disabled class="w-50 d-inline mx-5" type="range" value="70" min="1" max="100" oninput="this.nextElementSibling.value = this.value" >
        <output>70</output> %
      </div>
    </CCard>

    

    <!-- inbox -->
    
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

<style>
:disabled{
   overflow:hidden;
  -moz-range-track: none;
}

#myrange{
  -webkit-appearance: none;
  outline:none;
  border: 2px solid #ffffff;
  border-radius: 20px;
  box-shadow: inset 0 0 5px rgba(0,0,0,1);
 overflow:hidden;
}

#myrange::-webkit-slider-thumb{
      -webkit-appearance: none;
      border-radius:50%; 
      background:#000000;
      box-shadow: -410px 0 0 400px #007bff;
      cursor:pointer;
}
</style>