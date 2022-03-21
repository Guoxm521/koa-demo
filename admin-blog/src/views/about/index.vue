<template>
  <div class="main-content">
    <ProjectIntroduction />
    <ProjectInfo />
    <ProDependency />
    <DevDependency />
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref, onBeforeMount, onMounted } from "vue"
import ProjectInfo from "./components/ProjectInfo.vue"
import ProjectIntroduction from "./components/ProjectIntroduction.vue"
import DevDependency from "./components/DevDependency.vue"
import ProDependency from "./components/ProDependency.vue"
</script>
<style scoped>
.main-content {
  background-color: transparent;
  min-height: fit-content;
}
</style>
