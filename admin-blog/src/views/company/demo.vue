<template>
  <div>
    <p>vue-json-editor</p>
    <!-- 上传文件 ：
    <input type="file" ref="refFile" name="file" id="fileId" @change="fileLoad($event)" />-->
    <Vue3JsonEditor
      v-model="json"
      :show-btns="true"
      :expandedOnStart="true"
      @json-change="onJsonChange"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue'
import { Vue3JsonEditor } from 'vue3-json-editor'

export default defineComponent({
  components: {
    Vue3JsonEditor
  },
  setup() {
    function onJsonChange(value) {
      console.log('value:', value)
    }
    const refFile = ref<HTMLElement>()
    const fileLoad = (event) => {
      const selectedFile = event.target.files[0]
      console.log(selectedFile)
      var reader = new FileReader();
      reader.readAsText(selectedFile);
      reader.onload = function () {
        // console.log(this.result);
      }
    }

    const state = reactive({
      json: {}
    })

    return {
      ...toRefs(state),
      onJsonChange
    }
  }
})
</script>