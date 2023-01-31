import { onMounted, onUnmounted, ref } from "vue"
import { throttle} from "underscore"

// méthode 1:
// export default function useScroll(reachBottomCB) {
//   const scrollListenerHandler = () =>{
//     const clientHeight = document.documentElement.clientHeight
//     const scrollTop=document.documentElement.scrollTop
//     const scrollHeight=document.documentElement.scrollHeight
//     if(clientHeight+scrollTop>=scrollHeight) {
//       if (reachBottomCB) reachBottomCB()
//     }
//   }
  
//   onMounted(() => {
//   window.addEventListener("scroll", scrollListenerHandler)
    
//   })
//   // 当我们离开页面时，移除监听
//   onUnmounted(() => {
//     window.removeEventListener("scroll", scrollListenerHandler)
//   })
// }


// méthode 2:

export default function useScroll() {
  const isReachBottom = ref(false)
  const clientHeight=ref(0)
  const scrollTop = ref(0)
  const scrollHeight = ref(0)
// 防抖/节流 npm install underscore
  const scrollListenerHandler = throttle(() =>{
    clientHeight.value = document.documentElement.clientHeight
    scrollTop.value=document.documentElement.scrollTop
    scrollHeight.value =document.documentElement.scrollHeight
    
    if(clientHeight.value+scrollTop.value>=scrollHeight.value) {
      isReachBottom.value=true
    }
  },100)
  
  onMounted(() => {
  window.addEventListener("scroll", scrollListenerHandler)
    
  })
  // 当我们离开页面时，移除监听
  onUnmounted(() => {
    window.removeEventListener("scroll", scrollListenerHandler)
  })

  return {isReachBottom, scrollHeight, scrollTop, clientHeight}
}