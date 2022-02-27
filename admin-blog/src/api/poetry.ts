import { http } from "../utils/http"

/* 列表 */
export const getPoetryList = (data: object) => {
  return http.request("get", "/poetry/list", { data })
}



