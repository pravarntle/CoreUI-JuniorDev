<template>
  <CDropdown >
    <CDropdownToggle placement="bottom-end" :caret="false">
      <CIcon class="my-1 mx-2" icon="cil-bell" size="lg" />
      <CBadge
        v-if="itemsCount > 0"
        class="position-absolute top-0 end-0"
        color="danger-gradient"
        shape="rounded-pill"
        >{{ itemsCount }}</CBadge
      >
    </CDropdownToggle>
    <CDropdownMenu class="scol pt-0" v-if="itemsCount >5">
      <CDropdownHeader
        class="dropdown-header bg-light dark:bg-white dark:bg-opacity-10"
      >
        <strong v-if="itemsCount > 1">You have {{ itemsCount }} messages</strong>
        <strong v-else>You have {{ itemsCount }} message</strong>
      </CDropdownHeader>
      <div v-for="(item, index) in notificationAll" :key="index">
        
        <CDropdownItem v-if="item.not_type == 'Status'" @click="changeStatus(item,index)">

          <div class="message" >
              <div class="pt-3 me-3 float-start">
                <CAvatar :src="`data:${item.not_acc.acc_act.act_picture.flietype};base64,${item.not_acc.acc_act.act_picture.image}`" shape="rounded-circle" size="md" status="success"/>
              </div>
              <div>
                <small class="text-medium-emphasis">{{item.not_acc.acc_act.act_first_name_eng}}</small>
                <small class="text-medium-emphasis float-end mt-1">{{timeDiff(item.not_datetime)}}</small>
              </div>
              <div class="text-truncate font-weight-bold">
                <span class="fa fa-exclamation text-danger"></span> Change Status Ticket
              </div>
              <div class="small text-medium-emphasis text-truncate">
               <b class="ticket-number">#{{ item.not_tkt.tkt_number }}</b> The ticket status has been changed.
              </div>
          </div>
        </CDropdownItem>
        <CDropdownItem v-else @click="changeStatus(item,index)" >
            <div class="message">
              <div class="pt-3 me-3 float-start">
                <CAvatar :src="`data:${item.not_acc.acc_act.act_picture.flietype};base64,${item.not_acc.acc_act.act_picture.image}`" shape="rounded-circle" size="md" status="success"/>
              </div>
              <div>
                <small class="text-medium-emphasis">{{item.not_acc.acc_act.act_first_name_eng}}</small>
                <small class="text-medium-emphasis float-end mt-1">{{timeDiff(item.not_datetime)}}</small>
              </div>
              <div class="text-truncate font-weight-bold">
                <span class="fa fa-exclamation text-danger"></span> New message
              </div>
              <div class="small text-medium-emphasis text-truncate">
               <b class="ticket-number">#{{ item.not_tkt.tkt_number }}</b> There was a reply to the message.
              </div>
            </div>
        </CDropdownItem>
      </div>
      <CDropdownItem  class="text-center border-top" @click="toViewAll">
        <strong>View all messages</strong>
      </CDropdownItem>
    </CDropdownMenu>
    <CDropdownMenu class="scoll pt-0" v-else>
      <CDropdownHeader
        class="dropdown-header bg-light dark:bg-white dark:bg-opacity-10"
      >
        <strong v-if="itemsCount > 1">You have {{ itemsCount }} messages</strong>
        <strong v-else>You have {{ itemsCount }} message</strong>
      </CDropdownHeader>
      <div v-for="(item, index) in notificationAll" :key="index">
        
        <CDropdownItem v-if="item.not_type == 'Status'" @click="changeStatus(item,index)">

          <div class="message" >
              <div class="pt-3 me-3 float-start">
                <CAvatar :src="`data:${item.not_acc.acc_act.act_picture.flietype};base64,${item.not_acc.acc_act.act_picture.image}`" shape="rounded-circle" size="md" status="success"/>
              </div>
              <div>
                <small class="text-medium-emphasis">{{item.not_acc.acc_act.act_first_name_eng}}</small>
                <small class="text-medium-emphasis float-end mt-1">{{timeDiff(item.not_datetime)}}</small>
              </div>
              <div class="text-truncate font-weight-bold">
                <span class="fa fa-exclamation text-danger"></span> Change Status Ticket
              </div>
              <div class="small text-medium-emphasis text-truncate">
               <b class="ticket-number">#{{ item.not_tkt.tkt_number }}</b> The ticket status has been changed.
              </div>
          </div>
        </CDropdownItem>
        <CDropdownItem v-else @click="changeStatus(item,index)" >
            <div class="message">
              <div class="pt-3 me-3 float-start">
                <CAvatar :src="`data:${item.not_acc.acc_act.act_picture.flietype};base64,${item.not_acc.acc_act.act_picture.image}`" shape="rounded-circle" size="md" status="success"/>
              </div>
              <div>
                <small class="text-medium-emphasis">{{item.not_acc.acc_act.act_first_name_eng}}</small>
                <small class="text-medium-emphasis float-end mt-1">{{timeDiff(item.not_datetime)}}</small>
              </div>
              <div class="text-truncate font-weight-bold">
                <span class="fa fa-exclamation text-danger"></span> New message
              </div>
              <div class="small text-medium-emphasis text-truncate">
               <b class="ticket-number">#{{ item.not_tkt.tkt_number }}</b> There was a reply to the message.
              </div>
            </div>
        </CDropdownItem>
      </div>
      <CDropdownItem  class="text-center border-top" @click="toViewAll">
        <strong>View all messages</strong>
      </CDropdownItem>
    </CDropdownMenu>
  </CDropdown>
</template>

<script>
import axios from 'axios'
import avatar4 from '@/assets/images/avatars/4.jpg'
import avatar5 from '@/assets/images/avatars/5.jpg'
import avatar6 from '@/assets/images/avatars/6.jpg'
import avatar7 from '@/assets/images/avatars/7.jpg'
export default {
  name: 'TheHeaderDropdownNotif',
  setup() {
    return {
      avatar4,
      avatar5,
      avatar6,
      avatar7,
    }
  },
  data() {
    return { 
      itemsCount:'',
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
              not_status: { $ne: 'true' },
              not_act:this.userID,
              // not_act : this.userID
            },
          },

        );
        response.data.forEach((element) => {
          this.itemsCount++
        })
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
          this.itemsCount=0;          
          
          this.getNotifications();
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
      
      
    },
    toViewAll(){
      this.$router.push({ path: `/support-ticket/ticket/notifications` });
    },
    timeDiff(dateTime) {
    // Split the date-time string
        const parts = dateTime.split(',');

        // Extract date and time components
        const datePart = parts[0].trim();
        const timePart = parts[1].trim();

        // Extract date components
        const dateParts = datePart.split(' ');
        const day = parseInt(dateParts[0]);
        const month = dateParts[1];
        const year = parseInt(dateParts[2]);

        // Convert month to numeric index
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const monthIndex = monthNames.indexOf(month);

        // Extract time components
        const timeParts = timePart.split(':');
        let hour = parseInt(timeParts[0]);
        const minutePart = timeParts[1].split(' ');
        let minute = parseInt(minutePart[0]);
        const amPm = minutePart[1];

        // Adjust hour for PM
        if (amPm === 'PM' && hour < 12) {
            hour += 12;
        } else if (amPm === 'AM' && hour === 12) {
            hour = 0;
        }

        // Create the Date object
        const startDate = new Date(year, monthIndex, day, hour, minute);
        const endDate = new Date();

        // Calculate the difference in milliseconds
        const timeDifference = endDate.getTime() - startDate.getTime();

        // Convert milliseconds to seconds
        const secondsDifference = Math.abs(timeDifference / 1000);

        // Calculate days, hours, minutes, and seconds
        const days = Math.floor(secondsDifference / (3600 * 24));
        const hours = Math.floor((secondsDifference % (3600 * 24)) / 3600);
        const minutes = Math.floor((secondsDifference % 3600) / 60);
        const seconds = Math.floor(secondsDifference % 60); 
        if (days > 0) {
          if(days ==1){
            return days + ' day ago';
          }
          return days + ' days ago';
        } else if (hours > 0) {
          if(hours ==1){
            return hours + ' hour ago';
          }
            return hours + ' hours ago';
        } else if (minutes > 0) {
          if(hours ==1){
            return minutes + ' minute ago';
          }
            return minutes + ' minutes ago';
        } else {
            return seconds + ' seconds ago';
        }

        // Return the difference as an object
        
    }
    
  },
  mounted(){
    const userData = JSON.parse(localStorage.getItem('USER_DATA')) // ดึงข้อมูล USER_DATA จาก local storage
    this.userID=userData.id
    this.roleID=userData.role
    this.getNotifications()
    console.log("ยูสเซอร์:"+ this.userID)
  }
}
</script>
<style>
.ticket-number{
    color: #3399ff;
}
.scol{
  width: 500px;
  height: 500px;
  overflow-y: auto !important;
  
  
}
.scoll{
  width: 500px;
  height: auto;
  overflow-y: auto !important;
  
  
}
</style>