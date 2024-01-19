<template>
  <div class="box">
    <CRow>
      <CCol>
        <count_ticket />
      </CCol>
    </CRow>

    <CRow>
        <CCol>
            <dashboard_it/>
        </CCol>
    </CRow>

    <CRow>
        <CCol>
            <dashboard_manager/>
        </CCol>
    </CRow>

    <CRow>
      <CCol>
        <CCard class="mt-3 rounded-4">
          <CCardTitle>
            <CButton
              variant="ghost"
              class="border border-0 bg-body ms-auto d-flex"
              ><img :src="Close_fullscreen"
            /></CButton>
          </CCardTitle>
          <CCardBody>
            <h1>Priority Category</h1>
            
            <hr />
            <PriorityChart />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>

  </div>
</template>


<script>
import count_ticket from '@/components/CountTicket.vue'
import Dashboard_manager from '@/components/Dashboard_manager.vue'
import PriorityChart from '@/components/PriorityBar.vue'
import Dashboard_it from '@/components/Dashboard_it.vue'

export default {
  components: { count_ticket, Dashboard_manager, PriorityChart, Dashboard_it },
};
</script>


<style>
</style>
