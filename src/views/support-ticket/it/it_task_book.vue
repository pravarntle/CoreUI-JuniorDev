<template>
  <CCard class="p-2 rounded-4">
    <CCardHeader class="bg-white border-white">
      <div class="d-inline ms-2">
        <div id="underline_header">
          <CImage class="me-2 align-middle" id="custom_icon_header" :src="LGlogo" />
          <h2 class="d-inline align-middle"><b>My Bookmark Tasks</b></h2>
        </div>


      </div>
    </CCardHeader>
    <div class="table-responsive table-borderless">
      <CSmartTable :active-page="1" header cleaner :items="items" :columns="columns" columnFilter column-sorter
        clickable-rows table-filter :items-per-page="5" items-per-page-select pagination columnSorter
        :sorterValue="{ column: 'status', state: 'asc' }" :table-props="{
          striped: true,
          hover: true,
        }">
        <template #STATUS="{ item }">
          <td>
            <CBadge :color="getBadge(item.STATUS)">{{ item.STATUS }}</CBadge>
          </td>
        </template>
        <template #TYPE="{ item }">
          <td>
            <CBadge :color="getBadge(item.TYPE)">{{ item.TYPE }}</CBadge>
          </td>
        </template>
        <template #book_mark="{ item, index }">
          <td class="text-center">
            <CButton variant="outline" square size="xl" @click="toggleDetails(item, index)">
              {{ Boolean(item.book_mark) ? '👁️' : '🙈' }}
            </CButton>
          </td>
        </template>
        <template #MORE="{ item, index }">
          <td class="text-center">
            <CButton color="primary" variant="outline" square size="xl" @click="toggleButton(item, index)">
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
              <CButton size="sm" color="info" class="" @click="contactIt(item, index)">
                CheckTicket
              </CButton>
              <CButton size="sm" color="danger" class="ml-3" @click="buttonCancel(item, index)">
                Cancel
              </CButton>
            </CCardBody>
          </CCollapse>
        </template>
      </CSmartTable>
    </div>
  </CCard>
  <CToaster placement="top-end">
    <CToast visible color="info" v-for="toast in toastProp">
      <CToastHeader closeButton v-if="toast.title">
        <span class="me-auto fw-bold">{{ toast.title }}</span>
      </CToastHeader>
      <CToastBody v-if="toast.content">
        <span class="text-white">{{ toast.content }}</span>
      </CToastBody>
    </CToast>
  </CToaster>
</template>
<style scoped>
.table-responsive {
  overflow-x: auto;
  max-width: 100%;
}

#underline_header {
  display: inline-block;
  border-bottom: 5px solid transparent;
  border-image: linear-gradient(to right, #ea5252, #030303);
  border-image-slice: 1;
  padding: 3px;
}

#custom_icon_header {
  width: auto;
  max-height: 30px;
  padding-left: 5px;
  padding-right: 5px;
}
</style>
<script>
import { ref } from 'vue'
import LGlogo from '@/assets/images/blackTick.png'
import axios from 'axios'
import { CBadge } from '@coreui/vue-pro'

export default {
  name: 'my_ticket',
  data() {
    return {
      data_array: [],

      tkt_number: '',
      tkt_description: '',
      tkt_picture: '',
      tkt_title: '',
      tkt_time: '',
      tkt_last_update: '',
      tkt_status: '',
      tkt_priorities: '',
      tkt_types: '',
      tkt_book: '',
      tkt_act: '',
      count_all: '',
      count_open: '',
      count_closed: '',
      toastProp: [],
    }
  },
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
      {
        key: 'book_mark',
        label: 'BOOKMARK',
        _style: { width: '10%' },
        filter: false,
        sorter: false,
      },
      {
        key: 'MORE',
        label: 'MORE',
        _style: { width: '5%' },
        filter: false,
        sorter: false,
      },
    ]
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

    const items = ref([])

    async function getData() {
      const user = JSON.parse(localStorage.getItem('USER_DATA'))
      try {
        const response = await axios({
          method: 'GET',
          url: `${process.env.VUE_APP_URL}/mongoose/get/check-token`,
          headers: { Authorization: 'Bearer ' + user.token },
        })
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    }
    const activePage = ref(1)
    return {
      LGlogo,
      columns,
      items,
      getBadge,
      activePage,
      getData,
    }
  },

  methods: {
    async toggleDetails(item) {
      item.book_mark = !item.book_mark
      try {
        const itemId = item._id.toString()
        // ทำการอัปเดตข้อมูลใน MongoDB โดยใช้ Axios
        await axios.put(
          `${process.env.VUE_APP_URL}/mongoose/update/stts_tickets/${itemId}`,
          {
            data: {
              tkt_book_task: item.book_mark,
            },
          },
        )

        // หลังจากอัปเดตสำเร็จ คุณสามารถทำสิ่งอื่นที่คุณต้องการได้ที่นี่
        console.log('อัปเดต BOOKMARK และส่งข้อมูลไปยัง MongoDB สำเร็จ')
        window.location.reload()
      } catch (error) {
        // this.toastProp.push({
        //   content: 'บุคมาร์คไม่สำเร็จ'
        // })

        console.error('เกิดข้อผิดพลาดในการอัปเดตข้อมูล:', error)
      }
    },
    async getTicket() {
      const userData = JSON.parse(localStorage.getItem('USER_DATA')) // ดึงข้อมูล USER_DATA จาก local storage
      const userId = userData.id // ดึงค่า id จาก userData

      try {
        const response = await axios.post(
          `${process.env.VUE_APP_URL}/mongoose/get/stts_tickets`,
          {
            populate: ['tkt_acc', 'tkt_act'],
            where: {
              tkt_act: userId,
              tkt_book_task: 'true',
              tkt_status: { $ne: 'Cancel' },
            },
          },
        )
        console.log(response.data)
        // นำข้อมูลที่ได้รับมาใส่ในตัวแปร items
        this.items = response.data.map((element, index) => ({
          number: index + 1, // หมายเลขแถว
          _id: element._id,
          ticket_id: element.tkt_number, // ข้อมูล TicketID จาก response
          owner: `${element.tkt_act.act_first_name_eng
            } ${element.tkt_act.act_last_name_eng.charAt(0)}.`, // ข้อมูล tkt_title จาก response
          // นำข้อมูลอื่นๆ จาก response มาใส่ตามที่คุณต้องการ
          // ตามลำดับของ columns ในตัวแปร columns
          // เพิ่มเติมตามความต้องการ
          start_date: element.tkt_time,
          status: element.tkt_status,
          type: element.tkt_types,
          book_mark: element.tkt_book_task,
          MORE: false,
        }))
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    async toggleButton(item) {
      item.MORE = !item.MORE
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
    async contactIt(item) {
      const itemId = item._id.toString()

      this.$router.push({ name: 'ST - it/it_comment', params: { itemId } })
    },
  },
  mounted() {
    //เรียกใช้ฟังชั่นเมื่อโหลดหน้า
    this.getTicket()
  },
}
</script>
