<template>
    <el-form style="padding:10px;background-color:#fff" :inline="true">
        <el-form-item label="菜单名称" prop="name">
            <el-input v-model="getMenuSelect.MenuName" placeholder="请输入菜单名称" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="handleLoad();ElMessage.success('查询成功')">查询</el-button>
            <el-button @click="getMenuSelect.MenuName ='';handleLoad();ElMessage.success('重置成功')">重置</el-button>
        </el-form-item>
    </el-form>

    <TableView v-model:tableOption="tableConfig" @handelPagination="handelPagination">
        <template #header>
            <div style="margin-bottom: 10px;">
                <BtnAdd @handleAdd="handleAdd"></BtnAdd>
            </div>
        </template>
        <template #menuType="{row}">
            <el-tag :key="row.IsStatus" :type="row.MenuType==0?'warning':row.MenuType==1?'success':'primary'"
                size="small">
                {{ row.MenuType==0?'目录':row.MenuType==1?"菜单":"按钮" }}
            </el-tag>
        </template>
        <template #IsStatus="{row}">
            <el-tag :key="row.IsStatus" :type="row.IsStatus ?'success':'danger'" size="small">
                {{ row.IsStatus?'显示':'隐藏' }}
            </el-tag>
        </template>
        <template #IconName="{row}">
            <SvgIcon v-if="row.MenuType!=2" :icon-class="row.Icon" size="20"></SvgIcon>
        </template>
        <template #handleBtn="{row}">
            <BtnAction v-model:rowDto="menuPopedom" @handle-delete="handleDelete(row)" @handle-edit="handleEdit(row)"
                @handle-view="handleView(row)"></BtnAction>
        </template>
    </TableView>

    <el-drawer v-model="dialogVisible" :title="AddModifyView==1?'新增菜单':AddModifyView==2?'编辑菜单':'查看菜单'">
        <div>
            <el-form ref="ruleFormRef" :model="menuPopedom" :rules="rules" label-width="auto">
                <el-form-item v-if="menuPopedom.MenuType!=0" label="父级菜单" prop="ParentId">
                    <el-tree-select v-model="menuPopedom.ParentId" check-strictly :data="menuTreeSelectData"
                        :render-after-expand="false" />
                </el-form-item>
                <el-form-item :label="menuPopedom.MenuType==0 || menuPopedom.MenuType==1?'菜单名称':'按钮名称'" prop="MenuName">
                    <el-input :readonly="AddModifyView==3" v-model="menuPopedom.MenuName" />
                </el-form-item>
                <el-form-item label="菜单类型" prop="MenuType">
                    <el-radio-group v-model="menuPopedom.MenuType" @change="radioChangeType(menuPopedom.MenuType)">
                        <el-radio :value="0">目录</el-radio>
                        <el-radio :value="1">菜单</el-radio>
                        <el-radio :value="2">按钮</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item v-if="menuPopedom.MenuType!=2" label="路由名称" prop="RouteName">
                    <el-input :readonly="AddModifyView == 3" v-model="menuPopedom.RouteName" />
                </el-form-item>
                <el-form-item v-if="menuPopedom.MenuType!=2" label="路由路径" prop="MenuPath">
                    <el-input :readonly="AddModifyView==3" v-model="menuPopedom.MenuPath" />
                </el-form-item>
                <el-form-item v-if="menuPopedom.MenuType!=2" label="组件路径" prop="ComponentPath">
                    <el-input :readonly="AddModifyView == 3" v-model="menuPopedom.ComponentPath" />
                </el-form-item>
                <el-form-item v-if="menuPopedom.MenuType!=2" label="图标选择" prop="Icon">
                    <IconSelect v-model:icon="menuPopedom.Icon"></IconSelect>
                </el-form-item>
                <el-form-item v-if="menuPopedom.MenuType==2" label="权限标识" prop="PermissionKey">
                    <el-input :readonly="AddModifyView == 3" v-model="menuPopedom.PermissionKey" />
                </el-form-item>
                <el-form-item label="备注说明">
                    <el-input :readonly="AddModifyView == 3" v-model:model-value="menuPopedom.Remark"
                        :autosize="{ minRows: 2, maxRows: 3 }" type="textarea" />
                </el-form-item>
                <el-form-item label="显示状态">
                    <el-radio-group :disabled="AddModifyView == 3" v-model="menuPopedom.IsStatus">
                        <el-radio :value="true">启用</el-radio>
                        <el-radio :value="false">隐藏</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="显示顺序">
                    <el-input-number :readonly="AddModifyView == 3" :min="0" v-model="menuPopedom.OrderIndex" />
                </el-form-item>
            </el-form>
        </div>
        <template #footer>
            <div style="flex:auto">
                <el-button @click="dialogVisible=false">取消</el-button>
                <el-button type="primary" @click="confirmClick(ruleFormRef)">确定</el-button>
            </div>
        </template>
    </el-drawer>
</template>
<script setup lang="ts">
import {ElMessage, FormInstance} from 'element-plus'
import { tableConfigs, tableOptions } from '@/components/DesignPlus/tableView';
import { SystemMenuDto, GetSystemMenuListInputDto } from '@/api/MenuPermissService/model';
import {menuService} from '@/api/public-Index';
import { treeSelectDto } from '@/api/model';
import { confirmDelete } from '@/components/DesignPlus/ElConfirm';
import handleRefreshMenu from '@/util/Public-index'
import { useMessage } from '@/components/DesignPlus/EMessage';

const apiMenu=new menuService();
const AddModifyView=ref<number>(1);
const dialogVisible=ref<boolean>(false);
const ruleFormRef=ref<FormInstance>();
const menuTreeSelectData=ref<treeSelectDto[] | any>([]);

const getMenuSelect = reactive<GetSystemMenuListInputDto>({
    MenuName:'',
    MenuPath:'',
    PageIndex:1,
    PageSize:10,
})
//00000000-0000-0000-0000-000000000000
const menuPopedom = ref<SystemMenuDto>({
    Id:'',
    MenuName: '',
    MenuPath: '',
    ParentId: '',
    Icon: '',
    MenuType:0,
    ComponentPath: '',
    RouteName: '',
    ExternalLink: false,
    Remark: '',
    OrderIndex: 0,
    IsStatus : true,
    PermissionKey: '',
    Childrens: [] as SystemMenuDto[]
})
const rules=ref({
    MenuName:[{ required: true, message: '请输入名称', trigger: 'blur' }],
    RouteName:[{required:true,message:'请输入路由名称',trigger: 'blur'}],
    MenuPath:[{required:true,message:'请输入路由路径',trigger: 'blur'}],
    ComponentPath:[{required:true,message:'请输入组件路径',trigger: 'blur'}],
    PermissionKey:[{required:true,message:'请输入权限标识',trigger: 'blur'}],
});

const tableConfig=reactive<tableConfigs>({
    pageIndex:1,
    pageSize:10,
    totalCount:0,
    Items:[],
    border:true,
    rowKey:'Id',
    tableColumn:[
            {
                label:'菜单名称',
                prop:'MenuName',
                width:150,
            },
            {
                label:'类型',
                slotName:'menuType',
                width:70,
            },
            {
                label:'路由名称',
                prop:'RouteName',
                width:150,
            },
            {
                label:'路由路径',
                prop:'MenuPath',
            },
            {
                label:'组件路径',
                prop:'ComponentPath',
            },
            {
                label:'图标',
                width:100,
                slotName:'IconName'
            },
            {
                label:'权限标识',
                prop:'PermissionKey',
                width:180,
            },
            {
                label:'备注说明',
                prop:'Remark',
                width:180,
            },
            {
                label:'状态',
                width:90,
                slotName:'IsStatus',
            },
            {
                label:'排序',
                width:100,
                prop:'OrderIndex',
            },
            {
                label:'操作',
                width:170,
                slotName:'handleBtn'
            }
    ] as tableOptions[]
});

watch(tableConfig,(val)=>{
    getMenuSelect.PageIndex=val.pageIndex;
    getMenuSelect.PageSize=val.pageSize;
})

const confirmClick=(ruleFormRef:FormInstance | undefined)=>{
    if(AddModifyView.value==3)
        return dialogVisible.value=false;
    if(!ruleFormRef)
        return;
    ruleFormRef.validate((val)=>{
        if(val){
            apiMenu.ModifyAdd(menuPopedom.value,AddModifyView.value).then(res=>{
                if(res){
                    ElMessage.success(AddModifyView.value==1?"新增成功":"修改成功");
                    dialogVisible.value=false;
                    handleLoad();
                    if(AddModifyView.value==2){
                        handleRefreshMenu.handleRefreshMenu();
                    }
                }
            })
        }
    })
}

//菜单类型按钮
const radioChangeType=(val:number)=>{
    switch(val){
        case 0:
            menuPopedom.value.ParentId = '00000000-0000-0000-0000-000000000000';
            break;
        case 1:
            menuPopedom.value.ParentId = "";
            break;
        case 2:
            menuPopedom.value.RouteName = '';
            menuPopedom.value.MenuPath = '';
            menuPopedom.value.ComponentPath = '';
            menuPopedom.value.Icon = '';
            break;
    }
}

//删除
const handleDelete=(row)=>{
    confirmDelete(()=>{
        apiMenu.Delete(row.Id).then(res=>{
            if(res){
                useMessage().success('删除成功');
                handleLoad();
            }
        })
    })
}
//修改
const handleEdit=(row)=>{
    handleGet(row.Id,2);
}
//查看
const handleView=(row)=>{
    
    handleGet(row.Id,3);
}
function handleGet(Id:string,type:number){
    apiMenu.GetSystemMenu(Id).then(res=>{
        AddModifyView.value=type;
        menuPopedom.value=res;
        dialogVisible.value=true;

        handleTreeMenu();

    })
}

function handleTreeMenu(){
    menuTreeSelectData.value = [];
    apiMenu.handleTreeSelect().then(res => {
        menuTreeSelectData.value = res;
    });
}

//分页内容
const handelPagination=()=>{
    handleLoad();
}
//添加事件
const handleAdd=()=>{
    menuPopedom.value.Id='',
    menuPopedom.value.MenuName='',
    menuPopedom.value.RouteName='',
    menuPopedom.value.MenuPath='',
    menuPopedom.value.ComponentPath='',
    menuPopedom.value.ParentId='',
    menuPopedom.value.Icon='',
    menuPopedom.value.MenuType=0,
    menuPopedom.value.PermissionKey ='',
    menuPopedom.value.IsStatus=true,
    menuPopedom.value.OrderIndex=0,
    AddModifyView.value=1;
    dialogVisible.value=true;
    handleTreeMenu();
}

//加载事件
const handleLoad=()=>{
    apiMenu.GetList(getMenuSelect).then(res=>{
        tableConfig.Items=res.Items;
        tableConfig.totalCount=res.TotalCount;
    })
}
onMounted(()=>{
    useMessage().success("加载成功");
    handleLoad();
})

</script>