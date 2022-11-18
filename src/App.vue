<template>
  <Suspense>
    <template #default>
      <!-- <router-view v-slot="{ Component, route }">
      </router-view> -->
    </template>
    <template #fallback> Loading... </template>
  </Suspense>
</template>
<style lang="scss">
  #app {
    position: relative;
  }
</style>
