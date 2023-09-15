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
      <CRow>
        <!-- ตรงนี้ต้องกดได้ เพื่อย้อนกลับ -->
        <!-- Icon สำหรับย้อนกลับ -->
              <CImage class="Arrow_Left" :src="Arrow_Left" />
              <CImage class="AL" :src="Arrow_Left" fluid block />
      </CRow>
      <hr>
      <CRow>
        <!-- <CImage class="Avatar_4" :src="Avatar_4" /> -->
          <CImage class="Icon_user_man" :src="Icon_user_man" />
      </CRow>

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
import { CImage, CRow } from '@coreui/vue-pro'
export default {
  name: 'comment',
  setup() {
    return {
      Arrow_Left,
      Icon_user_man,
    }
  },
  components: { CRow, CImage },
}
</script>

<style>
.Arrow_Left {
  width: 50px;
}
.Icon_user_man {
  margin-left: 0.5pc;
  width: 80px;
}
.AL {
  width: 50px;
}
.Dis_Between {
  display: flex;
  justify-content: space-between;
}
</style>
