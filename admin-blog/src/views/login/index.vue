<template>
    <img :src="bg" class="wave" />
    <div class="login_container">
        <div class="img"><component :is="currentWeek"></component></div>
        <div class="login_box">
            <avatar class="avatar"></avatar>
            <h2>胡萝卜菜</h2>
            <div>账号输入框</div>
            <div>密码输入框</div>
            <div>确认按钮</div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, computed } from "vue"
import bg from "@/assets/login/bg.png"
import avatar from "@/assets/login/avatar.svg?component"
import illustration0 from "@/assets/login/illustration0.svg?component"
import illustration1 from "@/assets/login/illustration1.svg?component"
import illustration2 from "@/assets/login/illustration2.svg?component"
import illustration3 from "@/assets/login/illustration3.svg?component"
import illustration4 from "@/assets/login/illustration4.svg?component"
import illustration5 from "@/assets/login/illustration5.svg?component"
import illustration6 from "@/assets/login/illustration6.svg?component"

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
    flex-direction: column;
    background-color: skyblue;
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
    }
}
svg {
    transform: scale(0.7);
}
</style>
