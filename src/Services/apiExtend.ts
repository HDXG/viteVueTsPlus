import api from '@/util/api/index';
import { ElMessage } from 'element-plus';
import {response} from '.';

function ApiService(url:string,method:string,data:any){
    const servicePromise = api({ method , url , data  });
    return new Promise(function (resolve) {
        servicePromise.then(res=>{
            resolve(res.data.data);
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
                resolve(res.data.data);
                
            }).catch(function(error){
                    //如果是500 返回一下错误信息内容
                if(error.response.status==500){
                    ElMessage.error(error.response.data.msg);
                }
            });
        })    
}

export {GetService,PostService}


