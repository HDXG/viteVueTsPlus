<template>
        <el-pagination 
            v-model:current-page="pageOption.pageIndex"
            v-model:page-size="pageOption.pageSize"
            :page-sizes="[10,20,40,50]"
            :total="pageOption.totalCount"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            layout="total, sizes, prev, pager, next, jumper" >
        </el-pagination>
</template>

<script setup lang="ts">
import { pageModel } from '.';

const props=defineProps<{
    pageOption:pageModel
}>();

const emit = defineEmits(['update:pageOption',  'pagination'])
const pageOption = computed({
    get: () => props.pageOption,
    set: (val) => {
        emit('update:pageOption', val)
    }
});

watch(pageOption.value,(val:pageModel)=>{
    pageOption.value=val;
})

const handleCurrentChange=()=>{ 
    emit('pagination')
}
const handleSizeChange=()=>{ 
    pageOption.value.pageIndex=1;
    emit('pagination')
}

</script>