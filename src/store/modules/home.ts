
import { keyEnum } from "@/util/localStorageExpand/keyEnum";
import storage from "@/util/localStorageExpand/storage";
import encryptionExpand from '@/util/encryptionExpand'
import { loginUserMenuDto, loginUserRequest } from "@/Services/UserService/model";
import { tagList } from "@/Layout/containerView/TagView/tagView";

const encryption=new encryptionExpand();

export default  {
    namespaced: true,
    state:{
        UserInfo: encryption.decryption(storage.getItem(keyEnum.userInfo))|| null|| {} as loginUserRequest["UserInfo"],
        token:encryption.decryption(storage.getItem(keyEnum.token)) || null || {} as loginUserRequest["token"],
        menuList:[] as loginUserRequest["menuList"],
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
            state.menuList=userRequest.menuList;
            storage.setItem(keyEnum.userInfo,encryption.encryption(userRequest.UserInfo));
            storage.setItem(keyEnum.token,encryption.encryption(userRequest.token));
            //storage.setItem(keyEnum.menuList,userRequest.menuList);
        },
        savaUserMenuList(state,list:loginUserMenuDto[]){
            state.menuList=list;
        },
        savaTagViewList(state,list:tagList[]){
            state.getTagViewList=list;
        }
    }
}