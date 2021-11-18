import {
  Icon,
  Input,
  Dialog,
  Button,
  Loading,
  Carousel,
  CarouselItem,
  Table,
  TableColumn,
  Tabs,
  Popover,
  Pagination,
  Checkbox,
  Message,
  Divider,
  InfiniteScroll,
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

    Vue.use(Input)
    Vue.use(Carousel)
    Vue.use(CarouselItem)
    Vue.use(Table)
    Vue.use(TableColumn)
    Vue.use(Tabs)
    Vue.use(Popover)
    Vue.use(Pagination)
    Vue.use(Loading)
    Vue.use(Dialog)
    Vue.use(Button)
    Vue.use(Checkbox)
    Vue.use(Divider)
    Vue.use(InfiniteScroll)
    Vue.use(Icon)
    Vue.use(Form)
    Vue.use(FormItem)
    Vue.prototype.$message = Message;
  }
}