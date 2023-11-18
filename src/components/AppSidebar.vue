<template>
  <CSidebar
    position="fixed"
    top="0"
    left="0"
    height="100vh"
    overflow-y="auto"
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
      <CNavItem href="/#/support-ticket/user/dashboard" class="custom-nav-item">
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
      <CNavItem href="/#/support-ticket/ticket/book" class="custom-nav-item">
        <CImage
          customClassName="nav-icon"
          :src="Iconbookmark"
          style="max-height: 20px; margin-left: 15px; margin-right: 15px"
        />
        <font style="color: black">Bookmark</font>
      </CNavItem>
      <hr
        style="color: black; width: 70%; margin-left: 20px; margin-top: 0px"
      />

      <CNavItem href="#" class="position-absolute bottom-0 start-0">
        <!-- ให้กลุ่ม element ทั้งหมดมีการเรียกใช้งาน onLogoutClick() เมื่อมีการคลิก -->
        <div @click="onLogoutClick">
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
import { computed } from 'vue'
import { useStore } from 'vuex'
import { AppSidebarNav } from './AppSidebarNav'
import logo from '@/assets/images/logo.png'
import { logoNegative } from '@/assets/brand/logo-negative'
import { sygnet } from '@/assets/brand/sygnet'
import { CImage } from '@coreui/vue-pro'
import MenuNewticket from './MenuNewticket.vue'
export default {
  name: 'AppSidebar',
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
        this.$store.commit('updateSidebarVisible', { value: false })
      }
    },
  },
}
</script>
<style scoped>
/* ให้ CSidebar มีความกว้าง 300px ในหน้าจอทั่วไป */
.c-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  overflow-y: auto;
  background-color: rgba(230, 230, 230, 1) !important;
}

@media (max-width: 768px) {
  .c-sidebar {
    width: 100%;
    background-color: rgba(230, 230, 230, 1) !important;
  }
}

.custom-nav-item:hover {
  border: 1px solid rgba(0, 0, 0, 0.15) !important;
  background-color: rgba(230, 230, 230, 1) !important;
  transition: background-color 0.3s, border 0.3s !important;
}
</style>
