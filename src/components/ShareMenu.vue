<template>
    <CNavItem
        href="/#/support-ticket/ticket/create"
        style="
          background-color: #ea5252;
          border-radius: 20px;
          margin-top: 15px;
          margin-bottom: 10px;
          width: 200px;
          margin-left: 10px;
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        "
      >
        <CImage
          customClassName="nav-icon"
          :src="IconnewTicket"
          style="max-height: 20px; margin-left: 5px; margin-right: 5px"
        />

        <font style="padding-left: 9px; color: whitesmoke"
          ><b>New Ticket</b></font
        >
    </CNavItem>

</template>
<script>
import IconnewTicket from '@/assets/images/Icon_addTicket.png'
export default {
  name: 'AppSidebar',
  data(){
    return{
        IconnewTicket,
    }
  },
  components: {
    IconnewTicket
  },
}
</script>