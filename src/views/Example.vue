<template>
  <div class="home">
    <VueScreenWall
      v-if="isV"
      showNavigation
      :min-Height="700"
      :page.sync="currentPage"
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
    </VueScreenWall>
  </div>
</template>

<script>
import VueScreenWall from "../components/VueScreenWall";

export default {
  name: "home",
  components: {
    VueScreenWall
  },
  data() {
    return {
      isV: true,
      currentPage: 0,
      activePage: undefined,
      page0show: false,
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
    pageEnter(p) {
      console.log(`page${p.page} 进入完成`);
      this.activePage = p.page;
      const targetComponent = this.$refs[`component${p.page}`];
      const cla = targetComponent.className;
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
  text-align: center;
  width: 600px;
  height: 450px;
  line-height: 450px;
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
    transform: rotate(720deg);
    opacity: 0;
  }
  25% {
    opacity: 1;
  }
  40% {
    transform: rotate(360deg) scale(0.4);
  }
  80% {
    transform: rotate(0deg) scale(1.6);
  }
  100% {
    transform: scale(1);
  }
}
</style>
