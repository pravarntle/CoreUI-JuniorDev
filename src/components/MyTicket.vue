<template>
  <CCard class="p-2 rounded-4">
    <CCardHeader class="bg-white border-white">
      <div class="d-inline ms-2">
        <CImage class="me-2 align-middle"  :src="LGlogo" />
        <h2 class="d-inline align-middle">My Tickets</h2>
        <div class="LineHeadCard">
        </div>
      </div>
    </CCardHeader>
    <div class="table-responsive table-borderless">
      <CSmartTable :active-page="1" header :items="items" :columns="columns" columnFilter column-sorter
        :items-per-page="5" items-per-page-select pagination columnSorter
        :sorterValue="{ column: 'START DATE(Y/M/D)', state: 'desc', dateFormat: 'YYYY-MM-DD'}"  
        :table-props="{
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

        <template #BOOKMARK="{ item, index }">
          <td class="text-center">
            <CButton variant="outline" square size="xl" @click="toggleDetails(item, index)">
              {{ Boolean(item.BOOKMARK) ? '👁️' : '🙈' }}
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
              <CButton size="sm" color="info" class="" @click="contactIt(item, index)"> ติดต่อ It Suport </CButton>
              <CButton size="sm" color="danger" class="ml-3" @click="buttonCancel(item, index)"> Cancel </CButton>
            </CCardBody>
          </CCollapse>
        </template>
      </CSmartTable>
    </div>
  </CCard>
  <CToaster placement="top-end">
    <CToast visible color="info" v-for="(toast) in toastProp">
      <CToastHeader closeButton v-if="toast.title">
        <span class="me-auto fw-bold">{{ toast.title }}</span>
      </CToastHeader>
      <CToastBody v-if="toast.content">
        <span class="text-white">{{ toast.content }}</span>
      </CToastBody>
    </CToast>
  </CToaster>
</template>
<style>
.table-responsive {
  overflow-x: auto;
  max-width: 100%;
}

.LineHeadCard {
  width: 225px;
  border-bottom: 5px solid transparent;
  border-image: linear-gradient(to right, danger, primary);
  border-image-slice: 1;
  padding: 3px;
}
.me-2 {
  width: 51px; 
  height: 36px;
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
      


    };

  },
  setup() {
    const columns = [

      { key: '#', _style: { width: '5%' } },
      { key: 'TicketID', _style: { width: '10%' } },
      { key: 'TITLE', _style: { width: '10%' } },
      { key: 'START DATE(Y/M/D)', _style: { width: '11%' } },
      { key: 'STATUS', _style: { width: '5%' } },
      { key: 'TYPE', _style: { width: '4%' } },
      { key: 'BOOKMARK', _style: { width: '5%' }, filter: false, },
      { key: 'MORE', _style: { width: '5%' }, filter: false, },


    ];
    const getBadge = (tkt_status) => {
      switch (tkt_status) {
        case 'Pending':
          return 'warning';
        case 'Open':
          return 'primary';
        case 'Closed':
          return 'danger';
        default:
          return 'secondary'; // Return a default color if none of the cases match.
      }
    };

    const items = ref([]);


    async function getData() {
      const user = JSON.parse(localStorage.getItem("USER_DATA"))
      try {
        const response = await axios({
          method: 'GET',
          url: `${process.env.VUE_APP_URL}/mongoose/get/check-token`,
          headers: { 'Authorization': 'Bearer ' + user.token }
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
    };
  },

  methods: {
    async contactIt(item) {
      const itemId = item._id.toString();

      this.$router.push({ name: 'ST - comment Ticket', params: { itemId } });

    },
    async toggleDetails(item) {

      item.BOOKMARK = !item.BOOKMARK;
      try {
        const itemId = item._id.toString();
        // ทำการอัปเดตข้อมูลใน MongoDB โดยใช้ Axios
        await axios.put(`${process.env.VUE_APP_URL}/mongoose/update/stts_tickets/${itemId}`, {
          data: {
            tkt_book: item.BOOKMARK

          }
        });

        // หลังจากอัปเดตสำเร็จ คุณสามารถทำสิ่งอื่นที่คุณต้องการได้ที่นี่
        console.log('อัปเดต BOOKMARK และส่งข้อมูลไปยัง MongoDB สำเร็จ');
      } catch (error) {
        this.toastProp.push({
          content: 'บุคมาร์คไม่สำเร็จ'
        })

        console.error('เกิดข้อผิดพลาดในการอัปเดตข้อมูล:', error);
      }
    },

    async buttonCancel(item) {

      try {
        const itemId = item._id.toString();
        // ทำการอัปเดตข้อมูลใน MongoDB โดยใช้ Axios
        await axios.put(`${process.env.VUE_APP_URL}/mongoose/update/stts_tickets/${itemId}`, {
          data: {
            tkt_status: "Cancel"

          }
        });

        // หลังจากอัปเดตสำเร็จ คุณสามารถทำสิ่งอื่นที่คุณต้องการได้ที่นี่
        console.log('อัปเดต BOOKMARK และส่งข้อมูลไปยัง MongoDB สำเร็จ');
        // รีเฟรชหน้า
        this.getTicket();

      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการอัปเดตข้อมูล:', error);
      }
    },

    async toggleButton(item) {
      item.MORE = !item.MORE;
    },

    async getTicket() {
      try {
        const userData = JSON.parse(localStorage.getItem('USER_DATA')); // ดึงข้อมูล USER_DATA จาก local storage
        const userId = userData.id.toString(); // ดึงค่า id จาก userData

        const response = await axios.post(`${process.env.VUE_APP_URL}/mongoose/get/stts_tickets`, {
          where: {
            tkt_act: userId,
            tkt_status: { $ne: 'Cancel' }

          },
        });
        // นำข้อมูลที่ได้รับมาใส่ในตัวแปร items
        this.items = response.data.map((element, index) => {

          return {
            '#': index + 1,
            _id: element._id,
            TicketID: element.tkt_number,
            TITLE: element.tkt_title,
            'START DATE(Y/M/D)': element.tkt_time,
            STATUS: element.tkt_status,
            TYPE: element.tkt_types,
            BOOKMARK: element.tkt_book,
            MORE: false,
          };
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

  },
  mounted() {
    //เรียกใช้ฟังชั่นเมื่อโหลดหน้า
    this.getTicket();


  }

}
</script>