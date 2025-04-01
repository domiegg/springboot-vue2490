<template>
<div>
	<div :style='{"width":"100%","padding":"0px 7%","margin":"20px auto 10px","borderRadius":"0","background":"none"}' class="breadcrumb-preview">
		<el-breadcrumb :separator="'Ξ'" :style='{"border":"2px dashed #a1c842","borderRadius":"30px","textAlign":"center","display":"flex","width":"15%","fontSize":"14px","lineHeight":"40px","justifyContent":"center"}'>
			<el-breadcrumb-item>首页</el-breadcrumb-item>
			<el-breadcrumb-item v-for="(item, index) in breadcrumbItem" :key="index">{{item.name}}</el-breadcrumb-item>
		</el-breadcrumb>
	</div>
	
	<div class="list-preview" :style='{"margin":"10px auto","flexWrap":"wrap","background":"none","display":"flex","width":"100%","position":"relative","justifyContent":"space-between"}'>
		<div class="category-1" :style='{"width":"100%","padding":"20px 7% 20px","background":"none","justifyContent":"center","display":"flex","height":"auto"}'>
			<div class="item" :class="swiperIndex == '-1' ? 'active' : ''" @click="getList(1, '全部')" :plain="isPlain">全部</div>
			<div class="item" :class="swiperIndex == index ? 'active' : ''" v-for="(item, index) in fenlei" :key="index" @click="getList(1, item, 'btn' + index)" :ref="'btn' + index" plain>{{item}}</div>
		</div>
		
	
    <el-form :inline="true" :model="formSearch" class="list-form-pv" :style='{"padding":"10px 7% 0","margin":"0 0 10px","alignItems":"center","flexWrap":"wrap","background":"none","display":"flex","width":"100%","height":"auto"}'>
      <el-form-item :style='{"margin":"0 4px 0 0","justifyContent":"center","display":"flex"}'>
	    <div class="lable" v-if="true" :style='{"width":"auto","padding":"0 10px","lineHeight":"42px","display":"inline-block"}'>菜品名称</div>
        <el-input v-model="formSearch.caipinmingcheng" placeholder="菜品名称" clearable></el-input>
      </el-form-item>
      <el-form-item :style='{"margin":"0 4px 0 0","justifyContent":"center","display":"flex"}'>
		<div class="lable" v-if="true" :style='{"width":"auto","padding":"0 10px","lineHeight":"42px","display":"inline-block"}'>菜品分类</div>
        <el-select v-model="formSearch.caipinfenlei" placeholder="请选择菜品分类" :clearable="true">
          <el-option v-for="(item, index) in caipinfenleiOptions" :key="index" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :style='{"margin":"0 4px 0 0","justifyContent":"center","display":"flex"}'>
	    <div class="lable" v-if="true" :style='{"width":"auto","padding":"0 10px","lineHeight":"42px","display":"inline-block"}'>口味</div>
        <el-input v-model="formSearch.kouwei" placeholder="口味" clearable></el-input>
      </el-form-item>
      <el-form-item :style='{"margin":"0 4px 0 0","justifyContent":"center","display":"flex"}'>
	    <div class="lable" v-if="true" :style='{"width":"auto","padding":"0 10px","lineHeight":"42px","display":"inline-block"}'>商家名称</div>
        <el-input v-model="formSearch.shangjiamingcheng" placeholder="商家名称" clearable></el-input>
      </el-form-item>
      <el-form-item :style='{"margin":"0 4px 0 0","justifyContent":"center","display":"flex"}'>
	    <div class="lable" v-if="true" :style='{"width":"auto","padding":"0 10px","lineHeight":"42px","display":"inline-block"}'>价格</div>
        <el-input v-model="formSearch.pricestart" placeholder="最小价格" clearable></el-input>
      </el-form-item>
      <el-form-item :style='{"margin":"0 4px 0 0","justifyContent":"center","display":"flex"}'>
        <el-input v-model="formSearch.priceend" placeholder="最大价格" clearable></el-input>
      </el-form-item>
	  <el-button v-if=" true " :style='{"cursor":"pointer","border":"0","padding":"0px 15px","margin":"0 10px 0 0","outline":"none","color":"#333","borderRadius":"4px","background":"#a1c842","width":"auto","fontSize":"14px","lineHeight":"42px","height":"42px"}' type="primary" @click="getList(1, curFenlei)"><i v-if="true" :style='{"color":"#333","margin":"0 10px 0 0","fontSize":"14px"}' class="el-icon-search"></i>查询</el-button>
	  <el-button v-if="isAuth('caipinxinxi','新增')" :style='{"cursor":"pointer","border":"0","padding":"0px 15px","margin":"0 10px 0 0","outline":"none","color":"#333","borderRadius":"4px","background":"#ffc303","width":"auto","fontSize":"14px","lineHeight":"42px","height":"42px"}' type="primary" @click="add('/index/caipinxinxiAdd')"><i v-if="true" :style='{"color":"#333","margin":"0 10px 0 0","fontSize":"14px"}' class="el-icon-circle-plus-outline"></i>添加</el-button>
    </el-form>

	<div class="list" :style='{"width":"100%","margin":"40px 0 10px","minWidth":"1050px","background":"none"}'>
		<!-- 样式一 -->
		
		<!-- 样式二 -->
		<div class="list2 index-pv1" :style='{"padding":"0 7%","flexWrap":"wrap","background":"none","display":"flex","width":"100%","justifyContent":"space-between","height":"auto"}'>
			<div :style='{"margin":"0 0 40px","flexWrap":"wrap","background":"rgba(255,255,255,.6)","display":"flex","width":"49%","fontSize":"0","position":"relative","justifyContent":"space-between","height":"auto"}' v-for="(item, index) in dataList" :key="index" @click="toDetail(item)" class="list-item animation-box">
				<img :style='{"border":"2px dashed #333","padding":"10px","objectFit":"cover","borderRadius":"100%","display":"inline-block","width":"285px","height":"285px"}' v-if="item.caipinfengmian && item.caipinfengmian.substr(0,4)=='http'" :src="item.caipinfengmian" class="image" />
				<img :style='{"border":"2px dashed #333","padding":"10px","objectFit":"cover","borderRadius":"100%","display":"inline-block","width":"285px","height":"285px"}' v-else :src="baseUrl + (item.caipinfengmian?item.caipinfengmian.split(',')[0]:'')" class="image" />
				<div class="item-info" :style='{"width":"calc(100% - 285px)","padding":"10px 0px","overflow":"hidden","display":"inline-block","height":"100%"}'>
					<div :style='{"padding":"0 40px 0 0","margin":"0 0 10px","whiteSpace":"nowrap","overflow":"hidden","color":"#333","textAlign":"right","background":"url(http://codegen.caihongy.cn/20230112/71572c80be344dfc9b3c7ebecf07a4c5.png) no-repeat center top / 100% 100%","lineHeight":"50px","fontSize":"18px","textOverflow":"ellipsis","height":"68px"}' class="name ">菜品名称:{{item.caipinmingcheng}}</div>
					<div :style='{"padding":"0 40px 0 0","margin":"0 0 10px","whiteSpace":"nowrap","overflow":"hidden","color":"#333","textAlign":"right","background":"url(http://codegen.caihongy.cn/20230112/71572c80be344dfc9b3c7ebecf07a4c5.png) no-repeat center top / 100% 100%","lineHeight":"50px","fontSize":"18px","textOverflow":"ellipsis","height":"68px"}' class="name ">{{item.caipinfenlei}}</div>
					<div :style='{"padding":"0 40px 0 0","margin":"0 0 10px","whiteSpace":"nowrap","overflow":"hidden","color":"#333","textAlign":"right","background":"url(http://codegen.caihongy.cn/20230112/71572c80be344dfc9b3c7ebecf07a4c5.png) no-repeat center top / 100% 100%","lineHeight":"50px","fontSize":"18px","textOverflow":"ellipsis","height":"68px"}' class="name ">{{item.kouwei}}</div>
					<div v-if="item.price" :style='{"padding":"10px 40px 10px 10px","lineHeight":"24px","fontSize":"14px","color":"#f00","textAlign":"right"}' class="price"><span :style='{"fontSize":"12px"}'>￥</span>{{item.price}}</div>
				</div>
			</div>
		</div>
	</div>

	<!-- 热门信息 -->
	<div class="hot" :style='{"width":"100%","padding":"40px 0 0","backgroundSize":"100%","background":"url(http://codegen.caihongy.cn/20230112/29169018b843423c8957ea726e68c749.png) no-repeat center -50px","height":"auto"}'>
	  <div :style='{"padding":"0 20px","color":"#333","textAlign":"center","background":"none","width":"100%","lineHeight":"44px","fontSize":"32px"}'>热门信息</div>
	  <div :style='{"width":"100%","padding":"100px 7% 0","background":"none","justifyContent":"space-between","display":"flex","height":"auto"}'>
	    <div v-for="item in hotList" :key="item" :style='{"width":"23%","background":"rgba(255,255,255,0)","height":"auto"}' @click="toDetail(item)">
	      <img :style='{"border":"2px dashed #333","padding":"10px ","margin":"0 0 10px","objectFit":"cover","borderRadius":"100%","background":"#fff","display":"block","width":"285px","height":"285px"}' :src="baseUrl + (item.caipinfengmian?item.caipinfengmian.split(',')[0]:'')" alt="">
	      <div :style='{"padding":"0 40px 0 0","margin":"0px 0 10px","whiteSpace":"nowrap","overflow":"hidden","color":"#333","textAlign":"right","background":"url(http://codegen.caihongy.cn/20230112/71572c80be344dfc9b3c7ebecf07a4c5.png) no-repeat center top / 100% 100%","width":"90%","lineHeight":"50px","fontSize":"18px","textOverflow":"ellipsis","height":"68px"}'>{{item.caipinmingcheng}}</div>
	      <div :style='{"padding":"0 40px 0 0","margin":"0px 0 10px","whiteSpace":"nowrap","overflow":"hidden","color":"#333","textAlign":"right","background":"url(http://codegen.caihongy.cn/20230112/71572c80be344dfc9b3c7ebecf07a4c5.png) no-repeat center top / 100% 100%","width":"90%","lineHeight":"50px","fontSize":"18px","textOverflow":"ellipsis","height":"68px"}'>{{item.caipinfenlei}}</div>
	      <div :style='{"padding":"0 40px 0 0","margin":"0px 0 10px","whiteSpace":"nowrap","overflow":"hidden","color":"#333","textAlign":"right","background":"url(http://codegen.caihongy.cn/20230112/71572c80be344dfc9b3c7ebecf07a4c5.png) no-repeat center top / 100% 100%","width":"90%","lineHeight":"50px","fontSize":"18px","textOverflow":"ellipsis","height":"68px"}'>{{item.kouwei}}</div>
	      <!--<div :style='{"padding":"0 40px 0 0","margin":"4px 0 0","color":"#999","textAlign":"right","width":"90%","lineHeight":"24px","fontSize":"14px"}'>2022-02-02</div>-->
	    </div>
	  </div>
	</div>
	
	<el-pagination
	  background
	  class="pagination"
	  :pager-count="7"
	  :page-size="pageSize"
	  :page-sizes="pageSizes"
	  prev-text="<"
	  next-text=">"
	  :hide-on-single-page="true"
	  :layout='["total","prev","pager","next","sizes","jumper"].join()'
	  :total="total"
	  :style='{"padding":"0","margin":"10px auto","whiteSpace":"nowrap","color":"#333","textAlign":"center","width":"100%","fontWeight":"500"}'
	  @current-change="curChange"
	  @prev-click="prevClick"
	  @next-click="nextClick"
	></el-pagination>

  </div>
</div>
</template>

<script>
  export default {
    //数据集合
    data() {
      return {
	    layouts: '',
		swiperIndex: -1,
        baseUrl: '',
        breadcrumbItem: [
          {
            name: '菜品信息'
          }
        ],
        formSearch: {
          caipinmingcheng: '',
          caipinfenlei: '',
          kouwei: '',
          shangjiamingcheng: '',
          price: '',
        },
        fenlei: [],
        hotList: [],
        dataList: [],
        total: 1,
        pageSize: 12,
		pageSizes: [10,20,30,50],
        totalPage: 1,
        curFenlei: '全部',
        isPlain: false,
        indexQueryCondition: '',
	      caipinfenleiOptions: [],
        timeRange: []
      }
    },
    created() {
      this.indexQueryCondition = this.$route.query.indexQueryCondition ? this.$route.query.indexQueryCondition : '';
      this.baseUrl = this.$config.baseUrl;
      this.$http.get('option/caipinfenlei/caipinfenlei').then(res => {
        if (res.data.code == 0) {
          this.caipinfenleiOptions = res.data.data;
        }
      });
      this.getFenlei();
      this.getList(1, '全部');
      this.getHotList();
    },
    //方法集合
    methods: {
      add(path) {
        this.$router.push({path: path});
      },
      getHotList() {
        let autoSortUrl = "";
        autoSortUrl = "caipinxinxi/autoSort";
        if(localStorage.getItem('Token')) {
            autoSortUrl = "caipinxinxi/autoSort2";
        }
          this.$http.get(autoSortUrl, {params: {
              page: 1,
              limit: 4,
          }}).then(res => {
              if (res.data.code == 0) {
                  this.hotList = res.data.data.list;
              }
          })
      },
      getFenlei() {
        this.$http.get('option/caipinfenlei/caipinfenlei').then(res => {
          if (res.data.code == 0) {
            this.fenlei = res.data.data;
          }
        });
      },
      getList(page, fenlei, ref = '') {
		if(fenlei == '全部') this.swiperIndex = -1;
		for(let i=0;i<this.fenlei.length;i++) {
			if(fenlei == this.fenlei[i]) {
				this.swiperIndex = i;
				break;
			}
		}
        this.curFenlei = fenlei;
        if (this.curFenlei == '全部') {
          this.isPlain = false;
        } else {
          this.isPlain = true;
        }
        let params = {page, limit: this.pageSize};
        let searchWhere = {};
        if (this.formSearch.caipinmingcheng != '') searchWhere.caipinmingcheng = '%' + this.formSearch.caipinmingcheng + '%';
        if (this.formSearch.caipinfenlei != '') searchWhere.caipinfenlei = this.formSearch.caipinfenlei;
        if (this.formSearch.kouwei != '') searchWhere.kouwei = '%' + this.formSearch.kouwei + '%';
        if (this.formSearch.shangjiamingcheng != '') searchWhere.shangjiamingcheng = '%' + this.formSearch.shangjiamingcheng + '%';
        if(this.formSearch.pricestart!='' && this.formSearch.pricestart!=undefined ){
          searchWhere.pricestart = this.formSearch.pricestart
        }
        if(this.formSearch.priceend!='' && this.formSearch.priceend!=undefined){
          searchWhere.priceend = this.formSearch.priceend
        }
        if (this.curFenlei != '全部') searchWhere.caipinfenlei = this.curFenlei;
        this.$http.get('caipinxinxi/list', {params: Object.assign(params, searchWhere)}).then(res => {
          if (res.data.code == 0) {
            this.dataList = res.data.data.list;
            this.total = res.data.data.total;
            this.pageSize = res.data.data.pageSize;
            this.totalPage = res.data.data.totalPage;
			
			this.pageSizes = [this.pageSize, this.pageSize*2, this.pageSize*3, this.pageSize*5];
          }
        });
      },
      curChange(page) {
        this.getList(page,this.curFenlei);
      },
      prevClick(page) {
        this.getList(page,this.curFenlei);
      },
      nextClick(page) {
        this.getList(page,this.curFenlei);
      },
      toDetail(item) {
        this.$router.push({path: '/index/caipinxinxiDetail', query: {detailObj: JSON.stringify(item)}});
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.list-preview .list-form-pv .el-input {
		width: auto;
	}

	.breadcrumb-preview .el-breadcrumb /deep/ .el-breadcrumb__separator {
		margin: 0 9px;
		color: #85ac26;
		font-weight: 500;
	}
	
	.breadcrumb-preview .el-breadcrumb /deep/ .el-breadcrumb__inner a {
		color: #85ac26;
		display: inline-block;
	}
	
	.breadcrumb-preview .el-breadcrumb /deep/ .el-breadcrumb__inner {
		color: #85ac26;
		display: inline-block;
	}
	
	.category-1 .item {
		cursor: pointer;
		border: 0;
		padding: 0 10px;
		margin: 0 0px 20px 0;
		color: #333;
		font-size: 16px;
		line-height: 44px;
		border-radius: 4px;
		background: #fff;
		width: auto;
		text-align: center;
		min-width: 120px;
		height: 44px;
	}
	
	.category-1 .item:hover {
		cursor: pointer;
		border: 2px dashed #ffc303;
		border-radius: 0px;
		margin: 0 0px 20px 0;
		color: #111;
		background: #ffc303;
		width: auto;
		font-size: 16px;
		line-height: 44px;
		text-align: center;
	}
	
	.category-1 .item.active {
		cursor: pointer;
		border-radius: 0;
		margin: 0 0px 20px 0;
		color: #111;
		background: #ffc303;
		width: auto;
		font-size: 16px;
		line-height: 44px;
		text-align: center;
		min-width: 120px;
	}
	
	.category-2 .item {
		cursor: pointer;
		border-radius: 4px;
		margin: 0 0 10px 0;
		color: #999;
		background: #efefef;
		width: 100%;
		font-size: 14px;
		line-height: 36px;
		text-align: center;
	}
	
	.category-2 .item:hover {
		cursor: pointer;
		border-radius: 4px;
		margin: 0 0 10px 0;
		color: #999;
		background: #efefef;
		width: 100%;
		font-size: 14px;
		line-height: 36px;
		text-align: center;
	}
	
	.category-2 .item.active {
		cursor: pointer;
		border-radius: 4px;
		margin: 0 0 10px 0;
		color: #999;
		background: #efefef;
		width: 100%;
		font-size: 14px;
		line-height: 36px;
		text-align: center;
	}
	
	.list-form-pv .el-input /deep/ .el-input__inner {
		border: 1px solid #ffc303;
		border-radius: 0px;
		padding: 0 10px;
		margin: 0;
		outline: none;
		color: #333;
		width: 140px;
		font-size: 14px;
		line-height: 42px;
		height: 42px;
	}
	
	.list-form-pv .el-select /deep/ .el-input__inner {
		border: 1px solid #ffc303;
		border-radius: 0;
		padding: 0 10px;
		margin: 0;
		outline: none;
		color: #333;
		width: 140px;
		font-size: 14px;
		line-height: 42px;
		height: 42px;
	}
	
	.list-form-pv .el-date-editor /deep/ .el-input__inner {
		border: 1px solid #ffc303;
		border-radius: 0;
		padding: 0 30px;
		margin: 0;
		outline: none;
		color: #333;
		width: 140px;
		font-size: 14px;
		line-height: 42px;
		height: 42px;
	}
	
	.list .index-pv1 .animation-box {
		transform: rotate(0deg) scale(1) skew(0deg, 0deg) translate3d(0px, 0px, 0px);
		z-index: initial;
	}
	
	.list .index-pv1 .animation-box:hover {
		-webkit-perspective: 1000px;
		perspective: 1000px;
		transition: 0.3s;
		z-index: 1;
	}
	
	.list .index-pv1 .animation-box img {
		transform: rotate(0deg) scale(1) skew(0deg, 0deg) translate3d(0px, 0px, 0px);
	}
	
	.list .index-pv1 .animation-box img:hover {
		transform: scale(0.96);
		-webkit-perspective: 1000px;
		perspective: 1000px;
		transition: 0.3s;
	}
	
	.el-pagination /deep/ .el-pagination__total {
		margin: 0 10px 0 0;
		color: #666;
		font-weight: 400;
		display: inline-block;
		vertical-align: top;
		font-size: 13px;
		line-height: 28px;
		height: 28px;
	}
	
	.el-pagination /deep/ .btn-prev {
		border: none;
		border-radius: 2px;
		padding: 0;
		margin: 0 5px;
		color: #666;
		background: #fff;
		display: inline-block;
		vertical-align: top;
		font-size: 13px;
		line-height: 28px;
		min-width: 35px;
		height: 28px;
	}
	
	.el-pagination /deep/ .btn-next {
		border: none;
		border-radius: 2px;
		padding: 0;
		margin: 0 5px;
		color: #666;
		background: #fff;
		display: inline-block;
		vertical-align: top;
		font-size: 13px;
		line-height: 28px;
		min-width: 35px;
		height: 28px;
	}
	
	.el-pagination /deep/ .btn-prev:disabled {
		border: none;
		cursor: not-allowed;
		border-radius: 2px;
		padding: 0;
		margin: 0 5px;
		color: #C0C4CC;
		background: #fff;
		display: inline-block;
		vertical-align: top;
		font-size: 13px;
		line-height: 28px;
		height: 28px;
	}
	
	.el-pagination /deep/ .btn-next:disabled {
		border: none;
		cursor: not-allowed;
		border-radius: 2px;
		padding: 0;
		margin: 0 5px;
		color: #C0C4CC;
		background: #fff;
		display: inline-block;
		vertical-align: top;
		font-size: 13px;
		line-height: 28px;
		height: 28px;
	}
	
	.el-pagination /deep/ .el-pager {
		padding: 0;
		margin: 0;
		display: inline-block;
		vertical-align: top;
	}
	
	.el-pagination /deep/ .el-pager .number {
		cursor: pointer;
		padding: 0 4px;
		margin: 0 5px;
		color: #666;
		display: inline-block;
		vertical-align: top;
		font-size: 13px;
		line-height: 28px;
		border-radius: 2px;
		background: #fff;
		text-align: center;
		min-width: 30px;
		height: 28px;
	}
	
	.el-pagination /deep/ .el-pager .number:hover {
		cursor: pointer;
		padding: 0 4px;
		margin: 0 5px;
		color: #a1c842;
		display: inline-block;
		vertical-align: top;
		font-size: 13px;
		line-height: 28px;
		border-radius: 2px;
		background: #fff;
		text-align: center;
		min-width: 30px;
		height: 28px;
	}
	
	.el-pagination /deep/ .el-pager .number.active {
		cursor: default;
		padding: 0 4px;
		margin: 0 5px;
		color: #FFF;
		display: inline-block;
		vertical-align: top;
		font-size: 13px;
		line-height: 28px;
		border-radius: 2px;
		background: #a1c842;
		text-align: center;
		min-width: 30px;
		height: 28px;
	}
	
	.el-pagination /deep/ .el-pagination__sizes {
		display: inline-block;
		vertical-align: top;
		font-size: 13px;
		line-height: 28px;
		height: 28px;
	}
	
	.el-pagination /deep/ .el-pagination__sizes .el-input {
		margin: 0 5px;
		width: 100px;
		position: relative;
	}
	
	.el-pagination /deep/ .el-pagination__sizes .el-input .el-input__inner {
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
	
	.el-pagination /deep/ .el-pagination__sizes .el-input span.el-input__suffix {
		top: 0;
		position: absolute;
		right: 0;
		height: 100%;
	}
	
	.el-pagination /deep/ .el-pagination__sizes .el-input .el-input__suffix .el-select__caret {
		cursor: pointer;
		color: #C0C4CC;
		width: 25px;
		font-size: 14px;
		line-height: 28px;
		text-align: center;
	}
	
	.el-pagination /deep/ .el-pagination__jump {
		margin: 0 0 0 24px;
		color: #606266;
		display: inline-block;
		vertical-align: top;
		font-size: 13px;
		line-height: 28px;
		height: 28px;
	}
	
	.el-pagination /deep/ .el-pagination__jump .el-input {
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
	
	.el-pagination /deep/ .el-pagination__jump .el-input .el-input__inner {
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
