<template>
<div class="home-preview" :style='{"width":"100%","margin":"10px auto","flexWrap":"wrap","background":"none","justifyContent":"space-between","display":"flex"}'>


	<!-- 关于我们 -->
	<div :style='{"padding":"60px 7% 10px","boxShadow":"0 0px 0px rgba(255, 255, 255, .3)","margin":"10px auto 20px","flexWrap":"wrap","background":"url(http://codegen.caihongy.cn/20230112/d8acb76571644f5f8431b02b55809c9f.png) no-repeat center top","display":"block","width":"100%","backgroundSize":"100%","height":"auto","order":"4"}'>
	  <div :style='{"padding":"0 10px","margin":"0 auto 20px","color":"#333","textAlign":"right","width":"50%","lineHeight":"50px","fontSize":"32px","float":"left"}'>{{aboutUsDetail.title}}</div>
	  <div :style='{"padding":"0 10px","margin":"0 auto 20px","color":"#666","textAlign":"left","width":"50%","lineHeight":"50px","fontSize":"24px","float":"right"}'>{{aboutUsDetail.subtitle}}</div>
	  <div :style='{"width":"48%","padding":"0 0 0 0px","float":"left","flexWrap":"wrap","display":"flex","height":"auto"}'>
	    <img :style='{"border":"1px dashed #ccc","padding":"10px","margin":"0 0px","objectFit":"cover","background":"rgba(255,255,255,1)","display":"block","width":"100%","height":"312px"}' :src="baseUrl + aboutUsDetail.picture1">
	    <img :style='{"margin":"0 10px","objectFit":"cover","flex":1,"display":"none","height":"120px"}' :src="baseUrl + aboutUsDetail.picture2">
	    <img :style='{"margin":"0 10px","objectFit":"cover","flex":1,"display":"none","height":"120px"}' :src="baseUrl + aboutUsDetail.picture3">
	  </div>
	  <div :style='{"border":"1px solid #eee","padding":"10px","margin":"0px 0px 0px 0","overflow":"hidden","color":"#333","background":"rgba(255,255,255,1)","width":"48%","lineHeight":"24px","fontSize":"14px","textIndent":"2em","float":"right","height":"312px"}' v-html="aboutUsDetail.content"></div>
	  <div :style='{"width":"285px","background":"url(\"http://codegen.caihongy.cn/20201114/7856ba26477849ea828f481fa2773a95.jpg\") 0% 0% / cover no-repeat","display":"none","height":"100px"}' />
	  <div :style='{"width":"285px","background":"url(\"http://codegen.caihongy.cn/20201114/7856ba26477849ea828f481fa2773a95.jpg\") 0% 0% / cover no-repeat","display":"none","height":"100px"}' />
	  <div :style='{"width":"285px","background":"url(\"http://codegen.caihongy.cn/20201114/7856ba26477849ea828f481fa2773a95.jpg\") 0% 0% / cover no-repeat","display":"none","height":"100px"}' />
	  <div :style='{"width":"285px","background":"url(\"http://codegen.caihongy.cn/20201114/7856ba26477849ea828f481fa2773a95.jpg\") 0% 0% / cover no-repeat","display":"none","height":"100px"}' />
	</div>
	<!-- 系统简介 -->
	<div :style='{"padding":"0 0 0px","boxShadow":"0 0px 0px rgba(255, 255, 255, .3)","margin":"70px 7% 10px 0","alignItems":"flex-start","flexWrap":"wrap","background":"none","display":"flex","width":"32%","position":"relative","justifyContent":"flex-start","height":"auto","order":"3"}'>
	  <div :style='{"padding":"20px 20px 0","margin":"20px auto 20px","color":"#333","textAlign":"center","background":"url(http://codegen.caihongy.cn/20230112/386f2f8213f945c8b81e21886c653274.png) no-repeat center top / 100% auto","width":"100%","fontSize":"16px","height":"68px","order":"8"}'>{{systemIntroductionDetail.title}}</div>
	  <div :style='{"margin":"0 0 10px","color":"#999","textAlign":"center","display":"none","width":"100%","lineHeight":"1.5","fontSize":"20px"}'>{{systemIntroductionDetail.subtitle}}</div>
	  <div :style='{"padding":"0 0px","flexWrap":"wrap","display":"flex","width":"100%","justifyContent":"space-between","height":"auto","order":"1"}'>
	    <img :style='{"border":"1px dashed #ccc","padding":"10px","margin":"0 0px","objectFit":"cover","display":"block","width":"100%","height":"212px"}' :src="baseUrl + systemIntroductionDetail.picture1">
	    <img :style='{"margin":"0 10px","objectFit":"cover","flex":1,"display":"none","height":"120px"}' :src="baseUrl + systemIntroductionDetail.picture2">
	    <img :style='{"margin":"0 10px","objectFit":"cover","flex":1,"display":"none","height":"120px"}' :src="baseUrl + systemIntroductionDetail.picture3">
	  </div>
	  <div :style='{"padding":"10px","margin":"0","overflow":"hidden","color":"rgb(102, 102, 102)","background":"#fff","width":"100%","lineHeight":"2","fontSize":"14px","textIndent":"2em","height":"212px","order":"2"}' v-html="systemIntroductionDetail.content"></div>
	  <div :style='{"width":"285px","background":"url(\"http://codegen.caihongy.cn/20201114/7856ba26477849ea828f481fa2773a95.jpg\") 0% 0% / cover no-repeat","display":"none","height":"100px"}' />
	  <div :style='{"width":"285px","background":"url(\"http://codegen.caihongy.cn/20201114/7856ba26477849ea828f481fa2773a95.jpg\") 0% 0% / cover no-repeat","display":"none","height":"100px"}' />
	  <div :style='{"width":"285px","background":"url(\"http://codegen.caihongy.cn/20201114/7856ba26477849ea828f481fa2773a95.jpg\") 0% 0% / cover no-repeat","display":"none","height":"100px"}' />
	  <div :style='{"width":"285px","background":"url(\"http://codegen.caihongy.cn/20201114/7856ba26477849ea828f481fa2773a95.jpg\") 0% 0% / cover no-repeat","display":"none","height":"100px"}' />
	</div>

<div class="recommend" :style='{"padding":"60px 7% 20px","margin":"30px auto 10px","textAlign":"center","background":"url(http://codegen.caihongy.cn/20230112/29169018b843423c8957ea726e68c749.png) no-repeat center top","width":"100%","backgroundSize":"100%","position":"relative","order":"5"}'>
	<div v-if="false" class="idea recommendIdea" :style='{"padding":"20px","flexWrap":"wrap","background":"#efefef","justifyContent":"space-between","display":"flex"}'>
		<div class="box1" :style='{"width":"20%","background":"#fff","height":"80px"}'></div>
		<div class="box2" :style='{"width":"20%","background":"#fff","height":"80px"}'></div>
		<div class="box3" :style='{"width":"20%","background":"#fff","height":"80px"}'></div>
		<div class="box4" :style='{"width":"20%","background":"#fff","height":"80px"}'></div>
		<div class="box5" :style='{"width":"20%","background":"#fff","display":"none","height":"80px"}'></div>
		<div class="box6" :style='{"width":"20%","background":"#fff","display":"none","height":"80px"}'></div>
		<div class="box7" :style='{"width":"20%","background":"#fff","display":"none","height":"80px"}'></div>
		<div class="box8" :style='{"width":"20%","background":"#fff","display":"none","height":"80px"}'></div>
		<div class="box9" :style='{"width":"20%","background":"#fff","display":"none","height":"80px"}'></div>
		<div class="box10" :style='{"width":"20%","background":"#fff","display":"none","height":"80px"}'></div>
	</div>
	
    <div class="title" :style='{"width":"100%","margin":"0px auto 0px","lineHeight":"54px","textAlign":"center","background":"none","height":"50px"}'>
		<span :style='{"color":"#333","margin":"0 8px 0 20px","fontSize":"32px"}'>菜品信息推荐</span>
	</div>
	
	
	
	<!-- 样式二 -->
	<div class="list list2 index-pv1" :style='{"padding":"0px 0","margin":"140px 0 0","flexWrap":"wrap","textAlign":"left","background":"none","display":"flex","width":"100%","justifyContent":"space-between","height":"auto"}'>
		<div :style='{"margin":"0 0 40px","flexWrap":"wrap","background":"none","display":"flex","width":"48%","fontSize":"0","position":"relative","justifyContent":"space-between","height":"auto"}' v-for="(item,index) in caipinxinxiRecommend" class="list-item animation-box" :key="index" @click="toDetail('caipinxinxiDetail', item)">
			<img :style='{"border":"2px dashed #333","padding":"10px","objectFit":"cover","borderRadius":"100%","display":"inline-block","width":"285px","height":"285px"}' v-if="preHttp(item.caipinfengmian)" :src="item.caipinfengmian.split(',')[0]" alt="" />
			<img :style='{"border":"2px dashed #333","padding":"10px","objectFit":"cover","borderRadius":"100%","display":"inline-block","width":"285px","height":"285px"}' v-else :src="baseUrl + (item.caipinfengmian?item.caipinfengmian.split(',')[0]:'')" alt="" />
			<div class="item-info" :style='{"width":"calc(100% - 285px)","padding":"10px 0px","overflow":"hidden","display":"inline-block","height":"100%"}'>
				<div class="name line1" :style='{"padding":"0 40px 0 0","margin":"0 0 10px","whiteSpace":"nowrap","color":"#333","textAlign":"right","overflow":"hidden","background":"url(http://codegen.caihongy.cn/20230112/71572c80be344dfc9b3c7ebecf07a4c5.png) no-repeat center top / 100% 100%","width":"100%","lineHeight":"50px","fontSize":"18px","backgroundSize":"100% 100%","textOverflow":"ellipsis","height":"68px"}'>菜品名称:{{item.caipinmingcheng}}</div>
				<div class="name line1" :style='{"padding":"0 40px 0 0","margin":"0 0 10px","whiteSpace":"nowrap","color":"#333","textAlign":"right","overflow":"hidden","background":"url(http://codegen.caihongy.cn/20230112/71572c80be344dfc9b3c7ebecf07a4c5.png) no-repeat center top / 100% 100%","width":"100%","lineHeight":"50px","fontSize":"18px","backgroundSize":"100% 100%","textOverflow":"ellipsis","height":"68px"}'>{{item.caipinfenlei}}</div>
				<div class="name line1" :style='{"padding":"0 40px 0 0","margin":"0 0 10px","whiteSpace":"nowrap","color":"#333","textAlign":"right","overflow":"hidden","background":"url(http://codegen.caihongy.cn/20230112/71572c80be344dfc9b3c7ebecf07a4c5.png) no-repeat center top / 100% 100%","width":"100%","lineHeight":"50px","fontSize":"18px","backgroundSize":"100% 100%","textOverflow":"ellipsis","height":"68px"}'>{{item.kouwei}}</div>
			</div>
		</div>
	</div>
	
	
	
	
	
	
	
	
	<div @click="moreBtn('caipinxinxi')" :style='{"border":"2px solid #fff","margin":"60px auto 0px","top":"0","borderRadius":"30px","textAlign":"center","background":"none","display":"block","width":"110px","lineHeight":"40px","position":"absolute","right":"7%"}'>
		<span :style='{"color":"#fff","fontSize":"12px"}'>查看更多</span>
		<i v-if="true" :style='{"color":"#fff","fontSize":"12px"}' class="el-icon-d-arrow-right"></i>
	</div>
	
</div>

	
<div class="news" :style='{"width":"45%","margin":"10px 7% 10px","position":"relative","background":"none","flex":"1","order":"2"}'>
	<div v-if="false" class="idea newsIdea" :style='{"padding":"20px","flexWrap":"wrap","background":"#efefef","justifyContent":"space-between","display":"flex"}'>
		<div class="box1" :style='{"width":"20%","background":"#fff","height":"80px"}'></div>
		<div class="box2" :style='{"width":"20%","background":"#fff","height":"80px"}'></div>
		<div class="box3" :style='{"width":"20%","background":"#fff","height":"80px"}'></div>
		<div class="box4" :style='{"width":"20%","background":"#fff","height":"80px"}'></div>
		<div class="box5" :style='{"width":"20%","background":"#fff","display":"none","height":"80px"}'></div>
		<div class="box6" :style='{"width":"20%","background":"#fff","display":"none","height":"80px"}'></div>
		<div class="box7" :style='{"width":"20%","background":"#fff","display":"none","height":"80px"}'></div>
		<div class="box8" :style='{"width":"20%","background":"#fff","display":"none","height":"80px"}'></div>
		<div class="box9" :style='{"width":"20%","background":"#fff","display":"none","height":"80px"}'></div>
		<div class="box10" :style='{"width":"20%","background":"#fff","display":"none","height":"80px"}'></div>
	</div>
	
	<div class="title" :style='{"width":"100%","padding":"0px 20px 10px","margin":"60px auto 20px","lineHeight":"80px","textAlign":"center","background":"url(http://codegen.caihongy.cn/20230112/29169018b843423c8957ea726e68c749.png) no-repeat center bottom / 100% auto"}'>
		<span :style='{"color":"#333","margin":"0 8px 0 0","fontSize":"18px"}'>健康资讯</span>
	</div>
	
	
	
	
	
	
	
	
	
	
	
	<!-- 样式十 -->
	<div v-if="newsList.length" class="list list10 index-pv1" :style='{"padding":"10px 0px","flexWrap":"wrap","textAlign":"left","background":"none","display":"flex","width":"100%","justifyContent":"space-between","height":"auto"}'>
	  <div v-if="newsList.length>0" @click="toDetail('newsDetail', newsList[0])" :style='{"width":"48%","margin":"0 0px","position":"relative","background":"#fff","height":"auto"}' class="new10-list-item animation-box">
	    <img :style='{"width":"100%","boxShadow":"0px 56px 36px -60px #999","objectFit":"cover","display":"block","height":"254px"}' :src="baseUrl + newsList[0].picture" alt="">
		<div :style='{"padding":"4px 10px","whiteSpace":"nowrap","overflow":"hidden","color":"#a1c842","background":"none","width":"calc(100% - 80px)","fontSize":"16px","lineHeight":"28px","textOverflow":"ellipsis","fontWeight":"600"}' class="new9-list-item-title line1">{{newsList[0].title}}</div>
		<div :style='{"fontSize":"12px","lineHeight":"24px","position":"absolute","right":"10px","color":"#a1c842","top":"270px"}' class="new9-list-item-time">{{newsList[0].addtime.split(' ')[0]}}</div>
	    <div :style='{"padding":"0 10px","overflow":"hidden","color":"#666","fontSize":"14px","lineHeight":"24px","textIndent":"2em","height":"72px"}' class="new9-list-item-descript line2">{{newsList[0].introduction}}</div>
		<div :style='{"padding":"0 10px","margin":"0 10px 10px","color":"#999","background":"#fff","display":"none","fontSize":"12px","lineHeight":"24px"}' class="new9-list-item-identification">新闻动态</div>
	  </div>
	  <div v-if="newsList.length>1" :style='{"margin":"0 0px","background":"none","flexDirection":"column","display":"flex","width":"48%","position":"relative","justifyContent":"space-between","height":"auto"}'>
	    <div v-for="(item,index) in newsList" v-if="index<4 && index>0" :key="index" @click="toDetail('newsDetail', item)" :style='{"width":"100%","position":"relative","background":"#fff","height":"120px"}' class="new10-list-item animation-box">
	        <div :style='{"padding":"4px 10px","whiteSpace":"nowrap","overflow":"hidden","color":"#ff8503","width":"calc(100% - 80px)","fontSize":"14px","lineHeight":"28px","textOverflow":"ellipsis","fontWeight":"600"}' class="new9-list-item-title line1">{{ item.title }}</div>
	        <div :style='{"fontSize":"12px","lineHeight":"24px","position":"absolute","right":"10px","color":"#e3aa80","top":"4px"}' class="new9-list-item-time">{{ item.addtime.split(' ')[0] }}</div>
			<div :style='{"padding":"0 10px","margin":"0 auto","overflow":"hidden","color":"#666","width":"100%","fontSize":"14px","lineHeight":"24px","textIndent":"2em","height":"72px"}' class="new9-list-item-descript line2">{{ item.introduction }}</div>
			<div :style='{"padding":"0 10px","fontSize":"12px","lineHeight":"24px","color":"#999","background":"#fff","display":"none"}' class="new9-list-item-identification">新闻动态</div>
	    </div>
	  </div>
	</div>
	
	<div @click="moreBtn('news')" :style='{"border":"1px dashed #fff","margin":"76px auto","top":"0","borderRadius":"30px","textAlign":"center","background":"none","display":"inline-block","width":"80px","lineHeight":"36px","position":"absolute","right":"20px"}'>
		<span :style='{"color":"#fff","fontSize":"12px"}'>查看更多</span>
		<i v-if="true" :style='{"color":"#fff","fontSize":"12px"}' class="el-icon-d-arrow-right"></i>
	</div>
	
</div>




</div>
</template>

<script>
  export default {
    //数据集合
    data() {
      return {
        baseUrl: '',
        aboutUsDetail: {},
        systemIntroductionDetail: {},
        newsList: [],
        caipinxinxiRecommend: [],

      }
    },
    created() {
      this.baseUrl = this.$config.baseUrl;
      this.getNewsList();
      this.getAboutUs();
      this.getSystemIntroduction();
      this.getList();
    },
    //方法集合
    methods: {
      preHttp(str) {
          return str && str.substr(0,4)=='http';
      },
      getAboutUs() {
          this.$http.get('aboutus/detail/1', {}).then(res => {
            if(res.data.code == 0) {
              this.aboutUsDetail = res.data.data;
            }
          })
      },
      getSystemIntroduction() {
          this.$http.get('systemintro/detail/1', {}).then(res => {
            if(res.data.code == 0) {
              this.systemIntroductionDetail = res.data.data;
            }
          })
      },
		getNewsList() {
			this.$http.get('news/list', {params: {
				page: 1,
				limit: 4,
			order: 'desc'}}).then(res => {
				if (res.data.code == 0) {
					this.newsList = res.data.data.list;
					
					
				}
			});
		},
		getList() {
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
					this.caipinxinxiRecommend = res.data.data.list;
					
					
					// 商品列表样式五
					
				}
			});
			
		},
		toDetail(path, item) {
			this.$router.push({path: '/index/' + path, query: {detailObj: JSON.stringify(item)}});
		},
		moreBtn(path) {
			this.$router.push({path: '/index/' + path});
		}
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.home-preview {
	
		.recommend {
			.list3 .swiper-button-prev {
				left: 10px;
				right: auto;
			}
			
			.list3 .swiper-button-prev::after {
				color: rgb(64, 158, 255);
			}
			
			.list3 .swiper-button-next {
				left: auto;
				right: 10px;
			}
			
			.list3 .swiper-button-next::after {
				color: rgb(64, 158, 255);
			}
			
			.list5 .swiper-button-prev {
				left: 10px;
				right: auto;
			}
			
			.list5 .swiper-button-prev::after {
				color: rgb(64, 158, 255);
        }
        
        .list5 .swiper-button-next {
				left: auto;
				right: 10px;
			}
			
			.list5 .swiper-button-next::after {
				color: rgb(64, 158, 255);
			}
			
			.list5 {
				.swiper-slide-prev {
					position: relative;
					z-index: 3;
				}
		
				.swiper-slide-next {
					position: relative;
					z-index: 3;
				}
		
				.swiper-slide-active {
					position: relative;
					z-index: 5;
				}
			}
			
			.index-pv1 .animation-box {
				transform: rotate(0deg) scale(1) skew(0deg, 0deg) translate3d(0px, 0px, 0px);
				z-index: initial;
			}
			
			.index-pv1 .animation-box:hover {
				transform: scale(0.96);
				-webkit-perspective: 1000px;
				perspective: 1000px;
				transition: 0.3s;
				z-index: 1;
			}
			
			.index-pv1 .animation-box img {
				transform: rotate(0deg) scale(1) skew(0deg, 0deg) translate3d(0px, 0px, 0px);
			}
			
			.index-pv1 .animation-box img:hover {
				-webkit-perspective: 1000px;
				perspective: 1000px;
				transition: 0.3s;
			}
		}
		
		.news {
			.list3 .swiper-button-prev {
				left: 10px;
				right: auto;
			}
			
			.list3 .swiper-button-prev::after {
				color: rgb(64, 158, 255);
			}
			
			.list3 .swiper-button-next {
				left: auto;
				right: 10px;
			}
			
			.list3 .swiper-button-next::after {
				color: rgb(64, 158, 255);
			}
			
			.list6 .swiper-button-prev {
				left: 10px;
				right: auto;
			}
			
			.list6 .swiper-button-prev::after {
				color: rgb(64, 158, 255);
			}
			
			.list6 .swiper-button-next {
				left: auto;
				right: 10px;
			}
			
			.list6 .swiper-button-next::after {
				color: rgb(64, 158, 255);
			}
			
			.index-pv1 .animation-box {
				transform: rotate(0deg) scale(1) skew(0deg, 0deg) translate3d(0px, 0px, 0px);
				z-index: initial;
			}
			
			.index-pv1 .animation-box:hover {
				transform: scale(0.96);
				-webkit-perspective: 1000px;
				perspective: 1000px;
				transition: 0.3s;
				z-index: 1;
			}
			
			.index-pv1 .animation-box img {
				transform: rotate(0deg) scale(1) skew(0deg, 0deg) translate3d(0px, 0px, 0px);
			}
			
			.index-pv1 .animation-box img:hover {
				-webkit-perspective: 1000px;
				perspective: 1000px;
				transition: 0.3s;
			}
		}
	
		.lists {
			.list3 .swiper-button-prev {
				left: 10px;
				right: auto;
			}
			
			.list3 .swiper-button-prev::after {
				color: rgb(64, 158, 255);
			}
			
			.list3 .swiper-button-next {
				left: auto;
				right: 10px;
        }
        
        .list3 .swiper-button-next::after {
				color: rgb(64, 158, 255);
			}
			
			.list5 .swiper-button-prev {
				left: 10px;
				right: auto;
			}
			
			.list5 .swiper-button-prev::after {
				color: rgb(64, 158, 255);
			}
			
			.list5 .swiper-button-next {
            left: auto;
            right: 10px;
			}
			
			.list5 .swiper-button-next::after {
				color: rgb(64, 158, 255);
			}
			
			.list5 {
				.swiper-slide-prev {
					position: relative;
					z-index: 3;
				}
		
				.swiper-slide-next {
					position: relative;
					z-index: 3;
				}
		
				.swiper-slide-active {
					position: relative;
					z-index: 5;
				}
			}
			
			.index-pv1 .animation-box {
				transform: rotate(0deg) scale(1) skew(0deg, 0deg) translate3d(0px, 0px, 0px);
				z-index: initial;
			}
			
			.index-pv1 .animation-box:hover {
				transform: scale(0.96);
				-webkit-perspective: 1000px;
				perspective: 1000px;
				transition: 0.3s;
				z-index: 1;
			}
			
			.index-pv1 .animation-box img {
				transform: rotate(0deg) scale(1) skew(0deg, 0deg) translate3d(0px, 0px, 0px);
			}
			
			.index-pv1 .animation-box img:hover {
				transform: scale(1.01);
				-webkit-perspective: 1000px;
				perspective: 1000px;
				transition: 0.3s;
			}
		}
	}
</style>
