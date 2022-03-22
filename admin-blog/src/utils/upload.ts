import OSS from "ali-oss"
import axios from "axios"
import { getUploadParams } from "/@/api/common"
let ossParams: any = null
const upload = (op: any) => {
  return new Promise(async (resolve, reject) => {
    if (!ossParams) {
      let res: any = await getUploadParams({})
      if (res.code === 200) {
        ossParams = res.data
      }
    }
    let obj = ossParams
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
      key = config.dir + uuid + op.name
    fd.append("key", key)
    // fd.append("success_action_status", "200")
    fd.append("x-oss-object-acl", "public-read")
    fd.append("x-oss-meta-fullname", op.name)
    fd.append("OSSAccessKeyId", config.accessid)
    fd.append("policy", config.policyBase64)
    fd.append("signature", config.signature)
    fd.append("callback", config.callbackbody)
    // fd.append("success_action_status", "200")
    fd.append("file", op)
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
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
export default upload
