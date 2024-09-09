import { getDto } from "..";
import { PostService } from "../apiExtend";
import { treeSelectDto } from "../model";
import { PagedResultInPut, PopedTableOutPut, SysMenuPermissionsDto } from "./model";

enum apiType{
    Insert='PermissionMenu/InsertMenu',
    Update='PermissionMenu/UpdateMenu',
    GetMenu='PermissionMenu/GetMenu',
    TreeSelect='PermissionMenu/TreeSelect',
    PagedResult='PermissionMenu/PagedResult',
}

export default class menuService{
    ModifyAdd(data:SysMenuPermissionsDto,type:number){
        return PostService<boolean>(type==1?apiType.Insert:apiType.Update,data);
    }
    handleGet(data:getDto){
        return PostService<SysMenuPermissionsDto>(apiType.GetMenu,data);
    }
    handleTreeSelect(){
        return PostService<treeSelectDto>(apiType.TreeSelect);
    }
    handleLoad(data:PagedResultInPut){
        return PostService<PopedTableOutPut>(apiType.PagedResult,data);
    }
}