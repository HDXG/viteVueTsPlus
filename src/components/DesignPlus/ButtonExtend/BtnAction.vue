<template>
    <el-button style="width:20px;" @click="handleEdit(row)" type="primary" text><ElTooltip content="编辑" placement="top"><SvgIcon icon-class="edit" size="20" /></ElTooltip></el-button>
    <el-button style="width:20px;" @click="handleView(row)" type="primary" text><ElTooltip content="查看" placement="top"><SvgIcon icon-class="View" size="20" /></ElTooltip></el-button>
    <el-button style="width:20px;" @click="handleDelete(row)" type="danger" text><ElTooltip content="删除" placement="top"><SvgIcon icon-class="Delete" size="20" /></ElTooltip></el-button>
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