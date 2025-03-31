import { QuerySingleRequest } from "..";
import { PostService } from "../apiExtend";
import { treeSelectDto } from "../model";
import { GetSystemMenuListResponse, GetSystemMenuListInputDto, SystemMenuDto } from "./model";

enum apiType{
    GetSystemMenuList = 'SystemManagement/SystemMenu/GetSystemMenuList',
    Insert ='SystemManagement/SystemMenu/CreateSystemMenu',
    Update ='SystemManagement/SystemMenu/UpdateMenu',
    GetSystemMenu ='SystemManagement/SystemMenu/GetSystemMenu',
    TreeSelect ='SystemManagement/SystemMenu/GetSystemMenuTreeResponse',
    DeleteMenu ='SystemManagement/SystemMenu/DeleteMenu',
}

export default class menuService{
    /***
     * 获取菜单列表分页
     */
    GetSystemMenuList(data: GetSystemMenuListInputDto) {
        return PostService<GetSystemMenuListResponse>(apiType.GetSystemMenuList, data);
    }
    /***
     * 获取菜单树菜单
     */
    handleTreeSelect() {
        return PostService<treeSelectDto>(apiType.TreeSelect);
    }
    /***
     * 查询单个菜单内容
     */
    GetSystemMenu(data:string){
        return PostService<SystemMenuDto>(apiType.GetSystemMenu,data);
    }

    ModifyAdd(data: SystemMenuDto, type: number) {
        return PostService<boolean>(type == 1 ? apiType.Insert : apiType.Update, data);
    }
    
    handleDelete(data: QuerySingleRequest){
        return PostService<boolean>(apiType.DeleteMenu,data);
    }
}