<template>
  <div class="storeWarpper">
    <div class="header">
      <LandingLogo />
      <p class="appName">海选新鲜</p>
    </div>
    <main>
      <div class="store" v-for="(item,index) in state.info" :key="index" :style="{background: item.backgroundRPGA}" @click="toPage(item.url)">{{ item.name }}</div>
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
  window.location.href = url
}
const setting = () => {
  storeSetting().then((res) => {
    if (res?.status === 200) {
      state.info = res.data.data.entry  ;
      console.log(state.info, res.data);
    }
  });
};
setting();
</script>

<style lang="scss" scoped>
.storeWarpper {
  height: 100vh;
  width: 100vw;
  background: #000;
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
