<template>
    <el-container class="layout-container-demo" style="height: 100%">
    <el-aside :class="[isCollapse?'fold':'unfold']">
        <!--系统logo-->
        <div class="log">
            <img src="../assets/logo.png" alt="">
            <span v-if="!isCollapse">Design</span>
        </div>
        <!--导航区域-->
        <el-menu  :default-active="route.path" background-color="#001529" text-color="#FFF" :collapse="isCollapse"  :router="true">
            <menu-view v-for="item in menuData" :key="item.path" :item="item"></menu-view>
        </el-menu>
    </el-aside>
    </el-container>
</template>
<script  setup >
    import tabsView from './header/tabsView.vue'
    import menuView from './menu/menuView.vue'
    import { ElMessageBox } from "element-plus";
</script>

<style lang="scss" scoped>
.layout-container-demo
{
    background-color: #f5f7f9;
    .el-aside{
    width:210px;
    background-color:#001529;
    color: #fff;
    overflow-y: auto;
    transition: width 0.5s;
    .log{
        display: flex;
        align-items: center;
        font-size: 18px;
        height: 50px;
        color: #fff;
        img{
            margin: 0 16px;
            width: 32px;
            height: 32px;;
        }
    }
    &.fold{
        width:64px;
        
    }
    &.unfold{
        width:210px;
    }
    }
    .el-aside[data-v-7589de6a]{
        background-color:#001529;
    }
    .el-menu {
        height:calc(100vh - 50px);
        border-right: none;
    }

    .el-header{
        height: 50px;
        line-height: 50px;
        display: flex;
        justify-content: space-between;
        padding:0 20px;
        .nav-left{
            display: flex;
            align-items: center;
            .menu-fold{
            margin-right: 15px;
            font-size: 18px;
            display: flex;
            flex-direction: row;
            align-items: center;
            .icon{
                width: 25px;
                height:25px;
            }
            }
        }
        .user-info{
        .screenfull{
            line-height: 40px;
            margin-right: 15px;
        }
            .notice{
            line-height: 30px;
            margin-right: 15px;
            }
            .user-link{
            cursor: pointer;
            color: #409eff;
            }
        }
        }
        .icon{
                width: 20px;
                height: 20px;
            }
        .el-main {
        padding: 0;
        .el-scrollbar{
            height: calc(100vh - 106px);
        }
        }
        .toolbar {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        right: 20px;
        }
}
</style>