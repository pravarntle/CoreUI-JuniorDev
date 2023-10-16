<template>
  <div class="px-5 bg-white rounded" style="width: 100%; height: 845px">
    <!-- Head Priorities List -->
    <div style="width: 60%">
      <br />
      <CRow class="e-3">
        <h1 style="width: 238px; 
                border-bottom: 2px solid transparent;
                border-image: linear-gradient(to right, red, blue); 
                border-image-slice: 1;">
                Edit Priority</h1>
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
            placeholder="สำคัญมากที่สุด"
            aria-label="priorityNameTha"
          />
        </CInputGroup>
      </div>
      <br />
      <div>
        <CFormLabel for="priorityNameEng"
          ><h4>Priority Name(English)*</h4></CFormLabel
        >
        <CInputGroup>
          <CFormInput placeholder="Very High" aria-label="priorityNameEng" />
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
              aria-label="Default select example"
              :options="[
                '1',
                { label: 'One', value: '1' },
                { label: 'Two', value: '2' },
                { label: 'Three', value: '3', disabled: true },
              ]"
            >
            </CFormSelect>
          </CCol>
          <CCol xs="4">
            <div class="border border-light rounded align-items-center row" style="width: 200px;">
              <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet"/>
              <div class="color-picker end-0" style="align-items:center ">
                <input type="color" value="#1dbbce" id="colorPicker" class="mt-2" style="width: 150px;" />
                <label for="colorPicker"><i class='bx bxs-color-fill' ></i></label>
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
          placeholder="รอดำเนินการภายใน 8 ชั่วโมง"
        ></CFormTextarea>
      </CForm>
      <br />
      <CRow class="d-flex justify-content-center">
        <CCol xs="4">
          <CButton color="secondary" shape="rounded-pill" size="xl"
            >Cancel</CButton
          >
        </CCol>
        <CCol xs="4">
          <CButton
            class="textButton"
            color="success"
            shape="rounded-pill"
            size="xl"
            >Submit</CButton
          >
        </CCol>
      </CRow>
    </div>
  </div>
</template>
  <script >
</script>
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
