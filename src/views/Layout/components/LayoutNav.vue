<script setup>
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router';
import { ElMessage } from "element-plus";

const router = useRouter();
const userStore = useUserStore();
const confirm = () => {
    // 退出登录业务逻辑实现
    // 1. 清除用户信息
    userStore.clearUserInfo();
    ElMessage({ type: "success", message: '退出登录成功' });
    // 2. 跳转登录页面
    router.push('/login')
}
</script>

<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <!-- 多模板渲染 -->

        <!-- 登录时显示第一块, 非登录时显示第二块  判断条件 : 是否有token -->
        <template v-if="userStore.userInfo.token">
          <li><a href="javascript:;"><i class="iconfont icon-user"></i>{{ userStore.userInfo.account }}</a></li>
          <li>
            <!-- 文档中写到当触发点击确认按钮时触发confirm事件 -->
            <el-popconfirm @confirm="confirm" title="确认退出吗?" confirm-button-text="确认" cancel-button-text="取消">
              <template #reference>
                <a href="javascript:;">退出登录</a>
              </template>
            </el-popconfirm>
          </li>
          <li><a href="javascript:;">我的订单</a></li>
          <li><a href="javascript:;">会员中心</a></li>
        </template>
        <template v-else>
          <li><a href="javascript:;" @click="$router.push('/login')">请先登录</a></li>
          <li><a href="javascript:;">帮助中心</a></li>
          <li><a href="javascript:;">关于我们</a></li>
        </template>
      </ul>
    </div>
  </nav>
</template>


<style scoped lang="scss">
.app-topnav {
  background: #333;

  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;

    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;

        i {
          font-size: 14px;
          margin-right: 2px;
        }

        &:hover {
          color: $xtxColor;
        }
      }

      ~li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>