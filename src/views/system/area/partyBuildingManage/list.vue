<!-- 党组织列表 -->
<template>
	<div class="box">
		<!--左侧区域-->
		<div class="left-box">
			<!-- 标题 -->
			<div class="titleBox">
				<h3 class="fontColor">党组织<span v-if="this.partyNumberList.party">（{{ this.partyNumberList.party }}）</span>
				</h3>
				<el-button plain size="mini" style="float: right" @click="handleAdd">新增</el-button>
			</div>
			<el-tree :data="partyTreeData" :props="partyTreeProps" node-key="id" @node-click="getPartyList"></el-tree>
		</div>

		<!-- 右侧区域 -->
		<div class="right-box">
			<!-- 右侧第一个模块 -->
			<div class="sec_r">
				<p>{{ partyList.partyInfo.partyName }}</p>
				<div style="float: right">
					<el-button @click="labelMap()">标注地图</el-button>
					<el-button @click="handleEdit()">编辑</el-button>
					<el-button @click="handleDelete()" type="danger">删除</el-button>
				</div>
				<div class="sec_r_cen">
					<img class="right-o-bl" v-if="this.partyList.partyInfo.partyAvatar !== ''"
						:src="partyList.partyInfo.partyAvatar" />
					<img class="right-o-bl" v-else src="@/assets/images/organization.jpg" />
					<div class="information">
						<p>所属上级：{{ partyList.partyInfo.partyName }}</p>
						<p>所属网格：{{ partyList.partyInfo.areaName }}</p>
						<p>党组织简称：{{ partyList.partyInfo.partyAcronym }}</p>
						<p>党组织分级：{{ partyList.partyInfo.partyLevel }}</p>
						<p>党组织荣誉：{{ partyList.partyInfo.partyHonor }}</p>
						<p>编号：{{ partyList.partyInfo.extend }}</p>
						<p>标准地址：</p>
						<p></p>
					</div>
					<div class="photos">
						<div class="photo" v-for="(item, index) in partyMemberNoPageList" :key="index">
							<img v-if="item.headPortrait !== ''" :src="item.headPortrait" />
							<img v-else src="@/assets/images/organizationHead.jpg" />
							<div class="photo_r" style="float: left;max-width: 100px;">
								<p>{{ item.name }}</p>
								<p>{{ item.partyOccupation }}</p>
							</div>
						</div>
					</div>
					<div v-if="partyMemberNoPageList.length != 0">
						<p @click="seeMore = true" class="more">查看更多</p>
					</div>
				</div>
			</div>

			<!-- 右侧第二个模块 -->
			<div class="right-t">
				<div class="item party">
					<i class="icon-organize" />
					<div>
						<span class="number">{{ this.childTotal }}</span>
						<span class="title">下级党组织</span>
					</div>
				</div>
				<div class="item member">
					<i class="icon-mans" />
					<div>
						<span class="number">{{ partyList.partyMemberCount }}</span>
						<span class="title">党员总数</span>
					</div>
				</div>
				<div class="item meeting">
					<i class="icon-meeting" />
					<div>
						<span class="number">{{ partyList.partyMeetingCount }}</span>
						<span class="title">三会一课</span>
					</div>
				</div>
				<div class="item organization">
					<i class="icon-information" />
					<div>
						<span class="number">{{ partyList.partyDynamicCount }}</span>
						<span class="title">组织动态</span>
					</div>
				</div>
			</div>

			<!-- 右侧第三个模块——党组织 -->
			<div class="right-th">
				<i class="icon-organize" />
				<span>党组织({{ this.childTotal }})</span>
				<span v-if="childPartyNoPageList.length !== 0" @click="partyMore = true" class="more">查看更多</span>
				<div class="right-th-items">
					<div class="right-th-item" v-for="(item, index) in this.childPartyNoPageList" :key="index">
						<p class="right-th-item_t">{{ item.partyName }}</p>
						<p><span>党员：{{ item.partyMemberCount }}人</span> <span>会议：{{ item.partyMeetingCount }}次</span></p>
					</div>
				</div>
			</div>
		</div>
		<!-- 查看更多人员弹窗 -->
		<el-dialog :visible.sync="seeMore" title="更多人员" width="70%" :close-on-click-modal="false">
			<div class="morePeoples">
				<div v-for="(item, index) in partyMemberList" :key="index" class="morePeople">
					<img v-if="item.headPortrait !== ''" :src="item.headPortrait" />
					<img v-else src="@/assets/images/organizationHead.jpg" />
					<div class="photo-r">
						<p>{{ item.name }}</p>
						<p>{{ item.partyOccupation }}</p>
					</div>
				</div>
			</div>
			<div slot="footer" style="text-align: center">
				<el-button @click="seeMore = false">确定</el-button>
			</div>
			<!-- 分页 -->
			<pagination :total="memberTotal" :page.sync="partyMember.pageNum" :limit.sync="partyMember.pageSize"
				:page-sizes="[18, 24, 30, 36]" @pagination="getPartyMember()" />
		</el-dialog>
		<!-- 查看更多党组织弹窗 -->
		<el-dialog :visible.sync="partyMore" title="更多党组织" width="70%" class="partyMoreDialog"
			:close-on-click-modal="false">
			<div class="right-th" style="margin: 0">
				<div class="right-th-items">
					<div class="right-th-item" v-for="(item, index) in this.childPartyList" :key="index">
						<p>{{ item.partyName }}</p>
						<p><span>党员：{{ item.partyMemberCount }}人</span> <span>会议：{{ item.partyMeetingCount }}次</span></p>
					</div>
				</div>
			</div>
			<div slot="footer" style="text-align: center">
				<el-button @click="partyMore = false">确定</el-button>
			</div>
			<!-- 分页 -->
			<pagination :total="childTotal" :page.sync="childParty.pageNum" :limit.sync="childParty.pageSize"
				@pagination="getChildParty()" />
		</el-dialog>
		<!--标注弹窗-->
		<el-dialog :visible.sync="dialogAnnotate" title="标注党组织" width="70%" height="600px" class="map"
			ref="dialogDataBuilding" :close-on-click-modal="false" @close="closeMap()">
			<gridMap :mapData='mapData' :dialogAnnotate='dialogAnnotate' @coordinates="coordinates"></gridMap>
		</el-dialog>
		<!--党组织编辑弹窗-->
		<div>
			<!-- 党组织新增弹窗 -->
			<el-dialog :visible.sync="addPartyDialog" title="党组织新增" width="70%" :close-on-click-modal="false"
				@close="closeAddDialog('addPartyForm')" center>
				<template>
					<el-form ref="addPartyForm" label-width="138px" :model="addPartyForm" :rules="rules">
						<div class="dialogBox">
							<el-form-item label="所属网格：" prop="areaId" class="input-width">
								<treeSelect v-model="addPartyForm.areaId" :props="treeProps" :options="treeData"
									:value="value" placeholder="请选择">
								</treeSelect>
							</el-form-item>
							<el-form-item label="编号：" prop="extend" class="input-width">
								<el-input clearable v-model="addPartyForm.extend" placeholder="请输入编号" />
							</el-form-item>
							<el-form-item label="所属上级：" prop="partyPid" class="input-width">
								<treeSelect v-model="addPartyForm.partyPid" :props="partyTreeProps" :options="partyTreeData"
									:value="partyValue" placeholder="请选择">
								</treeSelect>
							</el-form-item>
							<el-form-item label="党组织名称：" prop="partyName" class="input-width">
								<el-input clearable v-model="addPartyForm.partyName" placeholder="请输入组织名称" />
							</el-form-item>
							<el-form-item label="党组织简称：" prop="partyAcronym" class="input-width">
								<el-input clearable v-model="addPartyForm.partyAcronym" placeholder="请输入简称" />
							</el-form-item>
							<div>
								<el-form-item label="书记：" prop="partyManager" class="input-width">
									<span class="peopleSpan" v-if="addPartyForm.partyManagerInfo === null">暂无人员</span>
									<span class="peopleSpan"
										v-else-if="addPartyForm.partyManagerInfo === undefined">暂无人员</span>
									<span class="peopleSpan"
										v-else-if="addPartyForm.partyManagerInfo.length === 0">暂无人员</span>
									<span class="peopleSpan" v-else v-for="item in addPartyForm.partyManagerInfo">{{
										item.name }}</span>
									<el-button class="choose" plain style="margin-left: 3%"
										@click="handleChoose(sign = '新增书记')">选择</el-button>
								</el-form-item>
								<el-form-item label="委员：" prop="partyCommittee" class="input-width">
									<span class="peopleSpan" v-if="addPartyForm.partyCommitteeInfo === null">暂无人员</span>
									<span class="peopleSpan"
										v-else-if="addPartyForm.partyCommitteeInfo === undefined">暂无人员</span>
									<span class="peopleSpan"
										v-else-if="addPartyForm.partyCommitteeInfo.length === 0">暂无人员</span>
									<span class="peopleSpan" v-else v-for="item in addPartyForm.partyCommitteeInfo">{{
										item.name }}</span>
									<el-button class="choose" plain style="margin-left: 3%"
										@click="handleChoose(sign = '新增委员')">选择</el-button>
								</el-form-item>
								<el-form-item label="组织管理员：" prop="partyAdmins" class="input-width">
									<span class="peopleSpan" v-if="addPartyForm.partyAdminsInfo === null">暂无人员</span>
									<span class="peopleSpan"
										v-else-if="addPartyForm.partyAdminsInfo === undefined">暂无人员</span>
									<span class="peopleSpan"
										v-else-if="addPartyForm.partyAdminsInfo.length === 0">暂无人员</span>
									<span class="peopleSpan" v-else v-for="item in addPartyForm.partyAdminsInfo">{{
										item.name }}</span>
									<el-button class="choose" plain style="margin-left: 3%"
										@click="handleChoose(sign = '新增组织管理员')">选择</el-button>
								</el-form-item>
								<el-form-item label="党组织荣誉：" prop="partyHonor" class="input-width">
									<el-select clearable v-model="addPartyForm.partyHonor" placeholder="请选择">
										<el-option v-for="dict in dict.type.party_honor" :key="dict.value"
											:label="dict.label" :value="dict.value">
										</el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="党组织分级：" prop="partyLevel" class="input-width">
									<el-select clearable v-model="addPartyForm.partyLevel" placeholder="请选择">
										<el-option v-for="dict in dict.type.party_level" :key="dict.value"
											:label="dict.label" :value="dict.value">
										</el-option>
									</el-select>
								</el-form-item>
							</div>
							<div>
								<el-form-item label="党组织头像：" prop="partyAvatar" class="input-width">
									<image-upload v-model="addPartyForm.partyAvatar" :limit="1" style="margin-top: 18px" />
								</el-form-item>
								<el-form-item label="党组织风采：" prop="partyPropagate" class="input-width">
									<image-upload v-model="addPartyForm.partyPropagate" :limit="1"
										style="margin-top: 18px" />
								</el-form-item>
								<el-form-item label="简介：" prop="partyAbstract">
									<el-input type="textarea" :rows="2" clearable v-model="addPartyForm.partyAbstract"
										placeholder="简历文字" />
								</el-form-item>
							</div>
						</div>
					</el-form>
				</template>
				<div slot="footer" style="text-align: center">
					<el-button type="primary" @click="submitAdd('addPartyForm')">保存</el-button>
					<el-button @click="closeAddDialog('addPartyForm')">取消</el-button>
				</div>
			</el-dialog>
			<!-- 党组织编辑弹窗 -->
			<el-dialog :visible.sync="editPartyDialog" title="党组织编辑" width="70%" :close-on-click-modal="false"
				@close="closeEditDialog('editPartyForm')" center>
				<template>
					<el-form ref="editPartyForm" label-width="138px" :model="editPartyForm" :rules="rules">
						<div class="dialogBox">
							<el-form-item label="所属网格：" prop="areaId" class="input-width">
								<treeSelect v-model="editPartyForm.areaId" :props="treeProps" :options="treeData"
									:value="value" placeholder="请选择">
								</treeSelect>
							</el-form-item>
							<el-form-item label="编号：" prop="extend" class="input-width">
								<el-input clearable v-model="editPartyForm.extend" placeholder="请输入编号" />
							</el-form-item>
							<el-form-item label="所属上级：" prop="partyPid" class="input-width">
								<treeSelect v-model="editPartyForm.partyPid" :props="partyTreeProps"
									:options="partyTreeData" :value="partyValue" placeholder="请选择">
								</treeSelect>
							</el-form-item>
							<el-form-item label="党组织名称：" prop="partyName" class="input-width">
								<el-input clearable v-model="editPartyForm.partyName" placeholder="请输入组织名称" />
							</el-form-item>
							<el-form-item label="党组织简称：" prop="partyAcronym" class="input-width">
								<el-input clearable v-model="editPartyForm.partyAcronym" placeholder="请输入简称" />
							</el-form-item>
							<div>
								<el-form-item label="书记：" prop="partyManager" class="input-width">
									<span class="peopleSpan" v-if="editPartyForm.partyManagerInfo === null">暂无人员</span>
									<span class="peopleSpan"
										v-else-if="editPartyForm.partyManagerInfo === undefined">暂无人员</span>
									<span class="peopleSpan"
										v-else-if="editPartyForm.partyManagerInfo.length === 0">暂无人员</span>
									<span class="peopleSpan" v-else v-for="item in editPartyForm.partyManagerInfo">{{
										item.name }}</span>
									<el-button class="choose" plain style="margin-left: 3%"
										@click="handleChoose(sign = '书记')">选择</el-button>
								</el-form-item>
								<el-form-item label="委员：" prop="partyCommittee" class="input-width">
									<span class="peopleSpan" v-if="editPartyForm.partyCommitteeInfo === null">暂无人员</span>
									<span class="peopleSpan"
										v-else-if="editPartyForm.partyCommitteeInfo === undefined">暂无人员</span>
									<span class="peopleSpan"
										v-else-if="editPartyForm.partyCommitteeInfo.length === 0">暂无人员</span>
									<span class="peopleSpan" v-else v-for="item in editPartyForm.partyCommitteeInfo">{{
										item.name }}</span>
									<el-button class="choose" plain style="margin-left: 3%"
										@click="handleChoose(sign = '委员')">选择</el-button>
								</el-form-item>
								<el-form-item label="组织管理员：" prop="partyAdmins" class="input-width">
									<span class="peopleSpan" v-if="editPartyForm.partyAdminsInfo === null">暂无人员</span>
									<span class="peopleSpan"
										v-else-if="editPartyForm.partyAdminsInfo === undefined">暂无人员</span>
									<span class="peopleSpan"
										v-else-if="editPartyForm.partyAdminsInfo.length === 0">暂无人员</span>
									<span class="peopleSpan" v-else v-for="item in editPartyForm.partyAdminsInfo">{{
										item.name }}</span>
									<el-button class="choose" plain style="margin-left: 3%"
										@click="handleChoose(sign = '组织管理员')">选择</el-button>
								</el-form-item>
								<el-form-item label="党组织荣誉：" prop="partyHonor" class="input-width">
									<el-select clearable v-model="editPartyForm.partyHonor" placeholder="请选择">
										<el-option v-for="dict in dict.type.party_honor" :key="dict.value"
											:label="dict.label" :value="dict.value">
										</el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="党组织分级：" prop="partyLevel" class="input-width">
									<el-select clearable v-model="editPartyForm.partyLevel" placeholder="请选择">
										<el-option v-for="dict in dict.type.party_level" :key="dict.value"
											:label="dict.label" :value="dict.value">
										</el-option>
									</el-select>
								</el-form-item>
							</div>
							<div>
								<el-form-item label="党组织头像：" prop="partyAvatar" class="input-width">
									<image-upload v-model="editPartyForm.partyAvatar" :limit="1" style="margin-top: 18px" />
								</el-form-item>
								<el-form-item label="党组织风采：" prop="partyPropagate" class="input-width">
									<image-upload v-model="editPartyForm.partyPropagate" :limit="1"
										style="margin-top: 18px" />
								</el-form-item>
								<el-form-item label="简介：" prop="partyAbstract">
									<el-input type="textarea" :rows="2" clearable v-model="editPartyForm.partyAbstract"
										placeholder="简历文字" />
								</el-form-item>
							</div>
						</div>
					</el-form>
				</template>
				<div slot="footer" style="text-align: center">
					<el-button type="primary" @click="submitEdit('editPartyForm')">保存</el-button>
					<el-button @click="closeEditDialog('editPartyForm')">取消</el-button>
				</div>
			</el-dialog>
			<!-- 党员选择器弹窗 -->
			<el-dialog :visible.sync="chooseDialog" title="党员选择器" width="80%" :close-on-click-modal="false"
				@close="closeChooseDialog()" style="font-size: 20px; height: 769px">
				<template>
					<el-form ref="chooseForm" label-width="138px" :model="chooseForm" :rules="rules">
						<div class="bigbox">
							<div class="leftbox">
								<p class="boxTitle">党支部:</p>
								<el-tree :data="partyTreeEditData" :props="partyTreeEditProps" node-key="id"
									@node-click="sendYourSelf" style="background:#efefef"></el-tree>
							</div>
							<div class="rightbox">
								<div class="table">
									<el-form v-model="queryParams" :inline="true" size="small">
										<el-form-item label-width="96px">
											<el-input clearable v-model="chooseForm.key" placeholder="姓名/身份证" />
										</el-form-item>
										<el-button size="small" @click="handlePartyQuery" plain>查询</el-button>
									</el-form>
									<el-table :loading="loading" :data="partyChooseList"
										:header-cell-style="{ background: '#EBF7FF' }" stripe border
										@selection-change="partySelectionChange" ref="partyMemberTable"
										:row-key="getRowKeyParty" height="500px">
										<el-table-column label="选择" :reserve-selection="true" type="selection" width="55"
											align="center" />
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
												<p v-if="scope.row.phoneNumber === '' || scope.row.phoneNumber === null">/
												</p>
												<p v-else>{{ scope.row.phoneNumber }}</p>
											</template>
										</el-table-column>
									</el-table>
									<!-- 分页 -->
									<pagination :total="partyChooseTotal" :page.sync="chooseForm.pageNum"
										:limit.sync="chooseForm.pageSize" @pagination="sendYourSelf()" />
								</div>
								<div class="choice">
									<p style="margin-top: 0">已选择</p>
									<div v-if="this.partyMemberIds.length !== 0">
										<p v-for="(item, index) in this.partyMemberIds">
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
	</div>
</template>

<script>
import gridMap from "@/components/gridMap/index"; //标注地图
import { areaTree } from "@/api/area/area";
import { partyTreeLimit } from "@/api/area/partymember";
import { partyNumber } from "@/api/area/largeScreen";
import { selectPartyInfo, partyEdit, selectParty, selectChildParty, selectPartyMember, selectPartyMemberNoPage, submitPartyMember, updateParty, addParty, deleteParty } from "@/api/area/partyOrganization";
export default {
	components: {
		gridMap
	},
	name: "list",
	dicts: [
		"party_honor",
		"party_level",
	],
	data() {
		return {
			loading: true, // 遮罩层
			partyTreeData: [], //党组织数据
			partyTreeProps: {
				label: "label",
				value: "id",
				children: "children",
			},
			partyList: {
				partyInfo: {
					partyName: "",
					partyPropagate: "",
					areaName: "",
					partyAcronym: "",
					partyLevel: "",
					partyHonor: "",
					extend: ""
				}
			}, //根据id查询党组织
			partyNumberList: {}, //党组织数字
			//党组织的党员信息
			partyMember: { //党员查询参数
				partyBranch: '',
				flag: '',
				pageNum: 1,
				pageSize: 24,
			},
			memberTotal: 0, // 党员总条数
			partyMemberNoPageList: [], //党员数据（不分页）
			partyMemberList: {}, //党员数据（分页）
			//下级党组织
			childParty: { //下级党组织查询参数
				partyId: '',
				flag: '',
				pageNum: 1,
				pageSize: 20,
			},
			childTotal: 0, // 党组织总条数
			childPartyNoPageList: [], //下级党组织数据（不分页）
			childPartyList: {}, //下级党组织数据（分页）
			seeMore: false, //更多人员弹窗
			partyMore: false, //更多党组织弹窗
			dialogAnnotate: false, //地图弹窗
			mapData: {
				build: '',
				gridCenter: '', //给地图传参（中心点）
				areaId: '', //给地图传参（id）
			},
			//党组织新增
			addPartyDialog: false, //党组织新增弹窗
			addPartyForm: {}, //新增党组织参数
			//党组织编辑
			// 查询参数
			queryParams: {
				userId: localStorage.getItem("userId"),
				areaId: '',
				year: '',
				key: '',
				pageNum: 1,
				pageSize: 10,
			},
			editPartyDialog: false, //党组织编辑弹窗
			editPartyForm: {}, //编辑党组织参数
			chooseForm: { //党员选择器表格数据
				partyBranch: '',
				key: '',
				flag: 0,
				pageNum: 1,
				pageSize: 10,
			},
			partyChooseTotal: 0, //党员选择器表格总条数
			chooseDialog: false, //党员选择器弹窗
			sign: '', //弹窗打开时保存是哪个的选择，用于保存时判断
			partyChooseList: [], //党员选择器表格数据
			partyMemberIds: [], //党员选择器多选框选中数据
			partyData: [], //党员选择器保存返回的数据
			partyTreeEditData: [], //党组织数据
			partyTreeEditProps: {
				label: "label",
				value: "id",
				children: "children",
			},
			treeData: [], //下拉框数据
			treeProps: {
				label: "label",
				value: "id",
				children: "children",
			},
			value: '',
			partyValue: '',
			rules: {},
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
		this.getPartyTree(); //党组织树
		this.getTree();
	},
	methods: {
		//党组织树
		getPartyTree() {
			let param = {
				userId: localStorage.getItem("userId"),
			}
			partyTreeLimit(param).then(res => {
				this.partyTreeData = res.data
				this.getPartyNumber()
				this.getPartyList()
			})
		},
		handleDelete() { //删除党组织
			let param = {
				partyId: localStorage.getItem("partyId"),
			}
			deleteParty(param).then(res => {
				if (res.code == 200) {
					this.getPartyTree(); //党组织树
					this.getTree();
				}
			})
		},
		//获取党组织数字
		getPartyNumber() {
			let param = {
				userId: localStorage.getItem("userId"),
				flag: 0,
			}
			partyNumber(param).then(res => {
				this.partyNumberList = res.data
			})
		},

		// 查询党组织
		getPartyList(data) {
			if (data !== null && data !== undefined && data !== '') {
				let param = {
					partyId: data.id
				}
				localStorage.setItem("partyId", data.id);
				selectPartyInfo(param).then((res) => {
					if (res.code === 200) {
						this.partyList = res.data;
						if (this.partyList.partyInfo.partyAvatar !== "" && this.partyList.partyInfo.partyAvatar !== null) {
							this.partyList.partyInfo.partyAvatar = process.env.VUE_APP_BASE_API + this.partyList.partyInfo.partyAvatar
						} else {
							this.partyList.partyInfo.partyAvatar = ''
						}
					}
					this.getPartyMemberNoPage()
					this.getPartyMember()
					this.getChildPartyNoPage()
					this.getChildParty()
				});
			} else {
				let param = {
					partyId: this.partyTreeData[0].id
				}
				localStorage.setItem("partyId", this.partyTreeData[0].id);
				selectPartyInfo(param).then((res) => {
					if (res.code === 200) {
						this.partyList = res.data;
						if (this.partyList.partyInfo.partyAvatar !== "" && this.partyList.partyInfo.partyAvatar !== null) {
							this.partyList.partyInfo.partyAvatar = process.env.VUE_APP_BASE_API + this.partyList.partyInfo.partyAvatar
						} else {
							this.partyList.partyInfo.partyAvatar = ''
						}
					}
					this.getPartyMemberNoPage()
					this.getPartyMember()
					this.getChildPartyNoPage()
					this.getChildParty()
				});
			}
		},

		//党组织的党员信息（不分页）
		getPartyMemberNoPage() {
			this.partyMember.partyBranch = localStorage.getItem("partyId")
			this.partyMember.flag = 1 //不分页
			selectPartyMemberNoPage(this.partyMember).then(res => {
				this.partyMemberNoPageList = res.data
				for (let i = 0; i < res.data.length; i++) {
					if (this.partyMemberNoPageList[i].headPortrait !== "" && this.partyMemberNoPageList[i].headPortrait !== null) {
						this.partyMemberNoPageList[i].headPortrait = process.env.VUE_APP_BASE_API + this.partyMemberNoPageList[i].headPortrait
					} else {
						this.partyMemberNoPageList[i].headPortrait = ''
					}
				}
			})
		},

		//党组织的党员信息（分页）
		getPartyMember() {
			this.partyMember.partyBranch = localStorage.getItem("partyId")
			this.partyMember.flag = 0 //分页
			selectPartyMember(this.partyMember).then(res => {
				this.partyMemberList = res.data.list
				for (let i = 0; i < res.data.list.length; i++) {
					if (this.partyMemberList[i].headPortrait !== "" && this.partyMemberList[i].headPortrait !== null) {
						this.partyMemberList[i].headPortrait = process.env.VUE_APP_BASE_API + this.partyMemberList[i].headPortrait
					} else {
						this.partyMemberList[i].headPortrait = ''
					}
				}
				this.memberTotal = res.data.total
			})
		},

		//下级党组织（不分页）
		getChildPartyNoPage() {
			this.childParty.partyId = localStorage.getItem("partyId")
			this.childParty.flag = 1 //不分页
			selectChildParty(this.childParty).then(res => {
				this.childPartyNoPageList = res.data
			})
		},

		//下级党组织（分页）
		getChildParty() {
			this.childParty.partyId = localStorage.getItem("partyId")
			this.childParty.flag = 0 //分页
			selectChildParty(this.childParty).then(res => {
				this.childPartyList = res.data.list
				this.childTotal = res.data.total
			})
		},

		// 标注弹窗打开
		labelMap() {
			this.mapData.build = true
			this.mapData.gridCenter = this.partyList.partyInfo.partyMap
			this.mapData.areaId = localStorage.getItem("partyId")
			this.dialogAnnotate = true;
			this.$refs.dialogDataBuilding.mapData = this.mapData
		},
		//接收地图标注的传值
		coordinates(value, id) {
			// value 就是子组件传递过来的数据
			console.log('子组件传参==', value, id);
			var param = {
				partyId: id,
				partyMap: value.areaCenter,
			}
			updateParty(param).then((response) => {
				this.$modal.msgSuccess("保存成功");
				this.dialogAnnotate = false;
				this.getPartyList();
			});
		},
		//关闭标注弹窗
		closeMap() {
			this.dialogAnnotate = false;
		},

		// 查询树
		getTree(value) {
			let param = {
				userId: localStorage.getItem("userId"),
				flag: 0 //为0时是全部的，为1时展示到社区
			}
			areaTree(param).then((res) => {
				this.treeData = res.data;
			});
		},

		// 新增党组织弹窗打开
		handleAdd() {
			this.addPartyDialog = true;
		},

		// 新增党组织弹窗提交
		submitAdd(addPartyForm) {
			this.$refs[addPartyForm].validate((valid) => {
				if (valid) {
					console.log(this.addPartyForm);
					addParty(this.addPartyForm).then((res) => {
						this.addPartyDialog = false;
						this.$message.success("保存成功");
						this.addPartyForm = {}
						this.addPartyForm.areaId = "000"
						this.getPartyTree();
					}).catch(() => { });
				}
			});
		},

		//新增党组织弹窗关闭
		closeAddDialog(addPartyForm) {
			this.addPartyDialog = false;
			this.$refs[addPartyForm].resetFields();
		},

		// 编辑党组织弹窗打开
		handleEdit() {
			let partyId = localStorage.getItem("partyId")
			this.editPartyDialog = true;
			selectParty(partyId).then((res) => {
				if (res.code === 200) {
					this.editPartyForm = res.data;
				}
			});
		},

		// 编辑党组织弹窗提交
		submitEdit(editPartyForm) {
			this.$refs[editPartyForm].validate((valid) => {
				if (valid) {
					console.log(this.editPartyForm);
					partyEdit(this.editPartyForm).then((res) => {
						this.editPartyDialog = false;
						this.$message.success("修改成功");
						this.getPartyTree();
					}).catch(() => { });
				}
			});
		},

		//编辑党组织弹窗关闭
		closeEditDialog(editPartyForm) {
			this.editPartyDialog = false;
			this.$refs[editPartyForm].resetFields();
		},

		// 党组织编辑弹窗-至-党员选择器弹窗
		handleChoose(sign) {
			this.sign = sign
			this.chooseDialog = true;
			this.getPartyTreeEdit(); //党组织树
		},
		//添加党员选择器弹窗关闭
		closeChooseDialog() {
			this.chooseDialog = false;
			if (this.$refs.partyMemberTable) {
				this.$refs.partyMemberTable.clearSelection();
			}
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

		//党员选择器表格数据
		sendYourSelf(data) {
			if (data !== null && data !== undefined && data !== '') {
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

		// 党员选择器多选框选中数据
		partySelectionChange(val) {
			if (this.sign === '书记') {
				if (val.length === 1) {
					this.partyMemberIds = val
				}
				if (val.length > 1) {
					this.partyMemberIds = val
					// shift() 方法用于把数组的第一个元素从其中删除，并返回第一个元素的值。
					// 该方法不创建新数组，而是直接修改原有的 arrayObject。
					let del_row = val.shift()
					// 其余的都不选中
					this.$refs.partyMemberTable.toggleRowSelection(del_row, false)
					console.log(this.partyMemberIds)
				}
			} else if (this.sign === '新增书记') {
				if (val.length === 1) {
					this.partyMemberIds = val
				}
				if (val.length > 1) {
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
		},

		//党员选择器分页后选中的值不被清空
		getRowKeyParty(row) {
			return row.id
		},

		//点击清除选中
		toggleSelection(val) {
			this.$refs.partyMemberTable.toggleRowSelection(val);
			if (this.sign === '书记') {
				this.partyMemberIds = []
			} else if (this.sign === '新增书记') {
				this.partyMemberIds = []
			}
		},

		//多选框数据保存
		submitChoose() {
			console.log(this.sign)
			let ids = this.partyMemberIds.map(item => item.id)
			let param = {
				partyIds: ids
			}
			submitPartyMember(param).then(res => {
				let options = res.data
				this.partyData = options.map(item => {
					return {
						idCard: `${item.peopleCard}`,
						name: `${item.name}`
					};
				})
				if (this.sign === '书记') {
					this.editPartyForm.partyManagerInfo = this.partyData
				} else if (this.sign === '委员') {
					this.editPartyForm.partyCommitteeInfo = this.partyData
				} else if (this.sign === '组织管理员') {
					this.editPartyForm.partyAdminsInfo = this.partyData
				} else if (this.sign === '新增书记') {
					this.addPartyForm.partyManagerInfo = this.partyData
				} else if (this.sign === '新增委员') {
					this.addPartyForm.partyCommitteeInfo = this.partyData
				} else if (this.sign === '新增组织管理员') {
					this.addPartyForm.partyAdminsInfo = this.partyData
				}
				this.chooseDialog = false;
				this.$message.success('保存成功！')
			})
		},

	},
};
</script>

<style scoped>
/*三个区域公共样式*/

.box {
	padding: 20px;
	height: 100%;
	overflow: hidden;
	vertical-align: top;
	width: 100%;
}

/*左侧*/

.left-box {
	width: 26%;
	height: calc(100vh - 60px);
	overflow-x: hidden;
	overflow-y: auto;
	float: left;
}

.left-box .titleBox {
	margin-bottom: 10px;
}

/*左侧滚动条*/

.left-box::-webkit-scrollbar {
	width: 6px;
	height: 2px;
}

.left-box::-webkit-scrollbar-thumb {
	border-radius: 2px;
	background: rgba(0, 0, 0, 0.3);
}

.left-box::-webkit-scrollbar-track {
	border-radius: 0;
}

/* 左侧区域字体样式 */

.fontColor {
	margin: 0 0 6px 0;
	padding: 0;
	font-weight: bold;
	display: inline-block;
}

/*右侧*/

.right-box {
	float: left;
	width: 74%;
	padding: 0 20px 20px 40px;
	box-shadow: -12px 0 12px -12px rgba(0, 0, 0, 0.1)
}

/* 右侧第一个模块 */

.sec_r {
	overflow: hidden;
}

.sec_r p {
	float: left;
}

.right-o {
	margin-right: 57px;
	height: 260px;
}

.right-o p {
	margin: 31px 30px;
	display: inline-block;
	font-size: 24px;
	font-family: Microsoft YaHei;
	font-weight: bold;
	color: #1F79F3;
}

.right-o-top p {
	margin: 10px 10px 10px 0;
}

/* 右侧第一个模块-b */

.right-o-b {
	display: flex;
	justify-content: flex-end;
	align-items: flex-start;
	position: relative;
}

.sec_r_cen {
	clear: both;
	position: relative;
}

.sec_r_cen>img {
	display: block;
	width: 240px;
	height: 180px;
	margin-right: 19px;
	float: left;
}

.information {
	float: left;
	width: 900px;
}

.information p {
	font-size: 14px;
	color: #000;
	margin: 5px;
	display: block;
	width: 100%;
}

.information p:last-of-type {
	font-size: 12px;
	color: #999;
}

.sec_r_cen .more {
	position: absolute;
	right: 2%;
	top: 20px;
	z-index: 1;
	text-align: center;
	font-size: 12px;
	font-family: Microsoft YaHei;
	font-weight: 400;
	color: #000000;
	font-weight: bold;
}

.photos {
	overflow: hidden;
	position: absolute;
	right: 100px;
	z-index: 1;
	width: 550px;
	background: #FFF;
}

.photo {
	float: left;
	padding: 0 10px;
	border-left: 0.125rem solid #d2d2d2;
}

.photo:first-child {
	border: none;
}

.photo img {
	float: left;
	width: 80px;
	height: 80px;
	border-radius: 50%;
}

.photo_r {
	float: left;
	width: 70px;
	margin-left: 10px;
}

.photo_r p {
	width: 100%;
	overflow: hidden;
	white-space: nowrap;
	font-size: 14px;
	font-family: Microsoft YaHei;
	font-weight: 400;
	color: #000000;
	line-height: 24px;
}

/* 右侧第二个模块 */

.right-t {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 120px;
	margin-top: 20px;
}

.item {
	width: 23%;
	height: 110px;
	display: flex;
	align-items: center;
	border-radius: 5%;
	margin-right: 15px;
}

.item i {
	font-size: 64px;
	padding: 20px;
}

.item .number {
	display: block;
	font-size: 30px;
	font-weight: bold;
}

.item .title {
	display: block;
	font-size: 18px;
}

.party {
	background: #F6CCCC;
	color: #D30000;
}

.member {
	background: #D8F3F0;
	color: #3BC2B4;
}

.meeting {
	background: #FFE9D8;
	color: #FF933E;
}

.organization {
	background: #E6E6EF;
	color: #8182B1;
}

/* 右侧第三个模块——党组织 */

.right-th {
	margin-top: 30px;
}

.right-th i {
	font-size: 26px;
	vertical-align: middle;
	color: #D30000;
	padding-right: 6px;
}

.right-th .more {
	float: right;
	margin-right: 2%;
	font-size: 16px;
}

.partyMoreDialog /deep/ .el-dialog__body {
	padding-top: 0;
}

.right-f .lesson i {
	font-size: 26px;
	vertical-align: middle;
	color: #FF933E;
	padding-right: 6px;
}

.right-th,
.right-f .lesson span {
	font-size: 18px;
	font-weight: bold;
	color: #000000;
}

.right-th .right-th-items {
	display: flex;
	justify-content: flex-start;
	flex-wrap: wrap;
	padding-bottom: 32px;
	margin: 10px;
}

.right-th .right-th-item {
	width: 19%;
	margin-right: 1%;
	margin-top: 1%;
	padding: 10px;
	border-radius: 10px;
	box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.2);
}

.right-th .right-th-item:nth-child(5n) {
	margin-right: 0;
}

.right-th-item,
.right-f p {
	font-size: 14px;
	font-weight: bold;
	color: #000000;
	margin: 0 40px 0 0;
}

.right-th-item_t {
	height: 40px;
	line-height: 20px;
	overflow: hidden;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
}

.right-th-item span {
	font-size: 12px;
	font-weight: 400;
	color: #6a6a6a;
	line-height: 24px;
}

/* 右侧第四个模块——三会一课 */

.right-f {
	height: 274px;
	border-top: 2px solid #ececec;
	padding-top: 20px;
}

.right-f .right-ft {
	display: flex;
	justify-content: space-between;
}

.right-f .right-fb {
	margin-top: 10px;
	display: flex;
	justify-content: start;
	align-items: center;
}

.right-f .right-fb img {
	display: block;
	width: 241px;
	height: 181px;
	margin-right: 21px;
}

.right-f .right-fb p {
	font-size: 12px;
	color: #999999;
	line-height: 24px;
	margin: 5px;
}

.right-f .right-fb p:first-child {
	font-size: 18px;
	font-weight: bold;
	color: #000000;
	margin-bottom: 37px;
}

/* 注释字体样式 */

.explain {
	font-size: 12px !important;
	color: #999999 !important;
	margin-left: 14px !important;
}

/* 更多人员样式 */

.morePeoples {
	display: flex;
	flex-wrap: wrap;
	margin-bottom: 20%;
}

.morePeoples img {
	width: 80px;
	height: 80px;
	border-radius: 50%;
	margin-right: 15px;
}

.morePeople {
	width: 15%;
	display: flex;
	justify-content: center;
	margin-left: 19px;
	border-right: 2px solid #d2d2d2;
	flex-wrap: wrap;
	margin: 10px;
	padding-right: 15px;
}

/* 每一行最后没有有边框 */

.morePeople:nth-of-type(6n) {
	border-right: none;
}

/* 最后一项没有有边框 */

.morePeople:last-child {
	border-right: none;
}

/* 添加/编辑弹出框样式 */

.input-width {
	width: 31%;
	display: inline-block;
}

.input-width div {
	width: 90%;
}

.choose {
	position: absolute;
	top: 0;
	right: 3%;
	width: 66px;
	height: 36px;
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
	height: 100vh;
	background-color: #efefef;
	float: left;
	overflow-x: hidden;
	overflow-y: auto;
	height: 800px;
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
}</style>