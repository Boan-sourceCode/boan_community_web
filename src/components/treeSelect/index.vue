<template>
  <el-select
    ref="select"
    :value="valueTitle"
    :clearable="clearable"
    @clear="clearHandle"
    :placeholder="placeholder"
    :disabled="disabled"
  >
    <el-option :value="valueTitle" :label="valueTitle" class="options">
      <el-tree
        id="tree-option"
        ref="selectTree"
        :accordion="accordion"
        :data="options"
        :props="props"
        :node-key="nodeKey"
        :default-expanded-keys="defaultExpandedKey"
        @node-click="handleNodeClick"
      >
      </el-tree>
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: "el-tree-select",
  data() {
    return {
      valueId: this.value, // 初始值
      valueTitle: "",
      defaultExpandedKey: [],
    };
  },
  // v-model双向绑定
  model: {
    prop: "value",
    event: "selected",
  },
  props: {
    /* 配置项 */
    props: {
      type: Object,
      default: () => {
        return {
          value: "id", // ID字段名
          label: "title", // 显示名称
          children: "children", // 子级字段名
        };
      },
    },
    nodeKey: {
      type: String,
      default: "id",
    },
    /* 选项列表数据(树形结构的对象数组) */
    options: {
      type: Array,
      default: () => {
        return [];
      },
    },
    /* 初始值 */
    value: {
      type: [Number, String],
      default: "",
    },
    /* 可清空选项 */
    clearable: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
    /*
      是否禁用改下拉选择框
      默认是不禁用
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /* 自动收起 */
    accordion: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    placeholder: {
      type: String,
      default: () => {
        return "请选择";
      },
    },
  },

  created() {
    this.initHandle();
  },
  watch: {
    value() {
      // console.log(this.value)
      this.valueId = this.value;
      this.initHandle();
    },
  },

  methods: {
    initHandle() {
      if (this.valueId) {
        this.$nextTick(() => {
          // console.log(this.$refs.selectTree.getNode(this.valueId)

          this.valueTitle = this.$refs.selectTree.getNode(this.valueId).data[
            this.props.label
          ]; // 初始化显⽰
          this.$refs.selectTree.setCurrentKey(this.valueId); // 设置默认选中
          this.defaultExpandedKey = [this.valueId]; // 设置默认展开
        });
      }
      this.initScroll();
    },

    // 初始化滚动条
    initScroll() {
      this.$nextTick(() => {
        const scrollWrap = document.querySelectorAll(
          ".el-scrollbar .el-select-dropdown__wrap"
        )[0];
        const scrollBar = document.querySelectorAll(
          ".el-scrollbar .el-scrollbar__bar"
        );
        scrollWrap.style.cssText =
          "margin: 0px; max-height: none; overflow: hidden;";
        scrollBar.forEach((ele) => (ele.style.width = 0));
      });
    },

    // 切换选项
    handleNodeClick(node) {
      this.$emit("getValue", node);
      this.$emit("selected", node.id); //model绑定
      this.defaultExpandedKey = [this.valueId];
      this.$refs.select.blur();
    },

    // 清除选中
    clearHandle() {
      this.valueTitle = "";
      this.valueId = null;
      this.defaultExpandedKey = [];
      this.clearSelected();
      this.$emit("getValue", null);
      this.$emit("selected", null); // 清除model绑定
    },

    /* 清空选中样式 */
    clearSelected() {
      const allNode = document.querySelectorAll("#tree-option .el-tree-node");
      allNode.forEach((element) => element.classList.remove("is-current"));
    },
  },
};
</script>
<style scoped>
.el-scrollbar .el-scrollbar__view .el-select-dropdown__item {
  height: auto;
  max-height: 274px;
  padding: 0;
  overflow: hidden;
  overflow-y: auto;
}

.el-select-dropdown__item.selected {
  font-weight: normal;
}

ul li >>> .el-tree .el-tree-node__content {
  height: auto;
  padding: 0 20px;
}

.el-tree-node__label {
  font-weight: normal;
}

.el-tree >>> .is-current .el-tree-node__label {
  color: #409eff;
  font-weight: 700;
}

.el-tree >>> .is-current .el-tree-node__children .el-tree-node__label {
  color: #606266;
  font-weight: normal;
}
</style>
