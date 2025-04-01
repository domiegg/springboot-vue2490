<template>
<div class="content">
	<div class="text" :style='{"margin":"50px auto","fontSize":"24px","color":"rgb(51, 51, 51)","textAlign":"center","fontWeight":"bold"}'>欢迎使用 {{this.$project.projectName}}</div>
    <div class="cardView">
        <div class="cards" :style='{"margin":"0 0 20px 0","alignItems":"center","flexDirection":"column","justifyContent":"center","display":"flex"}'>
			<div :style='{"boxShadow":"0 1px 6px rgba(0,0,0,.3)","margin":"3px 10px","borderRadius":"40px","display":"flex"}' v-if="isAuth('caipinxinxi','首页总数')">
				<div :style='{"width":"80px","background":"#ffc523","height":"80px"}'></div>
				<div :style='{"width":"160px","alignItems":"center","flexDirection":"column","justifyContent":"center","display":"flex"}'>
					<div :style='{"margin":"5px 0","lineHeight":"24px","fontSize":"20px","color":"#333","fontWeight":"bold","height":"24px"}'>{{caipinxinxiCount}}</div>
					<div :style='{"margin":"5px 0","lineHeight":"24px","fontSize":"16px","color":"#666","height":"24px"}'>菜品信息总数</div>
				</div>
			</div>
        </div>
        <div style="display: flex;align-items: center;width: 100%;margin-bottom: 10px;">
            <el-card style="width: 50%;margin: 0 10px;" v-if="isAuth('caipinxinxi','首页统计')">
                <div id="caipinxinxiChart1" style="width:100%;height:400px;"></div>
            </el-card>
            <el-card style="width: 50%;margin: 0 10px;" v-if="isAuth('caipinxinxi','首页统计')">
                <div id="caipinxinxiChart2" style="width:100%;height:400px;"></div>
            </el-card>
        </div>
    </div>
</div>
</template>
<script>
//2
import router from '@/router/router-static'
import * as echarts from 'echarts'
export default {
	data() {
		return {
            caipinxinxiCount: 0,
		};
	},
  mounted(){
    this.init();
    this.getcaipinxinxiCount();
    this.caipinxinxiChat1();
    this.caipinxinxiChat2();
  },
  methods:{
    init(){
        if(this.$storage.get('Token')){
        this.$http({
            url: `${this.$storage.get('sessionTable')}/session`,
            method: "get"
        }).then(({ data }) => {
            if (data && data.code != 0) {
            router.push({ name: 'login' })
            }
        });
        }else{
            router.push({ name: 'login' })
        }
    },
    getcaipinxinxiCount() {
        this.$http({
            url: `caipinxinxi/count`,
            method: "get"
        }).then(({
            data
        }) => {
            if (data && data.code == 0) {
                this.caipinxinxiCount = data.data
            }
        })
    },

    caipinxinxiChat1() {
      this.$nextTick(()=>{

        var caipinxinxiChart1 = echarts.init(document.getElementById("caipinxinxiChart1"),'macarons');
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
                caipinxinxiChart1.setOption(option);
                  //根据窗口的大小变动图表
                window.onresize = function() {
                    caipinxinxiChart1.resize();
                };
            }
        });
      })
    },

    caipinxinxiChat2() {
      this.$nextTick(()=>{
        // caipinmingcheng caipinmingcheng
        //  alllimittimes

        var caipinxinxiChart2 = echarts.init(document.getElementById("caipinxinxiChart2"),'macarons');
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
                caipinxinxiChart2.setOption(option);
                  //根据窗口的大小变动图表
                window.onresize = function() {
                    caipinxinxiChart2.resize();
                };
            }
        });
      })
    },





  }
};
</script>
<style lang="scss" scoped>
    .cardView {
        display: flex;
        flex-wrap: wrap;
        width: 100%;

        .cards {
            display: flex;
            align-items: center;
            width: 100%;
            margin-bottom: 10px;
            justify-content: center;
            .card {
                width: calc(25% - 20px);
                margin: 0 10px;
                /deep/.el-card__body{
                    padding: 0;
                }
            }
        }
    }
</style>
