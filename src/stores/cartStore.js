// 封装购物车模块
import { defineStore } from "pinia";
import { ref } from "vue";

export const useCartStore = defineStore("cart", () => {
  // 1. 定义state
  const cartList = ref([]);
  // 2. 定义action
  const addCart = (goods) => {
    // 添加购物车操作
    // 已添加过 - count + 1
    // 没有添加该 - push
    // 思路: 通过匹配传递过来的商品对象中的skuId能不能在cartList中找到
    // 找到了就是添加过
    const item = cartList.value.find((item) => item.skuId === goods.skuId);
    if (item) {
      // 找到
      item.count++;
    } else {
      // 没找到
      cartList.value.push(goods);
    }
  };
  return {
    cartList,
    addCart,
  };
}, {
    // pinia持久缓存 (pinia-plugin-persistedstate插件)
    persist: true,
});
