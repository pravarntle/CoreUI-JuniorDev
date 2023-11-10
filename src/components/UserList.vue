<template>
        <div class="table-responsive table-borderless">
            <CSmartTable :active-page="1" header cleaner :items="items" :columns="columns" columnFilter column-sorter
                clickable-rows table-filter :items-per-page="5" items-per-page-select pagination columnSorter
                :sorterValue="{ column: 'status', state: 'asc' }" :table-props="{
                    striped: true,
                    hover: true,
                }">
                
                <template #MORE="{ item, index }">
                    <td class="py-2">
                    
                            <CDropdown src="More_Priority">
                    
                            <CDropdownToggle ><img :src="More_Priority"  /></CDropdownToggle>
                            <CDropdownMenu>
                                <CDropdownItem @click="editAccount(item, index)">Edit</CDropdownItem>
                                <CDropdownItem @click="buttonCancel(item, index)" class="text-danger">Delete</CDropdownItem>
                            </CDropdownMenu>
                            </CDropdown>
                        </td>
                </template>
                
            </CSmartTable>
        </div>
</template>
<style>
.table-responsive {
    overflow-x: auto;
    max-width: 100%;
}
</style>
<script>
import More_Priority from '@/assets/images/More_Priority.png'
import { ref } from 'vue'
import LGlogo from '@/assets/images/blackTick.png'
import axios from 'axios'

export default {
    name: 'userlist',
    data() {
        return {
            data_array: [],

            act_username: '',
            act_password: '',
            act_number_phone: '',
            act_email_address: '',
            act_first_name_th: '',
            act_first_name_eng: '',
            act_last_name_th: '',
            act_last_name_eng: '',
            act_picture: '',
            act_role: '',
            More_Priority,

        };

    },
    setup() {
        const columns = [

            { key: '#', _style: { width: '5%' } ,filter: false,sorter: false },
            { key: 'USER ID', _style: { width: '10%' } },
            { key: 'FIRST NAME', _style: { width: '10%' } },
            { key: 'LAST NAME', _style: { width: '11%' } },
            { key: 'EMAIL ADDRESS', _style: { width: '5%' } },
            { key: 'PHONE NUMBER', _style: { width: '4%' } },
            { key: 'ROLE', _style: { width: '5%' } },
            { key: 'MORE', _style: { width: '5%' } , filter: false, sorter: false  },


        ];
        

        const items = ref([]);


        async function getData() {
            const user = JSON.parse(localStorage.getItem("USER_DATA"))
            try {
                const response = await axios({
                    method: 'GET',
                    url: `${process.env.VUE_APP_URL}/mongoose/get/check-token`,
                    headers: { 'Authorization': 'Bearer ' + user.token }
                })
                console.log(response)
            } catch (error) {
                console.log(error)
            }
        }
        const activePage = ref(1)
        return {
            LGlogo,
            columns,
            items,
            activePage,
            getData,
        };
    },

    methods: {
        async editAccount(item) {
            const accountId = item._id.toString();

            this.$router.push({ name: 'ST - edit_account', params: { accountId } });
        },
        
        async buttonCancel(item) {

            try {
                const itemId = item._id.toString();
                // ทำการอัปเดตข้อมูลใน MongoDB โดยใช้ Axios
                await axios.put(`${process.env.VUE_APP_URL}/mongoose/update/stts_tickets/${itemId}`, {
                    data: {
                        tkt_status: "Cancel"

                    }
                });

                // หลังจากอัปเดตสำเร็จ คุณสามารถทำสิ่งอื่นที่คุณต้องการได้ที่นี่
                console.log('อัปเดต BOOKMARK และส่งข้อมูลไปยัง MongoDB สำเร็จ');
                // รีเฟรชหน้า
                window.location.reload();

            } catch (error) {
                console.error('เกิดข้อผิดพลาดในการอัปเดตข้อมูล:', error);
            }
        },

        async toggleButton(item) {
            item.MORE = !item.MORE;
        },

        async getAccount() {
            try {
                const response = await axios.post(`${process.env.VUE_APP_URL}/mongoose/get/stts_accounts`, {
                    "populate": "act_role"
                });
                console.log(response.data)
                // นำข้อมูลที่ได้รับมาใส่ในตัวแปร items
                this.items = response.data.map((element, index) => ({
                    '#': index + 1, // หมายเลขแถว
                    _id: element._id,
                    'USER ID': element.act_username, // ข้อมูล TicketID จาก response
                    'FIRST NAME': element.act_first_name_eng, // ข้อมูล tkt_title จาก response
                    
                    'LAST NAME': element.act_last_name_eng,
                    'EMAIL ADDRESS': element.act_email_address,
                    'PHONE NUMBER': element.act_number_phone,
                    ROLE: element.act_role.rol_name,
                    MORE: false, // ให้เริ่มต้นเป็น false สำหรับการแสดงรายละเอียด
                }));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

    },
    mounted() {
        //เรียกใช้ฟังชั่นเมื่อโหลดหน้า
        this.getAccount();


    }

}
</script>