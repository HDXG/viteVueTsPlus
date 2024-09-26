import { getPageListDto, PagingBase } from '..';
import { PostService } from "../apiExtend";
import { CodeGenerationDto } from './model';
enum apiType{
    getTableListHandle='CodeGeneration/GetTableSchemasDescribe'
}


export default class CodeGenerationService{
    getTableListHandle(data:PagingBase){
        return PostService<getPageListDto<CodeGenerationDto>>(apiType.getTableListHandle,data);
    }
}