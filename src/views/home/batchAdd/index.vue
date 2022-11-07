<template>
  <div class="batchAddWrapper">
    <nut-navbar @on-click-back="back" :title="$t($route.meta.title)">
      <template #left>
        <nut-icon class="left" name="left" />
      </template>
    </nut-navbar>
    <div :class="['save', isActive ? 'active' : '']" @click="save">
      <span>OK</span>
    </div>
    <div class="sp">
      <div class="spTop">
        <span class="spTopTitle">规格与定价:</span>
        <span class="spTopAddBtn" @click="appendSps"><i class="iconfont icon-plus"></i></span>
      </div>
      <div class="spContent">
        <div class="spContentItem" v-for="(item, index) in spData" :key="item.id">
          <div class="spContentItemName item">
            <nut-icon name="check-disabled" @click="deleteSps(index)" />
            <span>{{ index + 1 }}</span>
            <nut-input v-model="item.specifications" :placeholder="item.specifications" />
          </div>
          <div class="spContentItemPrice item">
            <span>定价:</span>
            <nut-inputnumber v-model="item.pricing" icon-left="triangle-down" icon-right="triangle-up" />
          </div>
        </div>
      </div>
    </div>
    <div class="tags">
      <div class="tagsTop">
        <span class="tagsTitle">标签:</span>
        <span class="tagsAddBtn" @click="appendTags"><i class="iconfont icon-plus"></i></span>
      </div>
      <div class="tagContent">
        <nut-checkboxgroup v-model="checkboxgroup">
          <div v-for="(item, index) in tagData" :key="item.id" class="tagItem">
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
      </div>
    </div>
    <div class="selectGood">
      <!-- <div class="selectGoodTop">
        <span class="selectGoodTitle">选择商品:</span>
        <span class="goodCounts">{{ state.commoditys.length ? state.commoditys.length + '个' : '' }}</span>
      </div> -->
      <div class="selectGoodContent">
        <div class="current">
          <span>最近项目</span>
          <nut-icon name="triangle-down" />
        </div>
      </div>
      <div class="recent">
        <div class="recentItem add">
          <nut-uploader>
            <nut-button type="success" size="small"><nut-icon name="photograph" v-if="showCamera" /></nut-button>
          </nut-uploader>
          <input type="file" @change="inputchange" ref="inputRef" accept="image/*" multiple />
        </div>
        <div class="recentItem add" v-for="item in commodityCover" :key="item.id" @click="selectCommodity(item)">
          <img :src="item.picUrl" class="recentItemImg" />
          <div class="modal" v-show="item.isShowModal">
            <nut-icon name="success" />
          </div>
          <div class="loadingModal" v-if="item.loading">
            <nut-icon name="loading" />
            <div class="loading">上传中...</div>
          </div>
          <div class="loadingModal" v-if="item.loadingSuccess">
            <nut-icon name="Check" />
            <div class="loading">上传成功</div>
          </div>
          <div class="loadingModal" v-if="item.loadingFail">
            <nut-icon name="failure" />
            <div class="loading">上传失败</div>
          </div>
        </div>
      </div>
    </div>
    <div class="selected" v-show="selectedCommoditys.length">
      <span>已选择{{ selectedCommoditys.length }}个商品</span>
      <nut-icon name="del" @click="delSelectedCommoditys" />
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref, reactive, onMounted } from 'vue';
  import router from '/@/router';
  import { Tag, CommoditySpAddObject, CommodityAddObject, Sp, Commodity } from '../../../../types/commodity';
  import { v4 as uuidv4 } from 'uuid';
  import { addTags, addCommodity, delTags, getCommodityList } from '/@/api/commodity';
  import { upload, getFileStatus } from '/@/api/upload';
  type commodityCover = {
    id: string;
    picUrl: string;
    isShowModal: boolean;
    loading?: boolean;
    loadingSuccess?: boolean;
    loadingFail?: boolean;
  };
  const isActive = ref<boolean>(false);
  const showCamera = ref<boolean>(true);
  // //正在上传动画
  // const loading = ref<boolean>(false);
  // //上传成功动画
  // const loadingSuccess = ref<boolean>(false);
  // //上传失败动画
  // const loadingFail = ref<boolean>(false);
  //商品数据
  const commoditysObject = reactive<CommodityAddObject>({
    commoditys: new Array<Commodity>(),
  });
  //商品缩略图 数组
  const commodityCover = ref<Array<commodityCover>>([]);
  const checkboxgroup = ref<Array<string>>([]);
  //添加商品的数据类型
  const state = reactive<CommodityAddObject>({
    commoditys: [],
  });
  //选中的商品
  const selectedCommoditys = ref<Array<commodityCover>>([]);
  //规格数据
  const spData = ref<Array<CommoditySpAddObject>>([
    {
      id: '',
      picUrl: '',
      pricing: 0,
      specifications: '',
    },
  ]);
  //标签数据
  const tagData = ref<Array<Tag>>([
    {
      id: uuidv4(),
      name: '',
      selected: false,
    },
  ]);
  //标签临时数据，存放服务端返回的id，区别于上面的tagData，上面的tagData主要用来追加输入框
  const tempTagData = ref<Array<Tag>>([
    {
      id: '',
      name: '',
      selected: false,
    },
  ]);
  //删除选中商品
  const delSelectedCommoditys = (): void => {
    //删除的个数
    let count = 0;
    for (let i = 0; i < commodityCover.value.length; i++) {
      for (let j = 0; j < selectedCommoditys.value.length; j++) {
        if (commodityCover.value[i] && commodityCover.value[i].id) {
          if (commodityCover.value[i].id == selectedCommoditys.value[j].id) {
            count++;
            //把id相同的项删除
            commodityCover.value = commodityCover.value.filter((item) => {
              return selectedCommoditys.value[j].id != item.id;
            });
            //删除的过程中，数组的长度是动态变化的
            //递归调用，
            delSelectedCommoditys();
          }
        }
      }
    }
    selectedCommoditys.value.length -= count;
  };
  //选中和反选商品
  const selectCommodity = (item: commodityCover) => {
    item.isShowModal = !item.isShowModal;
    if (item.isShowModal) {
      selectedCommoditys.value.push(item);
      for (let i = 0; i < selectedCommoditys.value.length; i++) {
        if (selectedCommoditys.value[i].picUrl.indexOf('data:image/jpeg;base64,') !== -1) {
          isActive.value = false;
        } else {
          isActive.value = true;
        }
      }
    } else if (!item.isShowModal) {
      isActive.value = false;
      for (let i = 0; i < selectedCommoditys.value.length; i++) {
        if (item.id == selectedCommoditys.value[i].id) {
          selectedCommoditys.value.splice(i, 1);
        }
      }
    }
  };
  //上传图片
  const inputchange = (e: any) => {
    //多张图片上传
    if (e.target?.files.length > 1) {
      //上传时img先赋值，同时添加DOM
      let files = e.target.files;
      for (let i = 0; i < files.length; i++) {
        let imgUrl = '';
        let reader = new FileReader();
        reader.readAsDataURL(files[i]);
        reader.addEventListener('load', function () {
          imgUrl = this.result as string;
          commodityCover.value.push({
            id: uuidv4(),
            picUrl: imgUrl,
            isShowModal: false,
            loading: true,
            loadingSuccess: false,
            loadingFail: false,
          });
        });
        const formData = new FormData();
        let fileName = '';
        if (e.target?.files[i]) {
          fileName = e.target?.files[i].name;
        }
        formData.append('file', e.target?.files[i]);
        upload(formData).then((res) => {
          if (res.data.status == 200) {
            getFileStatus(res.data.data.taskId).then((res) => {
              let item = commodityCover.value[commodityCover.value.length - files.length + i];
              if (res.data.data.status[fileName].isCompleted) {
                //上传成功后获取后端图片地址赋值
                item.picUrl = res.data.data.status[fileName].url;
                item.loading = false;
                item.loadingSuccess = true;
                setTimeout(() => {
                  item.loadingSuccess = false;
                }, 2000);
              } else {
                item.loading = false;
                item.loadingFail = true;
                // item.picUrl = '';
                // setTimeout(() => {
                //   lastItem.loadingFail = false;
                // }, 2000);
              }
            });
          }
        });
      }
    } else if (e.target?.files.length == 1) {
      //单张图片上传
      let files = e.target.files;
      let imgUrl = '';
      let reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.addEventListener('load', function () {
        imgUrl = this.result as string;
        commodityCover.value.push({
          id: uuidv4(),
          picUrl: imgUrl,
          isShowModal: false,
          loading: true,
          loadingSuccess: false,
          loadingFail: false,
        });
      });
      const formData = new FormData();
      let fileName = '';
      if (e.target?.files[0]) {
        fileName = e.target?.files[0].name;
      }
      formData.append('file', e.target?.files[0]);
      upload(formData).then((res) => {
        if (res.data.status == 200) {
          getFileStatus(res.data.data.taskId).then((res) => {
            let lastItem = commodityCover.value[commodityCover.value.length - 1];
            if (res.data.data.status[fileName].isCompleted) {
              //上传成功后获取后端图片地址赋值
              lastItem.picUrl = res.data.data.status[fileName].url;
              lastItem.loading = false;
              lastItem.loadingSuccess = true;
              setTimeout(() => {
                lastItem.loadingSuccess = false;
              }, 2000);
            } else {
              lastItem.loading = false;
              lastItem.loadingFail = true;
              // lastItem.picUrl = '';
              // setTimeout(() => {
              //   lastItem.loadingFail = false;
              // }, 2000);
            }
          });
        }
      });
    }
  };
  const back = () => {
    router.push({ path: '/' });
  };
  //追加一个标签
  //使用uuid确保每个输入框的id不同
  const appendTags = () => {
    tagData.value.push({
      id: uuidv4(),
      name: '',
      selected: false,
    });
  };
  //追加一行规格
  const appendSps = () => {
    spData.value.push({
      id: '',
      picUrl: '',
      pricing: 0,
      specifications: '',
    });
  };
  //标签输入框失去焦点
  const blur = async (value: string, item: Tag) => {
    if (value.trim() !== '') {
      const res = await addTags(value);
      //每新增一个标签，push到tempTagData，最后用作统一提交
      if (res.data.data && res.data.data.id) {
        tempTagData.value.push({
          id: res.data.data.id,
          name: value,
          selected: true,
        });
        //用于删除
        item.id = res.data.data.id;
        //删除第一项默认值
        tempTagData.value.shift();
      }
    }
  };
  //右上角ok键添加商品
  const save = async () => {
    //首先获取商品个数，选中的个数
    //添加多个商品
    for (let i = 0; i < selectedCommoditys.value.length; i++) {
      state.commoditys.push({
        name: 'a',
        picUrl: selectedCommoditys.value[i].picUrl,
        sps: [],
        tags: [],
      });
    }
    //pricing转number
    for (let i = 0; i < spData.value.length; i++) {
      spData.value[i].pricing = Number(spData.value[i].pricing);
    }
    //对于每个商品，添加规则
    for (let i = 0; i < state.commoditys.length; i++) {
      state.commoditys[i].sps = spData.value as Array<Sp>;
    }
    //判断有没有添加标签,标签数据默认长度为1
    if (tempTagData.value.length > 1) {
      //删除第一项默认值
      tempTagData.value.shift();
      //对于每个商品，添加标签
      for (let i = 0; i < state.commoditys.length; i++) {
        state.commoditys[i].tags = tempTagData.value;
      }
    } else {
      for (let i = 0; i < state.commoditys.length; i++) {
        state.commoditys[i].tags = tempTagData.value;
      }
    }
    //添加商品
    if (isActive.value) {
      await addCommodity(state);
    }
    // for (let i = 0; i < state.commoditys.length; i++) {
    //   if (state.commoditys[i].picUrl?.indexOf('data:image/jpeg;base64,') !== -1) {
    //     return;
    //   } else {
    //     await addCommodity(state);
    //   }
    // }
  };
  //删除tag
  const deleteTag = (index: number, item: Tag) => {
    tagData.value.splice(index, 1);
    //uuid包含-，用于区别数据库返回的id
    if (item.id.indexOf('-') !== -1) {
    } else {
      delTags(item.id);
    }
    if (tagData.value.length === 0) {
      tagData.value.push({ id: uuidv4(), name: '', selected: false });
    }
  };
  //删除规格
  const deleteSps = (index: number) => {
    if (spData.value.length == 1) {
      return;
    } else {
      spData.value.splice(index, 1);
    }
  };
  onMounted(() => {
    getCommodityList().then((res: any) => {
      commoditysObject.commoditys = res.data.data.list;
      for (let i = 0; i < commoditysObject.commoditys.length; i++) {
        commoditysObject.commoditys[i].isShowModal = false;
        commodityCover.value.push({
          id: uuidv4(),
          picUrl: commoditysObject.commoditys[i].picUrl as string,
          isShowModal: false,
        });
      }
    });
  });
</script>
<style lang="scss" scoped>
  .batchAddWrapper {
    height: 100vh;
    width: 100vw;
    background: #000;
    overflow: auto;
    position: relative;
    .nut-navbar {
      z-index: 10;
      background: #000;
      box-shadow: 0 0;
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
      color: #999;
      font-size: 28px;
      // color: #fff;
      position: absolute;
      right: 40px;
      top: 20px;
      z-index: 20;
      &.active {
        color: #459bf8;
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
        padding-left: 30px;
        .spContentItem {
          color: #fff;
          display: flex;
          justify-content: flex-start;
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
          .spContentItemPrice {
            margin-left: 40px;
          }
        }
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
    .selectGood {
      // padding-left: 40px;
      margin-top: 40px;
      .selectGoodTop {
        color: #fff;
        height: 60px;
        line-height: 60px;
        display: flex;
        align-items: center;
        padding-right: 40px;
        .selectGoodTitle {
          font-size: 28px;
        }
        .goodCounts {
          margin-left: 40px;
        }
      }
      .selectGoodContent {
        padding-left: 40px;
        .current {
          color: #fff;
          margin-top: 20px;
          display: flex;
          align-items: center;
          font-size: 24px;
          .nutui-iconfont {
            margin-left: 10px;
            transform: scale(0.7);
          }
        }
      }
      .recent {
        overflow: scroll;
        height: calc(100vh - 680px);
        margin-top: 20px;
        font-size: 0;
        padding-left: 20px;
        padding-right: 20px;
        .recentItem {
          width: 234px;
          height: 234px;
          margin-bottom: 4px;
          margin-right: 4px;
          display: inline-block;
          position: relative;
          &:nth-child(3n) {
            margin-right: 0;
          }
          img {
            width: 100%;
            height: 100%;
          }
          .modal {
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            width: 100%;
            background: rgba(0, 0, 0, 0.2);
            .nut-icon {
              border-radius: 50%;
              position: absolute;
              right: 10px;
              bottom: 10px;
              color: #fff;
              background: #f30;
              display: inline-block;
              width: 32px;
              height: 32px;
            }
          }
        }
        .add {
          width: 234px;
          height: 234px;
          position: relative;
          .nut-uploader {
            justify-content: center;
            width: 100%;
            height: 100%;
            box-sizing: border-box;
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
            width: 234px;
            height: 234px;
            position: absolute;
            top: 0;
            z-index: 10;
            opacity: 0;
          }
          .loadingModal {
            width: 234px;
            height: 234px;
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
    .selected {
      color: #fff;
      font-size: 24px;
      font-weight: bold;
      position: fixed;
      bottom: 0;
      letter-spacing: 1px;
      width: 100%;
      text-align: center;
      height: 80px;
      background: #121212;
      line-height: 90px;
      display: flex;
      justify-content: center;
      align-items: center;
      .nut-icon {
        position: absolute;
        right: 40px;
        color: #666;
      }
    }
  }
</style>
