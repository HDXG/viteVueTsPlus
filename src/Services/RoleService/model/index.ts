import { HasCreateDeleteEntityDto } from "@/Services";


export interface SysRoleDto extends HasCreateDeleteEntityDto{
    RoleName:string,
    Note:string,
    IsDefault:boolean,
    IsStatus:boolean,
}