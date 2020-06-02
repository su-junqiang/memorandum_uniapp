<template>
	<view>
		<!-- <uni-fab :pattern="pattern" :content="content" :horizontal="horizontal" :vertical="vertical" :direction="direction" @trigger="trigger"
		 ref="fab"></uni-fab> -->
		 <folder-list></folder-list>
		 <file-list></file-list>
	</view>
</template>

<script>
	import uniIcon from '@/components/uni-icon/uni-icon.vue';
	import uniFab from  '@/components/uni-fab/uni-fab.vue';
	import fileList from './file/fileList.vue';
	import folderList from './file/folderList.vue'
	export default {
		components: {
			uniFab,
			uniIcon,
			fileList,
			folderList
		},
		data() {
			return {
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
						text: '组件',
						active: false
					},
					{
						iconPath: '/static/api.png',
						selectedIconPath: '/static/apiHL.png',
						text: 'API',
						active: false
					},
					{
						iconPath: '/static/template.png',
						selectedIconPath: '/static/templateHL.png',
						text: '模版',
						active: false
					}
				]
			};
		},
		methods: {
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
