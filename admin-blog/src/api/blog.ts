import { http } from "../utils/http"

/* 分类---列表 */
export const getBlogList = (data: object) => {
  return http.request("get", "/blob/category/list", { data })
}

/* 分类---删除 */
export const delBlogCategory = (data: object) => {
  return http.request("post", "/blob/category/delete", { data })
}

/* 分类---新增 */
export const addBlogCategory = (data: object) => {
  return http.request("post", "/blob/category/add", { data })
}

/* 分类---更新 */
export const updateBlogCategory = (data: object) => {
  return http.request("post", "/blob/category/update", { data })
}
