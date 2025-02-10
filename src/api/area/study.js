import request from '@/utils/request'
// 左侧展示的资源栏目   
export function getResChanTree(query) {
    return request({
        url: '/system/resChannel/getResChanTree',
        method: 'get',
        params: query
    })
}


























