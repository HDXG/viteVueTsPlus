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
        name: '/',
        component:()=>import('@/Layout/Index.vue'),
        meta:{
            title:"首页",
            require:true//用于控制当前路由 不进行动态路由判断
        },
        children:[
            {
                path: '/Login1',
                name: 'Login1',
                component:()=>import('@/views/LoginView.vue'),
                meta:{
                    title:"登录",
                    require:true//用于控制当前路由 不进行动态路由判断
                }
            },
            {
                path: '/Login2',
                name: 'Login2',
                component:()=>import('@/views/LoginView.vue'),
                meta:{
                    title:"登录",
                    require:true//用于控制当前路由 不进行动态路由判断
                }
            },
            {
                path: '/Login3',
                name: 'Login3',
                component:()=>import('@/views/LoginView.vue'),
                meta:{
                    title:"登录",
                    require:true//用于控制当前路由 不进行动态路由判断
                }
            },
            {
                path: '/Login4',
                name: 'Login4',
                component:()=>import('@/views/LoginView.vue'),
                meta:{
                    title:"登录",
                    require:true//用于控制当前路由 不进行动态路由判断
                }
            },
            {
                path: '/404',
                name: '404',
                component:()=>import('@/views/404View.vue'),
                meta:{
                    title:"404错误",
                    require:true//用于控制当前路由 不进行动态路由判断
                }
            },
        ]
    },
];


export default routes;