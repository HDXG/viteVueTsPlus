import api from '@/util/api/index';
import { ElMessage } from 'element-plus';
import {response} from '.';

function ApiService(url:string,method:string,data:any){
    const servicePromise = api({ method , url , data  });
    return new Promise(function (resolve) {
        servicePromise.then(res=>{
            if(res.data.code==500){
                ElMessage.error('出现异常信息!');
            }else{
                resolve(res.data.data);
            }
        }).catch(function (error) {
            if (error.response) {
                ElMessage.error('出现异常信息!');
            }
        });
    })
}

function GetService(url:string,data:any){
    return ApiService(url,"get",data);
}

/***
 * post请求返回内容
 * @param url 接口地址
 * @param data 接口参数
 */
function  PostService<res>(url:string,data:any=null){
    const servicePromise=api.post<any,response<res>>(url,data);
        return new Promise<res>(function (resolve) {
            servicePromise.then(res=>{
                if(res.data.code==500){
                    return ElMessage.error(res.data.msg);
                }
                resolve(res.data.data);
                
            }).catch(function (error) {
                if (error.response) {
                    ElMessage.error('出现异常信息');
                }
            });
        })    
}

export {GetService,PostService}


