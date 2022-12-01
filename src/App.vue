<template>
  <el-container>
    <el-aside width=200px v-if="userType == 'client'">
      <nav-bar @logout="logout"></nav-bar>
    </el-aside>
    <el-aside width=200px v-if="userType == 'consultant'">
      <nav-bar-consultant @logout="logout"></nav-bar-consultant>
    </el-aside>
    <router-view @login="login"></router-view>
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
  data() {
    return{
      userType: "client",
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
        router.replace('/consultantMain');
    }
  })
},
  methods:{
    logout(){
      this.userType = "";
    },
    login(){
      this.userType = JSON.parse(localStorage.getItem("userInfo")).userType;
    }
  },
  
};
</script>

<style>
</style>
