/**
 * Created by jiachenpan on 16/11/18.
 */

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

// 格式化url
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}
//格式化时间
export function dateFormat(val) {
	var date = new Date(Number(val)); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
	var Y = date.getFullYear() + "-";
	var M =  (date.getMonth() + 1 < 10  ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-";
	var D = date.getDate() + " ";
	var h = date.getHours() + ":";
	var m = date.getMinutes() + ":";
	var s  = (date.getSeconds()  < 10  ? "0" + (date.getSeconds() ) : date.getSeconds() ) ;
	return Y + M + D + h + m + s;
}

/**
 *get getByteLen
 * @param {Sting} val input value
 * @returns {number} output value
 */
export function getByteLen(val) {
  let len = 0
  for (let i = 0; i < val.length; i++) {
    if (val[i].match(/[^\x00-\xff]/gi) != null) {
      len += 1
    } else {
      len += 0.5
    }
  }
  return Math.floor(len)
}

export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

export function param(json) {
  if (!json) return ''
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
  ).join('&')
}

export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  )
}

export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

export function objectMerge(target, source) {
  /* Merges two  objects,
     giving the last one precedence */

  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach(property => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

export function scrollTo(element, to, duration) {
  if (duration <= 0) return
  const difference = to - element.scrollTop
  const perTick = (difference / duration) * 10
  setTimeout(() => {
    element.scrollTop = element.scrollTop + perTick
    if (element.scrollTop === to) return
    scrollTo(element, to, duration - 10)
  }, 10)
}

export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

export const pickerOptions = [
  {
    text: '今天',
    onClick(picker) {
      const end = new Date()
      const start = new Date(new Date().toDateString())
      end.setTime(start.getTime())
      picker.$emit('pick', [start, end])
    }
  },
  {
    text: '最近一周',
    onClick(picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(end.getTime() - 3600 * 1000 * 24 * 7)
      picker.$emit('pick', [start, end])
    }
  },
  {
    text: '最近一个月',
    onClick(picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      picker.$emit('pick', [start, end])
    }
  },
  {
    text: '最近三个月',
    onClick(picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      picker.$emit('pick', [start, end])
    }
  }
]

export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

export function uniqueArr(arr) {
  return Array.from(new Set(arr))
}

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export function addObject(key, value) {
  const data = {}
  data[key] = value
  return data
}

/**
 * 充值 报价 提现 金钱转化  分转元  金钱格式化
 *
 */
export function MoneyFormat(money) {
	if (money && money != null) {
		money = parseInt(money) / 100;
		money = String(money);
		let left = money.split('.')[0],
			right = money.split('.')[1];
		right = right ? (right.length >= 2 ? '.' + right.substr(0, 2) : '.' + right + '0') : '.00';
		var temp = left
			.split('')
			.reverse()
			.join('')
			.match(/(\d{1,3})/g);
		return (
			(Number(money) < 0 ? '-' : '') +
			temp
				.join(',')
				.split('')
				.reverse()
				.join('') +
			right
		);
	} else if (money === 0) {
		// 注意===在这里的使用，如果传入的money为0,if中会将其判定为boolean类型，故而要另外做===判断
		return '0.00';
	} else {
		return '';
	}
}

//订单明细状态
export function orderStatus(orderStatus) {
	if (orderStatus === 0) {
		return '未支付'
	}  else if(orderStatus === 1) {
		return '已支付'
	}else if(orderStatus === 2) {
		return '已取消'
	} else if(orderStatus === 3){
		return '出票中'
	}else if(orderStatus === 4){
		return '已出票'
	}else if(orderStatus === 5){
		return '出票失败'
	}else if(orderStatus === 7){
		return '部分退票'
	}else if(orderStatus === 8){
		return '已退票'
	}else if(orderStatus === 10){
		return '退票中'
	}else if(orderStatus === 11){
		return '部分改期'
	}else if(orderStatus === 12){
		return '已改期'
	}else if(orderStatus === 13){
		return '改期中'
	}else if(orderStatus === 15){
		return '三方已退款'
	}else if(orderStatus === 16){
		return '已退款'
	}else if(orderStatus === 17){
		return '部分退款'
	}else{
		return('状态查询不到')
	}
}
//退票列表明细状态
export function orderSonStatus(orderStatus) {
	if(orderStatus === 3){
		return '未出票'
	}else if(orderStatus === 4){
		return '出票中'
	}else if(orderStatus === 5){
		return '已出票'
	}else if(orderStatus === 6){
		return '改期中'
	}else if(orderStatus === 7){
		return '已改期'
	}else if(orderStatus === 8){
		return '退票中'
	}else if(orderStatus === 9){
		return '已退票'
	}else if(orderStatus === 10){
		return '出票失败'
	}else if(orderStatus === 13){
		return '三方已退款'
	}else if(orderStatus === 14){
		return '已退款'
	}else{
		return('状态查询不到')
	}
}
export function idCardType(idCardType) {
	if (idCardType === 0) {
		return '身份证'
	} else if(idCardType === 1) {
		return '护照'
	} else if(idCardType === 2){
		return '其他'
	} else if(idCardType === 3){
		return '回乡证'
	} else if(idCardType === 4){
		return '军官证'
	} else if(idCardType === 5){
		return '警官证'
	} else if(idCardType === 6){
		return '港澳通行证'
	} else if(idCardType === 7){
		return '台胞证'
	} else if(idCardType === 8){
		return '台湾通行证'
	} else if(idCardType === 9){
		return '外国人永久居留身份证'
	} else{
		return('其他类型')
	}
}
//乘机人类型
export function PassengerType(idCardType) {
	if (idCardType == "ADT") {
		return '成人'
	} else if(idCardType == "CHD") {
		return '儿童'
	} else if(idCardType == "INF"){
		return '婴儿'
	} else{
		return('其他类型')
	}
}
//机票状态
export function idType(idType) {
	if (idType === 0) {
		return '未出票'
	} else if(idType === 1) {
		return '出票成功'
	} else if(idType === 2){
		return '出票失败'
	} else{
		return('其他类型')
	}
}
//退票类型
export function refundType(refundType) {
	if (refundType === 8) {
		return '已退票'
	} else if(refundType === 9) {
		return '退票驳回'
	} else if(refundType === 10){
		return '退票中'
	} else{
		return('其他类型')
	}
}

