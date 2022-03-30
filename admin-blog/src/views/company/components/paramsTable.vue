
<template>
  <div>
    <el-table :data="headerDaTa" border style="width: 100%">
      <el-table-column prop="key" label="参数名">
        <template #default="scope">
          <el-input v-model="scope.row.key" placeholder="请输入参数名" />
        </template>
      </el-table-column>
      <el-table-column prop="value" label="参数值">
        <template #default="scope">
          <el-input v-model="scope.row.value" placeholder="请输入参数值" />
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作" width="160">
        <template #default="scope">
          <div class="icons">
            <el-icon @click="hadnleAdd(scope)">
              <plus />
            </el-icon>
            <el-icon @click="hadnleDel(scope)">
              <delete />
            </el-icon>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
const headerDaTa = ref([
  { key: null, value: null }
])

const hadnleAdd = (scope) => {
  headerDaTa.value.push({ key: null, value: null },)
}
const hadnleDel = (scope) => {
  let index = scope.$index
  if (headerDaTa.value.length > 1) {
    headerDaTa.value.splice(index, 1)
  }
}
</script>


<style scoped>
::v-deep(.el-input__inner) {
  border: none;
}

::v-deep(.el-input__inner:focus) {
  border: 1px solid #dcdfe6;
}

.icons {
  font-size: 20px;
  font-weight: 500;
}
.el-icon {
  margin: 0 10px;
}
</style>
