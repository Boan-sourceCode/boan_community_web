<template>

    <el-carousel indicator-position="none">
      <el-carousel-item v-for="item in listimg" :key="item" style="overflow: hidden;">
        <img style="width: 100%;height: 100%;" :src="item" >
      </el-carousel-item>
      <!-- <div class="back" @click="back">
        返回引导页
      </div> -->
    </el-carousel>

</template>

<script>
  export default {
    name: "introduction",
    data() {
      return {
        listimg: [
          'https://my-test-bucket.ks3-cn-beijing.ksyuncs.com/20230526/1.png',
          'https://my-test-bucket.ks3-cn-beijing.ksyuncs.com/20230526/2.png',
          'https://my-test-bucket.ks3-cn-beijing.ksyuncs.com/20230526/3.png',
          'https://my-test-bucket.ks3-cn-beijing.ksyuncs.com/20230526/4.png',
          'https://my-test-bucket.ks3-cn-beijing.ksyuncs.com/20230526/5.png'

        ]
      }
    },
    methods: {
      back() {
        this.$router.push({ path: "/introduction" })
      }
    }
  }
</script>

<style scoped>
.back{
  position: fixed;
  top: 1.875rem;
  right: 3.875rem;
  margin: 0;
  padding: 0.375rem 0.75rem;
  border: 0.0625rem solid;
  color: #00F5FD;
  font-size: 18px;
  z-index: 999;
  cursor: pointer;
}
    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
      background-color: #d3dce6;
    }
    /deep/.el-carousel__container{
      height: 100vh;
    }
    /deep/.el-carousel__arrow{
      font-size: 3.75rem;
    }
</style>
