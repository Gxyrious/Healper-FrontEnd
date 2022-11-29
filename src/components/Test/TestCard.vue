<template>
    <el-card :body-style="{ padding: '0px' }">
        <img
          src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
          class="image"
        />
        <div style="padding: 14px">
          <span>我是问卷</span>
          <div class="bottom">
            <p class="description">我是一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个问卷</p>
            <el-button text class="button">开始</el-button>
          </div>
        </div>
      </el-card>
</template>
<style>
.description {
    margin-right: 5px;
  font-size: 12px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  display: block;
}
.el-card{
    margin-bottom: 15px;
}
</style>