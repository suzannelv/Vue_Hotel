<template>
  <div class="home">
    <home-nav-bar/>
    <div class="banner">
      <img src="@/assets/images/home/banner.webp" alt="">
    </div>
    <!-- <home-search-box :hot-suggests="hotSuggests"/> -->
    <home-search-box :hot-suggests="hotSuggests"/>
    <home-categories/>
    <div class="search-bar" v-if="isShowSearchBar">
      <search-bar :start-date="'09-19'" :end-date="'09-20'"/>
    </div>
    <home-content/>
    <!-- <button @click="moreBtnClick">reflasher</button> -->
  
  </div>
</template>

<script setup>
import { watch, computed } from 'vue';
import useScroll from '@/hooks/useScroll'
import useHomeStore from '@/stores/modules/home';
import { ref } from 'vue';
import HomeNavBar from './cpns/home-nav-bar.vue';
import HomeSearchBox  from './cpns/home-search-box.vue';
import HomeCategories from './cpns/home-categories.vue';
import homeContent from './cpns/home-content.vue';
import searchBar from '@/components/search-bar/search-bar.vue';
// import hyRequest from '@/services/request/index'


// 发送网络请求
const homeStore = useHomeStore()
homeStore.fetchHotSuggestData()
homeStore.fetchCategoriesData()
homeStore.fetchHouseListData()

// 加载更多
// const moreBtnClick = () => {
//   // console.log("more")
//   homeStore.fetchHouseListData()
// }

// 监听window窗口的滚动
// méthode 1: callback
// useScroll(()=>{
//   homeStore.fetchHouseListData()
// })

// méthode 2:définir un variable
const { isReachBottom, scrollTop} = useScroll()
watch(isReachBottom, (newValue) =>{
  if(newValue){
    homeStore.fetchHouseListData().then(()=>{
      isReachBottom.value = false
    })
    
  }
})

// 搜索框显示控制
// const isShowSearchBar = ref(false)
// watch(scrollTop, (newTop)=>{
//   isShowSearchBar.value = newTop > 100
// })

// 定义的可响应式数据，依赖另外一个可响应式的数据，那么可以使用计算属性(computed)
const isShowSearchBar=computed(()=>{
  return scrollTop.value >= 350
})

// 1.热门建议
// const hotSuggests = ref([])
// hyRequest.get({
//   url:"/home/hotSuggests"
// }).then(res => {
//   hotSuggests.value= res.data
// })
// 2. categories
// const categories = ref([])
// hyRequest.get({
//   url:"/home/categories"
// }).then(res => {
//   categories.value= res.data
// })
</script>

<style lang="less" scoped>

.home {

  img {
    width:100%;
  }
  
}

.search-bar {
  position: fixed;
  z-index: 5;
  top:0;
  left:0;
  right:0;
  height:45px;
  padding:16px 16px 10px;
  background-color: #fff;
}
</style>