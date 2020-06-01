
<template>
	<view class="content">
		<!-- <text>
		</text> -->
		<!-- <view @click="load()"></view>
		<view @click="unload()"></view> -->
		<view v-if="test">
			<u-parse :content="detailData" :loading="loading" @preview="preview" @navigate="navigate" />
		</view>
	</view>
</template>
<script>
	import uParse from '@/components/gaoyia-parse/parse.vue'
	import marked from '@/components/marked'
	import App from '../../App.vue'
	export default {
		components: {
			uParse
		},
		data() {
			return {
				noteId:'',
				test: false,
				detailData: '',
				loading: false //开启loading不显示默认值
			}
		},
		onLoad(options) {

			setTimeout(() => {
				this.load(options.note)
				this.loading = false;
			}, 500)
		},
		
		onNavigationBarButtonTap(value) {
			if (value.float == "right") {
				setTimeout(() => {
				uni.navigateTo({
					url: '/pages/index/editNote?noteId='+this.noteId
				})
				}, 100)
			}
		},
		onBackPress() {
		  this.back()
		},
		methods: {
			back(){
				if(this.$route.query.file==undefined){
				setTimeout(() => {
				 uni.switchTab({
				 	url: '/pages/index/index'
				 })
				}, 100)}else{
					setTimeout(() => {
					 uni.switchTab({
					 	url: '/pages/index/file'
					 })
					}, 100)
				}
			},
			preview(src, e) {
				// do something
			},
			navigate(href, e) {
				// do something
			},
			unload() {
				this.test = false
				this.detailData = ``
			},
			load(noteId) {
				this.test = true
				this.test = true
				let info = uni.getStorageSync("detail")
				uni.request({
					url: App.requestIp + "note/selectOneNoteByNoteId/" + info.account + '/' + noteId,
					method: "GET",
					header: {
						token: uni.getStorageSync('token')
					},
					data: {},
					success: res => {
						console.log(marked(res.data.result[0].note.noteUrl))
						this.noteId=res.data.result[0].note.noteId;
						this.detailData = marked(res.data.result[0].note.noteUrl);
					}
				});

			}
		}
	}
</script>
<style>
  
	
	.content {/* 
			background: #FFFFFF !important; */
		/* background: url(../../static/back.jpg); */
		/* position: absolute; */
	    padding: 2px 1em 0 1em;
		/* 在这里调整，整体字体大小 */
		font-size: 35upx;
	/* 	width: 91%;
		height: calc(100000vh); */
	
	}
</style>
<!-- <template>
	<view class="content" >
		<text>dsd</text>
			<view @click="load()"></view>
			<br>
			<view @click="unload()">卸载数据</view>
			<br>
			<view v-if="test">
				<u-parse :content="article" @preview="preview" @navigate="navigate" />
			</view>
	</view>
</template>

<script>
	import marked from 'marked'
	import uParse from '@/components/gaoyia-parse/parse.vue'
	import App from '../../App.vue'
	var mdcontend = null,
		noteId = 0;
	export default {
		components: {
			uParse
		},
		data() {
			return {
				test:false,
				article: marked(mdcontend),
				loading:false//开启loading不显示默认值
			}
		},
		onLoad: (note) => {
			noteId = note.note;
			setTimeout(()=>{
				this.load()
				// this.loading = false;
			},2000)
		},
		methods: {
			preview(src, e) {
				// do something
				console.log("src: " + src);
			},
			navigate(href, e) {
				// 如允许点击超链接跳转，则应该打开一个新页面，并传入href，由新页面内嵌webview组件负责显示该链接内容
				console.log("href: " + href);
			},
			unload(){
				this.test = false
			},
			load() {
				this.test = true
				let info = uni.getStorageSync("detail")
				uni.request({
					url: App.requestIp + "note/selectOneNoteByNoteId/" + info.account + '/' + noteId,
					method: "GET",
					header: {
						token: uni.getStorageSync('token')
					},
					data: {},
					success: res => {
						mdcontend = res.data.result[0].note.noteUrl;
					}
				});
			},

			

		}
	}
</script>
<style>
	.content {
		padding-left: 1.5em;
		padding-right: 1.5em;
		/* 在这里调整，整体字体大小 */
		font-size: 35upx;
	}
</style>
 -->