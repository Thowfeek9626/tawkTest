<template>
    <div class="article__container">

      <div class="article__icon">
        <img src="../assets/icons/file-text.svg" alt="Article-Image" />
      </div>

      <div class="article__detail">
        <p class="article__title">
            {{ article.title }}
        </p>
        <div class="article__updated">Updated&nbsp;{{ formatDate(article.updatedOn) }}</div>
      </div>

      <div class="next__icon">
        <div class="next__category">
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
      @include position(absolute,35.82px,40px);
      width: 16px;
      height: 19.9px;
    }

    .article__detail{
      margin: 0;
      padding: 0;
      @include position(absolute,19.06px,80px);
      @include flex (center,flex-start,column);
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
      @include position(absolute,37.59px,591.22px);
      width: 16.79px;
      height: 8.44px;
    }

  }

  @media (min-width:868px) and (max-width: 1168px) {
    .article__container{
      width: 50vw !important;

      .article__icon{
        left: 6.36% !important;
      }

      .article__detail{
        left: 13.68% !important;
        .article__title{
          line-height: 20px;
        }
      }

      .next__icon{
        left: 92.36% !important;
      }
    }
  }

  @media (min-width:733px) and (max-width:868px) {
    .article__container{
      width: 50vw !important;

      .article__icon{
        left: 6.12% !important;
      }

      .article__detail{
        left: 16.63% !important;
        .article__title{
          font-size: 16px !important;
          font-weight: 312px;
          line-height: 18px;
        }
      }

      .next__icon{
        left: 92.36% !important;
      }
    }
  }
  
  </style>