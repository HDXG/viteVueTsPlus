
export default interface response<resData>{
    status:number,
    statusText:string,
    data:{
        code:number,
        data:resData,
        msg:string,
    }
}