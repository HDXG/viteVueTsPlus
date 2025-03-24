
import { keyEnum } from "@/util/localStorageExpand/keyEnum";
import storage from "@/util/localStorageExpand/storage";
import encryptionExpand from '@/util/encryptionExpand'
import { loginUserRequest, loginUserMenuOutPut } from "@/api/UserService/model";
import { tagList } from "@/Layout/containerView/TagView/tagView";
import{userService} from '@/api/public-Index'
import routerExpand from "@/router/routerFiltering";
import router from "@/router";
const encryption=new encryptionExpand();
const userApi=new userService();
import { defineStore } from 'pinia'

export const UseHomeStore = defineStore('UseHomeStore', {
    state: () => ({
        UserInfo: encryption.decryption(storage.getItem(keyEnum.userInfo)) || null || {} as loginUserRequest["UserInfo"],
        token: encryption.decryption(storage.getItem(keyEnum.token)) || null || {} as loginUserRequest["token"],
        menuList: [] as loginUserMenuOutPut[],
        tagViewList: [] as tagList[]
    }),
    actions: {
        savaUserMenuList(list: loginUserMenuOutPut[]) {
            this.menuList = list;
        },

        getUserMenuList() {
            const menuData = [
                {
                    title:'用户列表',
                    RouteName:'/SystemSetting/UserView',
                    ComponentPath:'SystemSetting/UserView.vue',
                    MenuUrl:'/SystemSetting/UserView',
                    icon:'Male',
                },
                {
                    title: '角色列表',
                    RouteName: '/SystemSetting/RoleView',
                    ComponentPath: 'SystemSetting/UserView.vue',
                    MenuUrl: '/SystemSetting/UserView',
                    icon: 'Male',
                }
            ] as loginUserMenuOutPut[];
            this.menuList = menuData;
            // userApi.getByUserIdMenuList({ Id: this.UserInfo.Id }).then(res => {
            //     //即将添加的路由内容
            //     var routerAddList = routerExpand.LoopRouting(res);
            //     routerAddList.map((item) => {
            //         if (!router.hasRoute(item.RouteName)) {
            //             router.addRoute('/', {
            //                 name: item.RouteName, path: item.MenuUrl,
            //                 component: () => import(/* @vite-ignore */ `../../views/${item.ComponentPath}`),
            //                 meta: { title: item.title }
            //             })
            //         }
            //     });
            // });
        },

        setUserToken(token:string){
            this.token=token;
            storage.setItem(keyEnum.token, encryption.encryption(token));
            let name = Math.floor(Math.random() * 100);
            storage.setItem(keyEnum.userInfo, encryption.encryption({ UserName:''+name, Id :'123'} as loginUserRequest["UserInfo"] ))
        },
        savaTagViewList(tagList: tagList[] ){
            this.tagViewList=tagList;
        }
    },
    getters: {
        getUserInfo: (state) => state.UserInfo as loginUserRequest["UserInfo"],
        getToken: (state) => state.token,
        getTagViewList: (state) => {
            return state.tagViewList;
        }
    }
    
});