<template>
  <!--<table v-if="s_showByRow" :style="styleObject" class="mailTable" width="90%">-->
    <!--<tr v-for="index in rowCount" >-->
      <!--<td class="column borderHeight">{{ tableData[index*2-2].key }}</td>-->
      <!--<td class="borderHeight">{{ tableData[index*2-2].value }}</td>-->
      <!--<td class="column borderHeight">{{ tableData[index*2-1] !== undefined ? tableData[index*2-1].key : '' }}</td>-->
      <!--<td class="borderHeight">{{ tableData[index*2-1] !== undefined ? tableData[index*2-1].value : '' }}</td>-->
    <!--</tr>-->
  <!--</table>-->
  <!--<table v-else :style="styleObject" class="mailTable">-->
    <!--<tr v-for="index in rowCount">-->
      <!--<td class="column borderHeight">{{ tableData[index-1].key }}</td>-->
      <!--<td class="borderHeight">{{ tableData[index-1].value }}</td>-->
      <!--<td class="column borderHeight">{{ tableData[rowCount+index-1] !== undefined ? tableData[rowCount+index-1].key : '' }}</td>-->
      <!--<td class="borderHeight" >{{ tableData[rowCount+index-1] !== undefined ? tableData[rowCount+index-1].value : '' }}</td>-->
    <!--</tr>-->
  <!--</table>-->
	<div class="vertical-from" v-if="s_showByRow">
		<div v-for="index in rowCount">
			<el-row>
				<el-col :span="12"><div class="grid-content bg-purple">{{ tableData[index*2-2].key }}：</div></el-col>
				<el-col :span="12"><div class="grid-content bg-purple-light">{{ tableData[index*2-2].value }}</div></el-col>
			</el-row>
			<el-row>
				<el-col :span="12"><div class="grid-content bg-purple">{{ tableData[index*2-1] !== undefined ? tableData[index*2-1].key : '' }}：</div></el-col>
				<el-col :span="12"><div class="grid-content bg-purple-light">{{ tableData[rowCount+index-1] !== undefined ? tableData[rowCount+index-1].value : '' }}</div></el-col>
			</el-row>
		</div>
	</div>
	<div class="vertical-from" v-else>
		<div v-for="index in rowCount">
			<el-row>
				<el-col :span="12"><div class="grid-content bg-purple">{{ tableData[index-1].key }}：</div></el-col>
				<el-col :span="12"><div class="grid-content bg-purple-light">{{ tableData[index-1].value }}</div></el-col>
			</el-row>
			<el-row>
				<el-col :span="12"><div class="grid-content bg-purple">{{ tableData[rowCount+index-1] !== undefined ? tableData[rowCount+index-1].key : '' }}：</div></el-col>
				<el-col :span="12"><div class="grid-content bg-purple-light">{{ tableData[rowCount+index-1] !== undefined ? tableData[rowCount+index-1].value : '' }}</div></el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
export default {
  props: ['tableData', 'tableStyle', 'showByRow'],
  data() {
    return {
      styleObject: {},
      s_showByRow: true
    }
  },
  computed: {
    rowCount: function() {
      return Math.ceil(this.tableData.length / 2)
    }
  },
  created() {
    this.styleObject = this.tableStyle
    if (this.showByRow !== undefined) {
      this.s_showByRow = this.showByRow
    }
  }
}
</script>
<style lang="scss" scoped>
	.el-row {
		margin-bottom: 10px;
		/*margin-right: 1%;*/
		float: left;
		width: 50%;
		height: 40px;
		line-height: 40px;
		// background-image: linear-gradient(to right , rgba(255, 106, 55, 1), #ffffff);
		background-image: linear-gradient(to right , #dfc289, #ffffff);
		border-radius: 40px;
		.el-col{
			margin-right: 10px;
		}
	&:last-child {
		 margin-bottom: 0;
	 }
	}


	.grid-content {
		border-radius: 4px;
		min-height: 36px;
	}
	.row-bg {
		padding: 10px 0;
		background-color: #f9fafc;
	}.borderHeight {
  border: 1px solid #ddd;
  height: 50px;
  padding-left: 10px;
}
.el-table--border, .el-table--group{
  /* border:none */
  width:64.3%
}
.el-table--border::after, .el-table--group::after, .el-table::before{
  /* background-color: none */
}
.vertical-from{
	width: 80%;
	min-width: 1000px;
	/*margin: 0 auto;*/
	.el-col:nth-child(1) {
		border-radius: 100px;
		padding-left: 20px;
		width: 30%;
		border-right: 2px dotted #fff;
	}
	.el-col:nth-child(2) {
		border-radius: 4px;
		padding-left: 20px;
		width: 70%;
	}
}
</style>
