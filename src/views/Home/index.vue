<template>
  <div class="home">
    <Tab></Tab>
    <div class="slideShow">
      <div class="swiper-container slideShow-swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="item in bannerData" :key="item.id">
          <img :src="item.image" alt="" />
        </div>
        </div>
        <div class="swiper-pagination slideShow-swiper-pagination"></div>
      </div>
    </div>

    <div class="article-list">
      <h2>热门文章</h2>

      <div class="article-box">
        <div class="swiper-container article-swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <div class="article-item" v-for="item in articleData" :key="item.id">
                <div>
                  <div class="title">{{ item.title }}</div>
                  <div class="content">{{ item.content }}</div>
                </div>
                <img :src="item.image" alt="" />
              </div>
            </div>
          </div>
          <div class="swiper-scrollbar article-swiper-scrollbar"></div>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
import { setup, watch, reactive, toRefs, onMounted, ref, isRef, computed } from "vue";
import { getSlideshow } from "../../api/service/home";
import Tab from "../../components/tab";
import Swiper from "swiper";
import "swiper/css/swiper.css";

function init_swpier() {
  new Swiper(".slideShow-swiper-container", {
    pagination: {
      el: ".slideShow-swiper-pagination",
      type: "progressbar"
    },
  });

  new Swiper(".article-swiper-container", {
    direction: "vertical",
    slidesPerView: "auto",
    freeMode: true,
    scrollbar: {
      el: ".article-swiper-scrollbar"
    },
    mousewheel: true,
  });
}
export default {
  name: "Home",
  components: {
    Tab
  },
  setup() {
    const state = reactive({
      bannerData: [
        {
          id: "1",
          image:
            "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/a44503bf30775c743866551c813d4569.jpg?thumb=1&w=1533&h=575&f=webp&q=90"
        },
        {
          id: "1",
          image:
            "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/1eafff325f0e96d5c58929487f82f21d.jpg?thumb=1&w=1533&h=575&f=webp&q=90"
        },
        {
          id: "1",
          image:
            "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/12a95d14eec558d7ebd585b1b3b725b0.jpg?thumb=1&w=1533&h=575&f=webp&q=90"
        },
        {
          id: "1",
          image:
            "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/1eafff325f0e96d5c58929487f82f21d.jpg?thumb=1&w=1533&h=575&f=webp&q=90"
        }
      ],
      articleData: []
    });
    const abc = ref(0)
    
    onMounted(async () => {
      const { code, data } = await getSlideshow();
      if (code === 10000) {
        state.bannerData = data;
      }
    });

    setTimeout(() => {
      abc.value = 2
      state.articleData = [
        {
          id: "1",
          title: "为京东PLUS会员保驾护航的日子",
          content:
            "京东 PLUS 会员，是京东为向核心客户提供更优质的购物体验推出的服务，在庚子年间，历经半载，茁壮成长：几大频道页轮番改版换新颜",
          image:
            "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/a44503bf30775c743866551c813d4569.jpg?thumb=1&w=1533&h=575&f=webp&q=90"
        },
        {
          id: "1",
          title: "为京东PLUS会员保驾护航的日子",
          content:
            "京东 PLUS 会员，是京东为向核心客户提供更优质的购物体验推出的服务，在庚子年间，历经半载，茁壮成长：几大频道页轮番改版换新颜",
          image:
            "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/a44503bf30775c743866551c813d4569.jpg?thumb=1&w=1533&h=575&f=webp&q=90"
        },
        {
          id: "1",
          title: "为京东PLUS会员保驾护航的日子",
          content:
            "京东 PLUS 会员，是京东为向核心客户提供更优质的购物体验推出的服务，在庚子年间，历经半载，茁壮成长：几大频道页轮番改版换新颜",
          image:
            "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/a44503bf30775c743866551c813d4569.jpg?thumb=1&w=1533&h=575&f=webp&q=90"
        },
        {
          id: "1",
          title: "为京东PLUS会员保驾护航的日子",
          content:
            "京东 PLUS 会员，是京东为向核心客户提供更优质的购物体验推出的服务，在庚子年间，历经半载，茁壮成长：几大频道页轮番改版换新颜",
          image:
            "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/a44503bf30775c743866551c813d4569.jpg?thumb=1&w=1533&h=575&f=webp&q=90"
        },
        {
          id: "1",
          title: "为京东PLUS会员保驾护航的日子",
          content:
            "京东 PLUS 会员，是京东为向核心客户提供更优质的购物体验推出的服务，在庚子年间，历经半载，茁壮成长：几大频道页轮番改版换新颜",
          image:
            "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/a44503bf30775c743866551c813d4569.jpg?thumb=1&w=1533&h=575&f=webp&q=90"
        },
        {
          id: "1",
          title: "为京东PLUS会员保驾护航的日子",
          content:
            "京东 PLUS 会员，是京东为向核心客户提供更优质的购物体验推出的服务，在庚子年间，历经半载，茁壮成长：几大频道页轮番改版换新颜",
          image:
            "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/a44503bf30775c743866551c813d4569.jpg?thumb=1&w=1533&h=575&f=webp&q=90"
        },
        {
          id: "1",
          title: "为京东PLUS会员保驾护航的日子",
          content:
            "京东 PLUS 会员，是京东为向核心客户提供更优质的购物体验推出的服务，在庚子年间，历经半载，茁壮成长：几大频道页轮番改版换新颜",
          image:
            "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/a44503bf30775c743866551c813d4569.jpg?thumb=1&w=1533&h=575&f=webp&q=90"
        }
      ];
    }, 2000);
    // watch(
    //  () => abc.value,
    //  () => {
    //   alert('1')
    // })


    watch(
      () => state.bannerData,
      () => {
        init_swpier();
      }
    );

    const handleClick =  (type) => {
      
    };

    return {
      ...toRefs(state),
      handleClick,
      abc,
    };
  }
};
</script>
<style lang="scss" scoped>
.slideShow{
  .swiper-container {
    width: 100%;
    height: 200px;
    border: 3px #e9e9e9 solid;
    border-radius: 4px;
    box-shadow: 0 0px 2px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    box-sizing: border-box;
    .swiper-pagination {
      --swiper-theme-color: #a9caed;
    }
    .swiper-slide {
      text-align: center;
      font-size: 18px;
      background: #fff;
  
      /* Center slide text vertically */
      display: -webkit-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      -webkit-justify-content: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      -webkit-align-items: center;
      align-items: center;
    }
    img {
      width: 100%;
      height: 200px;
      border-radius: 4px;
    }
  }
}

.article-list {
  width: 100%;
  max-height: 600px;
  margin-top: 10px;
  padding-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  background: #fff;
  h2 {
    display: inline-block;
    line-height: 40px;
    color: rgb(78, 78, 78);
    border-bottom: 1px solid #c2bdbd;
  }
  .swiper-slide, .swiper-slide-active {
    padding: 0px !important;
  }
  .article-item {
    width: 90%;
    background: #f9f9f9;
    border-radius: 6px;
    margin: 10px auto;
    display: flex;
    padding: 10px;
    .title {
      width: 250px;
      color: #333;
      font-size: 18px;
      font-weight: 700;
      text-align: left;
      line-height: 36px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      word-break: break-all;
    }
    .content {
      font-size: 14px;
      line-height: 22px;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
      text-align: left;
      color: rgb(148, 148, 148);
    }
    & > div {
      width: 400px;
      margin-right: 10px;
    }
    & > img {
      width: 100px;
      height: 85px;
    }
  }
}

.article-box{
    .swiper-container {
      width: 100%;
      height: 500px;
    }
    .swiper-slide {
      font-size: 18px;
      height: auto;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      padding: 30px;
    }
    .swiper-wrapper {
      transition: all 1s;
    }
}
</style>
