<template>
  <CSidebar
    position="fixed"
    :unfoldable="sidebarUnfoldable"
    :visible="sidebarVisible"
    @visible-change="
      (event) =>
        $store.commit({
          type: 'updateSidebarVisible',
          value: event,
        })
    "
  >
    <CSidebarBrand>
      <CImage :src="logo" fluid />
    </CSidebarBrand>

    <CSidebarNav>
      <!-- <CNavItem
        href="/#/support-ticket/ticket/create"
        style="
          background-color: #ea5252;
          border-radius: 20px;
          margin-top: 15px;
          margin-bottom: 10px;
          width: 200px;
          margin-left: 10px;
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        "
      >
        <CImage
          customClassName="nav-icon"
          :src="IconnewTicket"
          style="max-height: 20px; margin-left: 5px; margin-right: 5px"
        />
        <font style="padding-left: 9px; color: whitesmoke"
          ><b>New Ticket</b></font
        >
      </CNavItem> -->
      <ShareMenu/>

      <CNavItem href="/#/support-ticket/it/it_dashboard" class="custom-nav-item">
        <CImage
          customClassName="nav-icon"
          :src="Icondashboard"
          style="max-height: 20px; margin-left: 15px; margin-right: 15px"
        />
        <font style="color: black">Dashboard</font>
      </CNavItem>

      <hr
        style="color: black; width: 70%; margin-left: 20px; margin-top: 0px"
      />

      <CNavItem
        href="/#/support-ticket/user/dashboard"
        style="position: relative"
        class="custom-nav-item"
      >
        <CImage
          customClassName="nav-icon"
          :src="IconmyTicket"
          style="max-height: 23px; margin-left: 10px; margin-right: 12px;"
        />
        <font style="color: black">My Ticket</font>
      </CNavItem>

      <hr
        style="color: black; width: 70%; margin-left: 20px; margin-top: 0px"
      />

      <CNavItem
        href="/#/support-ticket/user/dashboard"
        style="position: relative"
        class="custom-nav-item"
      >
        <CImage
          customClassName="nav-icon"
          :src="Iconbookmark"
          style="max-height: 23px; margin-left: 10px; margin-right: 18px"
        />
        <font style="color: black">Bookmark</font>
      </CNavItem>

      <hr
        style="color: black; width: 70%; margin-left: 20px; margin-top: 0px"
      />

      <CNavItem href="#" class="position-absolute bottom-0 start-0">
        <CImage
          customClassName="nav-icon"
          :src="Iconlogout"
          style="max-height: 20px; margin-left: 15px; margin-right: 15px"
        />
        <font color="red" @click="onLogoutClick()">logout</font>
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
import ShareMenu from './ShareMenu.vue'
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
    ShareMenu
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
      dropdownOpen: false,
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
  },
}
</script>
<style scoped>
.custom-nav-item:hover {
  border: 1px solid rgba(0, 0, 0, 0.15) !important;
  background-color: rgba(230, 230, 230, 1) !important;
  transition: background-color 0.3s, border 0.3s !important;
}
</style>
