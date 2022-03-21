<template>
  <div>
    <header class="editor_header">
      <div class="left_box">
        <input
          type="text"
          class="title_input"
          placeholder="请输入标题"
          maxlength="80"
          v-model.lazy="title"
        />
      </div>
      <div class="right_box">
        <div class="status_text">文章将自动保存至草稿</div>
        <div><el-button>草稿箱</el-button></div>
        <div>
          <publishButton :content="content" :title="title"></publishButton>
        </div>
        <el-avatar :size="40" :src="avatars" class="avatar"></el-avatar>
      </div>
    </header>
    <VueMarkdownEditor
      :left-toolbar="leftToolbar"
      v-model.lazy="content"
      @upload-image="handleUploadImage"
      :disabled-menus="[]"
    ></VueMarkdownEditor>
  </div>
</template>
<script lang="ts" setup>
import { reactive, toRefs, ref, onBeforeMount, onMounted } from "vue"
import VueMarkdownEditor from "@kangc/v-md-editor"
import "@kangc/v-md-editor/lib/style/base-editor.css"
import vuepressTheme from "@kangc/v-md-editor/lib/theme/vuepress.js"
import "@kangc/v-md-editor/lib/theme/style/vuepress.css"
import createEmojiPlugin from "@kangc/v-md-editor/lib/plugins/emoji/index"
import "@kangc/v-md-editor/lib/plugins/emoji/emoji.css"
import createTodoListPlugin from "@kangc/v-md-editor/lib/plugins/todo-list/index"
import "@kangc/v-md-editor/lib/plugins/todo-list/todo-list.css"
import createCopyCodePlugin from "@kangc/v-md-editor/lib/plugins/copy-code/index"
import "@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css"
import Prism from "prismjs"
import avatars from "/@/assets/avatars.jpg"
import publishButton from "./components/publishButton.vue"
VueMarkdownEditor.use(vuepressTheme, {
  Prism,
})
VueMarkdownEditor.use(createEmojiPlugin())
VueMarkdownEditor.use(createTodoListPlugin())
VueMarkdownEditor.use(createCopyCodePlugin())
const leftToolbar =
  "undo redo clear | h bold italic strikethrough quote | ul ol table hr | link image code | todo-list emoji tip | save"
const content = ref("")
const title = ref("")
const handleUploadImage = (event, insertImage, files) => {
  console.log(files)
}
</script>
<style scoped lang="scss">
.editor_header {
  width: 100%;
  height: 63px;
  padding: 0 27px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e5e7eb;
  .left_box {
    flex: 1;
    box-sizing: border-box;
    padding: 0 25px;
  }
  .right_box {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.editor_header .title_input {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  font-size: 24px;
  font-weight: 500;
  color: #1d2129;
  border: none;
  outline: none;
}
.editor_header .right_box {
  div {
    padding: 0 5px;
  }
  .status_text {
    font-size: 14px;
    white-space: nowrap;
    color: #c9cdd4;
    cursor: default;
    user-select: none;
  }
  .avatar {
    width: 40px;
    height: 40px;
    margin-left: 15px;
  }
}
::v-deep(.v-md-editor) {
  height: calc(100vh - 63px);
}
::v-deep(.el-button) {
  border-radius: 0;
}
</style>
