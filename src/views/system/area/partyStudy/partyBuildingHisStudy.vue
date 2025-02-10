<template>
	<div class="app-container">
		<div class="slide">
			<p v-for="(item, index) in slideList" @click="bindSlide(item, index)"
				:style="[{ color: (slideIndex == index ? '#fff' : '#333333') }, { background: (slideIndex == index ? '#D90915' : '#FFFFFF') }]">
				{{ item.f3 }}</p>
		</div>
		<div class="alide">
			<h1 @click="bindBacka"><img src="../../../../assets/images/back.png" />{{ wuwenerjiOption.f3 }}</h1>
			<p v-for="(item, index) in alideList" @click="bindAlide(item, index)"
				:style="[{ color: (alideIndex == index ? '#fff' : '#333333') }, { background: (alideIndex == index ? '#D90915' : '#F8F8F8') }]">
				{{ item.short_title }}</p>
		</div>
		<div class="section" :style="swiperBg">
			<h1 class="swiper_title"><img src="../../../../assets/images/ds_study_white.png" style="width:15px;" />
				{{ swipertitle }}</h1>
			<div class="tuwenpage" v-if="!isSwiper" :style="tuwenpageStyle">
				<div class="tuwenTitle" v-if="tuwenOption.title">{{ tuwenOption.title }}</div>
				<div class="tuwenPublishTime" v-if="tuwenOption.publish_date">发表时间：{{ tuwenOption.publish_date }}{{
					wuwenerjiOption.type }}</div>
				<video v-show="wuwenerjiOption.type == '视频'" :poster="tuwenOption.path8" x5-video-player-type="h5"
					controls="" id="myvideo" preload="none" controlslist="nodownload" :src="tuwenOption.path">
				</video>
				<img class="tuwenImg" v-if="(tuwenOption.path8) && (wuwenerjiOption.type != '视频')"
					:src="tuwenOption.path8" />
				<p v-html="tuwenOption.article_content"></p>
			</div>
			<div class="swiper mySwiper" ref="mySwiper" v-show="isSwiper">
				<el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="90%" :modal="false"
					:modal-append-to-body="false" :show-close="false" custom-class="mydialog" top="15vh">
					<el-row :gutter="20">
						<el-col :span="12">
							<img :src="dialogPath" style=" width: 100%; border-radius: 10px;" />
						</el-col>
						<el-col :span="12">
							<div style="text-align: left;color: #333333;line-height: 20px;">
								{{ dialogArticle_content }}
							</div>
						</el-col>
					</el-row>
					<span slot="footer">
						<el-button @click="dialogVisible = false" round type="danger">关 闭</el-button>
					</span>
				</el-dialog>
				<div class="swiper-wrapper">
					<div class="swiper-slide" v-for="(item, index) in swiperList">
						<div style="width: 100%; text-align: center;" @click="openDialog(item)">
							<div
								style="border-radius: 10px 10px 10px 10px;width: 373px; background-color: white ; margin-left: 50%; transform: translateX(-50%); text-align: center ; display: block;padding: 0px 10px 20px 10px; borderRadius: 10;">
								<div
									style="background-color: #FFA700 ;border-radius: 10px 10px 0px 0px;width: 393px;margin-left: -10px ;height: 50px; zIndex: 10; ">
								</div>
								<div style="font-weight: bold;font-size: 20px; margin-top: -35px; color: #D40915;">
									【{{ item.date }}】
								</div>
								<img :src="item.path3"
									style="width: 353px; height: 200px; margin-top: 25px;border-radius: 10px;" />
								<div style="margin-left: 10px;font-size: 20px; text-align:left ; margin-top: 20px; ">
									{{ item.title }}
								</div>
								<div class="article_content">
									{{ item.article_content }}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {
	getApplymenu,
	getJ,
} from "@/api/area/history.js";
import Swiper from 'swiper';
import SwiperCore, {
	Navigation,
	Pagination,
	EffectCreative,
	Autoplay,
} from 'swiper';
import 'swiper/swiper-bundle.css';

SwiperCore.use([Autoplay]);
var mySwiperCore = {}

export default {
	name: "index",
	components: {
	},
	data() {
		return {
			isSwiper: false,
			dialogVisible: false,
			tuwenpageStyle: "",
			swipertitle: "",
			dialogPath: "",
			dialogArticle_content: "",
			swiperBg: 'background-repeat: repeat-x; background-size: 100% 100%; background-image:' + 'url("' + require('@/assets/images/swiperBg.png') + '")',
			slideList: [],
			swiperList: [],
			slideIndex: 0,
			dialogTitle: '',
			tuwenTitle: '',
			wuwenerjiOption: {
				type: '',
				f3: '',
			},
			tuwenOption: {},
			slideTitle: "",
			alideTotal: 1,
			alideList: [],
			alideIndex: 0,
			alideTitle: "",
			itemIndex: 0,
			detailId: ""
		};
	},
	mounted() {
		//更改导航栏字体颜色
		let barListItem = document.getElementsByClassName('alignment')
		barListItem = Array.from(barListItem);
		barListItem.forEach(function (item) {
			item.style.color = 'rgb(90, 94, 102)'
		})
		//更改背景图
		let itemList = document.getElementsByClassName('main-box')
		itemList = Array.from(itemList);
		itemList.forEach(function (item) {
			item.style.background = 'white';
		})
		//更改小箭头
		let icon = document.getElementsByClassName('leftIcon')
		icon = Array.from(icon);
		icon.forEach(function (item) {
			item.style.background = 'white'
		})
		this.toGetDetail()
	},
	methods: {
		openDialog(item) {
			this.dialogTitle = '【' + item.date + '】' + item.title
			this.dialogPath = item.path3
			this.dialogArticle_content = item.article_content
			this.dialogVisible = true
		},
		onSwiper: (swiper) => {
			console.log(swiper);
		},
		onSlideChange: () => {
			console.log('slide change');
		},
		async toGetDetail() {
			const newSlideList = []
			const newSlideMap = {}
			const retDsgetDetail = await getApplymenu()
			const getListByPIdAndOrganizationret = await getJ('/ds/getListByPIdAndOrganization')
			for (let i = 0; i < retDsgetDetail.data.length; i++) {
				newSlideMap[retDsgetDetail.data[i].f3] = retDsgetDetail.data[i]
			}
			newSlideList.push(newSlideMap['红色历程'])
			for (let i = 0; i < getListByPIdAndOrganizationret.data.length; i++) {
				let newid = getListByPIdAndOrganizationret.data[i].url.replace('/wit_dskt_', '')
				if (newid == 'xkj') {
					newid = 'sswxkj'
				}
				newSlideList.push({
					f2: 'dsgs',
					f3: getListByPIdAndOrganizationret.data[i].name,
					id: newid,
				})
			}
			newSlideList.push(newSlideMap['历史瞬间'])
			newSlideList.push(newSlideMap['伟大精神'])
			newSlideList.push(newSlideMap['党史研究'])
			newSlideList.push(newSlideMap['红色作品'])
			this.slideList = newSlideList;
			const firstData = retDsgetDetail.data[0]
			this.wuwenerjiOption = firstData
			this.isSwiper = true;
			// 红色历程
			const retFirstJJ = await getJ('/ds/getDxz' + firstData.f2.replace('/wit_time_line', '') + '&key=' + 'p_dsxx_1921_1931')
			const newList = [
				{
					short_title: '信仰的力量 1921年~1931年',
					key: 'p_dsxx_1921_1931'
				}, {
					short_title: '民族的力量 19231年~1945年',
					key: 'p_dsxx_1931_1945'
				}, {
					short_title: '革命的力量 1945年~1949年',
					key: 'p_dsxx_1945_1949'
				}, {
					short_title: '建设的力量 1949年~1978年',
					key: 'p_dsxx_1949_1978'
				}, {
					short_title: '改革的力量 1978年~至今',
					key: 'p_dsxx_1978_2020'
				}
			];
			this.alideList = newList
			this.swiperList = retFirstJJ.data
			this.swipertitle = newList[0].short_title
			this.updatamySwiper()
		},
		updatamySwiper() {
			this.$nextTick(() => {
				mySwiperCore = new Swiper('.mySwiper', {
					effect: 'creative',
					navigation: true,
					initialSlide: 2,
					pagination: {
						el: '.swiper-pagination',
						dynamicBullets: true, //设置小圆点是否要两头小，中间最大
						clickable: true, //设置是否可以点击
					},
					autoplay: {
						delay: 1000
					},
					creativeEffect: {
						prev: {
							//这里是设置当前item的前一项的具体属性
							translate: [-100, 0, 0], //偏移量
							scale: 0.8, //缩放量
							opacity: 0.8, //透明度
							shadow: true, //是否加阴影
						},
						next: {
							//这里是设置当前item的后一项的具体属性，同上面
							translate: [100, 0, 0],
							scale: 0.8,
							opacity: 0.8,
							shadow: true,
						},
						limitProgress: 5, //显示五个堆叠的最重要的这个属性，后面依次以前面属性等比配置
						shadowPerProgress: true, //是否等比配置透明度
					},
					loop: true,
					modules: [Navigation, Pagination, EffectCreative],
				})
			})
		},
		async bindSlide(item, index) {
			this.swiperBg = '';
			this.tuwenpageStyle = '';
			if (this.isSwiper) {
				mySwiperCore.destroy(true, true)
			}
			this.slideIndex = index
			this.alideIndex = 0
			this.wuwenerjiOption = item
			if (item.f2 == 'dsgs') {
				this.tuwenpageStyle = 'background-color: rgba(0,0,0,0)';
				this.swiperBg = 'background-repeat: repeat-x; background-size: 100% 100%; background-image:' + 'url("' + require('@/assets/images/swiperBg.png') + '")';
				this.isSwiper = false;
				const retFirstJJ = await getJ('/ds/getContentListBySectionCode?id=' + item.id)
				const newList = []
				retFirstJJ.data.forEach((k) => {
					newList.push({
						...k,
						type: '视频'
					})
				})
				this.swipertitle = newList[0].short_title
				this.wuwenerjiOption = { ...item, type: '视频' }
				this.alideList = newList
				this.tuwenOption = { ...newList[0], title: '', publish_date: '' }
				return
			}
			if (item.f2.indexOf("/wit_wdjs_list") != -1) {
				const retFirstJJ = await getJ('/ds/getContentListBySectionCodeNew' + item.f2.replace('/wit_wdjs_list', ''))
				const newList = []
				retFirstJJ.data.forEach((k) => {
					if (k.type == "png") {
						newList.push({
							...k,
							short_title: k.short_title,
						})
					}
				})
				this.alideList = newList
				this.tuwenOption = newList[0]
			}

			if (item.f2.indexOf("/wit_time_line") != -1) {
				this.swiperBg = 'background-repeat: repeat-x; background-size: 100% 100%; background-image:' + 'url("' + require('@/assets/images/swiperBg.png') + '")';
				this.isSwiper = true;
				// 红色历程
				const retFirstJJ = await getJ('/ds/getDxz' + item.f2.replace('/wit_time_line', '') + '&key=' + 'p_dsxx_1921_1931')
				const newList = [
					{
						short_title: '信仰的力量 1921年~1931年',
						key: 'p_dsxx_1921_1931'
					}, {
						short_title: '民族的力量 19231年~1945年',
						key: 'p_dsxx_1931_1945'
					}, {
						short_title: '革命的力量 1945年~1949年',
						key: 'p_dsxx_1945_1949'
					}, {
						short_title: '建设的力量 1949年~1978年',
						key: 'p_dsxx_1949_1978'
					}, {
						short_title: '改革的力量 1978年~至今',
						key: 'p_dsxx_1978_2020'
					}
				];
				this.swipertitle = newList[0].short_title
				this.alideList = newList
				this.swiperList = retFirstJJ.data
				this.updatamySwiper()
			} else {
				this.isSwiper = false;
			}
			if (item.f2.indexOf("/wit_lssj_list") != -1) {
				// 历史瞬间
				const retFirstJJ = await getJ('/ds/getContentListBySectionCodeLast' + item.f2.replace('/wit_lssj_list', ''))
				const newList = []
				retFirstJJ.data.forEach((k) => {
					newList.push({
						...k,
						short_title: k.title,
						article_content: k.ffilename,
					})
				})
				this.alideList = newList
				this.tuwenOption = newList[0]
			}
			if (item.f2.indexOf("/wit_hszp_list") != -1) {
				// 红色作品
				const retFirstJJ = await getJ('/ds/getDetailListBySectionCode' + item.f2.replace('/wit_hszp_list', ''))
				const newList = []
				retFirstJJ.data.forEach((k) => {
					newList.push({
						...k,
						short_title: k.title,
					})
				})
				this.alideList = newList
				this.tuwenOption = retFirstJJ.data[0]
			}
			if (item.f2.indexOf("/wit_dsyj_list") != -1) {
				// 党史研究
				const retFirstJJ = await getJ('/ds/dsyj' + item.f2.replace('/wit_dsyj_list', ''))
				const newList = []
				retFirstJJ.data.forEach((k) => {
					newList.push({
						...k,
						short_title: k.short_title,
					})
				})
				this.alideList = newList
				this.tuwenOption = retFirstJJ.data[0]
			}
			if (item.type == '图文') {
				const retFirstJJ = await getJ('/ds/getJJ' + item.f2.replace('_wurq', ''))
				this.alideList = retFirstJJ.data
				if (retFirstJJ.data[0].path8) {
					retFirstJJ.data[0].path8 = 'https://d.sxhlsc.com' + retFirstJJ.data[0].path8
				}
				this.tuwenOption = retFirstJJ.data[0]
			}
			if (item.type == '视频') {
				let retFirstJJ = await getJ('/ds/getVideoJ' + item.f2.replace('_wurq', ''))
				retFirstJJ = retFirstJJ.data
				const newList = []
				retFirstJJ.list.forEach((k) => {
					newList.push({
						short_title: k.c2,
						id: k.c1
					})
				})
				this.alideList = newList
				this.tuwenOption = { ...retFirstJJ.firstVideo, }
			}
		},
		async bindAlide(item, index) {
			this.alideIndex = index
			if (this.wuwenerjiOption.f2 == 'dsgs') {
				this.swipertitle = this.alideList[index].short_title
				// 党史课堂
				this.tuwenOption = { ...this.alideList[index], title: '', publish_date: '' }
				return
			}
			if (this.wuwenerjiOption.f2.indexOf("/wit_wdjs_list") != -1) {
				const retFirstJJ = await getJ('/ds/getContentInfo' + this.wuwenerjiOption.f2.replace('/wit_wdjs_list', '') + '&id=' + item.id)
				let option = retFirstJJ.data
				this.tuwenOption = option
			}
			if (this.wuwenerjiOption.f2.indexOf("/wit_time_line") != -1) {
				if (this.isSwiper) {
					mySwiperCore.destroy(true, true)
				}
				const retFirstJJ = await getJ('/ds/getDxz' + this.wuwenerjiOption.f2.replace('/wit_time_line', '') + '&key=' + this.alideList[index].key)
				this.swipertitle = this.alideList[index].short_title
				this.swiperList = retFirstJJ.data
				this.updatamySwiper()
			}
			if (this.wuwenerjiOption.f2.indexOf("/wit_lssj_list") != -1) {
				// 历史瞬间
				console.log(this.alideList[index])
				this.tuwenOption = this.alideList[index]
			}
			if (this.wuwenerjiOption.f2.indexOf("/wit_dsyj_list") != -1) {
				// 党史研究
				this.tuwenOption = this.alideList[index]
			}
			if (this.wuwenerjiOption.f2.indexOf("/wit_hszp_list") != -1) {
				// 红色作品
				this.tuwenOption = this.alideList[index]
			}
			if (this.wuwenerjiOption.type == '图文') {
				const retFirstJJ = await getJ('/ds/getJJdel' + this.wuwenerjiOption.f2.replace('_wurq', '') + '&id=' + item.id)
				let option = retFirstJJ.data
				option = {
					...option,
					article_content: option.content,
					publish_date: option.date
				}
				if (option.img) {
					option = {
						...option,
						...option.img[0],
					}
				}
				this.tuwenOption = option
			}
			if (this.wuwenerjiOption.type == '视频') {
				const retFirstJJ = await getJ('/ds/getVideoOption' + this.wuwenerjiOption.f2.replace('_wurq', '') + '&id=' + item.id)
				let option = retFirstJJ.data
				this.tuwenOption = option
			}

		},
		bindDetail(item, index) {
			this.itemIndex = index
			this.detailId = item.id
		},
		bindAlideb(item, index) {
			this.alideIndex = index
			this.detailId = item.id
		},
		bindBacka() {

		},
		bindBackb() {
			this.detailId = ""
		}
	},
};
</script>
<style>
@media screen and (max-width: 1700px) {
	.mydialog {
		background-color: rgba(255, 255, 255, .95);
		border-radius: 10px;
		box-shadow: 0px 0px 20px 25px rgba(255, 255, 255, .95);
	}

	.el-dialog__title {
		font-weight: bold;
		font-size: 1.4625rem;
	}

	.el-button--medium.is-round {
		padding: 0.625rem 1.25rem;
		background: #D40915;
		color: white;
	}
}
</style>
<style scoped>
* {
	margin: 0;
	padding: 0;
	background: none;
}

.swiper {
	margin-top: 13%;
}

.swiper_title {
	color: white;
	text-align: left;
	font-size: 1.325rem;
	margin-top: -20px;
	font-weight: bold;
}

.slide::-webkit-scrollbar {
	display: none
}

.slide {
	float: left;
	width: auto;
	overflow-y: scroll;
	margin-left: 30px;
	margin-top: 30px;
	overflow-y: scroll;
	height: 876px;
}

.slide p {
	width: 234px;
	height: 80px;
	background: #FFFFFF;
	box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.1);
	border-radius: 20px 20px 20px 20px;
	opacity: 1;
	border: 1px solid #DDDDDD;
	text-align: center;
	line-height: 84px;
	font-size: 22px;
	font-family: PingFang SC-Medium, PingFang SC;
	font-weight: 500;
	margin-bottom: 20px;
}

.alide::-webkit-scrollbar {
	display: none
}

.alide {
	float: left;
	width: 25%;
	height: 876px;
	background: #FFFFFF;
	box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.15);
	border-radius: 20px 20px 20px 20px;
	opacity: 1;
	margin-left: 35px;
	overflow-y: scroll;
	box-sizing: border-box;
	padding: 0 30px;
	margin-top: 30px;
	margin-bottom: 30px;
}

.alide p {
	width: 100%;
	border-radius: 15px;
	text-align: left;
	padding: 10px 20px;
	overflow: hidden;
	margin-bottom: 20px;
}

.article_content {
	color: #666666;
	font-size: 16px;
	line-height: 1.8;
	text-align: justify;
	letter-spacing: 0px;
	min-height: 150px;
	padding: 10px;
}

.tuwenTitle {
	width: 65%;
	font-size: 22px;
	text-align: center;
	font-weight: bold;
	margin-left: 50%;
	transform: translateX(-50%);
}


.tuwenPublishTime {
	color: rgb(153, 153, 153);
	margin-top: 0.625rem;
	font-size: 10px;
	font-weight: 200;
	text-align: center;
	margin-left: 50%;
	transform: translateX(-50%);
}

.tuwenImg {
	border-radius: 10px;
	width: 59%;
	margin-top: 15px;
}

.section video {
	border-radius: 0.625rem;
	width: 96%;
	margin-top: 25px;
}

.alide_d::-webkit-scrollbar {
	display: none
}

.alide_d {
	float: left;
	width: 468px;
	height: 876px;
	background: #FFFFFF;
	box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.15);
	border-radius: 20px 20px 20px 20px;
	opacity: 1;
	margin-left: 35px;
	overflow-y: scroll;
	box-sizing: border-box;
	padding: 0 30px;
	margin-top: 30px;
}

.alide_d p {
	width: 100%;
	height: 84px;
	background: #D90915;
	border-radius: 20px 20px 20px 20px;
	opacity: 1;
	font-size: 16px;
	font-family: PingFang SC-Medium, PingFang SC;
	font-weight: 500;
	color: #333333;
	line-height: 22px;
	box-sizing: border-box;
	padding: 20px;
	overflow: hidden;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	margin-bottom: 20px;
}

.alide h1,
.alide_d h1 {
	line-height: 84px;
	height: 84px;
	font-size: 22px;
	font-family: PingFang SC-Medium, PingFang SC;
	font-weight: 500;
	color: #D90915;
}

.alide h1 img,
.alide_d h1 img {
	width: 26px;
	height: 19px;
	margin-right: 15px;
}


.section::-webkit-scrollbar {
	display: none
}

.section {
	height: 876px;
	width: 53%;
	background: #FFFFFF;
	box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.15);
	border-radius: 20px 20px 20px 20px;
	opacity: 1;
	float: left;
	overflow-y: scroll;
	box-sizing: border-box;
	padding: 3rem 2rem;
	margin-left: 35px;
	margin-top: 30px;
	text-align: center;

}

.tuwenpage {
	background-color: #F8F8F8;
	padding: 2.125rem 1.5rem;
	border-radius: 20px 20px 20px 20px;
}

.section p {
	color: #666666;
	font-size: 14px;
	text-indent: 30px;
	line-height: 1.8;
	margin: 4vh 0;
	text-align: justify;
	letter-spacing: 1px;
}

.sec_a,
.sec_b {
	line-height: 84px;
	height: 84px;
	font-size: 22px;
	font-family: PingFang SC-Medium, PingFang SC;
	font-weight: 500;
	color: #D90915;
	margin-right: 15px;
}

.sec_a img {
	width: 26px;
	height: 19px;
	margin-right: 15px;
}

.sec_b img {
	width: 85px;
	height: 30px;
	float: left;
	margin-top: 27px;
}

.sec_list,
.sec_detail {
	width: 100%;
	height: 762px;
	background: #F8F8F8;
	border-radius: 20px;
	box-sizing: border-box;
	padding: 30px 23px;
}

.sec_list p {
	width: 100%;
	height: 66px;
	background: #FFFFFF;
	border-radius: 33px 33px 33px 33px;
	opacity: 1;
	margin: 0 auto 20px;
	box-sizing: border-box;
	padding: 0 40px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	line-height: 66px;
}
</style>