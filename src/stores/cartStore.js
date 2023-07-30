// 封装购物车模块

import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useUserStore } from "./user";
import { insertCartAPI, findNewCartListAPI } from "@/apis/cart";

export const useCartStore = defineStore(
  "cart",
  () => {
    const userStore = useUserStore();
    const isLogin = computed(() => userStore.userInfo.token);
    // 1. 定义state
    const cartList = ref([]);
    // 2. 定义action
    const addCart = async(goods) => {
      const {skuId, count} = goods
      if (isLogin) {
        // 登录之后的加入购物车逻辑
        // 调用加入购物车接口
        await insertCartAPI({skuId, count})
        // 获取最新购物车列表
        const res = await findNewCartListAPI()
        // 接口购物车列表覆盖本地购物车列表
        cartList.value = res.result
      } 
      else {
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
      const item = cartList.value.find((item) => item.skuId === skuId);
      item.selected = selected;
    };

    // 全选功能
    const allCheck = (selected) => {
      // 把cartList中的每一项的selected都设置为全选框状态
      cartList.value.forEach((item) => (item.selected = selected));
    };

    // 计算属性  注意computed的使用要么后面不加{}就直接返回值, 要么{}加return

    // 1. 总的数量 - count之和
    const allCount = computed(() =>
      cartList.value.reduce((pre, cur) => pre + cur.count, 0)
    );
    // const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))

    // 2. 总价 -  count * price 之和
    const allPrice = computed(() => {
      return cartList.value.reduce(
        (pre, cur) => pre + cur.count * cur.price,
        0
      );
    });
    // const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))

    // 3. 已选择数量
    const selectedCount = computed(() =>
      cartList.value
        .filter((item) => item.selected === true)
        .reduce((pre, cur) => pre + cur.count, 0)
    );

    // 4. 已选择商品价钱合计
    const selectedPrice = computed(() =>
      cartList.value
        .filter((item) => item.selected === true)
        .reduce((pre, cur) => pre + cur.price * cur.count, 0)
    );

    // 是否全选
    // 当所有项是选中状态时, 全选按钮才为选中
    const isAll = computed(() =>
      cartList.value.every((item) => item.selected === true)
    );

    return {
      cartList,
      allCount,
      allPrice,
      isAll,
      selectedCount,
      selectedPrice,
      addCart,
      delCart,
      singleCheck,
      allCheck,
    };
  },
  {
    // pinia持久缓存 (pinia-plugin-persistedstate插件)
    persist: true,
  }
);
