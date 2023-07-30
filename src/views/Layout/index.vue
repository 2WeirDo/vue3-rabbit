<script setup>
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutSticky from './components/LayoutSticky.vue';
import { useCategoryStore } from '@/stores/categoryStore';
import { onMounted } from 'vue'

const categoryStore = useCategoryStore();
onMounted(() => {
  categoryStore.getCategory();
})
</script>

<template>
  <LayoutSticky />
  <LayoutNav />
  <LayoutHeader />

  <!-- 方案一 -->
  <!-- 添加一个独一无二的key, 破坏复用机制, 强制销毁重建, 解决路由缓存问题 -->
  <!-- <RouterView :key="$route.fullPath" /> -->
  <RouterView />

  <LayoutFooter />
</template> 