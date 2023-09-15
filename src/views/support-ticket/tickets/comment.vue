<template>
  <mark>Tong ไม่ทำงาน </mark>
  <br />
  <button type="submit" value="ยืนยัน" @click="myFunction">
    กด Submit เพื่อยืนยันคำตอบ
  </button>

  <!-- Test -->
  <br />
  <br />

  <CCard class="p-2 mb-2" id="border">
    <CCardbody>
      <div class="clearfix">
        <!-- ตรงนี้ต้องกดได้ เพื่อย้อนกลับ -->
        <!-- Icon สำหรับย้อนกลับ -->
        <CCol>
          <div class="avatar">
            <CAvatar align="start" class="Arrow_Left" :src="Arrow_Left" />
            <CAvatar align="end" class="AL" :src="Arrow_Left" />
          </div>
        </CCol>
      </div>

      <hr />

      <CRow>
        <!-- <CImage class="Avatar_4" :src="Avatar_4" /> -->
        <CCol>
          <CAvatar class="Icon_user_man" :src="Icon_user_man" />
        </CCol>
        <CCol>
          <h2>โอ๊ย งง</h2>
        </CCol>
      </CRow>
      <hr />
      <!-- <CImage align="end" class="Short" :src="Short" /> -->
      <div class="clearfix">
        <CButton
          align="end"
          class="btn btn-outline-info"
          color="#DFF7FF"
          @click="visibleA = !visibleA"
          >Short</CButton
        >
        <CCardBody>
          <CRow xs="6">
            <CCol >
              <CCollapse :visible="visibleA" class="p-2 mb-2" id="border">
                <br />

                <Div xs="6">
                  <h5>Title : </h5>
                  <h6>Internet speed is very low</h6>
                </Div>

                <CRow>
                  <CCol xs="6">
                    <h5>
                      Title :

                    </h5>
                  </CCol>
                  <CCol xs="6">
                    <h6>Internet speed is very low</h6>
                  </CCol>
                </CRow>

                <CRow >
                  <CCol xs="0">
                    <h5><b>Type :</b></h5>
                  </CCol>
                  <CCol>
                    <CCardText>Internet speed is very low </CCardText>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol>
                    <h5><b>Description :</b></h5>
                  </CCol>
                  <CCol>
                    <CCardText>Internet speed is very low </CCardText>
                  </CCol>
                </CRow>
              </CCollapse>
            </CCol>

            <CCol xs="6">
              <CCollapse :visible="visibleB"> </CCollapse>
            </CCol>
          </CRow>
        </CCardBody>
      </div>
    </CCardbody>
  </CCard>
</template>

<script>
// export default {
//   methods: {
//     myFunction() {
//       alert('ตองขี้เกียจ')
//     },
//   },
// }
import Arrow_Left from '@/assets/images/Arrow_Left.png'
import Icon_user_man from '/Users/settawut/Desktop/STTS/CoreUI-JuniorDev/src/assets/images/Icon_user_man.jpg'
import Short from '@/assets/images/Short.jpg'
import { CAvatar, CCol, CImage, CRow } from '@coreui/vue-pro'
export default {
  name: 'comment',
  setup() {
    return {
      Arrow_Left,
      Icon_user_man,
      Short,
    }
  },
  components: { CRow, CImage, CCol, CAvatar },
  data() {
    return {
      visibleA: false,
      visibleB: false,
    }
  },
}
</script>

<style>
.Arrow_Left {
  width: 35px;
}
.Icon_user_man {
  margin-left: 0.5pc;
  width: 50px;
}
.Short {
  width: 60px;
}
.AL {
  display: flex;
  justify-content: space-between;
  width: 35px;
}
.Dis_Between {
  display: flex;
  justify-content: space-between;
}
</style>
