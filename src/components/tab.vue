<template>
     <div class="tab" >
         <router-link tag="div" to="/home"><span class="iconfont">&#xe605;</span></router-link>
         <router-link tag="div" to="/discover"><span class="iconfont">&#xe726;</span></router-link>
         <router-link tag="div" to="/information"><span class="iconfont">&#xe660;</span></router-link>
         <router-link tag="div" to="/user"><span class="iconfont">&#xe600;</span></router-link>
         <span class="iconfont logout" @click="logout">&#xe70f;</span>
     </div>
</template>

<script>
import { setup, reactive, watchEffect } from 'vue'
import { useRouter, useRoute } from "vue-router";
import { modal } from '../utils/ui'
export default {
    props: ['hover'],
    setup(props,  context) {
        console.log(props.hover)
        console.log('-----------')
        watchEffect(() => {
            console.log(props.hover)
       })
        const router = useRouter()
        const logout = () => {
             modal({
                title: '登出提示!',
                content: '确认退出登出吗?',
                ok: () => {
                    localStorage.removeItem('token')
                    setTimeout(() => {
                        router.push('/login')
                    },500)
                }
            })
        }
        
        return {
            logout
        }
    }

}
</script>

<style lang="scss" scoped>
   .tab {
       width: 100%;
       height: 50px;
       display: flex;
       justify-content: space-around;
       align-items: center;
       border: 1px solid #f2f2f2;
       border-radius: 4px;
       box-shadow: 0 0px 2px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
       margin-bottom: 10px;
       background: #fff;
       a {
           color: #ccc; 
       }
       .iconfont{
         font-size: 22px;
       }
       .router-link-active, .router-link-exact-active {
          color: #333 !important
       }
       .logout {
           cursor: pointer;
       }
   }
</style>