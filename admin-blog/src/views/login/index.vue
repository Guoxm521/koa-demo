<template>
	<img :src="bg" class="wave" />
	<div class="login_container">
		<div class="img"><component :is="illustration0"></component></div>
		<div class="login_box">321312312</div>
	</div>
</template>
<script lang="ts" setup>
	import { ref } from "vue";
	import bg from "@/assets/login/bg.png";
	import illustration0 from "@/assets/login/illustration0.svg?component";
</script>
<style lang='scss' scoped>
.wave {
	position: fixed;
	height: 100%;
	left: 0;
	bottom: 0;
	z-index: -1;
}
.login_container {
	width: 100vw;
	height: 100vh;
	display: grid;
	box-sizing: border-box;
	grid-template-columns: repeat(2, 1fr);
	grid-gap: 18rem;
	padding: 0 2rem;
}
.img,
.login_box {
	display: flex;
	align-items: center;
	justify-content: center;
}
.login_box {
	background-color: skyblue;
}
</style>
