import { pageModel } from "../pageView";

export class tableConfigs extends   pageModel{
    //表格数据内容
    Items:Array[]| [] | any=[];

    //表格边框
    border:boolean=true;

    //row-key 用于下拉时使用
    rowKey:string='Id';

    //表格内部内容
    tableColumn:tableOptions[]=[];
}


export class tableOptions{
     //type类型
    type?:string="selection";
    label:string='';
    prop?:string='';
    align?:string='center';
    width?:number=100;
    slotName?:string='';
}