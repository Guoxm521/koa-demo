import Cookies from "js-cookie"
import { useUserStoreHook } from "/@/store/modules/user"

const TokenKey = "authorized-token"

type paramsMapType = {
  name: string
  expires: number
  accessToken: string
}

// 获取token
export function getToken() {
  // 此处与TokenKey相同，此写法解决初始化时Cookies中不存在TokenKey报错
  return Cookies.get("authorized-token")
}

// 设置token以及过期时间（cookies、sessionStorage各一份）
// 后端需要将用户信息和token以及过期时间都返回给前端，过期时间主要用于刷新token
export function setToken(data, expires) {
  Cookies.set(TokenKey, data, { expires: expires })
  sessionStorage.setItem(TokenKey, data)
}

// 删除token
export function removeToken() {
  Cookies.remove(TokenKey)
  sessionStorage.removeItem(TokenKey)
}
