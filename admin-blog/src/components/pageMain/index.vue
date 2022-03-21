<template>
  <div class="page_mian_header">
    <div>
      <slot name="header"></slot>
    </div>
    <div class="right-buttons">
      <slot name="header-right"></slot>
    </div>
  </div>
  <div class="page_mian_table"><slot name="main"></slot></div>
  <div class="page_mian_pagenation"><slot name="page"></slot></div>
  <div><slot></slot></div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref, onBeforeMount, onMounted } from "vue"
</script>
<style scoped>
.page_mian_header,
.page_mian_table,
.page_mian_pagenation {
  margin-bottom: 5px;
}
.page_mian_header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}
.page_mian_header div:first-child {
  flex: 1;
}
.page_mian_header .right-buttons {
  flex-grow: 0;
  flex-shrink: 0;
  margin-left: 30px;
}
.page_mian_table {
  margin-bottom: 10px;
}

:deep(.el-pagination) {
  justify-content: flex-end;
}

:deep(.el-table__empty-block) {
  min-height: 200px;
}
</style>
