<script lang="ts" setup>
  import { ref,watch, onUnmounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { Refresh, Help } from '@element-plus/icons-vue'
  const shuffleNums = ref<Array<number>>([]);
  const sortNums: Array<number> = [];
  const rows: Array<number> = [1,2,3,4,5];
  const cols: Array<number> = [0,1,2,3,4];
  const clickedNums = ref<Array<number>>([]);
  const router = useRouter();
  const timer = ref<number>(0);
  const currentNum = ref<number>(0);
  const currentVolume = ref<number>(0.5);
  const dialogVisible = ref<boolean>(false);  
    const audioHtml = ref<HTMLAudioElement | null>(null);

    const gameResult = ref<boolean>(false);
    const seconds = ref<number>(0);
    const storedResults = localStorage.getItem('recentResults');
        console.log(`历史记录:${storedResults}`);
    const recentResult = ref<Array<any>>(storedResults ? JSON.parse(storedResults) : []);
    const initGame = (): void => {

    shuffleNums.value = [];
    sortNums.length = 0;
    clickedNums.value = [];
    seconds.value = 0;
    let i: number = 1;
    while(i < 26) {
      console.log(`第${i}次输出：${i}`);
      shuffleNums.value.push(i);
      sortNums.push(i);
      i++;
    }
  }

  watch(() => localStorage.getItem("volume"),(newVolume: string | null) => { 
    currentVolume.value = parseFloat(newVolume || "0.5");
  });

  const shuffle = () : void => {
  // Fisher-Yates 洗牌算法示例
  for (let i = shuffleNums.value.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffleNums.value[i], shuffleNums.value[j]] = [shuffleNums.value[j], shuffleNums.value[i]];
  }
  console.log(`打乱后数组:${shuffleNums.value}`)
  };

  const startGame = (): void => {
    initGame();
    shuffle();
    timer.value = setInterval(() => {
      if(dialogVisible.value) {
        clearInterval(timer.value);
        return;
      } else {
        seconds.value++;
      }
    }, 1000);
  };

  const recordResult = () : void => {
    recentResult.value.push({
      date: new Date().toLocaleString(),
      score: seconds.value,
      result: gameResult.value
    })
    console.log(`最近游戏结果:${recentResult.value}`);
  }

  const saveResult = (): void => { 
    localStorage.setItem('recentResult', JSON.stringify(recentResult.value));
  };
  const refreshGame = (): void => { 
    recordResult();
    saveResult();
    startGame();
    dialogVisible.value = false;
  };

  const handleClickCell = (num: number) : void => { 
    audioHtml.value?.play();
    clickedNums.value.push(num);
    console.log(`当前的数字是:${num},数组:${clickedNums.value}`);
    currentNum.value = num;
  };

  const equalArrays = (arr1: Array<number>, arr2: Array<number>) : boolean => {
    if(arr1.length !== arr2.length) {
      return false;
    }
    for(let i = 0; i < arr1.length; i++) {
      if(arr1[i] !== arr2[i]) {
        return false;
      }
    }
    return true;
  };

  watch(() => clickedNums.value.length, (newVal) => {
    if(newVal === 25) {
      equalArrays(clickedNums.value,sortNums) ? gameResult.value = true : gameResult.value = false;
      dialogVisible.value = true;
    }
  })

  const handleClose = (): void => {
    recordResult();
    saveResult();
    dialogVisible.value = false;
    startGame();
  };

  const handleJumpHelp = (): void => { 
    recordResult();
    saveResult();
    dialogVisible.value = false;
    router.push('/about');
  };

  onUnmounted(() => { 
    saveResult();
    clearInterval(timer.value);
  });

  startGame();
</script>

<template>
    <div class="game-area">
        <el-row class="my-row" justify="space-evenly"  v-for="(row) in rows" :key="row">
          <el-col @click="handleClickCell(shuffleNums[(row-1)*5+col])" class="cell" :span="4" v-for="(col) in cols" :key="col">{{ shuffleNums[(row-1)*5+col] }}</el-col>
        </el-row> 
        <el-row justify="space-between">
          <el-col  :xs="8" :md="4" :sm="6">用时:{{ seconds }}s</el-col>
          <el-col :xs="8" :md="4" :sm="6" >
            <el-text type="primary">当前数字: {{ currentNum }}</el-text></el-col>
        </el-row>
        <el-dialog
            v-model="dialogVisible"
            width="90%"
            header-class="titleText"
            modal-penetrable
            title="游戏结果"
            :before-close="handleClose"
            body-class="contentText">
            <el-text class="contentText" type="info">游戏结果
              <el-text size="large" class="contentText" :type="gameResult?'success':'danger'">{{ gameResult?'成功':'失败' }}</el-text></el-text>
              <el-text size="large" class="contentText" type="info">用时{{ seconds }}s</el-text>
            <template #footer>
              <el-row justify="end" width="100%" :gutter="10">
                <el-col :xs="12" :md="4" :sm="6">
                  <el-button id="refreshBtn" @click="refreshGame" :icon="Refresh" size="large">重新</el-button>
                </el-col>
                <el-col :xs="12" :md="4" :sm="6">
                  <el-button id="helpBtn" type="primary" size="large"  @click="handleJumpHelp" :icon="Help">帮助</el-button>
                </el-col>
              </el-row>
            </template>
         </el-dialog>
         <el-row>
            <el-col :span="4" v-show="false">
              <audio controls preload="metadata" ref="audioHtml">
                <source src="@/assets/audio/叮叮声简短.mp3" />
              </audio>
            </el-col>
         </el-row>
    </div>
</template>

<style scoped>
    .cell {
        border: 1px solid #eee;
        text-align: center;
        padding: 10px;
        font-size: 20px;
        background-color: #fff;
        margin: 10px 0;
    }

    .cell:active {
        color: pink;
    }

    .my-row:first-child .cell {
        margin-top: 0;
    }
    .contextText {
      font-size: 18px;
    }
    #refreshBtn,#helpBtn {
      width: 100%;
      font-size: 16px;
    }
</style>