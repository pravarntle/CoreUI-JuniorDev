<template>
  <CHeader position="sticky" class="mb-3">
    <CContainer fluid>
      <CHeaderToggler class="ps-1" @click="$store.commit('toggleSidebar')">
        <CIcon icon="cil-menu" size="lg" />
      </CHeaderToggler>


      <CHeaderNav class="ms-auto me-1"> <!-- ลดค่า margin ที่ฝั่งขวาเป็น me-2 -->
   
      </CHeaderNav>
      <CHeaderNav class="ms-1 me-2"> <!-- เพิ่มค่า margin ที่ฝั่งซ้ายเป็น ms-2 -->
 
      <AppHeaderDropdownNotif/>

      </CHeaderNav>
      <CHeaderNav class="ms-1 me-5">

        <AppHeaderDropdownAccnt />


      </CHeaderNav>

    </CContainer>


  </CHeader>
</template>

<script>
import AppBreadcrumb from './AppBreadcrumb'
import AppHeaderDropdownAccnt from './AppHeaderDropdownAccnt'
import AppHeaderDropdownMssgs from './AppHeaderDropdownMssgs'
import AppHeaderDropdownNotif from './AppHeaderDropdownNotif'
import AppHeaderDropdownTasks from './AppHeaderDropdownTasks'
import { logo } from '@/assets/brand/logo'
import { CContainer, CDropdownToggle, CHeaderNav, CHeaderToggler } from '@coreui/vue-pro'
import CIcon from '@coreui/icons-vue'

export default {
  name: 'AppHeader',
  components: {
    AppBreadcrumb,
    AppHeaderDropdownAccnt,
    AppHeaderDropdownMssgs,
    AppHeaderDropdownNotif,
    AppHeaderDropdownTasks,
    CContainer,
    CHeaderToggler,
    CIcon,
    CHeaderNav,
    CDropdownToggle
},
  setup() {
    return {
      logo,
    }
  },
  methods: {
    toggleSidebar() {
      // เพิ่มเงื่อนไขเพื่อเปลี่ยน margin-left ตามสถานะของ Sidebar
      const sidebarWidth = 250; // ระบุความกว้างของ Sidebar ของคุณ
      const marginLeft = this.$store.state.isSidebarOpen ? 0 : sidebarWidth;

      // ทำการเปลี่ยนแปลง margin-left ของ HeaderToggler
      document.querySelector('.ps-1').style.marginLeft = `${marginLeft}px`;

      // ทำการ toggle Sidebar
      this.$store.commit('toggleSidebar');
    },
  },
}
</script>
<style></style>


