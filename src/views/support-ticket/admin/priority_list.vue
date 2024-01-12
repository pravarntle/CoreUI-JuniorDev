<template>
  <div class="bg-white rounded" style="width: 100%; height: 845px">
    <!-- Head Priorities List -->
    <div class="bg-white rounded ms-5 py-3">
      <h1 id="LineHeadCard">Priorities List</h1>
    </div>

    <!-- body Priorities List -->
    <div class="py-5 px-5">
      <CButton class="px-5" variant="ghost">User</CButton>
      <CButton class="px-5" variant="ghost">Priority</CButton>

      <!-- Search bar -->
      <!-- <div class="container pt-5">
        <div class="row justify-content-center w-75">
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
      </div> -->
      <!-- End Search bar -->

      <!-- Smart Table -->
      <div class="container">
        <CSmartTable class="w-50" :active-page="3" cleaner column-filter column-sorter :columns="columns" clickable-rows
          header :items-per-page="5" items-per-page-select :items="items" pagination table-filter :table-props="{
            striped: true,
            hover: true,
          }">
          <!---->
          <template #status_eng="{ item }">
            <td>
              <CBadge :color="getBadge(item.status_eng)">{{ item.status_eng }}</CBadge>
            </td>
          </template>
          <template #show_details="{ item, index }">
            <td class="py-2">

              <CDropdown src="More_Priority">
                <CDropdownToggle><img :src="More_Priority" /></CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem @click="editAccount(item, index)">Edit</CDropdownItem>
                  <CDropdownItem @click="DeleteButton(item, index)" class="text-danger">Delete</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </td>
          </template>
        </CSmartTable>

      </div>

      <!-- END Smart Table -->

    </div>

  </div>
</template>




<script>
import { CIcon } from '@coreui/icons-vue'
import * as icon from '@coreui/icons'
import More_Priority from '@/assets/images/More_Priority.png'
import { CAvatar, CButton, CCol, CImage, CRow } from '@coreui/vue-pro'
import { ref } from 'vue'
import axios from 'axios'



export default {
  components: {
    CIcon,
    CRow,
    CImage,
    CCol,
    CAvatar,
    CButton,
    ref,
  },
  setup() {
    const items = ref([]);
    const columns = [
      {
        key: 'number',
        label: '#',
        filter: false,
        sorter: false,
        _style: { width: '5%' },
      },
      {
        key: 'status_eng',
        label: 'NAME (ENG)',
        _style: { width: '20%' },
      },
      {
        key: 'status_th',
        label: 'NAME (TH)',
        _style: { width: '20%' },
      },
      {
        key: 'level_of_priority',
        label: 'LEVEL 0F PRIORITY',
        _style: { width: '20%' },
      },

      {
        key: 'show_details',
        label: 'MORE',
        _style: { width: '1%' },
        filter: false,
        sorter: false,
      },
    ];
    return {
      icon,
      More_Priority,
      items,
      columns,
    }
  },

  data() {
    return {
      details: [],
    }
  },
  methods: {
    getBadge(status_eng) {
      switch (status_eng) {
        case 'Low':
          return 'success'
        case 'Medium':
          return 'warning'
        case 'High':
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
    async getPriority() {
      try {
        const response = await axios.post(`${process.env.VUE_APP_URL}/mongoose/get/stts_priorities`, {

          where: {
            pri_status: { $ne: 'Delete' }

          },
        });
        console.log(response.data)
        // นำข้อมูลที่ได้รับมาใส่ในตัวแปร items
        this.items = response.data.map((element, index) => ({
          'number': index + 1,
          _id: element._id,
          'status_eng': element.pri_name_eng,
          'status_th': element.pri_name_th,
          'level_of_priority': element.pri_level,
          MORE: false,
        }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    async editAccount(item) {
      const itemId = item._id.toString();
      console.log(itemId)

      this.$router.push({ name: 'ST - edit_priority', params: { itemId } });
    },

    async DeleteButton(item) {

      try {
        const itemId = item._id.toString();
        // ทำการอัปเดตข้อมูลใน MongoDB โดยใช้ Axios
        await axios.put(`${process.env.VUE_APP_URL}/mongoose/update/stts_priorities/${itemId}`, {
          data: {
            pri_status: "Delete",


          }
        });

        // หลังจากอัปเดตสำเร็จ คุณสามารถทำสิ่งอื่นที่คุณต้องการได้ที่นี่
        console.log('ลบ priority');
        // รีเฟรชหน้า
        window.location.reload();

      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการอัปเดตข้อมูล:', error);
      }
    },
  },
  mounted() {
    //เรียกใช้ฟังชั่นเมื่อโหลดหน้า
    this.getPriority();


  }

}

</script>


<style scoped>
.dropdown-toggle::after {
  display: none !important;
}

.container {
  display: flex;
  justify-content: center;
  /* จัดเนื้อหาในแนวนอนกลาง */
  align-items: center;
  /* จัดเนื้อหาในแนวตั้งกลาง */
}

.underline {

  position: relative;
  /* ตั้งค่าตำแหน่งเป็น relative เพื่อให้เราสามารถกำหนดตำแหน่งของ ::after pseudo-element ได้ */
}

.underline::after {
  content: "";
  /* เพิ่มเนื้อหาของ pseudo-element */
  position: absolute;
  /* ตั้งค่าตำแหน่งเป็น absolute เพื่อให้เส้นใต้เริ่มต้นจากตัวหนังสือ */
  bottom: 0;
  /* ตำแหน่งด้านล่างของ pseudo-element */
  left: 0;
  /* ตำแหน่งด้านซ้ายของ pseudo-element (จากด้านขวาของตัวหนังสือ) */
  width: auto;
  /* กว้างเท่ากับตัวหนังสือ */
  height: 2px;
  /* ความสูงของเส้นใต้ */
  background-image: linear-gradient(to right, red 30%, blue 30%);
  /* สร้างเส้นใต้ที่มีสีแดง 30% และน้ำเงิน 70% */
  background-repeat: no-repeat;
  /* ไม่ต้องรีเพียต์พื้นหลัง */
  background-size: 100% 100%;
  /* ความกว้างของเส้นใต้และความสูงของเส้นใต้ (เท่ากับตัวอักษร) */
}

#LineHeadCard {
  display: inline-block;
  border-bottom: 5px solid transparent;
  border-image: linear-gradient(to right, #ea5252, #030303);
  border-image-slice: 1;
}

</style>