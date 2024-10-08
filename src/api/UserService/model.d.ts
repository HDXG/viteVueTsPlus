import {HasCreateDeleteEntityDto, PagingBase} from '@/api'
import{RoleListDto} from'@/api/RoleService/model'

export interface getUserPageListDto extends PagingBase{
    userName:string,
}


export interface SysUserDto extends HasCreateDeleteEntityDto{
    AccountNumber:string,
    PassWord:string,
    UserName:string,
    IsStatus:true,
}

export interface GetUserListDto extends HasCreateDeleteEntityDto{
    AccountNumber:string,
    UserName:string,
    IsStatus:true,
    RoleName:string,
}


export interface    GetUserOutPut{
    model:SysUserDto,
    roleIds:[],
}

/**
 * 增加或者修改使用
 */
export interface InsertUserOutPut{
    model:SysUserDto,
    guids:string[]
}


export interface loginUserDto{
    AccountNumber:string,
    PassWord:string,
}


interface loginUserMenuOutPut{
    title:string,
    RouteName:string,
    ComponentPath:string,
    MenuUrl:string,
    icon:string,
    children:loginUserMenuOutPut[]
}

interface GetLogInUserInfoDto{
    UserName:string,
    Id:string
}

/**
 * 登陆成功返回 菜单，权限以及用户信息
 * 
 */
export interface loginUserRequest{
    UserInfo:GetLogInUserInfoDto,
    rolePermission:string,
    token:string,
}