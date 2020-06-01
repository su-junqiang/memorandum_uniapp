<template>
	<view>
		<view>
			<view class="toolbar">

				<view class="iconfont icon-save" @click="toolBarClick('save')"></view>
				<view class="iconfont icon-bold" @click="toolBarClick('bold')"></view>
				<view class="iconfont icon-italic" @click="toolBarClick('italic')"></view>
				<view class="iconfont icon-xiahuaxian1" @click="toolBarClick('header')"></view>
				<view class="iconfont icon-underline" @click="toolBarClick('underline')"></view>
				<view class="iconfont icon-strike" @click="toolBarClick('strike')"></view>
				<view class="iconfont icon-sup" @click="toolBarClick('sup')"></view>
				<view class="iconfont icon-sub" @click="toolBarClick('sub')"></view>
				<view class="iconfont icon-help" @click="toolBarClick('help')"></view>
		<!-- 		<view class="iconfont icon-alignleft" @click="toolBarClick('alignleft')"></view>
				<view class="iconfont icon-aligncenter" @click="toolBarClick('aligncenter')"></view>
				<view class="iconfont icon-alignright" @click="toolBarClick('alignright')"></view> -->
				<view class="iconfont icon-link" @click="toolBarClick('link')"></view>
				<view class="iconfont icon-image" @click="toolBarClick('imgage')"></view>
				<view class="iconfont icon-code" @click="toolBarClick('code')"></view>
				<view class="iconfont icon-table" @click="toolBarClick('table')"></view>
				<view class="iconfont icon-qingkong" @click="toolBarClick('clear')"></view>
				<view class="iconfont icon-undo" @click="toolBarClick('undo')"></view>
			</view>
			<view class="input-content">
				<textarea auto-height maxlength="-1" v-model="textareaDataSync" @blur="getCursor"></textarea>
			</view>
		</view>
		<view class="preview" v-if="showPreview && textareaHtmlSync">
			<scroll-view scroll-y :style="'height:'+screenHeight/2.5+'px;padding:10px;box-sizing: border-box;'">
				<uParse :content="textareaHtmlSync" @preview="preview" @navigate="navigate" />
			</scroll-view>
		</view>
		<prompt ref="prompt" @onConfirm="onConfirm" @onCancel="onCancel" title="标题" :text="promptText"></prompt>

	</view>
</template>

<script>
	let saveStatus = false;
	let saveLength =0;
	import marked from '../marked'
	import uParse from '@/components/gaoyia-parse/parse.vue'
	import prompt from '../../pages/prompt/prompt.vue'
	import App from '../../App.vue'
	export default {
		name: "ly-markdown",
		components: {
			prompt,
			uParse
		},
		data: function() {
			return {
				cost: '',
				promptText: '',
				screenHeight: 0,
				cursor: 0,
				textareaDataSync: '',
				textareaHtmlSync: ''
			}
		},
		props: {

			textareaData: {
				type: String,
				default: ''
			},
			textareaHtml: {
				type: String,
				default: ''
			},
			showPreview: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			preview(src, e) {
				uni.previewImage({
					urls: src,
				})
			},
			navigate(href, e) {
				// 如允许点击超链接跳转，则应该打开一个新页面，并传入href，由新页面内嵌webview组件负责显示该链接内容
				// #ifdef APP-PLUS
				plus.runtime.openURL(href)
				// #endif
				// #ifdef MP-WEIXIN
				uni.setClipboardData({
					data: href,
					success: function() {
						uni.showModal({
							content: "网址已复制,请在浏览器中粘贴打开",
							showCancel: false
						})
					}
				})
				// #endif
			},
			toolBarClick(type) {
				if (type == 'bold') {
					this.textareaDataSync += "**粗体文字** "
				} else if (type == "italic") {
					this.textareaDataSync += "*斜体* "
				} else if (type == "header") {
					uni.showActionSheet({
						itemList: ["标题1", "标题2", "标题3", "标题4", "标题5", "标题6"],
						success: res => {
							switch (res.tapIndex) {
								case 0:
									this.textareaDataSync += "# 标题1\r";
									return;
								case 1:
									this.textareaDataSync += "## 标题2\r";
									return;
								case 2:
									this.textareaDataSync += "### 标题3\r";
									return;
								case 3:
									this.textareaDataSync += "##### 标题4\r";
									return;
								case 4:
									this.textareaDataSync += "##### 标题5\r";
									return;
								case 5:
									this.textareaDataSync += "###### 标题6\r";
									return;
							}
						}
					})
				} else if (type == "underline") {
					this.textareaDataSync += "<u>下划线</u> "
				} else if (type == "strike") {
					this.textareaDataSync += "~~中划线~~ "
				} else if (type == "sup") {
					this.textareaDataSync += "<sup>上角标</sup> "
				} else if (type == "sub") {
					this.textareaDataSync += "sub>下角标</sub>"
				} else if (type == "alignleft") {
					this.textareaDataSync += '\n<p align="left">左对齐</p>\n'
				} else if (type == "aligncenter") {
					this.textareaDataSync += '\n<p align="center">居中对齐</p>\n'
				} else if (type == "alignright") {
					this.textareaDataSync += '\n<p align="right">右对齐</p>\n'
				} else if (type == "link") {
					this.textareaDataSync += "[在此输入网址描述](在此输入网址) "
				} else if (type == "imgage") {
					this.textareaDataSync += "![](在此输入图片地址) "
				} else if (type == "code") {
					this.textareaDataSync += "\n``` 代码块 \n\n```\n"
				} else if (type == "table") {
					this.textareaDataSync += "\n|列1|列2|列3|\n|-|-|-|\n|单元格1|单元格2|单元格3|\n"
				} else if (type == "clear") {
					uni.showModal({
						title: "提示",
						content: "确定清空?",
						confirmColor: "#CC0000",
						success: res => {
							if (res.confirm) {
								this.textareaDataSync = "";
							}
						}
					})
				} else if (type == "save") {
					this.prompt()
				} else if (type == "undo") {

					if (this.textareaData == null || this.textareaData == ""||(saveStatus==true&&saveLength==this.textareaData.length)) {
						uni.navigateBack({
							delta: 1
						})
					} else {
						uni.showModal({
							title: "提示",
							content: "确定不保存返回?",
							confirmColor: "#CC0000",
							success: res => {
								if (res.confirm) {
									uni.switchTab({
										url:'../../pages/index/index',
										
									})
								}
							}
						})
					}
				} else if (type == "help") {
					uni.showModal({
						title: "提示",
						content: "很多资讯页面，服务端返回的数据都是 markdown 字符串或 html 字符串，使用本模板可直接解析 markdown 为符合 uni-app 规范的富文本界面。下文为示例：\r\n" +
							"\r\n" +
							"HBuilderX堪称markdown书写编辑的最佳工具，本文简单介绍HBuilderX里markdown的使用技巧。更多详情请在HBuilderX里点菜单帮助-markdown语法帮助。\r\n" +
							"\r\n" +
							"markdown的标题是行首以#号开头，空格分割的，不同级别的标题，在HX里着色也不同。如下：\r\n" +
							"# 标题1\r\n" +
							"## 标题2\r\n" +
							"### 标题3\r\n" +
							"#### 标题4\r\n" +
							"##### 标题5\r\n" +
							"\r\n" +
							"HBuilderX标题编辑技巧：\r\n" +
							"1. Emmet快速输入：敲h2+Tab即可生成二级标题【同HTML里的emmet写法，不止标题，HX里所有可对应tag的markdown语法均支持emmet写法】。仅行首生效\r\n" +
							"2. 智能双击：双击#号可选中整个标题段落\r\n" +
							"3. 智能回车：行尾回车或行中Ctrl+Enter强制换行后会自动在下一行补#\r\n" +
							"4. 回车后再次按Tab可递进一层标题，再按Tab切换列表符\r\n" +
							"5. 在# 后回车，可上插一个空标题行【同word】，任意位置按Ctrl+Shift+Enter也可以\r\n" +
							"\r\n" +
							"\r\n" +
							"- 折叠：点标题前的-号可折叠该标题段落，快捷键是Alt+-（展开折叠是Alt+=）\r\n" +
							"- 折叠：多层折叠时折叠或展开子节点，快捷键是Alt+Shift+-或=\r\n" +
							"\r\n" +
							"\r\n" +
							"**加粗** 【快捷键：Ctrl+B，支持多光标；Emmet：b后敲Tab】\r\n" +
							"\r\n" +
							"_倾斜_【Emmet：i后敲Tab；前后包围：选中文字按Ctrl+\\是在选区两侧添加光标，可以继续输入_】\r\n" +
							"\r\n" +
							"~~删除线~~【前后包围：选中文字按Ctrl+\\是在选区两侧添加光标，可以继续输入~~，会在2侧同时输入】\r\n" +
							"\r\n" +
							"> 引用\r\n" +
							"\r\n" +
							"\r\n" +
							"[超链接](https://dcloud.io)\r\n" +
							"\r\n" +
							"![logo](https://img-cdn-qiniu.dcloud.net.cn/newpage/images/logo4.png)\r\n" +
							"\r\n" +
							"\r\n",
						showCancel: false,
						confirmColor: "#707070",
					})
				}
			},

			getCursor(e) {
				//安卓失去焦点获取不到cursor位置,暂不使用
				//this.cursor = e.detail.cursor; 
			},
			prompt: function() {
				this.$refs.prompt.show();
			},
			onConfirm: function(e) {
				console.log(e);
				let _cost = e;
				if (_cost == '') {
					console.log('你还未输入');
					uni.showToast({
						title: '你还未输入',
						icon: "loading",
						position: "top"
					});
					return;
				} else {
					this.$refs.prompt.hide();
					console.log('标题：', _cost, '内容：', this.textareaData,this.textareaHtml)
					let info = uni.getStorageSync("detail")
					uni.uploadFile({
						url: App.requestIp + "note/newBuiltNoteReplace",
						filePath: "",
						header: {
							token: uni.getStorageSync('token')
						},
						name: "",
						formData: {
							"noteUrl": this.textareaData,
							"noteUserAccount": info.account,
							"noteTitle": _cost,
							"noteType": "md文件"
						},
						success: (res) => {
							if (JSON.parse(res.data).status === 200) {
								uni.showModal({
									title: "提示",
									content: "保存并退出?",
									cancelText: "仅保存",
									confirmColor: "#707070",
									success: res => {
										if (res.confirm) {
											uni.navigateBack({
												delta: 1
											})
										}
									}
								})
							}
						},
						fail: (rej) => {
							console.log(rej.data)
						}
					})
					saveStatus=true;
					saveLength=this.textareaData.length;
					console.log(saveLength)
				}
			},
			onCancel: function() {
				this.$refs.prompt.hide();
				this.$refs.prompt.cost = '';
			}
		},
		watch: {
			"textareaDataSync": function(newValue, oldValue) {
				this.textareaHtmlSync = marked(newValue)
				this.$emit('update:textareaData', newValue)
				this.$emit('update:textareaHtml', this.textareaHtmlSync)
			}
		},
		created() {
			this.textareaDataSync = this.textareaData;
			this.textareaHtmlSync = this.textareaHtml;
		},
		mounted() {
			uni.getSystemInfo({
				success: res => {
					this.screenHeight = res.screenHeight
				}
			})
		}
	}
</script>

<style>
	@import './markdown.css';
	@import url("../gaoyia-parse/parse.css");

	.input-content {
		width: 100%;
	}

	.input-content textarea {
		padding: 16upx 25upx 15upx 25upx;
		font-size: 30upx;
		min-height: 500upx;
		line-height: 1.5;
	}

	.preview {
		border-top: 1upx solid #e0e0e0;
		width: 100%;
	}

	.toolbar {
		width: 100%;
		border: none;
		box-shadow: 0 0upx 4upx rgba(0, 0, 0, 0.157), 0 0upx 4upx rgba(0, 0, 0, 0.227);
	}

	.toolbar .iconfont {
		display: inline-block;
		cursor: pointer;
		height: 61.6upx;
		width: 61.6upx;
		margin: 13upx 0 11upx 0upx;
		font-size: 33upx;
		padding: 10upx 13upx 11upx 8upx;
		color: #757575;
		border-radius: 11upx;
		text-align: center;
		background: none;
		border: none;
		outline: none;
		line-height: 2.2;
		vertical-align: middle;
	}

	.input-content {
		min-height: ;
	}
</style>
