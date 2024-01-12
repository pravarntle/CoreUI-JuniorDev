// Create By: Sirinya Sondilok 15-09-2566 Add Acount
<template>
    <div>
        <CCard>
            <CCardBody>
                <CRow class="mb-2">
                    <CCol class="header1" xs="12" md="6" lg="4">
                        <h1 id="LineHeadCard">
                            Account List
                        </h1>
                    </CCol>
                </CRow>
                <UserList />

            </CCardBody>
        </CCard>
    </div>
</template>
<script>
import { CFormFeedback, CFormLabel } from '@coreui/vue-pro'
import axios from 'axios'
import UserList from '@/components/UserList.vue'


export default {
    components: { CFormLabel, UserList },

}
</script>
<style>
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
    padding: 30px;
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
</style>
