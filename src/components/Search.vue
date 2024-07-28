<template>
          <div class="form-container">
              <span v-if="query.length > 0">
                  <i class="fa fa-times fa-xs clearInput" aria-hidden="true" @click="clearQuery()"></i>
              </span>
              <form class="form" style="max-width:100%">
                  <input v-model="query" @input="debouncedSearch" type="text" placeholder="Search for answers" name="search">
                  <button @click="handleSearch($event)">
                      <img src="../assets/icons/search.png" alt="CategoryImage" />
                  </button>
              </form>
          </div>
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
        e.target.preventDefault
        this.debouncedSearch()
    },
    emitSearchEvent(){
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
    margin: 0 0 74px 0;
    max-width: 750px !important;
    width: 58.59vw; 
    height: 60px;
    position: relative;

    .clearInput{
@include clear__input();
    }
    
    input[type=text] {
      &::-ms-clear {
            display: none; // to remove the default clear button in IE10
            }
      border: 1px solid #EEEEEE;
      float: left;
      max-width: 640px !important;
      width: 47vw;
      background: white;
      height: 58.4px;
      margin: 0;
      padding-left: 1vw;
      font-family: $font-family;
      font-size: 16px;
      line-height: 19.2px;
      color: #9C9AA6;
      &::placeholder{
        padding-left: 22px;
      }
    }

    button {
      float: left;
      max-width: 80px !important;
      padding: 0;
      width: 6.8vw;
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

  @media screen and (max-width:663px) {
    button{
        width: 36px !important;
    }
    input{
        width:286px !important;
    }
    .form-container{
        width: 336px !important;
    }
  }
  </style>