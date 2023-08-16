<template>
  <CHeader position="sticky" class="mb-4">
    <CContainer>
      <CHeaderToggler class="ps-1" @click="$store.commit('toggleSidebar')">
        <CIcon icon="cil-menu" size="lg" />
      </CHeaderToggler>
      <CHeaderBrand class="mx-auto d-lg-none" to="/">
        <CIcon :icon="logo" height="48" alt="Logo" />
      </CHeaderBrand>
      <CHeaderNav class="d-none d-md-flex me-auto">

      </CHeaderNav>
      <CHeaderNav class="ms-auto me-4">
          <CFormCheck

            type="radio"
            :button="{ color: 'dark' }"
          >
            <template #label><CIcon icon="cilBell" /></template>
          </CFormCheck>
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

export default {
  name: 'AppHeader',
  components: {
    AppBreadcrumb,
    AppHeaderDropdownAccnt,
    AppHeaderDropdownMssgs,
    AppHeaderDropdownNotif,
    AppHeaderDropdownTasks,
  },
  setup() {
    return {
      logo,
    }
  },
}
</script>
