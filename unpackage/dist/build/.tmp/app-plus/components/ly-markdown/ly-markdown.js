(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/ly-markdown/ly-markdown","common/main","pages/prompt/prompt"],{"138c":function(t,n,e){"use strict";var a=function(){var t=this,n=t.$createElement;t._self._c},r=[];e.d(n,"a",function(){return a}),e.d(n,"b",function(){return r})},"23c9":function(t,n,e){"use strict";e.r(n);var a=e("c4f9"),r=e.n(a);for(var o in a)"default"!==o&&function(t){e.d(n,t,function(){return a[t]})}(o);n["default"]=r.a},"3f10":function(t,n,e){"use strict";var a=e("623d"),r=e.n(a);r.a},"42fe":function(t,n,e){"use strict";e.r(n);var a=e("dcc1");for(var r in a)"default"!==r&&function(t){e.d(n,t,function(){return a[t]})}(r);e("3f10");var o,i,c=e("2877"),u=Object(c["a"])(a["default"],o,i,!1,null,null,null);n["default"]=u.exports},5850:function(t,n,e){"use strict";e.r(n);var a=e("5fe5"),r=e("23c9");for(var o in r)"default"!==o&&function(t){e.d(n,t,function(){return r[t]})}(o);e("ec93");var i=e("2877"),c=Object(i["a"])(r["default"],a["a"],a["b"],!1,null,null,null);n["default"]=c.exports},"5fe5":function(t,n,e){"use strict";var a=function(){var t=this,n=t.$createElement;t._self._c},r=[];e.d(n,"a",function(){return a}),e.d(n,"b",function(){return r})},"623d":function(t,n,e){},"69b8":function(t,n,e){},"94d4":function(t,n,e){"use strict";e.r(n);var a=e("138c"),r=e("cd47");for(var o in r)"default"!==o&&function(t){e.d(n,t,function(){return r[t]})}(o);e("dbb8");var i=e("2877"),c=Object(i["a"])(r["default"],a["a"],a["b"],!1,null,null,null);n["default"]=c.exports},c4f9:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a={data:function(){return{multipleSlots:!0,isHidden:!0,cost:""}},props:{title:{type:String,default:"标题"},btn_cancel:{type:String,default:"取消"},btn_certain:{type:String,default:"确定"},text:{type:String,default:""}},watch:{},methods:{hide:function(){this.isHidden=!0},show:function(t){this.isHidden=!1,null!=t&&void 0!=t&&""!=t&&(this.text=t)},_cancel:function(){this.cost="",this.hide(),this.$emit("onCancel")},_confirm:function(){console.log(this.cost," at pages\\prompt\\prompt.vue:66"),this.$emit("onConfirm",this.cost),this.cost=""},_input:function(t){this.cost=t.detail.value}}};n.default=a},cd47:function(t,n,e){"use strict";e.r(n);var a=e("ea25"),r=e.n(a);for(var o in a)"default"!==o&&function(t){e.d(n,t,function(){return a[t]})}(o);n["default"]=r.a},dbb8:function(t,n,e){"use strict";var a=e("69b8"),r=e.n(a);r.a},dcc1:function(t,n,e){"use strict";e.r(n);var a=e("e287"),r=e.n(a);for(var o in a)"default"!==o&&function(t){e.d(n,t,function(){return a[t]})}(o);n["default"]=r.a},e287:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=r(e("66fd"));function r(t){return t&&t.__esModule?t:{default:t}}var o="http://www.sujunqiang.work/cloudService/memorandum/",i={requestIp:o,created:function(){plus.navigator.closeSplashscreen()},onLaunch:function(){console.log("App Launch"," at App.vue:14"),t.getSystemInfo({success:function(t){a.default.prototype.StatusBar=t.statusBarHeight,"android"==t.platform?a.default.prototype.CustomBar=t.statusBarHeight+50:a.default.prototype.CustomBar=t.statusBarHeight+45}})},onShow:function(){console.log("App 开启"," at App.vue:41")},onHide:function(){console.log("App 关闭"," at App.vue:44")}};n.default=i}).call(this,e("6e42")["default"])},ea25:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=i(e("3421")),r=i(e("5850")),o=i(e("42fe"));function i(t){return t&&t.__esModule?t:{default:t}}var c=!1,u=0,s=function(){return Promise.all([e.e("common/vendor"),e.e("components/uParse/src/wxParse")]).then(e.bind(null,"5a2c"))},l={name:"ly-markdown",components:{prompt:r.default,uParse:s},data:function(){return{cost:"",promptText:"",screenHeight:0,cursor:0,textareaDataSync:"",textareaHtmlSync:""}},props:{textareaData:{type:String,default:""},textareaHtml:{type:String,default:""},showPreview:{type:Boolean,default:!1}},methods:{preview:function(n,e){t.previewImage({urls:n})},navigate:function(t,n){plus.runtime.openURL(t)},toolBarClick:function(n){var e=this;"bold"==n?this.textareaDataSync+="**粗体文字** ":"italic"==n?this.textareaDataSync+="*斜体* ":"header"==n?t.showActionSheet({itemList:["标题1","标题2","标题3","标题4","标题5","标题6"],success:function(t){switch(t.tapIndex){case 0:return void(e.textareaDataSync+="# 标题1\r");case 1:return void(e.textareaDataSync+="## 标题2\r");case 2:return void(e.textareaDataSync+="### 标题3\r");case 3:return void(e.textareaDataSync+="#### 标题4\r");case 4:return void(e.textareaDataSync+="##### 标题5\r");case 5:return void(e.textareaDataSync+="###### 标题6\r")}}}):"underline"==n?this.textareaDataSync+="++下划线++ ":"strike"==n?this.textareaDataSync+="~~中划线~~ ":"sup"==n?this.textareaDataSync+="^上角标^ ":"sub"==n?this.textareaDataSync+="~下角标~ ":"alignleft"==n?this.textareaDataSync+="\n::: hljs-left\n\n左对齐\n\n:::\n":"aligncenter"==n?this.textareaDataSync+="\n::: hljs-center\n\n居中对齐\n\n:::\n":"alignright"==n?this.textareaDataSync+="\n::: hljs-right\n\n\n\n右对齐\n\n:::\n":"link"==n?this.textareaDataSync+="[在此输入网址描述](在此输入网址) ":"imgage"==n?this.textareaDataSync+="![](在此输入图片地址) ":"code"==n?this.textareaDataSync+="\n``` 代码块 \n\n```\n":"table"==n?this.textareaDataSync+="\n|列1|列2|列3|\n|-|-|-|\n|单元格1|单元格2|单元格3|\n":"clear"==n?t.showModal({title:"提示",content:"确定清空?",confirmColor:"#CC0000",success:function(t){t.confirm&&(e.textareaDataSync="")}}):"save"==n?this.prompt():"undo"==n?null==this.textareaData||""==this.textareaData||1==c&&u==this.textareaData.length?t.navigateBack({delta:1}):t.showModal({title:"提示",content:"确定不保存返回?",confirmColor:"#CC0000",success:function(n){n.confirm&&t.navigateBack({delta:1})}}):"help"==n&&t.showModal({title:"提示",content:"很多资讯页面，服务端返回的数据都是 markdown 字符串或 html 字符串，使用本模板可直接解析 markdown 为符合 uni-app 规范的富文本界面。下文为示例：\r\n\r\nHBuilderX堪称markdown书写编辑的最佳工具，本文简单介绍HBuilderX里markdown的使用技巧。更多详情请在HBuilderX里点菜单帮助-markdown语法帮助。\r\n\r\nmarkdown的标题是行首以#号开头，空格分割的，不同级别的标题，在HX里着色也不同。如下：\r\n# 标题1\r\n## 标题2\r\n### 标题3\r\n#### 标题4\r\n##### 标题5\r\n\r\nHBuilderX标题编辑技巧：\r\n1. Emmet快速输入：敲h2+Tab即可生成二级标题【同HTML里的emmet写法，不止标题，HX里所有可对应tag的markdown语法均支持emmet写法】。仅行首生效\r\n2. 智能双击：双击#号可选中整个标题段落\r\n3. 智能回车：行尾回车或行中Ctrl+Enter强制换行后会自动在下一行补#\r\n4. 回车后再次按Tab可递进一层标题，再按Tab切换列表符\r\n5. 在# 后回车，可上插一个空标题行【同word】，任意位置按Ctrl+Shift+Enter也可以\r\n\r\n\r\n- 折叠：点标题前的-号可折叠该标题段落，快捷键是Alt+-（展开折叠是Alt+=）\r\n- 折叠：多层折叠时折叠或展开子节点，快捷键是Alt+Shift+-或=\r\n\r\n\r\n**加粗** 【快捷键：Ctrl+B，支持多光标；Emmet：b后敲Tab】\r\n\r\n_倾斜_【Emmet：i后敲Tab；前后包围：选中文字按Ctrl+\\是在选区两侧添加光标，可以继续输入_】\r\n\r\n~~删除线~~【前后包围：选中文字按Ctrl+\\是在选区两侧添加光标，可以继续输入~~，会在2侧同时输入】\r\n\r\n> 引用\r\n\r\n\r\n[超链接](https://dcloud.io)\r\n\r\n![logo](https://img-cdn-qiniu.dcloud.net.cn/newpage/images/logo4.png)\r\n\r\n\r\n",showCancel:!1,confirmColor:"#707070"})},getCursor:function(t){},prompt:function(){this.$refs.prompt.show()},onConfirm:function(n){console.log(n," at components\\ly-markdown\\ly-markdown.vue:240");var e=n;if(""==e)return console.log("你还未输入"," at components\\ly-markdown\\ly-markdown.vue:243"),void t.showToast({title:"你还未输入",icon:"loading",position:"top"});this.$refs.prompt.hide(),console.log("标题：",e,"内容：",this.textareaData," at components\\ly-markdown\\ly-markdown.vue:252");var a=t.getStorageSync("detail");t.uploadFile({url:o.default.requestIp+"note/newBuiltNoteReplace",filePath:"",header:{token:t.getStorageSync("token")},name:"",formData:{noteUrl:this.textareaData,noteUserAccount:a.account,noteTitle:e,noteType:"md文件"},success:function(n){200===JSON.parse(n.data).status&&(console.log("sadasdasdasdasdasdasdas"," at components\\ly-markdown\\ly-markdown.vue:269"),t.showModal({title:"提示",content:"保存并退出?",cancelText:"仅保存",confirmColor:"#707070",success:function(n){n.confirm&&t.navigateBack({delta:1})}}))},fail:function(t){console.log(t.data," at components\\ly-markdown\\ly-markdown.vue:286")}}),c=!0,u=this.textareaData.length,console.log(u," at components\\ly-markdown\\ly-markdown.vue:291")},onCancel:function(){this.$refs.prompt.hide(),this.$refs.prompt.cost=""}},watch:{textareaDataSync:function(t,n){this.textareaHtmlSync=(0,a.default)(t),this.$emit("update:textareaData",t),this.$emit("update:textareaHtml",this.textareaHtmlSync)}},created:function(){this.textareaDataSync=this.textareaData,this.textareaHtmlSync=this.textareaHtml},mounted:function(){var n=this;t.getSystemInfo({success:function(t){n.screenHeight=t.screenHeight}})}};n.default=l}).call(this,e("6e42")["default"])},ec93:function(t,n,e){"use strict";var a=e("f7b1"),r=e.n(a);r.a},f7b1:function(t,n,e){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/ly-markdown/ly-markdown-create-component',
    {
        'components/ly-markdown/ly-markdown-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("94d4"))
        })
    },
    [['components/ly-markdown/ly-markdown-create-component']]
]);                