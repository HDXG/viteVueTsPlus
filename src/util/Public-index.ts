import store from "@/store"

//删除vuex内容，进行刷新菜单项目
const  handleRefreshMenu=()=>{
    store.commit('home/savaUserMenuList',[]);
}

export default {handleRefreshMenu}