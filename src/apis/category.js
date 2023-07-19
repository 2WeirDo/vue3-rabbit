import httpInstance from "@/utils/http";

export function getCategoryAPI(id) {
    return httpInstance({
        url: '/category',
        params: {
            id
        }
    })
}

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

