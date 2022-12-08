<template>
  <el-container>
    <el-aside width=200px v-if="userType == 'client'">
      <nav-bar @logout="logout"></nav-bar>
    </el-aside>
    <el-aside width=200px v-if="userType == 'consultant'">
      <nav-bar-consultant @logout="logout"></nav-bar-consultant>
    </el-aside>
    <router-view @login="login" v-if="isRouterAlive"></router-view>
  </el-container>
</template>

<script>
import NavBar from "../src/components/NavBar/NavBar";
import { getCurrentInstance, onMounted } from "vue";
import { useStore } from "vuex";
import router from "./router";
import NavBarConsultant from "./components/NavBar/NavBarConsultant.vue";
export default {
  components: {
    NavBar,
    NavBarConsultant
  },
  provide () {
   return{
     reload: this.reload
   }
  },
  data() {
    return{
      userType: "client",
      isRouterAlive: true
    }
  },
  setup(){
    const cur = getCurrentInstance();
    const store = useStore();
  onMounted(()=>{
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo === null) {
      cur.data.userType = "";
      router.replace('/login');
    } else {
      store.state.userInfo = userInfo;
      console.log(userInfo);
      cur.data.userType = userInfo.userType;
      if (userInfo.userType == 'client')
        router.replace('/main');
      else if (userInfo.userType == 'consultant')
        router.replace('/consultantOrder');
    }
  })
},
  methods:{
    logout(){
      this.userType = "";
    },
    login(){
      this.userType = JSON.parse(localStorage.getItem("userInfo")).userType;
    },
    reload(){
     this.isRouterAlive = false
     this.$nextTick(function(){
       this.isRouterAlive = true
     })
   }
  },
  
};
</script>

<style>
</style>
