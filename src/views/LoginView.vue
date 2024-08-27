<template>
    <div class="login-wrapper">
        <dir class="modal">
            <el-form ref="userForm" :model="user" status-icon :rules="rule">
                <div class="title">Design</div>
                <el-form-item prop="AccountNumber">
                    <el-input  type="text" prefix-icon="UserFilled"  v-model="user.AccountNumber" />
                </el-form-item>
                <el-form-item prop="PassWord">
                    <el-input type="passWord" prefix-icon="View" v-model="user.PassWord" />
                </el-form-item>
                <el-form-item>
                    <el-button class="btn-login" type="primary" @click="BtnLogin">登录</el-button>
                </el-form-item>
            </el-form>
        </dir>
    </div>
</template>
<script setup>
import {ref} from 'vue'
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex'
const router=useRouter();
const store=useStore();
const user=ref({
    AccountNumber:'admin',
    PassWord:'admin11',})
const userForm=ref(null)
const rule=ref({
    AccountNumber:[
        {
            required:true,message:'请输入用户名',trigger:'blur'
        }],
        PassWord:[
        {
            required:true,message:'请输入密码',trigger:'blur'
        }]
})
function BtnLogin(){
    userForm.value.validate((valid)=>{
        if(valid){

        }
    })
}
</script>
<style lang="scss" scoped>
.login-wrapper{
    justify-content: center;
    align-items: center;
    display:flex;
    background-color: #f9fcff;
    width: 100%;
    height: calc(100vh - 20px);
    overflow: hidden;
    .modal{
        width: 450px;
        padding: 50px;
        background-color: #fff;
        border-radius: 4px;
        box-shadow: 0px 0px 10px 3px #c7c9cb4d;
        .title{
            font-size: 50px;
            line-height: 1.5;
            text-align: center;
            margin-bottom: 30px;
        }
        .btn-login{
            width: 100%;
        }
    }
}
</style>