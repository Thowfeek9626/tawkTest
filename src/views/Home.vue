<template>
    <div>
      <Search @searchEvent="onCategorySearch"/>
      <div class="outer__container">
            <div class="category__grid">
                <div v-for="(category,index) in computedCategories" :key="index">
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
  
      },
      methods: {
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
  .outer__container{
      position: relative;
      height: 620px;
      width:100%;
      background-color: #FAFAFA;
      @include flex-center;
      overflow-y:hidden ;
  
      .category__grid{
          @include category__grid (60px,147px,985px,20px);
          
          .category__router{
            all: unset;
            height: 100% !important;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: white;
            cursor: pointer;
  
            &:hover{
              background-color:#cdcccc
            }
          }
      }
  }
  
  </style>