//自动注册 
import Vue from "vue"
const requireComponent = require.context(
  "./../components/comm",
  false
)


requireComponent.keys().forEach(fileName=>{


  const componentConfig = requireComponent(fileName)
  const componentName = fileName.split('/').pop().replace(/\.vue$/, '')

  Vue.component(
    componentName,   // 此处的name,是组件属性定义的name
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
)
})