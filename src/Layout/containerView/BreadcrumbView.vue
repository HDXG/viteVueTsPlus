<template>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item  v-for="(item, index) in breadcrumbList" :key="index">
            <span class="no-redirect" v-if="index === breadcrumbList.length - 1">{{item.meta.title}}</span>
            <span class="redirect" v-else @click="handleRedirect(item.path)">{{ item.meta.title}}</span>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup lang='ts'>
    const route = useRoute()
    const router = useRouter()
    const breadcrumbList = ref<any>([])
    const initBreadcrumbList = () => {
        breadcrumbList.value = route.matched.filter(x=>x.path!='/Home');
    }
    const handleRedirect = (path) => {
        router.push(path)
    }
    watch(
        route,
        () => {
        initBreadcrumbList()
        },
        { deep: true, immediate: true }
    )
</script>
<style lang="scss" scoped>
.no-redirect {
    font-size: 15px;
    color: #97a8be;
    cursor: text;
}
.redirect {
    font-size: 15px;
    color: #666;
    font-weight: 600;
    cursor: pointer;
    &:hover {
        color: #304156;
    }
}
</style>