
<template>
	<view class="content" id="content">
		<view v-if="test">
			<u-parse :content="detailData" :loading="loading" @preview="preview" @navigate="navigate" />
		</view>
		<top-to></top-to>
		
	</view>
</template>
<script>
	import MescrollTop from '@/components/mescroll-uni/components/mescroll-top.vue';
	import GlobalOption from '@/components/mescroll-uni/mescroll-uni-option.js';
	import MeScroll from '@/components/mescroll-uni/mescroll-uni.js';
	import uParse from '@/components/gaoyia-parse/parse.vue'
	import marked from '@/components/marked'
	import App from '../../App.vue'
	import topTo from '@/pages/index/top/topTo.vue'
	export default {
		components: {
			topTo,
			uParse,
			MescrollTop
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
				},1000)}
				// else{
				// 	setTimeout(() => { 
				// 	 uni.switchTab({
				// 	 	url: '/pages/index/file'
				// 	 })
				// 	}, 1000)
				// }
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
						if(""==res.data.result[0].note.noteUrl||null===res.data.result[0].note.noteUrl){
							this.detailData ='<div style="color: red; position:absolut;  text-align:center;width:100% ;height:500px; "><img src="../../static/icon/kong.png" style="left:30%;width:40%;height:40%"></img>数据为空</div>'
						}else{
						this.detailData = marked(res.data.result[0].note.noteUrl);}
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
