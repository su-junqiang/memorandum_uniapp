<template>
	<view>
		<top-to></top-to>
		<mescroll-body ref="mescrollRef" @down="downCallback" @up="upCallback" :up="upOption">
			<folder-list v-if="folderList"></folder-list>
			<file-list v-if="fileList"></file-list>
		</mescroll-body>
		<fab></fab>
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"; // 注意.vue后缀不能省
	import uniIcon from '@/components/uni-icon/uni-icon.vue';
	import uniFab from '@/components/uni-fab/uni-fab.vue';
	import fileList from './file/fileList.vue';
	import folderList from './file/folderList.vue'
	import topTo from '@/pages/index/top/topTo.vue'
	import fab from '@/pages/index/fab/fab.vue'
	export default {
		mixins: [MescrollMixin],
		components: {
			uniFab,
			topTo,
			MescrollBody,
			fab,
			uniIcon,
			fileList,
			folderList
		},
		data() {
			return {
				downOption: {},
				upOption: {
					page: {
						size: 10 // 每页数据的数量,默认10
					},
					noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
					empty: {
						tip: '暂无相关数据'
					}
				},
				//悬浮按钮
				folderList:true,
				fileList:true,
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

			};
		},
		methods: {
			downCallback(page) {
			     this.fileList=false
				 this.folderList=false
				 
				// 第1种: 下拉刷新和上拉加载调同样的接口, 那么不用第1种方式, 直接mescroll.resetUpScroll()即可
				this.upCallback(page); // 重置列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
				// 第2种: 下拉刷新什么也不处理, 可直接调用或者延时一会调用 mescroll.endSuccess() 结束即可
				// this.mescroll.endSuccess()
			},
			/*上拉加载的回调*/
			upCallback(page) {
				this.mescroll.endSuccess([""],false)
				this.$nextTick(() => {
				this.fileList=true
				this.folderList=true})
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
		}
	}
</script>

<style>

</style>
