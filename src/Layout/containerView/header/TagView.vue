<template>
    <div class="flex gap-2">
        <el-tag  
            class="tags-item" 
            v-for="(tag,index) in dynamicTags" :key="tag.name"
            :class="dynamicTagsChecked(index)?'tags-itemCheck':'tags-itemHover'"
            :closable="dynamicTags[index].name=='首页'?false:true"
            @click="handleClick(index)"  @close="handleClose(tag)"
        >
            <span :class="dynamicTagsChecked(index)?'item-active':''"></span>{{ tag.name }} 
        </el-tag>
    </div>
</template>
<script setup lang="ts">
    const dynamicTags=reactive<Array<tagList>>([{
        name:'首页',
        checked:true
    },
    {name:'测试1',checked:false},
    {name:'测试2',checked:false}] as Array<tagList>);

    const handleClose=((tag)=>{
        console.log(tag);
    });
    const handleClick=(index:number)=>{
        dynamicTags.map((item)=>{
            item.checked=false;
        });
        dynamicTags[index].checked=true;
        console.log(index);
    }
    function dynamicTagsChecked(index){
        return dynamicTags[index].checked
    }


interface tagList{
    name:string,
    checked:boolean
}
</script>
<style lang="less" scoped>
    ::v-deep .tags-itemCheck .el-tag__close {  
            color: #FFF; /* 红色关闭按钮 */  
        &:hover {  
            background-color: #fff;
            color: #409EFF;
        }  
    } 
    ::v-deep .tags-itemHover .el-tag__close{
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