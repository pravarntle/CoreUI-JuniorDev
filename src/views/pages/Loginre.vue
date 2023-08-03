<template>
  <div class="all">
      <div class="container">
        <div class="card">
          <CRow>
            <CCol>
                <div class="content">
                  <CImage
                        :src="login"
                        fluid
                        block
                  />
                </div>
            </CCol>
            <CCol>
              <div class="content">
                <CForm class="form">
                  <h1>LOGIN</h1>
                  <CFormLabel class="User" for="username">Username</CFormLabel>
                  <CInputGroup class="mb-3">
                      <CFormInput
                        autocomplete="username"
                        size="lg"
                      />
                  </CInputGroup>
                  <CFormLabel class="password" for="username">Password</CFormLabel>
                  <CInputGroup class="mb-4">
                    <CFormInput
                      type="password"
                      size="lg"
                      autocomplete="current-password"
                    />
                  </CInputGroup>
                  <CFormCheck class="remember" id="flexCheckDefault" label="Remember me"/>
                  <CRow>
                    <CCol :xs="6">
                      <CButton color="primary" class="px-4"> Login </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </div>
            </CCol>
          </CRow>


        </div>
      </div>
  </div>

</template>


<style>
/* กำหนดให้ container เต็มจอ */
.all{
  background-color:#d4d4d4;

}
.container {
  display: grid;
  justify-content: center; /* จัดรูปภาพให้อยู่ตรงกลางแนวนอน */
  align-items: center; /* จัดรูปภาพให้อยู่ตรงกลางแนวตั้ง */
  padding: 0;
}

/* กำหนดขนาด card และสีพื้นหลัง */
.card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 15px 15px 15px 15px;
}

/* กำหนดขนาดภาพใน card */
.card img {
  border-radius: 15px 15px 15px 15px;
  margin-bottom: 0px;
}
.content h1{
  text-align: start;
  font-size: 64px;
  margin: 2rem 0rem 3rem 1rem;
  color: #000;
}
.form{
  margin-left: 1.5rem;
  margin-right: 2rem;
}
.content .User{
  color: #818080;
}
.content .password{
  color: #818080;
}
.content .form .remember{
  margin-bottom: 2rem;
  color: #818080;
}


</style>

<script>
import login  from '@/assets/images/login.jpg'
import { CCol } from '@coreui/vue-pro';

export default {
    name: 'Login1',
    data() {
        return {
            login: login,
        };
    },
    components: { CCol }
}
</script>
