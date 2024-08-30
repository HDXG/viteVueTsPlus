<template>
    <el-dropdown trigger="click" @command="handelCommand" style="margin-top: 13px;;">
        <div class="user-link "  >
            <img src="../../../assets/icons/User.svg" width="20" height="20" alt="">&nbsp;
            <span> Design</span>
        </div>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item command="1">测试1</el-dropdown-item>
                <el-dropdown-item command="2">退出</el-dropdown-item>
                </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>
<script lang="ts" setup>
import { ElMessageBox } from 'element-plus';


var router=useRouter();

function handelCommand(value){
  //退出 清空localSotre
    if(value==2){
        ElMessageBox.confirm(
        '退出需要重新登录，是否继续?',
        '温馨提示',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    ).then(() => {
      // store.commit('saveUserInfo',null);
      // store.commit('saveMenuList',[]);
      // store.commit("savaToken",'');
      // store.commit('saveTabsList',[]);
      // store.commit('savaRoleBtn',[]);
        router.push('/Login');
    })
    }
}
</script>