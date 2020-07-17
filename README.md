# vue-screen-wall

> pc端整屏滚动方案，兼容了小窗口。
>
> 窗口高度小于设置高度时，切换为scroll模式。

[在线预览](https://yiyi-an.github.io/vue-screen-wall/dist/)



### Code

```javascript
import VueScreenWall from "../components/VueScreenWall";

// npm install未实现
```



```vue
<template>
    <vue-screen-wall
      v-if="isV"
      showNavigation
      :min-Height="700"
      :pageProps="pageProps"
      @pageEnter="pageEnter">
      <template #page0>
        <div>
          <!-- 第一页 -->
          ...
		  	</div>
      </template>

      <template #page1>
        <div>
          <!-- 第二页 -->
          ...
        </div>
      </template>

      <template #page2>
        <div>
          <!-- 第三页 -->
          ...
        </div>
      </template>
	  </vue-screen-wall>
</template>

```

