<template>
    <el-form  :inline="true">
        <el-form-item label="用户名称" prop="name">
            <el-input v-model="getUserSelect.userName"  placeholder="请输入用户名称" />
        </el-form-item>
        <el-form-item> 
            <el-button type="primary" @click="handleLoad();ElMessage.success('查询成功')">查询</el-button>
            <el-button @click="getUserSelect.userName='';handleLoad();ElMessage.success('重置成功')">重置</el-button>
        </el-form-item>
    </el-form>
    <div  style="margin-bottom: 10px;">
        <BtnAdd @handleAdd="handleAdd"></BtnAdd>
    </div>
    <TableView v-model:tableOption="tableConfig" @handelPagination="handelPagination"  >
        <template #Status="{row}">
            <el-tag :key="row.IsStatus" :type="row.IsStatus?'success':'danger'" size="small"   >
                {{ row.IsStatus?'正常':'禁用' }}
            </el-tag>
        </template>
        <template #handleBtn="{row}">
            <BtnAction v-model:rowDto="userDto" @handle-delete="handleDelete(row)" @handle-edit="handleEdit(row)" 
                @handle-view="handleView(row)" ></BtnAction>
        </template>
    </TableView>

    <el-dialog v-model="dialogVisible" :title="AddModifyView==1?'新增用户':AddModifyView==2?'修改用户':'查看用户'"
                size="default" width="700" draggable>
        <div>
            <el-form  ref="ruleFormRef" :model="userDto"  :rules="rules"   label-width="auto">
                <el-form-item label="用户名称" prop="UserName">
                    <el-input :readonly="AddModifyView==3" v-model:model-value="userDto.UserName"  placeholder="请输入用户名称"/>
                </el-form-item>
                <el-form-item label="用户账号" prop="AccountNumber">
                    <el-input :readonly="AddModifyView==3" v-model:model-value="userDto.AccountNumber"  placeholder="请输入用户账号"/>
                </el-form-item>
                <el-form-item label="用户密码" prop="PassWord">
                    <el-input type="passWord"  show-password :readonly="AddModifyView==3" v-model:model-value="userDto.PassWord"  placeholder="请输入用户密码"/>
                </el-form-item>
                <el-form-item label="确认密码" v-if="AddModifyView==1?true:false" >
                    <el-input type="passWord"  show-password  :readonly="AddModifyView==3" v-model:model-value="confirmPassword"  placeholder="请确认密码"/>
                </el-form-item>
                <el-form-item label="角色列表">
                    <el-select v-model="selectRole"  multiple placeholder="请选择角色" >
                        <el-Option v-for="(item,index) in roleList" :key="index" :label="item.RoleName" :value="item.Id" />
                    </el-select>
                </el-form-item>
                <el-form-item label="用户状态" prop="IsStatus">
                    <el-radio-group :disabled="AddModifyView==3" v-model:model-value="userDto.IsStatus">
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

</template>

<script setup lang="ts">
import { ElMessage, FormInstance } from 'element-plus';
import { tableConfigs, tableOptions } from '@/components/DesignPlus/tableView';
import { getUserPageListDto, InsertUserOutPut, SysUserDto } from '@/Services/UserService/model';
import {userService,RoleService} from '@/Services/public-Index';
import { createGuid } from '@/util/guid';
import { confirmDelete } from '@/components/DesignPlus/ElConfirm';
import { getDto } from '@/Services';
import { RoleListDto } from '@/Services/RoleService/model';
const router=useRouter();
const apiUser=new userService();
const apiRole=new RoleService();
const dialogVisible=ref<boolean>(false);
const AddModifyView=ref<number>(1);
const confirmPassword=ref<string>('');
const ruleFormRef=ref<FormInstance>();
const roleList=ref<RoleListDto[]>([]);
const selectRole=ref<string[]>([]);
const rules=ref({
    UserName:[{ required: true, message: '请输入用户名称', trigger: 'blur' }],
    AccountNumber:[{ required: true, message: '请输入用户账号', trigger: 'blur' }],
    PassWord:[{required:true,message:'请输入密码', trigger: 'blur' }]
});
const getUserSelect=reactive<getUserPageListDto>({
        userName:'',
        PageIndex:1,
        PageSize:10,
        
});
const userDto=ref<SysUserDto>({
    Id:'',
    AccountNumber:'',
    PassWord:'',
    UserName:'',
    IsStatus:true,
    IsDelete:true,
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
                label:'用户名',
                prop:'UserName',
                width:200,
            },
            {
                label:'账号',
                prop:'AccountNumber',
                width:200,
            },
            {
                label:'角色列表',
                prop:'RoleName',
            },
            {
                label:'状态',
                width:70,
                slotName:'Status',
            },
            {
                label:'添加时间',
                date:true,
                prop:'CreateTime',
                width:200,
            },
            {
                label:'操作',
                width:170,
                slotName:'handleBtn'
            }
    ] as tableOptions[]
});

watch(tableConfig,(val)=>{
    getUserSelect.PageIndex=val.pageIndex;
    getUserSelect.PageSize=val.pageSize;
})
watch(dialogVisible,(val)=>{
    if(val){
        apiRole.roleList().then(res=>{
            selectRole.value=[];
            roleList.value=res;
        })
    }
})
//分页内容
const handelPagination=()=>{
    handleLoad();
}
const handleDelete=(row:SysUserDto)=>{
    confirmDelete(()=>{
        apiUser.handleDelete({Id:row.Id} as getDto ).then(res=>{
            if(res){
                ElMessage.success('删除成功');
                handleLoad();
            }
        })
    });
}
const handleEdit=(row:SysUserDto)=>{
    handleGetDto(row,2);
}
const handleView=(row:SysUserDto)=>{
    handleGetDto(row,3);
}
function handleGetDto(row:SysUserDto,type:number){
    AddModifyView.value=type;
    dialogVisible.value=true;
    apiUser.handleGet({Id:row.Id} as getDto ).then(res=>{
        selectRole.value=res.roleIds;
        userDto.value=res.model;
    })
}

//添加
function handleAdd(){
    userDto.value.AccountNumber='';
    userDto.value.PassWord='';
    userDto.value.UserName='';
    AddModifyView.value=1;
    dialogVisible.value=true;
}

//对话框确定事件
function handleDialogSuccess(ruleFormRef:FormInstance | undefined){
    if(AddModifyView.value==3){
        return dialogVisible.value=false;
    }
    if(!ruleFormRef)
        return;
    if(AddModifyView.value==1){
        if(confirmPassword.value=='')
            return ElMessage.error('请确认密码');
        if( confirmPassword.value!=userDto.value.PassWord)
            return ElMessage.error('两次密码不一致');
    }
    
    ruleFormRef.validate((valid)=>{
        if(valid){
            if(AddModifyView.value==1)
                userDto.value.Id=createGuid();
            apiUser.ModifyAdd({model:userDto.value,guids:selectRole.value} as InsertUserOutPut,AddModifyView.value as number).then((res)=>{
                if(res){
                    ElMessage.success(AddModifyView.value==1?"添加用户成功":"修改用户成功");
                }
                dialogVisible.value=false;
                handleLoad();
            })
        }
    })
}

//加载事件
function handleLoad(){
    apiUser.handleLoad(getUserSelect).then((res)=>{
        tableConfig.Items=res.Item;
        tableConfig.totalCount=res.TotalCount;
    })
}

onMounted(()=>{
        handleLoad();
})
</script>