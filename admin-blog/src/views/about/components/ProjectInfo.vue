<template>
  <Card>
    <template #header> <div class="title">项目信息</div> </template>
    <template #main>
      <el-descriptions class="margin-top" :column="2" border>
        <el-descriptions-item label="版本">
          <el-tag>v {{ version }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="	最后编译时间">
          <el-tag>{{ lastestBuildTime }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="	Github地址">
          https://github.com/Guoxm521
        </el-descriptions-item>
        <el-descriptions-item label="	项目地址">
          demo.gxming.top
        </el-descriptions-item>
        <el-descriptions-item label="	后端技术栈">
          koa + sequelize + redis + docker
        </el-descriptions-item>
      </el-descriptions>
    </template>
  </Card>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref, onBeforeMount, onMounted } from "vue"
import Card from "./Card.vue"
import pkgJson from "./../model"
const { version } = pkgJson
const lastestBuildTime = PROJECT_BUILD_TIME
</script>
<style scoped>
.content {
  font-size: 14px;
  line-height: 24px;
}
</style>
