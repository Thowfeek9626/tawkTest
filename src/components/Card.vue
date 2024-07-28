<template>
    <div class="innerCard">
        <img :src="iconPath" alt="Category-Image" class="card-icon"/>
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
},
computed:{
    iconPath() {
      return require(`../assets/icons/${this.cardData.icon}.svg`);
    }
}
}
</script>

<style lang="scss" scoped>
 @import '../scss/_variables.scss';
 @include inner__card();
</style>


