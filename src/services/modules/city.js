import hyRequest from '@/services/request/index'
export function getCityAll() {
  return hyRequest.get ({
    url: "/city/all"
  })
}