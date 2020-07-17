<template>
  <div>
  <template v-if="curtainMode==='full'">
    <div class="full-page-wrapper" :style="{ position, height, width }" ref="fullPage">
      <div class="all-page" ref="allPage" :style="{transform:transformBind}">
          <div class="page"
              :ref="`page${p}`"  
            v-for="(p, index) in pagesArr"
            :key="index"
            :style="{
              height: fullHeight + 'px',
              width: fullWidth + 'px',
              'background-color':  p.bgColor || '',
              'background-image': (p.src && `url(${p.src})`) || ''
            }">
            <div class="page-box" v-if="currentPage == p.page">
              <slot :name="`page${p.page}`"></slot>
            </div>
          </div>
      </div>

      <!-- 导航按钮 -->
      <div class="navigation" :class="pointerPos" v-if="showNavigation && curtainMode==='full'">
        <ul>
          <li
            @click="switchPage(index)"
            v-for="(p,index) in pagesArr"
            :class="{active:currentPage == index }"
            :style="{'background-color':currentPage == index ? p.navigationColor : 'rgba(187,187,187)' }"
            :key="index"
          ></li>
        </ul>
      </div>
    </div>
  </template>
  <template v-else>
     <div class="full-page-wrapper" ref="fullPage">
      <div class="all-page" ref="allPage" :style="{transform:transformBind}">
          <div class="page"
              :ref="`page${p}`"  
            v-for="(p, index) in pagesArr"
            :key="index"
            :style="{
              height: fullHeight + 'px',
              width: fullWidth + 'px',
              'background-color':  p.bgColor || '',
              'background-image': (p.src && `url(${p.src})`) || ''
            }">
            <div class="page-box">
              <slot :name="`page${p.page}`"></slot>
            </div>
          </div>
      </div>
    </div>
  </template>
  </div>
</template>

<script>
import { debounce,throttle } from './utils'
export default {
  name: "MvFullPage",
  props: {
    /**
     * 是否显示指示器
     */
    showNavigation: {
      type: Boolean,
      default: true
    },
    /**
     * 指示器位置
     */
    pointerPos: {
      type: String,
      default: "right"
    },
    /**
     * 自定义容器宽度
     */
    position:{
      type:String,
      default:'absolute'
    },
    width: {
      type: String,
      default: "100%"
    },
    minHeight: {
      type: Number,
      default: 700
    },
    /**
     * 自定义容器高度
     */
    height: {
      type: String,
      default: "100vh"
    },
    /**
     * 页面总数
     */
    
    /**
     * 当前页面
     */
    page: {
      type: Number,
      default: 1
    },
    /**
     * 默认页面背景
     */
    pageProps: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      screenMode:"",
      rollOffset:0,
      pagesArr: [],
      fullHeight: 0, // 全屏高度
      fullWidth: 0, // 全屏宽度
      maxY: 0,
      maxX: 0,
      currentPage: 0, // 当前页面页码
      isUp: false, // 是否向上滑动
      subScrollEl: null // 触发源为内部滚动子元素dom
    };
  },
  computed: {
    pages(){
      return this.pagesArr.length
    },
    transformBind(){
        return `translateY(${this.rollOffset}px)`
    }
  },
  created() {
    // 检查window高度是否符合最小高度
    const oH = window.innerHeight
      if(oH>= this.minHeight){
        this.curtainMode = 'full'
      }else{
        this.curtainMode = 'scroll'
    }
  this.pagesArr = this.pageProps.map((p,index)=>{
    return {
      ...p,
      page: index ,
      isShow: index == 0 ? true : false
    }
  })
    // 直接通过slot创建
    // this.$nextTick(()=>{
    //     this.pagesArr = Object.keys(this.$slots).map((item,index)=> {
    //       return  {
    //         page: index ,
    //         isShow: index == 0 ? true : false
    //       }
    //     }
    //  )
    // })
  },
  mounted() {
    if(this.curtainMode==='full'){
      // 初始化页面宽高
      this.initPageWH();
      // 初始化页面滑动事件
      this.initPageListener();
      // 监听窗口大小变化
      this.initResize()

      this.$emit('pageEnter',this.pagesArr[this.currentPage])
    }else{
      this.initPageWH(true);

      this.initResize()
    }
  },
  watch: {
    // page: {
    //   handler: function(val) {
    //     this.switchPage(val)
    //   },
    //   immediate: true
    // },
    currentPage(value) {
      this.$emit("update:page", value);
    }
  },
  methods: {
    initResize(){
      window.onresize = debounce((e)=>{
        const {innerHeight} = e.target
        if(innerHeight< this.minHeight){
          console.log('窗口尺寸小屏',innerHeight)
          if(this.curtainMode==='scroll'){
            console.log("小屏变小屏,不用动")
            return 
          }else{
            console.log("大屏变小屏,重新载入页面")
            location.reload()
          }
        }else{
          console.log('窗口尺寸大屏',innerHeight)
          if(this.curtainMode==='scroll'){
            console.log("小屏变大屏,重新载入页面")
             location.reload()
          }else{
             console.log("大屏变大屏: 重新计算每屏宽高、重新定位")
            this.initPageWH()
            this.$nextTick(()=>{
              this.rollOffset =-((this.currentPage +1 ) * this.fullHeight) + this.fullHeight;
            })
          }
        }
      }, 300)
    },
    // 初始化容器宽高
    initPageWH(useMinHeight) {
      // 获取全屏高度
      this.fullHeight = useMinHeight ? this.minHeight : this.$refs.fullPage.clientHeight;
      // 获取全屏宽度
      this.fullWidth = this.$refs.fullPage.clientWidth;
      // 设置最大滑动高度
      this.maxY = this.pages * this.fullHeight;
      // 设置最大滑动宽度
      this.maxX = this.pages * this.fullWidth;
      // 初始化容器高度
      this.$refs.allPage.style.height = this.fullHeight * this.pages + "px";
      // 初始化容器宽度
      this.$refs.allPage.style.width = this.fullWidth * this.pages + "px";
    },
    initPageListener() {
      window.onmousewheel = document.onmousewheel = throttle(this.pcRoll,200)
    },
    pcRoll(e) {
      window.onmousewheel = document.onmousewheel = null
      if (e.deltaY > 0) {
        this.switchPage(true);
      } else {
        this.switchPage(false);
      }
      setTimeout(() => {
         this.initPageListener()
      }, 1200);
    },
    /**
     * 切换页面  true 下一页,  false 上一页 , number 指定页
     */
    switchPage(isDown) {
      if (this.$refs.allPage ) {
        // 跳到指定页
        if( typeof isDown ==='number'){
          this.currentPage = isDown;
           this.rollOffset = -(isDown *  this.fullHeight)
          // 页面开始滑动
          this.monitorTransition(this.pagesArr[this.currentPage])
        } else if (isDown && this.currentPage < (this.pagesArr.length-1)) {
          // 设置下一页为可视
          this.currentPage++;
          this.pagesArr[this.currentPage - 1].isShow = true;
          this.rollOffset = this.fullHeight - ((this.currentPage +1 )* this.fullHeight)
          // 页面开始滑动
          this.monitorTransition(this.pagesArr[this.currentPage])
        } else if (!isDown && this.currentPage > 0) {
          this.currentPage--;
          this.rollOffset =this.fullHeight - ((this.currentPage +1 )* this.fullHeight)
          // 页面开始滑动
          this.monitorTransition(this.pagesArr[this.currentPage])
        }
      }
    },
    // 页面切换的钩子
    monitorTransition(pageProp){
      let rollTransitionend = () => {
          setTimeout(() => {
            this.$emit('pageEnter',pageProp)
          }, 0);
          this.$refs.allPage.removeEventListener(
            "transitionend",
            rollTransitionend
          );
        };
        this.$refs.allPage.addEventListener(
          "transitionend",
          rollTransitionend
        );
    }
  },
  destroyed() {
    window.onmousewheel = document.onmousewheel = null;
  }
};
</script>

<style scoped lang="scss">
.full-page-wrapper {
  top: 0px;
  left: 0px;
  background: #ffffff;
  overflow: hidden;
  .all-page {
    width: 100%;
    transform: translateY(0px);
    transition: all 500ms ease 0s;
    -webkit-overflow-scrolling: touch;
  }
  .page {
    z-index: 11;
    background-size: cover;
    background-repeat: no-repeat;
    position: relative;
    // transition: all 0.1s linear;
  }
  .page-box {
    position: absolute;
    height: 100%;
    width: 100%;
  }
}
.navigation {
  position: fixed;
  &.right {
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    li {
      display: block;
      margin: 8px 0px;
    }
  }
  &.left {
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    li {
      display: block;
      margin: 8px 0px;
    }
  }
  &.top {
    top: 15px;
    left: 50%;
    transform: translateX(-50%);
    li {
      display: inline-block;
      margin: 0px 8px;
    }
  }

  &.bottom {
    bottom: 15px;
    left: 50%;
    transform: translateX(-50%);
    li {
      display: inline-block;
      margin: 0px 8px;
    }
  }
  .active {
    opacity: 1;
  }
  ul li {
    box-sizing: border-box;
    list-style: none;
    width: 4px;
    height: 14px;
    border-radius: 2px;
    background-color: rgba(187,187,187);
    opacity: .8;
    vertical-align: middle;
    cursor: pointer;
    transition: all 0.2s;
    &:hover {
      @extend .active;
    }
  }
}
</style>
