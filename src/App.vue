<template>
  <div class="app">
      <router-view/>
  </div>
  <div class="bg-color">
    <p>修改背景色</p>
    <input
      type="text"
      @input="bgColor($event)"
      class="input-style"
    />
  </div>
</template>

<script>
import { setup } from 'vue'
import Tab from './components/tab'
export default {
    components: {
       Tab
    },
    setup(props,  context) {
       const bgColor = (e) => {
         const value = e.target.value
         const body = document.getElementsByTagName("body")[0]
        if (value === '') {
          body.style.background = `#fff`
        }
        if (value.length > 6)  {
          e.target.value = value.substring(0,6)
        }
         if (/[0-9]|[a-z]|[A-Z]/.test(value) && (value.length === 3 || value.length === 6) ) {
            body.style.background = `#${value}`
         }
       }

       return {
          bgColor
       }
    }

}
</script>

<style lang="scss" scoped>
@import "./assets/style/variable.scss";
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 400px;
  height: 500px;
  margin: 100px auto;
  
}
.bg-color{
  width: 200px;
  height: 80px;
  position: fixed;
  top: 100px;
  right: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px #ccc solid;
  padding: 10px;
  border-radius: 10px;
  font-size: 18px;

}
.input-style{
  display: block;
  @include inputStyle($width: 170px);
  margin-top: 20px;
  font-size: 16px;
  font-family: cursive;
  text-align: center;
}

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
