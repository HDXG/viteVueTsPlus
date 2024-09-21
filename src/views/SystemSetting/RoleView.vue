<template>
    <el-form  :inline="true">
        <el-form-item label="角色名称" prop="name">
            <el-input v-model="getRoleSelect.RoleName"  placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item> 
            <el-button type="primary" @click="LoadPage();ElMessage.success('查询成功')">查询</el-button>
            <el-button @click="getRoleSelect.RoleName='';LoadPage();ElMessage.success('重置成功')">重置</el-button>
        </el-form-item>
    </el-form>
    <div  style="margin-bottom: 10px;;">
        <BtnAdd @handleAdd="handleAdd"></BtnAdd>
    </div>
    <TableView v-model:tableOption="tableConfig" @handelPagination="handelPagination"  >
        <template #defaultRole="{row}">
            <el-tag :key="row.IsDefault" :type="row.IsDefault?'success':'danger'" size="small"   >
                {{ row.IsDefault?'是':'否' }}
            </el-tag>
        </template>
        <template #Status="{row}">
            <el-tag :key="row.IsStatus" :type="row.IsStatus?'success':'danger'" size="small"   >
                {{ row.IsStatus?'正常':'禁用' }}
            </el-tag>
        </template>
        <template #handleBtn="{row}">
            <el-button style="width:80px;" @click="handleAssign(row)" type="primary" text>
                <SvgIcon icon-class="assignpermissions" size="15" />分配权限
            </el-button>
            <BtnAction v-model:rowDto="roleDto" @handleEdit="handleEdit(row)" @handleDelete="handleDelete(row)" 
                        @handleView="handleView(row)" />
        </template>
    </TableView>

    <el-dialog v-model="dialogVisible" :title="AddModifyView==1?'新增角色':AddModifyView==2?'修改角色':'查看角色'"
                size="default" width="700" draggable>
            <div>
                <el-form  ref="ruleFormRef" :model="roleDto"  :rules="rules"   label-width="auto">
                    <el-form-item label="角色名称" prop="RoleName">
                        <el-input :readonly="AddModifyView==3" v-model:model-value="roleDto.RoleName"  placeholder="请输入角色名称"/>
                    </el-form-item>
                    <el-form-item label="备注" prop="Note">
                        <el-input :readonly="AddModifyView==3" v-model:model-value="roleDto.Note"  :autosize="{ minRows: 2, maxRows:3 }" placeholder="请输入角色描述" type="textarea" 
                        />
                    </el-form-item>
                    <el-form-item label="显示顺序" prop="Order">
                        <el-input-number :readonly="AddModifyView==3" v-model="roleDto.Order" :min="0"  />
                    </el-form-item>
                    <el-form-item label="默认角色" prop="IsStatus">
                        <el-radio-group :disabled="AddModifyView==3"  v-model:model-value="roleDto.IsDefault" >
                            <el-radio :value="true">是</el-radio>
                            <el-radio :value="false">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="角色状态" prop="IsStatus">
                        <el-radio-group :disabled="AddModifyView==3" v-model:model-value="roleDto.IsStatus">
                            <el-radio :value="true">正常</el-radio>
                            <el-radio :value="false">停用</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-form>
            </div>
            <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogVisible=false">取消</el-button>
                <el-button type="primary" @click="handleDialogSuccess(ruleFormRef)">确定</el-button>
            </div>
            </template>
    </el-dialog>

    <el-drawer v-model="drawerVisible" :title="drawerTitle" >
        <div>
            <el-input v-model="treeSelectStr"  placeholder="菜单/权限名称" style="width: 240px"  :prefix-icon="Search"></el-input>
            &emsp;<ElButton type="primary">展开</ElButton> <el-checkbox v-model="fatherAndSon" label="父子联动" size="large" />
            <el-tree ref="treeRef"  :data="treePermissions" :default-checked-keys="treeDefaultList" show-checkbox default-expand-all node-key="id"
                :check-strictly="!fatherAndSon" :highlight-current="true" style="margin-top: 10px;" />
        </div>
        <template #footer>
            <div style="flex: auto">
                <el-button type="primary" @click="confirmClick()">确定</el-button>
                <el-button @click="drawerVisible=false">取消</el-button>
            </div>
        </template>
    </el-drawer>
</template>

<script setup lang="ts">
import {  Search } from '@element-plus/icons-vue'
import { confirmDelete,confirm } from '@/components/DesignPlus/ElConfirm';
import { tableConfigs, tableOptions } from '@/components/DesignPlus/tableView';
import { getDto } from '@/Services';
import RoleService from '@/Services/RoleService';
import { GetPageRoleDto, InsertRoleMenuInPut, SysRoleDto } from '@/Services/RoleService/model';
import { createGuid } from '@/util/guid';
import { ElMessage, FormInstance,ElTree } from 'element-plus';
import { treeDto } from '@/Services/model';
import handleRefreshMenu from '@/util/Public-index'
const dialogVisible=ref<boolean>(false);
const drawerVisible=ref<boolean>(false);
const drawerTitle=ref<string>('');
const treeSelectStr=ref<string>('');
const treePermissions=ref<treeDto[]>([]);
const treeDefaultList=ref([]);
const treeRef = ref<InstanceType<typeof ElTree>|any>();
const fatherAndSon=ref<boolean>(false);
const AddModifyView=ref<Number>(1);
const ruleFormRef = ref<FormInstance>();
const InsertRoleMenuDto=reactive<InsertRoleMenuInPut>({
    Id:'',
    menuList:[]
});
const rules=ref({
        RoleName:[ { required: true, message: '请输入角色名称', trigger: 'blur' },],
        Note:[ { required: true, message: '请输入角色备注', trigger: 'blur' },],
})
    const roleDto=ref<SysRoleDto>({
        Id:'',
        RoleName:'',
        Note:'',
        IsDefault:false,
        IsStatus:true,
        Order:1,        
    });

    const roleApi=new RoleService();
    const getRoleSelect=reactive<GetPageRoleDto>({
        RoleName:'',
        PageIndex:1,
        PageSize:10,
    })
    const tableConfig=reactive<tableConfigs>({
        pageIndex:1,
        pageSize:10,
        totalCount:0,
        Items:[],
        border:true,
        rowKey:'Id',
        tableColumn:[
            {
                type:'selection',
                width:70
            },
            {
                label:'序号',
                prop:'序号',
                width:100,
            },
            {
                label:'角色名称',
                prop:'RoleName',
                width:200,
            },
            {
                label:'角色描述',
                prop:'Note',
            },
            {
                label:'默认角色',
                width:100,
                slotName:'defaultRole',
            },
            {
                label:'角色状态',
                width:100,
                slotName:'Status',
            },
            {
                label:'显示顺序',
                width:90,
                prop:'Order'
            },
            {
                label:'添加时间',
                width:200,
                date:true,
                prop:'CreateTime',
            },
            {
                label:'操作',
                width:270,
                slotName:'handleBtn'
            }
        ] as tableOptions[]
    });
    watch(tableConfig,(val)=>{
        getRoleSelect.PageIndex=val.pageIndex;
        getRoleSelect.PageSize=val.pageSize;
    })
//分配权限
function handleAssign(row:SysRoleDto){
    roleApi.handleTreePermissions({Id:row.Id} as getDto).then(res=>{
        drawerTitle.value=`【${row.RoleName}】分配权限`;
        drawerVisible.value=true;
        treePermissions.value=res.menuTreeList;
        treeDefaultList.value=res.roleMenIdList;
        InsertRoleMenuDto.Id=row.Id;
    })
}
//分配权限确定
function confirmClick(){
    if(treeRef.value.getCheckedKeys().length==0)
        return drawerVisible.value=false;
    confirm('确定要添加以下权限嘛',()=>{
        InsertRoleMenuDto.menuList=treeRef.value.getCheckedKeys();
        roleApi.InsertRoleMenu(InsertRoleMenuDto).then(res=>{
            if(res)
                ElMessage.success('添加权限成功');
            drawerVisible.value=false;
            handleRefreshMenu.handleRefreshMenu();
        })
    });
}

    const handelPagination=()=>{
        LoadPage();
    }
    //添加
    function handleAdd(){
        dialogVisible.value=true;
        AddModifyView.value=1;
    }
    //编辑
    function handleEdit(row:SysRoleDto){
        roleApi.GetRole({Id:row.Id}as getDto ).then(res=>{
            roleDto.value=res;
            AddModifyView.value=2;
            dialogVisible.value=true;
        })
    }
    //删除
    function handleDelete(row:SysRoleDto){
        confirmDelete(()=>{
            roleApi.deletRole({Id:row.Id} as getDto).then((res)=>{
                if(res){
                    ElMessage.success('删除成功');
                    LoadPage();
                }
                
            })
        })
    }
    //查看
    function handleView(row:SysRoleDto){
        roleDto.value=row;
        AddModifyView.value=3;
        dialogVisible.value=true;
    }

    function handleDialogSuccess(ruleFormRef:FormInstance | undefined){
        if(AddModifyView.value==3){
            return dialogVisible.value=false;
        }
        if(!ruleFormRef)
            return;
        ruleFormRef.validate((valid)=>{
        if(valid){
            if(AddModifyView.value==1)
                roleDto.value.Id=createGuid();
            roleApi.ModifyAdd(roleDto.value,AddModifyView.value as number).then((res)=>{
                if(res){
                    ElMessage.success(AddModifyView.value==1?"添加角色成功":"修改角色成功");
                }
                dialogVisible.value=false;
                LoadPage();
            })
        }
    })
}

    const LoadPage=()=>{
        roleApi.getRoleList(getRoleSelect).then((res)=>{
            tableConfig.Items=res.Item;
            tableConfig.totalCount=res.TotalCount;
        })
    }

    onMounted(()=>{
        LoadPage();
    })
</script>