<!-- 优秀优秀党组织 -->
<template>
	<div class="app-container">
		<div class="d_left">
			<div class="d_left_top">
				<h1>会议详情</h1>
				<div><span><i class="d_left_top_nb"></i>会议名称：</span>{{detail.meetingName}}</div>
				<div>
					<p><span><i class="d_left_top_nb"></i>开始时间：</span>{{detail.meetingStartTime}}</p>
					<p><span>结束时间：</span>{{detail.meetingEndTime}}</p>
				</div>
				<div>
					<p><span><i class="d_left_top_nb"></i>会议地点：</span>{{detail.meetingAddr}}</p>
					<p><span>组织部门：</span>{{detail.meetingForm}}</p>
				</div>
				<div>
					<p><span><i class="d_left_top_na"></i>主持人：</span>{{detail.meetingHostName}}</p>
					<p><span>会议类型：</span>{{detail.meetingType}}</p>
				</div>
				<!-- <div><span>实到/应到：</span>0/{{detail.participants.length}}</div> -->
				<div>
					<span><i class="d_left_top_nb"></i>会议介绍：</span>
					<div>{{detail.memo}}</div>
				</div>
				<div><span><i class="d_left_top_nb"></i>会议图片：</span>
					<div><img :src="item" v-for="(item,index) in imgList" /></div>
				</div>
			</div>
			<div class="d_left_bottom">
				<h1>参会人员</h1>
				<el-table :loading="loading" :data="tableList" height="140" :header-cell-style="{ background: '#EBF7FF' }" stripe border>
					<el-table-column label="序号" align="center" prop="communistId" width="90px" />
					<el-table-column label="党组织" align="center" prop="partyName" width="200px" />
					<el-table-column label="党员姓名" align="center" prop="name" />
					<el-table-column label="签到状态" align="center" prop="meetingStartTime" />
					<el-table-column label="签到方式" align="center" prop="meetingEndTime" />
					<el-table-column label="签到时间" align="center" prop="meetingType" />
				</el-table>

				<pagination :total="total" :page.sync="queryParams.pageNum" :page-size="3" layout="prev, pager, next" @pagination="getList()" />
				<p>共{{total }}条信息</p>

			</div>
		</div>
		<div class="d_right">
			<h1>会议记录</h1>
			<div class="d_right_box">
				<div class="d_right_box_list" v-for="(item,index) in itemList">
					<h2>时间：{{item.addTime}}</h2>
					<p v-html="item.meetingMinutesContent"></p>
					<div class="d_right_box_list_i">
						<img :src="items" v-for="items in item.meetingAttachment" />
					</div>
				</div>
			</div>
			<div class="r_box" v-if="recordShow">
				<h1>会议记录 <p class="el-icon-close" @click="toClear"></p></h1>
				<div class="r_box_ed">
					<editor v-model="addRecord.meetingMinutesContent" :height="175" width="90%" />
				</div>
				<div class="r_box_file">
					<p>上传照片</p>
					<div class="r_box_file_l">
						<image-upload v-model="addRecord.meetingAttachment" :limit="3" style="float:left;" />
					</div>
				</div>
			</div>
			<div class="d_right_btn" v-if="!recordShow" @click="toAddMeet">添加记录</div>
			<div class="d_right_bot" v-if="recordShow">
				<div class="d_right_bot_l" @click="toSave">保存</div>
				<div class="d_right_bot_r" @click="toClear">取消</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { listVillage, getProperty, getMeetList, getMeetInfoList, getMeetCommonList, getAddMeeting, getAddMeetingRecord } from "@/api/area/village";
	import { areaTree } from "@/api/area/area";
	export default {
		name: "threeClass",
		dicts: ["sys_normal_disable", "meeting_status", "meeting_type"],
		data() {
			return {
				queryParams: {
					pageNum: 1,
					pageSize: 10,
					meetingId: ""
				},
				total: 0,
				tableList: [],
				loading: false,
				itemList: [],
				detail: {
					meetingName: "",
					meetingStartTime: "",
					meetingEndTime: "",
					meetingName: "",
					partyName: "",
					meetingType: "",
					meetingImage: ""
				},
				imgList: [],
				recordShow: false,
				dataContent: "",
				addRecord: {
					meetingMinutesContent: "",
					meetingAttachment: ""
				}
			};
		},
		created() {
			var detail = JSON.parse(this.$route.query.detail)
			this.queryParams.meetingId = detail.meetingId
			this.getDetail();
			this.getList();
			this.getCommonList();
		},
		methods: {
			// 获取页面数据
			getDetail() {
				let param = {
					id: this.detail.areaId
				}
				var detail = JSON.parse(this.$route.query.detail)
				if(detail.meetingImage) {
					var list = detail.meetingImage.split(',')
					for(var i in list) {
						list[i] = "https://xhl.zhsq365.cn/prod-api" + list[i]
					}
					this.imgList = list
				}
				this.detail = detail
			},
			getList() {
				getMeetInfoList(this.queryParams).then((res) => {
					this.tableList = res.rows;
					this.total = res.total
				});
			},
			getCommonList() {
				var params = {
					meetingId: this.detail.meetingId
				}
				getMeetCommonList(params).then((res) => {
					var list = res.rows;
					for(var i in list) {
						if(list[i].meetingAttachment) {
							list[i].meetingAttachment = list[i].meetingAttachment.split(",")
							var arr = list[i].meetingAttachment;
							for(var j in arr) {
								arr[j] = "/dev-api" + arr[j]
							}
							list[i].meetingAttachment = arr
						}
					}
					this.itemList = res.rows;
				});
			},
			toAddMeet() {
				this.recordShow = true
			},
			toSave() {
				var addRecord = this.addRecord;
				addRecord = {
					meetingMinutesContent: addRecord.meetingMinutesContent,
					meetingAttachment: addRecord.meetingAttachment,
					meetingId: this.detail.meetingId,
					areaId: this.detail.areaId,
					addUser: ""
				}
				getAddMeetingRecord(addRecord).then((res) => {
					if(res.code == 200) {
						this.getCommonList()
						this.toClear()
					}
				});
			},
			toClear() {
				this.recordShow = false
				this.addRecord.meetingMinutesContent = ""
				this.addRecord.meetingAttachment = ""
			}

		},
	};
</script>

<style scoped>
	* {
		margin: 0;
		padding: 0;
	}
	
	.d_left {
		float: left;
		width: 910px;
		margin-left: 50px;
		margin-top: 30px;
	}
	
	.d_left_top {
		width: 911px;
		height: 519px;
		box-sizing: border-box;
		padding: 0 30px;
		overflow-y: scroll;
		box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.15);
	}
	
	.d_left_top::-webkit-scrollbar {
		display: none
	}
	
	.d_right {
		position: relative;
	}
	
	.d_left_top h1,
	.d_left_bottom h1,
	.d_right h1 {
		font-size: 18px;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #000000;
		padding: 27px 0;
	}
	
	.d_left_top>div {
		font-size: 14px;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #000000;
		line-height: 32px;
		overflow: hidden;
	}
	
	.d_left_top>div p {
		float: left;
		width: 50%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 14px;
	}
	
	.d_left_top div div {
		float: left;
		width: 700px;
		
		clear: both;
	}
	
	.d_left_top div span {
		float: left;
	}
	
	.d_left_top div img {
		width: 156px;
		height: 104px;
		float: left;
		margin-top: 10px;
		margin-right: 20px;
	}
	.d_left_top_na{
		display: inline-block;
		width: 26px;
		height: 12px;
	}
	.d_left_top_nb{
		display: inline-block;
		width: 8px;
		height: 12px;
	}
	.d_left_bottom {
		width: 911px;
		height: 350px;
		box-sizing: border-box;
		padding: 0 30px;
		margin-top: 22px;
		box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.15);
	}
	
	.d_right {
		float: right;
		width: 710px;
		box-sizing: border-box;
		padding: 0 30px;
		height: 890px;
		margin-right: 50px;
		margin-top: 30px;
		box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.15);
	}
	
	.d_right_box::-webkit-scrollbar {
		display: none
	}
	
	.d_right_box {
		width: 100%;
		height: 700px;
		overflow-y: scroll;
	}
	
	.d_right_box_list {
		width: 100%;
		padding: 30px 0;
		border-bottom: 1px solid #999999;
	}
	
	.d_right_box_list:last-of-type {
		border-bottom: none;
	}
	
	.d_right_box_list h2 {
		font-size: 14px;
		font-family: Microsoft YaHei;
		font-weight: bold;
		color: #1F79F3;
		line-height: 24px;
	}
	
	.d_right_box_list p {
		font-size: 14px;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #333333;
		line-height: 24px;
		padding: 10px 0;
	}
	
	.d_right_box_list_i img {
		width: 148px;
		height: 99px;
		margin-right: 10px;
	}
	
	.d_right_btn {
		width: 131px;
		height: 32px;
		margin: 30px auto;
		text-align: center;
		line-height: 32px;
		color: #FFF;
		background: #0062CC;
		border-radius: 5px;
	}
	
	.r_box::-webkit-scrollbar {
		display: none
	}
	
	.r_box {
		position: absolute;
		width: 661px;
		height: 580px;
		bottom: 150px;
		left: 30px;
		background: #FFF;
		border-radius: 20px;
		overflow-y: scroll;
		box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.15);
	}
	
	.r_box h1 {
		padding: 20px;
		font-size: 14px;
		font-family: Microsoft YaHei;
		font-weight: bold;
		color: #000000;
		border-bottom: 1px solid #909399;
	}
	
	.r_box h1 p {
		float: right;
	}
	
	.r_box_ed {
		padding: 10px 30px;
	}
	
	.r_box_file {
		padding: 0 30px;
	}
	
	.r_box_file p {
		float: left;
		font-size: 14px;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #000000;
		width: 80px;
	}
	
	.r_box_file_l {
		float: left;
		margin-left: 10px;
		padding: 5px;
		width: 480px;
	}
	
	.d_right_bot {
		text-align: center;
	}
	
	.d_right_bot div {
		width: 131px;
		height: 32px;
		font-size: 14px;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #FFFFFF;
		line-height: 32px;
		text-align: center;
		margin: 0 4px;
		display: inline-block;
		border-radius: 5px;
	}
	
	.d_right_bot_l {
		background: #0062CC;
	}
	
	.d_right_bot_r {
		background: #969896;
	}
</style>