<template>
    <h1>用户列表</h1>
    <TableView v-model:tableOption="tableConfig" @handelPagination="handelPagination"  >
        <template #Status="{row}">
            <el-tag :key="row.IsStatus" :type="row.IsStatus?'success':'danger'" size="small"   >
                {{ row.IsStatus?'正常':'禁用' }}
            </el-tag>
        </template>
        <template #handleBtn="{row}">
            <el-button style="width:20px;" type="primary" text><ElTooltip content="编辑" placement="top"><SvgIcon icon-class="edit" size="20" /></ElTooltip></el-button>
            <el-button style="width:20px;"  type="primary" text><ElTooltip content="查看" placement="top"><SvgIcon icon-class="View" size="20" /></ElTooltip></el-button>
            <el-button style="width:20px;"  type="danger" text><ElTooltip content="删除" placement="top"><SvgIcon icon-class="Delete" size="20" /></ElTooltip></el-button>
        </template>
    </TableView>
</template>

<script setup lang="ts">
    import { tableConfigs, tableOptions } from '@/components/DesignPlus/tableView';
    
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
                label:'密码',
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
                width:100,
            },
            {
                label:'操作',
                width:170,
                slotName:'handleBtn'
            }
        ] as tableOptions[]
    });

    const handelPagination=()=>{
        //console.log(343);
    }

    onMounted(()=>{
    })
</script>