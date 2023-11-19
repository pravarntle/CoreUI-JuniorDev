<template>
  <div>
    <CCard class="mb-3">
      <CCardBody>
        <CRow style="margin-bottom: 22px">
          <CCol xs="auto">
            <div Class="clearfix">
              <CImage Class="images_Ticket" :src="images_Ticket" width="55" height="40"/>
            </div>
          </CCol>
          <CCol xs="auto">
            <div Class="text-end p-2">
              <CCardTitle> <b> My Tasks </b></CCardTitle>
            </div>
          </CCol>
          <div Class="line">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="219"
              height="3"
              viewBox="0 0 219 3"
              fill="none"
            >
              <rect
                y="0.259277"
                width="215.682"
                height="2.2588"
                fill="#EA5252"
              />
              <path
                d="M69.4795 0.259277H219V2.51807H69.4795V0.259277Z"
                fill="#030303"
              />
            </svg>
          </div>
        </CRow>

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
          :itemsPerPage="5"
          columnSorter
          :sorterValue="{ column: 'status', state: 'asc' }"
          pagination
        >
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
          <template #book_mark="{ item, index }" >
            <td class="text-center">
              <CButton
                variant="outline"
                square
                size="xl"
                @click="toggleDetails(item, index)"
              >
              {{ Boolean(item.book_mark) ? '👁️' : '🙈' }}
              </CButton>
            </td>
          </template>
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
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import { CIcon } from '@coreui/icons-vue'
import * as icon from '@coreui/icons'
import images_Ticket from '@/assets/images/Ticket.png'
import { CCol, CImage, CRow } from '@coreui/vue-pro'
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
          "populate":["tkt_acc","tkt_act",],
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
        }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }

    },
  },
  mounted() {
    this.getTicket();
  }
}
</script>

<style>
.mb-3 {
  width: 943px;
  height: 691px;
  flex-shrink: 0;
  border-radius: 18px;
  background: #fff;
  max-width: 100%;
  display: flex;
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
</style>
