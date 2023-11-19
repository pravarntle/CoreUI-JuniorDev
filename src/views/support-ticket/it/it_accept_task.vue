<template>
  <CCard class="p-2">
    <CCardbody>
      <CRow>
        <div>
          <!-- ตรงนี้ต้องกดได้ เพื่อย้อนกลับ -->
          <!-- Icon สำหรับย้อนกลับ -->
          <CCol>
            <div class="text-start" style="padding: 1px;  margin-top: 1%">
              <CAvatar class="Arrow_Left" :src="Arrow_Left" style="text-align: left;" />
              <!-- <label style="margin-left: 920px;"> ใส่ ICON สำหรับไปรายละเอียด Ticket ต่อไป </label> -->
            </div>
          </CCol>
        </div>
      </CRow>
      <hr />
      <CRow class="g-0">
        <!-- <CImage class="Avatar_4" :src="Avatar_4" /> -->

        <CAvatar v-if="acountFile" class="Icon_user_man avatar-round" :src="`data:${acountFile};base64,${acountImage}`"
          style="padding: -4px" />
        <CAvatar v-else class="Icon_user_man" :src="Icon_user_man" style="padding: -4px" />
        <CCol style="padding: 4px">
          <b> test</b>
          <p class="small">example@gmail.com</p>
        </CCol>
        <CCol class="text-end p-3" style="margin-right: 2%">
          <b> ตรงนี้วันที่คับ &nbsp; </b>
          <!-- <CBadge :color="getBadge(priorities)"><span > -->
            <li>ตรงนี้ Priority</li>
          <!-- </span></CBadge> -->
        </CCol>
      </CRow>
      <hr />

      <!-- <CImage align="end" class="Short" :src="Short" /> -->
      <div class="clearfix text-end" style="margin-right: 4%">
       ตรงนี้รหัส Ticket นะ

        <CRow>
          <CCol xs="12">

              <CCardBody style="margin-left: 2%">
                <CCol class="text-start" style="padding: -3px">
                  <b style="font-size: 20px"> Title : </b>
                  <CCradText> </CCradText>
                </CCol>
                <CCol class="text-start" style="padding: -3px">
                  <b style="font-size: 20px"> Type : </b>
                  <CCradText>  </CCradText>
                </CCol>
                <CCol class="text-start" style="padding: -3px">
                  <b style="font-size: 20px"> Description : </b>
                  <CCradText>
                    Test
                  </CCradText>
                </CCol>
              </CCardBody>
              <hr/>
              <Crow>
                <CCol class="text-start" style="padding: -1px">
                  <output style="margin-left: 5%"> 1 </output>
                  <CCradText style="margin-left: 2%"> Attachment </CCradText>
                </CCol>
              </Crow>






                  <br />
                </CCol>
                <br />
              </Crow>



      </div>
    </CCardbody>
    <hr />
    <div class="text-end">
    <CButton
      class="btn-sec"
      color="success"

      style="
        font-weight: bold;
        font-size: x-large;
        width: 150px;
        color: white;
        border-radius: 20px;
      "
      >Accept</CButton
    >
        </div>
  </CCard>
</template>

<script>
import Arrow_Left from '@/assets/images/Arrow_Left.png'
import File_test from '@/assets/images/file_test.jpg'
import Short from '@/assets/images/Short.jpg'
import Icon_user_man from '@/assets/images/icon_user_man.jpg'
import commit from '@/assets/images/commit.png'

import { CBadge, CButton, CFormInput } from '@coreui/vue-pro'

import 'dayjs/locale/th'
import 'dayjs/plugin/timezone' // นำเข้าโมดูล timezone
import {
  CAvatar,
  CCardBody,
  CCardImage,
  CCardText,
  CCardTitle,
  CCol,
  CImage,
  CRow,
} from '@coreui/vue-pro'
export default {
  name: 'comment',
  setup() {
    return {
      Arrow_Left,
      Icon_user_man,
      Short,
      commit,
    }
  },
  components: {
    CRow,
    CImage,
    CCol,
    CAvatar,
    CCardBody,
    CCardTitle,
    CCardImage,
    CCardText,
    CFormInput,
    CButton,
    CBadge
},
  data() {
    return {
      uploadImage: '',
      uploadFile: '',
      form: {  // Initialize the form object
        cmt_message: '',
        cmt_link: '',
        cmt_picture: '',
        cmt_file: '',
        cmt_date: '',
        cmt_act: '',
        cmt_tkt: '',
      },


    };
  }}
</script>
<style>
.avatar-round {
  width: 100px;
  /* ปรับขนาดตามที่ต้องการ */
  height: 100px;
  /* ปรับขนาดตามที่ต้องการ */
  border-radius: 50%;
  /* ทำให้รูปเป็นวงกลม */
}

.Arrow_Left {
  width: 35px;
}

.Icon_user_man {
  /* margin-left: 0.5pc; */
  width: 56px;
  height: 56px;
}

.Short {
  width: 60px;
}

.Cte {
  margin-right: 50%;
}

.AL {
  display: flex;
  justify-content: space-between;
  width: 35px;
}

.File_test {
  width: 20px;
  height: 20px;
}

.Dis_Between {
  display: flex;
  justify-content: space-between;
}

</style>
