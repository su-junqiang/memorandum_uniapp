(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/cmd-avatar/cmd-avatar"],{"254d":function(t,e,n){"use strict";n.r(e);var i=n("f1fa"),c=n("a4ab");for(var a in c)"default"!==a&&function(t){n.d(e,t,function(){return c[t]})}(a);n("ebf7");var u=n("2877"),r=Object(u["a"])(c["default"],i["a"],i["b"],!1,null,null,null);e["default"]=r.exports},"31fd":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=function(){return n.e("components/cmd-icon/cmd-icon").then(n.bind(null,"442d"))},c={name:"cmd-avatar",components:{cmdIcon:i},props:{size:{validator:function(t){return"number"===typeof t||["sm","lg","md"].includes(t)},default:"md"},shape:{validator:function(t){return["circle","square"].includes(t)},default:"circle"},make:{type:Object,default:function(){return{color:""}}},src:{type:String,default:""},icon:{type:String,default:""},text:{type:[String,Number],default:""}},computed:{setShapeSizeClass:function(){var t=[];return["circle","square"].includes(this.shape)&&t.push("cmd-avatar-".concat(this.shape)),["sm","lg","md"].includes(this.size)&&t.push("cmd-avatar-".concat(this.size)),t},setNumSizeStyle:function(){return"number"===typeof this.size?"width:".concat(this.size,"px;")+"height:".concat(this.size,"px;")+"font-size:".concat(this.size/2,"px;")+"line-height:".concat(this.size,"px;"):""},setIconTextStyle:function(){var t="";for(var e in this.make)t+="".concat(e,":").concat(this.make[e],";");return t},setIconSize:function(){return"number"===typeof this.size?this.size/2:"sm"===this.size?t.upx2px(64)/2:"lg"===this.size?t.upx2px(128)/2:t.upx2px(96)/2}},methods:{$_imageLoad:function(t){this.$emit("load",t)},$_imageError:function(t){this.$emit("error",t)},$_click:function(t){this.$emit("click",t)}}};e.default=c}).call(this,n("6e42")["default"])},"534f":function(t,e,n){},a4ab:function(t,e,n){"use strict";n.r(e);var i=n("31fd"),c=n.n(i);for(var a in i)"default"!==a&&function(t){n.d(e,t,function(){return i[t]})}(a);e["default"]=c.a},ebf7:function(t,e,n){"use strict";var i=n("534f"),c=n.n(i);c.a},f1fa:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement;t._self._c},c=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return c})}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/cmd-avatar/cmd-avatar-create-component',
    {
        'components/cmd-avatar/cmd-avatar-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("254d"))
        })
    },
    [['components/cmd-avatar/cmd-avatar-create-component']]
]);                