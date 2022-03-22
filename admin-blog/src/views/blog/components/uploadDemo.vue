<template>
  <el-upload
    class="avatar-uploader"
    action=""
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :http-request="handleUpload"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
  <div @click="handleAdd">你好</div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue"
import { useRouter } from "vue-router"
import { ElMessage } from "element-plus"
import { Plus } from "@element-plus/icons-vue"
import { getUploadParams } from "/@/api/common"
import OSS from "ali-oss"
import axios from "axios"
const route = useRouter()
const imageUrl = ref("")
const handleAvatarSuccess = (res, file) => {
  imageUrl.value = URL.createObjectURL(file.raw!)
}
const beforeAvatarUpload = file => {
  const isJPG = file.type === "image/jpeg"
  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isJPG) {
    ElMessage.error("Avatar picture must be JPG format!")
  }
  if (!isLt2M) {
    ElMessage.error("Avatar picture size can not exceed 2MB!")
  }
  return isJPG && isLt2M
}

const ossParams: any = ref({})
const handleGetUploadParams = () => {
  getUploadParams({}).then((res: any) => {
    ossParams.value = res.data
  })
}
const handleUpload = op => {
  let obj = ossParams.value
  let config: any = {}
  config.host = obj["host"]
  config.policyBase64 = obj["policy"]
  config.accessid = obj["accessid"]
  config.signature = obj["signature"]
  config.expire = parseInt(obj["expire"])
  config.callbackbody = obj["callback"]
  config.dir = obj["dir"]
  let fd = new FormData(),
    uuid = new Date().getTime(),
    key = config.dir + uuid + op.file.name
  fd.append("key", key)
  // fd.append("success_action_status", "200")
  fd.append("x-oss-object-acl", "public-read")
  fd.append("x-oss-meta-fullname", op.file.name)
  fd.append("OSSAccessKeyId", config.accessid)
  fd.append("policy", config.policyBase64)
  fd.append("signature", config.signature)
  fd.append("callback", config.callbackbody)
  // fd.append("success_action_status", "200")
  fd.append("file", op.file)
  if (config.host.indexOf("http:") > -1) {
    var protocol = window.location.protocol || "http:"
    var subUrl = config.host.substring(5, config.host.length)
    config.host = protocol + subUrl
  }
  // 数据组装完成后，发送上传请求到阿里云oss
  axios({
    url: config.host,
    method: "POST",
    headers: {
      "x-oss-callback": config.callbackbody,
    },
    data: fd,
  })
    .then(res => {
      console.log(res)
      // 拿到结果后，做其他操作
    })
    .catch(err => {
      console.log(err)
    })
}
handleGetUploadParams()
const handleAdd = () => {
  let href = route.resolve("/blog/add")
  console.log(href)
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}
.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}
.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
