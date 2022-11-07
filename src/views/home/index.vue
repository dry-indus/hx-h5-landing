<template>
  <div class="homeWrapper">
    <HomeTop :isShare="isShare" :isCountry="isCountry" :isUser="isUser" />
    <div class="homeSearch">
      <i class="iconfont icon-search"></i>
      <nut-input v-model="searchValue" placeholder="" />
    </div>
    <div class="homeSelectArea">
      <nut-checkboxgroup v-model="checkboxgroup" ref="group" @change="changeCheckBox">
        <nut-checkbox v-for="item in tagsData.allTags" :key="item.id" :label="item.name">{{ item.name }}</nut-checkbox>
      </nut-checkboxgroup>
    </div>
    <div class="homeListContent">
      <div class="homeListIcon">
        <i class="iconfont icon-list"></i>
        <i class="iconfont icon-listview"></i>
      </div>
      <div class="homeList">
        <div class="homeListImg" v-for="(item, index) in state.commodityList" :key="item.id">
          <img :src="item.picUrl" />
          <div class="desc">
            <span v-for="tagItem in item.tags" :key="tagItem.id">{{ tagItem.name }}</span>
          </div>
          <div class="operateBtns">
            <nut-button type="primary" @click="publish(item)">上线</nut-button>
            <nut-button type="info" @click="hide(item)">隐藏</nut-button>
            <nut-button type="success" @click="edit(item)">编辑</nut-button>
            <nut-button type="danger" @click="deletecommodity(item, index)">删除</nut-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup name="HomePage">
  import { ref, onMounted } from 'vue';
  import HomeTop from '/@/components/home/homeTop.vue';
  import router from '/@/router';
  import { Tag, Commodity } from '../../../types/commodity';
  import { getCommodityList, hideCommodity, publishCommodity, delCommodity } from '/@/api/commodity';
  const searchValue = ref<string>();
  const checkboxgroup = ref<Array<string>>(['1']);
  const group = ref(null);
  const isShare = ref<boolean>(true);
  const isCountry = ref<boolean>(true);
  const isUser = ref<boolean>(true);
  const state = reactive<any>({
    commodityList: [],
  });
  const tagsData = reactive({
    allTags: new Array<Tag>(),
  });
  //首页根据选择的标签显示不同的商品
  const changeCheckBox = (label: any[]) => {
    if (label.length == 1) {
      getCommodityList().then((res: any) => {
        state.commodityList = res.data.data.list;
        tagsData.allTags = res.data.data.allTags;
        //标签名称去重
        let tempArr = new Array<Tag>();
        let map = new Map();
        for (let item of tagsData.allTags) {
          if (!map.has(item.name)) {
            map.set(item.name, item);
          }
        }
        tempArr = [...map.values()];
        tagsData.allTags = tempArr;
      });
      return;
    }
    let tempRes: any = [];
    getCommodityList().then((res: any) => {
      tempRes = res.data.data.list;
      let tempArr = new Array<Commodity>();
      for (let i = 0; i < label.length; i++) {
        for (let j = 0; j < tempRes.length; j++) {
          for (let k = 0; k < tempRes[j].tags.length; k++) {
            if (tempRes[j].tags[k].name == label[i]) {
              tempArr.push(tempRes[j]);
            }
          }
        }
      }
      //查询结果去重
      let map = new Map();
      for (let item of tempArr) {
        if (!map.has(item.id)) {
          map.set(item.id, item);
        }
      }
      tempArr = [...map.values()];
      state.commodityList = tempArr;
    });
  };
  //点击编辑按钮进入编辑页
  const edit = (item: Commodity) => {
    router.push({ path: '/merchant/edit', query: { id: item.id } });
  };
  //隐藏商品
  const hide = (item: Commodity) => {
    hideCommodity(item.id as string);
  };
  //发布商品
  const publish = (item: Commodity) => {
    publishCommodity(item.id as string);
  };
  //删除商品
  const deletecommodity = (item: Commodity, index: number) => {
    delCommodity(item.id as string).then((res) => {
      if (res.data.status == 200) {
        state.commodityList.splice(index, 1);
      }
    });
  };
  onMounted(() => {
    getCommodityList().then((res: any) => {
      state.commodityList = res.data.data.list;
      tagsData.allTags = res.data.data.allTags;
      //标签名称去重
      let tempArr = new Array<Tag>();
      let map = new Map();
      for (let item of tagsData.allTags) {
        if (!map.has(item.name)) {
          map.set(item.name, item);
        }
      }
      tempArr = [...map.values()];
      tagsData.allTags = tempArr;
    });
  });
</script>
<style lang="scss" scoped>
  .homeWrapper {
    background: #000;
    height: 100%;
    .homeSearch {
      padding: 0 40px 0 40px;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      .iconfont {
        // color: #2a076a;
        color: #fff;
        font-size: 48px;
      }
      .nut-input {
        height: 50px;
        line-height: 50px;
        padding: 0;
        border-radius: 10px;
        width: 560px;
        background: #f2f2f2;
        padding-left: 20px;
      }
    }
    .homeSelectArea {
      margin-top: 20px;
      .nut-checkboxgroup {
        display: flex;
        flex-wrap: wrap;
        padding-left: 40px;
        :deep(.nut-checkbox) {
          margin-right: 20px;
          margin-bottom: 16px;
          .nut-checkbox__label {
            color: #666;
          }
        }
      }
    }
    .homeListContent {
      .homeListIcon {
        color: #666;
        padding: 20px 20px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .icon-list {
          font-size: 40px;
        }
        .icon-listview {
          margin-left: 10px;
          font-size: 40px;
        }
      }
      .homeList {
        background-color: #000;
        .homeListImg {
          width: 100%;
          padding: 0 40px 60px 40px;
          box-sizing: border-box;
          img {
            width: 100%;
          }
          .desc {
            color: #999;
            font-size: 28px;
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            span {
              margin-right: 30px;
            }
          }
          .operateBtns {
            margin-top: 10px;
            :deep(.nut-button) {
              margin-right: 8px;
              height: 60px;
            }
          }
        }
      }
    }
  }
</style>
