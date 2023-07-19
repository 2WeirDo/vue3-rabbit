import httpInstance from "@/utils/http";

export function getBannerAPI(params = {}) {
    // 默认为1, 商品为2 , 这里用解构搞一个默认值
    const {distributionSite = '1'} = params
    return httpInstance({
        url: '/home/banner',
        params: {
            distributionSite,
        }
    })
}

export function getNewAPI() {
    return httpInstance({
        url: '/home/new'
    })
}

export function getHotAPI() {
    return httpInstance({
        url: '/home/hot',
        // limit: ''
    })
}

export function getProductAPI() {
    return httpInstance({
        url: '/home/goods'
    })
}