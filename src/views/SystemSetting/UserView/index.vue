<template>
    <h1>用户列表</h1>
    <el-table ref="ruleFormRef" :data="tableData.Items"  >   
            <el-table-column label="序号" align="center" type="index" width="80">
            <template v-slot="{ $index }">
            <span>{{ $index + model.pageSize * (model.pageIndex - 1) + 1 }}</span>
            </template>
        </el-table-column>
            <el-table-column prop="UserName" label="用户名" width="180" />
            <el-table-column prop="AccountNumber" label="账号"  />
            <el-table-column label="角色列表" prop="RoleName" show-overflow-tooltip>
            </el-table-column>
            <el-table-column  label="用户状态" width="100">
                <template #default="scope">
                    <el-tag :key="scope.row.IsStatus" :type="scope.row.IsStatus?'success':'danger'"  effect="dark" >
                        {{ scope.row.IsStatus?'正常':'禁用' }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="CreateTime" label="添加时间" width="200" />
            <el-table-column  align="center" label="操作" width="200" >
            <template #default="scope">
                <el-button  type="primary" size="small" @click="handleEdit(scope.row)" >修改</el-button>
                <el-button size="small"  type="danger" @click="handleDelete(scope.$index,scope.row)">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
    <PageView style="margin-top: 10px;float: right;"
        v-model:pageIndex="model.pageIndex" v-model:pageSize="model.pageSize" 
        v-model:totalCount="model.totalCount"></PageView>
</template>

<script setup lang="ts">

import { tableRequestData,pageModel } from '@/components/DesignPlus/pageView';
import {GetUserList}  from '.';
const model=reactive<pageModel>({
    pageIndex:1,
    pageSize:10,
    totalCount:50,
})

const GetUserListDto=reactive<GetUserList>({
    name:'23'
})

const tableData=reactive<tableRequestData>({
    Items:[],
    TotalCount:20,
})

const handleEdit=((row)=>{
    console.log(row);
})

const handleDelete=((_index,row)=>{
    console.log(row);
})


onMounted(()=>{
    console.log(model);
    console.log(GetUserListDto);
})
</script>