<script lang="ts" setup>
    // const data: Array<Object> = [
    //     {date: '2022-01-01 14:00:00', score: 40,result: true},
    //     {date: '2022-01-02 14:01:00', score: 30,result: false},
    //     {date: '2022-01-03 14:02:00', score: 20,result: true},
    //     {date: '2022-01-04 14:03:00', score: 23.2,result: false},
    //     {date: '2022-01-05 14:04:00', score: 30.5,result: true},
    // ]
    const storeData: string | null = localStorage.getItem('recentResult');
    console.log(`历史记录:${storeData}`);
    const recentResult: Array<Object> = storeData ? JSON.parse(storeData) : [];
</script>

<template>
    <div class="contain">
        <el-table :data="recentResult">
            <el-table-column label="Date" prop="date"></el-table-column>
            <el-table-column label="Score" prop="score"></el-table-column>
            <el-table-column label="Result" prop="result">
                <template #default="scope">
                    <el-tag v-if="scope.row.result" type="success">Success</el-tag>
                    <el-tag v-else type="danger">Failed</el-tag>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<style scoped>
    .contain {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        box-sizing: border-box;
        padding: 0 10px;
    }
</style>