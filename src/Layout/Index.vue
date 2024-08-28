<template>
    <el-container class="layout-container-demo" style="height: 100%">
    <el-aside :class="[isCollapse?'fold':'unfold']">
        <el-scrollbar>
            <!--系统logo-->
            <div class="log">
                <SvgIcon iocn-class="" />
                Design111
            </div>
            <!--导航区域-->
            <el-menu  :default-active="route.path" background-color="#304156" text-color="#bfcbd9"  :collapse="isCollapse"  :router="true">
                <menu-view v-for="item in menuData" :key="item.path" :item="item"></menu-view>
            </el-menu>
        </el-scrollbar>
    </el-aside>

    <el-container>
        <el-header style="border: 1px solid #e4e7ed;background-color: #FFF;">
            <div class="nav-left">
                <div class="menu-fold" @click="toggle"> <component class="icon" :is="iconXue"></component></div>
                <!-- <div class="bread" >
                    <breadcrumb-view/>
                </div> -->
            </div>
        </el-header>
        <!-- 主体内容 -->
        <el-main>
        <el-scrollbar>
            <router-view/>
        </el-scrollbar>
        </el-main>
    </el-container>

    </el-container>
</template>
<script  setup  lang="ts">
import menuView from '@/Layout/menu/menuView.vue'
const route=useRoute();
const menuData=reactive([
  {
    "title": "系统设置",
    "path": "/xitong",
    "icon": "AlarmClock",
    "children": [
      {
        "title": "用户管理",
        "path": "/Login1",
        "icon": "AlarmClock",
        "vueName": "User",
        "children": []
      },
      {
        "title": "菜单管理",
        "path": "/Login2",
        "icon": "AlarmClock",
        "vueName": "PopedomView",
        "children": []
      },
      {
        "title": "角色管理",
        "path": "/Login3",
        "icon": "AlarmClock",
        "vueName": "role",
        "children": []
      }
    ]
  },
  {
    "title": "日志管理",
    "path": "/Login4",
    "icon": "AlarmClock",
    "vueName": "Serilog",
    "children": []
  },
  {
    "title": "系统设置",
    "path": "/xitong",
    "icon": "AlarmClock",
    "children": [
      {
        "title": "用户管理",
        "path": "/Login1",
        "icon": "AlarmClock",
        "vueName": "User",
        "children": []
      },
      {
        "title": "菜单管理",
        "path": "/Login2",
        "icon": "AlarmClock",
        "vueName": "PopedomView",
        "children": []
      },
      {
        "title": "角色管理",
        "path": "/Login3",
        "icon": "AlarmClock",
        "vueName": "role",
        "children": []
      }
    ]
  },
  {
    "title": "日志管理",
    "path": "/Login4",
    "icon": "AlarmClock",
    "vueName": "Serilog",
    "children": []
  },
  {
    "title": "系统设置",
    "path": "/xitong",
    "icon": "AlarmClock",
    "children": [
      {
        "title": "用户管理",
        "path": "/Login1",
        "icon": "AlarmClock",
        "vueName": "User",
        "children": []
      },
      {
        "title": "菜单管理",
        "path": "/Login2",
        "icon": "AlarmClock",
        "vueName": "PopedomView",
        "children": []
      },
      {
        "title": "角色管理",
        "path": "/Login3",
        "icon": "AlarmClock",
        "vueName": "role",
        "children": []
      }
    ]
  },
  {
    "title": "日志管理",
    "path": "/Login4",
    "icon": "AlarmClock",
    "vueName": "Serilog",
    "children": []
  },
  {
    "title": "系统设置",
    "path": "/xitong",
    "icon": "AlarmClock",
    "children": [
      {
        "title": "用户管理",
        "path": "/Login1",
        "icon": "AlarmClock",
        "vueName": "User",
        "children": []
      },
      {
        "title": "菜单管理",
        "path": "/Login2",
        "icon": "AlarmClock",
        "vueName": "PopedomView",
        "children": []
      },
      {
        "title": "角色管理",
        "path": "/Login3",
        "icon": "AlarmClock",
        "vueName": "role",
        "children": []
      }
    ]
  },
  {
    "title": "日志管理",
    "path": "/Login4",
    "icon": "AlarmClock",
    "vueName": "Serilog",
    "children": []
  },
]);

const isCollapse=ref(false);
const iconXue=ref('Fold');
function toggle(){
    isCollapse.value=!isCollapse.value;
    iconXue.value=isCollapse.value?'Expand':'Fold';
}
onMounted(()=>{
    console.log(1);
    });
</script>

<style lang="scss" scoped>
.layout-container-demo
{
    background-color: #f5f7f9;
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
        display: flex;
        align-items: center;
        text-align: center;
        font-size: 18px;
        height: 50px;
        color: #fff;
        width: 100%;
        background-color: #263445;
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
        background-color:#304156;
    }
    .el-menu {
        margin-top: 50px;
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