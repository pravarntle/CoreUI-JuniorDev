<template>
  <mark>Tong ไม่ทำงาน </mark>
  <br />
  <button type="submit" value="ยืนยัน" @click="myFunction">
    กด Submit เพื่อยืนยันคำตอบ
  </button>

  <!-- Test -->
  <br />
  <br />

  <CCard class="p-2">
    <CCardbody>
      <CRow>
        <div>
          <!-- ตรงนี้ต้องกดได้ เพื่อย้อนกลับ -->
          <!-- Icon สำหรับย้อนกลับ -->

          <CCol class="text-start">
            <div class="avatar">
              <CAvatar class="Arrow_Left" :src="Arrow_Left" />
            </div>
          </CCol>
        </div>
      </CRow>
      <hr />
      <CRow class="g-0">
        <!-- <CImage class="Avatar_4" :src="Avatar_4" /> -->
        <CCardImage
          class="Icon_user_man"
          :src="Icon_user_man"
          style="padding: -4px"
        />
        <CCol style="padding: 4px">
          <b> Settawut101</b>
          <p class="small">settawut@gmail.com</p>
        </CCol>
        <CCol class="text-end p-3" style="margin-right: 2%">
          <b>Jul 17, 2023 &nbsp; </b>
          <span class="badge bg-danger"> <li>High</li> </span>
        </CCol>
      </CRow>
      <hr />

      <!-- <CImage align="end" class="Short" :src="Short" /> -->
      <div class="clearfix text-end" style="margin-right: 4%">
        <CButton
          class="btn btn-outline-info"
          style="font-size: 10%"
          @click="
            () => {
              visibleA = !visibleA
              visibleB = !visibleB
            }
          "

        >
          <b>Short</b>
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
                  <CCardImage
                    class="File_test"
                    :src="File_test"
                    style="padding: 2px"
                  />
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

  <CCard>
    <CCardBody>
      <CCardTitle>Comments</CCardTitle>
      <br />
      <div class="container text-start">
        <div class="row align-items-center">
          <div class="col-1">
            <div class="avatar">
              <img class="Icon_user_man" :src="Icon_user_man" />
            </div>
          </div>
          <div class="col-10">
            <CFormInput
              class="comments_box"
              type="text"
              placeholder="add comments"
              aria-label="comments_box"
            />
          </div>
          <div class="col">
            <div class="avatar">
              <img class="commit" type="submit" :src="commit" />
            </div>
          </div>
        </div>
      </div>
      <br />
    </CCardBody>

    <CButton
      class="btn btn-outline-info"
      style="font-size: 10%"
      id="b1"
      @change="javascript3">Short
    </CButton>
  </CCard>


  <div class="accordion accordion-flush" id="accordionFlushExample">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-coreui-toggle="collapse" data-coreui-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
        Accordion Item #1
      </button>
    </h2>
    <div id="flush-collapseOne" class="accordion-collapse collapse" data-coreui-parent="#accordionFlushExample">
      <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the first item's accordion body.</div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-coreui-toggle="collapse" data-coreui-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
        Accordion Item #2
      </button>
    </h2>
    <div id="flush-collapseTwo" class="accordion-collapse collapse" data-coreui-parent="#accordionFlushExample">
      <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the second item's accordion body. Let's imagine this being filled with some actual content.</div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-coreui-toggle="collapse" data-coreui-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
        Accordion Item #3
      </button>
    </h2>
    <div id="flush-collapseThree" class="accordion-collapse collapse" data-coreui-parent="#accordionFlushExample">
      <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the third item's accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.</div>
    </div>
  </div>
</div>
</template>

<script>
// export default {
//   methods: {
//     myFunction() {
//       alert('ตองขี้เกียจ')
//     },
//   },
// }
import Arrow_Left from '@/assets/images/Arrow_Left.png'
import File_test from '@/assets/images/file_test.jpg'
import commit from '@/assets/images/commit.png'
import Icon_user_man from '/Users/settawut/Desktop/STTS/CoreUI-JuniorDev/src/assets/images/Icon_user_man.jpg'
import Short from '@/assets/images/Short.jpg'
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
  },
  data() {
    return {
      visibleA: false,
      visibleB: false,
    }
  },
  javascript3() {
    if (document.getElementById('b1').innerHTML == "Short") {
      fdsf
        document.getElementById('b1').innerHTML = "Hide"
    } else {
        document.getElementById('b1').innerHTML = "Short"
    }
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
.collapse {
  &:not(.show) {
    display: none;
  }
}
</style>
