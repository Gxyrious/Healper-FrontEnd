<template>
  <el-container>
    <el-header style="padding-top: 20px; padding-bottom: 20px">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/order' }"
          >历史订单</el-breadcrumb-item
        >
        <el-breadcrumb-item>编辑档案</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <el-container class="input_background">
      <el-main class="input_field">
        <div style="font-weight: bolder; font-size: 20px; margin-bottom: 1%">
          心理建议
        </div>
        <my-editor ref="advice" @editorSubmit="getAdvice"></my-editor>
        <div
          style="
            font-weight: bolder;
            font-size: 20px;
            margin-bottom: 1%;
            margin-top: 3%;
          "
        >
          咨询总结
        </div>
        <my-editor ref="summary" @editorSubmit="getSummary"></my-editor>
        <button
          @click="bothSubmit"
          class="mine_button"
          v-loading.fullscreen.lock="fullscreenLoading"
          element-loading-text="正在提交..."
        >
          <div class="svg-wrapper-1">
            <div class="svg-wrapper">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path
                  fill="currentColor"
                  d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                ></path>
              </svg>
            </div>
          </div>
          <span>提交</span>
        </button>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import MyEditor from "../components/Editor/MyEditor.vue";
import axios from "axios";
import { ElMessage } from "element-plus";
export default {
  components: {
    MyEditor,
  },
  data() {
    return {
      adviceContent: "",
      summaryContent: "",
    };
  },
  methods: {
    bothSubmit() {
      console.log("bothSubmit开始");
      this.$refs.advice.submit();
      this.$refs.summary.submit();
      // console.log(this.adviceContent);
      // console.log(this.summaryContent);
      axios({
        method: "post",
        url: "api/history/archive",
        params: {
          id: this.$route.params.id,
          adviceBase64: this.adviceContent,
          summaryBase64: this.summaryContent,
        },
      })
        .then((res) => {
          if (res.data.staus)
            ElMessage({
              type: "success",
              message: "提交成功！",
              duration: 2000,
              showClose: true,
            });
          else
            ElMessage({
              type: "false",
              message: "提交失败！",
              duration: 2000,
              showClose: true,
            });
        })
        .catch((errMsg) => {
          console.log(errMsg);
          console.log("提交失败-异常");
        });
    },
    getAdvice(content) {
      this.adviceContent = content;
    },
    getSummary(content) {
      this.summaryContent = content;
    },
  },
};
</script>

<style scoped>
.input_background {
  background: #f4f4f5;
}

.input_field {
  width: 98%;
  margin-left: 1%;
  margin: 1% 5%;
  background: #fff;
  transition: background-color 0.1s ease;
  border-bottom: 1px solid #f0f0f2;
}

.input_field:hover {
  box-shadow: 0 0 15px 10px #00000020;
}

.mine_button {
  margin-left: 45%;
  margin-top: 2vh;
  font-family: inherit;
  font-size: 16px;
  background: rgb(37, 150, 249);
  color: white;
  padding: 0.7em 1em;
  padding-left: 0.9em;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.2s;
}

.mine_button span {
  display: block;
  margin-left: 0.3em;
  transition: all 0.3s ease-in-out;
}

.mine_button svg {
  display: block;
  transform-origin: center center;
  transition: transform 0.3s ease-in-out;
}

.mine_button:hover .svg-wrapper {
  animation: fly-1 0.6s ease-in-out infinite alternate;
}

.mine_button:hover svg {
  transform: translateX(1.2em) rotate(45deg) scale(1.1);
}

.mine_button:hover span {
  transform: translateX(5em);
}

.mine_button:active {
  transform: scale(0.95);
}

@keyframes fly-1 {
  from {
    transform: translateY(0.1em);
  }

  to {
    transform: translateY(-0.1em);
  }
}
</style>
