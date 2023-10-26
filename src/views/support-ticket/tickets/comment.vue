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
              <!-- <label style="margin-left: 920px;"> ใส่ ICON สำหรับไปรายละเอียด Ticket ต่อไป </label> -->
            </div>
          </CCol>
        </div>
      </CRow>
      <hr />
      <CRow class="g-0">
        <!-- <CImage class="Avatar_4" :src="Avatar_4" /> -->

        <CAvatar v-if="acountFile" class="Icon_user_man avatar-round" :src="`data:${acountFile};base64,${acountImage}`"
          style="padding: -4px" />
        <CAvatar v-else class="Icon_user_man" :src="Icon_user_man" style="padding: -4px" />
        <CCol style="padding: 4px">
          <b> {{ firstname }}</b>
          <p class="small">{{ email }}</p>
        </CCol>
        <CCol class="text-end p-3" style="margin-right: 2%">
          <b>{{date}} &nbsp; </b>
          <CBadge :color="getBadge(priorities)"><span >
            <li>{{ priorities }}</li>
          </span></CBadge>
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
                  <CCradText> {{ title }}</CCradText>
                </CCol>
                <CCol class="text-start" style="padding: -3px">
                  <b style="font-size: 20px"> Type : </b>
                  <CCradText> {{ type }} </CCradText>
                </CCol>
                <CCol class="text-start" style="padding: -3px">
                  <b style="font-size: 20px"> Description : </b>
                  <CCradText>
                    {{ description }}
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
                  
                  <a v-if="picture">
                    <a :href="`data:${picture.filetype};base64,${picture.image}`" alt="Comment Image" style="max-width: auto; height: 300px;" download>{{`${picture.filename}`}}</a>
                  </a>

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
                <CAvatar v-if="acountIdFile" class="Icon_user_man avatar-round" :src="`data:${acountIdFile};base64,${acountIdImage}`" 
                  style="padding: -4px" />
                <CAvatar v-else class="Icon_user_man" :src="Icon_user_man" style="padding: -4px" />
              </div>
            </div>
            <div class="col-10">


              <CFormInput v-model="comment" class="comments_box" type="text" placeholder="add comments "
                aria-label="comments_box" id="comments_box" ref="comments_box" @input="countCharacters"
                @keyup.enter="onSave" maxlength="200" row="3">
              </CFormInput>
              <br>
              <!-- <CFormInput type="file" @change="onFileUpload" /> -->
              <input type="file" ref="pictureInput" @change="onPictureUpload" style="display: none" id="imageInput" accept=".png, .jpg, .jpeg" />
              <CButton @click="attachImage  " id="attach_image"><img class="attach-image" :src="Attach_Image"
                  id="attachImage" alt="Attach Image" style="width: 20px" />
              </CButton>
              <CButton  @click="attachLink" id="attach_link"><img class="insert-link" :src="insert_link" alt="Insert Link"
                  style="width: 20px" />
              </CButton>
              <input type="file" ref="fileInput" @change="onFileUpload"  style="display: none" id="fileInput" accept=".txt, .pdf, .docx ,.xlsx" />
              <CButton @click="attachFile" id="attach_file"><img class="attach-file" :src="Attach_File" alt="Attach File"
                  style="width: 12px" />
              </CButton>
              <span class="text-end" style="margin-left: 710px;">Character count: {{ characterCount }} / 200</span>
              <p id="selectedImage">{{ imageName }}</p>
              <span v-if="link !== ''"> | <a>link : {{ link }}</a></span>
            </div>
            <div class="col">
              <div class="avatar">
                <CButton @keyup.enter="onSave" @click="onSave" id="submitComment" :disabled="comment === '' && !form.cmt_picture && !form.cmt_file && link === ''" > <img class="commit" :src="commit"
                    alt="Commit Icon" /></CButton>
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
                  <CAvatar v-if="item.cmt_act.act_picture" class="Icon_user_man"
                    :src="`data:${item.cmt_act.act_picture.filetype};base64,${item.cmt_act.act_picture.image}`" style="padding: -4px" />
                  <CAvatar v-else class="Icon_user_man" :src="Icon_user_man" style="padding: -4px" />
                </div>
              </div>
              <div class="col-10">
                <p><b>{{ item.cmt_act.act_first_name_eng }}</b> &emsp;{{ item.cmt_date }}</p>
                <div class="comments_box" style="width: fit-content; padding: 10px;">
                  {{ item.cmt_message }}
                  <a v-if="item.link" href="#" @click.prevent="openLink(item.cmt_link)">
                    {{ item.cmt_link }}
                  </a>
                  <a v-if="item.cmt_picture">
                    <CImage :src="`data:${item.cmt_picture.filetype};base64,${item.cmt_picture.image}`" alt="Comment Image" style="max-width: auto; height: 300px;" />
                  </a>
                  <a v-if="item.cmt_file">
                    <a :href="`data:${item.cmt_file.filetype};base64,${item.cmt_file.image}`" alt="Comment Image" style="max-width: auto; height: 300px;" download>{{`${item.cmt_file.filename}`}}</a>
                  </a>
                  <a v-if="item.cmt_link" @click="openLink(item.cmt_link)" style="text-decoration: none; color: #007bff; ">
                      {{ item.cmt_link }}
                  </a>
                  
                </div>
                
                    
                 
                <!-- <span v-if="item.file">
                  <img v-if="isImageFile(item.file.name)" :src="getImageIcon(item.file.name)" alt="File"
                    style=" max-width: 20px; max-height: 20px; margin-left: 5px;" />
                  <a :href="item.file.url" target="_blank">{{ item.file.name }}</a>
                  <a :href="item.file.url" download></a>
                </span> -->
              </div>
            </div>
          </div>
        </div>
      </CCardBody>
    </CCard>

  </div>
</template>

<script>
import Arrow_Left from '@/assets/images/Arrow_Left.png'
import File_test from '@/assets/images/file_test.jpg'
import Short from '@/assets/images/Short.jpg'
import Icon_user_man from '@/assets/images/icon_user_man.jpg'
import commit from '@/assets/images/commit.png'
import Attach_Image from '@/assets/images/Attach_Image.png'
import { CBadge, CButton, CFormInput } from '@coreui/vue-pro'
import insert_link from '@/assets/images/insert_link.png'
import Attach_File from '@/assets/images/Attach_File.png'
import axios from 'axios';
import dayjs from 'dayjs'
import 'dayjs/locale/th'
import 'dayjs/plugin/timezone' // นำเข้าโมดูล timezone
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
    CBadge
},
  data() {
    return {
      uploadImage: '',
      uploadFile: '',
      form: {  // Initialize the form object
        cmt_message: '',
        cmt_link: '',
        cmt_picture: '',
        cmt_file: '',
        cmt_date: '',
        cmt_act: '',
        cmt_tkt: '',
      },
      visibleA: true,
      visibleB: true,
      Icon_user_man,
      commit,
      Attach_Image,
      comments: [],
      imageName: '',
      imageDataURL: '', // เก็บรูปภาพที่แนบเป็น Data URL
      Attach_File,
      insert_link,
      link: '', // เพื่อจัดเก็บลิงก์ที่แทรก
      file: '', // เพิ่มคุณสมบัตินี้เพื่อเก็บไฟล์ที่แนบ
      ticketId:'',
      type:'',
      description:'',
      title:'',
      priorities:'',
      picture:'',
      avatar:'',
      acountFile:'',
      acountImage:'',
      acountIdFile:'',
      acountIdImage:'',
      firstname:'',
      email:'',
      date:'',
      comment: '',
      commentAccount: '',
      characterCount: 0, // เพิ่ม characterCount เริ่มต้นที่ 0

    };
  },
  setup(){
    const getBadge = (priorities) => {
        
          switch (priorities) {
            case 'Low':
              return 'success' ;
            case 'Medium':
              return 'warning' ;
            case 'High':
              return 'danger' ;
            
            default:
              return 'primary'; // Return a default color if none of the cases match.
          }
      };
      
      return{
        getBadge
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

    async attachImage() {
      const imageInput = this.$refs.pictureInput
      this.$refs.pictureInput.click()
     

      imageInput.addEventListener('change', (event) => {
        const file = event.target.files[0];

        if (file) {
          // ตรวจสอบประเภทของไฟล์ที่แนบ
          const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
          const fileExtension = file.name.split('.').pop().toLowerCase();

          if (allowedExtensions.includes(fileExtension)) {
            this.imageName = file.name;

            // อ่านไฟล์เป็น Blob
            const reader = new FileReader();
            reader.onload = (e) => {
              const imageBlob = new Blob([e.target.result], { type: file.type });
              this.form.cmt_picture = imageBlob; // บันทึกข้อมูลรูปภาพเป็น Blob
            };
            reader.readAsArrayBuffer(file);

            console.log('รูปถูกแนบเรียบร้อย');
          } else {
            this.imageName = '';
            console.error('ประเภทของไฟล์ไม่รองรับ');
          }
        } else {
          this.imageName = '';
          console.error('เกิดข้อผิดพลาดในการแนบรูป');
        }
      });
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
      this.$refs.fileInput.click();

      fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];

        if (file) {
          // ตรวจสอบประเภทของไฟล์ที่แนบ
          const allowedExtensions = ['pdf'];
          const fileExtension = file.name.split('.').pop().toLowerCase();

          if (allowedExtensions.includes(fileExtension)) {
            this.imageName = file.name;

            // อ่านไฟล์เป็น Blob
            const reader = new FileReader();
            reader.onload = (e) => {
              const fileBlob = new Blob([e.target.result], { type: file.type });
              this.form.cmt_file = fileBlob; // บันทึกข้อมูลไฟล์เป็น Blob
            };
            reader.readAsArrayBuffer(file);

            console.log('ไฟล์ถูกแนบเรียบร้อย');
          } else {
            this.imageName = '';
            console.error('ประเภทของไฟล์ไม่รองรับ');
          }
        } else {
          this.imageName = '';
          console.error('เกิดข้อผิดพลาดในการแนบไฟล์');
        }
      });
    },
    async isImageFile(filename) {
      const imageExtensions = ['jpg', 'jpeg', 'png', 'gif']; // รายการส่วนขยายของไฟล์รูปภาพ
      const fileExtension = filename.split('.').pop().toLowerCase();
      return imageExtensions.includes(fileExtension);
    },


    getImageIcon(filename) {
      const fileExtension = filename.split('.').pop().toLowerCase();
      switch (fileExtension) {
        case 'docx':
          return require('@/assets/images/doc_icon.png');
        // case 'jpeg':
        //   return require('@/assets/images/jpeg_icon.png');
        case 'png':
          return require('@/assets/images/png_icon.png');
        case 'pdf':
          return require('@/assets/images/pdf_icon.png');
        // เพิ่มประเภทของไฟล์อื่นๆ ตามต้องการ
        default:
          return require('@/assets/images/file_icon.png'); // รูปไอคอนเริ่มต้นหากไม่รู้จักประเภทของไฟล์
      }
    },
    async openLink(link) {
      window.open(link, '_blank');
    },
    async getTicket() {
      try {

        const ticketId = this.ticketId;

        const response = await axios.post(`${process.env.VUE_APP_URL}/mongoose/getOne/stts_tickets/${ticketId}`, 
        { populate: [
              {
                  "path":"tkt_act",
                  "populate":"act_picture"
              }
              ,"tkt_picture"
          ] 
        });
        this.type = response.data.tkt_types;
        this.description = response.data.tkt_description;
        this.title = response.data.tkt_title;
        this.priorities = response.data.tkt_priorities;
        this.picture = response.data.tkt_picture;
        this.date = response.data.tkt_time;
        this.acountFile=response.data.tkt_act.act_picture.filetype
        this.acountImage=response.data.tkt_act.act_picture.image
        this.email = response.data.tkt_act.act_email_address;
        this.firstname = response.data.tkt_act.act_first_name_eng;
        // this.email = response.data.tkt_act.act_email_address;
        // this.firstname = response.data.tkt_act.act_first_name_eng;

        // นำข้อมูลที่ได้รับมาใส่ในตัวแปร items
        // this.getAcount();

        } catch (error) {
          console.error('Error fetching data:', error);
        }
    },
    async getAcount() {
      try {

        const userData = JSON.parse(localStorage.getItem('USER_DATA')) // ดึงข้อมูล USER_DATA จาก local storage
        const userId = userData.id // ดึงค่า id จาก userData
        console.log(userId);

        const response = await axios.post(`${process.env.VUE_APP_URL}/mongoose/getOne/stts_accounts/${userId}`, { populate: ["act_picture"] });
        this.acountIdFile=response.data.act_picture.filetype
        this.acountIdImage=response.data.act_picture.image
        // นำข้อมูลที่ได้รับมาใส่ในตัวแปร items

        } catch (error) {
          console.error('Error fetching data:', error);
        }
    },
    async onPictureUpload(event) {
        const uploadFile = event.target.files[0]
        const formData = new FormData()
        formData.append('file', uploadFile)
      
        const dataResponse = await axios.post(`${process.env.VUE_APP_URL}/mongoose/upload/stts_files`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        this.form.cmt_picture = dataResponse.data._id
        this.form.cmt_file = null
        document.getElementById('imageInput').value = ''
        

      },
    async onFileUpload(event) {
        const uploadFile = event.target.files[0]
        const formData = new FormData()
        formData.append('file', uploadFile)
      
        const dataResponse = await axios.post(`${process.env.VUE_APP_URL}/mongoose/upload/stts_files`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        this.form.cmt_file = dataResponse.data._id
        this.form.cmt_picture = null
        document.getElementById('fileInput').value = ''
      },

      async onSave() {
        dayjs.locale('th')
        dayjs.extend(require('dayjs/plugin/timezone'))
        dayjs.tz.setDefault('Asia/Bangkok')
        const userData = JSON.parse(localStorage.getItem('USER_DATA')); // ดึงข้อมูล USER_DATA จาก local storage
        const userId = userData.id.toString(); // ดึงค่า id จาก userData
        
        const date = dayjs()


        this.form.cmt_file = this.form.cmt_file || null;
        this.form.cmt_picture = this.form.cmt_picture || null;

        const comment_date = `${date.format('DD/MM/YYYY-HH:mm:ss:SSS')}`
        const ticketId=this.ticketId
        this.form.cmt_message = this.comment
        this.form.cmt_date = comment_date
        this.form.cmt_tkt = ticketId
        this.form.cmt_link = this.link
        this.form.cmt_act = userId
        // this.form.cmt_picture = this.imageName
        // this.form.cmt_file = this.file
    
        //     // .then((result) => {
        //     //   this.$router.push('/support-ticket/user/dashboard')
        //     // })

        try {
          await axios.post(`${process.env.VUE_APP_URL}/mongoose/insert/stts_comments`, {
            data: this.form,
          });
          setTimeout(function() {
            this.getComment()
          }.bind(this), 200)
          // Handle success here
        } catch (error) {
          console.log(error);
          // Handle the error appropriately (e.g., display an error message)
        }
        
        this.comment = ''
        this.imageDataURL = ''
        this.imageName = ''
        this.link = ''
        this.form.cmt_file = null;
        this.form.cmt_picture = null;


        this.$socket.sendObj({
        type: 'new-comment',
        comment: this.form,
        });
        
        
        // window.location.reload();
      },
      async getComment(){
        const ticketId=this.ticketId
        const comment = await axios.post(`${process.env.VUE_APP_URL}/mongoose/get/stts_comments`, {
              where: {
                cmt_tkt: ticketId,
              },
              populate:[
              {
                  "path":"cmt_act",
                  "populate":"act_picture"
              },
              "cmt_picture","cmt_file"
              ]
                
              
            });
            console.log(ticketId)
            console.log(comment.data)
            this.comments = comment.data;
            this.commentAccount= comment.data.cmt_act;
            console.log(this.comments)
      },
      async getAcountComment() {
        try {

          const commentAcount = this.commentAccount;
          console.log(commentAcount);

          const response = await axios.post(`${process.env.VUE_APP_URL}/mongoose/getOne/stts_accounts/${commentAcount}`, { populate: ["act_picture"] });
          console.log(response.data);
          
          

          // นำข้อมูลที่ได้รับมาใส่ในตัวแปร items

          } catch (error) {
            console.error('Error fetching data:', error);
          }
      },
      async getFileType(filetype) {
        console.log("เข้า")
        switch (filetype) {
          case 'image/jpeg':
          case 'image/jpg':
          case 'image/png':
            return 'รูปภาพ';
          case 'application/pdf':
            return 'ไฟล์ PDF';
          case 'application/msword':
          case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            return 'ไฟล์เอกสาร Microsoft Word';
          case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
            return 'ไฟล์เอกสาร Microsoft Excel';
          default:
            return 'ไฟล์อื่น ๆ';
        }
        }

    },
  mounted(){
    const itemId = this.$route.params.itemId;
    this.ticketId = itemId;
    this.getTicket();
    this.getComment(); 
    this.getAcount(); 

  },

}
</script>

<style>
.avatar-round {
  width: 100px;
  /* ปรับขนาดตามที่ต้องการ */
  height: 100px;
  /* ปรับขนาดตามที่ต้องการ */
  border-radius: 50%;
  /* ทำให้รูปเป็นวงกลม */
}

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
