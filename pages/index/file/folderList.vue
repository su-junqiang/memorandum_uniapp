<template>
	<view class="container">
		<clxDialog :title='title' :isShow='show' @dialogConfirm='dialogConfirm' @dialogCancel='dialogCancel' >
					  <input style="background-color: #ECECEC;" class="dialogContent" placeholder='点击输入' type="text" @input="_input" v-model="dialogContent" />
		</clxDialog>
		<clxDialog title='如果删除将删除该文件夹下所有文件' :isShow='showCancle' @dialogConfirm='dialogConfirm1' @dialogCancel='dialogCancel' >
		</clxDialog>
		<view class="folder-list">
			<view class="a-folder" v-for="(item,index) in folderList" :key="index">
				<uni-swipe-action>
					<uni-swipe-action-item :options="options" @click="bindClick" @change="clickNote(item)"  >
				 <view class="left-text" :class="'active'" @tap="selectTap(item)">
					<view class="name-tel">
						{{item.fileName.length > 8 ? item.fileName.slice(0,8) + '......' :item.fileName}}
					</view>
					<view class="folder-box">
						{{item.fileCreateTime}}
					</view>
					<!-- <view class="right-edit" @click="selectTap(item.fileId)"></view> -->
				</view>
				</uni-swipe-action-item>
				</uni-swipe-action>
			</view>
		</view>
	</view>
</template>

<script>
	import clxDialog from '@/components/clx-dialog/clx-dialog.vue';
	import App from '../../../App.vue';
	import uniSwipeAction from "@/components/uni-swipe-action/uni-swipe-action.vue"
	import uniSwipeActionItem from '@/components/uni-swipe-action-item/uni-swipe-action-item.vue'
	export default {
		components: {
			clxDialog,
			uniSwipeAction,
			uniSwipeActionItem	},
		data() {
			return {
				showCancle:false,
				
				fileId:'',
				folderList: [],
				options: [{
					text: '编辑',
					style: {
						backgroundColor: '#707070'
					}
				},{
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}],title: '输入文件名称',
				show: false,
				dialogContent:''
			}
		},
		created() {
			this.getData();
		},
		methods: {
			clickShow() {
				this.show = true
			},
			dialogConfirm1(){
				const user = uni.getStorageSync('detail');
				uni.request({
					url: App.requestIp + `file/deleteFileByAccount/${user.account}/${this.fileId}`,
					method:"DELETE",
					header: {
						token: uni.getStorageSync('token')
					},
					success: (res) => {
						if (res.data.status === 200) {
							uni.showToast({title:'删除成功',icon:'none'})
							this.folderList.splice(this.folderList.findIndex(item => item.fileId === this.fileId), 1)
							
						}else{
							uni.showToast({title:'删除失败',icon:'none'})
						}
					},
					fail: (rej) => {
						console.log(rej.data)
					}
				})	
				this.showCancle=false
			},
			dialogConfirm() {
				const user = uni.getStorageSync('detail');
				uni.request({
					url: App.requestIp + `file/fileRename`,
					method:"PUT",
					header: {
						token: uni.getStorageSync('token')
					},
					data:{
						fileId:this.fileId,
						fileNewName:this.dialogContent
					},
					success: (res) => {
						if (res.data.status === 200) {
							uni.showToast({title:'修改成功',icon:'none'})
							this.dialogContent=''
							location.reload()
						}else{
							uni.showToast({title:'修改失败',icon:'none'})
						}
					},
					fail: (rej) => {
						console.log(rej.data)
					}
				})	
				this.show = false
			},
			dialogCancel() {
				this.show = false
				this.showCancle=false
			},
			clickNote(item) {
				this.fileId = item.fileId
				this.dialogContent=item.fileName
			},
			bindClick(value) {
			
				console.log(value)
				if (value.index == 0) {
				    this.clickShow()
				} else {
			        this.showCancle=true;
				}
			},
		selectTap(item) {
				uni.navigateTo({
					url: '/pages/index/file/folder?fileId='+ item.fileId + '&fileName=' + item.fileName
				})
			},
			getData() {
			const user = uni.getStorageSync('detail');
			uni.request({
				url: App.requestIp + `file/selectAllFile/${user.account}/0/0`,
				method:"GET",
				header: {
					token: uni.getStorageSync('token')
				},
				success: (res) => {
					if (res.data.status === 200) {
						this.folderList = res.data.result
					}else{
						uni.showToast({title:'获取文件夹列表失败',icon:'none'})
					}
				},
				fail: (rej) => {
					console.log(rej.data)
				}
			})	
			}
		}
	}
</script>

<style>
	.container {
		background-color: #F2f2f2;
	}

	.folder-list {
		width: 100%;
		background-color: #fff;
		margin-top: 10upx;
		/* padding-bottom: 50upx; */
	}

	.folder-list .a-folder {
		width: 720upx;
		margin-left: 30upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10upx 0;
		border-bottom: 2upx solid #eee;
	}

	.a-folder .left-text {
		width: 510upx;
		box-sizing: border-box;
		padding-left: 100upx;
	}

	.a-folder .left-text.active {
		background: url(data:image/jpeg;base64,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) no-repeat left center;
		background-size: 80upx auto;
	}

	.a-folder .left-text .name-tel {
		margin-bottom: 20upx;
	}
    .a-folder .left-text .name-tel .time {
		display: inline;
		margin-left: 20upx;
    	color:#757575;
		font-size: 30upx;
    }
	.a-folder .left-text .folder-box {
		font-size: 24upx;
		color: #888888;
		line-height: 36upx;
	}

	.a-folder .left-text .right-edit {
		width: 109upx;
        /* margin-left: 60px; */
		height: 100%;
		margin-left: 50px;
		box-sizing: border-box;
		background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAASCAYAAACNdSR1AAAAAXNSR0IArs4c6QAAAMhJREFUKBWNksENwjAMRf2tTsESwAJdoMzAoWIBJA6IARAHRkAcmIGKexcAlugYMXGiRLRq2vxLUvl959cymvazN2IORPzYlMsTAKGE2IFCCxJzbNr3TUSQYIm1YyiKUD1lgHbyANXBBNC9Kte7YST3ZK4h5ssxRFgjzBl68Kwh/NT/OfYCAZUdXb6KITrW1Y9y9eplToN+5hGeAzWBg3NAB+eCChfP9nsmu0D6oUrthdbs6MxWL6opUOvM4KtN3hH4MrZpCgX9ALygoufgx5aQAAAAAElFTkSuQmCC) no-repeat 43upx center;
		background-size: 15upx auto;
	}
	
	.bottom-box {
		position: fixed;
		width: 100%;
		bottom: 0;
		font-size: 28upx;
		color: #000000;
		border-top: 1upx solid #eee;
		height: 100upx;
		line-height: 100upx;
		background: #fff url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAYCAYAAADzoH0MAAAAAXNSR0IArs4c6QAAAj1JREFUOBGVVE1LHEEQ7e4EkRBjiBL9AQqCQmB32d3xEMgxp6CCssEFFUMiBA+e9pKTgeBBBRGChEBCPAghISgiiEhu87Gzq/4Df4Yf292+Wulx2llXbRiq+1W9N9VVNcMYltaau2741fOqU3S+zxIUDOIKzAdIfXPdygRhd10ChCUQPxIBmQjO2XcIFu8sANox51wbAokA++H74VuDNbOcnAieRhnWLslRuORcjOfzqY0IabCpCxBOb1SK/cT2YSxOCsEKuVzmdwyztpEAob5fGdKabSCTllhUjTE+5jjpvzEs2loChLpu9TVjioJbTRQKe45nFJn8M5ixCQFyeF74CjXZRDEfR4EQEYKPZLPpLYORbShADt+vOlqrHVypnc600K0zNGwYmWxfIk0EKCAMw1StxnYh0mEIoJziGXKc1A5hN2ZgCEFw2C+l3Md1nhsM9gQ1eZPPZ3broxxzJLZayy6Qn1xzoNWijbCmAkFQfYmWUtGijmBPA1bEgP0hgfjQ0DlaQXAwKKWiYj0yIIqocOvJ+HQ2zKBcPswqJVGkeBvpe+HvQP5lBMkmiuh5lTTwPaT+1ATSx4aizeRy6TWDGWtlgN6/ABFtuyJTIMizjcjkiwTK5aMBDM4esGfkMAvTNwfyqjlft3UBDEyflOdIm3XaAaIE8rKN2acHnnfQq5T+D3K37RKfMG1fbCx5ErhvD2DrzbjzPMifk+FJpN4FFK8AoXU8Aj+QBXwspWToLQh+Ju/xV1q8JSzhvgCBx9kzUoIj2gAAAABJRU5ErkJggg==) no-repeat 705upx center;
		background-size: 15upx auto;
	}

	.bottom-box .add-btn {
		margin-left: 30upx;
		padding-left: 70upx;
		background: url(data:image/png;base64,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) no-repeat left center;
		background-size: 40upx auto;
	}
</style>
