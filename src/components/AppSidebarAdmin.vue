<template>
  <CSidebar position="fixed" :unfoldable="sidebarUnfoldable" :visible="sidebarVisible" class="custom-sidebar"
    @visible-change="(event) =>
      $store.commit({
        type: 'updateSidebarVisible',
        value: event,
      })
      ">
    <CSidebarBrand>
      <CImage :src="logo" fluid />
    </CSidebarBrand>
    <CSidebarNav>
      <MenuNewticket />
      <CNavItem href="/#/support-ticket/admin/admin_dashboard" style="position: relative" id="custom-nav-item">
        <CImage customClassName="nav-icon" id="custom-icon-sidebar" :src="Icondashboard" />
        <font id="font-sidebar">Dashboard</font>
      </CNavItem>

      <hr id="custom-underline" />

      <CNavItem href="/#/support-ticket/my_ticket" style="position: relative" id="custom-nav-item">
        <CImage customClassName="nav-icon" :src="IconmyTicket" id="custom-icon-sidebar" style="margin-right: 10px;" />
        <font id="font-sidebar">My Tickets</font>
      </CNavItem>

      <hr id="custom-underline" />

      <CNavItem href="/#/support-ticket/book_mark" style="position: relative" id="custom-nav-item">
        <CImage customClassName="nav-icon" :src="Iconbookmark" id="custom-icon-sidebar" />
        <font id="font-sidebar">Bookmark</font>
      </CNavItem>

      <hr id="custom-underline" />

      <CNavItem href="/#/support-ticket/admin/user_list" style="position: relative" id="custom-nav-item">
        <CImage customClassName="nav-icon" :src="IconmanageAccount" id="custom-icon-sidebar"
          style="margin-right: 10px; width: 25px;" />
        <font id="font-sidebar">Manage Account</font>
      </CNavItem>

      <hr id="custom-underline" />

      <CNavItem href="/#/support-ticket/admin/priority_list" style="position: relative" id="custom-nav-item">
        <CImage customClassName="nav-icon" :src="IconmanagePriority" id="custom-icon-sidebar" />
        <font id="font-sidebar">Manage Priority</font>
      </CNavItem>

      <hr id="custom-underline" />

      <CNavItem class="position-absolute bottom-0 start-0" id="position-logout">
        <!-- ให้กลุ่ม element ทั้งหมดมีการเรียกใช้งาน onLogoutClick() เมื่อมีการคลิก -->
        <div @click="onLogoutClick" style="cursor: pointer">
          <CImage customClassName="nav-icon" :src="Iconlogout" id="custom-icon-sidebar" />
          <font id="font-logout">logout</font>
        </div>
      </CNavItem>
    </CSidebarNav>
  </CSidebar>
</template>

<script>
import Iconlogout from '@/assets/images/Icon_logout.png'
import Icondashboard from '@/assets/images/Icon_dashboard.png'
import IconnewTicket from '@/assets/images/Icon_addTicket.png'
import Iconbookmark from '@/assets/images/Icon_bookmark.png'
import IconmyTicket from '@/assets/images/Icon_myticket.png'
import Icondropdown from '@/assets/images/Icon_dropdown.png'
import IconmanageAccount from '@/assets/images/Icon_manageAccount.png'
import IconmanagePriority from '@/assets/images/Icon_managePriority.png'
import MenuNewticket from './MenuNewticket.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { AppSidebarNav } from './AppSidebarNav'
import logo from '@/assets/images/logo.png'
import { logoNegative } from '@/assets/brand/logo-negative'
import { sygnet } from '@/assets/brand/sygnet'
import { CImage } from '@coreui/vue-pro'
export default {
  name: 'AppSidebarItSuport',
  components: {
    AppSidebarNav,
    CImage,
    MenuNewticket,
  },
  data() {
    return {
      logo: logo,
      IconnewTicket: IconnewTicket,
      Iconbookmark: Iconbookmark,
      Icondashboard: Icondashboard,
      Iconlogout: Iconlogout,
      IconmyTicket: IconmyTicket,
      Icondropdown: Icondropdown,
      dropdownOpenAccount: false,
      dropdownOpenPriority: false,
      IconmanageAccount: IconmanageAccount,
      IconmanagePriority: IconmanagePriority,
    }
  },
  setup() {
    const store = useStore()
    return {
      logoNegative,
      sygnet,
      sidebarUnfoldable: computed(() => store.state.sidebarUnfoldable),
      sidebarVisible: computed(() => store.state.sidebarVisible),
    }
  },
  mounted() {
    window.addEventListener('resize', this.updateSidebarVisibility)
    this.updateSidebarVisibility()
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.updateSidebarVisibility)
  },
  methods: {
    async onLogoutClick() {
      try {
        // ทำการลบข้อมูลผู้ใช้ที่เก็บไว้ใน localStorage
        localStorage.removeItem('USER_DATA')

        this.$router.push('/login')
      } catch (error) {
        console.log(error)
      }
    },
    updateSidebarVisibility() {
      if (window.innerWidth > 768) {
        // ขยาย sidebar
        this.$store.commit('updateSidebarVisible', { value: true })
      } else {
        // ซ่อน sidebar
      }
    },
    toggleDropdownAccount() {
      this.dropdownOpenAccount = !this.dropdownOpenAccount
      // ปิด Dropdown ของ Manage Priorities
      this.dropdownOpenPriority = false
    },

    // เพิ่ม method เพื่อเปิด/ปิด Dropdown ของ Manage Priorities
    toggleDropdownPriority() {
      this.dropdownOpenPriority = !this.dropdownOpenPriority
      // ปิด Dropdown ของ Manage Account
      this.dropdownOpenAccount = false
    },
  },
}
</script>
<style scoped>
#custom-nav-item:hover {
  border: 1px solid rgba(0, 0, 0, 0.15) !important;
  background-color: rgba(230, 230, 230, 1) !important;
  transition: background-color 0.3s, border 0.3s !important;
}

.custom-sidebar .c-sidebar {
  border-radius: 10px !important;
  margin-left: 10px !important;
}
</style>
