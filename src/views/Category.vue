<template>
    <div class="container">
      <Search/>
      <div class="outer__container">
          <div class="bread__crumbs">
            <router-link to="/" class="remove__default">
              <span class="all__categories">All Categories</span>
            </router-link>
            <span>
              <i class="arrow right"></i>
            </span>
            <span class="selectedCategory">{{ selectedCategory.title }}</span>
          </div>
          <div class="category__details" v-if="selectedCategory">
            <i class="fa category__icon fa-3x fa-play" aria-hidden="true"></i>
            <div class="category__title">
              <h3 class="title__text">{{selectedCategory.title}}</h3>
              <p class="updated__time">Updated 2 weeks ago</p>
            </div>
            <div class="divider"></div>
            <i class="fas fa-info-circle info__icon fa-lg"></i>
            <p class="category__description">
              De quibus cupio scire quid sentias. Quid, de quo nulla dissensio est Illum mallem levares sentias nulla dissensio.
            </p>
          </div>
          <div class="article__list">
            <div v-for="(article,i) in articles" :key="i">
              <Article :article="article" />
            </div>
          </div>
        </div>
        <div class="other__categories">
          <h3 class="other__categories__title">
            Other Categories
          </h3>
          <div class="categories__carousal">
            <div class="prev__category" @click="backwardCarousal()">
              <i class="arrow left"></i>
            </div>
            <div class="category__grid">
              <div v-for="(category) in filteredCategory" :key="category.id">
                <div  @click="selectCategory(category)" class="card">
                  <Card :cardData="category"/>
                </div>
              </div>
            </div>
            <div class="next__category" @click="forwardCarousal()">
              <i class="arrow right"></i>
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
    // props:{
    //   id:{
    //     type:String,
    //     required:true
    //   }
    // },
    data(){
      return{
        id: this.$route.params.id.split(':').join(''),
        articles:[],
        categories:[],
        selectedCategory:{},
        displayedCategories:[]
      }
    },
  mounted(){
    console.log(this.id,"id")
    this.getArticles(this.id)
    this.getCategories()
  },
  methods:{
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
      if(this.categories){
      console.log(this.filteredCategory)
    }
      this.selectedCategory = this.categories.find((category)=>category.id === this.id)
    },
    async getArticles(id){
      let res = await Axios.get(`http://localhost:9000/api/category/${id}`)
      this.articles = res.data.filter((article)=>{
        console.log(article.status,"article.status")
  
        return article.status === 'published'
      })
      console.log(this.articles,"this.article")
    }
  },
  computed:{
    filteredCategory(){
      return this.categories.slice(0,3)
    }
  }
  }
  </script>
  
  <style lang="scss" scoped>
        @import '../scss/_variables.scss';
  .container{
    overflow-x:hidden !important ;
    .outer__container{
    @include outer__container;
    overflow-x: hidden !important;
      .bread__crumbs{
        display: flex;
        justify-content: flex-start;
        gap: 9px;
        align-items: center;
        height: 22px;
        width: 268px;
        position: absolute;
        top: 21px;
        left: 9.375vw;
        @include custom__arrow(#9C9AA6,3px,1px)
        .remove__default{
          all: unset;
          cursor: pointer;
          .all__categories{
            font-family: $font-family;
            font-size: 13px;
            line-height: 22px;
            color: #03A84E;
          }
        }
        .selectedCategory{
          font-family: $font-family;
          font-size: 13px;
          line-height: 22px;
          color: #9C9AA6;
        }
      }
      .category__details{
        border-radius: 5px;
        background-color: white;
        width: 280px;
        height: 345.82px;
        position: absolute;
        top: 64.94px;
        left: 9.375vw;
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
          position: absolute;
          top: 64.94px;
          left: 35.9375vw;
          height: 517.39px;
          overflow-y: scroll;
          overflow-x: hidden;
          width: 642px;
        }
        .article__list::-webkit-scrollbar {
            width: 0px !important;
          }
      }
      .other__categories{
        padding-bottom: 60px;
      background-color: #FAFAFA;
        height: 319px;
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
        }
        .categories__carousal{
          height: 220px;
          width: 100%;
          display: flex;
            align-items: center;
            justify-content: space-evenly;
  
          .category__grid{
            height: 220px;
            width: 995px;
            display: grid;
            grid-template-columns: repeat(3,1fr);
            gap: 36px;
  
            .card {
              @include flex-center;
              width: 100%;
              height: 100%;
              background-color: #fff;
              border-radius: 5px;
              border: 1px solid #EEEEEE;
              cursor: pointer;
              &:hover{
                background-color: #EEEEEE;
              }
              
            }
          }
          .prev__category{
            padding-left: 6px;
          }
          .next__category{
            padding-right: 6px;
          }
          // .prev__category,.next__category
          .prev__category,.next__category{
            cursor: pointer;
            height: 63px;
            width: 63px !important;
            border-radius: 50%;
            @include flex-center;
            // border: 1px solid #9C9AA6;
            width: 100%;
            font-size: xx-large;
            background-color: white;
            @include custom__arrow(#9b99a5,6px,3px)
            &:hover{
              @include custom__arrow(#03a84e,6px,3px)
              background-color: #e5f4e4;
            }
          }
        }
      }
  }
  </style>