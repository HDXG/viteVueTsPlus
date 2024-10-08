<template>
    <div style="margin-top: 10px; background-color: #fff">
        <TableView v-model:tableOption="tableConfig" @handelPagination="handelPagination"  >
            <!-- <template #header>
                <div  style="margin-bottom: 10px;">
                    <BtnAdd @handleAdd="handleAdd"></BtnAdd>
                </div> 
            </template> -->
            <template #create="{row}">{{ dateTimeFormat(row.create_date) }}</template>
            <template #modify="{row}">{{ dateTimeFormat(row.modify_date) }}</template>
        </TableView>
    </div>
</template>
<script setup lang="ts">
import { tableConfigs, tableOptions } from '@/components/DesignPlus/tableView'
import { PagingBase } from '@/api';
import {CodeGenerationService} from '@/api/public-Index'
import { timeFormat } from '@/util/TimeDays';

const getTableSelect=reactive<PagingBase>({
    PageIndex:1,
    PageSize:10,
})
const apiCode=new CodeGenerationService();

const tableConfig=reactive<tableConfigs>({
    pageIndex:1,
    pageSize:10,
    totalCount:0,
    Items:[],
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
            label:'表名称',
            prop:'tableName',
            width:200,
        },
        {
            label:'描述',
            prop:'describe',
        },
        {
            label:'对象模式',
            prop:'schemasName',
            width:90
        },
        {
            label:'创建时间',
            prop:'create_date',
            slotName:'create',
            width:200
        },
        {
            label:'修改时间',
            prop:'modify_date',
            slotName:'modify',
            width:200
        },
        {
            label:'操作',
            width:150,
        }
    ] as tableOptions[]
});
watch(tableConfig,(val)=>{
    getTableSelect.PageIndex=val.pageIndex;
    getTableSelect.PageSize=val.pageSize;
})
function LoadHandle(){
    apiCode.getTableListHandle(getTableSelect).then(res=>{
        tableConfig.Items=res.Item;
        tableConfig.totalCount=res.TotalCount;
    })
}
function dateTimeFormat(val:string){
    return timeFormat(val,'YYYY-MM-DD HH:mm:ss');
}
function handelPagination(){
    LoadHandle();
};

onMounted(()=>{
    LoadHandle();
})

</script>
