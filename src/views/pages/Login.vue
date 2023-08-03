<template>
    <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CCardGroup>
          <CCard>
          <CCardBody>
          <CRow>
              <CCol>
                <CImage
                  :src="login"
                  fluid
                  block
                  class="c-image"
                />
              </CCol>
              <CCol>
                  <!-- <CForm 
                    novalidate 
                    :validated="validatedCustom01" 
                    @submit="handleSubmitCustom01"
                  > -->
                  <CForm>
                    <h1 class="mt-5">LOGIN</h1>
                    <CFormLabel>Username</CFormLabel>
                    <CInputGroup class="mb-3">
                      <CFormInput 
                        v-model="form.username"
                        feedbackInvalid="ห้ามเว้นว่าง"
                        :invalid="validate.username"
                      />
                      <!-- <CFormInput
                        feedbackValid="Looks good!"
                        id="validationCustom01"
                        autocomplete="username"
                        size="lg"
                        required
                      /> -->
                    </CInputGroup>
                    <CFormLabel>Password</CFormLabel>
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
                        <CButton color="dark" class="px-4" @click="vaildateBeforeSave"> Login </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
              </CCol>
          </CRow>
        </CCardBody>
        </CCard>
        </CCardGroup>
      </CContainer>
    </div>


</template>


<style>
.c-image {
    border-radius: 15px 15px 15px 15px;
  }
</style>

<script>
import login  from '@/assets/images/login.jpg'
import { CFormInput } from '@coreui/vue-pro';
export default {
    name: 'Login1',
    data() {
      return {
        login: login,
        validatedCustom01: null,
        form: {
          username: '',
        },
        validate: {
          username: null,
        }
      };
    },
    methods: {
      vaildateBeforeSave() {
        let error
        if (this.form.username === '') {
          error = true
          this.validate.username = true
        }
        if (error) {
        //   const modalText = "กรุณากรอกข้อมูลให้ครบถ้วน";
        //   this.setModalStatus("error", true, modalText);
        } else {
          this.onLoginClick()
        }
      },
      onLoginClick() {
        console.log('OK')
      },
        // handleSubmitCustom01(event) {
        //     console.log(event);
        //     const form = event.currentTarget;
        //     if (form.checkValidity() === false) {
        //         event.preventDefault();
        //         event.stopPropagation();
        //     }
        //     this.validatedCustom01 = true;
        // },
    },
    components: { CFormInput }
}
</script>
