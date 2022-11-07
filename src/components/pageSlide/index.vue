<template>
  <transition :name="directionName" v-if="props.transition">
    <slot></slot>
  </transition>
  <div v-if="!props.transition">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
  import { storeToRefs } from 'pinia';
  import { useTransitionStore } from '/@/store/modules/transition';
  const { directionName } = storeToRefs(useTransitionStore());
  type props = {
    transition: any;
  };
  const props = defineProps<props>();
</script>

<style lang="scss" scoped>
  .slide-left-enter-active,
  .slide-left-leave-active,
  .slide-right-enter-active,
  .slide-right-leave-active {
    position: absolute;
    width: 100%;
    transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);
  }

  .slide-left-enter,
  .slide-right-leave-active {
    opacity: 1;
    transform: translate(100%, 0);
  }

  .slide-left-leave-active,
  .slide-right-enter {
    opacity: 1;
    transform: translate(-100%, 0);
  }
</style>
