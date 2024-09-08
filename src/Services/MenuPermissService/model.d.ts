import { HasCreateDeleteEntityDto } from "..";

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
}