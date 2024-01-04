<template>
  <CCard class="p-2 mb-2 rounded-4 mx-auto">
  <CCardHeader class="bg-white border-white mb-4">
    <div id="LineHeadCard">
      <h1 class="d-inline align-middle">
        <CImage id="Icondashboard" :src="Icondashboard" />
        <b>Dashboard</b>
      </h1>
    </div>
  </CCardHeader>
    <CRow class="mx-auto mb-4">
      <CCol :sm="4" :md="4" :lg="4">
        <CCard class="p-2 mb-2 rounded-5"  id="count_all">
          <CCardbody>
            <CRow :xs="{ cols: 1, gutter: 1}" :md="{ cols: 2 }">
              <CCol :xs="{ span: 6 }" :md="{ span: 6 }">
                <CImage class="LG" :src="LGall" />
              </CCol>
              <CCol :xs="{ span: 6 }" :md="{ span: 6 }">
                <p id="font">{{ count_all }}</p>
                <p id="all">All Tickets</p>
              </CCol>
            </CRow>
          </CCardbody>
        </CCard>
      </CCol>
      <CCol :sm="4" :md="4" :lg="4">
        <CCard class="p-2 mb-2 rounded-5" id="count_open" >
          <CCardbody>
            <CRow :xs="{ cols: 1, gutter: 1}" :md="{ cols: 2 }">
              <CCol :xs="{ span: 6 }" :md="{ span: 6 }">
                <CImage class="LG" :src="LGopen"  />
              </CCol>
              <CCol :xs="{ span: 6 }" :md="{ span: 6 }" >
                <p  id="font">{{ count_open }}</p>
                <p id="open">Open Tickets</p>
              </CCol>
            </CRow>
          </CCardbody>
        </CCard>
      </CCol>
      <CCol :sm="4" :md="4" :lg="4">
        <CCard class="p-2 mb-2 rounded-5 " id="count_close" >
          <CCardbody>
            <CRow :xs="{ cols: 1, gutter: 1}" :md="{ cols: 2 }">
              <CCol :xs="{ span: 6 }" :md="{ span: 6 }" >
                <CImage class="LG" id="LGclose" :src="LGclose"  />
              </CCol>
              <CCol :xs="{ span: 6 }" :md="{ span: 6 }">
                <p id="font">{{ count_closed }}</p>
                <p id="closed">Closed Tickets</p>
              </CCol>
            </CRow>
          </CCardbody>
        </CCard>
      </CCol>
    </CRow>
  </CCard>
</template>
<style scoped>

#all, #open, #closed {
  font-size: 24px;
  color: #fff;
  line-height: 2;
}

#font {
  margin-top: 50px;
  font-weight: bold;
  text-align:start;
  font-size: 70px;
  color: #fff;
  line-height: 0.2;
}
.LG {
  max-width: 150px;
  width: 150px;
  padding-left: 10px;
  padding-top: 30px;
}

#LGclose{
  max-width: 130px;
  width: 130px;
  margin-left: 10px;
  padding-top: 20px;
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
  height: 170px;
  max-width: 380px;
  width: 380px;
}

#count_open{
  background-color: #45AA91;
  max-height: 170px;
  height: 170px;
  max-width: 380px;
  width: 380px;
}

#count_close{
  background-color: #FF6464;
  max-height: 170px;
  height: 170px;
  max-width: 380px;
  width: 380px;
}




@media (max-width: 1440px) {
  #count_all, #count_open, #count_close {
    width: 100%;
    max-width: none;
  }

  #font {
    padding-top: 10px;
    padding-left: 5px; 
    font-size: 30px;
    line-height: 0;
  }

  #all, #open, #closed {
    padding-left: 5px; 
  }
  .LG {
    max-width: 100px; 
    width: 100%; 
    height: auto;
    margin-left: 5px; 
    padding-top: 45px; 
  }

  #LGclose{
    max-width: 80px; 
    width: 100%; 
    height: auto; 
    margin-left: 0px; 
    padding-top: 35px; 
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


  }
}
</script>
  