import axios from 'axios';
import { ElMessage } from 'element-plus';
import {startNprogress,closeNprogress} from '@/util/nprogress.ts'
const Request=axios.create({
    timeout:10000,
});

/**
 * 请求前的拦截器内容
 */
Request.interceptors.request.use((config)=>{
    startNprogress();
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
    closeNprogress();
    if (response.status === 200) { 
        return Promise.resolve(response);        
    } else {            
        return Promise.reject(response);        
    }    
},error=>{
    closeNprogress();
    if (error && error.response) {
        switch (error.response.status) {
            case 400:
                ElMessage.error('错误请求');
                break
            case 401:
                ElMessage.error('未授权，请重新登录')
                break
            case 403:
                ElMessage.error('拒绝访问')
                break
            case 404:
                ElMessage.error('请求错误,未找到该资源')
                break;
            case 405:
                ElMessage.error('请求方法未允许')
                break
            case 408:
                ElMessage.error('请求超时')
                break
            case 500:
                ElMessage.error('服务器端出错')
                break
            case 501:
                ElMessage.error('网络未实现')
                break
            case 502:
                ElMessage.error('网络错误')
                break
            case 503:
                ElMessage.error('服务不可用')
                break
            case 504:
                ElMessage.error('网络超时')
                break
            default:
                ElMessage.error(`连接错误${error.response.status}`)
        }
    } else {
        ElMessage.error("连接到服务器失败");
    }
    return Promise.reject(error);
})

export default Request
