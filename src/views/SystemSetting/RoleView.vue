<template>
    <el-form  :inline="true">
        <el-form-item label="角色名称" prop="name">
            <el-input  placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item> 
            <el-button type="primary" @click="LoadPage()">查询</el-button>
            <el-button >重置</el-button>
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
            <el-button style="width:20px;" type="primary" text><ElTooltip content="编辑" placement="top"><SvgIcon icon-class="edit" size="20" /></ElTooltip></el-button>
            <el-button style="width:20px;"  type="primary" text><ElTooltip content="查看" placement="top"><SvgIcon icon-class="View" size="20" /></ElTooltip></el-button>
            <el-button style="width:20px;"  type="danger" text><ElTooltip content="删除" placement="top"><SvgIcon icon-class="Delete" size="20" /></ElTooltip></el-button>
        </template>
    </TableView>

    <el-dialog v-model="dialogVisible" :title="AddAndSava?'新增角色':'修改角色'"    size="default" width="700" draggable>
            <div>
                <el-form  ref="ruleFormRef" :model="roleDto"  :rules="rules"   label-width="auto">
                    <el-form-item label="角色名称" prop="RoleName">
                        <el-input v-model:model-value="roleDto.RoleName"  placeholder="请输入角色名称"/>
                    </el-form-item>
                    <el-form-item label="备注" prop="Note">
                        <el-input v-model:model-value="roleDto.Note"  :autosize="{ minRows: 2, maxRows:3 }" placeholder="请输入角色描述" type="textarea" 
                        />
                    </el-form-item>
                    <el-form-item label="默认角色" prop="IsStatus">
                        <el-radio-group  v-model:model-value="roleDto.IsDefault" >
                            <el-radio :value="true">是</el-radio>
                            <el-radio :value="false">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="角色状态" prop="IsStatus">
                        <el-radio-group v-model:model-value="roleDto.IsStatus">
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
    import { tableConfigs, tableOptions } from '@/components/DesignPlus/tableView';
    import RoleService from '@/Services/RoleService';
    import { SysRoleDto } from '@/Services/RoleService/model';
import { createGuid } from '@/util/guid';
import { FormInstance } from 'element-plus';
    
    const dialogVisible=ref<boolean>(false);
    const AddAndSava=ref<boolean>(true);
    const ruleFormRef = ref<FormInstance>();
    const rules=ref({
        RoleName:[ { required: true, message: '请输入角色名称', trigger: 'blur' },],
        Note:[ { required: true, message: '请输入角色备注', trigger: 'blur' },],
    })
    const roleDto=reactive<SysRoleDto>({
        Id:'',
        RoleName:'',
        Note:'',
        IsDefault:true,
        IsStatus:true,
        
    });

    const roleApi=new RoleService();

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
                label:'添加时间',
                width:200,
                prop:'CreateTime',
            },
            {
                label:'操作',
                width:170,
                slotName:'handleBtn'
            }
        ] as tableOptions[]
    });

    const handelPagination=()=>{
        //console.log(343);
    }
    function handleAdd(){
        dialogVisible.value=true;
        AddAndSava.value=true;

    }
    function handleDialogSuccess(ruleFormRef:FormInstance | undefined){
        if(!ruleFormRef)
            return;
        ruleFormRef.validate((valid)=>{
        if(valid){
            roleDto.Id=createGuid();
            roleApi.InsertRole(roleDto).then((res)=>{
                console.log(res);
                tableConfig.Items=res.Item;
                tableConfig.totalCount=res.TotalCount;
                dialogVisible.value=false;
                LoadPage();
            })
        }
    })
}
    const LoadPage=()=>{
        roleApi.GetLoginUser().then((res)=>{
            tableConfig.Items=res.Item;
            tableConfig.totalCount=res.TotalCount;
        })
    }

    onMounted(()=>{
        LoadPage();
    })
</script>