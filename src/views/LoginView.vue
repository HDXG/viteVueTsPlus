<template>
    <div class="login-wrapper">
        <dir class="modal">
            <el-form ref="ruleFormRef" :model="user"  status-icon :rules="rule">
                <div class="title">Design </div>
                <el-form-item prop="AccountNumber">
                    <el-input  type="text" prefix-icon="UserFilled"  v-model="user.AccountNumber" />
                </el-form-item>
                <el-form-item prop="PassWord">
                    <el-input type="passWord" prefix-icon="View" v-model="user.PassWord" />
                </el-form-item>
                <el-form-item>
                    <ElButton class="btn-login" type="primary" @click="submitForm(ruleFormRef)">登录</ElButton>
                </el-form-item>
            </el-form>
        </dir>
    </div>
</template>
<script setup lang="ts">
import { ElMessage,FormInstance } from 'element-plus'
const user=ref({
    AccountNumber:'admin',
    PassWord:'1111',
});
var router=useRouter();
const ruleFormRef = ref<FormInstance>()
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
            ElMessage.success('登录成功');
            router.push('/');
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