<template>
  <CDropdown variant="nav-item">
    <CDropdownToggle placement="bottom-end" class="py-0" :caret="false">
      <CRow align-items="center" class="border rounded p-2 bg-white shadow-sm" style="border-color: rgba(0, 0, 0, 0.1);">
        <CCol md="4" class="text-center">
          <CAvatar :src="`data:${acountFile};base64,${acountImage}`" shape="rounded-circle" size="lg" />
        </CCol>
        <CCol md="8" class="d-flex align-items-center justify-content-center">
          <strong class="text-truncate">{{firstname}}</strong>
        </CCol>
      </CRow>
    </CDropdownToggle>
    <!-- <CDropdownMenu class="pt-0">
      <CDropdownHeader component="h6" class="dropdown-header bg-light dark:bg-white dark:bg-opacity-10 py-2">
        Account
      </CDropdownHeader>
      <CDropdownItem>
        <CIcon icon="cil-bell" /> Updates
        <CBadge color="info-gradient" class="ms-auto">{{ itemsCount }}</CBadge>
      </CDropdownItem>
      <CDropdownItem>
        <CIcon icon="cil-envelope-open" /> Messages
        <CBadge color="success-gradient" class="ms-auto">{{ itemsCount }}</CBadge>
      </CDropdownItem>
      <CDropdownItem>
        <CIcon icon="cil-task" /> Tasks
        <CBadge color="danger-gradient" class="ms-auto">{{ itemsCount }}</CBadge>
      </CDropdownItem>
      <CDropdownItem>
        <CIcon icon="cil-comment-square" /> Comments
        <CBadge color="warning-gradient" class="ms-auto">{{ itemsCount }}</CBadge>
      </CDropdownItem>
      <CDropdownHeader component="h6" class="dropdown-header bg-light dark:bg-white dark:bg-opacity-10 py-2">
        Settings
      </CDropdownHeader>
      <CDropdownItem> <CIcon icon="cil-user" /> Profile </CDropdownItem>
      <CDropdownItem> <CIcon icon="cil-settings" /> Settings </CDropdownItem>
      <CDropdownItem>
        <CIcon icon="cil-dollar" /> Payments
        <CBadge color="secondary" class="ms-auto">{{ itemsCount }}</CBadge>
      </CDropdownItem>
      <CDropdownItem>
        <CIcon icon="cil-file" /> Projects
        <CBadge color="primary-gradient" class="ms-auto">{{ itemsCount }}</CBadge>
      </CDropdownItem>
      <CDropdownDivider />
      <CDropdownItem>
        <CIcon icon="cil-shield-alt" /> Lock Account
      </CDropdownItem>
      <CDropdownItem> <CIcon icon="cil-lock-locked" /> Logout </CDropdownItem>
    </CDropdownMenu> -->
  </CDropdown>
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
  },
  mounted(){
    this.getAcount();
  }
}
</script>

<style scoped>

</style>
