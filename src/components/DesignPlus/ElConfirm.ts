import { ElMessageBox } from "element-plus";

export function confirmDelete(success){
    ElMessageBox.confirm(
        '将要删除本条记录，是否继续?',
        '警告',
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