<template>
    <CCard>
        <CCardBody>
            <CCardTitle>Comments</CCardTitle>
            <br>
            <div class="container text-start" id="My_Comments">
                <div class="row align-items-center">
                    <div class="col-1">
                        <div class="avatar">
                            <img class="icon_user_man" :src="icon_user_man">
                        </div>
                    </div>
                    <div class="col-10">
                        <CFormInput class="comments_box" type="text" placeholder="add comments" aria-label="comments_box" id="comment"></CFormInput>
                    </div>
                    <div class="col">
                        <div class="avatar">
                            
                            <CButton @click="submitComment" id="submitComment"><img class="commit"  :src="commit" ></CButton>
                        </div>
                    </div>
                </div>
            </div>
            <br>

        </CCardBody>
    </CCard>
    <input type="file" ref="fileInput" @change="attachImage" style="display: none" id="imageInput">
    <CButton @click="attachImage"><img class="attach-image" :src="Attach_Image" id="attachImage"></CButton>
    <span id="selectedImage"></span>
</template>

<script>
import icon_user_man from '@/assets/images/icon_user_man.jpg'
import commit from '@/assets/images/commit.png'
import Attach_Image from '@/assets/images/Attach_Image.jpg'
import { CAvatar, CButton, CCol, CImage, CRow } from '@coreui/vue-pro'
import { CIcon } from '@coreui/icons-vue';
import { cilImage } from '@coreui/icons';
export default {
    name: 'comment',
    setup() {
        return {
            icon_user_man,
            commit,
            cilImage,
            Attach_Image,
            imageName: null,
        }
    },
    components: { CRow, CImage, CCol, CAvatar, CButton, CIcon },
    methods: {
        async  attachImage() {
            const imageInput = document.getElementById('imageInput');
            const selectedImage = document.getElementById('selectedImage');
            imageInput.click();

            imageInput.addEventListener('change', () => {
                const file = imageInput.files[0];
                if (file) {
                    selectedImage.textContent = `${file.name}`;
                    console.log("รูปถูกแนบเรียบร้อย");
                } else {
                    selectedImage.textContent = '';
                    console.error('เกิดข้อผิดพลาดในการแนบรูป:', error);
                }
            });
        },
        async submitComment() {
            const comment = document.getElementById('comment').value;
            const imageInput = document.getElementById('imageInput');
            const selectedImage = imageInput.files[0];

            if (comment.trim() === '') {
                console.log('โปรดเพิ่มข้อความคิดเห็น');
                return;
            }

            console.log('ข้อความคิดเห็น:', comment);

            if (selectedImage) {
                console.log('รูปที่แนบ:', selectedImage.name);
                // ทำการอัปโหลดรูปที่เลือกได้ที่นี่
            }
        }


    }
   
}
</script>
<style>
div .comments_box {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    height: 45px;
    border-radius: 15px;
}

div.col-1,
.icon_user_man {
    text-align: right;
}

div.col,
.commit {
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
