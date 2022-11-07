<template>
  <!-- <nut-navbar :left-show="false" :title="$t($route.meta.title)"> -->
  <!-- <template #right v-if="$route.meta.title == 'tabbar.me'">
      <nut-icon class="right" name="setting" @click="openSettings" />
    </template> -->
  <!-- </nut-navbar> -->
  <div class="main-page">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component v-if="$route.meta.keepAlive" :key="$route.path" :is="Component" />
      </keep-alive>
      <component v-if="!$route.meta.keepAlive" :key="$route.path" :is="Component" />
    </router-view>
  </div>
  <nut-tabbar unactive-color="#999" active-color="#fff" @tab-switch="tabSwitch" bottom v-model:visible="activeTab">
    <!-- <nut-tabbar-item v-for="item in tabItem" :key="item.key" :tab-title="$t(`tabbar.${item.key}`)" :icon="item.icon" /> -->
    <nut-tabbar-item v-for="item in tabItem" :key="item.key" :icon="item.icon" />
  </nut-tabbar>
</template>

<script lang="ts" setup name="BasicLayoutPage">
  import { useRouter } from 'vue-router';

  const tabItem = [
    { key: 'home', icon: 'home' },
    { key: 'cart', icon: 'cart' },
    { key: 'tab2', icon: 'location' },
    { key: 'me', icon: 'my' },
  ];

  const router = useRouter();

  const activeTab = ref(0);

  onMounted(() => {
    activeTab.value = tabItem.findIndex((item) => item.key === router.currentRoute.value.path.replace('/', ''));
  });

  const tabSwitch = (_item, index) => {
    switch (index) {
      case 0:
        router.push('/merchant/home');
        break;
      case 1:
        router.push('/merchant/cart');
        break;
      case 2:
        router.push('/merchant/tab2');
        break;
      case 3:
        router.push('/merchant/me');
    }
    activeTab.value = index;
  };
  // const openSettings = () => {
  //   router.push('/setting');
  // };
</script>

<style scoped lang="scss">
  .nut-navbar {
    margin-bottom: 0;
    :deep(.nut-navbar__right) {
      padding: 0;
    }
  }

  .main-page {
    box-sizing: border-box;
    // padding: 40px;
    height: calc(100vh - 100px);
    overflow-y: scroll;
    overflow-x: hidden;
  }
</style>
