import { HasCreateDeleteEntityDto,PagingBase } from "..";

export interface SystemMenuDto{
    Id: string,
    MenuName:string,
    MenuPath?:string,
    ParentId?:string,
    Icon:string,
    ComponentPath:string,
    RouteName:string,
    ExternalLink:boolean,
    Remark:string,
    OrderIndex:number,
    IsStatus:boolean,
    PermissionKey?:string,


}


export interface GetSystemMenuListResponse {
    TotalCount:number,
    Items: SystemMenuDto[]
}

export interface GetSystemMenuListInputDto extends PagingBase{
    MenuName:string,
    MenuPath:string,
}