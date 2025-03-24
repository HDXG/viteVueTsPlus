import { createApp } from 'vue'

import createPinia from './store/index'  
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import 'virtual:svg-icons-register';


var app=createApp(App); 
app.use(createPinia);
app.use(router);

app.use(ElementPlus,{
    locale:zhCn
})
app.mount('#app');
