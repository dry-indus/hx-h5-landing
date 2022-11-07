<template>
  <div class="register-wrapper">
    <nut-navbar @on-click-back="back" :title="$t($route.meta.title)">
      <template #left>
        <nut-icon class="left" name="left" />
      </template>
    </nut-navbar>
    <Country class="country" />
    <Title />
    <div class="register">
      <nut-form ref="ruleForm" :model-value="formData">
        <nut-form-item required prop="name" :rules="[{ required: true, message: $t('register.account') }]">
          <input v-model="formData.name" class="nut-input-text" :placeholder="$t('register.account')" type="text" />
        </nut-form-item>
        <nut-form-item required prop="pwd" :rules="[{ required: true, message: $t('register.password') }]">
          <input v-model="formData.pwd" class="nut-input-text" :placeholder="$t('register.password')" type="password" />
        </nut-form-item>
        <nut-form-item required prop="pwdConfirm" :rules="[{ required: true, message: $t('register.confirmPassword') }]">
          <input v-model="formData.pwdConfirm" class="nut-input-text" :placeholder="$t('register.confirmPassword')" type="password" />
        </nut-form-item>
        <div class="telegram">
          <nut-form-item required prop="telegramCode" :rules="[{ required: true, message: $t('register.verificationCode') }]">
            <input v-model="formData.telegramCode" class="nut-input-text" :placeholder="$t('register.verificationCode')" type="text" />
          </nut-form-item>
          <span :class="{ 'send-active': isActive }" class="send" @click="send">{{
            isShowleftTime ? leftTime + 'S' : $t('register.send')
          }}</span>
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
        <nut-button block type="info" @click="registerClick" class="register-btn"> {{ $t('register.register') }} </nut-button>
      </nut-form>
    </div>
  </div>
</template>
<script lang="ts" setup name="RegisterPage">
  import router from '/@/router';
  import { reactive, ref, onMounted, onActivated } from 'vue';
  import Title from '/@/components/Title/index.vue';
  import Country from '/@/components/language/index.vue';
  import { removeCookie, setCookie, getCookie } from '/@/utils/jsCookie';
  import { useI18n } from 'vue-i18n';
  import { registerData, VerifyCodeParams } from '../../../types/register';
  import { register, getTelegramVerifyCode } from '/@/api/index';
  import { Notify } from '@nutui/nutui';
  import { i18n } from '/@/i18n/index';
  const I18n = useI18n();
  const formData = reactive({
    name: '',
    pwd: '',
    pwdConfirm: '',
    telegramCode: '',
  });
  //定义user类型
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
  const ruleForm = ref<any>(null);
  const isShowLogOut = ref<boolean>(false);
  const isLoggedOut = ref<boolean>(false);
  const leftTime = ref<number>(6);
  const isShowleftTime = ref<boolean>(false);
  const timer = ref<any>();
  const tgId = ref<string>('5780283306');
  const isActive = ref<boolean>(false);
  //显示退出按钮
  const showLogOut = (e: MouseEvent): void => {
    if ((e.target as any)?.nodeName === 'SPAN') return;
    isShowLogOut.value = !isShowLogOut.value;
  };
  //退出登录
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
  const registerClick = () => {
    ruleForm.value.validate().then(async ({ valid, errors }: any) => {
      if (valid) {
        const data: registerData = {
          category: 1,
          name: formData.name,
          password: formData.pwd,
          passwordTwo: formData.pwdConfirm,
          tgId: user.value?.id as number,
          tgName: user.value?.username as string,
          tgPrtrait: user.value?.photo_url as string,
          verifyCode: formData.telegramCode,
        };
        register(data).then((res: any) => {
          if (res.data && res.data.data) {
            router.push({ path: '/merchant/home' });
          }
        });
      } else {
        window.console.log('error submit!!', errors);
      }
    });
  };
  const back = () => {
    router.push({ path: '/merchant/login' });
  };
  const countDown = () => {
    leftTime.value--;
    timer.value = setTimeout(countDown, 1000);
    if (leftTime.value <= 0) {
      //隐藏登录按钮
      isShowLogOut.value = false;
      clearTimeout(timer.value);
      //隐藏剩余时间
      isShowleftTime.value = false;
      timer.value = '';
      leftTime.value = 6;
      return;
    }
  };
  const send = async () => {
    if (timer.value || !isActive.value) return;
    //显示剩余时间
    isShowleftTime.value = true;
    countDown();
    const data: VerifyCodeParams = {
      name: formData.name,
      tgId: user.value?.id as number,
    };
    if (!formData.name) {
      Notify.danger(I18n.t('register.account'), { background: 'rgba(230,67,46, 0.5)' });
    } else {
      const res: any = await getTelegramVerifyCode(data, 'register');
      if (res.data.data) {
      }
    }
  };
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
  onMounted(() => {
    if (getCookie()) {
      const userInfo: user = JSON.parse(getCookie());
      if (userInfo) {
        if (userInfo.id) {
          user.value = userInfo;
          isActive.value = true;
        }
      }
    }
  });
  onActivated(() => {});
</script>
<style lang="scss">
  #telegram-login-HaiXianBot {
    margin-left: -302px;
    position: absolute;
    z-index: 2;
  }
</style>
<style scoped lang="scss">
  .register-wrapper {
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
    .country {
      right: 40px;
    }
    .register {
      padding: 20px;
      .telegram {
        margin-left: -126px;
        display: flex;
        width: 376px;
        position: relative;
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
      h2 {
        text-align: center;
        letter-spacing: 10px;
      }
      .nut-form {
        margin-top: 102px;
        :deep(.nut-cell-group__warp) {
          background-color: unset;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .register-btn {
            width: 500px;
            border-radius: 10px;
            height: 80px;
            background: #230b5c;
            border: 1px solid #797979;
          }
        }
      }
      .nut-form-item {
        background: #f2f3f5;
        // border-radius: 10px;
        margin-bottom: 40px;
        height: 80px;
        display: flex;
        align-items: 80px;
        align-items: center;
        width: 500px;
        input {
          background: transparent;
        }
      }
    }
    .register-btn {
      margin-top: 60px;
      a {
        text-decoration: none;
        color: #fff;
        font-weight: bold;
        margin-left: 110px;
      }
    }
    .model {
      position: absolute;
      z-index: 100;
      width: 100px;
      height: 80px;
      right: -144px;
      top: -5px;
      background: transparent;
    }
    .icon-paperPlane-fill {
      color: #fff;
      font-size: 60px;
      z-index: 1;
      position: absolute;
      right: -126px;
      bottom: 46px;
    }
    .left-time {
      color: #fff;
      font-size: 12px;
      position: absolute;
      right: -98px;
      top: 58px;
    }
    .photo-url-wrapper {
      z-index: 100;
      padding: 10px;
      position: absolute;
      width: 80px;
      height: 80px;
      right: -144px;
      bottom: 30px;
      border-radius: 50%;
      .photo-url {
        width: 80px;
        height: 80px;
        border-radius: 50%;
      }
      .pop {
        position: absolute;
        top: 50%;
        width: 80px;
        height: 40px;
        background: rgba(255, 255, 255, 0.7);
        border-radius: 0 0 80px 80px;
        font-size: 12px;
        text-align: center;
        span {
          color: #606266;
          line-height: 45px;
          font-weight: bold;
          // font-size: 12px;
        }
      }
    }
  }
</style>
