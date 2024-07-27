<template>
    <div style="overflow-y: hidden !important;" class="home__page">
      <Search @searchEvent="onCategorySearch"/>
      <div class="outer__container">
            <div class="category__grid">
                <div v-for="(category,index) in computedCategories" :key="index" style="background-color: white !important;">
                    <router-link :to="`/categories/:${category.id}`" class="category__router">
                        <Card :cardData="category" @click="selectCategory(category)"/>
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
          query: '',
          searchQuery:"",
          selectedCategory:{}
        }
      },
      created: async function() {
        await this.getData()
      },
      mounted(){
      this.updateViewportWidth();
      window.addEventListener('resize', this.updateViewportWidth);
      },
      beforeDestroy() {
    window.removeEventListener('resize', this.updateViewportWidth);
  },
      methods: {
        updateViewportWidth() {
          console.log("111111111111111")
          const element = document.querySelector(".category__grid")
          const width = element.clientWidth
          const positionLeft = (window.innerWidth - width)/2
          console.log(positionLeft,"positionLeft")
          element.style.position = 'absolute'
          element.style.left = `${positionLeft}px`
    },
          onCategorySearch($event){
              this.searchQuery = $event
              console.log($event,"event Emitted")
          },
          async getData(){
              let res = await Axios.get("http://localhost:9000/api/categories")
              this.categories = res.data.filter((category)=>category.enabled)
              console.log(this.categories,"cat")
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
        border: 1px solid #EEEEEE;
        @include remove_default_styles;
        height: 220px !important;
        width: 313px;
        @include flex(center,center);
        background: white;
        cursor: pointer;
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

  // @media screen and (min-width:992px) {
    
  // }
  
  </style>