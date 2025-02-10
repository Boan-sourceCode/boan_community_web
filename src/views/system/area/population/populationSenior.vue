<!-- 实有人口高级 -->
<template>
	<div class="app-container">
		<h1 class="title-font">人口高级查询/检索</h1>
		<queryPeople></queryPeople>
	</div>
</template>

<script>
import queryPeople from '../querySon/queryPeople'
export default {
	name: "populationSenior",
	components: {
		queryPeople,
	},
	data() {
		return {}
	},
};
</script>
<style scoped>
/* 标题样式 */

.title-font {
	text-align: center;
	font-weight: bold;
}
</style>
