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
        <div class="table-responsive table-borderless">
        <CSmartTable
          :active-page="1"
          header
          cleaner
          :items="items"
          :columns="columns"
          columnFilter
          column-sorter
          clickable-rows
          table-filter
          :items-per-page="5"
          items-per-page-select
          pagination
          columnSorter
          :sorterValue="{ column: 'status', state: 'asc' }"
          :table-props="{
            striped: true,
            hover: true,
          }"
        >
        <template #STATUS="{ item }">
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
            {{ Boolean(item.BOOKMARK) ? '👁️' : '🙈' }}
            </CButton>
          </td>
        </template>
        <template #MORE="{ item, index }" >
          <td class="text-center">
            <CButton
              color="primary"
              variant="outline"
              square
              size="xl"
              @click="toggleButton(item, index)"
            >
            {{ Boolean(item.MORE) ? 'Hide' : 'Show' }}
            </CButton>
          </td>
        </template>
        <template #details="{ item , index }">
          <CCollapse :visible="Boolean(item.MORE)">
            <CCardBody>
              <h4>
                {{ item.tkt_title }}
              </h4>
              <CButton size="sm" color="info" class="" @click="contactIt(item , index)"> ติดต่อ It Suport </CButton>
              <CButton size="sm" color="danger" class="ml-3" @click="buttonCancel(item, index)"> Cancel </CButton>
            </CCardBody>
          </CCollapse>
        </template>
        </CSmartTable>
      </div>
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
            { key: 'STATUS', _style: { width: '5%' } },
            { key: 'TYPE', _style: { width: '4%' } },
            { key: 'BOOKMARK', _style: { width: '5%' } },
            { key: 'MORE',_style: { width: '5%' }},
          ];
          const items = ref([]);
          const getBadge = (tkt_status) => {
            switch (tkt_status) {
              case 'Pending':
                return 'success';
              case 'Open':
                return 'secondary';
              case 'Closed':
                return 'warning';
              case 'Banned':
                return 'danger';
              default:
                return 'primary'; // Return a default color if none of the cases match.
            }
          };
  
          const toggleDetails =  async(item) => {

          item.BOOKMARK = !item.BOOKMARK;
          console.log(item.BOOKMARK)
          console.log(item)
          try {
            const itemId = item._id.toString(); 
            // ทำการอัปเดตข้อมูลใน MongoDB โดยใช้ Axios
            await axios.put(`http://localhost:3000/mongoose/update/stts_tickets/${itemId}`, {
              data:{
                  tkt_book: item.BOOKMARK,
                  
               }
            });

            // หลังจากอัปเดตสำเร็จ คุณสามารถทำสิ่งอื่นที่คุณต้องการได้ที่นี่
            console.log('อัปเดต BOOKMARK และส่งข้อมูลไปยัง MongoDB สำเร็จ');
          } catch (error) {
            console.error('เกิดข้อผิดพลาดในการอัปเดตข้อมูล:', error);
          }
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
        async contactIt(item){
        const itemId = item._id.toString(); 

        this.$router.push({ name: 'ST - comment Ticket', params: { itemId } });
        console.log('Item ID:', itemId);
      },
      async buttonCancel(item) {

      try {
        const itemId = item._id.toString(); 
        // ทำการอัปเดตข้อมูลใน MongoDB โดยใช้ Axios
        await axios.put(`http://localhost:3000/mongoose/update/stts_tickets/${itemId}`, {
          data:{
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
      async toggleButton(item) {
        item.MORE = !item.MORE;
        },
      async getTicket(){
        try {
          const userData = JSON.parse(localStorage.getItem('USER_DATA')); // ดึงข้อมูล USER_DATA จาก local storage
          const userId = userData.id.toString(); // ดึงค่า id จาก userData

          const response = await axios.post('http://localhost:3000/mongoose/get/stts_tickets', {
            where: {
              tkt_act: userId,
              tkt_book:"true",
              tkt_status: { $ne: 'Cancel' }

            },
          });
          console.log(response.data);
          console.log(userId)
          // นำข้อมูลที่ได้รับมาใส่ในตัวแปร items
          this.items = response.data.map((element, index) => ({
            '#': index + 1, // หมายเลขแถว
            _id:element._id,
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
  