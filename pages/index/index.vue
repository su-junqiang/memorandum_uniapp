<template>
	<view>
		<!-- 文章内容区 -->
		<mescroll-body ref="mescrollRef" @down="downCallback" @up="upCallback"  :up="upOption">
			<view class="grace-news-list" style="width:94%; padding:5px 3%;">
				<block v-for="(item, index) in artList" :key="index">
					<view class="card">
						<uni-swipe-action >
							<uni-swipe-action-item :options="options" @click="bindClick" @change="clickNote(item.note.noteId)" :autoClose="autoClose">
								<uni-card :is-full="true" :is-shadow='false' @click="mdDetail(item.note)" :title="item.note.noteTitle" :extra="item.note.createTime"
								 :note="item.note.noteType" thumbnail="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wAARCAFrAWsDASIAAhEBAxEB/8QAGwABAAMBAQEBAAAAAAAAAAAAAAIDBAEHBgX/xAA+EAACAQICBwUGBQMDBAMAAAAAAQIDEQRRBRIhMUFxkQYTMmGhByIzgbHBFEJSctEjNGIVQ+EkJYKiRFOS/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APTgAAAAAAAAAAAAAAAAAAAAAAAAAAAAADYRckvPkBIFbm/JcyLmnxb5AWto45Lgrld290X0sLTfBLmwJOTzSOXzd+Y1Xxl0Q1Y8W3zYHHJLe0jmsnuu+SJWgtyR3WWYEfee6L+Y1Zvil6ktZeb+Qu+EX0A5qZyfyGpFcL82d95/lfzYtPJdQCSW5JHRqyzQ1ZfqXQCM1eDtvtcnTd4JnNR/qYhT1VbWbXmBMEJWinLa7eZKLukwOgAAAAAAAAAAAAAONpbxdAdBy6tcX8n0A6CN3usxeV92wCQI+9wSHveSAkCNm/zegUc22BIEdW3Fv5jVWQHXJLe11IurBcSWqsl0CSW5WArda/hi352Oa1R7otehcAKdWo+CQ1JcdvNlwAqVPyj9SSg80uSJgCOo+MmNRZvqSAEdSPmNSOSO3WaDlFcUA1Vkugskc7yGaOd7HNgTBW6q4Js53q4RfUC0FXevgkc72WSQFwKHUln6HNeebA0AzuUnvb6ltJ3grsBVV6Ul5M7Td4IS2xa8iNH4a5AWAAAAADdiKesrpq1zr3Mrw/hkspMCeq/1eg1d/vMkAI6qvx6ndVZXDa4tHHOK4oDqSyO2I95HM53sfPoBMFbqrJnO+yj6gWgp715IOrLy6AXAodSefoc15fqYGgGdyb3t9SNwNLaW9jWjmupmAGjvIric72PmUAC7vVkzjq5L1KgBa6r4JdTjqy8isAT7yWfocc5ZsiAJaze9vqcvfizgAAAAAAAAAAAAAABdR8HzKS6jufMCwqoX1LPgWlVHZrK1rNgWgAAAAK3dp3fREMPsdT932LHuK6GypUXJgXmaXifM0mea998wIgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABbRe1oqLKPifIC4qp/EnzLStfGks0mBYAAAAArTuk1xVyFP+4ks4p+ooO9GDyVumw5HZil5xA0FFTxsvKKvj5oCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATpP31yIEqfxEBoK3src0WFctlaLzVgLAAAAAGbDP3ZRyk/U69mJg87r0I0dlepHNJkqmytTfnYDQU1vEn5FxVW4MCoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJQ2TXMidTs0/MDSV1PiQ+ZYV1t8OYFgAAAADJ4cTF5ponX2OLykvqQrvVlCWTTJ4hf075MDQV1l7q5lhXVXufMCkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADTSu00s2ABlxOk9H4RN4nG4elbbaVRJ9L3PwK3bvRUdIUcLQjUrU5zUZ117sI3drpPa/PcB9SB6+YAAAAAAAAAAADStyIVvAn5onHwrkQrbKb8mn6gTW46cj4UdAAADLiFem7cDtR62HTzSfoE9ais7WfNHKbvhUuKuugGiDvCLzSOVfhsUXejDkjs17j5AZwAAAAAAAAAAAAEK1alh6bqV6sKdNWTlOSSV/NkYYrDVFeniKM0+Maif3PxO3dLvOyeK2X1JQl0kv5PJEknsST8lYD3h1aaV3Uppec1/JTU0jgKV+8xuGhbOrFfc8Obb3tvmxGOs7QgpN8ErsD2ep2j0JS8elcL8p3+hlqdsez9O//cFP9tOT+x5bS0XpGt8HAYqfKjL+DZS7L6eq21dF4hJ8ZJRXqwPvKnb3QUPDLFT/AG0bfVmWp7RNGxv3eCxc+eqvufM0uw+n6m/D0qa/zrJfS5h052fxuglQ/GypN103FU5N2ta920swPqqntHgvhaKk/wB1ZL6Iy1faNjX8LR2Gj+6cn/B8UfudlNB0dO4+thq+IqUVTp94nBJt7UrbeYG+p7QNNSvqU8HT5U2/qzLU7bdoKl7YyEF/jSivsfVQ9nmiUvfxWMm/KUV9jRDsHoKNrwxMrZ1mr9EB8HU7Uaeq31tKYhftaX0Rgr4/G4hv8Ri8RUvv1qja6XPVIdjez8Gn/p6k/wDKpN/c0Q7MaBgrLRWG+cW/qwPG7K97bc7Bq+x8T2Sp2Y0FUVpaKw6T4xi0+qZ8z2i7C0qeGnidCuopwTlLDyetrJb9V77+T3gfT9mMd/qPZ7B4hu81BQqfujsf0T+Z+qfCezLHN08bo+b2xarQTyex+tj7sAAAAAAAAAAANEPAuRyr8OXIUvAjs1eLWaYCm7wTJFdHbTTLAAAAywVnUh53X0OUfDVhk79UTmtWunwexkIbMRJZx+jAuw22jHyuvUsl4WVYZ/02spNFwGUAAAAAAAAAAAAB+Z2mpd/2a0jTtdvDya5rb9jyjQmiMVpvHLDYRJWWtOpLwwjm/suJ7Li6SrYOvSe6dOUeqaPkvZnSjDQ+LqWWvLEKDfFpRVl6sDbozsRofBRi8RTeMqrfKs/dv5RWzrc+goYXDYeKjh8PRpRW5Qgl9EWgDt3m+pwAAfEe0+nfB6PqW3VZxvzSf2Ptz5L2k09bQFCdvBiV6poDzI+q9nVTV7SuF/Hh5rpZ/Y+VPoOwtTu+1mDV7a6nHrF/wB60AgAAAAAAfMU9A18D23hpPA04rBYiEu/SaWpJrbZcU2k1bjc+nAAAAAAAAAAAAC6k7w+ZNkKL2PmWAVYf4aWWwtKcPsUlfdJ/UuAAACnEL3VJb07lU2lXpyW57OqNNRXg0Y5u1GL4wdn8mBfh9muspfYvKKGypUXJl4GZqza8zh2fjfM4AAAAAAAAAAAAzYDR+E0bRlRwVFUqc5upJJt3k972/Q0gAAAAAAHzfb+nr9lazt4KlOXrb7n0h+L2yp952U0grXtTUukkwPHz9bspU7vtRo2V7Lv0uqa+5+Sa9EVO60xgan6cRB/+yA9vB17G1k2cAAAAAAAAAAAAAAAAAAAC2jx+RaU0X7z5FwGeg/61aOUr+hoMkHq6QqR4NJrp/wAGsAAABjqKzqQzV0bDPiFacZZ7GBHCu8r5xTNRiwjtU1eKTXrc2gUVPGyBOr4/kQAAAAAAAAAAAAAAAAAAAAfn9oKfe9ntI0+Lw87dG/sfoFWLh3mDr0/105rqmB4SndJk6UtStTn+mafRpkErJJ8FYN2Ta4ID3tNSSkuKT6gowFTvdHYWp+qjB9YovAAAAAAAAAAAAAAAAAAACdJ+/wA0XlFN++i8DFW9zHwlnFJ9WbUY8Yv61NrftX3NVN60E/ICQAAFWIjrU3mi05JXi0Bhw7/6v9yv1X/BvPzafu42C82vuvufpAU1vEuRWW1uDKgAAAAAAAAAAAAAAAAAAABq6tnsB1OzT80B4RiId3ia0P0VJLo2iu100bdN0+605j6e7VxE16tmLiB7R2cqd72c0dO974eC6K32P0j8PsVU7zsngH+mEo9JNH7gAAAAAAAAAAAAAAAAAAASg7TXM0GZbGuZpAy41bIPJ3LaL2NZbiOJV4Jef2OUJeF5oDQAAAAA/NxX9PHUpbk5r6/8n6R+dpZWpxqL8rT9T9ECusti5lJfV8BQAAAAAAAAAAAAAAAAAAAAAAeO9rqfddqtIxzra3VJ/c/HPou3tPu+1mJf64U5f+qX2PnQPVPZ7U1+y0I38FapH1T+59MfH+zSpraDxNO+2GIb6xX8H2AAAAAAAAAAAAAAAAAAAADUtxlNMdsVyArxHw08mmU09ia/TIurq9KXy+pVFXqSXCSTA0p3VzpCk7wRMAAAMukIa2En5Jsvou9KDzin6HK8dajJZo5hv7an+1ASq+BlBomvcfIzgAAAAAAAAAAAAAAAAAAAAAHmPtIp6vaKnP8AXh4vo2j5M+29p1O2kMBUtslRlG/KV/ufEgegezCpehpGlfdKnLqmj7o879mNRLSGPpX2yowklydvueiAAAAAAAAAAAAAAAAAAAANEPAuRnL6XgQCqr0pLyZRe0qbzVjRJXg15Myv4MHk0Bopu0ms3csKE7Si81YvAAACM1eD5FeG2UIrK69S17irD7INf5MC2XhfIzGp7UZQAAAAAAAAAAAAAAAAAAAAAD4X2nwvS0dUtulUjf5Jnn56R7TIX0Rg58Y4hrrF/wAHm4H1fs4qavaScOE8PJdGmennknYar3fazBq9lNTh1i/4PWwAAAAAAAAAAAAAAAAAAAF9J3gUF1F7HzAsMqV8PJZfZmoz0lfXi82gF7001wsy+LukZ6O2CT5MlGerFJvcBeAAOPcyqhsdTnf0Liml8WouTAuMz2NrzNJnmrTfMCIAAAAAAAAAAAAAAAAAAAAD5P2kRv2dpPLEw9UzzE9P9o7S7NwXF4mNujPMAP0ez1f8P2h0fWbso4iCfJuz+p7S1ZtZOx4PCo6VSNSPig1Jc07/AGPc8JXjisJRxMHeNWnGafNJgWgAAAAAAAAAAAAAAAAAAW0XvRUWUfE+QFxRDZVqLzuXlC/uJrNJ+gEYbKk45O6+pJwu7pehF7K780mWbQLQAAKYf3EuX3Lin/5K2b0wLiiovfZeUVV7/wAgIAAAAAAAAAAAAAAAAAAALO17M/L05hdL4qnSWh9I08G033jlC7kna1nZ2ttPwK3ZDTWN2Y/tHUmnvilJrpdID8/2i6Zw+KdDRuFqRqd1N1K0ou6TtZK/F7W2fEHotH2c4KNu+0jiJ5qMIx+tzfR7B6Cp7akMRVf+VZpdEkB5XY+47I9sMLgNHR0fpRzhGldUqsYuS1W72aW1W22eR9LHsd2fi7/6dF86kn9y2HZXQEd2i8O+ab+4HcH2n0JjsVTwuFx0J1qrtCLg028tqP1zHhdE6NwdRVMLgMPRmt0o00muT3mwAAAAAAAAAAAAAAAAATpeP5ECdN++gLyh/wBxziXlFTZXjyf1A5V2VIS5omRrr+mnk0zqewC4AACmWyvF57PQuKqmypB+YFpTWXvJ+RcVVuDAqAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACUHaa5kTqdpJ+YGkprbKkHzRcU4j8jyl9gO1FrU5LNMrhL3FtLltRj1tX3cgN4AAFVbfF5NMtKsR4FzAtK6y2LmTW3aQq+D5gUgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA1FWI+Gnk0WR2xTK8R8KXlZ+oHVuRlqwfeytfeao7YoOmpO74gWAAAV11em7bywhVV6bAlF3in5I5U8DOUnelF+SOzXuPkBnAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA7Z5PoBwElGT4PoNST4MCIJqlLJdTqpSzQFYLe6ea6He6Wb6AUguVKKzO91HJgdh4FyOVlelNeTJJJKy4Eaq1qUovjFoCuNSnGC15xWzi0c/E0f/s9H/BVh8HTVNOybtvNH4eGSAtAAAjNXg+RI5LwsCFB3pL5/UnLwteRXh37jWUmi17gMoAAAHbN7k+gHAS1ZPg+h3Uk+AEATVKWS6nVSeaArBb3T4v0OqkuLYFILlSjm+p1U4rh6gUA0akckdUVkugGY7ZvcmaLLJHQM+rJ8H0GpLJmgAUd1LJdTvdSzRcAKlSfFrodVJZssAFfdR8zvdRyZMi5wjvnFc2A1Irgjuqsl0K3iKK31YdUQeMoLZ3qb8k2BfZeR0zPG0eDk+UWceNjwpzfyA1AyPGSfhoyfN2Ofiaz3UUubA2Ax97inuhBdWL4t/mivkBsBj1MU99ZpeSSH4es99afVgbDjlFb5JfMyfgr+KcnzbOrA0+KvzAvdelHfVgreZH8TQexVE31IrCU1wRJYenF3SQEqF+7Vyw4kkrI6AAAA49zOgCmhvmsmXFNJWqVPOzJupBb5xXNoDupHJHVFZLoVvE0ErutD/8ASIPGYdf7qfJMDRZAy/jqGcnyizn46H5adR/IDWDH+Nm92Hk+bSI/isQ91GPzkBuBhdfFvdGmvk2L4x/niv8AxQG4GDu8VLfXkuSSDw9Vq861S3nKwG8i5RW+SXNn5sqVCPjrpvJzuQf4Vbozm/KP8gfpOvRjvqwX/kiDxmHX+6n8mzAnfwYZLJyf8HXTrtXfdwWdvuwNv46hwcnyiyEtIU4q+rP5pL6swuCeyVec3lHd/AWFUn7tG/nJ3A0S0vSWxQbfk7/QpnpmS8OHa/dKxZDASl4nZZRVi+no6jHa4pvNgfnS0xjZ7KOHhzs3/BxYjTVXc6dNPKF36n7cKFOKsoroTSS3ID8aGG0rUs6mNmv2pL7Fy0fiJfExdZ5++19D9QAfnLRsfzTlJ+cmy2Oj6Mfyo2ADMsHSW6K6E1hqa4IuAFaowXBElTguCJACKjFcEdssjoAWWQAAAAAAAAAAAAAAAAAApq4eNXeVPA07O6T5msAYKGFppSVldPLMvWHprcjtL4k/kWflYFaowXBElTiluR+fisVXg7RqNckZ41J1PiTlLmwP1pSo0/HOC5tFTxmHW6Tk/wDFNmWnSp7PcRpp04fpQEXjb+ChN+baRzv8VLwwhBcm2aIwjkiSSAy6mKn4q0l5RVjiwSltnJy822zRXk4U7xdnYwKc6tVxqSclfcwL3TwtLY5Rvktr9DqqR3U6Lfm9hOjThZe6jVCEUtyAyKGInxUF5LaSWDTd6jcnm3c2ACqFCEdyRYopbkjoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//Z">
									{{item.note.noteKeyWords}}...
								</uni-card>
							</uni-swipe-action-item>
						</uni-swipe-action>
					</view>
				</block>
			</view>
		</mescroll-body>
		<!-- <uni-fab :pattern="pattern" :content="content" :horizontal="horizontal" :vertical="vertical" :direction="direction"
		 @trigger="trigger" ref="fab"></uni-fab> -->
		 <fab></fab>
	</view>
</template>
<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import uniIcon from '@/components/uni-icon/uni-icon.vue';
	// import uniFab from '@/components/uni-fab/uni-fab.vue';
	import fab from '@/pages/index/fab/fab.vue'
	import App from '../../App.vue'
	import uniCard from "@/components/uni-card/uni-card.vue"
	import uniSwipeAction from "@/components/uni-swipe-action/uni-swipe-action.vue"
	import uniSwipeActionItem from '@/components/uni-swipe-action-item/uni-swipe-action-item.vue'
	import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"; // 注意.vue后缀不能省

	export default {
		mixins: [MescrollMixin],
		components: {
			uniCard,
			uniSwipeAction,
			uniSwipeActionItem,
			fab,
			// uniFab,
			uniIcon,
			MescrollBody
		},
		data() {
			return {
				autoClose:true,
				downOption: { 
					},
               upOption: {
						page: {
							size: 10 // 每页数据的数量,默认10
						},
						noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
						empty: {
							tip: '暂无相关数据'
						}
					},
				noteId: '',
				top: 0,
				//演示文章数据
				artList: [],
				currentPage: 0,
				count: -1,
				skip: 0,
				limit: 5,
				options: [{
					text: '编辑',
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
				
			};
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
			
			downCallback(page) {
			
				// 第1种: 下拉刷新和上拉加载调同样的接口, 那么不用第1种方式, 直接mescroll.resetUpScroll()即可
				this.upCallback(page); // 重置列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
				// 第2种: 下拉刷新什么也不处理, 可直接调用或者延时一会调用 mescroll.endSuccess() 结束即可
				// this.mescroll.endSuccess()
			},
			/*上拉加载的回调*/
			upCallback(page) {
				let info = uni.getStorageSync("detail")
				let pageNum = page.num; // 页码, 默认从1开始
				let pageSize = page.size; // 页长, 默认每页10条
				console.log(pageNum* pageSize)
				uni.request({
					url: App.requestIp + "note/selectNoteByUserAccount/" + info.account + '/' +
								0+ '/' + 0,
							method: "GET",
							header: {
								token: uni.getStorageSync('token')
							},
					success: (data) => {
						// 接口返回的当前页数据列表 (数组)
						let curPageData = data.data.result;
						// 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
						let curPageLen = curPageData.length;
						// 接口返回的总数据量(如列表有26个数据,每页10条,共3页; 则totalSize=26)
						let totalSize = data.data.total;
						console.log(curPageData,curPageLen,totalSize)
						//设置列表数据
						if (page.num == 1) this.artList  = []; //如果是第一页需手动置空列表
						this.artList  = this.artList .concat(curPageData); //
						this.mescroll.endSuccess(curPageLen,false)
					},
					fail: () => {
						//  请求失败,隐藏加载状态
						this.mescroll.endErr()
					}
				})
			},
			clickNote(noteId) {
				this.noteId = noteId
			},
			bindClick(value) {

				console.log(value)
				if (value.index == 0) {
					setTimeout(() => {
						uni.navigateTo({
							url: '/pages/index/editNote?noteId=' + this.noteId
						})
					}, 100)
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
							this.artList.splice(this.artList.findIndex(item => item.note.noteId === this.noteId), 1)
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
