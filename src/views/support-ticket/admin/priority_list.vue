<template>
  <div>
    <CCard class="p-2 rounded-4">
      <!-- Head Priorities List -->
      <CCardHeader class="bg-white border-white mb-3 d-flex justify-content-between align-items-center custom-CCard-Header" >
        <div class="d-inline ms-2">
          <div id="underline_header">
            <CImage class="me-2 align-middle" id="custom_icon_header" :src="Icon_Priority" />
            <h1 class="d-inline align-middle"><b>Priorities List</b></h1>
          </div>
        </div>
        <div>
          <CButton class="btn btn-primary btn-block btn-long" color="info" @click="create_priority()">
            <CImage class="style-icon-create-priority" :src="Iconcreatepriority" />
            <b class="font-button">Create</b>
          </CButton>
        </div>
      </CCardHeader>
      <!-- body Priorities List -->
      <CCardBody>
          <!-- Smart Table -->
          <div>
            <CSmartTable :active-page="3" column-sorter :columns="columns" tableFilter table-filter-placeholder="Search" columnFilter
              class="text-center table-hover table-bordered table-alternate-background table-responsive" clickable-rows :sorterValue="{ column: 'level_of_priority', state: 'desc' }"
              header :items="items" pagination :table-props="{
                striped: true,
                hover: true,
              }">
              <!---->
              <template #status_eng="{ item }">
                <td>
                  <!-- <CBadge :color="getBadge(item.status_eng)">{{
                    item.status_eng
                  }}</CBadge> -->
                  <CBadge class="px-3" :style="item.pri_color">{{
                    item.status_eng
                  }}</CBadge>
                </td>
              </template>
              <template #show_details="{ item, index }">
                <td class="text-center">
                  <CButton size="sm" class="action_button mx-1" @click="editAccount(item, index)">
                    <CImage :src="Iconeditaccount" class="style-button" alt="Edit Icon" />
                  </CButton>
                  <CButton size="sm" class="action_button ml-1" @click="showDelete(item)">
                    <CImage :src="Icondeleteaccount" class="style-button" alt="Delete Icon" />
                  </CButton>
                </td>
              </template>
              <template #details="">
                <CModal alignment="center" :backdrop="false" :keyboard="false" :visible="visibleDelete"
                    @close="() => { visibleDelete = false }">

                    <CModalBody>
                        <h2 class="text-start"> Delete Priority </h2>
                        <p class="text-black" id="popup-detail">
                        Are you sure you want to
                        <span class="text-danger">Delete Priority ?</span>
                        </p>
                        <br/>
                        <hr/>
                        <div class="d-flex justify-content-end">
                            <CButton color="light"> Cancel </CButton>
                            <CButton class="ms-2" color="danger text-white" id="confirm-btn-in-detail" @click="DeleteButton()" @mouseup.stop="" :disabled="isLoading">
                              <CSpinner v-if="isLoading" component="span" size="sm" variant="grow" aria-hidden="true" />
                               {{ isLoading ? 'Confirm...' : 'Confirm' }}
                            </CButton>
                        </div>
                    </CModalBody>
                    </CModal>
            </template>
            </CSmartTable>
          </div>

        <!-- END Smart Table -->
      </CCardBody>
    </CCard>
    <br />
  <CToaster placement="top-end">
    <CToast visible color="danger" v-for="(toast) in toastDelete">
      <CToastHeader closeButton v-if="toast.title">
        <span class="me-auto fw-bold">{{ toast.title }}</span>
      </CToastHeader>
      <CToastBody v-if="toast.content">
        <span class="text-white">{{ toast.content }}</span>
      </CToastBody>
    </CToast>
  </CToaster>
  </div>
</template>

<script>
import { CIcon } from '@coreui/icons-vue'
import * as icon from '@coreui/icons'
import More_Priority from '@/assets/images/More_Priority.png'
import { CAvatar, CButton, CCol, CImage, CRow } from '@coreui/vue-pro'
import { ref } from 'vue'
import axios from 'axios'
import Icon_Priority from '../../../assets/images/Icon_Priority.png'
import Iconeditaccount from '../../../assets/images/Icon_editaccount.png'
import Icondeleteaccount from '../../../assets/images/Icon_deleteaccount.png'
import Iconcreatepriority from '@/assets/images/Icon_addTicket.png'

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
    const items = ref([])
    const columns = [
      {
        key: 'number',
        label: '#',
        filter: false,
        sorter: false,
        _style: {
          width: '5%',
          fontWeight: 'bold',
          color: 'gray',
          fontSize: '13px',
        },
      },
      {
        key: 'status_eng',
        label: 'NAME (ENG)',
        _style: {
          width: '15%',
          fontWeight: 'bold',
          color: 'gray',
          fontSize: '13px',
        },
      },
      {
        key: 'status_th',
        label: 'NAME (TH)',
        _style: {
          width: '15%',
          fontWeight: 'bold',
          color: 'gray',
          fontSize: '13px',
        },
      },
      {
        key: 'level_of_priority',
        label: 'LEVEL 0F PRIORITY',
        _style: {
          width: '15%',
          fontWeight: 'bold',
          color: 'gray',
          fontSize: '13px',
        },
      },
      {
        key: 'description',
        label: 'PRIORITY INFO',
        _style: {
          width: '40%',
          fontWeight: 'bold',
          color: 'gray',
          fontSize: '13px',
        },
      },
      {
        key: 'show_details',
        label: 'ACTION',
        _style: {
          width: '20%',
          fontWeight: 'bold',
          color: 'gray',
          fontSize: '13px',
        },
        filter: false,
        sorter: false,
      },
    ]
    return {
      icon,
      More_Priority,
      items,
      columns,
      Icon_Priority,
      Icondeleteaccount,
      Iconeditaccount,
    }
  },

  data() {
    return {
      details: [],
      Iconcreatepriority: Iconcreatepriority,
      visibleDelete: false,
      indexDelete: '',
      toastDelete: [],
      isLoading: false,
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
        const response = await axios.post(
          `${process.env.VUE_APP_URL}/mongoose/get/stts_priorities`,
          {
            where: {
              pri_status: { $ne: 'Delete' },
            },
          },
        )
        console.log(response.data)
        // นำข้อมูลที่ได้รับมาใส่ในตัวแปร items
        this.items = response.data.map((element, index) => ({
          number: index + 1,
          _id: element._id,
          status_eng: element.pri_name_eng,
          status_th: element.pri_name_th,
          level_of_priority: element.pri_level,
          description: element.pri_description,
          pri_color: `background-color: ${element.pri_color};`,
          MORE: false,
        }))
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    async editAccount(item) {
      const itemId = item._id.toString()
      console.log(itemId)

      this.$router.push({ name: 'ST - edit_priority', params: { itemId } })
    },

    async DeleteButton() {
      this.isLoading = true
      try {
        const itemId = this.indexDelete._id.toString()
        console.log(itemId);
        // ทำการอัปเดตข้อมูลใน MongoDB โดยใช้ Axios
        await axios.put(
          `${process.env.VUE_APP_URL}/mongoose/update/stts_priorities/${itemId}`,
          {
            data: {
              pri_status: 'Delete',
            },
          },
        )
        this.toastDelete.push({
          content: 'Delete Succesfull  ',
        })
        // ทำการ validate หรือประมวลผลต่าง ๆ ที่ต้องการทำ
        // ในที่นี้เพียงแค่รอเวลา 2 วินาทีเพื่อจำลองกระบวนการยาวนาน
        //**** ไม่เข้าตัว settimeout  ถามแบงค์ด่วน*/
        setTimeout(() => {
          
          // จบการโหลด
          this.isLoading = false
          // ทำการนำไปยังหน้าอื่นหรือทำการจัดการต่อไปตามที่ต้องการ
          
        }, 500)
        // หลังจากอัปเดตสำเร็จ คุณสามารถทำสิ่งอื่นที่คุณต้องการได้ที่นี่
        console.log('ลบ priority')
        this.indexDelete = '',
        // รีเฟรชหน้า
        this.getPriority();
        this.visibleDelete = false;
        
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการอัปเดตข้อมูล:', error)
      }
    },

    showDelete(item){
            console.log("showmodal",)
            console.log("index",this.visibleDelete)
            console.log("qqq",item)
            this.visibleDelete = true;
            this.indexDelete = item;
            
        },

    async create_priority() {
      this.$router.push({ name: 'ST - create_priority' })
    },
  },
  mounted() {
    //เรียกใช้ฟังชั่นเมื่อโหลดหน้า
    this.getPriority()
  },
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

.btn-long {
  width: 110px;
  height: 45px;
  border-radius: 15px;
}

.style-icon-create-priority {
  max-height: 20px;
  margin-bottom: 2px;
  margin-right: 5px;
}

.underline::after {
  content: '';
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

#underline_header {
  display: inline-block;
  border-bottom: 5px solid transparent;
  border-image: linear-gradient(to right, #ea5252, #030303);
  border-image-slice: 1;
  padding: 3px;
}

#custom_icon_header {
  width: auto;
  height: 40px;
}

.table-responsive {
  max-width: 100%;
  overflow-x: hidden;
}


.custom-CCard-Header {
  margin-top: 7px;
}

.table-container {
  max-width: 100%;
  /* Set the maximum width for the table container */
  overflow-x: auto;
  /* Enable horizontal scroll if the content overflows */
}

@media (max-width: 1200px) {
  .table-responsive {
    overflow-x: auto;
  }
}

.style-button {
  max-width: 20px;
  max-height: 20px;
  background-color: white;
}

.action_button {
  background-color: white;
}

.font-button {
  color: white;
}

#popup-detail {
  font-size: larger;
  font-weight: 600;
  text-align: left;
  color: #000;
}
</style>