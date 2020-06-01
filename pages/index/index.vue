<template>
	<view>

		<!-- 文章内容区 -->
		<view class="grace-news-list" style="width:94%; padding:5px 3%;">
			<block v-for="(item, index) in artList" :key="index">
				<view class="card">
					<uni-swipe-action>
						<uni-swipe-action-item :options="options" @click="bindClick">
							<uni-card :is-full="true" :is-shadow='false' @click="mdDetail(item.note)" :title="item.note.noteTitle" 
							 :extra="item.note.createTime" :note="item.note.noteType">
								{{item.note.noteKeyWords}}
							</uni-card>
						</uni-swipe-action-item>
					</uni-swipe-action>
				</view>
			</block>
			<uni-fab :pattern="pattern" :content="content" :horizontal="horizontal" :vertical="vertical" :direction="direction"
			 @trigger="trigger" ref="fab"></uni-fab>
		</view>

	</view>

</template>
<script>
	import uniIcon from '@/components/uni-icon/uni-icon.vue';
	import uniFab from '@/components/uni-fab/uni-fab.vue';
	import App from '../../App.vue'
	import uniCard from "@/components/uni-card/uni-card.vue"
	import uniSwipeAction from "@/components/uni-swipe-action/uni-swipe-action.vue"
	import uniSwipeActionItem from '@/components/uni-swipe-action-item/uni-swipe-action-item.vue'

	export default {
		components: {
			uniCard,
			uniSwipeAction,
			uniSwipeActionItem,
			uniFab,
			uniIcon
		},
		data() {
			return {
				top: 0,
				//演示文章数据
				artList: [],
				currentPage: 0,
				count: -1,
				skip: 0,
				limit: 5,
				options: [{
					text: '置顶',
					style: {
						backgroundColor: '#707070'
					}
				}, {
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}],
				//悬浮按钮
				title: 'uni-fab',
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
						iconPath: '/static/component.png',
						selectedIconPath: '/static/componentHL.png',
						text: '新建',
						active: false
					},
					{
						iconPath: '/static/api.png',
						selectedIconPath: '/static/apiHL.png',
						text: '搜索',
						active: false
					},
					{
						iconPath: '/static/template.png',
						selectedIconPath: '/static/templateHL.png',
						text: '排序',
						active: false
					}
				]
			};
		},
		onLoad: function(options) {
			
			setTimeout(function() {
				console.log('start pulldown');
			}, 100);
			uni.startPullDownRefresh();
		},
		// onTabItemTap: function() {
		// 	uni.pageScrollTo({
		// 	scrollTop: 0,
		// 	duration: 300
		// 	});
		// },
		//下拉刷新
		onPullDownRefresh: function() {
			// 重置分页及数据
			this.skip = 0,
				this.limit = 5, this.currentPage = 0, this.count = -1;
			this.artList = [];
			this.getNewsList();
		},
		// 加载更多
		onReachBottom: function() {
			this.skip = this.limit + this.skip;
			this.getNewsList();
		},
		
		onNavigationBarButtonTap(value) {
			if (value.float == "right") {
				uni.navigateTo({
					url: '/pages/index/newNote'
				})
			} else {
				console.log("caidan")
			}
		},
		onBackPress() {
			if (this.$refs.fab.isShow) {
				this.$refs.fab.close();
				return true;
			}
			return false;
		},
		methods: {
			mdDetail(note) {
				uni.navigateTo({
					url: '/pages/index/mdDetail?note=' + note.noteId
				})
			},
			getNewsList: function() {
				let info = uni.getStorageSync("detail")
				uni.showLoading({});
				uni.request({
					// url: 'https://www.easy-mock.com/mock/5cb9655c01e2e57715d324b0/example/imgnewlist?page='+page+'#!method=get&cate='+cate,
					url: App.requestIp + "note/selectNoteByUserAccount/" + info.account + '/' +
						this.skip + '/' + this.limit,
					method: "GET",
					header: {
						token: uni.getStorageSync('token')
					},
					data: {},
					success: res => {
						console.log('水水水水', res.data);
						var newsList = res.data.result;
						this.count = Math.ceil(res.data.total / this.limit)
						console.log(this.count)
						console.log(this.currentPage)
						if (this.count >= 0 && this.currentPage <=this.count) {
							this.artList = this.artList.concat(newsList);
							console.log('ssssss', this.artList)
							this.currentPage++;
						}
						uni.hideLoading();
					},
					complete: res => {
						uni.hideLoading();
						uni.stopPullDownRefresh();
					}
				});
			},
			bindClick(value) {
				console.log(value.index)
				uni.showToast({
					title: `点击了${value.index}按钮`,
					icon: 'none'
				})

			},
			trigger(e) {
				console.log(e);
				this.content[e.index].active = !e.item.active;
				uni.showModal({
					title: '提示',
					content: `您${this.content[e.index].active ? '选中了' : '取消了'}${e.item.text}`,
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			}

		},
	}
</script>
<style>
	/* 分段器头部 fixed 定位 */
	.fixedit {
		width: 100%;
		position: fixed;
		z-index: 99;
		left: 0;
		top: 0;
	}

	.grace-news-list-imgs {
		max-height: 68px;
		overflow: hidden;
	}

	.nav {
		position: fixed;
		color: white;
		width: 100%;
		height: 100upx;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
		font-size: 24upx;
		background-color: #9D9D9D;
		z-index: 996;
	}


	.content {
		position: absolute;
		top: 5%;
		width: 100%;
	}

	.edit {
		position: absolute;
		display: flex;
		left: 87%;
		top: 15%;
	}

	.titles {
		position: absolute;
		justify-content: center;
		align-items: center;
		text-align: center;
		font-size: 30upx;
		display: flex;
		top: 40upx;
		left: 45%;
	}

	.searchInput999 {
		position: absolute;
		top: 1%;
		width: 85%;
		left: 7.5%;
		margin: 0 auto;
		background: #E0E0E0;
		border-radius: 30upx;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 56upx;
	}

	.search999 {
		width: 32upx;
		height: 32upx;
	}

	.searchBox999 {
		width: 56upx;
		height: 56upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.input999 {
		color: #999;
		width: 95%;
	}

	.card {
		border-style: inset;
		border-width: 5px;
		border-color: rgb(0, 0, 0, 0);
	}
</style>
