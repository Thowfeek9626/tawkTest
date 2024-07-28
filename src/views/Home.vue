<template>
    <div style="overflow-y: hidden !important;" class="home__page">
      <Search @searchEvent="onCategorySearch"/>
      <div class="outer__container">
            <div class="category__grid">
                <div v-for="(category,index) in computedCategories" :key="index" style="background-color: white !important;">
                    <router-link :to="`/categories/:${category.id}`" class="category__router">
                        <Card :cardData="category" @click="selectCategory(category)" class="gh"/>
                    </router-link>
                </div>
            </div>
      </div>
    </div>
  </template>
  
  <script>
  import Card from '../components/Card.vue';
  import Axios from 'axios';
  import Search from '../components/Search.vue';
    export default {
      name: 'home',
      components:{
          Card,
          Search
      },
      data() {
        return {
          categories:[],
          searchQuery:"",
          selectedCategory:{}
        }
      },
      created: async function() {
        await this.getData()
      },
      mounted(){
      this.adjustLayoutOnResize();
      window.addEventListener('resize', this.adjustLayoutOnResize);
      },
      beforeDestroy() {
        window.removeEventListener('resize', this.adjustLayoutOnResize);
      },
      methods: {
        adjustLayoutOnResize() {
          const element = document.querySelector(".category__grid")
          const width = element.clientWidth
          const positionLeft = (window.innerWidth - width)/2
          element.style.position = 'absolute'
          element.style.left = `${positionLeft}px`
        },
          onCategorySearch($event){
              this.searchQuery = $event
          },
          async getData(){
              let res = await Axios.get("http://localhost:9000/api/categories")
              this.categories = res.data.filter((category)=>category.enabled)
          },
      },
      computed:{
        computedCategories(){
          let filteredCategory;
          if(this.searchQuery && this.searchQuery.length > 0){
              filteredCategory = this.categories.filter((category)=>{
                  return category.title.toLowerCase().includes(this.searchQuery.toLowerCase())
              })
          }else{
            filteredCategory = this.categories
          }
          return filteredCategory.length > 0 ? filteredCategory.sort((a, b) => a.order - b.order) : [];
        }
      }
    }
    </script>
  
  <style lang="scss" scoped>
  @import '../scss/_variables.scss';
  .home__page{
    @include flex(center,center,column);
  }
  .outer__container {
    height: 620px;
    @include outer__container;
    @include flex(center,center);
    align-items: center;
    overflow:hidden ;
    .category__grid {
      @include category__grid (60px,11.52vw,76.95vw,985px,20px);
      .category__router {
        @include flex (center,center);
        @include remove_default_styles;
        @include category__card();
        &:hover{
          background-color:#cdcccc
        }
      }
    }
  }

  @media screen and (max-width:663px){
    .outer__container{
      height: 1512px !important;
      .category__grid{
        margin-right:0 !important;
        .category__router{
          width: 463px !important;
        }
      }
    }
  }
  @media (min-width: 663px) and (max-width:870px){
    .outer__container{
      height: 1512px !important;
      .category__grid{
        .category__router{
          width: 463px !important;
        }
      }
    }
  }

  @media (min-width: 870px) and (max-width:992px) {
    .outer__container{
      height: 820px !important;
    }
  }
  
  </style>