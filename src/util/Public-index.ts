import { UseHomeStore } from "@/store";


const  handleRefreshMenu=()=>{
    const homeStore=UseHomeStore();
    homeStore.savaUserMenuList([]);
}

export default {handleRefreshMenu}