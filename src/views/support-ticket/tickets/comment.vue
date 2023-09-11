<template>
    <mark>Tong ไม่ทำงาน </mark>
    <br>
     <button type="submit" value="ยืนยัน" onclick="myFunction()"> กด Submit เพื่อยืนยันคำตอบ </button>

</template>
<script>
 export default {

    methods: {
     myFunction() {
      alert("ตองขี้เกียจ");
    }
    },
    components: {
      CFormInput,
      CIcon
    }
}


</script>
<style>
</style>
