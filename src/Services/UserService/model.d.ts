import {HasCreateDeleteEntityDto, PagingBase} from '@/Services'

export interface getUserPageListDto extends PagingBase{
    userName:string,
}


export interface SysUserDto extends HasCreateDeleteEntityDto{
    AccountNumber:string,
    PassWord:string,
    UserName:string,
    IsStatus:true,
}