<template>
  <div>
    <CImage :src ="Ticket" class="Img_Ticket"/>
    <h1 class="HeadName">Support Trouble Ticket System</h1>
    <CCard class="Card">
      <CCardBody>
        <CRow>
          <CCol>
            <CForm class="c-form">
              <h1 class="font-h">LOGIN</h1>
              <CFormLabel>Username</CFormLabel>
              <CInputGroup class="mb-3">
                <CFormInput v-model="form.username" feedbackInvalid="Can not be left blank." :invalid="validate.username" size="lg"
                  id="username" placeholder="Username"/>
              </CInputGroup>
              <CFormLabel>Password</CFormLabel>
              <CInputGroup class="mb-4">
                <CFormInput id="password" :type="showPassword ? 'text' : 'password'" v-model="form.password"
                  feedbackInvalid="Can not be left blank." :invalid="validate.password" autocomplete="current-password" size="lg" placeholder="Password" />
                <CInputGroupText>
                  <CFormCheck type="radio" autocomplete="off" @click="showPassword = !showPassword">
                    <template #label>
                      <CIcon :icon="cilToggleOff" />
                    </template>
                  </CFormCheck>
                </CInputGroupText>
              </CInputGroup>
              <CFormCheck id="flexCheckDefault" label="Remember me"/>
              <!-- <CFormSwitch label="Remember me" id="formSwitchCheckDefault"/> -->
              <CRow>
                <CCol :xs="6">
                  <CButton color="dark" class="b-login" @click="onLoginClick"> Login </CButton>
                </CCol>
              </CRow>
            </CForm>
            <hr>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  </div>

  <!-- <CToaster placement="top-end">
        <CToast visible color="primary" v-for="(toast) in toastProp">
            <CToastHeader closeButton v-if="toast.title">
                <span class="me-auto fw-bold">{{ toast.title }}</span>
            </CToastHeader>
            <CToastBody v-if="toast.content">
                <span class="text-white">{{ toast.content }}</span>
            </CToastBody>
        </CToast>
    </CToaster> -->
</template>

<style >
.c-image {
  border-radius: 15px 15px 15px 15px;
}

body {
  background-image: url('~@/assets/images/Background_Blue.png');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: 100% 100%;
  background-color: #F1F7F9;
}

.Card {
  background-color: rgba(255, 255, 255, 0.5);
  /* สีขาวโปร่งใส 50% */
  width: 700px;
  height: 700px;
  position: absolute;
  right: 100px;
  top: 100px;
  padding: 100px;
  font-size: 20px;

}
.font-h{
  text-align: center;
  font-size: 48px;
  font-weight: bold;
  padding-bottom: 30px;
}

.b-login{
  font-weight: bold;
  font-size: 20px;
  width: 210%;
  height: auto;
  display: flex;
  padding: 10px 24px;
  flex-direction: column;
  background-color: #007AFF;
  margin-top: 60px;
}


.Img_Ticket{
  width: 700px;
  height: auto;
  position: absolute;
  left: 250px;
  top: 200px;
}

.HeadName{
  color: white;
  position: absolute;
  left: 350px;
  top: 720px;
}
</style>


<script>
import axios from 'axios'
import { CIcon } from '@coreui/icons-vue';
import { cilToggleOff, cilToggleOn } from '@coreui/icons';
import Ticket from '@/assets/images/Ticket.png'
import { CFormInput } from '@coreui/vue-pro';
import Background from '@/assets/images/Background_Blue.png'
export default {
  name: 'Login1',
  data() {
    return {
      dataImageURL: '',
      cilToggleOff,
      cilToggleOn,
      validatedCustom01: null,
      form: {
        username: '',
        password: '',
      },
      validate: {
        username: null,
        password: null,
      },
      showPassword: false,
      Background,
      Ticket,
      // toastProp: [],
    };
  },
  created() {
    this.getImage()
    // this.toastProp.push({
    //   content: 'OK'
    // })
  },
  methods: {
    async getImage() {
      try {
        const dataResponse = await axios.post(`${process.env.VUE_APP_URL}/mongoose/getOne/stts_files/652c0247d44e6b62f7b1f65f`)
        this.dataImageURL = `data:${dataResponse.data.filetype};base64,${dataResponse.data.image}`
      } catch (error) {

      }
    },
    vaildateBeforeSave() {
      let error = false
      if (this.form.username === '') {
        error = true
        this.validate.username = true
      }
      if (this.form.password === '') {
        error = true
        this.validate.password = true
      }
      return error
      // if (error) {
      // } else if(this.form.username === 'supakit' && this.form.password === '00000000') {
      //   this.onLoginClick()
      // }else{
      // alert("เข้าสู่ระบบไม่สำเร็จ")
      // }

    },
    async onLoginClick() {
      if (this.vaildateBeforeSave()) {


      } else {
        try {
          const response = await axios.post(`${process.env.VUE_APP_URL}/auth/login`, { username: this.form.username, password: this.form.password })
          console.log(response);
          const user = {
            id: response.data.user.id,
            USERNAME: response.data.user.USERNAME,
            role: response.data.user.role,
            // role: response.data.data.role,
            token: response.data.user.token

          }

          localStorage.setItem('USER_DATA', JSON.stringify(user))
          console.log(user.role)
          setTimeout(function () {
            if (user.role === 'Employee') {
              this.$router.push('/support-ticket/user/dashboard');
            } else if (user.role === 'Admin') {
              this.$router.push('/support-ticket/admin/admin_dashboard');
            } else if (user.role === 'ItSupport') {
              this.$router.push('/support-ticket/it/it_dashboard');
            } else if (user.role === 'Manager') {
              this.$router.push('/support-ticket/manager/manager_dashboard');
            }

          }.bind(this), 1500)

        } catch (error) {
          console.log(error)
          if (error.response.status === 401) {
            alert('รหัสผ่านไม่ถูกต้อง หรือ ไม่พบผู้ใช้'); // แสดง Alert ถ้ามีค่าสถานะ 401
          }
          if (error.response.status === 500) {
            alert('เซิฟเวอร์มีปัญหา'); // แสดง Alert ถ้ามีค่าสถานะ 401
          }
        }
      }

      // this.$router.push('/support-ticket/user/dashboard');
    },
    // showPassword(){
    //   var x = document.getElementById("password");
    //   if (x.type === "password") {
    //     x.type = "text";
    //   } else {
    //     x.type = "password";
    //   }
    // },
  },
  components: {
    CFormInput,
    CIcon
  }
}
</script>
