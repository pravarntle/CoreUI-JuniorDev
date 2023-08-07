<template>
  <div>
    <CCard>
      <CCardHeader>
        <h4>Create new Ticket</h4>
      </CCardHeader>
      <CCardBody>
        <CRow class="mb-2">
          <div class="col-lg-1"></div>
          <CFormLabel class="col-lg-3 col-md-12 col-form-label">Title</CFormLabel>
          <div class="col-lg-7 col-md-12">
            <CFormInput
              v-model="form.ticket"
              feedbackInvalid="ห้ามเว้นว่าง"
              :invalid="validate.ticket"
            />
          </div>
        </CRow>
        <CRow class="mb-2">
          <div class="col-lg-1"></div>
          <CFormLabel class="col-lg-3 col-md-12 col-form-label">Type</CFormLabel>
          <div class="col-lg-7 col-md-12">
            <CFormSelect
              :options="typeOptions"
              @change="checktype"
            />
          </div>
        </CRow>
        <CRow class="mb-2">
          <div class="col-lg-1"></div>
          <CFormLabel class="col-lg-3 col-md-12 col-form-label">Priority</CFormLabel>
          <div class="col-lg-7 col-md-12">
            <CFormSelect
            :options="piorityOptions"
              @change="checkpiority"
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

        <CRow class="mb-2">
          <div class="col-lg-1"></div>
          <CFormLabel class="col-lg-3 col-md-12 col-form-label">Upload A File</CFormLabel>
          <div class="col-lg-7 col-md-12">
            <CFormInput type="file" size="lg" id="formFileLg"  />
          </div>
        </CRow>



      </CCardBody>
      <CCardFooter c>
        <CButton color="secondary" @click="vaildateBeforeSave" >Cancle</CButton>
        <CButton color="success" @click="vaildateBeforeSave" >Submit</CButton>
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
      validatedCustom01: null,
      form: {
          ticket: '',
        },
        validate: {
          ticket: null,
        }
    }
  },
  created() {
    this.piorityOptions = [
      { label: 'Select Priority', value: ''},
      { label: 'Low', value: 'Low' },
      { label: 'Mediem', value: 'Mediem' },
      { label: 'High', value: 'High' },
      { label: 'ไม่ระบุ', value: 'none', disabled: true }
    ],
    this.typeOptions = [
      { label: 'Select type', value: ''},
      { label: 'Software', value: 'Software' },
      { label: 'Hardware', value: 'Hardware' },
      { label: 'Service Request', value: 'Service' },
      { label: 'ไม่ระบุ', value: 'none', disabled: true }
    ]
  },
  methods: {
    vaildateBeforeSave() {
        let error
        if (this.form.ticket === '') {
          error = true
          this.validate.ticket = true
        }
        if (error) {

        } else {
          this.onSave()
        }
      },
    checktype(events) {
      console.log(events.target.value)
    },
    checkpiority(events) {
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
