<template>
        <el-pagination 
            v-model:current-page="pageIndex"
            v-model:page-size="pageSize"
            :page-sizes="[10,20,40,50]"
            :total="totalCount"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            layout="total, sizes, prev, pager, next, jumper" >
        </el-pagination>
</template>

<script setup lang="ts">
import { pageModel } from '.';

const props=withDefaults(defineProps<pageModel>(),{
    pageIndex:1,
    pageSize:10,
    totalCount:0
})

const emit = defineEmits(['update:pageIndex', 'update:pageSize', 'update:totalCount', 'pagination'])
const pageSize = computed({
    get: () => props.pageSize,
    set: (val) => {
        emit('update:pageSize', val)
    }
})
const pageIndex = computed({
    get: () => props.pageIndex,
    set: (val) => {
        emit('update:pageIndex', val)
    }
})
const totalCount = computed({
    get: () => props.totalCount,
    set: (val) => {
        emit('update:totalCount', val)
    }
})
const handleCurrentChange=()=>{
    emit('pagination')
}
const handleSizeChange=()=>{
    emit('pagination')
}
onMounted(()=>{
    console.log(props);
})

</script>