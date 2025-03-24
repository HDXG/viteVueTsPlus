import { tagList } from "@/Layout/containerView/TagView/tagView";
import router from ".";

import { loginUserMenuOutPut } from "@/api/UserService/model";
import {UseHomeStore} from "../store/modules/homeStore";


const routesFilters=()=>{
    const homeStore = UseHomeStore();
    var tagList = homeStore.tagViewList;
    var routerList=router.getRoutes();
    var returnTagList=[] as tagList[];
    tagList.map((item)=>{
        if(returnTagList.filter(x=>x.name==item.name && x.path==item.path && x.checked==item.checked).length==0){
            if(routerList.filter(x=>x.path==item.path && x.meta.title==item.name).length==1){
                returnTagList.push(item);
            }
        }
    });
    return returnTagList;
}

const LoopRouting=(menuList:loginUserMenuOutPut[])=>{
    var menuLoop=[] as loginUserMenuOutPut[];
    menuList.map((item)=>{
        if(item.children.length>0){
            LoopRouting(item.children).map((item)=>{
                menuLoop.push(item);
            })
        }else{
            menuLoop.push(item);
        }
    })
    return menuLoop;
}


export default {routesFilters,LoopRouting};