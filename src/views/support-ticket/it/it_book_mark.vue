<template>
  
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
