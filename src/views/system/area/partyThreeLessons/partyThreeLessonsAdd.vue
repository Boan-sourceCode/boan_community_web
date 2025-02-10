<!-- 优秀优秀党组织 -->
<template>
	<div class="app-container">
		<h1 class="title">{{type==1?"编辑会议":"添加会议"}}</h1>
		<el-form ref="addForm" :model="addForm" label-width="106px" class="form-box" :rules="rules">
			<div class="sec_input sec_left">
				<el-form-item label="会议名称：" prop="meetingName" class="input-width" style="width: 100%; display: inline-block">
					<el-input v-model="addForm.meetingName" placeholder="请输入会议名称" />
				</el-form-item>
			</div>
			<div class="sec_input sec_cen">
				<el-form-item label="会议时间：" prop="dataTime" class="input-width" style="width: 100%; display: inline-block">
					<el-date-picker v-model="dataTime" type="daterange" range-separator="至" @blur="aaa" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" style="width: 100%; display: inline-block">
					</el-date-picker>
				</el-form-item>
				<!--meetingStartTime,meetingEndTime-->
			</div>
			<div class="sec_input sec_right">
				<el-form-item label="会议地点：" prop="meetingAddr" style="width: 100%; display: inline-block">
					<el-input clearable v-model="addForm.meetingAddr" placeholder="请输入会议地点" />
				</el-form-item>
			</div>
			<div style="clear: both;"></div>
			<div class="sec_input sec_left">
				<el-form-item label="组织部门：" prop="areaId" style="width: 100%; display: inline-block">
					<treeSelect v-model="addForm.areaId" :props="partyTreeEditProps" :options="partyTreeEditData" :value="addForm.areaId" placeholder="请选择" style="width: 100%; display: inline-block">
					</treeSelect>
				</el-form-item>
			</div>
			<div class="sec_input sec_cen">
				<el-form-item label="主持人：" prop="meetingHost" style="width: 78%;float: left; display: inline-block">
					<p class="sec_host_list"><span v-for="(item,index) in hostList">{{item.name}}</span></p>
				</el-form-item>
				<p class="sec_input_btn" style="float: left;margin-left: 4%;width: 18%;" @click="handleChoose(sign='主持人')">选择</p>
			</div>
			<div class="sec_input sec_right">
				<el-form-item label="会议类型：" prop="meetingType" style="width: 100%; display: inline-block">
					<el-select clearable v-model="addForm.meetingType" placeholder="请选择" style="width: 100%; display: inline-block">
						<el-option v-for="dict in dict.type.meeting_type" :key="dict.value" :label="dict.label" :value="dict.value">
						</el-option>
					</el-select>
				</el-form-item>
			</div>
			<div class="sec_comm">
				<el-form-item label="参会人员：" prop="participants">
					<p class="sec_user_list"><span v-for="(item,index) in userList">{{item.name}}</span></p>
					<el-button type="primary" plain @click="handleChoose(sign='参会人员')">选择</el-button>
				</el-form-item>
			</div>
			<div class="sec_comm">
				<el-form-item label="会议简介：" prop="memo">
					<el-input type="textarea" autosize="true" v-model="addForm.memo"></el-input>
				</el-form-item>
			</div>

			<div class="sec_comm">
				<el-form-item label="会议图片：" prop="meetingImage">
					<image-upload class="img_up" v-model="addForm.meetingImage" :limit="12" style="float:left" />
					<p class="sec_comm_ti">注：缩略图建议尺寸：800*600px(4:3)</p>
				</el-form-item>
			</div>
			<div class="sec_comm">
				<el-form-item label="会议形式：">
					<el-radio v-model="addForm.meetingForm" label="现场会议" style="margin-right: 30px;">现场会议</el-radio>
					<el-radio v-model="addForm.meetingForm" label="直播会议">直播会议</el-radio>
				</el-form-item>
			</div>
			<div class="sec_btn">
				<el-form-item style="text-align: center; margin: 0">
					<el-button type="primary" size="mini" @click="saveAndAdd('addForm')" style="width:130px">保存</el-button>
					<!-- <el-button type="info" size="mini" @click="goBack" style="width:130px">返回</el-button> -->
				</el-form-item>
			</div>
		</el-form>
		<!-- 党员选择器弹窗 -->
		<el-dialog :visible.sync="chooseDialog" title="党员选择器" width="80%" :close-on-click-modal="false" @close="closeChooseDialog()" style="font-size: 20px; height: 769px">
			<template>
				<el-form ref="chooseForm" label-width="138px" :model="chooseForm">
					<div class="bigbox">
						<div class="leftbox">
							<p class="boxTitle">党支部:</p>
							<el-tree :data="partyTreeEditData" :props="partyTreeEditProps" node-key="id" @node-click="sendYourSelf" style="background:#efefef"></el-tree>
						</div>
						<div class="rightbox">
							<div class="table">
								<el-form v-model="queryParams" :inline="true" size="small">
									<el-form-item label-width="96px">
										<el-input clearable v-model="chooseForm.key" placeholder="姓名/身份证" />
									</el-form-item>
									<el-button size="small" @click="handlePartyQuery" plain>查询</el-button>
								</el-form>
								<el-table :loading="loading" :data="partyChooseList" :header-cell-style="{ background: '#EBF7FF' }" stripe border @selection-change="partySelectionChange" ref="partyMemberTable" :row-key="getRowKeyParty">
									<el-table-column label="选择" :reserve-selection="true" type="selection" width="55" align="center" />
									<el-table-column label="姓名" prop="name" align="center" />
									<el-table-column label="党组织" prop="partyName" align="center" />
									<el-table-column label="身份证号" prop="idCard" align="center">
										<template slot-scope="scope">
											<p v-if="scope.row.idCard === '' || scope.row.idCard === null">/</p>
											<p v-else>{{ scope.row.idCard }}</p>
										</template>
									</el-table-column>
									<el-table-column label="性别" prop="sex" align="center">
										<template slot-scope="scope">
											<p v-if="scope.row.sex === '' || scope.row.sex === null">/</p>
											<p v-else>{{ scope.row.sex }}</p>
										</template>
									</el-table-column>
									<el-table-column label="联系方式" prop="phoneNumber" align="center">
										<template slot-scope="scope">
											<p v-if="scope.row.phoneNumber === '' || scope.row.phoneNumber === null">/</p>
											<p v-else>{{ scope.row.phoneNumber }}</p>
										</template>
									</el-table-column>
								</el-table>
								<!-- 分页 -->
								<pagination :total="partyChooseTotal" :page.sync="chooseForm.pageNum" :limit.sync="chooseForm.pageSize" @pagination="sendYourSelf()" />
							</div>
							<div class="choice">
								<p style="margin-top: 0">已选择</p>
								<div v-if="this.partyMemberIds.length !== 0">
									<p v-for="(item,index) in this.partyMemberIds">
										<span>{{ item.name }}</span>
										<i @click="toggleSelection(item)" class="el-icon-circle-close"></i>
									</p>
								</div>
								<div v-else style="text-align: center">
									<p>暂未选择</p>
								</div>
							</div>
						</div>
					</div>
				</el-form>
			</template>
			<div slot="footer" style="text-align: center">
				<el-button type="primary" @click="submitChoose">保存</el-button>
				<el-button @click="closeChooseDialog()">取消</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import { areaTree } from "@/api/area/area";
	import { partyTreeLimit } from "@/api/area/partymember";
	import { partyNumber } from "@/api/area/largeScreen";
	import { listVillage, getMeetList, getAddMeeting, getEditMeeting } from "@/api/area/village";
	import { selectPartyInfo, partyEdit, selectParty, selectChildParty, selectPartyMember, selectPartyMemberNoPage, submitPartyMember, updateParty, addParty } from "@/api/area/partyOrganization";
	export default {
		name: "threeClass",
		dicts: ["sys_normal_disable", "meeting_status", "meeting_type"],
		data() {
			return {
				addForm: {
					meetingName: "",
					meetingAddr: "",
					areaId: "",
					addUser: "",
					memo: "",
					meetingStartTime: "",
					meetingEndTime: "",
					meetingType: "",
					meetingImage: "",
					participants: [],
					meetingForm: "现场会议",
					dataTime: "",
					meetingHost: ""
				},
				dataTime: "",
				chooseDialog: false,
				partyChooseList: [], //党员选择器表格数据
				partyMemberIds: [], //党员选择器多选框选中数据
				partyData: [], //党员选择器保存返回的数据
				partyTreeEditData: [],
				partyTreeEditProps: {
					label: "label",
					value: "id",
					children: "children",
				},
				chooseForm: { //党员选择器表格数据
					partyBranch: '',
					key: '',
					flag: 0,
					pageNum: 1,
					pageSize: 10,
				},
				partyChooseTotal: 0, //党员选择器表格总条数
				queryParams: {
					userId: localStorage.getItem("userId"),
					areaId: '',
					year: '',
					key: '',
					pageNum: 1,
					pageSize: 10,
				},
				loading: false,
				userList: [],
				hostList: [],
				type: 0,
				rules: {
					meetingName: [{
						required: true,
						trigger: "blur",
						message: '请输入会议名称'
					}],
					dataTime: [{
						required: true,
						trigger: "change",
						message: '请选择会议时间'
					}],
					meetingAddr: [{
						required: true,
						trigger: "blur",
						message: '请输入会议地点'
					}],
					areaId: [{
						required: true,
						trigger: "blur",
						message: '请选择组织部门'
					}],
					meetingHost: [{
						required: true,
						trigger: "blur",
						message: '请选择主持人'
					}],
					meetingType: [{
						required: true,
						trigger: "blur",
						message: '请选择会议类型'
					}],
					participants: [{
						required: true,
						trigger: "blur",
						message: '请选择参会人员'
					}],
					memo: [{
						required: true,
						trigger: "blur",
						message: '请输入会议简介'
					}]
				},
			};
		},
		mounted() {
			this.getPartyTreeEdit()
			var type = this.$route.query.type
			this.type = type
			if(type == 1) {
				var detail = JSON.parse(this.$route.query.detail)
				this.addForm = {
					meetingId: detail.meetingId,
					meetingEndTime: detail.meetingEndTime,
					meetingStartTime: detail.meetingStartTime,
					meetingType: detail.meetingType,
					meetingName: detail.meetingName,
					meetUser: detail.meetUser,
					meetingImage: detail.meetingImage,
					meetingAddr: detail.meetingAddr,
					memo: detail.memo,
					areaId: detail.areaId,
					meetingForm: detail.meetingForm,
					meetingHost: detail.meetingHost,
					participants: detail.participants
				}
				var hostarr = {
					name: detail.meetingHostName
				}
				this.hostList.push(hostarr)
				var userName = detail.participantsName
				for(var i in userName) {
					var arr = {
						name: userName[i],

					}
					this.userList.push(arr)
				}
				var time = detail.meetingStartTime + "," + detail.meetingEndTime
				this.addForm.dataTime = time.split(",")
				this.dataTime = time.split(",")
			}
		},
		methods: {
			aaa() {
				this.addForm.dataTime = this.dataTime
				console.log(this.addForm.dataTime)
			},
			// 党组织编辑弹窗-至-党员选择器弹窗
			handleChoose() {
				this.chooseDialog = true;
				this.getPartyTreeEdit(); //党组织树
			},
			//党组织树
			getPartyTreeEdit() {
				let param = {
					userId: localStorage.getItem("userId"),
				}
				partyTreeLimit(param).then(res => {
					this.partyTreeEditData = res.data
					this.sendYourSelf()
				})
			},
			//添加党员选择器弹窗关闭
			closeChooseDialog() {
				this.chooseDialog = false;
				if(this.$refs.partyMemberTable) {
					this.$refs.partyMemberTable.clearSelection();
				}
			},
			//党员选择器分页后选中的值不被清空
			getRowKeyParty(row) {
				return row.id
			},
			// 党员选择器多选框选中数据
			partySelectionChange(val) {
				if(this.sign === '主持人') {
					if(val.length === 1) {
						this.partyMemberIds = val
					}
					if(val.length > 1) {
						this.partyMemberIds = val
						// shift() 方法用于把数组的第一个元素从其中删除，并返回第一个元素的值。
						// 该方法不创建新数组，而是直接修改原有的 arrayObject。
						let del_row = val.shift()
						// 其余的都不选中
						this.$refs.partyMemberTable.toggleRowSelection(del_row, false)
						console.log(this.partyMemberIds)
					}
				} else {
					this.partyMemberIds = val
				}
				console.log(this.partyMemberIds)
			},
			//党员选择器表格数据
			sendYourSelf(data) {
				if(data !== null && data !== undefined && data !== '') {
					this.chooseForm.partyBranch = data.id
				} else {
					this.chooseForm.partyBranch = ''
				}
				selectPartyMember(this.chooseForm).then((res) => {
					this.partyChooseList = res.data.list;
					this.partyChooseTotal = res.data.total
				});
				console.log(this.partyMemberIds)
			},

			// 党员查询按钮
			handlePartyQuery() {
				this.sendYourSelf()
			},
			//点击清除选中
			toggleSelection(val) {
				this.$refs.partyMemberTable.toggleRowSelection(val);
				//				console.log(this.partyMemberIds)
				//				if(this.sign === '参会人员') {
				//					this.partyMemberIds = []
				//				} else if(this.sign === '主持人') {
				//					this.partyMemberIds = []
				//				}
			},

			//多选框数据保存
			submitChoose() {
				console.log(this.partyMemberIds)
				var list = this.partyMemberIds;
				var ids = []
				var names = []
				for(var i in list) {
					ids.push(list[i].peopleCard)
					names.push(list[i].name)
				}
				if(this.sign === '参会人员') {
					this.userList = this.partyMemberIds
					this.addForm.participants = ids
				} else if(this.sign === '主持人') {
					this.hostList = this.partyMemberIds
					this.addForm.meetingHost = ids.toString()
				}
				this.chooseDialog = false
			},
			saveAndAdd(addForm) {
				this.addForm.meetingStartTime = this.addForm.dataTime[0]
				this.addForm.meetingEndTime = this.addForm.dataTime[1]
				console.log(this.addForm)
				this.$refs[addForm].validate((valid) => {
					if(valid) {
						if(this.type == 0) {
							var addForm = {
								meetingEndTime: this.addForm.meetingEndTime,
								meetingStartTime: this.addForm.meetingStartTime,
								meetingType: this.addForm.meetingType,
								meetingName: this.addForm.meetingName,
								meetUser: this.addForm.meetUser,
								meetingImage: this.addForm.meetingImage,
								meetingAddr: this.addForm.meetingAddr,
								memo: this.addForm.memo,
								areaId: this.addForm.areaId,
								meetingForm: this.addForm.meetingForm,
								meetingHost: this.addForm.meetingHost,
								participants: this.addForm.participants
							}
							getAddMeeting(addForm).then((res) => {
								if(res.code == 200) {
									this.$message.success("添加成功");
									setTimeout(function() {
										window.history.go(-1)
									}, 2000)
								}
							})
						} else {
							var addForm = {
								meetingId: this.addForm.meetingId,
								meetingEndTime: this.addForm.meetingEndTime,
								meetingStartTime: this.addForm.meetingStartTime,
								meetingType: this.addForm.meetingType,
								meetingName: this.addForm.meetingName,
								meetUser: this.addForm.meetUser,
								meetingImage: this.addForm.meetingImage,
								meetingAddr: this.addForm.meetingAddr,
								memo: this.addForm.memo,
								areaId: this.addForm.areaId,
								meetingForm: this.addForm.meetingForm,
								meetingHost: this.addForm.meetingHost,
								participants: this.addForm.participants
							}
							getEditMeeting(addForm).then((res) => {
								if(res.code == 200) {
									this.$message.success("编辑成功");
									setTimeout(function() {
										window.history.go(-1)
									}, 2000)
								}
							});
						}
					} else {
						return false;
					}
				});

			},
			goBack() {
        
			},

		},
	};
</script>

<style scoped>
	* {
		margin: 0;
	}
	
	.title {
		font-size: 24px;
		font-family: Microsoft YaHei;
		font-weight: bold;
		color: #000000;
		line-height: 100px;
		text-align: center;
	}
	
	.sec_input {
		width: 33.3%;
		float: left;
		padding: 10px 0;
	}
	
	.sec_btn {
		clear: both;
		width: 100%;
		border-top: 1px solid #999;
		padding: 30px;
		margin-top: 30px;
	}
	
	.sec_comm {
		width: 100%;
		clear: both;
		padding: 10px 0;
	}
	
	.sec_comm_ti {
		font-size: 12px;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #999999;
		line-height: 32px;
		float: left;
		margin-left: 10px;
	}
	
	.sec_user_list {
		width: 100%;
		font-size: 14px;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #000000;
		line-height: 32px;
	}
	
	.sec_input_btn {
		height: 34px;
		line-height: 34px;
		text-align: center;
		border: 1px solid #1890ff;
		color: #1890ff;
		border-radius: 5px;
	}
	
	.sec_user_list span,
	.sec_host_list span {
		margin-right: 5px;
	}
	
	.sec_host_list {
		width: 100%;
		height: 35px;
		font-size: 14px;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #000000;
		line-height: 35px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		box-sizing: border-box;
		padding: 0 10px;
		border: 1px solid #DCDFE6;
	}
	/*党员选择器*/
	/* 大盒子 */
	
	.bigbox {
		overflow: hidden;
		width: 100%;
	}
	/* 党员选择器-左侧盒子 */
	
	.leftbox {
		width: 27%;
		height: 65vh;
		background-color: #efefef;
		float: left;
		overflow-x: hidden;
		overflow-y: auto;
	}
	/*左侧滚动条*/
	
	.leftbox::-webkit-scrollbar {
		width: 6px;
		height: 2px;
	}
	
	.leftbox::-webkit-scrollbar-thumb {
		border-radius: 2px;
		background: rgba(0, 0, 0, 0.3);
	}
	
	.leftbox::-webkit-scrollbar-track {
		border-radius: 0;
	}
	/* 右侧盒子 */
	
	.rightbox {
		float: left;
		margin-left: 1%;
		width: 72%;
		padding: 0 20px 10px 20px;
	}
	
	.boxTitle {
		margin-left: 15px;
		font-size: 14px;
		font-weight: bold;
	}
	/* 请输入盒子 */
	
	.table {
		display: inline-block;
		width: 80%;
		vertical-align: top;
	}
	
	.choice {
		display: inline-block;
		width: 20%;
		padding-left: 20px;
	}
	
	.choice div {
		border: 1px solid #ccc;
	}
	
	.choice p {
		position: relative;
	}
	
	.choice span {
		padding: 0 0 0 30%;
	}
	
	.choice i {
		cursor: pointer;
		position: absolute;
		top: 3px;
		right: 16%;
	}
	
	.peopleSpan {
		margin-right: 10px;
		padding: 6px;
		border-radius: 4px;
		background: #9bc6e3;
		color: #fff;
	}
</style>