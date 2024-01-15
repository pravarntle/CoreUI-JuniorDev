<template>
  <div class="box">
    <CCard class="p-2 rounded-4">
      <CCardHeader class="bg-white border-white mb-5 ">
        <div class="d-inline ms-2">
          <div id="underline_header">
            <CImage class="me-2 align-middle" id="custom_icon_header" :src="Icon_bookmark" />
            <h2 class="d-inline align-middle"><b>My Bookmark Ticket</b></h2>
          </div>
        </div>
      </CCardHeader>
    <CCardBody>
      <div class="table-responsive table-borderless">
        <CSmartTable clickableRows :tableProps="{
          striped: true,
          hover: true,
        }" :activePage="2" header :items="items" :columns="columns" columnFilter="true" TableFilter="false"
          class="table-hover table-bordered table-alternate-background table-responsive"
          itemsPerPageSelect :itemsPerPage="5" columnSorter :sorterValue="{ column: 'status', state: 'desc' }"
          pagination="true">

          <template #ticket_id="{ item }">
              <td class="style-ticket-id" @click="contactIt(item, index)">{{ item.ticket_id }}</td>
          </template>
          <template #STATUS="{ item }">
            <td>
              <CBadge :color="getBadge(item.STATUS)">{{ item.STATUS }}</CBadge>
            </td>
          </template>
          <template #type="{ item }">
            <td>{{ item.type }}</td>
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
              <CButton size="sm" color="primary" variant="outline" square class="ml-3 style-action" @click="toggleButton(item, index)">
                <span>Show</span>
              </CButton>
              
              <CButton size="sm" color="danger" class="ml-3"  @click="buttonCancel(item, index)" >
                <CIcon :icon="icon.cilTrash" class="style-button" size="xl"/>
              </CButton>
            </div>
          </td>
        
        </template>
        <template #details="">
          <CModal size="lg" alignment="center" :visible="visibleShow" :backdrop="false" :keyboard="false" @close="() => { visibleShow = false }">
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
                    <p v-if="historyItem.mod_status=== 'Pending'" class="md-flex align-items-center">
                      <CBadge :color="getBadge(historyItem.mod_status)" class="me-1">{{ historyItem.mod_status }}</CBadge>
                      ({{ historyItem.mod_act.act_first_name_eng}}) created Ticket on {{ historyItem.mod_date }}
                    </p>
                    <p v-else-if="historyItem.mod_status=== 'Open'" class="md-flex align-items-center">
                      <CBadge :color="getBadge(historyItem.mod_status)" class="me-1">{{ historyItem.mod_status }}</CBadge>
                      IT Support ({{ historyItem.mod_act.act_first_name_eng}}) accepted a ticket on {{ historyItem.mod_date }}
                    </p>
                    <p v-else-if="historyItem.mod_status=== 'Closed'" class="md-flex align-items-center">
                      <CBadge :color="getBadge(historyItem.mod_status)" class="me-1">{{ historyItem.mod_status }}</CBadge>
                      IT Support ({{ historyItem.mod_act.act_first_name_eng}}) was unable to edit the ticket on {{ historyItem.mod_date }}
                    </p>
                    <p v-else-if="historyItem.mod_status=== 'Closed Bug'" class="md-flex align-items-center">
                      <CBadge :color="getBadge(historyItem.mod_status)" class="me-1">{{ historyItem.mod_status }}</CBadge>
                      IT Support ({{ historyItem.mod_act.act_first_name_eng}}) was unable to edit the ticket on {{ historyItem.mod_date }}
                    </p>
                  </div>
                </CModalBody>
                <CModalFooter>                 
                  <CButton color="info" @click="contactIt(contactItItem,contactItIndex)in contactItItem" :key="contactItIndex" @mouseup.stop="">contact</CButton>
                </CModalFooter>
              </CModal>
          </template>
        </CSmartTable>
      </div>
    </CCardBody>
    </CCard>
  </div>
</template>
<style scoped>
#all {
  font-size: 24px;
  color: #1A72B8;
}

#open {
  font-size: 24px;
  color: #147A2A;
}

#closed {
  font-size: 24px;
  color: #B22424;
}

#font {
  font-weight: 700;
  align-items: center;
  font-size: 100px;
  color: #000;
}

#border {
  border-radius: 6%;
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
  height: 30px;
}

.style-ticket-id {
  color: #5E5ADB;
}

.style-bookmark {
  padding-bottom: 10px;
  margin-right: 20px;
}

.style-action {
  margin-right: 10px;
}

.style-button {
  max-width: 20px;
  max-height: 20px;
}

.table-responsive {
  max-width: 100%;
  overflow-x: hidden;
}

@media (max-width: 1200px) {
  .table-responsive {
    overflow-x: auto;
  }
}
</style>
  
<script>
import { ref } from 'vue'
import Icon_bookmark from '@/assets/images/Icon_bookmark.png'
import { CCol, CRow } from '@coreui/vue-pro'
import axios from 'axios';
import Iconnotbookmarked from '@/assets/images/Icon_Not_Bookmarked.png'
import Iconhavebookmarked from '@/assets/images/Icon_Have_Bookmarked.png'
import { CIcon } from '@coreui/icons-vue';
import * as icon from '@coreui/icons';
import ModalClosedBug from '@/assets/images/modal_closedBug.png'
import ModalOpen from '@/assets/images/modal_open.png'
import ModalPending from '@/assets/images/modal_pending.png'
import ModalClosed from '@/assets/images/modal_closed.png'
export default {
  name: 'BookMark',
  data() {
    return {
      visibleShow:false,
      historyArray:[],
      contactItItem:[],
      selectedTicket: {}, 

    };

  },
  setup() {
    const columns = [
      // {
      //   key:'TicketID',
      //   _style: { width: '20%' },
      // },
      // {
      //   key:'TicketID',
      //   _style: { width: '20%' },
      // },
      {
        key: '#', label: '#',
        _style: { width: '3%', fontWeight: 'bold', color: 'gray', fontSize: '13px' },
        filter: false,
        sorter: false,
      },
      {
        key: 'TicketID', label: 'TICKET ID',
        _style: { width: '14%', fontWeight: 'bold', color: 'gray', fontSize: '13px' },
      },
      {
        key: 'TITLE', label: 'TITLE',
        _style: { width: '20%', fontWeight: 'bold', color: 'gray', fontSize: '13px' },
      },
      {
        key: 'STATUS', label: 'STATUS',
        _style: { width: '6%', fontWeight: 'bold', color: 'gray', fontSize: '13px' },
      },
      {
        key: 'TYPE',
        label: 'TYPE',
        _style: { width: '14%', fontWeight: 'bold', color: 'gray', fontSize: '13px' },
      },
      {
        key: 'START DATE(Y/M/D)',
        label: 'START DATE ',
        _style: { width: '10%', fontWeight: 'bold', color: 'gray', fontSize: '13px' },
      },
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
        _style: { width: '10%', fontWeight: 'bold', color: 'gray', fontSize: '13px', paddingLeft: '47px' },
        filter: false,
        sorter: false,
      },
    ];
    const items = ref([]);
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




    const toggleDetails = async (item) => {
      item.BOOKMARK = !item.BOOKMARK;
      console.log(item.BOOKMARK);
      console.log(item);
      try {
        const itemId = item._id.toString();
        // ทำการอัปเดตข้อมูลใน MongoDB โดยใช้ Axios
        await axios.put(`${process.env.VUE_APP_URL}/mongoose/update/stts_tickets/${itemId}`, {
          data: {
            tkt_book: item.BOOKMARK,
          }
        });
        
        // เรียกใช้เมธอด getTicket ที่ถูกสร้างใน setup()
        console.log('อัปเดต BOOKMARK และส่งข้อมูลไปยัง MongoDB สำเร็จ');
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการอัปเดตข้อมูล:', error);
      }
    };

    return {
      Icon_bookmark,
      columns,
      items,
      getBadge,
      toggleDetails,
      icon,
      Iconnotbookmarked: Iconnotbookmarked,
      Iconhavebookmarked: Iconhavebookmarked,
      ModalClosedBug,
      ModalClosed,
      ModalOpen,
      ModalPending,
    };
  },
  components: { CRow, CCol },
  methods: {
    async contactIt(item) {
      const itemId = item._id.toString();

      this.$router.push({ name: 'ST - comment Ticket', params: { itemId } });
      console.log('Item ID:', itemId);
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
        this.getTicket();
        // หลังจากอัปเดตสำเร็จ คุณสามารถทำสิ่งอื่นที่คุณต้องการได้ที่นี่
        console.log('อัปเดต BOOKMARK และส่งข้อมูลไปยัง MongoDB สำเร็จ');
        // รีเฟรชหน้า

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
            tkt_book: "true",
            tkt_status: { $ne: 'Cancel' }

          },
        });
        console.log(response.data);
        console.log(userId);
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
    getBookmarkIcon(booked) {
      return booked ? this.Iconhavebookmarked : this.Iconnotbookmarked;
    },
    async toggleButton(item) {
      this.selectedTicket = item;
      this.getHistoryStatus(item);
      this.visibleShow=true;
    },
    async getHistoryStatus(item , index){
      try {
        
        this.visibleShow = true; 
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

  },
  mounted() {
    //เรียกใช้ฟังชั่นเมื่อโหลดหน้า
    this.getTicket();
  }

}
</script>
  