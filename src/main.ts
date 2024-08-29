import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import 'virtual:svg-icons-register';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


var app=createApp(App);
for (const iconName in ElementPlusIconsVue) {
    if (Reflect.has(ElementPlusIconsVue, iconName)) {
        const item = ElementPlusIconsVue[iconName];
        app.component(iconName, item);
    }
}

app.use(store);
app.use(router);
app.use(ElementPlus,{
    locale:zhCn
})
app.mount('#app');
