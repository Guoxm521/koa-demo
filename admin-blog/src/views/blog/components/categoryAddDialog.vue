<template>
  <el-dialog
    :model-value="dialogVisible"
    width="550px"
    :before-close="handleClose"
  >
    <div>
      <el-form :model="categoryInfo" label-width="100px">
        <el-form-item label="所属分类">
          <span>{{ parent_name }}</span>
        </el-form-item>
        <el-form-item label="分类名称">
          <el-input v-model="form.name" placeholder="清输入分类名称"></el-input>
        </el-form-item>
        <el-form-item label="分类序号">
          <el-input
            v-model.number="form.sort_order"
            placeholder="清输入分类序号"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.status">
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
import { reactive, toRef, ref, defineProps, defineEmits, watch } from "vue"
import { addBlogCategory, updateBlogCategory } from "/@/api/blog"
import { ElMessage } from "element-plus"
import { object } from "vue-types"
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
  type: {
    type: String,
  },
})
const loading = ref(false)
const dialogVisible = toRef(props, "open")
const categoryInfo = toRef(props, "categoryInfo")
const type = toRef(props, "type")
const parent_name = ref("")

watch(props, (newProps, oldProps) => {
  if (newProps.categoryInfo && newProps.type && newProps.open) {
    if (newProps.type === "add") {
      parent_name.value = categoryInfo.value.name
      form.value.parent_id = categoryInfo.value.id
      console.log("新增")
    } else if (newProps.type === "edit") {
      console.log("编辑")
      parent_name.value = categoryInfo.value.parent_name
      form.value.parent_id = categoryInfo.value.parent_id
      form.value.name = categoryInfo.value.name
      form.value.sort_order = categoryInfo.value.sort_order
      form.value.status = categoryInfo.value.status
      form.value = Object.assign({ id: categoryInfo.value.id }, form.value)
    }
  }
})

const formInfo = {
  parent_id: null,
  name: null,
  sort_order: null,
  status: 1,
}
let form = ref(Object.assign({}, formInfo))

const emits = defineEmits(["update:open", "update:ceshi", "refresh"])
const handleClose = (done: () => void) => {
  form.value = Object.assign({}, formInfo)
  done()
  emits("update:open", false)
}
const closeDialog = () => {
  form.value = Object.assign({}, formInfo)
  console.log(form.value)
  emits("update:open", false)
  emits("update:ceshi", "测试修改父元素")
}
const handleSubmit = async () => {
  loading.value = true
  let message = null
  if (type.value === "add") {
    await addBlogCategory(form.value).then((res: any) => {
      if (res.code === 200) message = "新增成功"
    })
  } else if (type.value === "edit") {
    await updateBlogCategory(form.value).then((res: any) => {
      if (res.code === 200) message = "修改成功"
    })
  }
  if (message) {
    ElMessage.success(message)
    emits("refresh")
  }
  loading.value = false
  closeDialog()
}
</script>
<style scoped></style>
