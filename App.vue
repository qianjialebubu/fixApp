<script>
	import Vue from 'vue';
	export default {
		created() {
		  this.$bus = new Vue();
	    },
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		onPageNotFound() {
			uni.navigateTo({
				url:'/pages/404/404'
			})
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
