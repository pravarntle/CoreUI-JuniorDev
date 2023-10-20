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
      <CNavItem
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
      </CNavItem>

      <CNavItem href="/#/support-ticket/it/it_dashboard">
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
          customClassName="nav-icon"
          :src="IconmanageAccount"
          style="max-height: 20px; margin-left: 30px; margin-right: 12px; max-width: 25px;"
        />
        <font style="color: black">Manage Account</font>

        <!-- Dropdown Icon -->
        <CImage
          :src="Icondropdown"
          @click="dropdownOpen = !dropdownOpen"
          :style="{
            'max-height': '20px',
            cursor: 'pointer',
            marginLeft: '5px',
            transform: dropdownOpen ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.3s',
          }"
        />

        <!-- Dropdown items -->
        <div
          v-show="dropdownOpen"
          style="background-color: white; width: 100%; z-index: 100"
        >
          <CNavItem
            href="/#/support-ticket/ticket/book1"
            style="padding-left: 52px"
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
            href="/#/support-ticket/ticket/book2"
            style="padding-left: 52px; margin-top: 0px; margin-bottom: 0px"
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

      <CNavItem
        href="/#/support-ticket/user/dashboard"
        style="position: relative"
      >
        <CImage
          customClassName="nav-icon"
          :src="IconmyTicket"
          style="max-height: 23px; margin-left: 10px; margin-right: 12px"
        />
        <font style="color: black">My Task</font>
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
    this.updateSidebarVisibility() // ใช้ตรวจสอบครั้งแรกเมื่อ component ถูก mounted
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.updateSidebarVisibility)
  },
  methods: {
    async onLogoutClick() {
      try {
        // ทำการลบข้อมูลผู้ใช้ที่เก็บไว้ใน localStorage
        localStorage.removeItem('USER_DATA')

        // 8soCfP12Ph19mi914zQaZz2KsGGtcANVhVVfKAnmVRqM (สามารถเปลี่ยน URL หรือ path ตามที่คุณต้องการได้)
        this.$router.push('/login') // เปลี่ยนเส้นทางไปยังหน้า login หรือหน้าที่คุณต้องการหลังจากออกจากระบบ
      } catch (error) {
        console.log(error)
      }
    },
    updateSidebarVisibility() {
      if (window.innerWidth > 768) {
        // ขยาย sidebar
        this.$store.commit('updateSidebarVisible', { value: true })
      } else {
        // ซ่อน sidebar (หรือคุณสามารถเลือกว่าจะไม่ทำอะไรก็ได้ หากคุณต้องการให้มันยังคงแสดงอยู่)
        // ตัวอย่าง: this.$store.commit('updateSidebarVisible', { value: false });
      }
    },
  },
}
</script>
