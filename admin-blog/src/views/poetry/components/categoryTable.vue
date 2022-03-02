<template>
  <div v-if="dynastyList.length > 0">
    <el-table :data="dynastyList" style="width: 100%">
      <el-table-column prop="dynasty_id" label="id"> </el-table-column>
      <el-table-column prop="dynasty" label="朝代"> </el-table-column>
      <el-table-column prop="time" label="时期"> </el-table-column>
    </el-table>
  </div>
  <div v-else class="empty_container">
    <el-empty description="暂无数据"></el-empty>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref, defineProps, onMounted } from "vue"
const props = defineProps({
  dynastyList: Array,
})
</script>
<style scoped>
.empty_container {
  width: 100%;
  height: 100%;
  display: flex;
  align-content: center;
  justify-content: center;
}
</style>
