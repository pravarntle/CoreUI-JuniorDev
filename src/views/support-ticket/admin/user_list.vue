<template>
    <div>
        <CCard class="p-2 rounded-4">
            <CCardHeader class="bg-white border-white mb-5 d-flex justify-content-between align-items-center">
                <div class="d-inline ms-2">
                    <div id="underline_header">
                        <CImage class="me-2 align-middle" id="custom_icon_header" :src="Iconaccountlist" />
                        <h2 class="d-inline align-middle"><b>Account List</b></h2>
                    </div>
                </div>
                <div>
                    <CButton class="btn btn-primary btn-block btn-long" color="info" @click="createAccount()">

                        <CImage class="style-icon-create-account" :src="Iconcreateaccount" />
                        <b class="font-button">Create</b>
                    </CButton>
                </div>
            </CCardHeader>
            <CCardBody>

                <UserList />

            </CCardBody>
        </CCard>
    </div>
</template>
<script>
import { CButton, CIcon } from '@coreui/vue-pro'
import { CImage, CCard, CCardBody, CCardHeader } from '@coreui/vue-pro'
import { CFormFeedback, CFormLabel } from '@coreui/vue-pro'
import Iconaccountlist from '@/assets/images/Icon_AccountList.png'
import Iconcreateaccount from '@/assets/images/Icon_addTicket.png'
import UserList from '@/components/UserList.vue'
import axios from 'axios'


export default {
    components: { CFormLabel, CButton, CImage, CCard, CCardBody, CCardHeader, UserList, CIcon },
    data() {
        return {
            Iconaccountlist: Iconaccountlist,
            Iconcreateaccount: Iconcreateaccount,
        };
    },
    methods: {
        async createAccount() {
            this.$router.push({ name: 'ST - add_account' });
        },
    },

}
</script>
<style scoped>
.card-1 {
    width: 1160px;
    height: 1496px;
    flex-shrink: 0;
    background-color: #fff;
    border-radius: 5px;
}

.h2 {
    color: #303030;
    font-family: Inter;
    font-size: 36px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
}

.card-header {
    padding: 15px;
}

.hr {
    width: 357.501px;
    height: 2.223px;
    flex-shrink: 0;
    background: #ea5252;
}

.mb-2 {

    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
}

/* .row{
  padding-left: 150px;
} */
.col-md-4 {
    padding-left: 50px;
}

.mb-3 {
    padding-left: 150px;
}

.footer {
    display: flex;
    justify-content: end;
    border-radius: 20px;
}

.style-icon-create-account {
    max-height: 20px;
    margin-bottom: 2px;
    margin-right: 5px;
}

.font-button {
    color:white;
}

.btn-sec {
    margin: 5px;
    border-radius: 10px;
    width: 182px;
    height: 50px;
    flex-shrink: 0;
    font-size: 25px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
}

.header1 {
    color: #303030;
    font-size: 36px;
    font-style: normal;
    font-weight: 800;
    margin-top: 40px;
    margin-bottom: 30px;
}

#LineHeadCard {
    display: inline-block;
    border-bottom: 5px solid transparent;
    border-image: linear-gradient(to right, #ea5252, #030303);
    border-image-slice: 1;
}

.btn-long {
    width: 110px;
    height: 45px;
    border-radius: 15px;
    
}

#custom_icon_header {
    width: auto;
    height: 40px;
}

#underline_header {
    display: inline-block;
    border-bottom: 5px solid transparent;
    border-image: linear-gradient(to right, #ea5252, #030303);
    border-image-slice: 1;
    padding: 3px;
}
</style>
