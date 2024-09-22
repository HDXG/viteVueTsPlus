import { tagList } from "@/Layout/containerView/TagView/tagView";
import router from ".";
import store from "@/store";
import { loginUserMenuDto } from "@/Services/UserService/model";

const routesFilters=()=>{
    var tagList=store.getters["home/getTagViewList"] as tagList[];
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

const LoopRouting=(menuList:loginUserMenuDto[])=>{
    var menuLoop=[] as loginUserMenuDto[];
    menuList.map((item)=>{
        menuLoop.push(item);
        if(item.children.length>0){
            LoopRouting(item.children).map((item)=>{
                menuLoop.push(item);
            })
        }
    })
    return menuLoop;
}


export default {routesFilters,LoopRouting};