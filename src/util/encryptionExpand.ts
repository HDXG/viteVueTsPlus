
import CryptoJS from 'crypto-js'; 
/**
 * 加密解密方法类
 */
export default class encryptionExpand{
    //密钥内容
    secretKey:string="qazwsxedc123456";

    /**
     * 加密方法
     * @param object 参数
     * @returns 返回加密内容
     */
    encryption(object:any){
        try{
            return CryptoJS.AES.encrypt(JSON.stringify(object), this.secretKey).toString(); 
        }catch{
            return '';
        }
    }
    /**
     * 解密方法
     * @param object 需要解密的串
     * @returns 解密成功的数据
     */
    decryption(object:any){
        try{
            return JSON.parse(CryptoJS.AES.decrypt(object,this.secretKey).toString(CryptoJS.enc.Utf8)) ;
        }catch{
            return null;
        }
        
    }
}