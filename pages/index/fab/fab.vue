<template>
	<view>
	      <clxDialog :title='title' :isShow='show' @dialogConfirm='dialogConfirm' @dialogCancel='dialogCancel' >
			  <input style="background-color: #ECECEC;" class="dialogContent" placeholder='点击输入' type="text" @input="_input" v-model="dialogContent" />
		  </clxDialog>
		<uni-fab :pattern="pattern" :content="content" :horizontal="horizontal" :vertical="vertical" :direction="direction"
		 @trigger="trigger" ref="fab"></uni-fab>

	</view>
</template>

<script>
		import clxDialog from '@/components/clx-dialog/clx-dialog.vue';
import App from '../../../App.vue';
	import uniFab from '@/components/uni-fab/uni-fab.vue';
	export default {
		components: {
		clxDialog,
			uniFab
		},
		data() {
			return {
				directionStr: '水平',
				horizontal: 'right',
				vertical: 'bottom',
				direction: 'vertical',
				pattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#707070',
					buttonColor: '#707070'
				},
				content: [{
						iconPath: '../../static/icon/note.png',
						text: '新建笔记',
						active: false
					},
					{
						iconPath: '../../static/icon/file.png',
						text: '新建文件',
						active: false
					},
					// {
					// 	iconPath: '../../static/icon/sort.png',
					// 	text: '排序',
					// 	active: false
					// }
				],title: '输入文件名称',
				show: false,
				dialogContent:''
			};
		},
		methods: {
			clickShow() {
				this.show = true
			},
			dialogConfirm() {
				this.show = false
				const user = uni.getStorageSync('detail');
								uni.request({
									url: App.requestIp + `file/insertNewFile`,
									method: "POST",
									header: {
										token: uni.getStorageSync('token')
									},
									data:{
										 fileName: this.dialogContent,
										  fileUserAccount:user.account
									},
									success: (res) => {
										if (res.data.status === 200) {
											console.log(this.$route.path,"sssssssssssssssigiis")
											uni.showToast({
												title: '添加成功',
												icon: 'none'
											})
											this.dialogContent=''
											if(this.$route.path==='/pages/index/file'){
												location.reload()
											}else{this.$router.push({
												path:"/pages/index/file"
											})}
											
										} else {
											uni.showToast({
												title: '添加失败',
												icon: 'none'
											})
										}
									},
									fail: (rej) => {
										uni.showToast({
											title: '操作失败',
											icon: 'none'
										})
										console.log(rej.data)
									}
								})
			},
			dialogCancel() {
				this.show = false
			},
			trigger(e) {
				console.log(e);
				if (e.index == 0) {
					setTimeout(() => {
						uni.navigateTo({
							url: '/pages/index/newNote'
						})
					}, 100)
				} else {
					this.clickShow()
				}
			},


		}
	}
</script>

<style>
.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
