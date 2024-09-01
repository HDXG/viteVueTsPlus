import { loginUserRequest } from "@/Services/HomeService/model/loginUser";
import { keyEnum } from "@/util/localStorageExpand/keyEnum";
import storage from "@/util/localStorageExpand/storage";
import encryptionExpand from '@/util/encryptionExpand'

const encryption=new encryptionExpand();
export default  {
    namespaced: true,
    state:{
        userInfo: encryption.decryption(storage.getItem(keyEnum.userInfo))|| null|| {} as loginUserRequest["user"],
        token:encryption.decryption(storage.getItem(keyEnum.token)) || null || {} as loginUserRequest["token"],
        menuList:storage.getItem(keyEnum.menuList)||null ||[] as loginUserRequest["menuList"],
    },
    getters: {
        getUserInfo:(state)=>state.userInfo,
        getToken:(state)=>state.token,
        getMenuList:(state)=>state.menuList

    },
    mutations:{
        /**
         * 保存用户信息，菜单以及权限
         * @param state 
         * @param userRequest 
         */
        savaUserInfo(state,userRequest:loginUserRequest){
            state.userInfo=userRequest.user;
            state.token=userRequest.token;
            state.menuList=userRequest.menuList;
            storage.setItem(keyEnum.userInfo,encryption.encryption(userRequest.user));
            storage.setItem(keyEnum.token,encryption.encryption(userRequest.token));
            storage.setItem(keyEnum.menuList,userRequest.menuList);
        },
    }
}