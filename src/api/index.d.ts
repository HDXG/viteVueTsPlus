
export  interface response<resData>{
    status:number,
    statusText:string,
    data:{
        code:number,
        data:resData,
        msg:string,
    }
}

//通用字段内容

export interface HasCreateDeleteEntityDto{
    Id:string,
    CreateTime?:Date
}

/**
 * 分页通用内容
 */
export interface PagingBase{
    PageIndex:number,
    PageSize:number,
}

//表格分页内容
export interface getPageListDto<T>{
    TotalCount:number=0;
    Items:T[]
}





