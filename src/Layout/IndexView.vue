<template>
    <el-container class="layout-container-demo" style="height: 100%">
      <menuAsideView v-model:isCollapse="isCollapse" v-model:menuData="menuData"/>
      <containerView v-model:iconXue="iconXue" @toggle="toggle"/>
    </el-container>
</template>
<script  setup  lang="ts">
import containerView from '@/Layout/containerView/index.vue'
import menuAsideView from './LeftMenu/menuAsideView.vue';
import { loginUserMenuOutPut } from '@/api/UserService/model';
import { UseHomeStore } from '@/store';
const homeStore=UseHomeStore();
const menuData = ref<loginUserMenuOutPut[]>(homeStore.menuList);
const isCollapse=ref(false);
const iconXue=ref('Fold');
function toggle(){
    isCollapse.value=!isCollapse.value;
    iconXue.value=isCollapse.value?'Expand':'Fold';
}
watch(() => homeStore.menuList,(val)=>{
  if(val.length==0){
    handleRefreshMenu();
  }
  else
    menuData.value=val;
})
function handleRefreshMenu(){
  homeStore.getUserMenuList();
}
onMounted(()=>{
  handleRefreshMenu();
});
</script>

<style lang="scss" scoped>
  .layout-container-demo
  {
    background-color: #f5f7f9;    
  }
</style>