<template>
  <div>
    <CCard class="p-2 rounded-4 mx-auto">
      <CCardHeader class="bg-white border-white mb-5">
        <div class="d-inline ms-2">
          <div id="LineHeadCard">
            <CImage
              id="custom_icon_header"
              :src="manage_accounts"
              alt="Manage Accounts Image"
            >
            </CImage>
            <h1 class="d-inline align-middle">Edit Account</h1>
          </div>
        </div>
      </CCardHeader>
      <CCardBody>
        <CForm
          novalidate
          :validated="form.validatedCustom01"
          @submit.prevent="handleSubmitCustom01"
        >
          <CRow class="mb-2">
            <CCol class="image-container" xs="3">
              <img
                v-if="
                  form.act_picture !== null && form.act_picture !== undefined
                "
                :src="`data:${fileType};base64,${fileImage}`"
              />
              <img v-else :src="user_man" />
            </CCol>
            <CCol xs="3">
              <CButton class="btn-Picture" variant="outline" for="upload_file">
                <b>Add Picture</b></CButton
              >
              <CFormInput
                type="file"
                @change="onFileUpload"
                id="upload_file"
                hidden
                
              />
              <CButton
                class="btn-Picture"
                variant="outline"
                @click="deleteImage"
              >
                <b>Delete Picture</b></CButton
              >
            </CCol>
          </CRow>

          <CRow class="mb-2">
            <div class="col-lg-1"></div>
            <CFormLabel class="col-md-12 col-form-label"
              >Personal Info</CFormLabel
            >
          </CRow>
          <CRow class="mb-3">
            <div class="row">
              <div class="col-md-3">
                <div class="form-group">
                  <CFormLabel
                    for="act_first_name_th"
                    class="col-sm-12 col-form-label"
                  >
                    <b>First name (Thai)</b>
                    <span id="required">*</span></CFormLabel
                  >
                  <CFormInput
                    name="act_first_name_th"
                    type="text"
                    feedbackInvalid="Please input firstname(Thai)."
                    id="FnameTH"
                    v-model="form.act_first_name_th"
                    :invalid="validate.act_first_name_th"
                    required
                  />
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                  <CFormLabel
                    for="act_last_name_th"
                    class="col-sm-12 col-form-label"
                    invalid
                  >
                    <b>Last name (Thai)</b>
                    <span id="required">*</span></CFormLabel
                  >
                  <CFormInput
                    type="text"
                    id="LnameTH"
                    name="FnameTH"
                    feedbackInvalid="Please input lastname(Thai)."
                    v-model="form.act_last_name_th"
                    :invalid="validate.act_last_name_th"
                    required
                  />
                </div>
              </div>
              <br />
            </div>

            <div class="row">
              <div class="col-md-3">
                <div class="form-group">
                  <CFormLabel
                    for="act_first_name_eng"
                    class="col-sm-12 col-form-label"
                    ><b>First name (English)</b>
                    <span id="required">*</span></CFormLabel
                  >
                  <CFormInput
                    type="text"
                    id="FnameEng"
                    name="FnameEng"
                    feedbackInvalid="Please input firstname(English)."
                    v-model="form.act_first_name_eng"
                    :invalid="validate.act_first_name_eng"
                    required
                  />
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                  <CFormLabel
                    for="act_last_name_eng"
                    class="col-sm-12 col-form-label"
                    ><b>Last name (English)</b>
                    <span id="required">*</span></CFormLabel
                  >
                  <CFormInput
                    type="text"
                    id="LnameEng"
                    name="LnameEng"
                    feedbackInvalid="Please input lastname(English)."
                    v-model="form.act_last_name_eng"
                    :invalid="validate.act_last_name_eng"
                    required
                  />
                </div>
              </div>
              <br />
            </div>
            <div class="row">
              <div class="col-md-7">
                <div class="form-group">
                  <CFormLabel for="role" class="col-sm-12 col-form-label"
                    ><b>Role</b><span id="required">*</span>
                  </CFormLabel>
                  <CFormSelect
                    v-model="form.act_role"
                    :options="roleOptions"
                    feedbackInvalid="Please select role."
                    :invalid="validate.act_role"
                    required
                    @change="checkRole"
                  />
                </div>
              </div>
            </div>
          </CRow>

          
          <CRow class="mb-2">
            <div class="col-lg-1"></div>
            <CFormLabel class="col-md-12 col-form-label"
              >Contact Info</CFormLabel
            >
          </CRow>
          <CRow class="mb-3">
            <div class="row">
              <div class="col-md-3">
                <div class="form-group">
                  <CFormLabel for="Email" class="col-sm-12 col-form-label"
                    ><b>Email Address</b>
                    <span id="required">*</span></CFormLabel
                  >
                  <CFormInput
                    type="email"
                    id="email"
                    name="email"
                    feedbackInvalid="Please input email."
                    v-model="form.act_email_address"
                    :invalid="validate.act_email_address"
                    required
                  />
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                  <CFormLabel
                    for="confirmEmail"
                    class="col-sm-12 col-form-label"
                    ><b>Confirm Email Address</b>
                    <span id="required">*</span></CFormLabel
                  >
                  <CFormInput
                    type="email"
                    id="confirmEmail"
                    name="confirmEmail"
                    feedbackInvalid="Please input confirm email."
                    v-model="form.confirmEmail" :invalid="validate.confirmEmail"
                    required
                  />
                </div>
              </div>
              <br />
            </div>

            <div class="row">
              <div class="col-md-7">
                <div class="form-group">
                  <CFormLabel for="phone" class="col-sm-12 col-form-label"
                    ><b>Phone Number</b>
                    <span id="required">*</span></CFormLabel
                  >
                  <CFormInput
                    type="Text"
                    id="phone"
                    name="phone"
                    feedbackInvalid="Please input your phone number."
                    v-model="form.act_number_phone"
                    :invalid="validate.act_number_phone"
                    required
                  />
                </div>
              </div>
              <br />
            </div>
          </CRow>

          <div class="col-6 mx-auto ">
            <CButton
              class="btn-sec"
              color="dark"
              @click="cancel"
              id="cancel-button"
              >Cancel</CButton
            >
            <CModal
              alignment="center"
              :visible="visibleVerticallyCenteredDemo"
              @close="
                () => {
                  visibleVerticallyCenteredDemo = false
                }
              "
            >
              <CModalBody>
                <h2 class="cancel-heading" id="button-head">Cancel</h2>
                <p class="ms-2" id="popup-detail">
                  Are you sure you want to
                  <span id="detail-for-cancel">Cancel Edit Account ?</span>
                </p>
                <br />
                <hr />
                <div class="d-flex justify-content-end">
                <CButton
                  color="light"
                  @click="
                    () => {
                      visibleVerticallyCenteredDemo = false
                    }
                  "
                >
                  Cancel
                </CButton>
                <CButton
                  class="ms-2"
                  color="danger"
                  id="confirm-btn-in-detail"
                  @click="confirm"
                >
                  Confirm
                </CButton>
                </div>
              </CModalBody>
            </CModal>

            <CButton
              class="btn-sec"
              color="success"
              id="submit-button"
              @click="validateBeforeSave"
            >
              Submit
            </CButton>
            <CModal
              alignment="center"
              :visible="visibleSubmit"
              @close="
                () => {
                  visibleSubmit = false
                }
              "
            >
              <CModalBody>
                <h2 class="ms-3" id="button-head">Submit</h2>
                <p class="ms-2" id="popup-detail">
                  Are you sure you want to
                  <span id="detail-for-submit">Submit Edit Account ?</span>
                </p>
                <br />
                <hr />
                <div class="d-flex justify-content-end">
                <CButton
                  color="light"
                  @click="
                    () => {
                      visibleSubmit = false
                    }
                  "
                >
                  Cancel
                </CButton>
                <CButton
                  class="ms-2"
                  color="success"
                  id="confirm-btn-in-detail"
                  @click="onSave"
                  :disabled="isLoading"
                >
                  <CSpinner
                    v-if="isLoading"
                    component="span"
                    size="sm"
                    variant="grow"
                    aria-hidden="true"
                  />
                  {{ isLoading ? 'Confirm...' : 'Confirm' }}
                </CButton>
                </div>
              </CModalBody>
            </CModal>
          </div>
        </CForm>
      </CCardBody>
    </CCard>
  </div>
  <CToaster placement="top-end">
    <CToast visible color="success" v-for="(toast) in toastProp">
      <CToastHeader closeButton v-if="toast.title">
        <span class="me-auto fw-bold">{{ toast.title }}</span>
      </CToastHeader>
      <CToastBody v-if="toast.content">
        <span class="text-white">{{ toast.content }}</span>
      </CToastBody>
    </CToast>
  </CToaster>
</template>
<script>
import { CFormLabel } from '@coreui/vue-pro'
import { CFormSelect } from '@coreui/vue-pro'
import axios from 'axios'
import user_man from '../../../assets/images/preProfile.png'
import bcrypt from 'bcryptjs'
import manage_accounts from '../../../assets/images/manage_accounts.png'
export default {
  components: { CFormLabel, CFormSelect },
  data: () => {
    return {
      form: {
        act_number_phone: '',
        act_email_address: '',
        act_first_name_th: '',
        act_first_name_eng: '',
        act_last_name_th: '',
        act_last_name_eng: '',
        act_picture: '',
        act_role: '',
        confirmEmail: '',
        validatedCustom01: false,
        act_role_name: '',
      },
      fileType: '',
      fileImage: '',
      user_man,
      accountId: '',
      validate: {
        act_first_name_th: false,
        act_last_name_th: false,
        act_first_name_eng: false,
        act_last_name_eng: false,
        act_role: false,
        act_email_address: false,
        act_number_phone: false,
      },
      pageLoading: false,
      manage_accounts,
      visibleVerticallyCenteredDemo: false,
      visibleSubmit: false,
      isLoading: false,
      toastProp: [],
    }
  },

  methods: {
    deleteImage() {
      this.form.act_picture = null // Set act_picture to null to delete the image
      this.fileType = '' // Clear the file type
      this.fileImage = '' // Clear the file image
      console.log('Image deleted')
      console.log(this.form.act_picture)
    },
    handleSubmitCustom01(event) {
      if (!event.currentTarget.checkValidity()) {
        event.preventDefault()
      }
      this.form.validatedCustom01 = true
    },
    validateBeforeSave() {
      let error = false
      const specialCharRegex = /[=+--!@#$%^&*(),.?":{}|<>;\\/]/;
      const phoneNumberRegex = /^\d{10,}$/;
      const emailCharRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
      // ตรวจสอบว่ามีรูปภาพที่อัปโหลดหรือไม่
      // ตรวจสอบชื่อจริง (ภาษาไทย)
      if (this.form.act_first_name_th.trim() === '' || 
          specialCharRegex.test(this.form.act_first_name_th)) {
        error = true
        this.validate.act_first_name_th = true
      } else {
        this.validate.act_first_name_th = false
      }

      // ตรวจสอบนามสกุล (ภาษาไทย)
      if (this.form.act_last_name_th.trim() === '' || 
          specialCharRegex.test(this.form.act_last_name_th)) {
        error = true
        this.validate.act_last_name_th = true
      } else {
        this.validate.act_last_name_th = false
      }

      // ตรวจสอบชื่อจริง (ภาษาอังกฤษ)
      if (this.form.act_first_name_eng.trim() === '' || 
          specialCharRegex.test(this.form.act_first_name_eng)) {
        error = true
        this.validate.act_first_name_eng = true
      } else {
        this.validate.act_first_name_eng = false
      }

      // ตรวจสอบนามสกุล (ภาษาอังกฤษ)
      if (this.form.act_last_name_eng.trim() === '' || 
          specialCharRegex.test(this.form.act_last_name_eng)) {
        error = true
        this.validate.act_last_name_eng = true
      } else {
        this.validate.act_last_name_eng = false
      }

      // ตรวจสอบตำแหน่ง
      if (this.form.act_role.trim() === '') {
        error = true
        this.validate.act_role = true
      } else {
        this.validate.act_role = false
      }

      // ตรวจสอบอีเมล
      if (this.form.act_email_address.trim() === '' || 
          !this.form.act_email_address.includes('@') || 
          !emailCharRegex.test(this.form.act_email_address)) {
        error = true
        this.validate.act_email_address = true
      } else {
        this.validate.act_email_address = false
      }

      // ตรวจสอบการยืนยันอีเมล
      if (this.form.confirmEmail.trim() === '' || 
          !this.form.confirmEmail.includes('@') || 
          !emailCharRegex.test(this.form.confirmEmail)) {
        error = true
        this.validate.confirmEmail = true
      } else {
        // ตรวจสอบว่าอีเมลที่กรอกตรงกันกับอีเมลหรือไม่
        if (this.form.act_email_address.trim() !== this.form.confirmEmail.trim()) {
          error = true
          this.validate.confirmEmail = true
          
        } else {
          this.validate.confirmEmail = false
        }
      }

      // ตรวจสอบเบอร์โทรศัพท์
      if (!phoneNumberRegex.test(this.form.act_number_phone.trim())) {
        error = true
        this.validate.act_number_phone = true
      } else {
        this.validate.act_number_phone = false
      }

    

      if (!error) {
        this.visibleSubmit = true
        console.log("sss")
        
      } else {
        console.log("saaaa")
        this.form.validatedCustom01 = true
        
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

      this.form.act_picture = dataResponse.data._id
      this.getPicture()
    },
    async getAcount() {
      try {
        const userId = this.accountId
        const response = await axios.post(
          `${process.env.VUE_APP_URL}/mongoose/getOne/stts_accounts/${userId}`,
          { populate: ['act_picture', 'act_role'] },
        )
        this.acountIdFile = response.data.act_picture.filetype
        this.acountIdImage = response.data.act_picture.image
        this.form.act_email_address = response.data.act_email_address
        this.form.act_first_name_eng = response.data.act_first_name_eng
        this.form.act_first_name_th = response.data.act_first_name_th
        this.form.act_last_name_eng = response.data.act_last_name_eng
        this.form.act_last_name_th = response.data.act_last_name_th
        this.form.act_number_phone = response.data.act_number_phone
        this.form.act_role = response.data.act_role._id
        this.form.act_role_name = response.data.act_role.rol_name
        this.fileType = response.data.act_picture.filetype
        this.fileImage = response.data.act_picture.image
        this.form.act_picture = response.data.act_picture._id
        this.form.confirmEmail = response.data.act_email_address

        // นำข้อมูลที่ได้รับมาใส่ในตัวแปร items
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    async getPicture() {
      const pictureId = this.form.act_picture
      try {
        const data = await axios.post(
          `${process.env.VUE_APP_URL}/mongoose/getOne/stts_files`,
          {
            where: {
              _id: pictureId,
            },
          },
        )
        this.fileType = data.data.filetype
        this.fileImage = data.data.image

        console.log(data.data)
      } catch (error) {
        console.log(error)
      }
    },
    async onSave() {
      const userId = this.accountId
        try {
          const requestData = { ...this.form }
          await axios
            .put(
              `${process.env.VUE_APP_URL}/mongoose/update/stts_accounts/${userId}`,
              {
                data: requestData,
              },
            )
            .then((result) => {
              this.isLoading = true
              this.toastProp.push({
                content: 'Edit Succesfully  ',
              })
              // ทำการ validate หรือประมวลผลต่าง ๆ ที่ต้องการทำ
              // ในที่นี้เพียงแค่รอเวลา 2 วินาทีเพื่อจำลองกระบวนการยาวนาน
              setTimeout(() => {
                // จบการโหลด
                this.isLoading = false

                
                this.$router.push('/support-ticket/admin/user_list')
              }, 1000)
              
            })
            .catch((err) => {
              console.log(error)
            })
        } catch (error) {
          console.log(error)
        }
      
    },
    
    cancel() {
      // Check if there is any data in the form
        this.visibleVerticallyCenteredDemo = true
        console.log('2')
        // If the form is empty, navigate away without confirmation
    },
    async confirm() {
      const userData = JSON.parse(localStorage.getItem('USER_DATA')) // ดึงข้อมูล USER_DATA จาก local storage
      const userId = userData.role
      this.$router.push('/support-ticket/admin/user_list')
      
    },
    
  },
  created() {
    const accountId = this.$route.params.itemId
    this.accountId = accountId
    this.getAcount()

    this.roleOptions = [
      { label: 'Employee', value: '64f95a8734feef5e9d2a4a8f' },
      { label: 'IT Support', value: '651635c98cadea5f0570a27d' },
      { label: 'Admin', value: '651636008cadea5f0570a27e' },
      { label: 'Manager', value: '651636358cadea5f0570a27f' },
    ]

    // ทำสิ่งที่คุณต้องการกับ accountId ที่ได้รับ
  },
}
</script>
<style>
.pic {
  background-color: #7f9ccb;
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px ridge black;
  font-size: 0.8rem;
  height: auto;
}

.card-1 {
  width: 1160px;
  height: 1496px;
  flex-shrink: 0;
  background-color: #fff;
  border-radius: 5px;
}

.h2 {
  color: #303030;
  font-family: Inter;
  font-size: 36px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.card-header {
  padding: 30px;
}

.hr {
  width: 357.501px;
  height: 2.223px;
  flex-shrink: 0;
  background: #ea5252;
}

.btn-Picture {
  width: 184px;
  height: 53px;
  background-color: transparent;
  /* Set the background color to transparent */
  border: 2px solid #5e5adb;
  /* Add a border with a 2px width and color of your choice */
  padding: 10px 20px;
  /* Add padding to provide spacing inside the button */
  color: #303030;
  /* Set text color to match the border color */
  cursor: pointer;
  /* Change the cursor to a pointer when hovering */
  text-decoration: none;
  /* Remove the default underline if it's an anchor tag */
  display: inline-block;
  /* Make sure it behaves as an inline block element */
  font-size: 16px;
  /* Set the font size to your preference */
  border-radius: 5px;
  margin-top: 30px;
  text-align: center;
  /* margin-bottom: 30px; */
}

.btn-Picture:hover {
  background-color: #5e5adb;
  /* Change the background color on hover */
  color: #fff;
  /* Change text color on hover */
}

.mb-2 {
  padding-left: 150px;
  color: #5e5adb;
  /* font-family:'Inter'; */
  font-size: 32px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

/* .row{
  padding-left: 150px;
} */
.col-md-4 {
  padding-left: 50px;
}

.mb-3 {
  padding-left: 150px;
}

.footer {
  display: flex;
  justify-content: end;
  border-radius: 20px;
}

.btn-sec {
  margin: 5px;
  border-radius: 10px;
  width: 180px;
  height: 50px;
  flex-shrink: 0;
  font-size: 25px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.image-container img {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  margin-top: 20px;
  margin-bottom: 30px;
  border: 20px solid #f7f9fc;
  stroke-width: 20px;
  stroke: #f7f9fc;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}

#LineHeadCard {
  display: inline-block;
  border-bottom: 5px solid transparent;
  border-image: linear-gradient(to right, #ea5252, #030303);
  border-image-slice: 1;
}

#required {
  color: red;
}

#cancel-button {
  margin: 5px;
  border-radius: 20px;
  width: 180px;
  height: 50px;
  flex-shrink: 0;
  font-size: 25px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  color: #fff;
}

#submit-button{
  margin: 5px;
  border-radius: 20px;
  width: 180px;
  height: 50px;
  flex-shrink: 0;
  font-size: 25px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  color: #fff;
}

#custom_icon_header {
  width: auto;
  height: 30px;
}

#cancel-heading {
  margin-left: 3px;
  text-align: left;
  color: #000;
}

#button-head {
  text-align: left;
  color: #000;
}

#popup-detail {
  font-size: larger;
  text-align: left;
  color: #000;
}

#detail-for-cancel {
  font-weight: 600;
  color: #d0293b;
}

#confirm-btn-in-detail {
  color: #ffffff;
}

#detail-for-submit {
  font-weight: 600;
  color: #29b227;
}

#Icon_my_ticket {
  width: auto;
  max-height: 25px;
  padding-left: 5px;
  padding-top: 3px;
  padding-right: 5px;
}
</style>
