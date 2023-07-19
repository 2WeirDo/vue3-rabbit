import '@/styles/common.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useIntersectionObserver } from '@vueuse/core'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')


// 监听目标元素的可见性 (是否进入到视口区域)
app.directive('img-lazy', {
    mounted(el, binding) {
        // el : 指令绑定的那个元素, 这里指的绑定的对象
        // binding : binding.value 指令`=`后面的表达式的值, 这里图片url
       useIntersectionObserver(
            el,
            ([{ isIntersecting }]) => {
                if(isIntersecting){
                    // 进入视口区域
                    el.src = binding.value
                }
            },
          )
    },
})