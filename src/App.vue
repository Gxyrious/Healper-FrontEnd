<template>
  <router-view></router-view>
</template>

<script>
export default {
  mounted(){
    this.$router.replace('/main')
  }
};
</script>

<style>
</style>
