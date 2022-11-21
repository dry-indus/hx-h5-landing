<template>
  <div class="logoWarrper">
    <img class="logo" src="../../assets/images/logo.png" alt="" />
    <img class="stars l1 anima" src="../../assets/images/xing.png" alt="" />
    <img class="stars l2 anima" src="../../assets/images/xing.png" alt="" />
    <img class="stars l3 anima" src="../../assets/images/xing.png" alt="" />
    <img class="stars l4 anima" src="../../assets/images/xing.png" alt="" />
    <img class="stars l5 anima" src="../../assets/images/xing.png" alt="" />
    <img class="stars l6 anima" src="../../assets/images/xing.png" alt="" />
  </div>
</template>

<script lang="ts">
</script>

<style lang="scss" scoped>
.logoWarrper{
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
.l6{
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
</style>