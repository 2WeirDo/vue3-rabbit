<script setup>
import { ref, onMounted } from 'vue'
import { getCategoryAPI } from '@/apis/category';
import { useRoute } from 'vue-router'
import { getBannerAPI } from '@/apis/home';
import GoodsItem from '../Home/components/GoodsItem.vue';
import { onBeforeRouteUpdate } from 'vue-router'

const categoryData = ref({});
const bannerList = ref([]);

// 通过route拿到路由参数
const route = useRoute();

// 获取面包屑以及分类数据
const getCategory = async (id = route.params.id) => {
    // 注意这里, 其实就是通过route.params.id的不同而从接口中得到不同的数据
    // 设置默认id值, 如果传入id就等于传入的值, 这是为了下方代码考虑
    const res = await getCategoryAPI(id);
    categoryData.value = res.result
}

// 方案二
// 目标 : 路由参数变化的时候, 可以把分类数据接口重新发送, 解决路由缓存问题
onBeforeRouteUpdate((to) => {
    // 存在问题 : 使用最新的路由参数拿取数据 
    // 这里的to代表目标路由对象
    getCategory(to.params.id);
})


//获取轮播图数据
const getBanner = async () => {
    const res = await getBannerAPI({
        distributionSite: '2'
    });
    bannerList.value = res.result
}

// 执行请求
onMounted(() => {
    getCategory();
    getBanner()
});
</script>

<template>
    <div class="top-category">
        <div class="container m-top-20">
            <!-- 面包屑 -->
            <div class="bread-container">
                <el-breadcrumb separator="➡">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <!-- 轮播图 -->
            <div class="home-banner">
                <el-carousel height="500px">
                    <el-carousel-item v-for="item in bannerList" :key="item.id">
                        <img :src="item.imgUrl" alt="">
                    </el-carousel-item>
                </el-carousel>
            </div>
            <!-- 分类页面数据 -->
            <div class="sub-list">
                <h3>全部分类</h3>
                <ul>
                    <li v-for="i in categoryData.children" :key="i.id">
                        <RouterLink to="/">
                            <img :src="i.picture" />
                            <p>{{ i.name }}</p>
                        </RouterLink>
                    </li>
                </ul>
            </div>
            <div class="ref-goods" v-for="item in categoryData.children" :key="item.id">
                <div class="head">
                    <h3>- {{ item.name }}-</h3>
                </div>
                <div class="body">
                    <GoodsItem v-for="good in item.goods" :goods="good" :key="good.id" />
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped lang="scss">
.top-category {
    .home-banner {
        width: 1240px;
        height: 500px;
        margin: 0 auto;


        img {
            width: 100%;
            height: 500px;
            border-radius: 120px;
        }
    }

    h3 {
        font-size: 28px;
        color: #666;
        font-weight: normal;
        text-align: center;
        line-height: 100px;
    }

    .sub-list {
        margin-top: 20px;
        background-color: #fff;

        ul {
            display: flex;
            padding: 0 32px;
            flex-wrap: wrap;

            li {
                width: 168px;
                height: 160px;


                a {
                    text-align: center;
                    display: block;
                    font-size: 16px;

                    img {
                        width: 100px;
                        height: 100px;
                    }

                    p {
                        line-height: 40px;
                    }

                    &:hover {
                        color: $xtxColor;
                    }
                }
            }
        }
    }

    .ref-goods {
        background-color: #fff;
        margin-top: 20px;
        position: relative;

        .head {
            .xtx-more {
                position: absolute;
                top: 20px;
                right: 20px;
            }

            .tag {
                text-align: center;
                color: #999;
                font-size: 20px;
                position: relative;
                top: -20px;
            }
        }

        .body {
            display: flex;
            justify-content: space-around;
            padding: 0 40px 30px;
        }
    }

    .bread-container {
        padding: 25px 0;
    }


}
</style>