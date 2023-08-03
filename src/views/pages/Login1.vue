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
                  <CForm class="">
                    <h1 class="mt-5">LOGIN</h1>
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
                        <CButton color="dark" class="px-4"> Login </CButton>
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
