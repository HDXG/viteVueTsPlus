import { QuerySingleRequest } from "..";
import { PostService } from "../apiExtend";
import { treeSelectDto } from "../model";
import { GetSystemMenuListResponse, GetSystemMenuListInputDto, SystemMenuDto } from "./model";

enum apiType{
    GetSystemMenuList = 'SystemManagement/SystemMenu/GetSystemMenuList',
    Insert ='SystemManagement/SystemMenu/InsertMenu',
    Update ='SystemManagement/SystemMenu/UpdateMenu',
    GetMenu ='SystemManagement/SystemMenu/GetMenu',
    TreeSelect ='SystemManagement/SystemMenu/TreeSelect',
    DeleteMenu ='SystemManagement/SystemMenu/DeleteMenu',
}

export default class menuService{
    /***
     * 获取菜单列表分页
     */
    GetSystemMenuList(data: GetSystemMenuListInputDto) {
        return PostService<GetSystemMenuListResponse>(apiType.GetSystemMenuList, data);
    }
    
    handleGet(data: QuerySingleRequest){
        return PostService<SystemMenuDto>(apiType.GetMenu,data);
    }
    ModifyAdd(data: SystemMenuDto, type: number) {
        return PostService<boolean>(type == 1 ? apiType.Insert : apiType.Update, data);
    }
    handleTreeSelect(){
        return PostService<treeSelectDto>(apiType.TreeSelect);
    }
    handleDelete(data: QuerySingleRequest){
        return PostService<boolean>(apiType.DeleteMenu,data);
    }
}