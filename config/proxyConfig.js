module.exports = {
	proxy: {
		"/apis": {
			//将www.exaple.com印射为/apis
			target: 'http://kylin.api.yuelvhui.com', //麒麟后台线上老接口
			// target: "http://test-kylin.api.yuelvhui.com", //测试麒麟后台线上老接口
			// target: 'http://10.168.1.73:8005', //老三
			changeOrigin: true, //是否跨域
			pathRewrite: {
				"^/apis": "" //需要rewrite的,
			}
		},
		// '/cidms':{
		// 	target: 'http://cidms.yuetao.group/',
		// 	changeOrigin: true, //是否跨域
		// 	pathRewrite: {
		// 		"^/cidms": "" //需要rewrite的,
		// 	}
		// },
		"/kylins": {
			//将www.exaple.com印射为/apis
			target: 'http://yuetao.yuelvhui.cn', // 线上
			// target: "http://yuetao.yuelvhui.testcn", // 测试
			// target: 'http://10.168.2.220:8060', //长安
			// target: "http://10.168.1.132:8004", //坤坤.
			// target: "http://192.168.2.106:8002", //石相龙
			// target: "http://10.168.1.194:8089", //黄海
			// target: "http://10.168.3.3",//王雪ip
			changeOrigin: true, //是否跨域
			pathRewrite: {
				"^/kylins": "" //需要rewrite的,
			}
		},
		"/plane": {
			//将www.exaple.com印射为/cps
			target: 'http://location.yuetao.group', // 线上
			// target: "http://liveapi.admin.yuelvhui.testcom", // 测试
			// target: "http://10.168.2.86:8088",//于琼（机票）
			// target: "http://10.168.2.194:8090",//王雪（信用卡）
			// target: "http://10.168.1.184:8081",//赵银凡（火车票）
			changeOrigin: true, //是否跨域
			pathRewrite: {
				"^/plane": "" //需要rewrite的,
			}
		},
		"/news": {
			//将www.exaple.com印射为/apis
			target: "http://www.dataanalyapi.com", // 接口域名http://192.168.3.120:8050
			//   target: 'http://192.168.2.118:8060',  // 接口域名
			changeOrigin: true, //是否跨域
			pathRewrite: {
				"^/news": "" //需要rewrite的,
			}
		}
	}
};
