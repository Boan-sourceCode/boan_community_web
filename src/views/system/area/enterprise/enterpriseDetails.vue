<!--网格详情-->
<template>
  <div class="app-container">
    <div>
      <!-- 标题 -->
      <h1 class="title-font">企业信息</h1>
    </div>
    <div class="top">
      <div class="box image">
        <el-image :src="require('@/assets/images/building.jpg')" :fit="fit" class="img" v-if="enterprise.enterLogoPicture === ''"></el-image>
        <el-image :src="enterprise.enterLogoPicture" :fit="fit" class="img" v-else></el-image>
      </div>
      <div style="display: inline-block;width: 90%">
        <div style="margin-bottom: 10px">
          <!-- 企业标题 -->
          <h3 class="fontColor">{{enterprise.enterName}}</h3>
        </div>
        <div style="border-bottom: 1px solid #ccc;padding-bottom: 20px">
          <div class="box information">
            <p>组织类型： {{enterprise.groupType}}</p>
            <p>法定代表人：{{enterprise.legalRepresentName}}</p>
            <p>身份证号：{{enterprise.legalRepresentCertid}}</p>
            <p>法人代表联系方式:：{{enterprise.legalRepresentPhone}}</p>
          </div>
          <div class="box information">
            <p>企业类型：{{enterprise.enterType}}</p>
            <p>责任人：{{enterprise.securityChargeName}}</p>
            <p>身份证号：{{enterprise.securityChargeCertid}}</p>
            <p>负责人联系方式:：{{enterprise.securityChargePhone}}</p>
          </div>
          <div class="box information">
            <p>证件号码：{{enterprise.certRegisterNo}}</p>
          </div>
          <div class="box information">
            <p>登记机关：{{enterprise.registerAuthority}}</p>
          </div>
        </div>
        <div style="padding-top: 20px">
          <div class="box information">
            <p>企业人数：{{enterprise.enterPeopleNum}}人</p>
            <p>是否有中国党组织：{{enterprise.chinaPartyOrg}}</p>
            <p>中共党员数量：{{enterprise.cpcPartymemberNum}}<span v-if="enterprise.cpcPartymemberNum">人</span></p>
          </div>
          <div class="box information">
            <p>关注程度：{{enterprise.concernDegree}}</p>
            <p>是否有工会：{{enterprise.labourUnion}}</p>
            <p>工会会员数量：{{enterprise.labourMemberNum}}<span v-if="enterprise.labourMemberNum">人</span></p>
          </div>
          <div class="box information">
            <p>是否有境外背景：{{enterprise.overseaBackgroud}}</p>
            <p>是否有妇联组织：{{enterprise.womenOrganization}}</p>
            <p>妇女数量：{{enterprise.womenNum}}<span v-if="enterprise.womenNum">人</span></p>
          </div>
          <div class="box information">
            <p>资金来源：{{enterprise.fundsSource}}</p>
          </div>
          <p style="font-size: 12px">简介：
            <span style="color: #999" v-if="enterprise.briefIntroduction === '' || enterprise.briefIntroduction === null">暂无</span>
            <span style="color: #999" v-else>{{enterprise.briefIntroduction}}</span>
          </p>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {getEnterprise} from "@/api/area/enterprise";

export default {
    name: "enterpriseDetails",
    data() {
        return {
          fit: 'contain', // img图片填充方式
          enterprise: {}, //详情页面数据
        };
    },
    mounted() {
      this.getEnterpriseInfo()
    },
    methods: {
      //获取企业信息详情
      getEnterpriseInfo() {
        this.loading = true;
        let enterpriseId = this.$route.query.enterpriseId
        getEnterprise(enterpriseId).then(res => {
          if(res.code === 200){
            this.enterprise = res.data;
            if (this.enterprise.enterLogoPicture !== "" && this.enterprise.enterLogoPicture !== null){
              this.enterprise.enterLogoPicture = process.env.VUE_APP_BASE_API + this.enterprise.enterLogoPicture
            }else {
              this.enterprise.enterLogoPicture = ''
            }
            console.log(this.enterprise)
          }
        });
      },
    }
}
</script>

<style scoped>
/*第一个卡片*/
.top{
  padding: 30px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
}
/* 标题样式 */
.title-font {
  text-align: center;
  font-weight: bold;
}
/* 企业标题样式 */
.fontColor {
  margin: 0;
  padding: 0;
  font-weight: bold;
}
/*公共样式*/
.box{
  margin-right: 10px;
  width: 24%;
  display: inline-block;
  vertical-align: top;
}
/*社区图片*/
.image{
  width: 140px;
  height: 140px;
}
.image img{
  width: 100%;
  height: 100%;
}
/*社区信息*/
.information p{
  font-size: 14px;
  margin: 6px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/*网格员头像*/
.grid{
  width: 20%;
}
.gridImg{
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #E6EDFF;
}
.grid p , .grid span{
  font-size: 14px;
  white-space: normal;
  margin-top: 0;
}
.grid div{
  height: 100%;
  display: inline-block;
  overflow: hidden;
}
.master{
  width:26%;
  margin-right:2%
}
.master p{
  text-align: center;
}
.member{
  width: 72%;
}
/*网格成员单独样式*/
.personnel{
  width: 30%;
}
.personnel .master{
  width: 17%;
}
.personnel .member{
  padding-right: 10%
}

</style>
