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
        component:()=>import('@/Layout/IndexView.vue'),
        redirect: '/Home',
        meta:{
            title:"首页",
            require:true//用于控制当前路由 不进行动态路由判断
        },
        children:[
            {
                path:'/Home',
                name:'首页',
                component:()=>import('@/Layout/dashboardView.vue'),
                meta:{
                    title:'首页',
                    require:true
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
                component:()=>import('@/components/errorView.vue'),
                meta:{
                    title:"异常信息",
                    require:true//用于控制当前路由 不进行动态路由判断
                }
            },
        ]
    },
];


export default routes;