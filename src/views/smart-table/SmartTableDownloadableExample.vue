<template>
  <CLink
    class="btn btn-primary mb-2"
    :href="csvCode"
    download="coreui-table-data.csv"
    target="_blank"
  >
    Download current items (.csv)
  </CLink>
  <CSmartTable
    :items="items"
    :columns="columns"
    tableFilter
    cleaner
    :items-per-page="5"
    column-sorter
    pagination
    table-filter-placeholder="Search"
  />
</template>

<script>
import { ref } from 'vue'
import data from '../support-ticket/users/_data'
export default {
  name: 'SmartTableDownloadableExample',
  setup() {
    const items = ref(data)
    const columns = ['name', 'registered', 'role', 'status']
    const currentItems = ref(data)

    const setCurrentItems = (items) => {
      currentItems.value = items
    }

    const csvContent = currentItems.value
      .map((item) => Object.values(item).join(','))
      .join('\n')

    const csvCode =
      'data:text/csv;charset=utf-8,SEP=,%0A' + encodeURIComponent(csvContent)

    return {
      columns,
      csvContent,
      csvCode,
      items,
      setCurrentItems,
    }
  },
}
</script>
