
import { PostService } from "../apiExtend";
import { GetSystemRolePagedListRequest, InsertRoleMenuInPut, RoleListDto, GetSystemRolePagedListResponse, TreePermissionsDto } from "./model";

import { QuerySingleRequest, getPageListDto} from '..'

enum apiType{
    GetSystemRolePagedList ='SystemManagement/SystemRole/GetSystemRolePagedList',
    InsertRole='Role/InsertRole',
    UpdateRole='Role/UpdateRole',
    GetSystemRole ='SystemManagement/SystemRole/GetSystemRole',
    deletRole='Role/DeletePage',
    roleList='Role/RoleList',
    TreePermissions='Role/TreePermissions',
    InsertRoleMenu='Role/InsertRoleMenu',
}
export default class RoleService{
    /***
     * 获取角色分页接口
     */
    GetSystemRolePagedList(data: GetSystemRolePagedListRequest){
        return  PostService<getPageListDto<GetSystemRolePagedListResponse>>(apiType.GetSystemRolePagedList,data);
    }
    /***
     * 获取单个角色实体
     */
    GetSystemRole(data:string) {
        return  PostService<GetSystemRolePagedListResponse>(apiType.GetSystemRole, data);
    }

    ModifyAdd(data: GetSystemRolePagedListResponse,type:number){
        return PostService<boolean>(type==1?apiType.InsertRole:apiType.UpdateRole,data);
    }
   
    async deletRole(data: QuerySingleRequest){
        return await PostService<boolean>(apiType.deletRole,data);
    }
    roleList(){
        return PostService<RoleListDto[]>(apiType.roleList);
    }
    handleTreePermissions(data: QuerySingleRequest){
        return PostService<TreePermissionsDto>(apiType.TreePermissions,data);
    }
    InsertRoleMenu(data:InsertRoleMenuInPut){
        return PostService<boolean>(apiType.InsertRoleMenu,data);
    }
}

