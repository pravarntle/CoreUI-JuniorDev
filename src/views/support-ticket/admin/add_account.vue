// Create By: Sirinya Sondilok 15-09-2566 Add Acount
<template>
  <div>
    <CCard class="p-3 rounded-4 mx-auto">
      <CCardHeader class="bg-white border-white mb-5">
        <div class="d-inline ms-2">
          <div id="LineHeadCard">
            <CImage id="custom_icon_header" :src="manage_accounts" alt="Manage Accounts Image"> </CImage>
            <h1 class="d-inline align-middle">Create New Account</h1>
          </div>
        </div>
      </CCardHeader>
      <CCardBody>
        <CForm>
          <CRow class="mb-3">
            <CCol class="image-container" xs="12" md="6" lg="4">

              <img v-if="form.act_picture !== null && form.act_picture !== undefined"
                :src="`data:${fileType};base64,${fileImage}`" />
              <img v-else :src="user_man" />
            </CCol>
            <CCol CCol xs="12" md="6" lg="4">
              <CFormLabel class="btn-Picture" for="upload_file"><b>Add Picture </b></CFormLabel>

              <CFormInput name="upload_file" feedbackInvalid="Please input picture." :invalid="validate.act_picture"
                required type="file" @change="onFileUpload" id="upload_file" accept=".png, .jpg, .jpeg " hidden />
              <CCol xs="12" md="6" lg="4">
                <CButton class="btn-Picture" variant="outline" @click="deleteImage"><b>Delete Picture </b></CButton>
              </CCol>
            </CCol>
          </CRow>

          <CRow class="mb-2">
            <!-- <div class="col-lg-1"></div> -->
            <CCol xs="12" md="6" lg="4">
              <CFormLabel class="col-md-12 col-form-label">Personal Info</CFormLabel>
            </CCol>
          </CRow>
          <CRow class="mb-3">
            <CCol xs="12" md="6" lg="4">
              <CFormLabel for="act_first_name_th" class="col-sm-12 col-form-label "> <b> First name (Thai)</b> <span
                  id="required">*</span> </CFormLabel>
              <CFormInput type="text" name="act_first_name_th" id="act_first_name_th"
                feedbackInvalid="Please input firstname(Thai)." v-model="form.act_first_name_th"
                :invalid="validate.act_first_name_th" required />
            </CCol>
            <CCol xs="12" md="6" lg="4">
              <CFormLabel for="LnameTH" class="col-sm-12 col-form-label" invalid><b>Last name (Thai)</b><span
                  id="required">* </span> </CFormLabel>
              <CFormInput type="text" id="LnameTH" name="FnameTH" feedbackInvalid="Please input lastname(Thai)."
                v-model="form.act_last_name_th" :invalid="validate.act_last_name_th" required />
            </CCol>
            <div>
              <br />
            </div>
            <CCol xs="12" md="6" lg="4">
              <CFormLabel for="FnameEng" class="col-sm-12 col-form-label"><b> First name (English)</b> <span
                  id="required"> *</span> </CFormLabel>
              <CFormInput type="text" id="FnameEng" name="FnameEng" feedbackInvalid="Please input firstname(English)."
                v-model="form.act_first_name_eng" :invalid="validate.act_first_name_eng" required />
            </CCol>

            <CCol xs="12" md="6" lg="4">
              <CFormLabel for="LnameEng" class="col-sm-12 col-form-label"><b>Last name (English)</b> <span id="required">*
                </span> </CFormLabel>
              <CFormInput type="text" id="LnameEng" name="LnameEng" feedbackInvalid="Please input lastname(English)."
                v-model="form.act_last_name_eng" :invalid="validate.act_last_name_eng" required />
            </CCol>
            <div>
              <br />
            </div>
            <CCol xs="12" md="6" lg="8">
              <CFormLabel for="role" class="col-sm-12 col-form-label"> <b>Role</b> <span id="required">* </span>
              </CFormLabel>
              <CFormSelect v-model="form.act_role" :options="roleOptions" feedbackInvalid="Please select role."
                :invalid="validate.act_role" required @change="checkRole" />
            </CCol>
          </CRow>

          <CRow class="mb-2">
            <CCol xs="12" md="6" lg="4">
              <CFormLabel class="col-md-12 col-form-label">Login Info</CFormLabel>
            </CCol>
          </CRow>

          <CRow class="mb-3">
            <CCol xs="12" md="6" lg="8">
              <CFormLabel for="inputEmployee" class="col-sm-12 col-form-label"><b>Employee ID</b> <span id="required">
                  *</span> </CFormLabel>
              <CFormInput type="text" id="employeeID" name="employeeID" feedbackInvalid="Please input employee ID."
                v-model="form.act_username" :invalid="validate.act_username" required />
            </CCol>
            <div>
              <br />
            </div>
            <CCol xs="12" md="6" lg="4">
              <CFormLabel for="inputPassword1" class="pamt1"><b>Password </b> <span id="required"> *</span>
              </CFormLabel>
              <CFormInput feedbackInvalid="Please input password."
                text="(a-z) contains 2 letters and (0-9) Contains 4 numbers." type="password" id="password1"
                v-model="form.act_password" :invalid="validate.act_password" autocomplete="current-password"
                placeholder="•••••••" maxlength="6" required />
            </CCol>
            <CCol xs="12" md="6" lg="4">
              <CFormLabel for="Password" class="pamt1"><b>Confirm Password</b> <span id="required">* </span></CFormLabel>
              <CFormInput type="password" id="password2" v-model="form.Confirmpassword"
                feedbackInvalid="Please confirm password." :invalid="validate.Confirmpassword"
                autocomplete="current-password" placeholder="•••••••" maxlength="6" required />
              <div v-if="validate.Confirmpassword" class="text-danger">
                Passwords do not match.
              </div>
            </CCol>

            <div>
              <br />
            </div>
            <CCol xs="12" md="6" lg="4">
              <input type="checkbox" id="showPassword" @click="showPassword" /> &nbsp; Show Password
            </CCol>
          </CRow>

          <CRow class="mb-2">
            <CCol xs="12" md="6" lg="4">
              <CFormLabel class="col-md-12 col-form-label">Contact Info</CFormLabel>
            </CCol>
          </CRow>

          <CRow class="mb-3">
            <CCol xs="12" md="6" lg="4">
              <CFormLabel for="Email" class="col-sm-12 col-form-label"><b>Email Address</b> <span id="required">*</span>
              </CFormLabel>
              <CFormInput type="email" id="email" name="email" feedbackInvalid="Please input email."
                placeholder="example@gmail.com" v-model="form.act_email_address" :invalid="validate.act_email_address"
                required />
            </CCol>
            <CCol xs="12" md="6" lg="4">
              <CFormLabel for="confirmEmail" class="col-sm-12 col-form-label"><b>Confirm Email Address</b><span
                  id="required">* </span> </CFormLabel>
              <CFormInput type="email" id="confirmEmail" name="confirmEmail" feedbackInvalid="Please input confirm email."
                placeholder="example@gmail.com" v-model="form.confirmEmail" :invalid="validate.confirmEmail" required />
              <div v-if="validate.confirmEmail" class="text-danger">
                Email do not match.
              </div>
            </CCol>
            <br />
            <CCol xs="12" md="6" lg="8">
              <CFormLabel for="phone" class="col-sm-12 col-form-label"><b>Phone Number</b> <span id="required"> * </span>
              </CFormLabel>
              <CFormInput type="Text" id="act_number_phone" name="act_number_phone" feedbackInvalid="Please input your phone number."
                placeholder="e.g. 0611234567" v-model="form.act_number_phone" :invalid="validate.act_number_phone"
                maxlength="10" required />
            </CCol>
          </CRow>
          <CCol class="col-6 mx-auto">
            <CButton class="btn-sec" color="dark" @click="cancel">
              Cancel
            </CButton>
            <CModal alignment="center" :visible="visibleLiveDemo" @close="() => {
              visibleLiveDemo = false }">
              <CModalBody>
                <h2 class="ms-2 cancel-heading"  id="button-head">Cancel</h2>
                <p class="ms-2" id="popup-detail">
                  Are you sure you want to
                  <span id="detail-for-cancel">Create New Account ?</span>
                </p>
                <br />
                <hr />
                <div class="d-flex justify-content-end">
                <CButton color="light" @click="() => { visibleLiveDemo = false }">
                  Cancel
                </CButton>
                <CButton class="ms-2" color="info" id="confirm-btn-in-detail" @click="confirm">
                  Confirm
                </CButton>
                </div>
              </CModalBody>
            </CModal>

            <CButton class="btn-sec" color="success" @click="visibleLivesubmit = true">
              Submit
            </CButton>
            <CModal alignment="center" :visible="visibleLivesubmit" @close="() => { visibleLivesubmit = false }">
              
              <CModalBody>
                <h2 class="ms-2" id="button-head">
                  Submit
                </h2>
                <p class="ms-2" id="popup-detail">
                  Are you sure you want to
                  <span id="detail-for-submit" class="text-success">Create New Priority ?</span>
                </p>
                <br/>
                <hr/>
                <div class="d-flex justify-content-end">
                  <CButton color="light"  @click="() => { visibleLivesubmit = false }">
                    Cancel
                  </CButton>
                  <CButton class="ms-2" id="confirm-btn-in-detail" color="info" @click="validateBeforeSave">Save changes</CButton>
                </div>
              </CModalBody>
            </CModal>

          </CCol>
        </CForm>
      </CCardBody>
    </CCard>
  </div>
</template>
<script>
import { CCardText, CFormFeedback, CFormLabel, CImage } from '@coreui/vue-pro';
import axios from 'axios';
import user_man from '../../../assets/images/preProfile.png';
import bcrypt from 'bcryptjs';
import manage_accounts from '../../../assets/images/manage_accounts.png';

export default {
  components: { CFormLabel, CCardText, CImage },
  data: () => {
    return {
      form: {
        act_username: '',
        act_password: '',
        act_number_phone: '',
        act_email_address: '',
        act_first_name_th: '',
        act_first_name_eng: '',
        act_last_name_th: '',
        act_last_name_eng: '',
        act_picture: '',
        act_role: '',
        confirmEmail: '',
        Confirmpassword: '',
        validatedCustom01: false,

      },
      validate: {
        // act_username:null,
        // act_password: null,
        // act_number_phone:null,
        // act_email_address:null,
        // act_first_name_th:null,
        // act_first_name_eng:null,
        // act_last_name_th:null,
        // act_last_name_eng:null,
        // act_picture:null,
        // act_role:null,
        // confirmEmail:null,
        // Confirmpassword: null,
      },
      imageFile: null,
      fileType: "",
      fileImage: "",
      pageLoading: false,
      validatedCustom01: null,
      user_man,
      manage_accounts,
      visibleLiveDemo: false,
      visibleLivesubmit: false,
    }
  },
  created() {
    this.roleOptions = [
      { label: 'Select Role', value: '' },
      { label: 'Employee', value: '64f95a8734feef5e9d2a4a8f' },
      { label: 'IT Support', value: '651635c98cadea5f0570a27d' },
      { label: 'Admin', value: '651636008cadea5f0570a27e' },
      { label: 'Manager', value: '651636358cadea5f0570a27f' },
    ]
  },
  methods: {
    // Create By: Sirinya Sondilok xx-09-2566 Upload image to profile

    // Create By: Sirinya Sondilok xx-09-2566 Upload image to profile
    deleteImage() {
      this.form.act_picture = null; // Set act_picture to null to delete the image
      this.fileType = ""; // Clear the file type
      this.fileImage = ""; // Clear the file image
      console.log('Image deleted');
      console.log(this.form.act_picture);
      // You can also send an API request to delete the image on the server here.
    },

    validateBeforeSave() {
      let error = false

      const specialCharRegex = /[=+--!@#$%^&*(),.?":{}|<>;\\/]/;
      const passwordRegex = /^(?=.*[a-z].*[a-z])(?=.*\d.*\d.*\d.*\d)[a-z\d]*$/;
      const phoneNumberRegex = /^\d{10,}$/;

      // ตรวจสอบว่ามีรูปภาพที่อัปโหลดหรือไม่
      if (!this.form.act_picture) {
        error = true
        this.validate.act_picture = true // กำหนดให้เป็น true เพื่อแสดงข้อความเตือน
      } else {
        this.validate.act_picture = false // กำหนดให้เป็น false เมื่อไม่มีข้อผิดพลาด
      }

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
      if (this.form.act_email_address.trim() === '') {
        error = true
        this.validate.act_email_address = true
      } else {
        this.validate.act_email_address = false
      }

      // ตรวจสอบการยืนยันอีเมล
      if (this.form.confirmEmail.trim() === '') {
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

      // ตรวจสอบชื่อผู้ใช้
      if (this.form.act_username.trim() === '') {
        error = true
        this.validate.act_username = true
      } else {
        this.validate.act_username = false
      }

      // ตรวจสอบรหัสผ่าน
      if (!passwordRegex.test(this.form.act_password.trim())) {
        error = true
        this.validate.act_password = true
      } else {
        this.validate.act_password = false
      }

      // ตรวจสอบการยืนยันรหัสผ่าน
      if (this.form.Confirmpassword.trim() === '') {
        error = true
        this.validate.Confirmpassword = true
      } else {
        // ตรวจสอบว่ารหัสผ่านที่ยืนยันตรงกันหรือไม่
        if (this.form.act_password !== this.form.Confirmpassword) {
          error = true
          this.validate.Confirmpassword = true
        } else {
          this.validate.Confirmpassword = false
        }
      }

      if (!error) {
        // ถ้าไม่มีข้อผิดพลาดให้ทำงานต่อไป
        this.encryptPasswordBeforeSave();
      } else {
        // ถ้ามีข้อผิดพลาดให้ทำการแสดงข้อความเตือน
        this.form.validatedCustom01 = true
        this.visibleLivesubmit = false
      }
    },

    showPassword() {
      var p1 = document.getElementById('password1')
      var p2 = document.getElementById('password2')
      if (p1.type === 'password') {
        p1.type = 'text'
        p2.type = 'text'
      } else {
        p1.type = 'password'
        p2.type = 'password'
      }
    },
    encryptPasswordBeforeSave() {

      const password = this.form.act_password;
      const saltRounds = 10;

      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
          console.error(err);
          // จัดการข้อผิดพลาดที่เกิดขึ้น
        } else {
          this.form.act_password = hash; // กำหนดรหัสผ่านเข้าไปใน form ใหม่
          this.onSave(); // เรียกฟังก์ชัน onSave เพื่อส่งข้อมูลไปยังเซิร์ฟเวอร์
        }
      });
    },
    async onSave() {

      this.form.act_picture = this.form.act_picture || null;


      try {
        await axios
          .post(`${process.env.VUE_APP_URL}/mongoose/insert/stts_accounts`, {
            data: this.form,
          })
          .then((result) => {
            this.$router.push('/support-ticket/admin/user_list')
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

      const dataResponse = await axios.post(`${process.env.VUE_APP_URL}/mongoose/upload/stts_files`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      this.form.act_picture = dataResponse.data._id
      this.getPicture();

    },
    async getPicture() {
      const pictureId = this.form.act_picture;
      try {
        const data = await axios.post(`${process.env.VUE_APP_URL}/mongoose/getOne/stts_files`, {
          where: {
            _id: pictureId
          }
        })
        this.fileType = data.data.filetype
        this.fileImage = data.data.image

        console.log(data.data)
      } catch (error) {
        console.log(error)
      }


    },
    async cancel() {
      const isFormEmpty = [
        this.form.act_username.trim(),
        this.form.act_password.trim(),
        this.form.act_number_phone.trim(),
        this.form.act_email_address.trim(),
        this.form.act_first_name_th.trim(),
        this.form.act_first_name_eng.trim(),
        this.form.act_last_name_th.trim(),
        this.form.act_last_name_eng.trim(),
        this.form.act_picture.trim(),
        this.form.act_role.trim(),
        this.form.confirmEmail.trim(),
        this.form.Confirmpassword.trim(),
      ].every(value => value === '');

      if (!isFormEmpty){
        this.visibleLiveDemo = true;
      }else{
        this.$router.push('/support-ticket/admin/user_list')
      }
    },
    async confirm() {
      const userData = JSON.parse(localStorage.getItem('USER_DATA')) // ดึงข้อมูล USER_DATA จาก local storage
      const userId = userData.role

      this.$router.push('/support-ticket/admin/user_list')
      
    },

  },
  mounted() {
  }
}
</script>
<style scoped>
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
  border-radius: 20px;
  width: 182px;
  height: 50px;
  flex-shrink: 0;
  font-size: 25px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  color: #fff;
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

#custom_icon_header {
  width: auto;
  height: 30px;
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

#detail-for-submit {
  font-weight: 600;
  color: #29b227;
}

#confirm-btn-in-detail {
  color: #ffffff;
}
</style>
