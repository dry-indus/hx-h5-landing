<template>
  <div class="storeWarpper">
    <div class="header">
      <div class="logoWarrper">
        <img class="logo" src="../../assets/images/logo.png" alt="" />
        <img class="stars l1 anima" src="../../assets/images/xing.png" alt="" />
        <img class="stars l2 anima" src="../../assets/images/xing.png" alt="" />
        <img class="stars l3 anima" src="../../assets/images/xing.png" alt="" />
        <img class="stars l4 anima" src="../../assets/images/xing.png" alt="" />
        <img class="stars l5 anima" src="../../assets/images/xing.png" alt="" />
        <img class="stars l6 anima" src="../../assets/images/xing.png" alt="" />
      </div>
      <p class="appName">海选新鲜</p>
    </div>
    <main>
      <div
        class="store"
        v-for="(item, index) in state.info"
        :key="index"
        :style="{ background: item.backgroundRPGA }"
        @click="toPage(item.url)"
        >{{ item.name }}</div
      >
    </main>
  </div>
</template>

<script lang="ts" setup name="ListPage">
  // import LandingLogo from '/@/views/store/logo/index.vue';
  import { reactive } from 'vue';

  import { storeSetting } from '/@/api/landing';
  const state = reactive<any>({
    info: [],
  });
  const toPage = (url) => {
    window.open(url, '_blank');
  };
  const setting = () => {
    storeSetting().then((res) => {
      if (res?.status === 200) {
        state.info = res.data.data.entry;
        console.log(state.info, res.data);
      }
    });
  };
  setting();
</script>

<style lang="scss" scoped>
  .logoWarrper {
    width: 100%;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    transform-style: preserve-3d;
    perspective-origin: center;
    perspective: 80px;
  }
  .logo {
    width: 218px;
    height: 233px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .stars {
    width: 70px;
    height: 70px;
    animation: anima;
    opacity: 0;
  }
  .l1 {
    position: absolute;
    right: -19px;
    animation-delay: 1s;
  }
  .l2 {
    position: absolute;
    right: -31px;
    top: -10px;
    animation-delay: 2s;
  }
  .l3 {
    position: absolute;
    right: -31px;
    bottom: -10px;
    animation-delay: 3s;
  }
  .l4 {
    position: absolute;
    left: -19px;
    animation-delay: 4s;
  }
  .l5 {
    position: absolute;
    left: -31px;
    top: -10px;
    animation-delay: 5s;
  }
  .l6 {
    position: absolute;
    left: -31px;
    bottom: -10px;
    animation-delay: 6s;
  }
  @keyframes move {
    0% {
      transform: translateZ(-120px);
      opacity: 1;
    }
    100% {
      transform: translateZ(60px);
    }
  }
  .anima {
    animation-name: move;
    animation-timing-function: linear;
    /* animation-delay: 2s; */
    animation-iteration-count: infinite;
    animation-duration: 4s;
  }
  .storeWarpper {
    height: 100vh;
    width: 100vw;
    background: #000;
    overflow: hidden;
  }
  .header {
    height: 40%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .appName {
      font-size: 36px;
      color: #ffffff;
    }
  }
  .store {
    position: fixed;
    width: 333px;
    height: 92.34px;
    right: 0;
    bottom: 500px;
    background: #da2d96;
    color: #ffffff;
    display: flex;
    align-items: center;
    padding-left: 20px;
  }
  .rider {
    position: fixed;
    width: 333px;
    height: 92.34px;
    right: 0;
    bottom: 300px;
    background: #7792cf;
    color: #ffffff;
    display: flex;
    align-items: center;
    padding-left: 20px;
  }
</style>
