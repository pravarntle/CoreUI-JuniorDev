<template>
  <div>
    <CCard class="mb-3">
      <CCardBody>
        <CRow style="margin-bottom: 22px">
          <CCol xs="auto">
            <div Class="images">
              <CAvatar Class="images_Ticket" :src="images_Ticket" />
            </div>
          </CCol>
          <CCol xs="auto">
            <div Class="text-end p-2" style="padding-left: 0px">
              <CCardTitle> <b> My Tasks </b></CCardTitle>
            </div>
          </CCol>
        </CRow>

        <CRow>
          <CCol xs="auto">
            <CNav variant="tabs">
              <CNavItem>
                <CNavLink active> All </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink>Pending</CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink>Open </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink> Closed </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink> Closed Bug </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink> Cancel </CNavLink>
              </CNavItem>
            </CNav>
          </CCol>
          <CCol>
            <div Class="container pt-5">
              <div class="align-items-center">
                <div class="col-md-6">
                  <form class="form-inline">
                    <div class="input-group">
                      <input
                        type="text"
                        class="form-control rounded-start-pill"
                        placeholder="Search"
                      />
                      <div class="input-group-append">
                        <button
                          class="btn btn-primary rounded-start-0 rounded-end-circle"
                          type="submit"
                        >
                          <CIcon :icon="icon.cilMagnifyingGlass" size="xl" />
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </CCol>
        </CRow>

        

        <CSmartTable
          clickableRows
          :tableProps="{
            striped: true,
            hover: true,
          }"
          :activePage="2"
          footer
          header
          :items="items"
          :columns="columns"
          columnFilter
          tableFilter
          cleaner
          itemsPerPageSelect
          :itemsPerPage="5"
          columnSorter
          :sorterValue="{ column: 'status', state: 'asc' }"
          pagination
        >
          <template #avatar="{ item }">
            <td>
              <CAvatar :src="$withBase(`/images/avatars/${item.avatar}`)" />
            </td>
          </template>
          <template #status="{ item }">
            <td>
              <CBadge :color="getBadge(item.status)">{{ item.status }}</CBadge>
            </td>
          </template>
          <template #show_details="{ item, index }">
            <td class="py-2">
              <CButton
                color="primary"
                variant="outline"
                square
                size="sm"
                @click="toggleDetails(item, index)"
              >
                {{ Boolean(item._toggled) ? 'Hide' : 'Show' }}
              </CButton>
            </td>
          </template>
          <template #details="{ item }">
            <CCollapse :visible="this.details.includes(item._id)">
              <CCardBody>
                <h4>
                  {{ item.username }}
                </h4>
                <p class="text-muted">User since: {{ item.registered }}</p>
                <CButton size="sm" color="info" class="">
                  User Settings
                </CButton>
                <CButton size="sm" color="danger" class="ml-1">
                  Delete
                </CButton>
              </CCardBody>
            </CCollapse>
          </template>
        </CSmartTable>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import { CIcon } from '@coreui/icons-vue'
import * as icon from '@coreui/icons'
import images_Ticket from '@/assets/images/Ticket.png'
import { CCol, CImage, CRow } from '@coreui/vue-pro'
export default {
  name: 'comment',
  components: {
    CIcon,
    CRow,
    CImage,
    CCol,
  },
  setup() {
    return {
      images_Ticket,
      icon,
    }

  },
}
</script>

<style>

.mb-3 {
  width: 943px;
  height: 691px;
  flex-shrink: 0;
  border-radius: 18px;
  background: #fff;
}

.images {
  width: 55px;
  height: 39.672px;
  flex-shrink: 0;
}

.Tasks {
  color: #000;
  font-family: Inter;
  font-size: 36px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  padding: 4px;
}

.form-inline {
  width: 300px;
  height: 31px;
  flex-shrink: 0;
}
</style>
