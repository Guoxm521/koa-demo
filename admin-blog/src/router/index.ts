import { Router, createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import loginRouter from "./modules/login";

// 创建实例
export const router: Router = createRouter({
    history: createWebHashHistory(),
    routes: loginRouter,
    strict: true
})

export default router;