<template>
  <CCard class="p-3 mb-2 rounded-4 mx-auto">
  <CCardHeader class="bg-white border-white mb-1">
  </CCardHeader>
    <CRow class=" mb-2 justify-content-center" >
      <CCol :xs="12" :sm="6" :md="4" :lg="4" >
        <CCard class="p-3 mb-2 rounded-5 "  id="count_all">
          <CCardbody>
            <CRow :xs="{ cols: 1, gutter: 1}" :md="{ cols: 2 }">
              <CCol :xs="6" :md="6" class="d-flex flex-column align-items-center justify-content-center">
                <CImage class="LG" :src="LGall" />
              </CCol>
              <CCol :xs="6" :md="6" class="center_Text">
                <p id="font">{{ count_all }}</p>
                <p id="all">All Tickets</p>
              </CCol>
            </CRow>
          </CCardbody>
        </CCard>
      </CCol>
      <CCol :xs="12" :sm="6" :md="4" :lg="4">
        <CCard class="p-3 mb-2 rounded-5" id="count_open" >
          <CCardbody>
            <CRow :xs="{ cols: 1, gutter: 1}" :md="{ cols: 2 }">
              <CCol :xs="6" :md="6" class="d-flex flex-column align-items-center justify-content-center">
                <CImage class="LG" :src="LGopen"  />
              </CCol>
              <CCol :xs="6" :md="6"  >
                <p  id="font">{{ count_open }}</p>
                <p id="open">Open Tickets</p>
              </CCol>
            </CRow>
          </CCardbody>
        </CCard>
      </CCol>
      <CCol :xs="12" :sm="6" :md="4" :lg="4">
        <CCard class="p-3 mb-2 rounded-5 " id="count_close" >
          <CCardbody>
            <CRow :xs="{ cols: 1, gutter: 1}" :md="{ cols: 2 }">
              <CCol :xs="6" :md="6" class="d-flex flex-column align-items-center justify-content-center">
                <CImage class="LG " id="LGclose" :src="LGclose"  />
              </CCol>
              <CCol :xs="6" :md="6">
                <p id="font">{{ count_closed }}</p>
                <p id="closed">Closed Tickets</p>
              </CCol>
            </CRow>
          </CCardbody>
        </CCard>
      </CCol>
    </CRow>
  </CCard>
  <CElementCover v-if="loading" :opacity="0.5" />

</template>
<style scoped>

#all, #open, #closed {
  font-size: 20px;
  color: #fff;
  line-height: 2;
  margin-left: 10px;

}

#font {
  margin-top: 50px;
  font-weight: bold;
  text-align:start;
  font-size: 70px;
  color: #fff;
  line-height: 0.2;
  margin-left: 10px;
}
.LG {
  max-width: 100%; 
  width: 150px;
  height: auto;
  max-height: 150px;
}

#LGclose{
  max-width: 100%; 
  width: 130px; 
  height: auto;
  max-height: 150px;

}

#LineHeadCard {
  display: inline-block;
  border-bottom: 5px solid transparent;
  border-image: linear-gradient(to right, #ea5252, #030303);
  border-image-slice: 1;
}

#Icondashboard {
  width: auto;
  max-height: 30px;
  padding-left: 5px;
  padding-bottom: 5px;
  padding-right: 5px;
}

#count_all{
  background-color: #787878;
  max-height: 170px;
  height: auto;
  width: 100%; 
  max-width: 400px; 
  margin: 0 auto;
  
}

#count_open{
  background-color: #45AA91;
  max-height: 170px;
  height: auto;
  width: 100%; 
  max-width: 400px; 
  margin: 0 auto;
}

#count_close{
  background-color: #FF6464;
  max-height: 170px;
  height: auto;
  width: 100%; 
  max-width: 400px; 
  margin: 0 auto;
}



/* สำหรับหน้าจอขนาดเล็ก (เช่น 600px หรือน้อยกว่า) */
@media only screen and (max-width: 600px) {
  #font {
    font-size: 30px;

    white-space: nowrap; 
  }

  #all, #open, #closed {
    font-size: 14px; 
    white-space: nowrap; 
  }
}

/* สำหรับหน้าจอขนาดกลาง (เช่น 601px ถึง 1024px) */
@media only screen and (min-width: 601px) and (max-width: 1024px) {
  #font {
    font-size: 30px; 
    white-space: nowrap;
  }

  #all, #open, #closed {
    font-size: 13px; 
    white-space: nowrap; 
    
  }
}

/* สำหรับหน้าจอขนาดใหญ่ (เช่น 1025px ขึ้นไป) */
@media only screen and (min-width: 1025px) {
  #font {
  font-size: 70px;
  white-space: nowrap;
  }

  #all, #open, #closed {
    font-size: 20px;
    white-space: nowrap;
  }
}



</style>
  
<script>
import Icondashboard from '@/assets/images/Icon_dashboard.png'
import LGall from '@/assets/images/all_ticket.png'
import LGclose from '@/assets/images/close_ticket.png'
import LGopen from '@/assets/images/open_ticket.png'
import LGlogo from '@/assets/images/blackTick.png'
import axios from 'axios'
import { CBadge } from '@coreui/vue-pro'
export default {
  name: 'count_ticket',


  data() {
    return {
      count_all: '',
      count_open: '',
      count_closed: '',
      loading : false,

    };

  },
  setup() {

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

    return {
      LGall,
      LGclose,
      LGopen,
      LGlogo,
      getData,
      Icondashboard,
    };
  },

  methods: {


    async getCountall() {
      const userData = JSON.parse(localStorage.getItem('USER_DATA')); // ดึงข้อมูล USER_DATA จาก local storage
      const userId = userData.id.toString(); // ดึงค่า id จาก userData
      const allTicket = await axios.post(`${process.env.VUE_APP_URL}/mongoose/get/stts_tickets`, {
        where: {
          tkt_act: userId,
          tkt_status: { $ne: 'Cancel' }
        },
      });
      // console.log(allTicket)
      var countAll = 0;
      var countOpen = 0;
      var countClosed = 0;
      allTicket.data.forEach(element => {
        countAll++;
        if (element.tkt_status == 'Open') {
          countOpen++;
        } else if (element.tkt_status == 'Closed') {
          countClosed++;
        }

      });

      this.count_all = countAll;
      this.count_open = countOpen;
      this.count_closed = countClosed;
    },



  },
  mounted() {
    //เรียกใช้ฟังชั่นเมื่อโหลดหน้า
    this.getCountall();
    
    this.loading = true
    setTimeout(() => {
      this.loading = false
    }, 2000)


  }
}
</script>
  