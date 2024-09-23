<template>
    <TableView v-model:tableOption="tableConfig" @handelPagination="handelPagination"  >
        <template #StatusCode="{row}">
            <el-tag :key="row.HttpStatusCode" :type="row.HttpStatusCode==200 ?'success':
                row.HttpStatusCode==500?'danger':'warning'">{{ row.HttpStatusCode==200?'成功':row.HttpStatusCode==500
                ?'失败':row.HttpStatusCode }}</el-tag>
        </template>
    </TableView>
</template>
<script setup lang="ts">
import { tableConfigs, tableOptions } from '@/components/DesignPlus/tableView';
import {SerilogService} from  '@/Services/public-Index'
import { SerilogInPut } from '@/Services/Serilog/model';
const apiSerilog=new SerilogService();


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
                label:'Url地址',
                prop:'Url',
            },
            {
                label:'请求方式',
                prop:'HttpMethod',
                width:100,
            },
            {
                label:'返回状态',
                width:200,
                slotName:'StatusCode'
            },
            {
                label:'时长',
                width:100,
                prop:'TotalMilliseconds',
            },
            {
                label:'请求时间',
                date:true,
                prop:'TimeStamp',
                width:200,
            }
    ] as tableOptions[]
});

const getSerilogSelect=ref<SerilogInPut>({
        HttpMethod:'',
        url:'',
        PageIndex:1,
        PageSize:10,
    });
//分页内容
const handelPagination=()=>{
    getSerilogSelect.value.PageIndex=tableConfig.pageIndex;
    getSerilogSelect.value.PageSize=tableConfig.pageSize;
    handleLoad();
}
function handleLoad(){
    apiSerilog.getList(getSerilogSelect.value).then(res=>{
        tableConfig.totalCount=res.TotalCount;
        tableConfig.Items=res.Item;
    })
}
onMounted(()=>{
    console.log(1);
    handleLoad();
})
</script>