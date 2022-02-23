<template>
	<img :src="bg" class="wave" />
	<div class="login_container">
		<div class="img"><component :is="currentWeek"></component></div>
		<div class="login_box">
			<div>
				<avatar class="avatar"></avatar>
				<h2>胡萝卜菜</h2>
				<div class="input-group">
					<h5>账号</h5>
					<input type="text" placeholder="请输入账号" class="input" />
				</div>
				<div class="input-group">
					<h5>密码</h5>
					<input
						type="password"
						placeholder="请输入密码"
						class="input"
					/>
				</div>
				<div class="btn" @click="onLogin">确认按钮</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
	import { setCookie, getCookie, delCookie } from "@/utils/cookie"
	import { ref, computed } from "vue"
	import { useRouter } from "vue-router"
	import bg from "@/assets/login/bg.png"
	import avatar from "@/assets/login/avatar.svg?component"
	import illustration0 from "@/assets/login/illustration0.svg?component"
	import illustration1 from "@/assets/login/illustration1.svg?component"
	import illustration2 from "@/assets/login/illustration2.svg?component"
	import illustration3 from "@/assets/login/illustration3.svg?component"
	import illustration4 from "@/assets/login/illustration4.svg?component"
	import illustration5 from "@/assets/login/illustration5.svg?component"
	import illustration6 from "@/assets/login/illustration6.svg?component"
	const router = useRouter()

	const currentWeek = computed(() => {
		let randNum = Math.floor(Math.random() * 7)
		let svgList = [
			illustration0,
			illustration1,
			illustration2,
			illustration3,
			illustration4,
			illustration5,
			illustration6,
		]
		return svgList[randNum]
	})

	const onLogin = (): void => {
		setCookie("dadas")
		router.push("/")
	}
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
	width: 100%;
}
.login_box {
	flex-direction: column;
}
.login_box {
	.avatar {
		width: 300px;
		height: 150px;
	}
	h2 {
		text-transform: uppercase;
		margin: 15px 0;
		color: #999;
		font: bold 200% Consolas, Monaco, monospace;
		text-align: center;
	}
}
svg {
	transform: scale(0.7);
}
.input-group {
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 25px 0;
	padding: 5px 0;
	border-bottom: 2px solid #d9d9d9;
	width: 100%;
	h5 {
		color: #d9d9d9;
		font-size: 18px;
	}
}

.input-group:last-child {
	margin-bottom: 40px;
	background: pink;
}

.input {
	border: none;
	outline: none;
	background: none;
	padding: 0.5rem 0.7rem;
	font-size: 1.2rem;
	color: #555;
	font-family: "Roboto", sans-serif;
}

input::-webkit-input-placeholder {
	color: #ecf0f1;
	font-size: 20px;
	font-weight: 400;
}
.btn {
	display: flex;
	align-content: center;
	justify-content: center;
	width: 100%;
	height: 50px;
	line-height: 50px;
	border-radius: 25px;
	margin: 1rem 0;
	font-size: 1.2rem;
	outline: none;
	border: none;
	background-image: linear-gradient(to right, #567dbe, #5392f0, #567dbe);
	cursor: pointer;
	color: #fff;
	text-transform: uppercase;
	font-family: "Roboto", sans-serif;
	background-size: 200%;
	transition: 0.5s;
}

.btn:hover {
	background-position: right;
}
</style>
