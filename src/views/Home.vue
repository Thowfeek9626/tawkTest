<template>
    <div style="overflow-y: hidden !important;">
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
      async mounted(){
      await this.getData()
      this.updateViewportWidth();
      window.addEventListener('resize', this.updateViewportWidth);
      },
      beforeDestroy() {
    window.removeEventListener('resize', this.updateViewportWidth);
  },
      methods: {
        updateViewportWidth() {
          const element = document.querySelector(".category__grid")
          const width = element.clientWidth
          const positionLeft = (window.innerWidth - width)/2
          console.log(positionLeft,"positionLeft")
          element.style.position = 'absolute'
          element.style.left = `${positionLeft}px`
          document.documentElement.style.setProperty('--position-left', `${positionLeft}px`);

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
              if(this.searchQuery && this.searchQuery.length > 0){
                  let filteredCategory = this.categories.filter((category)=>{
                      return category.title.toLowerCase().includes(this.searchQuery.toLowerCase())
                  })
                  return filteredCategory
              }
              return this.categories.length > 0 ? this.categories.sort((a, b) => a.order - b.order) : [];
          }
      }
    }
    </script>
  
  <style lang="scss" scoped>
  @import '../scss/_variables.scss';

  .outer__container {
    height: 620px;
    @include outer__container;
    @include flex__center;
    align-items: center;
    overflow:hidden ;
    .category__grid {
      @include category__grid (60px,11.52vw,985px,20px);
      .category__router {
        @include remove_default_styles;
        height: 100% !important;
        width: 100%;
        @include flex__center;
        background: white;
        cursor: pointer;
        &:hover{
          background-color:#cdcccc
        }
      }
    }
  }
  
  </style>