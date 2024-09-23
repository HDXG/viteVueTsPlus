import {PostService} from '../apiExtend'
import { SerilogDto,SerilogInPut } from './model';
import {getPageListDto} from '..'
enum ApiType{
    getList='Serilog/GetSerilogList'
}

export default class SerilogService{
    getList(data:SerilogInPut){
        return PostService<getPageListDto<SerilogDto>>(ApiType.getList,data);
    }
}