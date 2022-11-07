<template>
  <div class="homeTop">
    <div class="appName">
      <div class="enName">HAIXIAN</div>
      <div class="zhName">海鲜商户</div>
    </div>
    <div class="user" v-if="isUser">
      <img :src="avatarTest" />
      <span>10086</span>
    </div>
    <div class="location">
      <div class="selectCountry">
        <i class="iconfont icon-location"></i>
        <span class="locationName">香港</span>
        <Country class="country" v-if="isCountry" />
      </div>
      <div class="share" v-if="isShare">
        <i class="iconfont icon-share"></i>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import avatarTest from '/@/assets/images/avatartest.jpeg';
  import Country from '/@/components/language/index.vue';
  type props = {
    isShare: boolean;
    isCountry: boolean;
    isUser: boolean;
  };
  const props = withDefaults(defineProps<props>(), { isShare: true, isCountry: true, isUser: true });
</script>
<style lang="scss" scoped>
  .homeTop {
    position: relative;
    display: flex;
    align-items: center;
    padding: 40px 40px;
    justify-content: space-between;
    .appName {
      color: #fff;
      .enName {
        font-size: 32px;
        font-weight: bold;
      }
      .zhName {
        font-size: 26px;
        font-weight: bold;
      }
    }
    .user {
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        width: 90px;
        height: 90px;
        border-radius: 50%;
      }
      span {
        font-size: 28px;
        color: #fff;
        font-weight: bold;
      }
    }
    .location {
      color: #666;
      flex-direction: column;
      display: flex;
      .selectCountry {
        display: flex;
        align-items: center;
        .locationName {
          font-size: 24px;
        }
        .country {
          position: relative;
          margin-left: 16px;
        }
      }
      .share {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .iconfont {
          font-size: 48px;
          margin-top: 16px;
        }
      }
    }
  }
</style>
