<template>
  <div class="country">
    <nut-avatar class="flag" size="large" :icon="currentCountry.flag" @click.stop="selectLang" />
    <nut-popup pop-class="language-popclass" :style="{ padding: '20px 10px' }" v-model:visible="showBasic" :z-index="100">
      <template v-for="item in country" :key="item.locale">
        <nut-cell
          :title="$t(item.title)"
          :icon="item.locale === locale ? 'Check' : ''"
          :class="item.locale === locale ? 'active' : ''"
          @click="changeLang(item.locale)"
        />
      </template>
    </nut-popup>
  </div>
</template>
<script lang="ts" setup>
  import { ref, computed, onActivated } from 'vue';
  import { i18n } from '/@/i18n/index';
  import chinese from '/@/assets/images/chinese.png';
  import english from '/@/assets/images/english.png';
  import Vietnamese from '/@/assets/images/Vietnamese.png';
  import { setLang } from '/@/i18n';
  const showBasic = ref<boolean>(false);
  const selectLang = () => {
    showBasic.value = true;
  };
  type country = {
    locale: string;
    flag: any;
    title: string;
  };
  const country = ref<country[]>([
    { locale: 'zh-cn', flag: chinese, title: 'language.zh' },
    { locale: 'en-us', flag: english, title: 'language.en' },
    { locale: 'Vietnamese', flag: Vietnamese, title: 'language.Vietnamese' },
  ]);
  const locale = ref<string>(i18n.global.locale.value);
  const currentCountry = computed(() => {
    return (
      country.value.filter((item: country) => {
        return item.locale === locale.value;
      })[0] || country.value[0]
    );
  });
  const changeLang = (type: string) => {
    setLang(type);
    locale.value = i18n.global.locale.value;
    showBasic.value = false;
  };
  onActivated(() => {
    if (window.localStorage.getItem('lang')) {
      locale.value = window.localStorage.getItem('lang') as string;
    } else {
      if (locale.value == '') {
        locale.value = 'zh-cn';
      }
    }
  });
</script>
<style lang="scss">
  .language-popclass {
    width: 460px;
    border-radius: 10px;
    .nut-cell {
      box-shadow: 0 0;
      margin: 0;
      flex-direction: row-reverse;
      &.active {
        color: #71bfa6;
      }
    }
  }
</style>
<style lang="scss" scoped>
  .country {
    width: 68px;
    height: 40px;
    display: inline-block;
    position: absolute;
    :deep(.nut-avatar) {
      background-color: #000 !important;
      color: rgb(102, 102, 102);
      width: 68px;
      height: 40px;
      border-radius: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      .nut-icon__img {
        width: 68px;
        height: 40px;
        // left: 80%;
      }
    }
  }
</style>
