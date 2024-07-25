<template>
	<div id="header-wrapper">
		<div id="header-text">
			<h1>Knowledge base doesn't have to be boring</h1>
			<h3>Everything you need to Manage your Messaging</h3>
		</div>
	</div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
	@import '../scss/_variables.scss';
	#header-wrapper{
		margin-top: 54px;
		margin-bottom: 0;
		#header-text{
			text-align: center;
			font-family: $font-family;
			color: $text-black;
			// padding: 20px;
	
			h1{
				font-style: normal;
				font-weight: bold;
				font-size: 34px;
				line-height: 41px;
				margin-bottom: 0;
			}
	
			h3{
				font-style: normal;
				font-weight: normal;
				font-size: 20px;
				line-height: 24px;
				margin-bottom: 37px;
				margin-top: 9px;
			}
		}
	}
</style>