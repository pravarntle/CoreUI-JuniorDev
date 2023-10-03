<template>
    <div class="box">
      <CCard class="p-2">
        <CCardHeader>
          <CRow>
            <CCal>
              <h2><CIcon icon="cilBookmark" id="book" size="xxl" color="drak"/> Bookmark</h2>
            </CCal>
          </CRow>
          
        </CCardHeader>
        <CSmartTable
          :active-page="3"
          cleaner
          column-filter
          column-sorter
          :columns="columns"
          clickable-rows
          footer
          header
          :items-per-page="5"
          items-per-page-select
          :items="items"
          pagination
          table-filter
          :table-props="{
            striped: true,
            hover: true,
          }"
        >
        <template #status="{ item }">
        <td>
          <CBadge :color="getBadge(item.STATUS)">{{ item.STATUS }}</CBadge>
        </td>
      </template>

        <template #BOOKMARK="{ item, index }" >
          <td class="text-center">
            <CButton
              variant="outline"
              square
              size="xl"
              @click="toggleDetails(item, index)"
            >
            {{ Boolean(item._toggled) ? '👁️' : '🙈' }}
            </CButton>
          </td>
        </template>
          <!-- <template #status="{ item }">
            <td>
              <CBadge :color="getBadge(item.status)">{{ item.status }}</CBadge>
            </td>
          </template>
          <template #show_details="{ item, index }">
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
          </template>
          <template #details="{ item }">
            <CCollapse :visible="Boolean(item._toggled)">
              <CCardBody>
                <h4>
                  {{ item.username }}
                </h4>
                <p class="text-muted">User since: {{ item.registered }}</p>
                <CButton size="sm" color="info" class=""> User Settings </CButton>
                <CButton size="sm" color="danger" class="ml-1"> Delete </CButton>
              </CCardBody>
            </CCollapse>
          </template> -->
        </CSmartTable>
      </CCard>
    </div>
  
  </template>
  <style>
    #all{
      font-size: 24px;
      color: #1A72B8;
    }
    #open{
      font-size: 24px;
      color: #147A2A;
    }
    #closed{
      font-size: 24px;
      color: #B22424;
    }
    #font{
      font-weight: 700;
      align-items: center;
      font-size: 100px;
      color: #000;
    }
    #border{
      border-radius: 6%;
    }

  </style>
  
  <script>
  import { ref } from 'vue'
  import { CCol, CRow } from '@coreui/vue-pro'
  import axios from 'axios';
  export default {
      name: 'SmartTableBasixExample',
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
            { key: '#',_style: { width: '5%' }},
            { key: 'TicketID',_style: { width: '10%' }},            
            { key: 'TITLE', _style: { width: '10%' } },
            { key: 'START DATE', _style: { width: '11%' } },
            { key: 'STATUS', _style: { width: '10%' } },
            { key: 'TYPE', _style: { width: '10%' } },
            { key: 'BOOKMARK', _style: { width: '10%' } }
          ];
          // const items = ref(data);
          // const getBadge = (status) => {
          //     switch (status) {
          //         case 'Active':
          //             return 'success';
          //         case 'Inactive':
          //             return 'secondary';
          //         case 'Pending':
          //             return 'warning';
          //         case 'Banned':
          //             return 'danger';
          //         default:
          //             'primary';
          //     }
          // };
  
          const toggleDetails = (item) => {
              items.value[item.id] = {
                  ...item,
                  _toggled: !item._toggled,
              };
          };
          return {
              columns,
              items,
              getBadge,
              toggleDetails,
          };
      },
      components: { CRow, CCol },
      methods:{
      async getTicket(){
        try {
          const userData = JSON.parse(localStorage.getItem('USER_DATA')); // ดึงข้อมูล USER_DATA จาก local storage
          const userId = userData.id.toString(); // ดึงค่า id จาก userData

          const response = await axios.post('http://localhost:3000/mongoose/get/stts_tickets', {
            where: {
              tkt_act: userId,
              tkt_book:"true",

            },
          });
          console.log(response.data);
          console.log(userId)
          // นำข้อมูลที่ได้รับมาใส่ในตัวแปร items
          this.items = response.data.map((element, index) => ({
            '#': index + 1, // หมายเลขแถว
            TicketID: element.tkt_number, // ข้อมูล TicketID จาก response
            TITLE: element.tkt_title, // ข้อมูล tkt_title จาก response
            // นำข้อมูลอื่นๆ จาก response มาใส่ตามที่คุณต้องการ
            // ตามลำดับของ columns ในตัวแปร columns
            // เพิ่มเติมตามความต้องการ
            'START DATE': element.tkt_time,
            STATUS:element.tkt_status  ,
            TYPE: element.tkt_types,
            BOOKMARK: element.tkt_book,
            _toggled: false, // ให้เริ่มต้นเป็น false สำหรับการแสดงรายละเอียด
          }));
        } catch (error) {
          console.error('Error fetching data:', error);
        }

      },     
        
    },
    mounted(){
      //เรียกใช้ฟังชั่นเมื่อโหลดหน้า
      this.getTicket();
    }

  }
  </script>
  