<!--部件组件-->
<template>
	<div id="partsBox">
		<!--图标和文字-->
		<el-tabs v-model="activeName" tabPosition="right" class="tabRight" @tab-click="handleClick">
			<el-tab-pane name="all">
				<div slot="label" @click="isShow" style="margin-top: 6px">
					<i class="icon-parts-camera iconRight" style="background: #fff"></i>
					<p style="color: #9e25b2">所有部件</p>
				</div>
			</el-tab-pane>
		</el-tabs>
		<!--内容-->
		<div class="contentPosition">
			<!--指向箭头-->
			<div class="arrow"></div>
			<div class="contentRight">
				<div v-if="this.activeName === 'all'">
					<div style="padding: 0 20px">
						<div>
							<p style="font-weight: bold">
								所有部件（{{ this.sum }}）
								<i class="el-icon-d-arrow-right iconArrow" @click="isHidden"
									style="cursor: pointer"></i>
							</p>
						</div>
						<div>
							<div class="peopleBox" :class="tabActive === '摄像头' ? 'isCameraActive' : ''"
								style="background: #e0f4e6" @click="parts('摄像头')">
								<div class="peopleIcon">
									<i class="icon-parts-camera camera"></i>
								</div>
								<div class="peopleContent">
									<p>摄像头({{ this.partsType.camera }})</p>
								</div>
							</div>
							<div class="peopleBox" :class="tabActive === '路灯' ? 'isStreetLightActive' : ''"
								style="background: #ffe7e7" @click="parts('路灯')">
								<div class="peopleIcon">
									<i class="icon-streetlight"></i>
								</div>
								<div class="peopleContent">
									<p>路灯({{ this.partsType.light }})</p>
								</div>
							</div>
							<div class="peopleBox" :class="tabActive === '健身器材' ? 'isEquipmentActive' : ''"
								style="background: #f3e7fa" @click="parts('健身器材')">
								<div class="peopleIcon">
									<i class="icon-equipment"></i>
								</div>
								<div class="peopleContent">
									<p>健身器材({{ this.partsType.fitnessEquipment }})</p>
								</div>
							</div>
							<div class="peopleBox" :class="tabActive === '宣传栏' ? 'isBoardActive' : ''"
								style="background: #ffedd8" @click="parts('宣传栏')">
								<div class="peopleIcon">
									<i class="icon-board"></i>
								</div>
								<div class="peopleContent">
									<p>宣传栏({{ this.partsType.billboard }})</p>
								</div>
							</div>
							<div class="peopleBox" :class="tabActive === '垃圾桶' ? 'isTrashActive' : ''"
								style="background: #e1edf8" @click="parts('垃圾桶')">
								<div class="peopleIcon">
									<i class="icon-trash"></i>
								</div>
								<div class="peopleContent">
									<p>垃圾桶({{ this.partsType.trashCan }})</p>
								</div>
							</div>
							<div class="peopleBox" :class="tabActive === '消防' ? 'isFireActive' : ''"
								style="background: #ffe6d8" @click="parts('消防')">
								<div class="peopleIcon">
									<i class="icon-fire"></i>
								</div>
								<div class="peopleContent">
									<p>消防({{ this.partsType.fireControl }})</p>
								</div>
							</div>
							<div class="peopleBox" :class="tabActive === '井盖' ? 'isCoverActive' : ''"
								style="background: #e9efe0" @click="parts('井盖')">
								<div class="peopleIcon">
									<i class="icon-cover"></i>
								</div>
								<div class="peopleContent">
									<p>井盖({{ this.partsType.ManholeCover }})</p>
								</div>
							</div>
							<div class="peopleBox" :class="tabActive === '其他' ? 'isOtherActive' : ''"
								style="background: #ebebeb" @click="parts('其他')">
								<div class="peopleIcon">
									<i class="icon-other"></i>
								</div>
								<div class="peopleContent">
									<p>其他({{ this.partsType.other }})</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div v-if="this.activeName === 'search'">
					<div style="padding: 0 20px">
						<div>
							<p style="font-weight: bold">
								搜索
								<i class="el-icon-d-arrow-right iconArrow" @click="isHidden"
									style="cursor: pointer"></i>
							</p>
						</div>
						<div>
							<el-input clearable v-model="searchName" placeholder="请输入建筑名称"
								style="margin-right: 10px; width: 70%" />
							<el-button class="searchButton" @click="getSearch">搜索</el-button>
						</div>
					</div>
					<div>
						<p class="title" v-if="this.searchList.length !== 0 && this.enterName !== ''">
							搜索 “{{ this.enterName }}” 结果{{ this.total }}条
						</p>
						<ul id="myList"></ul>
						<!-- 分页 -->
						<pagination small background :hide-on-single-page="show" layout="prev, pager, next"
							:total="total" :page.sync="pageNum" :limit.sync="pageSize" @pagination="getSearch()" />
					</div>
				</div>
			</div>
		</div>

		<!-- 事件弹窗 -->
		<el-tabs v-model="activeName" tabPosition="right" class="tabRight" @tab-click="handleClick">
			<el-tab-pane name="thing">
				<div slot="label" @click="isShow" style="margin-top: 6px">
					<img class="w-thingimg" src="../../../../assets/gisMap/thing.png" alt="">
					<p style="color: #FAAC14;">事件</p>
				</div>
			</el-tab-pane>
		</el-tabs>
		<!-- 事件弹窗 -->
		<div class="contentPosition2" v-if="isthing">
			<!--指向箭头-->
			<div class="arrow2"></div>
			<div class="contentRight2">
				<div>
					<div style="padding: 0 20px">
						<div>
							<p style="font-weight: bold">
								事件列表（{{ this.sum }}）
								<i class="el-icon-d-arrow-right iconArrow" @click="getThing"
									style="cursor: pointer"></i>
							</p>
						</div>
						<div>
							<div class="thingliTitle flex hb vc">
								<div class="width15">序号</div>
								<div class="width30">事件</div>
								<div class="width55">时间</div>
							</div>
							<div class="thingul">
								<div class="thingli flex hb vc" v-for="(v,i) in 12" :key="i">
									<div class="width15">{{i+1}}</div>
									<div class="width30">人脸识别机发现重点人员</div>
									<div class="width55">2023-12-31 15:00</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>


		<!-- 底部下拉框 -->
		<div class="grid2">
			<div class="gridBox2" style="">
				<div class="gridBoxitem2" v-for="(item,index) in classifyArr" :key="index">
					<div class="w-gridBox21" @click="isShowClass(item,index)">
						<div class="w-gridBox2imgbox" :style="{ background: item.color}">
							<img class="w-gridBox2img" :src="item.img" alt="">
						</div>
						<div class="w-gridBoxTextbox">
							<div class="w-gridBoxTextbg" :style="{ color: item.color}">{{item.name}}</div>
						</div>
					</div>

					<div :class="['gridBoxitemSmbox',item.isShow==true?'classActive':'']">
						<div class="gridBoxitemSmItem" v-for="(a,b) in item.children" :key="b" @click="clickClass(a)"
							:style="{ color: item.color,'border-color':item.color}">
							<img class="w-gridBoxsm2img" :src="a.img" alt="">
							<div class="w-gridBoxsmTextbg">{{a.name}}</div>
						</div>
					</div>
				</div>
			</div>

		</div>


		<!-- 重点人员 -->
		<div class="peopleboxbig" v-if="isImportantPeople">
			<!-- 重点人员左上 -->
			<div class="peoplebigboxItem peopleLeft1">
				<div class="peoTitle">重点人员-个人信息</div>
				<div class="peobox flex vc">
					<img src="../../../../assets/gisMap/people0.png" alt="" class="w-peopleimg">
					<div class='peo-rightbox'>
						<div class="peo-rightli flex vc">
							<div class="peo-li width50">姓名：张三</div>
							<div class="peo-li width50">出生日期：1981-12-01</div>
						</div>
						<div class="peo-rightli flex vc">
							<div class="peo-li width50">年龄：46</div>
							<div class="peo-li width50">政治面貌：群众</div>
						</div>
						<div class="peo-rightli flex vc">
							<div class="peo-li width50">学历：初中</div>
							<div class="peo-li width50">联系方式：13333333333</div>
						</div>
						<div class="peo-rightli flex vc">
							<div class="peo-li width100">身份证：12345678912345678945867</div>
						</div>
						<div class="peo-rightli flex vc">
							<div class="peo-li width100">户籍地址：山西省太原市小店区123号栋</div>
						</div>
					</div>
				</div>
			</div>
			<!-- 左上线 -->
			<img class="lineimg1" src="../../../../assets/gisMap/line.png" alt="">
			<img class="lineimg2" src="../../../../assets/gisMap/line.png" alt="">
			<img class="lineimg3" src="../../../../assets/gisMap/line.png" alt="">
			<img class="lineimg4" src="../../../../assets/gisMap/line.png" alt="">
			<!-- 重点人员左下 -->
			<div class="peoplebigboxItem peopleLeft2">
				<div class="peoTitle">重点人员-出入记录</div>
				<div class="peobox flex vc">
					<div class='peo-rightbox'>
						<div class="peo-rightliTit flex vc">
							<div class="peo-li width15">序号</div>
							<div class="peo-li width30">出入时间</div>
							<div class="peo-li width55">出入地点</div>
						</div>
						<div class="peo-rightul">
							<div class="peo-rightli flex vc" v-for="(v,i) in 12">
								<div class="peo-li width15">{{i+1}}</div>
								<div class="peo-li width30">2023-12-24 15：00</div>
								<div class="peo-li width55 ellipsis">太原市迎泽区涧河街道某某小区</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="peopleCenter">
				<img class="peopleCenterimg1" src="../../../../assets/gisMap/people2.png" alt="">
				<div class="peopleCenterText">重点人员</div>
				<img class="peopleCenterimg2" src="../../../../assets/gisMap/people3.png" alt="">
			</div>
			<!-- 关闭 -->
			<img class="peoplecloseImg" src="../../../../assets/gisMap/close.png" alt="" @click="closeClass('重点人员')">
			<!-- 重点人员右上 -->
			<div class="peoplebigboxItem peopleRight1">
				<div class="peoTitle">重点人员-监控画面</div>
				<div class="peobox">
					<div class="videobox flex hb vc">
						<!-- <video style="margin: auto;" ref="videoPlayer1" id="videoPlayer1"></video> -->
						<video ref="videoPlayer1" id="videoPlayer1" class="video-js vjs-default-skin" controls
							playsinline autoplay="autoplay" style="border-radius: 10px;width:100%">
							<source :src="attachmentLink" type="application/x-mpegURL" />
						</video>
					</div>
					<div class='peo-rightbox'>
						<div class="peo-rightli flex vc">
							<div class="peo-li">监控拍摄时间：2023-12-17 15：15：06</div>
						</div>
					</div>
				</div>
			</div>
			<!-- 重点人员右下 -->
			<div class="peoplebigboxItem peopleRight2">
				<div class="peoTitle">重点人员-对比结果</div>
				<div class="peobox2 flex hb">
					<img src="../../../../assets/gisMap/people0.png" alt="" class="w-peopleimg width30">
					<img src="../../../../assets/gisMap/people0.png" alt="" class="w-peopleimg width30">
					<div class="width30 flex column hb right3last">
						<div class="pepbitop flex column hb">
							<div>人员比对结果</div>
							<div class="bigText">70%</div>
							<div>相似度</div>
						</div>
						<div class="pepbitop2">刑满释放人员</div>
					</div>
				</div>
			</div>
		</div>

		<!-- 烟雾预警 -->
		<div class="smokeboxbig" ref="smokeRef" :style="{margin:'0 auto',display:'none' }">
			<img class="left_line" src="../../../../assets/gisMap/smoke/g37366.png">
			<div class="smokebigboxItem">
				<div class="flex hb vc">
					<div class="popTitle">{{popTitle}}</div>
					<img class="smokecloseImg" src="../../../../assets/gisMap/close.png" alt=""
						@click="closeClass('烟雾预警')">
				</div>
				<div class="smokebox flex">
					<img :src="popImg" alt="" class="w-smokeimg">
					<div class='smok-rightbox'>
						<div class="peo-rightli flex vc">
							<div class="peo-li width100">报警时间：2023-12-11 15:00</div>
						</div>
						<div class="peo-rightli flex vc">
							<div class="peo-li width100">报警地点：太原市小店区平阳路街道 某某小区14号楼</div>
						</div>
						<div class="peo-rightli flex vc">
							<div class="peo-li width100">预警信号：{{popTitle}}</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- 空气质量预警 -->
		<div class="smokeboxbig" ref="airRef" style="display: none;">
			<img class="left_line" src="../../../../assets/gisMap/smoke/g37366.png">
			<div class="smokebigboxItem">
				<div class="flex hb vc">
					<div class="popTitle">{{popTitle}}</div>
					<img class="smokecloseImg" src="../../../../assets/gisMap/close.png" alt=""
						@click="closeClass(popTitle)">
				</div>
				<div class="smokebox flex">
					<div class='smok-rightbox'>
						<div class="peo-rightli flex vc">
							<div class="peo-li width100">太原市实时空气质量：良</div>
							<div class="peo-li width100">AQI(空气质量）：90</div>
						</div>
						<div class="peo-rightli flex vc">
							<div class="peo-li width100">PM2.5：62ug/m3</div>
							<div class="peo-li width100">SO2：28ug/m3</div>
						</div>
						<div class="peo-rightli flex vc">
							<div class="peo-li width100">N02：27ug/m3</div>
							<div class="peo-li width100">03：192ug/m3</div>
						</div>
						<div class="peo-rightli flex vc">
							<div class="peo-li width100">CO：1490ug/m3</div>
							<div class="peo-li width100">PM10：126ug/m3</div>
						</div>
					</div>
				</div>
			</div>
		</div>


		<!-- 门禁警告 -->
		<div class="accessControboxbig" ref="accessControRef" style="display: none;">
			<img class="left_line" src="../../../../assets/gisMap/smoke/g37366.png">
			<div class="smokebigboxItem">
				<div class="flex hb vc">
					<div class="accessControTitle">{{popTitle}}</div>
					<img class="accessControcloseImg" src="../../../../assets/gisMap/close.png" alt=""
						@click="closeClass(popTitle)">
				</div>
			</div>
		</div>

		<!-- <el-dialog :modal-append-to-body="false" :title="videoTitle" :visible="showVideo" width="30%"
			:before-close="handleClose">
			<div v-if="showVideo">
				<video ref="videoPlayer" id="videoPlayer" class="video-js vjs-default-skin" controls playsinline
				autoplay="autoplay" width="600px" style="border-radius: 10px;">
				<source :src="attachmentLink" type="application/x-mpegURL" />
			</video>
			</div>

		</el-dialog> -->
		<div class="ceshibox" v-if="showVideo" style="">
			<div class="ceshiboxsm flex hb vc" style="">
				<div>{{videoTitle}}</div>
				<img class="smokecloseImg" src="../../../../assets/service/close.png" alt="" @click="handleClose">
			</div>
			<div style="padding: 10px;box-sizing: border-box">
				<video ref="videoPlayer" id="videoPlayer" class="video-js vjs-default-skin" controls playsinline
					autoplay="autoplay" width="600px" style="border-radius: 10px;">
					<source :src="attachmentLink" type="application/x-mpegURL" />
				</video>
			</div>
		</div>
		<div class="ceshizhe" v-if="showVideo"></div>
		<!-- 预警 -->
		<div v-if="isAlarm" id="alertOverlay" :class="[isAlarm==true?'alert-active':'']">
			<div></div>
		</div>
		<audio ref="audio" class="aud" loop='true'>
			<source src="./static/alarm.mp3" />
		</audio>


		<!-- 智能手环报警 -->
		<div class="braceletboxbig" v-if="isShowBracelet">
			<!-- 左边 -->
			<div class="bracelet_left">
				<!-- <div class="title">手环预警信息</div>
				<div class="box">
					<div class="item">
						<span>预警时间：2023-12-31 15：31：24</span>
					</div>
					<div class="item">
						<span>预警内容：SP-021智能手环佩戴者，心率异常，请及时处理</span>
					</div>
					<div class="item">
						<span>设备名称：智能手环</span>
						<span>持有人：张胜男</span>
					</div>
					<div class="item">
						<span>紧急联系人：李建国</span>
						<span>所属网格：解放路一网格</span>
					</div>
					<div class="item">
						<span>负责人：王子豪</span>
						<span>联系电话：13333466433</span>
					</div>
				</div> -->

				<!-- <img class="bracelet_left_image" src="../../../../assets/gisMap/bracelet_left_image.png" alt="" @click="closeClass('重点人员')"> -->
				<img class="bracelet_line" src="../../../../assets/gisMap/bracelet_line.png" alt="">
				<img class="bracelet_close" src="../../../../assets/gisMap/close.png" alt=""
					@click="closeClass('智能手环')">

				<!-- 右边 -->
				<div class=" bracelet_right">
					<img src="../../../../assets/gisMap/bracelet_image.png">
					<div class="icon">
						<img src="../../../../assets/gisMap/bracelet_icon.png">
						<div class="num">175bpm</div>
						<div>心率过高</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import AMapLoader from '@amap/amap-jsapi-loader'
	import {
		partsType,
		parts,
		partsNoPage
	} from "@/api/area/gisMap";
	// 引入直播组件
	import videojs from "video.js";
	import "video.js/dist/video-js.css";

	export default {
		name: "parts",
		props: ["map", "areaId"], //接收父组件的值
		data() {
			return {
				classifyArr: [{
						id: 0,
						name: '环境感知',
						color: '#52C41A',
						isShow: false,
						img: require('../../../../assets/gisMap/classMapImg1.png'),
						children: [{
							id: 2,
							name: '温湿度异常',
							img: require("../../../../assets/gisMap/icon13.png"),
							ref: '',
							showImg: require("../../../../assets/gisMap/eg/ShowImg02.png"),
						}, {
							id: 1,
							name: '噪音预警',
							img: require("../../../../assets/gisMap/icon12.png"),
							ref: '',
							showImg: require("../../../../assets/gisMap/eg/ShowImg01.png"),
						}, {
							id: 0,
							name: '空气质量',
							img: require("../../../../assets/gisMap/icon11.png"),
							ref: 'airRef',
							showImg: '',
						}]
					},
					{
						id: 1,
						name: '安全感知',
						color: '#40A9FF',
						isShow: false,
						img: require('../../../../assets/gisMap/classMapImg2.png'),
						children: [{
							id: 5,
							name: '气体泄漏',
							img: require("../../../../assets/gisMap/icon26.png"),
							ref: '',
							showImg: require("../../../../assets/gisMap/eg/ShowImg05.png"),
						}, {
							id: 4,
							name: '井盖异常',
							img: require("../../../../assets/gisMap/icon25.png"),
							ref: '',
							showImg: require("../../../../assets/gisMap/eg/ShowImg04.png"),
						}, {
							id: 3,
							name: '安防报警',
							img: require("../../../../assets/gisMap/icon24.png"),
							ref: '',
							showImg: require("../../../../assets/gisMap/eg/ShowImg03.png"),
						}, {
							id: 2,
							name: '烟雾预警',
							img: require("../../../../assets/gisMap/icon23.png"),
							ref: 'smokeRef',
							showImg: require("../../../../assets/gisMap/smoke/eg.png"),
						}, {
							id: 1,
							name: '重点人员',
							img: require("../../../../assets/gisMap/icon22.png"),
							ref: '',
							showImg: require("../../../../assets/gisMap/icon22.png"),
						}, {
							id: 0,
							name: '智能门禁',
							img: require("../../../../assets/gisMap/icon21.png"),
							ref: 'accessControRef',
							showImg: require("../../../../assets/gisMap/icon22.png"),

						}]
					},
					{
						id: 2,
						name: '健康监测',
						color: '#FA541C',
						isShow: false,
						img: require('../../../../assets/gisMap/classMapImg3.png'),
						children: [{
							id: 1,
							name: '心率预警',
							img: require("../../../../assets/gisMap/icon31.png"),
							ref: '',
							showImg: require("../../../../assets/gisMap/eg/ShowImg06.png"),
						}, {
							id: 0,
							name: '智能手环',
							img: require("../../../../assets/gisMap/icon31.png"),
							ref: '',
							showImg: require("../../../../assets/gisMap/icon22.png"),
						}]
					},
					{
						id: 3,
						name: '智能停车',
						color: '#597EF7',
						isShow: false,
						img: require('../../../../assets/gisMap/classMapImg4.png'),
						children: [{
							id: 1,
							name: '车位预警',
							img: require("../../../../assets/gisMap/icon42.png"),
							ref: '',
							showImg: require("../../../../assets/gisMap/eg/ShowImg07.png"),
						}, {
							id: 0,
							name: '异常车辆',
							img: require("../../../../assets/gisMap/icon41.png"),
							ref: '',
							showImg: require("../../../../assets/gisMap/eg/ShowImg13.png"),
						}]
					},
					{
						id: 4,
						name: '居民生活',
						color: '#FF85C0',
						isShow: false,
						img: require('../../../../assets/gisMap/classMapImg5.png'),
						children: [{
							id: 5,
							name: '电动车',
							img: require("../../../../assets/gisMap/icon56.png"),
							ref: '',
							showImg: require("../../../../assets/gisMap/eg/ShowImg14.png"),
						}, {
							id: 4,
							name: '消防占道',
							img: require("../../../../assets/gisMap/icon55.png"),
							ref: '',
							showImg: require("../../../../assets/gisMap/eg/ShowImg08.png"),
						}, {
							id: 3,
							name: '高空抛物',
							img: require("../../../../assets/gisMap/icon54.png"),
							ref: '',
							showImg: require("../../../../assets/gisMap/eg/ShowImg09.png"),
						}, {
							id: 2,
							name: '漏水报警',
							img: require("../../../../assets/gisMap/icon53.png"),
							ref: '',
							showImg: require("../../../../assets/gisMap/eg/ShowImg10.png"),
						}, {
							id: 1,
							name: '路灯状态',
							img: require("../../../../assets/gisMap/icon52.png"),
							ref: '',
							showImg: require("../../../../assets/gisMap/eg/ShowImg11.png"),
						}, {
							id: 0,
							name: '垃圾满溢',
							img: require("../../../../assets/gisMap/icon51.png"),
							ref: '',
							showImg: require("../../../../assets/gisMap/eg/ShowImg12.png"),
						}]
					},
				], // 感知分类

				dp: null,
				dp1: null,
				options: {
					playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
					aspectRatio: "16:9",
					notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
					autoplay: true, // 设置自动播放
					muted: true, // 设置了它为true，才可实现自动播放,同时视频也被静音（Chrome66及以上版本，禁止音视频的自动播放）
					preload: "auto", // 预加载
					controls: true, // 显示播放的控件
				},
				attachmentLink: "",
				markerCl: null,
				objMap: {
					路灯: {
						icon: require("@/assets/images/gis_ludeng.png"),
						icon1: require("@/assets/images/gis_ludeng_1.png"),
						color: "#FD8686",
					},
					健身器材: {
						icon: require("@/assets/images/gis_jianshenqicai.png"),
						icon1: require("@/assets/images/gis_jianshenqicai_1.png"),
						color: "#BF84E5",
					},
					宣传栏: {
						icon: require("@/assets/images/gis_xuanchuanlan.png"),
						icon1: require("@/assets/images/gis_xuanchuanlan_1.png"),
						color: "#FEA23C",
					},
					摄像头: {
						icon: require("@/assets/images/gis_sehxiangtou.png"),
						icon1: require("@/assets/images/gis_sehxiangtou_1.png"),
						color: "#62C680",
					},
					垃圾桶: {
						icon: require("@/assets/images/gis_lajitong.png"),
						icon1: require("@/assets/images/gis_lajitong_1.png"),
						color: "#69A2DB",
					},
					消防: {
						icon: require("@/assets/images/gis_xiaofangqicai.png"),
						icon1: require("@/assets/images/gis_xiaofangqicai_1.png"),
						color: "#FD803C",
					},
					井盖: {
						icon: require("@/assets/images/gis_jingai.png"),
						icon1: require("@/assets/images/gis_jingai_1.png"),
						color: "#8EAF63",
					},
					其他: {
						icon: require("@/assets/images/gis_qitabujian.png"),
						icon1: require("@/assets/images/gis_qitabujian_1.png"),
						color: "#999999",
					},
				},
				showVideo: false,
				show: true, //当只有一页时隐藏分页
				total: 0, // 总条数
				pageNum: 1, //当前页
				pageSize: 8, //每页多少条
				tabActive: "摄像头", //选中样式
				activeName: "all", //右侧选项
				searchName: "", //搜索框
				enterName: "", //搜索条件
				aresIds: "", //监听树形下拉框的数据
				partsType: [], //部件类型统计
				sum: "", //机构总数
				partsList: [], //不同组织的数据
				searchList: [], //不同组织的数据
				markerGroups: [], //标注点集合
				markerList: [], //搜索标注点集合
				videoTitle: '', //视频标题
				isAlarm: false, //是否报警 闪烁
				audioOpen: false,
				isImportantPeople: false,
				isShowBracelet: false,
				isthing: false, //右侧事件
				// 存取坐标点
				firstxy: '',
				smokeRef: null,
				popTitle: '',
				popImg: '',
			};
		},
		watch: {
			//监听父组件的下拉框数据
			areaId: {
				handler(newVal) {
					if (newVal) {
						this.aresIds = newVal;
						this.getPartsType(newVal);
						if (this.activeName === "all") {
							this.tabActive = "摄像头";
							this.getMarker();
						} else if (this.activeName === "search") {
							this.getSearch();
						} else if (tab.name == 'thing') {
							this.getThing()
						}
					}
				},
				immediate: true, //立即监听
			},
		},
		created() {
			var that = this;
			// this.loadVideo()
			// window.showSp = (str) => {
			//   that.showVideo = true
			//   setTimeout(() => {
			//     const video = document.getElementById('caramVideo');
			//     const url = str;
			//     const option = {
			//       video: video,
			//       autoplay: true
			//     }
			//     new JSWebrtc.Player(url, option);
			//   }, 1.5)
			// }
		},
		beforeDestroy() {
			//销毁前清除地图上的聚合点
			if (this.markerCl) {
				this.markerCl.setMap(null);
			}
			this.markerCl = null;
		},
		methods: {
			// 点击底部类型中的子级
			clickClass(a) {
				var that = this;
				that.classifyArr.forEach((a, b) => {
					a.isShow = false
				})
				if (a.name == '重点人员') {
					this.isImportantPeople = true;
					// 报警
					this.isAlarm = true
					this.toIsAlarm()
					setTimeout(() => {
						this.loadVideo1();
					}, 1500);
				} else if (a.name == '智能手环') {
					this.isShowBracelet = true
					this.isAlarm = true
					this.toIsAlarm()
				} else {
					var div = this.$refs['smokeRef']
					this.popTitle = a.name
					this.popImg=a.showImg
					this.isAlarm = true
					this.toIsAlarm()
					if (a.ref) {
						div = this.$refs[a.ref]
					} else {
						div = this.$refs['smokeRef']
					}
					if (a.name == '智能门禁') {
						this.popTitle = '门禁告警'
					}

					console.log(this.firstxy)
					console.log(a.ref)
					// 拆分坐标
					var newxy = this.firstxy.split(',');
					console.log(newxy)
					var newx = newxy[0]
					var newy = newxy[1]
					// 地图标点
					div.style.display = 'block';
					var left = Math.floor((Math.random() * (350 - 50)) + 50);
					var top = Math.floor((Math.random() * (-170 + 230)) - 230);
					var marker = new AMap.Marker({
						position: new AMap.LngLat(newx, newy),
						// 将 html 传给 content
						// content: markerContent,
						content: div,
						// 以 icon 的 [center bottom] 为原点
						// offset: new AMap.Pixel(50, -170)
						offset: new AMap.Pixel(left, top)
						// offset: new AMap.Pixel(0, 0)
					});
					// 将 markers 添加到地图
					this.$parent.map.add(marker);
				}
			},
			// 关闭弹窗
			closeClass(type) {
				if (type == '重点人员') {
					this.isImportantPeople = false;
					this.isAlarm = false
					this.toIsAlarm()
					this.dp1.dispose();
				} else if (type == '智能手环') {
					this.isShowBracelet = false;
					this.isAlarm = false
					this.toIsAlarm()
				} else if (type == '空气质量') {
					this.$refs['airRef'].style.display = 'none'
					this.isAlarm = false
					this.toIsAlarm()
				} else if (type == '门禁告警') {
					this.$refs['accessControRef'].style.display = 'none'
					this.isAlarm = false
					this.toIsAlarm()
				} else {
					this.$refs['smokeRef'].style.display = 'none'
					this.isAlarm = false
					this.toIsAlarm()
				}
			},
			// 点击底部类型
			isShowClass(v, i) {
				var that = this;
				that.isAlarm = false
				that.popImg=''
				this.$refs['airRef'].style.display = 'none'
				this.$refs['accessControRef'].style.display = 'none'
				this.$refs['smokeRef'].style.display = 'none'
				if (that.classifyArr[i].isShow) {
					that.classifyArr[i].isShow = false
				} else {
					that.classifyArr.forEach((a, b) => {
						a.isShow = false
					})
					that.classifyArr[i].isShow = true
				}
			},
			// 直播方法
			loadVideo() {
				this.dp = videojs("videoPlayer", this.options);

				//也可以使用以下方式给vedio设置 src
				this.dp.src([{
					src: this.attachmentLink, // 地址
					type: "application/x-mpegURL", // 告诉videojs,这是一个hls流
				}, ]);
			},
			loadVideo1() {
				this.dp1 = videojs("videoPlayer1", this.options);

				//也可以使用以下方式给vedio设置 src
				this.dp1.src([{
					src: this.attachmentLink, // 地址
					type: "application/x-mpegURL", // 告诉videojs,这是一个hls流
				}, ]);
			},
			// 销毁直播
			// beforeDestroy() {
			//   if (this.dp) {
			//     this.dp.dispose(); // dispose()会直接删除Dom元素
			//   }
			// },

			//内容框显示
			isShow() {
				this.isHidden();

				//卡片内容
				var Id = document.getElementById("partsBox");
				let visible = Id.getElementsByClassName("contentRight");
				for (var i = 0; i < visible.length; i++) {
					visible[i].style.display = "block";
				}
				//指向箭头
				let icon = Id.getElementsByClassName("arrow");
				for (var j = 0; j < icon.length; j++) {
					icon[j].style.display = "block";
				}
			},

			//内容框隐藏
			isHidden() {
				//卡片内容
				let visible = document.getElementsByClassName("contentRight");
				for (var i = 0; i < visible.length; i++) {
					visible[i].style.display = "none";
				}
				//指向箭头
				let icon = document.getElementsByClassName("arrow");
				for (var j = 0; j < icon.length; j++) {
					icon[j].style.display = "none";
				}
			},

			//获取部件信息
			getPartsType(data) {
				let areaIds = "";
				if (data === "" || data === undefined) {
					areaIds = "";
				} else {
					areaIds = data;
				}
				let param = {
					areaId: areaIds,
					userId: localStorage.getItem("userId"),
				};
				partsType(param).then((res) => {
					this.partsType = res.data;
					this.sum =
						this.partsType.light +
						this.partsType.fitnessEquipment +
						this.partsType.billboard +
						this.partsType.camera +
						this.partsType.trashCan +
						this.partsType.fireControl +
						this.partsType.ManholeCover +
						this.partsType.other;
				});
			},

			// 获取所有的标点数据
			getMarker() {
				if (this.markerCl) {
					this.markerCl.setMap(null);
				}
				let areaIds = "";
				if (this.aresIds === "" || this.aresIds === undefined) {
					areaIds = "";
				} else {
					areaIds = this.aresIds;
				}
				let param = {
					areaId: areaIds,
					attachmentsType: this.tabActive,
					userId: localStorage.getItem("userId"),
				};
				partsNoPage(param).then((res) => {
					// 存坐标
					this.firstxy = res.data[0].mapTagging
					this.partsList = res.data;
					const markese = [];
					let enterpriseMap = this.$parent.map;
					var infoWindow = new AMap.InfoWindow({
						offset: new AMap.Pixel(12, -6),
					});
					for (var i = 0; i < this.partsList.length; i += 1) {
						// 处理坐标数据
						if (
							this.partsList[i].mapTagging !== null &&
							this.partsList[i].mapTagging != 0
						) {
							var centerArray = this.partsList[i].mapTagging.split(",");
							let center = [];
							centerArray.forEach((item) => {
								let number = Number(item);
								center.push(number);
							});
							markese.push({
								lnglat: center,
								data: this.partsList[i]
							});
						}
					}
					this.markerCl = new AMap.MarkerClusterer(this.$parent.map, markese, {
						gridSize: 80,
						renderClusterMarker: this._renderClusterMarker,
						renderMarker: this._renderMarker,
					});
					this.markerCl.on("click", (data) => {
						if (data.clusterData.length <= 1) {
							const option = data.clusterData[0].data;
							this.showDe(infoWindow, option, data.clusterData[0].lnglat);
						} else {
							//计算所有聚合点的中心点
							let alng = 0,
								alat = 0;
							for (const m of data.clusterData) {
								alng += m.lnglat.lng;
								alat += m.lnglat.lat;
							}
							const lat = alat / data.clusterData.length;
							const lng = alng / data.clusterData.length;
							//以中心点固定倍数放大地图，达到展开聚合点的效果
							this.$parent.map.setZoom(this.$parent.map.getZoom() + 1);
							this.$parent.map.setCenter([lng, lat]);
						}
					});
				});
			},
			_renderMarker(context) {
				// 自定义点标记样式
				var div = document.createElement("div");
				div.innerHTML = `
        <img src="${
          this.objMap[this.tabActive].icon1
        }" style="width: 55px;height: 55px;">`;
				div.style.color = this.objMap[this.tabActive].color;
				context.marker.setContent(div);
				context.marker.setAnchor("center");
			},
			_renderClusterMarker(context) {
				const count = context.count; // 聚合中点的总数
				const styleObj = {
					text: "text",
					size: Math.round(
						30 + Math.pow(count / this.partsList.length, 1 / 5) * 70
					),
					color: "#ffffff",
					textAlign: "center",
					boxShadow: "0px 0px 12px rgba(0,0,0,0.15)",
				};
				// 自定义点标记样式
				var div = document.createElement("div");
				div.style.backgroundColor = "white";
				div.style.borderRadius = "10px";
				div.style.padding = "5px";
				div.style.display = "flex";
				div.style.width = "max-content";
				div.innerHTML = `
      <div style="
          width: 13px;
          height: 13px;
          position: absolute;
          left: 50%;
          top: 84%;
          background: #fff;
          transform: rotate(135deg);
          "></div>
        <img src="${
          this.objMap[this.tabActive].icon
        }" style="width: 35px;height: 35px;">
        <div style="font-size: 10px; margin-left: 5px;">
            <div style=" margin-top: 2px;">${count}</div>
            <div style=" margin-top: 3px;">${this.tabActive}个数</div>
        </div>
          `;
				div.style.color = this.objMap[this.tabActive].color;
				div.style.boxShadow = styleObj.boxShadow;
				context.marker.setContent(div);
				context.marker.setAnchor("center");
			},
			showDe(infoWindow, option, lnglat) {
				// console.log(infoWindow)
				// console.log(option)
				// console.log(lnglat)
				// let str = ''
				// if ((option.attachmentsType === '摄像头') && option.cameraLiveAddress) {
				//   str = `<span onclick="showSp('${option.cameraLiveAddress}')" style="color: #1F79F3;font-size: 12px;">（详情）</span>`
				// }
				// const content = `<strong style="font-size: 17px;padding: 6px">${option.itemName}</strong>
				// ${str}
				//           </strong>
				// <p style="font-size: 12px;margin: 4px">${option.address}</p>`
				// infoWindow.setContent(content);
				// infoWindow.open(this.$parent.map, lnglat);
				// console.log(content)
				// console.log(lnglat)

				// 标点相关信息不需要了
				// 直接打开视频弹框
				if (option.cameraLiveAddress) {
					// 报警
					// this.isAlarm = true
					// this.toIsAlarm()
					this.videoTitle = option.itemName
					console.log(option.cameraLiveAddress);
					this.showVideo = true;
					this.attachmentLink = option.cameraLiveAddress;
					setTimeout(() => {
						this.loadVideo();
					}, 1500);
				} else {
					this.$message.error("暂无摄像头");
				}
				// setTimeout(() => {
				//   const video = document.getElementById('caramVideo');
				//   const url = option.cameraLiveAddress;
				//   const optionvideo = {
				//     video: video,
				//     autoplay: true
				//   }
				//   new JSWebrtc.Player(url, optionvideo);
				// }, 1.5)
			},
			handleClose() {
				this.showVideo = false;
				// 关闭警报
				this.isAlarm = false; //是否报警
				this.toIsAlarm()
				this.dp.dispose();
			},
			// 报警
			toIsAlarm() {
				if (this.isAlarm) {
					this.audioOpen = true
					this.$nextTick(() => {
						console.log("ssssssssss", this.$refs['audio'])
						let music1 = new Audio();
						music1 = require("./static/alarm.mp3");
						this.$refs.audio.src = music1;
						this.$refs.audio.play();

					})

				} else {
					this.audioOpen = false
					this.$refs.audio.pause();
				}
			},

			//切换部件类型
			parts(val) {
				this.tabActive = val;
				this.getMarker(true);
			},
			//切换右侧选项
			handleClick(tab, event) {
				if (tab === undefined) {
					this.activeName = "";
				} else {
					this.activeName = tab.name;
					if (tab.name === "all") {
						this.tabActive = "路灯";
						this.getMarker();
					} else if (tab.name === "search") {
						this.getSearch();
					} else if (tab.name == 'thing') {
						this.getThing()
						// this.isthing=true
					}
					let icon = document.getElementsByClassName("arrow");
					icon = Array.from(icon);
					icon.forEach(function(item) {
						if (tab.name === "all") {
							item.style.top = 3.125 + "rem";
						} else if (tab.name === "search") {
							item.style.top = 8.125 + "rem";
						}
					});
				}
			},
			getThing() {
				var that = this;
				that.isthing = !that.isthing
				that.isHidden()
			},
			//搜索
			getSearch() {
				this.$parent.map.clearInfoWindow();
				this.$parent.map.remove(this.markerGroups);
				this.searchList = [];
				let areaIds = "";
				if (this.aresIds === "" || this.aresIds === undefined) {
					areaIds = "";
				} else {
					areaIds = this.aresIds;
				}
				let param = {
					areaId: areaIds,
					itemName: this.searchName,
					pageNum: this.pageNum,
					pageSize: this.pageSize,
					userId: localStorage.getItem("userId"),
				};
				parts(param).then((res) => {
					this.searchList = res.rows;
					this.enterName = this.searchName;
					this.total = res.total;
					let searchMap = this.$parent.map;
					let that = this;
					for (var i = 0; i < this.searchList.length; i += 1) {
						//处理坐标数据
						if (
							this.searchList[i].mapTagging !== null &&
							this.partsList[i].mapTagging != 0
						) {
							var centerArray = this.searchList[i].mapTagging.split(",");
						}
						let center = [];
						centerArray.forEach((item) => {
							let number = Number(item);
							center.push(number);
						});
						this.searchList[i].mapTagging = center;
					}

					AMapUI.loadUI(
						[
							"misc/MarkerList",
							"overlay/SimpleMarker",
							"overlay/SimpleInfoWindow",
						],
						function(MarkerList, SimpleMarker, SimpleInfoWindow) {
							var defaultIconStyle = function(index) {
									return "red-" + (index + 1);
								}, //默认的图标样式
								hoverIconStyle = function(index) {
									return "blue-" + (index + 1);
								}, //鼠标hover时的样式
								selectedIconStyle = function(index) {
									return "blue-" + (index + 1);
								}; //选中时的图标样式

							that.markerList = new MarkerList({
								//关联的map对象
								map: searchMap,
								//列表的dom容器的id
								listContainer: "myList",
								//返回数据项的Id
								getDataId: function(dataItem, index) {
									//index表示该数据项在数组中的索引位置，从0开始，如果确实没有id，可以返回index代替
									return index;
								},
								//返回数据项的位置信息，需要是AMap.LngLat实例，或者是经纬度数组，比如[116.789806, 39.904989]
								getPosition: function(dataItem) {
									return dataItem.mapTagging;
								},
								//返回数据项对应的infoWindow
								getInfoWindow: function(data, context, recycledInfoWindow) {
									if (recycledInfoWindow) {
										recycledInfoWindow.setInfoTitle(
											'<strong style="font-size: 17px;padding: 6px">' +
											data.itemName +
											"</strong>"
										);
										recycledInfoWindow.setInfoBody(
											'<p style="font-size: 12px;margin: 4px">地址：' +
											data.address +
											"</p>"
										);
										return recycledInfoWindow;
									}
									return new SimpleInfoWindow({
										infoTitle: '<strong style="font-size: 17px;padding: 6px">' +
											data.itemName +
											"</strong>",
										infoBody: '<p style="font-size: 12px;margin: 4px">地址：' +
											data.address +
											"</p>",
										offset: new AMap.Pixel(0, -32),
									});
								},

								//构造marker用的options对象, content和title支持模板，也可以是函数，返回marker实例，或者返回options对象
								getMarker: function(data, context, recycledMarker) {
									if (recycledMarker) {
										recycledMarker.setIconStyle(defaultIconStyle(context
											.index));
										return;
									}
									return new SimpleMarker({
										iconTheme: "numv1",
										containerClassNames: "my-marker",
										iconStyle: defaultIconStyle(context.index),
									});
								},

								//构造列表元素，与getMarker类似，可以是函数，返回一个dom元素，或者模板 html string
								getListElement: function(data, context, recycledListElement) {
									var label = "" + (context.index + 1);
									//使用模板创建
									var innerHTML = MarkerList.utils.template(
										'<div class="iconBox">' +
										'   <i class="icon-site"></i>' +
										'   <div class="number">' +
										"     <p><%- label %></p>" +
										"   </div>" +
										"</div>" +
										'<div class="content">' +
										'   <p class="name"><%- data.itemName %></p>' +
										'   <p class="address"><%- data.address %></p>' +
										"</div>", {
											data: data,
											label: label,
										}
									);
									if (recycledListElement) {
										recycledListElement.innerHTML = innerHTML;
										return recycledListElement;
									}
									return '<li class="contentBox">' + innerHTML + "</li>";
								},
								//列表节点上监听的事件
								listElementEvents: ["click", "mouseenter", "mouseleave"],
								//marker上监听的事件
								markerEvents: ["click", "mouseover", "mouseout"],
								//makeSelectedEvents:false,
								selectedClassNames: "selected",
								autoSetFitView: true,
							});
							//监听鼠标选中改变
							that.markerList.on("selectedChanged", function(event, info) {
								if (info.selected) {
									if (info.selected.marker) {
										//更新为选中样式
										info.selected.marker.setIconStyle(
											selectedIconStyle(info.selected.index)
										);
									}
								}
								if (info.unSelected && info.unSelected.marker) {
									//更新为默认样式
									info.unSelected.marker.setIconStyle(
										defaultIconStyle(info.unSelected.index)
									);
								}
							});

							//监听鼠标悬停改变
							that.markerList.on(
								"listElementMouseenter markerMouseover",
								function(event, record) {
									if (record && record.marker) {
										//非选中的id
										if (!this.isSelectedDataId(record.id)) {
											//设置为hover样式
											record.marker.setIconStyle(hoverIconStyle(record.index));
										}
									}
								}
							);

							//监听鼠标移出改变
							that.markerList.on(
								"listElementMouseleave markerMouseout",
								function(event, record) {
									if (record && record.marker) {
										if (!this.isSelectedDataId(record.id)) {
											//恢复默认样式
											record.marker.setIconStyle(defaultIconStyle(record.index));
										}
									}
								}
							);
							//展示数据
							that.markerList.render(that.searchList);
						}
					);
					this.remove();
				});
			},

			//移除标注点
			remove() {
				if (this.markerGroups.length !== 0) {
					this.$parent.map.clearInfoWindow();
					this.$parent.map.remove(this.markerGroups);
				}
				if (this.markerList.length !== 0) {
					this.$parent.map.clearInfoWindow();
					this.markerList.render([]);
				}
			},
		},
	};
</script>

<style scoped lang="scss">
	#videoPlayer {
		width: 100%;
		min-height: 30vh;
	}

	/**视频框样式 */
	::v-deep .el-dialog__title {
		color: rgba(255, 255, 255, 1);
	}

	::v-deep .el-dialog__headerbtn .el-dialog__close {
		color: #ffffff;
	}

	::v-deep .el-dialog__header {
		background-color: #73AAF6;
		// border-radius: 10px 10px 0px 0px;
	}

	::v-deep .el-dialog__body {
		border-radius: 10px;
	}

	::v-deep .el-dialog {
		// border: 20px solid rgba(29, 173, 76, 0.3);
		box-shadow: 0 0 5px rgba(0, 0, 0, .2);
		background-color: #fff;
		padding: 0px;
		border-radius: 10px 10px 10px 10px;
		// opacity: 0.3;
	}

	::v-deep .el-dialog__body {
		padding: 10px;
	}

	/*右侧菜单*/
	.tabRight {
		/*position: absolute;*/
		/*top: 154px;*/
		/*right: 10px;*/
		z-index: 1;
	}

	/*菜单div*/
	.iconRight {
		font-size: 26px;
		color: #9e25b2;
		border-radius: 50%;
		padding: 6px;
	}

	::v-deep .el-tabs__item.is-active .iconRight {
		background: #9e25b2 !important;
		color: #fff;
	}

	/*隐藏tab默认样式*/
	::v-deep .el-tabs__active-bar,
	::v-deep .el-tabs__nav-wrap:after {
		display: none;
	}

	.tabRight p {
		margin-top: 8px;
		font-size: 12px;
		text-align: center;
		line-height: 0;
	}

	/*菜单内容*/
	.contentPosition {
		width: 338px;
		max-height: 723px;
		position: absolute;
		top: 0px;
		right: 78px;
		z-index: 1;
	}

	.contentRight {
		width: 338px;
		max-height: 723px;
		background: #fff;
		z-index: 1;
		box-shadow: 6px 6px 10px 0 rgba(0, 0, 0, 0.3);
		border-radius: 10px;
		padding-bottom: 20px;
		overflow: auto;
	}

	.contentRight::-webkit-scrollbar {
		border-width: 1px;
	}

	/*指向箭头*/
	.arrow {
		width: 14px;
		height: 14px;
		position: absolute;
		left: 330px;
		top: 50px;
		background: #fff;
		transform: rotate(135deg);
	}

	/*标题旁箭头*/
	.iconArrow {
		font-weight: bold;
		float: right;
	}

	/*选项div*/
	.peopleBox {
		width: 100%;
		margin-right: 5%;
		border-radius: 8px;
		padding: 10px;
		font-size: 14px;
		margin-bottom: 10px;
		display: inline-block;
		cursor: pointer;
	}

	.icon-streetlight {
		color: #fd8686;
	}

	.icon-equipment {
		color: #bf84e5;
	}

	.icon-board {
		color: #fea23c;
	}

	.camera {
		color: #62c680;
	}

	.icon-trash {
		color: #69a2db;
	}

	.icon-fire {
		color: #fd803c;
	}

	.icon-cover {
		color: #8eaf63;
	}

	.icon-other {
		color: #999999;
	}

	.isStreetLightActive,
	.isStreetLightActive i {
		background: #fd8686 !important;
		color: #fff;
	}

	.isEquipmentActive,
	.isEquipmentActive i {
		background: #bf84e5 !important;
		color: #fff;
	}

	.isBoardActive,
	.isBoardActive i {
		background: #fea23c !important;
		color: #fff;
	}

	.isCameraActive,
	.isCameraActive i {
		background: #62c680 !important;
		color: #fff;
	}

	.isTrashActive,
	.isTrashActive i {
		background: #69a2db !important;
		color: #fff;
	}

	.isFireActive,
	.isFireActive i {
		background: #fd803c !important;
		color: #fff;
	}

	.isCoverActive,
	.isCoverActive i {
		background: #8eaf63 !important;
		color: #fff;
	}

	.isOtherActive,
	.isOtherActive i {
		background: #999999 !important;
		color: #fff;
	}

	.peopleBox:nth-child(2n) {
		margin-right: 0;
	}

	.peopleIcon {
		display: inline-block;
		width: 32px;
		height: 32px;
		vertical-align: top;
	}

	.peopleContent {
		display: inline-block;
		width: 68%;
		height: 32px;
		line-height: 32px;
	}

	.peopleBox i {
		font-size: 32px;
	}

	.peopleBox p {
		margin: 0;
		padding-left: 6px;
		font-weight: bold;
	}

	/*选项内容标题*/
	.title {
		font-size: 14px;
		font-weight: bold;
		padding: 0 20px;
		margin: 4px;
	}

	::v-deep .contentBox {
		padding: 10px;
		cursor: pointer;
	}

	::v-deep .contentBox:hover {
		background: #ebf7ff;
	}

	::v-deep .contentBox:hover .icon-site {
		color: #3d93fd;
	}

	::v-deep #myList li.selected {
		background: #ebf7ff;

		.icon-site {
			color: #3d93fd;
		}
	}

	/*点标记盒子*/
	::v-deep .contentBox .iconBox {
		width: 36px;
		height: 36px;
		display: inline-block;
		text-align: center;
		position: relative;
		vertical-align: top;
	}

	/*点标记icon*/
	::v-deep .contentBox .icon-site {
		font-size: 36px;
		color: #ff3636;
		position: absolute;
		top: 0;
		left: 0;
	}

	/*点标记序号盒子*/
	::v-deep .contentBox .number {
		width: 36px;
		height: 36px;
		position: absolute;
		top: 0;
		left: 0;
		text-align: center;
	}

	/*点标记序号数字*/
	::v-deep .number p {
		color: #fff;
		font-size: 10px;
		line-height: 30px;
		margin: 0;
	}

	::v-deep .content {
		display: inline-block;
		width: 86%;
	}

	::v-deep .content p {
		font-size: 12px;
		margin: 0;
		color: #999999;
	}

	::v-deep .content .name {
		color: #1f79f3;
		margin-bottom: 2px;
	}

	::v-deep .content .address {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	/*右侧选项卡大小*/
	::v-deep .el-tabs__item {
		height: 80px;
	}

	/*搜索按钮*/
	.searchButton {
		width: 25%;
		color: #1890ff;
		background: #fff;
		border: 1px solid #1890ff;
	}

	ul {
		list-style-type: none;
		padding: 0;
	}

	/* 警报 */

	:root {
		--alert-size: 120px;
	}

	#alertOverlay::before,
	#alertOverlay::after {
		content: "";
		position: absolute;
		width: var(--alert-size);
		height: 100%;
		width: 20vw;
		z-index: 1000000;
	}

	#alertOverlay>div::before,
	#alertOverlay>div::after {
		content: "";
		position: absolute;
		width: 100%;
		height: var(--alert-size);
		height: 20vh;
	}

	#alertOverlay::before {
		background: linear-gradient(to right, red, transparent);
		top: 0;
		left: 0;
		transform: rotate(0deg);
	}

	#alertOverlay::after {
		background: linear-gradient(to left, red, transparent);
		top: 0%;
		right: 0;
		transform: rotate(0deg) translate(calc(-1 * var(--alert-size)), 0px);
	}

	#alertOverlay>div::before {
		background: linear-gradient(to top, red, transparent);
		top: 0;
		left: 0;
		transform: rotate(180deg);
	}

	#alertOverlay>div::after {
		background: linear-gradient(to top, red, transparent);
		bottom: 0;
		left: 0;
		transform: rotate(0deg) translate(0px, calc(-1 * var(--alert-size)));
	}

	#alertOverlay>div {
		width: 100vw;
		height: 100vh;
	}

	#alertOverlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		box-sizing: border-box;
		opacity: 1;
		transition: opacity 0.5s;
		pointer-events: none;
		z-index: 2100;
		// background-color: red;
	}

	.alert-active {
		animation: blink 1s infinite;
	}

	@keyframes blink {
		0% {
			opacity: 0;
		}

		50% {
			opacity: 0.5;
		}

		100% {
			opacity: 0;
		}
	}

	// ...................
	.grid2 {
		position: fixed;
		width: 100%;
		bottom: 11vh;
		z-index: 1;
		left: 0;
	}

	.gridBox2 {
		width: 60rem;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		cursor: pointer;
	}

	.gridBoxitem2 {
		width: 20%;
	}

	.w-gridBox21 {
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: relative;
	}

	.w-gridBox2imgbox {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background-color: aquamarine;
		display: flex;
		justify-content: center;
		position: absolute;
		align-items: center;
		left: 0px;
	}

	.w-gridBox2img {
		width: 24px;
		height: 24px;
	}

	.w-gridBoxTextbox {
		margin-left: 10px;
	}

	.w-gridBoxTextbg {
		font-size: 14px;
		font-family: PingFang SC, PingFang SC;
		font-weight: 500;
		color: #52C41A;
		padding: 6px 20px;
		padding-left: 40px;
		box-sizing: border-box;
		border-bottom-right-radius: 25px;
		border-top-right-radius: 25px;
		background-color: #fff;
		overflow: hidden;
		box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
	}

	.gridBoxitemSmbox {
		position: absolute;
		bottom: 30px;
		overflow: hidden;
		height: 0;
		/* transition:height 2s; */
		transition: height 2s;
	}

	.classActive {
		height: max-content;
	}

	.gridBoxitemSmItem {
		margin-bottom: 20px;
		display: flex;
		flex: 1;
		align-items: center;
		background-color: #fff;
		border-radius: 25px;
		font-size: 14px;
		font-family: PingFang SC, PingFang SC;
		font-weight: 500;
		color: #52C41A;
		padding: 6px 20px;
		box-sizing: border-box;
		border: 1px solid #52C41A;
		box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
	}

	.w-gridBoxsm2img {
		width: 20px;
		height: 20px;
		margin-right: 10px;
	}

	// ...................
	.flex {
		display: flex;
	}

	.flex.column {
		flex-direction: column;
	}

	.flex.row {
		flex-direction: row;
	}

	.flex.ha {
		justify-content: space-around;
	}

	.flex.hb {
		justify-content: space-between;
	}

	.flex.hc {
		justify-content: center;
	}

	.flex.he {
		justify-content: flex-end;
	}

	.flex.vc {
		align-items: center;
	}

	.flex.vb {
		align-items: flex-end;
	}

	.flex .shrink0 {
		flex-shrink: 0;
	}

	.width15 {
		width: 15%;
	}

	.width30 {
		width: 30%;
	}

	.width40 {
		width: 40%;
	}

	.width50 {
		width: 50%;
	}

	.width55 {
		width: 55%;
	}

	.width100 {
		width: 100%;
	}

	.ellipsis {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	// 重点人员
	.peopleboxbig {
		position: fixed;
		left: 0;
		top: 0;
		background: radial-gradient(circle, rgba(0, 0, 0, 0.10), rgba(125, 0, 0, 0.59));
		width: 100vw;
		height: 100vh;
		z-index: 1;
	}

	.peoplebigboxItem {
		width: 30vw;
		height: 16vw;
		background-image: url(../../../../assets/gisMap/people1.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		position: absolute;
		padding: 0 26px;
		padding-bottom: 10px;
		box-sizing: border-box;
	}

	.peopleLeft1 {
		left: 4vw;
		top: 10vh;
	}

	.peo-rightli {
		background-image: linear-gradient(90deg, rgba(224, 3, 3, 0.50), rgba(240, 15, 15, 0.18), rgba(197, 40, 40, 0));
		margin-bottom: 12px;
		padding: 8px;
		box-sizing: border-box;
	}

	.peo-rightbox {
		font-size: 14px;
		font-family: Microsoft YaHei, Microsoft YaHei;
		font-weight: 400;
		color: #FFFFFF;
		flex: 1;
	}

	.w-peopleimg {
		width: 30%;
		margin-right: 24px;
		border: 1px solid RGBA(255, 41, 41, 1)
	}

	.peobox {
		width: 100%;
	}

	.peoTitle {
		padding: 14px 0px;
		box-sizing: border-box;
		font-size: 20px;
		font-family: PingFang SC, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
	}

	// ..................
	.peopleLeft2 {
		left: 4vw;
		bottom: 20vh;
	}

	.peo-rightliTit {
		margin-bottom: 12px;
		margin-top: 6px;
		padding: 8px;
		box-sizing: border-box;
		text-align: center;
		background: rgba(255, 0, 0, 0.53)
	}

	.peo-rightul {
		overflow: auto;
		height: 9.4vw;
		text-align: center;
	}

	.peo-rightul::-webkit-scrollbar {
		width: 2px;
	}

	.peo-rightul::-webkit-scrollbar-thumb {
		background-color: #888;
		/* Chrome、Safari等WebKit内核的浏览器支持此属性 */
	}

	// ..................
	.peopleRight1 {
		right: 4vw;
		top: 10vh;
	}

	.videobox {
		width: 60%;
		margin-bottom: 12px;
		margin-top: 8px;
	}

	.videobox>video {
		width: 49%;
		height: 180px;
		border: 1px solid RGBA(255, 41, 41, 1)
	}

	// ................
	.peopleRight2 {
		right: 4vw;
		bottom: 20vh;
	}

	.peobox2 {
		font-size: 14px;
		font-family: Microsoft YaHei, Microsoft YaHei;
		font-weight: 400;
		color: #FFFFFF;
		text-align: center;
		padding-top: 20px;
	}

	.pepbitop {
		background-image: linear-gradient(90deg, rgba(224, 3, 3, 0.50), rgba(240, 15, 15, 0.18), rgba(197, 40, 40, 0.50));
		margin-bottom: 10px;
		flex: 1;
		padding: 20px 28px;
		padding-bottom: 10px;
		box-sizing: border-box;
		// height:88%
	}

	.right3last {
		flex: 1;
	}

	.pepbitop2 {
		padding: 6px;
		margin: 0;
		background-image: linear-gradient(90deg, rgba(224, 3, 3, 0.50), rgba(240, 15, 15, 0.18), rgba(197, 40, 40, 0.50));
		box-sizing: border-box;
	}

	.bigText {
		font-size: 40px;
		font-family: PingFang SC, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
	}

	// ..............
	.peopleCenter {
		width: 24vw;
		position: absolute;
		left: 0;
		right: 0;
		margin: 0 auto;
		top: 15vh;
	}

	.peopleCenterimg1 {
		width: auto;
		display: block;
		margin: 0 auto;
		height: 60vh;
	}

	.peopleCenterimg2 {
		width: 90%;
		display: block;
		margin: 0 auto;
	}

	.peopleCenterText {
		position: absolute;
		top: 63vh;
		text-align: center;
		font-size: 20px;
		font-family: PingFang SC, PingFang SC;
		font-weight: bold;
		color: rgba(255, 255, 255, 0.85);
		left: 0;
		right: 0;
		margin: 0 auto;
	}

	.lineimg1 {
		position: absolute;
		top: 26vh;
		left: 35vw;
		width: 160px;
	}

	.lineimg2 {
		position: absolute;
		bottom: 30vh;
		left: 35vw;
		width: 160px;
		transform: scaleY(-1);
	}

	.lineimg3 {
		position: absolute;
		top: 26vh;
		right: 35vw;
		width: 160px;
		transform: scaleX(-1);
	}

	.lineimg4 {
		position: absolute;
		bottom: 30vh;
		right: 35vw;
		width: 160px;
		transform: scale(-1, -1);
	}

	.peoplecloseImg {
		position: absolute;
		top: 20px;
		right: 20px;
		width: 30px;
		background-color: rgba(166, 0, 0, 0.72);
		border-radius: 5px;
	}

	// ...................
	.smokeboxbig {
		position: fixed;
		left: 0;
		right: 0;
		margin: 0 auto;
		width: 26vw;
		height: 13vw;
		background-image: url(../../../../assets/gisMap/smoke/bg.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		padding: 0 12px;
		padding-bottom: 10px;
		box-sizing: border-box;
		z-index: 9999;
	}

	.accessControboxbig {
		position: fixed;
		left: 0;
		right: 0;
		margin: 0 auto;
		width: 25vw;
		height: 10vw;
		// top: 39vh;
		background-image: url(../../../../assets/gisMap/accessCon.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		padding: 0 12px;
		padding-bottom: 10px;
		box-sizing: border-box;
	}

	.accessControTitle {
		margin: 0 auto;
		margin-top: 3.9vw;
		padding-left: 4vw;
		font-size: 38px;
		font-family: PingFang SC, PingFang SC;
		font-weight: 800;
		color: #FFFFFF;
	}

	.accessControcloseImg {
		position: absolute;
		right: -20px;
		top: -20px;
		width: 20px;
		height: 20px;
	}

	.left_line {
		position: absolute;
		left: -80px;
		top: 0;
		width: 74px;
		height: 224px;
	}

	.accessControboxbig .left_line {
		position: absolute;
		left: -80px;
		top: 30px;
		width: 74px;
		height: 224px;
	}

	.smok-rightbox {
		font-size: 14px;
		font-family: Microsoft YaHei, Microsoft YaHei;
		font-weight: 400;
		color: #FFFFFF;
		flex: 1;
	}

	.w-smokeimg {
		width: 194px;
		height: 170px;
		margin-right: 10px;
		object-fit: cover;
	}

	.popTitle {
		padding: 6px 8px;
		box-sizing: border-box;
		font-size: 22px;
		font-family: PingFang SC, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
	}

	.smokebox {
		padding-top: 18px;
	}

	.smokecloseImg {
		width: 20px;
		height: 20px;
	}

	.peo-rightli:last-child {
		margin-bottom: 0;
	}

	// ....................
	.w-thingimg {
		width: 38px;
		height: 38px;
	}

	.contentPosition2 {
		width: 600px;
		max-height: 723px;
		position: absolute;
		top: 65px;
		right: 78px;
		z-index: 1;
	}

	.arrow2 {
		width: 14px;
		height: 14px;
		position: absolute;
		right: -6px;
		top: 50px;
		background: #fff;
		transform: rotate(135deg);
	}

	.contentRight2 {
		width: 100%;
		max-height: 723px;
		background: #fff;
		z-index: 1;
		box-shadow: 6px 6px 10px 0 rgba(0, 0, 0, 0.3);
		border-radius: 10px;
		padding-bottom: 20px;
		overflow: auto;
	}

	.thingul {
		height: 200px;
		overflow: auto;
	}

	.thingul::-webkit-scrollbar {
		width: 2px;
	}

	.thingul::-webkit-scrollbar-thumb {
		background-color: #FF474F;
		;
		/* Chrome、Safari等WebKit内核的浏览器支持此属性 */
	}

	.thingliTitle {
		padding: 12px 0;
		box-sizing: border-box;
		background-color: #FF474F;
		font-size: 14px;
		font-family: PingFang SC, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		text-align: center;
		margin-bottom: 10px;
	}

	.thingli {
		padding: 12px 0;
		box-sizing: border-box;
		background-color: #FFE2E3;
		font-size: 14px;
		font-family: PingFang SC, PingFang SC;
		font-weight: 500;
		color: #000000;
		text-align: center;
		margin-bottom: 10px;
	}

	// 测试弹框
	.ceshizhe {
		position: fixed;
		left: 0;
		right: 0;
		margin: 0 auto;
		top: 0;
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 9;
	}

	.ceshibox {
		position: fixed;
		left: 0%;
		right: 0;
		margin: 0 auto;
		top: 10vh;
		width: 30vw;
		background-color: #fff;
		border-radius: 10px;
		z-index: 10;
	}

	.ceshiboxsm {
		padding: 12px 12px;
		box-sizing: border-box;
		font-size: 18px;
		background-color: #73AAF6;
		color: #fff;
	}
</style>

<style lang="scss" scoped>
	// 智能手环
	.braceletboxbig {
		position: fixed;
		left: 0;
		top: 0;
		background: radial-gradient(circle, rgba(0, 0, 0, 0.10), rgba(125, 0, 0, 0.59));
		width: 100vw;
		height: 100vh;
		z-index: 1;

		.bracelet_left {
			position: absolute;
			left: 270px;
			top: 337px;
			width: 651px;
			height: 467.67px;
			padding: 26px 39px;
			padding-bottom: 10px;
			// background-image: url(../../../../assets/gisMap/bracelet_left_bg.png);
			background-image: url(../../../../assets/gisMap/bracelet_left_image.png);
			background-repeat: no-repeat;
			background-size: 100% 100%;
			box-sizing: border-box;

			.title {
				padding: 0;
				margin: 0;
				font-size: 24px;
				font-weight: 800;
				line-height: 24px;
				text-shadow: 0px 0px 8px #E71A1A;
				background: linear-gradient(180deg, #FBA8A8 0%, #FFE6E6 100%);
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
			}

			.box {
				margin-top: 39px;

				.item {
					display: flex;
					padding: 16px;
					margin-bottom: 14px;

					span {
						font-size: 16px;
						font-weight: 500;
						color: #FFFFFF;
						line-height: 16px;
					}

					&>span:nth-child(2) {
						margin-left: auto;
					}
				}
			}

			.bracelet_line {
				position: absolute;
				top: -96px;
				right: -90px;
			}

			.bracelet_close {
				position: absolute;
				top: 33px;
				right: 22px;
				width: 22px;
				height: 22px;
				cursor: pointer;
			}
		}

		.bracelet_right {
			position: absolute;
			top: -140px;
			right: -526px;
			width: 426px;
			height: 251.86px;
			display: flex;
			justify-content: center;
			align-items: center;
			background-image: url(../../../../assets/gisMap/bracelet_right_bg.png);
			background-repeat: no-repeat;
			background-size: 100% 100%;
			box-sizing: border-box;

			&>img {
				width: 123.21px;
				height: 152.05px;
			}

			&>div {
				text-align: center;
				margin-left: 52px;

				img {
					margin-top: 11px;
					width: 85.52px;
					height: 85.52px;
				}

				.num {
					margin-top: 7px;
					font-size: 25px;
					font-weight: bold;
					color: #333333;
					line-height: 25px;
					background: linear-gradient(180deg, #FFFFFF 0%, #FE7C3E 100%);
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
				}

				&>div:last-child {
					margin-top: 9px;
					font-size: 16px;
					font-weight: bold;
					color: #333333;
					line-height: 16px;
					background: linear-gradient(180deg, #FFFFFF 0%, #FE7C3E 100%);
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
				}
			}
		}
	}
</style>