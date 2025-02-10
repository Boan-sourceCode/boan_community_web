<!--人员详情-->
<template>
	<div class="app-container">
		<!--左侧区域-->
		<div class="box left-box">
			<div style="text-align: right">
				<el-button type="primary" plain size="mini" v-hasPermi="['system:detailsPeople:edit']"
					@click="handleEdit()">
					编辑
				</el-button>
			</div>
			<div class="information-top">
				<div class="image">
					<el-image :src="require('@/assets/images/man.jpg')" :fit="fit" class="img"
						v-if="this.headPortrait === '' && this.peopleData.sex === '男'"></el-image>
					<el-image :src="require('@/assets/images/woman.jpg')" :fit="fit" class="img"
						v-else-if="this.headPortrait === '' && this.peopleData.sex === '女'"></el-image>
					<el-image :src="this.headPortrait" :fit="fit" class="img" v-else></el-image>
				</div>
				<div class="text">
					<p class="font name">{{ this.peopleData.name }}</p>
					<p style="font-weight: bold">{{ this.peopleData.certificateId }}</p>
					<div class="age">
						<p style="color: #fff">{{ this.peopleData.age }}岁</p>
					</div>
				</div>
			</div>
			<div class="information-bottom">
				<p>人口类型：{{ this.peopleData.typeCode }}</p>
				<p>人口类型状态：{{ this.peopleData.extendTypeName }}</p>
				<p>户号：{{ this.peopleData.hukouNumber }}</p>
				<p>户别类型：{{ this.peopleData.hukouType }}</p>
				<p>户籍地址：{{ this.peopleData.hukouAddress }}</p>
				<p>常住地址：{{ this.peopleData.permanentAddress }}</p>
				<p>国籍：{{ this.peopleData.nationality }}</p>
				<p>籍贯: {{ this.peopleData.nativePlace }}</p>
				<p>
					证件类型：
					<dict-tag :options="dict.type.certificate_type" :value="this.peopleData.certificateType" class="tag" />
				</p>
				<p>曾用名: {{ this.peopleData.beforeuseName }}</p>
				<p>民族：{{ this.peopleData.nation }}</p>
				<p>
					政治面貌:{{ this.peopleData.politicalStatus }}
					<!--<dict-tag
            :options="dict.type.political_status"
            :value="this.peopleData.politicalStatus"
            class="tag"
																          />-->
				</p>
				<p>性别：{{ this.peopleData.sex }}</p>
				<p>出生日期：{{ this.peopleData.birthday }}</p>
				<p>
					是否重点人员关注：
					<dict-tag :options="dict.type.is_party_status" :value="this.peopleData.concernStatus" class="tag" />
				</p>
				<p>婚姻状况：{{ this.peopleData.maritalStatus }}</p>
			</div>
			<el-collapse accordion>
				<el-collapse-item title="扩展信息" class="extend">
					<p>人员类别：{{ this.peopleData.peopleType }}</p>
					<p>
						健康情况：
						<dict-tag :options="dict.type.healthy_status" :value="this.peopleData.health" class="tag" />
					</p>
					<p>
						兵役情况：
						<dict-tag :options="dict.type.military_status" :value="this.peopleData.militaryServiceStatus"
							class="tag" />
					</p>
					<p>
						社保状态：
						<dict-tag :options="dict.type.social_security_status" :value="this.peopleData.socialSecurityStatus"
							class="tag" />
					</p>
					<p>是否社会救助对象：{{ this.peopleData.socialAssistanceStatus }}</p>
					<p>是否科技工作者：{{ this.peopleData.technicalWorkerStatus }}</p>
					<p>
						学历：
						<dict-tag :options="dict.type.qualification" :value="this.peopleData.qualification" class="tag" />
					</p>
					<p>专业：{{ this.peopleData.major }}</p>
					<p>毕业学校：{{ this.peopleData.graduationSchool }}</p>
					<p>
						职业类别：
						<dict-tag :options="dict.type.occupational_category" :value="this.peopleData.occupationalCategory"
							class="tag" />
					</p>
					<p>职业：{{ this.peopleData.occupation }}</p>
					<p>现工作单位：{{ this.peopleData.workplace }}</p>
					<p>参加工作时间：{{ this.peopleData.startWorkTime }}</p>
					<p>退休时间：{{ this.peopleData.retireTime }}</p>
					<p>
						退休类型：
						<dict-tag :options="dict.type.retire_type" :value="this.peopleData.retireType" class="tag" />
					</p>
					<p>劳动保障情况：{{ this.peopleData.laborSecurityStatus }}</p>
				</el-collapse-item>
			</el-collapse>
		</div>
		<!--中间区域-->
		<div class="box center-box">
			<div class="content">
				<div>
					<h3 class="fontColor alignment">
						<i class="icon-card-o alignment"></i>人口卡片({{ total }})
					</h3>
				</div>
				<!-- 卡片 -->
				<el-row style="padding: 10px 0">
					<el-card :body-style="{ padding: '0px' }" v-for="(item, index) in CardList" :key="index" class="ka">
						<!-- 卡片内容 -->
						<div>
							<div class="card-title" @click="browse(item, index)">
								<p class="cardTypeFont" v-if="item.templateType !== '' &&
									item.templateType !== null &&
									item.templateType !== undefined
									">
									{{ item.templateName }}（
									<span v-if="item.templateType === '民生卡片'" style="color: #e78c58">民</span>
									<span v-if="item.templateType === '养老卡片'" style="color: #fec379">老</span>
									<span v-if="item.templateType === '党/军/政协卡片'" style="color: #43dd43">军</span>
									<span v-if="item.templateType === '特殊人群卡片'" style="color: #ff0000">特</span>
									<span v-if="item.templateType === '应急卡片'" style="color: #f56c6c">急</span>
									）
								</p>
								<p class="cardTypeFont" v-else>{{ item.templateName }}</p>
							</div>
							<div style="display: inline-block; float: right; margin-right: 10px">
								<el-button type="text" v-hasPermi="['system:detailsPeople:cardEdit']"
									@click="handleCard(item, index)">编辑</el-button>
								<span style="color: #999; margin: 0 4px">&#124;</span>
								<el-button type="text" v-hasPermi="['system:detailsPeople:cardDel']"
									@click="handleDelete(item, index)">删除</el-button>
							</div>
						</div>
						<div class="gundong" @click="browse(item, index)">
							<div style="margin: 10px 6px 10px 18px" v-for="(items, index) in item.controlInfo" :key="index">
								<p class="card-font">
									{{ items.controlName }} ：{{ items.controlContent }}
								</p>
							</div>
						</div>
					</el-card>

					<el-card :body-style="{ padding: '0px' }" @click.native="newlyincreased()">
						<div class="addto">
							<p class="icon-plus"></p>
						</div>
						<h3 style="text-align: center; font-weight: bold; color: #1f79f3">
							添加卡片
						</h3>
					</el-card>
				</el-row>
			</div>
			<div class="content" style="margin: 20px 0">
				<div>
					<h3 class="fontColor alignment">
						<i class="icon-relation alignment"></i>人际关系拓扑图
					</h3>
					<div ref="graph" id="graph" style="width: 100%; height: 300px"></div>
				</div>
			</div>
			<div class="content">
				<div>
					<h3 class="fontColor alignment">
						<i class="icon-house alignment"></i>房屋信息
						<span style="font-size: 14px; font-weight: normal; margin-left: 6px">(共 {{ this.houseList.length }}
							条房屋信息)</span>
					</h3>
				</div>
				<div class="house" v-for="(item, index) in this.houseList" :key="index" @click="relationship(item.id)">
					<div class="houseTitle">
						<p style="color: #fff">房屋{{ index + 1 }}</p>
					</div>
					<p>房屋标准地址：{{ item.houseAddress }}</p>
					<p>
						房屋性质：
						<dict-tag :options="dict.type.house_property" :value="item.houseProperty" class="tag" />
					</p>
					<p>
						房屋产权：
						<dict-tag :options="dict.type.house_property_right" :value="item.housePropertyRight" class="tag" />
					</p>
					<p>常住房屋：是</p>
				</div>
			</div>
		</div>
		<!--右侧区域-->
		<div class="box right-box">
			<div class="politics">
				<h3 class="fontColor" style="color: #f27463">政治面貌：{{ this.peopleData.politicalStatus }}</h3>
				<p>所属党支部：{{ this.peopleData.baPartyMember.partyName }}</p>
				<p>所属职位：{{ this.peopleData.baPartyMember.partyOccupation }}</p>
				<p>党员状态：{{ this.peopleData.baPartyMember.partyMemberStatus }}</p>
			</div>
			<div class="event">
				<h3 class="fontColor" style="color: #3bc2b4">涉及事件（0）</h3>
				<div style="width: 60%; margin: 20px auto">
					<img src="../../../../assets/images/nothing.png" width="100%" />
				</div>
			</div>
			<div>
				<h3 class="fontColor" style="color: #1f79f3; margin-bottom: 20px">
					人员历程
				</h3>
				<el-timeline>
					<el-timeline-item v-for="(activity, index) in activities" :key="index" :timestamp="activity.timestamp"
						:color="activity.color" placement="top">
						{{ activity.content }}
					</el-timeline-item>
				</el-timeline>
			</div>
		</div>
		<!-- 编辑弹窗 -->
		<el-dialog :visible.sync="dialogEdit" title="编辑人员" width="70%" :close-on-click-modal="false"
			@close="dictEditVisible('editForm')">
			<template>
				<el-form ref="editForm" label-width="110px" :model="editForm" :rules="rules">
					<div class="editDialog editLeft">
						<div style=" margin: 0 auto">
							<image-upload class="img_up" v-model="editForm.headPortrait" :limit="1" />

						</div>
						<p style="font-size: 12px; color: #999">
							注：缩略图建议尺寸：400*600
						</p>
						<div class="building">
							<p style="margin: 0">所属房屋：</p>
							<div v-for="(item, index) in this.houseList" :key="index">
								<div class="number">
									<p>{{ index + 1 }}</p>
								</div>
								<div class="address">
									<p>{{ item.houseAddress }}</p>
									<p>所属小区：{{ item.communityName }}</p>
									<p>
										房屋性质：
										<dict-tag :options="dict.type.house_property" :value="item.houseProperty"
											class="tag" />
									</p>
									<p>
										房屋产权：
										<dict-tag :options="dict.type.house_property_right" :value="item.housePropertyRight"
											class="tag" />
									</p>
									<p>房屋地址：</p>
									<p style="margin-bottom: 0">{{ item.houseAddress }}</p>
								</div>
							</div>
						</div>
					</div>
					<div class="editDialog editRight">
						<div class="rightBox">
							<p class="boxTitle">基本信息</p>
							<el-form-item label="姓名：" prop="name" class="input-width">
								<el-input clearable v-model="editForm.name" placeholder="请输入" />
							</el-form-item>
							<el-form-item label="曾用名：" prop="beforeuseName" class="input-width">
								<el-input clearable v-model="editForm.beforeuseName" placeholder="请输入" />
							</el-form-item>
							<el-form-item label="性别：" prop="sex" class="input-width">
								<el-select clearable v-model="editForm.sex" placeholder="请选择">
									<el-option v-for="dict in dict.type.sys_user_sex" :key="dict.value" :label="dict.label"
										:value="dict.value">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="手机号：" prop="phone" class="input-width">
								<el-input clearable v-model="editForm.phoneNumber" placeholder="请输入" />
							</el-form-item>
							<el-form-item label="证件类型：" prop="certificateType" class="input-width">
								<el-select clearable v-model="editForm.certificateType" placeholder="请选择">
									<el-option v-for="dict in dict.type.certificate_type" :key="dict.value"
										:label="dict.label" :value="dict.value">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="证件号：" prop="certificateId" class="input-width">
								<el-input clearable disabled v-model="editForm.certificateId" placeholder="请输入" />
							</el-form-item>
							<el-form-item label="国籍：" prop="nationality" class="input-width">
								<el-select clearable v-model="editForm.nationality" placeholder="请选择">
									<el-option v-for="dict in dict.type.nationality" :key="dict.value" :label="dict.label"
										:value="dict.value">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="籍贯：" prop="nativePlace" class="input-width">
								<!-- <el-select
                  clearable
                  v-model="editForm.nativePlace"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="dict in dict.type.certificate_type"
                    :key="dict.value"
                    :label="dict.label"
                    :value="dict.value"
                  >
                  </el-option>
																                </el-select> -->
								<el-input clearable v-model="editForm.nativePlace" placeholder="请输入" />
							</el-form-item>

							<el-form-item label="出生日期：" prop="birthday" class="input-width">
								<el-date-picker v-model="editForm.birthday" type="date" disabled value-format="yyyy-MM-dd"
									placeholder="选择日期">
								</el-date-picker>
							</el-form-item>
							<el-form-item label="民族：" prop="nation" class="input-width" v-if="editForm.nationality == '中国'">
								<el-select clearable v-model="editForm.nation" placeholder="请选择">
									<el-option v-for="dict in dict.type.nation" :key="dict.value" :label="dict.label"
										:value="dict.value">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="政治面貌：" prop="politicalStatus" class="input-width">
								<el-select clearable v-model="editForm.politicalStatus" placeholder="请选择">
									<el-option v-for="dict in dict.type.political_status" :key="dict.value"
										:label="dict.label" :value="dict.value">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="婚姻状况：" prop="maritalStatus" class="input-width">
								<el-select clearable v-model="editForm.maritalStatus" placeholder="请选择">
									<el-option v-for="dict in dict.type.marital_status" :key="dict.value"
										:label="dict.label" :value="dict.value">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="是否重点人员：" prop="concernStatus" class="input-width">
								<el-select clearable v-model="editForm.concernStatus" placeholder="请选择">
									<el-option v-for="dict in dict.type.is_party_status" :key="dict.value"
										:label="dict.label" :value="dict.value">
									</el-option>
								</el-select>
							</el-form-item>
						</div>
						<div class="rightBox">
							<p class="boxTitle">人口类型信息</p>
							<el-form-item label="人口类型：" prop="typeCode" class="input-width">
								<el-select clearable v-model="editForm.typeCode" placeholder="请选择" @change="getStatus">
									<el-option v-for="dict in dict.type.people_type" :key="dict.value" :label="dict.label"
										:value="dict.value">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="人口类型状态：" prop="extendTypeName" class="input-width">
								<el-select clearable v-model="editForm.extendTypeName" placeholder="请选择">
									<el-option v-for="item in statusOptions" :key="item.id" :label="item.label"
										:value="item.id">
									</el-option>
								</el-select>
							</el-form-item>
							<div class="informationCard" v-if="editForm.typeCode === '户籍人口'" style="margin-bottom: 20px">
								<div class="">
									<p class="boxTitle">户籍信息</p>
									<el-form-item label="户别类型：" prop="hukouType" class="input-width">
										<el-select clearable v-model="editForm.hukouType" placeholder="请选择">
											<el-option v-for="dict in dict.type.registered_type" :key="dict.value"
												:label="dict.label" :value="dict.value">
											</el-option>
										</el-select>
									</el-form-item>
									<el-form-item label="户号：" prop="hukouNumber" class="input-width">
										<el-input clearable v-model="editForm.hukouNumber" placeholder="请输入" />
									</el-form-item>
									<el-form-item label="户籍地址：" prop="hukouAddress">
										<el-input v-model="editForm.hukouAddress" placeholder="请输入" />
									</el-form-item>
									<el-form-item label="常住地址：" prop="permanentAddress">
										<el-input v-model="editForm.permanentAddress" placeholder="请输入" />
									</el-form-item>
								</div>
							</div>
							<div class="informationCard" v-if="editForm.typeCode === '境外人口'" style="margin-bottom: 20px">
								<p class="boxTitle" style="text-align: center">境外人口信息</p>
								<el-form-item label="外文名：" prop="foreignName" class="informationWidth">
									<el-input clearable v-model="editForm.foreignName" placeholder="请输入" />
								</el-form-item>
								<el-form-item label="外文姓：" prop="foreignSurname" class="informationWidth">
									<el-input clearable v-model="editForm.foreignSurname" placeholder="请输入" />
								</el-form-item>
								<el-form-item label="证件有效期：" prop="certValidity" class="informationWidth">
									<el-date-picker v-model="editForm.certValidity" type="daterange" range-separator="至"
										start-placeholder="开始日期" end-placeholder="结束日期">
									</el-date-picker>
								</el-form-item>
								<el-form-item label="入境时间：" prop="entryTime" class="informationWidth">
									<el-date-picker v-model="editForm.entryTime" type="date" placeholder="请选择">
									</el-date-picker>
								</el-form-item>
								<el-form-item label="签证类型：" prop="visaType" class="informationWidth">
									<el-select clearable v-model="editForm.visaType" placeholder="请选择" style="width: 98%">
										<el-option v-for="dict in dict.type.visa_type" :key="dict.value" :label="dict.label"
											:value="dict.value">
										</el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="预计离开日期：" prop="expectLeavetime" class="informationWidth">
									<el-date-picker v-model="editForm.expectLeavetime" type="date" placeholder="请选择">
									</el-date-picker>
								</el-form-item>
								<el-form-item label="来华目的：" prop="tochinaPurpose">
									<el-input type="textarea" v-model="editForm.tochinaPurpose" placeholder="请输入" />
								</el-form-item>
							</div>
							<div class="informationCard" v-if="editForm.typeCode === '户籍人口' &&
								editForm.extendTypeName === '空挂人口'
								">
								<p class="boxTitle" style="text-align: center">空挂人口信息</p>
								<el-form-item label="落户时间：" prop="settleTime" class="informationWidth">
									<el-date-picker v-model="editForm.settleTime" type="date" placeholder="请选择">
									</el-date-picker>
								</el-form-item>
								<el-form-item label="居住地址：" prop="settleAddress" class="informationWidth">
									<el-input clearable v-model="editForm.settleAddress" placeholder="请输入" />
								</el-form-item>
								<el-form-item label="空挂原因：" prop="emptyhangReason">
									<el-input clearable type="textarea" v-model="editForm.emptyhangReason"
										placeholder="请输入" />
								</el-form-item>
							</div>
							<div class="informationCard" v-else-if="editForm.typeCode === '户籍人口' &&
								editForm.extendTypeName === '外出人口'
								">
								<p class="boxTitle" style="text-align: center">外出人口信息</p>
								<el-form-item label="外出原因：" prop="outReason" class="informationWidth">
									<el-select clearable v-model="editForm.outReason" placeholder="请选择" style="width: 100%">
										<el-option v-for="dict in dict.type.outer_reason" :key="dict.value"
											:label="dict.label" :value="dict.value">
										</el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="外出时间：" prop="outTime" class="informationWidth">
									<el-date-picker v-model="editForm.outTime" type="date" placeholder="请选择">
									</el-date-picker>
								</el-form-item>
								<el-form-item label="外出去向：" prop="outWhereabout" class="informationWidth">
									<el-input clearable v-model="editForm.outWhereabout" placeholder="请输入" />
								</el-form-item>
								<el-form-item label="外出详址：" prop="outAddress" class="informationWidth">
									<el-input clearable v-model="editForm.outAddress" placeholder="请输入" />
								</el-form-item>
							</div>
							<div class="informationCard" v-else-if="(editForm.typeCode === '未落户人口' &&
								editForm.extendTypeName === '流动人口') ||
								(editForm.typeCode === '境外人口' &&
									editForm.extendTypeName === '流动人口')
								">
								<p class="boxTitle" style="text-align: center">流动人口信息</p>
								<el-form-item label="流动原因：" prop="floatingReason" class="informationWidth">
									<el-select clearable v-model="editForm.floatingReason" placeholder="请选择"
										style="width: 99%">
										<el-option v-for="dict in dict.type.flow_reason" :key="dict.value"
											:label="dict.label" :value="dict.value">
										</el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="停（居）留证件种类：" prop="stayCerttype" class="informationWidth"
									label-width="152px">
									<el-select clearable v-model="editForm.stayCerttype" placeholder="请选择"
										style="width: 100%">
										<el-option v-for="dict in dict.type.stay_certtype" :key="dict.value"
											:label="dict.label" :value="dict.value">
										</el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="停（居）留证件号码：" prop="statCertid" class="informationWidth"
									label-width="152px">
									<el-input clearable v-model="editForm.statCertid" placeholder="请输入" />
								</el-form-item>
								<el-form-item label="登记日期：" prop="registerDate" class="informationWidth">
									<el-date-picker v-model="editForm.registerDate" type="date" placeholder="请选择">
									</el-date-picker>
								</el-form-item>
								<el-form-item label="证件到期日期：" prop="certificateExpiration" class="informationWidth">
									<el-date-picker v-model="editForm.certificateExpiration" type="date" placeholder="请选择">
									</el-date-picker>
								</el-form-item>
								<el-form-item label="住所类型：" prop="floathouseType" class="informationWidth">
									<el-select clearable v-model="editForm.floathouseType" placeholder="请选择"
										style="width: 100%">
										<el-option v-for="dict in dict.type.floathouse_type" :key="dict.value"
											:label="dict.label" :value="dict.value">
										</el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="预计居住时间：" prop="expectTime" class="informationWidth">
									<el-date-picker v-model="editForm.expectTime" type="daterange" range-separator="至"
										start-placeholder="开始日期" end-placeholder="结束日期" style="width: 100%">
									</el-date-picker>
								</el-form-item>
							</div>
						</div>
						<div class="rightBox">
							<el-collapse v-model="activeNames">
								<el-collapse-item title="扩展信息" name="1">
									<!--<el-form-item label="联系电话：" prop="graduationSchool" class="input-width">
										<el-input clearable v-model="editForm.phone" placeholder="请输入" type="number" oninput="if(value.length>11)value=value.slice(0,11)"  onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode || event.which))) || event.which === 8" />
																									</el-form-item>-->
									<el-form-item label="人员类别：" prop="peopleType" class="input-width">
										<el-select clearable v-model="editForm.peopleType" placeholder="请选择">
											<el-option v-for="dict in dict.type.people_category" :key="dict.value"
												:label="dict.label" :value="dict.value">
											</el-option>
										</el-select>
									</el-form-item>
									<el-form-item label="健康情况：" prop="health" class="input-width">
										<el-select clearable v-model="editForm.health" placeholder="请选择">
											<el-option v-for="dict in dict.type.healthy_status" :key="dict.value"
												:label="dict.label" :value="dict.value">
											</el-option>
										</el-select>
									</el-form-item>
									<el-form-item label="兵役情况：" prop="militaryServiceStatus" class="input-width">
										<el-select clearable v-model="editForm.militaryServiceStatus" placeholder="请选择">
											<el-option v-for="dict in dict.type.military_status" :key="dict.value"
												:label="dict.label" :value="dict.value">
											</el-option>
										</el-select>
									</el-form-item>
									<el-form-item label="社保状态：" prop="socialSecurityStatus" class="input-width">
										<el-select clearable v-model="editForm.socialSecurityStatus" placeholder="请选择">
											<el-option v-for="dict in dict.type.social_security_status" :key="dict.value"
												:label="dict.label" :value="dict.value">
											</el-option>
										</el-select>
									</el-form-item>
									<el-form-item label="学历：" prop="qualification" class="input-width">
										<el-select clearable v-model="editForm.qualification" placeholder="请选择">
											<el-option v-for="dict in dict.type.qualification" :key="dict.value"
												:label="dict.label" :value="dict.value">
											</el-option>
										</el-select>
									</el-form-item>
									<el-form-item label="专业：" prop="major" class="input-width">
										<el-input clearable v-model="editForm.major" placeholder="请输入" />
									</el-form-item>
									<el-form-item label="毕业学校：" prop="graduationSchool" class="input-width">
										<el-input clearable v-model="editForm.graduationSchool" placeholder="请输入" />
									</el-form-item>
									<el-form-item label="现工作单位：" prop="workplace" class="input-width">
										<el-input clearable v-model="editForm.workplace" placeholder="请输入" />
									</el-form-item>
									<el-form-item label="职业类别：" prop="occupationalCategory" class="input-width">
										<el-select clearable v-model="editForm.occupationalCategory" placeholder="请选择">
											<el-option v-for="dict in dict.type.occupational_category" :key="dict.value"
												:label="dict.label" :value="dict.value">
											</el-option>
										</el-select>
									</el-form-item>
									<el-form-item label="职业：" prop="occupation" class="input-width">
										<el-input clearable v-model="editForm.occupation" placeholder="请输入" />
									</el-form-item>
									<el-form-item label="参加工作时间：" prop="startWorkTime" class="input-width">
										<el-date-picker v-model="editForm.startWorkTime" type="date" placeholder="请选择">
										</el-date-picker>
									</el-form-item>
									<el-form-item label="退休类型：" prop="retireType" class="input-width">
										<el-select clearable v-model="editForm.retireType" placeholder="请选择">
											<el-option v-for="dict in dict.type.retire_type" :key="dict.value"
												:label="dict.label" :value="dict.value">
											</el-option>
										</el-select>
									</el-form-item>
									<el-form-item label="退休时间：" prop="retireTime" class="input-width">
										<el-date-picker v-model="editForm.retireTime" type="date" placeholder="请选择">
										</el-date-picker>
									</el-form-item>
									<el-form-item label="劳动保障情况：" prop="laborSecurityStatus" class="input-width">
										<el-input clearable v-model="editForm.laborSecurityStatus" placeholder="请输入" />
									</el-form-item>
									<el-form-item label="是否社会救助对象：" prop="socialAssistanceStatus" class="input-width"
										label-width="138px">
										<el-select clearable v-model="editForm.socialAssistanceStatus" placeholder="请选择">
											<el-option v-for="dict in dict.type.is_party_status" :key="dict.value"
												:label="dict.label" :value="dict.value">
											</el-option>
										</el-select>
									</el-form-item>
									<el-form-item label="是否科技工作者：" prop="technicalWorkerStatus" class="input-width"
										label-width="138px">
										<el-select clearable v-model="editForm.technicalWorkerStatus" placeholder="请选择">
											<el-option v-for="dict in dict.type.is_party_status" :key="dict.value"
												:label="dict.label" :value="dict.value">
											</el-option>
										</el-select>
									</el-form-item>
								</el-collapse-item>
							</el-collapse>
						</div>
						<div class="rightBox" v-if="this.editForm.politicalStatus == '中共党员'
							">
							<el-collapse v-model="activeName">
								<el-collapse-item title="党员信息" name="1">
									<el-form-item label="所属党支部：" prop="partyBranch" class="input-width">
										<treeSelect v-model="editForm.baPartyMember.partyBranch" :props="partyTreeProps"
											:options="partyTreeData" :value="value" placeholder="请选择">
										</treeSelect>
									</el-form-item>
									<div v-if="this.editForm.baPartyMember.partyBranch !== null &&
										this.editForm.baPartyMember.partyBranch !== ''
										" style="display: inline">
										<el-form-item label="党内所属职位：" prop="partyOccupation" class="input-width">
											<el-select clearable v-model="editForm.baPartyMember.partyOccupation"
												placeholder="请选择">
												<el-option v-for="item in postOptions" :key="item.value" :label="item.label"
													:value="item.value">
												</el-option>
											</el-select>
										</el-form-item>
										<el-form-item label="党员状态：" prop="partyMemberStatus" class="input-width">
											<el-select clearable v-model="editForm.baPartyMember.partyMemberStatus"
												placeholder="请选择">
												<el-option v-for="dict in dict.type.party_status" :key="dict.value"
													:label="dict.label" :value="dict.value">
												</el-option>
											</el-select>
										</el-form-item>
										<el-form-item label="申请入党时间：" prop="applyJoinpartyTime" class="input-width">
											<el-date-picker v-model="editForm.baPartyMember.applyJoinpartyTime" type="date"
												value-format="yyyy-MM-dd" placeholder="请选择">
											</el-date-picker>
										</el-form-item>
										<el-form-item label="正式入党时间：" prop="officiaJoinpartyTime" class="input-width">
											<el-date-picker v-model="editForm.baPartyMember.officiaJoinpartyTime"
												type="date" value-format="yyyy-MM-dd" placeholder="请选择">
											</el-date-picker>
										</el-form-item>
										<el-form-item label="来源：" prop="source" class="input-width">
											<el-input clearable v-model="editForm.baPartyMember.source" placeholder="请输入" />
										</el-form-item>
										<el-form-item label="党员失联/清退时间：" prop="dismissalTime" class="input-width"
											label-width="142px">
											<el-date-picker v-model="editForm.baPartyMember.dismissalTime" type="date"
												value-format="yyyy-MM-dd" placeholder="请选择">
											</el-date-picker>
										</el-form-item>
										<el-form-item label="党员转出时间：" prop="transferOutTime" class="input-width">
											<el-date-picker v-model="editForm.baPartyMember.transferOutTime" type="date"
												value-format="yyyy-MM-dd" placeholder="请选择">
											</el-date-picker>
										</el-form-item>
										<el-form-item label="是否获得党员荣誉：" prop="honor" class="input-width"
											label-width="138px">
											<el-select clearable v-model="editForm.baPartyMember.honor" placeholder="请选择">
												<el-option v-for="dict in dict.type.is_party_status" :key="dict.value"
													:label="dict.label" :value="dict.value">
												</el-option>
											</el-select>
										</el-form-item>
										<el-form-item label="备注：" prop="remark">
											<el-input v-model="editForm.baPartyMember.remark" placeholder="请输入备注" />
										</el-form-item>
									</div>
								</el-collapse-item>
							</el-collapse>
						</div>
					</div>
				</el-form>
			</template>
			<div slot="footer" style="text-align: center">
				<el-button type="primary" @click="submitForm('editForm')">保存</el-button>
				<el-button type="default" @click="dictEditVisible('editForm')">取消</el-button>
			</div>
		</el-dialog>

		<!-- 添加卡片弹窗 -->
		<el-dialog :visible.sync="houseDialogEdit" width="70%" :close-on-click-modal="false"
			@close="cancelHouseDialog('editHouseInfo')" class="house_dialog_wrap">
			<template v-loading="loading">
				<el-form v-model="editHouseInfo" ref="editHouseInfo" :rules="rules" :model="form">
					<div class="el_dialog_top">
						<el-form-item style="margin-left: 35%">
							<p class="title" style="display: inline-block; font-weight: 900; font-size: 24px">
								卡片类型：
							</p>
							<!-- <el-select
                v-model="editHouseInfo.templateName"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in editHouseInfo"
                  :key="item.templateId"
                  :label="item.templateName"
                  :value="item.templateId"
                  @click.native="editCommunit(item)"
                >
                </el-option>
																              </el-select> -->
							<el-cascader v-model="editHouseInfo.templateName" :options="editHouseInfo"
								@change="editCommunit">
							</el-cascader>
						</el-form-item>

						<div v-for="(item, index) in this.Cardpulldown" :key="index" class="card">
							<el-form-item v-if="item.controlType === 'input'" :label="item.controlName" prop="name"
								:key="index" label-width="110px">
								<el-input clearable placeholder="请输入" v-model="form[item.controlCode]" style="width: 75%"
									:key="index" />
							</el-form-item>

							<el-form-item v-if="item.controlType === 'select'" :label="item.controlName"
								label-width="110px">
								<el-select placeholder="请选择" v-model="form[item.controlCode]" style="width: 75%">
									<el-option v-for="selectItem in item.controlOptionValueList" :key="selectItem.value"
										:label="selectItem.lable" :value="selectItem.lable">
									</el-option>
								</el-select>
							</el-form-item>

							<el-form-item v-if="item.controlType === 'radio'" :label="item.controlName" label-width="110px">
								<el-radio-group v-model="form[item.controlCode]" style="width: 75%">
									<el-radio v-for="radioItem in item.controlOptionValueList" :key="radioItem.value"
										:label="radioItem.lable" :value="radioItem.lable">
										{{ radioItem.lable }}
									</el-radio>
								</el-radio-group>
							</el-form-item>

							<el-form-item v-if="item.controlType === 'date'" :label="item.controlName" label-width="110px">
								<el-date-picker v-model="form[item.controlCode]" type="date" value-format="yyyy-MM-dd"
									placeholder="选择日期" style="width: 75%">
								</el-date-picker>
							</el-form-item>

							<el-form-item v-if="item.controlType === 'textarea'" :label="item.controlName"
								label-width="110px">
								<el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form[item.controlCode]"
									style="width: 75%">
								</el-input>
							</el-form-item>

							<el-form-item v-if="item.controlType === 'checkbox'" :label="item.controlName">
								<el-checkbox-group v-model="form[item.controlCode]">
									<el-checkbox v-for="checkboxItem in item.controlOptionValueList"
										:key="checkboxItem.value" :label="checkboxItem.lable" :value="checkboxItem.lable">
										{{ checkboxItem.lable }}
									</el-checkbox>
								</el-checkbox-group>
							</el-form-item>
						</div>
					</div>
				</el-form>
			</template>
			<div slot="footer" style="text-align: center">
				<el-button type="primary" @click="Cardpreservation()">保存</el-button>
				<!-- :disabled="disabled" -->
				<el-button type="default" @click="cancelHouseDialog()">取消</el-button>
			</div>
		</el-dialog>

		<!-- 编辑卡片弹窗 -->
		<el-dialog :visible.sync="Editcard" width="70%" :close-on-click-modal="false" @close="Cancelcard('editHouseInfo')"
			class="house_dialog_wrap">
			<template v-loading="loading">
				<el-form v-model="Cardmodify" ref="Cardmodify" :rules="rules" :model="form">
					<div class="el_dialog_top">
						<el-form-item style="margin-left: 35%">
							<p class="title" style="display: inline-block; font-weight: 900; font-size: 24px">
								卡片类型：
							</p>
							<el-select v-model="Cardmodify.templateName" placeholder="请选择" disabled>
								<el-option v-for="item in editHouseInfo" :key="item.templateId" :label="item.templateName"
									:value="item.templateId" @click.native="editCommunit(item)">
								</el-option>
							</el-select>
							<!-- <el-cascader
                v-model="Cardmodify.templateName"
                :options="editHouseInfo"
                @change="editCommunit"
              >
             disabled
																              </el-cascader> -->
						</el-form-item>

						<div v-for="(item, index) in Cardmodify.peopleCardInfo" :key="index" class="card">
							<el-form-item v-if="item.controlType === 'input'" :label="item.controlName" prop="name"
								:key="index" label-width="110px">
								<el-input clearable placeholder="请输入" v-model="formcard[item.controlCode]"
									style="width: 75%" :key="index" />
							</el-form-item>

							<el-form-item v-if="item.controlType === 'select'" :label="item.controlName"
								label-width="110px">
								<el-select placeholder="请选择" v-model="formcard[item.controlCode]" style="width: 75%">
									<el-option v-for="selectItem in item.controlOptionValueList" :key="selectItem.value"
										:label="selectItem.lable" :value="selectItem.lable">
									</el-option>
								</el-select>
							</el-form-item>

							<el-form-item v-if="item.controlType === 'radio'" :label="item.controlName" label-width="110px">
								<el-radio-group v-model="formcard[item.controlCode]" style="width: 75%">
									<el-radio v-for="radioItem in item.controlOptionValueList" :key="radioItem.value"
										:label="radioItem.lable" :value="radioItem.lable">
										{{ radioItem.lable }}
									</el-radio>
								</el-radio-group>
							</el-form-item>

							<el-form-item v-if="item.controlType === 'date'" :label="item.controlName" label-width="110px">
								<el-date-picker v-model="formcard[item.controlCode]" type="date" value-format="yyyy-MM-dd"
									placeholder="选择日期" style="width: 75%">
								</el-date-picker>
							</el-form-item>

							<el-form-item v-if="item.controlType === 'textarea'" :label="item.controlName"
								label-width="110px">
								<el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="formcard[item.controlCode]"
									style="width: 75%">
								</el-input>
							</el-form-item>

							<el-form-item v-if="item.controlType === 'checkbox'" :label="item.controlName">
								<el-checkbox-group v-model="formcard[item.controlCode]">
									<el-checkbox v-for="checkboxItem in item.controlOptionValueList"
										:key="checkboxItem.value" :label="checkboxItem.lable" :value="checkboxItem.lable">
										{{ checkboxItem.lable }}
									</el-checkbox>
								</el-checkbox-group>
							</el-form-item>
						</div>
					</div>
				</el-form>
			</template>
			<div slot="footer" style="text-align: center">
				<el-button type="primary" @click="Savecard('Cardmodify')">保存</el-button>
				<el-button type="default" @click="Cancelcard()">取消</el-button>
			</div>
		</el-dialog>

		<!-- 查看卡片弹窗 -->
		<el-dialog :visible.sync="Browsecard" width="70%" :close-on-click-modal="false" @close="Cancelcard('editHouseInfo')"
			class="house_dialog_wrap">
			<template v-loading="loading">
				<el-form v-model="displayList" ref="displayList" :rules="rules" :model="form">
					<div class="el_dialog_top">
						<el-form-item style="margin-left: 35%">
							<p class="title" style="display: inline-block; font-weight: 900; font-size: 24px">
								卡片类型：
							</p>
							<el-select v-model="displayList.templateName" placeholder="请选择" disabled>
								<el-option v-for="item in editHouseInfo" :key="item.templateId" :label="item.templateName"
									:value="item.templateId" @click.native="editCommunit(item)">
								</el-option>
							</el-select>
							<!-- <el-cascader
                v-model="displayList.templateName"
                :options="editHouseInfo"
                @change="editCommunit"
                disabled
              >
																              </el-cascader> -->
						</el-form-item>

						<div v-for="(item, index) in displayList.peopleCardInfo" :key="index" class="card">
							<el-form-item v-if="item.controlType === 'input'" :label="item.controlName" prop="name"
								:key="index" label-width="110px">
								<el-input clearable placeholder="请输入" v-model="formdisplay[item.controlCode]"
									style="width: 75%" :key="index" />
							</el-form-item>

							<el-form-item v-if="item.controlType === 'select'" :label="item.controlName"
								label-width="110px">
								<el-select placeholder="请选择" v-model="formdisplay[item.controlCode]" style="width: 75%">
									<el-option v-for="selectItem in item.controlOptionValueList" :key="selectItem.value"
										:label="selectItem.lable" :value="selectItem.lable">
									</el-option>
								</el-select>
							</el-form-item>

							<el-form-item v-if="item.controlType === 'radio'" :label="item.controlName" label-width="110px">
								<el-radio-group v-model="formdisplay[item.controlCode]" style="width: 75%">
									<el-radio v-for="radioItem in item.controlOptionValueList" :key="radioItem.value"
										:label="radioItem.lable" :value="radioItem.lable">
										{{ radioItem.lable }}
									</el-radio>
								</el-radio-group>
							</el-form-item>

							<el-form-item v-if="item.controlType === 'date'" :label="item.controlName" label-width="110px">
								<el-date-picker v-model="formdisplay[item.controlCode]" type="date"
									value-format="yyyy-MM-dd" placeholder="选择日期" style="width: 75%">
								</el-date-picker>
							</el-form-item>

							<el-form-item v-if="item.controlType === 'textarea'" :label="item.controlName"
								label-width="110px">
								<el-input type="textarea" :rows="2" placeholder="请输入内容"
									v-model="formdisplay[item.controlCode]" style="width: 75%">
								</el-input>
							</el-form-item>

							<el-form-item v-if="item.controlType === 'checkbox'" :label="item.controlName">
								<el-checkbox-group v-model="formdisplay[item.controlCode]">
									<el-checkbox v-for="checkboxItem in item.controlOptionValueList"
										:key="checkboxItem.value" :label="checkboxItem.lable" :value="checkboxItem.lable">
										{{ checkboxItem.lable }}
									</el-checkbox>
								</el-checkbox-group>
							</el-form-item>
						</div>
					</div>
				</el-form>
			</template>
		</el-dialog>
	</div>
</template>

<script>
import {
	getPeople,
	getHouseList,
	getPeopleStatus,
	updatePeople,
	getPeopleRelationship,
	allInfo,
	cardTree,
	getCardByTemplateId,
	saveCardData,
	selectCardData,
	deleteCardByDataId,
	returnCardDataById,
	updateCardData,
} from "@/api/area/population";
import { partyTreeLimit, partyPost } from "@/api/area/partymember";
export default {
	name: "populationDetails",
	dicts: [
		"party_status",
		"people_type",
		"certificate_type",
		"is_party_status",
		"people_category",
		"healthy_status",
		"military_status",
		"social_security_status",
		"qualification",
		"retire_type",
		"house_property",
		"house_property_right",
		"sys_user_sex",
		"nation",
		"marital_status",
		"registered_type",
		"occupational_category",
		"flow_reason",
		"stay_certtype",
		"outer_reason",
		"floathouse_type",
		"visa_type",
		"nationality",
		"political_status"
	],
	data() {
		return {
			value: "",
			peopleData: {
				baPartyMember: {
					partyName: "",
					partyOccupation: "",
					partyMemberStatus: ""
				}
			}, //人员详情数据
			houseList: [], //房屋数据
			statusOptions: [], //人口类型状态
			partyTreeData: [], //党组织数据
			partyTreeProps: {
				label: "label",
				value: "id",
				children: "children",
			},
			postOptions: [], //党员职务数据
			headPortrait: "", //人员头像
			fit: "contain", // img图片填充方式
			dialogEdit: false, //编辑弹窗
			editForm: {
				//编辑表单参数
				baPartyMember: {
					partyBranch: "", //党员信息数据
					partyOccupatio: "",
					partyMemberStatus: "",
					applyJoinpartyTime: "",
					officiaJoinpartyTime: "",
					source: "",
					dismissalTime: "",
					transferOutTime: "",
					honor: "",
					remark: "",
				},
			},
			activeName: ["1"], //折叠板默认展开
			activeNames: ["1"], //折叠板默认展开
			houseDialogEdit: false, // 添加卡片遮罩层
			Editcard: false, //编辑卡片遮罩层
			Browsecard: false, //查看卡片遮罩层
			editHouseInfo: [], // 添加卡片表单信息集合
			allUnitAndStorey: [], // 卡片类型集合
			relationshipData: [], //人口关系集合
			Cardpulldown: [], //选中后卡片数据
			CardList: [], //人员卡片信息合集
			Cardmodify: {}, //编辑卡片数据
			displayList: {}, //查看卡片数据
			total: "", //人口卡片数量
			peopleCardOptions: [], //人口卡片数据
			screenCardDialog: false, //卡片筛选弹窗
			checkbox: "", //多选
			input: "", //输入框
			radio: "", //单选
			select: "", //下拉
			date: "", //时间
			textarea: "", //文本

			// 表单校验
			rules: {
			},
			data: "",
			disabled: false,
			activities: [{
				content: "超级管理员添加了人口：李清洋",
				timestamp: "2022-05-11   12:04",
				color: "#fff",
			},
			{
				content: "超级管理员添加了人口：李清洋",
				timestamp: "2022-05-11   12:04",
				color: "#fff",
			},
			],
			form: {}, //测试添加动态表单数据
			formcard: {}, //编辑的动态表单数据
			formdisplay: {}, //查看卡片表单数据
			templateCode: null,
			floorActive: "index", // 添加保存按钮选中值
			itemID: null,
		};
	},
	mounted() {
		this.getList();
	},
	methods: {
		handleAvatarSuccess(res, file) {
			this.editForm.headPortrait = URL.createObjectURL(file.raw);
		},
		beforeAvatarUpload(file) {
			const isJPG = file.type === 'image/jpeg';
			const isLt2M = file.size / 1024 / 1024 < 2;

			if (!isJPG) {
				this.$message.error('上传头像图片只能是 JPG 格式!');
			}
			if (!isLt2M) {
				this.$message.error('上传头像图片大小不能超过 2MB!');
			}
			return isJPG && isLt2M;
		},
		//党组织树
		getPartyTree() {
			let param = {
				userId: localStorage.getItem("userId"),
			};
			partyTreeLimit(param).then((res) => {
				this.partyTreeData = res.data;
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
		//获取页面数据
		getList() {
			this.loading = true;
			let id = this.$route.query.id;
			getPeople(id).then((res) => {
				if (res.code === 200) {
					this.peopleData = res.data;
					this.peopleData.age = parseInt(res.data.age);
					if (
						this.peopleData.headPortrait !== "" &&
						this.peopleData.headPortrait !== null
					) {
						this.headPortrait =
							process.env.VUE_APP_BASE_API + this.peopleData.headPortrait;
					} else {
						this.headPortrait = "";
					}
					let param = {
						certificateId: this.peopleData.certificateId,
					};
					// 调用查找人员卡片接口
					this.Findpeople();
					this.getHouse(param);
				}
			});
		},

		//获取房屋
		getHouse(value) {
			getHouseList(value).then((res) => {
				this.houseList = res.data;
				console.log(this.houseList);
				this.relationship();
			});
		},

		//获取人员关系数据
		relationship(value) {
			console.log(this.houseList[0].id);
			if (value === "" || value === null || value === undefined) {
				let param = {
					name: this.peopleData.name,
					idcardNo: this.peopleData.certificateId,
					houseId: this.houseList[0].id,
				};
				getPeopleRelationship(param).then((res) => {
					this.relationshipData = res.data;
					this.init();
				});
			} else {
				let param = {
					name: this.peopleData.name,
					idcardNo: this.peopleData.certificateId,
					houseId: value,
				};
				getPeopleRelationship(param).then((res) => {
					this.relationshipData = res.data;
					this.init();
				});
			}
		},

		//人员关系图表
		init() {
			// 已全局引入echarts属性
			var myGraph = this.$echarts.init(this.$refs.graph);
			// 指定图表的配置项和数据
			var optionOne = {
				series: [{
					type: "graph", //图表类型为关系图
					layout: "force", //图布局类型为力导图
					force: {
						//力引导图基本配置
						repulsion: 100, //节点之间的斥力因子。支持数组表达斥力范围，值越大斥力越大。
						gravity: 0.02, //节点受到的向中心的引力因子。该值越大节点越往中心点靠拢。
						edgeLength: 108, //边的两个节点之间的距离，这个距离也会受 repulsion。[10, 50] 。值越小则长度越长
						layoutAnimation: false,
						//因为力引导布局会在多次迭代后才会稳定，这个参数决定是否显示布局的迭代动画，在浏览器端节点数据较多（>100）的时候不建议关闭，布局过程会造成浏览器假死。
					},
					symbolSize: 46, //节点大小
					label: {
						//节点内的名称展示
						show: true,
					},
					edgeSymbol: ["circle", "arrow"], //边两端的标记类型（箭头）
					edgeSymbolSize: [0, 10], //边两端的标记大小
					itemStyle: {
						//节点样式
						color: "#1F79F3",
					},
					lineStyle: {
						//连接线样式
						width: 1.5,
						color: "#1F79F3",
					},
					data: this.relationshipData.data,
					links: this.relationshipData.links,
				},],
			};
			// 使用刚指定的配置项和数据显示图表。
			myGraph.setOption(optionOne);
		},

		// 编辑弹窗打开
		handleEdit() {
      this.getPartyTree(); //党组织树
      this.getPartyPost(); //党员职务
			this.dialogEdit = true;
			let areaId = this.$route.query.id;
			getPeople(areaId).then((res) => {
				if (res.code === 200) {
					this.editForm = res.data;
          console.log(this.editForm)
					if (
						this.editForm.headPortrait !== "" &&
						this.editForm.headPortrait !== null
					) {
						this.editForm.headPortrait =
							process.env.VUE_APP_BASE_API + this.editForm.headPortrait;
					} else {
						this.editForm.headPortrait = "";
					}
					//判断人员类型不为境外人口时将其数据置空
					if (this.editForm.typeCode !== "境外人口") {
						this.editForm.foreignName = "";
						this.editForm.foreignSurname = "";
						this.editForm.certValidity = [];
						this.editForm.entryTime = "";
						this.editForm.visaType = "";
						this.editForm.expectLeavetime = "";
						this.editForm.tochinaPurpose = "";
					}
					//判断人员类型状态不为空挂人口时将其数据置空
					if (this.editForm.extendTypeName !== "空挂人口") {
						this.editForm.settleTime = "";
						this.editForm.settleAddress = "";
						this.editForm.emptyhangReason = "";
					}
					//判断人员类型状态不为外出人口时将其数据置空
					if (this.editForm.extendTypeName !== "外出人口") {
						this.editForm.outReason = "";
						this.editForm.outTime = "";
						this.editForm.outWhereabout = "";
						this.editForm.outAddress = "";
					}
					//判断人员类型状态不为流动人口时将其数据置空
					if (this.editForm.extendTypeName !== "流动人口") {
						this.editForm.floatingReason = "";
						this.editForm.stayCerttype = "";
						this.editForm.statCertid = "";
						this.editForm.registerDate = "";
						this.editForm.certificateExpiration = "";
						this.editForm.floathouseType = "";
						this.editForm.expectTime = [];
					}
				}
				this.getStatus(this.editForm.typeCode);
			});
			
		},

		//根据人口类型获取人口类型状态
		getStatus(data) {
			let param = {
				typeCode: data,
			};
			if (!data) {
				// 清空人口类型状态
				this.editForm = {
					...this.editForm,
					extendTypeName: '',
				}
				this.statusOptions = []
				return
			}
			getPeopleStatus(param).then((res) => {
				if (res.code === 200) {
					this.statusOptions = res.data;
				}
			});
		},

		//编辑的提交按钮
		submitForm(editForm) {
			if (this.editForm.politicalStatus == "中国共产党") {
				if (!this.editForm.baPartyMember.partyBranch) {
					this.$message.error("请选择所属党支部");
					return false;
				}
				if (!this.editForm.baPartyMember.partyOccupation) {
					this.$message.error("请选择党内所属职位");
					return false;
				}
			}
			this.$refs[editForm].validate((valid) => {
				if (valid) {
					if (!this.editForm.headPortrait) {
						this.editForm.headPortrait = ''
					} else {
						this.editForm.headPortrait = this.editForm.headPortrait.replace(process.env.VUE_APP_BASE_API, '')
					}
					updatePeople(this.editForm)
						.then(() => {
							this.getList();
							this.dialogEdit = false;
						})
						.catch(() => { });
				}
			});
		},

		//编辑弹窗关闭
		dictEditVisible(editForm) {
			this.$refs[editForm].resetFields();
			this.dialogEdit = false;
		},

		//点击添加卡片，并获取实有人口-添加卡片卡片类型数据
		newlyincreased() {
			this.houseDialogEdit = true;
			// allInfo().then((res) => {
			cardTree().then((res) => {
				if (res.code === 200) {
					this.editHouseInfo = res.data;
					console.log(this.editHouseInfo);
				}
			});
		},
		// 取消添加卡片
		cancelHouseDialog() {
			this.houseDialogEdit = false;
			this.Cardpulldown = [];
		},

		//保存添加卡片
		Cardpreservation() {
			var param = {
				idcardNo: this.peopleData.certificateId,
				templateCode: this.templateCode,
				dataContent: this.form,
				templateId: this.itemID,
			};
			console.log(this.templateId);
			saveCardData(param).then((res) => {
				this.$message.success("添加成功");
				this.form = {};
				this.houseDialogEdit = false;
				this.getList();
			});
		},

		// 添加卡片下拉选择
		editCommunit(item) {
			this.disabled = false;

			// this.templateCode = item[1].templateCode;
			// console.log(item[1].templateCode);
			this.itemID = item[1];
			console.log(this.itemID);
			let params = {
				// templateId: item.templateId, // 卡片类型
				templateId: item[1],
				idcardNo: this.peopleData.certificateId,
				flag: 0,
			};
			getCardByTemplateId(params).then((res) => {
				console.log(params);

				if (res.code === 200) {
					this.Cardpulldown = res.data;
					// 请求后赋值【此时已经请求到了后端返回的数据Cardpulldown】
					// 动态往表单中添加对应属性及数据
					this.form = {};
					for (let i = 0; i < this.Cardpulldown.length; i++) {
						//【row[xxx] || "表示：从表格中拿到值用来回显，若没有值则赋新的空值】
						let value = "";
						// 创建表单项，用于绑定数据
						this.$set(this.form, this.Cardpulldown[i].controlCode, value);
					}
				} else if (res.code === 201) {
					console.log(res);
					this.disabled = true;
					this.$message.error("该用户已添加过此人员卡片，请勿重复添加");
				}
			});
		},

		// 查找人员卡片
		Findpeople() {
			let params = {
				idcardNo: this.peopleData.certificateId, // 身份证号
			};
			selectCardData(params).then((res) => {
				if (res.code === 200) {
					console.log(res.data);
					this.CardList = res.data;
					//人口卡片数量
					this.total = this.CardList.length;
				}
			});
		},

		// 卡片 - 删除按钮
		handleDelete(item, index) {
			let params = {
				dataId: item.dataId,
			};
			this.$modal
				.confirm('是否确认删除卡片为"' + item.templateName + '"的数据项？')
				.then(() => {
					console.log(params, "11");
					deleteCardByDataId(params).then((res) => {
						if (res.code === 200) {
							this.getList();
							this.$modal.msgSuccess("删除成功");
						}
					});
				})
				.catch(() => { });
		},

		// 取消卡片编辑
		Cancelcard() {
			this.Editcard = false;
		},

		//编辑保存卡片
		Savecard() {
			var param = {
				dataContent: this.formcard,
				dataId: this.Cardmodify.dataId,
			};
			console.log(param);
			updateCardData(param).then((res) => {
				this.$message.success("修改成功");
				this.formcard = {};
				this.Editcard = false;
			});
			this.getList();
		},

		// 卡片-编辑按钮
		handleCard(item, index) {
			console.log(item);
			this.Editcard = true;
			let params = {
				dataId: item.dataId,
			};
			returnCardDataById(params).then((res) => {
				if (res.code === 200) {
					this.Cardmodify = res.data;
					console.log(this.Cardmodify);
					this.peopleCardInfo = this.Cardmodify.peopleCardInfo;
					console.log(this.peopleCardInfo);
					// 请求后赋值【此时已经请求到了后端返回的数据Cardpulldown】
					// 动态往表单中添加对应属性及数据
					this.formcard = {};
					for (let i = 0; i < this.peopleCardInfo.length; i++) {
						//【row[xxx] || "表示：从表格中拿到值用来回显，若没有值则赋新的空值】
						// let  value = "";
						let value = this.peopleCardInfo[i].controlValue || "";
						// 创建表单项，用于绑定数据
						this.$set(this.formcard, this.peopleCardInfo[i].controlCode, value);
					}
				}
			});
		},

		// 卡片-查看按钮
		browse(item, index) {
			this.Browsecard = true;
			let params = {
				dataId: item.dataId,
			};
			returnCardDataById(params).then((res) => {
				if (res.code === 200) {
					this.displayList = res.data;
					this.peopleCardInfo = this.displayList.peopleCardInfo;
					// 请求后赋值【此时已经请求到了后端返回的数据Cardpulldown】
					// 动态往表单中添加对应属性及数据
					this.formdisplay = {};
					for (let i = 0; i < this.peopleCardInfo.length; i++) {
						//【row[xxx] || "表示：从表格中拿到值用来回显，若没有值则赋新的空值】
						// let  value = "";
						let value = this.peopleCardInfo[i].controlValue || "";
						// 创建表单项，用于绑定数据
						this.$set(
							this.formdisplay,
							this.peopleCardInfo[i].controlCode,
							value
						);
					}
				}
			});
		},
	},
};
</script>
<style type="text/css">
.img_up {
	width: 200px;
	height: 300px;
}

.img_up div,
.el-upload-list--picture-card .el-upload-list__item {
	width: 200px;
	height: 300px;
}

.el-upload-list--picture-card .el-upload-list__item-thumbnail {
	width: 200px;
	height: 300px;
}

.el-upload--picture-card {
	line-height: 300px;
}
</style>
<style scoped>
.avatar-uploader .el-upload {
	border: 1px dashed #d9d9d9;
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
}

.avatar-uploader .el-upload:hover {
	border-color: #409EFF;
}

.avatar-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	width: 200px;
	height: 300px;
	line-height: 300px;
	text-align: center;
}

.avatar {
	width: 200px;
	height: 300px;
	display: block;
}

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
	box-shadow: 12px 0 12px -12px rgba(0, 0, 0, 0.1);
}

/*左侧上面盒子*/

.information-top {
	height: 130px;
}

/*图片*/

.image {
	width: 34%;
	height: 100%;
	display: inline-block;
	overflow: hidden;
	vertical-align: top;
}

.image .img {
	width: 100%;
	height: 80%;
}

/*文字*/

.text {
	display: inline-block;
	overflow: hidden;
	vertical-align: top;
	padding-left: 20px;
	width: 66%;
	box-sizing: border-box;
}

/*姓名*/

.name {
	display: inline-block;
	font-size: 18px;
	font-weight: bold;
	color: #1f79f3;
}

/*年龄*/

.age {
	width: 50px;
	height: 28px;
	line-height: 28px;
	text-align: center;
	background: #7bbaff;
}

/*左侧下面盒子*/

.information-bottom {
	font-size: 14px;
}

.information-bottom p {
	margin-bottom: 0;
}

.tag {
	display: inline-block;
}

/deep/ .extend .el-collapse-item__header {
	color: #000;
	font-size: 16px;
}

/*中间*/

.center-box {
	width: 60%;
}

/*中间内容盒子公共样式*/

.content {
	border-radius: 10px;
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
	padding: 15px;
}

/*标题和icon*/

.alignment {
	display: inline-block;
	vertical-align: middle;
}

/*icon样式*/

.content i {
	font-size: 28px;
	margin-right: 4px;
	color: #1f79f3;
}

/* 卡片样式 */

.el-card {
	border-radius: 4px;
	width: 24%;
	margin: 0.5% 0.5%;
	display: inline-block;
	cursor: pointer;
	height: 131px !important;
}

/*卡片标题*/

.card-title {
	padding: 0 10px;
	height: 30px;
	line-height: 30px;
	text-align: center;
	background: #1f79f3;
	position: relative;
	top: 0;
	left: 0;
	display: inline-block;
}

/* 卡片内容字体样式 */

.card-font {
	width: 100%;
	margin: 6px 0;
	font-size: 12px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

/* 卡片操作按钮样式 */

.el-button--text {
	color: #999;
	padding: 8px 0;
}

/*房屋*/

.house {
	width: 50%;
	display: inline-block;
	padding: 0 30px;
	cursor: pointer;
}

.house:hover {
	background: #ebf7ff !important;
}

/*房屋 p 标签*/

.house p {
	font-size: 14px;
	color: #666;
}

/*房屋标题*/

.houseTitle {
	width: 70px;
	height: 30px;
	line-height: 28px;
	text-align: center;
	background: #7bbaff;
}

/*右侧*/

.right-box {
	width: 20%;
	border-radius: 10px;
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

/*右侧标题样式*/

.fontColor {
	margin: 0;
	padding: 0;
	font-weight: bold;
}

/*政治面貌 p 标签*/

.politics p {
	font-size: 14px;
	color: #666;
}

/*涉及事件*/

.event {
	margin: 25px 0;
	padding: 20px 0;
	border-top: 1px solid #ccc;
	border-bottom: 1px solid #ccc;
}

/*时间线小圆点*/

/deep/ .el-timeline-item__node {
	border: 1px solid #1f79f3;
}

/*编辑弹窗*/
/*公共样式*/

.editDialog {
	display: inline-block;
	padding: 0 20px;
	overflow: hidden;
	vertical-align: top;
	color: #000;
}

/*房屋信息样式*/

.building {
	width: 94%;
	margin: 0 auto;
	background: #eee;
	padding: 5px;
}

.number {
	width: 20px;
	height: 20px;
	text-align: center;
	line-height: 20px;
	display: inline-block;
	vertical-align: top;
}

.number p {
	color: #fff;
	background: #999;
}

.address {
	width: 80%;
	margin-left: 10px;
	vertical-align: top;
	display: inline-block;
}

/*日期选择框样式*/

.el-date-editor.el-input {
	width: 100%;
}

/*左侧样式*/

.editLeft {
	width: 18%;
}

/*右侧样式*/

.editRight {
	width: 82%;
}

/*右边盒子公共样式*/

.rightBox {
	border: 1px solid #ccc;
	padding: 20px;
	margin-bottom: 20px;
}

.boxTitle {
	font-size: 14px;
	font-weight: bold;
}

/* 编辑输入框样式 */

.input-width {
	width: 31%;
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

.informationCard {
	width: 100%;
	border: 1px solid #ccc;
	border-radius: 10px;
	padding: 20px;
}

.informationWidth {
	width: 50%;
	display: inline-block;
}

/* 卡片样式 */

.card {
	width: 33%;
	display: inline-block;
}

.cardTypeFont {
	color: #fff;
	font-size: 14px;
	margin: 0;
	padding: 0;
	font-weight: bold;
}

.addto {
	text-align: center;
	font-size: 30px;
	color: #1f79f3;
}

/* 人口卡片滚动样式 */

.ka {
	overflow-x: hidden;
	overflow-y: auto;
	height: 90px;
}

/* 滚动条整体样式 */

.ka::-webkit-scrollbar {
	width: 2px;
	height: 2px;
}

.ka::-webkit-scrollbar-thumb {
	border-radius: 2px;
	-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
	background: rgba(0, 0, 0, 0.2);
}

.ka::-webkit-scrollbar-track {
	-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
	border-radius: 0;
	background: rgba(0, 0, 0, 0.1);
}
</style>
