/***
 * TreeSelect
 */
export interface treeSelectDto{
    label:string,
    value:string,
    children:treeSelectDto[]
}

/***
 * 树形菜单使用
 */
export interface treeDto{
    id:'',
    label:'',
    children:treeDto[]
}