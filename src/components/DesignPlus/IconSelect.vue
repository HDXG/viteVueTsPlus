<template>
    <div ref="iconSelectorRef">
        <el-popover :visible="iconStrSuffix" placement="bottom" width="500">
            <template #reference>
                <el-input v-model="iconStr" style="width:200px;" readonly placeholder="请选择图标"
                    @click="iconStrSuffix = !iconStrSuffix">
                    <template #prepend>
                        <SvgIcon :icon-class="iconStr" size="20"></SvgIcon>
                    </template>
                    <template #suffix>
                        <SvgIcon :icon-class="iconStrSuffix ? 'ArrowUp' : 'ArrowDown'" size="20"></SvgIcon>
                    </template>
                </el-input>
            </template>
            <el-input v-model="searchIcon" placeholder="搜索图标" @input="handleSearchIcon" clearable />
            <el-scrollbar height="300px">
                <ul class="icon-list">
                    <li class="icon-item" @click="iconSelect(iconName)" v-for="(iconName, index) in iconFilterNameList"
                        :key="index">
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
    //import { ElMessage } from 'element-plus';
    import {onMounted, ref} from 'vue'
    //import useClipboard from 'vue-clipboard3' 
    //import { onClickOutside } from '@vueuse/core'
    const iconStrSuffix=ref<boolean>(false);
    const iconNameList=ref<string[]>([]);
    const iconFilterNameList=ref<string[]>([]);
    const iconSelectorRef=ref(null);
    const searchIcon=ref<string>('');

    const props=defineProps<{
        icon:string,
    }>();
    const emit=defineEmits(['update:icon']);
    const iconStr=computed({
        get:()=>props.icon,
        set:(val)=>{
            emit('update:icon',val);
        }
    })
    //const { toClipboard } = useClipboard()
    //加载图标内容
    function loadIcons() {
        const icons = import.meta.glob('../../assets/icons/*.svg');
        for (const icon in icons) {
            const iconName = icon.split('assets/icons/')[1].split('.svg')[0];
            iconNameList.value.push(iconName);
        }
        iconFilterNameList.value=iconNameList.value;
    }
    //选中的图标内容
    const  iconSelect=async (iconName)=>{
        iconStr.value=iconName;
        iconStrSuffix.value=false;
        // try{
        //     await toClipboard(iconName);  
        //     iconStr.value=iconName;
        //     searchIcon.value='';
        //     handleSearchIcon();
        //     ElMessage.success('复制成功');
        // }catch(e){
        //     ElMessage.error('复制失败');
        // }
    }
    //搜索图标
    function handleSearchIcon(){
        if(searchIcon.value=="")
            iconFilterNameList.value=iconNameList.value;
        else
            iconFilterNameList.value=iconNameList.value.filter(iconName =>
                iconName.includes(searchIcon.value)
            );
    }
    // onClickOutside(iconSelectorRef, () => (
    //     iconStrSuffix.value = false
    // ));
    onMounted(()=>{
        loadIcons();
    })
</script>

<style lang="less" scoped>
    :deep(.el-input__wrapper){
        cursor: pointer;
    }
    :deep(.el-input__inner){
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