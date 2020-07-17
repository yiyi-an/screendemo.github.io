<template>
    <vue-screen-wall
      v-if="isV"
      showNavigation
      :min-Height="700"
      :pageProps="pageProps"
      @pageEnter="pageEnter">
      <template #page0>
        <div class="basic page0" 
          ref='component0'>
          page1
        </div>
      </template>

      <template #page1>
        <div class="basic page1"  
          ref='component1'>
          page2
        </div>
      </template>

      <template #page2>
        <div class="basic page2" 
          ref='component2'>
          3
        </div>
      </template>

      <template #page3>
        <div class="basic page3" 
          ref='component3'>
          4
        </div>
      </template>

      <template #page4>
        <div class="basic page4" 
          ref='component4'>
          5
        </div>
      </template>
    </vue-screen-wall>
</template>

<script>
import VueScreenWall from "../components/VueScreenWall";

export default {
  components: {
    VueScreenWall
  },
  data() {
    return {
      isV: true,
      activePage: undefined,
      pageProps: [
        {
          bgColor: "#0082fa",
          navigationColor: "#fafafa",
          bgSrc: ""
        },
        {
          bgColor: "#fafafa",
          navigationColor: "#0082fa",
          bgSrc: ""
        },
        {
          bgColor: "#0082fa",
          navigationColor: "#fafafa",
          bgSrc: ""
        },
        {
          bgColor: "#fafafa",
          navigationColor: "#0082fa",
          bgSrc: ""
        },
        {
          bgColor: "DarkSlateBlue",
          navigationColor: "#fafafa",
          bgSrc: ""
        }
      ]
    };
  },
  methods: {
    /**
     * @description 页面进入时触发, 在这里手动执行对应页面的动画
     * @param p 页面配置
     */
    pageEnter(p) {
      console.log(`page${p.page} 进入完成`);
      this.activePage = p.page;
      const targetComponent = this.$refs[`component${p.page}`];
      const cla = targetComponent.className;
      targetComponent.style.display = 'block'
      if (!(p.page % 2)) {
        targetComponent.className = cla.concat(" animate1-enter-active");
      } else {
        targetComponent.className = cla.concat(" animate2-enter-active");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.basic {
  display: none;
  text-align: center;
  width: 500px;
  height: 400px;
  line-height: 400px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  font-size: 80px;
  border: 50px solid;
}
.page0 {
  color: Snow;
}
.page1 {
  color: Salmon;
}
.page2 {
  color: #ffffff;
}
.page3 {
  color: Salmon;
}
.page4 {
  color: RoyalBlue;
}
.animate1-enter-active {
  animation: animate1 1.5s;
}

.animate2-enter-active {
  animation: animate2 1.5s;
}
@keyframes animate1 {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  10% {
    opacity: 1;
  }
  45% {
    opacity: 1;
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes animate2 {
  0% {
    transform: translate(0,100px);
    opacity: 0;
  }
  60% {
    transform: translate(0,0);
    opacity: 1;

  }
  80% {
    transform: scale(1.4);
  }
  100% {
    transform: scale(1);
  }
}
</style>
