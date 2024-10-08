import { getDto, HasCreateDeleteEntityDto, PagingBase } from "@/api";
import { treeDto } from "../model";


export interface SysRoleDto extends HasCreateDeleteEntityDto{
    RoleName:string,
    Note:string,
    IsDefault:boolean,
    IsStatus:boolean,
    Order:number,
}


export interface GetPageRoleDto extends PagingBase{
    RoleName:string
}

export interface RoleListDto{
    Id:string,
    RoleName:string
}

export interface TreePermissionsDto{
    menuTreeList:treeDto[],
    roleMenIdList:[]
}


export interface InsertRoleMenuInPut extends getDto {
    menuList:string[]
}