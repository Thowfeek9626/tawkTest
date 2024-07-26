<template>
    <!-- <div class="position">
      <input class="input" placeholder="Search for answers"/>
      <button class="btn"><i class="fa fa-fw fa-search fa-lg" aria-hidden="true"></i></button>
      <div> -->
          <div class="form-container">
              <span v-if="query.length > 0">
                  <i class="fa fa-times fa-xs clearInput" aria-hidden="true" @click="clearQuery()"></i>
              </span>
              <form class="form" style="max-width:100%">
                  <input v-model="query" @input="debouncedSearch" type="text" placeholder="Search for answers" name="search2">
                  <button @click="handleSearch($event)">
                      <!-- <i class="fa fa-search fa-lg"></i> -->
                      <img src="../assets/icons/search.png" alt="CategoryImage" />
                  </button>
              </form>
          </div>
      <!-- </div>
    </div> -->
  </template>
  
  <script>
  import _ from 'lodash';
  export default {
  name:'Searchbar',
  data(){
          return{
              query:""
          }
      },
  created() {
      // Create a debounced version of the search method
      this.debouncedSearch = _.debounce(this.emitSearchEvent, 300);
    },
      methods:{
        handleSearch(e){
            console.log(e)
            e.target.preventDefault
            this.debouncedSearch()
        },
          emitSearchEvent(){
              console.log('eventEmitted',this.query,"-------------")
              this.$emit("searchEvent",this.query)
          },
          clearQuery(){
              this.query=''
              this.emitSearchEvent()
          }
      }
  }
  </script>
  
  <style lang="scss" scoped>
  @import '../scss/_variables.scss';
  
  .form-container{
      @include searchbar__container(25%,750px);
      .clearInput{
          @include clear__input(112px,27px)
      }
      input[type=text] {
          border: 1px solid #EEEEEE;
          float: left;
          width: 640px;
          background: white;
          height: 58.4px;
          margin: 0;
          padding: 0 0 0 22px;
          font-family: $font-family;
          font-size: 16px;
          line-height: 19.2px;
          color: #9C9AA6;
      }
      button {
        float: left;
        width: 80px;
      //   padding: 10px;
      height: 60px;
        background: #03A84E;
        color: white;
        font-size: 17px;
        border: 1px solid #EEEEEE;
        border-left: none;
        cursor: pointer;
        &:hover {
          background: #039444;
        }
      }
  }
  
  .form::after {
    content: "";
    clear: both;
    display: table;
  }
  @media (max-width: 1368px){
      .form-container{
          margin-left: 21.875vw !important;
      }
  }
  </style>