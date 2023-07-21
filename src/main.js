import "@/styles/common.scss";
import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import App from "./App.vue";
import router from "./router";

// 引入懒加载指令文件并注册
import { lazyPlugin } from "@/directives";
// 引入全局组件插件
import { componentPlugin } from "@/components";

const app = createApp(App);
const pinia = createPinia();
// 注册持久化插件
pinia.use(piniaPluginPersistedstate);

app.use(pinia); // 注意这里不能用createPinia()了, 要和上面保持同一个pinia实例
app.use(router);
app.use(lazyPlugin);
app.use(componentPlugin);
app.mount("#app");
