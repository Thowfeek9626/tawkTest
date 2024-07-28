<template>
    <div style="overflow:hidden;" class="category__page">
      <Search @searchEvent="onArticleSearch"/>
      <div class="spinner" v-if="isLoading"></div>
      <div class="outer__container" v-show="!isLoading">
        <div class="curr__category" style="">
          <div class="category__info" v-if="selectedCategory">
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
                <img :src="iconPath" class="category__icon" alt="Category-Image" />
                <div class="category__title">
                  <h3 class="title__text">{{selectedCategory.title}}</h3>
                  <p class="updated__time">Updated 2 weeks ago</p>
                </div>
                <div class="divider"></div>
                 <img src="../assets/icons/info.svg" class="info__icon" alt="info"/>
                <p class="category__description">
                  De quibus cupio scire quid sentias. Quid, de quo nulla dissensio est Illum mallem levares sentias nulla dissensio.
                </p>
              </div>
            </div>
            <div class="article__list">
              <div v-for="(article,i) in computedArticles" :key="i">
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
            <div class="prev__category" style="margin-right: 2.1vw;" @click="carousal('backward')">
              <img src="../assets/icons/carousal_next.svg" alt="Left Arrow" class="rotate-svg" />
            </div>
            <div class="displayed__categories">
              <div v-for="(category) in filteredCategory" :key="category.id">
                <div  @click="selectCategory(category)" class="card" ref="movableElement">
                  <Card :cardData="category" />
                </div>
              </div>
            </div>
            <div class="next__category" style="margin-left: 2.1vw;" @click="carousal('forward')">
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
        displayedCategories:[],
        filteredCategory:[],
        query: '',
        searchQuery:"",
      }
    },
    watch: {
      categories(newValue, oldValue) {
      this.adjustLayoutOnResize(); 
    }
  },
  async mounted(){
    await this.getCategories();
    await this.getArticles(this.id);
      this.adjustLayoutOnResize();
      window.addEventListener('resize', this.adjustLayoutOnResize);
      this.isLoading = false 
      },
      beforeDestroy() {
    window.removeEventListener('resize', this.adjustLayoutOnResize);
  },
  methods:{
    onArticleSearch($event){
        this.searchQuery = $event
    },
    adjustLayoutOnResize() {
      let curr__category = document.querySelector(".curr__category")
      let screenSize = window.innerWidth;
      let totalArticles = this.articles.length
      let outer__container = document.querySelector(".outer__container")
      let category__info = document.querySelector(".category__info")
      let articleList = document.querySelector(".article__list")
      let listLength = (totalArticles * 91.54) + ((totalArticles - 1) * 17.52) +127.61

      if(curr__category){
        let width = curr__category.clientWidth || 980    //sets initial width of 980 px on mounted
        let positionLeft = Math.abs((screenSize - width)/3)
        curr__category.style.setProperty('margin-left', `${positionLeft}px`, 'important');
      }

      if(screenSize < 733){
        this.filteredCategory = this.categories.slice(0,1)
      }else{
        this.filteredCategory = this.categories.slice(0,3)
      }

      if(category__info && articleList && outer__container){
        let offsetHeight = category__info.offsetHeight
        articleList.style.height = `${listLength}px`
        outer__container.style.height = screenSize>732 ? `${ listLength}px`:`${ listLength+offsetHeight}px`
      } 
    },
    carousal(direction){
      const element = document.querySelector(".card");
      if(element){
        element.style.transform = 'translateX(315px)';
        element.style.transition = 'transform 1s ease';
        setTimeout(()=>{
          element.style.transform = 'translateX(0)'
          if(direction === 'forward'){
            this.categories.unshift(this.categories.pop())
          }else{
            this.categories.push(this.categories.shift())
          }
        },500)
      }
    },
    async selectCategory(category){
      this.selectedCategory = this.categories.find((item)=>item.id === category.id)
      this.getArticles(category.id)
      window.scroll({ top: 0, behavior: 'smooth' });
    },
    async getCategories(){
      let res = await Axios.get(`http://localhost:9000/api/categories`)
      this.categories = res.data.filter((category)=>category.enabled)
      this.selectedCategory = this.categories.find((category)=>category.id === this.id)
    },
    async getArticles(id){
      let res = await Axios.get(`http://localhost:9000/api/category/${id}`)
      this.articles = res.data.filter((article)=>{
        return article.status === 'published'
      })
    }
  },
  computed:{
    computedArticles(){
      let filteredArticle;
        if(this.searchQuery && this.searchQuery.length > 0){
          filteredArticle = this.articles.filter((article)=>{
            return article.title.toLowerCase().includes(this.searchQuery.toLowerCase())
          })
        }else{
          filteredArticle = this.articles
        }
        return filteredArticle.length > 0 ? filteredArticle : [];
    },
    iconPath() {
      if(this.selectedCategory){
        return require(`../assets/icons/${this.selectedCategory.icon}.svg`);
      }
    }
  }
  }
  </script>
  
  <style lang="scss" scoped>
    @import '../scss/_variables.scss';

    @include spinner();

    .category__page{
      @include flex(center,center,column);
    }
    .curr__category{
      @include flex(center,start);
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
      .category__info{
        margin-top: 21px;
        @include flex(start,start,column);
        .bread__crumbs{
          @include flex(flex-start,center);
          height: 22px;
          width: 268px;
          margin-bottom: 21.94px;
        .all__categories{
            @include remove_default_styles;
            cursor: pointer;
            @include font (13px,22px);
            color: #03A84E;
            margin-right: 9px;
          }
    
        .selectedCategory{
          @include font(13px,22px);
          font-family: $font-family;
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
          @include position (relative,63px,30px);
          .title__text{
            margin: 0;
            @include font(23px,27.6px);
            font-weight: 700px;
            text-align: center;
          }
          .updated__time{
            margin: 0;
            @include font(11px,22px);
            font-weight: 400px;
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
          @include position(relative,115.61px,130px);
        }
        .category__description{
          @include position(relative,126.64px,30px);
          width: 220px;
          height: 54px;
          overflow: hidden;
          @include font(13px,18px);
          text-align: center;
          color: #9C9AA6;
        }
    }
      }
      .article__list{
        margin: 64.94px 0 0 0;
        padding: 0;
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
  
        .displayed__categories{
          @include carousal();
          .card {
            @include flex (center,center);
            @include category__card(22vw,14vw,12px);
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
    @media (min-width:733px) and (max-width: 868px) {
      .category__details{
        width: 280px !important;
      }
      .article__list{
        width: 51vw !important;
      }
      .prev__category,.next__category{
        width: 39px !important;
        height: 39px !important;
      }
      .other__categories{
        height: 27vw !important;
      }
    }
    @media (min-width:868px) and (max-width: 1168px) {
      .category__details{
        width: 280px !important;
      }
      .article__list{
        width: 51vw !important;
      }
      .prev__category,.next__category{
        width: 39px !important;
        height: 39px !important;
      }
      .other__categories{
        height: 27vw !important;
      }
      .prev__category{
        margin: 0 2.1vw 0 0 !important;
      }
      .next__category{
        margin: 0 0 0 2.1vw !important;
      }
    }
    @media screen and (max-width:732px) {
      .curr__category{
      @include flex(start,center,column);
      }
    }
    @media screen and (max-width:868px) {
      .next__category{
        margin: 0 2.1vw 0 0 !important;
      }
      .prev__category{
        margin: 0 0 0 2.1vw !important;
      }
    }
  </style>