import { http } from "../utils/http"

/* 上传图片---获取参数 */
export const getUploadParams = (data: object) => {
  return http.request("get", "/common/upload/ossparams", { data })
}
