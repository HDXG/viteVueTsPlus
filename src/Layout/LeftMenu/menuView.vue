<template>
    <el-sub-menu v-if="item.children!=undefined && item.children.length > 0" :index="item.path">
        <template #title>
            <svg-icon :icon-class="item.icon" size="15"></svg-icon>
            <span>{{ item.title }}</span>
        </template>
        <!-- 组件自调 -->
        <s-menu
            v-for="ele in item.children"
            :index="ele.path"
            :key="ele"
            :item="ele"
            />
    </el-sub-menu>
        <el-menu-item  v-else :index="item.path">
            <svg-icon :icon-class="item.icon" size="15"></svg-icon>
            <span>{{ item.title }}</span>
        </el-menu-item>

</template>
<script setup>
defineOptions({
    name: "SMenu",//组件命名
});
defineProps(["item"]);//父组件向子组件传递的数据
</script>
<style scoped>
    .icon {
        width: 20px;
        height: 20px;
    }
</style>