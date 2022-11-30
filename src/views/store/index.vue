<template>
  <div class="storeWarpper" @touchstart="touchstart" @touchmove="touchmove">
    <transition-group name="slide-right">
      <landing class="" v-if="state.componentName == 'landing'" />
    </transition-group>
    <transition name="slide-left">
      <choice v-if="state.componentName == 'choice'" />
    </transition>
  </div>
</template>

<script lang="ts" setup name="StorePage">
  import { reactive } from 'vue';
  import landing from './landing.vue';
  import choice from './list.vue';
  const state = reactive({
    startX: 0,
    startY: 0,
    moveX: 0,
    moveY: 0,
    componentName: 'landing',
  });
  const touchstart = (e) => {
    state.startX = e.touches[0].clientX;
    state.startY = e.touches[0].clientY;
  };
  const touchmove = (e) => {
    state.moveX = e.touches[0].clientX;
    state.moveY = e.touches[0].clientY;

    let x = state.moveX - state.startX;
    let y = state.moveY - state.startY;
    if (x > 20 && Math.abs(x) > Math.abs(y)) {
      state.componentName = 'landing'; //右滑
    }

    if (x < -20 && Math.abs(x) > Math.abs(y)) {
      state.componentName = 'choice'; //左滑
    }
  };
</script>

<style lang="scss">
  .slide-left-enter-active,
  .slide-left-leave-active,
  .slide-right-enter-active,
  .slide-right-leave-active {
    will-change: transform;
    transition: transform 0.5s;
    height: 100%;
    width: 100%;
    top: 0;
    position: absolute;
    backface-visibility: hidden;
    perspective: 1000;
  }

  .slide-right-enter-from,
  .slide-left-leave-to {
    transform: translateX(100%);
  }

  .slide-right-leave-to,
  .slide-left-enter-from {
    transform: translateX(-100%);
  }
  .hello-enter,
  .hello-leave-to {
    transform: translateX(-100%);
  }
  .hello-enter-active,
  .hello-leave-active {
    transition: 0.5s linear;
  }
  /* 进入的终点、离开的起点 */
  .hello-enter-to,
  .hello-leave {
    transform: translateX(0);
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: 0.5s linear;
  }
  /* 进入的终点、离开的起点 */
  .fade-enter {
    transform: translateX(-100%);
    opacity: 0;
  }
  .fade-leave-to {
    transform: translateX(100%);
    opacity: 0;
  }

  .storeWarpper {
    height: 100vh;
    width: 100vw;
    background: #000;
  }
  .nut-swiper {
    height: 100%;
  }
  .nut-swiper-pagination {
    display: none;
  }
</style>
