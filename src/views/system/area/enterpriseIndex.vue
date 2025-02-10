<!-- 实有企业 -->
<template>
	<div class="app-container">
		<!-- 标题 -->
		<h1 class="fontColor">企业列表<span class="spanColor">（{{queryParams.total}}）</span></h1>
		<el-form :model="queryParams" ref="form" size="small" :inline="true" label-width="68px" style="margin-top: 20px">
			<el-form-item label="网格：" prop="areaId">
				<treeSelect v-model="queryParams.areaId" :props="treeProps" :options="treeData" :value="value" :accordion="true" placeholder="请选择">
				</treeSelect>
			</el-form-item>
			<el-form-item label="关键字：" prop="key" label-width="68px">
				<el-input clearable v-model="queryParams.key" placeholder="企业/法人名称" />
			</el-form-item>
			<el-button plain size="small" @click="handleQuery">查询</el-button>
			<!-- 添加企业 -->
			<el-form-item style="float: right">
				<el-button type="primary" plain size="mini" v-hasPermi="['system:enterprise:senior']" @click="handleSearch()"> 高级 </el-button>
				<el-button type="primary" plain size="mini" v-hasPermi="['system:enterprise:add']" @click="handleAdd()"> 添加企业 </el-button>
			</el-form-item>
		</el-form>

		<!-- 卡片 -->
		<el-row style="margin-top: 20px;cursor: pointer">
			<el-card :body-style="{ padding: '10px' }" @click.native="handleDetails(item.id)" v-for="(item) in enterprises" :key="item.id">
				<!-- 操作按钮 -->
				<div class="card-btn">
					<el-button type="text" v-hasPermi="['system:enterprise:edit']" icon="el-icon-edit" @click.stop="handleEdit(item)"></el-button>
					<el-button type="text" v-hasPermi="['system:enterprise:del']" icon="el-icon-delete" @click.stop="handleDelete(item)"></el-button>
				</div>

				<!-- 卡片内容 -->
				<div>
					<div style="width: 100px;height: 100px;float: left;margin-right: 10px;background: #E6EDFF;text-align: center">
						<!--            <i class="icon-institution" style="color: #BBC4EA;line-height: 100px;font-size: 60px"></i>-->
						<i class="icon-institution" style="color: #BBC4EA;line-height: 100px;font-size: 60px" v-if="item.enterLogoPicture === ''"></i>
						<el-image :src="item.enterLogoPicture" :fit="fit" class="img" v-else></el-image>
					</div>
					<el-tooltip class="item" effect="dark" placement="top">
						<div slot="content">{{item.enterName}}</div>
						<p class="card-title">{{item.enterName}}</p>
					</el-tooltip>
					<div style="margin: 0 0 30px 30px">
						<p class="card-font">法定代表人：{{item.legalRepresentName}}</p>
						<p class="card-font">地址：{{item.enterAddress}}</p>
					</div>
				</div>
			</el-card>
		</el-row>

		<div slot="empty" v-if="this.enterprises.length === 0" style="display: flex;align-items: center;text-align:center;">
			<div style="width: 100%;">
				<img src="../../../assets/images/nothing.png" width="24%" />
			</div>
		</div>

		<!-- 添加企业弹窗 -->
		<el-dialog :visible.sync="addDialog" title="添加企业" width="70%" :close-on-click-modal="false" @close="dictAddVisible('addForm')">
			<template>
				<el-form ref="addForm" label-width="138px" :model="addForm" :rules="rules">
					<div class="dialogBox">
						<p class="boxTitle">房屋信息</p>
						<el-form-item label="所属房屋：" prop="houseAddress">
							<el-input v-model="addForm.houseAddress" placeholder="请选择" style="display: inline-block;width: 90%" />
							<el-button type="primary" plain style="margin-left: 1%" @click="houseSelection()">选择</el-button>
						</el-form-item>
						<div v-if="addForm.houseAddress !== '' && addForm.houseAddress !== undefined">
							<el-form-item label="所属小区：" prop="communityName" class="house-width">
								<el-input v-model="addForm.communityName" disabled placeholder="请输入" />
							</el-form-item>
							<el-form-item label="所属性质：" prop="houseProperty" class="house-width">
								<el-input v-model="addForm.houseProperty" disabled placeholder="请输入" />
							</el-form-item>
							<el-form-item label="房屋产权：" prop="housePropertyRight" class="house-width">
								<el-input v-model="addForm.housePropertyRight" disabled placeholder="请输入" />
							</el-form-item>
							<el-form-item label="房屋用途：" prop="housePurpose" class="house-width">
								<el-input v-model="addForm.housePurpose" disabled placeholder="请输入" />
							</el-form-item>
							<el-form-item label="房屋标准地址：" prop="houseAddress">
								<el-input v-model="addForm.houseAddress" disabled placeholder="请输入" />
							</el-form-item>
						</div>
					</div>
					<div class="dialogBox">
						<p class="boxTitle">基本信息</p>
						<el-form-item label="企业名称：" prop="enterName" class="input-width">
							<el-input clearable v-model="addForm.enterName" placeholder="请输入" />
						</el-form-item>
						<el-form-item label="组织类型：" prop="groupType" class="input-width">
							<el-select clearable v-model="addForm.groupType" placeholder="请选择">
								<el-option v-for="dict in dict.type.organization_type" :key="dict.value" :label="dict.label" :value="dict.value">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="企业类型：" prop="enterType" class="input-width">
							<el-select clearable v-model="addForm.enterType" placeholder="请选择">
								<el-option v-for="dict in dict.type.enterprise_type" :key="dict.value" :label="dict.label" :value="dict.value">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="企业证件登记号：" prop="certRegisterNo" class="input-width">
							<el-input clearable v-model="addForm.certRegisterNo" placeholder="请输入" />
						</el-form-item>
						<el-form-item label="登记机关：" prop="registerAuthority" class="input-width">
							<el-input clearable v-model="addForm.registerAuthority" placeholder="请输入" />
						</el-form-item>
						<div>
							<el-form-item label="法定代表人姓名：" prop="legalRepresentName" class="input-width">
								<el-input clearable v-model="addForm.legalRepresentName" placeholder="请输入" />
							</el-form-item>
							<el-form-item label="法人代表证件号：" prop="legalRepresentCertid" class="input-width">
								<el-input clearable v-model="addForm.legalRepresentCertid" placeholder="请输入" />
							</el-form-item>
							<el-form-item label="法人代表联系方式：" prop="legalRepresentPhone" class="input-width">
								<el-input clearable v-model="addForm.legalRepresentPhone" placeholder="请输入" />
							</el-form-item>
							<el-form-item label="负责人姓名：" prop="securityChargeName" class="input-width">
								<el-input clearable v-model="addForm.securityChargeName" placeholder="请输入" />
							</el-form-item>
							<el-form-item label="负责人证件号：" prop="securityChargeCertid" class="input-width">
								<el-input clearable v-model="addForm.securityChargeCertid" placeholder="请输入" />
							</el-form-item>
							<el-form-item label="负责人联系方式：" prop="securityChargePhone" class="input-width">
								<el-input clearable v-model="addForm.securityChargePhone" placeholder="请输入" />
							</el-form-item>
							<el-form-item label="办公地址：" prop="enterAddress">
								<el-input v-model="addForm.enterAddress" placeholder="请输入" />
							</el-form-item>
						</div>
					</div>
					<div class="dialogBox">
						<el-collapse v-model="activeNames">
							<el-collapse-item title="扩展信息" name="1">
								<div style="width: 70%;display: inline-block;vertical-align: top">
									<el-form-item label="企业人数：" prop="enterPeopleNum" class="extend-width">
										<el-input clearable v-model="addForm.enterPeopleNum" placeholder="请输入" />
									</el-form-item>
									<el-form-item label="关注程度：" prop="concernDegree" class="extend-width">
										<el-select clearable v-model="addForm.concernDegree" placeholder="请选择" style="width: 100%">
											<el-option v-for="dict in dict.type.focous_degree" :key="dict.value" :label="dict.label" :value="dict.value">
											</el-option>
										</el-select>
									</el-form-item>
									<el-form-item label="是否有境外背景：" prop="overseaBackgroud" class="extend-width">
										<el-select clearable v-model="addForm.overseaBackgroud" placeholder="请选择" style="width: 100%">
											<el-option v-for="dict in dict.type.is_party_status" :key="dict.value" :label="dict.label" :value="dict.value">
											</el-option>
										</el-select>
									</el-form-item>
									<el-form-item label="资金来源：" prop="fundsSource" class="extend-width">
										<el-input clearable v-model="addForm.fundsSource" placeholder="请输入" />
									</el-form-item>
									<el-form-item label="是否有中国党组织：" prop="chinaPartyOrg" class="extend-width">
										<el-select clearable v-model="addForm.chinaPartyOrg" placeholder="请选择" style="width: 100%">
											<el-option v-for="dict in dict.type.is_party_status" :key="dict.value" :label="dict.label" :value="dict.value">
											</el-option>
										</el-select>
									</el-form-item>
									<el-form-item label="中共党员数量：" prop="cpcPartymemberNum" class="extend-width" v-if="addForm.chinaPartyOrg === '是'">
										<el-input clearable v-model="addForm.cpcPartymemberNum" placeholder="请输入" />
									</el-form-item>
									<el-form-item label="是否有工会：" prop="labourUnion" class="extend-width">
										<el-select clearable v-model="addForm.labourUnion" placeholder="请选择" style="width: 100%">
											<el-option v-for="dict in dict.type.is_party_status" :key="dict.value" :label="dict.label" :value="dict.value">
											</el-option>
										</el-select>
									</el-form-item>
									<el-form-item label="工会会员数量：" prop="labourMemberNum" class="extend-width" v-if="addForm.labourUnion === '是'">
										<el-input clearable v-model="addForm.labourMemberNum" placeholder="请输入" />
									</el-form-item>
									<el-form-item label="是否有妇联组织：" prop="womenOrganization" class="extend-width">
										<el-select clearable v-model="addForm.womenOrganization" placeholder="请选择" style="width: 100%">
											<el-option v-for="dict in dict.type.is_party_status" :key="dict.value" :label="dict.label" :value="dict.value">
											</el-option>
										</el-select>
									</el-form-item>
									<el-form-item label="妇联数量：" prop="womenNum" class="extend-width" v-if="addForm.womenOrganization === '是'">
										<el-input clearable v-model="addForm.womenNum" placeholder="请输入" />
									</el-form-item>
									<el-form-item label="简介：" prop="briefIntroduction">
										<el-input v-model="addForm.briefIntroduction" type="textarea" placeholder="请输入" />
									</el-form-item>
								</div>
								<div style="display: inline-block;width: 30%;vertical-align: top">
									<el-form-item label="企业logo：" prop="enterLogoPicture">
										<image-upload v-model="addForm.enterLogoPicture" :limit="1" />
									</el-form-item>
								</div>
							</el-collapse-item>
						</el-collapse>
					</div>
				</el-form>
			</template>
			<div slot="footer" style="text-align: center">
				<el-button type="primary" @click="submitAdd('addForm')">保存</el-button>
				<el-button type="default" @click="dictAddVisible('addForm')">取消</el-button>
			</div>
		</el-dialog>

		<!-- 编辑弹窗 -->
		<el-dialog :visible.sync="dialogEdit" title="编辑企业" width="70%" :close-on-click-modal="false" @close="dictEditVisible('editForm')">
			<template>
				<el-form ref="editForm" label-width="138px" :model="editForm" :rules="rules">
					<div class="dialogBox">
						<p class="boxTitle">房屋信息</p>
						<el-form-item label="所属房屋：" prop="houseAddress">
							<el-input v-model="editForm.baHouse.houseAddress" placeholder="请选择" style="display: inline-block;width: 90%" />
							<el-button type="primary" plain style="margin-left: 1%" @click="houseSelection()">选择</el-button>
						</el-form-item>
						<div>
							<el-form-item label="所属小区：" prop="communityName" class="house-width">
								<el-input v-model="editForm.baHouse.communityName" disabled placeholder="请输入" />
							</el-form-item>
							<el-form-item label="所属性质：" prop="houseProperty" class="house-width">
								<el-input v-model="editForm.baHouse.houseProperty" disabled placeholder="请输入" />
							</el-form-item>
							<el-form-item label="房屋产权：" prop="housePropertyRight" class="house-width">
								<el-input v-model="editForm.baHouse.housePropertyRight" disabled placeholder="请输入" />
							</el-form-item>
							<el-form-item label="房屋用途：" prop="housePurpose" class="house-width">
								<el-input v-model="editForm.baHouse.housePurpose" disabled placeholder="请输入" />
							</el-form-item>
							<el-form-item label="房屋标准地址：" prop="houseAddress">
								<el-input v-model="editForm.baHouse.houseAddress" disabled placeholder="请输入" />
							</el-form-item>
						</div>
					</div>
					<div class="dialogBox">
						<p class="boxTitle">基本信息</p>
						<el-form-item label="企业名称：" prop="enterName" class="input-width">
							<el-input clearable v-model="editForm.enterName" placeholder="请输入" />
						</el-form-item>
						<el-form-item label="组织类型：" prop="groupType" class="input-width">
							<el-select clearable v-model="editForm.groupType" placeholder="请选择">
								<el-option v-for="dict in dict.type.organization_type" :key="dict.value" :label="dict.label" :value="dict.value">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="企业类型：" prop="enterType" class="input-width">
							<el-select clearable v-model="editForm.enterType" placeholder="请选择">
								<el-option v-for="dict in dict.type.enterprise_type" :key="dict.value" :label="dict.label" :value="dict.value">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="企业证件登记号：" prop="certRegisterNo" class="input-width">
							<el-input clearable v-model="editForm.certRegisterNo" placeholder="请输入" />
						</el-form-item>
						<el-form-item label="登记机关：" prop="registerAuthority" class="input-width">
							<el-input clearable v-model="editForm.registerAuthority" placeholder="请输入" />
						</el-form-item>
						<div>
							<el-form-item label="法定代表人姓名：" prop="legalRepresentName" class="input-width">
								<el-input clearable v-model="editForm.legalRepresentName" placeholder="请输入" />
							</el-form-item>
							<el-form-item label="法人代表证件号：" prop="legalRepresentCertid" class="input-width">
								<el-input clearable v-model="editForm.legalRepresentCertid" placeholder="请输入" />
							</el-form-item>
							<el-form-item label="法人代表联系方式：" prop="legalRepresentPhone" class="input-width">
								<el-input clearable v-model="editForm.legalRepresentPhone" placeholder="请输入" />
							</el-form-item>
							<el-form-item label="负责人姓名：" prop="securityChargeName" class="input-width">
								<el-input clearable v-model="editForm.securityChargeName" placeholder="请输入" />
							</el-form-item>
							<el-form-item label="负责人证件号：" prop="securityChargeCertid" class="input-width">
								<el-input clearable v-model="editForm.securityChargeCertid" placeholder="请输入" />
							</el-form-item>
							<el-form-item label="负责人联系方式：" prop="securityChargePhone" class="input-width">
								<el-input clearable v-model="editForm.securityChargePhone" placeholder="请输入" />
							</el-form-item>
							<el-form-item label="办公地址：" prop="enterAddress">
								<el-input v-model="editForm.enterAddress" placeholder="请输入" />
							</el-form-item>
						</div>
					</div>
					<div class="dialogBox">
						<el-collapse v-model="activeNames">
							<el-collapse-item title="扩展信息" name="1">
								<div style="width: 70%;display: inline-block;vertical-align: top">
									<el-form-item label="企业人数：" prop="pAreaId" class="extend-width">
										<el-input clearable v-model="editForm.enterPeopleNum" placeholder="请输入" />
									</el-form-item>
									<el-form-item label="关注程度：" prop="concernDegree" class="extend-width">
										<el-select clearable v-model="editForm.concernDegree" placeholder="请选择" style="width: 100%">
											<el-option v-for="dict in dict.type.focous_degree" :key="dict.value" :label="dict.label" :value="dict.value">
											</el-option>
										</el-select>
									</el-form-item>
									<el-form-item label="是否有境外背景：" prop="overseaBackgroud" class="extend-width">
										<el-select clearable v-model="editForm.overseaBackgroud" placeholder="请选择" style="width: 100%">
											<el-option v-for="dict in dict.type.is_party_status" :key="dict.value" :label="dict.label" :value="dict.value">
											</el-option>
										</el-select>
									</el-form-item>
									<el-form-item label="资金来源：" prop="fundsSource" class="extend-width">
										<el-input clearable v-model="editForm.fundsSource" placeholder="请输入" />
									</el-form-item>
									<el-form-item label="是否有中国党组织：" prop="chinaPartyOrg" class="extend-width">
										<el-select clearable v-model="editForm.chinaPartyOrg" placeholder="请选择" style="width: 100%">
											<el-option v-for="dict in dict.type.is_party_status" :key="dict.value" :label="dict.label" :value="dict.value">
											</el-option>
										</el-select>
									</el-form-item>
									<el-form-item label="中共党员数量：" prop="cpcPartymemberNum" class="extend-width" v-if="editForm.chinaPartyOrg === '是'">
										<el-input clearable v-model="editForm.cpcPartymemberNum" placeholder="请输入" />
									</el-form-item>
									<el-form-item label="是否有工会：" prop="labourUnion" class="extend-width">
										<el-select clearable v-model="editForm.labourUnion" placeholder="请选择" style="width: 100%">
											<el-option v-for="dict in dict.type.is_party_status" :key="dict.value" :label="dict.label" :value="dict.value">
											</el-option>
										</el-select>
									</el-form-item>
									<el-form-item label="工会会员数量：" prop="labourMemberNum" class="extend-width" v-if="editForm.labourUnion === '是'">
										<el-input clearable v-model="editForm.labourMemberNum" placeholder="请输入" />
									</el-form-item>
									<el-form-item label="是否有妇联组织：" prop="womenOrganization" class="extend-width">
										<el-select clearable v-model="editForm.womenOrganization" placeholder="请选择" style="width: 100%">
											<el-option v-for="dict in dict.type.is_party_status" :key="dict.value" :label="dict.label" :value="dict.value">
											</el-option>
										</el-select>
									</el-form-item>
									<el-form-item label="妇联数量：" prop="womenNum" class="extend-width" v-if="editForm.womenOrganization === '是'">
										<el-input clearable v-model="editForm.womenNum" placeholder="请输入" />
									</el-form-item>
									<el-form-item label="简介：" prop="briefIntroduction">
										<el-input v-model="editForm.briefIntroduction" type="textarea" placeholder="请输入" />
									</el-form-item>
								</div>
								<div style="display: inline-block;width: 30%;vertical-align: top">
									<el-form-item label="企业logo：" prop="enterLogoPicture">
										<image-upload v-model="editForm.enterLogoPicture" :limit="1" />
									</el-form-item>
								</div>
							</el-collapse-item>
						</el-collapse>
					</div>
				</el-form>
			</template>
			<div slot="footer" style="text-align: center">
				<el-button type="primary" @click="submitForm('editForm')">保存</el-button>
				<el-button type="default" @click="dictEditVisible('editForm')">取消</el-button>
			</div>
		</el-dialog>

		<!--房屋选择弹窗 -->
		<el-dialog :visible.sync="houseDialog" title="房屋选择器" width="70%" :close-on-click-modal="false" @close="dictHouseVisible()">
			<template>
				<el-form ref="houseForm" :model="houseForm" size="small" :inline="true" label-width="82px">
					<el-form-item label="网格：" prop="areaId">
						<treeSelect v-model="houseForm.areaId" :props="treeProps" :options="treeData" placeholder="请选择" @getValue="getEstate($event)">
						</treeSelect>
					</el-form-item>
					<el-form-item label="所属小区：">
						<el-select clearable filterable v-model="houseForm.communityId" placeholder="请选择" @change="getBuilding">
							<el-option v-for="item in regionOptions" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="所属建筑：">
						<el-select clearable filterable v-model="houseForm.building" placeholder="请选择" @change="getUnit($event)">
							<el-option v-for="item in buildingOptions" :key="item.value" :label="item.label" :value={value:item.value,buidingNumber:item.buidingNumber}>
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="所属单元：">
						<el-select clearable filterable v-model="houseForm.unitNumber" placeholder="请选择">
							<el-option v-for="item in UnitOptions" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="关键字：">
						<el-input clearable v-model="houseForm.key" placeholder="房主姓名/门牌号" />
					</el-form-item>
					<el-form-item>
						<el-button plain size="small" @click="houseHandleQuery">查询</el-button>
					</el-form-item>
				</el-form>
				<el-table :loading="loading" :data="houseList" :header-cell-style="{background:'#EBF7FF'}" stripe border>
					<el-table-column align="center" width="36">
						<template slot-scope="scope">
							<el-radio :label="scope.row.houseId" v-model="checked" @change="cardRadionChange(scope.row)">{{''}}</el-radio>
						</template>
					</el-table-column>
					<el-table-column label="所属网格" align="center" prop="areaName" />
					<el-table-column label="所属建筑" align="center" prop="communityName">
						<template slot-scope="scope">
							<!--              <p>{{scope.row.communityName}}{{scope.row.buidingNumber}}</p>-->
							<p>{{scope.row.building_name}}</p>
						</template>
					</el-table-column>
					<el-table-column label="所属单元" align="center" prop="unitNumber" width="120" />
					<el-table-column label="门牌号" align="center" prop="houseNumber" width="100" />
					<el-table-column label="房主" align="center" prop="name" width="120" />
					<el-table-column label="标准地址" align="center" prop="houseAddress" width="462" />
				</el-table>
				<p>共{{this.houseForm.total}}条</p>
				<!-- 分页 -->
				<pagination :total="houseForm.total" :page.sync="houseForm.pageNum" :limit.sync="houseForm.pageSize" @pagination="houseSelection()" />
			</template>
			<div slot="footer" style="text-align: center">
				<el-button type="primary" @click="houseSubmitForm()">确定</el-button>
				<el-button type="default" @click="dictHouseVisible()">取消</el-button>
			</div>
		</el-dialog>

		<!-- 分页 -->
		<pagination v-if="queryParams.total !== 0" :total="queryParams.total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize" :page-sizes="[12, 16, 20]" @pagination="getList()" />
	</div>
</template>

<script>
	import { treeList, areaTree } from "@/api/area/area";
	import { listEnterprise, listEnterpriseLimit, delEnterprise, getHouseList, addEnterprise, getEnterprise, updateEnterprise, getUnitList } from "@/api/area/enterprise";
	import { estateList, buildingList } from "@/api/area/population";

	export default {
		name: "enterprise",
		dicts: [
			'sys_normal_disable',
			'organization_type',
			'enterprise_type',
			'focous_degree',
			'is_party_status'
		],
		data() {
			return {
				loading: true, // 遮罩层
				fit: 'contain', // img图片填充方式
				addDialog: false, // 新增弹窗
				houseDialog: false, // 房屋选择弹窗
				checked: '', //房屋选择单选是否选中
				dialogEdit: false, //编辑弹窗
				addForm: { //新增表单参数
					isAdd: false,
				},
				editForm: { //编辑表单参数
					baHouse: {}
				},
				houseList: [], //房屋选择器表单数据
				houseSelected: {}, //单选选中的数据
				activeNames: ['1'], //折叠板默认展开
				treeProps: {
					label: "label",
					value: "id",
					children: "children",
				},
				value: '', //选中的数据
				treeData: [], //下拉框数据
				regionOptions: [], //小区下拉框
				buildingOptions: [], //楼房下拉框
				UnitOptions: [], //单元下拉框
				// 卡片查询参数
				queryParams: {
					userId: localStorage.getItem("userId"),
					pageNum: 1, //当前页
					pageSize: 12, //每页条数
					total: 0, // 总条数
				},
				//房屋选择器搜索参数
				houseForm: {
					userId: localStorage.getItem("userId"),
					pageNum: 1, //当前页
					pageSize: 10, //每页条数
					total: 0, // 总条数
				},
				enterprises: [], //企业列表
				// 表单校验
				rules: {},
			};
		},
		created() {
			this.getTree()
			this.getList();
		},
		methods: {
			// 查询树
			getTree() {
				let param = {
					userId: localStorage.getItem("userId"),
					flag: 0
				}
				// treeList().then(res => {
				areaTree(param).then(res => {
					this.treeData = res.data
					this.areaTitle = res.data[0].label
					this.stringPosition = res.data[0].label
				})
			},

			// 查询所有企业列表
			getList() {
				this.loading = true;
				listEnterpriseLimit(this.queryParams).then((res) => {
					if(res.code === 200) {
						this.enterprises = res.rows
						for(let i = 0; i < res.rows.length; i++) {
							if(this.enterprises[i].enterLogoPicture !== "" && this.enterprises[i].enterLogoPicture !== null) {
								this.enterprises[i].enterLogoPicture = process.env.VUE_APP_BASE_API + this.enterprises[i].enterLogoPicture
							} else {
								this.enterprises[i].enterLogoPicture = ''
							}
						}
						this.queryParams.total = res.total
					}
				});
			},

			//点击卡片跳转详情页面
			handleDetails(id) {
				const src = `/enterprise/enterpriseDetails`;
				this.$router.push({
					path: src,
					query: {
						enterpriseId: id
					}
				});
			},

			//高级按钮跳转页面
			handleSearch() {
				const src = `/enterprise/enterpriseSenior`;
				this.$router.push({
					path: src,
				});
			},

			//房屋选择器弹窗
			houseSelection() {
				this.houseDialog = true
				console.log(this.editForm.houseId)
				if(this.editForm.houseId !== '' && this.editForm.houseId !== null && this.editForm.houseId !== undefined) {
					this.checked = this.editForm.houseId
				}
				getHouseList(this.houseForm).then((res) => {
					if(res.code === 200) {
						this.houseList = res.rows;
						this.houseForm.total = res.total
					}
				});
			},

			//小区
			getEstate(value) {
				let param = {
					areaId: value.id
				}
				estateList(param).then(res => {
					let options = res.rows;
					this.regionOptions = options.map(item => {
						return {
							value: `${item.id}`,
							label: `${item.communityName}`
						};
					})
				})
				buildingList(param).then(res => {
					let options = res.data;
					this.buildingOptions = options.map(item => {
						return {
							value: `${item.id}`,
							label: `${item.building_name}`,
							buidingNumber: `${item.buiding_number}`
						};
					})
				})
			},

			// 所属建筑
			getBuilding(value) {
				let param = {
					areaId: this.houseForm.areaId,
					communityId: value,
				}
				buildingList(param).then(res => {
					let options = res.data;
					this.buildingOptions = options.map(item => {
						return {
							value: `${item.id}`,
							label: `${item.building_name}`,
							buidingNumber: `${item.buiding_number}`
						};
					})
				})
			},

			// 所属单元
			getUnit(value) {
				let param = {
					id: value.value,
					buidingNumber: value.buidingNumber,
				}
				getUnitList(param).then(res => {
					let options = res.data;
					this.UnitOptions = options.map(item => {
						return {
							value: `${item.unit_number}`,
							label: `${item.unit_number}`
						};
					})
				})
			},

			//房屋选择器查询
			houseHandleQuery() {
				this.houseForm.pageNum = 1;
				if(this.houseForm.building !== undefined) {
					this.houseForm.id = this.houseForm.building.value
				}
				this.houseSelection(this.houseForm);
			},

			//房屋选择器单选按钮
			cardRadionChange(row) {
				this.houseList.forEach(item => {
					item.checked = item.houseId
				})
				this.houseSelected = row
			},

			//房屋选择器确定
			houseSubmitForm() {
				this.houseDialog = false
				console.log(this.isAdd)
				if(this.isAdd === true) {
					this.addForm.houseAddress = this.houseSelected.houseAddress
					this.addForm.communityName = this.houseSelected.communityName
					this.addForm.houseProperty = this.houseSelected.houseProperty
					this.addForm.housePropertyRight = this.houseSelected.housePropertyRight
					this.addForm.housePurpose = this.houseSelected.housePurpose
					this.addForm.houseId = this.houseSelected.houseId
					this.addForm.buildingTemplate = this.houseSelected.buildingTemplate
				} else if(this.isAdd === false) {
					this.editForm.baHouse.houseAddress = this.houseSelected.houseAddress
					this.editForm.baHouse.communityName = this.houseSelected.communityName
					this.editForm.baHouse.houseProperty = this.houseSelected.houseProperty
					this.editForm.baHouse.housePropertyRight = this.houseSelected.housePropertyRight
					this.editForm.baHouse.housePurpose = this.houseSelected.housePurpose
					this.editForm.baHouse.houseId = this.houseSelected.houseId
					this.editForm.houseId = this.houseSelected.houseId
					this.editForm.buildingTemplate = this.houseSelected.buildingTemplate
				}
			},

			//房屋选择器取消
			dictHouseVisible() {
				this.houseDialog = false
				this.houseSelected = {}
				this.houseForm = {}
			},

			//添加弹窗打开
			handleAdd() {
				this.addDialog = true
				this.isAdd = true
			},

			//添加企业
			submitAdd(addForm) {
				this.$refs[addForm].validate((valid) => {
					addEnterprise(this.addForm).then((res) => {
						this.addDialog = false;
						this.$message.success('添加成功')
						this.$refs[addForm].resetFields();
						this.addForm={}
						this.getList()
					})
				})
			},

			//添加弹窗关闭
			dictAddVisible(addForm) {
				this.$refs[addForm].resetFields();
				this.addDialog = false
			},

			// 编辑弹窗打开
			handleEdit(row) {
				this.dialogEdit = true;
				this.isAdd = false
				getEnterprise(row.id).then((res) => {
					if(res.code === 200) {
						console.log(res)
						this.editForm = res.data;
					}
				});
			},

			//编辑的提交按钮
			submitForm(editForm) {
				this.$refs[editForm].validate((valid) => {
					if(valid) {
						console.log(this.editForm)
						updateEnterprise(this.editForm).then((res) => {
							this.dialogEdit = false;
							this.$message.success("修改成功");
							this.getList()
						}).catch(() => {});
					}
				});
			},

			//编辑弹窗关闭
			dictEditVisible(editForm) {
				this.$refs[editForm].resetFields();
				this.dialogEdit = false
			},

			//查询
			handleQuery() {
				console.log(this.queryParams);
				this.queryParams.pageNum = 1;
				this.getList(this.queryParams);
			},

			//删除按钮操作
			handleDelete(row) {
				const id = row.id;
				this.$confirm('是否删除企业："' + row.enterName + '"？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(function() {
					return delEnterprise(id)
				}).then(data => {
					this.getList();
					this.$message.success('删除成功')
				}).catch(() => {})
			},
		},
	};
</script>
<style scoped>
	/* p标签公共样式 */
	
	.font {
		margin: 0;
		padding: 0;
	}
	/* 网格和网格数量的字体样式 */
	
	.title {
		margin: 0 0 0 5px;
		padding: 0;
		font-size: 14px;
		font-weight: bold;
	}
	/* 区域字体样式 */
	
	.fontColor {
		margin: 0;
		padding: 0;
		color: #5C6BC0;
		font-weight: bold;
	}
	/* 详情字体样式 */
	
	.spanColor {
		color: #5C6BC0;
		font-size: 12px;
		font-weight: normal;
		cursor: pointer;
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
	/* 卡片样式 */
	
	.el-card {
		border-radius: 10px;
		width: 24%;
		margin: 0.5% 0.5%;
		display: inline-block;
	}
	
	.el-card:hover {
		background: #EBF7FF !important;
	}
	/* 卡片大标题样式 */
	
	.card-title {
		font-weight: bold;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	/* 卡片图片样式 */
	
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
	/* 卡片操作按钮样式 */
	
	.card-btn {
		float: right;
		padding: 6px 14px;
		margin: 6px;
		border-radius: 6px;
	}
	/* 卡片标注状态字体样式 */
	
	.card-state {
		float: right;
		font-weight: bold;
		margin: 6px;
		font-size: 12px;
	}
	/* 已标注字体颜色 */
	
	.marked {
		color: #3bc2b4;
	}
	/* 未标注字体颜色 */
	
	.unmarked {
		color: #999;
	}
	/* 编辑输入框样式 */
	
	.input-width {
		width: 25%;
		display: inline-block;
	}
	
	.input-width div {
		width: 90%;
	}
	
	.introduce {
		width: 96%;
	}
	/*面积平方样式*/
	
	.square {
		margin-left: 4px;
	}
	/*弹窗公共样式*/
	
	.dialogBox {
		border: 1px solid #ccc;
		padding: 20px;
		margin-bottom: 20px;
	}
	
	.boxTitle {
		font-size: 14px;
		font-weight: bold;
	}
	/* 房屋信息编辑输入框样式 */
	
	.house-width {
		width: 25%;
		display: inline-block;
	}
	/* 基本信息输入框样式 */
	
	.input-width {
		width: 31%;
		display: inline-block;
	}
	/* 扩展信息输入框样式 */
	
	.extend-width {
		width: 50%;
		display: inline-block;
	}
	/*折叠版块样式*/
	
	/deep/ .el-collapse {
		border: none;
	}
	
	/deep/.el-collapse-item__wrap {
		border: none;
	}
	
	/deep/ .el-collapse-item__header {
		font-weight: bold;
		color: #606266;
		border: none;
	}
</style>