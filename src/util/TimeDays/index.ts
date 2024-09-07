import dayjs from 'dayjs';
import { ConfigType } from 'dayjs'

// 获得当前时间
export function getNowDate(formatValue = 'YYYY-MM-DD HH:mm:ss') {
    return timeFormat(null, formatValue);
}

// 时间格式化
export function timeFormat(timeValue: ConfigType, formatValue = 'YYYY-MM-DD') {
    return dayjs(timeValue).format(formatValue);
}