
import { PostService } from "../apiExtend";
import { GetPageRoleDto, RoleListDto, SysRoleDto } from "./model";

import {getDto, getPageListDto} from '../index.d'
import { treeDto } from "../model";

enum apiType{
    GetRoleList='Role/PagedResult',
    InsertRole='Role/InsertRole',
    UpdateRole='Role/UpdateRole',
    GetRole='Role/GetRole',
    deletRole='Role/DeletePage',
    roleList='Role/RoleList',
    TreePermissions='Role/TreePermissions'
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
    handleTreePermissions(){
        return PostService<treeDto[]>(apiType.TreePermissions);
    }
}

