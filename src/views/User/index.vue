<template>
  <div class="home">
      <Tab :hover="regGenderVal"></Tab>
      <div class="user-info" v-if="userInfo">
        <div class="basic-info-portrait">
           <div class="basic-info">
              <p>昵称: {{ userInfo.nickName }}</p>
              <p>性别: {{ userInfo.gender === '1' ? '男' : '女' }}</p>
              <p>账号: {{ userInfo.userName }}</p>
           </div>
           <div class="basic-portrait">
              <img v-if="userInfo.portrait" :src="userInfo.portrait" alt="">
             <img v-else src="../../assets/images/lianghui.png" alt="">
           </div>
        </div>
        <div class="address">
          <p>地址: {{ userInfo.address }}</p>
        </div>
      </div>
      <div v-else class="user-info"><p class="null">暂无消息！</p></div>
      <div class="introduce">{{ userInfo.introduce ? userInfo.introduce : '快去添加自己的简介吧'  }}</div>
      <div class="perfect-card">
        <h2>完善/修改名片</h2>
        <div class="from-item">
          <div class="upload-pic" v-if="picUrl.data === ''">
              <span class="iconfont">&#xe60f;</span>
              <input type="file" id="file" @change="uploadPic($event)" accept="image/jpg,image/jpeg,image/png,image/PNG">
          </div>
          <div class="upload-pic" v-else>
              <img :src="picUrl.data" alt="111">
          </div>
        </div>

        <div class="from-item">
            <label for="昵称" class="label">昵称:</label>
            <input
              type="text"
              @input="regNickName($event)"
              class="input-style"
            />
          </div>

          <div class="from-item">
            <label for="简介" class="label">简介:</label>
            <input
              type="text"
              @input="regNickName($event)"
              class="input-style"
            />
          </div>

          <div class="from-item">
            <label for="地址" class="label">地址:</label>
            <input
              type="text"
              @input="regNickName($event)"
              class="input-style"
            />
          </div>

        <div class="from-item">
            <label for="密码" class="label">性别:</label>
            <div class="radio-group">
              <label>
                <input
                  type="radio"
                  name="1"
                  @change="getGenderVal(1)"
                  value="男生"/>男生
                </label>
                <label>
                  <input
                    type="radio"
                    name="1"
                    @change="getGenderVal(2)"
                    value="女生"/>女生
              </label>
            </div>
          </div>

          <div class="from-btn-group">
            <button class="btn-style" @click="registerSubmit">修改</button>
          </div>

          
      </div>
  </div>
</template>

<script>

import { setup, watch, reactive, toRefs, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import Tab from '../../components/tab'
import { getUserInfo } from '../../api/service/user'
export default {
    name: 'user',
    components: {
       Tab
    },
    setup() {
      const state = reactive({
         userInfo: {
           nickName: 'XXX',
           gender: '1',
           userName: '13xxxxxxxxx',
           address: '江苏省苏州市工业园区'
         },
         picUrl: {
           data: '',
           picName: '',
           picType: ''
         },
         regGenderVal: null
      })
      //vuex 4 获取数据
      //  let store = useStore()
      //  state.userInfo = store.state.userInfo

       onMounted(async() => {
         const id = localStorage.getItem('userId')
         const {code, data } = await getUserInfo({ id })
         if (code === 10000) {
           state.userInfo = data
         } else {
           state.userInfo = {
              nickName: 'XXX',
              gender: '1',
              userName: '13xxxxxxxxx',
              address: '江苏省苏州市工业园区'
           }
         }
       })

       const uploadPic = (e) => {
         const pic_url = document.querySelector('#file').files[0];
         const value = e.target.value
         const index = value.lastIndexOf('\\');
         const index2 = value.lastIndexOf('.');
         const picName = value.substring(index + 1, index2)
         const picType = value.substring(index2 + 1)
         state.picUrl.picName = picName
         state.picUrl.picType = picType
         
         if (pic_url) {
           let reader = new FileReader();
           reader.readAsDataURL(pic_url)
           reader.onloadend = function(){
            // 把转换过得base赋值给全局变量
            // 这里reader.result就是转换好的bsae64格式图片
            state.picUrl.data = reader.result;
          }
         }
       } 

       const getGenderVal = (type) => {
          state.regGenderVal = type;
       };

    

       return {
         ...toRefs(state),
         uploadPic,
         getGenderVal,
       }
    }
  
};
</script>
<style lang="scss" scoped>
@import "../../assets/style/variable.scss";
.user-info{
  width: 100%;
  height: 150px;
  box-shadow: 0 0px 2px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  padding: 10px 10px 10px 24px;
  box-sizing: border-box;
  color: rgb(119, 119, 119);
  background: rgb(252, 253, 252);
  font-size: 15px;
  border-radius: 4px;
  .null{
    height: 100px;
    font-size: 18px;
    line-height: 100px;
  }
  .basic-info-portrait {
     width: 100%;
     height: 105px;
     display: flex;
     justify-content: space-between;
     .basic-info{
       width: 70%;
       height: 100px;
       text-align: left;
       line-height: 30px;
     }
     .basic-portrait {
       width: 30%;
       height: 90px;
       img {
         width: 80%;
         height: 100%;
         border-radius: 50%;
       }
     }
  }
  .address{
    text-align: left;
    color: #2c2c2c;
    font-size: 16px;
  }
}

.introduce{
  width: 100%;
  height: 50px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  color: #be9b9b;;
  box-shadow: 0 0px 2px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  background: #fff;
}

.perfect-card{
  margin-top: 10px;
  padding: 10px;
  border-radius: 4px;
  color: #333;
  box-shadow: 0 0px 2px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  background: #fff;

  .from-item {
    margin-top: 20px;
  }
    h2 {
      display: inline-block;
    line-height: 40px;
    color: rgb(78, 78, 78);
    border-bottom: 1px solid #c2bdbd;
    }
  .input-style {
    @include inputStyle($width: 250px);
  }
  .upload-pic{
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 1.2px solid #ccc;
    margin: 0 auto;
    cursor: pointer;
    .iconfont {
      line-height: 60px;
      font-size: 28px;
      color: #ccc;
    }
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
    input {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      opacity: 0;
      position: relative;
      top: -60px;
       &:focus{
         border: 0px #000 solid;
       }
    }
  }
  .label {
    display: inline-block;
    width: 90px;
    text-align: right;
  }
  .radio-group {
    display: inline-block;
    width: 280px;
    label {
      margin-right: 20px;
    }
  }
   .btn-style {
    @include btnStyle($width: 80px, $bgColor: rgb(230, 230, 230), $color: #333);
    margin:40px 0 20px 0;
    width: 45%;
  }
}
  
</style>
