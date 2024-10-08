import { PagingBase } from "..";


export interface SerilogInPut extends PagingBase{
    url:string,
    HttpMethod:string
}


export interface SerilogDto{
    Id:number,
    TimeStamp:string,
    Url?:string,
    HttpMethod?:string,
    RequestJson:string,
    HttpStatusCode?:number,
    ResponseJson:string,
    ExceptionMessage?:string,
    TotalMilliseconds?:string
}