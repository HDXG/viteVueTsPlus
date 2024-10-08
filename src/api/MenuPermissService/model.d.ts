import { HasCreateDeleteEntityDto,PagingBase } from "..";

export interface SysMenuPermissionsDto extends HasCreateDeleteEntityDto {
    MenuName:string,
    RouteName?:string,
    MenuUrl?:string,
    ComponentPath?:string,
    Fatherid:string,
    Icon:string,
    MenuType:number,
    IsStatus:boolean,
    Identification?:string,
    Order:number
}


export interface PopedTableOutPut{
    TotalCount:number,
    Items:SysMenuPermissionsDto[]
}

export interface PagedResultInPut extends PagingBase{
    menuName:string,
}