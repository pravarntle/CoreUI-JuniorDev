<template>
  <CRow class="mr-md-3 p-2" >
    <CCol xs class="col-md-9 mr-md-3" id="col-ticket" >
      <CCard class="p-2">
        <CCardbody>
          <CRow>
            <div>
              <!-- ตรงนี้ต้องกดได้ เพื่อย้อนกลับ -->
              <!-- Icon สำหรับย้อนกลับ -->
              <CCol>
                <div class="text-start div-arrow-left" >
                  <CAvatar
                    class="Arrow_Left"
                    :src="Arrow_Left"
                  />
                  <!-- <label style="margin-left: 920px;"> ใส่ ICON สำหรับไปรายละเอียด Ticket ต่อไป </label> -->
                </div>
              </CCol>
            </div>
          </CRow>
          <hr />
          <CRow class="g-0">
            <!-- <CImage class="Avatar_4" :src="Avatar_4" /> -->

            <CAvatar
              v-if="acountFile"
              class="Icon_user_man avatar-round avatar-icon-p4"
              :src="`data:${acountFile};base64,${acountImage}`"
              
            />
            <CAvatar
              v-else
              class="Icon_user_man avatar-icon-p4"
              :src="Icon_user_man"
              
            />
            <CCol style="padding: 4px">
              <b> {{ firstname }}</b>
              <p class="small">{{ email }}</p>
            </CCol>
            <CCol class="text-end p-3" style="margin-right: 2%">
              <b> {{ formatDate(date) }} &nbsp; </b>
              <CBadge :color="getBadge(priorities)"
                ><span>
                  <li>{{ priorities }}</li>
                </span></CBadge
              >
            </CCol>
          </CRow>
          <hr />

          <!-- <CImage align="end" class="Short" :src="Short" /> -->
          <div class="clearfix text-end m-2" style="margin-right: 4%">
            <CButton
              class="btn btn-outline-info btn-short"
              id="b1"
              @click="
                () => {
                  visibleA = !visibleA
                  visibleB = !visibleB
                  switchname()
                }
              "
              >Short
            </CButton>

            <CRow>
              <CCol>
                <CCollapse :visible="visibleA">
                  <CCardBody style="margin-left: 2%">
                    <CCol class="text-start">
                      <b class="detail-title"> Title : </b>
                      <CCradText> {{ title }}</CCradText>
                    </CCol>
                    <CCol class="text-start" >
                      <b class="detail-title"> Type : </b>
                      <CCradText> {{ type }} </CCradText>
                    </CCol>
                    <CCol class="text-start" >
                      <b class="detail-title"> Description : </b>
                      <CCradText>
                        {{ description }}
                      </CCradText>
                    </CCol>
                  </CCardBody>
                  <hr />
                  <Crow>
                    <CCol class="text-start" >
                      <output class="output-number"> 1 </output>
                      <CCradText style="margin-left: 2%">
                        Attachment
                      </CCradText>
                    </CCol>
                  </Crow>
                  <Crow class="text-start">
                    <CCol class="output-number">
                      
                      <a v-if="picture">
                        <br>
                        <CImage :src="`data:${picture.filetype};base64,${picture.image}`"  alt="Comment Image" style="max-width: auto; height: 300px;" /><br><br>
                        <a :href="`data:${picture.filetype};base64,${picture.image}`"  alt="Comment Image" style="max-width: auto; height: 300px;" Download><u>Download</u></a>
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
    </CCol>
    <CCol class="col-md-2.5" style="padding: 10px">
        <!-- Adjust width for smaller size -->

        <CCard>
          <CCardBody>
            <h2 class="text-center">Details</h2>
            <h6><b>Ticket ID:</b></h6>
            <p>{{number}}</p>
            <h6><b>Date & Time:</b></h6>
            <p> {{ formatDate(date) }} &nbsp; </p>

            <CCollapse :visible="visibleB">
              <h6 class="detail-font-red"><b>Title</b></h6>
              <p>{{title}}</p>
              <h6 class="detail-font-red"><b>Status</b></h6>
              <p>{{stauts}}</p>
              <h6 class="detail-font-red"><b>Priority</b></h6>
              <p>{{priorities}}</p>
              <CRow>
                <CCol class="mb-2 text-center">
                  <CButton
                    class="btn-sec btn-resolve"
                    @click="() => {
                        visibleVerticallyCenteredDemo = true
                      }
                      "
                    >Resolve</CButton
                  >
                  <CModal
                    alignment="center"
                    :visible="visibleVerticallyCenteredDemo"
                    @close="() => {
                        visibleVerticallyCenteredDemo = false
                      }
                      "
                  >
                    <CModalHeader>
                      <CModalTitle>Resolve Status</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      <div style="margin-bottom: 20px">
                        <b>{{stauts}}</b>
                      </div>
                      <CFormSelect
                          aria-label="Default select example"
                          color="secondary"
                          v-model="edit"
                          :options="[
                            'Status to edit',
                            { label: 'Closed', value: 'Closed' },
                            { label: 'Closed Bug', value: 'Closed Bug' },
                            { label: 'Open', value: 'Open'}
                          ]">
                      </CFormSelect>
                    </CModalBody>
                    <CModalFooter>
                      <CButton
                        color="secondary"
                        @click="() => {
                            visibleVerticallyCenteredDemo = false
                          }
                          "
                        
                      
                      >
                        Close
                      </CButton>
                      <CButton color="primary" @click="onSaveSatatus">Save changes</CButton>
                    </CModalFooter>
                  </CModal>
                </CCol>

                <!-- <CCol class="mb-2 text-center">
                  <CButton
                    class="btn-sec btn-assign"
                    @click="() => {
                        PopupAssign = true
                      }
                      "
                    >Assign</CButton
                  >
                  <CModal
                    alignment="center"
                    :visible="PopupAssign"
                    @close="() => {
                        PopupAssign = false
                      }
                      "
                  >
                    <CModalHeader>
                      <CModalTitle>Assign to</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      <Ccard class="text-left"> All </Ccard>
                    </CModalBody>

                    <CModalFooter>
                      <CButton
                        color="secondary"
                        @click="() => {
                            PopupAssign = false
                          }
                          "
                      >
                        Close
                      </CButton>
                      <CButton color="primary">Save changes</CButton>
                    </CModalFooter>
                  </CModal>
                </CCol> -->
              </CRow>
            </CCollapse>
          </CCardBody>
        </CCard>
      </CCol>
  </CRow>

  <div>
    <CCard>
      <CCardBody>
        <CCardTitle>Comments</CCardTitle>
        <div class="container text-start" id="My_Comments">
          <div class="row align-items-center">
            <div class="col-1">
              <div class="avatar">
                <CAvatar
                  v-if="acountIdFile"
                  class="Icon_user_man avatar-round avatar-icon-p4"
                  :src="`data:${acountIdFile};base64,${acountIdImage}`"
                  
                />
                <CAvatar
                  v-else
                  class="Icon_user_man avatar-icon-p4"
                  :src="Icon_user_man"
                  
                />
              </div>
            </div>
            <div class="col-10">
              <CFormInput
                v-model="comment"
                class="comments_box"
                type="text"
                placeholder="add comments "
                aria-label="comments_box"
                id="comments_box"
                ref="comments_box"
                @input="countCharacters"
                @keyup.enter="onSave"
                maxlength="200"
                row="3"
              >
              </CFormInput>
              <br />
              <!-- <CFormInput type="file" @change="onFileUpload" /> -->
              <input
                type="file"
                ref="pictureInput"
                @change="onPictureUpload"
                style="display: none"
                id="imageInput"
                accept=".png, .jpg, .jpeg"
              />
              <CButton @click="attachImage" id="attach_image"
                ><img
                  class="attach-image btn-attach"
                  :src="Attach_Image"
                  id="attachImage"
                  alt="Attach Image"
                />
              </CButton>
              <CButton @click="attachLink" id="attach_link"
                ><img
                  class="insert-link btn-attach" 
                  :src="insert_link"
                  alt="Insert Link"
                />
              </CButton>
              <input
                type="file"
                ref="fileInput"
                @change="onFileUpload"
                style="display: none"
                id="fileInput"
                accept=".txt, .pdf, .docx ,.xlsx"
              />
              <CButton @click="attachFile" id="attach_file"
                ><img
                  class="attach-file btn-attach2"
                  :src="Attach_File"
                  alt="Attach File"
                />
              </CButton>
              <span class="text-end span-char-count" 
                >Character count: {{ characterCount }} / 200</span
              >
              <p id="selectedImage">{{ imageName }}</p>
              <span v-if="link !== ''">
                | <a>link : {{ link }}</a></span
              >
            </div>
            <div class="col">
              <div class="avatar">
                <CButton
                  @keyup.enter="onSave"
                  @click="onSave"
                  id="submitComment"
                  :disabled="
                    comment === '' &&
                    !form.cmt_picture &&
                    !form.cmt_file &&
                    link === ''
                  "
                >
                  <img class="commit" :src="commit" alt="Commit Icon"
                /></CButton>
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
                  <CAvatar
                    v-if="item.cmt_act.act_picture"
                    class="Icon_user_man"
                    :src="`data:${item.cmt_act.act_picture.filetype};base64,${item.cmt_act.act_picture.image}`"
                  />
                  <CAvatar
                    v-else
                    class="Icon_user_man"
                    :src="Icon_user_man"
                  />
                </div>
              </div>
              <div class="col-10">
                <p>
                  <b>{{ item.cmt_act.act_first_name_eng }}</b> &emsp;{{
                    item.cmt_date
                  }}
                </p>
                <div
                  class="comments_box div-comment-box"
                >
                  {{ item.cmt_message }}
                  <a
                    v-if="item.link"
                    href="#"
                    @click.prevent="openLink(item.cmt_link)"
                  >
                    {{ item.cmt_link }}
                  </a>
                  <a v-if="item.cmt_picture">
                    <CImage
                      :src="`data:${item.cmt_picture.filetype};base64,${item.cmt_picture.image}`"
                      alt="Comment Image"
                      class="comment-image"
                    />
                  </a>
                  <a v-if="item.cmt_file">
                    <a
                      :href="`data:${item.cmt_file.filetype};base64,${item.cmt_file.image}`"
                      alt="Comment Image"
                      class="comment-image"
                      download
                      >{{ `${item.cmt_file.filename}` }}</a
                    >
                  </a>
                  <a
                    v-if="item.cmt_link"
                    @click="openLink(item.cmt_link)"
                    class="a-cmt-link"
                  >
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
import axios from 'axios'
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
    CBadge,
  },
  data() {
    return {
      uploadImage: '',
      uploadFile: '',
      form: {
        // Initialize the form object
        cmt_message: '',
        cmt_link: '',
        cmt_picture: '',
        cmt_file: '',
        cmt_date: '',
        cmt_act: '',
        cmt_tkt: '',
      },
      PopupAssign: false,
      visibleVerticallyCenteredDemo: false,
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
      ticketId: '',
      type: '',
      description: '',
      title: '',
      priorities: '',
      picture: '',
      avatar: '',
      acountFile: '',
      acountImage: '',
      acountIdFile: '',
      acountIdImage: '',
      firstname: '',
      email: '',
      date: '',
      comment: '',
      commentAccount: '',
      characterCount: 0, // เพิ่ม characterCount เริ่มต้นที่ 0
      number: '',
      stauts: '',
      edit:'',
      actId:'',
      accId:'',
      allUpdate:{
        mod_act:'',
        mod_date:'',
        mod_status:'',
        mod_tkt:'',
      },
      notifications:{
        not_datetime:'',
        not_status:'',
        not_type:'',
        not_act:'',
        not_tkt:'',
        not_cmt:'',
        not_acc:'',
      }
      
    }
  },
  setup() {
    const getBadge = (priorities) => {
      switch (priorities) {
        case 'Low':
          return 'success'
        case 'Medium':
          return 'warning'
        case 'High':
          return 'danger'

        default:
          return 'primary' // Return a default color if none of the cases match.
      }
    }

    return {
      getBadge,
    }
  },

  methods: {
    async switchname() {
      var x = document.getElementById('b1')
      if (x.innerHTML === 'Expand') {
        x.innerHTML = 'Short'
      } else {
        x.innerHTML = 'Expand'
      }
    },

    async countCharacters() {
      this.characterCount = this.comment.length
    },

    async attachImage() {
      const imageInput = this.$refs.pictureInput
      this.$refs.pictureInput.click()

      imageInput.addEventListener('change', (event) => {
        const file = event.target.files[0]

        if (file) {
          // ตรวจสอบประเภทของไฟล์ที่แนบ
          const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif']
          const fileExtension = file.name.split('.').pop().toLowerCase()

          if (allowedExtensions.includes(fileExtension)) {
            this.imageName = file.name

            // อ่านไฟล์เป็น Blob
            const reader = new FileReader()
            reader.onload = (e) => {
              const imageBlob = new Blob([e.target.result], { type: file.type })
              this.form.cmt_picture = imageBlob // บันทึกข้อมูลรูปภาพเป็น Blob
            }
            reader.readAsArrayBuffer(file)

            console.log('รูปถูกแนบเรียบร้อย')
          } else {
            this.imageName = ''
            console.error('ประเภทของไฟล์ไม่รองรับ')
          }
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
      const fileInput = this.$refs.fileInput
      this.$refs.fileInput.click()

      fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0]

        if (file) {
          // ตรวจสอบประเภทของไฟล์ที่แนบ
          const allowedExtensions = ['pdf']
          const fileExtension = file.name.split('.').pop().toLowerCase()

          if (allowedExtensions.includes(fileExtension)) {
            this.imageName = file.name

            // อ่านไฟล์เป็น Blob
            const reader = new FileReader()
            reader.onload = (e) => {
              const fileBlob = new Blob([e.target.result], { type: file.type })
              this.form.cmt_file = fileBlob // บันทึกข้อมูลไฟล์เป็น Blob
            }
            reader.readAsArrayBuffer(file)

            console.log('ไฟล์ถูกแนบเรียบร้อย')
          } else {
            this.imageName = ''
            console.error('ประเภทของไฟล์ไม่รองรับ')
          }
        } else {
          this.imageName = ''
          console.error('เกิดข้อผิดพลาดในการแนบไฟล์')
        }
      })
    },
    async isImageFile(filename) {
      const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'] // รายการส่วนขยายของไฟล์รูปภาพ
      const fileExtension = filename.split('.').pop().toLowerCase()
      return imageExtensions.includes(fileExtension)
    },

    getImageIcon(filename) {
      const fileExtension = filename.split('.').pop().toLowerCase()
      switch (fileExtension) {
        case 'docx':
          return require('@/assets/images/doc_icon.png')
        // case 'jpeg':
        //   return require('@/assets/images/jpeg_icon.png');
        case 'png':
          return require('@/assets/images/png_icon.png')
        case 'pdf':
          return require('@/assets/images/pdf_icon.png')
        // เพิ่มประเภทของไฟล์อื่นๆ ตามต้องการ
        default:
          return require('@/assets/images/file_icon.png') // รูปไอคอนเริ่มต้นหากไม่รู้จักประเภทของไฟล์
      }
    },
    async openLink(link) {
      window.open(link, '_blank')
    },
    async getTicket() {
      try {
        const ticketId = this.ticketId

        const response = await axios.post(
          `${process.env.VUE_APP_URL}/mongoose/getOne/stts_tickets/${ticketId}`,
          {
            populate: [
              {
                path: 'tkt_act',
                populate: 'act_picture',
              },
              'tkt_picture',
            ],
          },
        )
        this.type = response.data.tkt_types
        this.description = response.data.tkt_description
        this.title = response.data.tkt_title
        this.priorities = response.data.tkt_priorities
        this.picture = response.data.tkt_picture
        this.date = response.data.tkt_time
        this.acountFile = response.data.tkt_act.act_picture.filetype
        this.acountImage = response.data.tkt_act.act_picture.image
        this.email = response.data.tkt_act.act_email_address
        this.firstname = response.data.tkt_act.act_first_name_eng
        this.number = response.data.tkt_number
        this.stauts = response.data.tkt_status
        this.actId = response.data.tkt_act
        // this.email = response.data.tkt_act.act_email_address;
        // this.firstname = response.data.tkt_act.act_first_name_eng;

        // นำข้อมูลที่ได้รับมาใส่ในตัวแปร items
        console.log(response.data)
        // this.getAcount();
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    async getAcount() {
      try {
        const userData = JSON.parse(localStorage.getItem('USER_DATA')) // ดึงข้อมูล USER_DATA จาก local storage
        const userId = userData.id // ดึงค่า id จาก userData
        console.log(userId)

        const response = await axios.post(
          `${process.env.VUE_APP_URL}/mongoose/getOne/stts_accounts/${userId}`,
          { populate: ['act_picture'] },
        )
        this.acountIdFile = response.data.act_picture.filetype
        this.acountIdImage = response.data.act_picture.image
        // นำข้อมูลที่ได้รับมาใส่ในตัวแปร items
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    async onPictureUpload(event) {
      const uploadFile = event.target.files[0]
      const formData = new FormData()
      formData.append('file', uploadFile)

      const dataResponse = await axios.post(
        `${process.env.VUE_APP_URL}/mongoose/upload/stts_files`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      this.form.cmt_picture = dataResponse.data._id
      this.form.cmt_file = null
      document.getElementById('imageInput').value = ''
    },
    async onFileUpload(event) {
      const uploadFile = event.target.files[0]
      const formData = new FormData()
      formData.append('file', uploadFile)

      const dataResponse = await axios.post(
        `${process.env.VUE_APP_URL}/mongoose/upload/stts_files`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      this.form.cmt_file = dataResponse.data._id
      this.form.cmt_picture = null
      document.getElementById('fileInput').value = ''
    },

    async onSave() {
      dayjs.locale('th')
      dayjs.extend(require('dayjs/plugin/timezone'))
      dayjs.tz.setDefault('Asia/Bangkok')
      const userData = JSON.parse(localStorage.getItem('USER_DATA')) // ดึงข้อมูล USER_DATA จาก local storage
      const userId = userData.id.toString() // ดึงค่า id จาก userData

      const date = dayjs()

      this.form.cmt_file = this.form.cmt_file || null
      this.form.cmt_picture = this.form.cmt_picture || null

      const comment_date = `${date.format('DD/MM/YYYY-HH:mm:ss:SSS')}`
      const ticketId = this.ticketId
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
        await axios.post(
          `${process.env.VUE_APP_URL}/mongoose/insert/stts_comments`,
          {
            data: this.form,
          },
        )
        setTimeout(
          function () {
            this.getComment()
          }.bind(this),
          200,
        )
        // Handle success here
      } catch (error) {
        console.log(error)
        // Handle the error appropriately (e.g., display an error message)
      }

      this.comment = ''
      this.imageDataURL = ''
      this.imageName = ''
      this.link = ''
      this.form.cmt_file = null
      this.form.cmt_picture = null

      // this.$socket.sendObj({
      // type: 'new-comment',
      // comment: this.form,
      // });

      // window.location.reload();
    },
    async getComment() {
      const ticketId = this.ticketId
      const comment = await axios.post(
        `${process.env.VUE_APP_URL}/mongoose/get/stts_comments`,
        {
          where: {
            cmt_tkt: ticketId,
          },
          populate: [
            {
              path: 'cmt_act',
              populate: 'act_picture',
            },
            'cmt_picture',
            'cmt_file',
          ],
        },
      )
      
      this.comments = comment.data
      this.commentAccount = comment.data.cmt_act
      
    },
    async getAcountComment() {
      try {
        const commentAcount = this.commentAccount
        console.log(commentAcount)

        const response = await axios.post(
          `${process.env.VUE_APP_URL}/mongoose/getOne/stts_accounts/${commentAcount}`,
          { populate: ['act_picture'] },
        )
        console.log(response.data)

        // นำข้อมูลที่ได้รับมาใส่ในตัวแปร items
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    async getFileType(filetype) {
      console.log('เข้า')
      switch (filetype) {
        case 'image/jpeg':
        case 'image/jpg':
        case 'image/png':
          return 'รูปภาพ'
        case 'application/pdf':
          return 'ไฟล์ PDF'
        case 'application/msword':
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
          return 'ไฟล์เอกสาร Microsoft Word'
        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
          return 'ไฟล์เอกสาร Microsoft Excel'
        default:
          return 'ไฟล์อื่น ๆ'
      }
    },
    async onSaveSatatus() {
      dayjs.locale('th')
      dayjs.extend(require('dayjs/plugin/timezone'))
      dayjs.tz.setDefault('Asia/Bangkok')
      const date = dayjs()
      const ticket_date = `${date.format('YYYY-MM-DD')}`
      try {
        
        const ticketId = this.ticketId;
        // ทำการอัปเดตข้อมูลใน MongoDB โดยใช้ Axios
        await axios.put(`${process.env.VUE_APP_URL}/mongoose/update/stts_tickets/${ticketId}`, {
          data: {
            tkt_status: this.edit,
            tkt_last_update:ticket_date,
          }
        })
        .then((result) => {
          this.allUpdate.mod_status = result.data.tkt_status;
          this.allUpdate.mod_tkt = result.data._id;
          this.updateStatus();
          
        })
        .catch((err) => {
          console.log(error)
        });
        this.stauts = this.edit
        window.location.reload();

        // หลังจากอัปเดตสำเร็จ คุณสามารถทำสิ่งอื่นที่คุณต้องการได้ที่นี่
        console.log('อัปเดต status และส่งข้อมูลไปยัง MongoDB สำเร็จ');
        // รีเฟรชหน้า
        

      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการอัปเดตข้อมูล:', error);
      }
    },
    async updateStatus(){
      const userData = JSON.parse(localStorage.getItem('USER_DATA'))
      dayjs.locale('en')
      dayjs.extend(require('dayjs/plugin/timezone'))
      dayjs.tz.setDefault('Asia/Bangkok')
      const date = dayjs()
      dayjs.extend(require('dayjs/plugin/timezone'));
      dayjs.extend(require('dayjs/plugin/customParseFormat'));
      dayjs.extend(require('dayjs/plugin/localizedFormat'));
      const accept_date = `${date.format('D MMM YYYY, h:mm A')}`
      const userId = userData.id
      this.allUpdate.mod_date = accept_date;
      this.allUpdate.mod_act = userId;

      console.log(this.allUpdate)
      try {
          await axios.post(`${process.env.VUE_APP_URL}/mongoose/insert/stts_modifications`, {
            data: this.allUpdate,
            
          })
          .then((result) => {
            this.accept();
            this.notification();
            this.$router.push({ name: 'ST - it/it_comment' });
          })
          .catch((err) => {
            console.log(error)
          })
      } catch (error) {
        console.log(error)
      }
    },
    formatDate: function(dateString) {
      const options = { day: '2-digit', month: 'short', year: 'numeric' };
      return new Date(dateString).toLocaleDateString('en-GB', options);
    },
    async notification() {
      console.log("เข้า1")
      const userData = JSON.parse(localStorage.getItem('USER_DATA'))
      dayjs.locale('en')
      dayjs.extend(require('dayjs/plugin/timezone'))
      dayjs.tz.setDefault('Asia/Bangkok')
      const date = dayjs()
      dayjs.extend(require('dayjs/plugin/timezone'))
      dayjs.extend(require('dayjs/plugin/customParseFormat'))
      dayjs.extend(require('dayjs/plugin/localizedFormat'))
      const noti_date = `${date.format('D MMM YYYY, h:mm A')}`
      const userId = userData.id
      this.notifications.not_datetime = noti_date
      this.notifications.not_act = this.actId
      this.notifications.not_type = 'Status'
      this.notifications.not_tkt = this.ticketId
      this.notifications.not_cmt = null
      this.notifications.not_status = false
      this.notifications.not_acc = this.accId

      
      console.log(this.notifications)
      try {
        await axios
          .post(
            `${process.env.VUE_APP_URL}/mongoose/insert/stts_notifications`,
            {
              data: this.notifications,
            },
          )
      } catch (error) {
        console.log(error)
      }
    },
    async accept() {
      console.log("เข้า2")

      dayjs.locale('th')
      dayjs.extend(require('dayjs/plugin/timezone'))
      dayjs.tz.setDefault('Asia/Bangkok')
      const userData = JSON.parse(localStorage.getItem('USER_DATA')) // ดึงข้อมูล USER_DATA จาก local storage
      const userId = userData.id // ดึงค่า id จาก userData
      const date = dayjs()
      const ticket_date = `${date.format('DD/MM/YYYY-HH:mm:ss:SSS')}`

      console.log(ticket_date)
      console.log(userId)
      try {
        const dataResponse = await axios
          .post(
            `${process.env.VUE_APP_URL}/mongoose/insert/stts_accept_tickets`,
            {
              data: {
                acc_time: ticket_date,
                acc_act: userId,
              },
            },
          )
          .catch((err) => {
            console.log(error)
          })
        this.accId = dataResponse.data._id
        this.updateTicket()
      } catch (error) {
        console.log(error)
      }
    },
    
  },
  beforeUnmount() {
    clearInterval(this.commentInterval);
  },
  mounted() {
    const itemId = this.$route.params.itemId
    console.log(itemId)
    this.ticketId = itemId
    this.getTicket()
    this.getComment()
    this.getAcount()
    this.commentInterval = setInterval(() => {
      this.getComment();
    }, 1000);
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
  text-align: left;
}

.Icon_user_man {
  /* margin-left: 0.5pc; */
  width: 56px;
  height: 56px;
}

.Short {
  width: 60px;
}

.avatar-icon-p4{
  padding: -4px;
}

.detail-title {
  font-size: 20px;
}

.output-number {
  margin-left: 5%;
}

.ticket-file {
  max-width: auto; 
  height: 300px
}

.detail-font-red {
  color: red;
}

.btn-resolve {
  font-weight: bold;
  font-size: 22.5px;
  width: 150px;
  color: white;
  border-radius: 20px;
  background-color: #d0293b;
}

.btn-assign {
  font-weight: bold;
  font-size: 22.5px;
  width: 150px;
  color: white;
  background-color: #f9a825;
  border-radius: 20px;
}

.btn-attach {
  width: 20px;
}

.btn-attach2 {
  width: 12px;
}

.span-char-count {
  margin-left: 710px;
}

.btn-short {
  font-weight: bold; font-size: x-small; width: 65px
}

.div-comment-box {
  width: fit-content; padding: 10px
}

.comment-image {
  max-width: auto; height: 300px
}

.a-cmt-link {
  text-decoration: none; color: #007bff
}

.div-arrow-left {
  margin-top: 1%;
}

#col-ticket {
  padding: 10px;
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
