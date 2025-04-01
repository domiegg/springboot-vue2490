<template>
<div :style='{"width":"100%","padding":"30px 7% 40px","margin":"10px auto","position":"relative","background":"rgba(255,255,255,.0)"}'>
    <el-form class="add-update-preview" ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item :style='{"padding":"10px","margin":"0 0 10px"}' label="联系人" prop="name">
        <el-input v-model="form.name" placeholder="联系人"></el-input>
      </el-form-item>
      <el-form-item :style='{"padding":"10px","margin":"0 0 10px"}' label="手机号码" prop="phone">
        <el-input v-model="form.phone" placeholder="手机号码"></el-input>
      </el-form-item>
      <el-form-item :style='{"padding":"10px","margin":"0 0 10px"}' label="默认地址">
        <el-radio-group v-model="form.isdefault">
          <el-radio label="是"></el-radio>
          <el-radio label="否"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :style='{"padding":"10px","margin":"0 0 10px"}' label="地址" prop="address">
        <el-input v-model="form.address" placeholder="请输入地址"></el-input>
      </el-form-item>
      <el-form-item :style='{"padding":"0","textAlign":"center","margin":"0"}'>
        <el-button :style='{"border":"0","cursor":"pointer","padding":"0","margin":"0 20px 0 0","outline":"none","color":"#333","borderRadius":"40px","background":"#87af25","width":"128px","lineHeight":"40px","fontSize":"14px","height":"40px"}' type="primary" @click="onSubmit('form')">添加</el-button>
        <el-button :style='{"border":"0px solid rgba(64, 158, 255, 1)","cursor":"pointer","padding":"0","margin":"0","outline":"none","color":"#333","borderRadius":"40px","background":"#ffc303","width":"128px","lineHeight":"40px","fontSize":"14px","height":"40px"}' @click="goBack">取消</el-button>
      </el-form-item>
    </el-form>

    <el-dialog id="myMapDialog" title="请选择收货地址" width="500px" :visible.sync="dialogVisible" top="5vh">
      <baidu-map class="map" :center="center" :zoom="zoom" :scroll-wheel-zoom="true" @ready="onBaiduMapReady" @click="getClickInfo">
        <bm-view style="width: 100%; height: 100%;" />
        <bm-marker :position="{lng: center.lng, lat: center.lat}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE" />
        <bm-geolocation
          anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
          :showAddressBar="true"
          :autoLocation="true"
        ></bm-geolocation>
      </baidu-map>
      <div slot="footer">
        <el-input v-model="address" style="margin-bottom: 15px;" placeholder="请选择或填写收货地址"></el-input>
        <el-button type="primary" @click="getAddr">确定</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </div>
    </el-dialog>
</div>
</template>

<script>
  import { Loading } from 'element-ui';
  export default {
    //数据集合
    data() {
      return {
        form: {
          userid: localStorage.getItem('userid'),
          name: localStorage.getItem('username'),
          phone: '',
          isdefault: '是',
          address: ''
        },
        rules: {
          name: [{ required: true, message: '请输入联系人', trigger: 'blur' }],
          phone: [
            { required: true, message: '请输入手机号码', trigger: 'blur' },
            { required: true, validator: this.$validate.isMobile, trigger: 'blur' }
          ],
          address: [{ required: true, message: '请选择收货地址', trigger: 'blur' }]
        },
        dialogVisible: false,
        BMap: null, // 地图组件是否就绪
        // center: { lat: 24.30457061, lng: 116.12640310 },
        center: { lng: 0, lat: 0 },
        address: '',
        zoom: 15,
        loadingInstance: null,
        isEdit: false
      }
    },
    created() {
      if (this.$route.query.id != undefined) {
        this.isEdit = true;
        this.form = Object.assign({}, JSON.parse(this.$route.query.editObj));
      }
    },
    //方法集合
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post(`address/${this.isEdit ? 'update' : 'add'}`, this.form).then(res => {
              if (res.data.code == 0) {
                this.$message({
                  message: `${this.isEdit ? '更新' : '添加'}成功`,
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.$router.go(-1);
                  }
                });
              }
            });
          } else {
            return false;
          }
        });
      },
      getAddr() {
        if (this.address == '') {
          this.$message({
            message: '地址不能为空',
            type: 'error',
            duration: 1500
          });
          return;
        }
        this.form.address = this.address;
        this.dialogVisible = false;
      },
      goBack() {
        this.$router.go(-1);
      },
      onBaiduMapReady(e) {
        let that = this
        this.BMap = e.BMap;
        if (this.BMap) {
          const geolocation = new this.BMap.Geolocation();
          geolocation.getCurrentPosition(res => {
            that.$nextTick(() => {
              that.loadingInstance.close();
            });
            that.center.lng = res.point.lng
            that.center.lat = res.point.lat
            const { province, city, district, street, street_number } = res.address;
            that.address = province + city + district + street + street_number;
          })
        }
      },
      getClickInfo(e) {
        this.center.lng = e.point.lng
        this.center.lat = e.point.lat

        if (this.BMap) {
          let that = this
          const geoCoder = new this.BMap.Geocoder()
          geoCoder.getLocation(e.point, function(res) {
            const addrComponent = res.addressComponents
            const surroundingPois = res.surroundingPois
            const province = addrComponent.province
            const city = addrComponent.city
            const district = addrComponent.district
            let addr = addrComponent.street
            if (surroundingPois.length > 0 && surroundingPois[0].title) {
              if (addr) {
                addr += `-${surroundingPois[0].title}`
              } else {
                addr += `${surroundingPois[0].title}`
              }
            } else {
              addr += addrComponent.streetNumber
            }
            that.address = province + city + district + addr;
          })
        }
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.add-update-preview .el-form-item /deep/ .el-form-item__label {
	  	  padding: 0 10px 0 0;
	  	  color: #87af25;
	  	  font-weight: 500;
	  	  width: 120px;
	  	  font-size: 14px;
	  	  line-height: 40px;
	  	  text-align: right;
	  	}
	
	.add-update-preview .el-form-item /deep/ .el-form-item__content {
	  margin-left: 120px;
	}
	
	.add-update-preview .el-input /deep/ .el-input__inner {
	  	  border: 0;
	  	  border-radius: 0;
	  	  padding: 0 12px;
	  	  box-shadow: 0 1px 0 #ffc303;
	  	  outline: none;
	  	  color: #333;
	  	  width: 400px;
	  	  font-size: 14px;
	  	  height: 40px;
	  	}
	
	.add-update-preview .el-select /deep/ .el-input__inner {
	  	  border: 0;
	  	  border-radius: 0;
	  	  padding: 0 10px;
	  	  box-shadow: 0 1px 0 #ffc303;
	  	  outline: none;
	  	  color: #333;
	  	  width: 200px;
	  	  font-size: 14px;
	  	  height: 40px;
	  	}
	
	.add-update-preview .el-date-editor /deep/ .el-input__inner {
	  	  border: 0;
	  	  border-radius: 0;
	  	  padding: 0 10px 0 30px;
	  	  box-shadow: 0 1px 0 #ffc303;
	  	  outline: none;
	  	  color: #333;
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
	  	  border: 1px dashed #c6ecc6;
	  	  cursor: pointer;
	  	  border-radius: 6px;
	  	  color: #333;
	  	  width: 100px;
	  	  font-size: 32px;
	  	  line-height: 100px;
	  	  text-align: center;
	  	  height: 100px;
	  	}
	
	.add-update-preview /deep/ .el-upload-list .el-upload-list__item {
	  	  border: 1px dashed #c6ecc6;
	  	  cursor: pointer;
	  	  border-radius: 6px;
	  	  color: #333;
	  	  width: 100px;
	  	  font-size: 32px;
	  	  line-height: 100px;
	  	  text-align: center;
	  	  height: 100px;
	  	}
	
	.add-update-preview /deep/ .el-upload .el-icon-plus {
	  	  border: 1px dashed #c6ecc6;
	  	  cursor: pointer;
	  	  border-radius: 6px;
	  	  color: #333;
	  	  width: 100px;
	  	  font-size: 32px;
	  	  line-height: 100px;
	  	  text-align: center;
	  	  height: 100px;
	  	}
	
	.add-update-preview .el-textarea /deep/ .el-textarea__inner {
	  	  border: 0;
	  	  border-radius: 0;
	  	  padding: 12px;
	  	  box-shadow: 0 0 2px #ffc303;
	  	  outline: none;
	  	  color: #333;
	  	  width: 400px;
	  	  font-size: 14px;
	  	  height: 120px;
	  	}
    .map{
        height: 50vh;
    }
</style>
