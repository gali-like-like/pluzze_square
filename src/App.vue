<script setup lang="ts">
  
</script>

<template>
    <div class="container">
      <el-row :gutter="10">
        <el-col :span="24">
          <el-text type="primary" class="title" size="large">舒特尔方格</el-text>
        </el-col>
      </el-row>
      <el-row justify="center" class="header">
        <el-col :span="4">
          <router-link class="link" to="/game">游戏</router-link>
        </el-col>
        <el-col :span="4">
          <router-link class="link" to="/view/score">查看成绩</router-link>
        </el-col>
        <el-col :span="4">
          <router-link class="link" to="/about">关于</router-link>
        </el-col>
      </el-row>
      <router-view></router-view>
    </div>
</template>

<style scoped>

  .title {
    text-align: center;
    font-size: 25px;
  
  }

  .container {
    width: 100%;
    height: 600px;
  }
  .header {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .link {
    font-size: 20px;
    color: gray; /* 默认颜色（未选中） */
    text-decoration: none; /* 去掉下划线 */
    transition: color 0.3s; /* 添加过渡效果 */
  }

  /* 鼠标悬停时的样式 */
  .link:hover {
    color: #409eff; 
  }

  /* ✅ 正确：当路由完全匹配时的高亮样式 */
  .link.router-link-exact-active {
    color: lightblue; /* 或者你喜欢的任何高亮颜色 */
    font-weight: bold;
  }
</style>