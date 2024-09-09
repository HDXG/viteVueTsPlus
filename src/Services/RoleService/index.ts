
import { PostService } from "../apiExtend";
import { GetPageRoleDto, InsertRoleMenuInPut, RoleListDto, SysRoleDto, TreePermissionsDto } from "./model";

import {getDto, getPageListDto} from '../index.d'

enum apiType{
    GetRoleList='Role/PagedResult',
    InsertRole='Role/InsertRole',
    UpdateRole='Role/UpdateRole',
    GetRole='Role/GetRole',
    deletRole='Role/DeletePage',
    roleList='Role/RoleList',
    TreePermissions='Role/TreePermissions',
    InsertRoleMenu='Role/InsertRoleMenu',
}
export default class RoleService{
    getRoleList(data:GetPageRoleDto){
        return PostService<getPageListDto<SysRoleDto>>(apiType.GetRoleList,data);
    }
    ModifyAdd(data:SysRoleDto,type:number){
        return PostService<boolean>(type==1?apiType.InsertRole:apiType.UpdateRole,data);
    }
    async GetRole(data:getDto){
        return await PostService<SysRoleDto>(apiType.GetRole,data);
    }
    async deletRole(data:getDto){
        return await PostService<boolean>(apiType.deletRole,data);
    }
    roleList(){
        return PostService<RoleListDto[]>(apiType.roleList);
    }
    handleTreePermissions(data:getDto){
        return PostService<TreePermissionsDto>(apiType.TreePermissions,data);
    }
    InsertRoleMenu(data:InsertRoleMenuInPut){
        return PostService<boolean>(apiType.InsertRoleMenu,data);
    }
}

