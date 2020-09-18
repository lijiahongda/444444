/** When your routing table is too long, you can split it into small modules**/
import Layout from '@/views/layout/Layout'

var routerName
if (localStorage.getItem('userRole') == 1) {
	routerName = '/admin/list'
} else {
	routerName = '/admin/list'
}
// var routerName = '/home/index'
// var routerName = '/admin/list'
const nestedRouter = [ // 用户管理

	{
		path: '/',
		component: Layout,
		redirect: routerName
	}, {
		path: '/admin',
		component: Layout,
		name: '欢迎页',
		meta: {
			title: '欢迎页',
			icon: 'lock'
		},
		children: [{
			path: 'list',
			component: () => import('@/views/newData/admin/index'),
			name: '欢迎页',
			meta: {
				title: '欢迎页'
			}
		}]
	},
	{
		path: '/cidms',
		component: () => import('@/views/cidms'),
		name: '登录',
		meta: {
			title: '登录',
			icon: 'lock'
		}
	},
	{
		// 当当配置
		path: '/dangconfigure',
		component: Layout,
		name: '当当配置',
		meta: {
			title: '当当配置',
			icon: 'shopping',
			roles: ['admin', 'yangjian']
		},
		children: [{
				path: 'dangHome',
				component: () => import('@/views/newData/dangconfigure/dangHome'),
				name: '首页推荐',
				meta: {
					title: '首页推荐'
				}
			},
			{
				path: 'dangaddclass',
				component: () => import('@/views/newData/dangconfigure/dangaddclass'),
				name: '新增推荐分类',
				meta: {
					title: '新增推荐分类'
				}
			},
			{
				path: 'listdetail',
				component: () => import('@/views/newData/dangconfigure/listdetail'),
				name: '查看列表详情',
				meta: {
					title: '查看列表详情'
				}
			},
			{
				path: 'dangaddbook',
				component: () => import('@/views/newData/dangconfigure/dangaddbook'),
				name: '查看列表详情',
				meta: {
					title: '查看列表详情'
				}
			},
			{
				path: 'dataStatistics',
				component: () => import('@/views/newData/dangconfigure/dataStatistics'),
				name: '数据统计',
				meta: {
					title: '数据统计'
				}
			},
			{
				path: 'bookManage',
				component: () => import('@/views/newData/dangconfigure/bookManage'),
				name: '书品管理',
				meta: {
					title: '书品管理'
				}
			}
		]
	},
	// login
	{
		path: '/login',
		component: () => import('@/views/login/index'),
		hidden: true
	},
	{
		path: '/404',
		component: () => import('@/views/errorPage/404'),
		hidden: true
	},
	{
		path: '/401',
		component: () => import('@/views/errorPage/401'),
		hidden: true
	},
	{
		path: '/home',
		component: Layout,
		meta: {
			icon: 'eye',
			roles: ['admin']
		},
		children: [{
				path: 'index',
				component: () => import('@/views/newData/home/index'),
				name: '运营日报',
				meta: {
					title: '运营日报'
				}
			},
			{
				path: 'gropOrderGoods',
				component: () => import('@/views/newData/home/gropOrderGoods'),
				name: '成长值统计',
				meta: {
					title: '成长值统计'
				}
			},
		]
	},

	// {
	//   path: '/admin',
	//   component: Layout,
	//   name: '权限管理',
	//   meta: {
	//     title: '权限管理',
	//     icon: 'lock', roles: ['admin','2']
	//   },
	//   children: [
	//     {
	//       path: 'list',
	//       component: () => import('@/views/newData/admin/index'),
	//       name: '权限管理',
	//       meta: { title: '权限管理' }
	//     }
	//   ]
	// },
	{ // 权限管理
		path: '/power',
		component: Layout,
		name: '权限管理',
		meta: {
			title: '权限管理',
			icon: 'tab',
			roles: ['admin']
		},
		children: [{
				path: 'adminUser',
				component: () => import('@/views/newData/power/adminUser'),
				name: '员工管理',
				meta: {
					title: '员工管理'
				}
			}, {
				path: 'payConfig',
				component: () => import('@/views/newData/power/payConfig'),
				name: '支付配置',
				meta: {
					title: '支付配置'
				}
			},
			{
				path: 'handleLogs',
				component: () => import('@/views/newData/power/handleLogs'),
				name: '操作日志',
				meta: {
					title: '操作日志'
				}
			},
			{
				path: 'adminRole',
				component: () => import('@/views/newData/power/adminRole'),
				name: '角色管理',
				meta: {
					title: '角色管理'
				}
			},
			{
				path: 'adminRoleAdd',
				component: () => import('@/views/newData/power/adminRoleAdd'),
				name: '新增角色',
				hidden: true,
				meta: {
					title: '新增角色'
				}
			}, {
				path: 'adminPower',
				component: () => import('@/views/newData/power/adminPower'),
				name: '权限管理',
				meta: {
					title: '权限管理'
				}
			}, {
				path: 'adminPowerAdd',
				component: () => import('@/views/newData/power/adminPowerAdd'),
				name: '新增权限',
				meta: {
					title: '新增权限'
				}
			}, {
				path: 'adminDepart',
				component: () => import('@/views/newData/power/adminDepart'),
				name: '部门管理',
				meta: {
					title: '部门管理'
				}
			}, {
				path: 'adminPosition',
				component: () => import('@/views/newData/power/adminPosition'),
				name: '职位管理',
				meta: {
					title: '职位管理'
				}
			}
		]
	},
	// {
	//   path: '/share',
	//   component: () => import('@/views/newData/share/shareH5'),
	//   name: '分享',
	//   meta: { title: '分享' }
	// },
	{
		path: '/share',
		component: Layout, // 分享
		name: '分享',
		meta: {
			title: '分享'
		},
		children: [{
			path: 'H5',
			component: () => import('@/views/newData/share/shareH5'),
			name: '分享H5',
			// hidden: true,
			meta: {
				title: '分享H5'
			}
		}]
	},
	{
		path: '/video-sellGoods',
		component: Layout, // 视频带货
		name: '视频带货',
		meta: {
			title: '视频带货'
		},
		children: [{
				path: 'list',
				component: () => import('@/views/videoSellGoods/goodsList'),
				name: '列表',
				// hidden: true,
				meta: {
					title: '列表'
				}
			},
			{
				path: 'dataAnalyze',
				component: () => import('@/views/videoSellGoods/dataAnalyze'),
				name: '数据分析',
				// hidden: true,
				meta: {
					title: '数据分析'
				}
			},
			{
				path: 'editVideoCargo',
				component: () => import('@/views/videoSellGoods/editVideoCargo'),
				name: '视频上传',
				// hidden: true,
				meta: {
					title: '视频上传'
				}
			}
		]
	},
	// 用户管理
	{
		path: '/financialStatementData',
		component: Layout,
		name: '财务数据报表',
		meta: {
			title: '财务数据报表',
			icon: 'link',
			roles: ['admin', '2']
		},
		children: [{
				path: 'createTableList',
				component: () => import('@/views/financialStatementData/createTable/createTableList'),
				name: '创建数据报表',
				meta: {
					title: '创建数据报表'
				}
			},
			{
				path: 'createTable_add',
				component: () => import('@/views/financialStatementData/createTable/createTable_add'),
				name: '数据报表创建',
				hidden: true,
				meta: {
					title: '数据报表创建'
				}
			},
			{
				path: 'createTable_add_key',
				component: () => import('@/views/financialStatementData/createTable/createTable_add_key'),
				name: '添加字段',
				hidden: true,
				meta: {
					title: '添加字段'
				}
			},
			{
				path: 'createTable_add_data',
				component: () => import('@/views/financialStatementData/createTable/createTable_add_data'),
				name: '添加数据',
				hidden: true,
				meta: {
					title: '添加数据'
				}
			},
			{
				path: 'keysTableList',
				component: () => import('@/views/financialStatementData/keysTable/keysTableList'),
				name: '字段管理',
				meta: {
					title: '字段管理'
				}
			},
			{
				path: 'keysTable_add',
				component: () => import('@/views/financialStatementData/keysTable/keysTable_add'),
				name: '添加字段',
				hidden: true,
				meta: {
					title: '添加字段'
				}
			},
			{
				path: 'dataReportList',
				component: () => import('@/views/financialStatementData/dataReport/dataReportList'),
				name: '数据报表',
				meta: {
					title: '数据报表'
				}
			},
			{
				path: 'dataReportOptions',
				component: () => import('@/views/financialStatementData/dataReport/dataReportOptions'),
				name: '数据报表-详情',
				hidden: true,
				meta: {
					title: '数据报表-详情'
				}
			}
		]
	},
	{ // 定制游管理
		path: '/cust',
		component: Layout,
		name: '定制游管理',
		meta: {
			title: '定制游管理',
			icon: 'tab',
			roles: ['admin']
		},
		children: [{
				path: 'list',
				component: () => import('@/views/newData/cust/list'),
				name: '定制游列表',
				meta: {
					title: '定制游列表'
				}
			},
			{
				path: 'show',
				component: () => import('@/views/newData/cust/show'),
				name: '查看/更新',
				hidden: true,
				meta: {
					title: '查看/更新'
				}
			},
			{
				path: 'caseList',
				component: () => import('@/views/newData/cust/caseList'),
				name: '定制游案例列表',
				meta: {
					title: '定制游案例列表'
				}
			},
			{
				path: 'caseShow',
				component: () => import('@/views/newData/cust/caseShow'),
				name: '查看/更新案例',
				meta: {
					title: '查看/更新案例'
				}
			}
		]
	}, { // 新悦商城管理
		path: '/newmall',
		component: Layout,
		name: '新悦商城管理',
		meta: {
			title: '新悦商城管理',
			icon: 'shopping',
			roles: ['admin', 'yangjian']
		},
		children: [{
				path: 'shopSku',
				component: () => import('@/views/newData/newmall/shopSku'),
				name: '新增Sku',
				hidden: true,
				meta: {
					title: '新增Sku'
				}
			},
			{
				path: 'shopAdd',
				component: () => import('@/views/newData/newmall/shopAdd'),
				name: '新增商品',
				meta: {
					title: '新增商品'
				}
			},
			{
				path: 'shopList',
				component: () => import('@/views/newData/newmall/shopList'),
				name: '商品列表',
				meta: {
					title: '商品列表'
				}
			},
			{
				path: 'newShopList',
				component: () => import('@/views/newData/newmall/newShopList'),
				name: '商品列表',
				meta: {
					title: '商品列表'
				}
			},
			{
				path: 'shoplabel',
				component: () => import('@/views/newData/newmall/shoplabel'),
				name: '商品标签',
				meta: {
					title: '商品标签'
				}
			}, {
				path: 'distribution',
				component: () => import('@/views/newData/newmall/distribution'),
				name: '分销规则管理',
				meta: {
					title: '分销规则管理'
				}
			}, {
				path: 'distributionAdd',
				component: () => import('@/views/newData/newmall/distributionAdd'),
				name: '添加分销规则管理',
				hidden: true,
				meta: {
					title: '添加分销规则管理'
				}
			}, {
				path: 'supplier',
				component: () => import('@/views/newData/newmall/supplier'),
				name: '供应商管理',
				meta: {
					title: '供应商管理'
				}
			}, {
				path: 'classIfication',
				component: () => import('@/views/newData/newmall/classIfication'),
				name: '商品分类',
				meta: {
					title: '商品分类'
				}
			}, {
				path: 'shopComments',
				component: () => import('@/views/newData/newmall/shopComments'),
				name: '评论商品',
				meta: {
					title: '评论商品'
				}
			}
		]
	},
	{ // 营销活动
		path: '/mall',
		component: Layout,
		name: '营销活动',
		meta: {
			title: '营销活动',
			icon: 'nested',
			roles: ['admin', 'yangjian']
		},
		children: [{
				path: 'coupon',
				component: () => import('@/views/newData/mall/coupon'),
				name: '优惠券管理',
				meta: {
					title: '优惠券管理'
				}
			}, {
				path: 'addCoupon',
				component: () => import('@/views/newData/mall/addCoupon'),
				name: '新增优惠券',
				meta: {
					title: '新增优惠券'
				}
			}, {
				path: 'MerchantList',
				component: () => import('@/views/newData/mall/MerchantList'),
				name: '商户优惠券管理',
				meta: {
					title: '商户优惠券管理'
				}
			},
			{
				path: 'couponMechanism',
				component: () => import('@/views/newData/mall/couponMechanism'),
				name: '发送机制管理',
				meta: {
					title: '发送机制管理'
				}
			}, {
				path: 'couponMechanismAdd',
				component: () => import('@/views/newData/mall/couponMechanismAdd'),
				name: '添加发送机制',
				meta: {
					title: '添加发送机制'
				}
			}
		]
	},
	{ // 悦消息管理
		path: '/yueMsg',
		component: Layout,
		name: '悦消息管理',
		meta: {
			title: '悦消息管理',
			icon: 'message',
			roles: ['admin', 'yangjian']
		},
		children: [{
			path: 'msgList',
			component: () => import('@/views/newData/yueMsg/msgList'),
			name: '悦消息列表',
			meta: {
				title: '悦消息列表'
			}
		}, {
			path: 'msgNew',
			component: () => import('@/views/newData/yueMsg/msgNew'),
			name: '新品上新列表',
			meta: {
				title: '新品上新列表'
			}
		}, {
			path: 'msgActivity',
			component: () => import('@/views/newData/yueMsg/msgActivity'),
			name: '最新活动列表',
			meta: {
				title: '最新活动列表'
			}
		}, {
			path: 'msgOptions',
			component: () => import('@/views/newData/yueMsg/msgOptions'),
			name: '悦消息详情',
			hidden: true,
			meta: {
				title: '悦消息详情'
			}
		}, {
			path: 'msgActivityOptions',
			component: () => import('@/views/newData/yueMsg/msgActivityOptions'),
			name: '最新活动详情',
			hidden: true,
			meta: {
				title: '最新活动详情'
			}
		}, {
			path: 'msgNewOptions',
			component: () => import('@/views/newData/yueMsg/msgNewOptions'),
			name: '新品详情',
			hidden: true,
			meta: {
				title: '新品详情'
			}
		}]
	},
	{ // 悦旅大学
		path: '/school',
		component: Layout,
		name: 'school',
		meta: {
			title: '悦旅大学',
			icon: 'tree',
			roles: ['admin']
		},
		children: [{
				name: 'column',
				path: 'column',
				component: () => import('@/views/newData/school/ArticleManagement'),
				meta: {
					title: '栏目管理'
				}
			},
			{
				path: 'article',
				component: () => import('@/views/newData/school/article'),
				name: 'article',
				meta: {
					title: '文章管理'
				}
			},
			{
				path: 'orcodeImage',
				component: () => import('@/views/newData/school/orcodeImage'),
				name: 'article',
				meta: {
					title: '悦旅大学二维码'
				}
			}, {
				path: 'material',
				component: () => import('@/views/newData/school/material'),
				name: 'material',
				hidden: true,
				meta: {
					title: '文章管理详情'
				}
			}, {
				path: 'article_sucai',
				component: () => import('@/views/newData/school/article_sucai'),
				name: 'article_sucai',
				hidden: true,
				meta: {
					title: '素材管理'
				}
			}, {
				path: 'material_sucai',
				component: () => import('@/views/newData/school/material_sucai'),
				name: 'material_sucai',
				hidden: true,
				meta: {
					title: '素材管理详情'
				}
			}
		]
	},
	// 投放管理
	{
		path: '/throw',
		component: Layout,
		name: '投放管理',
		meta: {
			title: '投放管理',
			icon: 'money',
			roles: ['admin', 'editor']
		},
		children: [{
			path: 'throwList',
			component: () => import('@/views/newData/throw/throw'),
			name: '销售线索',
			// hidden: true,
			meta: {
				title: '销售线索'
			}

		}, {
			path: 'channel',
			component: () => import('@/views/newData/throw/channel'),
			name: '投放渠道',
			// hidden: true,
			meta: {
				title: '投放渠道'
			}
		}, {
			path: 'putInBUserList',
			component: () => import('@/views/newData/throw/putInBUserList'),
			name: 'B端投放',
			// hidden: true,
			meta: {
				title: 'B端投放'
			}
		}]
	},
	{ // 运营工具
		path: '/tools',
		component: Layout,
		name: '运营工具',
		meta: {
			title: '运营工具',
			icon: 'nested',
			roles: ['admin']
		},
		children: [{
				path: 'community-guides',
				component: () => import('@/views/newData/tools/community-guides/index'),
				name: '社群攻略列表',
				meta: {
					title: '社群攻略列表'
				}
			}, {
				path: 'community-guides/edit',
				component: () => import('@/views/newData/tools/community-guides/edit'),
				name: '社群攻略编辑',
				meta: {
					title: '社群攻略编辑'
				}
			}, {
				path: 'community-guides/categoryList',
				component: () => import('@/views/newData/tools/community-guides/categoryList'),
				name: '社群攻略分类',
				meta: {
					title: '社群攻略分类'
				}
			}, {
				path: 'rechargeConfig',
				component: () => import('@/views/newData/tools/rechargeConfig'),
				name: '充值配置列表',
				meta: {
					title: '充值配置列表'
				}
			}, {
				path: 'WXGroupCheck',
				component: () => import('@/views/newData/tools/WXGroupCheck'),
				name: '微信群审核',
				meta: {
					title: '微信群审核'
				}
			},
			{
				path: 'KeyWord',
				component: () => import('@/views/newData/tools/KeyWord'),
				name: '关键词管理',
				meta: {
					title: '关键词管理'
				}
			},
			{
				path: 'BuyPicture',
				component: () => import('@/views/newData/tools/BuyPicture'),
				name: '必买图片管理',
				meta: {
					title: '必买图片管理'
				}
			},
			{
				path: 'CouponBounced',
				component: () => import('@/views/newData/tools/CouponBounced'),
				name: '优惠券弹框管理',
				meta: {
					title: '优惠券弹框管理'
				}
			},
			{
				path: 'addCouponBounced',
				component: () => import('@/views/newData/tools/CouponBounced/addCouponBounced'),
				name: '新增优惠券弹框',
				meta: {
					title: '新增优惠券弹框'
				}
			},
			{
				path: 'ProductAgainBuys',
				component: () => import('@/views/newData/tools/ProductAgainBuy'),
				name: '新增二次购买商品管理',
				meta: {
					title: '新增二次购买商品管理'
				}
			},
			{
				path: 'addProductAgainBuy',
				component: () => import('@/views/newData/tools/ProductAgainBuy/addProductAgainBuy'),
				name: '新增二次购买商品',
				meta: {
					title: '新增二次购买商品'
				}
			},
			{
				path: 'playback',
				component: () => import('@/views/newData/tools/playback'),
				name: '回放管理',
				meta: {
					title: '回放管理'
				}
			}, {
				path: 'liveBroadcastActivity',
				component: () => import('@/views/newData/tools/liveBroadcastActivity/liveBroadcastActivity'),
				name: '回放管理',
				meta: {
					title: '回放管理'
				}
			}, {
				path: 'liveBroadcastActivity/liveBroadcastActivityAdd',
				component: () => import('@/views/newData/tools/liveBroadcastActivity/liveBroadcastActivityAdd'),
				name: '回放管理',
				meta: {
					title: '回放管理'
				}
			}, {
				path: 'version',
				component: () => import('@/views/newData/tools/version/versionList'),
				name: '版本控制',
				meta: {
					title: '版本控制'
				}
			}, {
				path: 'version/versionAdd',
				component: () => import('@/views/newData/tools/version/versionAdd'),
				name: '版本控制',
				meta: {
					title: '版本控制'
				}
			}, {
				path: 'circle',
				component: () => import('@/views/newData/tools/circle/circle'),
				name: '素材圈管理',
				meta: {
					title: '素材圈管理'
				}
			},
			{
				path: 'officialMember',
				component: () => import('@/views/newData/tools/circle/officialMember'),
				name: '素材圈管理',
				meta: {
					title: '素材圈管理'
				}
			}

		]
	},
	{ // 运营管理
		path: '/operate',
		component: Layout,
		name: 'operate',
		meta: {
			title: '运营管理',
			icon: 'theme',
			roles: ['admin', 'yangjian']
		},
		children: [{
				path: '/operate/cps-activities',
				component: () => import('@/views/newData/operate/cpsActivities'),
				name: 'cps活动',
				meta: {
					title: 'cps活动'
				}
			}, {
				path: '/operate/vouchersCenter',
				component: () => import('@/views/newData/operate/vouchers/index'),
				name: '领券中心',
				meta: {
					title: '领券中心'
				}
			}, {
				path: '/operate/vouchersSeckill',
				component: () => import('@/views/newData/operate/vouchers/seckillList'),
				name: '领券秒杀列表',
				meta: {
					title: '领券秒杀列表'
				}
			},{
				path: '/operate/vouchersSeckillInfo',
				component: () => import('@/views/newData/operate/vouchers/vouchersSeckillInfo'),
				name: '领券中心',
				meta: {
					title: '领券中心'
				}
			},{
				path: '/operate/vouchers',
				component: () => import('@/views/newData/operate/vouchers/list'),
				name: '领券中心列表',
				meta: {
					title: '领券中心列表'
				}
			}, {
				path: '/operate/couponManagement',
				component: () => import('@/views/newData/operate/couponManagement/index'),
				name: '优惠券管理领券中心',
				meta: {
					title: '优惠券管理领券中心'
				}
			},
			{
				path: '/operate/robot-message',
				component: () => import('@/views/newData/operate/robotMessage/index'),
				name: '机器人消息管理',
				meta: {
					title: '机器人消息管理'
				}
			},
			{
				path: '/operate/cps-message',
				component: () => import('@/views/newData/operate/cpsMessage'),
				name: 'cps统计',
				meta: {
					title: 'cps统计'
				}
			},
			{
				path: '/operate/robot-message/edit',
				component: () => import('@/views/newData/operate/robotMessage/edit'),
				name: '机器人消息编辑',
				meta: {
					title: '机器人消息编辑'
				}
			},
			{
				path: '/operate/userCoupon-line',
				component: () => import('@/views/newData/operate/userCouponLine/index'),
				name: '用户链路',
				meta: {
					title: '用户链路'
				}
			},
			{
				path: '/operate/userCouponLine/add',
				component: () => import('@/views/newData/operate/userCouponLine/add'),
				name: '新增用户链路',
				meta: {
					title: '新增用户链路'
				}
			},
			{
				path: '/operate/neighbour-shopping',
				component: () => import('@/views/newData/operate/neighbourShopping/index'),
				name: '邻居团',
				meta: {
					title: '邻居团'
				}
			},
			{
				path: '/operate/neighbour-shopping/add',
				component: () => import('@/views/newData/operate/neighbourShopping/add'),
				name: '新增邻居团',
				meta: {
					title: '新增邻居团'
				}
			},
			{
				path: '/operate/recommendActivity/list',
				component: () => import('@/views/newData/operate/recommendActivity/list'),
				name: '推荐活动列表',
				meta: {
					title: '推荐活动列表'
				}
			},
			{
				path: '/pennyLottery/activityList',
				component: () => import('@/views/newData/operate/pennyLottery/activityList'),
				name: '一分钱活动列表',
				meta: {
					title: '一分钱活动列表'
				}
			},
			{
				path: '/pennyLottery/activityDetail',
				component: () => import('@/views/newData/operate/pennyLottery/activityDetail'),
				name: '活动详情',
				meta: {
					title: '活动详情'
				}
			},
			{
				path: '/pennyLottery/add',
				component: () => import('@/views/newData/operate/pennyLottery/add'),
				name: '一分钱活动',
				meta: {
					title: '一分钱活动'
				}
			},
			{
				path: 'recommends',
				component: () => import('@/views/newData/operate/recommends'),
				name: '推荐商品',
				meta: {
					title: '推荐商品'
				}
			},
			{
				path: 'recommendsAdd',
				component: () => import('@/views/newData/operate/recommendsAdd'),
				name: '选择商品',
				hidden: true,
				meta: {
					title: '选择商品'
				}
			},
			{
				path: 'shopComment',
				component: () => import('@/views/newData/operate/shopComment'),
				name: '商品评论审核',
				meta: {
					title: '商品评论审核'
				}
			},
			// {
			//   path: 'part-time-job',
			//   component: () => import('@/views/newData/operate/partTimeJob'),
			//   name: '兼职审核',
			//   meta: {
			//     title: '兼职审核'
			//   }
			// },
			{
				path: 'live-video',
				component: () => import('@/views/newData/operate/liveVideo'),
				name: '直播活动管理',
				meta: {
					title: '直播活动管理'
				}
			},
			{
				path: 'liveWinners',
				component: () => import('@/views/newData/operate/liveWinners'),
				name: '直播抽奖名单',
				meta: {
					title: '直播抽奖名单'
				}
			},
			{
				path: 'iconManage',
				component: () => import('@/views/newData/operate/iconManage'),
				name: 'APPicon管理',
				meta: {
					title: 'APPicon管理'
				}
			},
			{
				path: 'live-hot-goods',
				component: () => import('@/views/newData/operate/live-hot-goods/list'),
				name: '直播爆品',
				meta: {
					title: '直播爆品'
				}
			},
			{
				path: 'live-hot-goods/add',
				component: () => import('@/views/newData/operate/live-hot-goods/add'),
				name: '编辑直播爆品',
				meta: {
					title: '编辑直播爆品'
				}
			},
			{
				path: 'themeSetting',
				component: () => import('@/views/newData/operate/themeSetting/list'),
				name: '主题配置',
				meta: {
					title: '直播爆品'
				}
			},
			{
				path: 'themeSetting/add',
				component: () => import('@/views/newData/operate/themeSetting/add'),
				name: '编辑直播爆品',
				meta: {
					title: '编辑直播爆品'
				}
			},

			{
				path: 'live-video-add',
				component: () => import('@/views/newData/operate/liveVideoAdd'),
				name: '直播活动管理',
				meta: {
					title: '直播活动管理'
				}
			},
			{
				path: 'live-banner-list',
				component: () => import('@/views/newData/operate/liveBanner'),
				name: '直播banner管理',
				meta: {
					title: '直播banner管理'
				}
			},
			{
				path: 'live-banner-detail',
				component: () => import('@/views/newData/operate/liveBannerDetail'),
				name: '详情',
				meta: {
					title: '详情'
				}
			},
			{
				path: 'appointment-free-list',
				component: () => import('@/views/newData/operate/appointmentFree/list'),
				name: '预约白拿活动',
				meta: {
					title: '预约白拿活动'
				}
			},
			{
				path: 'appointment-free-detail',
				component: () => import('@/views/newData/operate/appointmentFree/detail'),
				name: '预约白拿活动详情',
				meta: {
					title: '预约白拿活动详情'
				}
			},
			{
				path: 'lottery',
				component: () => import('@/views/newData/operate/lottery'),
				name: '抽奖活动',
				meta: {
					title: '抽奖活动'
				}
			},
			{
				path: 'add-lottery',
				component: () => import('@/views/newData/operate/addLottery'),
				name: '新增抽奖活动',
				meta: {
					title: '新增抽奖活动'
				}
			},
			{
				path: 'keyword',
				component: () => import('@/views/newData/operate/keyword'),
				name: 'keyword',
				meta: {
					title: '关键词'
				}
			}, {
				path: 'keywordType',
				component: () => import('@/views/newData/operate/keywordType'),
				name: 'keywordType',
				meta: {
					title: '关键词分类'
				}
			}, {
				path: 'message',
				component: () => import('@/views/newData/operate/message'),
				name: 'message',
				meta: {
					title: '消息管理'
				}
			}, {
				path: 'messageAdd',
				component: () => import('@/views/newData/operate/messageAdd'),
				name: 'messageAdd',
				meta: {
					title: '添加消息'
				}
			}, {
				path: 'messageUser',
				component: () => import('@/views/newData/operate/messageUser'),
				name: 'messageUser',
				meta: {
					title: '用户分组'
				}
			}, {
				path: 'mobileMessage',
				component: () => import('@/views/newData/operate/mobileMessage'),
				name: 'mobileMessage',
				meta: {
					title: '短信消息管理'
				}
			}, {
				path: 'bargainAdd',
				component: () => import('@/views/newData/operate/bargainAdd'),
				name: 'bargainAdd',
				hidden: true,
				meta: {
					title: '砍价新增'
				}
			}, {
				path: 'bargainList',
				component: () => import('@/views/newData/operate/bargainList'),
				name: 'bargainList',
				meta: {
					title: '砍价管理'
				}
			}, {
				path: 'gropAdd',
				component: () => import('@/views/newData/operate/gropAdd'),
				name: 'gropAdd',
				hidden: true,
				meta: {
					title: '新增拼团'
				}
			}, {
				path: 'gropList',
				component: () => import('@/views/newData/operate/gropList'),
				name: 'gropList',
				meta: {
					title: '拼团管理'
				}
			}, {
				path: 'gropDistribution',
				component: () => import('@/views/newData/operate/gropDistribution'),
				name: 'gropDistribution',
				meta: {
					title: '拼团分销管理'
				}
			}, {
				path: 'gropDistributionAdd',
				component: () => import('@/views/newData/operate/gropDistributionAdd'),
				name: 'gropDistributionAdd',
				hidden: true,
				meta: {
					title: '新增拼团分销管理规则'
				}
			}, {
				path: 'spikeAdd',
				component: () => import('@/views/newData/operate/spikeAdd'),
				name: 'spikeAdd',
				hidden: true,
				meta: {
					title: '新增秒杀'
				}
			}, {
				path: 'spikeList',
				component: () => import('@/views/newData/operate/spikeList'),
				name: 'spikeList',
				meta: {
					title: '秒杀管理'
				}
			}, {
				path: 'activity',
				component: () => import('@/views/newData/operate/activity'),
				name: '活动管理',
				meta: {
					title: '活动管理'
				}
			}, {
				path: 'activity-tags',
				component: () => import('@/views/newData/operate/activityTags/list'),
				name: '活动标签管理',
				meta: {
					title: '活动标签管理'
				}
			}, {
				path: 'activityAll',
				component: () => import('@/views/newData/operate/activityAll'),
				name: 'coupon',
				meta: {
					title: '综合活动管理'
				}
			}, {
				path: 'activityAllAdd',
				component: () => import('@/views/newData/operate/activityAllAdd'),
				hidden: true,
				name: '新增综合活动管理',
				meta: {
					title: '新增综合活动管理'
				}
			}, {
				path: 'activityAllTemplate',
				component: () => import('@/views/newData/operate/activityAllTemplate'),
				hidden: true,
				name: '综合活动模板列表',
				meta: {
					title: '综合活动模板列表'
				}
			}, {
				path: 'activityAllTemplate_back',
				component: () => import('@/views/newData/operate/activityAllTemplate_back'),
				hidden: true,
				name: '综合活动模板列表',
				meta: {
					title: '综合活动模板列表'
				}
			}, {
				path: 'activitySession',
				component: () => import('@/views/newData/operate/activitySession'),
				hidden: true,
				name: '综合活动模板编辑',
				meta: {
					title: '综合活动模板编辑'
				}
			}, {
				path: 'shareCoupons',
				component: () => import('@/views/newData/operate/shareCoupons'),
				name: 'shareCoupons',
				meta: {
					title: '优惠券分享'
				}
			}, {
				path: 'addshareCoupons',
				component: () => import('@/views/newData/operate/addshareCoupons'),
				name: 'addshareCoupons',
				meta: {
					title: '优惠券分享添加'
				}
			}, {
				path: 'coupon',
				component: () => import('@/views/newData/operate/coupon'),
				name: 'coupon',
				meta: {
					title: '优惠券专题管理'
				}
			}, {
				path: 'couponAdd',
				component: () => import('@/views/newData/operate/couponAdd'),
				name: '新增优惠券专题管理',
				hidden: true,
				meta: {
					title: '新增优惠券专题管理'
				}
			}, {
				path: 'couponTags',
				component: () => import('@/views/newData/operate/couponTags/list'),
				name: '优惠券标签管理',
				meta: {
					title: '优惠券标签管理'
				}
			}, {
				path: 'addCouponTag',
				component: () => import('@/views/newData/operate/couponTags/add'),
				name: '新增优惠券标签',
				meta: {
					title: '新增优惠券标签'
				}
			}, {
				path: 'specialPrice',
				component: () => import('@/views/newData/operate/specialPrice'),
				name: '特价活动',
				meta: {
					title: '特价活动'
				}
			}, {
				path: 'specialPriceAdd',
				component: () => import('@/views/newData/operate/specialPriceAdd'),
				name: '新增特价活动',
				hidden: true,
				meta: {
					title: '新增特价活动'
				}
			}, {
				path: 'activityAdd',
				component: () => import('@/views/newData/operate/activityAdd'),
				hidden: true,
				name: '添加活动',
				meta: {
					title: '添加活动'
				}
			},
			{
				path: 'activityCPSAdd',
				component: () => import('@/views/newData/operate/activityCPSAdd'),
				hidden: true,
				name: '添加CPS活动',
				meta: {
					title: '添加CPS活动'
				}
			}, {
				path: 'integralMall',
				component: () => import('@/views/newData/operate/integralMall'),
				name: '积分商城',
				meta: {
					title: '积分商城'
				}
			}, {
				path: 'integralAdd',
				component: () => import('@/views/newData/operate/integralAdd'),
				hidden: true,
				name: '新增积分商城商品',
				meta: {
					title: '新增积分商城商品'
				}
			},
			{
				path: 'list',
				component: () => import('@/views/newData/advert/list'),
				name: 'list',
				meta: {
					title: '广告管理'
				}
			},
			{
				path: 'update',
				component: () => import('@/views/newData/advert/update'),
				name: 'update',
				hidden: true,
				meta: {
					title: '广告编辑'
				}
			}, {
				path: 'memberList',
				component: () => import('@/views/newData/operate/memberList'),
				name: '会员管理',
				meta: {
					title: '会员管理'
				}
			},
			{
				path: 'memberIdentifyList',
				component: () => import('@/views/newData/operate/memberIdentifyList'),
				name: '认证失败用户',
				meta: {
					title: '认证失败用户'
				}
			},
			{
				path: 'memberIdentify',
				component: () => import('@/views/newData/operate/memberIdentify'),
				name: '实名认证',
				hidden: true,
				meta: {
					title: '实名认证'
				}
			},
			{
				path: 'memberIdentifyInfo',
				component: () => import('@/views/newData/operate/memberIdentifyInfo'),
				name: '通过实名认证',
				hidden: true,
				meta: {
					title: '通过实名认证'
				}
			},
			{
				path: 'qrCode',
				component: () => import('@/views/newData/operate/qrCode'),
				name: 'qrCode',
				hidden: true,
				meta: {
					title: '二维码管理'
				}
			}
		]
	},
	{ // 汇店管理
		path: '/shop',
		component: Layout,
		name: 'shop',
		meta: {
			title: '汇店管理',
			icon: 'example',
			roles: ['admin']
		},
		children: [{
			path: 'textAdd',
			component: () => import('@/views/newData/shop/textAdd'),
			name: 'textAdd',
			meta: {
				title: '文章添加'
			}
		}, {
			path: 'textList',
			component: () => import('@/views/newData/shop/textList'),
			name: 'textList',
			meta: {
				title: '文章列表'
			}
		}, {
			path: 'textType',
			component: () => import('@/views/newData/shop/textType'),
			name: 'textType',
			meta: {
				title: '文章类型管理'
			}
		}, {
			path: 'textTo',
			component: () => import('@/views/newData/shop/textTo'),
			name: 'textTo',
			meta: {
				title: '文章审核'
			}
		}]
	}, {
		path: '',
		component: Layout,
		name: '订单管理',
		meta: {
			title: '订单管理',
			icon: 'documentation',
			roles: ['admin']
		},
		children: [{
				path: 'gas-order',
				component: () => import('@/views/OrderManage/trainOrder/gasOrder'),
				name: '加油订单',
				meta: {
					title: '加油订单'
				}
			},
			{
				path: 'pddLoanOrders',
				component: () => import('@/views/OrderManage/pddLoanOrders'),
				name: '贷款订单',
				meta: {
					title: '贷款订单'
				}
			},
			{
				path: 'outsideOrders',
				component: () => import('@/views/OrderManage/outsideOrders'),
				name: '站外订单',
				meta: {
					title: '站外订单'
				}
			},
			{
				path: 'importOtherOrder',
				component: () => import('@/views/OrderManage/importOtherOrder'),
				name: '站外订单上传',
				meta: {
					title: '站外订单上传'
				}
			},
			{
				path: 'video-order',
				component: () => import('@/views/OrderManage/trainOrder/videoOrder'),
				name: '视频充值订单',
				meta: {
					title: '视频充值订单'
				}
			},
			{
				path: 'balance-charge-order',
				component: () => import('@/views/OrderManage/trainOrder/balanceChargeOrder'),
				name: '余额充值订单',
				meta: {
					title: '余额充值订单'
				}
			},
			{
				path: 'phone-order',
				component: () => import('@/views/OrderManage/trainOrder/phoneOrder'),
				name: '手机充值订单',
				meta: {
					title: '手机充值订单'
				}
			},
			{
				path: 'train-order',
				component: () => import('@/views/OrderManage/trainOrder/trainOrder'),
				name: '火车票订单',
				meta: {
					title: '火车票订单'
				}
			},
			{
				path: 'flightTicketOrder',
				component: () => import('@/views/OrderManage/trainOrder/flightTicketOrder.vue'),
				name: '飞机票订单',
				meta: {
					title: '飞机票订单'
				}
			},
			{
				path: 'flightTicketOrderDetail',
				component: () => import('@/views/OrderManage/trainOrder/flightTicketOrderDetail.vue'),
				name: '飞机票订单详情',
				meta: {
					title: '飞机票订单详情'
				}
			},
			{
				path: 'train-detail',
				component: () => import('@/views/OrderManage/trainOrder/trainDetailInfo'),
				name: '火车票订单详情',
				meta: {
					title: '火车票订单详情'
				}
			},
			{
				path: 'hotel-order',
				component: () => import('@/views/OrderManage/hotelOrder/hotelOrder'),
				name: '酒店订单',
				meta: {
					title: '酒店订单'
				}
			},
			{
				path: 'hotel-one-hour-order',
				component: () => import('@/views/OrderManage/hotelOrder/hotelOneHourOrder'),
				name: '酒店一小时未处理订单',
				meta: {
					title: '酒店一小时未处理订单'
				}
			},

			{
				path: 'hotel-detail',
				component: () => import('@/views/OrderManage/hotelOrder/hotelDetail'),
				name: '酒店订单详情',
				hidden: true,
				meta: {
					title: '酒店订单详情'
				}
			},
			{
				path: 'EliteCard-order',
				component: () => import('@/views/OrderManage/EliteCardOrder'),
				name: '精英卡订单',
				meta: {
					title: '精英卡订单'
				}
			},
			{
				path: 'chuangke-order',
				component: () => import('@/views/OrderManage/chuangKeOrders'),
				name: '创客订单',
				meta: {
					title: '创客订单'
				}
			},
			{
				path: 'shopMall-order',
				component: () => import('@/views/OrderManage/shopMallOrder/shopMallOrder'),
				name: '商城订单',
				meta: {
					title: '商城订单'
				}
			},
			{
				path: 'shopMall-order-noSend',
				component: () => import('@/views/OrderManage/shopMallOrder/noSendMallOrders'),
				name: '未发货订单',
				meta: {
					title: '未发货订单'
				}
			},
			{
				path: 'service-type-add',
				component: () => import('@/views/OrderManage/shopMallOrder/serviceTypeAdd'),
				name: '服务类型',
				meta: {
					title: '服务类型'
				}
			},
			{
				path: 'service-cause',
				component: () => import('@/views/OrderManage/shopMallOrder/serviceCause'),
				name: '售后原因',
				meta: {
					title: '售后原因'
				}
			},
			{
				path: 'refundOrder-detail',
				component: () => import('@/views/OrderManage/shopMallOrder/shopMallServiceDetail'),
				name: '商城售后订单详情',
				meta: {
					title: '商城售后订单详情'
				}
			},
			{
				path: 'new-refundOrder-detail',
				component: () => import('@/views/OrderManage/shopMallOrder/newShopMallServiceDetail'),
				name: '商城售后订单详情',
				meta: {
					title: '商城售后订单详情'
				}
			},
			{
				path: 'shopMall-service',
				component: () => import('@/views/OrderManage/shopMallOrder/shopMallService'),
				name: '商城售后订单',
				meta: {
					title: '商城售后订单'
				}
			},
			{
				path: 'create-refund-order',
				component: () => import('@/views/OrderManage/shopMallOrder/createRefundOrder'),
				name: '生成退款订单',
				meta: {
					title: '生成退款订单'
				}
			},
			{
				path: 'refund-payment-list',
				component: () => import('@/views/OrderManage/shopMallOrder/refundPaymentList'),
				name: '退款结算列表',
				meta: {
					title: '退款结算列表'
				}
			},
			{
				path: 'export-refund-list',
				component: () => import('@/views/OrderManage/shopMallOrder/exportRefundList'),
				name: '退款结算导出',
				meta: {
					title: '退款结算导出'
				}
			},
			{
				path: 'exportFinancial',
				component: () => import('@/views/OrderManage/shopMallOrder/exportFinancial'),
				name: '财务导出入口',
				meta: {
					title: '财务导出入口'
				}
			},
			{
				path: 'refund-payment-detail',
				component: () => import('@/views/OrderManage/shopMallOrder/refundPaymentDetail'),
				name: '退款结算列表',
				meta: {
					title: '退款结算列表'
				}
			},
			{
				path: 'refund-status-list',
				component: () => import('@/views/OrderManage/shopMallOrder/refundStatusList'),
				name: '审核状态查询',
				meta: {
					title: '审核状态查询'
				}
			},
			{
				path: 'refund-affirm',
				component: () => import('@/views/OrderManage/shopMallOrder/refundAffirm'),
				name: '商城售后订单详情',
				meta: {
					title: '商城售后订单详情'
				}
			},
			{
				path: 'new-shopMall-service',
				component: () => import('@/views/OrderManage/shopMallOrder/newShopMallService'),
				name: '商城售后订单',
				meta: {
					title: '商城售后订单'
				}
			},
			{
				path: 'new-shopMall-service-customer',
				component: () => import('@/views/OrderManage/shopMallOrder/newShopMallServiceCustomer'),
				name: '客服售后订单',
				meta: {
					title: '客服售后订单'
				}
			},
			{
				path: 'new-shopMall-service-qc',
				component: () => import('@/views/OrderManage/shopMallOrder/newShopMallServiceQC'),
				name: '质检售后订单',
				meta: {
					title: '质检售后订单'
				}
			},
			{
				path: 'Integral-order',
				component: () => import('@/views/OrderManage/shopMallOrder/IntegralOrders'),
				name: '积分订单',
				meta: {
					title: '积分订单'
				}
			},
			{
				path: 'shopMall-detail',
				component: () => import('@/views/OrderManage/shopMallOrder/shopMallDetail'),
				name: '商城订单详情',
				hidden: true,
				meta: {
					title: '商城订单详情'
				}
			},

			{
				path: 'line-order',
				component: () => import('@/views/OrderManage/lineOrder/lineOrder'),
				name: '线路订单',
				meta: {
					title: '线路订单'
				}
			},
			{
				path: 'line-detail',
				component: () => import('@/views/OrderManage/lineOrder/lineDetail'),
				name: '线路订单详情',
				hidden: true,
				meta: {
					title: '线路订单详情'
				}
			},
			{
				path: 'Adult-order',
				component: () => import('@/views/OrderManage/AdultOrder'),
				name: '大人订单',
				meta: {
					title: '大人订单'
				}
			}
		]
	},
	// 用户管理
	{
		path: '/userManage',
		component: Layout,
		name: '用户管理',
		meta: {
			title: '用户管理',
			icon: 'peoples',
			roles: ['admin']
		},
		children: [{
				path: 'user-order',
				component: () => import('@/views/UserManage/platformUser/platformUser'),
				name: '平台用户',
				meta: {
					title: '平台用户'
				}
			},
			{
				path: 'user-info',
				component: () => import('@/views/UserManage/platformUser/userInfo'),
				name: '平台用户详情',
				hidden: true,
				meta: {
					title: '平台用户详情'
				}
			},
			{
				path: 'user-growth',
				component: () => import('@/views/UserManage/platformUser/userGrowth'),
				name: '用户成长值',
				hidden: true,
				meta: {
					title: '用户成长值'
				}
			}
			//   {
			//     path: 'CompanyAccount-order',
			//     component: () => import('@/views/UserManage/CompanyAccount/CompanyAccount'),
			//     name: '公司账号',
			//     meta: { title: '公司账号' }
			//   }
		]
	}, {
		path: '/user-center',
		component: Layout,
		name: '数据中心',
		redirect: '/user-center/user-data-list',
		meta: {
			title: '数据中心',
			icon: 'drag',
			roles: ['admin']
		},
		children: [{
				path: 'user-data-purchase',
				component: () => import('@/views/dataCenter/userData/userDatePurchase'), // 复购
				name: '用户数据(复购)',
				hidden: true,
				meta: {
					title: '用户数据(复购)'
				}
			},
			{
				path: 'user-data-ranking',
				component: () => import('@/views/dataCenter/userData/userDateRanking'), // 排行
				name: '用户数据(排行)',
				hidden: true,
				meta: {
					title: '用户数据(排行)'
				}
			},
			{
				path: 'user-data-add',
				component: () => import('@/views/dataCenter/userData/addUserData'), // 新增用户
				name: '新增用户',
				hidden: true,
				meta: {
					title: '新增用户'
				}
			},
			{
				path: 'user-mamber-add',
				component: () => import('@/views/dataCenter/userData/addMember'), // 新增会员
				name: '新增会员',
				hidden: true,
				meta: {
					title: '新增会员'
				}
			},
			{
				path: 'user-hotel-usage',
				component: () => import('@/views/dataCenter/userData/hotelVoucherUsage'), // 酒店券使用量
				name: '新人酒店券使用量',
				hidden: true,
				meta: {
					title: '新人酒店券使用量'
				}
			},
			{
				path: 'user-mall-usage',
				component: () => import('@/views/dataCenter/userData/ShoppingCouponUsage'), // 商城券使用量
				name: '新人商城券使用量',
				hidden: true,
				meta: {
					title: '新人商城券使用量'
				}
			},
			{
				path: 'adult-order-statistics',
				component: () => import('@/views/dataCenter/AdultStatistics/index'), // 大人
				name: '大人数据统计',
				hidden: true,
				meta: {
					title: '大人数据统计'
				}
			},
			{
				path: '/user-data-list',
				component: () => import('@/views/dataCenter/userData/index'),
				name: '用户数据统计',
				meta: {
					title: '用户数据统计'
				},
				children: [{
						path: 'user-data-statistics',
						component: () => import('@/views/dataCenter/userData/userDataList/statistics'), //
						name: '用户数据统计',
						meta: {
							title: '用户数据统计'
						}
					},
					{
						path: 'user-data-tatal-statistics',
						component: () => import('@/views/dataCenter/userData/userDataList/dataStatistics'), //
						name: '数据统计',
						meta: {
							title: '数据统计'
						}
					},
					{
						path: 'user-data-bonus',
						component: () => import('@/views/dataCenter/userData/userDataList/bonus'), // 奖金明细
						name: '用户奖金明细',
						meta: {
							title: '用户奖金明细'
						}
					},
					{
						path: 'user-data-withdrawal',
						component: () => import('@/views/dataCenter/userData/userDataList/indexs'), //
						name: '用户提现明细',
						meta: {
							title: '用户提现明细'
						}
					},
					{
						path: 'user-data-withdrawal-new',
						component: () => import('@/views/dataCenter/userData/userDataList/newIndexs.vue'), //
						name: '用户提现明细',
						meta: {
							title: '用户提现明细'
						}
					},
					{
						path: 'user-data-withdrawal-new-success',
						component: () => import('@/views/dataCenter/userData/userDataList/newIndexsSuccess'), //
						name: '用户提现成功',
						meta: {
							title: '用户提现成功'
						}
					},
					{
						path: 'user-data-withdrawal-new-error',
						component: () => import('@/views/dataCenter/userData/userDataList/newIndexsError'), //
						name: '用户提现失败',
						meta: {
							title: '用户提现失败'
						}
					}
				]
			},
			{
				path: '/hotel-lists',
				component: () => import('@/views/dataCenter/hotelOrderStatistics/index'), // 酒店统计列表
				name: '酒店统计',
				redirect: '/user-center/hotel-lists//hotel-order-city-dimension',
				// hidden: true,
				meta: {
					title: '酒店统计'
				},
				children: [{
						path: 'hotel-order-statistics',
						component: () => import('@/views/dataCenter/hotelOrderStatistics/hotelOrderStatistics'), // 酒店下单量
						name: '酒店下单统计',
						// hidden: true,
						meta: {
							title: '酒店下单统计'
						}
					},
					{
						path: 'hotel-order-city-dimension',
						component: () => import('@/views/dataCenter/hotelOrderStatistics/cityDimension/index'), // 酒店下单量
						name: '城市维度统计',
						// hidden: true,
						meta: {
							title: '城市维度统计'
						}
					},
					{
						path: 'hotel-order-hotel-dimension',
						component: () => import('@/views/dataCenter/hotelOrderStatistics/hotelDimension/index'), // 酒店下单量
						name: '酒店维度统计',
						// hidden: true,
						meta: {
							title: '酒店维度统计'
						}
					},
					{
						path: 'hotel-order-channel-dimension',
						component: () => import('@/views/dataCenter/hotelOrderStatistics/channelDimension/index'), // 酒店下单量
						name: '渠道维度统计',
						// hidden: true,
						meta: {
							title: '渠道维度统计'
						}
					}
				]
			},
			{
				path: '/mall-lists',
				component: () => import('@/views/dataCenter/mallOrderStatistics/index'), // 商城下单量
				name: '商城统计',
				meta: {
					title: '商城统计'
				},
				children: [{
						path: 'mall-order-list',
						component: () => import('@/views/dataCenter/mallOrderStatistics/listDimension/index'),
						name: '商城下单统计',
						// hidden: true,
						meta: {
							title: '商城下单统计'
						}
					},
					{
						path: 'mall-order-goods-list',
						component: () => import('@/views/dataCenter/mallOrderStatistics/mallDimension/index'),
						name: '商品维度统计',
						// hidden: true,
						meta: {
							title: '商品维度统计'
						}
					},
					{
						path: 'mall-order-goods-info',
						component: () => import('@/views/dataCenter/mallOrderStatistics/mallDimension/info'),
						name: '商品维度详情',
						hidden: true,
						meta: {
							title: '商品维度详情'
						}
					},
					{
						path: 'mall-order-channel-list',
						component: () => import('@/views/dataCenter/mallOrderStatistics/channelDimension/index'),
						name: '渠道维度统计',
						// hidden: true,
						meta: {
							title: '渠道维度统计'
						}
					},
					{
						path: 'mall-order-channel-info',
						component: () => import('@/views/dataCenter/mallOrderStatistics/channelDimension/info'), // 酒店下单量
						name: '渠道维度详情',
						hidden: true,
						meta: {
							title: '渠道维度详情'
						}
					}
				]
			},
			{
				path: 'line-order-statistics',
				component: () => import('@/views/dataCenter/lineOrderStatistics/index'), // 线路下单量
				name: '线路下单统计',
				// hidden: true,
				meta: {
					title: '线路下单统计'
				}
			},
			{
				path: 'line-supplier-info',
				component: () => import('@/views/dataCenter/lineOrderStatistics/lineInfo'), // 线路下单量
				name: '线路供应商时间维度统计',
				hidden: true,
				meta: {
					title: '线路供应商时间维度统计'
				}
			},
			{
				path: 'statistics',
				component: () => import('@/views/dataCenter/statistics'),
				name: 'statistics',
				meta: {
					title: '拼团统计'
				}
			},
			{
				path: 'phoneOrderStatistics',
				component: () => import('@/views/dataCenter/phoneOrderStatistics'),
				name: '手机充值统计',
				meta: {
					title: '手机充值统计'
				}
			},
			{
				path: 'videoOrderStatistics',
				component: () => import('@/views/dataCenter/videoOrderStatistics'),
				name: '视频充值统计',
				meta: {
					title: '视频充值统计'
				}
			},
			{
				path: 'trainOrderStatistics',
				component: () => import('@/views/dataCenter/trainOrderStatistics.vue'),
				name: '火车票统计',
				meta: {
					title: '火车票统计'
				}
			},
			{
				path: 'gasOrderStatistics',
				component: () => import('@/views/dataCenter/gasOrderStatistics'),
				name: '加油统计',
				meta: {
					title: '加油统计'
				}
			},
			{
				path: 'tradeAnalyse',
				component: () => import('@/views/dataCenter/tradeAnalyse'),
				name: '交易分析',
				meta: {
					title: '交易分析'
				}
			},
			{
				path: 'companyIntegral',
				component: () => import('@/views/dataCenter/companyIntegral'),
				name: '销卡分析',
				meta: {
					title: '销卡分析'
				}
			},
			{
				path: 'gasMallOrder',
				component: () => import('@/views/dataCenter/gasMallOrder'),
				name: '商品维度商城订单统计',
				meta: {
					title: '商品维度商城订单统计'
				}
			},
			{
				path: 'gasMallOrderDetails',
				component: () => import('@/views/dataCenter/gasMallOrderDetails'),
				name: '单件商品订单统计',
				meta: {
					title: '单件商品订单统计'
				}
			},
			{
				path: 'gasMallByMemberOrders',
				component: () => import('@/views/dataCenter/gasMallByMemberOrders'),
				name: '用户维度商城订单统计',
				meta: {
					title: '用户维度商城订单统计'
				}
			},
			{
				path: 'gasMallTimeMemberOrders',
				component: () => import('@/views/dataCenter/gasMallTimeMemberOrders'),
				name: '时间维度商城订单统计',
				meta: {
					title: '时间维度商城订单统计'
				}
			},
			{
				path: 'gasMallTimeMemberOrders-detail',
				component: () => import('@/views/dataCenter/gasMallTimeMemberOrders-detail'),
				name: '时间维度商城订单统计',
				meta: {
					title: '时间维度商城订单统计'
				}
			},
			{
				path: 'gasMallClassOrders',
				component: () => import('@/views/dataCenter/gasMallClassOrders'),
				name: '类目维度商城订单统计',
				meta: {
					title: '类目维度商城订单统计'
				}
			},
			{
				path: 'gasMallClassOrders-detail',
				component: () => import('@/views/dataCenter/gasMallClassOrders-detail'),
				name: '类目维度商城订单统计详情',
				meta: {
					title: '类目维度商城订单统计详情'
				}
			}

		]
	},
	// 新闻版块
	{
		path: '/newSection',
		component: Layout,
		name: '新闻版块',
		meta: {
			title: '新闻版块',
			icon: 'drag',
			roles: ['admin']
		},
		children: [{
			path: '/newSection/list',
			component: () => import('@/views/dataCenter/newSection/list'), // 新闻
			name: '新闻列表',
			hidden: true,
			meta: {
				title: '新闻列表'
			}
		}, {
			path: '/newSection/newSectionDetail',
			component: () => import('@/views/dataCenter/newSection/newSectionDetail'), // 新闻
			name: '新闻详情',
			hidden: true,
			meta: {
				title: '新闻详情'
			}
		}]
	},
	/**
	 * 本地生活
	 */
	{
		path: '/localLife',
		component: Layout,
		name: '本地生活',
		meta: {
			title: '本地生活',
			icon: 'drag',
			roles: ['admin']
		},
		children: [
			// 火车票
			{
				path: '/TrainTickets/dataStatistics',
				component: () => import('@/views/localLife/TrainTickets/dataStatistics'), // 火车票
				name: '火车票数据统计',
				hidden: true,
				meta: {
					title: '火车票数据统计'
				}
			},
			// 火车票订单详情
			{
				path: '/TrainTickets/orderListDetail',
				component: () => import('@/views/localLife/TrainTickets/orderListDetail'), // 火车票
				name: '火车票订单详情',
				hidden: true,
				meta: {
					title: '火车票订单详情'
				}
			},
			// 火车票退票详情
			{
				path: '/TrainTickets/RefundListDetail',
				component: () => import('@/views/localLife/TrainTickets/RefundListDetail'), // 火车票
				name: '火车票退票详情',
				hidden: true,
				meta: {
					title: '火车票退票详情'
				}
			},
			// 外卖
			{
				path: '/takeOut/takeOutOrderList',
				component: () => import('@/views/localLife/takeOut/takeOutOrderList'), // 外卖
				name: '外卖数据统计',
				hidden: true,
				meta: {
					title: '外卖数据统计'
				}
			},

			//cps
			{
				path: '/cps/financialCPS',
				component: () => import('@/views/localLife/cps/financialCPS'), // 金融Cps
				name: '信用卡数据统计',
				hidden: true,
				meta: {
					title: '信用卡数据统计'
				}
			},
			//cps佣金记录编辑
			{
				path: '/cps/CommissionRecordEditor',
				component: () => import('@/views/localLife/cps/CommissionRecordEditor'),
				name: '佣金记录编辑',
				hidden: true,
				meta: {
					title: '佣金记录编辑'
				}
			},
			//cps信用卡编辑
			{
				path: '/cps/CreditCardEditor',
				component: () => import('@/views/localLife/cps/CreditCardEditor'),
				name: '信用卡编辑',
				hidden: true,
				meta: {
					title: '信用卡编辑'
				}
			},
			//机票
			{
				path: '/planeTickets/order',
				component: () => import('@/views/localLife/planeTickets/order'),
				name: '机票订单统计',
				hidden: true,
				meta: {
					title: '机票订单统计'
				}
			},
			//机票订单详情
			{
				path: '/planeTickets/orderListDetail',
				component: () => import('@/views/localLife/planeTickets/orderListDetail'),
				name: '机票订单详情',
				hidden: true,
				meta: {
					title: '机票订单详情'
				}
			},
			//机票退票退款详情
			{
				path: '/planeTickets/RefundListDetail',
				component: () => import('@/views/localLife/planeTickets/RefundListDetail'),
				name: '机票退款详情',
				hidden: true,
				meta: {
					title: '机票退款详情'
				}
			},
			//优惠券
			{
				path: '/coupons/couponsStatistical',
				component: () => import('@/views/localLife/coupons/couponsStatistical'),
				name: '优惠券统计数据',
				hidden: true,
				meta: {
					title: '优惠券统计数据'
				}
			},
			//优惠券详情
			{
				path: '/coupons/couponsStatisticalDetail',
				component: () => import('@/views/localLife/coupons/couponsStatisticalDetail'),
				name: '优惠券详情',
				hidden: true,
				meta: {
					title: '优惠券详情'
				}
			},
			//优惠券编辑
			{
				path: '/coupons/CouponEditor',
				component: () => import('@/views/localLife/coupons/CouponEditor'),
				name: '优惠券编辑',
				hidden: true,
				meta: {
					title: '优惠券编辑'
				}
			},
		]
	},
	/**
	 * 自营商城
	 */
	{
		path: '/selfSupport',
		component: Layout,
		name: '自营商城',
		meta: {
			title: '自营商城',
			icon: 'drag',
			roles: ['admin']
		},
		children: [
			// 首页
			{
				path: '/selfSupport/index',
				component: () => import('@/views/selfSupport/index'),
				name: '数据总览',
				hidden: true,
				meta: {
					title: '数据总览'
				}
			},
			//交易分析
			{
				path: '/selfSupport/transaction',
				component: () => import('@/views/selfSupport/transaction'),
				name: '交易分析',
				hidden: true,
				meta: {
					title: '交易分析'
				}
			},
			//商品统计
			{
				path: '/goodsStatistics/commodityStatistics',
				component: () => import('@/views/goodsStatistics/commodityStatistics'),
				name: '商品统计',
				hidden: true,
				meta: {
					title: '商品统计'
				}
			},
			// {
			//   path: '/selfSupport/Commodity',
			//   // component: () => import('@/views/dataCenter/hotelOrderStatistics/index'), // 酒店统计列表
			//   name: '商品分析',
			//   // redirect: '/user-center/hotel-lists//hotel-cps-city-dimension',
			//   // hidden: true,
			//   meta: {
			//     title: '商品分析'
			//   },
			// },
			{
				path: '/selfSupport/Commodity/commodity',
				// component: () => import('@/views/selfSupport/Commodity'),
				component: () => import('@/views/selfSupport/Commodity/commodity'),
				name: '数据总览',
				hidden: true,
				meta: {
					title: '数据总览'
				}
			},
			{
				path: '/selfSupport/Commodity/CommodityList',
				component: () => import('@/views/selfSupport/Commodity/CommodityList'),
				name: '商品列表',
				hidden: true,
				meta: {
					title: '商品列表'
				}
			},
			{
				path: '/selfSupport/Commodity/CommodityDetails',
				component: () => import('@/views/selfSupport/Commodity/CommodityDetails'),
				name: '商品详情',
				hidden: true,
				meta: {
					title: '商品详情'
				}
			},
			{
				path: '/selfSupport/dataanalysis',
				component: () => import('@/views/Useranalysis/Dataanalysis'),
				name: '用户数据总览',
				hidden: true,
				meta: {
					title: '用户数据总览'
				}
			},


			// children: [

			//

			// ]
			// },


		]
	},
	/**
	 * 用户分析
	 */
	{
		path: '/useranalysis',
		component: Layout,
		name: '用户分析',
		meta: {
			title: '用户分析',
			icon: 'drag',
			roles: ['admin']
		},
		children: [
			// 数据分析
			{
				path: '/useranalysis/dataanalysis',
				component: () => import('@/views/Useranalysis/Dataanalysis'),
				name: '用户数据总览',
				hidden: true,
				meta: {
					title: '用户数据总览'
				}
			},
			//交易分析
			{
				path: '/useranalysis/transactionanalysis',
				component: () => import('@/views/Useranalysis/Transactionanalysis'),
				name: '用户交易分析',
				hidden: true,
				meta: {
					title: '用户交易分析'
				}
			},
		]
	}


]

export default nestedRouter
