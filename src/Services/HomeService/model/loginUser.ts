export interface loginUserDto{
    AccountNumber:string,
    PassWord:string,
}


interface loginUserMenuDto{
    title:string,
    path:string,
    icon:string,
    children:loginUserMenuDto[]
}
interface loginUserInfo{
    Id:string,
    UserName:string,
    //角色权限内容
    RolePermission:string,
}

/**
 * 登陆成功返回 菜单，权限以及用户信息
 * 
 */
export interface loginUserRequest{
    menuList:loginUserMenuDto[]
    user:loginUserInfo,
    token:string,
}