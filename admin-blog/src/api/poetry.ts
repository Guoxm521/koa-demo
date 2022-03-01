import { http } from "../utils/http"

/* 列表 */
export const getPoetryList = (data: object) => {
  return http.request("get", "/poetry/list", {data})
}


/* 分类 */
export const getPoetryCategory = (data: object) => {
  return http.request("get", "/poetry/category", {data})
}



