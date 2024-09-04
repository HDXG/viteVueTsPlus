<template>
    <h1>这是首页显示</h1>
    <TableView v-model:tableOption="tableConfig" @handelPagination="handelPagination"  >
        <template #Status="{row}">
            <el-tag :key="row.IsStatus" :type="row.IsStatus?'success':'danger'" size="small"   >
                        {{ row.IsStatus?'正常':'禁用' }}
            </el-tag>
        </template>
    </TableView>
</template>
<script setup lang="ts">
    import { tableConfigs, tableOptions } from '@/components/DesignPlus/tableView';
    
    const tableConfig=reactive<tableConfigs>({
        pageIndex:1,
        pageSize:10,
        totalCount:0,
        Items:[{Id:'121',IsStatus:true}],
        border:true,
        rowKey:'Id',
        tableColumn:[
            {
                label:'姓名',
                prop:'Id',
                width:200,
                align:'center'
            },
            {
                label:'账号',
                width:200,
                align:'center'
            },
            {
                label:'密码',
                width:200,
                align:'center'
            },
            {
                label:'角色列表',
                align:'center'
            },
            {
                label:'状态',
                width:70,
                align:'center',
                slotName:'Status',
            },
            {
                label:'添加时间',
                width:100,
                align:'center'
            }
        ] as tableOptions[]
    });

    const handelPagination=()=>{
        //console.log(343);
    }

    onMounted(()=>{
        
        let i=0;
        for(i=0;i<10;i++){
            //tableConfig.Items.push({Id:i});
        }
        tableConfig.totalCount=10;
    })
</script>