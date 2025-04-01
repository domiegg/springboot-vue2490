<template>
	<div class="main-content">
		<!-- 列表页 -->
		<template v-if="showFlag">
			<el-form class="center-form-pv" :style='{"width":"95%","margin":"0 0 20px"}' :inline="true" :model="searchForm">
				<el-row :style='{"display":"block"}' >
					<div :style='{"margin":"0 15px 0 0","display":"inline-block"}'>
						<label :style='{"margin":"0 10px 0 0","color":"#666","display":"inline-block","lineHeight":"40px","fontSize":"14px","fontWeight":"600","height":"40px"}' class="item-label">菜品名称</label>
						<el-input v-model="searchForm.caipinmingcheng" placeholder="菜品名称" clearable></el-input>
					</div>
					<div :style='{"margin":"0 15px 0 0","display":"inline-block"}' class="select" label="菜品分类" prop="caipinfenlei">
						<label :style='{"margin":"0 10px 0 0","color":"#666","display":"inline-block","lineHeight":"40px","fontSize":"14px","fontWeight":"600","height":"40px"}' class="item-label">菜品分类</label>
						<el-select  @change="caipinfenleiChange" clearable v-model="searchForm.caipinfenlei" placeholder="请选择菜品分类">
							<el-option v-for="(item,index) in caipinfenleiOptions" v-bind:key="index" :label="item" :value="item"></el-option>
						</el-select>
					</div>
					<div :style='{"margin":"0 15px 0 0","display":"inline-block"}'>
						<label :style='{"margin":"0 10px 0 0","color":"#666","display":"inline-block","lineHeight":"40px","fontSize":"14px","fontWeight":"600","height":"40px"}' class="item-label">口味</label>
						<el-input v-model="searchForm.kouwei" placeholder="口味" clearable></el-input>
					</div>
					<div :style='{"margin":"0 15px 0 0","display":"inline-block"}'>
						<label :style='{"margin":"0 10px 0 0","color":"#666","display":"inline-block","lineHeight":"40px","fontSize":"14px","fontWeight":"600","height":"40px"}' class="item-label">商家名称</label>
						<el-input v-model="searchForm.shangjiamingcheng" placeholder="商家名称" clearable></el-input>
					</div>
					<div :style='{"margin":"0 15px 0 0","display":"inline-block"}'>
						<label :style='{"margin":"0 10px 0 0","color":"#666","display":"inline-block","lineHeight":"40px","fontSize":"14px","fontWeight":"600","height":"40px"}' class="item-label">价格</label>
						<el-input v-model="searchForm.pricestart" placeholder="最小价格" clearable></el-input>
					</div>
					<div :style='{"margin":"0 15px 0 0","display":"inline-block"}' :label="'至'">
						<el-input v-model="searchForm.priceend" placeholder="最大价格" clearable></el-input>
					</div>
					<el-button :style='{"border":"0","cursor":"pointer","padding":"0 24px","outline":"none","color":"rgba(255, 197, 35, 1)","borderRadius":"4px","background":"rgba(90, 67, 74, 1)","width":"auto","fontSize":"14px","height":"40px"}' type="success" @click="search()">查询</el-button>
				</el-row>

				<el-row :style='{"margin":"20px 0","display":"flex"}'>
					<el-button :style='{"border":"0","cursor":"pointer","padding":"0 24px","margin":"0 10px 0 0","outline":"none","color":"rgba(255, 197, 35, 1)","borderRadius":"40px","background":"rgba(90, 67, 74, 1)","width":"auto","fontSize":"14px","height":"40px"}' v-if="isAuth('caipinxinxi','新增')" type="success" @click="addOrUpdateHandler()">新增</el-button>
					<el-button :style='{"border":"0","cursor":"pointer","padding":"0 24px","margin":"0 10px 0 0","outline":"none","color":"rgba(255, 197, 35, 1)","borderRadius":"40px","background":"rgba(90, 67, 74, 1)","width":"auto","fontSize":"14px","height":"40px"}' v-if="isAuth('caipinxinxi','删除')" :disabled="dataListSelections.length <= 0" type="danger" @click="deleteHandler()">删除</el-button>




					<el-button :style='{"border":"0","cursor":"pointer","padding":"0 24px","margin":"0 10px 0 0","outline":"none","color":"rgba(255, 197, 35, 1)","borderRadius":"40px","background":"rgba(90, 67, 74, 1)","width":"auto","fontSize":"14px","height":"40px"}' v-if="isAuth('caipinxinxi','菜品分类统计')" type="warning" @click="chartDialog1()">菜品分类统计</el-button>
					<el-button :style='{"border":"0","cursor":"pointer","padding":"0 24px","margin":"0 10px 0 0","outline":"none","color":"rgba(255, 197, 35, 1)","borderRadius":"40px","background":"rgba(90, 67, 74, 1)","width":"auto","fontSize":"14px","height":"40px"}' v-if="isAuth('caipinxinxi','菜品库存统计')" type="warning" @click="chartDialog2()">菜品库存统计</el-button>
				</el-row>
			</el-form>
			
			<!-- <div> -->
				<el-table class="tables"
					:stripe='false'
					:style='{"width":"95%","padding":"0","borderColor":"#ddd","borderStyle":"solid","borderWidth":"1px","background":"#fff"}' 
					v-if="isAuth('caipinxinxi','查看')"
					:data="dataList"
					v-loading="dataListLoading"
				@selection-change="selectionChangeHandler">
					<el-table-column :resizable='true' type="selection" align="center" width="50"></el-table-column>
					<el-table-column :resizable='true' :sortable='false' label="索引" type="index" width="50" />
					<el-table-column :resizable='true' :sortable='false'  
						prop="caipinmingcheng"
					label="菜品名称">
						<template slot-scope="scope">
							{{scope.row.caipinmingcheng}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='false'  
						prop="caipinfenlei"
					label="菜品分类">
						<template slot-scope="scope">
							{{scope.row.caipinfenlei}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='false' prop="caipinfengmian" width="200" label="菜品封面">
						<template slot-scope="scope">
							<div v-if="scope.row.caipinfengmian">
								<img v-if="scope.row.caipinfengmian.substring(0,4)=='http'" :src="scope.row.caipinfengmian.split(',')[0]" width="100" height="100">
								<img v-else :src="$base.url+scope.row.caipinfengmian.split(',')[0]" width="100" height="100">
							</div>
							<div v-else>无图片</div>
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='false'  
						prop="kouwei"
					label="口味">
						<template slot-scope="scope">
							{{scope.row.kouwei}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='false'  
						prop="cailiao"
					label="材料">
						<template slot-scope="scope">
							{{scope.row.cailiao}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='false'  
						prop="yingyangchengfen"
					label="营养成分">
						<template slot-scope="scope">
							{{scope.row.yingyangchengfen}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='false'  
						prop="zhizuogongyi"
					label="制作工艺">
						<template slot-scope="scope">
							{{scope.row.zhizuogongyi}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='false'  
						prop="shangjiazhanghao"
					label="商家账号">
						<template slot-scope="scope">
							{{scope.row.shangjiazhanghao}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='false'  
						prop="shangjiamingcheng"
					label="商家名称">
						<template slot-scope="scope">
							{{scope.row.shangjiamingcheng}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='false'  
						prop="shangjiadizhi"
					label="商家地址">
						<template slot-scope="scope">
							{{scope.row.shangjiadizhi}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='false'  
						prop="lianxishouji"
					label="联系手机">
						<template slot-scope="scope">
							{{scope.row.lianxishouji}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='false'  
						prop="onelimittimes"
					label="单限">
						<template slot-scope="scope">
							{{scope.row.onelimittimes}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='false'  
						prop="alllimittimes"
					label="库存">
						<template slot-scope="scope">
							{{scope.row.alllimittimes}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='false'  
						prop="price"
					label="价格">
						<template slot-scope="scope">
							{{scope.row.price}}
						</template>
					</el-table-column>
					<el-table-column width="300" label="操作">
						<template slot-scope="scope">
							<el-button :style='{"border":"1px solid #5A434A","cursor":"pointer","padding":"0 24px","margin":"0 10px 5px 0","outline":"none","color":"#5A434A","borderRadius":"4px","background":"rgba(255, 255, 255, 1)","width":"auto","fontSize":"14px","height":"32px"}' v-if=" isAuth('caipinxinxi','查看')" type="success" size="mini" @click="addOrUpdateHandler(scope.row.id,'info')">详情</el-button>
							<el-button :style='{"border":"1px solid #5A434A","cursor":"pointer","padding":"0 24px","margin":"0 10px 5px 0","outline":"none","color":"#5A434A","borderRadius":"4px","background":"rgba(255, 255, 255, 1)","width":"auto","fontSize":"14px","height":"32px"}' v-if=" isAuth('caipinxinxi','修改')" type="primary" size="mini" @click="addOrUpdateHandler(scope.row.id)">修改</el-button>


							<el-button :style='{"border":"1px solid #5A434A","cursor":"pointer","padding":"0 24px","margin":"0 10px 5px 0","outline":"none","color":"#5A434A","borderRadius":"4px","background":"rgba(255, 255, 255, 1)","width":"auto","fontSize":"14px","height":"32px"}' v-if="isAuth('caipinxinxi','查看评论')" type="primary" size="mini" @click="disscussListHandler(scope.row.id)">查看评论</el-button>



							<el-button :style='{"border":"1px solid #5A434A","cursor":"pointer","padding":"0 24px","margin":"0 10px 5px 0","outline":"none","color":"#5A434A","borderRadius":"4px","background":"rgba(255, 255, 255, 1)","width":"auto","fontSize":"14px","height":"32px"}' v-if="isAuth('caipinxinxi','删除') " type="danger" size="mini" @click="deleteHandler(scope.row.id)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination
					@size-change="sizeChangeHandle"
					@current-change="currentChangeHandle"
					:current-page="pageIndex"
					background
					:page-sizes="[10, 20, 30, 50]"
					:page-size="pageSize"
					:layout="layouts.join()"
					:total="totalPage"
					prev-text="<"
					next-text=">"
					:hide-on-single-page="false"
					:style='{"padding":"0","margin":"20px 0 0","whiteSpace":"nowrap","color":"#333","textAlign":"center","width":"95%","fontWeight":"500"}'
				></el-pagination>
			<!-- </div> -->
		</template>
		
		<!-- 添加/修改页面  将父组件的search方法传递给子组件-->
		<add-or-update v-if="addOrUpdateFlag" :parent="this" ref="addOrUpdate"></add-or-update>





		<el-dialog
		  title="菜品分类统计"
		  :visible.sync="chartVisiable1"
		  width="800">
			<div id="caipinfenleiChart1" style="width:100%;height:600px;"></div>
		  <span slot="footer" class="dialog-footer">
			<el-button @click="chartDialog1">返回</el-button>
		  </span>
		</el-dialog>
		<el-dialog
		  title="菜品库存统计"
		  :visible.sync="chartVisiable2"
		  width="800">
			<div id="alllimittimesChart2" style="width:100%;height:600px;"></div>
		  <span slot="footer" class="dialog-footer">
			<el-button @click="chartDialog2">返回</el-button>
		  </span>
		</el-dialog>
	</div>
</template>

<script>
import * as echarts from 'echarts'
import axios from 'axios'
import AddOrUpdate from "./add-or-update";
export default {
  data() {
    return {
      caipinfenleiOptions: [],
      searchForm: {
        key: ""
      },
      form:{},
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      showFlag: true,
      sfshVisiable: false,
      shForm: {},
      chartVisiable: false,
      chartVisiable1: false,
      chartVisiable2: false,
      chartVisiable3: false,
      chartVisiable4: false,
      chartVisiable5: false,
      addOrUpdateFlag:false,
      layouts: ["total","prev","pager","next","sizes","jumper"],


    };
  },
  created() {
    this.init();
    this.getDataList();
    this.contentStyleChange()
  },
  mounted() {
  },
  filters: {
    htmlfilter: function (val) {
      return val.replace(/<[^>]*>/g).replace(/undefined/g,'');
    }
  },
  components: {
    AddOrUpdate,
  },
  methods: {

    contentStyleChange() {
      this.contentPageStyleChange()
    },
    // 分页
    contentPageStyleChange(){
      let arr = []

      // if(this.contents.pageTotal) arr.push('total')
      // if(this.contents.pageSizes) arr.push('sizes')
      // if(this.contents.pagePrevNext){
      //   arr.push('prev')
      //   if(this.contents.pagePager) arr.push('pager')
      //   arr.push('next')
      // }
      // if(this.contents.pageJumper) arr.push('jumper')
      // this.layouts = arr.join()
      // this.contents.pageEachNum = 10
    },



//统计接口
    chartDialog1() {
      this.chartVisiable1 = !this.chartVisiable1;
      this.$nextTick(()=>{

        var caipinfenleiChart1 = echarts.init(document.getElementById("caipinfenleiChart1"),'macarons');
        this.$http({
            url: "caipinxinxi/group/caipinfenlei",
            method: "get",
        }).then(({ data }) => {
            if (data && data.code === 0) {
                let res = data.data;
                let xAxis = [];
                let yAxis = [];
                let pArray = []
                for(let i=0;i<res.length;i++){
                    xAxis.push(res[i].caipinfenlei);
                    yAxis.push(parseFloat((res[i].total)));
                    pArray.push({
                        value: parseFloat((res[i].total)),
                        name: res[i].caipinfenlei
                    })
                }
                var option = {};
                option = {
                        title: {
                            text: '菜品分类统计',
                            left: 'center'
                        },
                        legend: {
                          orient: 'vertical',
                          left: 'left'
                        },
                        tooltip: {
                          trigger: 'item',
                          formatter: '{b} : {c} ({d}%)'
                        },
                        series: [
                            {
                                type: 'pie',
                                radius: ['25%', '55%'],
                                center: ['50%', '60%'],
                                data: pArray,
                                emphasis: {
                                    itemStyle: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                                }
                            }
                        ]
                };
                // 使用刚指定的配置项和数据显示图表。
                caipinfenleiChart1.setOption(option);
                  //根据窗口的大小变动图表
                window.onresize = function() {
                    caipinfenleiChart1.resize();
                };
            }
        });
      })
    },

//统计接口
    chartDialog2() {
      this.chartVisiable2 = !this.chartVisiable2;
      this.$nextTick(()=>{
        // caipinmingcheng caipinmingcheng
        //  alllimittimes

        var alllimittimesChart2 = echarts.init(document.getElementById("alllimittimesChart2"),'macarons');
        this.$http({
            url: `caipinxinxi/value/caipinmingcheng/alllimittimes`,
            method: "get",
        }).then(({ data }) => {
            if (data && data.code === 0) {
                let res = data.data;
                let xAxis = [];
                let yAxis = [];
                let pArray = []
                for(let i=0;i<res.length;i++){
                    xAxis.push(res[i].caipinmingcheng);
                    yAxis.push(parseFloat((res[i].total)));
                    pArray.push({
                        value: parseFloat((res[i].total)),
                        name: res[i].caipinmingcheng
                    })
                }
                var option = {};
                option = {
                    title: {
                        text: '菜品库存统计',
                        left: 'center'
                    },
                    tooltip: {
                      trigger: 'item',
                      formatter: '{b} : {c}'
                    },
                    xAxis: {
                        type: 'category',
                        data: xAxis
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: yAxis,
                        type: 'bar'
                    }]
                };
                // 使用刚指定的配置项和数据显示图表。
                alllimittimesChart2.setOption(option);
                  //根据窗口的大小变动图表
                window.onresize = function() {
                    alllimittimesChart2.resize();
                };
            }
        });
      })
    },




    init () {
          this.$http({
            url: `option/caipinfenlei/caipinfenlei`,
            method: "get"
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.caipinfenleiOptions = data.data;
            } else {
              this.$message.error(data.msg);
            }
          });
    },
    search() {
      this.pageIndex = 1;
      this.getDataList();
    },

    // 获取数据列表
    getDataList() {
      this.dataListLoading = true;
      let params = {
        page: this.pageIndex,
        limit: this.pageSize,
        sort: 'id',
        order: 'desc',
      }
           if(this.searchForm.caipinmingcheng!='' && this.searchForm.caipinmingcheng!=undefined){
            params['caipinmingcheng'] = '%' + this.searchForm.caipinmingcheng + '%'
          }
           if(this.searchForm.caipinfenlei!='' && this.searchForm.caipinfenlei!=undefined){
            params['caipinfenlei'] = this.searchForm.caipinfenlei
          }
           if(this.searchForm.kouwei!='' && this.searchForm.kouwei!=undefined){
            params['kouwei'] = '%' + this.searchForm.kouwei + '%'
          }
           if(this.searchForm.shangjiamingcheng!='' && this.searchForm.shangjiamingcheng!=undefined){
            params['shangjiamingcheng'] = '%' + this.searchForm.shangjiamingcheng + '%'
          }
           if(this.searchForm.pricestart!='' && this.searchForm.pricestart!=undefined ){
            params['pricestart'] = this.searchForm.pricestart
          }
          if(this.searchForm.priceend!='' && this.searchForm.priceend!=undefined){
            params['priceend'] = this.searchForm.priceend
          }
      this.$http({
        url: "caipinxinxi/page",
        method: "get",
        params: params
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.dataList = data.data.list;
          this.totalPage = data.data.total;
        } else {
          this.dataList = [];
          this.totalPage = 0;
        }
        this.dataListLoading = false;
      });
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.getDataList();
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val;
      this.getDataList();
    },
    // 多选
    selectionChangeHandler(val) {
      this.dataListSelections = val;
    },
    // 添加/修改
    addOrUpdateHandler(id,type) {
      this.showFlag = false;
      this.addOrUpdateFlag = true;
      this.crossAddOrUpdateFlag = false;
      if(type!='info'){
        type = 'else';
      }
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id,type);
      });
    },
    // 查看评论
    disscussListHandler(id,type) {
	this.$router.push({path:'/discusscaipinxinxi',query:{refid:id}});
    },
    // 下载
    download(file){
      window.open(`${file}`)
    },
    // 删除
    deleteHandler(id) {
      var ids = id
        ? [Number(id)]
        : this.dataListSelections.map(item => {
            return Number(item.id);
          });
      this.$confirm(`确定进行[${id ? "删除" : "批量删除"}]操作?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$http({
          url: "caipinxinxi/delete",
          method: "post",
          data: ids
        }).then(({ data }) => {
          if (data && data.code === 0) {
            this.$message({
              message: "操作成功",
              type: "success",
              duration: 1500,
              onClose: () => {
                this.search();
              }
            });
          } else {
            this.$message.error(data.msg);
          }
        });
      });
    },


  }

};
</script>
<style lang="scss" scoped>
	
	.center-form-pv {
	  .el-date-editor.el-input {
	    width: auto;
	  }
	}
	
	.el-input {
	  width: auto;
	}
	
	// form
	.center-form-pv .el-input /deep/ .el-input__inner {
				border: 2px solid #5A434A;
				border-radius: 4px;
				padding: 0 12px;
				outline: none;
				color: rgba(90, 67, 74, 1);
				width: 150px;
				font-size: 14px;
				height: 40px;
			}
	
	.center-form-pv .el-select /deep/ .el-input__inner {
				border: 2px solid #5A434A;
				border-radius: 4px;
				padding: 0 10px;
				outline: none;
				color: rgba(90, 67, 74, 1);
				width: 150px;
				font-size: 14px;
				height: 40px;
			}
	
	.center-form-pv .el-date-editor /deep/ .el-input__inner {
				border: 2px solid #5A434A;
				border-radius: 4px;
				padding: 0 10px 0 30px;
				outline: none;
				color: rgba(90, 67, 74, 1);
				width: 150px;
				font-size: 14px;
				height: 40px;
			}
	
	// table
	.el-table /deep/ .el-table__header-wrapper thead {
				color: #fff;
				font-weight: 500;
				width: 100%;
			}
	
	.el-table /deep/ .el-table__header-wrapper thead tr {
				background: #fff;
			}
	
	.el-table /deep/ .el-table__header-wrapper thead tr th {
				padding: 12px 0;
				background: rgba(90, 67, 74, 1);
				border-color: #eee;
				border-width: 0 1px 1px 0;
				border-style: solid;
				text-align: center;
			}

	.el-table /deep/ .el-table__header-wrapper thead tr th .cell {
				padding: 0 10px;
				word-wrap: normal;
				word-break: break-all;
				white-space: normal;
				font-weight: bold;
				display: inline-block;
				vertical-align: middle;
				width: 100%;
				line-height: 24px;
				position: relative;
				text-overflow: ellipsis;
			}

	
	.el-table /deep/ .el-table__body-wrapper tbody {
				width: 100%;
			}

	.el-table /deep/ .el-table__body-wrapper tbody tr {
				background: #fff;
			}
	
	.el-table /deep/ .el-table__body-wrapper tbody tr td {
				padding: 12px 0;
				color: #999;
				background: #fff;
				border-color: #ddd;
				border-width: 0 1px 1px 0;
				border-style: solid;
				text-align: center;
			}
	
		
	.el-table /deep/ .el-table__body-wrapper tbody tr:hover td {
				padding: 12px 0;
				color: #000;
				border-color: #ddd;
				border-width: 0 1px 1px 0;
				border-style: solid;
				text-align: center;
			}
	
	.el-table /deep/ .el-table__body-wrapper tbody tr td {
				padding: 12px 0;
				color: #999;
				background: #fff;
				border-color: #ddd;
				border-width: 0 1px 1px 0;
				border-style: solid;
				text-align: center;
			}

	.el-table /deep/ .el-table__body-wrapper tbody tr td .cell {
				padding: 0 10px;
				overflow: hidden;
				word-break: break-all;
				white-space: normal;
				line-height: 24px;
				text-overflow: ellipsis;
			}
	
	// pagination
	.main-content .el-pagination /deep/ .el-pagination__total {
				margin: 0 10px 0 0;
				color: #666;
				font-weight: 400;
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 28px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .btn-prev {
				border: none;
				border-radius: 2px;
				padding: 0;
				margin: 0 5px;
				color: #666;
				background: #f4f4f5;
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 28px;
				min-width: 35px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .btn-next {
				border: none;
				border-radius: 2px;
				padding: 0;
				margin: 0 5px;
				color: #666;
				background: #f4f4f5;
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 28px;
				min-width: 35px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .btn-prev:disabled {
				border: none;
				cursor: not-allowed;
				border-radius: 2px;
				padding: 0;
				margin: 0 5px;
				color: #C0C4CC;
				background: #f4f4f5;
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 28px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .btn-next:disabled {
				border: none;
				cursor: not-allowed;
				border-radius: 2px;
				padding: 0;
				margin: 0 5px;
				color: #C0C4CC;
				background: #f4f4f5;
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 28px;
				height: 28px;
			}

	.main-content .el-pagination /deep/ .el-pager {
				padding: 0;
				margin: 0;
				display: inline-block;
				vertical-align: top;
			}

	.main-content .el-pagination /deep/ .el-pager .number {
				cursor: pointer;
				padding: 0 4px;
				margin: 0 5px;
				color: #666;
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 28px;
				border-radius: 2px;
				background: #f4f4f5;
				text-align: center;
				min-width: 30px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .el-pager .number:hover {
				cursor: pointer;
				padding: 0 4px;
				margin: 0 5px;
				color: #ffc523;
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 28px;
				border-radius: 2px;
				background: #f4f4f5;
				text-align: center;
				min-width: 30px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .el-pager .number.active {
				cursor: default;
				padding: 0 4px;
				margin: 0 5px;
				color: #FFF;
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 28px;
				border-radius: 2px;
				background: rgba(90, 67, 74, 1);
				text-align: center;
				min-width: 30px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__sizes {
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 28px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__sizes .el-input {
				margin: 0 5px;
				width: 100px;
				position: relative;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__sizes .el-input .el-input__inner {
				border: 1px solid #DCDFE6;
				cursor: pointer;
				padding: 0 25px 0 8px;
				color: #606266;
				display: inline-block;
				font-size: 13px;
				line-height: 28px;
				border-radius: 3px;
				outline: 0;
				background: #FFF;
				width: 100%;
				text-align: center;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__sizes .el-input span.el-input__suffix {
				top: 0;
				position: absolute;
				right: 0;
				height: 100%;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__sizes .el-input .el-input__suffix .el-select__caret {
				cursor: pointer;
				color: #C0C4CC;
				width: 25px;
				font-size: 14px;
				line-height: 28px;
				text-align: center;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__jump {
				margin: 0 0 0 24px;
				color: #606266;
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 28px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__jump .el-input {
				border-radius: 3px;
				padding: 0 2px;
				margin: 0 2px;
				display: inline-block;
				width: 50px;
				font-size: 14px;
				line-height: 18px;
				position: relative;
				text-align: center;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__jump .el-input .el-input__inner {
				border: 1px solid #DCDFE6;
				cursor: pointer;
				padding: 0 3px;
				color: #606266;
				display: inline-block;
				font-size: 14px;
				line-height: 28px;
				border-radius: 3px;
				outline: 0;
				background: #FFF;
				width: 100%;
				text-align: center;
				height: 28px;
			}
</style>
