<template>
  <CCard class="p-2 rounded-4">
    <CCardHeader class="bg-white border-white mb-3 d-flex justify-content-between align-items-center">
      <div class="d-inline ms-2">
        <div id="underline_header">
          <CImage class="me-2 align-middle" id="custom_icon_header" :src="Ticketlogo" />
          <h2 class="d-inline align-middle"><b>My Tickets</b></h2>
        </div>
      </div>
    </CCardHeader>
    <CCardBody>
      <div>
        <CSmartTable :active-page="1" header :items="items" :columns="columns" tableFilter column-sorter clickable-rows  table-filter-placeholder="Search"
          class="table-hover table-bordered table-alternate-background table-responsive" :items-per-page="5" columnFilter
          items-per-page-select pagination columnSorter :sorterValue="{ column: 'STATUS', state: 'desc' }" :table-props="{
            striped: true,
            hover: true,
          }">
          <template #TicketID="{ item }">
            <td class="style-ticket-id" @click="contactIt(item, index)">{{ item.TicketID }}</td>
          </template>
          <template #STATUS="{ item }">
            <td>
              <CBadge :color="getBadge(item.STATUS)">{{ item.STATUS }}</CBadge>
            </td>
          </template>
          <template #title="item">
            <td class="text-center" > {{ item.title }}</td>
          </template>
          <template #type="{ item }">
            <td>{{ item.type }}</td>
          </template>
          <template #start_date="{ item }">
            <td class="text-center"> {{ formatDate(item.start_date) }}</td>
          </template>
          <template #BOOKMARK="{ item, index }">
            <td class="text-center">
              <CButton variant="outline" square size="xl" @click="toggleDetails(item, index)" class="style-bookmark">
                <img :src="getBookmarkIcon(item.BOOKMARK)" class="style-button" alt="Bookmark Icon" />
              </CButton>
            </td>
          </template>
          <template #MORE="{ item, index }">
            <td class="text-center ps-0 ">
              <div class="style-action">
                <CButton size="sm" color="primary" variant="outline" square class="mx-1 style-action"
                  @click="toggleButton(item, index)">
                  Show
                </CButton>

                <CButton size="sm" @click="toggleCancel(item, index)">
                  <img :src="IconcancelTicket" class="style-button" alt="Edit Icon" />
                </CButton>
              </div>
            </td>

          </template>
          <template #details="">
            <CModal size="lg" alignment="center" :backdrop="false" :keyboard="false" :visible="visibleShow"
              @close="() => { visibleShow = false }">
              <CModalHeader>
                <CModalTitle>Detail</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <CRow>
                  <CImage v-if="selectedTicket.STATUS === 'Closed Bug'" id="modalClosedBug" :src="ModalClosedBug" />
                  <CImage v-if="selectedTicket.STATUS === 'Closed'" id="modalClosed" :src="ModalClosed" />
                  <CImage v-if="selectedTicket.STATUS === 'Open'" id="modalOpen" :src="ModalOpen" />
                  <CImage v-if="selectedTicket.STATUS === 'Pending'" id="modalPending" :src="ModalPending" />
                </CRow>
                <hr>
                <div v-for="(historyItem, historyIndex) in historyArray" :key="historyIndex" class="text-center">
                  <p v-if="historyItem.mod_status === 'Pending'" class="md-flex align-items-center">
                    <CBadge :color="getBadge(historyItem.mod_status)" class="me-1">{{ historyItem.mod_status }}</CBadge>
                    ({{ historyItem.mod_act.act_first_name_eng }}) created Ticket on {{ historyItem.mod_date }}
                  </p>
                  <p v-else-if="historyItem.mod_status === 'Open'" class="md-flex align-items-center">
                    <CBadge :color="getBadge(historyItem.mod_status)" class="me-1">{{ historyItem.mod_status }}</CBadge>
                    IT Support ({{ historyItem.mod_act.act_first_name_eng }}) accepted a ticket on {{
                      historyItem.mod_date }}
                  </p>
                  <p v-else-if="historyItem.mod_status === 'Closed'" class="md-flex align-items-center">
                    <CBadge :color="getBadge(historyItem.mod_status)" class="me-1">{{ historyItem.mod_status }}</CBadge>
                    IT Support ({{ historyItem.mod_act.act_first_name_eng }}) was unable to edit the ticket on {{
                      historyItem.mod_date }}
                  </p>
                  <p v-else-if="historyItem.mod_status === 'Closed Bug'" class="md-flex align-items-center">
                    <CBadge :color="getBadge(historyItem.mod_status)" class="me-1">{{ historyItem.mod_status }}</CBadge>
                    IT Support ({{ historyItem.mod_act.act_first_name_eng }}) was unable to edit the ticket on {{
                      historyItem.mod_date }}
                  </p>
                </div>
              </CModalBody>
              <CModalFooter>
                <CButton color="info" @click="contactIt(contactItItem, contactItIndex) in contactItItem"
                  :key="contactItIndex" @mouseup.stop="">contact</CButton>

              </CModalFooter>
            </CModal>
            <CModal alignment="center" :backdrop="false" :keyboard="false" :visible="visibleCancel"
              @close="() => { visibleCancel = false }">
              <CModalHeader>
                <CModalTitle>Are you sure you want to <font class="Highlight-font-alert">Cancel This Ticket?</font>
                </CModalTitle>
              </CModalHeader>
              <CModalBody>
                When you click on confirm button, the ticket will be cancelled.
              </CModalBody>
              <CModalFooter>
                <CButton color="secondary" @click="() => { visibleCancel = false }">
                  Close
                </CButton>
                <CButton color="danger" @click="buttonCancel(confirmCancel, confirmCancelIndex) in confirmCancel"
                  :key="confirmCancelIndex" @mouseup.stop="">Confirm</CButton>
              </CModalFooter>
            </CModal>
            
          </template>


        </CSmartTable>
      </div>
    </CCardBody>
  </CCard>
  <CToaster placement="top-end">
    <CToast visible color="danger" v-for="(toast) in toastProp">
      <CToastHeader closeButton v-if="toast.title">
        <span class="me-auto fw-bold">{{ toast.title }}</span>
      </CToastHeader>
      <CToastBody v-if="toast.content">
        <span class="text-white">{{ toast.content }}</span>
      </CToastBody>
    </CToast>
  </CToaster>
  <CElementCover v-if="loading" :opacity="0.5" />
</template>
<style scoped>
.table-responsive {
  max-width: 100%;
  overflow-x: hidden;
}

@media (max-width: 1200px) {
  .table-responsive {
    overflow-x: auto;
  }
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

#Icon_my_ticket {
  width: auto;
  height: 30px;
}

.style-ticket-id {
  color: #5E5ADB;
}

.style-bookmark {
  padding-bottom: 10px;
  margin-right: 50px;
}

.Highlight-font-alert {
  color: red;
}

.style-action {
  margin-right: 10px;
}

.style-button {
  max-width: 20px;
  max-height: 20px;
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
</style>
<script >
import { ref } from 'vue'
import Ticketlogo from '@/assets/images/blackTick.png'
import ModalClosedBug from '@/assets/images/modal_closedBug.png'
import ModalOpen from '@/assets/images/modal_open.png'
import ModalPending from '@/assets/images/modal_pending.png'
import ModalClosed from '@/assets/images/modal_closed.png'
import Iconnotbookmarked from '@/assets/images/Icon_Not_Bookmarked.png'
import Iconhavebookmarked from '@/assets/images/Icon_Have_Bookmarked.png'
import IconcancelTicket from '@/assets/images/Icon_deleteaccount.png'
import axios from 'axios'
import { CIcon } from '@coreui/icons-vue';
import * as icon from '@coreui/icons';
import { CBadge } from '@coreui/vue-pro';



export default {

  props: ['showBookmark'],
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
      visibleShow: false,
      visibleCancel: false,
      historyArray: [],
      contactItItem: [],
      confirmCancel: [],
      Iconnotbookmarked: Iconnotbookmarked,
      Iconhavebookmarked: Iconhavebookmarked,
      selectedTicket: {},
      selectedCancel: {},
      IconcancelTicket: IconcancelTicket,
      loading : false,



    };

  },
  setup(props) {
    const bookmark = props.showBookmark ? [
      {
        key: 'BOOKMARK',
        label: 'BOOKMARK',
        _style: { width: '6%', fontWeight: 'bold', color: 'gray', fontSize: '13px' },
        filter: false,
        sorter: false,
      },
      {
        key: 'MORE',
        label: 'ACTION',
        _style: { width: '10%', fontWeight: 'bold', color: 'gray', fontSize: '13px', paddingLeft: '30px' },
        filter: false,
        sorter: false,
      },


    ] : [];
    
    
    const table = [

      {
        key: '#', label: '#',
        _style: { width: '3%', fontWeight: 'bold', color: 'gray', fontSize: '13px' },
        filter: false,
        sorter: false,
      },
      {
        key: 'TicketID', label: 'TICKET ID',
        _style: { width: '14%', fontWeight: 'bold', color: 'gray', fontSize: '13px', paddingLeft: '5%' }
      },
      {
        key: 'TITLE', label: 'TITLE',
        _style: { width: '25%', fontWeight: 'bold', color: 'gray', fontSize: '13px', paddingLeft: '14%' },
      },
      {
        key: 'STATUS', label: 'STATUS',
        _style: { width: '7%', fontWeight: 'bold', color: 'gray', fontSize: '13px', paddingLeft: '1%' },
      },
      {
        key: 'TYPE',
        label: 'TYPE',
        _style: { width: '6%', fontWeight: 'bold', color: 'gray', fontSize: '13px', paddingLeft: '1.5%' },
      },
      {
        key: 'start_date',
        label: 'START DATE',
        _style: { width: '11%', fontWeight: 'bold', color: 'gray', fontSize: '13px', paddingLeft: '3.5%' },
      },

      


    ];
    const columns=[...table,...bookmark]
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
    async contactIt(item, index) {

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



    async buttonCancel() {
      try {
        const item = this.confirmCancel; // ดึงข้อมูล item ที่ถูกเลือก
        const itemId = item._id.toString();
        await axios.put(`${process.env.VUE_APP_URL}/mongoose/update/stts_tickets/${itemId}`, {
          data: {
            tkt_status: "Cancel"
          }
        });
        this.toastProp.push({
          content: 'Delete Success'
        });
        // ซ่อน Modal หลังจากยกเลิกสำเร็จ
        this.visibleCancel = false;
        // รีเฟรชหน้า
        this.getTicket();
      } catch (error) {
        this.toastProp.push({
          content: 'Cancellation failed.'
        });
        console.error('เกิดข้อผิดพลาดในการอัปเดตข้อมูล:', error);
      }
    },

    async toggleButton(item) {
      this.visibleShow = true;
      this.selectedTicket = item;
      this.contactItItem = item;
      this.getHistoryStatus(item);

    },

    async toggleCancel(item, index) {
      this.visibleCancel = true;
      this.confirmCancel = item;
      this.confirmCancelIndex = index;
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
            start_date: element.tkt_time,
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
    async getHistoryStatus(item, index) {
      try {
        console.log('asdasd', item)
        this.contactItItem = item;
        console.log('assssssssss', this.contactItItem)
        const itemTicket = item._id.toString();
        const response = await axios.post(`${process.env.VUE_APP_URL}/mongoose/get/stts_modifications`, {
          where: {
            mod_tkt: itemTicket,
          },
          populate: 'mod_act',
        });
        // นำข้อมูลที่ได้รับมาใส่ในตัวแปร items
        this.historyArray = response.data;


      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    getBookmarkIcon(booked) {
      return booked ? this.Iconhavebookmarked : this.Iconnotbookmarked;
    },
    formatDate: function (dateString) {
      const options = { day: '2-digit', month: 'short', year: 'numeric' };
      return new Date(dateString).toLocaleDateString('en-GB', options);
    },

  },
  mounted() {
    //เรียกใช้ฟังชั่นเมื่อโหลดหน้า
    this.getTicket();
    
    
    this.loading = true
    setTimeout(() => {
      this.loading = false
    }, 2000)
    


  },
  components: {
    CIcon
  },

}
</script>