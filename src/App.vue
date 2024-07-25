<template>
	<div>
		<i class="fa fa-2x fa-home"></i>
		<!-- <v-icon x-large>home</v-icon>
		<img width="190px" src="./assets/fonts/search (1).png"/> -->

		<!-- <tawk-header></tawk-header> -->
		<router-view/>
	</div>
</template>

<script>
import Header from './components/Header.vue'
import Search from './components/Search.vue';
import Home from './views/Home.vue';

export default {
	components:{
		'tawk-header': Header,
		Search,
		Home
	}
}
</script>

<style lang="scss" scoped>
	@import 'scss/main.scss';
</style>
<style  lang="scss">
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #888; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555; 
}
</style>