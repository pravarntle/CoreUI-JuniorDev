<template>
    <div>
        <CSmartTable :active-page="1" header :items="items" :columns="columns" columnFilter column-sorter
            class="table-hover table-bordered table-alternate-background table-responsive " clickable-rows
            :items-per-page="5" items-per-page-select pagination columnSorter
            :sorterValue="{ column: 'status', state: 'asc' }" :table-props="{
                striped: true,
                hover: true,
            }">

            <template #user_username="{ item }">
                <td class="style-username" @click="editAccount(item, index)">{{ item.user_username }}</td>
            </template>
            <template #user_last_name="{ item }">
                <td >{{ item.user_last_name }}</td>
            </template> 
            <template #user_phone_number="{ item }">
                <td class="text-center"> {{ formatPhoneNumber(item.user_phone_number) }}</td>
            </template>
            <template #user_role="{ item }">
                <td class="text-center"> {{ formatRole(item.user_role) }}</td>
            </template>    

            <template #MORE="{ item, index }">
                <td class="text-center">
                    <CButton size="sm" @click="editAccount(item, index)">
                        <img :src="Iconeditaccount" class="style-button" alt="Edit Icon" />
                    </CButton>
                    <CButton size="sm" @click="DeleteButton(item, index)">
                        <img :src="Icondeleteaccount" class="style-button" alt="Delete Icon" />
                    </CButton>
                </td>
            </template>

        </CSmartTable>
    </div>
</template>
<style scoped>
.table-responsive {
    max-width: 100%;
    overflow-x: hidden;
}

@media (max-width: 1200px) {
    .table-responsive {
        overflow-x: auto;
    }
}

.style-button {
    max-width: 20px;
    max-height: 20px;
}


.style-username {
    color: #5E5ADB;
}
</style>
<script scoped>
import More_Priority from '@/assets/images/More_Priority.png'
import Icondeleteaccount from '@/assets/images/Icon_deleteaccount.png'
import Iconeditaccount from '@/assets/images/Icon_editaccount.png'
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
            Icondeleteaccount,
            Iconeditaccount,

        };

    },
    setup() {
        const columns = [

            {
                key: 'number',
                label: '#',
                _style: { width: '5%', fontWeight: 'bold', color: 'gray', fontSize: '13px' },
                filter: false,
                sorter: false,

            },
            {
                key: 'user_username',
                label: 'USERNAME',
                _style: { width: '15%', fontWeight: 'bold', color: 'gray', fontSize: '13px', paddingLeft: '3%'},


            },
            {
                key: 'user_first_name',
                label: 'FIRSTNAME',
                _style: { width: '13%', fontWeight: 'bold', color: 'gray', fontSize: '13px', paddingLeft: '2.5%' },


            },
            {
                key: 'user_last_name',
                label: 'LASTNAME',
                _style: { width: '13%', fontWeight: 'bold', color: 'gray', fontSize: '13px', paddingLeft: '2%' },

            },
            {
                key: 'user_email',
                label: 'EMAIL',
                _style: { width: '18%', fontWeight: 'bold', color: 'gray', fontSize: '13px', paddingLeft: '6.5%' },

            },
            {
                key: 'user_phone_number',
                label: 'NUMBER',
                _style: { width: '13%', fontWeight: 'bold', color: 'gray', fontSize: '13px', paddingLeft: '4%' },


            },
            {
                key: 'user_role',
                label: 'ROLE',
                _style: { width: '13%', fontWeight: 'bold', color: 'gray', fontSize: '13px', paddingLeft: '5%' },


            },
            {
                key: 'MORE',
                label: 'ACTION',
                _style: { width: '15%', fontWeight: 'bold', color: 'gray', fontSize: '13px', paddingLeft: '35px' },
                filter: false,
                sorter: false,

            },


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
            const itemId = item._id.toString();
            console.log(itemId)

            this.$router.push({ name: 'ST - edit_account', params: { itemId } });
        },

        async DeleteButton(item) {

            try {
                const itemId = item._id.toString();
                // ทำการอัปเดตข้อมูลใน MongoDB โดยใช้ Axios
                await axios.put(`${process.env.VUE_APP_URL}/mongoose/update/stts_accounts/${itemId}`, {
                    data: {
                        act_status: "Delete",
                        act_password: null,
                        act_username: null,

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
                    "populate": "act_role",
                    where: {
                        act_status: { $ne: 'Delete' }

                    },
                });
                console.log(response.data)
                // นำข้อมูลที่ได้รับมาใส่ในตัวแปร items
                this.items = response.data.map((element, index) => ({
                    number: index + 1, // หมายเลขแถว
                    _id: element._id,
                    user_username: element.act_username, // ข้อมูล TicketID จาก response
                    user_first_name: element.act_first_name_eng, // ข้อมูล tkt_title จาก response
                    user_last_name: element.act_last_name_eng,
                    user_email: element.act_email_address,
                    user_phone_number: element.act_number_phone,
                    user_role: element.act_role.rol_name,
                    MORE: false, // ให้เริ่มต้นเป็น false สำหรับการแสดงรายละเอียด
                }));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
        formatPhoneNumber(phoneNumber) {
            const match = phoneNumber.match(/^(\d{3})(\d{3})(\d{4})$/); // นำตัวเลขมาจับคู่ตามรูปแบบ XXXXXXXXXX
            if (match) {
                return match[1] + ' ' + match[2] + ' ' + match[3];
            }

            return phoneNumber; // คืนค่าเบอร์โทรศัพท์เดิมหากไม่พบตามรูปแบบ
        },
        formatRole(role) {
            const itsup = 'IT Support';
            if( role == 'ItSupport') {
                return itsup;
            }else {
                return role;
            }
        },  

    },
    mounted() {
        //เรียกใช้ฟังชั่นเมื่อโหลดหน้า
        this.getAccount();


    }

}
</script>