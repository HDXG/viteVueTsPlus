<template>
    <el-form  :inline="true">
        <el-form-item label="用户名称" prop="name">
            <el-input v-model="getUserSelect.userName"  placeholder="请输入用户名称" />
        </el-form-item>
        <el-form-item> 
            <el-button type="primary" @click="handleLoad();ElMessage.success('查询成功')">查询</el-button>
            <el-button @click="getUserSelect.userName='';handleLoad();ElMessage.success('重置成功')">重置</el-button>
        </el-form-item>
    </el-form>
    <TableView v-model:tableOption="tableConfig" @handelPagination="handelPagination"  >
        <template #Status="{row}">
            <el-tag :key="row.IsStatus" :type="row.IsStatus?'success':'danger'" size="small"   >
                {{ row.IsStatus?'正常':'禁用' }}
            </el-tag>
        </template>
        <template #handleBtn="{row}">
            <BtnAction v-model:rowDto="userDto" @handle-delete="handleDelete(row)" @handle-edit="handleEdit(row)" 
                @handle-view="handleView(row)" ></BtnAction>
        </template>
    </TableView>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus';
import { tableConfigs, tableOptions } from '@/components/DesignPlus/tableView';
import { getUserPageListDto, SysUserDto } from '@/Services/UserService/model';
const getUserSelect=reactive<getUserPageListDto>({
    userName:'',
    PageIndex:1,
    PageSize:10,
    
});
const userDto=reactive<SysUserDto>({
    Id:'',
    AccountNumber:'',
    PassWord:'',
    UserName:'',
    IsStatus:true,
    IsDelete:true,
})
const tableConfig=reactive<tableConfigs>({
    pageIndex:1,
    pageSize:10,
    totalCount:0,
    Items:[{Id:'121',IsStatus:true},{Id:'21',IsStatus:true}],
    border:true,
    rowKey:'Id',
    tableColumn:[
            {
                type:'selection',
                width:70
            },
            {
                label:'序号',
                prop:'序号',
                width:100,
            },
            {
                label:'姓名',
                prop:'Id',
                width:200,
            },
            {
                label:'账号',
                width:200,
            },
            {
                label:'角色列表',
            },
            {
                label:'状态',
                width:70,
                slotName:'Status',
            },
            {
                label:'添加时间',
                width:120,
            },
            {
                label:'操作',
                width:170,
                slotName:'handleBtn'
            }
    ] as tableOptions[]
});

watch(tableConfig,(val)=>{
    getUserSelect.PageIndex=val.pageIndex;
    getUserSelect.PageSize=val.pageSize;
})
//分页内容
const handelPagination=()=>{
    handleLoad();
}
const handleDelete=(row:SysUserDto)=>{

}
const handleEdit=(row:SysUserDto)=>{

}
const handleView=(row:SysUserDto)=>{

}

//加载事件
function handleLoad(){

}

    onMounted(()=>{
        handleLoad();
    })
</script>