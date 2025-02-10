<!-- 党员列表 -->
<template>
	<div class="app-container">
		<!--左侧区域-->
		<div class="box left-box">
			<!-- 标题 -->
			<h3 class="fontColor">党组织</h3>
			<el-tree :data="partyTreeData" :props="partyTreeProps" node-key="id" @node-click="getPartyList"></el-tree>
		</div>
		<!--右侧区域-->
		<div class="box right-box" style="padding-top: 0">
			<!--查询组-->
			<el-form ref="partyer" :model="partyer" label-width="60px" :rules="rules">
				<el-form-item label="关键字：" prop="name" class="input-width" label-width="68px">
					<el-input clearable v-model="partyer.name" placeholder="请输入姓名或所有组织" />
				</el-form-item>
				<el-button type="primary" plain @click="handleSearch()">查询</el-button>
				<el-button type="primary" plain style="float: right" @click="handleExport">导出</el-button>
				<el-button type="primary" plain style="float: right" @click="handleImport">导入</el-button>
				<el-button type="primary" plain style="float: right" @click="handleAdd()">添加</el-button>
				<el-button type="primary" plain style="float: right" @click="handleAddOne()">荣誉管理</el-button>
			</el-form>
			<!-- 卡片 -->
			<el-row style="cursor: pointer">
				<el-card :body-style="{ padding: '10px', height: '184px' }" v-for="item in partyList" :key="item.areaId"
					@click.native="handleDetails(item)">
					<!-- 编辑按钮 -->
					<el-button type="text" icon="el-icon-delete" class="card-btn" @click.stop="toDelEdit(item)"></el-button>
					<el-button type="text" icon="el-icon-edit-outline" class="card-btn"
						@click.stop="handleEdit(item)"></el-button>
					<!-- 卡片内容 -->
					<div>
						<div style="width: 100px;height: 130px;float: left;margin-right: 10px;">
							<!--<el-image :src="require('@/assets/images/partyImg.jpg')" :fit="fit" class="img" v-if="item.headPortrait === null || item.headPortrait === ''"></el-image>
												<el-image :src="item.headPortrait" :fit="fit" class="img" v-else></el-image>-->
							<!-- <img :src="item.headImg ? item.headImg : moImg" class="img" /> -->
							<el-image :src="require('@/assets/images/partyImg.jpg')" :fit="fit" class="img"
								v-if="!item.headPortrait"></el-image>
							<el-image :src="item.headPortrait" :fit="fit" class="img" v-else></el-image>
						</div>
						<div style="margin: 0 0 30px 30px">
							<p class="card-title" v-if="item.sex === '男'">
								{{ item.name }}
								<span class="icon-man sexIcon" style="color: #1f79f3"></span>
							</p>
							<p class="card-title" v-else-if="item.sex === '女'">
								{{ item.name }}
								<span class="icon-women sexIcon" style="color: #f27463"></span>
							</p>
							<p class="card-font">{{ item.idCard }}</p>
							<p class="card-font" v-if="item.mobile === null">组织：暂无</p>
							<p class="card-font">组织：{{ item.partyName }}</p>
							<p class="card-font">民族：{{ item.nation }}</p>
							<p class="card-font">职务：{{ item.partyOccupation }}</p>
						</div>
					</div>
				</el-card>
			</el-row>

			<div slot="empty" v-if="this.partyList.length === 0"
				style="width: 100%;display: flex;align-items: center;text-align: center;">
				<div style="width: 100%">
					<img src="../../../../assets/images/nothing.png" width="30%" />
				</div>
			</div>
			<!-- 分页 -->
			<pagination v-if="total !== 0" :total="total" :page.sync="partyer.pageNum" :limit.sync="partyer.pageSize"
				:page-sizes="[9, 12, 15, 18]" @pagination="getPartyList()" />
		</div>
		<!-- 弹窗 -->
		<template>
			<!-- 荣誉管理三级弹窗 -->
			<template>
				<!-- 荣誉管理一级弹窗 -->
				<el-dialog :visible.sync="addDialogOne" title="添加荣誉" width="50%" :close-on-click-modal="false"
					@close="closeDialogOne('honorForm')">
					<el-form ref="honorForm" label-width="138px" :model="honorForm" :rules="rules" style="padding: 0 25%">
						<el-form-item label="年份：" prop="year">
							<el-date-picker v-model="honorForm.year" type="year" value-format="yyyy" placeholder="选择年">
							</el-date-picker>
						</el-form-item>
						<el-form-item label="党员荣誉：" prop="partyMemberHonor">
							<el-select clearable v-model="honorForm.partyMemberHonor" placeholder="请选择">
								<el-option v-for="dict in dict.type.party_member_honor" :key="dict.value"
									:label="dict.label" :value="dict.value">
								</el-option>
							</el-select>
						</el-form-item>
					</el-form>
					<div slot="footer" style="text-align: center">
						<el-button type="primary" @click="handleAddTwo('honorForm')">下一步</el-button>
					</div>
				</el-dialog>
				<!-- 荣誉管理二级弹窗 -->
				<el-dialog :visible.sync="addDialogTwo" title="添加荣誉" width="60%" :close-on-click-modal="false"
					@close="closeDialogTwo()" class="honor">
					<!-- 上侧表单 -->
					<div class="titleBox">
						<p>选择人员</p>
					</div>
					<el-form :model="partyer" ref="honorTwoForm" size="small" :inline="true" label-width="82px">
						<el-form-item label="所属组织：" prop="partyBranch">
							<treeSelect v-model="honorTwoForm.partyBranch" :props="partyTreeProps" :options="partyTreeData"
								:value="value" placeholder="请选择">
							</treeSelect>
						</el-form-item>
						<el-form-item label="关键字：" prop="name">
							<el-input clearable v-model="honorTwoForm.name" placeholder="姓名" />
						</el-form-item>
						<el-form-item>
							<el-button plain @click="honorData()">查询</el-button>
						</el-form-item>
					</el-form>
					<!-- 表格 -->
					<el-table :loading="loading" :data="honorTwoData" :header-cell-style="{ background: '#EBF7FF' }" stripe
						border @selection-change="handleSelectionChange" ref="multipleTable" :row-key="getRowKey">
						<el-table-column label="选择" :reserve-selection="true" type="selection" width="55" align="center" />
						<el-table-column label="姓名" align="center" prop="name" />
						<el-table-column label="性别" align="center" prop="sex" />
						<el-table-column label="民族" align="center" prop="nation" />
						<el-table-column label="身份证号" align="center" prop="idCard" />
						<el-table-column label="联系方式" align="center" prop="phoneNumber">
							<template slot-scope="scope">
								<p v-if="scope.row.phoneNumber === '' ||
									scope.row.phoneNumber === null
									">
									/
								</p>
								<p v-else>{{ scope.row.phoneNumber }}</p>
							</template>
						</el-table-column>
					</el-table>
					<!-- 分页 -->
					<pagination :total="honorTwoTotal" :page.sync="honorTwoForm.pageNum" :limit.sync="honorTwoForm.pageSize"
						@pagination="honorData()" />
					<div slot="footer" style="text-align: center">
						<el-button type="primary" @click="handleAddThree()">确定</el-button>
					</div>
				</el-dialog>
				<!-- 荣誉管理三级弹窗 -->
				<el-dialog :visible.sync="addDialogThree" title="添加荣誉" width="50%" :close-on-click-modal="false"
					@close="closeDialogThree()" class="honor">
					<!-- 表格 -->
					<div class="titleBox">
						<p>{{ this.partyMemberHonor }}</p>
					</div>
					<el-table :loading="loading" :data="honorThreeData" :header-cell-style="{ background: '#EBF7FF' }"
						stripe border>
						<el-table-column label="姓名" align="center" prop="name" />
						<el-table-column label="性别" align="center" prop="sex" />
						<el-table-column label="民族" align="center" prop="nation" />
						<el-table-column label="身份证号" align="center" prop="idCard" />
						<el-table-column label="联系方式" align="center" prop="phoneNumber">
							<template slot-scope="scope">
								<p v-if="scope.row.phoneNumber === '' ||
									scope.row.phoneNumber === null
									">
									/
								</p>
								<p v-else>{{ scope.row.phoneNumber }}</p>
							</template>
						</el-table-column>
					</el-table>
					<!-- 分页 -->
					<pagination :total="honorThreeTotal" :page.sync="honorThreeForm.pageNum"
						:limit.sync="honorThreeForm.pageSize" @pagination="handleAddThree()" />
					<div slot="footer" style="text-align: center">
						<el-button type="primary" @click="closeDialogThree()">完成</el-button>
					</div>
				</el-dialog>
			</template>

			<!-- 用户导入对话框 -->
			<el-dialog :visible.sync="upload.importDialog" title="党员批量导入" width="21%" :close-on-click-modal="false">
				<el-upload ref="upload" :limit="1" accept=".xlsx, .xls" :data="params" :headers="upload.headers"
					:action="upload.url" :disabled="upload.isUploading" :on-progress="handleFileUploadProgress"
					:on-success="handleFileSuccess" :auto-upload="false" drag>
					<i class="el-icon-upload"></i>
					<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
					<div class="el-upload__tip text-center" slot="tip">
						<div class="el-upload__tip" slot="tip">
							<el-checkbox v-model="upload.updateSupport" />是否更新已经存在的用户数据
						</div>
						<span>仅允许导入xls、xlsx格式文件。</span>
						<el-link type="primary" :underline="false" style="font-size: 12px; vertical-align: baseline"
							@click="importTemplate">下载模板</el-link>
					</div>
				</el-upload>
				<div slot="footer" class="dialog-footer" style="text-align: center">
					<el-button type="primary" @click="submitFileForm">确 定</el-button>
					<el-button @click="upload.importDialog = false">取 消</el-button>
				</div>
			</el-dialog>

			<!-- 党员添加弹窗 -->
			<el-dialog :visible.sync="addDialog" title="党员添加" width="70%" :close-on-click-modal="false"
				@close="dictAddVisible('addForm')" center>
				<template>
					<el-form ref="addForm" label-width="138px" :model="addForm" :rules="rules">
						<div class="dialogBox">
							<el-form-item label="姓名：" prop="peopleName" class="input-width">
								<el-input clearable v-model="addForm.peopleName" placeholder="请输入姓名" />
							</el-form-item>
							<el-form-item label="性别：" prop="sex" class="input-width">
								<el-select clearable v-model="addForm.sex" placeholder="请选择">
									<el-option v-for="dict in dict.type.sys_user_sex" :key="dict.value" :label="dict.label"
										:value="dict.value">
									</el-option>
								</el-select>
							</el-form-item>

							<el-form-item label="民族：" prop="nation" class="input-width">
								<el-select clearable v-model="addForm.nation" placeholder="请选择">
									<el-option v-for="dict in dict.type.nation" :key="dict.value" :label="dict.label"
										:value="dict.value">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="证件类型：" prop="certificateType" class="input-width">
								<el-select clearable v-model="addForm.certificateType" placeholder="请选择">
									<el-option v-for="dict in dict.type.certificate_type" :key="dict.value"
										:label="dict.label" :value="dict.value">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="证件号：" prop="peopleCard" class="input-width">
								<el-input clearable v-model="addForm.peopleCard" placeholder="请输入编号" />
							</el-form-item>
							<el-form-item label="出生日期：" prop="birthday" class="input-width">
								<el-date-picker v-model="addForm.birthday" type="date" value-format="yyyy-MM-dd"
									placeholder="选择日期">
								</el-date-picker>
							</el-form-item>

							<el-form-item label="联系方式：" prop="phoneNumber" class="input-width">
								<el-input clearable v-model="addForm.phoneNumber" placeholder="请输入联系方式" />
							</el-form-item>
							<el-form-item label="党组织头像：" prop="headPortrait">
								<image-upload v-model="addForm.headPortrait" :limit="1" style="margin-bottom: 18px" />
								<span class="explain">注：缩略图建议尺寸：800*600px(4:3)</span>
							</el-form-item>
							<el-divider></el-divider>
							<p style="margin-left: 8%; font-size: 0.2rem; color: black">
								党员信息：
							</p>
							<br />
							<el-form-item label="所属党支部：" prop="partyBranch" class="input-width">
								<treeSelect v-model="addForm.partyBranch" :props="partyTreeProps" :options="partyTreeData"
									:value="value" placeholder="请选择">
								</treeSelect>
							</el-form-item>

							<el-form-item label="党内所属职务：" prop="partyOccupation" class="input-width">
								<el-select clearable v-model="addForm.partyOccupation" placeholder="请选择">
									<el-option v-for="item in postOptions" :key="item.value" :label="item.label"
										:value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="党员状态：" prop="partyMemberStatus" class="input-width">
								<el-select clearable v-model="addForm.partyMemberStatus" placeholder="请选择">
									<el-option v-for="dict in dict.type.party_status" :key="dict.value" :label="dict.label"
										:value="dict.value">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="申请入党时间：" prop="applyJoinpartyTime" class="input-width">
								<el-date-picker v-model="addForm.applyJoinpartyTime" type="date" value-format="yyyy-MM-dd"
									placeholder="选择日期">
								</el-date-picker>
							</el-form-item>
							<el-form-item label="正式入党时间：" prop="officiaJoinpartyTime" class="input-width">
								<el-date-picker v-model="addForm.officiaJoinpartyTime" type="date" value-format="yyyy-MM-dd"
									placeholder="选择日期">
								</el-date-picker>
							</el-form-item>
							<el-form-item label="来源：" prop="source" class="input-width">
								<el-input clearable v-model="addForm.source" placeholder="请输入来源" />
							</el-form-item>

							<el-form-item label="党员失联/清退时间:" prop="dismissalTime" class="input-width">
								<el-date-picker v-model="addForm.dismissalTime" type="date" value-format="yyyy-MM-dd"
									placeholder="选择日期">
								</el-date-picker>
							</el-form-item>
							<el-form-item label="党员转出时间：" prop="transferOutTime" class="input-width">
								<el-date-picker v-model="addForm.transferOutTime" type="date" value-format="yyyy-MM-dd"
									placeholder="选择日期">
								</el-date-picker>
							</el-form-item>
							<el-form-item label="是否获得党员荣誉：" prop="wonHonor" class="input-width">
								<el-select clearable v-model="addForm.wonHonor" placeholder="请选择">
									<el-option v-for="dict in honorList" :key="dict.value" :label="dict.label"
										:value="dict.value">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="简介：" prop="abstract">
								<el-input type="textarea" :rows="3" clearable v-model="addForm.abstract"
									placeholder="简历文字" />
							</el-form-item>
						</div>
					</el-form>
				</template>
				<div slot="footer" style="text-align: center">
					<el-button type="primary" @click="submitAdd('addForm')"
						style="width:130px;margin-right: 20px;">保存</el-button>
					<el-button type="info" @click="dictAddVisible('addForm')" style="width:130px">返回</el-button>
				</div>
			</el-dialog>

			<!-- 党员编辑弹窗 -->
			<el-dialog :visible.sync="editDialog" title="党员编辑" width="70%" :close-on-click-modal="false"
				@close="dictEditVisible('editForm')" center>
				<template>
					<el-form ref="editForm" label-width="138px" :model="editForm" :rules="rules">
						<div class="dialogBox">
							<el-form-item label="姓名：" prop="name" class="input-width">
								<el-input clearable v-model="editForm.name" disabled placeholder="请输入编号" />
							</el-form-item>
							<el-form-item label="性别：" prop="sex" class="input-width">
								<el-select clearable v-model="editForm.sex" disabled placeholder="请选择">
									<el-option v-for="dict in dict.type.sys_user_sex" :key="dict.value" :label="dict.label"
										:value="dict.value">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="民族：" prop="nation" class="input-width">
								<el-select clearable disabled v-model="editForm.nation" placeholder="请选择">
									<el-option v-for="dict in dict.type.nation" :key="dict.value" :label="dict.label"
										:value="dict.value">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="证件类型：" prop="certificateType" class="input-width">
								<el-select clearable disabled v-model="editForm.certificateType" placeholder="请选择">
									<el-option v-for="dict in dict.type.certificate_type" :key="dict.value"
										:label="dict.label" :value="dict.value">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="证件号：" prop="peopleCard" class="input-width">
								<el-input clearable disabled v-model="editForm.peopleCard" placeholder="请输入编号" />
							</el-form-item>
							<el-form-item label="出生日期：" prop="birthday" class="input-width">
								<el-date-picker disabled v-model="editForm.birthday" type="date" value-format="yyyy-MM-dd"
									placeholder="选择日期">
								</el-date-picker>
							</el-form-item>
							<el-form-item class="partyImg" label="党员头像：" prop="headPortrait" style="margin-bottom: 0">
								<!--<img v-if="this.editForm.headPortrait !== ''" :src="editForm.headPortrait" />
													<p v-else>暂无</p>-->
								<image-upload v-model="editForm.headPortrait" :limit="1" style="margin-bottom: 18px" />
							</el-form-item>
							<hr style="margin-bottom: 24px" />
							<el-form-item label="所属党支部：" prop="partyId" class="input-width">
								<treeSelect disabled v-model="editForm.partyId" :props="partyTreeProps"
									:options="partyTreeData" :value="value" placeholder="请选择">
								</treeSelect>
							</el-form-item>
							<el-form-item label="党内所属职务：" prop="partyOccupation" class="input-width">
								<el-select clearable v-model="editForm.partyOccupation" placeholder="请选择">
									<el-option v-for="item in postOptions" :key="item.value" :label="item.label"
										:value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="党员状态：" prop="partyMemberStatus" class="input-width">
								<el-select clearable v-model="editForm.partyMemberStatus" placeholder="请选择">
									<el-option v-for="dict in dict.type.party_status" :key="dict.value" :label="dict.label"
										:value="dict.value">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="申请入党时间：" prop="applyJoinpartyTime" class="input-width">
								<el-date-picker v-model="editForm.applyJoinpartyTime" type="date" value-format="yyyy-MM-dd"
									placeholder="选择日期">
								</el-date-picker>
							</el-form-item>
							<el-form-item label="正式入党时间：" prop="officiaJoinpartyTime" class="input-width">
								<el-date-picker v-model="editForm.officiaJoinpartyTime" type="date"
									value-format="yyyy-MM-dd" placeholder="选择日期">
								</el-date-picker>
							</el-form-item>
							<el-form-item label="来源：" prop="source" class="input-width">
								<el-input clearable v-model="editForm.source" placeholder="请输入来源" />
							</el-form-item>
							<!--              <el-form-item label="党员失联/清退时间:" prop="dismissalTime" class="input-width">-->
							<!--                <el-date-picker-->
							<!--                  v-model="editForm.dismissalTime"-->
							<!--                  type="date"-->
							<!--                  placeholder="选择日期">-->
							<!--                </el-date-picker>-->
							<!--              </el-form-item>-->
							<el-form-item label="是否获得党员荣誉：" prop="honor" class="input-width">
								<el-select clearable v-model="editForm.honor" placeholder="请选择">
									<el-option v-for="dict in honorList" :key="dict.value" :label="dict.label"
										:value="dict.value">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="是否转出：" prop="transferOutFlag" class="input-width">
								<el-select clearable v-model="editForm.transferOutFlag" placeholder="请选择">
									<el-option v-for="dict in dict.type.is_party_status" :key="dict.value"
										:label="dict.label" :value="dict.value">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="备注：" prop="remark">
								<el-input type="textarea" :rows="3" clearable v-model="editForm.remark"
									placeholder="请输入备注" />
							</el-form-item>
							<div v-if="editForm.transferOutFlag === '是'">
								<hr style="margin-bottom: 24px" />
								<el-form-item label="流动类型：" prop="flowType" class="input-width">
									<el-select clearable v-model="editForm.flowType" placeholder="请选择">
										<el-option v-for="dict in dict.type.flow_type" :key="dict.value" :label="dict.label"
											:value="dict.value">
										</el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="转出党支部：" prop="transoutPartyBranch" class="input-width">
									<treeSelect v-model="editForm.transoutPartyBranch" :props="partyTreeProps"
										:options="partyTreeData" :value="value" placeholder="请选择">
									</treeSelect>
								</el-form-item>
								<el-form-item label="转出党支部职位：" prop="transoutPartyOccupation" class="input-width">
									<el-select clearable v-model="editForm.transoutPartyOccupation" placeholder="请选择">
										<el-option v-for="item in postOptions" :key="item.value" :label="item.label"
											:value="item.value">
										</el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="党员转出时间：" prop="transferOutTime" class="input-width">
									<el-date-picker v-model="editForm.transferOutTime" type="date" value-format="yyyy-MM-dd"
										placeholder="选择日期">
									</el-date-picker>
								</el-form-item>
								<el-form-item label="转出理由：" prop="transoutReason">
									<el-input type="textarea" :rows="3" clearable v-model="editForm.transoutReason"
										placeholder="请输入转出理由" />
								</el-form-item>
							</div>
						</div>
					</el-form>
				</template>
				<div slot="footer" style="text-align: center">
					<el-button type="primary" @click="submitEdit('editForm')"
						style="width:130px;margin-right: 20px;">保存</el-button>
					<el-button type="info" @click="dictEditVisible('editForm')" style="width:130px">取消</el-button>
				</div>
			</el-dialog>
		</template>
	</div>
</template>

<script>
import {
	partyList,
	partyTreeLimit,
	memberHonor,
	partyEdit,
	partyPost,
	partySubmit,
	addpartySubmit,
	deleteEdit
} from "@/api/area/partymember";
import { getToken } from "@/utils/auth";
export default {
	name: "partyerList",
	dicts: [
		"sys_user_sex",
		"nation",
		"certificate_type",
		"party_status",
		"is_party_status",
		"flow_type",
		"party_member_honor",
	],
	data() {
		return {
			honorList: [{
				label: "否",
				value: 0
			}, {
				label: "是",
				value: 1
			}],
			loading: true, // 遮罩层
			fit: "contain", // img图片填充方式
			partyTreeData: [], //党组织数据
			partyTreeProps: {
				label: "label",
				value: "id",
				children: "children",
			},
			moImg: require('@/assets/images/partyImg.jpg'),
			// 卡片查询参数
			partyer: {
				partyBranch: "",
				name: "",
				pageNum: 1,
				pageSize: 9,
				userId: localStorage.getItem("userId"),
			},
			partyList: {}, //卡片数据
			total: 0, // 总页数
			addDialogOne: false, //荣誉管理一级弹窗
			year: "",
			partyMemberHonor: "",
			honorForm: {
				//荣誉管理一级弹窗数据
				year: "",
				partyMemberHonor: "",
			},
			addDialogTwo: false, //荣誉管理二级弹窗
			//荣誉管理二级弹窗查询
			honorTwoForm: {
				year: "",
				partyMemberHonor: "",
				partyBranch: "",
				name: "",
				pageNum: 1,
				pageSize: 10,
				userId: localStorage.getItem("userId"),
			},
			honorTwoData: [], //表格数据
			honorTwoTotal: 0, //表格分页
			value: "",
			honorIds: [], //选中的人员数组
			addDialogThree: false, //荣誉管理三级弹窗
			honorThreeData: [], //添加荣誉后的表格数据
			honorThreeForm: {
				pageNum: 1,
				pageSize: 10,
			},
			honorThreeTotal: 0, //添加荣誉后的表格分页
			rules: {
				peopleName: [{
					required: true,
					trigger: "change",
					message: "请输入姓名"
				}],
				sex: [{
					required: true,
					trigger: "change",
					message: "请选择性别"
				}],
				year: [{
					required: true,
					trigger: "change",
					message: "请选择年份"
				}],
				partyMemberHonor: [{
					required: true,
					trigger: "change",
					message: "请选择党员荣誉"
				}],
				nation: [{
					required: true,
					trigger: "change",
					message: "请选择民族"
				}],
				certificateType: [{
					required: true,
					trigger: "change",
					message: "请选择证件类型"
				}],
				//					phoneNumber:[{
				//						required: true,
				//						trigger: "change",
				//						message: "请输入联系方式"
				//					}],
				peopleCard: [{
					required: true,
					trigger: "change",
					message: "请输入证件号"
				}],
				birthday: [{
					required: true,
					trigger: "change",
					message: "请选择出生日期"
				}],
				partyBranch: [{
					required: true,
					trigger: "change",
					message: "请选择所属党支部"
				}],
				partyOccupation: [{
					required: true,
					trigger: "change",
					message: "请选择所属职位"
				}],
				//					applyJoinpartyTime:[{
				//						required: true,
				//						trigger: "change",
				//						message: "请选择申请入党时间"
				//					}],
				//					officiaJoinpartyTime:[{
				//						required: true,
				//						trigger: "change",
				//						message: "请选择正式入党时间"
				//					}],
			},

			// data: [],
			time: "", //出生日期
			timeapply: "",
			timeformal: "",
			timeout: "",
			timeroll: "",
			// disabledDate(time) {
			//   return time.getTime() > Date.now();
			// },
			// disabledDate(timeapply) {
			//   return timeapply.getTime() > Date.now();
			// },
			// disabledDate(timeformal) {
			//   return timeformal.getTime() > Date.now();
			// },
			// disabledDate(timeout) {
			//   return timeout.getTime() > Date.now();
			// },
			// disabledDate(timeroll) {
			//   return timeroll.getTime() > Date.now();
			// },
			//
			addForm: {
				//添加党员参数
				peopleName: '',
				sex: '',
				nation: '',
				certificateType: '',
				createBy: "",
				peopleCard: "",
				birthday: '',
				headPortrait: '',
				partyBranch: "",
				partyOccupation: "",
				partyMemberStatus: "",
				applyJoinpartyTime: "",
				officiaJoinpartyTime: "",
				source: "",
				dismissalTime: '',
				transferOutFlag: "",
				honor: "",
				textarea: '',
				remark: "",
				flowType: "",
				transoutPartyBranch: "",
				transferOutTime: "",
				transoutReason: "",
				transoutPartyOccupation: "",
			},
			// // 多级弹窗静态数据
			//
			data: "",
			// // ///////////
			childrenList: "",
			cardData: "",
			pageNum: "",
			addDialog: false, //添加党组织弹窗

			// 用户导入参数
			upload: {
				importDialog: false, // 是否显示弹出层（用户导入）
				title: "", // 弹出层标题（用户导入）
				isUploading: false, // 是否禁用上传
				updateSupport: 0, // 是否更新已经存在的用户数据
				headers: {
					Authorization: "Bearer" + getToken()
				}, // 设置上传的请求头部
				url: process.env.VUE_APP_BASE_API + "/system/member/importData", // 上传的地址
				userId: localStorage.getItem("userId"),
			},
			params: {
				userId: localStorage.getItem("userId"),
				updateSupport: 0,
			},
			//编辑
			editDialog: false, //编辑党组织弹窗
			editForm: {
				//编辑参数
				peopleCard: "",
				partyId: "",
				partyOccupation: "",
				partyMemberStatus: "",
				applyJoinpartyTime: "",
				officiaJoinpartyTime: "",
				source: "",
				honor: "",
				transferOutFlag: "",
				remark: "",
				flowType: "",
				transoutPartyBranch: "",
				transferOutTime: "",
				transoutReason: "",
				transoutPartyOccupation: "",
			},
			postOptions: [], //党员职务数据
		};
	},
	mounted() {
		this.getPartyTree(); //党组织树
		this.getPartyList(); // 查询党员卡片列表
	},
	watch: {
		'upload.updateSupport': { // 对对象的某一个属性进行深度监听
			handler(nv) {
				if (nv) {
					this.params.updateSupport = 'true'
				} else {
					this.params.updateSupport = 'false'
				}
			},
			immediate: true,
			deep: true
		},
	},
	methods: {
		//党组织树
		getPartyTree() {
			let param = {
				userId: localStorage.getItem("userId"),
			};
			partyTreeLimit(param).then((res) => {
				this.partyTreeData = res.data;
			});
		},

		// 查询党员卡片列表
		getPartyList(data) {
			if (data !== null && data !== undefined && data !== "") {
				this.partyer.partyBranch = data.id;
			}
			partyList(this.partyer).then((res) => {
				console.log('process.env.VUE_APP_BASE_API', process.env.VUE_APP_BASE_API)
				if (res.code === 200) {
					this.partyList = res.rows;
					for (let i = 0; i < res.rows.length; i++) {
						if (
							this.partyList[i].headPortrait !== "" &&
							this.partyList[i].headPortrait !== null
						) {
							this.partyList[i].headPortrait =
								process.env.VUE_APP_BASE_API + this.partyList[i].headPortrait;
							console.log(this.partyList[i].headPortrait)
						} else {
							this.partyList[i].headPortrait = "";
						}
					}
					this.total = res.total;
				}
			});
		},

		//查询
		handleSearch() {
			this.getPartyList();
		},

		//荣誉管理弹窗
		//荣誉管理一级弹窗
		handleAddOne() {
			this.addDialogOne = true;
		},
		// 荣誉管理一级弹窗关闭
		closeDialogOne(honorForm) {
			this.addDialogOne = false;
			this.$refs[honorForm].resetFields();
		},
		//荣誉管理二级弹窗（一级弹窗的下一步按钮）
		handleAddTwo(honorForm) {
			this.year = this.honorForm.year;
			this.partyMemberHonor = this.honorForm.partyMemberHonor;
			this.$refs[honorForm].validate((valid) => {
				if (valid) {
					this.addDialogOne = false;
					this.addDialogTwo = true;
					if (this.$refs.multipleTable) {
						this.$refs.multipleTable.clearSelection();
					}
					this.honorData();
				}
			});
		},
		//获取二级弹窗的表格数据（要用分页和查询所以单独写）
		honorData() {
			this.honorTwoForm.year = this.year;
			this.honorTwoForm.partyMemberHonor = this.partyMemberHonor;
			partyList(this.honorTwoForm).then((res) => {
				this.honorTwoData = res.rows;
				this.honorTwoTotal = res.total;
			});
		},
		// 荣誉管理二级弹窗关闭
		closeDialogTwo() {
			this.addDialogTwo = false;
			this.honorTwoForm.name = "";
			this.honorTwoForm.partyBranch = "";
		},

		//分页后选中的值不被清空
		getRowKey(row) {
			return row.id;
		},
		// 多选框选中数据
		handleSelectionChange(val) {
			this.honorIds = val.map((item) => item.id);
		},
		//荣誉管理三级弹窗（二级弹窗的确定按钮）
		handleAddThree() {
			if (this.honorIds.length === 0) {
				this.$message.error("请选择人员");
			} else {
				this.addDialogTwo = false;
				this.addDialogThree = true;
				let param = {
					year: this.year,
					partyMemberHonor: this.partyMemberHonor,
					addUser: localStorage.getItem("username"),
					memberIds: this.honorIds,
					userId: localStorage.getItem("userId"),
				};
				memberHonor(param).then((res) => {
					this.honorThreeData = res.rows;
					this.honorThreeTotal = res.total;
				});
			}
		},
		// 荣誉管理三级弹窗关闭
		closeDialogThree() {
			this.addDialogThree = false;
			this.honorIds = [];
		},

		// 点击卡片跳转页面
		handleDetails(row) {
			const src = `/partyerListDetails`;
			this.$router.push({
				path: src,
				query: {
					id: row.id
				},
			});
		},

		// 编辑弹窗打开
		handleEdit(row) {
			this.editDialog = true;
			let param = {
				id: row.id,
			};
			partyEdit(param).then((res) => {
				if (res.code === 200) {
					this.editForm = res.data;
					if (
						this.editForm.headPortrait !== "" &&
						this.editForm.headPortrait !== null
					) {
						//							this.editForm.headPortrait =
						//								process.env.VUE_APP_BASE_API + this.editForm.headPortrait;
					} else {
						this.editForm.headPortrait = "";
					}
				}
			});
			this.getPartyPost();
		},
		toDelEdit(row) {
			let param = {
				id: row.id,
				updateBy: row.updateBy
			};
			this.$confirm('此操作将删除该党员信息, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				deleteEdit(param).then((res) => {
					if (res.code === 200) {
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
						this.getPartyList();
					}
				});
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				});
			});
		},

		//获取党员职务
		getPartyPost() {
			partyPost().then((res) => {
				if (res.code === 200) {
					let options = res.data;
					this.postOptions = options.map((item) => {
						return {
							value: `${item.dutyName}`,
							label: `${item.dutyName}`
						};
					});
				}
			});
		},

		//编辑的提交按钮
		submitEdit(editForm) {
			this.$refs[editForm].validate((valid) => {
				if (valid) {
					partySubmit(this.editForm).then((res) => {
						this.editDialog = false;
						this.$message.success("修改成功");
						this.getPartyList();
					});
				}
			});
		},

		//编辑弹窗关闭
		dictEditVisible(editForm) {
			this.$refs[editForm].resetFields();
			this.editDialog = false;
		},

		//添加党员弹窗
		handleAdd() {
			this.addDialog = true;
			this.getPartyPost();
		},

		//添加党员提交
		//			submitAdd(addForm) {
		//				this.$refs[addForm].validate((valid) => {
		//					addVillage(this.addForm).then((res) => {
		//						this.addDialog = false;
		//						this.$message.success("添加成功");
		//						this.$refs[addForm].resetFields();
		//						this.getList();
		//					});
		//				});
		//			},
		//添加党员提交
		submitAdd(addForm) {
			this.addForm.createBy = localStorage.getItem('username')
			this.$refs[addForm].validate((valid) => {
				if (valid) {
					addpartySubmit(this.addForm).then((res) => {
						this.addDialog = false;
						this.$message.success("添加成功");
						this.$refs[addForm].resetFields();
						this.getPartyList(); // 查询党员卡片列表
					});
				} else {
					return false;
				}
			});
		},

		//添加弹窗关闭
		dictAddVisible(addForm) {
			this.$refs[addForm].resetFields();
			this.addForm = {};
			this.addDialog = false;
		},

		// 导入按钮操作
		handleImport() {
			this.upload.importDialog = true;
		},

		//下载模板操作
		importTemplate() {
			this.download(
				"/system/member/importTemplate", {},
				`党员模板-${new Date().getTime()}.xlsx`
			);
		},

		// 文件上传中处理
		handleFileUploadProgress(event, file, fileList) {
			this.upload.isUploading = true;
		},

		// 文件上传成功处理
		handleFileSuccess(response, file, fileList) {
			this.upload.importDialog = false;
			this.upload.isUploading = false;
			this.$refs.upload.clearFiles();
			this.$alert(
				"<div style='overflow: auto;overflow-x: hidden;max-height: 70vh;padding: 10px 20px 0;'>" +
				response.msg +
				"</div>",
				"导入结果", {
				dangerouslyUseHTMLString: true
			}
			);
			this.getPartyList();
		},

		// 提交上传文件
		submitFileForm() {
			this.$refs.upload.submit();
		},

		// 导出按钮操作
		handleExport() {
			this.download(
				"/system/member/export", {
				...this.partyer
			},
				`党员信息-${new Date().getTime()}.xlsx`
			);
		},
	},
};
</script>

<style lang="scss" scoped>
/* p标签公共样式 */

.font {
	margin: 0;
	padding: 0;
}

/*三个区域公共样式*/

.box {
	display: inline-block;
	padding: 20px;
	height: 100%;
	overflow: hidden;
	vertical-align: top;
}

/*左侧*/

.left-box {
	width: 20%;
	height: calc(100vh - 236px);
	box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.2);
	border-radius: 6px;
	overflow-x: hidden;
	overflow-y: auto;
}

//左侧滚动条
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
}

/* 灰色位置狂样式 */

.position {
	width: auto;
	display: inline-block !important;
	display: inline;
	height: 24px;
	line-height: 24px;
	font-size: 12px;
	text-align: left;
	color: #fff;
	padding: 0 10px;
	background: #ccc;
	border-radius: 12px;
}

.chart {
	width: 100%;
	height: 170px;
}

/*选择框标题*/

.title {
	display: inline-block;
	margin: 0;
	padding: 0;
}

/*中间*/

.center-box {
	width: 15%;
	text-align: center;
}

/*右侧*/

.right-box {
	width: 80%;
}

/*输入框样式 */

.input-width {
	width: 25%;
	display: inline-block;
	margin-right: 10px;
}

/*右侧选择框标题*/

.el-form-item__label {
	padding: 0;
}

/*各种人员人数*/

.spanTitle {
	font-size: 12px;
	font-weight: bold;
	margin-right: 20px;
}

/* 卡片样式 */

.el-card {
	border-radius: 10px;
	width: 32%;
	margin: 0.5% 0.5%;
	display: inline-block;
}

.el-card:hover {
	background: #ebf7ff !important;
}

/* 卡片大标题样式 */

.card-title {
	font-weight: bold;
}

/* 卡片操作按钮样式 */

.card-btn {
	float: right;
	margin: 0 4px;
}

/* 人员头像 */

.img {
	width: 100%;
	height: 100%;
}

/* 卡片内容字体样式 */

.card-font {
	margin: 6px 0;
	font-size: 12px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

/* //性别图标 */

.sexIcon {
	font-weight: bold;
	font-size: 18px;
	margin-left: 4px;
}

/* 标签样式 */

.labelBox {
	float: left;
	width: 100%;
}

.label {
	width: 40px;
	height: 20px;
	text-align: center;
	line-height: 20px;
	font-size: 12px;
	color: #fff;
	margin: 0 6px 0 0;
	display: inline-block;
}

/* 编辑样式 */

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

/* 注释字体样式 */

.explain {
	font-size: 12px !important;
	color: #999999 !important;
	margin-left: 14px !important;
}

::v-deep .el-table--medium .el-table__cell {
	padding: 0;
}

::v-deep .el-dialog__title {
	font-weight: bold;
}

.honor ::v-deep .el-dialog__body {
	padding-top: 0;
}

.honor .titleBox {
	font-size: 22px;
	font-weight: bold;
	text-align: center;
	color: #303133;
}

.honor .titleBox p {
	margin-top: 0;
}

.partyImg img {
	width: 146px;
	height: 146px;
}

.partyImg p {
	margin: 0;
}
</style>