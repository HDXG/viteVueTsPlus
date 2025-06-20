interface ICrudAppService{
    GetList(req: any): Promise<any>;
    
    Insert(req: any): void | Promise<any>;

    Updaet(req: any): void | Promise<any>;
    
    Delete(req: any): void | Promise<any>;
}