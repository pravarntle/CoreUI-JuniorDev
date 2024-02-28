<template>
  <CCard class="px-5 p-3 rounded-4 mx-auto row g-3 needs-validation" novalidate :validated="validatedCustom01"
    @submit="handleSubmitCustom01">
    <!-- Head Priorities List -->
    <CCardHeader class="bg-white border-white ">
      <div class="d-inline ms-2">
        <div id="LineHeadCard">
          <CImage id="custom_icon_header" :src="Icon_Priority" alt="Icon Priority Image"> </CImage>
          <h1 class="d-inline align-middle">Edit Priority</h1>
        </div>
      </div>
    </CCardHeader>
    <CCardBody class="px-5">
      <div>
        <CRow class="mb-2">
          <div class="col-lg-1"></div>
          <div class="col-lg-7 col-md-12 purple">
            <h1>Priority Info</h1>
          </div>
        </CRow>
        <CRow class="mb-2">
          <div class="col-lg-1"></div>
          <div class="col-lg-7 col-md-12">
            <CFormLabel for="priorityNameTha">
              <h4>Priority name (Thai)<span id="Icon_force">*</span></h4>
            </CFormLabel>

            <CInputGroup>
              <CFormInput v-model="form.pri_name_th" placeholder="สำคัญมากที่สุด" aria-label="priorityNameTha"
                id="Form_border" />
            </CInputGroup>
          </div>
        </CRow>
        <br>
        <CRow class="mb-2">
          <div class="col-lg-1"></div>
          <div class="col-lg-7 col-md-12">
            <CFormLabel for="priorityNameEng">
              <h4>Priority name (English)<span id="Icon_force">*</span></h4>
            </CFormLabel>
            <CInputGroup>
              <CFormInput v-model="form.pri_name_eng" placeholder="Very High" aria-label="priorityNameEng"
                id="Form_border" />
            </CInputGroup>
          </div>
        </CRow>
        <br>
        <div>
          <CRow class="mb-2">
            <div class="col-lg-1"></div>
            <div class="col-lg-7 col-md-12">
              <CRow class="justify-content-between">
                <CCol xs="4">
                  <CFormLabel for="priorityLevel">
                    <h4>Level of Priority<span id="Icon_force">*</span></h4>
                  </CFormLabel>
                  <CFormInput type="number" value="1" min="1" max="5" step="1" v-model="form.pri_level"></CFormInput>
                </CCol>
                <CCol xs="4">
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
            </div>
          </CRow>
        </div>
        <CRow class="mb-2">
          <div class="col-lg-1"></div>
          <div class="col-lg-7 col-md-12">
            <CForm>
              <CFormLabel for="desc">
                <h4>Description<span id="Icon_force">*</span></h4>
              </CFormLabel>
              <CFormTextarea class="mb-3" id="Description_Text" v-model="form.pri_description"
                placeholder="รอดำเนินการภายใน 8 ชั่วโมง"></CFormTextarea>
            </CForm>
            <br>
            <CRow class="d-flex justify-content-center">
              <CCol class="col-8 mx-auto">
                <CButton color="dark" id="btn_cancel" @click="cancel">Cancel</CButton>
                <CModal alignment="center" :visible="visibleLiveDemo" @close="() => {
                  visibleLiveDemo = false }">
                  <CModalBody>
                    <h2 class="ms-2 cancel-heading"  id="button-head">Cancel</h2>
                    <p class="ms-2" id="popup-detail">
                      Are you sure you want to
                      <span class="text-danger">Cancel Edit Priority ?</span>
                    </p>
                    <br />
                    <hr />
                    <div class="d-flex justify-content-end">
                    <CButton color="light" @click="() => { visibleLiveDemo = false }">
                      Cancel
                    </CButton>
                    <CButton class="ms-2" color="info text-white" id="confirm-btn-in-detail" @click="confirm">
                      Confirm
                    </CButton>
                    </div>
                  </CModalBody>
                </CModal>
                
                
                
                <CButton color="success" id="btn_submit" @click="visibleLivesubmit = true">Submit</CButton>
                <CModal alignment="center" :visible="visibleLivesubmit" @close="() => { visibleLivesubmit = false }">
              
                  <CModalBody>
                    <h2 class="ms-2" id="button-head">
                      Submit
                    </h2>
                    <p class="ms-2" id="popup-detail">
                      Are you sure you want to
                      <span id="detail-for-submit" class="text-warning">Edit Priority ?</span>
                    </p>
                    <br/>
                    <hr/>
                    <div class="d-flex justify-content-end">
                      <CButton color="light"  @click="() => { visibleLivesubmit = false }">
                        Close
                      </CButton>
                      <CButton class="ms-2" id="confirm-btn-in-detail" color="info text-white" @click="vaildateBeforeSave" :disabled="isLoading">
                        <CSpinner v-if="isLoading" component="span" size="sm" variant="grow" aria-hidden="true" />
                      {{ isLoading ? 'Confirm...' : 'Confirm' }}
                      </CButton>
                    </div>
                  </CModalBody>
                </CModal>
              </CCol>
            </CRow>
          </div>
        </CRow>
      </div>
    </CCardBody>
  </CCard>
  
  <br />
  <CToaster placement="top-end">
    <CToast visible color="warning" v-for="(toast) in toastEdit">
      <CToastHeader closeButton v-if="toast.title">
        <span class="me-auto fw-bold">{{ toast.title }}</span>
      </CToastHeader>
      <CToastBody v-if="toast.content">
        <span class="text-white">{{ toast.content }}</span>
      </CToastBody>
    </CToast>
  </CToaster>
</template>
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
  width: 150px;
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

#popup-detail {
  font-size: larger;
  font-weight: 600;
  text-align: left;
  color: #000;
}
</style>

<script>
import axios from 'axios'
import Icon_Priority from '../../../assets/images/Icon_Priority.png';
export default {
  data: () => {
    return {
      form: {
        pri_name_eng: '',
        pri_name_th: '',
        pri_level: '',
        pri_color: '',
        pri_description: '',
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
      visibleLivesubmit: false,
      visibleLiveDemo: false,
      toastEdit: [],
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
    async cancel() {
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
        this.confirm();
        // this.$router.push({ name: 'ST - priority_list Ticket' });

      }
    },
    async confirm() {
      const userData = JSON.parse(localStorage.getItem('USER_DATA')) // ดึงข้อมูล USER_DATA จาก local storage
      const userId = userData.role

      this.$router.push('/support-ticket/admin/priority_list')
      
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

    vaildateBeforeSave() {
      let error = false;
      // Regular expression to check for special characters
      const specialCharRegex = /[=+--!@#$%^&*(),.?":{}|<>;\\/]/;
      // Check for empty values and display validation messages
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
      } else {
        this.validate.pri_level = false;
      }

      if (this.form.pri_color.trim() === '' ) {
        this.validate.pri_color = true;
        error = true;
      } else {
        this.validate.pri_color = false;
      }

      if (this.form.pri_description.trim() === '' ) {
        this.validate.pri_description = true;
        error = true;
      } else {
        this.validate.pri_description = false;
      }

      if (!error) {
        // this.onSave()
        this.isLoading = true
        this.toastEdit.push({
          content: 'Edit Success  ',
        })
        // ทำการ validate หรือประมวลผลต่าง ๆ ที่ต้องการทำ
        // ในที่นี้เพียงแค่รอเวลา 2 วินาทีเพื่อจำลองกระบวนการยาวนาน
        //**** ไม่เข้าตัว settimeout  ถามแบงค์ด่วน*/
        setTimeout(() => {
          
          // จบการโหลด
          this.isLoading = false
          // ทำการนำไปยังหน้าอื่นหรือทำการจัดการต่อไปตามที่ต้องการ
          
          this.onSave()
        }, 500)
      } else {
        console.log('2'), (this.form.validatedCustom01 = true) // เปลี่ยนเป็น true เมื่อคลิก "Submit"
        this.visibleLivesubmit = false
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
      { label: '3', value: '3' },
    ];
  }
}
</script> 