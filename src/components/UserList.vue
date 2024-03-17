<template>
    <div>
        <CSmartTable :active-page="1" header :items="items" :columns="columns" tableFilter column-sorter
            class="table-hover table-bordered table-alternate-background table-responsive " clickable-rows table-filter-placeholder="Search" 
            :items-per-page="5" items-per-page-select pagination columnSorter
            :sorterValue="{ column: 'status', state: 'asc' }" :table-props="{
                striped: true,
                hover: true,
            }">

            <template #user_username="{ item }">
                <td class="style-username" @click="editAccount(item, index)">{{ item.user_username }}</td>
            </template>
            <template #user_last_name="{ item }">
                <td>{{ item.user_last_name }}</td>
            </template>
            <template #user_phone_number="{ item }">
                <td class="text-center"> {{ formatPhoneNumber(item.user_phone_number) }}</td>
            </template>
            <template #user_role="{ item }">

                <td class="text-center">
                    <CBadge :color="getBadge(item.user_role)">{{ formatRole(item.user_role) }}</CBadge>
                </td>
            </template>

            <template #MORE="{ item, index }">
                <td class="text-center">
                    <CButton size="sm" @click="editAccount(item, index)">
                        <img :src="Iconeditaccount" class="style-button" alt="Edit Icon" />
                    </CButton>
                    <!-- <CButton size="sm" @click="DeleteButton(item, index)">
                        <img :src="Icondeleteaccount" class="style-button" alt="Delete Icon" />
                    </CButton> -->

                    <CButton v-if="showChange" size="sm" @click="showChanges(item)">
                        <img :src="Iconkey" class="style-button" alt="Delete Icon" />
                    </CButton>
                    <CButton size="sm" @click="showDelete(item)">
                        <img :src="Icondeleteaccount" class="style-button" alt="Delete Icon" />
                    </CButton>

                </td>
            </template>

            <template #details="">
                <CModal alignment="center" :backdrop="false" :keyboard="false" :visible="visibleDelete"
                    @close="() => { visibleDelete = false }">

                    <CModalBody>
                        <h2 class="text-start"> Delete Account </h2>
                        <p class="text-black" id="popup-detail">
                            Are you sure you want to
                            <span class="text-danger">Delete Account ?</span>
                        </p>
                        <br />
                        <hr />
                        <div class="d-flex justify-content-end">
                            <CButton color="light"> Cancel </CButton>
                            <CButton class="ms-2" color="danger" id="confirm-btn-in-detail" @click="DeleteButton()"
                                @mouseup.stop="" :disabled="isLoading">
                                <CSpinner v-if="isLoading" component="span" size="sm" variant="grow" aria-hidden="true" />
                                {{ isLoading ? 'Confirm...' : 'Confirm' }}
                            </CButton>
                        </div>
                    </CModalBody>
                </CModal>
                <CModal  alignment="center" :backdrop="false" :keyboard="false" :visible="visibleChanges"
                    @close="() => { visibleChanges = false }"   >

                    <CModalBody>
                        <h2 class="text-start"> Change Password </h2>
                        <br />
                        <hr />
                        
                        <CRow>
                            <CCol xs="12" md="6" lg="4">
                                <CFormLabel for="inputPassword1" class="pamt1"><b>Password </b> </CFormLabel>
                                <CFormInput feedbackInvalid="Please input password."
                                    text="(a-z) contains 2 letters and (0-9) Contains 4 numbers." id="password1"
                                    v-model="newPassword" :invalid="validate.newPassword" autocomplete="current-password"
                                    placeholder="•••••••" maxlength="6"  @mouseup.stop="" required />
                                </CCol>
                                <CCol xs="12" md="6" lg="4">
                                <CFormLabel for="Password" class="pamt1"><b>Confirm Password</b> </CFormLabel>
                                <CFormInput  id="password2" v-model="confirmNewPassword"
                                    feedbackInvalid="Please confirm password." :invalid="validate.confirmNewPassword"
                                    autocomplete="current-password" placeholder="•••••••" maxlength="6"  @mouseup.stop="" required />
                                <div v-if="validate.confirmNewPassword" class="text-danger">
                                    Passwords do not match.
                                </div>
                            </CCol>
                        </CRow>
                        <div class="d-flex justify-content-end">
                            <CButton color="light"> Cancel </CButton>
                            <CButton class="ms-2" color="success" id="confirm-btn-in-detail" @click="validateBeforeSave"
                                @mouseup.stop="" :disabled="isLoading">
                                <CSpinner v-if="isLoading" component="span" size="sm" variant="grow" aria-hidden="true" />
                                {{ isLoading ? 'Confirm...' : 'Confirm' }}
                            </CButton>
                        </div>
                    </CModalBody>
                </CModal>
            </template>

        </CSmartTable>
        <CToaster placement="top-end">
            <CToast visible color="danger" v-for="(toast) in toastProp">
                <CToastHeader closeButton v-if="toast.title">
                    <span class="me-auto fw-bold">{{ toast.title }}</span>
                </CToastHeader>
                <CToastBody v-if="toast.content">
                    <span class="text-white">{{ toast.content }}</span>
                </CToastBody>
            </CToast>
            <CToast visible color="success" v-for="(toast) in toast">
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

#cancel-heading {
    margin-left: 3px;
    text-align: left;
    color: #000;
}

.popup_priority {
    text-align: left;
    margin-left: 10px;
    margin-top: -5px;

}

#detail-for-cancel {
    color: #d0293b;
}

#confirm-btn-in-detail {
    color: #ffffff;
}

#button-head {
    text-align: left;
}

#popup-detail {
    font-size: larger;
    font-weight: 600;
    text-align: left;
    color: #000;
}

/* .modal-backdrop.show{
    opacity: 0.5;
} */
.modal fade show {
    opacity: 0.5;
}
</style>
<script scoped>
import More_Priority from '@/assets/images/More_Priority.png'
import Icondeleteaccount from '@/assets/images/Icon_deleteaccount.png'
import Iconeditaccount from '@/assets/images/Icon_editaccount.png'
import Iconkey from '@/assets/images/Icon_Key.png'
import { ref } from 'vue'
import LGlogo from '@/assets/images/blackTick.png'
import axios from 'axios'
import bcrypt from 'bcryptjs';


export default {
    name: 'userlist',
    props: ['showChange'],
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
            Iconkey,
            visibleDelete: false,
            indexDelete: '',
            toastProp: [],
            toast: [],
            isLoading: false,
            show:false,
            visibleChanges:false,
            indexChanges:'',
            newPassword:'',
            confirmNewPassword:'',
            validate:{
                newPassword:false,
                confirmNewPassword:false,
            },
        };

    },
    setup(props) {
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
                _style: { width: '15%', fontWeight: 'bold', color: 'gray', fontSize: '13px', paddingLeft: '3%' },


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
                _style: { width: '10%', fontWeight: 'bold', color: 'gray', fontSize: '13px', paddingLeft: '5%' },


            },
            {
                key: 'MORE',
                label: 'ACTION',
                _style: { width: '20%', fontWeight: 'bold', color: 'gray', fontSize: '13px', paddingLeft: '35px' },
                filter: false,
                sorter: false,

            },


        ];
        const getBadge = (tkt_status) => {
            switch (tkt_status) {
                default:
                    return 'secondary'; // Return a default color if none of the cases match.
            }
        };

        const items = ref([]);
        var show = props.showChange ;


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
            getBadge,
        };
    },

    methods: {
        async editAccount(item) {
            const itemId = item._id.toString();
            console.log(itemId)

            this.$router.push({ name: 'ST - edit_account', params: { itemId } });
        },

        async DeleteButton() {

            try {
                const itemId = this.indexDelete._id.toString();
                // ทำการอัปเดตข้อมูลใน MongoDB โดยใช้ Axios
                console.log(itemId);
                await axios.put(`${process.env.VUE_APP_URL}/mongoose/update/stts_accounts/${itemId}`, {
                    data: {
                        act_status: "Delete",
                        act_password: null,
                        act_username: null,

                    }
                });
                this.isLoading = true;
                this.toastProp.push({
                    content: 'Delete Succesfully'
                });
                // หลังจากอัปเดตสำเร็จ คุณสามารถทำสิ่งอื่นที่คุณต้องการได้ที่นี่
                console.log('อัปเดต BOOKMARK และส่งข้อมูลไปยัง MongoDB สำเร็จ');
                this.indexDelete = '',
                    // รีเฟรชหน้า
                    this.getAccount();
                this.visibleDelete = false;
                this.isLoading = false;
            } catch (error) {
                console.error('เกิดข้อผิดพลาดในการอัปเดตข้อมูล:', error);
            }
        },

        showDelete(item) {
            console.log("showmodal",)
            console.log("index", this.visibleDelete)
            console.log("qqq", item)
            this.visibleDelete = true;
            this.indexDelete = item;

        },
        showChanges(item) {
            
            this.visibleChanges = true;
            this.indexChanges = item;

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
            if (role == 'ItSupport') {
                return itsup;
            } else {
                return role;
            }
        },
        async ChangeButton() {

            try {
                const itemId = this.indexChanges._id.toString();
                // ทำการอัปเดตข้อมูลใน MongoDB โดยใช้ Axios
                console.log(itemId);
                await axios.put(`${process.env.VUE_APP_URL}/mongoose/update/stts_accounts/${itemId}`, {
                    data: {
                        act_password: this.newPassword,
                    }
                });
                this.isLoading = true;
                this.toast.push({
                    content: 'Change Succesfully'
                });
                // หลังจากอัปเดตสำเร็จ คุณสามารถทำสิ่งอื่นที่คุณต้องการได้ที่นี่
                this.indexChanges = '',
                    // รีเฟรชหน้า
                    this.getAccount();
                this.visibleChanges = false;
                this.isLoading = false;
            } catch (error) {
                console.error('เกิดข้อผิดพลาดในการอัปเดตข้อมูล:', error);
            }
        },
        validateBeforeSave() {
            let error = false

            const passwordRegex = /^(?=.*[a-z].*[a-z])(?=.*\d.*\d.*\d.*\d)[a-z\d]*$/;


            // ตรวจสอบรหัสผ่าน
            if (!passwordRegex.test(this.newPassword.trim())) {
                error = true
                this.validate.newPassword = true
            } else {
                this.validate.newPassword = false
            }

            // ตรวจสอบการยืนยันรหัสผ่าน
            if (this.confirmNewPassword.trim() === '') {
                error = true
                this.validate.confirmNewPassword = true
            } else {
                // ตรวจสอบว่ารหัสผ่านที่ยืนยันตรงกันหรือไม่
                if (this.newPassword !== this.confirmNewPassword) {
                error = true
                this.validate.confirmNewPassword = true

                } else {
                this.validate.confirmNewPassword = false

                }
            }

            if (!error) {
                // ถ้าไม่มีข้อผิดพลาดให้ทำงานต่อไป
                this.encryptPasswordBeforeSave();
            } 
        },     
        showPassword() {
            var p1 = document.getElementById('password1')
            var p2 = document.getElementById('password2')
            if (p1.type === 'password') {
                p1.type = 'text'
                p2.type = 'text'
            } else {
                p1.type = 'password'
                p2.type = 'password'
            }
        },     
        encryptPasswordBeforeSave() {

            const password = this.newPassword;
            const saltRounds = 10;

            bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
                console.error(err);
                // จัดการข้อผิดพลาดที่เกิดขึ้น
            } else {
                this.newPassword = hash; // กำหนดรหัสผ่านเข้าไปใน form ใหม่
                this.ChangeButton(); // เรียกฟังก์ชัน onSave เพื่อส่งข้อมูลไปยังเซิร์ฟเวอร์
            }
            });
        },              


    },
    mounted() {
        //เรียกใช้ฟังชั่นเมื่อโหลดหน้า
        this.getAccount();


    }

}
</script>