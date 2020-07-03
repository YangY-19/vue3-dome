<template>
    <Tab/>
    {{count}}-
    <div @click="handleClick">+!</div>
    <div @click="stopClick">t</div>
</template>

<script>
import Tab from "../../components/tab";
import { setup, computed, ref, watch } from 'vue'
import { get } from '../../api/axios/request';
export default {
    components: {
        Tab
    },
    setup () {
        const count = ref(0)
       const handleClick = () => {
           count.value += 1
       }
        watch(count,() => {
            alert('1')
        })
        const stop = watch(() => {
            /* ... */
            })
        const stopClick = () => {
            alert('stop')
           stop()
         }
       return {
           handleClick,
           stopClick,
           count
       }
    }
    
}
</script>