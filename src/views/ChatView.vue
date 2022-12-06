/* eslint-disable */
<template>
  <div style="padding: 10px; margin-top: 3%; width: 100%">
    <el-row justify="center">
      <el-col :span="20">
        <div
          style="
            width: 800px;
            margin: 0 auto;
            background-color: white;
            border-radius: 5px;
            box-shadow: 0 0 10px #ccc;
          "
        >
          <div style="text-align: center; line-height: 50px">
            Web聊天室({{ toName }})
          </div>
          <div
            style="height: 350px; overflow: auto; border-top: 1px solid #ccc"
            v-html="content"
          ></div>
          <!-- 输入文本框 -->
          <div style="height: 245px">
            <textarea
              v-model="text"
              style="
                height: 160px;
                width: 95%;
                padding: 20px;
                border: none;
                border-top: 1px solid #ccc;
                border-bottom: 1px solid #ccc;
                outline: none;
                resize: none;
              "
            ></textarea>
            <div style="text-align: right; padding-right: 10px">
              <el-button type="primary" size="mini" @click="send"
                >发送</el-button
              >
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
let clientSocket = null;

export default {
  data() {
    return {
      toUserId: this.$route.query.toUserId, //聊天对象的id
      toName: "", //聊天对象的名字
      userPhone: this.$store.state.userInfo.user.userphone, //本人的手机号
      toPhone: "", //聊天对象的手机号
      userType: this.$store.state.userInfo.userType, //本人的用户类型
      toUserType: "", //聊天对象的用户类型，比如本人是client，toUserType就是consultant
      profile: this.$store.state.userInfo.user.profile, //本人的头像
      toProfile: "", //聊天对象的头像
      text: "", //输入的内容
      content: "", //对方发来的内容
    };
  },
  created() {
    this.setInfo();
    this.getInfo();
    this.init();
  },
  methods: {
    setInfo() {
      //确定聊天对象的用户身份
      if (this.userType == "client") {
        this.toUserType = "consultant";
      } else if (this.userType == "consultant") {
        this.toUserType = "client";
      }
      console.log("对方id:", this.toUserId);
      console.log("对方类型:", this.toUserType);
    },
    getInfo() {
      // 通过id查聊天对象信息
      axios({
        method: "get",
        url: "api/user/info",
        params: {
          id: this.toUserId,
          userType: this.toUserType,
        },
      }).then((res) => {
        console.log("res", res);
        // 获取聊天对象名字、手机号、头像
        this.toPhone = res.data.userphone;
        this.toProfile = res.data.profile;
        if (this.toUserType == "client") {
          this.toName = res.data.nickname;
        } else if (this.toUserType == "consultant") {
          this.toName = res.data.realname;
        }
        console.log("聊天对象的手机号: ", this.toPhone);
        console.log("聊天对象的头像url: ", this.toProfile);
      });
    },
    init() {
      const clientSocketUrl =`ws://81.68.102.171:8081/websocket/` + this.$store.state.userInfo.user.userphone;
      clientSocket = new WebSocket(clientSocketUrl);
      console.log("socketUrl: " + clientSocketUrl);
      console.log("toPhone", this.toPhone);

      clientSocket.onopen = () => {
        console.log("client connected!");
      };
      clientSocket.onmessage = (msg) => {
        console.log("接收消息");
        console.log(msg.data);
        let data = JSON.parse(msg.data); // 对收到的json数据进行解析
        // 构建消息内容，对方消息
        this.createContent(this.toPhone, null, data.content);
      };
      clientSocket.onclose = () => {
        console.log("disconnected");
      };
    },
    send() {
      console.log(this.$store.state.userInfo.user.userphone);

      let jsonMessage = {
        toUserphone: this.toPhone,
        content: this.text,
      };
      clientSocket.send(JSON.stringify(jsonMessage));
      // 构建消息内容，本人消息
      this.createContent(null, this.userPhone, this.text);
      this.text = "";
    },
    createContent(remoteUser, nowUser, text) {
      // 这个方法是用来将 json的聊天消息数据转换成 html的。
      let html;
      // 当前用户消息
      if (nowUser) {
        // nowUser 表示是否显示当前用户发送的聊天消息，绿色气泡
        html =
          '<div class="el-row" style="padding: 5px 0">\n' +
          '  <div class="el-col el-col-22" style="text-align: right; padding-right: 10px">\n' +
          '    <div class="tip left">' +
          text +
          "</div>\n" +
          "  </div>\n" +
          '  <div class="el-col el-col-2">\n' +
          '  <span class="el-avatar el-avatar--circle" style="height: 40px; width: 40px; line-height: 40px;">\n' +
          "    <img src=" +
          this.profile +
          ' style="object-fit: cover;">\n' +
          "  </span>\n" +
          "  </div>\n" +
          "</div>";
      } else if (remoteUser) {
        // remoteUser表示远程用户聊天消息，蓝色的气泡
        html =
          '<div class="el-row" style="padding: 5px 0">\n' +
          '  <div class="el-col el-col-2" style="text-align: right">\n' +
          '  <span class="el-avatar el-avatar--circle" style="height: 40px; width: 40px; line-height: 40px;">\n' +
          "    <img src=" +
          this.toProfile +
          ' style="object-fit: cover;">\n' +
          "  </span>\n" +
          "  </div>\n" +
          '  <div class="el-col el-col-22" style="text-align: left; padding-left: 10px">\n' +
          '    <div class="tip right">' +
          text +
          "</div>\n" +
          "  </div>\n" +
          "</div>";
      }
      console.log(html);
      this.content += html;
    },
  },
};
</script>
<style>
.tip {
  color: white;
  text-align: center;
  border-radius: 10px;
  font-family: sans-serif;
  padding: 10px;
  width: auto;
  display: inline-block !important;
  display: inline;
}

.right {
  background-color: deepskyblue;
}

.left {
  background-color: forestgreen;
}
</style>
  