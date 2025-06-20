import { PostService } from "../apiExtend";
import { treeSelectDto } from "../model";
import { GetSystemMenuListResponse, GetSystemMenuListInputDto, SystemMenuDto } from "./model";

const apiUrl =(action:string)=>{
    return `SystemManagement/SystemMenu/${action}`;
}

export default class menuService implements ICrudAppService {

    GetList(req: GetSystemMenuListInputDto): Promise<GetSystemMenuListResponse> {
        return PostService<GetSystemMenuListResponse>(apiUrl('GetSystemMenuList'), req);
    }
    
    /***
    * 获取菜单树菜单
    */
    handleTreeSelect() {
        return PostService<treeSelectDto>(apiUrl('GetSystemMenuTreeResponse'));
    }

    /***
     * 查询单个菜单内容
     */
    GetSystemMenu(data: string) {
        return PostService<SystemMenuDto>(apiUrl('GetSystemMenu'), data);
    }

    ModifyAdd(data: SystemMenuDto, type: number) {
        return type == 1 ? this.Insert(data) : this.Updaet(data);
    }

    Delete(_req: string): Promise<boolean> {
        return PostService<boolean>('SystemManagement/SystemMenu/DeleteSystemMenu', _req);
    }

    Insert(_req: SystemMenuDto): Promise<boolean> {
        return PostService<boolean>(apiUrl('CreateSystemMenu'),_req)
    }

    Updaet(_req: SystemMenuDto): Promise<boolean> {
        return PostService<boolean>(apiUrl('UpdateSystemMenu'), _req)
    }

   
   
}