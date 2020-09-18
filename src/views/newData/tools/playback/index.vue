<template>
	<div style="padding:20px">
		<el-form ref="form" label-width="120px" :inline="true">
			<el-form-item label="直播用户id：">
				<el-input v-model="obj.live_mid" placeholder="请输入直播用户id"  clearable />
			</el-form-item>
			<el-form-item label="开始时间" prop="starttime">
				<el-date-picker v-model="obj.stime" type="date" value-format="yyyy-MM-dd" placeholder="开始时间" clearable />
			</el-form-item>
			<el-form-item label="结束时间" prop="endtime">
				<el-date-picker v-model="obj.etime" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="结束时间" clearable />
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSearch">搜索</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="tableData.data" border style="width: 100%">
			<el-table-column  align="center" label="id" width="80" prop="id"></el-table-column>
			<el-table-column  align="center" label="标题"  prop="live_title"></el-table-column>
			<el-table-column  align="center" label="直播用户id"  prop="live_mid"></el-table-column>
			<el-table-column  align="center" label="排序"  prop="sort"></el-table-column>
			<el-table-column  align="center" label="浏览数"  prop="view_num"></el-table-column>
      <el-table-column  align="center" label="是否显示"  prop="is_show"></el-table-column>
			<el-table-column  align="center" prop="start_time" label="开始时间" width="180"></el-table-column>
			<el-table-column  align="center" prop="end_time" label="结束时间" width="180"></el-table-column>
			<el-table-column  align="center" prop="created_at" label="创建时间" width="180"></el-table-column>
			<el-table-column align="center" prop="" label="操作" width="180">id
				<template slot-scope="scope">
					<el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
					<el-button size="mini" @click="handleDel(scope.row.id)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="pagination-container" style="text-align:right;">
			<el-pagination  @current-change="handleCurrentChange"
							:current-page="tableData.page" :page-size="tableData.pageSize"
							layout="total, prev, pager, next, jumper" :total="tableData.total">
			</el-pagination>
		</div>
		<el-dialog title="配置信息" :visible.sync="dialogFormVisible"  width="80%">
			<el-dialog :visible.sync="videoDialog" :before-close="videoDialogVisibleClick" append-to-body  width="70%">
				<video id="video" style="margin: 0 auto;width: 100%;" height="400" :src="form.video_url"  autoplay="autoplay" controls="controls">您的浏览器不支持视频</video>
			</el-dialog>
			<el-form :model="form">
				<el-form-item label="标题:" :label-width="formLabelWidth">
					{{form.live_title}}
				</el-form-item>
				<el-form-item label="上下架:" :label-width="formLabelWidth">
					<el-radio-group v-model="form.is_show">
						<el-radio :label="1">正常</el-radio>
						<el-radio :label="2">下架</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="排序:" :label-width="formLabelWidth">
					<el-input v-model="form.sort" type='number' autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="视频封面:" :label-width="formLabelWidth">
					<el-image :src="form.live_cover" style="height: 200px;" fit="contain"></el-image>
				</el-form-item>
				<el-form-item label="视频:" :label-width="formLabelWidth">
					<el-button type="primary" size="mini" @click="videoDialog=true">查看视频</el-button>

				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="handleSave">确 定</el-button>
			</div>

		</el-dialog>

	</div>
</template>

<script>
  import {
    playbackList,
    playbackEdit,
    playbackDel
  } from '@/api/shops'
  export default {
    data() {
      return {
        videoDialog:false,
        tableData: [],
        formLabelWidth: '120px',
        dialogFormVisible:false,
        fy: {
          page: 1, //当前页
          page_size: 10, //每页条数
        },
        handleStatus: '',
        form:{},
        total: 0, //总条数
        pageIndex: 1,
        obj: {
          page: this.pageIndex,
        }
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      videoDialogVisibleClick(){
        let video = document.getElementById("video");
        video.pause();
        this.videoDialog = false;
      },
      handleSave(){
        let params = {
          id: this.form.id,
          is_show: this.form.is_show,
          sort: this.form.sort,
          view_num: this.form.view_num,
		}
        playbackEdit(params).then(res=>{
          if(res.data.code == 200){
            this.$message.success(res.data.msg)
            this.getList()
          }else{
            this.$message.error(res.data.message || '数据加载失败,请检查网络')
          }
          this.form = {}
        })
        this.dialogFormVisible = false;
      },
      onSearch() {
        this.obj.page = 1;
        this.getList(this.obj)
      },
      handleDel(id){
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          playbackDel({ id: id }).then(res => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg)
              this.getList()
            } else {
              this.$message.error(res.data.message || '数据加载失败,请检查网络')
            }
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        })
      },
      getList() {
        playbackList(this.obj).then((res) => {
          if (res.data.code == 200) {
            this.tableData = res.data
          } else {
            this.$message.error(res.data.message || '数据加载失败,请检查网络')
          }

        })
      },
      handleEdit(row) {
        this.form = row
        this.dialogFormVisible = true;
        this.handleStatus = 2;
      },
      handleCurrentChange(val) {
        this.obj.page = val;
        this.getList()
      },
    }
  }

</script>
<style scoped="scoped" lang="scss">
	.el-table{
		margin-top: 20px;
	}
</style>
