import { http } from "../utils/http"

/* 列表 */
export const getPoetryList = (data: object) => {
  return http.request("get", "/poetry/list", { data })
}

/* 分类 */
export const getPoetryCategory = (data: object) => {
  return http.request("get", "/poetry/category", { data })
}

/* 各朝诗人top */
/* level 个数   type  1  各朝分类  2  全部排行*/
export const getDynastyTop = (data: object) => {
  return http.request("get", "/poetry/dynastyTop", { data })
}

/* 各朝总数 */
/* order 1  顺序  2 倒叙 */
export const getCategoryCount = (data: object) => {
  return http.request("get", "/poetry/categoryCount", { data })
}
