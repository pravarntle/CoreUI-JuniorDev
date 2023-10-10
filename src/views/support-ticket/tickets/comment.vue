<template>
  <CCard class="p-2">
    <CCardbody>
      <CRow>
        <div>
          <!-- ตรงนี้ต้องกดได้ เพื่อย้อนกลับ -->
          <!-- Icon สำหรับย้อนกลับ -->
          <CCol>
            <div class="text-start" style="padding: 1px;  margin-top: 1%">
              <CAvatar class="Arrow_Left" :src="Arrow_Left" style="text-align: left;" />
              <label style="margin-left: 920px;"> ใส่ ICON สำหรับไปรายละเอียด Ticket ต่อไป </label>
            </div>
          </CCol>
        </div>
      </CRow>
      <hr />
      <CRow class="g-0">
        <!-- <CImage class="Avatar_4" :src="Avatar_4" /> -->
        <CCardImage class="Icon_user_man" :src="Icon_user_man" style="padding: -4px" />
        <CCol style="padding: 4px">
          <b> Settawut101</b>
          <p class="small">settawut@gmail.com</p>
        </CCol>
        <CCol class="text-end p-3" style="margin-right: 2%">
          <b>Jul 17, 2023 &nbsp; </b>
          <span class="badge bg-danger">
            <li>High</li>
          </span>
        </CCol>
      </CRow>
      <hr />

      <!-- <CImage align="end" class="Short" :src="Short" /> -->
      <div class="clearfix text-end" style="margin-right: 4%">
        <CButton class="btn btn-outline-info" style="font-weight: bold; font-size: x-small; width: 65px" id="b1" @click="() => {
          visibleA = !visibleA
          visibleB = !visibleB
          javascript3()
        }
          ">Short
        </CButton>

        <CRow>
          <CCol xs="12">
            <CCollapse :visible="visibleA">
              <CCardBody style="margin-left: 2%">
                <CCol class="text-start" style="padding: -3px">
                  <b style="font-size: 20px"> Title : </b>
                  <CCradText> Internet speed is very low</CCradText>
                </CCol>
                <CCol class="text-start" style="padding: -3px">
                  <b style="font-size: 20px"> Type : </b>
                  <CCradText> Service Request </CCradText>
                </CCol>
                <CCol class="text-start" style="padding: -3px">
                  <b style="font-size: 20px"> Description : </b>
                  <CCradText>
                    The internet is slower than usual, please check the
                    internet.
                  </CCradText>
                </CCol>
              </CCardBody>
              <hr />
              <Crow>
                <CCol class="text-start" style="padding: -1px">
                  <output style="margin-left: 5%"> 1 </output>
                  <CCradText style="margin-left: 2%"> Attachment </CCradText>
                </CCol>
              </Crow>
              <Crow class="text-start">
                <CCol style="margin-left: 5%">
                  <CCardImage class="File_test" :src="File_test" style="padding: 2px" />
                  <CCradText> internet speed test image.jpg</CCradText>
                  <br />
                </CCol>
                <br />
              </Crow>
            </CCollapse>
          </CCol>
        </CRow>
      </div>
    </CCardbody>
  </CCard>

  <br />

  <div>
    <CCard>
      <CCardBody>
        <CCardTitle>Comments</CCardTitle>
        <div class="container text-start" id="My_Comments">
          <div class="row align-items-center">
            <div class="col-1">
              <div class="avatar">
                <img class="Icon_user_man" :src="Icon_user_man" alt="User Icon" />
              </div>
            </div>
            <div class="col-10">


              <CFormInput v-model="comment" class="comments_box" type="text" placeholder="add comments "
                aria-label="comments_box" id="comments_box" ref="comments_box" @input="countCharacters"
                @keyup.enter="submitComment" maxlength="200" row="3">
              </CFormInput>
              <br>
              <input type="file" ref="fileInput" @change="attachImage" style="display: none" id="imageInput" />
              <CButton @click="attachImage" id="attach_image"><img class="attach-image" :src="Attach_Image"
                  id="attachImage" alt="Attach Image" style="width: 20px" />
              </CButton>
              <CButton @click="attachLink" id="attach_link"><img class="insert-link" :src="insert_link" alt="Insert Link"
                  style="width: 20px" />
              </CButton>
              <input type="file" ref="fileInput" @change="handleFileChange" style="display: none" />
              <CButton @click="attachFile" id="attach_file"><img class="attach-file" :src="Attach_File" alt="Attach File"
                  style="width: 12px" />
              </CButton>
              <span class="text-end" style="margin-left: 710px;">Character count: {{ characterCount }} / 200</span>
              <span id="selectedImage">{{ imageName }}</span>
              <span v-if="link !== ''"> | <a>link : {{ link }}</a></span>
            </div>
            <div class="col">
              <div class="avatar">
                <CButton @keyup.enter="submitComment" @click="submitComment" id="submitComment"> <img class="commit"
                    :src="commit" alt="Commit Icon" /></CButton>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div v-for="(item, index) in comments" :key="index">
          <div class="card-body">
            <div class="row align-items-center">
              <div class="col-1">
                <div class="avatar">
                  <img class="Icon_user_man" :src="Icon_user_man" alt="User Icon" />
                </div>
              </div>
              <div class="col-10">
                <p><b>ชื่อผู้ใช้งาน</b> &emsp;เวลาที่คอมเม้น</p>
                <div class="comments_box" style="padding: 10px">
                  {{ item.comment }}
                  <a v-if="item.link" href="#" @click.prevent="openLink(item.link)">
                    {{ item.link }}
                  </a>
                  <a v-if="item.image">
                    <CImage :src="item.image" alt="Comment Image" style="max-width: auto; height: 300px;" />
                  </a>
                </div>
                <!-- <template v-if="item.link">
                    <a @click="openLink(item.link)" style="text-decoration: none; color: #007bff; ">
                      {{ item.link }}
                    </a>
                  </template>   -->
                <span v-if="item.file">
                  <img v-if="isImageFile(item.file.name)" :src="getImageIcon(item.file.name)" alt="File"
                    style=" max-width: 20px; max-height: 20px; margin-left: 5px;" />
                  <a :href="item.file.url" target="_blank">{{ item.file.name }}</a>
                  <a :href="item.file.url" download></a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
var myText = document.getElementById('comment_box')
var character_counts = document.getElementById('character_counts')


import Arrow_Left from '@/assets/images/Arrow_Left.png'
import File_test from '@/assets/images/file_test.jpg'
import Short from '@/assets/images/Short.jpg'
import Icon_user_man from '@/assets/images/icon_user_man.jpg'
import commit from '@/assets/images/commit.png'
import Attach_Image from '@/assets/images/Attach_Image.png'
import { CButton, CFormInput } from '@coreui/vue-pro'
import insert_link from '@/assets/images/insert_link.png'
import Attach_File from '@/assets/images/Attach_File.png'
import {
  CAvatar,
  CCardBody,
  CCardImage,
  CCardText,
  CCardTitle,
  CCol,
  CImage,
  CRow,
} from '@coreui/vue-pro'
export default {
  name: 'comment',
  setup() {
    return {
      Arrow_Left,
      Icon_user_man,
      Short,
      File_test,
      commit,
    }
  },
  components: {
    CRow,
    CImage,
    CCol,
    CAvatar,
    CCardBody,
    CCardTitle,
    CCardImage,
    CCardText,
    CFormInput,
    CButton,
  },
  data() {
    return {
      visibleA: true,
      visibleB: true,
      Icon_user_man,
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
      comment: '',
      characterCount: 0, // เพิ่ม characterCount เริ่มต้นที่ 0
    }
  },

  methods: {
    async javascript3() {
      var x = document.getElementById('b1')
      if (x.innerHTML === 'Expand') {
        x.innerHTML = 'Short'
      } else {
        x.innerHTML = 'Expand'
      }
    },

    async countCharacters() {
      this.characterCount = this.comment.length;
    },



    //------- AOM -------
    async attachImage() {
      const imageInput = this.$refs.fileInput
      imageInput.click()

      imageInput.addEventListener('change', (event) => {
        const file = event.target.files[0]
        if (file) {
          this.imageName = file.name

          // อ่านรูปภาพเป็น Data URL
          const reader = new FileReader()
          reader.onload = (e) => {
            this.imageDataURL = e.target.result
          }
          reader.readAsDataURL(file)

          console.log('รูปถูกแนบเรียบร้อย')
        } else {
          this.imageName = ''
          console.error('เกิดข้อผิดพลาดในการแนบรูป')
        }
      })
    },
    async attachLink() {
      const link = prompt('Please enter a link:') // ใช้ prompt เพื่อรับลิงค์จากผู้ใช้
      if (link) {
        this.link = link // เก็บลิงค์ในคุณสมบัติข้อมูล
        // this.comment = link; // อัปเดตค่า comment เพื่อแสดงข้อมูลลิงก์ใน comment box
        console.log('ลิงค์ถูกแนบเรียบร้อย')
      }
    },
    async attachFile() {
      const fileInput = this.$refs.fileInput;
      fileInput.click();

      fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
          this.file = file; // ตรวจสอบว่าคุณตั้งค่าไฟล์ที่แนบถูกต้อง
          this.imageName = file.name; // แสดงชื่อไฟล์ที่เลือก
          console.log('ไฟล์ถูกแนบเรียบร้อย');
        } else {
          this.file = null;
          this.imageName = ''; // ล้างชื่อไฟล์ถ้าไม่มีไฟล์
          console.error('เกิดข้อผิดพลาดในการแนบไฟล์');
        }
      });

    },
    async handleFileChange(event) {
      const file = event.target.files[0]
      if (file) {
        this.file = file // ตรวจสอบว่าคุณตั้งค่าไฟล์ที่แนบถูกต้อง
        console.log('ไฟล์ถูกแนบเรียบร้อย')
      } else {
        this.file = null
        console.error('เกิดข้อผิดพลาดในการแนบไฟล์')
      }
    },
    async submitComment() {
      if (
        this.comment.trim() === '' &&
        this.imageDataURL === '' &&
        this.link.trim() === '' &&
        !this.file
      ) {
        console.log('โปรดเพิ่มข้อความคิดเห็น, แนบรูป, แทรกลิงค์, หรือแนบไฟล์')
        return
      }

      console.log('ข้อความคิดเห็น:', this.comment)

      // สร้างอ็อบเจ็กต์ความคิดเห็นใหม่
      const newComment = { comment: this.comment }

      // หากมีรูปที่แนบมา, เพิ่มลงในความคิดเห็น
      if (this.imageDataURL !== '') {
        newComment.image = this.imageDataURL
      }

      // หากมีลิงค์ที่แทรกมา, เพิ่มลงในความคิดเห็น
      if (this.link.trim() !== '') {
        newComment.link = this.link
      }

      // หากมีไฟล์ที่แนบมา, เพิ่มลงในความคิดเห็น
      if (this.file) {
        newComment.file = {
          name: this.file.name,
          url: URL.createObjectURL(this.file),
        };
      }

      // เพิ่มข้อความ comment ที่ถูกพิมพ์ในกล่องข้อความ
      if (this.comment.trim() !== '') {
        newComment.comment = this.comment;
      }

      // เพิ่มความคิดเห็นลงในรายการ
      this.comments.push(newComment)

      // ล้างความคิดเห็น, รูป, ลิงค์, และไฟล์
      this.comment = ''
      this.imageDataURL = ''
      this.imageName = ''
      this.link = ''
      this.file = null

    },
    async isImageFile(filename) {
      const imageExtensions = ['jpg', 'jpeg', 'png', 'gif']; // รายการส่วนขยายของไฟล์รูปภาพ
      const fileExtension = filename.split('.').pop().toLowerCase();
      return imageExtensions.includes(fileExtension);
    },


    getImageIcon(filename) {
      const fileExtension = filename.split('.').pop().toLowerCase();
      switch (fileExtension) {
        case 'doc':
        case 'docx':
          return require('@/assets/images/Doc_icon.png');
        case 'jpg':
        case 'jpeg':
          return require('@/assets/images/Jpeg_icon.png');
        case 'png':
          return require('@/assets/images/Png_icon.png');
        case 'pdf':
          return require('@/assets/images/Pdf_icon.png');
        // เพิ่มประเภทของไฟล์อื่นๆ ตามต้องการ
        default:
          return require('@/assets/images/File_icon.png'); // รูปไอคอนเริ่มต้นหากไม่รู้จักประเภทของไฟล์
      }
    },
    async openLink(link) {
      window.open(link, '_blank');
    },
  },
}
</script>

<style>
.Arrow_Left {
  width: 35px;
}

.Icon_user_man {
  /* margin-left: 0.5pc; */
  width: 56px;
  height: 56px;
}

.Short {
  width: 60px;
}

.Cte {
  margin-right: 50%;
}

.AL {
  display: flex;
  justify-content: space-between;
  width: 35px;
}

.File_test {
  width: 20px;
  height: 20px;
}

.Dis_Between {
  display: flex;
  justify-content: space-between;
}

/* --------AOM---------- */

div .comments_box {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  height: auto;
  border-radius: 15px;
  white-space: pre-wrap;
  /* เพื่อให้ข้อความคอมเมนต์ขึ้นบรรทัดใหม่เมื่อมีการพิมพ์และเกิน 1 บรรทัด */
  word-wrap: break-word;
  /* เพื่อให้ข้อความคอมเมนต์แตกคำเมื่อเกินขอบเขตของตัวอักษร */
}

/* div .comments_box:focus {
  width: 733;
  height: 90px;
} */

div.col-1,
.icon_user_man {
  text-align: right;
}

div.col,
.commit {
  padding: 0%;
}

img.Icon_user_man {
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

a {
  text-decoration: none;
  color: #007bff;
  margin-left: 5px;
}

a:hover {
  text-decoration: underline;
}
</style>



<!-- <template>
  <div>
    <CFormInput v-model="inputValue" @input="countCharacters" />
    <p>Character count: {{ characterCount }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputValue: '',
      characterCount: 0,
    };
  },
  methods: {
    countCharacters() {
      this.characterCount = this.inputValue.length;
    },
  },
};
</script> -->


<!-- <template>
  <div>
    <CFormInput v-model="inputValue" @input="updateCharacterCount" />
    <p>Character count: {{ characterCount }} / 200</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputValue: '',
      characterCount: 0,
    };
  },
  methods: {
    updateCharacterCount() {
      this.characterCount = this.inputValue.length;
      if (this.characterCount > 200) {
        this.inputValue = this.inputValue.slice(0, 200);
        this.characterCount = 200;
      }
    },
  },
};
</script> -->
