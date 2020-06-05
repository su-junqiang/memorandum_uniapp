<template>
	<view>
		<mescroll-top v-model="isShowToTop"  :option="mescroll.optUp.toTop" @click="toTopClick"></mescroll-top>
	</view>
</template>

<script>
	import MescrollTop from '@/components/mescroll-uni/components/mescroll-top.vue';
	import GlobalOption from '@/components/mescroll-uni/mescroll-uni-option.js';
	import MeScroll from '@/components/mescroll-uni/mescroll-uni.js';
	export default {
		components: {
			MescrollTop
		},
		data() {
			return {
				mescroll: {optDown:{},optUp:{}},
				isShowToTop: false, 
			}
		},
		mounted () {//给window添加一个滚动滚动监听事件
		  window.addEventListener('scroll', this.handleScroll)
		},
		methods: {
			top(){
				let vm = this;
				let diyOption = {};
				MeScroll.extend(diyOption, GlobalOption); // 混入全局的配置
				let myOption = {} // 深拷贝,避免对props的影响
				MeScroll.extend(myOption, diyOption); 
				// 初始化MeScroll对象
				vm.mescroll = new MeScroll(myOption, true); // 传入true,标记body为滚动区域
				// init回调mescroll对象
				vm.$emit('init', vm.mescroll);
				// 设置高度
				const sys = uni.getSystemInfoSync();
				if (sys.windowHeight) vm.windowHeight = sys.windowHeight;
				if (sys.statusBarHeight) vm.statusBarHeight = sys.statusBarHeight;
				// 使down的bottomOffset生效
				vm.mescroll.setBodyHeight(sys.windowHeight);
				// mescroll-body在Android小程序下拉会卡顿,无法像mescroll-uni那样通过设置"disableScroll":true解决,只能用动画过渡缓解
				// #ifdef MP
				if(sys.platform == "android") vm.downTransition = 'transform 200ms'
				// #endif
				
				// 因为使用的是page的scroll,这里需自定义scrollTo
				vm.mescroll.resetScrollTo((y, t) => {
					uni.pageScrollTo({
						scrollTop: y,
						duration: t
					})
				});
				
				// 具体的界面如果不配置up.toTop.safearea,则取本vue的safearea值
				if(sys.platform == "ios"){
					vm.isSafearea = vm.safearea;
					if (vm.up && vm.up.toTop && vm.up.toTop.safearea != null) {} else {
						vm.mescroll.optUp.toTop.safearea = vm.safearea;
					}
				}else{
					vm.isSafearea = false
					vm.mescroll.optUp.toTop.safearea = false
				}
			},
			handleScroll () { //改变元素#searchBar的top值
			    var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
			   if(scrollTop>100){
				  this.isShowToTop=true;
			   }else{
				   this.isShowToTop=false;
			   }
			   this.top()
			  },
			toTopClick() {
				this.top()
				this.mescroll.scrollTo(0, this.mescroll.optUp.toTop.duration); // 执行回到顶部
				this.$emit('topclick', this.mescroll); // 派发点击回到顶部按钮的回调
			},
		}
	}
</script>

<style>

</style>
