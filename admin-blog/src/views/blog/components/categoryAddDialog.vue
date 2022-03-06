<template>
  <el-dialog
    :model-value="dialogVisible"
    width="550px"
    :before-close="handleClose"
  >
    <div>
      <el-form :model="categoryInfo" label-width="100px">
        <el-form-item label="所属分类">
          <span>{{ categoryInfo.parent_name }}</span>
        </el-form-item>
        <el-form-item label="分类名称">
          <el-input
            v-model="categoryInfo.name"
            placeholder="清输入分类名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="分类序号">
          <el-input
            v-model.number="categoryInfo.sort_order"
            placeholder="清输入分类序号"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="categoryInfo.status">
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="2">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" :loading="loading" @click="handleSubmit"
          >确认</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, toRef, ref, defineProps, defineEmits } from "vue"
import { ElMessageBox } from "element-plus"
const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  categoryInfo: {
    type: Object,
  },
  ceshi: {
    type: String,
  },
})
const loading = ref(false)

const dialogVisible = toRef(props, "open")
const categoryInfo = toRef(props, "categoryInfo")
const emits = defineEmits(["update:open", "update:ceshi"])
const handleClose = (done: () => void) => {
  done()
}
const closeDialog = () => {
  emits("update:open", false)
  emits("update:ceshi", "测试修改父元素")
}
const handleSubmit = () => {
  loading.value = true
  console.log(categoryInfo.value)
}
</script>
<style scoped></style>
