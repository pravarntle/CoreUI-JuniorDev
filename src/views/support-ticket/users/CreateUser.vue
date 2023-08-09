<template>
  <div>
    <CCard>
      <CCardHeader>
        <h4>Create new User</h4>
      </CCardHeader>
      <CCardBody>
        <CRow class="mb-2">
          <div class="col-lg-1"></div>
          <CFormLabel class="col-lg-3 col-md-12 col-form-label">First Name</CFormLabel>
          <div class="col-lg-7 col-md-12">
            <CFormInput />
          </div>
        </CRow>
        <CRow class="mb-2">
          <div class="col-lg-1"></div>
          <CFormLabel class="col-lg-3 col-md-12 col-form-label">Gender</CFormLabel>
          <div class="col-lg-7 col-md-12">
            <CFormSelect
              :options="genderOptions"
              @change="checkGendor"
            />
          </div>
        </CRow>
        <CRow class="mb-2">
          <div class="col-lg-1"></div>
          <CFormLabel class="col-lg-3 col-md-12 col-form-label">Gender 2</CFormLabel>
          <div class="col-lg-7 col-md-12">
            <CFormCheck
            
              v-for="(r, index) in genderOptions"
              type="radio"
              class="pt-2"
              :label="r.label"
              :value="r.value"
              inline
            />
          </div>
        </CRow>
        <CRow class="mb-2">
          <div class="col-lg-1"></div>
          <CFormLabel class="col-lg-3 col-md-12 col-form-label">Description</CFormLabel>
          <div class="col-lg-7 col-md-12">
            <CFormTextarea
              rows="4"
            />
          </div>
        </CRow>
      </CCardBody>
      <CCardFooter>
        <CButton color="primary" @click="onSave">SAVE</CButton>
      </CCardFooter>
      <CElementCover :opacity="0.5" v-if="pageLoading" />
    </CCard>


  </div>
</template>

<script>
export default {
  data() {
    return {
      genderOptions: [],
      pageLoading: false,
    }
  },
  created() {
    this.genderOptions = [
      { label: 'กรุณาเลือก', value: ''},
      { label: 'ชาย', value: 'male' },
      { label: 'หญิง', value: 'female' },
      { label: 'ไม่ระบุ', value: 'none', disabled: true }
    ]
  },
  methods: {
    checkGendor(events) {
      console.log(events.target.value)
    },
    onSave() {
      this.pageLoading = true
      setTimeout(function() {
        this.pageLoading = false
      }.bind(this), 3000);
    }
  }
}
</script>
