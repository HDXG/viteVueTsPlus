import {RouteRecordRaw} from 'vue-router'



const routes:RouteRecordRaw[] =[
    {
        path: '/Login',
        name: 'Login',
        component:()=>import('@/views/LoginView.vue'),
        meta:{
            title:"登录",
            require:true//用于控制当前路由 不进行动态路由判断
        }
    },
    
    {
        path: '/',
        name:'/',
        component:()=>import('@/Layout/IndexView.vue'),
        redirect: '/Home',
        meta:{
            title:"首页",
            require:true//用于控制当前路由 不进行动态路由判断
        },
        children:[
            {
                path:'/Home',
                name:'Home',
                component:()=>import('@/Layout/dashboardView.vue'),
                meta:{
                    title:'首页',
                    require:true
                }
            },
            {
                path: '/404',
                name: '404',
                component:()=>import('@/components/errorView.vue'),
                meta:{
                    title:"异常信息",
                    require:true//用于控制当前路由 不进行动态路由判断
                }
            },
            {
                path: '/iconSelect',
                name: 'iconSelect',
                component:()=>import('@/components/DesignPlus/IconSelect.vue'),
                meta:{
                    title:"图标选择",
                    require:true//用于控制当前路由 不进行动态路由判断
                }
            },
            {
                path: '/SystemSetting/UserView',
                name: '用户列表',
                component:()=>import('@/views/SystemSetting/UserView.vue'),
                meta:{
                    title:"用户列表",
                }
            },
            {
                path: '/SystemSetting/RoleView',
                name: '角色列表',
                component:()=>import('@/views/SystemSetting/RoleView.vue'),
                meta:{
                    title:"角色列表",
                }
            },
            {
                path: '/SystemSetting/PopedomView',
                name: '菜单管理',
                component:()=>import('@/views/SystemSetting/PopedomView.vue'),
                meta:{
                    title:"菜单管理",
                }
            },
            
        ]
    },
];

export default routes;