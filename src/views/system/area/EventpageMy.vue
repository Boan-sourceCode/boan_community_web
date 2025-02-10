<!-- 我的事件 -->
<template>
  <div class="app-container">

    <!-- 左边测试 -->
    <el-tabs v-model="activeNames" type="card" :tab-position="tabPosition">
        <span>事件类型:</span>
        <el-tab-pane label="我的事件" name="   ">
          <el-tabs v-model="activeName" type="card" :tab-position="wang" class="event">
              <el-tab-pane label="我上报的事件" name="我上报的事件" >
                  <el-form v-model="queryParams" :inline="true" size="small">
                    <el-form-item label="上报人：" prop="key" label-width="68px">
                        <el-input clearable v-model="queryParams.key" placeholder="请输入上报人" />
                    </el-form-item>
                    <el-form-item label="登记时间：" prop="time" class="input-width" >
                        <el-date-picker
                        v-model="time"
                        type="daterange"
                        @change="setTime"
                        value-format="yyyy-MM-dd"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        style = "width:210px">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="人口类型：" prop="peopletype" class="input-width">
                      <el-select clearable filterable v-model="queryParams.peopletype" placeholder="请选择" style = "width:140px">
                        <el-option
                          v-for="item in dict.type.people_type"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="关键字：" prop="isParty" label-width="96px">
                        <el-input clearable v-model="queryParams.key" placeholder="事件名称、事件编号" />
                    </el-form-item>
                    <el-button @click="handleGridQuery"  plain>查询</el-button>
                    <el-button @click="handleGridExport"  plain style="float: right">上报事件</el-button>
                  </el-form>

                  <el-table
                  :loading="loading"
                  :data="EscalationList"
                  :header-cell-style="{background:'#EBF7FF'}"
                  stripe border>
                  <el-table-column label="事件编号" align="center" prop="areaId" />
                  <el-table-column label="所属网格" align="center" prop="areaName"/>
                  <el-table-column label="事件名称" align="center" prop="incidentName" width="164px"/>
                  <el-table-column label="事件来源" align="center" prop="incidentSource" width="164px"/>
                  <el-table-column label="登记时间" align="center" prop="registrationTime" />
                  <el-table-column label="事件类别" align="center" prop="incidentCategory" />
                  <el-table-column label="事件规模" align="center" prop="incidentScale" />
                  <el-table-column label="事件等级" align="center" prop="incidentLevel" />
                  <el-table-column label="事件状态" align="center" prop="incidentStatus" />
                  <el-table-column label="处理期限" align="center" prop="dispatchDeadline"/>
                  <el-table-column label="上报人" align="center" prop="reportName"/>
                  <el-table-column label="事件流转类型" align="center" prop="incidentType"/>
                  <el-table-column label="操作" align="center" >
                      <template slot-scope="scope">
                        <el-button type="primary" plain size="small" @click="handleUpdate(scope.row)">详情</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <p>共 {{this.EscalationList.length}} 条信息</p>

                  <!-- 分页 -->
                  <pagination
                  :total="queryParams.total"
                  :page.sync="queryParams.pageNum"
                  :limit.sync="queryParams.pageSize"
                  @pagination="getGridList()"
                  />

              </el-tab-pane>
              <el-tab-pane label="已受理派遣的事件" name="我受理派遣的事件"  >
                  <el-form v-model="queryParams" :inline="true" size="small">
                  <el-form-item label="上报人：" prop="key" label-width="68px">
                      <el-input clearable v-model="queryParams.key" placeholder="请输入上报人" />
                  </el-form-item>
                  <el-form-item label="登记时间：" prop="time" class="input-width" >
                      <el-date-picker
                      v-model="time"
                      type="daterange"
                      @change="setTime"
                      value-format="yyyy-MM-dd"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      style = "width:210px">
                      </el-date-picker>
                  </el-form-item>
                  <el-form-item label="人口类型：" prop="peopletype" class="input-width">
                    <el-select clearable filterable v-model="queryParams.peopletype" placeholder="请选择" style = "width:140px">
                      <el-option
                        v-for="item in dict.type.people_type"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="关键字：" prop="isParty" label-width="96px">
                      <el-input clearable v-model="queryParams.key" placeholder="事件名称、事件编号" />
                  </el-form-item>

                  <el-form-item style="position: absolute;width: fit-content">
                      <el-button  size="mini" @click="handleGridQuery" type="primary" plain>查询</el-button>
                  </el-form-item>
                  </el-form>

                  <el-table
                  :loading="loading"
                  :data="AcceptanceList"
                  :header-cell-style="{background:'#EBF7FF'}"
                  stripe border>
                  <el-table-column label="事件编号" align="center" prop="areaId" />
                  <el-table-column label="所属网格" align="center" prop="areaName"/>
                  <el-table-column label="事件名称" align="center" prop="incidentName" width="164px"/>
                  <el-table-column label="事件来源" align="center" prop="incidentSource" width="164px"/>
                  <el-table-column label="登记时间" align="center" prop="registrationTime" />
                  <el-table-column label="事件类别" align="center" prop="incidentCategory" />
                  <el-table-column label="事件规模" align="center" prop="incidentScale" />
                  <el-table-column label="事件等级" align="center" prop="incidentLevel" />
                  <el-table-column label="事件状态" align="center" prop="statu" />
                  <el-table-column label="处理期限" align="center" prop="dispatchDeadline"/>
                  <el-table-column label="上报人" align="center" prop="reportName"/>
                  <el-table-column label="事件流转类型" align="center" prop="incidentType"/>
                  <el-table-column label="操作" align="center" >
                      <template slot-scope="scope">
                        <el-button type="primary" plain size="small" @click="handleUpdate(scope.row)">详情</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <p>共 {{this.AcceptanceList.length}} 条信息</p>

                  <!-- 分页 -->
                  <pagination
                  :total="queryParams.total"
                  :page.sync="queryParams.pageNum"
                  :limit.sync="queryParams.pageSize"
                  @pagination="getGridList()"
                  />
              </el-tab-pane>
              <el-tab-pane label="已处理的事件" name="我处理的事件"  >
                  <el-form v-model="queryParams" :inline="true" size="small">
                  <el-form-item label="上报人：" prop="key" label-width="68px">
                      <el-input clearable v-model="queryParams.key" placeholder="请输入上报人" />
                  </el-form-item>
                  <el-form-item label="登记时间：" prop="time" class="input-width" >
                      <el-date-picker
                      v-model="time"
                      type="daterange"
                      @change="setTime"
                      value-format="yyyy-MM-dd"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      style = "width:210px">
                      </el-date-picker>
                  </el-form-item>
                  <el-form-item label="人口类型：" prop="peopletype" class="input-width">
                    <el-select clearable filterable v-model="queryParams.peopletype" placeholder="请选择" style = "width:140px">
                      <el-option
                        v-for="item in dict.type.people_type"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="关键字：" prop="isParty" label-width="96px">
                      <el-input clearable v-model="queryParams.key" placeholder="事件名称、事件编号" />
                  </el-form-item>

                  <el-form-item style="position: absolute;width: fit-content">
                      <el-button  size="mini" @click="handleGridQuery" type="primary" plain>查询</el-button>
                  </el-form-item>

                  </el-form>

                  <el-tabs :tab-position="whole"  class="Pending" v-model="trial">
                      <el-tab-pane label="全部" name="全部">
                          <el-table
                              :loading="loading"
                              :data="handleList"
                              :header-cell-style="{background:'#EBF7FF'}"
                              stripe border
                              style = "margin-top: 70px;">
                              <el-table-column label="事件编号" align="center" prop="areaId" />
                              <el-table-column label="所属网格" align="center" prop="areaName"/>
                              <el-table-column label="事件名称" align="center" prop="incidentName" width="164px"/>
                              <el-table-column label="事件来源" align="center" prop="incidentSource" width="164px"/>
                              <el-table-column label="登记时间" align="center" prop="registrationTime" />
                              <el-table-column label="事件类别" align="center" prop="incidentCategory" />
                              <el-table-column label="事件规模" align="center" prop="incidentScale" />
                              <el-table-column label="事件等级" align="center" prop="incidentLevel" />
                              <el-table-column label="事件状态" align="center" prop="statu" />
                              <el-table-column label="处理期限" align="center" prop="dispatchDeadline"/>
                              <el-table-column label="上报人" align="center" prop="reportName"/>
                              <el-table-column label="事件流转类型" align="center" prop="incidentType"/>
                              <el-table-column label="操作" align="center" >
                                <template slot-scope="scope">
                                  <el-button type="primary" plain size="small" @click="handleUpdate(scope.row)">详情</el-button>
                                </template>
                              </el-table-column>
                          </el-table>
                          <p>共 {{this.handleList.length}} 条信息</p>

                          <!-- 分页 -->
                          <pagination
                          :total="queryParams.total"
                          :page.sync="queryParams.pageNum"
                          :limit.sync="queryParams.pageSize"
                          @pagination="getGridList()"
                          />
                      </el-tab-pane>
                      <el-tab-pane label="延期待审批的事件" name="延期待审批的事件">
                          <el-table
                              :loading="loading"
                              :data="ExtensionList"
                              :header-cell-style="{background:'#EBF7FF'}"
                              stripe border
                              style = "margin-top: 70px;">
                              <el-table-column label="事件编号" align="center" prop="areaId" />
                              <el-table-column label="所属网格" align="center" prop="areaName"/>
                              <el-table-column label="事件名称" align="center" prop="incidentName" width="164px"/>
                              <el-table-column label="事件来源" align="center" prop="incidentSource" width="164px"/>
                              <el-table-column label="登记时间" align="center" prop="registrationTime" />
                              <el-table-column label="事件类别" align="center" prop="incidentCategory" />
                              <el-table-column label="事件规模" align="center" prop="incidentScale" />
                              <el-table-column label="事件等级" align="center" prop="incidentLevel" />
                              <el-table-column label="事件状态" align="center" prop="statu" />
                              <el-table-column label="处理期限" align="center" prop="dispatchDeadline"/>
                              <el-table-column label="上报人" align="center" prop="reportName"/>
                              <el-table-column label="事件流转类型" align="center" prop="incidentType"/>
                              <el-table-column label="操作" align="center" >
                                <template slot-scope="scope">
                                  <el-button type="primary" plain size="small" @click="handleUpdate(scope.row)">详情</el-button>
                                </template>
                              </el-table-column>
                          </el-table>
                          <p>共 {{this.ExtensionList.length}} 条信息</p>

                          <!-- 分页 -->
                          <pagination
                          :total="queryParams.total"
                          :page.sync="queryParams.pageNum"
                          :limit.sync="queryParams.pageSize"
                          @pagination="getGridList()"
                          />
                      </el-tab-pane>
                  </el-tabs>

              </el-tab-pane>
              <el-tab-pane label="已核查的事件" name="我核查的事件"  >
                  <el-form v-model="queryParams" :inline="true" size="small">
                  <el-form-item label="上报人：" prop="key" label-width="68px">
                      <el-input clearable v-model="queryParams.key" placeholder="请输入上报人" />
                  </el-form-item>
                  <el-form-item label="登记时间：" prop="time" class="input-width" >
                      <el-date-picker
                      v-model="time"
                      type="daterange"
                      @change="setTime"
                      value-format="yyyy-MM-dd"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      style = "width:210px">
                      </el-date-picker>
                  </el-form-item>
                  <el-form-item label="人口类型：" prop="peopletype" class="input-width">
                    <el-select clearable filterable v-model="queryParams.peopletype" placeholder="请选择" style = "width:140px">
                      <el-option
                        v-for="item in dict.type.people_type"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="关键字：" prop="isParty" label-width="96px">
                      <el-input clearable v-model="queryParams.key" placeholder="事件名称、事件编号" />
                  </el-form-item>

                  <el-form-item style="position: absolute;width: fit-content">
                      <el-button  size="mini" @click="handleGridQuery" type="primary" plain>查询</el-button>
                  </el-form-item>
                  </el-form>

                  <el-table
                  :loading="loading"
                  :data="VerificationList"
                  :header-cell-style="{background:'#EBF7FF'}"
                  stripe border>
                  <el-table-column label="事件编号" align="center" prop="areaId" />
                  <el-table-column label="所属网格" align="center" prop="areaName"/>
                  <el-table-column label="事件名称" align="center" prop="incidentName" width="164px"/>
                  <el-table-column label="事件来源" align="center" prop="incidentSource" width="164px"/>
                  <el-table-column label="登记时间" align="center" prop="registrationTime" />
                  <el-table-column label="事件类别" align="center" prop="incidentCategory" />
                  <el-table-column label="事件规模" align="center" prop="incidentScale" />
                  <el-table-column label="事件等级" align="center" prop="incidentLevel" />
                  <el-table-column label="事件状态" align="center" prop="statu" />
                  <el-table-column label="处理期限" align="center" prop="dispatchDeadline"/>
                  <el-table-column label="上报人" align="center" prop="reportName"/>
                  <el-table-column label="事件流转类型" align="center" prop="incidentType"/>
                  <el-table-column label="操作" align="center" >
                      <template slot-scope="scope">
                        <el-button type="primary" plain size="small" @click="handleUpdate(scope.row)">详情</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <p>共 {{this.VerificationList.length}} 条信息</p>

                  <!-- 分页 -->
                  <pagination
                  :total="queryParams.total"
                  :page.sync="queryParams.pageNum"
                  :limit.sync="queryParams.pageSize"
                  @pagination="getGridList()"
                  />
              </el-tab-pane>
              <el-tab-pane label="已结案归档的事件" name="我结案归档的事件"  >
                  <el-form v-model="queryParams" :inline="true" size="small">
                  <el-form-item label="上报人：" prop="key" label-width="68px">
                      <el-input clearable v-model="queryParams.key" placeholder="请输入上报人" />
                  </el-form-item>
                  <el-form-item label="登记时间：" prop="time" class="input-width" >
                      <el-date-picker
                      v-model="time"
                      type="daterange"
                      @change="setTime"
                      value-format="yyyy-MM-dd"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      style = "width:210px">
                      </el-date-picker>
                  </el-form-item>
                  <el-form-item label="人口类型：" prop="peopletype" class="input-width">
                    <el-select clearable filterable v-model="queryParams.peopletype" placeholder="请选择" style = "width:140px">
                      <el-option
                        v-for="item in dict.type.people_type"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="关键字：" prop="isParty" label-width="96px">
                      <el-input clearable v-model="queryParams.key" placeholder="事件名称、事件编号" />
                  </el-form-item>

                  <el-form-item style="position: absolute;width: fit-content">
                      <el-button  size="mini" @click="handleGridQuery" type="primary" plain>查询</el-button>
                  </el-form-item>
                  </el-form>

                  <el-table
                  :loading="loading"
                  :data="ClosingList"
                  :header-cell-style="{background:'#EBF7FF'}"
                  stripe border>
                  <el-table-column label="事件编号" align="center" prop="areaId" />
                  <el-table-column label="所属网格" align="center" prop="areaName"/>
                  <el-table-column label="事件名称" align="center" prop="incidentName" width="164px"/>
                  <el-table-column label="事件来源" align="center" prop="incidentSource" width="164px"/>
                  <el-table-column label="登记时间" align="center" prop="registrationTime" />
                  <el-table-column label="事件类别" align="center" prop="incidentCategory" />
                  <el-table-column label="事件规模" align="center" prop="incidentScale" />
                  <el-table-column label="事件等级" align="center" prop="incidentLevel" />
                  <el-table-column label="事件状态" align="center" prop="statu" />
                  <el-table-column label="处理期限" align="center" prop="dispatchDeadline"/>
                  <el-table-column label="上报人" align="center" prop="reportName"/>
                  <el-table-column label="事件流转类型" align="center" prop="incidentType"/>
                  <el-table-column label="操作" align="center" >
                      <template slot-scope="scope">
                        <el-button type="primary" plain size="small" @click="handleUpdate(scope.row)">详情</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <p>共 {{this.ClosingList.length}} 条信息</p>

                  <!-- 分页 -->
                  <pagination
                  :total="queryParams.total"
                  :page.sync="queryParams.pageNum"
                  :limit.sync="queryParams.pageSize"
                  @pagination="getGridList()"
                  />
              </el-tab-pane>
            </el-tabs>
        </el-tab-pane>
        <el-tab-pane label="未受理的事件" name="未受理的事件">
                <el-table
                    :loading="loading"
                    :data="acceptedList"
                    :header-cell-style="{background:'#EBF7FF'}"
                    stripe border>
                    <el-table-column label="事件编号" align="center" prop="incidentId" />
                    <el-table-column label="所属网格" align="center" prop="areaName"/>
                    <el-table-column label="事件名称" align="center" prop="incidentName" width="164px"/>
                    <el-table-column label="事件来源" align="center" prop="incidentSource" />
                    <el-table-column label="登记时间" align="center" prop="registrationTime" />
                    <el-table-column label="事件类别" align="center" prop="incidentCategory" />
                    <el-table-column label="事件规模" align="center" prop="incidentScale" />
                    <el-table-column label="事件等级" align="center" prop="incidentLevel"/>
                    <el-table-column label="事件状态" align="center" prop="statu" />
                    <el-table-column label="处理期限" align="center" prop="dispatchDeadline" />
                    <el-table-column label="上报人" align="center" prop="reportName" />
                    <el-table-column label="事件流转类型" align="center" prop="incidentType" />
                    <el-table-column label="位置信息" align="center" prop= incidentLocation>
                        <template slot-scope="scope">
                        <a class="card-state unmarked icon-map-marker" @click.stop="openMap()" v-if="scope.row.incidentLocation === null || scope.row.incidentLocation === '' ">未标注</a>
                        <a class="card-state marked icon-map-marker" @click.stop="openMap()" v-else>已标注</a>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" >
                      <template slot-scope="scope">
                        <el-button type="primary" plain size="small" @click="handleUpdate(scope.row)">详情</el-button>
                      </template>
                    </el-table-column>
                </el-table>
                <p>共 {{this.acceptedList.length}} 条信息</p>

                <!-- 分页 -->
                <pagination
                :total="queryParams.total"
                :page.sync="queryParams.pageNum"
                :limit.sync="queryParams.pageSize"
                @pagination="getGridList()"
                />
        </el-tab-pane>
        <el-tab-pane label="未处理的事件" name="未处理的事件">
            <el-form v-model="queryParams" :inline="true" size="small">
              <el-select clearable filterable v-model="queryParams.id" placeholder="请选择" style = "width:140px">
                <el-option
                  v-for="item in buildingOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form>

            <el-table
                    :loading="loading"
                    :data="processedList"
                    :header-cell-style="{background:'#EBF7FF'}"
                    stripe border
                    style="margin-top:20px;">
                    <el-table-column label="事件编号" align="center" prop="incidentId" />
                    <el-table-column label="所属网格" align="center" prop="areaName"/>
                    <el-table-column label="事件名称" align="center" prop="incidentName" width="164px"/>
                    <el-table-column label="事件来源" align="center" prop="incidentSource" />
                    <el-table-column label="登记时间" align="center" prop="registrationTime" />
                    <el-table-column label="事件类别" align="center" prop="incidentCategory" />
                    <el-table-column label="事件规模" align="center" prop="incidentScale" />
                    <el-table-column label="事件等级" align="center" prop="incidentLevel"/>
                    <el-table-column label="事件状态" align="center" prop="statu" />
                    <el-table-column label="处理期限" align="center" prop="dispatchDeadline" />
                    <el-table-column label="上报人" align="center" prop="reportName" />
                    <el-table-column label="事件流转类型" align="center" prop="incidentType" />
                    <el-table-column label="位置信息" align="center" prop= incidentLocation>
                        <template slot-scope="scope">
                        <a class="card-state unmarked icon-map-marker" @click.stop="openMap()" v-if="scope.row.incidentLocation === null || scope.row.incidentLocation === '' ">未标注</a>
                        <a class="card-state marked icon-map-marker" @click.stop="openMap()" v-else>已标注</a>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" >
                      <template slot-scope="scope">
                        <el-button type="primary" plain size="small" @click="handleUpdate(scope.row)">详情</el-button>
                      </template>
                    </el-table-column>
                </el-table>
                <p>共 {{this.processedList.length}} 条信息</p>

                <!-- 分页 -->
                <pagination
                :total="queryParams.total"
                :page.sync="queryParams.pageNum"
                :limit.sync="queryParams.pageSize"
                @pagination="getGridList()"
                />
        </el-tab-pane>
        <el-tab-pane label="未核查的事件" name="未核查的事件">
            <el-table
                    :loading="loading"
                    :data="NotcheckedList"
                    :header-cell-style="{background:'#EBF7FF'}"
                    stripe border>
                    <el-table-column label="事件编号" align="center" prop="incidentId" />
                    <el-table-column label="所属网格" align="center" prop="areaName"/>
                    <el-table-column label="事件名称" align="center" prop="incidentName" width="164px"/>
                    <el-table-column label="事件来源" align="center" prop="incidentSource" />
                    <el-table-column label="登记时间" align="center" prop="registrationTime" />
                    <el-table-column label="事件类别" align="center" prop="incidentCategory" />
                    <el-table-column label="事件规模" align="center" prop="incidentScale" />
                    <el-table-column label="事件等级" align="center" prop="incidentLevel"/>
                    <el-table-column label="事件状态" align="center" prop="statu" />
                    <el-table-column label="处理期限" align="center" prop="dispatchDeadline" />
                    <el-table-column label="上报人" align="center" prop="reportName" />
                    <el-table-column label="事件流转类型" align="center" prop="incidentType" />
                    <el-table-column label="位置信息" align="center" prop= incidentLocation>
                        <template slot-scope="scope">
                        <a class="card-state unmarked icon-map-marker" @click.stop="openMap()" v-if="scope.row.incidentLocation === null || scope.row.incidentLocation === '' ">未标注</a>
                        <a class="card-state marked icon-map-marker" @click.stop="openMap()" v-else>已标注</a>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" >
                      <template slot-scope="scope">
                        <el-button type="primary" plain size="small" @click="handleUpdate(scope.row)">详情</el-button>
                      </template>
                    </el-table-column>
                </el-table>
                <p>共 {{this.NotcheckedList.length}} 条信息</p>

                <!-- 分页 -->
                <pagination
                :total="queryParams.total"
                :page.sync="queryParams.pageNum"
                :limit.sync="queryParams.pageSize"
                @pagination="getGridList()"
                />
        </el-tab-pane>
        <el-tab-pane label="未结案归档的事件" name="未结案归档的事件">
            <el-table
                    :loading="loading"
                    :data="evaluateList"
                    :header-cell-style="{background:'#EBF7FF'}"
                    stripe border>
                    <el-table-column label="事件编号" align="center" prop="incidentId" />
                    <el-table-column label="所属网格" align="center" prop="areaName"/>
                    <el-table-column label="事件名称" align="center" prop="incidentName" width="164px"/>
                    <el-table-column label="事件来源" align="center" prop="incidentSource" />
                    <el-table-column label="登记时间" align="center" prop="registrationTime" />
                    <el-table-column label="事件类别" align="center" prop="incidentCategory" />
                    <el-table-column label="事件规模" align="center" prop="incidentScale" />
                    <el-table-column label="事件等级" align="center" prop="incidentLevel"/>
                    <el-table-column label="事件状态" align="center" prop="statu" />
                    <el-table-column label="处理期限" align="center" prop="dispatchDeadline" />
                    <el-table-column label="上报人" align="center" prop="reportName" />
                    <el-table-column label="事件流转类型" align="center" prop="incidentType" />
                    <el-table-column label="位置信息" align="center" prop= incidentLocation>
                        <template slot-scope="scope">
                        <a class="card-state unmarked icon-map-marker" @click.stop="openMap()" v-if="scope.row.incidentLocation === null || scope.row.incidentLocation === '' ">未标注</a>
                        <a class="card-state marked icon-map-marker" @click.stop="openMap()" v-else>已标注</a>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" >
                      <template slot-scope="scope">
                        <el-button type="primary" plain size="small" @click="handleUpdate(scope.row)">详情</el-button>
                      </template>
                    </el-table-column>
                </el-table>
                <p>共 {{this.evaluateList.length}} 条信息</p>

                <!-- 分页 -->
                <pagination
                :total="queryParams.total"
                :page.sync="queryParams.pageNum"
                :limit.sync="queryParams.pageSize"
                @pagination="getGridList()"
                />
        </el-tab-pane>
        <el-tab-pane label="延期事件审核" name="延期事件审核">
            <el-table
                    :loading="loading"
                    :data="delayList"
                    :header-cell-style="{background:'#EBF7FF'}"
                    stripe border>
                    <el-table-column label="事件编号" align="center" prop="incidentId" />
                    <el-table-column label="所属网格" align="center" prop="areaName"/>
                    <el-table-column label="事件名称" align="center" prop="incidentName" width="164px"/>
                    <el-table-column label="事件来源" align="center" prop="incidentSource" />
                    <el-table-column label="登记时间" align="center" prop="registrationTime" />
                    <el-table-column label="事件类别" align="center" prop="incidentCategory" />
                    <el-table-column label="事件规模" align="center" prop="incidentScale" />
                    <el-table-column label="事件等级" align="center" prop="incidentLevel"/>
                    <el-table-column label="事件状态" align="center" prop="statu" />
                    <el-table-column label="处理期限" align="center" prop="dispatchDeadline" />
                    <el-table-column label="上报人" align="center" prop="reportName" />
                    <el-table-column label="事件流转类型" align="center" prop="incidentType" />
                    <el-table-column label="位置信息" align="center" prop= incidentLocation>
                        <template slot-scope="scope">
                        <a class="card-state unmarked icon-map-marker" @click.stop="openMap()" v-if="scope.row.incidentLocation === null || scope.row.incidentLocation === '' ">未标注</a>
                        <a class="card-state marked icon-map-marker" @click.stop="openMap()" v-else>已标注</a>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" >
                      <template slot-scope="scope">
                        <el-button type="primary" plain size="small" @click="handleUpdate(scope.row)">详情</el-button>
                      </template>
                    </el-table-column>
                </el-table>
                <p>共 {{this.delayList.length}} 条信息</p>

                <!-- 分页 -->
                <pagination
                :total="queryParams.total"
                :page.sync="queryParams.pageNum"
                :limit.sync="queryParams.pageSize"
                @pagination="getGridList()"
                />
        </el-tab-pane>
        <el-tab-pane label="废弃的事件" name="废弃的事件">
            <el-table
                    :loading="loading"
                    :data="AbandonList"
                    :header-cell-style="{background:'#EBF7FF'}"
                    stripe border>
                    <el-table-column label="事件编号" align="center" prop="incidentId" />
                    <el-table-column label="所属网格" align="center" prop="areaName"/>
                    <el-table-column label="事件名称" align="center" prop="incidentName" width="164px"/>
                    <el-table-column label="事件来源" align="center" prop="incidentSource" />
                    <el-table-column label="登记时间" align="center" prop="registrationTime" />
                    <el-table-column label="事件类别" align="center" prop="incidentCategory" />
                    <el-table-column label="事件规模" align="center" prop="incidentScale" />
                    <el-table-column label="事件等级" align="center" prop="incidentLevel"/>
                    <el-table-column label="事件状态" align="center" prop="statu" />
                    <el-table-column label="处理期限" align="center" prop="dispatchDeadline" />
                    <el-table-column label="上报人" align="center" prop="reportName" />
                    <el-table-column label="事件流转类型" align="center" prop="incidentType" />
                    <el-table-column label="位置信息" align="center" prop= incidentLocation>
                        <template slot-scope="scope">
                        <a class="card-state unmarked icon-map-marker" @click.stop="openMap()" v-if="scope.row.incidentLocation === null || scope.row.incidentLocation === '' ">未标注</a>
                        <a class="card-state marked icon-map-marker" @click.stop="openMap()" v-else>已标注</a>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" >
                      <template slot-scope="scope">
                        <el-button type="primary" plain size="small" @click="handleUpdate(scope.row)">详情</el-button>
                      </template>
                    </el-table-column>
                </el-table>
                <p>共 {{this.AbandonList.length}} 条信息</p>

                <!-- 分页 -->
                <pagination
                :total="queryParams.total"
                :page.sync="queryParams.pageNum"
                :limit.sync="queryParams.pageSize"
                @pagination="getGridList()"
                />
        </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {treeList,listArea} from "@/api/area/area";
import { getUserProfile } from "@/api/system/user";
import {myReportIncident} from "@/api/area/event";
export default {
  name: "EventpageMy",
  dicts: [
   ' people_type'
  ],
  data() {
    return {
      loading: true,  // 遮罩层
      //网格
      dialogAnnotate: false,  //地图弹窗
      center: [12529117.002647482,4561158.359249212], //地图中心点
      gridList: [], // 网格数据
      treeData: [], //下拉框数据
      treeProps: {
        label: "label",
        value: "id",
        children: "children",
      },
      value:'',//选中的数据
      queryParams: {  //网格
        pageNum: 1, //当前页数
        pageSize: 10,  //每页条数
        total: 0, // 总页数
      },
      form:{},
      rules:{},

    //   新
    activeNames: '我的事件', //左侧默认选择我的事件
    activeName:'我上报的事件', //上侧默认选择我上报的事件
    trial:'全部', //我处理的事件默认选择全部
    tabPosition: 'left',
    wang:'top',
    whole:'top',
    time:[], //登记时间
    EscalationList:[], //我上报的事件
    AcceptanceList:[], //我受理派遣的事件
    handleList:[], //我处理的全部事件
    ExtensionList:[], //我处理的延期待审批事件
    VerificationList:[], //我核查的事件
    ClosingList:[], //结案归档事件
    acceptedList:[], //未受理的事件
    processedList:[], //未处理的事件
    NotcheckedList:[], //未核查的事件
    evaluateList:[], //未评价结案的事件
    delayList:[], //延期事件审核
    AbandonList:[], //废弃事件
    //未处理事件的处理期限选择
    buildingOptions: [{
        value: '处理期限<=3天',
        label: '处理期限<=3天'
      }, {
        value: '处理期限>=3天',
        label: '处理期限>=3天'
      }, {
        value: '超时处理的事件',
        label: '超时处理的事件'
      }],
    };
  },
  mounted() {
    // this.getGridList();  //网格数据
    // this.getTree();  //树状下拉框
    // this.getUser(); //调用用户编号接口
  },
  methods: {
    // 查询树
    getTree() {
      treeList().then(res => {
        this.treeData = res.data
      })
    },


    //获取表格数据
    getGridList() {
      this.loading = true;
      listArea(this.queryParams).then(res => {
        this.gridList = res.rows;
        this.queryParams.total = res.total;
      });
    },

    // 查询
    handleGridQuery() {
      this.queryParams.pageNum = 1;
      this.getGridList(this.queryParams);
    },

    // 标注弹窗打开
    openMap() {
      this.dialogAnnotate = true;
    },

    // 发生时间开始时间结束时间
    setTime(e) {
      this.queryParams.startTime = e[0]
      this.queryParams.endTime = e[1]
    },

    // 表格详情按钮
    handleUpdate (row) {
      console.log(row);
      const src = `/Eventpage/Eventthecirculation`;
      let incidentId = row.incidentId
      console.log(incidentId)
      this.$router.push({
        path: src,
        query:{incidentId:incidentId}
      })
      // let id = row.id
      // this.loading = true
      // let params = {
      //   areaId: this.$route.query.areaId
      // }
      // getReturnGridInfo (params).then((res) => {
      //   if (res.code === 200) {
      //     console.log(res);
      //     this.editDialogInfo = res.data
      //     console.log(this.editDialogInfo);
      //   }
      // })
      // houseReturnUnpdateInfo (id).then((res) => {
      //   if (res.code === 200) {
      //     this.dialogEdit = true
      //     this.loading = false
      //     this.editForm = res.data
      //     if (this.editForm.registeredStatus === 0) {
      //       this.editForm.registeredStatus = '是'
      //     } else if (this.editForm.registeredStatus === 1) {
      //       this.editForm.registeredStatus = '否'
      //     }
      //   }
      // })
    },

    // 表格删除按钮
    handleDelete (row) {
      console.log(row);
      let params = {
        id: row.id,
        updateBy: Cookies.get('username')
      }
      this.$confirm('是否删除网格："' + row.communityName + row.buidingNumber + '"？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        houseHeightDelete (params).then((res) => {
          if (res.code === 200) {
            console.log(res);
            this.getSelect();
            this.$message.success(res.msg)
          } else if (res.code === 201) {
            this.getSelect();
            this.$message.error(res.msg)
          }
        })
      }).catch(() => {})
    },

    //上报事件按钮
    handleGridExport(){
        const src = `/Eventpage/EventpageEscalation`;
      this.$router.push({
        path: src,
      })
    },

    // 用户编号接口
    getUser() {
      getUserProfile().then(response => {
        this.userId = response.data.userId;
        this.Myevent(); //调用我的事件接口
        this.Acceptdispatch(); //调用受理派遣接口
        this.Handlingevents(); //调用我处理的事件接口
        this.pendingapproval(); //调用我处理事件延期待审批接口
        this.Verificationevents(); //调用我核查的事件接口
        this.Closingevent(); //调用结案归档的事件接口
        this.Notaccepted(); //调用未受理事件接口
        this.Notprocessed(); //调用未处理事件接口
        this.Notchecked(); //调用未核查事件接口
        this.Opencase(); //调用未评价结案事件接口
        this.Delay(); //调用延期事件接口
        this.Abandonen(); //调用废弃事件接口
      })
    },

     //我的事件表格数据
     Myevent(){
      let param = {
        userId : this.userId,
        flag:0,
      }
      console.log(param,'00')
      myReportIncident(param).then(res => {
        console.log(res.rows,'00')
        this.EscalationList = res.rows
      });
    },


    //受理派遣表格数据
     Acceptdispatch(){
      let param = {
        userId : this.userId,
        flag:1,
      }
      console.log(param,'1')
      myReportIncident(param).then(res => {
        console.log(res.rows,'1')
        this.AcceptanceList = res.rows
      });
    },

    //我处理全部事件表格数据
     Handlingevents(){
      let param = {
        userId : this.userId,
        flag:3,
      }
      console.log(param,'33')
      myReportIncident(param).then(res => {
        console.log(res.rows,'33')
        this.handleList = res.rows
      });
    },

    //我处理事件中延期待审批事件表格数据
     pendingapproval(){
      let param = {
        userId : this.userId,
        flag:11,
      }
      console.log(param,'11')
      myReportIncident(param).then(res => {
        console.log(res.rows,'11')
        this.ExtensionList = res.rows
      });
    },

    //我核查的事件表格数据
     Verificationevents(){
      let param = {
        userId : this.userId,
        flag:5,
      }
      console.log(param,'55')
      myReportIncident(param).then(res => {
        console.log(res.rows,'55')
        this.VerificationList = res.rows
      });
    },

    //结案归档事件表格数据
    Closingevent(){
      let param = {
        userId : this.userId,
        flag:7,
      }
      console.log(param,'77')
      myReportIncident(param).then(res => {
        console.log(res.rows,'77')
        this.ClosingList = res.rows
      });
    },

    //未受理事件表格数据
    Notaccepted(){
      let param = {
        userId : this.userId,
        flag:2,
      }
      console.log(param,'22')
      myReportIncident(param).then(res => {
        console.log(res.rows,'22')
        this.acceptedList = res.rows
      });
    },

    //未处理事件表格数据
    Notprocessed(){
      let param = {
        userId : this.userId,
        flag:4,
      }
      console.log(param,'44')
      myReportIncident(param).then(res => {
        console.log(res.rows,'44')
        this.processedList = res.rows
      });
    },

    //未核查事件表格数据
    Notchecked(){
      let param = {
        userId : this.userId,
        flag:6,
      }
      console.log(param,'66')
      myReportIncident(param).then(res => {
        console.log(res.rows,'66')
        this.NotcheckedList = res.rows
      });
    },

    //未评价结案事件表格数据
    Opencase(){
      let param = {
        userId : this.userId,
        flag:8,
      }
      console.log(param,'88')
      myReportIncident(param).then(res => {
        console.log(res.rows,'88')
        this.evaluateList = res.rows
      });
    },

    //延期事件表格数据
    Delay(){
      let param = {
        userId : this.userId,
        flag:9,
      }
      console.log(param,'99')
      myReportIncident(param).then(res => {
        console.log(res.rows,'99')
        this.delayList = res.rows
      });
    },

    //废弃事件表格数据
    Abandonen(){
      let param = {
        userId : this.userId,
        flag:10,
      }
      console.log(param,'10')
      myReportIncident(param).then(res => {
        console.log(res.rows,'10')
        this.AbandonList = res.rows
      });
    },
  }
};
</script>

<style scoped>
/* 左侧tab栏样式 */
/deep/ [data-v-993c2d7a] .el-tabs__nav-scroll {
    width: 170px;
    margin: 0 auto;
}

/deep/[data-v-993c2d7a] .el-tabs--card > .el-tabs__header .el-tabs__nav {
    border: none;
    margin-bottom: 0;
}

/deep/.el-tabs--left.el-tabs--card .el-tabs__item.is-left {
    text-align: center;
}

/deep/.el-tabs--left .el-tabs__header.is-left {
    float: left;
    margin-bottom: 0;
    margin-right: 30px;
}

/deep/.el-tabs--left.el-tabs--card .el-tabs__item.is-left {
    border: 1px solid #dfe4ed;
    padding-left: 5px;
    padding-right: 5px;
}

 /deep/.el-tabs--card > .el-tabs__header .el-tabs__nav {
    border: none;
    box-sizing: border-box;
}

/deep/.el-tabs__item {
    padding: 0 ;
    height: 2.5rem;
    box-sizing: border-box;
    line-height: 2.5rem;
    display: inline-block;
    list-style: none;
    font-size: 0.875rem;
    font-weight: 500;
    color: #303133;
    position: relative;
    border-radius: 5px;
    border: 1px solid #dfe4ed;;
    margin-bottom: 20px;
}

/* 卡片选中时样式 */
/deep/ .el-tabs--left.el-tabs--card .el-tabs__item.is-left.is-active {
    background-color: #1890ff;
    color: white;
    border: 1px solid #dfe4ed;;
}


/* 上侧tab栏样式 */
 /deep/.event .is-top .el-tabs__nav-scroll {
    width: 800px;
    line-height: 59px;
    line-height: 3.6875rem;
    margin-left: 77px;
}

/deep/[data-v-4501da49] .event .el-tabs__item {
    padding: 0;
    height: 2.5rem;
    box-sizing: border-box;
    line-height: 2.5rem;
    display: inline-block;
    list-style: none;
    font-size: 0.875rem;
    font-weight: 500;
    color: #303133;
    position: relative;
    border-radius: 0.3125rem;
    border: 0.0625rem solid #dfe4ed;
    margin-bottom: 1.25rem;
    padding-left: 10px;
    padding-right: 10px;
    margin-right: 10px;
}

 /deep/.el-tabs--top.el-tabs--card > .el-tabs__header .el-tabs__item:nth-child(2){
    padding-left: 10px;
}

/deep/.el-tabs--top.el-tabs--card > .el-tabs__header .el-tabs__item:last-child{
    padding-right: 10px;
}

/* 卡片选中时样式 */
/deep/ .event.el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
    background-color: #1890ff;
    color: white;
    border: 1px solid #dfe4ed;;
}

/* 我处理的事件tab栏 */
 /deep/.event .Pending .is-top .el-tabs__nav-scroll {
    float: left;
}

 /deep/.event .Pending .is-top .el-tabs__nav-scroll {
    width: 50rem;
    margin-left: 0;
}

/deep/ .event .Pending .el-tabs__item {
    margin-right: 0;
    height: 32px;
    line-height: 32px;
    border-radius: 0;
    width: 113px;
    font-size: 12px;
    text-align: center;
}

/deep/ .event .Pending .el-tabs__header {
    padding: 0;
    position: relative;
    margin-bottom: 0;
}

/deep/ .event .Pending .el-tabs__nav-wrap::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0;
    background-color: white;
}

/deep/ .event .Pending .el-tabs__header .el-tabs__nav-wrap .el-tabs__nav-scroll .el-tabs__nav{
    width: 0;
}

/deep/ .event .Pending .el-tabs__header .el-tabs__nav-wrap .el-tabs__nav-scroll .el-tabs__nav .el-tabs__active-bar {
    border-radius: 0.25rem 0 0 0.25rem;
    border-bottom: none;
    border-right: none;
    background-color: white;
}

/* 卡片选中时样式 */
 /deep/ .event .Pending .el-tabs__item.is-active {
    background-color: #1890ff;
    color: white;
}

#pane-全部{
    margin-top: -70px;
}

#pane-延期待审批的事件{
    margin-top: -70px;
}

/*分页样式*/
.pagination-container{
  margin-bottom: 30px;
}

/deep/ .el-tabs--card > .el-tabs__header{
  border: none;
}

/* 已标注字体颜色 */
.marked {
  color: #3bc2b4;
}
/* 未标注字体颜色 */
.unmarked {
  color: #999;
}

 span{
  position: relative;
  top: 37px;
  font-size: 14px;
}
</style>
