import { getDto } from "..";
import { PostService } from "../apiExtend";
import { treeSelectDto } from "../model";
import { SysMenuPermissionsDto } from "./model";

enum apiType{
    Insert='PermissionMenu/InsertMenu',
    Update='PermissionMenu/UpdateMenu',
    GetMenu='PermissionMenu/GetMenu',
    TreeSelect='PermissionMenu/TreeSelect',
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
}