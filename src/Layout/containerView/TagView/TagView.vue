<template>
    <div class="flex gap-2">
        
        <el-tag  
            class="tags-item" 
            v-for="(tag,index) in dynamicTags" :key="tag.name"
            :class="dynamicTagsChecked(index)?'tags-itemCheck':'tags-itemHover'"
            :closable="dynamicTags[index].name=='首页'?false:true"
            @click="handleClick(index)"  @close="handleClose(index)">
            <span :class="dynamicTagsChecked(index)?'item-active':''"></span>{{ tag.name }} 
        </el-tag>
    </div>
</template>
<script setup lang="ts">

import { tagList } from './tagView';
import storage from '@/util/localStorageExpand/storage';
import { keyEnum } from '@/util/localStorageExpand/keyEnum';
    const dynamicTags=ref<Array<tagList>>([]);
    const selectIndex=ref<number>(0);
    const selectIndexClear=ref<number>(0);
    var router=useRouter();
    //删除TagView
    const handleClose=((index)=>{
        let tagLength=dynamicTags.value.length;
        let _index=index==tagLength?tagLength-1:
            tagLength>index?index==tagLength-1?index-1:index:0;
        dynamicTags.value.splice(index,1);
        if(selectIndexClear.value!=_index && _index!=0 && selectIndexClear.value!=dynamicTags.value.length){
            _index=selectIndexClear.value;
        }
        handleClick(_index);
    });
    //设置选中的tag
    const handleClick=(index:number)=>{
        selectIndexClear.value=index;
        dynamicTags.value.map((item)=>{
            item.checked=false;
        });
        dynamicTags.value[index].checked=true;
        storage.setItem(keyEnum.tagView,dynamicTags.value);
        if(selectIndex.value!=index)
            router.push(dynamicTags.value[index].path);
    }
    function dynamicTagsChecked(index){
        return dynamicTags.value[index].checked
    }
    onMounted(()=>{
        var tagListEn=storage.getItem(keyEnum.tagView);
        if(tagListEn==null){
            dynamicTags.value.push({
                name:'首页',
                checked:true,
                path:'/Home'
            } as tagList);
        }
        else
            dynamicTags.value=tagListEn as Array<tagList>;
        dynamicTags.value.map((item,index)=>{
            if(item.checked){
                return handleClick(index);
            }
        })
    });
    onBeforeRouteUpdate((route)=>{
        var index=-1;
        dynamicTags.value.map((item,_index)=>{
            if(item.path==route.path && item.name==route.name){
                index=_index;
            }
        })
        if(index==-1){
            dynamicTags.value.push({
                name:route.name,
                checked:true,
                path:route.path
            } as tagList);
            index=dynamicTags.value.length-1;
        }
        selectIndex.value=index;
        handleClick(index);
        
    })


</script>
<style lang="less" scoped>
    :deep(.tags-itemCheck .el-tag__close) {  
            color: #FFF; /* 红色关闭按钮 */  
        &:hover {  
            background-color: #fff;
            color: #409EFF;
        }  
    } 
    :deep(.tags-itemHover .el-tag__close){
            color: #000;
        &:hover {  
            color: #FFF;
            background-color: #409EFF;
        }  
    } 
    .flex{
        background-color: #FFF;
        height: 35px;
        border-bottom: 1px solid #dcdfe6;
        line-height: 35px;
        .tags-item{
            background-color: #FFF;
            color: #000;
            margin-left: 10px;;
            padding:7px;
            cursor: pointer;
            
        }
        & .tags-itemCheck{
            background-color: #409EFF;
            color: #FFF;
            .el-tag .el-tag__close{
                color:#000;
            }
        }
        .tags-itemHover:hover{
            color: #409EFF;
        }
        .item-active{
            display:inline-block;
            width: 8px;
            height: 8px;
            margin-right: 5px;
            background-color: #FFF;
            border-radius: 50%;
        }
        // .tags-item:hover{
        //     color:#409EFF;
        // }
    }
</style>