<template>
  <div class="cartWrapper">
    <nut-navbar @on-click-back="back" :title="$t($route.meta.title)">
      <template #left>
        <nut-icon class="left" name="left" />
      </template>
    </nut-navbar>
    <HomeTop :isShare="isShare" :isCountry="isCountry" :isUser="isUser" />
    <div class="cartList">
      <div class="cartListItem">
        <img :src="homeTest2" />
        <span class="goodsName">商品名称</span>
        <span class="price">250$</span>
        <nut-button
          class="selected"
          shape="square"
          plain
          type="default"
          icon="triangle-down"
          @click="
            () => {
              show = true;
            }
          "
        >
          {{ '一碗' }}
        </nut-button>
        <nut-button shape="square" plain type="default" icon="Check" color="#fff" class="confirm" />
        <nut-picker v-model:visible="show" :columns="columns" title="选择" @change="change" @confirm="confirm" />
      </div>
      <div class="cartListItem">
        <img :src="homeTest1" />
        <span class="goodsName">商品名称</span>
        <span class="price">500$</span>
        <nut-button
          class="selected"
          shape="square"
          plain
          type="default"
          icon="triangle-down"
          @click="
            () => {
              show = true;
            }
          "
        >
          {{ '白色' }}
        </nut-button>
        <nut-button shape="square" plain type="default" icon="Check" color="#fff" class="confirm" />
        <nut-picker v-model:visible="show" :columns="columns" title="选择" @change="change" @confirm="confirm" />
      </div>
      <div class="cartListItem">
        <img :src="homeTest2" />
        <span class="goodsName">商品名称</span>
        <span class="price">250$</span>
        <nut-button
          class="selected"
          shape="square"
          plain
          type="default"
          icon="triangle-down"
          @click="
            () => {
              show = true;
            }
          "
        >
          {{ '一碗' }}
        </nut-button>
        <nut-button shape="square" plain type="default" icon="Check" color="#fff" class="confirm" />
        <nut-picker v-model:visible="show" :columns="columns" title="选择" @change="change" @confirm="confirm" />
      </div>
    </div>
    <div class="cartBottomWrapper">
      <div class="address">
        <div>您的地址:</div>
        <nut-input v-model="cart.address" placeholder="" />
      </div>
      <div class="telegramCode">
        <div>验证码:</div>
        <div class="telegram">
          <input v-model="telegramCode.code" class="nut-input-text" :placeholder="$t('cart.verificationCode')" type="text" />
          <!-- <span :class="{ 'send-active': isActive }" class="send" @click="send">{{
            isShowleftTime ? leftTime + 'S' : $t('register.send')
          }}</span> -->
          <div class="model" @click="loginTelegram" v-if="!user?.id"></div>
          <i @click="loginTelegram" class="iconfont icon-paperPlane-fill" v-if="!user?.id"></i>
          <transition
            appear
            name="animate__animated animate__pulse"
            enter-active-class="animated animate__fadeIn"
            leave-active-class="animated animate__fadeOut"
          >
            <div class="photo-url-wrapper" v-if="user?.id" @click="showLogOut">
              <img :src="user?.photo_url" class="photo-url" />
              <transition
                appear
                name="animate__animated animate__pulse"
                enter-active-class="animated animate__fadeIn"
                leave-active-class="animated animate__fadeOut"
              >
                <div class="pop" v-if="isShowLogOut">
                  <span @click="logout">{{ $t('register.logOut') }}</span>
                </div>
              </transition>
            </div>
          </transition>
        </div>
      </div>
      <div class="count">
        <div>合计:</div>
        <span>$750</span>
      </div>
      <div class="confirmBtn">
        <nut-button shape="square" plain type="default" color="#fff">OK</nut-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup name="HomePage">
  import { ref } from 'vue';
  import HomeTop from '/@/components/home/homeTop.vue';
  import router from '/@/router';
  // import { VerifyCodeParams } from '../../../../types/register';
  // import { getTelegramVerifyCode } from '/@/api/index';
  import { removeCookie, setCookie } from '/@/utils/jsCookie';
  import { Notify } from '@nutui/nutui';
  // import { useI18n } from 'vue-i18n';
  import { i18n } from '/@/i18n/index';
  import homeTest1 from '/@/assets/images/hometest1.jpeg';
  import homeTest2 from '/@/assets/images/hometest2.jpg';
  // const I18n = useI18n();
  const back = () => {
    router.push({ path: '/' });
  };
  const isShare = ref<boolean>(false);
  const isCountry = ref<boolean>(false);
  const isUser = ref<boolean>(false);
  const show = ref<boolean>(false);
  const isActive = ref<boolean>(false);
  // const isShowleftTime = ref<boolean>(false);
  // const leftTime = ref<number>(6);
  const isShowLogOut = ref<boolean>(false);
  // const timer = ref<any>();
  const tgId = ref<string>('5780283306');
  const isLoggedOut = ref<boolean>(false);
  type user = {
    auth_date: number;
    first_name: string;
    hash: string;
    id: number;
    last_name: string;
    photo_url: string;
    username: string;
  };
  const user = ref<user | null>(null);
  const columns = ref<any>([
    { text: '一碗', value: 'yiwan' },
    { text: '白色', value: 'yiwan' },
  ]);
  //name为用户名，已注册过
  const telegramCode = reactive<any>({
    name: '',
    code: '',
  });
  type cart = {
    address: string;
    telegramCode: string;
  };
  const cart = ref<cart>({
    address: '',
    telegramCode: '',
  });
  const confirm = ({ selectedValue, selectedOptions }) => {
    window.console.log(selectedValue, selectedOptions);
  };
  const change = ({ selectedValue, selectedOptions }) => {
    window.console.log(selectedValue, selectedOptions);
  };
  // const countDown = () => {
  //   leftTime.value--;
  //   timer.value = setTimeout(countDown, 1000);
  //   if (leftTime.value <= 0) {
  //     //隐藏登录按钮
  //     isShowLogOut.value = false;
  //     clearTimeout(timer.value);
  //     //隐藏剩余时间
  //     isShowleftTime.value = false;
  //     timer.value = '';
  //     leftTime.value = 6;
  //     return;
  //   }
  // };
  // const send = async () => {
  //   if (timer.value || !isActive.value) return;
  //   //显示剩余时间
  //   isShowleftTime.value = true;
  //   countDown();
  //   const data: VerifyCodeParams = {
  //     name: telegramCode.name,
  //     tgId: user.value?.id as number,
  //   };
  //   if (!telegramCode.name) {
  //     Notify.danger(I18n.t('register.account'), { background: 'rgba(230,67,46, 0.5)' });
  //   } else {
  //     const res: any = await getTelegramVerifyCode(data, 'register');
  //     if (res.data.data) {
  //     }
  //   }
  // };
  const loginTelegram = () => {
    (window as any).Telegram.Login.auth({ bot_id: tgId.value, request_access: 'write', embed: 1 }, (data) => {
      if (data) {
        //请求成功后保存数据
        user.value = data;
        setCookie(data);
        isActive.value = true;
      }
      if (!data) {
        Notify.danger((i18n.global as any).t('register.toastError'), { background: 'rgba(230,67,46, 0.5)' });
      }
    });
  };
  const showLogOut = (e: MouseEvent): void => {
    if ((e.target as any)?.nodeName === 'SPAN') return;
    isShowLogOut.value = !isShowLogOut.value;
  };
  const logout = (): void => {
    //true需用telegram登出方法返回值替代
    isLoggedOut.value = true;
    //登出成功
    if (isLoggedOut.value) {
      //删除cookie
      removeCookie();
      user.value = null;
      //隐藏登录按钮
      isShowLogOut.value = false;
      //发送置灰
      isActive.value = false;
    }
  };
</script>
<style lang="scss" scoped>
  .cartWrapper {
    height: 100vh;
    width: 100vw;
    background: #000;
    overflow: auto;
    position: relative;
    .nut-navbar {
      margin-bottom: 0;
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
    .cartList {
      overflow: auto;
      height: 576px;
      .cartListItem {
        margin-bottom: 40px;
        color: #fff;
        font-size: 28px;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        img {
          width: 120px;
          height: 120px;
          border-radius: 50%;
        }
        .goodsName {
          font-size: 24px;
        }
        .price {
          font-weight: bold;
          font-size: 32px;
        }
        .selected {
          padding: 0;
          height: 60px;
          font-size: 24px;
          :deep(.nut-button__warp) {
            flex-direction: row-reverse;
            .nut-icon {
              font-size: 24px;
              transform: scale(0.8);
            }
            .text {
              padding-right: 40px;
            }
          }
        }
        .confirm {
          background: #230b5c !important;
          height: 60px;
          width: 60px;
          border-color: #999 !important;
          margin-left: 20px;
        }
      }
    }
    .cartBottomWrapper {
      width: 100%;
      height: 480px;
      position: fixed;
      bottom: 108px;
      display: flex;
      flex-direction: column;
      padding-left: 20px;
      padding-top: 20px;
      padding-right: 80px;
      box-sizing: border-box;
      background: #232323;
      border: 1px solid #666;
      .address {
        display: flex;
        flex-direction: column;
        & > div {
          font-weight: bold;
          color: #fff;
          font-size: 28px;
        }
        .nut-input {
          margin-top: 20px;
          height: 60px;
          line-height: 60px;
          padding: 0;
          padding-left: 20px;
        }
      }
      .telegramCode {
        font-size: 28px;
        color: #fff;
        font-weight: bold;
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        .telegram {
          display: flex;
          position: relative;
          height: 60px;
          margin-top: 20px;
          justify-content: space-between;
          .nut-input-text {
            width: 85%;
          }
          .icon-paperPlane-fill {
            font-size: 60px;
            // color: #230b5c;
          }
          .send {
            font-size: 16px;
            color: #fff;
            background: #c9c3d6;
            border: 1px solid #ccc;
            width: 90px;
            height: 80px;
            display: inline-block;
            position: absolute;
            box-sizing: border-box;
            justify-content: center;
            display: flex;
            align-items: center;
            border-right: 1px solid #a2a2a2;
          }
          .send-active {
            background: #230b5c;
            border: 1px solid #a2a2a2;
          }
          .telegram-code {
            width: 98px;
          }
          .nut-form-item {
            width: 330px !important;
            position: relative;
            z-index: 3;
            margin-left: 90px;
            width: 342px;
            border-radius: 0;
            box-sizing: border-box;
            :deep(.nut-input-text) {
              width: 330px;
              &::-webkit-input-placeholder {
                font-size: 24px !important;
              }
              &:-moz-placeholder {
                font-size: 24px !important;
              }
              &::-moz-placeholder {
                font-size: 24px !important;
              }
            }
          }
        }
      }
      .count {
        color: #fff;
        font-weight: bold;
        display: flex;
        margin-top: 20px;
        align-items: center;
        & > div {
          font-size: 28px;
        }
        & > span {
          font-size: 36px;
          margin-left: 37%;
        }
      }
      .confirmBtn {
        display: flex;
        align-items: center;
        .nut-button {
          background: #230b5c !important;
          height: 60px;
          width: 120px;
          border-color: #999 !important;
          margin-left: 20px;
          margin-left: 44%;
          margin-top: 20px;
        }
      }
    }
  }
</style>
