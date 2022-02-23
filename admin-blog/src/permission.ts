import router from './router/index'
import NProgress from './utils/progress'
import { setCookie, getCookie, delCookie } from '@/utils/cookie'

router.beforeEach((to, from, next) => {
    NProgress.start()
    // @ts-ignore
    document.title = to.meta?.title ? to.meta.title : '胡萝卜菜'
    if (getCookie()) {
        if (to.path === '/login') {
            let path = to.path
            next(`/?from=${path}`)
        } else {
            next()
        }

    } else {
        if (to.path !== '/login') {
            let path = to.path
            next(`/login?from=${path}`)
        } else {
            next()
        }
    }
})


router.afterEach(() => {
    NProgress.done()
})

export default router