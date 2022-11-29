<template>
  <div class="storeWarpper">
    <div class="header">
      <div class="logoWarrper">
        <img class="logo" src="../../assets/images/logo.png" alt="" />
        <img v-for="(item, index) in state.logoList" :key="index" :style="{animationDelay: item.delay,left: item.left, right: item.right, bottom: item.bottom}" :class="['stars', 'l' + (index + 1), 'anima']" :src="item" alt="" />
      </div>
      <p class="appName">海选新鲜</p>
    </div>
    <main>
      <nut-input left-icon="search" left-icon-size="15" @change="handleChange" v-model="formData.search" placeholder="搜索商家" />
      <div class="storeList">
        <div class="item" v-for="(item, index) in state.storeList" :key="index">
          <div class="info">
            <img :src="item.prtrait" alt="" />
            <span @click="toPage(item.URL)" class="storeTitle">{{ item.storeName }}</span>
          </div>
          <div class="data">
            <nut-icon name="star" />
            <span class="storeTitle">{{ item.star }}</span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup name="StorePage">
import { reactive } from 'vue';
import { storeSearch } from '/@/api/landing';
import xing from '../../assets/images/xing.png';
import shell from '../../assets/images/shell.png';
const formData = reactive({
  search: '',
});
const state = reactive<any>({
  storeList: [],
  logoList: [],
  randomList: []
});
const handleChange = () => {
  search(formData.search);
};
const toPage = (url) => {
  window.open(url, '_blank')
};
const getRandomNode = (arr, count) => {
  var shuffled = arr.slice(0),
    i = arr.length,
    min = i - count,
    temp,
    index;
  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(min).map((m) => m.prtrait);
};
const randomOrder = (arr) => {
  var length = arr.length,
    randomIndex,
    temp;
  while (length) {
    randomIndex = Math.floor(Math.random() * length--);
    temp = arr[randomIndex];
    arr[randomIndex] = arr[length];
    arr[length] = temp;
  }
  return arr;
};
// const getRandomNum = (Min, Max) => {
//   var Range = Max - Min;
//   var Rand = Math.random();
//   return Min + Math.round(Rand * Range);
// };
const search = (keywords) => {
  const params = {
    keywords,
    pageNumber: 1,
    pageSize: 20,
  };

  storeSearch(params).then((res) => {
    if (res?.status === 200) {
      const result = res.data.data.result;
      state.storeList = result;
      const list = JSON.parse(JSON.stringify(getRandomNode(result, 5)));
      const starArr = [xing, xing, xing];
      const shellArr = [shell, shell, shell];
      const all = [...list, ...starArr, ...shellArr];
      state.randomList = [...randomOrder(all)] ;
      state.logoList =  state.randomList
      // .map((m,n)=>{
      //   return  n < 6 ?
      //   {
      //     imgSrc:  state.randomList[n],
      //     bottom: getRandomNum(-100,200) + 'px',
      //     left: getRandomNum(-100,200) + 'px',
      //     delay: getRandomNum(1,6) + 's'
      //   } : 
      //   {
      //     imgSrc:  state.randomList[n],
      //     right: getRandomNum(-100,200) + 'px',
      //     top: getRandomNum(-100,200) + 'px',
      //     delay: getRandomNum(1,6) + 's'
      //   }
      // })
      // randomPosition()
    }
  });
};
const randomPosition = () => {
  // setInterval(()=>{
  //   state.logoList.forEach((m,n)=>{
  //         if(n < getRandomNum(1,20))
  //         m.delay =  getRandomNum(1,20) + 's' 
  //     })
  //     console.log(JSON.parse(JSON.stringify(state.logoList)))
  // },6000)
}
randomPosition()
search('string');
</script>

<style lang="scss" scoped>
@function randomNum($min, $max) {
  $rand: random();
  $randomNum: $min + floor($rand * (($max - $min) + 1));
  @return $randomNum;
}
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
  border-radius: 50%;
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
.l7 {
  position: absolute;
  left: 41px;
  top: -75px;
  animation-delay: 7s;
}
.l8 {
  position: absolute;
  left: 200px;
  top: -75px;
  animation-delay: 8s;
}
.l9 {
  position: absolute;
  left: 400px;
  top: -75px;
  animation-delay: 9s;
}
.l10 {
  position: absolute;
  left: 600px;
  top: -75px;
  animation-delay: 10s;
}
.l11 {
  position: absolute;
  left: 100px;
  bottom: -60px;
  animation-delay: 11s;
}
.l12 {
  position: absolute;
  right: 100px;
  bottom: -60px;
  animation-delay: 12s;
}
@keyframes move {
  0% {
    transform: translateZ(-120px);
    opacity: 1;
  }
  100% {
    transform: translateZ(120px);
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
.storeList {
  width: 570px;
  height: 600px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}
.item {
  height: 100px;
  border-bottom: 1px solid #888888;
  display: flex;
  color: #ffffff;
  align-items: center;
  justify-content: space-between;
  padding: 0 2vw;
  .info,
  .data {
    display: flex;
    align-items: center;
  }
  img {
    width: 42px;
    height: 50px;
    margin-right: 10px;
  }
  .storeTitle {
    font-size: 3.6vw;
  }
}
main {
  height: 60%;
  background: #000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.nut-input {
  width: 570px;
  height: 78px;
  background: #383838;
  border-bottom: none;
  padding-left: 2.5vw;
}
.nut-icon-search {
  color: #888888;
}
</style>
