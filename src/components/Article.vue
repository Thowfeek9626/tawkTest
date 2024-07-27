<template>
    <div class="article__container">
      <div class="article__icon">
          <!-- <i class="fas fa-lg fa-file-alt"></i> -->
        <img src="../assets/icons/file-text.svg" alt="Article-Image" />

          <!-- <i class="fa fa-file-text-o" aria-hidden="true"></i> -->
      </div>
      <div class="article__detail">
          <p class="article__title">
              {{ article.title }}
          </p>
  
          <div class="article__updated">Updated&nbsp;{{ formatDate(article.updatedOn) }}</div>
        </div>
        <div class="next__icon">
          <!-- <i class="fas fa fa-angle-right fa-lg"></i> -->
          <div class="next__category">
              <!-- <i class="arrow right"></i> -->
        <img src="../assets//icons/next_green.svg" alt="Next" />

            </div>
        </div>
      </div>
  </template>
  
  <script>
  export default {
  props:{
      article:{
          type : Object,
          required:true
      }
  },
  methods:{
      formatDate(str){
          const options = { year: 'numeric', month: 'short', day: '2-digit' };
          return new Date(str).toLocaleDateString('en-US', options)
      }
  }
  }
  </script>
  
  <style lang="scss" scoped>
        @import '../scss/_variables.scss';
      .article__container{
          width: 640px;
          height: 89.54px;
          border: 1px solid #EEEEEE;
          margin-bottom: 17.52px;
          position: relative;
          background-color: #ffffff;
          border-radius: 5px;
          .article__icon{
              position: absolute;
              top: 35.82px;
              left: 40px;
              width: 16px;
              height: 19.9px;
          }
        .fas{
          @include stroke__width__article();
        }
        .article__detail{
          margin: 0;
          padding: 0;
          position: absolute;
          top: 19.06px !important;
          left: 80px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          height: 50px;
  
          .article__title{
          height: 24px;
          width: 450px;
          font-family: $font-family;
          font-size: 20px;
          font-weight: 400px;
          line-height: 24px;
          margin: 0;
        }
        .article__updated{
          margin-top: 4px;
          height: 22px;
          width: 108px;
          font-size: 11px;
          line-height: 22px;
          color: #9C9AA6;
        }
      }
      .next__icon{
          position: absolute;
          left: 591.22px;
          top: 37.59px;
          width: 16.79px;
          height: 8.44px;
      }
  
      }
  
  </style>