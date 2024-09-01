import axios from 'axios';
import { ElMessage } from 'element-plus';

const Request=axios.create({
    timeout:10000,
});

/**
 * 请求前的拦截器内容
 */
Request.interceptors.request.use((config)=>{
    config.url=import.meta.env.VITE_APP_BASE_API+config.url;
    var token=localStorage.getItem('Authorization');
    if(token){
        config.headers["Authorization"]=`Bearer ${token}`;
    }
    return config;
})

/**
 * 请求后的相应判断
 */
Request.interceptors.response.use((response)=>{
    console.log(1);
    if (response.status === 200) { 
        return Promise.resolve(response);        
    } else {            
        return Promise.reject(response);        
    }    
},error=>{
    if(error.code=='ERR_NETWORK')
        ElMessage.error('网络错误,请检查网络');
    switch(error.response.status){
        case 400:
            ElMessage.error('参数异常');
        break;      
        case 401:
            ElMessage.error('当前用户未登录');
            break;
            /**
             * tocken 过期
             */
        case 403:
            ElMessage.error('当前用户未登录');
            break;
        case 500:
            ElMessage.error('出现异常信息');
            break;
    }
    return Promise.reject(error.response);
})

export default Request
