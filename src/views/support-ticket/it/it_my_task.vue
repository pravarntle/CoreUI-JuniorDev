<template>
  <div>
    <CCard class="p-2 rounded-4">
      <CCardHeader class="bg-white border-white mb-5 ">
        <div class="d-inline ms-2">
          <div id="underline_header">
            <CImage class="me-2 align-middle" id="custom_icon_header" :src="images_Ticket" />
            <h2 class="d-inline align-middle"><b>My Tasks</b></h2>
          </div>
        </div>
      </CCardHeader>
      <CCardBody>
        <div>
          <CSmartTable clickableRows :tableProps="{
            striped: true,
            hover: true,
          }" :activePage="2" header :items="items" :columns="columns" columnFilter="true" TableFilter="false"
            class="table-hover table-bordered table-alternate-background table-responsive" itemsPerPageSelect
            :itemsPerPage="5" columnSorter :sorterValue="{ column: 'status', state: 'desc' }" pagination="true">

            <template #ticket_id="{ item }">
              <td class="style-ticket-id" @click="contactIt(item, index)">{{ item.ticket_id }}</td>
          </template>

            <template #owner="{ item }">
              <td>{{ item.owner }}</td>
            </template>
            <template #avatar="{ item }">
              <td>
                <CAvatar :src="$withBase(`/images/avatars/${item.avatar}`)" />
              </td>
            </template>
            <template #status="{ item }">
              <td>
                <CBadge :color="getBadge(item.status)">{{ item.status }}</CBadge>
              </td>
            </template>
            <template #type="{ item }">
              <td>{{ item.type }}</td>
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
                <!-- <CButton size="sm" color="danger" class="ml-3" @click="buttonCancel(item, index)">
                  <img :src="IconcancelTicket" class="style-button" alt="Bookmark Icon" />
                </CButton> -->
              </td>
            </template>
            <!-- <template #details="{ item, index }" >
            <CCollapse :visible="Boolean(item.MORE)">
              <CCardBody >
                <h4>
                  {{ item.tkt_title }}
                </h4>
                <CButton size="sm" color="info" class="" @click="contactIt(item, index)"> CheckTicket </CButton>
                <CButton size="sm" color="danger" class="ml-3" @click="buttonCancel(item, index)"> Cancel </CButton>
              </CCardBody>
            </CCollapse>
          </template> -->
            <!-- <template #show_details="{ item, index }">
            <td class="py-2">
              <CButton
                color="primary"
                variant="outline"
                square
                size="sm"
                @click="toggleDetails(item, index)"
              >
                {{ Boolean(item._toggled) ? 'Hide' : 'Show' }}
              </CButton>
            </td>
          </template> -->
            <!-- <template #details="{ item }">
            <CCollapse :visible="this.details.includes(item._id)">
              <CCardBody>
                <h4>
                  {{ item.username }}
                </h4>
                <p class="text-muted">User since: {{ item.registered }}</p>
                <CButton size="sm" color="info" class="">
                  User Settings
                </CButton>
                <CButton size="sm" color="danger" class="ml-1">
                  Delete
                </CButton>
              </CCardBody>
            </CCollapse>
          </template> -->
          </CSmartTable>
        </div>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import { CIcon } from '@coreui/icons-vue'
import * as icon from '@coreui/icons'
import images_Ticket from '@/assets/images/Ticket.png'
import { CCol, CImage, CRow } from '@coreui/vue-pro'
import Iconnotbookmarked from '@/assets/images/Icon_Not_Bookmarked.png'
import Iconhavebookmarked from '@/assets/images/Icon_Have_Bookmarked.png'
import IconshowTicket from '@/assets/images/Icon_ShowTicket.png'
import IconcancelTicket from '@/assets/images/Icon_CancelTicket.png'
import { ref } from 'vue'
import axios from 'axios'
export default {
  name: 'comment',
  components: {
    CIcon,
    CRow,
    CImage,
    CCol,
  },
  data() {
    return {
      Iconnotbookmarked: Iconnotbookmarked,
      Iconhavebookmarked: Iconhavebookmarked,
      IconshowTicket: IconshowTicket,
      IconcancelTicket: IconcancelTicket,
    };
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
        _style: { width: '6%', fontWeight: 'bold', color: 'gray', fontSize: '13px' },
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
    return {
      images_Ticket,
      icon,
      columns,
      items,
      getBadge,

    }
  },
  methods: {
    async toggleDetails(item) {

      item.book_mark = !item.book_mark;
      try {
        const itemId = item._id.toString();
        // ทำการอัปเดตข้อมูลใน MongoDB โดยใช้ Axios
        await axios.put(`${process.env.VUE_APP_URL}/mongoose/update/stts_tickets/${itemId}`, {
          data: {
            tkt_book_task: item.book_mark

          }
        });

        // หลังจากอัปเดตสำเร็จ คุณสามารถทำสิ่งอื่นที่คุณต้องการได้ที่นี่
        console.log('อัปเดต BOOKMARK และส่งข้อมูลไปยัง MongoDB สำเร็จ1');
      } catch (error) {
        // this.toastProp.push({
        //   content: 'บุคมาร์คไม่สำเร็จ'
        // })

        console.error('เกิดข้อผิดพลาดในการอัปเดตข้อมูล:', error);
      }
    },
    async getTicket() {
      const userData = JSON.parse(localStorage.getItem('USER_DATA')) // ดึงข้อมูล USER_DATA จาก local storage
      const userId = userData.id // ดึงค่า id จาก userData

      try {

        const response = await axios.post(`${process.env.VUE_APP_URL}/mongoose/get/stts_tickets`, {
          "populate": ["tkt_acc", "tkt_act",],
          "where": {
            "tkt_accept": userId
          }

        });
        // นำข้อมูลที่ได้รับมาใส่ในตัวแปร items
        console.log(response.data.tkt_book_task);
        console.log(response.data);
        this.items = response.data.map((element, index) => ({
          number: index + 1, // หมายเลขแถว
          _id: element._id,
          ticket_id: element.tkt_number, // ข้อมูล TicketID จาก response
          owner: `${element.tkt_act.act_first_name_eng} ${element.tkt_act.act_last_name_eng.charAt(0)}.`, // ข้อมูล tkt_title จาก response
          // นำข้อมูลอื่นๆ จาก response มาใส่ตามที่คุณต้องการ
          // ตามลำดับของ columns ในตัวแปร columns
          // เพิ่มเติมตามความต้องการ
          start_date: element.tkt_time,
          status: element.tkt_status,
          type: element.tkt_types,
          book_mark: element.tkt_book_task,
          MORE: false,
        }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }

    },
    async toggleButton(item) {
      item.MORE = !item.MORE;
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
        window.location.reload();

      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการอัปเดตข้อมูล:', error);
      }
    },
    async contactIt(item) {
      const itemId = item._id.toString();

      this.$router.push({ name: 'ST - it/it_comment', params: { itemId } });

    },
    getBookmarkIcon(booked) {
      return booked ? this.Iconhavebookmarked : this.Iconnotbookmarked;
    },
  },
  mounted() {
    this.getTicket();
  }
}
</script>



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
  max-width: 100%;
  overflow-x: hidden;
}

@media (max-width: 1200px) {
  .table-responsive {
    overflow-x: auto;
  }
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

