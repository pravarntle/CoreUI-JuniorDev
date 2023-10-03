<template>
    <div>
        <CCard>
            <CCardBody>
                <CCardTitle>Comments</CCardTitle>
                <div class="container text-start" id="My_Comments">
                    <div class="row align-items-center">
                        <div class="col-1">
                            <div class="avatar">
                                <img class="icon_user_man" :src="icon_user_man" alt="User Icon">
                            </div>
                        </div>
                        <div class="col-10">
                            <CFormInput v-model="comment" class="comments_box" type="text" placeholder="เพิ่มความคิดเห็น"
                                aria-label="comments_box"></CFormInput>
                        </div>
                        <div class="col">
                            <div class="avatar">
                                <CButton @click="submitComment" id="submitComment"><img class="commit" :src="commit"
                                        alt="Commit Icon"></CButton>
                            </div>
                        </div>
                    </div>
                </div>
                <br>
                <div v-for="(item, index) in comments" :key="index">
                    <div class="card-body">
                        <div class="row align-items-center">
                            <div class="col-1">
                                <div class="avatar">
                                    <img class="icon_user_man" :src="icon_user_man" alt="User Icon">
                                </div>
                            </div>
                            <div class="col-10">
                                <p><b>ชื่อผู้ใช้งาน</b> &emsp;เวลาที่คอมเม้น </p>
                                <div class="comments_box">{{ item.comment }}</div>
                                <div v-if="item.file"><a :href="item.file.url" target="_blank">{{ item.file.name }}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </CCardBody>
        </CCard>
        <input type="file" ref="fileInput" @change="attachImage" style="display: none" id="imageInput">
        <CButton @click="attachImage" id="attach_image"><img class="attach-image" :src="Attach_Image" id="attachImage"
                alt="Attach Image">
        </CButton>
        <span id="selectedImage">{{ imageName }}</span>
        <CButton @click="attachLink" id="attach_link"><img class="insert-link" :src="insert_link" alt="Insert Link">
        </CButton>
        <input type="file" ref="fileInput" @change="handleFileChange" style="display: none">
        <CButton @click="attachFile" id="attach_file"><img class="attach-file" :src="Attach_File" alt="Attach File">
        </CButton>

    </div>
</template>
  

<script>
import icon_user_man from '@/assets/images/icon_user_man.jpg'
import commit from '@/assets/images/commit.png'
import Attach_Image from '@/assets/images/Attach_Image.jpg'
import { CButton, CFormInput } from '@coreui/vue-pro'
import insert_link from '@/assets/images/insert_link.png'
import Attach_File from '@/assets/images/Attach_File.png'
export default {
    name: 'comment',
    data() {
        return {
            icon_user_man,
            commit,
            Attach_Image,
            comment: '',
            comments: [],
            imageName: '',
            imageDataURL: '', // เก็บรูปภาพที่แนบเป็น Data URL
            Attach_File,
            insert_link,
            link: '', // เพื่อจัดเก็บลิงก์ที่แทรก
            file: null, // เพิ่มคุณสมบัตินี้เพื่อเก็บไฟล์ที่แนบ
        }
    },
    components: { CFormInput, CButton },
    methods: {
        async attachImage() {
            const imageInput = this.$refs.fileInput;
            imageInput.click();

            imageInput.addEventListener('change', (event) => {
                const file = event.target.files[0];
                if (file) {
                    this.imageName = file.name;

                    // อ่านรูปภาพเป็น Data URL
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        this.imageDataURL = e.target.result;
                    };
                    reader.readAsDataURL(file);

                    console.log("รูปถูกแนบเรียบร้อย");
                } else {
                    this.imageName = '';
                    console.error('เกิดข้อผิดพลาดในการแนบรูป');
                }
            });
        },
        attachLink() {
            const link = prompt('Please enter a link:'); // ใช้ prompt เพื่อรับลิงค์จากผู้ใช้
            if (link) {
                this.link = link; // เก็บลิงค์ในคุณสมบัติข้อมูล
                console.log("ลิงค์ถูกแนบเรียบร้อย");
            }
        },
        attachFile() {
            const fileInput = this.$refs.fileInput;
            fileInput.click();
        },
        handleFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                this.file = file; // ตรวจสอบว่าคุณตั้งค่าไฟล์ที่แนบถูกต้อง
                console.log("ไฟล์ถูกแนบเรียบร้อย");
            } else {
                this.file = null;
                console.error('เกิดข้อผิดพลาดในการแนบไฟล์');
            }
        },
        submitComment() {
            if (this.comment.trim() === '' && this.imageDataURL === '' && this.link.trim() === '' && !this.file) {
                console.log('โปรดเพิ่มข้อความคิดเห็น, แนบรูป, แทรกลิงค์, หรือแนบไฟล์');
                return;
            }

            console.log('ข้อความคิดเห็น:', this.comment);

            // สร้างอ็อบเจ็กต์ความคิดเห็นใหม่
            const newComment = { comment: this.comment };

            // หากมีรูปที่แนบมา, เพิ่มลงในความคิดเห็น
            if (this.imageDataURL !== '') {
                newComment.image = this.imageDataURL;
            }

            // หากมีลิงค์ที่แทรกมา, เพิ่มลงในความคิดเห็น
            if (this.link.trim() !== '') {
                newComment.link = this.link;
            }

            // หากมีไฟล์ที่แนบมา, เพิ่มลงในความคิดเห็น
            if (this.file) {
                newComment.file = this.file; // ตรวจสอบว่าคุณตั้งค่าไฟล์ที่แนบถูกต้อง
            }

            // เพิ่มความคิดเห็นลงในรายการ
            this.comments.push(newComment);

            // ล้างความคิดเห็น, รูป, ลิงค์, และไฟล์
            this.comment = '';
            this.imageDataURL = '';
            this.imageName = '';
            this.link = '';
            this.file = null;
        },


    }
}
</script>

<style>
div .comments_box {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    height: 45px;
    border-radius: 15px;

}

div .comments_box:focus {
    width: 733;
    height: 90px;
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
    border: none;
}

.card {
    border-radius: 15px;
    border-color: white;
}

#submitComment {
    box-shadow: none;
}
</style>
