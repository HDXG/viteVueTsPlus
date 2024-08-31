<template>
    <el-container class="layout-container-demo" style="height: 100%">
      <el-aside :class="[isCollapse?'fold':'unfold']">
          <el-scrollbar>
              <!--系统logo-->
              <div class="log">
                  <SvgIcon icon-class="vue" size="25" v-if="isCollapse" />
                  <div v-else><SvgIcon icon-class="vue" size="25"  />&emsp;Design</div>
              </div>
              <!--导航区域-->
              <el-menu  :default-active="route.path" background-color="#304156" text-color="#bfcbd9"  :collapse="isCollapse"  :router="true">
                  <menu-view v-for="item in menuData" :key="item.path" :item="item"></menu-view>
              </el-menu>
          </el-scrollbar>
      </el-aside>
      <containerView v-model:iconXue="iconXue" @toggle="toggle"/>
    </el-container>
</template>
<script  setup  lang="ts">
import menuView from '@/Layout/LeftMenu/menuView.vue'
import containerView from '@/Layout/containerView/index.vue'
const route=useRoute();
const menuData=reactive([
  {
    "title": "系统设置",
    "path": "/xitong",
    "icon": "House",
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
    "path": "/404",
    "icon": "House",
    "vueName": "Serilog",
    "children": []
  },
  {
    "title": "图标选择器",
    "path": "/iconSelect",
    "icon": "House",
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
        align-items: center;
        text-align: center;
        font-size: 18px;
        height: 50px;
        line-height: 50px;
        vertical-align: auto;
        color: #fff;
        transition: margin-left 1s;
        width: 100%;
        background-color: #2d3748;
    }
    &.fold{
        width:65px;
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
        .toolbar {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        right: 20px;
        }
      
    
}
</style>