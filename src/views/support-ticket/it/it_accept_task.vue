<template>
  <CCard class="p-2">
    <CCardbody class="vh-auto">
      <CRow>
        <div>
          <!-- ตรงนี้ต้องกดได้ เพื่อย้อนกลับ -->
          <!-- Icon สำหรับย้อนกลับ -->
          <CCol>
            <div class="text-start p-1 mt-1" >
              
              <CButton variant="outline" size="sm">
                <CImage  
                class="Arrow_Left text-left"
                :src="Arrow_Left"
                @click="backbutton"
                >
                </CImage>

              </CButton>
              <!-- <label style="margin-left: 920px;"> ใส่ ICON สำหรับไปรายละเอียด Ticket ต่อไป </label> -->
            </div>
          </CCol>
        </div>
      </CRow>
      <hr />
      <CRow class="g-0 align-items-center">
        <!-- <CImage class="Avatar_4" :src="Avatar_4" /> -->

        <CAvatar
          v-if="acountFile"
          class="Icon_user_man avatar-round ps-1"
          :src="`data:${acountFile};base64,${acountImage}`"
        />
        <CAvatar v-else class="Icon_user_man" :src="Icon_user_man" />
        <CCol class="p-3">
          <b> {{ firstname }}</b>
          <p class="small">{{ email }}</p>
        </CCol>
        <CCol class="text-end d-flex justify-content-end pe-5">
          <b> {{ formatDate(date) }} &nbsp; </b>
          <!-- <CBadge :color="getBadge(priorities)"><span > -->
          <CBadge class="d-flex align-items-center" :color="getBadge(priorities)"
                ><li>{{ priorities }}</li></CBadge
              >
          <!-- </span></CBadge> -->
        </CCol>
      </CRow>
      <hr />

      <!-- <CImage align="end" class="Short" :src="Short" /> -->
      <div class="clearfix text-end me-2">
        <b>{{ number }}</b>

        <CRow>
          <CCol xs="12">
            <CCardBody class="ms-3">
              <CCol class="text-start">
                <b class="fs-5"> Title : </b>
                <CCradText>{{ title }} </CCradText>
              </CCol>
              <CCol class="text-start">
                <b class="fs-5"> Type : </b>
                <CCradText> {{ type }} </CCradText>
              </CCol>
              <CCol class="text-start">
                <b class="fs-5"> Description : </b>
                <CCradText>
                  {{ description }}
                </CCradText>
              </CCol>
            </CCardBody>
          </CCol>
          <br />
        </CRow>
      </div>
    </CCardbody>
    <CCardFooter class="bg-white">

      <Crow class="text-start">
        <CCol class="ps-3 ms-5">
          

          <a v-if="picture">
            <a
              :href="`data:${picture.filetype};base64,${picture.image}`"
              alt=""
              class="mw-auto"
              download
              >{{ `${picture.filename}` }}</a
            >
          </a>

          <br />
        </CCol>
        <br />
      </Crow>
      <hr />
      <div class="text-end ">
        <CButton
          class="btn-sec fw-bolder fs-4 text-white rounded-5 custom-btn"
          color="success"
          @click="modalShow"
          >Accept</CButton
        >
        <CModal alignment="center"  :keyboard="false" :visible="visibleShow"
              @close="() => { visibleShow = false }">
              
              <CModalBody>
                <CModalTitle id="headModal">Are you sure you want to <font class="Highlight-font-alert">Accept This Ticket?</font>
                </CModalTitle>
                <hr>
                When you click on confirm button, the ticket will be Accept.
              </CModalBody>
              <CModalFooter>
                
                <CButton color="primary" @click="acceptButton"
                  :key="confirmCancelIndex" @mouseup.stop="">Confirm</CButton>
              </CModalFooter>
            </CModal>
      </div>
    </CCardFooter>
  </CCard>
</template>

<script>
import Arrow_Left from '@/assets/images/Arrow_Left.png'
import File_test from '@/assets/images/file_test.jpg'
import Short from '@/assets/images/Short.jpg'
import Icon_user_man from '@/assets/images/icon_user_man.jpg'
import commit from '@/assets/images/commit.png'
import axios from 'axios'
import dayjs from 'dayjs'

import { CBadge, CButton, CFormInput } from '@coreui/vue-pro'

import 'dayjs/locale/th'
import 'dayjs/plugin/timezone' // นำเข้าโมดูล timezone
import {
  CAvatar,
  CCardBody,
  CCardImage,
  CCardText,
  CCardTitle,
  CCol,
  CImage,
  CRow,
} from '@coreui/vue-pro'
export default {
  name: 'comment',
  setup() {
    const getBadge = (priority) => {
        switch (priority) {
          case 'High':
            return 'danger bg-opacity-50 text-danger'
          case 'Medium':
            return 'warning bg-opacity-50 text-warning'
          case 'Low':
            return 'success bg-opacity-50 text-success'
          default:
            return 'secondary'
        }
      }
    return {
      Arrow_Left,
      Icon_user_man,
      Short,
      commit,
      getBadge,
    }
  },
  components: {
    CRow,
    CImage,
    CCol,
    CAvatar,
    CCardBody,
    CCardTitle,
    CCardImage,
    CCardText,
    CFormInput,
    CButton,
    CBadge,
  },
  data() {
    return {
      uploadImage: '',
      uploadFile: '',
      form: {
        // Initialize the form object
        cmt_message: '',
        cmt_link: '',
        cmt_picture: '',
        cmt_file: '',
        cmt_date: '',
        cmt_act: '',
        cmt_tkt: '',
      },
      ticketId: '',
      type: '',
      description: '',
      title: '',
      priorities: '',
      picture: '',
      avatar: '',
      acountFile: '',
      acountImage: '',
      firstname: '',
      email: '',
      date: '',
      number: '',
      accId: '',
      actId:'',
      allUpdate: {
        mod_act: '',
        mod_date: '',
        mod_status: '',
        mod_tkt: '',
      },
      notifications:{
        not_datetime:'',
        not_status:'',
        not_type:'',
        not_act:'',
        not_tkt:'',
        not_cmt:'',
        not_acc:'',
      },
      visibleShow:false,
      //notย่อมาจาก notifications
    }
  },
  methods: {
    async getTicket() {
      try {
        const ticketId = this.ticketId

        const response = await axios.post(
          `${process.env.VUE_APP_URL}/mongoose/getOne/stts_tickets/${ticketId}`,
          {
            populate: [
              {
                path: 'tkt_act',
                populate: 'act_picture',
              },
              'tkt_picture',
            ],
          },
        )
        this.type = response.data.tkt_types
        this.description = response.data.tkt_description
        this.title = response.data.tkt_title
        this.priorities = response.data.tkt_priorities
        this.picture = response.data.tkt_picture
        this.date = response.data.tkt_time
        this.acountFile = response.data.tkt_act.act_picture.filetype
        this.acountImage = response.data.tkt_act.act_picture.image
        this.email = response.data.tkt_act.act_email_address
        this.firstname = response.data.tkt_act.act_first_name_eng
        this.number = response.data.tkt_number
        this.actId = response.data.tkt_act._id
        // this.email = response.data.tkt_act.act_email_address;
        // this.firstname = response.data.tkt_act.act_first_name_eng;

        // นำข้อมูลที่ได้รับมาใส่ในตัวแปร items
        // this.getAcount();
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    async acceptButton() {
      dayjs.locale('th')
      dayjs.extend(require('dayjs/plugin/timezone'))
      dayjs.tz.setDefault('Asia/Bangkok')
      const userData = JSON.parse(localStorage.getItem('USER_DATA')) // ดึงข้อมูล USER_DATA จาก local storage
      const userId = userData.id // ดึงค่า id จาก userData
      const date = dayjs()
      const ticket_date = `${date.format('DD/MM/YYYY-HH:mm:ss:SSS')}`

      console.log(ticket_date)
      console.log(userId)
      try {
        const dataResponse = await axios
          .post(
            `${process.env.VUE_APP_URL}/mongoose/insert/stts_accept_tickets`,
            {
              data: {
                acc_time: ticket_date,
                acc_act: userId,
              },
            },
          )
          .catch((err) => {
            console.log(error)
          })
        this.accId = dataResponse.data._id
        this.updateTicket();
      } catch (error) {
        console.log(error)
      }
    },
    async updateTicket() {
      dayjs.locale('th')
      dayjs.extend(require('dayjs/plugin/timezone'))
      dayjs.tz.setDefault('Asia/Bangkok')
      const date = dayjs()
      const ticket_date = `${date.format('YYYY-MM-DD')}`
      const userData = JSON.parse(localStorage.getItem('USER_DATA')) // ดึงข้อมูล USER_DATA จาก local storage
      const userId = userData.id // ดึงค่า id จาก userData
      try {
        const ticketId = this.ticketId
        // ทำการอัปเดตข้อมูลใน MongoDB โดยใช้ Axios
        await axios
          .put(
            `${process.env.VUE_APP_URL}/mongoose/update/stts_tickets/${ticketId}`,
            {
              data: {
                tkt_status: 'Open',
                tkt_acc: this.accId,
                tkt_accept: userId,
                tkt_last_update:ticket_date,
              },
            },
          )
          .then((result) => {
            console.log('222')
            this.allUpdate.mod_status = result.data.tkt_status
            this.allUpdate.mod_tkt = result.data._id
            this.updateStatus()
          })
          .catch((err) => {
            console.log(error)
          })
        // หลังจากอัปเดตสำเร็จ คุณสามารถทำสิ่งอื่นที่คุณต้องการได้ที่นี่
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการอัปเดตข้อมูล:', error)
      }
    },
    async updateStatus() {
      const userData = JSON.parse(localStorage.getItem('USER_DATA'))
      dayjs.locale('en')
      dayjs.extend(require('dayjs/plugin/timezone'))
      dayjs.tz.setDefault('Asia/Bangkok')
      const date = dayjs()
      dayjs.extend(require('dayjs/plugin/timezone'))
      dayjs.extend(require('dayjs/plugin/customParseFormat'))
      dayjs.extend(require('dayjs/plugin/localizedFormat'))
      const accept_date = `${date.format('D MMM YYYY, h:mm A')}`
      const userId = userData.id
      this.allUpdate.mod_date = accept_date
      this.allUpdate.mod_act = userId

      console.log(this.allUpdate)
      try {
        
        await axios
          .post(
            `${process.env.VUE_APP_URL}/mongoose/insert/stts_modifications`,
            {
              data: this.allUpdate,
            },
          )
          .then((result) => {
            console.log("เข้าthen")
            this.notification();
            this.$router.push('/support-ticket/it/it_my_task')
          })
          .catch((err) => {
            console.log(error)
          })
      } catch (error) {
        console.log(error)
      }
    },
    async backbutton(){
      this.$router.push({ name: 'ST - it_dashboard'});
      console.log(this.$route);
    },
    formatDate: function(dateString) {
      const options = { day: '2-digit', month: 'short', year: 'numeric' };
      return new Date(dateString).toLocaleDateString('en-GB', options);
    },
    async notification() {
      const userData = JSON.parse(localStorage.getItem('USER_DATA'))
      dayjs.locale('en')
      dayjs.extend(require('dayjs/plugin/timezone'))
      dayjs.tz.setDefault('Asia/Bangkok')
      const date = dayjs()
      dayjs.extend(require('dayjs/plugin/timezone'))
      dayjs.extend(require('dayjs/plugin/customParseFormat'))
      dayjs.extend(require('dayjs/plugin/localizedFormat'))
      const noti_date = `${date.format('D MMM YYYY, h:mm A')}`
      const userId = userData.id
      this.notifications.not_datetime = noti_date
      this.notifications.not_act = this.actId
      this.notifications.not_type = 'Status'
      this.notifications.not_tkt = this.ticketId
      this.notifications.not_cmt = null
      this.notifications.not_status = false
      this.notifications.not_acc = this.accId
      console.log(this.notifications)
      try {
        await axios
          .post(
            `${process.env.VUE_APP_URL}/mongoose/insert/stts_notifications`,
            {
              data: this.notifications,
            },
          )
      } catch (error) {
        console.log(error)
      }
    },
    modalShow(){
      this.visibleShow=true;

    },
   
  },
  mounted() {
    const ticketId = this.$route.params.itemId
    this.ticketId = ticketId
    this.getTicket()
  },
}
</script>
<style scoped>
.avatar-round {
  width: 100px;
  /* ปรับขนาดตามที่ต้องการ */
  height: 100px;
  /* ปรับขนาดตามที่ต้องการ */
  border-radius: 50%;
  /* ทำให้รูปเป็นวงกลม */
}

.Arrow_Left {
  width: 35px;
}

.Icon_user_man {
  /* margin-left: 0.5pc; */
  width: 56px;
  height: 56px;
}

.Short {
  width: 60px;
}

.Cte {
  margin-right: 50%;
}

.AL {
  display: flex;
  justify-content: space-between;
  width: 35px;
}

.File_test {
  width: 20px;
  height: 20px;
}

.Dis_Between {
  display: flex;
  justify-content: space-between;
}

.vh-55 {
  height: 55vh;
}

.custom-btn {
  width: 150px;
  /* และคุณสามารถเพิ่มสไตล์อื่น ๆ ตามต้องการ */
}
#headModal {
  text-align: left;
}

</style>
