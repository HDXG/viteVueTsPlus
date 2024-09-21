<template>
    <div class="login-wrapper">
        <dir class="modal">
            <el-form ref="ruleFormRef" :model="user"  status-icon :rules="rule">
                <div class="title">Design </div>
                <el-form-item prop="AccountNumber">
                    <el-input  type="text" clearable  v-model="user.AccountNumber">
                        <template #prefix>
                            <SvgIcon icon-class="UserFilled"</SvgIcon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="PassWord">
                    <el-input type="passWord"  v-model="user.PassWord" show-password > 
                        <template #prefix>
                            <SvgIcon icon-class="View" />
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <ElButton class="btn-login" type="primary" @click="submitForm(ruleFormRef)">登录</ElButton>
                </el-form-item>
            </el-form>
        </dir>
    </div>
</template>
<script setup lang="ts">
import {loginUserDto, loginUserRequest} from '@/Services/UserService/model';
import { ElMessage,FormInstance } from 'element-plus'
import {userService} from '@/Services/public-Index';
const userApi=new userService();
const user=reactive<loginUserDto>({
        AccountNumber:'admin',
        PassWord:'admin111',
    });
var router=useRouter();
var store=useStore();
const ruleFormRef = ref<FormInstance>();
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
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid) => {
        if (valid) {
            userApi.handleUserLogin(user).then((res:loginUserRequest)=>{
                ElMessage.success('登录成功');
                res.token='1';
                store.commit('home/savaUserInfo',res);
                router.push('/');
            });
        }else
            ElMessage.error('请填写完整');
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
    background-image: url('../assets//icons/LoginBack.svg');
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