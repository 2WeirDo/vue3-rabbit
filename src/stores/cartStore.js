// 封装购物车模块

import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useCartStore = defineStore(
  "cart",
  () => {
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

    // 删除购物车
    const delCart = (skuId) => {
      // 思路1. 找到要删除项的下标值 - splice
      const idx = cartList.value.findIndex((item) => skuId === item.skuId);
      cartList.value.splice(idx, 1);
      // 思路2. 使用数组的过滤方法 - filter
      // cartList.value = cartList.value.filter((item) => item.skuId !== skuId)
    };

    // 单选功能
    const singleCheck = (skuId, selected) => {
      // 通过skuId找到要修改的那一项, 然后把它的selected修改为传过来的selected
      // 传过来的selected属于最新的选中状态
      const item = cartList.value.find((item) => item.skuId === skuId)
      item.selected = selected
    }



    // 计算属性
    // 注意computed的使用要么后面不加{}就直接返回值, 要么{}加return
    // 1. 总的数量 - count之和
    const allCount = computed(() => cartList.value.reduce((pre, cur) => pre + cur.count, 0));
    // const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))
    // 2. 总价 -  count * price 之和
    const allPrice = computed(() => {
      return cartList.value.reduce((pre, cur) => pre + cur.count * cur.price, 0)
    });
    // const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))
    

    return {
      cartList,
      allCount,
      allPrice,
      addCart,
      delCart,
      singleCheck,
    };
  },
  {
    // pinia持久缓存 (pinia-plugin-persistedstate插件)
    persist: true,
  }
);
