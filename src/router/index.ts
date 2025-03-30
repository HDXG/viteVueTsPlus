import {createRouter, createWebHistory} from 'vue-router';
import routes from './router.config.ts'
import storage from '@/util/localStorageExpand/storage.ts';
import { keyEnum } from '@/util/localStorageExpand/keyEnum.ts';
import encryptionExpand from '@/util/encryptionExpand.ts';
import {startNprogress,closeNprogress} from '@/util/nprogress.ts'

const router = createRouter({
    history: createWebHistory(),
    routes,
    strict: true,
    scrollBehavior: () => ({ left: 0, top: 0 }),
});

const encryption=new encryptionExpand();
router.beforeEach((to, _from, next) => {
    startNprogress();
    document.title = to.meta.title as string;
    let userInfo=encryption.decryption(storage.getItem(keyEnum.userInfo));
    let token=encryption.decryption(storage.getItem(keyEnum.token));
    //当前是登录页不进行任何判断
    if(to.name=="Login"){
        storage.clearAll();
        next();
    }
    else
    {
      //当前判断用户是否已经注销，注销后跳转至登录内容 进行登录获取用户信息以及菜单内容
        if(userInfo==null || token==null){
            storage.clearAll();
            next({name:'Login'});
        }
        //判断如果当前路由中没有跳转的路由则直接返回首页内容
        if (router.hasRoute(to.name as string))
            return next()
        else{
            next('/')
    }
        
    }
})

router.afterEach(()=>{
    closeNprogress();
})

window.addEventListener('popstate', () => {  
    let userInfo=encryption.decryption(storage.getItem(keyEnum.userInfo));
    let token=encryption.decryption(storage.getItem(keyEnum.token));
    //当前是用户未登录内容
    if(userInfo==null || token==null){
        window.location.href="/Login";
    }
});
export default router;