<template>
	<div class="bar">
		<div ref="volumn" class="volume" />
	</div>
</template>

<script>
	import echarts from "echarts";
	import "echarts-gl";
	import WorldJSON from './mapData.json';
	import aa from './map2.json';
	echarts.registerMap("world", WorldJSON);
	
	export default {
		data() {
			return {
				myChart: null,
			};
		},
		mounted() {
			// 获取数据。
			this.$nextTick(() => {
				if (this.$refs.volumn) {
					this.reloadChart();
					// 自适应浏览器。
					window.addEventListener("resize", () => {
						this.reloadChart();
					});
				}
			});
		},
		// 组件销毁。
		beforeDestroy() {
			this.disposeChart();
		},
		methods: {
			drawChart() {
				this.myChart = echarts.init(this.$refs.volumn);
				// myChart.on("mouseover", function(params) {
				// 	myChart.dispatchAction({
				// 		type: "downplay",
				// 	});
				// });
				var jwdInfo = [{
						name: "日本",
						value: [139.46, 35.42, 15]
					},
					{
						name: "阿富汗",
						value: [69.11, 34.28, 13]
					},
					{
						name: "阿尔巴尼亚",
						value: [19.49, 41.18, 11]
					},
					{
						name: "阿尔及利亚",
						value: [3.08, 36.42, 12]
					},
					{
						name: "美属萨摩亚",
						value: [-170.43, -14.16, 17]
					},
					{
						name: "安道尔",
						value: [1.32, 42.31, 10]
					},
					{
						name: "安哥拉",
						value: [13.15, -8.5, 15]
					},
					{
						name: "安提瓜和巴布达",
						value: [-61.48, 17.2, 16]
					},
					{
						name: "阿根廷",
						value: [-60, -36.3, 17]
					},
					{
						name: "亚美尼亚",
						value: [44.31, 40.1, 14]
					},
					{
						name: "阿鲁巴",
						value: [-70.02, 12.32, 11]
					},
					{
						name: "澳大利亚",
						value: [149.08, -35.15, 11]
					},
					{
						name: "奥地利",
						value: [16.22, 48.12, 15]
					},
					{
						name: "阿塞拜疆",
						value: [49.56, 40.29, 11]
					},
					{
						name: "巴哈马",
						value: [-77.2, 25.05, 14]
					},
					{
						name: "巴林",
						value: [50.3, 26.1, 19]
					},
					{
						name: "孟加拉国",
						value: [90.26, 23.43, 19]
					},
					{
						name: "巴巴多斯",
						value: [-59.3, 13.05, 13]
					},
					{
						name: "白俄罗斯",
						value: [27.3, 53.52, 19]
					},
					{
						name: "比利时",
						value: [4.21, 50.51, 19]
					},
					{
						name: "伯利兹",
						value: [-88.3, 17.18, 17]
					},
					{
						name: "贝宁",
						value: [2.42, 6.23, 12]
					},
					{
						name: "不丹",
						value: [89.45, 27.31, 11]
					},
					{
						name: "玻利维亚",
						value: [-68.1, -16.2, 11]
					},
					{
						name: "波斯尼亚和黑塞哥维那",
						value: [18.26, 43.52, 16]
					},
					{
						name: "博茨瓦纳",
						value: [25.57, -24.45, 19]
					},
					{
						name: "巴西",
						value: [-47.55, -15.47, 19]
					},
					{
						name: "英属维尔京群岛",
						value: [-64.37, 18.27, 16]
					},
					{
						name: "文莱",
						value: [115, 4.52, 18]
					},
					{
						name: "保加利亚",
						value: [23.2, 42.45, 19]
					},
					{
						name: "布基纳法索",
						value: [-1.3, 12.15, 12]
					},
					{
						name: "布隆迪",
						value: [29.18, -3.16, 18]
					},
					{
						name: "柬埔寨",
						value: [104.55, 11.33, 11]
					},
					{
						name: "喀麦隆",
						value: [11.35, 3.5, 15]
					},
					{
						name: "加拿大",
						value: [-75.42, 45.27, 18]
					},
					{
						name: "佛得角",
						value: [-23.34, 15.02, 16]
					},
					{
						name: "开曼群岛",
						value: [-81.24, 19.2, 19]
					},
					{
						name: "中非共和国",
						value: [18.35, 4.23, 16]
					},
					{
						name: "乍得",
						value: [14.59, 12.1, 14]
					},
					{
						name: "智利",
						value: [-70.4, -33.24, 14]
					},
					{
						name: "中国",
						value: [116.2, 39.55, 15]
					},
					{
						name: "哥伦比亚",
						value: [-74, 4.34, 12]
					},
					{
						name: "科摩罗",
						value: [43.16, -11.4, 18]
					},
					{
						name: "刚果",
						value: [15.12, -4.09, 13]
					},
					{
						name: "哥斯达黎加",
						value: [-84.02, 9.55, 10]
					},
					{
						name: "科特迪瓦",
						value: [-5.17, 6.49, 17]
					},
					{
						name: "克罗地亚",
						value: [15.58, 45.5, 19]
					},
					{
						name: "古巴",
						value: [-82.22, 23.08, 11]
					},
					{
						name: "塞浦路斯",
						value: [33.25, 35.1, 18]
					},
					{
						name: "捷克共和国",
						value: [14.22, 50.05, 15]
					},
					{
						name: "朝鲜",
						value: [125.3, 39.09, 10]
					},
					{
						name: "刚果(扎伊尔)",
						value: [15.15, -4.2, 10]
					},
					{
						name: "丹麦",
						value: [12.34, 55.41, 17]
					},
					{
						name: "吉布提",
						value: [42.2, 11.08, 15]
					},
					{
						name: "多米尼加",
						value: [-61.24, 15.2, 13]
					},
					{
						name: "多米尼加共和国",
						value: [-69.59, 18.3, 18]
					},
					{
						name: "东帝汶",
						value: [125.34, -8.29, 12]
					},
					{
						name: "厄瓜多尔",
						value: [-78.35, -0.15, 19]
					},
					{
						name: "埃及",
						value: [31.14, 30.01, 11]
					},
					{
						name: "萨尔瓦多",
						value: [-89.1, 13.4, 18]
					},
					{
						name: "赤道几内亚",
						value: [8.5, 3.45, 11]
					},
					{
						name: "厄立特里亚",
						value: [38.55, 15.19, 10]
					},
					{
						name: "爱沙尼亚",
						value: [24.48, 59.22, 11]
					},
					{
						name: "埃塞俄比亚",
						value: [38.42, 9.02, 11]
					},
					{
						name: "福克兰群岛(马尔维纳斯群岛)",
						value: [-59.51, -51.4, 15]
					},
					{
						name: "法罗群岛",
						value: [-6.56, 62.05, 19]
					},
					{
						name: "斐济",
						value: [178.3, -18.06, 14]
					},
					{
						name: "芬兰",
						value: [25.03, 60.15, 15]
					},
					{
						name: "法国",
						value: [2.2, 48.5, 16]
					},
					{
						name: "法属圭亚那",
						value: [-52.18, 5.05, 12]
					},
					{
						name: "法属波利尼西亚",
						value: [-149.34, -17.32, 18]
					},
					{
						name: "加蓬",
						value: [9.26, 0.25, 14]
					},
					{
						name: "冈比亚",
						value: [-16.4, 13.28, 18]
					},
					{
						name: "格鲁吉亚",
						value: [44.5, 41.43, 12]
					},
					{
						name: "德国",
						value: [13.25, 52.3, 11]
					},
					{
						name: "加纳",
						value: [-0.06, 5.35, 17]
					},
					{
						name: "希腊",
						value: [23.46, 37.58, 12]
					},
					{
						name: "格陵兰",
						value: [-51.35, 64.1, 12]
					},
					{
						name: "瓜德罗普岛",
						value: [-61.44, 16, 14]
					},
					{
						name: "危地马拉",
						value: [-90.22, 14.4, 19]
					},
					{
						name: "根西岛",
						value: [-2.33, 49.26, 11]
					},
					{
						name: "几内亚",
						value: [-13.49, 9.29, 15]
					},
					{
						name: "几内亚比绍",
						value: [-15.45, 11.45, 12]
					},
					{
						name: "圭亚那",
						value: [-58.12, 6.5, 18]
					},
					{
						name: "海地",
						value: [-72.2, 18.4, 18]
					},
					{
						name: "赫德岛和麦当劳群岛",
						value: [74, -53, 18]
					},
					{
						name: "洪都拉斯",
						value: [-87.14, 14.05, 11]
					},
					{
						name: "匈牙利",
						value: [19.05, 47.29, 10]
					},
					{
						name: "冰岛",
						value: [-21.57, 64.1, 14]
					},
					{
						name: "印度",
						value: [77.13, 28.37, 18]
					},
					{
						name: "印度尼西亚",
						value: [106.49, -6.09, 15]
					},
					{
						name: "伊朗",
						value: [51.3, 35.44, 17]
					},
					{
						name: "伊拉克",
						value: [44.3, 33.2, 19]
					},
					{
						name: "爱尔兰",
						value: [-6.15, 53.21, 16]
					},
					{
						name: "以色列",
						value: [35.12, 31.47, 11]
					},
					{
						name: "意大利",
						value: [12.29, 41.54, 12]
					},
					{
						name: "牙买加",
						value: [-76.5, 18, 18]
					},
					{
						name: "约旦",
						value: [35.52, 31.57, 15]
					},
					{
						name: "哈萨克斯坦",
						value: [71.3, 51.1, 16]
					},
					{
						name: "肯尼亚",
						value: [36.48, -1.17, 11]
					},
					{
						name: "基里巴斯",
						value: [173, 1.3, 18]
					},
					{
						name: "科威特",
						value: [48, 29.3, 12]
					},
					{
						name: "吉尔吉斯斯坦",
						value: [74.46, 42.54, 10]
					},
					{
						name: "老挝",
						value: [102.36, 17.58, 19]
					},
					{
						name: "拉脱维亚",
						value: [24.08, 56.53, 15]
					},
					{
						name: "黎巴嫩",
						value: [35.31, 33.53, 14]
					},
					{
						name: "莱索托",
						value: [27.3, -29.18, 17]
					},
					{
						name: "利比里亚",
						value: [-10.47, 6.18, 12]
					},
					{
						name: "阿拉伯利比亚民众国",
						value: [13.07, 32.49, 16]
					},
					{
						name: "列支敦士登",
						value: [9.31, 47.08, 17]
					},
					{
						name: "立陶宛",
						value: [25.19, 54.38, 11]
					},
					{
						name: "卢森堡",
						value: [6.09, 49.37, 12]
					},
					{
						name: "马达加斯加",
						value: [47.31, -18.55, 11]
					},
					{
						name: "马拉维",
						value: [33.48, -14, 18]
					},
					{
						name: "马来西亚",
						value: [101.41, 3.09, 16]
					},
					{
						name: "马尔代夫",
						value: [73.28, 4, 12]
					},
					{
						name: "马里",
						value: [-7.55, 12.34, 10]
					},
					{
						name: "马耳他",
						value: [14.31, 35.54, 10]
					},
					{
						name: "马提尼克岛",
						value: [-61.02, 14.36, 10]
					},
					{
						name: "毛里塔尼亚",
						value: [57.3, -20.1, 14]
					},
					{
						name: "马约特岛",
						value: [45.14, -12.48, 17]
					},
					{
						name: "墨西哥",
						value: [-99.1, 19.2, 10]
					},
					{
						name: "密克罗尼西亚(联邦) ",
						value: [158.09, 6.55, 11]
					},
					{
						name: "摩尔多瓦共和国",
						value: [28.5, 47.02, 13]
					},
					{
						name: "莫桑比克",
						value: [32.32, -25.58, 11]
					},
					{
						name: "缅甸",
						value: [96.2, 16.45, 10]
					},
					{
						name: "纳米比亚",
						value: [17.04, -22.35, 17]
					},
					{
						name: "尼泊尔",
						value: [85.2, 27.45, 11]
					},
					{
						name: "荷兰",
						value: [4.54, 52.23, 12]
					},
					{
						name: "荷属安的列斯",
						value: [-69, 12.05, 14]
					},
					{
						name: "新喀里多尼亚",
						value: [166.3, -22.17, 15]
					},
					{
						name: "新西兰",
						value: [174.46, -41.19, 10]
					},
					{
						name: "尼加拉瓜",
						value: [-86.2, 12.06, 17]
					},
					{
						name: "尼日尔",
						value: [2.06, 13.27, 16]
					},
					{
						name: "尼日利亚",
						value: [7.32, 9.05, 16]
					},
					{
						name: "诺福克岛",
						value: [168.43, -45.2, 13]
					},
					{
						name: "北马里亚纳群岛",
						value: [145.45, 15.12, 18]
					},
					{
						name: "挪威",
						value: [10.45, 59.55, 12]
					},
					{
						name: "阿曼",
						value: [58.36, 23.37, 18]
					},
					{
						name: "巴基斯坦",
						value: [73.1, 33.4, 10]
					},
					{
						name: "帕劳",
						value: [134.28, 7.2, 13]
					},
					{
						name: "巴拿马",
						value: [-79.25, 9, 17]
					},
					{
						name: "巴布亚新几内亚",
						value: [147.08, -9.24, 13]
					},
					{
						name: "巴拉圭",
						value: [-57.3, -25.1, 18]
					},
					{
						name: "秘鲁",
						value: [-77, -12, 12]
					},
					{
						name: "菲律宾",
						value: [121.03, 14.4, 14]
					},
					{
						name: "波兰",
						value: [21, 52.13, 15]
					},
					{
						name: "葡萄牙",
						value: [-9.1, 38.42, 12]
					},
					{
						name: "波多黎各",
						value: [-66.07, 18.28, 16]
					},
					{
						name: "卡塔尔",
						value: [51.35, 25.15, 11]
					},
					{
						name: "韩国",
						value: [126.58, 37.31, 18]
					},
					{
						name: "罗马尼亚",
						value: [26.1, 44.27, 12]
					},
					{
						name: "俄罗斯",
						value: [37.35, 55.45, 16]
					},
					{
						name: "卢旺达",
						value: [30.04, -1.59, 11]
					},
					{
						name: "圣基茨和尼维斯",
						value: [-62.43, 17.17, 15]
					},
					{
						name: "圣卢西亚",
						value: [-60.58, 14.02, 16]
					},
					{
						name: "圣皮埃尔和密克隆",
						value: [-56.12, 46.46, 14]
					},
					{
						name: "圣文森特和格林纳丁斯",
						value: [-61.1, 13.1, 18]
					},
					{
						name: "萨摩亚",
						value: [-171.5, -13.5, 19]
					},
					{
						name: "圣马力诺",
						value: [12.3, 43.55, 11]
					},
					{
						name: "圣多美和普林西比",
						value: [6.39, 0.1, 15]
					},
					{
						name: "沙特阿拉伯",
						value: [46.42, 24.41, 19]
					},
					{
						name: "塞内加尔",
						value: [-17.29, 14.34, 12]
					},
					{
						name: "塞拉利昂",
						value: [-13.17, 8.3, 19]
					},
					{
						name: "斯洛伐克",
						value: [17.07, 48.1, 13]
					},
					{
						name: "斯洛文尼亚",
						value: [14.33, 46.04, 13]
					},
					{
						name: "所罗门群岛",
						value: [159.57, -9.27, 11]
					},
					{
						name: "索马里",
						value: [45.25, 2.02, 16]
					},
					{
						name: "比勒陀利亚",
						value: [28.12, -25.44, 19]
					},
					{
						name: "西班牙",
						value: [-3.45, 40.25, 12]
					},
					{
						name: "苏丹",
						value: [32.35, 15.31, 17]
					},
					{
						name: "苏里南",
						value: [-55.1, 5.5, 17]
					},
					{
						name: "斯威士兰",
						value: [31.06, -26.18, 12]
					},
					{
						name: "瑞典",
						value: [18.03, 59.2, 19]
					},
					{
						name: "瑞士",
						value: [7.28, 46.57, 19]
					},
					{
						name: "阿拉伯叙利亚共和国",
						value: [36.18, 33.3, 19]
					},
					{
						name: "塔吉克斯坦",
						value: [68.48, 38.33, 15]
					},
					{
						name: "泰国",
						value: [100.35, 13.45, 16]
					},
					{
						name: "马其顿",
						value: [21.26, 42.01, 16]
					},
					{
						name: "多哥",
						value: [1.2, 6.09, 19]
					},
					{
						name: "汤加",
						value: [-174, -21.1, 12]
					},
					{
						name: "突尼斯",
						value: [10.11, 36.5, 16]
					},
					{
						name: "土耳其",
						value: [32.54, 39.57, 19]
					},
					{
						name: "土库曼斯坦",
						value: [57.5, 38, 14]
					},
					{
						name: "图瓦卢",
						value: [179.13, -8.31, 13]
					},
					{
						name: "乌干达",
						value: [32.3, 0.2, 12]
					},
					{
						name: "乌克兰",
						value: [30.28, 50.3, 17]
					},
					{
						name: "阿联酋",
						value: [54.22, 24.28, 12]
					},
					{
						name: "英国",
						value: [-0.05, 51.36, 13]
					},
					{
						name: "坦桑尼亚",
						value: [35.45, -6.08, 11]
					},
					{
						name: "美国",
						value: [-77.02, 39.91, 14]
					},
					{
						name: "美属维尔京群岛",
						value: [-64.56, 18.21, 19]
					},
					{
						name: "乌拉圭",
						value: [-56.11, -34.5, 18]
					},
					{
						name: "乌兹别克斯坦",
						value: [69.1, 41.2, 13]
					},
					{
						name: "瓦努阿图",
						value: [168.18, -17.45, 19]
					},
					{
						name: "委内瑞拉",
						value: [-66.55, 10.3, 16]
					},
					{
						name: "越南",
						value: [105.55, 21.05, 11]
					},
					{
						name: "南斯拉夫",
						value: [20.37, 44.5, 13]
					},
					{
						name: "赞比亚",
						value: [28.16, -15.28, 14]
					},
					{
						name: "津巴布韦",
						value: [31.02, -17.43, 19]
					},
				];
				var baseTexture = null;
				var option = null;
				var geoJson = null;
				var bb = null

				function getGeoJsonData() {
					geoJson = WorldJSON;
					console.log("klk",WorldJSON)
					// bb = aa2.filter(function(dataItem) {
					// 		return dataItem[2] > 0;
					// 	})
					// 	.map(function(dataItem) {
					// 		return [dataItem[0], dataItem[1], Math.sqrt(dataItem[2])];
					// 	});
					getBaseTexture();
				}
				

				function getBaseTexture() {
					echarts.registerMap("world", geoJson);
					let canvas = document.createElement("canvas");
					baseTexture = echarts.init(canvas, null, {
						// width: 4096,
						// height: 2048,
						width: 8192,
						height: 4096,
						// width:9011.2,
						// height:4505.6
					});
					baseTexture.setOption({
						backgroundColor: "rgba(0,11,23,.2)", //地球背景
						series: [{
							type: "map",
							map: "world",
							itemStyle: {
								areaColor: "#11426D", //地球陆地颜色
								borderColor: "#fff", //地球陆地边框颜色
								borderWidth: 2,
							},
						}, ],
					});
					drawEarth();
				}
				var self = this;

				function drawEarth() {
					option = {
						visualMap: {
							show: false,
							min: 0,
							max: 60,
							inRange: {
								symbolSize: [1.0, 10.0],
							},
						},
						globe: {
							// show: false,
							silent: true,//true 去掉移入地图选中
							globeOuterRadius: 100,
							baseTexture: baseTexture,
							// environment: "#00060C",
							light: {
								ambient: {
									color: "#fff",
									intensity: 1,
								},
							},
						},
						series: [{
							type: 'scatter3D',
							coordinateSystem: 'globe',
							itemStyle: {
								color: '#008CE8', //球上面点颜色
								opacity: 1,
							},
							// data: bb,
							data: jwdInfo
						}, ],
					};
					self.myChart.clear();
					self.myChart.setOption(option, true);
				}
				getGeoJsonData();
			},

			// 销毁图表。
			disposeChart() {
				if (this.myChart) {
					this.myChart.dispose();
				}
			},
			// 重新加载图表。
			reloadChart() {
				this.disposeChart();
				this.drawChart();
			},
		},
	};
</script>

<style lang="scss" scoped>
	.bar {
		width: 100%;
		height: 100%;

		.volume {
			width: 100%;
			height: 100%;
		}
	}
</style>