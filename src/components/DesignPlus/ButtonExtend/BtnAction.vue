<template>
    <el-button style="width:40px;" @click="handleEdit(row)" type="primary" text><SvgIcon icon-class="edit" size="15" />编辑</el-button>
    <el-button style="width:40px;" @click="handleView(row)" type="primary" text><SvgIcon icon-class="View" size="15" />查看</el-button>
    <el-button style="width:40px;" @click="handleDelete(row)" type="danger" text><SvgIcon icon-class="Delete" size="15" />删除</el-button>
</template>

<script setup lang="ts">

const props=defineProps<{
    rowDto:any
}>();

const emit=defineEmits(['update:row','handleEdit','handleView','handleDelete']);

const row=computed({
    get:()=>props.rowDto,
    set:(val)=>{
        emit('update:row',val)
    }
})

const handleEdit=(row:any|undefined)=>{
    emit('handleEdit',row);
}
const handleView=(row:any|undefined)=>{
    emit('handleView',row);
}
const handleDelete=(row:any|undefined)=>{
    emit('handleDelete',row);
}

</script>