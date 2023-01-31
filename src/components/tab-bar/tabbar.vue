<template>
  <div class="tab-bar">
    <van-tabbar v-model="currentIndex" active-color="#1989fa" route>
      <template v-for="(item, index) in tabbarData">
        <van-tabbar-item :to="item.path">
         <span>{{ item.text }}</span>
         <template #icon>
          <img v-if="currentIndex !== index" :src="getAssetsURL(item.image)" alt="">
          <img v-else :src="getAssetsURL(item.imageActive)" alt="">
         </template>
      </van-tabbar-item>
      </template>
    </van-tabbar>

    <!-- <template v-for="(item, index) in tabbarData">
     <div class="tab-bar-item" 
          :class="{active:currentIndex === index}"
          @click="itemClick(index, item)">
      <img v-if="currentIndex !== index" :src="getAssetsURL(item.image)" alt="">
      <img v-else :src="getAssetsURL(item.imageActive)" alt="">
      <span class="text">{{ item.text }}</span>
    </div>
    </template> -->
   </div>
</template>

<script setup>
import tabbarData from '@/assets/data/tabbar.js'
import { getAssetsURL} from '@/utils/load_assets.js'
import { ref, watch } from 'vue';
import { useRoute} from 'vue-router';

const route = useRoute()
console.log(route.path)
const currentIndex = ref(0)
watch(route, (newRoute)=>{
  const index = tabbarData.findIndex(item => item.path === newRoute.path)
  if(index === -1) return 
  currentIndex.value=index
})

// const router = useRouter()
// const itemClick =(index, item) =>{
//   currentIndex.value = index
//   router.push(item.path)

// }

</script>

<style lang="less" scoped>

.tab-bar {

  // 找到类，对类中的CSS属性重写
  // :deep(.class)找到子组件的类，让子组件的类也可以生效
  // :deep(.van-tabbar-item_icon) {
  //   font-size:50px;
  // }
 img {
  height: 26px;
 }
}
</style>