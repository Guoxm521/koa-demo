<template>
  <div class="card">
    <div class="header">
      <slot name="header"></slot>
    </div>

    <div class="main">
      <slot name="main"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref, onBeforeMount, onMounted } from "vue"
</script>
<style scoped>
.card {
  width: 100%;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 6px;
  padding: 12px 16px;
  margin-bottom: 22px;
}
.main {
  margin-top: 15px;
}
.header {
  font-size: 16px;
}
</style>
