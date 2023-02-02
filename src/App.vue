<template>
  <div class="app">
    <!-- keep-alive匹配的是name属性 -->
  <router-view v-slot="props">
    <keep-alive include="home">
      <component :is="props.Component" />
    </keep-alive>
 </router-view>
  <tab-bar v-show="!route.meta.hideTabbar"/>
  <loading/>

  <!-- <tab-bar/> -->

  
  </div>
</template>

<script setup>
import TabBar from '@/components/tab-bar/tabbar.vue';
import { useRoute } from 'vue-router';
import Loading from './components/loading/loading.vue';

const route = useRoute()
</script>



<style scoped>

</style>
