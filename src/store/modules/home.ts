
import { keyEnum } from "@/util/localStorageExpand/keyEnum";
import storage from "@/util/localStorageExpand/storage";
import encryptionExpand from '@/util/encryptionExpand'
import { loginUserMenuOutPut, loginUserRequest } from "@/Services/UserService/model";
import { tagList } from "@/Layout/containerView/TagView/tagView";
import{userService} from '@/Services/public-Index'
import routerExpand from "@/router/routerFiltering";
import router from "@/router";
const encryption=new encryptionExpand();
const userApi=new userService();
export default  {
    namespaced: true,
    state:{
        UserInfo: encryption.decryption(storage.getItem(keyEnum.userInfo))|| null|| {} as loginUserRequest["UserInfo"],
        token:encryption.decryption(storage.getItem(keyEnum.token)) || null || {} as loginUserRequest["token"],
        menuList:[] as loginUserRequest[],
        tagViewList:null ||[] as tagList[]
    },
    getters: {
        getUserInfo:(state)=>state.UserInfo as loginUserRequest["UserInfo"],
        getToken:(state)=>state.token,
        getMenuList:(state)=>{
            return state.menuList;
        },
        getTagViewList:(state)=>{
            return state.tagViewList;
        }
    },
    mutations:{
        /**
         * 保存用户信息，菜单以及权限
         * @param state 
         * @param userRequest 
         */
        savaUserInfo(state,userRequest:loginUserRequest){
            state.UserInfo=userRequest.UserInfo;
            state.token=userRequest.token;
            storage.setItem(keyEnum.userInfo,encryption.encryption(userRequest.UserInfo));
            storage.setItem(keyEnum.token,encryption.encryption(userRequest.token));
        },
        savaUserMenuList(state,list:loginUserMenuOutPut[]){
            state.menuList=list;
        },
        savaTagViewList(state,list:tagList[]){
            state.getTagViewList=list;
        }
    },
    actions:{
        getUserMenuList({ state, commit },){
            userApi.getByUserIdMenuList({Id:state.UserInfo.Id}).then(res=>{
                //即将添加的路由内容
                var routerAddList=routerExpand.LoopRouting(res);
                routerAddList.map((item)=>{
                    if(!router.hasRoute(item.RouteName)){
                        router.addRoute('/',{ name:item.RouteName, path:item.MenuUrl, 
                            component:()=>import(`../../views/${item.ComponentPath}`),
                        meta:{title:item.title}})
                    }
                });
                commit('savaUserMenuList',res);
            });
        }
    }
}