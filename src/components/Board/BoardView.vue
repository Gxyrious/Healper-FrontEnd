<template>
  <div id="b">
    <div class="title">系统公告</div>
    <div class="main">
      {{ content }}
    </div>
    <div class="appendix">更新时间 {{ readableDate }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: "",
      updateDate: ""
    };
  },
};
</script>