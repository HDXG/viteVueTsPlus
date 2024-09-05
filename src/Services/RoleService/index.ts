
import { PostService } from "../apiExtend";
import { SysRoleDto } from "./model";

import {getPageListDto} from '../index.d'

enum apiType{
    GetRoleList='Role/PagedResult',
    InsertRole='Role/InsertRole'
}
export default class RoleService{
    GetLoginUser(){
        return PostService<getPageListDto<SysRoleDto>>(apiType.GetRoleList);
    }
    InsertRole(data:SysRoleDto){
        return PostService<getPageListDto<SysRoleDto>>(apiType.InsertRole,data);
    }
}

