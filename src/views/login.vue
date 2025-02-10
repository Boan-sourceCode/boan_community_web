<template>
  <div class="login">
    <vue-particles class="login-bg" style="position:absolute;width:100%;height: 99%" color="#f4f4f4"
      :particle-opacity="0.7" :particles-number="100" shape-type="circle" :particle-size="4" lines-color="#f4f4f4"
      :lines-width="1" :line-linked="true" :line-opacity="0.4" :lines-distance="150" :move-speed="5" :hover-effect="true"
      hover-mode="repulse" :click-effect="true" click-mode="push" />
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
      <div style="width: 200%;margin-left: -20%;">
        <div class="logo">
          <img src="../assets/images/login.png" width="90%" style="margin-top: 0.3125rem;" />
        </div>
        <h3 class="title">
          杏花岭区“千站万人”强治理服务平台
        </h3>
      </div>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="用户名">
          <svg-icon slot="prefix" icon-class="user1" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" type="password" auto-complete="off" placeholder="请输入密码"
          @keyup.enter.native="handleLogin">
          <svg-icon slot="prefix" icon-class="password1" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <el-form-item prop="code" v-if="captchaOnOff">
        <el-input v-model="loginForm.code" auto-complete="off" placeholder="请输入验证码" style="width: 63%"
          @keyup.enter.native="handleLogin">

        </el-input>
        <div class="login-code">
          <img :src="codeUrl" @click="getCode" class="login-code-img" />
        </div>
      </el-form-item>
      <el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 25px 0px;color: #fff">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button :loading="loading" size="medium" type="primary" class="btn" style="width:100%;"
          @click.native.prevent="handleLogin">
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
        <div style="float: right;" v-if="register">
          <router-link class="link-type" :to="'/register'">立即注册</router-link>
        </div>
      </el-form-item>
    </el-form>
    <!--  底部  -->
    <div class="el-login-footer">
      <span>版权所有：山西省太原市杏花岭区政府</span>
    </div>
  </div>
</template>

<script>
import { getCodeImg } from "@/api/login";
import Cookies from "js-cookie";
import { encrypt, decrypt } from '@/utils/jsencrypt'

export default {
  name: "Login",
  data() {
    return {
      codeUrl: "",
      loginForm: {
        username: "",
        password: "",
        rememberMe: false,
        code: "",
        uuid: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "请输入您的账号" }
        ],
        password: [
          { required: true, trigger: "blur", message: "请输入您的密码" }
        ],
        code: [{ required: true, trigger: "change", message: "请输入验证码" }]
      },
      loading: false,
      // 验证码开关
      captchaOnOff: true,
      // 注册开关
      register: false,
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  created() {
    this.getCode();
    this.getCookie();
  },
  methods: {
    getCode() {
      getCodeImg().then(res => {
        this.captchaOnOff = res.captchaOnOff === undefined ? true : res.captchaOnOff;
        if (this.captchaOnOff) {
          this.codeUrl = "data:image/gif;base64," + res.img;
          this.loginForm.uuid = res.uuid;
        }
      });
    },
    getCookie() {
      const username = Cookies.get("username");
      const password = Cookies.get("password");
      const rememberMe = Cookies.get('rememberMe')
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password: password === undefined ? this.loginForm.password : decrypt(password),
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
      };
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          localStorage.setItem("username", this.loginForm.username);
          if (this.loginForm.rememberMe) {
            Cookies.set("username", this.loginForm.username, { expires: 30 });
            Cookies.set("password", encrypt(this.loginForm.password), { expires: 30 });
            Cookies.set('rememberMe', this.loginForm.rememberMe, { expires: 30 });
          } else {
            Cookies.remove("username");
            Cookies.remove("password");
            Cookies.remove('rememberMe');
          }
          this.$store.dispatch("Login", this.loginForm).then(() => {
            this.$router.push({ path: "/introduction" }).catch(() => { });
          }).catch(() => {
            this.loading = false;
            if (this.captchaOnOff) {
              this.getCode();
            }
            this.loginForm.code = ""
          });
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  //background-color:#001369;
  background: #141e6e;
  /*Linear gradient... */
  background:
    radial-gradient(at center, #0075c3, #000b61);
  background-size: cover;
}

.logo {
  width: 100px;
  height: 100px;
  float: left;
  border-radius: 50%;
  margin-bottom: 10px;
}

.title {
  margin: auto;
  margin-left: 0.625rem;
  margin-top: 12px;
  text-align: center;
  font-size: 2rem;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #FFFFFF;
  float: left;
  line-height: 4.625rem;
}

.login-form {
  border-radius: 6px;
  //background: #ffffff;
  width: 450px;
  padding: 25px 25px 5px 25px;

  .el-input {
    height: 38px;

    input {
      height: 38px;
    }
  }

  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}

.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}

.login-code {
  width: 33%;
  height: 38px;
  float: right;

  img {
    cursor: pointer;
    vertical-align: middle;
  }
}

.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}

.login-code-img {
  height: 38px;
}

.btn {
  background-color: #ffffff;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #003F91;
}

.el-input__inner::placeholder {
  color: #003F91;
}

/* 谷歌 */
.el-input__inner::-webkit-input-placeholder {
  color: #003F91;
}

/* 火狐 */
.el-input__inner:-moz-placeholder {
  color: #003F91;
}

/*ie*/
.el-input__inner:-ms-input-placeholder {
  color: #003F91;
}
</style>
