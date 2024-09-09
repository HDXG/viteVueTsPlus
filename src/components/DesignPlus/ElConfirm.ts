import { ElMessageBox } from "element-plus";

export function confirmDelete(success){
    ElMessageBox.confirm(
        '将要删除本条记录，是否继续?',
        '温馨提示',
        {
            confirmButtonText: '删除',
            cancelButtonText: '取消',
            type: 'warning',
        }
    ).then(() => {
        success();
    }).catch(() => {
    
    })
}

/**
 * 确认框内容
 * @param success 事件
 */
export function confirm(title:string,success){
    ElMessageBox.confirm(
        title,
        '温馨提示',
        {
            confirmButtonText: '删除',
            cancelButtonText: '取消',
            type: 'warning',
        }
    ).then(() => {
        success();
    }).catch(() => {
    
    })
}