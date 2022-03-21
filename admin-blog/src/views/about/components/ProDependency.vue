<template>
  <Card>
    <template #header> <div class="title">生产依赖</div> </template>
    <template #main>
      <el-descriptions class="margin-top" :column="3" border>
        <el-descriptions-item
          v-for="(item, index) in dependencies"
          :key="index"
          :label="item.name"
        >
          {{ item.version }}
        </el-descriptions-item>
      </el-descriptions>
    </template>
  </Card>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref, onBeforeMount, onMounted } from "vue"
import Card from "./Card.vue"
import pkgJson from "./../model"
const { dependencies } = pkgJson
</script>
<style scoped>
.content {
  font-size: 14px;
  line-height: 24px;
}
</style>
