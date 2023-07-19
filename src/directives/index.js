import { useIntersectionObserver } from '@vueuse/core'
// 定义懒加载插件
export const lazyPlugin = {
  install(app) {
    // 懒加载指令逻辑
    // 监听目标元素的可见性 (是否进入到视口区域)
    app.directive("img-lazy", {
      mounted(el, binding) {
        // el : 指令绑定的那个元素, 这里指的绑定的对象
        // binding : binding.value 指令`=`后面的表达式的值, 这里图片url
        const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
          if (isIntersecting) {
            // 进入视口区域
            el.src = binding.value;
            // 停止监听, 防止重复请求
            stop();
          }
        });
      },
    });
  },
};
