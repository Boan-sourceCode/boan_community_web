<!-- 小区管理 -->
<template>
	<div class="app-container">
		<h1 class="title-font">小区管理列表</h1>
		<el-form :model="queryParams" ref="queryForm" size="small" :inline="true" label-width="82px">
			<el-form-item label="关键字：" prop="communityName">
				<el-input clearable v-model="queryParams.communityName" placeholder="小区名称" />
			</el-form-item>
			<el-form-item>
				<el-button plain @click="handleQuery">查询</el-button>
			</el-form-item>
			<el-form-item style="float: right">
				<el-button v-hasPermi="['system:village:add']" @click="handleAdd">添加小区</el-button>
			</el-form-item>
		</el-form>
		<el-table :loading="loading" :data="villageList" :header-cell-style="{background:'#EBF7FF'}" stripe border>
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-form label-position="left" inline class="demo-table-expand">
             <!-- 类型1 -->
              <h4 style="text-align: center;font-weight: bold;">社会力量</h4>
             <el-table
              :data="scope.row.baSocial1"
              border
              style="width: 98%; margin-top: 20px;margin: auto;">
              <!-- <el-table-column
                prop="socialUnitType"
                label="类型"
                width="180">
              </el-table-column> -->
              <el-table-column
                prop="socialUnitName"
                label="名称">
              </el-table-column>
              <el-table-column
                prop="socialUnitHeader"
                label="负责人">
              </el-table-column>
              <el-table-column
                prop="socialUnitAddr"
                label="地址">
              </el-table-column>
              <el-table-column
                prop="socialUnitPhone"
                label="电话">
              </el-table-column>
              <el-table-column
                prop="socialUnitGis"
                label="标注">
              </el-table-column>
              <el-table-column label="操作" align="center">
              	<template slot-scope="scope">
              		<el-button type="primary" plain size="small" @click="handleEditnew(scope.row)">编辑</el-button>
              		<el-button type="danger" plain size="small" @click="handdeletenew(scope.row)">删除</el-button>
              	</template>
              </el-table-column>
            </el-table>
            <!-- 类型2 -->
            <h4 style="text-align: center;font-weight: bold;">驻地单位</h4>
            <el-table
              :data="scope.row.baSocial2"
              border
              style="width: 98%; margin-top: 20px;margin: auto;">
              <!-- <el-table-column
                prop="socialUnitType"
                label="类型"
                width="180">
              </el-table-column> -->
              <el-table-column
                prop="socialUnitName"
                label="名称">
              </el-table-column>
              <el-table-column
                prop="socialUnitHeader"
                label="负责人">
              </el-table-column>
              <el-table-column
                prop="socialUnitAddr"
                label="地址">
              </el-table-column>
              <el-table-column
                prop="socialUnitPhone"
                label="电话">
              </el-table-column>
              <el-table-column
                prop="socialUnitGis"
                label="标注">
              </el-table-column>
              <el-table-column label="操作" align="center">
              	<template slot-scope="scope">
              		<el-button type="primary" plain size="small" @click="handleEditnew(scope.row)">编辑</el-button>
              		<el-button type="danger" plain size="small" @click="handdeletenew(scope.row)">删除</el-button>
              	</template>
              </el-table-column>
            </el-table>
          </el-form>
        </template>
      </el-table-column>
			<el-table-column label="序号" align="center" width="60">
				<template slot-scope="scope">
					{{ (scope.$index+1)+(queryParams.pageNum-1)*queryParams.pageSize}}
				</template>
			</el-table-column>
			<el-table-column label="所属网格" align="center" prop="areaName">
				<template slot-scope="scope">
					<p v-if="scope.row.baGridArea === '' || scope.row.baGridArea === null || scope.row.baGridArea === undefined">顶级网格</p>
					<p v-else>{{scope.row.baGridArea.areaName}}</p>
				</template>
			</el-table-column>
			<el-table-column label="小区名称" align="center" prop="communityName">
				<template slot-scope="scope">
					<p v-if="scope.row.communityName === '' || scope.row.communityName === null">/</p>
					<p v-else>{{scope.row.communityName}}</p>
				</template>
			</el-table-column>
			<el-table-column label="物业公司名称" align="center" prop="propertyName">
				<template slot-scope="scope">
					<p v-if="scope.row.baEnterprise.enterName === '' || scope.row.baEnterprise.enterName === null">/</p>
					<p v-else>{{scope.row.baEnterprise.enterName}}</p>
				</template>
			</el-table-column>
			<el-table-column label="物业公司负责人" align="center" prop="chargePeople">
				<template slot-scope="scope">
					<p v-if="scope.row.baEnterprise.legalRepresentName === '' || scope.row.baEnterprise.legalRepresentName === null">/</p>
					<p v-else>{{scope.row.baEnterprise.legalRepresentName}}</p>
				</template>
			</el-table-column>
			<el-table-column label="物业公司联系方式" align="center" prop="propertyTelephone">
				<template slot-scope="scope">
					<p v-if="scope.row.baEnterprise.legalRepresentPhone === '' || scope.row.baEnterprise.legalRepresentPhone === null">/</p>
					<p v-else>{{scope.row.baEnterprise.legalRepresentPhone}}</p>
				</template>
			</el-table-column>
			<el-table-column label="操作" align="center" style="width: 200px">
				<template slot-scope="scope">
					<el-button type="primary" plain size="small" v-hasPermi="['system:village:edit']" @click="handleEdit(scope.row)">编辑</el-button>
					<el-button type="danger" plain size="small" v-hasPermi="['system:village:del']" @click="handleDelete(scope.row)">删除</el-button>
          <el-button type="primary" plain size="small" @click="handleAddnew(scope.row.id)">添加</el-button>
				</template>
			</el-table-column>
		</el-table>
		<p>共查询/检索{{this.total}}条信息</p>

    <!-- 添加类型弹框 -->
    <el-dialog :visible.sync="addnewDialog" title="添加社会单位" width="25%" :close-on-click-modal="false"  @close="closedialog">
    	<template>
    		<el-form ref="addForms2" :model="addForms2" label-width="138px" :rules="rules2">
    			<el-form-item label="选择类型：">
    				<el-select v-model="addForms2.socialUnitType" clearable placeholder="请选择">
    					<el-option v-for="item in lxoptions" :key="item.value" :label="item.label" :value="item.label">
    					</el-option>
    				</el-select>
    			</el-form-item>
          <el-form-item label="名称：" prop="socialUnitName">
          	<el-input clearable v-model="addForms2.socialUnitName"  placeholder="请输入名称" class="inputWidth" />
          </el-form-item>
          <el-form-item label="负责人：" prop="socialUnitHeader">
          	<el-input clearable v-model="addForms2.socialUnitHeader" placeholder="请输入负责人姓名" class="inputWidth" />
          </el-form-item>
    			<el-form-item label="地址："  prop="socialUnitAddr">
    				<el-input clearable v-model="addForms2.socialUnitAddr" placeholder="请输入地址" class="inputWidth" />
    			</el-form-item>
    			<el-form-item label="电话：" prop="socialUnitPhone">
    				<el-input clearable v-model="addForms2.socialUnitPhone" placeholder="请输入电话" class="inputWidth" />
    			</el-form-item>
          <el-form-item label="标注：" prop="socialUnitGis">
            <el-select v-model="addForms2.socialUnitGis" clearable placeholder="请选择">
            	<el-option v-for="item in biaozhuoptions" :key="item.value" :label="item.label" :value="item.label">
            	</el-option>
            </el-select>
          </el-form-item>
    		</el-form>
    	</template>
    	<div slot="footer" style="text-align: center">
    		<el-button type="primary" @click="lxsubmit">保存</el-button>
    		<el-button type="default" @click="closedialog">取消</el-button>
    	</div>
    </el-dialog>
    <!-- 编辑类型弹框 -->
    <el-dialog :visible.sync="editnewDialog" title="编辑社会单位" width="25%" :close-on-click-modal="false" >
    	<template>
    		<el-form ref="addForms2" :model="addForms2" label-width="138px" :rules="rules2">
    			<el-form-item label="选择类型：">
    				<el-select v-model="addForms2.socialUnitType" clearable placeholder="请选择">
    					<el-option v-for="item in lxoptions" :key="item.value" :label="item.label" :value="item.label">
    					</el-option>
    				</el-select>
    			</el-form-item>
          <el-form-item label="名称：" prop="socialUnitName">
          	<el-input clearable v-model="addForms2.socialUnitName"  placeholder="请输入名称" class="inputWidth" />
          </el-form-item>
          <el-form-item label="负责人：" prop="socialUnitHeader">
          	<el-input clearable v-model="addForms2.socialUnitHeader" placeholder="请输入负责人姓名" class="inputWidth" />
          </el-form-item>
    			<el-form-item label="地址："  prop="socialUnitAddr">
    				<el-input clearable v-model="addForms2.socialUnitAddr" placeholder="请输入地址" class="inputWidth" />
    			</el-form-item>
    			<el-form-item label="电话：" prop="socialUnitPhone">
    				<el-input clearable v-model="addForms2.socialUnitPhone" placeholder="请输入电话" class="inputWidth" />
    			</el-form-item>
          <el-form-item label="标注：" prop="socialUnitGis">
            <el-select v-model="addForms2.socialUnitGis" clearable placeholder="请选择">
            	<el-option v-for="item in biaozhuoptions" :key="item.value" :label="item.label" :value="item.label">
            	</el-option>
            </el-select>
          </el-form-item>
    		</el-form>
    	</template>
    	<div slot="footer" style="text-align: center">
    		<el-button type="primary" @click="lxsubmit2">保存</el-button>
    		<el-button type="default" @click="editnewDialog = false">取消</el-button>
    	</div>
    </el-dialog>

		<!-- 添加小区弹窗 -->
		<el-dialog :visible.sync="addDialog" title="添加小区" width="25%" :close-on-click-modal="false" @close="dictAddVisible('addForms')">
			<template>
				<el-form ref="addForms" label-width="138px" :model="addForms" :rules="rules">
					<el-form-item label="所属网格：" prop="areaId">
						<!-- <treeSelect
              v-model="addForms.areaId"
              :props="treeProps"
              :options="treeData"

              placeholder="请选择">
            </treeSelect> -->
						<Treeselect v-model="addForms.areaId" :props="treeProps" :options="treeData" :value="value" placeholder="请选择" @click.native="getTree">
						</Treeselect>
					</el-form-item>
					<el-form-item label="小区名称：" prop="communityName">
						<el-input clearable v-model="addForms.communityName" placeholder="请输入" class="inputWidth" />
					</el-form-item>
					<el-form-item label="物业公司名称：" prop="propertyId">
						<el-select clearable v-model="addForms.propertyId" placeholder="请选择">
							<el-option v-for="item in propertyOptions" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-form>
			</template>
			<div slot="footer" style="text-align: center">
				<el-button type="primary" @click="submitAdd('addForms')">保存</el-button>
				<el-button type="default" @click="dictAddVisible('addForms')">取消</el-button>
			</div>
		</el-dialog>

		<!-- 编辑小区弹窗 -->
		<el-dialog :visible.sync="editDialog" title="编辑小区" width="25%" :close-on-click-modal="false" @close="dictEditVisible('editForm')">
			<template>{{addForms.propertyId}}
				<el-form ref="editForm" label-width="138px" :model="editForm" :rules="rules">
					<el-form-item label="所属网格：" prop="areaId">
						<treeSelect v-model="editForm.areaId" :props="treeProps" :options="treeData" placeholder="请选择">
						</treeSelect>
					</el-form-item>
					<el-form-item label="小区名称：" prop="communityName">
						<el-input clearable v-model="editForm.communityName" placeholder="请输入" class="inputWidth" />
					</el-form-item>
					<el-form-item label="物业公司名称：" prop="propertyId">
						<el-select clearable v-model="editForm.propertyId" placeholder="请选择">
							<el-option v-for="item in propertyOptions" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-form>
			</template>
			<div slot="footer" style="text-align: center">
				<el-button type="primary" @click="submitEdit('editForm')">保存</el-button>
				<el-button type="default" @click="dictEditVisible('editForm')">取消</el-button>
			</div>
		</el-dialog>

		<!-- 分页 -->
		<pagination :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize" @pagination="getList()" />
	</div>
</template>

<script>
	import { listVillage, listVillageLimit, addVillage, delVillage, getProperty, getVillage, updateVillage,addshcom,updateshcom,delshcom } from "@/api/area/village";
	import { treeList, areaTree } from "@/api/area/area";
	import Treeselect from "@riophae/vue-treeselect";
	import "@riophae/vue-treeselect/dist/vue-treeselect.css";
	export default {
		name: "village",
		dicts: ['sys_normal_disable'],
		components: {
			Treeselect
		},
		data() {
			return {

				value: "",
				id: '',
				loading: true, // 遮罩层
				villageList: [], // 小区表格数据
				addDialog: false, //添加小区弹窗
        addnewDialog: false, // 添加类型弹框
        editnewDialog: false, // 编辑类型弹框
				addForms: {
					areaId: null,
					communityName: '',
					propertyId: ''
				}, //添加小区参数
        addForms2: {
          communityId: 0,
          socialUnitName: '',
          socialUnitAddr: '',
          socialUnitPhone: '',
          socialUnitGis: '',
          socialUnitType: '',
          socialUnitHeader: ''
        },
				editDialog: false, //编辑小区弹窗
				editForm: {}, //编辑小区参数
				// 查询参数
				queryParams: {
					userId: localStorage.getItem("userId"),
					pageNum: 1,
					pageSize: 10,
				},
				total: 0, // 总条数
				treeData: [], //下拉框数据
				treeProps: {
					label: "label",
					value: "id",
					children: "children",
				},
				propertyOptions: [], //物业数据
        lxoptions: [
          {label: '驻地单位' ,value: 0},
          {label: '社会力量' ,value: 1},
        ],  // 类型数据
        biaozhuoptions: [
          {label: '已标注' ,value: 0},
          {label: '未标注' ,value: 1},
        ],
				// 表单校验
				rules: {
					areaId: [{
						required: true,
						message: '所属网格不能为空',
						trigger: 'blur'
					}],
					communityName: [{
						required: true,
						message: '小区名称不能为空',
						trigger: 'blur'
					}],
				},
        // 表单验证2
        rules2: {
          socialUnitType: [{
          	required: true,
          	message: '请选择类型',
          	trigger: 'blur'
          }],
          // socialUnitHeader: [{
          // 	required: true,
          // 	message: '请输入负责人',
          // 	trigger: 'blur'
          // }],
          // socialUnitPhone: [{
          // 	required: true,
          // 	message: '请填写电话',
          // 	trigger: 'blur'
          // }],
          socialUnitName: [{
          	required: true,
          	message: '请输入名称',
          	trigger: 'blur'
          }],

        }
			};
		},
		created() {
			this.getList();
			// this.getTree();
			this.getProperty();
		},
		methods: {
			/** 转换网格-网格管理数据结构 */
			normalizer(node) {
				if(node.children && !node.children.length) {
					delete node.children;
				}
				return {
					id: node.areaId,
					label: node.areaName,
					children: node.children
				};
			},
			// 查询树
			getTree() {
				let param = {
					userId: localStorage.getItem("userId"),
					flag: 0
				}
				// treeList().then(res => {
				areaTree(param).then(res => {
					this.treeData = res.data
				})
			},

			//获取页面数据
			getList() {
				this.loading = true;
				listVillageLimit(this.queryParams).then(res => {
          // 遍历rows  获取每列对应的社会力量和驻地单位条数
          res.rows.forEach((ele,index) => {
            var baSocial1 = []
            var baSocial2 = []
            res.rows[index].baSocialUnits.forEach((e,i) => {
              // console.log(e,i)
              if(e.socialUnitType == '社会力量') {
                baSocial1.push(e)
              } else if(e.socialUnitType == '驻地单位') {
                baSocial2.push(e)
              }
            })
            console.log(baSocial1,baSocial2)
            res.rows[index].baSocial1 = baSocial1
            res.rows[index].baSocial2 = baSocial2
          })
          console.log(res.rows)
					this.villageList = res.rows;
					this.total = res.total;
					this.loading = false;
				});
			},

			// 查询物业
			getProperty() {
				var params = {
					enterType: "物业",
					userId: localStorage.getItem("userId")
				}
				getProperty(params).then(res => {
					let options = res.data
					this.propertyOptions = options.map(item => {
						return {
							value: `${item.id}`,
							label: `${item.enterName}`
						};
					})
				})
			},
      // 添加类型
      handleAddnew(id) {
        this.addForms2.communityId = id
        this.addnewDialog = true
      },
      // 关闭添加类型
      closedialog() {
        this.addnewDialog = false
        this.addForms2= {
          communityId: 0,
          socialUnitName: '',
          socialUnitAddr: '',
          socialUnitPhone: '',
          socialUnitGis: '',
          socialUnitType: '',
          socialUnitHeader: ''
        }
      },
      // 保存类型
      lxsubmit() {
        addshcom(this.addForms2).then((res) => {
          if(res.code == 200) {
            this.$message.success('添加成功');
            this.addnewDialog = false
            this.addForms2= {
              communityId: 0,
              socialUnitName: '',
              socialUnitAddr: '',
              socialUnitPhone: '',
              socialUnitGis: '',
              socialUnitType: '',
              socialUnitHeader: ''
            }
          }
        })
        // 添加成功后刷新数据
        this.getList();
      },
      // 修改社会单位
      handleEditnew(id) {
        this.editnewDialog = true
        this.addForms2 = id
      },
      lxsubmit2() {
        updateshcom(this.addForms2).then((res) => {
          if(res.code == 200) {
            this.$message.success('修改成功');
            this.editnewDialog = false
            this.addForms2= {
              communityId: 0,
              socialUnitName: '',
              socialUnitAddr: '',
              socialUnitPhone: '',
              socialUnitGis: '',
              socialUnitType: '',
              socialUnitHeader: ''
            }
          }
          // // 添加成功后刷新数据
          // this.getList();
        })
      },
      // 删除社会单位
      handdeletenew(row) {
        const idnew = row.id;
        this.$confirm('是否删除社会单位："' + row.socialUnitName + '"？', '提示', {
        	confirmButtonText: '确定',
        	cancelButtonText: '取消',
        	type: 'warning'
        }).then(function() {
        	return delshcom(idnew)
        }).then(data => {
        	this.$message.success('删除成功')
        	this.getList();
        }).catch(() => {})
      },
			//添加小区弹窗
			handleAdd() {
				// this.addForms={};
				this.addForms.areaId = null
				// this.addForms.areaId=this.$options.data().addForms.areaId;
				// console.log(this.addForms,1111)
				this.addDialog = true
				// this.$refs[addForms].resetFields();  //element 重置
				// this.getTree();
			},

			//添加小区提交
			submitAdd(addForms) {
				this.$refs[addForms].validate((valid) => {
					if(valid) {
						addVillage(this.addForms).then((res) => {
							this.addDialog = false;
							this.$message.success('添加成功');
							this.$refs[addForms].resetFields(); //element 重置
							this.getList();
						})
					}
				})

			},

			//添加弹窗关闭
			dictAddVisible(addForms) {
				this.$refs[addForms].resetFields();
				// this.addForms=this.$options.data().addForms;
				this.addForms = {};
				this.addForms.areaId = ""
				this.addDialog = false;
			},

			// 编辑弹窗打开
			handleEdit(row) {
				this.editDialog = true;
				this.getTree();
				getVillage(row.id).then((res) => {
					if(res.code === 200) {
						this.editForm = res.data;

					}
				});
			},

			//编辑的提交按钮
			submitEdit(editForm) {
				this.$refs[editForm].validate((valid) => {
					if(valid) {
						console.log(this.editForm)
						updateVillage(this.editForm).then((res) => {
							this.editDialog = false;
							this.$message.success("修改成功");
							this.getList()
						}).catch(() => {});
					}
				});
			},

			//编辑弹窗关闭
			dictEditVisible(editForm) {
				this.$refs[editForm].resetFields();
				this.editDialog = false
			},

			//查询按钮
			handleQuery() {
				this.getList(this.queryParams);
			},

			//删除按钮操作
			handleDelete(row) {
				const id = row.id;
				this.$confirm('是否删除小区："' + row.communityName + '"？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(function() {
					return delVillage(id)
				}).then(data => {
					this.$message.success('删除成功')
					this.getList();
				}).catch(() => {})
			},
		}
	};
</script>
<style scoped>
	/* 标题样式 */
/deep/.el-table__expand-icon{
  height: 2.25rem;
}
	.title-font {
		text-align: center;
		font-weight: bold;
	}

	.inputWidth {
		width: 217px;
		min-width: 217px;
	}
</style>
