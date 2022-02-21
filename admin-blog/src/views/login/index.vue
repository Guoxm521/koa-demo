<template>
	<div>
		<el-input v-model="input" placeholder="Please input" />
		<el-input v-model="password" type="password" placeholder="Please input" />
		<el-button type="primary" @click="handle">Primary</el-button>
	</div>
</template>
<script lang="ts" setup>
	import { ref } from "vue";
	let input = ref();
	let password = ref();
	let handle = () => {
		console.log(input.value);
		console.log(password.value);
	};
</script>
<style lang='scss' scoped></style>
