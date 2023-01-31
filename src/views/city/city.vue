<template>
  <div class="city top-page">
    <div class="top">
          <!-- search bar -->
        <van-search v-model="searchValue"
                    show-action
                    action-text="Annuler"
                    shape="round"
                    placeholder="City/location"
                    @cancel="cancelClick()" />

      <!-- tav toggle -->
      <!-- tabActive默认索引 -->
        <van-tabs v-model:active="tabActive" color="#ff9854" line-height="2"> 
          <!-- allCity是对象，所以遍历的时可以对value, key, index做遍历 -->
          <template v-for="(value, key, index) in allCities" :key="key">
            <van-tab :title="value.title" :name="key"></van-tab>   
          </template>
        </van-tabs>
    </div>    
    
    <div class="content">
      <!-- <city-group :group-data="currentGroup"></city-group> -->
      <template v-for="(value, key, index) in allCities">
         <city-group v-show="tabActive === key" :group-data="value"></city-group>
      </template>
    </div>     
  </div>

  
</template>

<script setup>
import {ref, computed} from 'vue'
import { useRouter } from 'vue-router';
import {getCityAll} from '@/services'
import useCityStore from '@/stores/modules/city';
import { storeToRefs } from 'pinia';

import cityGroup from './cpns/city-group.vue';
  // search function
  const searchValue = ref("")
  const router = useRouter()
// cancel function
  const cancelClick =() =>{
    router.back('/home')
  }

  // tab toggle
  const tabActive = ref()
  

  // 网络请求：请求城市的数据
  // const allCity = ref({})
  // getCityAll().then (res => {
  //   allCity.value = res.data
  // })

  // 从store中获取数据
  const cityStore = useCityStore()
  cityStore.fetchAllCitiesData()
  const {allCities} = storeToRefs(cityStore)


  // 获取选中标签的数据
  // 1. 获取正确的key: 将tabs中绑定的tabActive正确绑定 
  // 2. 根据key从allcities获取数据，默认直接获取的数据不是响应式的，所以必须包裹computed

  const currentGroup = computed(() => allCities.value[tabActive.value])
</script>

<style lang="less" scoped>

.city {

  // 1 top固定定位实现
  // .top {
  //   position: fixed;
  //   top:0;
  //   left:0;
  //   right:0;
  // }
  // .content {
  //   margin-top:100px;
  // }

  // 2 布局滚动
  .content {
    height: calc(100vh-100px);
    overflow-y: auto;
}
}
</style>