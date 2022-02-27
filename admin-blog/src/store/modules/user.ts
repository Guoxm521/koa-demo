import { defineStore } from "pinia"
import { store } from "/@/store"
import { userType } from "./types"
import { getLogin } from "/@/api/user"
import { storageLocal, storageSession } from "/@/utils/storage"
import { getToken, setToken, removeToken } from "/@/utils/auth"
import { useMultiTagsStoreHook } from "/@/store/modules/multiTags"
import router from "/@/router"
const data = storageLocal.getItem("userInfo")
let token = ""
let name = ""
if (data) {
  const dataJson = JSON.parse(data)
  if (dataJson) {
    name = dataJson?.nickname ?? "admin"
  }
}

export const useUserStore = defineStore({
  id: "pure-user",
  state: (): userType => ({
    token,
    name,
  }),
  actions: {
    SET_TOKEN(token) {
      this.token = token
    },
    SET_NAME(name) {
      this.name = name
    },
    // 登入
    async loginByUsername(data) {
      return new Promise<any>((resolve, reject) => {
        getLogin(data)
          .then(res => {
            if ((res as any).code === 200) {
              let expired = (res as any).data.expired
              let day = Number(expired / 60 / 60 / 24)
              setToken((res as any).data.token, day)
              const from = {
                nickname: (res as any).data.nickname,
                email: (res as any).data.email,
              }
              storageLocal.setItem("userInfo", JSON.stringify(from))
              this.SET_NAME((res as any).data.nickname)
              resolve(res)
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 登出 清空缓存
    logOut() {
      this.token = ""
      this.name = ""
      removeToken()
      storageLocal.clear()
      storageSession.clear()
      useMultiTagsStoreHook().handleTags("equal", [
        {
          path: "/welcome",
          parentPath: "/",
          meta: {
            title: "menus.hshome",
            icon: "home-filled",
            i18n: true,
          },
        },
      ])
      router.push("/login")
    },
  },
})

export function useUserStoreHook() {
  return useUserStore(store)
}
