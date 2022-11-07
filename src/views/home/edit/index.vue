<template>
  <div class="editWrapper">
    <nut-navbar @on-click-back="back" :title="$t($route.meta.title)">
      <template #left>
        <nut-icon class="left" name="left" />
      </template>
    </nut-navbar>
    <div class="save" @click="saveGoodsInfo">
      <span>OK</span>
    </div>
    <div class="name">
      <span>名称:</span>
      <nut-input v-model="curentGood.name" :placeholder="curentGood.name" />
    </div>
    <div class="num">
      <span>数量:</span>
      <nut-inputnumber v-model="curentGood.count" icon-left="triangle-down" icon-right="triangle-up" />
    </div>
    <div class="sp">
      <div class="spTop">
        <span class="spTopTitle">规格与定价:</span>
        <span class="spTopAddBtn" @click="appendSps"><i class="iconfont icon-plus"></i></span>
      </div>
      <div class="spContent">
        <template v-if="curentGood.sps?.length">
          <div class="spContentItem" v-for="(item, index) in curentGood.sps" :key="item.id">
            <div class="spContentItemName item">
              <nut-icon name="check-disabled" @click="deleteSps(item.id, index)" />
              <span>{{ index + 1 }}</span>
              <nut-input v-model="item.specifications" :placeholder="item.specifications" @blur="spBlur(item)" />
            </div>
            <div class="spContentItemPrice item">
              <span>定价:</span>
              <nut-inputnumber
                v-model="item.pricing"
                icon-left="triangle-down"
                icon-right="triangle-up"
                @blur="spBlur(item)"
                @add="spBlur(item)"
                @reduce="spBlur(item)"
              />
            </div>
            <div class="spContentItemNum item">
              <span>数量:</span>
              <nut-inputnumber v-model="item.num" icon-left="triangle-down" icon-right="triangle-up" />
            </div>
          </div>
        </template>
        <div class="noSp" v-else>
          <span>暂无数据</span>
        </div>
      </div>
    </div>
    <div class="tags">
      <div class="tagsTop">
        <span class="tagsTitle">标签:</span>
        <span class="tagsAddBtn" @click="appendTags"><i class="iconfont icon-plus"></i></span>
      </div>
      <div class="tagContent">
        <!-- 存在tag -->
        <nut-checkboxgroup v-model="checkboxgroup" v-if="tagsData.allTags.length">
          <div v-for="(item, index) in tagsData.allTags" :key="item.id" class="tagItem">
            <nut-checkbox :label="item.id" />
            <nut-input
              v-model="item.name"
              :placeholder="item.name"
              right-icon="close"
              @click-right-icon="deleteTag(index, item)"
              @blur="blur(item.name, item)"
            />
          </div>
        </nut-checkboxgroup>
        <!-- 无tag -->
        <div class="noTags" v-else>
          <span>暂无数据</span>
        </div>
      </div>
    </div>
    <div class="cover">
      <div class="coverTop">
        <span class="coverTitle">封面:</span>
      </div>
      <div class="coverContent">
        <nut-uploader :style="{ backgroundImage: `url(${coverUrl})` }">
          <nut-button type="success" size="small"><nut-icon name="photograph" v-if="showCamera" /></nut-button>
        </nut-uploader>
        <input type="file" @change="inputchange" ref="inputRef" accept="image/*" />
        <div class="loadingModal" v-if="loading">
          <nut-icon name="loading" />
          <div class="loading">上传中...</div>
        </div>
        <div class="loadingModal" v-if="loadingSuccess">
          <nut-icon name="Check" />
          <div class="loading">上传成功</div>
        </div>
        <div class="loadingModal" v-if="loadingFail">
          <nut-icon name="failure" />
          <div class="loading">上传失败</div>
        </div>
        <div class="clearCurrentImg" @click="clearCurrentImg" v-if="coverUrl">
          <nut-icon name="circle-close" />
        </div>
        <!-- <nut-progress
          stroke-width="3"
          :show-text="false"
          :percentage="progressPercentage"
          stroke-color="#f30"
          :status="progressPercentage == 100 ? '' : 'active'"
        /> -->
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref, reactive, onMounted } from 'vue';
  import { v4 as uuidv4 } from 'uuid';
  import router from '/@/router';
  import { useRoute } from 'vue-router';
  import { Tag, Commodity, Sp, CommodityDelObject, CommoditySpAddObject } from '../../../../types/commodity';
  import { getCommodityList, delTags, modifyCommodity, addTags, addCommoditySp, modifyCommoditySp, delCommoditySp } from '/@/api/commodity';
  import { upload, getFileStatus } from '/@/api/upload';
  import { Notify } from '@nutui/nutui';
  const route = useRoute();
  const showCamera = ref<boolean>(true);
  //正在上传动画
  const loading = ref<boolean>(false);
  //上传成功动画
  const loadingSuccess = ref<boolean>(false);
  //上传失败动画
  const loadingFail = ref<boolean>(false);
  const clearCurrentImg = () => {
    coverUrl.value = '';
    showCamera.value = true;
  };
  const tagsData = reactive({
    allTags: new Array<Tag>(),
  });
  const ListData = reactive({
    list: new Array<Partial<Commodity>>(),
  });
  const back = () => {
    router.push({ path: '/' });
  };
  //上传图片
  const inputchange = (e: any) => {
    const formData = new FormData();
    let fileName = '';
    if (e.target?.files[0]) {
      fileName = e.target?.files[0].name;
    }
    formData.append('file', e.target?.files[0]);
    loading.value = true;
    showCamera.value = false;
    upload(formData).then((res) => {
      if (res.data.status == 200) {
        getFileStatus(res.data.data.taskId).then((res) => {
          coverUrl.value = res.data.data.status[fileName].url;
          curentGood.value.picUrl = res.data.data.status[fileName].url;
          if (res.data.data.status[fileName].isCompleted) {
            loading.value = false;
            loadingSuccess.value = true;
            setTimeout(() => {
              loadingSuccess.value = false;
            }, 2000);
          } else {
            loading.value = false;
            loadingFail.value = true;
            setTimeout(() => {
              loadingFail.value = false;
              showCamera.value = true;
            }, 2000);
          }
        });
      }
    });
  };
  const checkboxgroup = ref<Array<string>>([]);
  //当前商品信息，接入接口时，直接替换后端数据
  const curentGood = ref<Partial<Commodity>>({});
  const coverUrl = ref<string>('');
  //上传图片进度条
  // const progressPercentage = ref<string | number>(0);
  // const onProgress = ({ percentage }: any) => {
  //   progressPercentage.value = percentage;
  // };
  // let formData = new FormData();
  //追加定价与规格
  const appendSps = () => {
    curentGood.value.sps?.push({
      id: '',
      picUrl: '',
      pricing: 0,
      specifications: '',
      num: 0,
    });
  };
  //保存编辑数据
  const saveGoodsInfo = () => {
    let tags = new Array<Tag>();
    for (let i = 0; i < checkboxgroup.value.length; i++) {
      for (let j = 0; j < tagsData.allTags.length; j++) {
        if (checkboxgroup.value[i] == tagsData.allTags[j].id) {
          tags.push({
            id: tagsData.allTags[j].id,
            name: tagsData.allTags[j].name,
            selected: true,
          });
        }
      }
    }
    let data: CommodityDelObject = {
      id: curentGood.value.id as string,
      name: curentGood.value.name as string,
      picURL: curentGood.value.picUrl as string,
      tags: tags,
    };
    modifyCommodity(data);
  };
  //追加标签
  const appendTags = () => {
    tagsData.allTags.push({
      id: uuidv4(),
      name: '',
      selected: false,
    });
  };
  //删除标签
  const deleteTag = (index: number, item: Tag) => {
    if (index >= 0) {
      if (item.id.indexOf('-') !== -1) {
        tagsData.allTags.splice(index, 1);
      } else {
        delTags(item.id)
          .then((res) => {
            if (res.data.status == 200) {
              tagsData.allTags.splice(index, 1);
            }
          })
          .catch((err: any) => {
            if (err && err.status === 3000) {
              Notify.danger(err.message, { background: 'rgba(230,67,46, 0.8)' });
            }
          });
      }
    }
  };
  //添加标签
  const blur = async (value: string, item: Tag) => {
    if (value.trim() !== '') {
      if (item.id.indexOf('-') !== -1) {
        const res = await addTags(value);
        if (res.data.data && res.data.data.id) {
          //用于删除
          item.id = res.data.data.id;
        }
      }
    }
  };
  //添加或修改规则
  const spBlur = (item: CommoditySpAddObject) => {
    //编辑规则
    if (item.id) {
      const data = {
        id: item.id,
        picUrl: item.picUrl,
        pricing: item.pricing,
        specifications: item.specifications,
      };
      modifyCommoditySp(data);
    } else {
      //新增规则
      const data = {
        commodityId: curentGood.value.id,
        picUrl: item.picUrl,
        pricing: item.pricing,
        specifications: item.specifications,
      };
      addCommoditySp(data);
    }
  };
  //删除规格
  const deleteSps = (id: string, index: number) => {
    if (curentGood.value.sps?.length == 1) {
      delCommoditySp(id).catch((err: any) => {
        if (err && err.status === 3000) {
          Notify.danger(err.message, { background: 'rgba(230,67,46, 0.8)' });
        }
      });
    } else {
      delCommoditySp(id).then((res) => {
        if (res.data.status == 200) {
          curentGood.value.sps?.splice(index, 1);
        }
      });
    }
  };
  //当前选中的标签name，数组
  const computeCheckboxGroup = (): void => {
    let tags = curentGood.value.tags as Array<Tag>;
    let tempArr = new Array<string>();
    for (let i = 0; i < tags.length; i++) {
      tempArr.push(tags[i].id);
    }
    checkboxgroup.value = tempArr;
  };
  //获取所有商品数据
  const getList = async (): Promise<void> => {
    const res = await getCommodityList();
    ListData.list = res.data.data.list;
    //获取所有标签
    tagsData.allTags = res.data.data.allTags;
    //获取route中query参数
    const id = route.query.id;
    //根据id匹配当前当前编辑的商品
    curentGood.value = ListData.list.filter((item) => {
      return id === item.id;
    })[0];
    coverUrl.value = curentGood.value.picUrl as string;
    showCamera.value = false;
    computeCheckboxGroup();
    //给每个规则添加num,提交时取消该属性
    let sps = curentGood.value.sps as Array<Sp>;
    for (let i = 0; i < sps.length; i++) {
      sps[i].num = 0;
    }
  };
  onMounted(() => {
    getList();
  });
</script>
<style lang="scss" scoped>
  .editWrapper {
    height: 100vh;
    width: 100vw;
    background: #000;
    overflow: auto;
    position: relative;
    .nut-navbar {
      z-index: 10;
      background: #000;
      box-shadow: 0 0;
      margin-bottom: 44px;
      :deep(.title) {
        color: #fff;
      }
      :deep(.nut-navbar__left) {
        .left {
          color: #fff;
        }
      }
    }
    .save {
      color: #459bf8;
      font-size: 28px;
      // color: #fff;
      position: absolute;
      right: 40px;
      top: 20px;
      z-index: 20;
    }
    .name {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding-left: 40px;
      & > span {
        color: #fff;
        font-size: 28px;
      }
      .nut-input {
        padding: 0;
        height: 48px;
        line-height: 48px;
        padding-left: 20px;
        margin-left: 20px;
        width: 30%;
      }
    }
    .num {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding-left: 40px;
      margin-top: 20px;
      & > span {
        color: #fff;
        font-size: 28px;
      }
    }
    .sp {
      padding-left: 40px;
      margin-top: 40px;
      .spTop {
        color: #fff;
        height: 60px;
        line-height: 60px;
        display: flex;
        align-items: center;
        padding-right: 40px;
        .spTopTitle {
          font-size: 28px;
        }
        .spTopAddBtn {
          margin-left: auto;
          // color: #666;
          color: #999;
          display: inline-block;
          width: 48px;
          height: 48px;
          font-size: 48px;
          display: flex;
          justify-content: center;
          align-items: center;
          box-sizing: border-box;
          // border: 1px solid #666;
        }
      }
      .spContent {
        padding: 0 40px;
        margin-top: 40px;
        padding-left: 0;
        .spContentItem {
          color: #fff;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          .item {
            width: 30%;
            height: 48px;
            line-height: 48px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            span {
              font-size: 24px;
            }
            .nut-input,
            .nut-inputnumber {
              width: 60%;
              padding: 0;
              height: 48px;
              line-height: 48px;
              font-size: 24px;
            }
          }
          .spContentItemName {
            span {
              color: #999;
            }
            .nut-input {
              padding-left: 20px;
              box-sizing: border-box;
            }
          }
        }
      }
      .noSp {
        color: #999;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .tags {
      padding-left: 40px;
      margin-top: 40px;
      .tagsTop {
        color: #fff;
        height: 60px;
        line-height: 60px;
        display: flex;
        align-items: center;
        padding-right: 40px;
        .tagsTitle {
          font-size: 28px;
        }
        .tagsAddBtn {
          margin-left: auto;
          // color: #666;
          color: #999;
          display: inline-block;
          width: 48px;
          height: 48px;
          font-size: 48px;
          display: flex;
          justify-content: center;
          align-items: center;
          box-sizing: border-box;
          // border: 1px solid #666;
        }
      }
      .tagContent {
        font-size: 28px;
        display: flex;
        line-height: 80px;
        justify-content: flex-start;
        padding-right: 40px;
        padding-left: 40px;
        align-items: center;
        color: #999;
        flex-wrap: wrap;
        margin-top: 20px;
        display: flex;
        flex-direction: row;
        align-items: center;
        .noTags {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        :deep(.nut-checkboxgroup) {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          flex-direction: row;
          .tagItem {
            display: flex;
            height: 48px;
            align-items: center;
            width: 28%;
            margin-bottom: 20px;
            margin-right: 32px;
            .nut-input {
              .nut-input-value {
                .nut-input-inner {
                  .nut-input-right-icon {
                    width: 28px;
                    height: 28px;
                    margin-left: 0;
                    margin-right: 4px;
                    .nutui-iconfont {
                      font-size: 24px;
                      transform: scale(0.6);
                      font-weight: bold;
                    }
                  }
                }
              }
            }
          }
          .nut-checkbox {
            width: 40px;
            height: 40px;
            .nut-icon {
              color: #fff;
            }
          }
        }
        :deep(.nut-input) {
          padding: 0;
          border: 0;
          color: #999;
          width: 90%;
          background: #fff;
          .input-text {
            color: #606266;
            padding-left: 10px;
          }
        }
      }
    }
    .cover {
      padding-left: 40px;
      margin-top: 40px;
      margin-bottom: 40px;
      .coverTop {
        color: #fff;
        height: 60px;
        line-height: 60px;
        display: flex;
        align-items: center;
        padding-right: 40px;
        .coverTitle {
          font-size: 28px;
        }
      }
      .coverContent {
        width: 320px;
        margin: 0 auto;
        margin-top: 20px;
        height: 320px;
        position: relative;
        .nut-uploader {
          justify-content: center;
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          // background-image: url('/@/assets/images/edittest.jpeg');
          background-repeat: no-repeat;
          background-size: cover;
          :deep(.nut-uploader__slot) {
            width: 100%;
            height: 100%;
            .nut-button {
              background: none;
              width: 100%;
              padding: 0;
              height: 100%;
              .nut-button__warp {
                width: 100%;
                height: 100%;
                view,
                div {
                  width: 100%;
                  height: 100%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  .nut-icon {
                    font-size: 48px;
                    color: #999;
                  }
                }
              }
            }
          }
        }
        input {
          width: 320px;
          height: 320px;
          position: absolute;
          top: 0;
          z-index: 10;
          opacity: 0;
        }
        .loadingModal {
          width: 320px;
          height: 320px;
          position: absolute;
          top: 0;
          z-index: 20;
          background: rgba(0, 0, 0, 0.6);
          .nut-icon {
            color: #999;
            position: absolute;
            left: 50%;
            top: 50%;
            margin-left: -20px;
            margin-top: -20px;
          }
          .loading {
            font-size: 24px;
            color: #999;
            text-align: center;
            position: absolute;
            left: 50%;
            top: 65%;
            width: 120px;
            height: 36px;
            line-height: 36px;
            margin-left: -60px;
            margin-top: -18px;
          }
        }
        .clearCurrentImg {
          position: absolute;
          right: -30px;
          top: -30px;
          width: 60px;
          color: #999;
          height: 60px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
</style>
