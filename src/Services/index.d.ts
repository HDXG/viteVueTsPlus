
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
    Id?:string,
    IsDelete?:boolean,
    CreateTime?:Date
}

//表格分页内容
export interface getPageListDto<T>{
    TotalCount:number=0;
    Item:T[]
}
