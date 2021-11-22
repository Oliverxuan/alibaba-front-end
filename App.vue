<script>
	export default {
		onLaunch: function() {
			console.warn('当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！')
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	    /* radio 选中后的样式 */
        .one .wx-radio-input.wx-radio-input-checked {
		background-color: #FFCC33;
		border: none;
        }
		.two .wx-radio-input.wx-radio-input-checked {
		background-color: #AEC495;
		border: none;
		}
		.three .wx-radio-input.wx-radio-input-checked {
		background-color: #EB5E19;
		border: none;
		}
		
		/* radio 选中后的图标样式*/
		radio .wx-radio-input.wx-radio-input-checked::before{
			display: none !important;
		}
</style>
