<template>
  <div>
    <CCard class="p-4 rounded-4">
      <div class="d-inline ms-2">
        <div class="ticket-header">
          <CImage id="Icon_my_ticket" :src="Ticketlogo" />
        <h2 class="d-inline align-middle"><b>My Tickets</b></h2>
        </div>
      </div>
      <CCardBody>
        <CForm>
          <CRow class="mb-2">
            <div class="col-lg-1"></div>
            <CFormLabel class="col-lg-2 col-md-12 col-form-label"> </CFormLabel>
            <div class="col-lg-7 col-md-12">
              <h5>
                <b>Title <span id="required">*</span> </b>
              </h5>
              <CFormInput type="text" id="tkt_title" name="tkt_title" v-model="form.tkt_title"
                feedbackInvalid="Please input title." :invalid="validate.tkt_title" required />
            </div>
          </CRow>
          <CRow class="mb-2">
            <div class="col-lg-1"></div>
            <CFormLabel class="col-lg-2 col-md-12 col-form-label"></CFormLabel>
            <div class="col-lg-7 col-md-12">
              <h5>
                <b>Type <span id="required">*</span></b>
              </h5>
              <CFormSelect v-model="form.tkt_types" :options="typeOptions" feedbackInvalid="Please select type."
                :invalid="validate.tkt_types" required @change="checktype" />
            </div>
          </CRow>
          <CRow class="mb-2">
            <div class="col-lg-1"></div>
            <CFormLabel class="col-lg-2 col-md-12 col-form-label"></CFormLabel>
            <div class="col-lg-7 col-md-12">
              <div class="d-flex align-items-center">
                <!-- ใช้ d-flex จัดให้ Priority และ popup_priority อยู่ในบรรทัดเดียวกัน -->
                <h5>
                  <b>Priority <span id="required">*</span></b>
                </h5>
                <div class="popup" @mouseover="togglePopup">
                  <CAvatar class="popup_priority" :src="popup_priority" />
                  <div class="popuptext" :class="{ show: isPopupVisible }" @mouseover="togglePopup">
                    <p>
                      <font id="low-priority">Low = ดำเนินการภายใน 72 ชม.</font>
                      <br />
                      <font id="medium-priority">Medium = ดำเนินการภายใน 48 ชม.</font>
                      <br />
                      <font id="high-priority">High = ดำเนินการภายใน 24 ชม.</font>
                    </p>
                  </div>
                </div>
              </div>
              <CFormSelect v-model="form.tkt_priorities" :options="piorityOptions"
                feedbackInvalid="Please select priority." :invalid="validate.tkt_priorities" required
                @change="checkpiority" />
            </div>
          </CRow>
          <CRow class="mb-2">
            <div class="col-lg-1"></div>
            <CFormLabel class="col-lg-2 col-md-12 col-form-label"> </CFormLabel>
            <div class="col-lg-7 col-md-12">
              <h5>
                <b>Description <span id="required">*</span></b>
              </h5>
              <CFormTextarea v-model="form.tkt_description" feedbackInvalid="Please input description."
                :invalid="validate.tkt_description" required id="validationTextarea" rows="4" />
            </div>
          </CRow>
          <CRow class="mb-2">
            <div class="col-lg-1"></div>
            <CFormLabel class="col-lg-2 col-md-12 col-form-label"></CFormLabel>
            <div class="col-lg-7 col-md-12 mb-4">
              <h5>
                <b>Upload File</b>
              </h5>
              <CCard id="custom-card">
                <label for="formFileLg">
                  <div class="custom-file-upload mt-3">
                    <input type="file" size="lg" id="formFileLg" required
                      accept=".png, .jpg, .jpeg, .txt, .pdf, .docx, .xlsx" @change="onFileUpload"
                      :invalid="validate.tkt_picture" feedbackInvalid="ห้ามเว้นว่าง" />

                    <div>
                      <CImage class="Cloud" :src="Cloud">
                      </CImage>
                      <br />
                      <h6 id="uploaded-file">
                        {{ uploadedFileName || 'Upload' }}
                      </h6>
                    </div>
                  </div>
                </label>
              </CCard>
            </div>

            <CElementCover :opacity="0.5" v-if="pageLoading" />
          </CRow>
          <div class="clearfix text-end">
            <CButton color="secondary" @click="cancel" id="cancel-button">Cancel</CButton>
            <CModal alignment="center" :visible="visibleVerticallyCenteredDemo" @close="() => {
              visibleVerticallyCenteredDemo = false
            }
              ">
              <CModalBody>
                <h2 class="cancel-heading"  id="button-head">Cancel</h2>
                <p class="ms-2" id="popup-detail">
                  Are you sure you want to
                  <span id="detail-for-cancel">Cancel The Ticket ?</span>
                </p>
                <br />
                <hr />
                <CButton color="light" @click="() => { visibleVerticallyCenteredDemo = false }">
                  Cancel
                </CButton>
                <CButton class="ms-2" color="info" id="confirm-btn-in-detail" @click="confirm">
                  Confirm
                </CButton>
              </CModalBody>
            </CModal>
            <CButton class="btn-sec" color="success" id="submit-button" @click="visibleSubmit = true">
              Submit
            </CButton>
            <CModal alignment="center" :visible="visibleSubmit" @close="() => {
              visibleSubmit = false
            }
              ">
              <CModalBody>
                <h2 class="ms-3" id="button-head">
                  Submit
                </h2>
                <p class="ms-2" id="popup-detail">
                  Are you sure you want to
                  <span id="detail-for-submit">Submit The Ticket ?</span>
                </p>
                <br />
                <hr />
                <CButton color="light" @click="() => { visibleSubmit = false }">
                  Cancel
                </CButton>
                <CButton class="ms-2" color="info" id="confirm-btn-in-detail" @click="vaildateBeforeSave" :disabled="isLoading">
                  <CSpinner v-if="isLoading" component="span" size="sm" variant="grow" aria-hidden="true" />
                  {{ isLoading ? 'Confirm...' : 'Confirm' }}
                </CButton>
              </CModalBody>
            </CModal>
          </div>
        </CForm>
      </CCardBody>
    </CCard>
  </div>

  <br />
  <CToaster placement="top-end">
    <CToast visible color="info" v-for="(toast) in toastProp">
      <CToastHeader closeButton v-if="toast.title">
        <span class="me-auto fw-bold">{{ toast.title }}</span>
      </CToastHeader>
      <CToastBody v-if="toast.content">
        <span class="text-white">{{ toast.content }}</span>
      </CToastBody>
    </CToast>
  </CToaster>
</template>

<style>
#ticket-header {
  display: inline-block;
  border-bottom: 5px solid transparent;
  border-image: linear-gradient(to right, #ea5252, #030303);
  border-image-slice: 1;
  
}

.popup_priority {
  width: 16px;
}

/* Popup container - can be anything you want */
.popup {
  position: relative;
  display: inline-block;
  cursor: pointer;
  user-select: none;
}

/* The actual popup */
.popup .popuptext {
  visibility: hidden;
  width: 255px;
  background-color: rgb(255, 255, 255);
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 8px 0;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -80px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}

/* Popup arrow */
.popup .popuptext::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -47px;
  border-width: 5px;
  border-style: solid;
  border-color: #000000 transparent transparent transparent;
}

/* Toggle this class - hide and show the popup */
.popup .show {
  visibility: visible;
  animation: fadeIn 1s;
}

/* Add animation (fade in the popup) */
@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.btn-sec {
  margin: 5px;
}

.custom-file-upload {
  cursor: pointer;
  background-color: #f2f5f7;
  color: #000000;
  padding: 15px 15px;
  transition: background-color 0.3s ease;
  border: 2px dashed #8a8a8a;
  border-radius: 8px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}


.custom-file-upload:hover {
  background-color: #7ee4b3;
}

#required {
  color: red;
}

#uploaded-file {
  font-size: larger;
  color: #888787;
}

#low-priority {
  color: #38a06c;
}

#medium-priority {
  color: #c97a20;
}

#high-priority {
  color: #ef5466;
}

#custom-card {
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

#cancel-button {
  font-weight: bold;
  font-size: x-large;
  width: 150px;
  color: white;
  border-radius: 20px;
}

#cancel-heading {
  margin-left: 3px;
  text-align: left;
  color: #000;
}

.popup_priority {
  text-align: left;
  margin-left: 10px;
  margin-top: -5px;

}

#formFileLg {
  display: none;
}

.Cloud {
  text-align: center;
  height: 70px;
}

#button-head {
  text-align: left;
  color: #000;
}

#popup-detail {
  font-size: larger;
  font-weight: 600;
  text-align: left;
  color: #000;
}

#detail-for-cancel {
  color: #d0293b;
}

#confirm-btn-in-detail {
  color: #ffffff;
}

#submit-button {
  font-weight: bold;
  font-size: x-large;
  width: 150px;
  color: white;
  border-radius: 20px;
}

#detail-for-submit {
  color: #29b227;
}

#Icon_my_ticket{
  width: auto;
  max-height: 25px;
  padding-left: 5px;
  padding-top: 3px;
  padding-right: 5px;
}
</style>

<script>
import Ticketlogo from '@/assets/images/blackTick.png'
import Cloud from '@/assets/images/Cloud.png'
import popup_priority from '@/assets/images/popup_priority.jpg'
import dayjs from 'dayjs'
import 'dayjs/locale/th'
import 'dayjs/plugin/timezone' // นำเข้าโมดูล timezone
import { CForm, CFormLabel, CImage } from '@coreui/vue-pro'
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
        isDragOver: false,
      },
      popup_priority,
      Cloud,
      isPopupVisible: false,
      userOptions: [],
      userOptions: [],
      genderOptions: [],
      pageLoading: false,
      validatedCustom01: null,
      validate: {
        ticket: null,
      },
      toastProp: [],
      uploadedFileName: '',
      visibleVerticallyCenteredDemo: false,
      visibleSubmit: false,
      isLoading: false,
      Ticketlogo,
    }
  },
  //สร้างข้อมูลของ Options ต่างๆใน selectfrom
  created() {
    (this.piorityOptions = [
      { label: 'Select Priority', value: '' },
      { label: 'Low', value: 'Low' },
      { label: 'Medium', value: 'Medium' },
      { label: 'High', value: 'High' },
      { label: 'ไม่ระบุ', value: 'none', disabled: true },
    ])
      ,
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

    //ฟังก์ชั่นตรวจข้อมูลว่าไม่ส่งค่าเปล่า

    vaildateBeforeSave() {
      let error = false;

      // Regular expression to check for special characters
      const specialCharRegex = /[=+--!@#$%^&*(),.?":{}|<>;\\/]/;

      // Check for empty values and display validation messages
      if (this.form.tkt_title.trim() === '' || specialCharRegex.test(this.form.tkt_title)) {
        this.validate.tkt_title = true; // Show validation message
        error = true;
      } else {
        this.validate.tkt_title = false; // Hide validation message
      }

      if (this.form.tkt_types.trim() === '' || specialCharRegex.test(this.form.tkt_types)) {
        this.validate.tkt_types = true;
        error = true;
      } else {
        this.validate.tkt_types = false;
      }

      if (this.form.tkt_priorities.trim() === '' || specialCharRegex.test(this.form.tkt_priorities)) {
        this.validate.tkt_priorities = true;
        error = true;
      } else {
        this.validate.tkt_priorities = false;
      }

      if (this.form.tkt_description.trim() === '' || specialCharRegex.test(this.form.tkt_description)) {
        this.validate.tkt_description = true;
        error = true;
      } else {
        this.validate.tkt_description = false;
      }


      if (!error) {
        this.isLoading = true

        // ทำการ validate หรือประมวลผลต่าง ๆ ที่ต้องการทำ
        // ในที่นี้เพียงแค่รอเวลา 2 วินาทีเพื่อจำลองกระบวนการยาวนาน
        this.toastProp.push({
          title: 'Create Ticket',
          content: 'สร้างสำเร็จ',
        })
        setTimeout(() => {
          // จบการโหลด
          this.isLoading = false

          // ทำการนำไปยังหน้าอื่นหรือทำการจัดการต่อไปตามที่ต้องการ
          this.onSave()
        }, 2000)
      } else {
        console.log('1'), (this.form.validatedCustom01 = true) // เปลี่ยนเป็น true เมื่อคลิก "Submit"
        this.visibleSubmit = false
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
      const ticket_date = `${date.format('YYYY-MM-DD')}`
      const ticket_number = `TKT-${date.format('DDMMYYYYHHmmssSSS')}`
      this.form.tkt_picture = this.form.tkt_picture || null

      this.form.tkt_time = ticket_date
      this.form.tkt_number = ticket_number
      this.form.tkt_act = userId
      this.form.tkt_status = ticket_status
      this.form.tkt_book = false
      console.log(this.form)
      const roleData = JSON.parse(localStorage.getItem('USER_DATA')) // ดึงข้อมูล USER_DATA จาก local storage
      const roleName = roleData.role

      try {
        await axios
          .post(`${process.env.VUE_APP_URL}/mongoose/insert/stts_tickets`, {
            data: this.form,
          })
          .then((result) => {
            this.confirm()
          })
          .catch((err) => {
            console.log(error)
          })
      } catch (error) {
        console.log(error)
      }
    },
    async onFileUpload(event) {
      const uploadFile = event.target.files[0]
      const formData = new FormData()
      formData.append('file', uploadFile)

      const dataResponse = await axios.post(
        `${process.env.VUE_APP_URL}/mongoose/upload/stts_files`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      this.form.tkt_picture = dataResponse.data._id
      this.uploadedFileName = uploadFile.name
    },
    cancel() {
      // Check if there is any data in the form
      const isFormEmpty = [
        this.form.tkt_description.trim(),
        this.form.tkt_title.trim(),
        this.form.tkt_priorities.trim(),
        this.form.tkt_types.trim(),
        this.form.tkt_picture.trim(),
      ].every(value => value === '');

      if (!isFormEmpty) {
        this.visibleVerticallyCenteredDemo = true;
      } else {
        // If the form is empty, navigate away without confirmation
        this.confirm();
      }
    },
    async confirm() {
      const userData = JSON.parse(localStorage.getItem('USER_DATA')) // ดึงข้อมูล USER_DATA จาก local storage
      const userId = userData.role

      if (userId == 'Admin') {
        this.$router.push('/support-ticket/admin/admin_dashboard')
      } else if (userId == 'Employee') {
        this.$router.push('/support-ticket/user/dashboard')
      } else if (userId == 'ItSupport') {
        this.$router.push('/support-ticket/it/it_dashboard')
      } else if (userId == 'Manager') {
        this.$router.push('/support-ticket/manager/manager_dashboard')
      }
    },
    togglePopup() {
      this.isPopupVisible = !this.isPopupVisible;
    },
  },
  components: { CForm, CFormLabel, CImage },
}
</script>
