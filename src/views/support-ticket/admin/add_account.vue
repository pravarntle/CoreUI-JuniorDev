// Create By: Sirinya Sondilok 15-09-2566 Add Acount
<template>
  <div>
    <CCard>
      <CCardBody>
        <CForm novalidate :validated="form.validatedCustom01">
          <CRow class="mb-3">
            <CCol class="header1" xs="12" md="6" lg="4">
              <h1
                style="
                  width: 399px;
                  border-bottom: 5px solid transparent;
                  border-image: linear-gradient(to right, #ea5252, #030303);
                  border-image-slice: 1;
                "
              >
                Create New Account
              </h1>
            </CCol>
          </CRow>
          <CRow class="mb-3">
            <CCol class="image-container" xs="12" md="6" lg="4">

              <img v-if="form.act_picture !== null && form.act_picture !== undefined" :src="`data:${fileType};base64,${fileImage}`" />
              <img v-else :src="user_man" />
            </CCol>
            <CCol CCol xs="12" md="6" lg="4">
              <CFormLabel class="btn-Picture" for="upload_file"
                >Add Picture</CFormLabel
              >

              <CFormInput
                name="upload_file"
                feedbackInvalid="Please input picture."
                :invalid="validate.act_picture"
                required
                type="file"
                @change="onFileUpload"
                id="upload_file"
                accept=".png, .jpg, .jpeg "
                hidden
              />
              <CCol xs="12" md="6" lg="4">
                <CButton
                  class="btn-Picture"
                  variant="outline"
                  @click="deleteImage"
                  >Delete Picture</CButton
                >
              </CCol>
            </CCol>
          </CRow>

          <CRow class="mb-2">
            <!-- <div class="col-lg-1"></div> -->
            <CCol xs="12" md="6" lg="4">
              <CFormLabel class="col-md-12 col-form-label"
                >Personal Info</CFormLabel
              >
            </CCol>
          </CRow>
          <CRow class="mb-3">
            <CCol xs="12" md="6" lg="4">
              <CFormLabel
                for="act_first_name_th"
                class="col-sm-12 col-form-label"
                >First name (Thai)</CFormLabel
              >
              <CFormInput
                type="text"
                name="act_first_name_th"
                id="act_first_name_th"
                feedbackInvalid="Please input firstname(Thai)."
                v-model="form.act_first_name_th"
                :invalid="validate.act_first_name_th"
                required
              />
            </CCol>
            <CCol xs="12" md="6" lg="4">
              <CFormLabel for="LnameTH" class="col-sm-12 col-form-label" invalid
                >Last name (Thai)</CFormLabel
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
            </CCol>
            <div>
              <br />
            </div>
            <CCol xs="12" md="6" lg="4">
              <CFormLabel for="FnameEng" class="col-sm-12 col-form-label"
                >First name (English)</CFormLabel
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
            </CCol>

            <CCol xs="12" md="6" lg="4">
              <CFormLabel for="LnameEng" class="col-sm-12 col-form-label"
                >Last name (English)</CFormLabel
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
            </CCol>
            <div>
              <br />
            </div>
            <CCol xs="12" md="6" lg="8">
              <CFormLabel for="role" class="col-sm-12 col-form-label"
                >Role</CFormLabel
              >
              <CFormSelect
                v-model="form.act_role"
                :options="roleOptions"
                feedbackInvalid="Please select role."
                :invalid="validate.act_role"
                required
                @change="checkRole"
              />
            </CCol>
          </CRow>

          <CRow class="mb-2">
            <CCol xs="12" md="6" lg="4">
              <CFormLabel class="col-md-12 col-form-label"
                >Login Info</CFormLabel
              >
            </CCol>
          </CRow>

          <CRow class="mb-3">
            <CCol xs="12" md="6" lg="8">
              <CFormLabel for="inputEmployee" class="col-sm-12 col-form-label"
                >Employee ID</CFormLabel
              >
              <CFormInput
                type="text"
                id="employeeID"
                name="employeeID"
                feedbackInvalid="Please input employee ID."
                v-model="form.act_username"
                :invalid="validate.act_username"
                required
              />
            </CCol>
            <div>
              <br />
            </div>
            <CCol xs="12" md="6" lg="4">
              <CFormLabel for="inputPassword1" class="pamt1"
                >Password
              </CFormLabel>
              <CFormInput
                feedbackInvalid="Please input password."
                text="(a-z) contains 2 letters and (0-9) Contains 4 numbers."
                type="password"
                id="password1"
                v-model="form.act_password"
                :invalid="validate.act_password"
                autocomplete="current-password"
                placeholder="•••••••"
                maxlength="6"
                required
              />
            </CCol>
            <CCol xs="12" md="6" lg="4">
              <CFormLabel for="Password" class="pamt1"
                >Confirm Password</CFormLabel
              >
              <CFormInput
                type="password"
                id="password2"
                v-model="form.Confirmpassword"
                feedbackInvalid="Please confirm password."
                :invalid="validate.Confirmpassword"
                autocomplete="current-password"
                placeholder="•••••••"
                maxlength="6"
                required
              />
              <div v-if="validate.Confirmpassword" class="text-danger">
                Passwords do not match.
              </div>
            </CCol>

            <div>
              <br />
            </div>
            <CCol xs="12" md="6" lg="4">
              <input
                type="checkbox"
                id="showPassword"
                @click="showPassword"
              />Show Password
            </CCol>
          </CRow>

          <CRow class="mb-2">
            <CCol xs="12" md="6" lg="4">
              <CFormLabel class="col-md-12 col-form-label"
                >Contact Info</CFormLabel
              >
            </CCol>
          </CRow>

          <CRow class="mb-3">
            <CCol xs="12" md="6" lg="4">
              <CFormLabel for="Email" class="col-sm-12 col-form-label"
                >Email Address</CFormLabel
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
            </CCol>
            <CCol xs="12" md="6" lg="4">
              <CFormLabel for="confirmEmail" class="col-sm-12 col-form-label"
                >Confirm Email Address</CFormLabel
              >
              <CFormInput
                type="email"
                id="confirmEmail"
                name="confirmEmail"
                feedbackInvalid="Please input confirm email."
                v-model="form.confirmEmail"
                :invalid="validate.confirmEmail"
                required
              />
              <div v-if="validate.confirmEmail" class="text-danger">
                Email do not match.
              </div>
            </CCol>
            <br />
            <CCol xs="12" md="6" lg="8">
              <CFormLabel for="phone" class="col-sm-12 col-form-label"
                >Phone Number</CFormLabel
              >
              <CFormInput
                type="number"
                id="phone"
                name="phone"
                feedbackInvalid="Please input your phone number."
                v-model="form.act_number_phone"
                :invalid="validate.act_number_phone"
                required
              />
            </CCol>
          </CRow>
          <CCol class="col-6 mx-auto">
            <CButton
              class="btn-sec"
              color="secondary"
              variant="outline"
              @click="cancel"
              >
              Cancel
            </CButton>
            <CButton
              class="btn-sec"
              color="success"
              variant="outline"
              @click="validateBeforeSave"
            >
            
              Submit
            </CButton>
          </CCol>
        </CForm>
      </CCardBody>
    </CCard>
  </div>
</template>
<script>
import { CFormFeedback, CFormLabel } from '@coreui/vue-pro'
import axios from 'axios'
import user_man from '../../../assets/images/preProfile.png'
import bcrypt from 'bcryptjs';
export default {
  components: { CFormLabel },
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
      fileType:"",
      fileImage:"",
      pageLoading: false,
      validatedCustom01: null,
      user_man ,
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
      if (!this.form.act_picture) {
        error = true
        this.validate.act_picture = false
      }
      if (this.form.act_first_name_th === '') {
        error = true
        this.validate.act_first_name_th = false
      }
      if (this.form.act_last_name_th === '') {
        error = true
        this.validate.act_last_name_th = false
      }
      if (this.form.act_first_name_eng === '') {
        error = true
        this.validate.act_first_name_eng = false
      }
      if (this.form.act_last_name_eng === '') {
        error = true
        this.validate.act_last_name_eng = false
      }
      if (this.form.act_role === '') {
        error = true
        this.validate.act_role = false
      }
      if (this.form.act_email_address === '') {
        error = true
        this.validate.act_email_address = false
      }
      if (this.form.confirmEmail === '') {
        error = true
        this.validate.confirmEmail = false
      }
      if (
        this.form.act_email_address !== this.form.confirmEmail &&
        this.form.confirmEmail !== ''
      ) {
        error = true
        this.validate.confirmEmail = true
        this.form.confirmEmail = ''
      }
      if (this.form.act_email_address === this.form.confirmEmail) {
        error = true
        this.validate.confirmEmail = false
      }
       if(this.form.act_email_address !== this.form.confirmEmail && this.form.confirmEmail !== '') {
           error = true
         this.validate.confirmEmail = true
         this.form.confirmEmail = ''
      }
       if(this.form.act_email_address === this.form.confirmEmail) {
           error = true
         this.validate.confirmEmail = false
       }
      if (this.form.act_number_phone === '') {
        error = true
        this.validate.act_number_phone = false
      }
      if (this.form.act_username === '') {
        error = true
        this.validate.act_username = false
      }
      if (this.form.act_password === '') {
        error = true
        this.validate.act_password = false
      }
      if (this.form.Confirmpassword === '') {
        error = true
        this.validate.Confirmpassword = false
      }
      if (
        this.form.act_password !== this.form.Confirmpassword &&
        this.form.Confirmpassword !== ''
      ) {
        error = true
        this.validate.Confirmpassword = true
        this.form.Confirmpassword = ''
      }
      if (this.form.act_password === this.form.Confirmpassword) {
        error = true
        this.validate.Confirmpassword = false
      }

      if (!error) {
      } else {
        this.form.validatedCustom01 = true
        this.encryptPasswordBeforeSave();
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
            this.$router.push('/support-ticket/user/dashboard')
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
    async getPicture(){
      const pictureId = this.form.act_picture;
      try{
        const data = await axios.post(`${process.env.VUE_APP_URL}/mongoose/getOne/stts_files`,{
          where:{
            _id:pictureId
          }
        })
        this.fileType = data.data.filetype
        this.fileImage = data.data.image

        console.log(data.data)
      } catch (error) {
        console.log(error)
      }
      
      
    }

  },
  mounted(){
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
  border-radius: 10px;
  width: 182px;
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
.header1 {
  color: #303030;
  font-size: 36px;
  font-style: normal;
  font-weight: 800;
  margin-top: 40px;
  margin-bottom: 30px;
}
</style>
