<template>
  <div>
    <CCard class="p-2 rounded-4">
      <CCardBody>
        <CRow style="margin-bottom: 22px; " >
          <CCol xs="auto">
            <div Class="clearfix">
              <CImage Class="images_Ticket" :src="LGlogo" width="55" height="40" />
            </div>
          </CCol>
          <CCol xs="auto">
            <div Class="text-end p-2">
              <CCardTitle>  <h3><b>
                My Bookmark tasks
              </b></h3></CCardTitle>

            </div>
          </CCol>
          <div Class="line">
            <svg xmlns="http://www.w3.org/2000/svg" width="345" height="3" viewBox="0 0 345 3" fill="none" >
              <rect y="0.259277" width="219.682" height="2.2588" fill="#EA5252" />
              <path d="M69.4795 0.259277H345V2.51807H69.4795V0.259277Z" fill="#030303" />
            </svg>
          </div>
        </CRow>

        <div >
          <CSmartTable clickableRows :tableProps="{
            striped: true,
            hover: true,
          }" :activePage="2" header :items="items" :columns="columns" columnFilter="true" TableFilter="false"
            class="table-hover table-bordered table-alternate-background table-responsive"  itemsPerPageSelect
            :itemsPerPage="5" columnSorter :sorterValue="{ column: 'status', state: 'desc' }" pagination="true">

            <template #ticket_id="{ item }">
              <td class="style-ticket-id">{{ item.ticket_id }}</td>
            </template>
            <template #owner="{ item }">
              <td>{{ item.owner }}</td>
            </template>

            <template #status="{ item }">
              <td>
                <CBadge :color="getBadge(item.status)">{{ item.status }}</CBadge>
              </td>
            </template>
            <template #TYPE="{ item }">
              <td>
                <CBadge :color="getBadgeTicketType(item.TYPE)">{{ item.TYPE }}</CBadge>
              </td>
            </template>
            <template #book_mark="{ item, index }">
              <td class="text-center">
                <CButton variant="outline" square size="xl" @click="toggleDetails(item, index)" class="style-bookmark">
                  <img :src="getBookmarkIcon(item.book_mark)" class="style-button" alt="Bookmark Icon" />
                </CButton>
              </td>
            </template>
            <template #MORE="{ item, index }">
              <td class="text-center">
                <CButton size="sm" color="primary" variant="outline" square class="ml-3 style-action"
                  @click="contactIt(item, index)">
                  <!-- <img :src="IconshowTicket" style="max-width: 20px; max-height: 20px; "
                  alt="Bookmark Icon" /> -->
                  Show
                </CButton>
                <CButton size="sm" color="danger" class="ml-3" @click="buttonCancel(item, index)">
                  <img :src="IconcancelTicket" class="style-button" alt="Bookmark Icon" />
                </CButton>
              </td>
            </template>
          </CSmartTable>
        </div>
      </CcardBody>
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
  </div>
</template>
<style scoped>
.mb-3 {
  width: 943px;
  height: 691px;
  flex-shrink: 0;
  border-radius: 18px;
  background: #fff;
  max-width: 100%;
  display: flex;
}

.mb-1 {
  border-radius: 18px;
  background: #fff;
  max-width: 100%;
  display: flex;
}

.table-responsive {
  overflow-x: hidden;
  max-width: 100%;
}

/* .table-hover .table-bordered .table-alternate-background td:nth-child(1) {
  background-color: #feffde;
}

.table-hover .table-bordered .table-alternate-background td:nth-child(2) {
  background-color: #d9edf7;
}

.table-hover .table-bordered .table-alternate-background td:nth-child(3) {
  color: black;
  font-size: 16px;
} */


.style-ticket-id {
  color: #5E5ADB;
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

#underline_header {
  width: 370px;
  border-bottom: 5px solid transparent;
  border-image: linear-gradient(to right, red, blue);
  border-image-slice: 1;
  padding: 3px;
}

#custom_icon_header {
  width: 50px;
  height: 44px;
}

.underline_header {
  display: inline-block;
  border-bottom: 5px solid transparent;
  border-image: linear-gradient(to right, #ea5252, #030303);
  border-image-slice: 1;
  padding: 3px;
}


</style>
<script>
import { ref } from 'vue'
import LGlogo from '@/assets/images/blackTick.png'
import axios from 'axios'
import { CBadge } from '@coreui/vue-pro'
import Iconnotbookmarked from '@/assets/images/Icon_Not_Bookmarked.png'
import Iconhavebookmarked from '@/assets/images/Icon_Have_Bookmarked.png'
import IconshowTicket from '@/assets/images/Icon_ShowTicket.png'
import IconcancelTicket from '@/assets/images/Icon_CancelTicket.png'

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
      Iconnotbookmarked: Iconnotbookmarked,
      Iconhavebookmarked: Iconhavebookmarked,
      IconshowTicket: IconshowTicket,
      IconcancelTicket: IconcancelTicket,
      
    }
  },
  setup() {
    const columns = [
    {
        key: 'number',
        label: '#',
        _style: { width: '3%', fontWeight: 'bold', color: 'gray', fontSize: '13px' },
        filter: false,
        sorter: false,

      },
      {
        key: 'ticket_id',
        label: 'TICKET ID',
        _style: { width: '22%', fontWeight: 'bold', color: 'gray', fontSize: '13px' },
      },
      {
        key: 'owner',
        label: 'OWNER',
        _style: { width: '18%', fontWeight: 'bold', color: 'gray', fontSize: '13px' },
      },
      {
        key: 'status',
        label: 'STATUS',
        _style: { width: '1%', fontWeight: 'bold', color: 'gray', fontSize: '13px' },
      },
      {
        key: 'type',
        label: 'TYPE',
        _style: { width: '7%', fontWeight: 'bold', color: 'gray', fontSize: '13px' },
      },
      {
        key: 'start_date',
        label: 'START DATE ',
        _style: { width: '10%', fontWeight: 'bold', color: 'gray', fontSize: '13px' },
      },
      {
        key: 'book_mark',
        label: 'BOOKMARK',
        _style: { width: '8%', fontWeight: 'bold', color: 'gray', fontSize: '13px' },
        filter: false,
        sorter: false,
      },
      {
        key: 'MORE',
        label: 'ACTION',
        _style: { width: '8%', fontWeight: 'bold', color: 'gray', fontSize: '13px', paddingLeft: '30px' },
        filter: false,
        sorter: false,
      },


    ];
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

    const getBadgeTicketType = (tkt_types) => {
      switch (tkt_types) {
        case 'Software':
          return 'primary'
        default: 'secendary'
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
              // tkt_acc: userId,
              tkt_book_task: 'true',
              tkt_status: { $ne: 'Cancel' },
            },
          },
        )
        console.log(response.data)
        console.log('1')
        console.log(userId)
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
    getBookmarkIcon(booked) {
      return booked ? this.Iconhavebookmarked : this.Iconnotbookmarked;
    },
  },
  mounted() {
    //เรียกใช้ฟังชั่นเมื่อโหลดหน้า
    this.getTicket()
  },
}
</script>
