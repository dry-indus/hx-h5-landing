<template>
  <div class="login-wrapper">
    <Country class="country" />
    <Title />
    <div class="login">
      <nut-form ref="ruleForm" :model-value="formData">
        <div class="account">
          <nut-form-item required prop="name" :rules="[{ required: true, message: $t('login.account') }]">
            <input v-model="formData.name" class="nut-input-text" :placeholder="$t('login.account')" type="text" />
          </nut-form-item>
        </div>
        <div class="password">
          <nut-form-item required prop="pwd" :rules="[{ required: true, message: $t('login.password') }]">
            <input v-model="formData.pwd" class="nut-input-text" :placeholder="$t('login.password')" type="password" />
          </nut-form-item>
        </div>
        <nut-button block type="info" @click="submit" class="login-btn"> {{ $t('login.login') }} </nut-button>
      </nut-form>
    </div>
    <div class="register-btn">
      <router-link :to="{ path: '/merchant/register' }">{{ $t('login.register') }}</router-link>
    </div>
  </div>
</template>

<script lang="ts" setup name="LoginPage">
  import router from '/@/router';
  import { reactive, ref } from 'vue';
  import Title from '/@/components/Title/index.vue';
  import Country from '/@/components/language/index.vue';
  import { setCookie } from '/@/utils/jsCookie';
  import { loginData } from '../../../types/register';
  import { login } from '/@/api/index';
  import { Notify } from '@nutui/nutui';
  const formData = reactive({
    name: '',
    pwd: '',
  });
  const ruleForm = ref<any>(null);
  const submit = () => {
    ruleForm.value.validate().then(({ valid, errors }: any) => {
      if (valid) {
        const data: loginData = {
          name: formData.name,
          password: formData.pwd,
        };
        login(data)
          .then((res: any) => {
            if (res.data.status === 200) {
              setCookie(res.headers.hoken, 'hoken');
              router.push({ path: '/merchant/home' });
            }
          })
          .catch((err: any) => {
            if (err && err.status === 3000) {
              Notify.danger(err.message, { background: 'rgba(230,67,46, 0.8)' });
            }
          });
      } else {
        console.log('error submit!!', errors);
      }
    });
  };
</script>

<style scoped lang="scss">
  .login-wrapper {
    height: 100vh;
    width: 100vw;
    background: #000;
    overflow: auto;
    position: relative;
    .country {
      right: 52px;
      top: 110px;
    }
    .app-name {
      margin-top: 280px;
    }
    .login {
      padding: 20px;
      h2 {
        text-align: center;
        letter-spacing: 10px;
      }
      .nut-form {
        margin-top: 102px;
        :deep(.nut-cell-group__warp) {
          background-color: unset;
          .account {
            background-color: #000;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 16px;
            h2 {
              color: #fff;
              width: 180px;
              margin-bottom: 20px;
              font-size: 40px;
            }
          }
          .password {
            background-color: #000;
            display: flex;
            align-items: center;
            justify-content: center;
            h2 {
              color: #fff;
              width: 180px;
              margin-bottom: 20px;
              font-size: 40px;
            }
          }
          .login-btn {
            border-radius: 10px;
            width: 520px;
            height: 80px;
            background: #230b5c;
            border: 1px solid #797979;
            margin: 0 auto;
            margin-top: 90px;
          }
        }
      }
      .nut-form-item {
        background: #f2f3f5;
        // border-radius: 10px;
        margin-bottom: 20px;
        height: 80px;
        display: flex;
        align-items: 80px;
        align-items: center;
        width: 520px;
        input {
          background: transparent;
        }
      }
    }
    .register-btn {
      margin-top: 50px;
      a {
        text-decoration: none;
        color: #fff;
        font-weight: bold;
        margin-left: 110px;
        font-size: 28px;
      }
    }
  }
</style>
