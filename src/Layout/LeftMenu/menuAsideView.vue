<template>
    <el-aside :class="[isCollapse?'fold':'unfold']">
        <el-scrollbar>
            <!--系统logo-->
            <div class="log">
                <SvgIcon icon-class="vue" size="25" v-if="isCollapse" />
                <div v-else><SvgIcon icon-class="vue" size="25"  />&emsp;Design</div>
            </div>
            <!--导航区域-->
            <el-menu  :default-active="route.path" background-color="#304156" text-color="#bfcbd9"  :collapse="isCollapse"  :router="true">
                <menu-view v-for="item in menuData" :key="item.MenuUrl" :item="item"></menu-view>
            </el-menu>
        </el-scrollbar>
    </el-aside>
</template>
<script setup lang="ts">

    import menuView from './menuView.vue'
    const route=useRoute();
    const props=defineProps({
        isCollapse:{type:Boolean,default:true},
        menuData:{type:Array<any>,default:[]}
    });

    const emit=defineEmits(['update:isCollapse','update:menuData']);

    const isCollapse=computed({
        get:()=>props.isCollapse,
        set:(val)=>{
            emit('update:isCollapse',val)
        }
    })
    const menuData=computed({
        get:()=>props.menuData,
        set:(val)=>{
            emit('update:menuData',val);
        }
    })

</script>

<style lang="less" scoped>
.el-aside{
    width:210px;
    background-color:#304156;
    color: #fff;
    overflow-y: auto;
    transition: width 0.4s;
    .log{
        position: absolute;
        top:0px;
        z-index:10;
        align-items: center;
        text-align: center;
        font-size: 18px;
        height: 50px;
        line-height: 50px;
        vertical-align: auto;
        color: #fff;
        transition: width 1s;
        width: 100%;
        background-color: #2d3748;
    }
    &.fold{
        width:65px;
    }
    &.unfold{
        width:200px;
    }
    }
    .el-aside[data-v-7589de6a]{
        background-color:#304156;
    }
    .el-menu {
        margin-top: 50px;
        border-right: none;
    }
        .toolbar {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        right: 20px;
        }
</style>