<script>
import { userStore } from './store/user.js';
export default {
	onLaunch: function() {
		console.log('App Launch');
	},
	onShow: function() {
		console.log('App Show');
		userStore().getUserInfo();
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
/*每个页面公共css */
@import 'wxcomponents/vant/common/index.wxss';
page {
	background-color: #f2f2f2;
}
</style>
