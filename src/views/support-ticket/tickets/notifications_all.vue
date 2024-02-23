<template>
    <CCard>
        <CCardBody>
            <div class="messages"  v-for="(item, index) in notificationAll" :key="index">
            
                    <a
                        class="message d-flex mb-3 text-high-emphasis text-decoration-none"
                        @click="changeStatus(item,index)"
                        href="javascript:void(0)"
                        v-if="item.not_type=='Comment'"
                        
                    >
                        
                        <div class="message-details flex-wrap pb-3 border-bottom">
                        <div class="message-headers d-flex flex-wrap">
                            <div class="message-headers-from">{{item.not_acc.acc_act.act_first_name_eng}}</div>
                            <div class="message-headers-date ms-auto">
                            <CIcon icon="cil-paperclip" /> {{item.not_datetime}}
                            </div>
                            <div class="message-headers-subject w-100 fs-5 fw-semibold">
                                New message
                            </div>
                            
                        </div>
                        <div class="message-body">
                            <b>{{ item.not_tkt.tkt_number }}</b> There was a reply to the message.                                                                                                  
                        </div>
                        </div>
                    </a>                   
                

                
                <a
                    class="message d-flex mb-3 text-high-emphasis text-decoration-none"
                    href="javascript:void(0)"
                    @click="changeStatus(item,index)"
                    v-else
                >
                    
                    <div class="message-details flex-wrap pb-3 border-bottom ">
                    <div class="message-headers d-flex flex-wrap">
                        <div class="message-headers-from">{{item.not_acc.acc_act.act_first_name_eng}}</div>
                        <div class="message-headers-date ms-auto">
                        <CIcon icon="cil-paperclip" /> {{item.not_datetime}}
                        </div>
                        <div class="message-headers-subject w-100 fs-5 fw-semibold">
                            change Status Ticket
                        </div>
                    </div>
                    <div class="message-body">
                        <b>{{ item.not_tkt.tkt_number }}</b> The ticket status has been changed.                                                                                                                
                    </div>
                    </div>
                </a>
                
                
            </div>            


        </CCardBody>

    </CCard>
    
  </template>
  
  <script>
import { CButton, CCardBody } from '@coreui/vue-pro';
import axios from 'axios'

  export default {
    name: 'Inbox',
    components: { CCardBody, CButton },
    data() {
    return { 
      notificationAll:'',
      userID:'',
      roleID:'',
    }
  },
    methods:{
        async getNotifications(){
            const response = await axios.post(
            `${process.env.VUE_APP_URL}/mongoose/get/stts_notifications`,
            {
                
                populate: [
                {
                    path: 'not_act',
                    populate: 'act_picture',
                },
                {
                    path: 'not_tkt',
                    populate:[
                    {
                        path:'tkt_act',
                        populate:'act_picture',
                    }
                    ]
                },
                {
                    path: 'not_acc',
                    populate:[
                    {
                        path:'acc_act',
                        populate:'act_picture',
                    }
                    ]
                },
                "not_cmt",

                ],
                where: {
                    not_act : this.userID ,
                   
                },
            },

            );
            this.notificationAll=response.data;
            console.log(this.notificationAll)
        },
        async changeStatus(item,index){
            const notificationId =item._id;
            const response = 
            await axios.put(
                `${process.env.VUE_APP_URL}/mongoose/update/stts_notifications/${notificationId}`,{
                    data:{
                    not_status : 'true'
                    },
                    populate: [
                    {
                    path: 'not_acc',
                    populate: [
                        {
                        path:'acc_act',
                        populate:'act_role',
                        }
                    ],
                    },
                    {
                    path: 'not_act',
                    populate: 'act_role',
                    },
                
                ],
                },
            )
                .then((result) => {        
                this.pushPage(result,index)
                
                })
                .catch((err) => { 
                console.log(error)
            });
        },
        async pushPage(item,index){
            var ticketId =item.data.not_tkt;

            var roleItem=item.data.not_act.act_role.rol_name
            var idItem=item.data.not_act._id
            
            if(roleItem=='ItSupport'){

                if(idItem==this.userID){
            
                this.$router.push({ path: `/support-ticket/it/it_comment/${ticketId}` });
                
                }else{
                this.$router.push({ path: `/support-ticket/ticket/comment/${ticketId}` });
                
                }
            }else{
                console.log('เอล')
                this.$router.push({ path: `/support-ticket/ticket/comment/${ticketId}` });
                
            }
            setTimeout(() => {
                window.location.reload();
            }, 500);
            
            
        }
    },
    mounted(){
        const userData = JSON.parse(localStorage.getItem('USER_DATA')) // ดึงข้อมูล USER_DATA จาก local storage
        this.userID=userData.id
        this.roleID=userData.role
        this.getNotifications()
    }
    

}
  </script>
  