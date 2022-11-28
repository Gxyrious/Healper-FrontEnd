<template>
  <div class="content">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  components: {

  },
  mounted(){
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo === null) {
      this.$router.replace('/login');
    } else {
      this.$router.replace('/main');
    }
  }
};
</script>

<style>
</style>
