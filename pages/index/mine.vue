<template>
	<view>
		<view class="person-head" @click="fnInfoWin">
			<cmd-avatar v-bind:src='icon' size="lg" :make="{'background-color': '#fff'}"></cmd-avatar>
			<view class="person-head-box">
				<view class="person-head-nickname" v-model="nickName">{{nickName}}</view>
				<view class="person-head-username" v-model="account">{{account}}</view>
			</view>
		</view>
		<view class="person-list">
			<cmd-cell-item title="我的设备" slot-left arrow>
				<cmd-icon type="bullet-list" size="24" color="#707070"></cmd-icon>
			</cmd-cell-item>
			<cmd-cell-item title="消息通知" slot-left arrow>
				<cmd-icon type="message" size="24" color="#707070"></cmd-icon>
			</cmd-cell-item>
			<cmd-cell-item title="系统设置" slot-left arrow>
				<cmd-icon type="settings" size="24" color="#707070"></cmd-icon>
			</cmd-cell-item>
			<cmd-cell-item title="检查版本" addon="v1.0" slot-left arrow>
				<cmd-icon type="alert-circle" size="24" color="#707070"></cmd-icon>
			</cmd-cell-item>
		</view>
	</view>
</template>

<script>
	import cmdAvatar from "@/components/cmd-avatar/cmd-avatar.vue"
	import cmdIcon from "@/components/cmd-icon/cmd-icon.vue"
	import cmdCellItem from "@/components/cmd-cell-item/cmd-cell-item.vue"

	export default {
		components: {
			cmdAvatar,
			cmdCellItem,
			cmdIcon
		},
		data() {
			return {
				icon: '',
				nickName: '',
				account: ''
			};
		},
		onLoad() {
			let info = uni.getStorageSync("detail")
			if(info==null){
                this.icon=null;
			}
		},
		onShow() {
			// this.reload()
			let info = uni.getStorageSync("detail")
			// console.log(info.account)
			if (info.account != undefined) {
				this.icon = info.icon;
				this.nickName = info.nickName;
				this.account = 'ID：' + info.account;
			} else {
				this.account = "登录 / 注册"
			}
		},
		methods: {
			/**
			 * 打开用户信息页
			 */
			fnInfoWin() {
				if (this.account === "登录 / 注册") {
					uni.navigateTo({
						url: '/pages/login/login'
					})
				} else {
					uni.navigateTo({
						url: '/pages/index/info'
					})
				}
			}
		}
	}
</script>

<style>
	.person-head {
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 200px;
		padding-left: 25px;
		background: linear-gradient(to right, #707070, #707070);
	}

	.person-head-box {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		margin-left: 25px;
	}

	.person-head-nickname {
		font-size: 20px;
		font-weight: 500;
		color: #fff;
	}

	.person-head-username {
		font-size: 14px;
		font-weight: 500;
		color: #fff;
	}

	.person-list {
		line-height: 0;
	}
</style>
