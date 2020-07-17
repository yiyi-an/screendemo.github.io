import VueScreenWall from './index.vue'


// 全局注册
VueScreenWall.install = (Vue) => {
  Vue.component('', VueScreenWall)
};

// 按需导入
export default VueScreenWall 