<template>
    <CCard>
        <CCardBody>
            <CCardTitle>Comments</CCardTitle>
            <br>
            <div class="container text-start">
                <div class="row align-items-center">
                    <div class="col-1">
                        <div class="avatar">
                            <img class="icon_user_man" :src="icon_user_man" >
                        </div>
                    </div>
                    <div class="col-10">
                        <CFormInput class="comments_box" type="text" placeholder="add comments" aria-label="comments_box" id="comments_box"></CFormInput>
                    </div>
                    <div class="col">
                        <div class="avatar">
                            <!-- <img class="commit" type="submit" :src="commit"> -->
                            <CButton type="submit"><img class="commit" type="submit" :src="commit"></CButton>
                        </div>
                    </div>
                </div>
            </div>
            <br>

        </CCardBody>
    </CCard>
    <CButton onclick="attachImage()" ><CIcon :icon="cilImage" size="xl"/></CButton>
    <!-- <CButton onclick="attachLink()" ></CButton> -->
</template>

<script>
import icon_user_man from '@/assets/images/icon_user_man.jpg'
import commit from '@/assets/images/commit.png'
import { CAvatar, CButton, CCol, CImage, CRow } from '@coreui/vue-pro'
import { CIcon } from '@coreui/icons-vue';
import { cilImage } from '@coreui/icons';
export default {
    name: 'comment',
    setup() {
        return {
            icon_user_man,
            commit,
            cilImage
        }
    },
    components: { CRow, CImage, CCol, CAvatar, CButton,CIcon },
}
// JavaScript สำหรับการแนบรูป
function attachImage() {
    const imageUrl = prompt("โปรดระบุ URL ของรูปภาพ:");
    if (imageUrl) {
        const image = document.createElement("img");
        image.src = imageUrl;
        document.getElementById("attachments").appendChild(image);
    }
}

</script>
<style>
div .comments_box {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    height: 45px;
    border-radius: 15px;
}
div.col-1,.icon_user_man {
    text-align: right;
}
div.col,.commit {
    padding: 0%;
}
img.icon_user_man {
    width: 56px;
    height: 56px;
}
img.commit {
    width: 56px;
    height: 56px;
}
.card {
    border-radius: 15px;
    border-color: white;
}
</style>
