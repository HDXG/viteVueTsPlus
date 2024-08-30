<template>
    <div style="padding: 20px;">
        <h1>图标选择器</h1>
        <el-popover :visible="iconStrSuffix"  placement="bottom"  width="500">
            <template #reference>
                <el-input
                    v-model="iconStr" style="width:500px;" readonly
                    placeholder="请选择图标" @click="iconStrSuffix=!iconStrSuffix">
                    <template #prepend>
                        <SvgIcon icon-class="User" size="20"></SvgIcon>
                    </template>
                    <template #suffix>
                        <SvgIcon :icon-class="iconStrSuffix?'ArrowUp':'ArrowDown'" size="20"></SvgIcon>
                    </template>
                </el-input>
            </template>
            <el-input class="p-2"  placeholder="搜索图标" clearable />
            <el-scrollbar height="300px">
                <ul class="icon-list">
                    <li class="icon-item"   v-for="(iconName, index) in iconFilterNameList" :key="index">
                        <el-tooltip :content="iconName" placement="bottom" effect="light">
                            <svg-icon color="var(--el-text-color-regular)" :icon-class="iconName" size="20" />
                        </el-tooltip>
                    </li>
                </ul>
            </el-scrollbar>
        </el-popover>
    </div>
</template>
<script  setup  lang="ts">
    import {onMounted, reactive, ref} from 'vue'
    const iconStrSuffix=ref<boolean>(false);
    const iconStr=ref<string>('User');

    const iconNameList=ref<string[]>([]);
    const iconFilterNameList=ref<string[]>([]);

    function loadIcons() {
        const icons = import.meta.glob('../../assets/icons/*.svg');
        for (const icon in icons) {
            const iconName = icon.split('assets/icons/')[1].split('.svg')[0];
            console.log(iconName);
            iconNameList.value.push(iconName);
        }
        iconFilterNameList.value=iconNameList.value;

    }
    onMounted(()=>{
        loadIcons();
    })
</script>

<style lang="less" scoped>
    ::v-deep .el-input__wrapper{
        cursor: pointer;
    }
    ::v-deep .el-input__inner{
        cursor: pointer;
    }
    .icon-list{
        padding: 5px;;
    }
    .icon-item{
        border:1px solid #e1e1e1;
        padding:7px;
        margin: 5px;
        list-style: none;
        float: left;
    }.icon-item:hover{
        border: 1px solid #409EFF;
    }
</style>