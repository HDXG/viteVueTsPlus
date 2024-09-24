import {PostService} from '../apiExtend'
import { SerilogDto,SerilogInPut } from './model';
import {getPageListDto,getDto} from '..'
enum ApiType{
    getList='Serilog/GetSerilogList',
    getDto='Serilog/GetSerilog'
}

export default class SerilogService{
    getList(data:SerilogInPut){
        return PostService<getPageListDto<SerilogDto>>(ApiType.getList,data);
    }
    getDto(data:getDto){
        return PostService<SerilogDto>(ApiType.getDto,data);
    }
    
    
}