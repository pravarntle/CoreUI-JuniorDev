<template>
  <div>
    <CCard>
      <CCardHeader>
        <h4>Create new Ticket</h4>
      </CCardHeader>
      <CCardBody>
        <CForm >
          <CRow class="mb-2">
            <div class="col-lg-1"></div>
            <CFormLabel class="col-lg-3 col-md-12 col-form-label">Title</CFormLabel>
            <div class="col-lg-7 col-md-12">
              <CFormInput
                v-model="form.tkt_title"
                feedbackInvalid="ห้ามเว้นว่าง"
                :invalid="validate.tkt_title"
                required
                
              />
            </div>
          </CRow>
          <CRow class="mb-2">
            <div class="col-lg-1"></div>
            <CFormLabel  class="col-lg-3 col-md-12 col-form-label">Type</CFormLabel>
            <div class="col-lg-7 col-md-12">
              <CFormSelect
                v-model="form.tkt_types"
                :options="typeOptions"
                feedbackInvalid="ห้ามเว้นว่าง"
                :invalid="validate.tkt_types"
                required
                @change="checktype"
              />
            </div>
          </CRow>
          <CRow class="mb-2">
            <div class="col-lg-1 "></div>
            <CFormLabel class="col-lg-3 col-md-12 col-form-label">Priority</CFormLabel>
            <div class="col-lg-7 col-md-12">
              <CFormSelect
              v-model="form.tkt_priorities"
              :options="piorityOptions"
              feedbackInvalid="ห้ามเว้นว่าง"
              :invalid="validate.tkt_priorities"
              required
              @change="checkpiority"
              />
            </div>
          </CRow>
          <CRow class="mb-2">
            <div class="col-lg-1 "></div>
            <CFormLabel class="col-lg-3 col-md-12 col-form-label">user</CFormLabel>
            <div class="col-lg-7 col-md-12">
              <CFormSelect
              v-model="form.tkt_act"
              :options="userOptions"
              required
              />
            </div>
          </CRow>
          <CRow class="mb-2">
            <div class="col-lg-1"></div>
            <CFormLabel class="col-lg-3 col-md-12 col-form-label">Description</CFormLabel>
            <div class="col-lg-7 col-md-12">
              <CFormTextarea
              v-model="form.tkt_description"
                feedbackInvalid="ห้ามเว้นว่าง"
                :invalid="validate.tkt_description"
                required
                id="validationTextarea"
                rows="4"
                
              />
            </div>
          </CRow>
        </CForm>
        <CRow class="mb-2">
            <div class="col-lg-1"></div>
            <CFormLabel class="col-lg-3 col-md-12 col-form-label">Upload A File</CFormLabel>
            <div class="col-lg-7 col-md-12">
              <CFormInput 
              type="file" 
              size="lg" 
              id="formFileLg"  
              v-model="form.tkt_picture" />
            </div>
          </CRow>

      </CCardBody>
      <CCardFooter class="footer">
        <CButton  color="secondary" @click="vaildateBeforeSave" >Cancle</CButton>
        <CButton class="btn-sec" color="success" @click="vaildateBeforeSave"  >Submit</CButton>
      </CCardFooter>
      <CElementCover :opacity="0.5" v-if="pageLoading" />
    </CCard>
  </div>
</template>
<style>
.footer {
  display: flex;
  justify-content: end;
}
.btn-sec{
  margin: 5px;
}
</style>

<script>
import { CForm } from '@coreui/vue-pro'
import axios from 'axios';

export default {
    data() {
        return {
            form: {
                tkt_number: '',
                tkt_description: '',
                tkt_picture: '',
                tkt_title: '',
                tkt_time: '',
                tkt_last_update: '',
                tkt_status: '',
                tkt_priorities: '',
                tkt_types: '',
                tkt_book: '',
                tkt_act: '',
            },
            userOptions:[],
            genderOptions: [],
            pageLoading: false,
            validatedCustom01: null,
            validate: {
                ticket: null,
            }
        };
    },
    created() {
        this.piorityOptions = [
            { label: 'Select Priority', value: '' },
            { label: 'Low', value: 'Low' },
            { label: 'Mediem', value: 'Mediem' },
            { label: 'High', value: 'High' },
            { label: 'ไม่ระบุ', value: 'none', disabled: true }
        ],
            this.typeOptions = [
                { label: 'Select type', value: '' },
                { label: 'Software', value: 'Software' },
                { label: 'Hardware', value: 'Hardware' },
                { label: 'Service Request', value: 'Service' },
                { label: 'ไม่ระบุ', value: 'none', disabled: true }
            ];
            this.getUser() 
    },

    methods: {
        async getUser(){
          const user= await axios.get('http://localhost:3000/mongoose/get/stts_accounts')
          const users= await axios.post('http://localhost:3000/mongoose/get/stts_tickets',{populate:['tkt_act']})
          console.log(users)
          user.data.forEach(element => {
            this.userOptions.push({value:element._id,label:element.act_username})
            
          });

          
        },
        vaildateBeforeSave() {
            let error;
            if (this.form.tkt_title === '') {
                error = true;
                this.validate.tkt_title = true;
            }
            if (this.form.tkt_types === '') {
                error = true;
                this.validate.tkt_types = true;
            }
            if (this.form.tkt_priorities === '') {
                error = true;
                this.validate.tkt_priorities = true;
            }
            if (this.form.tkt_description === '') {
                error = true;
                this.validate.tkt_description = true;
            }
            
            if (error) {
            }
            else {
                this.onSave();
            }
        },
        checktype(events) {
            console.log(events.target.value);
        },
        checkpiority(events) {
            console.log(events.target.value);
        },
        async onSave() {
            const date = new Date;
            this.pageLoading = true;
            setTimeout(function () {
                this.pageLoading = false;
            }.bind(this), 3000);
            // const ticket_account = `64f9d0822eeb85d0fb62f022`;
            const ticket_status = `Pending`;
            const ticket_date = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}-${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`;
            const ticket_number = `TKT-${date.getDate()}${date.getMonth()}${date.getFullYear()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}${date.getMilliseconds()}`;
            this.form.tkt_time = ticket_date;
            this.form.tkt_number = ticket_number;
            // this.form.tkt_act = ticket_account;
            this.form.tkt_status = ticket_status;
            console.log(this.form);

            try {
              await axios.post('http://localhost:3000/mongoose/insert/stts_tickets',{data:this.form} )
              .then((result) => {
                alert('save'),
                this.$router.push('/support-ticket/user/dashboard')
              }).catch((err) => {
                console.log(error)
              });
            }catch(error){
              console.log(error)
            }
        }
    },
    components: { CForm }
}
</script>
