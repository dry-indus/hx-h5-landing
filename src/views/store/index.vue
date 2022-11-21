<template>
  <div class="storeWarpper">
    <div class="header">
      <LandingLogo />
      <p class="appName">海选新鲜</p>
    </div>
    <main>
      <nut-input left-icon="search" left-icon-size="15" @change="handleChange" v-model="formData.search" placeholder="搜索商家" />
      <div class="storeList">
        <div class="item" v-for="(item, index) in state.storeList" :key="index">
          <div class="info">
            <img :src="item.prtrait" alt="" />
            <span class="storeTitle">{{ item.storeName }}</span>
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
  // import LandingLogo from '../../components/logo/index.vue';
  import { storeSearch } from '/@/api/landing';
  const formData = reactive({
    search: '',
  });
  const state = reactive<any>({
    storeList: [],
  });
  const handleChange = () => {
    search(formData.search);
  };
  const search = (keywords) => {
    const params = {
      keywords,
      pageNumber: 1,
      pageSize: 20,
    };

    storeSearch(params).then((res) => {
      if (res?.status === 200) {
        state.storeList = res.data.data.result;
        console.log(state.storeList, res.data);
      }
    });
  };
  search('string');
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
