<template>
    <div style="padding: 10px; margin-bottom: 50px">
      <el-row>
        <el-col :span="4">
          <el-card style="width: 300px; height: 300px; color: #333">
           <div style="padding-bottom: 10px; border-bottom: 1px solid #ccc">在线用户<span style="font-size: 12px">（点击聊天气泡开始聊天）</span></div>
            <div style="padding: 10px 0" v-for="user in users" :key="user.username">
              <span>{{ user.username }}</span>
              <i class="el-icon-chat-dot-round" style="margin-left: 10px; font-size: 16px; cursor: pointer"
                 @click="chatUser = user.username"></i>
              <span style="font-size: 12px;color: limegreen; margin-left: 5px" v-if="user.username === chatUser">chatting...</span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="20">
          <div style="width: 800px; margin: 0 auto; background-color: white;
                      border-radius: 5px; box-shadow: 0 0 10px #ccc">
            <div style="text-align: center; line-height: 50px;">
              Web聊天室（{{ chatUser }}）
            </div>
            <div style="height: 350px; overflow:auto; border-top: 1px solid #ccc" v-html="content"></div>
            <div style="height: 200px">
              <textarea v-model="text" style="height: 160px; width: 100%; padding: 20px; border: none; border-top: 1px solid #ccc;
               border-bottom: 1px solid #ccc; outline: none"></textarea>
              <div style="text-align: right; padding-right: 10px">
                <el-button type="primary" size="mini" @click="send">发送</el-button>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </template>
  <script>
//   import request from "@/utils/request";
  let socket = null;
  export default {
    name: "testChat",
    created() {
      this.init()
    },
    methods: {
        init() {
            const socketUrl = `ws://127.0.0.1:8080/websocket/15844342928`;
            socket = new WebSocket(socketUrl);
            socket.onopen = () => {
                console.log("connected");
                socket.send("liuchang")
            }
            socket.onmessage = msg => {
                console.log(msg);
            }
            socket.onclose = () => {
                console.log("disconnected");
            }
        }
    }
    
  }
  </script>
  <style>
  .tip {
    color: white;
    text-align: center;
    border-radius: 10px;
    font-family: sans-serif;
    padding: 10px;
    width:auto;
    display:inline-block !important;
    display:inline;
  }
  .right {
    background-color: deepskyblue;
  }
  .left {
    background-color: forestgreen;
  }
  </style>
  