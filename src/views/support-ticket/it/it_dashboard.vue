<template>
  <div class="box">
    <CRow>
      <count_ticket />
    </CRow>

    <CCard>
      <CCard>
        <CChart
          class="ItCharetDoughnut w-25 d-inline"
          type="doughnut"
          width="1000"
          :data="{
            labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
            datasets: [
              {
                backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
                data: [40, 20, 80, 10],
              },
            ],
          }"
        />
      </CCard>
    </CCard>

    <!-- inbox -->
    <CCard class="d-block mt-2">
      <h1
        class="d-block ms-2"
        style="
          width: 140px;
          border-bottom: 2px solid transparent;
          border-image: linear-gradient(to right, red, blue);
          border-image-slice: 1;
          lable: asd;
        "
      >
        <CIcon :icon="icon.cilInbox" size="xxl" />Inbox
      </h1>

      <CSmartTable
        clickableRows
        :tableProps="{
          striped: true,
          hover: true,
        }"
        :activePage="2"
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
        <!-- เปลี่ยนสีตามสถานะ -->
        </template>
        <template #status="{ item }">
          <td>
            <CBadge :color="getBadge(item.status)"><li>{{ item.status }}</li></CBadge>
          </td>
        </template>

        <template #type="{ item }">
          <td>
            <CBadge class="bg-light text-black" >{{ item.type }}</CBadge>
          </td>
        </template>

        <template #details="{ item }">
          <CCollapse :visible="this.details.includes(item._id)">
            <CCardBody>
              <h4>
                {{ item.username }}
              </h4>
              <p class="text-muted">User since: {{ item.registered }}</p>
              <CButton size="sm" color="info" class=""> User Settings </CButton>
              <CButton size="sm" color="danger" class="ml-1"> Delete </CButton>
            </CCardBody>
          </CCollapse>
        </template>
      </CSmartTable>
    </CCard>
  </div>
</template>


<script>
import { CCol, CRow } from '@coreui/vue-pro'
import count_ticket from '@/components/count_ticket.vue'
import { CChart } from '@coreui/vue-chartjs'
import { CIcon } from '@coreui/icons-vue'
import * as icon from '@coreui/icons'
export default {
  components: { CRow, CCol, CChart, count_ticket, CIcon },
  setup() {
    return {
      icon,
    }
  },
  data() {
    return {
      columns: [
        {
          key: 'option',
          label: '',
          filter: false,
          sorter: false,
          _style: { width: '10%' },
        },
        {
          key: 'number',
          label: '#',
          _style: { width: '10%' },
        },
        {
          key: 'ticket_id',
          label: 'TICKET ID',
          _style: { width: '10%' },
        },
        {
          key: 'owner',
          label: 'OWNER',
          _style: { width: '15%' },
        },
        {
          key: 'start_date',
          label: 'START DATE',
          _style: { width: '15%' },
        },
        {
          key: 'status',
          label: 'STATUS',
          _style: { width: '10%' },
        },
        {
          key: 'type',
          label: 'TYPE',
          _style: { width: '10%' },
        },
        {
          key: 'book_mark',
          label: 'BOOK MARK',
          _style: { width: '10%' },
          filter: false,
          sorter: false,
        },
      ],
      details: [],
      items: [
        {
          option: '',
          number: 1,
          ticket_id: 'TK001',
          owner: 'Samppa Nori',
          start_date: '25 Mar 2021',
          status: 'High',
          type: 'Service Request',
          book_mark: '',
        },
        {
          option: '',
          number: 2,
          ticket_id: 'TK002',
          owner: 'Estavan Lykos',
          start_date: '21 Mar 2021',
          status: 'High',
          type: 'Service Request',
          book_mark: '',
        },
        {
          option: '',
          number: 3,
          ticket_id: 'TK003',
          owner: 'Chetan Mohamed',
          start_date: '17 Mar 2021',
          status: 'Normal',
          type: 'Hardware',
          book_mark: '',
          _selected: true,
        },
        {
          option: '',
          number: 4,
          ticket_id: 'TK004',
          owner: 'Derick Maximinus',
          start_date: '16 Mar 2021',
          status: 'Low',
          type: 'Software',
          book_mark: '',
        },
      ],
    }
  },
  methods: {
    getBadge(status) {
      switch (status) {
        case 'Low':
          return 'success'
        case 'Normal':
          return 'warning'
        case 'High':
          return 'danger'
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
