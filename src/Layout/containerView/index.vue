<template>
    <el-container>
        <el-header style="border: 1px solid #e4e7ed;background-color: #FFF;">
            <div class="nav-left">
                <div class="menu-fold" @click="toggle"> <component class="icon" :is="iconXue"></component></div>
                <div  > <BreadcrumbView /></div>
            </div>
            <div class="user-info">
                <div class="navItem" style="width: 40px;"><screenfullView /></div>
                <div class="navItem"style="width:90px;"><setupUser/> </div>
            </div>
        </el-header>
        <el-main>
            <el-scrollbar>
                <router-view/>
            </el-scrollbar>
        </el-main>
    </el-container>
</template>
<script setup lang="ts">
    import BreadcrumbView from './header/BreadcrumbView.vue'
    import screenfullView from './header/screenfullView.vue'
    import setupUser from './header/setupUser.vue';
    const props=defineProps({
        iconXue:{type:String,default:''}
    })
    const emit=defineEmits(['update:iconXue','toggle'])

    const iconXue=computed({
        get:()=>props.iconXue,
        set:(val)=>{
            emit('update:iconXue',val)
        }
    })

    const toggle=()=>{
        emit('toggle');
    }
</script>
<style lang="less" >
.el-header{
    height: 50px;
    line-height: 50px;
    display: flex;
    justify-content: space-between;
    padding:0 20px;
    position: relative;
    z-index: 9;
    .nav-left{
        display: flex;
        align-items: center;
        .menu-fold{
            margin-right: 15px;
            font-size: 18px;
            display: flex;
            flex-direction: row;
            align-items: center;
            .icon{
                width: 25px;
                height:25px;
            }
        }
    }
    .user-info{
        align-items: center; 
        display: flex;
        text-align: center;
        .navItem{
            height: 50px;
            line-height: 50px;
        }
        .navItem:hover{
            background-color:#e1e1e1;
        }
            .screenfull{
                line-height: 40px;
                margin-right: 15px;
        }
        .notice{
            line-height: 30px;
            margin-right: 15px;
        }
        .user-link{
            display: flex;  
            align-items: center; /* 垂直居中 */  
            display: flex;
            font-size: 16px;
            cursor: pointer;
            color: #0f0f0f;
        }
        }
    }
    .el-main {
        padding: 0;
        .el-scrollbar{
            font-weight:bold;
            height: calc(100vh - 60px);
        }
    }
</style>