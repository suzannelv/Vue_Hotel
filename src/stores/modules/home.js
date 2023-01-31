import { defineStore } from "pinia";
// import hyRequest from '@/services/request/index'
import { getHomeHotSuggest, getCategories, getHouseList } from "@/services";
// import { get } from "vant/lib/utils"; 

const useHomeStore = defineStore("home", {
  state: () => ({
    hotSuggests:[],
    categories: [],
    
    currentPage:1,
    houseList: []
  }),
  actions: {
    async fetchHotSuggestData () {
      const res = await getHomeHotSuggest()
      this.hotSuggests = res.data
    },
    async fetchCategoriesData() {
      const res = await getCategories()
      this.categories = res.data
    },
    async fetchHouseListData() {
      const res = await getHouseList(this.currentPage)
      this.houseList.push(...res.data)
      this.currentPage++
    }
  }
})

export default useHomeStore
