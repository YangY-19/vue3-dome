<template>
  <!-- vue3.0 组件根节点可以为多个, 或者用<Fragment>空标签 -->
  <div class="login">
    <div class="login-from">
      <header class="title">
        <transition
          appear
          enter-active-class="animate__animated animate__shakeX"
          appear-class="animate__animated animate__shakeX"
        >
          <p v-if="statusBar === 'login'">这是一个登录框</p>
          <p v-else>这里是注册的地方</p>
        </transition>
      </header>
      <div class="change-tab">
        <div class="login-text" @click="hasRegister('login')">登录</div>
        <div @click="hasRegister('register')">注册</div>
      </div>
        <div v-if="statusBar === 'login'">
          <div class="from-item">
            <label for="用户名" class="label">用户名:</label>
            <input placeholder="请输入用户名!" type="text" ref="userNameRef" class="input-style" />
          </div>

          <div class="from-item">
            <label for="密码" class="label">密 码:</label>
            <input
              placeholder="请输入密码!"
              type="password"
              ref="passWordRef"
              class="input-style"
            />
          </div>

          <div class="from-btn-group">
            <button class="btn-style" @click="submit">登录</button>
          </div>
        </div>

        <!-- 注册 -->
        <div v-else>
          <div class="from-item">
            <label for="昵称" class="label">昵称:</label>
            <input
              placeholder="请输入昵称!"
              type="text"
              @input="regNickName($event)"
              class="input-style"
            />
          </div>

          <div class="from-item">
            <label for="密码" class="label">密 码:</label>
            <input
              placeholder="请输入密码!"
              type="password"
              @input="regPassWord($event)"
              class="input-style"
            />
          </div>

          <div class="from-item">
            <label for="密码" class="label">确认密码:</label>
            <input
              placeholder="请确认密码!"
              type="password"
              @change="regConfig($event)"
              class="input-style"
            />
          </div>

          <div class="from-item">
            <label for="密码" class="label">性别:</label>
            <div class="radio-group">
              <label
                ><input
                  type="radio"
                  name="1"
                  @change="getRegGenderVal(1)"
                  value="男生"
                />男生</label
              >
              <label
                ><input
                  type="radio"
                  name="1"
                  @change="getRegGenderVal(2)"
                  value="女生"
                />女生</label
              >
            </div>
          </div>
          <div class="from-btn-group">
            <button class="btn-style" @click="registerSubmit">注册</button>
          </div>
        </div>
    </div>
  </div>

  <div>

  </div>
</template>

<script>
import { setup, ref, reactive, toRefs } from "vue";
import { useRouter, useRoute } from "vue-router";
import { login } from "../../api/service/login";
import { message } from "../../utils/ui";
import 'element-ui/lib/theme-chalk/index.css';
export default {
  setup(props, context) {
    //创建数据,与2.x里data()相同
    const state = reactive({
      userName: "",
      passWord: "",
      message: "账号:admin, 密码:123456",
      statusBar: "login",
      regUserNameVal: "", //注册信息
      regNickNameVal: "",
      regPassWordVal: "",
      regGenderVal: null,
      dialogImageUrl: '',
      dialogVisible: false
    });

    // let store = useStore()
    //登录信息
    const userNameRef = ref(null);
    const passWordRef = ref(null);
    //注册信息
    const regUserNameRef = ref(null);
    //路由
    const router = useRouter();
    const toPage = path => router.push(path);

    //点击登录
    const submit = async () => {
      state.userName = userNameRef.value.value;
      state.passWord = passWordRef.value.value;
      const { userName, passWord } = state;
      if (userName === "admin" && passWord === "123456") {
        toPage("/home");
      } else {
        const { data: { token, userId }, code,  } = await login({ userName, passWord });
        if (code === 10000) {
          localStorage.setItem("token", token);
          localStorage.setItem("userId", userId);
          message({ title: "登录成功!", type: "success" });
          // store.commit('setUserInfo', userInfo)
          toPage("/home");
        } else {
          message({ title: "登录失败!" });
        }
      }
    };

    // const add = computed({
    //     get:() => {
    //       debugger
    //         return count.value + 1
    //     },
    //     set: value => {
    //       debugger
    //         return count.value= value - 1
    //     }
    //  })

    const hasRegister = async type => {
      // add()
      state.statusBar = type;
    };

    //注册
     const handleRemove = (file, fileList) => {
        console.log(file, fileList);
      }
     const handlePictureCardPreview = (file) => {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }

    const regUserName = e => {
      const userName = /^1[3456789]\d{9}$/;
      if (userName.test(e.target.value)) {
        state.regNickNameVal = e.target.value;
      } else {
        message({ title: "用户名格式不正确!" });
      }
    };
    const regNickName = e => {
      const nickName = /^[\u4E00-\u9FA5\uF900-\uFA2D|\w]{2,20}$/;
      if (nickName.test(e.target.value)) {
        state.regUserNameVal = e.target.value;
      } else {
        message({ title: "昵称格式不正确!" });
      }
    };
    const regPassWord = e => {
      const passWord = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
      if (passWord.test(e.target.value)) {
        state.regPassWordVal = e.target.value;
      } else {
        message({ title: "密码格式不正确!" });
      }
    };
    const regConfig = e => {
      if (!(state.regPassWordVal === e.target.value)) {
        message({ title: "两次密码不一致!!" });
      }
    };
    const getRegGenderVal = (type) => {
      state.regGenderVal = type;
    };

    //点击注册
    const registerSubmit = async () => {
      const { regUserNameVal, regNickNameVal, regPassWordVal, regGenderVal } = state;
      if (
        regGenderVal == null ||
        regUserNameVal === "" ||
        regNickNameVal === "" ||
        regGenderVal === ""
      ) {
        message({ title: "请正确填写信息!" });
      }
      const register = await register({
        userName: regUserNameVal,
        nickName: regNickNameVal,
        passWord: regPassWordVal,
        gender: regGenderVal
      });
      const { data, code } = register;
      if (code === 10000) {
        message({ title: "请正确填写信息!", type: "success" });
        toPage("/");
      }
    };

    return {
      ...toRefs(state), //把一个响应式对象转换成普通对象
      userNameRef,
      passWordRef,
      toPage, //路由跳转
      submit,
      hasRegister,
      registerSubmit,
      regUserName,
      regNickName,
      regPassWord,
      regConfig,
      getRegGenderVal,
      handleRemove,
      handlePictureCardPreview
    };
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/style/variable.scss";
.login-from{
  width: 500px;
  min-height: 300px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  margin: 160px auto 60px auto;
  border-radius: 10px;
  transition: all 1s;
  background: #fff;
  .change-tab {
    display: flex;
    border-top: 1px rgb(224, 222, 222) solid;
    .login-text {
      border-right: 1px rgb(224, 222, 222) solid;
    }
    div {
      width: 50%;
      line-height: 50px;
    }
  }
  .title {
    line-height: 100px;
    font-size: 18px;
    font-weight: bold;
  }
  .from-item {
    margin: 40px 0;
  }
  .label {
    display: inline-block;
    width: 70px;
    text-align: right;
  }
  .from-btn-group {
    width: 100%;
    margin: auto;
  }
  .input-style {
    @include inputStyle($width: 260px);
  }
  .btn-style {
    @include btnStyle($width: 80px, $bgColor: rgb(230, 230, 230), $color: #333);
    margin-bottom: 40px;
    width: 45%;
  }

  .radio-group {
    display: inline-block;
    width: 290px;
    label {
      margin-right: 30px;
    }
  }
}
.animate__animated {
  transform-origin: left center;
}
</style>
