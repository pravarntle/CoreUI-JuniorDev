<template>
  <CCard>
    <CContainer>
    <CCardHeader class="bg-white border-white ">
      <div class="d-inline ms-2">
        <div id="LineHeadCard">
          <CImage id="custom_icon_header" :src="Icon_Priority" alt="Icon Priority Image"> </CImage>
          <h1 class="d-inline align-middle">Create New Priority</h1>
        </div>
      </div>
    </CCardHeader>
    <CRow class="g-1 ms-5 ps-5" >
      <CCol class="ms-5 mt-3">
          <div class="purple">
            <h1>Priority Info</h1>
          </div>
      </CCol>
      </CRow>
      
    <CForm 
    class="row g-1 needs-validation ms-5 ps-5" 
    novalidate 
    :validated="validatedCustom01" 
    @submit="handleSubmitCustom01"
  >

    <CCol class="ms-5 mt-3" md="7">
      <h4>Priority Name(Thai)<span id="Icon_force">*</span></h4>
        <CFormInput
          feedbackValid="Looks good!"
          id="validationCustom01"
          required
          v-model="form.pri_name_th"
          aria-label="priorityNameTha"
        />     
    </CCol>

    <CCol class="ms-5 mt-3" md="7">
      <h4>Priority Name(English)<span id="Icon_force">*</span></h4>
        <CFormInput
          feedbackValid="Looks good!"
          id="validationCustom01"
          required
        />     
    </CCol>
    <CRow class="row g-1 needs-validation ">
                <CCol class="ms-5 mt-3 me-5" md="3">
                  <CFormLabel for="priorityLevel">
                    <h4>Level of Priority<span id="Icon_force">*</span></h4>
                  </CFormLabel>
                  <CFormInput type="number" value="1" min="1" max="5" step="1" v-model="form.pri_level"></CFormInput>
                </CCol>
                <CCol class="ms-5 mt-3" md="3">
                  <CFormLabel for="priorityLevel">
                    <h4>Color<span id="Icon_force">*</span></h4>
                  </CFormLabel>
                  <div class="border rounded align-items-center" id="Form_border">
                    <div class="color-picker ">
                      <input type="color" v-model="form.pri_color" id="colorPicker" class="mt-2" />
                      <label for="colorPicker">
                        <CIcon icon="cilColorFill" id="iconPicker" />
                      </label>
                    </div>
                  </div>
                </CCol>
      </CRow>
      <CCol class="ms-5 mt-3" md="7">
      <h4>Description<span id="Icon_force">*</span></h4>
        <CFormTextarea
          feedbackValid="Looks good!"
          id="validationCustom01"
          required
        >     
        </CFormTextarea>
    </CCol>  


      <CRow class="d-flex justify-content-center pt-3 pb-3">
              <CCol class="col-8 mx-auto">
                <CButton color="dark" id="btn_cancel" @click="cancel">Cancel</CButton>
                <CButton color="success" type="submit" id="btn_submit" @click="onSave">Submit</CButton>
              </CCol>
            </CRow>
    
    
  </CForm>
  </CContainer>
  </CCard>
</template>
<script>
import axios from 'axios'
import Icon_Priority from '../../../assets/images/Icon_Priority.png';
export default {
  data: () => {
    return {
      form: {
        pri_name_eng: '',
        pri_name_th: '',
        pri_level: '1',
        pri_color: '',
        pri_description: '',
      },
      priorityId: '',
      validatedCustom01: null,
      Icon_Priority,
      visibleVerticallyCenteredDemo: false,
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
    async onSave() {
      console.log("1")
      console.log(this.form)
      try {
        await axios
          .post(`${process.env.VUE_APP_URL}/mongoose/insert/stts_priorities`, {
            data: this.form,
          })
          .then((result) => {
            console.log(result)
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
    Cancel() {
      // Check if there is any data in the form
      const isFormEmpty = [
        this.form.pri_name_eng.trim(),
        this.form.pri_name_th.trim(),
        this.form.pri_level.trim(),
        this.form.pri_color.trim(),
        this.form.pri_description.trim(),
      ].every(value => value === '');

      if (!isFormEmpty) {
        this.visibleVerticallyCenteredDemo = true;
      } else {
        // If the form is empty, navigate away without confirmation
        this.confirm();
      }
    },
    async confirm() {
      const userData = JSON.parse(localStorage.getItem('USER_DATA')) // ดึงข้อมูล USER_DATA จาก local storage
      const userId = userData.role

      this.$router.push('/support-ticket/admin/priority_list')
      
    },
  },
  mounted() {
  }
}
</script> 

<style scoped>
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  opacity: 1;
}

textButton {
  color: white;
}

.purple {
  color: #5E5ADB;
}

:root {
  --cui-border-width: 2px;
  --cui-border-color: #d8dbe0;
}

h4 {
  color: black;
}

#btn_cancel {
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

#btn_submit {
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

#Icon_force {
  color: red;
}

#LineHeadCard {
  display: inline-block;
  border-bottom: 5px solid transparent;
  border-image: linear-gradient(to right, #ea5252, #030303);
  border-image-slice: 1;
}

#Form_border {
  width: 100%;
}

#colorPicker {
  margin-left: 5%;
  width: 80%;
  max-width: auto;
  border-style: none;
  border-color: #FFFFFF;
  border: none;
}

#iconPicker {
  margin-left: 50%;
  margin-bottom: 50%;
}

#Description_Text {
  border-width: 2px;
  height: 100px;
}

#custom_icon_header {
  width: auto;
  height: 60px;
}
</style>
