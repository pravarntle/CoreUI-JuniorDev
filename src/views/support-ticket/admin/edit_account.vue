<template>
  <div>
    <CCard>
      <CCardHeader>
          <h2>Edit Account</h2>
      </CCardHeader>
      <CCardBody>
        <CForm novalidate :validated="form.validatedCustom01" @submit.prevent="handleSubmitCustom01">

          <CRow class="mb-2" >
            <CCol class="image-container" xs="3">
              <!-- <img v-if="form.act_picture !== null && form.act_picture !== undefined" :src="`data:${fileType};base64,${fileImage}`" />
                <img v-else :src="user_man" /> -->
            </CCol>
            <CCol xs="3">
              <CFormLabel class="btn-Picture" for="upload_file">Add Picture</CFormLabel>
              <CFormInput type="file" @change="onFileUpload" id="upload_file" hidden />
              <CButton class="btn-Picture" variant="outline" @click="deleteImage">Delete Picture</CButton>
            </CCol>
          </CRow>

          <CRow class="mb-2" >
            <div class="col-lg-1"></div>
            <CFormLabel class="col-md-12 col-form-label">Personal Info</CFormLabel>
          </CRow>
          <CRow class="mb-3">
            <div class="row">
              <div class="col-md-3">
                <div class="form-group">
                  <CFormLabel for="act_first_name_th" class="col-sm-12 col-form-label">First name (Thai)</CFormLabel>
                  <CFormInput
                  name="act_first_name_th"
                  type="text"
                  feedbackInvalid="Please input firstname(Thai)."
                  id="FnameTH"
                  v-model="form.act_first_name_th"
                  :invalid="validate.act_first_name_th"
                    required />
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                  <CFormLabel for="act_last_name_th" class="col-sm-12 col-form-label" invalid>Last name (Thai)</CFormLabel>
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
              <br>
            </div>

            <div class="row">
              <div class="col-md-3">
                <div class="form-group">
                  <CFormLabel for="act_first_name_eng" class="col-sm-12 col-form-label">First name (English)</CFormLabel>
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
                  <CFormLabel for="act_last_name_eng" class="col-sm-12 col-form-label">Last name (English)</CFormLabel>
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
              <br>
            </div>
            <div class="row">
              <div class="col-md-7">
                <div class="form-group">
                  <CFormLabel for="role" class="col-sm-12 col-form-label">Role</CFormLabel>
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
            <CFormLabel class="col-md-12 col-form-label">Login Info</CFormLabel>
          </CRow>
          <CRow class="mb-3">
            <div class="row">
              <div class="col-md-7">
                <div class="form-group">
                  <CFormLabel for="inputEmployee" class="col-sm-12 col-form-label">Employee ID</CFormLabel>
             <CFormInput
                    type="text"
                    id="employeeID"
                    name="employeeID"
                    feedbackInvalid="Please input employee ID."
                    v-model="form.act_username"
                    :invalid="validate.act_username"
                    required
                    />
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-3">
                <div class="form-group">
                  <CFormLabel for="Password"
                >Password</CFormLabel
              >
              <div>
                <CFormInput
                text="(a-z) contains 2 letters and (0-9) Contains 4 numbers."
                  type="password"
                  id="password"
                  v-model="form.act_password"
                  feedbackInvalid="Please input password."
                  :invalid="validate.act_password"
                  autocomplete="current-password"
                  placeholder="•••••••"
                  required
                />
              </div>
                </div>
              </div>

              <div class="col-md-4">
                <div class="form-group">
                  <CFormLabel for="Password"
                >Confirm Password</CFormLabel
              >
              <div>
                <CFormInput
                  type="password"
                  id="Confirmpassword"
                  v-model=form.act_password
                  feedbackInvalid="Please confirm password."
                  :invalid="validate.act_password"
                  autocomplete="current-password"
                  placeholder="•••••••"
                  required
                />
              </div>
                </div>
              </div>
            </div>
            <div>
            <input type="checkbox" id="showPassword" @click="showPassword" />Show Password
          </div>
          </CRow>
          <CRow class="mb-2">
            <div class="col-lg-1"></div>
            <CFormLabel class="col-md-12 col-form-label">Contact Info</CFormLabel>
          </CRow>
          <CRow class="mb-3">
            <div class="row">
              <div class="col-md-3">
                <div class="form-group">
                  <CFormLabel for="Email" class="col-sm-12 col-form-label">Email Address</CFormLabel>
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
                  <CFormLabel for="confirmEmail" class="col-sm-12 col-form-label">Confirm Email Address</CFormLabel>
                  <CFormInput
                    type="email"
                    id="confirmEmail"
                    name="confirmEmail"
                    feedbackInvalid="Please input confirm email."
                    v-model="form.act_email_address"
                    :invalid="validate.act_email_address"
                    required
                    />
                </div>
              </div>
              <br>
            </div>

            <div class="row">
              <div class="col-md-7">
                <div class="form-group">
                  <CFormLabel for="phone" class="col-sm-12 col-form-label">Phone Number</CFormLabel>
                  <CFormInput
                    type="number"
                    id="phone"
                    name="phone"
                    feedbackInvalid="Please input your phone number."
                    v-model="form.act_number_phone"
                    :invalid="validate.act_number_phone"
                    required
                    />
                </div>
              </div>
              <br>
            </div>
          </CRow>
          <div class="col-6 mx-auto">
          <CButton class="btn-sec" color="secondary" variant="outline" @click="cancel">Cancel</CButton>
          <CButton class="btn-sec" color="success" variant="outline" @click="validateBeforeSave" >Submit</CButton>
          </div>

        </CForm>
      </CCardBody>
    </CCard>
  </div>

</template>
<script>
import { CFormLabel } from '@coreui/vue-pro';
import axios from 'axios'
import user_man from '../../../assets/images/preProfile.png'
import bcrypt from 'bcryptjs';
export default {
  components: { CFormLabel},
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
      user_man,
      accountId:'',
      validate: {
        act_first_name_th: false,
        act_last_name_th: false,
        act_first_name_eng: false,
        act_last_name_eng: false,
        act_role: false,
        act_email_address: false,
        act_number_phone: false,
        act_username: false,
        act_password: false,
      },
      pageLoading: false,
    }
  },
  
  created() {
        this.roleOptions  = [
            { label: 'Select Role', value: '' },
            { label: 'Employee', value: 'Employee' },
            { label: 'IT Support', value: 'IT Support' },
            { label: 'Admin', value: 'Admin' },
            { label: 'Manager', value: 'Manager'}
        ];
    },
  methods: {
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.imageUrl = URL.createObjectURL(file);
        this.imageFile = file;
      }
    },
    deleteImage() {
      this.form.act_picture = null; // Set act_picture to null to delete the image
      this.fileType = ""; // Clear the file type
      this.fileImage = ""; // Clear the file image
      console.log('Image deleted');
      console.log(this.form.act_picture);
    },
    handleSubmitCustom01(event) {
      if (!event.currentTarget.checkValidity()) {
        event.preventDefault();
      }
      this.form.validatedCustom01 = true;
    },
    validateBeforeSave() {
      let error = false;
      if (this.form.act_first_name_th === '') {
        error = true;
        this.validate.act_first_name_th = true;
      }
      if (this.form.act_last_name_th === '') {
        error = true;
        this.validate.act_last_name_th = true;
      }
      if (this.form.act_first_name_eng === '') {
        error = true;
        this.validate.act_first_name_eng = true;
      }
      if (this.form.act_last_name_eng === '') {
        error = true;
        this.validate.act_last_name_eng = true;
      }
      if (this.form.act_role === '') {
        error = true;
        this.validate.act_role = true;
      }
      if (this.form.act_email_address === '') {
        error = true;
        this.validate.act_email_address = true;
      }
      if (this.form.act_email_address === '') {
        error = true;
        this.validate.act_email_address = true;
      }
      if (this.form.act_number_phone === '') {
        error = true;
        this.validate.act_number_phone = true;
      }
      if (this.form.act_username === '') {
        error = true;
        this.validate.act_username = true;
      }
       if (this.form.act_password === '') {
        error = true;
        this.validate.act_password = true;
       }
       if (this.form.act_password === '') {
        error = true;
        this.validate.act_password = true;
      }
      if (error) {
      }
      else {
        this.onSave();
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
    showPassword() {
            var p1 = document.getElementById('password');
            var p2 = document.getElementById('Confirmpassword');
            if (p1.type === 'password') {
                p1.type = 'text';
                p2.type = 'text';
            } else {
                p1.type = 'password';
                p2.type = 'password';
            }
    },
    async getAcount() {
      try {

        
        const userId = this.accountId
        

        const response = await axios.post(`${process.env.VUE_APP_URL}/mongoose/getOne/stts_accounts/${userId}`, { populate: ["act_picture"] });
        this.acountIdFile = response.data.act_picture.filetype
        this.acountIdImage = response.data.act_picture.image
        // นำข้อมูลที่ได้รับมาใส่ในตัวแปร items

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
  },
  created() {
    const accountId = this.$route.params.itemId;
    this.accountId = accountId;
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
  background-color: #FFF;
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
  background: #EA5252;
}

.btn-Picture {
  width: 184px;
  height: 53px;
  background-color: transparent;
  /* Set the background color to transparent */
  border: 2px solid #5E5ADB;
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
  background-color: #5E5ADB;
  /* Change the background color on hover */
  color: #fff;
  /* Change text color on hover */
}

.mb-2 {
  padding-left: 150px;
  color: #5E5ADB;
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
  border: 20px solid #F7F9FC;
  stroke-width: 20px;
  stroke: #F7F9FC;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

}

</style>