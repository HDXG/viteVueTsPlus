
import { PostService } from "../apiExtend"
import { GetUserListDto, GetUserOutPut, getUserPageListDto, InsertUserOutPut, loginUserDto, loginUserMenuOutPut, loginUserRequest } from "./model"
import {getDto, getPageListDto} from '..'
enum apiType{
    list='Users/GetPagedResult',
    insert='Users/InsertUser',
    update='Users/UpdateUser',
    delete='Users/Delete',
    getDto='Users/GetUser',
    getLoginUser='Users/GetLoginUser',
    getByUserIdMenuList='Users/GetByUserIdMenu',
}

export default class userService {
    handleLoad(data:getUserPageListDto){
        return PostService<getPageListDto<GetUserListDto>>(apiType.list,data);
    }
    handleGet(data:getDto){
        return PostService<GetUserOutPut>(apiType.getDto,data);
    }
    ModifyAdd(data:InsertUserOutPut,type:number){
        return PostService<boolean>(type==1?apiType.insert:apiType.update,data);
    }
    handleDelete(data:getDto){
        return PostService<boolean>(apiType.delete,data);
    }
    handleUserLogin(data:loginUserDto){
        return PostService<loginUserRequest>(apiType.getLoginUser,data);
    }
    getByUserIdMenuList(data:any){
        return PostService<loginUserMenuOutPut[]>(apiType.getByUserIdMenuList,data);
    }
}