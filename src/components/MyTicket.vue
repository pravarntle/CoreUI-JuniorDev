<template>
  <CCard class="p-2 rounded-4 mx-auto">
    <CCardHeader class="bg-white border-white">
      <div class="d-inline ms-2">
        <div id="ticket-header">
          <CImage id="Icon_my_ticket" :src="Ticketlogo" />
        <h2 class="d-inline align-middle"><b>My Tickets</b></h2>
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
              {{ Boolean(item.BOOKMARK) ? '' : '' }}
              <CIcon v-if="Boolean(item.BOOKMARK)" :icon="icon.cilBook" size="xxl" />
              <CIcon v-if="!Boolean(item.BOOKMARK)" :icon="icon.cilBookmark" size="xxl"/>

            </CButton>
          </td>
        </template>
        <template #MORE="{ item, index }">
          <td class="text-center ps-0">
              <CButton class="me-1 mb-1 mt-1" color="primary" variant="outline" square size="sm" @click="getHistoryStatus(item, index)">
                <span>Show</span>
              </CButton>
              <CModal size="lg" alignment="center" :visible="visibleShow" @close="() => { visibleShows = false }" :backdrop="false" :keyboard="false" >
                <CModalHeader>
                  <CModalTitle>Detail</CModalTitle> 
                </CModalHeader>
                <CModalBody>
                   <CRow>
                    <CImage v-if="item.STATUS === 'Closed Bug'" id="modalClosedBug" :src="ModalClosedBug" />
                    <CImage v-if="item.STATUS === 'Closed'" id="modalClosed" :src="ModalClosed" />
                    <CImage v-if="item.STATUS === 'Open'" id="modalOpen" :src="ModalOpen" />
                    <CImage v-if="item.STATUS === 'Pending'" id="modalPending" :src="ModalPending" />
                   </CRow>

                  <hr>
                  <div v-for="(historyItem, historyIndex) in historyArray" :key="historyIndex">
                    
                    <p v-if="historyItem.mod_status=== 'Pending'" class="md-flex align-items-center"> <CBadge :color="getBadge(historyItem.mod_status)" class="me-1">{{ historyItem.mod_status }}</CBadge> สร้าง Ticket เมื่อวันที่  {{ historyItem.mod_date }} </p>
                    <p v-else-if="historyItem.mod_status=== 'Open'" class="md-flex align-items-center"><CBadge :color="getBadge(historyItem.mod_status)" class="me-1">{{ historyItem.mod_status }}</CBadge>  พนักงานไอที({{ historyItem.mod_act.act_first_name_eng}}) รับเรื่อง Ticket เมื่อวันที่่ {{ historyItem.mod_date }}</p>
                    <p v-else-if="historyItem.mod_status=== 'Closed'" class="md-flex align-items-center"> <CBadge :color="getBadge(historyItem.mod_status)" class="me-1">{{ historyItem.mod_status }}</CBadge> พนักงานไอที({{ historyItem.mod_act.act_first_name_eng}}) ได้ปิด Ticket เมื่อวันที่่ {{ historyItem.mod_date }}</p>
                    <p v-else-if="historyItem.mod_status=== 'Closed Bug'" class="md-flex align-items-center"> <CBadge :color="getBadge(historyItem.mod_status)" class="me-1">{{ historyItem.mod_status }}</CBadge> พนักงานไอที({{ historyItem.mod_act.act_first_name_eng}}) ไม่สามารถแก้ไข Ticket เมื่อวันที่่ {{ historyItem.mod_date }}</p>
                  </div>
                </CModalBody>
                <CModalFooter>                 
                  <CButton color="info" @click="contactIt(contactItItem,contactItIndex)in contactItItem" :key="contactItIndex">contact</CButton>
                </CModalFooter>
              </CModal>
              <CButton color="danger"  square size="sm" @click="buttonCancel(item, index)" >
                <CIcon :icon="icon.cilTrash" size="xl"/>
              </CButton>
          </td>
          
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
<style scoped>
.table-responsive {
  overflow-x: auto;
  max-width: 100%;
}



#ticket-header {
  display: inline-block;
  border-bottom: 5px solid transparent;
  border-image: linear-gradient(to right, #ea5252, #030303);
  border-image-slice: 1;
  padding: 3px;
}
.me-2 {
  width: 51px; 
  height: 36px;
}

#Icon_my_ticket{
  width: auto;
  max-height: 25px;
  padding-left: 5px;
  padding-top: 3px;
  padding-right: 5px;
}


</style>
<script>
import { ref } from 'vue'
import Ticketlogo from '@/assets/images/blackTick.png'
import ModalClosedBug from '@/assets/images/modal_closedBug.png'
import ModalOpen from '@/assets/images/modal_open.png'
import ModalPending from '@/assets/images/modal_pending.png'
import ModalClosed from '@/assets/images/modal_closed.png'

import axios from 'axios'
import { CIcon } from '@coreui/icons-vue';
import * as icon from '@coreui/icons';
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
      visibleShow:false,
      historyArray:[],
      contactItItem:[],
      
      


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
      { label:"ACTION", key: 'MORE', _style: { width: '5%' }, filter: false, },


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
      Ticketlogo,
      columns,
      items,
      getBadge,
      activePage,
      getData,
      icon,
      ModalClosedBug,
      ModalClosed,
      ModalOpen,
      ModalPending,
    };
  },

  methods: {
    async contactIt(item,index) {
      
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
      } catch (error) {
        this.toastProp.push({
          content: 'BookMark Fail'
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
        
        this.toastProp.push({
          content: 'Cancel Success'
        })
        // รีเฟรชหน้า
        this.getTicket();

      } catch (error) {
        this.toastProp.push({
          content: 'Cancellation failed.'
        })
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
    },
    async getHistoryStatus(item , index){
      try {
        this.visibleShow =true; 
        console.log('asdasd',item)
        this.contactItItem = item;
        console.log('assssssssss',this.contactItItem)
        const itemTicket = item._id.toString();
        const response = await axios.post(`${process.env.VUE_APP_URL}/mongoose/get/stts_modifications`,{
          where:{
            mod_tkt:itemTicket,
          },
          populate:'mod_act',
        });
        // นำข้อมูลที่ได้รับมาใส่ในตัวแปร items
        this.historyArray = response.data;
        
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    closeModal() {
      this.visibleShow = false;
    },

  },
  mounted() {
    //เรียกใช้ฟังชั่นเมื่อโหลดหน้า
    this.getTicket();


  },
  components: {
    CIcon
  },

}
</script>