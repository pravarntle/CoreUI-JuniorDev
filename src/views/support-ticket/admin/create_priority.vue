
<template>
  
  <div class="px-5 bg-white rounded" style="width: 100%; height: 845px">
    <!-- Head Priorities List -->
    <div style="width: 60%">
      <br>
      <CRow class="e-3">
        <h1 style="width: auto; 
                padding: 10px;
                border-bottom: 2px solid transparent;
                border-image: linear-gradient(to right, red, blue); 
                border-image-slice: 1;
                color: black;">
          Create New Priority</h1>
      </CRow>
      <br>
      <div class="purple">
        <h1>Priority Info</h1>
      </div>
      <br>
      <div>
        <CFormLabel for="priorityNameTha">
          <h4>Priority Name(Thai)<span style="color: red;">*</span></h4>
        </CFormLabel>
        <CInputGroup>
          <CFormInput placeholder="สำคัญมากที่สุด" aria-label="priorityNameTha" id="Form_border" />
        </CInputGroup>
      </div>
      <br>
      <div>
        <CFormLabel for="priorityNameEng">
          <h4>Priority Name(English)<span style="color: red;">*</span></h4>
        </CFormLabel>
        <CInputGroup>
          <CFormInput placeholder="Very High" aria-label="priorityNameEng" id="Form_border" />
        </CInputGroup>
      </div>
      <br>
      <div class="grid gap-0 column-gap-3">
        <CRow class="justify-content-between">
          <CCol xs="4">
            <CFormLabel for="priorityLevel">
              <h4>Level of Priority<span style="color: red;">*</span></h4>
            </CFormLabel>
          </CCol>
          <CCol xs="4">
            <CFormLabel for="priorityLevel">
              <h4>Color<span style="color: red;">*</span></h4>
            </CFormLabel>
          </CCol>
        </CRow>
        <CRow class="justify-content-between">
          <CCol xs="4">
            <!---------------------------------------------------------------------------------------->
            <!-- <CFormSelect id="Form_border" aria-label="Default select example" :options="[
              '1',
              { label: 'One', value: '1' },
              { label: 'Two', value: '2' },
              { label: 'Three', value: '3', disabled: true }
            ]">
            </CFormSelect> -->
            <CFormInput type="number" value="1" min="1" max="5" step="1"></CFormInput>
            <!---------------------------------------------------------------------------------------->
          </CCol>
          <CCol xs="4">
            <div class="border rounded align-items-center" id="Form_border" style="width: 100%; ">
              <div class="color-picker end-0" style="align-items:center ">
                <input type="color" value="#FFFFFF" id="colorPicker" class="mt-2"
                  style="margin-left: 10%; width: 150px;  border-style: none; padding: 0%; border-color:#FFFFFF ; border: none;" />
                <label for="colorPicker">
                  <CIcon icon="cilColorFill"
                    style="margin-left: 90%; margin-bottom: 50%; max-width: 24px; max-height: 24px;" />
                </label>
              </div>
            </div>
          </CCol>
        </CRow>
      </div>
      <br>
      <CForm>
        <CFormLabel for="desc">
          <h4>Description<span style="color: red;">*</span></h4>
        </CFormLabel>
        <CFormTextarea class="mb-3" placeholder="รอดำเนินการภายใน 8 ชั่วโมง" style="border-width: 2px; height: 100px;"></CFormTextarea>
      </CForm>
      <br>
      <CRow class="d-flex justify-content-center">
        <CCol xs="4">
          <CButton shape="rounded-pill" size="xl" id="btn_cancel">Cancel</CButton>
        </CCol>
        <CCol xs="4">
          <CButton class="textButton" shape="rounded-pill" size="xl" id="btn_submit">Submit</CButton>
        </CCol>
      </CRow>

    </div>
  </div>
</template>
<script >

</script>
<style>
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
.black {
  color: #303030;
}
:root {
  --cui-border-width: 2px;
  --cui-border-color: #d8dbe0;
}
h4 {
  color: black;
}
#btn_cancel {
  background-color: #687182;
  color: #FFFFFF;
  font-weight: bold;
  font-size: 25px;
  width: 200px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}
#btn_submit {
  background-color: #29B227;
  color: #FFFFFF;
  font-weight: bold;
  font-size: 25px;
  width: 200px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}
</style>
