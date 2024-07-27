<template>
    <div style="overflow:hidden;" class="category__page">
      <Search/>
      <div class="spinner" v-if="isLoading"></div>
      <div class="outer__container" v-show="!isLoading">
        <div class="test" style="">
          <div class="alignIt" v-if="selectedCategory">
              <div class="bread__crumbs">
                <router-link to="/" class="all__categories">
                  <span class="">All Categories</span>
                </router-link>
                <span style="margin-right: 9px;">
                  <img src="../assets/icons/next.svg" alt="next" />
                </span>
                <span class="selectedCategory">{{ selectedCategory.title }}</span>
              </div>
              <div class="category__details" v-if="selectedCategory">
                <!-- <i class="fa  fa-3x fa-play" aria-hidden="true"></i> -->
                <img :src="iconPath" class="category__icon" alt="Category-Image" />
                <div class="category__title">
                  <h3 class="title__text">{{selectedCategory.title}}</h3>
                  <p class="updated__time">Updated 2 weeks ago</p>
                </div>
                <div class="divider"></div>
                <!-- <i class="fas fa-info-circle  fa-lg"></i> -->
                 <img src="../assets/icons/info.svg" class="info__icon" alt="info"/>
                <p class="category__description">
                  De quibus cupio scire quid sentias. Quid, de quo nulla dissensio est Illum mallem levares sentias nulla dissensio.
                </p>
              </div>
            </div>
            <div class="article__list">
              <div v-for="(article,i) in articles" :key="i">
                <Article :article="article" />
              </div>
            </div>
          </div>
        </div>
        <div class="other__categories" v-if="!isLoading">
          <h3 class="other__categories__title">
            Other Categories
          </h3>
          <div class="categories__carousal">
            <div class="prev__category" style="margin-right: 2.1vw;" @click="backwardCarousal()">
              <img src="../assets/icons/carousal_next.svg" alt="Left Arrow" class="rotate-svg" />
            </div>
            <div class="category__grid">
              <div v-for="(category) in filteredCategory" :key="category.id">
                <div  @click="selectCategory(category)" class="card">
                  <Card :cardData="category"/>
                </div>
              </div>
            </div>
            <div class="next__category" style="margin-left: 2.1vw;" @click="forwardCarousal()">
              <img src="../assets/icons/carousal_prev.svg" alt="Left Arrow" class="arrow" />
            </div>
          </div>
        </div>
    </div>
  </template>
  
  <script>
  import Search from '../components/Search.vue'
  import Article from '../components/Article.vue';
  import Card from '../components/Card.vue';
  import Axios from 'axios';
  export default {
    components: { Search,Article,Card },
    data(){
      return{
        isLoading:true,
        id: this.$route.params.id.split(':').join(''),
        articles:[],
        categories:[],
        selectedCategory:null,
        displayedCategories:[]
      }
    },
  //   created: async function() {
  //   console.log(this.id, "id");
  // },
  async mounted(){
    await this.getCategories();
    await this.getArticles(this.id);
      this.updateViewportWidth();
      window.addEventListener('resize', this.updateViewportWidth);
      this.isLoading = false 
      },
      beforeDestroy() {
    window.removeEventListener('resize', this.updateViewportWidth);
  },
  methods:{
    updateViewportWidth() {
      const element = document.querySelector(".test")
      if(element){
        const width = element.clientWidth || 980    //sets initial width of 980 px on mounted
        console.log(width,"jjjj")
        const positionLeft = (window.innerWidth - width)/3
        console.log(positionLeft,"positionLeft",width)
        element.style.setProperty('margin-left', `${positionLeft}px`, 'important');
      }
    },
    forwardCarousal(){
      this.categories.unshift(this.categories.pop())
    },
    backwardCarousal(){
      this.categories.push(this.categories.shift())
    },
    async selectCategory(category){
      this.selectedCategory = this.categories.find((item)=>item.id === category.id)
      console.log("clicked.......",this.selectedCategory,"this.selectedCategory")
      this.getArticles(category.id)
      this.scrollToTop()
    },
    scrollToTop() {
        const scrollDuration = 600; // Duration of the scroll in ms
        const scrollStep = -window.scrollY / (scrollDuration / 15);
        const scrollInterval = setInterval(() => {
          if (window.scrollY <= 0) {
            clearInterval(scrollInterval);
          }
          window.scrollBy(0, scrollStep);
        }, 15);
      },
    async getCategories(){
      let res = await Axios.get(`http://localhost:9000/api/categories`)
      this.categories = res.data.filter((category)=>category.enabled)
      this.selectedCategory = this.categories.find((category)=>category.id === this.id)
    },
    async getArticles(id){
      let res = await Axios.get(`http://localhost:9000/api/category/${id}`)
      this.articles = res.data.filter((article)=>{
        console.log(article.status,"article.status")
        return article.status === 'published'
      })
      let totalArticles = this.articles.length
      let element = document.querySelector(".outer__container")
      let articleList = document.querySelector(".article__list")
      let listLength = (totalArticles * 91.54) + ((totalArticles - 1) * 17.52)
      articleList.style.height = `${listLength}px`
      element.style.height = `${ listLength+ 64.94 + 62.67}px`
    }
  },
  computed:{
    filteredCategory(){
      return this.categories.slice(0,3)
    },
    iconPath() {
      if(this.selectedCategory){
        console.log(this.selectedCategory,"this.selectedCategory")
        return require(`../assets/icons/${this.selectedCategory.icon}.svg`);
      }
    }
  }
  }
  </script>
  
  <style lang="scss" scoped>
    @import '../scss/_variables.scss';
    .spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid #03A84E;
  border-radius: 50%;
  -webkit-animation: spin 1s linear infinite;
  -moz-animation: spin 1s linear infinite;
  -ms-animation: spin 1s linear infinite;
  animation: spin 1s linear infinite;
}

@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@-moz-keyframes spin {
  0% {
    -moz-transform: rotate(0deg);
  }
  100% {
    -moz-transform: rotate(360deg);
  }
}

@-ms-keyframes spin {
  0% {
    -ms-transform: rotate(0deg);
  }
  100% {
    -ms-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

    .category__page{
      @include flex(center,center,column);
    }
    .test{
      // display: flex !important;
      @include flex(center,start);

      // left: 9.375vw;
    }
    .rotate-svg {
      -ms-transform: rotate(180deg);
      -moz-transform: rotate(180deg);
      -webkit-transform: rotate(180deg);
      transform: rotate(180deg);
    }
    .outer__container{
      @include outer__container;
      @include flex(start,start,column);
      overflow: hidden !important;
      .alignIt{
        margin-top: 21px;
        @include flex(start,start,column);
        .bread__crumbs{
          @include flex(flex-start,center);
          height: 22px;
          width: 268px;
          margin-bottom: 21.94px;
          // position: absolute;
          // top: 21px;
          // left: 9.375vw;
        @include custom__arrow(#9C9AA6,3px,1px);
        .all__categories{
            @include remove_default_styles;
            cursor: pointer;
            font-family: $font-family;
            font-size: 13px;
            line-height: 22px;
            color: #03A84E;
            margin-right: 9px;
          }
    
        .selectedCategory{
          font-family: $font-family;
          font-size: 13px;
          line-height: 22px;
          color: #9C9AA6;
        }
      }
      .category__details{
        margin-right: 60px;
        border-radius: 5px;
        background-color: white;
        width: 280px;
        height: 345.82px;
        border: 1px solid #EEEEEE !important;
        .category__icon{
          height:54.72px !important;
          width: 43.89px !important;
          position: relative;
          top: 39.8px;
          left: 129px;
        }
        .category__title{
          width: 220px;
          height: 51.74px;
          position: relative;
          left: 30px;
          top: 63px;
          .title__text{
            margin: 0;
            font-family: $font-family;
            font-weight: 700px;
            font-size: 23px;
            line-height: 27.6px;
            text-align: center;
          }
          .updated__time{
            margin: 0;
            font-family: $font-family;
            font-weight: 400px;
            font-size: 11px;
            line-height: 22px;
            text-align: center;
            color: #9C9AA6;
          }
        }
        .divider{
          height: 1px;
          width: 100%;
          background-color: #EEEEEE;
          position: relative;
          top: 94.72px;
        }
        .info__icon{
          height: 20px;
          width: 19.9;
          position: relative;
          top: 115.61px;
          left: 130px;
        }
        .category__description{
          position: relative;
          top: 126.64px;
          left: 30px;
          width: 220px;
          height: 54px;
          overflow: hidden;
          font-size: 13px;
          line-height: 18px;
          font-family: $font-family;
          text-align: center;
          color: #9C9AA6;
        }
    }
      }
  .fa{
        color: #e5f4e4;
        -webkit-text-stroke-width: 2px;
        -webkit-text-stroke-color: #03a84e;
      }
      .fas{
        color: #ffffff;
        -webkit-text-stroke-width: 1.5px;
        -webkit-text-stroke-color: #03a84e;
      }
      .article__list{
        margin: 64.94px 0 0 0;
        padding: 0;
      // position: absolute;
      // top: 64.94px;
      // left: 35.9375vw;
      // height: 517.39px;
        overflow-y: hidden;
        overflow-x: hidden;
      width: 642px;
    }
    }
    .other__categories{
      padding-bottom: 60px;
      background-color: #FAFAFA;
      height: 321px;
      width: 100%;
      border-top: 1px solid #EEEEEE;
      .fa{
        color: #FAFAFA;
        -webkit-text-stroke-width: 2px;
        -webkit-text-stroke-color: #9C9AA6;
      }
      .other__categories__title{
      text-align: center;
        font-family: $font-family;
        font-weight: 400px;
        font-size: 20px;
        color: #9C9AA6;
        margin: 36px 0 27px 0;
      }
      .categories__carousal{
        position: relative;
        height: 220px;
        width: 100%;
        @include flex(center,center);
  
        .category__grid{
          @include carousal();
          .card {
            @include flex(center,center);
            width: 313px;
            height: 220px;
            background-color: #fff;
            border-radius: 5px;
            border: 1px solid #EEEEEE;
            cursor: pointer;
            &:hover{
              background-color: #EEEEEE;
            }
            
          }
        }
        .prev__category,.next__category{
          cursor: pointer;
          height: 63px;
          width: 63px;
          border-radius: 50%;
          @include flex(center,center);
          font-size: xx-large;
          background-color: white;
          &:hover{
            width: 61px;
            background-color: #e5f4e4;
            border: 1px solid #9C9AA6;
          }
        }
      }
    }
    @media screen and (max-width: 1169px) {
      .category__details{
        width: 280px !important;
      }
      .article__list{
        width: 50vw !important;
      }
    }
  </style>