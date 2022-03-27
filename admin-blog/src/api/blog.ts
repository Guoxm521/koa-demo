import { http } from "../utils/http"

/* 分类---列表 */
export const getBlogCaegoryList = (data: object) => {
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



/* 标签---新增 */
export const addBlogTag = (data: object) => {
  return http.request("post", "/blob/tags/add", { data })
}
/* 标签---更新 */
export const updateBlogTag = (data: object) => {
  return http.request("post", "/blob/tags/update", { data })
}
/* 标签---删除 */
export const deleteBlogTag = (data: object) => {
  return http.request("get", "/blob/tags/delete", { data })
}
/* 标签---列表 */
export const getBlogTagList = (data: object) => {
  return http.request("get", "/blob/tags/list", { data })
}



/* 博客---新增 */
export const addBlog = (data: object) => {
  return http.request("post", "/blog/main/add", { data })
}
/* 博客---更新 */
export const updateBlog = (data: object) => {
  return http.request("post", "/blog/main/update", { data })
}
/* 博客---列表 */
export const getBlogList = (data: object) => {
  return http.request("get", "/blog/main/list", { data })
}

/* 博客---删除 */
export const deleteBlog = (data: object) => {
  return http.request("post", "/blog/main/delete", { data })
}
/* 博客---详情 */
export const getBlogDetail = (data: object) => {
  return http.request("get", "/blog/main/detai", { data })
}

