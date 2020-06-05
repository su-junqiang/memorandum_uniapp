<template>
	<view class="container">
		<clxDialog :title='title' :isShow='show' @dialogConfirm='dialogConfirm' @dialogCancel='dialogCancel' style='overflow:visible'>
			<view class="note-list" style="width: 100%; height: 500upx;overflow: scroll;" >
				<view class="fileName" style="border-bottom: 2upx solid #eee;" v-for="(item,index) in candidates" :key="index">
					<view class="name-tel" style="height: 80upx; width: 100%;" @click="clickFile(item.fileId)">
						{{item.fileName}}
					</view>
				</view>
			</view>
		</clxDialog>
		<view class="note-list">
			<view class="a-note" v-for="(item,index) in noteList" :key="index">
				<uni-swipe-action>
					<uni-swipe-action-item :options="options" @click="bindClick" @change="clickNote(item.noteId)">
						<view class="left-text" :class="'active'" @tap="selectTap(item.noteId)">
							<view class="name-tel">
								{{item.noteTitle.length > 8 ? item.noteTitle.slice(0,8) + '......' :item.noteTitle}}
							</view>
							<view class="note-box">
								{{item.createTime}}
							</view>
						</view>
						<!-- <view class="right-edit" @click="selectTap(item.noteId)"></view> -->
					</uni-swipe-action-item>
				</uni-swipe-action>
			</view>

		</view>
	</view>
</template>

<script>
	import uniCombox from "@/components/uni-combox/uni-combox"
	import clxDialog from '@/components/clx-dialog/clx-dialog.vue';
	import App from '../../../App.vue';
	import uniSwipeAction from "@/components/uni-swipe-action/uni-swipe-action.vue"
	import uniSwipeActionItem from '@/components/uni-swipe-action-item/uni-swipe-action-item.vue'
	export default {
		components: {
			uniCombox,
			clxDialog,
			uniSwipeAction,
			uniSwipeActionItem,
		},
		data() {
			return {
				candidates: [],
				fileId: '',
				noteId: '',
				noteList: [],
				options: [{
					text: '移动',
					style: {
						backgroundColor: '#707070'
					}
				}, {
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}],
				title: '输入文件名称',
				show: false,
				dialogContent: ''
			}
		},
		created() {
			this.getData();
		},
		methods: {
			clickShow() {
				this.show = true
			},
			dialogConfirm() {
				this.show = false
				console.log(this.fileId)
				const user = uni.getStorageSync('detail');
								uni.request({
									url: App.requestIp + `file/insertNoteToFile/1`,
									method: "POST",
									header: {
										token: uni.getStorageSync('token')
									},
									data:{
										 fileId: this.fileId,
										  noteId: this.noteId
									},
									success: (res) => {
										if (res.data.status === 200) {
											uni.showToast({
												title: '操作成功',
												icon: 'none'
											})
											this.noteList.splice(this.noteList.findIndex(item => item.noteId === this.noteId), 1)
										} else {
											uni.showToast({
												title: '操作失败',
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
			clickNote(noteId) {
				this.noteId = noteId
			},
			clickFile(fileId){
				this.fileId=fileId
			},
			bindClick(value) {
				console.log(value)
				if (value.index == 0) {
					this.getfile()
					this.clickShow()
				} else {
               const user = uni.getStorageSync('detail');
				uni.request({
					url: App.requestIp + `recycle/updateNoteStatus/1`,
					method: "PUT",
					header: {
						token: uni.getStorageSync('token')
					},
					data:{
						 account: user.account,
						  noteId: this.noteId
					},
					success: (res) => {
						if (res.data.status === 200) {
							uni.showToast({
								title: '删除成功',
								icon: 'none'
							})
							this.noteList.splice(this.noteList.findIndex(item => item.noteId === this.noteId), 1)
						} else {
							uni.showToast({
								title: '删除失败',
								icon: 'none'
							})
						}
					},
					fail: (rej) => {
						uni.showToast({
							title: '删除失败',
							icon: 'none'
						})
						console.log(rej.data)
					}
				})
				}
			},
			getfile() {
				const user = uni.getStorageSync('detail');
				uni.request({
					url: App.requestIp + `file/selectAllFile/${user.account}/0/0`,
					method: "GET",
					header: {
						token: uni.getStorageSync('token')
					},
					success: (res) => {
						if (res.data.status === 200) {
							this.candidates = res.data.result
						} else {
							uni.showToast({
								title: '获取文件夹列表失败',
								icon: 'none'
							})
						}
					},
					fail: (rej) => {
						console.log(rej.data)
					}
				})
			},
			selectTap(id) {
				uni.navigateTo({
					url: '/pages/index/mdDetail?file=' + 0 + '&note=' + id
				})
			},
			getData() {
				const user = uni.getStorageSync('detail');
				uni.request({
					url: App.requestIp + `note/selectNoteByFileId/other/${user.account}/0/0`,
					method: "GET",
					header: {
						token: uni.getStorageSync('token')
					},
					success: (res) => {
						if (res.data.status === 200) {
							this.noteList = res.data.result.map(function(item) {
								const note = {};
								note.noteId = item.note.noteId;
								note.noteTitle = item.note.noteTitle;
								note.createTime = item.note.createTime;
								note.updateTime = item.note.updateTime;
								note.noteKeyWords = item.note.noteKeyWords;
								note.noteUrl = item.note.noteUrl;
								return note;
							})
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
	.fileName:hover{
		background-color: #C0C0C0;
	}
	.container {
		background-color: #F2f2f2;
	}

	.note-list {
		width: 100%;
		background-color: #fff;
		margin-top: 10upx;
		padding-bottom: 50upx;
	}

	.note-list .a-note {
		width: 720upx;
		margin-left: 30upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10upx 0;
		border-bottom: 2upx solid #eee;
	}

	.a-note .left-text {
		width: 510upx;
		box-sizing: border-box;
		padding-left: 100upx;
	}

	.a-note .left-text.active {
		background: url(data:image/jpeg;base64,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) no-repeat left center;
		background-size: 80upx auto;
	}

	.a-note .left-text .name-tel {
		margin-bottom: 20upx;
	}

	.a-note .left-text .name-tel .time {
		display: inline;
		margin-left: 20upx;
		color: #757575;
		font-size: 30upx;
	}

	.a-note .left-text .note-box {
		font-size: 24upx;
		color: #888888;
		line-height: 36upx;
	}

	.a-note .right-edit {
		width: 109upx;
		height: 100%;
		margin-left: 50px;
		padding: 50upx 0 50upx 58upx;
		box-sizing: border-box;
		background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAAAXNSR0IArs4c6QAABPhJREFUeAHtnE1oE0EUx80HQW39SCvYgBVBqhUU+l1FD1ZFPIgnQdDiRfGmh168eBDR4k1B8OLHSVTQg6gnUQ+CaNLWQGu8lSqtrZQKgk1jkzb1/zSzvKyTIO0mM7uZgc28eftm571fZnaTzGR8y4qkRCJRPTMzswsmG3HULiwsBIqYO3bK5/PNoa1oR0fHG8cuWuBCIyMjyycnJy+hzW6YIPPdr6uru1BfX5+iKj57PTjm6+vrOwz9WchdyIN2mzKWL3R2dl4pVXujo6MrJiYmniHO/bwNQLqFN+cM6fIA9ff3b85ms7dRYS+voFCehqNr4HDWaR8KwaF20F4mHA6vamhomLV6RzQabZufn3+B82GnnVnC9RaWULdg1WJwcpWCYBGC/BcQ4GxB4RWO1TkDLTK8k71O957/gEOxv25sbPxJQhDDyR+Lxe5ALgRnEE4OwG7Y7/enqVIZ0hzaiLW3t791si2CMz4+/hzX3FfkumPBYPCUOB/EDfkgCnuEQuSAMoSjB06+FDo356LnIIaicAKBwN6WlpYvIlbqQSdFQeQAk4C+CzfI70Ln5lzAQUx5TytbTGMEp62tbZjrg4DRiopctwxD6RQMKx4OQfEDDn0ItBKAzba2tsYshYuFpfQcEbYfwnJRyOUpQMrvUjYDNxSdgENxEiDPJafgEBjPAXISjucAOQ3HU4BKAcczgEoFxxOASgnH9YBKDcfVgMoBx7WAygWHAFk/mFHBDYng/M9PFrIvnouJz1UfFMsNh4C6BpAKOK4BpAqOKwCphKM9INVwtAakAxxtAekCR0tAOsHRDpBucLQCpCMcbQDpCocAKf8upgOcoaGh9VgHdRrzgTSRehcTpqMEh5LSrxq0eKmcXzz/hpz/Go/H1wJOP7SXsfTnIvI41irUCSulgKampsihfcIZSS6dDpbYLVqVyWRosdgGcQH0oFrMCx4VZaWA4Mxx4YgkLzmcXJu19rbRk9YJnVJAcKLQDG654AgOBXOlgNCD7kk80wYO+aYUUE1NzSU8OW7Aj18Y97QO8QV+CdxtX4JCjqpKSh/ztEgSgZ9DT+oZGBgIAcyMKhCF2lUKSDiF3kNL7ujQLikdYtrRkDhkAEmgcJUBxGlIZANIAoWrDCBOQyIbQBIoXGUAcRoS2QCSQOEqA4jTkMgGkAQKVxlAnIZENoAkULjKAOI0JLIBJIHCVQYQpyGRDSAJFK4ygDgNiWwASaBwlQHEaUhkA0gChav8uekWS4cZhoqChngDVvA5gTMhGN9sBqsHBwd12p7C5p6zRcDI+1Nz7uo/RCv0r+e8/4nTiVQq1S0MKiDfbo8RTCaEjobYU1FgeW9uPw+m8p6IXSe2IiraAigvgcl7ofCHQqEHUNAMJ0/VKDzBdjmNXOklGZtHhdBTruOw33M/5S2gampq+orAr0mC34YtYj6gJ53nC4okdq5T0eiYnp6mjZUO2Z3HWoGbXPdngyXaiiuZTL5DhX/GozBGL0tCzoiyi3PqOStl/iPG4UgkskNsz0U21g5UWIq2KZ1O09hbL6vsdR3g0Jt/AMPrDY/VGn/Nzc2fcT/aCcOP3KBC5Hn0qhN2OBS7BYgKBKmqqmoXIF1F8c8ucKT3cqJhhWM/NpN7JIvTGmL2k3iCRUD1GNbrHcG5BhwRHP986rTX070MGBnENQ4/E7ghP8SWgI/5Pcfu/2//c4lF4CDN7wAAAABJRU5ErkJggg==) no-repeat 43upx center;
		background-size: 35upx auto;
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
