<template>
    <el-button  type="success" :icon="Plus" @click="handleAdd()"> 新增</el-button>
</template>

<script setup lang="ts">
import {Plus} from '@element-plus/icons-vue'

const emit = defineEmits(['handleAdd'])
const handleAdd=()=>{ 
    emit('handleAdd')
}

</script>