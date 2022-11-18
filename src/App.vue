<template>
  <Suspense>
    <template #default>
      <router-view v-slot="{ Component, route }">
        <PageSlide :transition="route.meta.transition">
          <!-- <div> -->
          <keep-alive>
            <component
              :is="Component"
              v-if="route.meta && route.meta.keepAlive"
              :key="route.meta.usePathKey ? route.fullPath : undefined"
            />
          </keep-alive>
          <component
            :is="Component"
            v-if="!(route.meta && route.meta.keepAlive)"
            :key="route.meta.usePathKey ? route.fullPath : undefined"
          />
          <!-- </div> -->
        </PageSlide>
      </router-view>
    </template>
    <template #fallback> Loading... </template>
  </Suspense>
</template>
<style lang="scss">
  #app {
    position: relative;
  }
</style>
