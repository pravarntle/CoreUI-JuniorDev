<template>
  <div>
    <CCard class="mb-3">
      <CCardBody>
        <CRow style="margin-bottom: 22px">
          <CCol xs="auto">
            <div Class="clearfix">
              <CImage
                Class="images_Ticket"
                :src="images_Bookmark"
                width="36"
                height="36"
              />
            </div>
          </CCol>
          <CCol xs="auto">
            <div Class="text-end p-2">
              <CCardTitle> <b> BookMark </b></CCardTitle>
            </div>
          </CCol>
          <div Class="line">
            <!-- ภาพกราฟิกแบบ vector 2 มิติ -->
            <svg
              xmlns="http://www.w3.org/2000/svg" \\ ระบุ XML namespace ของ SVG ซึ่งบ่งชี้ถึงว่าเราใช้รูปแบบ SVG.
              width="219" \\กำหนดความกว้างของ ให้เป็น 219 หน่วย.
              height="3" \\กำหนดความสูงของให้เป็น 3หน่วย.
              viewBox="0 0 219 3" \\กำหนดขอบเขตของแสดงผล ความกว้าง 219หน่วย และความสูง3หน่วย.
              fill="none" \\ไม่มีการเติมสีหรือรูปแบบสีใดๆ เข้าไปใน element นั้น ๆ
            >
            </svg>
          </div>
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
import images_Bookmark from '@/assets/images/bookmark.png'
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
      images_Bookmark,
      icon,
    }
  },
  methods: {
    getBadge(status) {
      switch (status) {
        case 'Active':
          return 'success'
        case 'Inactive':
          return 'secondary'
        case 'Pending':
          return 'warning'
        case 'Banned':
          return 'danger'
        default:
          'primary'
      }
    },
    toggleDetails(item) {
      if (this.details.includes(item._id)) {
        this.details = this.details.filter((_item) => _item !== item._id)
        return
      }
      this.details.push(item._id)
    },
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
  max-width: 100%;
  display: flex;
}

.images {
  width: 55px;
  height: 39.672px;
  padding-left: 0%;
  flex-shrink: 0;
}

.text-end {
  padding-left: 0px;
  flex-shrink: 0;
  color: #000;
  padding-left: 0%;
  margin-left: 0px;
}

.line {
  margin-top: auto;
}
</style>
