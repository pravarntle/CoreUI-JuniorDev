<template>
  <div>
    <CCard>
      <CCardHeader>
        <h4>List Users</h4>
      </CCardHeader>
      <CCardBody>
        <CRow>
          <CCol>
            <CSmartTable
              :items="users"
              :columns="columns"
              :itemsPerPage="5"
              :tableProps="{
                striped: true,
                hover: true,
              }"
              tableFilter
              columnFilter
              itemsPerPageSelect
              pagination
            >
              <template #gender="{item}">
                <td>
                  <CBadge :color="item.gender==='ชาย' ? 'info' : 'danger'">{{ item.gender }}</CBadge>
                </td>
              </template>
              <template #action="{item}">
                <td>
                  <CButton color="info" size="sm" @click="showData(item)"><CIcon name="cilOptions" /></CButton>
                </td>
              </template>
            </CSmartTable>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        { key: 'id', label: 'รหัส', _style: { width: '7%' } },
        { key: 'first_name', label: 'ชื่อ' },
        { key: 'last_name', label: 'นามสกุล' },
        { key: 'gender', label: 'เพศ' },
        { key: 'position', label: 'ตำแหน่ง' },
        { key: 'action', label: '', filter: false }
      ],
      users: [
        {
          id: '0001',
          first_name: 'ทาทัต',
          last_name: 'ธนกนก',
          gender: 'ชาย',
          position: 'Manager',
        },
        {
          id: '0002',
          first_name: 'ศุภกฤต',
          last_name: 'โพธิ์อุไร',
          gender: 'ชาย',
          position: 'Software Engineer',
        },
        {
          id: '0003',
          first_name: 'เสฎฐวุฒิ',
          last_name: 'สินพร',
          gender: 'ชาย',
          position: 'Project Manager',
        },
        {
          id: '0004',
          first_name: 'สุทธพัฒน์',
          last_name: 'บุญทัน',
          gender: 'ชาย',
          position: 'Planning Manager',
        },
        {
          id: '0005',
          first_name: 'ศิรินยา',
          last_name: 'สอนดิลก',
          gender: 'หญิง',
          position: 'Quality Manager',
        },
        {
          id: '0006',
          first_name: 'ยุคนธร',
          last_name: 'ใส่มั่วๆ ก้ได้',
          gender: 'ชาย',
          position: 'Software Engineer',
        }
      ]
    }
  },
  methods: {
    showData(data) {
      console.log(data)
    }
  }
}
</script>