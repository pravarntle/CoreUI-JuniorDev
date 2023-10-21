<template>
  <div>
    <CCard>
      <div
        style="
          width: 225px;
          border-bottom: 5px solid transparent;
          border-image: linear-gradient(to right, red, blue);
          border-image-slice: 1;
          padding: 3px;
          margin: 30px;
        "
      >
        <h2><b>New Ticket</b></h2>
      </div>
      <CCardBody>
        <CForm  :validated="form.validatedCustom01" >
          <CRow class="mb-2">
            <div class="col-lg-1"></div>
            <CFormLabel class="col-lg-2 col-md-12 col-form-label"> </CFormLabel>
            <div class="col-lg-7 col-md-12">
              <h5><b> Title </b></h5>
              <CFormInput
               type="text"
               id ="tkt_title"
               name = "tkt_title"
                v-model="form.tkt_title"
                feedbackInvalid="ห้ามเว้นว่าง"
                :invalid="validate.tkt_title"
                required
              />
            </div>
          </CRow>
          <CRow class="mb-2">
            <div class="col-lg-1"></div>
            <CFormLabel class="col-lg-2 col-md-12 col-form-label"></CFormLabel>
            <div class="col-lg-7 col-md-12">
              <h5><b>Type</b></h5>
              <CFormSelect
                v-model="form.tkt_types"
                :options="typeOptions"
                feedbackInvalid="ห้ามเว้นว่าง"
                :invalid="validate.tkt_types"
                required
                @change="checktype"
              />
            </div>
          </CRow>
          <CRow class="mb-2">
            <div class="col-lg-1"></div>
            <CFormLabel class="col-lg-2 col-md-12 col-form-label"></CFormLabel>
            <div class="col-lg-7 col-md-12">
              <h5><b>Priority</b></h5>
              <CFormSelect
                v-model="form.tkt_priorities"
                :options="piorityOptions"
                feedbackInvalid="ห้ามเว้นว่าง"
                :invalid="validate.tkt_priorities"
                required
                @change="checkpiority"
              />
            </div>

          </CRow>
          <CRow class="mb-2">
            <div class="col-lg-1"></div>

            <CFormLabel class="col-lg-2 col-md-12 col-form-label"> </CFormLabel>
            <div class="col-lg-7 col-md-12">
              <h5><b>Description</b></h5>
              <CFormTextarea
                v-model="form.tkt_description"
                feedbackInvalid="ห้ามเว้นว่าง"
                :invalid="validate.tkt_description"
                required
                id="validationTextarea"
                rows="4"
              />
            </div>
          </CRow>

          <!-- <CRow class="mb-2">
            <div class="col-lg-1"></div>
            <CFormLabel class="col-lg-2 col-md-12 col-form-label"></CFormLabel>
            <div class="col-lg-7 col-md-12">
              <h5><b>Upload A File</b></h5>
              <CFormInput
                type="file"
                size="lg"
                id="formFileLg"
                v-model="form.tkt_picture"
                :invalid="validate.tkt_picture"
                required
              />
            </div>
          </CRow>
          <div class="clearfix text-end">
            <CButton
              color="secondary"
              @click="vaildateBeforeSave, createToast"
              style="
                font-weight: bold;
                font-size: x-large;
                width: 150px;
                color: white;
                border-radius: 20px;
              "
              >Cancle</CButton
            >
            <CButton
              class="btn-sec"
              color="success"
              @click="vaildateBeforeSave"
              style="
                font-weight: bold;
                font-size: x-large;
                width: 150px;
                color: white;
                border-radius: 20px;
              "
              >Submit</CButton
            >
          </div>
          <CElementCover :opacity="0.5" v-if="pageLoading" /> -->
        <CRow class="mb-2">
          <div class="col-lg-1"></div>
          <CFormLabel class="col-lg-2 col-md-12 col-form-label"></CFormLabel>
          <div class="col-lg-7 col-md-12">
            <h5><b>Upload A File</b></h5>
            <CFormInput
              type="file"
              size="lg"
              id="formFileLg"
              required
              accept=".png, .jpg, .jpeg , .txt, .pdf, .docx ,.xlsx"
              @change="onFileUpload"
              :invalid="validate.tkt_picture"
            />
          </div>
        </CRow>
        <div class="clearfix text-end">
          <CButton color="secondary" @click="vaildateBeforeSave, createToast" style="font-weight: bold; font-size: x-large; width: 150px; color: white; border-radius: 20px;">Cancle</CButton>
          <CButton class="btn-sec" color="success" @click="vaildateBeforeSave" style="font-weight: bold; font-size: x-large; width: 150px; color: white; border-radius: 20px;">Submit</CButton>
        </div>
        <CElementCover :opacity="0.5" v-if="pageLoading" />
        </CForm>
      </CCardBody>
    </CCard>
  </div>
</template>
<style>
/* เพิ่ม CSS Media Query เพื่อปรับแต่งการ padding-left เมื่อหน้าจอเล็ก */
/* @media (max-width: 768px) {
  .col-lg-3.col-md-12 h5 {
    padding-left: 0;
  }
} */

/* .footer {
  display: flex;
  justify-content: end;
} */
.btn-sec {
  margin: 5px;
}
</style>

<script>
import dayjs from 'dayjs'
import 'dayjs/locale/th'
import 'dayjs/plugin/timezone' // นำเข้าโมดูล timezone
import { CForm, CFormLabel } from '@coreui/vue-pro'
import axios from 'axios'

export default {
  data() {
    return {
      form: {
        tkt_number: '',
        tkt_description: '',
        tkt_picture: '',
        tkt_title: '',
        tkt_time: '',
        tkt_last_update: '',
        tkt_status: '',
        tkt_priorities: '',
        tkt_types: '',
        tkt_book: '',
        tkt_act: '',
        validatedCustom01: false,
      },

      userOptions: [],
      userOptions: [],
      genderOptions: [],
      pageLoading: false,
      validatedCustom01: null,
      validate: {
        ticket: null,
      },
      toasts: [],
    }
  },
  //สร้างข้อมูลของ Options ต่างๆใน selectfrom
  created() {
    ;(this.piorityOptions = [
      { label: 'Select Priority', value: '' },
      { label: 'Low', value: 'Low' },
      { label: 'Mediem', value: 'Medium' },
      { label: 'High', value: 'High' },
      { label: 'ไม่ระบุ', value: 'none', disabled: true },
    ]),
      (this.typeOptions = [
        { label: 'Select type', value: '' },
        { label: 'Software', value: 'Software' },
        { label: 'Hardware', value: 'Hardware' },
        { label: 'Service Request', value: 'Service' },
        { label: 'ไม่ระบุ', value: 'none', disabled: true },
      ])
    // this.getUser()
  },

  methods: {
    //เรียกใช้ฟังกืชั่น get จาก server ดึงข้อมูลจาก model stts_account
    // async getUser(){
    //   const user= await axios.get('http://localhost:3000/mongoose/get/stts_accounts')
    //   const users= await axios.post('http://localhost:3000/mongoose/get/stts_tickets',{populate:['tkt_act']})
    //   console.log(users)
    //   user.data.forEach(element => {
    //     this.userOptions.push({value:element._id,label:element.act_username})

    //   });

    // },
    async getType() {
      const type = await axios.get(
        `${process.env.VUE_APP_URL}/mongoose/get/stts_types`,
      )
      const types = await axios.post(
        `${process.env.VUE_APP_URL}/mongoose/get/stts_types`,
      ) //,{populate:['tkt_act']}
      console.log(types)
      type.data.forEach((element) => {
        this.userOptions.push({ value: element._id, label: element.typ_name })
      })
    },
    //ฟังก์ชั่นตรวจข้อมูลว่าไม่ส่งค่าเปล่า

    vaildateBeforeSave() {
      let error = false;
      if (this.form.tkt_title === '') {
        error = true;
        this.validate.tkt_title = false;
      }
      if (this.form.tkt_types === '') {
        error = true
        this.validate.tkt_types = false
      }
      if (this.form.tkt_priorities === '') {
        error = true
        this.validate.tkt_priorities = false
      }
      if (this.form.tkt_description === '') {
        error = true
        this.validate.tkt_description = false
      }


      if (!error) {
        this.onSave()
      } else {
        
        this.form.validatedCustom01 = true; // เปลี่ยนเป็น true เมื่อคลิก "Submit"
        
      }
    },
    //แสดงค่าทุกครั้งที่กดเปลี่ยนข้อมูลในselectชั่น
    checktype(events) {
      console.log(events.target.value)
    },
    //แสดงค่าทุกครั้งที่กดเปลี่ยนข้อมูลในselectชั่น
    checkpiority(events) {
      console.log(events.target.value)
    },
    //กดบันทึกแล้วเซฟข้อมูลลงดาต้า
    async onSave() {
      dayjs.locale('th')
      dayjs.extend(require('dayjs/plugin/timezone'))
      dayjs.tz.setDefault('Asia/Bangkok')

      const userData = JSON.parse(localStorage.getItem('USER_DATA')) // ดึงข้อมูล USER_DATA จาก local storage
      const userId = userData.id // ดึงค่า id จาก userData
      const date = dayjs()   
      const ticket_status = `Pending`
      const ticket_date = `${date.format('DD/MM/YYYY-HH:mm:ss:SSS')}`
      const ticket_number = `TKT-${date.format('DDMMYYYYHHmmssSSS')}`
      this.form.tkt_picture = this.form.tkt_picture || null;

      this.form.tkt_time = ticket_date
      this.form.tkt_number = ticket_number
      this.form.tkt_act = userId
      this.form.tkt_status = ticket_status
      this.form.tkt_book = false
      console.log(this.form)

      try {
        await axios
          .post(`${process.env.VUE_APP_URL}/mongoose/insert/stts_tickets`, {
            data: this.form,
          })
          .then((result) => {
            this.$router.push('/support-ticket/user/dashboard')
          })
          .catch((err) => {
            console.log(error)
          })
      } catch (error) {
        console.log(error)
      }
    },
    createToast() {
      this.toasts.push({
        title: 'Create Ticket',
        content: 'สร้างสำเร็จ',
      })
    },
    async onFileUpload(event) {
        const uploadFile = event.target.files[0]
        const formData = new FormData()
        formData.append('file', uploadFile)
      
        const dataResponse = await axios.post(`${process.env.VUE_APP_URL}/mongoose/upload/stts_files`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        this.form.tkt_picture = dataResponse.data._id
      },
  },
  components: { CForm, CFormLabel },
}
</script>
