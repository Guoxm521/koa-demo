<template>
  <Card>
    <template #header> <div class="title">关于</div> </template>
    <template #main>
      <div class="content">
        本项目是基于 Vue3、Vite、Element UI、TypeScript，管理模板是运用的<a
          class="link"
          target="_blank"
          href="https://github.com/xiaoxian521/pure-admin-thin"
          >pure-admin-thin</a
        >一模板，它使用了最新的前端技术栈，并提炼了典型的业务模型，页面，包括二次封装组件、动态菜单、权限校验、粒子化权限控制等功能。写本项目主要是为了学习并运用一下vue3等技术，其中涉及功能主要是博客的管理，对接第三方oss资源等，想到什么功能就加入什么功能，后端的话主要是运用的是node
        koa+mysql+redis，部署在自己的个人服务器上，部署用的docker。
      </div>
    </template>
  </Card>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref, onBeforeMount, onMounted } from "vue"
import Card from "./Card.vue"
</script>
<style scoped>
.title,
.content {
  padding: 0 12px;
}
.content {
  font-size: 14px;
  line-height: 24px;
}
.content a {
  padding: 2px 5px;
  margin: 0 5px;
  background-color: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
</style>
