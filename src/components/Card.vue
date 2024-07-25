<template>
    <div class="innerCard">
            <i :class="`fa card-icon fa-3x fa-${cardData.icon}`" aria-hidden="true"></i> <!-- Replace with actual icon or image -->
        <h3 class="title">{{ cardData.title }}</h3>
        <p class="article__count">{{ cardData.totalArticle }}{{ cardData.totalArticle === 1 ?' article':' articles' }}</p>
        <p class="last__update">{{ formatDate(cardData.updatedOn) }}&nbsp;days ago</p>
    </div>
</template>

<script>
export default {
name: 'Card',
props: {
  cardData: {
    type: Object,
    required: true
  }
},
methods:{
    formatDate(dateStr){
        const diffInMs = new Date() - new Date(dateStr);
        const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
        return Math.floor(diffInDays)   
    }
}
}
</script>

<style lang="scss" scoped>
@import '../scss/_variables.scss';
.innerCard{
 height: 149px;
 width: 250px;
 text-align: center;

 .card-icon {
      background-color: transparent;
      color: #e5f4e4;
  }
  .title{
      font-family: $font-family;
      font-size: 20px;
      line-height: 24px;
      margin: 20px 0 21px 0;
  }
  .article__count {
      font-size: 13px;
      font-family: $font-family;
      line-height: 15.6px;
      color: #03A84E;
      margin: 0;
  }
  .last__update {
      font-size: 11px;
      font-family: $font-family;
      line-height: 13.2px;
      margin: 0;
      color: #9C9AA6;
  }
}

.fa{
color: #e5f4e4;
-webkit-text-stroke-width: 2px;
-webkit-text-stroke-color: #03a84e;
}

</style>
