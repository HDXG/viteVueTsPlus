<template>
    <el-container class="layout-container-demo" style="height: 100%">
      <menuAsideView v-model:isCollapse="isCollapse" v-model:menuData="menuData"/>
      <containerView v-model:iconXue="iconXue" @toggle="toggle"/>
    </el-container>
</template>
<script  setup  lang="ts">
import containerView from '@/Layout/containerView/index.vue'
import menuAsideView from './LeftMenu/menuAsideView.vue';
import { loginUserMenuDto } from '@/Services/UserService/model';
import{userService} from '@/Services/public-Index'
const store=useStore();
const menuData=ref<loginUserMenuDto[]>([]);
const isCollapse=ref(false);
const iconXue=ref('Fold');
const userApi=new userService();
function toggle(){
    isCollapse.value=!isCollapse.value;
    iconXue.value=isCollapse.value?'Expand':'Fold';
}
watch(menuData,(val)=>{
  if(val.length==0){
    handleRefreshMenu();
  }
})
watch(()=>store.getters['home/getMenuList'],(val)=>{
  if(val.length==0){
    handleRefreshMenu();
  }
})
function handleRefreshMenu(){
  let Id=store.getters["home/getUserInfo"].Id;
    userApi.getByUserIdMenuList({Id}).then(res=>{
      store.commit('home/savaUserMenuList',res);
      menuData.value=res;
    });
}
  onMounted(()=>{
    menuData.value=store.getters["home/getMenuList"];
  });
</script>

<style lang="scss" scoped>
  .layout-container-demo
  {
    background-color: #f5f7f9;    
  }
</style>