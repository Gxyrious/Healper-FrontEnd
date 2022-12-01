<template>
  <el-container>
    <el-aside width=200px v-if="userType == 'client'">
    
      <nav-bar @logout="logout"></nav-bar>
    </el-aside>
    <router-view @login="login"></router-view>
  </el-container>
</template>

<script>
import NavBar from "../src/components/NavBar/NavBar";
import { getCurrentInstance, onMounted } from "vue";
import { useStore } from "vuex";
import router from "./router";
export default {
  components: {
    NavBar,
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
      cur.data.userType = userInfo.userType;
      router.replace('/main');
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
