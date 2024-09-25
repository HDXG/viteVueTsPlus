<template>
    <TableView v-model:tableOption="tableConfig" @handelPagination="handelPagination"  >
        <template #StatusCode="{row}">
            <el-tag :key="row.HttpStatusCode" :type="row.HttpStatusCode==200 ?'success':
                row.HttpStatusCode==500?'danger':'warning'">{{ row.HttpStatusCode==200?'成功':row.HttpStatusCode==500
                ?'失败':row.HttpStatusCode }}</el-tag>
        </template>
        <template #Action="{row}">
            <ElButton type="primary" @click="handleGet(row.Id)">查看</ElButton>
        </template>
    </TableView>
    <el-drawer v-model="drawer" title="查看Action内容"  size="50%">
        <el-form :model="serilogModel" label-width="auto" >
            <el-form-item label="请求地址">
                <el-input  :readonly="true" v-model="serilogModel.Url" />
            </el-form-item>
            <el-form-item label="请求方式">
                <el-input  :readonly="true" v-model="serilogModel.HttpMethod" />
            </el-form-item>
            <el-form-item label="状态码">
                <el-tag :key="serilogModel.HttpStatusCode" :type="serilogModel.HttpStatusCode==200 ?'success':
                serilogModel.HttpStatusCode==500?'danger':'warning'">{{ serilogModel.HttpStatusCode}}</el-tag>
            </el-form-item>
            <el-form-item label="请求时间">
                <el-input :readonly="true" v-model:model-value="serilogModel.TimeStamp"></el-input>
            </el-form-item>
            <el-form-item label="时长">
                <el-input :readonly="true" v-model:model-value="serilogModel.TotalMilliseconds"></el-input>
            </el-form-item>
            <el-form-item label="请求参数">
                <VueJsonPrettyView v-model:json-data="serilogModel.RequestJson"></VueJsonPrettyView>
            </el-form-item>
            <el-form-item label="返回内容">
                <VueJsonPrettyView v-model:json-data="serilogModel.ResponseJson"></VueJsonPrettyView>
            </el-form-item>
        </el-form>
        
    </el-drawer>
</template>
<script setup lang="ts">
import { tableConfigs, tableOptions } from '@/components/DesignPlus/tableView';
import {SerilogService} from  '@/Services/public-Index'
import { SerilogDto, SerilogInPut } from '@/Services/Serilog/model';
const drawer=ref<boolean>(false);
const apiSerilog=new SerilogService();
const serilogModel=ref<SerilogDto>({
    Id:0,
    TimeStamp:'',
    Url:'',
    HttpMethod:"",
    RequestJson:"[]",
    HttpStatusCode:0,
    ResponseJson:"[]",
    ExceptionMessage:"",
    TotalMilliseconds:""
});
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
            },
            {
                label:"操作",
                slotName:'Action',
                width:100
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
function handleGet(Id){
    apiSerilog.getDto({Id:Id}).then(res=>{
        serilogModel.value=res;
        drawer.value=true;
    })
}
onMounted(()=>{
    handleLoad();
})
</script>