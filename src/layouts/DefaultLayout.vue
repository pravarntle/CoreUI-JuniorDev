<template>
  <AppSidebar v-if="role === 'Employee'" />
  <AppSidebarAdmin v-if="role === 'Admin'" />
  <AppSidebarItSuport v-if="role === 'ItSupport'" />
  <app-sidebar-manager v-if="role === 'Manager'" />
  <div
    class="wrapper d-flex flex-column min-vh-100 bg-light dark:bg-transparent"
  >
    <AppHeader />
    <div class="body flex-grow-1 px-3 mt-3">
      <CContainer lg>
        <router-view />
      </CContainer>
    </div>
    <AppFooter />
  </div>
  <AppAside  />
</template>
<script>
import { CContainer } from '@coreui/vue-pro'
import AppAside from '@/components/AppAside.vue'
import AppFooter from '@/components/AppFooter.vue'
import AppHeader from '@/components/AppHeader.vue'
import AppSidebar from '@/components/AppSidebar.vue'
import AppSidebarAdmin from '@/components/AppSidebarAdmin.vue'
import AppSidebarItSuport from '@/components/AppSidebarItSuport.vue'
import AppSidebarManager from '@/components/AppSidebarManager.vue'

export default {
  name: 'DefaultLayout',
  data() {
    return {
      role: '',
    };
  },
  components: {
    AppAside,
    AppFooter,
    AppHeader,
    AppSidebar,
    CContainer,
    AppSidebarAdmin,
    AppSidebarItSuport,
    AppSidebarManager,
  },
  mounted() {
    const userData = JSON.parse(localStorage.getItem('USER_DATA'));
    const userRole = userData.role;
    this.role = userRole;
  },
};
</script>
