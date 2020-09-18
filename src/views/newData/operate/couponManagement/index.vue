<template>
    <div class="main">
        <el-row :gutter="20">
            <el-col :span="6"><div class="leftname">优惠卷名称：</div></el-col>
            <el-col :span="6"><div><el-input v-model="input" placeholder="请输入内容"></el-input></div></el-col>
        </el-row>
        <el-row :gutter="8">
            <el-col :span="6"><div class="leftname">优惠券类型：</div></el-col>
            <el-col :span="6"><div class="leftname2"><el-radio v-model="radio" label="1">满减卷</el-radio></div></el-col>
        </el-row>
        <el-row :gutter="8">
            <el-col :span="6"><div class="leftname">&nbsp;</div></el-col>
            <el-col :span="1"><div class="leftname">满</div></el-col>
            <el-col :span="2"><div><el-input value="100" disabled="true"></el-input></div></el-col>
            <el-col :span="1"><div class="leftname">减</div></el-col>
            <el-col :span="2"><div><el-input value="10" disabled="true"></el-input></div></el-col>
        </el-row>


        <el-row :gutter="20">
            <el-col :span="6"><div class="leftname">选取优惠券标签：</div></el-col>
            <el-col :span="6"><div class="leftname"><el-input v-model="input" placeholder="请输入内容"></el-input></div></el-col>
            <el-col :span="3"><div class="leftname"><el-button type="primary">选取</el-button></div></el-col>
        </el-row>


        <el-row :gutter="20">
            <el-col :span="6"><div class="leftname">是否可赠：</div></el-col>
            <el-col :span="2"><div class="leftname2"><el-radio v-model="radio" label="1">是</el-radio></div></el-col>
            <el-col :span="2"><div class="leftname2"><el-radio v-model="radio" label="1">否</el-radio></div></el-col>
        </el-row>

        <el-row :gutter="20">
            <el-col :span="6"><div class="leftname">每人限领：</div></el-col>
            <el-col :span="6"><div><el-input v-model="input" placeholder="请输入内容"></el-input></div></el-col>
            <el-col :span="1"><div class="leftname">张</div></el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="6"><div class="leftname">会员类型：</div></el-col>
            <el-checkbox-group v-model="checkList" class="checkbox">
                <el-checkbox label="全部"></el-checkbox>
                <el-checkbox label="新用户"></el-checkbox>
                <el-checkbox label="注册会员"></el-checkbox>
                <el-checkbox label="金卡会员"></el-checkbox>
                <el-checkbox label="白金会员"></el-checkbox>
                <el-checkbox label="黑金会员"></el-checkbox>
            </el-checkbox-group>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="6"><div class="leftname">优惠券使用范围：</div></el-col>
            <el-radio-group v-model="radio2">
                <el-radio :label="1" class="leftname2">全场</el-radio>
                <el-radio :label="2" class="leftname2">品类</el-radio>
                <el-radio :label="3" class="leftname2">指定商品</el-radio>
            </el-radio-group>
        </el-row>

        <div v-if="radio2==2">
            <el-row :gutter="20">
                <el-col :span="6"><div class="leftname">会员类型：</div></el-col>
                <el-checkbox-group v-model="checkList2" class="checkbox">
                    <el-checkbox label="自营"></el-checkbox>
                    <el-checkbox label="京东"></el-checkbox>
                    <el-checkbox label="淘宝"></el-checkbox>
                    <el-checkbox label="拼多多"></el-checkbox>
                </el-checkbox-group>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="6"><div class="leftname">自营品类选择：</div></el-col>
                <el-col :span="6">
                    <div>
                        <el-select v-model="value" placeholder="请选择">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            :disabled="item.disabled">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="6"><div class="leftname">京东品类选择：</div></el-col>
                <el-col :span="6">
                    <div>
                        <el-select v-model="value" placeholder="请选择">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            :disabled="item.disabled">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="6"><div class="leftname">淘宝品类选择</div></el-col>
                <el-col :span="6">
                    <div>
                        <el-select v-model="value" placeholder="请选择">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            :disabled="item.disabled">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="6"><div class="leftname">拼多多品类选择</div></el-col>
                <el-col :span="6">
                    <div>
                        <el-select v-model="value" placeholder="请选择">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            :disabled="item.disabled">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>
            </el-row>   

        </div>
        <div v-if="radio2==3">
            <el-row :gutter="20">
                <el-col :span="6"><div class="leftname"><el-button type="primary">添加商品</el-button></div></el-col>
            </el-row>
            <el-row :gutter="20">
                <el-table
                    :data="tableData"
                    border
                    style="width: 600px"
                    >
                    <el-table-column
                    prop="title"
                    label="规则类型"
                    width="200">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="商品名称"
                    width="200">
                    </el-table-column>
                    <el-table-column width="200" label="操作">
                        <template slot-scope="scope">
                            <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-row>
        </div>
        <div v-if="radio2==1">
            <el-row :gutter="20">
                <el-col :span="6"><div class="leftname"><el-button type="primary">排除商品</el-button></div></el-col>
            </el-row>
            <el-row :gutter="20">
                <el-table
                    :data="tableData"
                    border
                    style="width: 600px"
                    >
                    <el-table-column
                    prop="title"
                    label="规则类型"
                    width="200">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="商品名称"
                    width="200">
                    </el-table-column>
                    <el-table-column width="200" label="操作">
                        <template slot-scope="scope">
                            <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-row>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            input:"",
            radio:1,
            radio2:1,
            checkList: ['全部'],
            checkList2:['自营'],
            tableData: [{
                title: '规则类型',
                name: '苹果',
                }, {
                title: '规则类型',
                name: '橘子',
                }, {
                title: '规则类型',
                name: '香蕉',
                }, {
                title: '规则类型',
                name: '西瓜',
            }],
            options: [{
                value: '选项1',
                label: '黄金糕'
                }, {
                value: '选项2',
                label: '双皮奶',
                disabled: true
                }, {
                value: '选项3',
                label: '蚵仔煎'
                }, {
                value: '选项4',
                label: '龙须面'
                }, {
                value: '选项5',
                label: '北京烤鸭'
            }],
        }
    }
}
</script>    
<style>
    .main{
        margin:30px;
    }
    .leftname{
        text-align: center;
        line-height: 36px;
    }
    .leftname2{
        line-height: 36px;
    }
    .checkbox{
        line-height: 36px;
    }
    .el-row {
    margin-bottom: 20px;
    &:last-child {
        margin-bottom: 0;
    }
    }
    .el-col {
    border-radius: 4px;
    }
    .bg-purple-dark {
    background: #99a9bf;
    }
    .bg-purple {
    background: #d3dce6;
    }
    .bg-purple-light {
    background: #e5e9f2;
    }
    .grid-content {
    border-radius: 4px;
    min-height: 36px;
    }
    .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
    }
</style>