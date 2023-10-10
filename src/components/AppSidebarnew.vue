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
      <CRow>
        <CCol>
          <CImage
            :src="logo"
            fluid
            
          /> 
        </CCol>
        <CCol>
          <h3>Support Trouble
            Ticket System</h3>
        </CCol>
        
        
      </CRow>
      
      <!-- <CIcon
        custom-class-name="sidebar-brand-full"
        :icon="logoNegative"
        :height="35"
      />
      <CIcon
        custom-class-name="sidebar-brand-narrow"
        :icon="sygnet"
        :height="35"
      /> -->
    </CSidebarBrand>
    <AppSidebarNav />
    <CSidebarToggler
      class="d-none d-lg-flex"
      @click="$store.commit('toggleUnfoldable')"
    />
  </CSidebar>


</template>
<style>
 .all{
  border-radius: 10;
 }
</style>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { AppSidebarNav } from './AppSidebarNav'
import logo  from '@/assets/images/logo.jpg'
import { logoNegative } from '@/assets/brand/logo-negative'
import { sygnet } from '@/assets/brand/sygnet'
export default {
  name: 'AppSidebar',
  components: {
    AppSidebarNav,
  },
  data() {
    return {
      logo: logo,
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
  created() {
  console.log('AppSidebarNav component created! 1 ');
  }
}
</script>
