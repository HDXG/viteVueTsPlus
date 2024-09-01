<template>
    <span @click="handleFullScreen" id="screenFul">
        <el-tooltip class="box-item" effect="dark" :content="icon?'退出全屏':'全屏显示'" placement="bottom">
            <SvgIcon :icon-class="icon ? 'exitfullscreennew' : 'fullscreennew'" size="20" />
        </el-tooltip>
    </span>
</template>
<script setup lang="ts">
    import {ref,onMounted,onBeforeMount} from 'vue'
    import screenfull from 'screenfull'
    const icon = ref(screenfull.isFullscreen)
    const handleFullScreen = () => {
        if (screenfull.isEnabled) {
            screenfull.toggle()
        }
    }
    const changeIcon = () => {
        icon.value = screenfull.isFullscreen;
    }
    onMounted(() => {
        screenfull.on('change', changeIcon)
    })
    onBeforeMount(() => {
        screenfull.off('change',changeIcon)
    })
</script>
