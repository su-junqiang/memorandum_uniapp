<template>
	<view>
		<cmd-nav-bar back title="信息设置"></cmd-nav-bar>
		<cmd-page-body type="top">
			<cmd-transition name="fade-up">
				<view>
					<cmd-cel-item title="头像" slot-right arrow>
						<cmd-avatar v-bind:src='icon'></cmd-avatar>
					</cmd-cel-item>
					<!-- <cmd-cel-item title="积分" addon="566" arrow></cmd-cel-item> -->
					<cmd-cel-item title="昵称" v-bind:addon='nickName' arrow></cmd-cel-item>
					<!-- <cmd-cel-item title="姓名" addon="Lich" arrow></cmd-cel-item> -->
					<cmd-cel-item title="联系方式" v-bind:addon='phone' disabled></cmd-cel-item>
					<!-- <cmd-cel-item title="证件号码" addon="450112xxxxxxxx2017" arrow></cmd-cel-item> -->
					<cmd-cel-item title="我的地址" v-bind:addon='location' arrow></cmd-cel-item>
					<cmd-cel-item title="阅读密码" show-switch @switch="fnClick" switch-color="#707070" />
					<cmd-cel-item title="修改密码" @click="fnClick('modify')" arrow></cmd-cel-item>


					<button class="btn-logout" type="warn" @click="fnClick('login')">退出登录</button>
				</view>
			</cmd-transition>
		</cmd-page-body>
	</view>
</template>

<script>
	import cmdNavBar from "@/components/cmd-nav-bar/cmd-nav-bar.vue"
	import cmdPageBody from "@/components/cmd-page-body/cmd-page-body.vue"
	import cmdTransition from "@/components/cmd-transition/cmd-transition.vue"
	import cmdCelItem from "@/components/cmd-cell-item/cmd-cell-item.vue"
	import cmdAvatar from "@/components/cmd-avatar/cmd-avatar.vue"
	//import lotusAddress from "../../components/Winglau14-lotusAddress/Winglau14-lotusAddress.vue";
	export default {
		components: {
			cmdNavBar,
			cmdPageBody,
			cmdTransition,
			cmdCelItem,
			cmdAvatar,
			//		lotusAddress
		},

		data() {
			return {
				icon: '',
				nickName: '',
				phone: '',
				location: ''
			};
		},
		onShow() {
			this.$forceUpdate();
			let info = uni.getStorageSync("detail")
			console.log(info)
			this.icon = info.icon;
			this.nickName = info.nickName;
			var phone = info.phone;
			phone = this.transformStr(phone, 4, 8, '*****');
			this.phone = phone
			if (info.location != null) {
				this.location = info.location;
			}
		},

		methods: {

			transformStr(oldStr, start, end, replaceStr) {
				return oldStr.substring(0, start - 1) + replaceStr + oldStr.substring(end, oldStr.length);
			},
			fnClick(type) {
				if (type == 'modify') {
					uni.navigateTo({
						url: '/pages/user/modify/modify'
					})
				} else if (type == 'login') {
					try {

						uni.clearStorageSync();

					} catch (e) {

						console.log(e)
					} finally {
						uni.navigateTo({
							url: '/pages/login/login'
						})
					}

				}
			}
		}
	}
</script>

<style>
	.btn-logout {
		margin-top: 400upx;
		width: 80%;
		border-radius: 50upx;
		font-size: 16px;
	}
</style>
