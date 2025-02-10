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
		<div class="section">
			<div class="tuwenpage">
				<div class="tuwenTitle">{{ tuwenOption.title }}</div>
				<div class="tuwenPublishTime">发表时间：{{ tuwenOption.publish_date }}</div>
				<video v-if="wuwenerjiOption.type == '视频'" :poster="tuwenOption.path8" x5-video-player-type="h5" controls=""
					id="myvideo" preload="none" controlslist="nodownload" :src="tuwenOption.path">
				</video>
				<img class="tuwenImg" v-if="(tuwenOption.path8) && (wuwenerjiOption.type != '视频')"
					:src="tuwenOption.path8" />
				<p v-html="tuwenOption.article_content"></p>
			</div>
		</div>
	</div>
</template>

<script>
import {
	getDetail,
	getJ,
} from "@/api/area/history.js";
export default {
	name: "index",
	data() {
		return {
			slideList: [],
			slideIndex: 0,
			tuwenTitle: '23423423423',
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
		async toGetDetail() {
			const retDsgetDetail = await getDetail()
			this.slideList = retDsgetDetail.data;
			const firstData = retDsgetDetail.data[0]
			this.wuwenerjiOption = firstData
			if (firstData.type == '图文') {
				const retFirstJJ = await getJ('/ds/getJJ' + firstData.f2.replace('_wurq', ''))
				this.alideList = retFirstJJ.data
				this.alideIndex = 0
				if (retFirstJJ.data[0].path8) {
					retFirstJJ.data[0].path8 = 'https://d.sxhlsc.com' + retFirstJJ.data[0].path8
				}
				this.tuwenOption = retFirstJJ.data[0]
			}
		},
		async bindSlide(item, index) {
			this.slideIndex = index
			this.alideIndex = 0
			this.wuwenerjiOption = item
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

<style scoped>
* {
	margin: 0;
	padding: 0;
	background: none;
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