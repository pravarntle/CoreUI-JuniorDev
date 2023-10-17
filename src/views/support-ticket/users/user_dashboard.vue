<template>
  <div class="box">
    <CRow>
      <Ccrad>
        <CCardHeader>
          <h1
            style="
              width: 180px;
              border-bottom: 5px solid transparent;
              border-image: linear-gradient(to right, #ea5252, #030303);
              border-image-slice: 1;
            "
          >
            Dashboard
          </h1>
        </CCardHeader>
        <CRow style="height: auto;">
          <CCol :sm="4">
            <CCard class="p-2 mb-2" id="border" >
              <CCardbody>
                <b id="all">All Tickets</b>
                <CRow>
                  <CCol>
                    <p class="ps-5 ms-3" id="font">{{ count_all }}</p>
                  </CCol>
                  <CCol class="mt-5">
                    <CImage class="LG" :src="LGblue" fluid block />
                  </CCol>
                </CRow>
              </CCardbody>
            </CCard>
          </CCol>
          <CCol :sm="4">
            <CCard class="p-2 mb-2" id="border" >
              <CCardbody>
                <b id="open">Open Tickets</b>
                <CRow>
                  <CCol>
                    <p class="ps-5 ms-3" id="font">{{ count_open }}</p>
                  </CCol>
                  <CCol class="mt-5">
                    <CImage class="LG" :src="LGgreen" fluid block />
                  </CCol>
                </CRow>
              </CCardbody>
            </CCard>
          </CCol>
          <CCol :sm="4">
            <CCard class="p-2 mb-2" id="border" >
              <CCardbody>
                <b id="closed">Closed Tickets</b>
                <CRow>
                  <CCol>
                    <p class="ps-5 ms-3" id="font">{{ count_closed }}</p>
                  </CCol>
                  <CCol class="mt-5">
                    <CImage class="LG" :src="LGred" fluid block />
                  </CCol>
                </CRow>
              </CCardbody>
            </CCard>
          </CCol>
        </CRow>
      </Ccrad>
    </CRow>
    <my_tickets/>
    
  </div>
</template>
<style>
.text-right-header {
  text-align: right;
}
#all {
  font-size: 24px;
  color: #1a72b8;
}
#open {
  font-size: 24px;
  color: #147a2a;
}
#closed {
  font-size: 24px;
  color: #b22424;
}
#font {
  font-weight: 700;
  align-items: center;
  font-size: 100px;
  color: #000;
}
.LG {
  width: 100px;
  max-height: 100px;

}

#border {
  height: 220px;
  border-radius: 15px;
}

.table-responsive {
  overflow-x: auto;
  max-width: 100%;
}
</style>

<script>
import { CCol, CRow } from '@coreui/vue-pro'
import LGblue from '@/assets/images/blueTick.png'
import LGred from '@/assets/images/redTick.png'
import LGgreen from '@/assets/images/greenTick.png'
import LGlogo from '@/assets/images/blackTick.png'
import axios from 'axios'
import my_tickets from '@/components/my_tickets.vue'
import { CBadge } from '@coreui/vue-pro'
export default {
  name: 'SmartTableBasixExample',


    data(){
      return {
            count_all:'',
            count_open:'',
            count_closed:'',

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
            LGblue,
            LGgreen,
            LGred,
            LGlogo,
            getData,
        };
    },

    components: { CRow, CCol , my_tickets},
    methods:{


      async getCountall (){
        const userData = JSON.parse(localStorage.getItem('USER_DATA')); // ดึงข้อมูล USER_DATA จาก local storage
          const userId = userData.id.toString(); // ดึงค่า id จาก userData
          const allTicket = await axios.post(`${process.env.VUE_APP_URL}/mongoose/get/stts_tickets`, {
            where: {
              tkt_act: userId,
              tkt_status: { $ne: 'Cancel' }
            },
          });
          // console.log(allTicket)
        var countAll =0;
        var countOpen =0;
        var countClosed =0;
        allTicket.data.forEach(element => {
            countAll++;
            if(element.tkt_status=='Open'){
              countOpen++;
            }else if(element.tkt_status=='Closed'){
              countClosed++;
            }

          });

          this.count_all=countAll;
          this.count_open=countOpen;
          this.count_closed=countClosed;
      },



    },
    mounted(){
      //เรียกใช้ฟังชั่นเมื่อโหลดหน้า
      this.getCountall();
      

    }
  }
</script>
