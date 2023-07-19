import httpInstance from "@/utils/http";

export function getCategoryAPI(id) {
  return httpInstance({
    url: "/category",
    params: {
      id,
    },
  });
}

export function getBannerAPI(params = {}) {
  // 默认为1, 商品为2 , 这里用解构搞一个默认值
  const { distributionSite = "1" } = params;
  return httpInstance({
    url: "/home/banner",
    params: {
      distributionSite,
    },
  });
}

/**
 * @description: 获取二级分类列表数据
 * @param {*} id 分类id
 * @return {*}
 */

export const getCategoryFilterAPI = (id) => {
  return httpInstance({
    url: "/category/sub/filter",
    params: {
      id,
    },
  });
};
