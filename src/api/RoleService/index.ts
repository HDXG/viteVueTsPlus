
import { PostService } from "../apiExtend";
import { GetSystemRolePagedListRequest, InsertRoleMenuInPut, RoleListDto, GetSystemRolePagedListResponse, TreePermissionsDto } from "./model";

import {getPageListDto} from '..'

const apiUrl=(action: string) => {
    return `SystemManagement/SystemRole/${action}`;
}

export default class RoleService implements ICrudAppService{
    GetList(_req: any): Promise<RoleListDto[]> {
        return PostService<RoleListDto[]>(apiUrl('RoleList'));
    }
    Insert(req: any): void | Promise<any> {
        throw new Error("Method not implemented.");
    }
    Updaet(req: any): void | Promise<any> {
        throw new Error("Method not implemented.");
    }
    Delete(req: any): void | Promise<any> {
        throw new Error("Method not implemented.");
    }
    /***
     * 获取角色分页接口
     */
    GetSystemRolePagedList(data: GetSystemRolePagedListRequest){
        return PostService<getPageListDto<GetSystemRolePagedListResponse>>(apiUrl('GetSystemRolePagedList'),data);
    }
    /***
     * 获取单个角色实体
     */
    GetSystemRole(data:string) {
        return PostService<GetSystemRolePagedListResponse>(apiUrl('GetSystemRole'), data);
    }

    ModifyAdd(data: GetSystemRolePagedListResponse,type:number){
        return PostService<boolean>(type == 1 ? apiUrl('InsertRole') : apiUrl('UpdateRole'),data);
    }
   
    async deletRole(data: any){
        return await PostService<boolean>(apiUrl('DeletePage') ,data);
    }
    roleList(){
        
    }
    handleTreePermissions(data: any){
        return PostService<TreePermissionsDto>(apiUrl('TreePermissions'),data);
    }
    InsertRoleMenu(data:InsertRoleMenuInPut){
        return PostService<boolean>(apiUrl('InsertRoleMenu'),data);
    }
}

