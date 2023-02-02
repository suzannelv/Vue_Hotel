<template>
  <div class="detail top-page" ref="detailRef">
    <tab-control 
       v-if="showTabControl"
       :titles="names"
       class="tabs"
       @tab-item-click="tabClick"
       ref="tabControlRef"
       />
    <van-nav-bar
        title="Détails Chambre"
        left-text="Retour"
        left-arrow
        @click-left="onClickLeft"
      /> 

      <div class="main" v-if ="mainPart" v-memo="[mainPart]">
        <!-- <detail-swipe :swipe-data="mainPart.topModule.housePicture.housePics"/> -->
        <details-swiper :swipe-data="mainPart.topModule.housePicture.housePics"/>
        <detail-infos name="描述" :ref="getSectionRef" :top-infos="mainPart.topModule"/> 
        <detail-facility name="设施" :ref="getSectionRef" :house-facility="mainPart.dynamicModule.facilityModule.houseFacility"/>
        <detail-landlord name="房东" :ref="getSectionRef" :landlord="mainPart.dynamicModule.landlordModule"/>/>
        <detail-comment name="评论" :ref="getSectionRef" :comment="mainPart.dynamicModule.commentModule"/>
        <detail-notice name="须知" :ref="getSectionRef" :order-rules="mainPart.dynamicModule.rulesModule.orderRules"/>
        <detail-map name="周边" :ref="getSectionRef" :position="mainPart.dynamicModule.positionModule"/>
        <detail-intro :price-intro="mainPart.introductionModule"/>
      </div>
      
      <div class="footer">
          <img src="@/assets/images/detail/icon_ensure.png" alt="">
          <div class="text">弘源旅途, 永无止境!</div>
      </div>
  </div>


</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {getDetailInfos} from "@/services"
import { watch } from 'vue';
// import DetailSwipe from './cpns/detail-swipe.vue'

import TabControl from '@/components/tab-control/tab-control.vue'
import detailsSwiper from './cpns/details_01-swiper.vue';
import DetailInfos from './cpns/detail_02-infos.vue'
// import DetailSection from '@/components/detail-section/detail-section.vue';
import DetailFacility from './cpns/detail_03-facility.vue';
import DetailLandlord from './cpns/detail_04-landlord.vue';
import detailComment from './cpns/detail_05-comment.vue';
import detailNotice from './cpns/detail_06-notice.vue';
import DetailMap from './cpns/detail_07-map.vue';
import detailIntro from './cpns/detail_08-intro.vue';
import useScroll from '@/hooks/useScroll';


const router = useRouter()
const route = useRoute()
const houseId = route.params.id

// 发送网络请求获取数据
const detailInfos = ref({})
const mainPart = computed(()=> detailInfos.value.mainPart)
getDetailInfos(houseId).then(res => {
  detailInfos.value = res.data
})

// 监听返回按钮的点击
const onClickLeft = () => {
  router.back()
}

// tabControl相关的操作
const detailRef = ref()
const {scrollTop} = useScroll(detailRef)
const showTabControl = computed(() => {
  console.log(scrollTop.value)
  return scrollTop.value > 300
})

// const landLordRef = ref()
// const sectionEls = []
// const getSectionRef = (value) => {
//   sectionEls.push(value.$el)
// }

const sectionEls = ref({})
const names = computed(()=>{
  return Object.keys(sectionEls.value)
})

const getSectionRef = (value) => {
  if(!value) return 
  const name = value.$el.getAttribute("name")
  sectionEls.value[name] = value.$el
}

let isClick = false
let currentDistance = -1
const tabClick = (index) => {
  const key = Object.keys(sectionEls.value)[index]
  const el = sectionEls.value[key]
  let distance = el.offsetTop
  if (index !== 0) {
    distance = distance - 44
  }

  isClick = true
  currentDistance = distance

  detailRef.value.scrollTo({
    top: distance,
    behavior: "smooth"
  })
}

// 页面滚动, 滚动时匹配对应的tabControll的index
const tabControlRef = ref()
watch(scrollTop, (newValue) => {
  if (newValue === currentDistance) {
    isClick = false
  }
  if (isClick) return

  // 1.获取所有的区域的offsetTops
  const els = Object.values(sectionEls.value)
  const values = els.map(el => el.offsetTop)

  // 2.根据newValue去匹配想要索引
  let index = values.length - 1
  for (let i = 0; i < values.length; i++) {
    if (values[i] > newValue + 44) {
      index = i - 1
      break
    }
  }
  // console.log(index)
  tabControlRef.value?.setCurrentIndex(index)
})
</script>

<style lang="less" scoped>
.tabs {
  position:fixed;
  z-index: 99;
  top:0;
  left:0;
  right: 0;
  background-color: #fff;
}
.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;

  img {
    width: 123px;
  }

  .text {
    margin-top: 12px;
    font-size: 12px;
    color: #7688a7;
  }
}
</style>