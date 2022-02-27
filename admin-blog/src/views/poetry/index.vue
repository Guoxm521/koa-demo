<template>
  <div>诗词列表</div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref, onBeforeMount, onMounted } from "vue"
import { getPoetryList } from "/@/api/poetry"

getPoetryList({}).then(res => {
  console.log(res)
})
</script>
<style scoped></style>
