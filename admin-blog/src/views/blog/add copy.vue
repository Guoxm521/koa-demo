<template>
  <div>
    <header></header>
    <md-editor v-model="text" class="editor_container" />
  </div>
</template>
<script lang="ts" setup>
import { reactive, toRefs, ref, onBeforeMount, onMounted } from "vue"
import MdEditor from "md-editor-v3"
import "md-editor-v3/lib/style.css"
const text = ref("")
</script>
<style scoped lang="scss">
header {
  width: 100%;
  height: 63px;
  background: pink;
}
.editor_container {
  height: calc(100vh - 63px);
}
</style>
