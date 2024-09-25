<template>
    <div style="padding: 15px;background-color: #fff;border: 1px solid #ebeef5; margin-top: 10px;">
        <header>  <slot name="header"></slot>  </header> 
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
    </div>
    <el-pagination  style="margin-top: 20px;margin-right: 10px; float: right;"
            v-model:current-page="tableOption.pageIndex"
            v-model:page-size="tableOption.pageSize"
            :page-sizes="[10,20,40,50]"
            :total="tableOption.totalCount"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            layout="total, sizes, prev, pager, next, jumper" >
        </el-pagination>
</template>

<script setup lang="ts">
import { timeFormat } from '@/util/TimeDays';
import {tableConfigs} from '.'
    const tablePage=defineProps<{tableOption:tableConfigs,}>();
    const emit=defineEmits(['update:tableOption','handelPagination']);
    const tableOption=computed({
        get:()=>tablePage.tableOption,
        set:(val)=>{
            emit('update:tableOption',val);
        }
    });
const handleCurrentChange=()=>{
    emit('handelPagination')
}
const handleSizeChange=()=>{ 
    tableOption.value.pageIndex=1;
    emit('handelPagination')
}
    function dateFormat(row,prop){
        if(row[prop]!=undefined){
            return timeFormat( row[prop].replace('T',' '),'YYYY-MM-DD HH:mm:ss');
        }
    }

</script>