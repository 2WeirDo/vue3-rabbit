import axios from "axios";
import "element-plus/theme-chalk/el-message.css";
import { ElMessage } from "element-plus";
import { useUserStore } from "@/stores/user";
import router from "@/router";
const httpInstance = axios.create({
  baseURL: "http://pcapi-xiaotuxian-front-devtest.itheima.net",
  timeout: 5000,
});

// axios请求拦截器
httpInstance.interceptors.request.use(
  (config) => {
    // 我们只需配置一次, 那么多个请求中都会携带我们的token数据,
    // 那么需要用到token的接口就都能鉴权成功
    // 1. 从pinia中获取token数据
    const userStore = useUserStore();
    const token = userStore.userInfo.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // 2. 按照后端的要求拼接token数据
    return config;
  },
  (e) => Promise.reject(e)
);

// axios响应式拦截器
httpInstance.interceptors.response.use(
  (res) => res.data,
  (e) => {
    const userStore = useUserStore();
    // 统一错误提示
    ElMessage({ type: "warning", message: e.response.data.message });

    // 401token错误处理
    // 由于不知道什么接口下发生401错误, 因此我们将操作放在响应拦截器中
    if (e.response.status === 401) {
      // 1. 清除本地用户数据
      userStore.clearUserInfo();

      // 2. 跳转到登陆页
      router.push("/login");
      // 重新登录后就可以用新的token了
    }
    return Promise.reject(e);
  }
);

export default httpInstance;
