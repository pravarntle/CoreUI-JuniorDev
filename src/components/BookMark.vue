<template>
    <div class="box">
      <CCard class="p-2">
        
          <div>
            <CRow>
                <CCol xs="auto">
                  <div Class="Bookmark">
                    <CImage :src="Icon_bookmark" width="36" height="36" />
                  </div>
                </CCol>
                <CCol xs="auto">
                  <div class="ml-2">
                    <h2 style="font-size: 36px; line-height: 1.2">
                      <b>Bookmark</b>
                    </h2>
                  </div>
                </CCol>
            </CRow>
          </div>
        <h1 style="width: 220px;
                border-bottom: 5px solid transparent;
                border-image: linear-gradient(to right, #EA5252, #030303);
                border-image-slice: 1;">
              </h1>
          
        
        <div class="table-responsive table-borderless">
        <CSmartTable
          :active-page="1"
          header
          :items="items"
          :columns="columns"
          columnFilter
          column-sorter
          clickable-rows
          :items-per-page="5"
          items-per-page-select
          pagination
          columnSorter
          :sorterValue="{ column: 'START DATE(Y/M/D)', state: 'desc', dateFormat: 'YYYY-MM-DD' }"
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
        <template #TYPE="{ item }">
        <td>
          
          <CBadge :color="getBadge(item.TYPE)">{{ item.TYPE }}</CBadge>
          
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
  import Icon_bookmark from '@/assets/images/Icon_bookmark.png'
  import { CCol, CRow } from '@coreui/vue-pro'
  import axios from 'axios';
  export default {
      name: 'BookMark',
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
            { key: 'START DATE(Y/M/D)', _style: { width: '11%' } },
            { key: 'STATUS', _style: { width: '5%' } },
            { key: 'TYPE', _style: { width: '4%' } },
            { key: 'BOOKMARK', _style: { width: '5%' } },
            { key: 'MORE',_style: { width: '5%' }},
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
  
          const toggleDetails =  async(item) => {

          item.BOOKMARK = !item.BOOKMARK;
          console.log(item.BOOKMARK)
          console.log(item)
          try {
            const itemId = item._id.toString(); 
            // ทำการอัปเดตข้อมูลใน MongoDB โดยใช้ Axios
            await axios.put(`${process.env.VUE_APP_URL}/mongoose/update/stts_tickets/${itemId}`, {
              data:{
                  tkt_book: item.BOOKMARK,
                  
               }
            });
            window.location.reload();
            // หลังจากอัปเดตสำเร็จ คุณสามารถทำสิ่งอื่นที่คุณต้องการได้ที่นี่
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
            await axios.put(`${process.env.VUE_APP_URL}/mongoose/update/stts_tickets/${itemId}`, {
              data:{
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
        async getTicket(){
          try {
            const userData = JSON.parse(localStorage.getItem('USER_DATA')); // ดึงข้อมูล USER_DATA จาก local storage
            const userId = userData.id.toString(); // ดึงค่า id จาก userData

            const response = await axios.post(`${process.env.VUE_APP_URL}/mongoose/get/stts_tickets`, {
              where: {
                tkt_act: userId,
                tkt_book:"true",
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
        
      },
    mounted(){
      //เรียกใช้ฟังชั่นเมื่อโหลดหน้า
      this.getTicket();
    }

  }
  </script>
  