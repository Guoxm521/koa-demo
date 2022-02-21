import { createApp } from 'vue'
import router from "./permission";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import * as Icons from '@element-plus/icons-vue'

// 导入公共样式
import "./style/index.scss";

const app = createApp(App)
app.use(ElementPlus)
for (const name in Icons) {
    /*
     * 以elIcon为前缀的命名规则，是为了适配已经使用属性名添加图标的内置组件，
     * 例如：<el-button icon="el-icon-refresh"></el-button>
     */
    app.component(name, (Icons as any)[name]);
}

app.use(router)
app.mount('#app')
