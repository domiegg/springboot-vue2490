<template>
	<div class="addEdit-block" style="width: 100%;">
		<el-form
			:style='{"borderRadius":"6px","padding":"30px"}'
			class="add-update-preview"
			ref="ruleForm"
			:model="ruleForm"
			:rules="rules"
			label-width="140px"
		>
			<template >
				<el-form-item :style='{"width":"45%","margin":"0 2% 20px 0","display":"inline-block"}' class="input" v-if="type!='info'"  label="菜品名称" prop="caipinmingcheng">
					<el-input v-model="ruleForm.caipinmingcheng" placeholder="菜品名称" clearable  :readonly="ro.caipinmingcheng"></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"45%","margin":"0 2% 20px 0","display":"inline-block"}' v-else class="input" label="菜品名称" prop="caipinmingcheng">
					<el-input v-model="ruleForm.caipinmingcheng" placeholder="菜品名称" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"45%","margin":"0 2% 20px 0","display":"inline-block"}' class="select" v-if="type!='info'"  label="菜品分类" prop="caipinfenlei">
					<el-select :disabled="ro.caipinfenlei" v-model="ruleForm.caipinfenlei" placeholder="请选择菜品分类" >
						<el-option
							v-for="(item,index) in caipinfenleiOptions"
							v-bind:key="index"
							:label="item"
							:value="item">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item :style='{"width":"45%","margin":"0 2% 20px 0","display":"inline-block"}' v-else class="input" label="菜品分类" prop="caipinfenlei">
					<el-input v-model="ruleForm.caipinfenlei"
						placeholder="菜品分类" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"45%","margin":"0 2% 20px 0","display":"inline-block"}' class="upload" v-if="type!='info' && !ro.caipinfengmian" label="菜品封面" prop="caipinfengmian">
					<file-upload
						tip="点击上传菜品封面"
						action="file/upload"
						:limit="3"
						:multiple="true"
						:fileUrls="ruleForm.caipinfengmian?ruleForm.caipinfengmian:''"
						@change="caipinfengmianUploadChange"
					></file-upload>
				</el-form-item>
				<el-form-item :style='{"width":"45%","margin":"0 2% 20px 0","display":"inline-block"}' class="upload" v-else-if="ruleForm.caipinfengmian" label="菜品封面" prop="caipinfengmian">
					<img v-if="ruleForm.caipinfengmian.substring(0,4)=='http'" class="upload-img" style="margin-right:20px;" v-bind:key="index" :src="ruleForm.caipinfengmian.split(',')[0]" width="100" height="100">
					<img v-else class="upload-img" style="margin-right:20px;" v-bind:key="index" v-for="(item,index) in ruleForm.caipinfengmian.split(',')" :src="$base.url+item" width="100" height="100">
				</el-form-item>
				<el-form-item :style='{"width":"45%","margin":"0 2% 20px 0","display":"inline-block"}' class="input" v-if="type!='info'"  label="口味" prop="kouwei">
					<el-input v-model="ruleForm.kouwei" placeholder="口味" clearable  :readonly="ro.kouwei"></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"45%","margin":"0 2% 20px 0","display":"inline-block"}' v-else class="input" label="口味" prop="kouwei">
					<el-input v-model="ruleForm.kouwei" placeholder="口味" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"45%","margin":"0 2% 20px 0","display":"inline-block"}' class="input" v-if="type!='info'"  label="材料" prop="cailiao">
					<el-input v-model="ruleForm.cailiao" placeholder="材料" clearable  :readonly="ro.cailiao"></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"45%","margin":"0 2% 20px 0","display":"inline-block"}' v-else class="input" label="材料" prop="cailiao">
					<el-input v-model="ruleForm.cailiao" placeholder="材料" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"45%","margin":"0 2% 20px 0","display":"inline-block"}' class="input" v-if="type!='info'"  label="营养成分" prop="yingyangchengfen">
					<el-input v-model="ruleForm.yingyangchengfen" placeholder="营养成分" clearable  :readonly="ro.yingyangchengfen"></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"45%","margin":"0 2% 20px 0","display":"inline-block"}' v-else class="input" label="营养成分" prop="yingyangchengfen">
					<el-input v-model="ruleForm.yingyangchengfen" placeholder="营养成分" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"45%","margin":"0 2% 20px 0","display":"inline-block"}' class="input" v-if="type!='info'"  label="制作工艺" prop="zhizuogongyi">
					<el-input v-model="ruleForm.zhizuogongyi" placeholder="制作工艺" clearable  :readonly="ro.zhizuogongyi"></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"45%","margin":"0 2% 20px 0","display":"inline-block"}' v-else class="input" label="制作工艺" prop="zhizuogongyi">
					<el-input v-model="ruleForm.zhizuogongyi" placeholder="制作工艺" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"45%","margin":"0 2% 20px 0","display":"inline-block"}' class="input" v-if="type!='info'"  label="商家账号" prop="shangjiazhanghao">
					<el-input v-model="ruleForm.shangjiazhanghao" placeholder="商家账号" clearable  :readonly="ro.shangjiazhanghao"></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"45%","margin":"0 2% 20px 0","display":"inline-block"}' v-else class="input" label="商家账号" prop="shangjiazhanghao">
					<el-input v-model="ruleForm.shangjiazhanghao" placeholder="商家账号" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"45%","margin":"0 2% 20px 0","display":"inline-block"}' class="input" v-if="type!='info'"  label="商家名称" prop="shangjiamingcheng">
					<el-input v-model="ruleForm.shangjiamingcheng" placeholder="商家名称" clearable  :readonly="ro.shangjiamingcheng"></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"45%","margin":"0 2% 20px 0","display":"inline-block"}' v-else class="input" label="商家名称" prop="shangjiamingcheng">
					<el-input v-model="ruleForm.shangjiamingcheng" placeholder="商家名称" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"45%","margin":"0 2% 20px 0","display":"inline-block"}' class="input" v-if="type!='info'"  label="商家地址" prop="shangjiadizhi">
					<el-input v-model="ruleForm.shangjiadizhi" placeholder="商家地址" clearable  :readonly="ro.shangjiadizhi"></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"45%","margin":"0 2% 20px 0","display":"inline-block"}' v-else class="input" label="商家地址" prop="shangjiadizhi">
					<el-input v-model="ruleForm.shangjiadizhi" placeholder="商家地址" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"45%","margin":"0 2% 20px 0","display":"inline-block"}' class="input" v-if="type!='info'"  label="联系手机" prop="lianxishouji">
					<el-input v-model="ruleForm.lianxishouji" placeholder="联系手机" clearable  :readonly="ro.lianxishouji"></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"45%","margin":"0 2% 20px 0","display":"inline-block"}' v-else class="input" label="联系手机" prop="lianxishouji">
					<el-input v-model="ruleForm.lianxishouji" placeholder="联系手机" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"45%","margin":"0 2% 20px 0","display":"inline-block"}' class="input" v-if="type!='info'"  label="单限" prop="onelimittimes">
					<el-input v-model="ruleForm.onelimittimes" placeholder="单限" clearable  :readonly="ro.onelimittimes"></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"45%","margin":"0 2% 20px 0","display":"inline-block"}' v-else class="input" label="单限" prop="onelimittimes">
					<el-input v-model="ruleForm.onelimittimes" placeholder="单限" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"45%","margin":"0 2% 20px 0","display":"inline-block"}' class="input" v-if="type!='info'"  label="库存" prop="alllimittimes">
					<el-input v-model="ruleForm.alllimittimes" placeholder="库存" clearable  :readonly="ro.alllimittimes"></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"45%","margin":"0 2% 20px 0","display":"inline-block"}' v-else class="input" label="库存" prop="alllimittimes">
					<el-input v-model="ruleForm.alllimittimes" placeholder="库存" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"45%","margin":"0 2% 20px 0","display":"inline-block"}' class="input" v-if="type!='info'"  label="价格" prop="price">
					<el-input v-model="ruleForm.price" placeholder="价格" clearable  :readonly="ro.price"></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"45%","margin":"0 2% 20px 0","display":"inline-block"}' v-else class="input" label="价格" prop="price">
					<el-input v-model="ruleForm.price" placeholder="价格" readonly></el-input>
				</el-form-item>
			</template>
				<el-form-item :style='{"width":"45%","margin":"0 2% 20px 0","display":"inline-block"}' v-if="type!='info'"  label="菜品详情" prop="caipinxiangqing">
					<editor 
						style="min-width: 200px; max-width: 600px;"
						v-model="ruleForm.caipinxiangqing" 
						class="editor" 
						action="file/upload">
					</editor>
				</el-form-item>
				<el-form-item :style='{"width":"45%","margin":"0 2% 20px 0","display":"inline-block"}' v-else-if="ruleForm.caipinxiangqing" label="菜品详情" prop="caipinxiangqing">
                    <span :style='{"fontSize":"14px","lineHeight":"40px","color":"rgba(90, 67, 74, 1)","fontWeight":"500","display":"inline-block"}' v-html="ruleForm.caipinxiangqing"></span>
                </el-form-item>
			<el-form-item :style='{"padding":"0","margin":"0"}' class="btn">
				<el-button :style='{"border":"0","cursor":"pointer","padding":"0","margin":"0 20px 0 0","outline":"none","color":"rgba(255, 255, 255, 1)","borderRadius":"4px","background":"rgba(90, 67, 74, 1)","width":"128px","lineHeight":"40px","fontSize":"14px","height":"40px"}'  v-if="type!='info'" type="primary" class="btn-success" @click="onSubmit">提交</el-button>
				<el-button :style='{"border":"2px solid rgba(90, 67, 74, 1)","cursor":"pointer","padding":"0","margin":"0","outline":"none","color":"rgba(90, 67, 74, 1)","borderRadius":"4px","background":"rgba(255, 255, 255, 1)","width":"128px","lineHeight":"40px","fontSize":"14px","height":"40px"}' v-if="type!='info'" class="btn-close" @click="back()">取消</el-button>
				<el-button :style='{"border":"2px solid rgba(90, 67, 74, 1)","cursor":"pointer","padding":"0","margin":"0","outline":"none","color":"rgba(90, 67, 74, 1)","borderRadius":"4px","background":"rgba(255, 255, 255, 1)","width":"128px","lineHeight":"40px","fontSize":"14px","height":"40px"}' v-if="type=='info'" class="btn-close" @click="back()">返回</el-button>
			</el-form-item>
		</el-form>
    

  </div>
</template>
<script>
// 数字，邮件，手机，url，身份证校验
import { isNumber,isIntNumer,isEmail,isPhone, isMobile,isURL,checkIdCard } from "@/utils/validate";
export default {
	data() {
		let self = this
		var validateIdCard = (rule, value, callback) => {
			if(!value){
				callback();
			} else if (!checkIdCard(value)) {
				callback(new Error("请输入正确的身份证号码"));
			} else {
				callback();
			}
		};
		var validateUrl = (rule, value, callback) => {
			if(!value){
				callback();
			} else if (!isURL(value)) {
				callback(new Error("请输入正确的URL地址"));
			} else {
				callback();
			}
		};
		var validateMobile = (rule, value, callback) => {
			if(!value){
				callback();
			} else if (!isMobile(value)) {
				callback(new Error("请输入正确的手机号码"));
			} else {
				callback();
			}
		};
		var validatePhone = (rule, value, callback) => {
			if(!value){
				callback();
			} else if (!isPhone(value)) {
				callback(new Error("请输入正确的电话号码"));
			} else {
				callback();
			}
		};
		var validateEmail = (rule, value, callback) => {
			if(!value){
				callback();
			} else if (!isEmail(value)) {
				callback(new Error("请输入正确的邮箱地址"));
			} else {
				callback();
			}
		};
		var validateNumber = (rule, value, callback) => {
			if(!value){
				callback();
			} else if (!isNumber(value)) {
				callback(new Error("请输入数字"));
			} else {
				callback();
			}
		};
		var validateIntNumber = (rule, value, callback) => {
			if(!value){
				callback();
			} else if (!isIntNumer(value)) {
				callback(new Error("请输入整数"));
			} else {
				callback();
			}
		};
		return {
			id: '',
			type: '',
			
			
			ro:{
				caipinmingcheng : false,
				caipinfenlei : false,
				caipinfengmian : false,
				kouwei : false,
				cailiao : false,
				yingyangchengfen : false,
				zhizuogongyi : false,
				caipinxiangqing : false,
				shangjiazhanghao : false,
				shangjiamingcheng : false,
				shangjiadizhi : false,
				lianxishouji : false,
				onelimittimes : false,
				alllimittimes : false,
				thumbsupnum : false,
				crazilynum : false,
				clicktime : false,
				price : false,
			},
			
			
			ruleForm: {
				caipinmingcheng: '',
				caipinfenlei: '',
				caipinfengmian: '',
				kouwei: '',
				cailiao: '',
				yingyangchengfen: '',
				zhizuogongyi: '',
				caipinxiangqing: '',
				shangjiazhanghao: '',
				shangjiamingcheng: '',
				shangjiadizhi: '',
				lianxishouji: '',
				onelimittimes: '-1',
				alllimittimes: '-1',
				clicktime: '',
				price: '',
			},
		
			caipinfenleiOptions: [],
			
			rules: {
				caipinmingcheng: [
					{ required: true, message: '菜品名称不能为空', trigger: 'blur' },
				],
				caipinfenlei: [
					{ required: true, message: '菜品分类不能为空', trigger: 'blur' },
				],
				caipinfengmian: [
				],
				kouwei: [
					{ required: true, message: '口味不能为空', trigger: 'blur' },
				],
				cailiao: [
					{ required: true, message: '材料不能为空', trigger: 'blur' },
				],
				yingyangchengfen: [
				],
				zhizuogongyi: [
				],
				caipinxiangqing: [
				],
				shangjiazhanghao: [
				],
				shangjiamingcheng: [
				],
				shangjiadizhi: [
				],
				lianxishouji: [
				],
				onelimittimes: [
					{ validator: validateIntNumber, trigger: 'blur' },
				],
				alllimittimes: [
					{ validator: validateIntNumber, trigger: 'blur' },
				],
				thumbsupnum: [
					{ validator: validateIntNumber, trigger: 'blur' },
				],
				crazilynum: [
					{ validator: validateIntNumber, trigger: 'blur' },
				],
				clicktime: [
				],
				price: [
					{ required: true, message: '价格不能为空', trigger: 'blur' },
					{ validator: validateNumber, trigger: 'blur' },
				],
			}
		};
	},
	props: ["parent"],
	computed: {



	},
	created() {
	},
	methods: {
		
		// 下载
		download(file){
			window.open(`${file}`)
		},
		// 初始化
		init(id,type) {
			if (id) {
				this.id = id;
				this.type = type;
			}
			if(this.type=='info'||this.type=='else'){
				this.info(id);
			}else if(this.type=='logistics'){
				this.logistics=false;
				this.info(id);
			}else if(this.type=='cross'){
				var obj = this.$storage.getObj('crossObj');
				for (var o in obj){
						if(o=='caipinmingcheng'){
							this.ruleForm.caipinmingcheng = obj[o];
							this.ro.caipinmingcheng = true;
							continue;
						}
						if(o=='caipinfenlei'){
							this.ruleForm.caipinfenlei = obj[o];
							this.ro.caipinfenlei = true;
							continue;
						}
						if(o=='caipinfengmian'){
							this.ruleForm.caipinfengmian = obj[o];
							this.ro.caipinfengmian = true;
							continue;
						}
						if(o=='kouwei'){
							this.ruleForm.kouwei = obj[o];
							this.ro.kouwei = true;
							continue;
						}
						if(o=='cailiao'){
							this.ruleForm.cailiao = obj[o];
							this.ro.cailiao = true;
							continue;
						}
						if(o=='yingyangchengfen'){
							this.ruleForm.yingyangchengfen = obj[o];
							this.ro.yingyangchengfen = true;
							continue;
						}
						if(o=='zhizuogongyi'){
							this.ruleForm.zhizuogongyi = obj[o];
							this.ro.zhizuogongyi = true;
							continue;
						}
						if(o=='caipinxiangqing'){
							this.ruleForm.caipinxiangqing = obj[o];
							this.ro.caipinxiangqing = true;
							continue;
						}
						if(o=='shangjiazhanghao'){
							this.ruleForm.shangjiazhanghao = obj[o];
							this.ro.shangjiazhanghao = true;
							continue;
						}
						if(o=='shangjiamingcheng'){
							this.ruleForm.shangjiamingcheng = obj[o];
							this.ro.shangjiamingcheng = true;
							continue;
						}
						if(o=='shangjiadizhi'){
							this.ruleForm.shangjiadizhi = obj[o];
							this.ro.shangjiadizhi = true;
							continue;
						}
						if(o=='lianxishouji'){
							this.ruleForm.lianxishouji = obj[o];
							this.ro.lianxishouji = true;
							continue;
						}
						if(o=='onelimittimes'){
							this.ruleForm.onelimittimes = obj[o];
							this.ro.onelimittimes = true;
							continue;
						}
						if(o=='alllimittimes'){
							this.ruleForm.alllimittimes = obj[o];
							this.ro.alllimittimes = true;
							continue;
						}
						if(o=='thumbsupnum'){
							this.ruleForm.thumbsupnum = obj[o];
							this.ro.thumbsupnum = true;
							continue;
						}
						if(o=='crazilynum'){
							this.ruleForm.crazilynum = obj[o];
							this.ro.crazilynum = true;
							continue;
						}
						if(o=='clicktime'){
							this.ruleForm.clicktime = obj[o];
							this.ro.clicktime = true;
							continue;
						}
						if(o=='price'){
							this.ruleForm.price = obj[o];
							this.ro.price = true;
							continue;
						}
				}
				













				this.ruleForm.onelimittimes='-1'

				this.ruleForm.alllimittimes='-1'




			}
			
			
			// 获取用户信息
			this.$http({
				url: `${this.$storage.get('sessionTable')}/session`,
				method: "get"
			}).then(({ data }) => {
				if (data && data.code === 0) {
					
					var json = data.data;
					if(((json.shangjiazhanghao!=''&&json.shangjiazhanghao) || json.shangjiazhanghao==0) && this.$storage.get("role")!="管理员"){
						this.ruleForm.shangjiazhanghao = json.shangjiazhanghao
						this.ro.shangjiazhanghao = true;
					}
					if(((json.shangjiamingcheng!=''&&json.shangjiamingcheng) || json.shangjiamingcheng==0) && this.$storage.get("role")!="管理员"){
						this.ruleForm.shangjiamingcheng = json.shangjiamingcheng
						this.ro.shangjiamingcheng = true;
					}
					if(((json.shangjiadizhi!=''&&json.shangjiadizhi) || json.shangjiadizhi==0) && this.$storage.get("role")!="管理员"){
						this.ruleForm.shangjiadizhi = json.shangjiadizhi
						this.ro.shangjiadizhi = true;
					}
					if(((json.lianxishouji!=''&&json.lianxishouji) || json.lianxishouji==0) && this.$storage.get("role")!="管理员"){
						this.ruleForm.lianxishouji = json.lianxishouji
						this.ro.lianxishouji = true;
					}
				} else {
					this.$message.error(data.msg);
				}
			});
			
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
    // 多级联动参数

    info(id) {
      this.$http({
        url: `caipinxinxi/info/${id}`,
        method: "get"
      }).then(({ data }) => {
        if (data && data.code === 0) {
        this.ruleForm = data.data;
        //解决前台上传图片后台不显示的问题
        let reg=new RegExp('../../../upload','g')//g代表全部
        this.ruleForm.caipinxiangqing = this.ruleForm.caipinxiangqing.replace(reg,'../../../springboot02187/upload');
        } else {
          this.$message.error(data.msg);
        }
      });
    },


    // 提交
    onSubmit() {






	if(this.ruleForm.caipinfengmian!=null) {
		this.ruleForm.caipinfengmian = this.ruleForm.caipinfengmian.replace(new RegExp(this.$base.url,"g"),"");
	}































var objcross = this.$storage.getObj('crossObj');

      //更新跨表属性
       var crossuserid;
       var crossrefid;
       var crossoptnum;
       if(this.type=='cross'){
                var statusColumnName = this.$storage.get('statusColumnName');
                var statusColumnValue = this.$storage.get('statusColumnValue');
                if(statusColumnName!='') {
                        var obj = this.$storage.getObj('crossObj');
                       if(statusColumnName && !statusColumnName.startsWith("[")) {
                               for (var o in obj){
                                 if(o==statusColumnName){
                                   obj[o] = statusColumnValue;
                                 }
                               }
                               var table = this.$storage.get('crossTable');
                             this.$http({
                                 url: `${table}/update`,
                                 method: "post",
                                 data: obj
                               }).then(({ data }) => {});
                       } else {
                               crossuserid=this.$storage.get('userid');
                               crossrefid=obj['id'];
                               crossoptnum=this.$storage.get('statusColumnName');
                               crossoptnum=crossoptnum.replace(/\[/,"").replace(/\]/,"");
                        }
                }
        }
       this.$refs["ruleForm"].validate(valid => {
         if (valid) {
		 if(crossrefid && crossuserid) {
			 this.ruleForm.crossuserid = crossuserid;
			 this.ruleForm.crossrefid = crossrefid;
			let params = { 
				page: 1, 
				limit: 10, 
				crossuserid:this.ruleForm.crossuserid,
				crossrefid:this.ruleForm.crossrefid,
			} 
			this.$http({ 
				url: "caipinxinxi/page", 
				method: "get", 
				params: params 
			}).then(({ 
				data 
			}) => { 
				if (data && data.code === 0) { 
				       if(data.data.total>=crossoptnum) {
					     this.$message.error(this.$storage.get('tips'));
					       return false;
				       } else {
					 this.$http({
					   url: `caipinxinxi/${!this.ruleForm.id ? "save" : "update"}`,
					   method: "post",
					   data: this.ruleForm
					 }).then(({ data }) => {
					   if (data && data.code === 0) {
					     this.$message({
					       message: "操作成功",
					       type: "success",
					       duration: 1500,
					       onClose: () => {
						 this.parent.showFlag = true;
						 this.parent.addOrUpdateFlag = false;
						 this.parent.caipinxinxiCrossAddOrUpdateFlag = false;
						 this.parent.search();
						 this.parent.contentStyleChange();
					       }
					     });
					   } else {
					     this.$message.error(data.msg);
					   }
					 });

				       }
				} else { 
				} 
			});
		 } else {
			 this.$http({
			   url: `caipinxinxi/${!this.ruleForm.id ? "save" : "update"}`,
			   method: "post",
			   data: this.ruleForm
			 }).then(({ data }) => {
			   if (data && data.code === 0) {
			     this.$message({
			       message: "操作成功",
			       type: "success",
			       duration: 1500,
			       onClose: () => {
				 this.parent.showFlag = true;
				 this.parent.addOrUpdateFlag = false;
				 this.parent.caipinxinxiCrossAddOrUpdateFlag = false;
				 this.parent.search();
				 this.parent.contentStyleChange();
			       }
			     });
			   } else {
			     this.$message.error(data.msg);
			   }
			 });
		 }
         }
       });
    },
    // 获取uuid
    getUUID () {
      return new Date().getTime();
    },
    // 返回
    back() {
      this.parent.showFlag = true;
      this.parent.addOrUpdateFlag = false;
      this.parent.caipinxinxiCrossAddOrUpdateFlag = false;
      this.parent.contentStyleChange();
    },
    caipinfengmianUploadChange(fileUrls) {
	    this.ruleForm.caipinfengmian = fileUrls;
    },
  }
};
</script>
<style lang="scss" scoped>
	.amap-wrapper {
		width: 100%;
		height: 500px;
	}
	
	.search-box {
		position: absolute;
	}
	
	.el-date-editor.el-input {
		width: auto;
	}
	
	.add-update-preview .el-form-item /deep/ .el-form-item__label {
	  	  padding: 0 10px 0 0;
	  	  color: #666;
	  	  font-weight: 600;
	  	  width: 140px;
	  	  font-size: 14px;
	  	  line-height: 40px;
	  	  text-align: right;
	  	}
	
	.add-update-preview .el-form-item /deep/ .el-form-item__content {
	  margin-left: 140px;
	}
	
	.add-update-preview .el-input /deep/ .el-input__inner {
	  	  border: 2px solid #797979;
	  	  border-radius: 4px;
	  	  padding: 0 12px;
	  	  outline: none;
	  	  color: rgba(90, 67, 74, 1);
	  	  width: 300px;
	  	  font-size: 14px;
	  	  height: 40px;
	  	}
	
	.add-update-preview .el-select /deep/ .el-input__inner {
	  	  border: 2px solid #797979;
	  	  border-radius: 4px;
	  	  padding: 0 10px;
	  	  outline: none;
	  	  color: rgba(90, 67, 74, 1);
	  	  width: 200px;
	  	  font-size: 14px;
	  	  height: 40px;
	  	}
	
	.add-update-preview .el-date-editor /deep/ .el-input__inner {
	  	  border: 2px solid #797979;
	  	  border-radius: 4px;
	  	  padding: 0 10px 0 30px;
	  	  outline: none;
	  	  color: rgba(90, 67, 74, 1);
	  	  width: 200px;
	  	  font-size: 14px;
	  	  height: 40px;
	  	}
	
	.add-update-preview /deep/ .el-upload--picture-card {
		background: transparent;
		border: 0;
		border-radius: 0;
		width: auto;
		height: auto;
		line-height: initial;
		vertical-align: middle;
	}
	
	.add-update-preview /deep/ .upload .upload-img {
	  	  border: 2px dashed #797979;
	  	  cursor: pointer;
	  	  border-radius: 6px;
	  	  color: #797979;
	  	  width: 150px;
	  	  font-size: 32px;
	  	  line-height: 150px;
	  	  text-align: center;
	  	  height: 150px;
	  	}
	
	.add-update-preview /deep/ .el-upload-list .el-upload-list__item {
	  	  border: 2px dashed #797979;
	  	  cursor: pointer;
	  	  border-radius: 6px;
	  	  color: #797979;
	  	  width: 150px;
	  	  font-size: 32px;
	  	  line-height: 150px;
	  	  text-align: center;
	  	  height: 150px;
	  	}
	
	.add-update-preview /deep/ .el-upload .el-icon-plus {
	  	  border: 2px dashed #797979;
	  	  cursor: pointer;
	  	  border-radius: 6px;
	  	  color: #797979;
	  	  width: 150px;
	  	  font-size: 32px;
	  	  line-height: 150px;
	  	  text-align: center;
	  	  height: 150px;
	  	}
	
	.add-update-preview .el-textarea /deep/ .el-textarea__inner {
	  	  border: 2px solid #797979;
	  	  border-radius: 4px;
	  	  padding: 12px;
	  	  outline: none;
	  	  color: rgba(90, 67, 74, 1);
	  	  width: 400px;
	  	  font-size: 14px;
	  	  height: 120px;
	  	}
</style>
