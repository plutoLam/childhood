import {
  Icon,
  Input,
  Dialog,
  Loading,
  Pagination,
  Message,
  Divider,
  Form,
  FormItem,

} from "element-ui"
import * as utils from "./index"

export default {
  install(Vue) {
    const requireComponent = require.context(
      "@/base",
      true,  //遍历文件子目录
      /[a-z0-9]+\.(jsx?|vue)$/i,
    )

    // 批量注册base组件
    requireComponent.keys().forEach(fileName => {
      const componentConfig = requireComponent(fileName)
      const componentName = componentConfig.default.name
      if (componentName) {
        Vue.component(componentName, componentConfig.default || componentConfig)
      }
    })

    // 重写
    function rewirteLog() {
      console.log = (function (log) {
        return process.env.NODE_ENV == 'development' ? log : function () { }
      }(console.log))
    }
    rewirteLog()


    Vue.prototype.$utils = utils
    Vue.prototype.$ELEMENT = { size: "small" }

    Vue.use(Icon)
    Vue.use(Input)
    Vue.use(Dialog)
    Vue.use(Loading)
    Vue.use(Pagination)
    Vue.use(Divider)
    Vue.use(Form)
    Vue.use(FormItem)

    Vue.prototype.$message = Message;
  }
}