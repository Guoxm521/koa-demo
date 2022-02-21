const loginRouter = [
    {
        path: "/",
        name: "welcome",
        component: () => import("@/views/welcome/index.vue"),
        meta: {
            title: '欢迎界面',
        }
    },
    {
        path: "/login",
        name: "login",
        component: () => import("@/views/login/index.vue"),
        meta: {
            title: '登录页面',
        }
    },
]

export default loginRouter;