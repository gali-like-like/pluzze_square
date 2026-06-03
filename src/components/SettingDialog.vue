<script lang="ts" setup>
import { ref } from 'vue';
import type { SettingsForm } from '../types/index';
const props = defineProps<{
    visible: boolean,
    title: string
}>()

const emit = defineEmits<{
    (e: 'update:visible', value: boolean): void
}>();

// 初始化表单数据，使用 ref 创建响应式对象
const getInitialForm = (): SettingsForm => {
    const stored = localStorage.getItem('settingsForm');
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch (e) {
            console.error('Failed to parse settingsForm from localStorage', e);
        }
    }
    return { volume: 0.5 };
};

const initForm = ref<SettingsForm>(getInitialForm());

const handleVolumeChange = (val:number): void => {
    console.log(`当前音量:${val}`);
}

const handleSubmit = (): void => { 
    console.log('提交表单');
    localStorage.setItem('settingsForm', JSON.stringify(initForm.value));
    emit('update:visible', false);
}

const handleReset = (): void => { 
    console.log('重置表单');
    initForm.value.volume = 0.5;
    localStorage.setItem('settingsForm',JSON.stringify(initForm.value));
    emit('update:visible', false);
}
</script>

<template>
     <el-dialog v-model="props.visible" 
     @update:model-value="$emit('update:visible', $event)" :title="title" width="50%" size="large">
        <el-form :model="initForm" :inline="true">
            <el-form-item label="音效声音" id="volumeItem">
                <el-input-number id="volumeNumber" v-model="initForm.volume" @change="handleVolumeChange" :precision="1" :step="0.1" :max="1" :min="0"></el-input-number>
            </el-form-item> 
            <el-form-item>
                <el-button class="btns" type="primary" @click="handleSubmit">保存</el-button>
                <el-button class="btns" type="info" @click="handleReset">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<style scoped>
    .btns {
        font-size: 16px;
    }
</style>