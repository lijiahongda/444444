<template>
  <div class="main">
    <!-- T1 -->
    <div class="tranbox">
      <p class="tran_title">用户基础信息</p>
      <div class="flweaway">
        <div class="tran_list">
          <div class="tran_text">
            <span class="txt_t">用户姓名:</span>
            <span class="txt_w">附笑笑</span>
          </div>
          <div class="tran_text">
            <span class="txt_t">用户姓名:</span>
            <span class="txt_w">附笑笑</span>
          </div>
          <div class="tran_text">
            <span class="txt_t">用户姓名:</span>
            <span class="txt_w">附笑笑</span>
          </div>
        </div>
        <div class="tran_list">
          <div class="tran_text">
            <span class="txt_t">用户姓名:</span>
            <span class="txt_w">附笑笑</span>
          </div>
          <div class="tran_text">
            <span class="txt_t">用户姓名:</span>
            <span class="txt_w">附笑笑</span>
          </div>
          <div class="tran_text">
            <span class="txt_t">用户姓名:</span>
            <span class="txt_w">附笑笑</span>
          </div>
        </div>
        <div class="tran_list">
          <div class="tran_text">
            <span class="txt_t">用户姓名:</span>
            <span class="txt_w">附笑笑</span>
          </div>
          <div class="tran_text">
            <span class="txt_t">用户姓名:</span>
            <span class="txt_w">附笑笑</span>
          </div>
          <div class="tran_text">
            <span class="txt_t">用户姓名:</span>
            <span class="txt_w">附笑笑</span>
          </div>
        </div>
      </div>
    </div>
    <!-- T2 -->
    <div class="tranbox">
      <p class="tran_title">账户信息</p>
      <div class="flweaway">
        <div class="tran_list">
          <div class="tran_text">
            <span class="txt_t">用户姓名:</span>
            <span class="txt_w">附笑笑</span>
          </div>
          <div class="tran_text">
            <span class="txt_t">用户姓名:</span>
            <span class="txt_w">附笑笑</span>
          </div>
          <div class="tran_text">
            <span class="txt_t">用户姓名:</span>
            <span class="txt_w">附笑笑</span>
          </div>
        </div>
        <div class="tran_list">
          <div class="tran_text">
            <span class="txt_t">用户姓名:</span>
            <span class="txt_w">附笑笑</span>
          </div>
          <div class="tran_text">
            <span class="txt_t">用户姓名:</span>
            <span class="txt_w">附笑笑</span>
          </div>
          <div class="tran_text">
            <span class="txt_t">用户姓名:</span>
            <span class="txt_w">附笑笑</span>
          </div>
        </div>
        <div class="tran_list">
          <div class="tran_text">
            <span class="txt_t">用户姓名:</span>
            <span class="txt_w">附笑笑</span>
          </div>
          <div class="tran_text">
            <span class="txt_t">用户姓名:</span>
            <span class="txt_w">附笑笑</span>
          </div>
          <div class="tran_text">
            <span class="txt_t">用户姓名:</span>
            <span class="txt_w">附笑笑</span>
          </div>
        </div>
      </div>
    </div>
    <!-- T3 -->
    <div class="tranbox">
      <p class="tran_title">推荐关系</p>
      <div class="flweaway">
        <div class="tran_list">
          <div class="tran_text">
            <span class="txt_t">用户姓名:</span>
            <span class="txt_w">附笑笑</span>
          </div>
          <div class="tran_text">
            <span class="txt_t">用户姓名:</span>
            <span class="txt_w">附笑笑</span>
          </div>
          <div class="tran_text">
            <span class="txt_t">用户姓名:</span>
            <span class="txt_w">附笑笑</span>
          </div>
        </div>
        <div class="tran_list">
          <div class="tran_text">
            <span class="txt_t">用户姓名:</span>
            <span class="txt_w">附笑笑</span>
          </div>
          <div class="tran_text">
            <span class="txt_t">用户姓名:</span>
            <span class="txt_w">附笑笑</span>
          </div>
          <div class="tran_text">
            <span class="txt_t">用户姓名:</span>
            <span class="txt_w">附笑笑</span>
          </div>
        </div>
        <div class="tran_list">
          <div class="tran_text">
            <span class="txt_t">用户姓名:</span>
            <span class="txt_w">附笑笑</span>
          </div>
          <div class="tran_text">
            <span class="txt_t">用户姓名:</span>
            <span class="txt_w">附笑笑</span>
          </div>
          <div class="tran_text">
            <span class="txt_t">用户姓名:</span>
            <span class="txt_w">附笑笑</span>
          </div>
        </div>
      </div>
    </div>
    <!-- T4 -->
    <div class="tranbox1">
      <p class="tran_title">用户基础信息</p>
      <div class="table_box">
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="date" label="日期" width="180"></el-table-column>
          <el-table-column prop="name" label="姓名" width="180"></el-table-column>
          <el-table-column prop="address" label="地址"></el-table-column>
        </el-table>
      </div>
    </div>
    <!-- T4 -->
    <div class="tranbox1">
      <p class="tran_title">近30天行为统计</p>
      
      <div class="aler_box">
        <div class="aler_item">
          <div>04:06:23</div>
          <div><i class="el-icon-collection-tag"></i> </div>
          <div>加入购物车</div>
        </div>
         <div class="aler_item">
          <div>04:06:23</div>
          <div><i class="el-icon-collection-tag"></i> </div>
          <div>加入购物车</div>
        </div>
         <div class="aler_item">
          <div>04:06:23</div>
          <div><i class="el-icon-collection-tag"></i> </div>
          <div>加入购物车</div>
        </div>
         <div class="aler_item">
          <div>04:06:23</div>
          <div><i class="el-icon-collection-tag"></i> </div>
          <div>加入购物车</div>
        </div>
      </div>
    </div>
    <!-- T4 -->
    <div class="tranbox1">
      <p class="tran_title">近30天行为统计</p>
      <div class="tranheader_add">
        <p>
          <i class="el-icon-document-add"></i>
          <span>7月30日</span>
        </p>
        <p>访问3次</p>
      </div>
      <div class="aler_box">
        <div class="aler_item">
          <div>04:06:23</div>
          <div><i class="el-icon-collection-tag"></i> </div>
          <div>加入购物车</div>
        </div>
         <div class="aler_item">
          <div>04:06:23</div>
          <div><i class="el-icon-collection-tag"></i> </div>
          <div>加入购物车</div>
        </div>
         <div class="aler_item">
          <div>04:06:23</div>
          <div><i class="el-icon-collection-tag"></i> </div>
          <div>加入购物车</div>
        </div>
         <div class="aler_item">
          <div>04:06:23</div>
          <div><i class="el-icon-collection-tag"></i> </div>
          <div>加入购物车</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },
  mounted() {},
  methods: {},
};
</script>
<style scoped>
.main {
  width: 100%;
  height: 100%;
  padding: 10px;
  background: #f5f5f5;
}
.tranbox {
  width: 100%;
  height: 200px;
  background: #fff;
  padding: 15px;
  border-bottom: 2px solid #f6f6f6;
}
.tranbox1 {
  width: 100%;
  background: #fff;
  padding: 15px;
  /* border-bottom: 2px solid #f6f6f6; */
}
.table_box {
  width: 100%;
  height: auto;
  overflow: auto;
}
.tran_title {
  width: 100%;
  font-size: 18px;
  color: #000;
  font-weight: 600;
}
.tranheader_add {
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #f6f6f6;
  padding: 0 10px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.flweaway {
  display: flex;
  justify-content: center;
  align-items: center;
}
.tran_list {
  width: 33%;
  padding-left: 25px;
}
.tran_text {
  line-height: 30px;
  width: 100%;
}
.aler_box{

}
.aler_item{
  display: flex;
    line-height: 40px;
    border-bottom: 1px solid #f5f5f5;
    padding: 0 10px;
}
</style>