import { HasCreateDeleteEntityDto, PagingBase } from "@/Services";


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