<script setup lang="ts">
import { ref, computed } from "vue"
import { useRouter } from "vue-router"
import { initRouter } from "/@/router/utils"
import { storageSession } from "/@/utils/storage"
import { addClass, removeClass } from "/@/utils/operate"
import { useUserStoreHook } from "/@/store/modules/user"
import bg from "/@/assets/login/bg.png"
import avatar from "/@/assets/login/avatar.svg?component"
import illustration0 from "/@/assets/login/illustration0.svg?component"
import illustration1 from "/@/assets/login/illustration1.svg?component"
import illustration2 from "/@/assets/login/illustration2.svg?component"
import illustration3 from "/@/assets/login/illustration3.svg?component"
import illustration4 from "/@/assets/login/illustration4.svg?component"
import illustration5 from "/@/assets/login/illustration5.svg?component"
import illustration6 from "/@/assets/login/illustration6.svg?component"

const currentWeek = computed(() => {
  let randNum = Math.floor(Math.random() * 7)
  let svgList = [
    illustration0,
    illustration1,
    illustration2,
    illustration3,
    illustration4,
    illustration5,
    illustration6,
  ]
  return svgList[randNum]
})
const router = useRouter()

let user = ref("2925891606@qq.com")
let pwd = ref("gxm1234920")

const onLogin = async () => {
  const form = {
    email: user.value,
    password: pwd.value,
  }
  try {
    let res: any = await useUserStoreHook().loginByUsername(form)
    console.log(res)
    if (res.code === 200) {
      initRouter("admin").then(() => {})
      console.log(3123213123)
      router.push("/")
    }
  } catch (error) {
    console.log(error)
  }
}

function onUserFocus() {
  addClass(document.querySelector(".user"), "focus")
}

function onUserBlur() {
  if (user.value.length === 0)
    removeClass(document.querySelector(".user"), "focus")
}

function onPwdFocus() {
  addClass(document.querySelector(".pwd"), "focus")
}

function onPwdBlur() {
  if (pwd.value.length === 0)
    removeClass(document.querySelector(".pwd"), "focus")
}
</script>

<template>
  <img :src="bg" class="wave" />
  <div class="login-container">
    <div class="img">
      <component :is="currentWeek"></component>
    </div>
    <div class="login-box">
      <div class="login-form">
        <avatar class="avatar" />
        <h2
          v-motion
          :initial="{
            opacity: 0,
            y: 100,
          }"
          :enter="{
            opacity: 1,
            y: 0,
            transition: {
              delay: 100,
            },
          }"
        >
          Pure Admin
        </h2>
        <div
          class="input-group user focus"
          v-motion
          :initial="{
            opacity: 0,
            y: 100,
          }"
          :enter="{
            opacity: 1,
            y: 0,
            transition: {
              delay: 200,
            },
          }"
        >
          <div class="icon">
            <IconifyIconOffline icon="fa-user" width="14" height="14" />
          </div>
          <div>
            <h5>用户名</h5>
            <input
              type="text"
              class="input"
              v-model="user"
              @focus="onUserFocus"
              @blur="onUserBlur"
            />
          </div>
        </div>
        <div
          class="input-group pwd focus"
          v-motion
          :initial="{
            opacity: 0,
            y: 100,
          }"
          :enter="{
            opacity: 1,
            y: 0,
            transition: {
              delay: 300,
            },
          }"
        >
          <div class="icon">
            <IconifyIconOffline icon="fa-lock" width="14" height="14" />
          </div>
          <div>
            <h5>密码</h5>
            <input
              type="password"
              class="input"
              v-model="pwd"
              @focus="onPwdFocus"
              @blur="onPwdBlur"
            />
          </div>
        </div>
        <button
          class="btn"
          v-motion
          :initial="{
            opacity: 0,
            y: 10,
          }"
          :enter="{
            opacity: 1,
            y: 0,
            transition: {
              delay: 400,
            },
          }"
          @click="onLogin"
        >
          登录
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("/@/style/login.css");
</style>
