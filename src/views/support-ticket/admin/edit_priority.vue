<template>
  <CForm
  class="row g-3 needs-validation" 
    novalidate 
    :validated="validatedCustom01" 
    @submit="handleSubmitCustom01"
  >
    <div class="px-5 bg-white rounded" style="width: 100%; height: 845px">
      <!-- Head Priorities List -->
      <div style="width: 60%">
        <br />
        <CRow class="e-3">
          <h1
            style="
              width: 238px;
              border-bottom: 2px solid transparent;
              border-image: linear-gradient(to right, red, blue);
              border-image-slice: 1;
            "
          >
            Edit Priority
          </h1>
        </CRow>
        <br />
        <div class="purple">
          <h1>Priority Info</h1>
        </div>
        <br />
        <div>
          <CFormLabel for="priorityNameTha"
            ><h4>Priority Name(Thai)*</h4></CFormLabel
          >
          <CInputGroup>
            <CFormInput
              v-model="form.pri_name_th"
              placeholder="สำคัญมากที่สุด"
              aria-label="priorityNameTha"
              required
            />
          </CInputGroup>
        </div>
        <br />
        <div>
          <CFormLabel for="priorityNameEng"
            ><h4>Priority Name(English)*</h4></CFormLabel
          >
          <CInputGroup>
            <CFormInput 
              v-model="form.pri_name_eng"
              placeholder="Very High" 
              aria-label="priorityNameEng"
              required
              />
          </CInputGroup>
        </div>
        <br />
        <div class="grid gap-0 column-gap-3">
          <CRow class="justify-content-between">
            <CCol xs="4">
              <CFormLabel for="priorityLevel"
                ><h4>Level of Priority*</h4></CFormLabel
              >
            </CCol>
            <CCol xs="4">
              <CFormLabel for="priorityLevel"><h4>Color*</h4></CFormLabel>
            </CCol>
          </CRow>
          <CRow class="justify-content-between">
            <CCol xs="4">
              <CFormSelect
                v-model="form.pri_level"
                aria-label="Default select example"
                :options="levelOptions"
              >
              </CFormSelect>
            </CCol>
            <CCol xs="4">
              <div
                class="border border-light rounded align-items-center row"
                style="width: 200px"
              >
                <link
                  href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
                  rel="stylesheet"
                />
                <div class="color-picker end-0" style="align-items: center">
                  <input
                    type="color"
                    v-model="form.pri_color"
                    id="colorPicker"
                    class="mt-2"
                    style="width: 150px"
                  />
                  <label for="colorPicker"
                    ><i class="bx bxs-color-fill"></i
                  ></label>
                </div>
              </div>
            </CCol>
          </CRow>
        </div>
        <br />
        <CForm>
          <CFormLabel for="desc"><h4>Description*</h4></CFormLabel>
          <CFormTextarea
            class="mb-3"
            v-model="form.pri_description"
            required
          ></CFormTextarea>
        </CForm>
        <br />
        <CRow class="d-flex justify-content-center">
          <CCol xs="4">
            <CButton color="secondary" shape="rounded-pill" size="xl"
              @click="cancel">Cancel</CButton
            >
          </CCol>
          <CCol xs="4">
            <CButton
              class="textButton"
              color="success"
              shape="rounded-pill"
              size="xl"
              type="submit"
              @click="onSave"
              >Submit</CButton
            >
          </CCol>
        </CRow>
      </div>
    </div>
  </CForm>
</template>
<style>
textButton {
  color: white;
}
.purple {
  color: #5e5adb;
}
.black {
  color: #303030;
}
.color-picker {
  font-size: 24px;
}
</style>

<script>
import axios from 'axios'

export default {
  data: () => {
    return {
      form:{
        pri_name_eng: '',
        pri_name_th: '',
        pri_level: '',
        pri_color:'',
        pri_description:'',
      },
      priorityId:'',
      validatedCustom01: null,
    }
  },
  methods: {
    handleSubmitCustom01(event) {
      const form = event.currentTarget
      if (form.checkValidity() === false) {
        event.preventDefault()
        event.stopPropagation()
      }
      this.validatedCustom01 = true
    },
    async cancel() {
      this.$router.push({ name: 'ST - priority_list Ticket' });
    },
    async getPriority() {
      try {
        const priorityId = this.priorityId
        const response = await axios.post(`${process.env.VUE_APP_URL}/mongoose/getOne/stts_priorities/${priorityId}`);
        this.form.pri_name_eng = response.data.pri_name_eng
        this.form.pri_name_th = response.data.pri_name_th
        this.form.pri_level = response.data.pri_level
        this.form.pri_description = response.data.pri_description
        this.form.pri_color = response.data.pri_color
        console.log(response.data)



      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    async onSave() {
      const priorityId = this.priorityId
        try {
          await axios
            .put(`${process.env.VUE_APP_URL}/mongoose/update/stts_priorities/${priorityId}`, {
              data: this.form,
            })
            .then((result) => {
              this.$router.push('/support-ticket/admin/priority_list')
            })
            .catch((err) => {
              console.log(error)
            })
          console.log("1")

        } catch (error) {
          console.log(error)
        }
      
    },
  },
  mounted() {
    const priorityId = this.$route.params.itemId;
    this.priorityId = priorityId;
    this.getPriority();
    console.log(this.priorityId)
    this.levelOptions = [
      { label: '1', value: '1' },
      { label: '2', value: '2' },
      { label: '3', value: '3'},
    ];
  }
}
</script> 
