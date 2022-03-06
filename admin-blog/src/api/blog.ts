import { http } from "../utils/http"

/* 分类---列表 */
export const getBlogList = (data: object) => {
  return http.request("get", "/blob/category/list", { data })
}

/* 分类---删除 */
export const delBlogCategory = (data: object) => {
  return http.request("post", "/blob/category/delete", { data })
}
