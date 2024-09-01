<template>
    <el-result title="异常信息" sub-title="请联系管理员">
        <template #icon>
            <SvgIcon icon-class="404"  size="500" />
        </template>
        <template #extra>
            <el-button type="primary" @click="router.push('/Home')" >返回首页</el-button>
        </template>
    </el-result>
</template>
<script setup lang="ts">
    const router=useRouter();
</script>