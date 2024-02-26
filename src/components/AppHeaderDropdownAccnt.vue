<template>
      <CRow align-items="center" class="border rounded p-2 bg-white shadow-sm ms-2"  style="border-color: rgba(0, 0, 0, 0.1); ">
        <CCol md="4" class="text-center">
          <CAvatar :src="`data:${acountFile};base64,${acountImage}`" shape="rounded-circle" size="lg" />
        </CCol>
        <CCol md="8" class="d-flex align-items-center justify-content-center">
          <strong class="text-truncate">{{ shortenName(firstname, 12) }}</strong>
        </CCol>
      </CRow>
</template>

<script>
import axios from 'axios';
import avatar from '@/assets/images/avatars/8.jpg'
export default {
  name: 'AppHeaderDropdownAccnt',
  data(){
    return{
      acountFile:'',
      firstname:'',
      acountImage:'',
    }
  },
  setup() {
    return {
      avatar: avatar,
      itemsCount: 42,
      
    }
  },
  methods:{
    async getAcount() {
      try {
        const userData = JSON.parse(localStorage.getItem('USER_DATA')); // ดึงข้อมูล USER_DATA จาก local storage
        const userId = userData.id.toString(); // ดึงค่า id จาก userData
      
        const response = await axios.post(`${process.env.VUE_APP_URL}/mongoose/getOne/stts_accounts/${userId}`, { populate: ["act_picture"] });
        this.acountFile=response.data.act_picture.filetype
        this.acountImage=response.data.act_picture.image
        this.firstname = response.data.act_first_name_eng;

        // นำข้อมูลที่ได้รับมาใส่ในตัวแปร items

        } catch (error) {
          console.error('Error fetching data:', error);
        }
    },
    shortenName(name, maxLength) {
  if (name.length <= maxLength) {
    return name; // ไม่ต้องย่อหากยาวเท่ากับหรือน้อยกว่า maxLength
  } else {
    return name.substring(0, maxLength) + '.'; // แยกชื่อออกมาเพียง maxLength ตัวแล้วเติมจุดต่อท้าย
  }
}
  },
  mounted(){
    this.getAcount();
  }
}
</script>

<style scoped>

</style>
