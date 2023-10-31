// 封装分类数据业务相关代码
import { ref, onMounted } from "vue";
import { getCategoryAPI } from "@/apis/category";
import { useRoute } from "vue-router";
import { onBeforeRouteUpdate } from "vue-router";

export function useCategory() {
  const categoryData = ref({});

  // 通过route拿到路由参数
  const route = useRoute();

  // 获取面包屑以及分类数据
  const getCategory = async (id = route.params.id) => {
    // 注意这里, 其实就是通过route.params.id的不同而从接口中得到不同的数据
    // 设置默认id值, 如果传入id就等于传入的值, 这是为了下方代码考虑
    const res = await getCategoryAPI(id);
    categoryData.value = res.result;
  };
  
  // 路由缓存问题：当路由path一样，参数不同的时候会选择直接复用路由对应的组件
  // 方案二
  // 目标 : 路由参数变化的时候, 可以把分类数据接口重新发送, 解决路由缓存问题
  onBeforeRouteUpdate((to) => {
    // 存在问题 : 使用最新的路由参数拿取数据
    // 这里的to代表目标路由对象
    getCategory(to.params.id);
  });

  // 执行请求
  onMounted(() => {
    getCategory();
  });

  return {
    categoryData,
  };
}
