<template>
  <CCard>
    <CContainer>
    <CCardHeader class="bg-white border-white ">
      <div class="d-inline ms-2">
        <div id="LineHeadCard">
          <CImage id="custom_icon_header" :src="Icon_Priority" alt="Icon Priority Image"> </CImage>
          <h1 class="d-inline align-middle"> Create New Priority</h1>
        </div>
      </div>
    </CCardHeader>
      
    <CForm 
    class="row g-1 needs-validation ms-5 ps-5" 
    novalidate 
    :validated="validatedCustom01" 
    @submit="handleSubmitCustom01"
  >

    <CCol class="ms-5 mt-5" md="7">
      <h4>Priority name (Thai)<span id="Icon_force">*</span></h4>
        <CFormInput
          :invalid="validate.pri_name_th" 
          feedbackValid="Looks good!"
          id="validationCustom01"
          required
          v-model="form.pri_name_th"
          aria-label="priorityNameTha"
        />     
    </CCol>

    <CCol class="ms-5 mt-3" md="7">
      <h4>Priority name (English)<span id="Icon_force">*</span></h4>
        <CFormInput
          feedbackValid="Looks good!"
          id="validationCustom01"
          :invalid="validate.pri_name_eng" 
          required
          v-model="form.pri_name_eng"  
          aria-label="priorityNameEng"
        />     
    </CCol>
    <CRow class="row g-1 needs-validation ">
                <CCol class="ms-5 mt-3 me-5" md="3">
                  <CFormLabel for="priorityLevel">
                    <h4>Level of Priority<span id="Icon_force">*</span></h4>
                  </CFormLabel>
                  <CFormInput type="number"  min="1" max="5" step="1" v-model="form.pri_level" :invalid="validate.pri_level" ></CFormInput>
                </CCol>
                <CCol class="ms-5 mt-3" md="3">
                  <CFormLabel for="priorityLevel">
                    <h4>Color<span id="Icon_force">*</span></h4>
                  </CFormLabel>
                  <div class="border rounded align-items-center" id="Form_border">
                    <div class="color-picker ">
                      <input type="color" v-model="form.pri_color" id="colorPicker" class="mt-2"   />
                      <label for="colorPicker">
                        <CIcon icon="cilColorFill" id="iconPicker" />
                      </label>
                    </div>
                  </div>
                </CCol>
      </CRow>
      <CCol class="ms-5 mt-3" md="7">
      <h4>Priority Info<span id="Icon_force">*</span></h4>
        <CFormTextarea
          feedbackValid="Looks good!"
          id="validationCustom01"
          required
          v-model="form.pri_description"
          placeholder="ดําเนินการภายใน xx ชั่วโมง"
        >     
        </CFormTextarea>
    </CCol>  


      <CRow class="d-flex justify-content-center pt-3 pb-3">
        <CCol class="col-8 mx-auto">
            <CButton color="dark" id="btn_cancel" @click="Cancel">Cancel</CButton>
            <CModal alignment="center" :visible="visibleLiveDemo" @close="() => {
              visibleLiveDemo = false }">
              <CModalBody>
                <h2 class="ms-2 cancel-heading"  id="button-head">Cancel</h2>
                <p class="ms-2" id="popup-detail">
                  Are you sure you want to
                  <span class="text-danger"> Cancel New Priority ?</span>
                </p>
                <br />
                <hr />
                <div class="d-flex justify-content-end">
                <CButton color="light" @click="() => { visibleLiveDemo = false }">
                  Cancel
                </CButton>
                <CButton class="ms-2" color="danger" id="confirm-btn-in-detail" @click="confirm">
                  Confirm
                </CButton>
                </div>
              </CModalBody>
            </CModal>



            <CButton color="success" id="btn_submit" @click="vaildateBeforeSave" >Submit</CButton>
            <CModal alignment="center" :visible="visibleLivesubmit" @close="() => { visibleLivesubmit = false }">
              
              <CModalBody>
                <h2 class="ms-2" id="button-head">
                  Submit
                </h2>
                <p class="ms-2" id="popup-detail">
                  Are you sure you want to
                  <span id="detail-for-submit" class="text-success">Create New Priority ?</span>
                </p>
                <br/>
                <hr/>
                <div class="d-flex justify-content-end">
                  <CButton color="light"  @click="() => { visibleLivesubmit = false }">
                    Cancel
                  </CButton>
                  <CButton class="ms-2" id="confirm-btn-in-detail" color="success" @click="onSave" :disabled="isLoading">
                    <CSpinner v-if="isLoading" component="span" size="sm" variant="grow" aria-hidden="true" />
                  {{ isLoading ? 'Confirm...' : 'Confirm' }}
                  </CButton>
                </div>
              </CModalBody>
            </CModal>
        </CCol>
      </CRow>
    
    
  </CForm>
  </CContainer>
  </CCard>

  <br />
  <CToaster placement="top-end">
    <CToast visible color="info" v-for="(toast) in toastProp">
      <CToastHeader closeButton v-if="toast.title">
        <span class="me-auto fw-bold">{{ toast.title }}</span>
      </CToastHeader>
      <CToastBody v-if="toast.content">
        <span class="text-white">{{ toast.content }}</span>
      </CToastBody>
    </CToast>
  </CToaster>
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
        validatedCustom01: false,
      },
      validate: {
        pri_name_eng: false,
        pri_name_th: false,
        pri_level: false,
        pri_color: false,
        pri_description: false,
    },
      priorityId: '',
      validatedCustom01: null,
      Icon_Priority,
      visibleLiveDemo: false,
      visibleLivesubmit: false,
      toastProp: [],
      isLoading: false,
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
    async onSave() {
      try {
        await axios
          .post(`${process.env.VUE_APP_URL}/mongoose/insert/stts_priorities`, {
            data: this.form,
          })
          .then((result) => {
            console.log(result)
            this.isLoading = true
            this.toastProp.push({
              content: 'Create Succesfully  ',
            })
            setTimeout(() => {
              
              // จบการโหลด
              this.isLoading = false
              // ทำการนำไปยังหน้าอื่นหรือทำการจัดการต่อไปตามที่ต้องการ
              
              this.$router.push('/support-ticket/admin/priority_list')
            }, 500)
            
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
        //** เนื่องจากค่า level กับ color มีค่าให้มาแล้ว เลย comment */
        this.form.pri_level.trim(),
        this.form.pri_color.trim(),
        this.form.pri_description.trim(),
      ].every(value => value === '');

      if (!isFormEmpty) {
        this.visibleLiveDemo = true;
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
    vaildateBeforeSave() {
      let error = false;

      // Regular expression to check for special characters
      const specialCharRegex = /[=+--!@#$%^&*(),.?":{}|<>;\\/]/;
      // Check for empty values and display validation messages
      if (!error) {
        this.checkDuplicateValue();
      } else {
        this.form.validatedCustom01 = true// เปลี่ยนเป็น true เมื่อคลิก "Submit"
      }
      if (this.form.pri_name_eng.trim() === '' || specialCharRegex.test(this.form.pri_name_eng)) {
        this.validate.pri_name_eng = true; // Show validation message
        error = true;
      } else {
        this.validate.pri_name_eng = false; // Hide validation message
      }

      if (this.form.pri_name_th.trim() === '' || specialCharRegex.test(this.form.pri_name_th)) {
        this.validate.pri_name_th = true;
        error = true;
      } else {
        this.validate.pri_name_th = false;
      }

      if (this.form.pri_level.trim() === '' || specialCharRegex.test(this.form.pri_level)) {

        this.validate.pri_level = true;
        error = true;
      }
      if (this.form.pri_level>5) {

          this.validate.pri_level = true;
          error = true;
      }


      if (this.form.pri_color.trim() === '' ) {
        this.validate.pri_color = true;
        error = true;
      } else {
        this.validate.pri_color = false;
      }
      
      if (this.form.pri_description.trim() === '') {
        this.validate.pri_description = true
        error = true
      } else {
        this.validate.pri_description = false
      }

      if (!error) {
        this.checkDuplicateValue();
      } else {
        this.form.validatedCustom01 = true// เปลี่ยนเป็น true เมื่อคลิก "Submit"
      }

    },
  async checkDuplicateValue() {
    const value = this.form.pri_level;

    console.log("sss",value);
    try {
      // Send a request to your API to check for duplicate values
      const response = await axios.post(
          `${process.env.VUE_APP_URL}/mongoose/get/stts_priorities`,
          {
            where: {
              pri_status: { $ne: 'Delete' },
            },
          },
        )
      console.log(response.data)
      // Assuming response.data is an array of objects with pri_level property
      const duplicate = response.data.some(item => item.pri_level === value);
      console.log(duplicate)
      // Set the validation flag based on whether duplicate value is found
      this.validate.pri_level = duplicate ? true : false;
      if(this.validate.pri_level== false){
        if(this.form.pri_level>5||this.form.pri_level<0){
          this.validate.pri_level = true;
        }else{
          this.visibleLivesubmit = true
        }
        
      }else{
        this.validate.pri_level = true
      }
      
    } catch (error) {
      console.error("Error checking duplicate value:", error);
      this.validate.pri_level = false;
      // Handle error appropriately, such as showing an error message to the user
    }
},



  },
  mounted() {
    console.log(this.form.pri_level)
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

#button-head {
  text-align: left;
  color: #000;
}

#popup-detail {
  font-size: larger;
  font-weight: 600;
  text-align: left;
  color: #000;
}

#confirm-btn-in-detail {
  color: #ffffff;
}
</style>