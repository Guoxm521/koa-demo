<template>
  <div>
        上传文件 ： <input type="file" ref="refFile" name = "file" id = "fileId" @change="fileLoad"/> 
        
  </div>
</template>

<script lang='ts'>
export default {
  setup(){
    return{

    }
  },
  methods:{
    fileLoad() {
      const selectedFile = this.$refs.refFile.files[0];
      console.log(selectedFile)
      var reader = new FileReader();
      reader.readAsText(selectedFile);
      reader.onload = function() {
          // console.log(this.result);
      }
    }

  }
}
</script>

<style scoped>

</style>
