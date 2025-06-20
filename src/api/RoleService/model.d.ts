import { getDto, HasCreateDeleteEntityDto, PagingBase, QuerySingleRequest } from "@/api";
import { treeDto } from "../model";


/***
 * 角色列表分页入参参数
 */
export interface GetSystemRolePagedListRequest extends PagingBase {
    RoleName: string
}

 
/***
 * 返回角色列表分页
 */
export interface GetSystemRolePagedListResponse extends HasCreateDeleteEntityDto{
    RoleName:string,
    Describe:string,
    IsDefault:boolean,
    IsStatus:boolean,
    OrderIndex:number,
}


/***
 * 角色Dto
 */
export interface SystemRoleDto extends HasCreateDeleteEntityDto {
    RoleName: string,
    Describe: string,
    IsDefault: boolean,
    IsStatus: boolean,
    OrderIndex: number,
}



export interface RoleListDto{
    Id:string,
    RoleName:string
}

export interface TreePermissionsDto{
    menuTreeList:treeDto[],
    roleMenIdList:[]
}


export interface InsertRoleMenuInPut extends QuerySingleRequest {
    menuList:string[]
}