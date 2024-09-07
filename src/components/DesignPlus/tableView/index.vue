<template>
    <el-table :data="tableOption.Items"  :border="tableOption.border"  table-layout="fixed"  :row-key="tableOption.rowKey">   
        <el-table-column v-for="item in tableOption.tableColumn" 
            :prop="item.prop" :label="item.label"  
            :width="item.width" :align="item.align?item.align:'center'" :type="item?.type">
            <template v-if="item.date" #default="{row}">
                {{dateFormat(row,item.prop)}}
            </template>
            <template v-if="item.slotName" #default="{ row }">
                <slot :name="item.slotName" v-if="item.slotName" :row="row"></slot>
            </template>
            <template v-if="item.prop=='序号'" #default="{$index}">
                <span>{{ $index + tableOption.pageSize * (tableOption.pageIndex - 1) + 1 }}</span>
            </template>
        </el-table-column>
    </el-table>
    <page-view  style="margin-top: 10px;"
        v-model:pageOption="pageOption"    @pagination="handelPagination" />
</template>

<script setup lang="ts">
import { timeFormat } from '@/util/TimeDays';
import {tableConfigs} from '.'
import { pageModel } from '../pageView';

    
    const tablePage=defineProps<{tableOption:tableConfigs,}>();

    const emit=defineEmits(['update:tableOption','handelPagination']);

    const tableOption=computed({
        get:()=>tablePage.tableOption,
        set:(val)=>{
            emit('update:tableOption',val);
        }
    });
    const pageOption=reactive<pageModel>({
        pageIndex:tablePage.tableOption.pageIndex,
        pageSize:tablePage.tableOption.pageSize,
        totalCount:tablePage.tableOption.totalCount,
    })
    

    const handelPagination=()=>{
        emit('handelPagination');
    }
    watch(pageOption,(val:pageModel)=>{
        tablePage.tableOption.pageIndex=val.pageIndex;
        tablePage.tableOption.pageSize=val.pageSize;
        tablePage.tableOption.totalCount=val.totalCount;
    })
    watch(tableOption.value,(val:tableConfigs)=>{
        pageOption.totalCount=val.totalCount;
    })

    function dateFormat(row,prop){
        if(row[prop]!=undefined){
            return timeFormat( row[prop].replace('T',' '),'YYYY-MM-DD HH:mm:ss');
        }
    }

</script>