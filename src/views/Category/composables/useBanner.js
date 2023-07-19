import { getBannerAPI } from "@/apis/home";
import { onMounted, ref } from "vue";

// 封装banner轮播图相关业务代码
export function useBanner() {
  const bannerList = ref([]);
  //获取轮播图数据
  const getBanner = async () => {
    const res = await getBannerAPI({
      distributionSite: "2",
    });
    bannerList.value = res.result;
  };
  onMounted(() => {
    getBanner();
  });
  return {
    bannerList
  }
}
