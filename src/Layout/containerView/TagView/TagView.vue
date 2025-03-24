<template>
    <div class="flex gap-2">
        
        <el-tag  
            class="tags-item" 
            v-for="(tag,index) in dynamicTags" :key="tag.path"
            :class="dynamicTagsChecked(index)?'tags-itemCheck':'tags-itemHover'"
            :closable="dynamicTags[index].name=='首页'?false:true"
            @click="handleClick(index)"  @close="handleClose(index)">
            <span :class="dynamicTagsChecked(index)?'item-active':''"></span>{{ tag.name }} 
        </el-tag>
    </div>
</template>
<script setup lang="ts">

import { tagList } from './tagView';
import routesFilters from '@/router/routerFiltering';
import { UseHomeStore } from '@/store';
    const dynamicTags=ref<Array<tagList>>([]);
    const selectIndex=ref<number>(0);
    const router=useRouter();

const homeStore = UseHomeStore();
    //删除TagView
    const handleClose=((index)=>{
        if(!dynamicTags.value[index].checked){
            //首先判断当前删除的顺序
            let _indexCheck=-1;
            dynamicTags.value.splice(index,1);
            dynamicTags.value.map((item,index1)=>{
                if(item.checked){
                    if(index>index1){
                        _indexCheck=index1;
                    }else if(index1>index) {
                        _indexCheck=dynamicTags.value.length-1;
                    }else{
                        _indexCheck=index;
                    }
                }
            })
            handleClick(_indexCheck);
            return;
        }
        let tagLength=dynamicTags.value.length;
        let _index=index==tagLength?tagLength-1:
            tagLength>index?index==tagLength-1?index-1:index:0;
        dynamicTags.value.splice(index,1);
        handleClick(_index);
    });
    //设置选中的tag
    const handleClick=(index:number)=>{
        dynamicTags.value.map((item)=>{
            item.checked=false;
        });
        dynamicTags.value[index].checked=true;
        homeStore.savaTagViewList(dynamicTags.value as tagList[]);
        router.push(dynamicTags.value[index].path);
    }
    function dynamicTagsChecked(index){
        return dynamicTags.value[index].checked
    }
    function handleLoad(){
        var tagListEn=routesFilters.routesFilters();
        if(tagListEn==null || tagListEn.length==0){
            dynamicTags.value.push({
                name:'首页',
                checked:true,
                path:'/Home',
                key:Math.random()
            } as tagList);
        }
        else
            dynamicTags.value=tagListEn as Array<tagList>;
        dynamicTags.value.map((item,index)=>{
            if(item.checked){
                return handleClick(index);
            }
        })
    }
    onMounted(()=>{
        handleLoad();
    });
    onBeforeRouteUpdate((route)=>{
        var index=-1;
        dynamicTags.value.map((item,_index)=>{
            if(item.path==route.path && item.name==route.meta.title){
                index=_index;
            }
        })
        if(index==-1){
            dynamicTags.value.push({
                name:route.meta.title,
                checked:true,
                path:route.path
            } as tagList);
            index=dynamicTags.value.length-1;
        }
        if(selectIndex.value==index)
            return;
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