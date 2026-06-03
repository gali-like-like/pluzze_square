<script lang="ts" setup>
</script>

<template>
    <div class="contain">
        <h1 id="title">游戏玩法</h1>
        <div class="content">
            <p>
                1. 玩家点击开始游戏按钮，游戏开始。
            </p>
            <p>
                2. 玩家根据数字大小，按照从小到大的顺序依次点击数字
            </p>
            <p>
                3. 玩家点击了25个数字后，游戏自动结束
            </p>
            <p>
                4. 会出现游戏结果
            </p>
        </div>
        <div class="footer">
            <el-text type="info">游戏作者: <el-link type="primary" target href="https://github.com/gali-like-like">gali-like-like</el-link></el-text>
            <el-text type="info">联系方式: <el-text type="success">1472993384@qq.com</el-text></el-text>
        </div>
    </div>
</template>

<style scoped>

    .contain {
        margin: 0 10px;
    }

 #title {
    font-size: 20px;
    font-weight: bold;
    
 }
.content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
}

.content p {
    color: #909399;
    font-size: 18px;
}
.footer {
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
}
.footer span {
    width: 100%;
    margin-left: 10px;
}
</style>