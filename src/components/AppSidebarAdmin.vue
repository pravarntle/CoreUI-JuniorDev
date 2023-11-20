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
      <MenuNewticket />
      <CNavItem
        href="/#/support-ticket/admin/admin_dashboard"
        style="position: relative"
        class="custom-nav-item"
      >
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

      <CNavItem style="position: relative">
        <CImage
          customClassName="custom-nav-item"
          :src="IconmanageAccount"
          style="
            max-height: 20px;
            margin-left: 30px;
            margin-right: 12px;
            max-width: 24px;
          "
        />
        <font style="color: black">Manage Account</font>

        <!-- Dropdown Icon -->
        <CImage
          :src="Icondropdown"
          @click="dropdownOpenAccount = !dropdownOpenAccount"
          :style="{
            'max-height': '20px',
            cursor: 'pointer',
            marginLeft: '5px',
            transform: dropdownOpenAccount ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.3s',
          }"
        />

        <!-- Dropdown items -->
        <div
          v-show="dropdownOpenAccount"
          style="background-color: white; width: 100%; z-index: 100"
        >
          <CNavItem
            href="/#/support-ticket/admin/add_account"
            style="padding-left: 52px"
            class="custom-nav-item"
          >
            <font style="color: black">Add Account</font>
          </CNavItem>

          <hr
            style="
              color: black;
              width: 50%;
              margin-left: 65px;
              margin-top: 0px;
              margin-bottom: 0px;
            "
          />

          <CNavItem
            href="/#/support-ticket/admin/user_list"
            style="padding-left: 52px; margin-top: 0px; margin-bottom: 0px"
            class="custom-nav-item"
          >
            <font style="color: black">Edit Account</font>
          </CNavItem>
          <hr
            style="
              color: black;
              width: 50%;
              margin-left: 65px;
              margin-top: 0px;
              margin-bottom: 0px;
            "
          />
        </div>
      </CNavItem>

      <hr
        style="color: black; width: 70%; margin-left: 20px; margin-top: 15px"
      />

      <CNavItem style="position: relative">
        <CImage
          customClassName="nav-icon"
          :src="IconmanagePriority"
          style="
            max-height: 20px;
            margin-left: 30px;
            margin-right: 17px;
            max-width: 25px;
          "
        />
        <font style="color: black">Manage Priorites</font>

        <!-- Dropdown Icon -->
        <CImage
          :src="Icondropdown"
          @click="dropdownOpenPriority = !dropdownOpenPriority"
          :style="{
            'max-height': '20px',
            cursor: 'pointer',
            marginLeft: '5px',
            transform: dropdownOpenPriority ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.3s',
          }"
        />

        <!-- Dropdown items -->
        <div
          v-show="dropdownOpenPriority"
          style="background-color: white; width: 100%; z-index: 100"
        >
          <CNavItem
            href="/#/support-ticket/admin/create_priority"
            style="padding-left: 52px"
            class="custom-nav-item"
          >
            <font style="color: black">Add Priorites</font>
          </CNavItem>

          <hr
            style="
              color: black;
              width: 50%;
              margin-left: 65px;
              margin-top: 0px;
              margin-bottom: 0px;
            "
          />

          <CNavItem
            href="/#/support-ticket/admin/priority_list"
            style="padding-left: 52px; margin-top: 0px; margin-bottom: 0px"
            class="custom-nav-item"
          >
            <font style="color: black">Priorites List</font>
          </CNavItem>
          <hr
            style="
              color: black;
              width: 50%;
              margin-left: 65px;
              margin-top: 0px;
              margin-bottom: 0px;
            "
          />
        </div>
      </CNavItem>

      <hr
        style="color: black; width: 70%; margin-left: 20px; margin-top: 15px"
      />

      <CNavItem
        href="/#/support-ticket/my_ticket"
        style="position: relative"
        class="custom-nav-item"
      >
        <CImage
          customClassName="nav-icon"
          :src="IconmyTicket"
          style="max-height: 23px; margin-left: 10px; margin-right: 12px"
        />
        <font style="color: black">My Ticket</font>
      </CNavItem>

      <hr
        style="color: black; width: 70%; margin-left: 20px; margin-top: 0px"
      />

      <CNavItem
        href="/#/support-ticket/book_mark"
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

      <CNavItem class="position-absolute bottom-0 start-0" 
        style="padding-left: 15px; padding-bottom: 15px;"
      >
        <!-- ให้กลุ่ม element ทั้งหมดมีการเรียกใช้งาน onLogoutClick() เมื่อมีการคลิก -->
        <div @click="onLogoutClick" style=" cursor: pointer;">
          <CImage
            customClassName="nav-icon"
            :src="Iconlogout"
            style="max-height: 20px; margin-left: 15px; margin-right: 15px"
          />
          <font color="red">logout</font>
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
.custom-nav-item:hover {
  border: 1px solid rgba(0, 0, 0, 0.15) !important;
  background-color: rgba(230, 230, 230, 1) !important;
  transition: background-color 0.3s, border 0.3s !important;
}
</style>
