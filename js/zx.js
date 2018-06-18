/*
* 快速排序的js实现
* 原理：
*（1）在数据集之中，选择一个元素作为"基准"（pivot），选择中间的值比较容易理解
*（2）所有小于"基准"的元素，都移到"基准"的左边；所有大于"基准"的元素，都移到"基准"的右边。
*（3）对"基准"左边和右边的两个子集，不断重复第一步和第二步，直到所有子集只剩下一个元素为止。
* */
var QuickSort=function(arr){
    var pivotIdx=0;
    var pivot=0;
    var left=[];
    var right=[];
    //如果数组长度小于等于，返回
    if(arr.length<=1){return arr;}
    pivotIdx=Math.floor(arr.length/2);
    pivot=arr.splice(pivotIdx,1)[0];
    for(var i=0;i<arr.length;i++){
        if(arr[i]<pivot){
            left.push(arr[i]);
        }else{
            right.push(arr[i]);
        }
    }
    return QuickSort(left).concat([pivot],QuickSort(right));

}

/*
* 加tracking 谷歌百度 通用代码
* */
function tracker(action){
    ga('send', 'event', "silvadur", action);
    _hmt.push(['_trackEvent', 'smith2', action]);
}
function trackerPV(action){
    ga('send', 'pageview',"/dow/SILVADUR/"+action);
    _hmt.push(['_trackPageview', "/dow/SILVADUR/"+action]);
}

/**
 *查找url中特定的符号的值，比如url中的id="ddd"
 * 没有返回null
 * */
function GetQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

/*
 * 横屏与竖屏
 * */
function orientationChange(orientation,isone){
    setTimeout(function(){
        var sw=$(window).width();
        var sh=$(window).height();
        var th,tr,ts,ts2;
        switch(orientation) {
            case 90:
            case -90:
                //do some thing
                break;
            default:
                //do some thing

                break;
        }
    },(isone==true ? 1 : 300));
};

/**
 * 阻止touchmove事件冒泡（适应活动规则滚动类型）
 */
var JSJStopMoveEvent=function(dombox){
    var t=this;
    t.tty=0,t.box=dombox;
    t.box.each(function(i,element){
        $(this)[0].addEventListener("touchstart",function(e){
            tty=e.touches[0].pageY;
        });
    });
    t.box.each(function(i,element){
        $(this)[0].addEventListener("touchmove",function(e){
            var len=e.touches[0].pageY-tty;
            if((len<0 && $(this).scrollTop()<$(this).children().height()-$(this).height())
                || (len>0 && $(this).scrollTop()>0)
            ){
                e.stopPropagation();
            }
        });
    });
}

/**
 * 阻止touchmove事件冒泡（适应滚动底继续滑动翻页的情况）
 */
var StopMoveEvent=function(dombox){
    var t=this;
    t.tty=0,t.box=dombox;
    t.stop=[];
    t.box.each(function(i,element){
        addTEVent(i,this);
    });

    function addTEVent(i,_this){
        $(_this)[0].addEventListener("touchstart",function(e){
            tty=e.touches[0].pageY;
            t.stop[i]=false;
        });
        $(_this)[0].addEventListener("touchmove",function(e){
            var len=e.touches[0].pageY-tty;
            if((len<0 && $(_this).scrollTop()<$(_this).children().height()-$(_this).height())
                || (len>0 && $(this).scrollTop()>0)
            ){
                e.stopPropagation();
                t.stop[i]=true;
            }
        });
        $(_this)[0].addEventListener("touchend",function(e){
            if(t.stop[i]){
                e.stopPropagation();
            }
        });
    }
}
/**
 *重力感应  陀螺仪
 *
 * 30是偏移幅度
 * 初始角度可以在g=event.gamme调整
 */

var ZMController=function(){
    var t=this;
    t.min_angX=-30;
    t.max_angX=30;
    t.min_angY=-30;
    t.max_angY=30;
    t.ang={x:0,y:0}
    t.size={w:$(window).width(),h:$(window).height()};
    t.center={x:t.size.w/2,y:t.size.h/2};
    t.currpoint={x:t.size.w/2,y:t.size.h/2};

    if (window.DeviceOrientationEvent){
        window.addEventListener('deviceorientation', function(event){
            var a = event.alpha,
                b = event.beta,
                g = event.gamma;
            //if(event.gamma>=60){g=-event.gamma+35}   //超过90度数值会反过来
            t.ang.x=Math.max(t.min_angX,Math.min(t.max_angX,-g));
            t.ang.y=Math.max(t.min_angY,Math.min(t.max_angY,-b));
        }, false);
        if(_s.browser.isPC){
            document.addEventListener("mousemove",onmousemove)
        }
    } else {
        console.log('This device does not support deviceorientation');
    }

    function onmousemove(e){
        t.currpoint.x=e.x;
        t.currpoint.y=e.y;//_s.trace(t.currpoint.y,t.center.y,t.ang.y)
        if(t.currpoint.x>t.center.x){
            t.ang.x=(t.currpoint.x-t.center.x)/t.center.x*t.max_angX;
        }else if(t.currpoint.x<t.center.x){
            t.ang.x=(t.center.x-t.currpoint.x)/t.center.x*t.min_angX;
        }else{
            t.currpoint.x=t.center.x;
            t.ang.x=0;
        }
        if(t.currpoint.y>t.center.y){
            t.ang.y=(t.currpoint.y-t.center.y)/t.center.y*t.max_angY;
        }else if(t.currpoint.y<t.center.y){
            t.ang.y=(t.center.y-t.currpoint.y)/t.center.y*t.min_angY;
        }else{
            t.currpoint.y=t.center.y;
            t.ang.y=0;
        }
    }
};

/**
 * 序列帧
 */
var ImgSequence=function(dom,arr,fps){
    var t=this;
    t.idx=0;
    t.len=arr.length;
    t.timer=null;
    t.play=function(){
        if(t.idx<t.len){
            dom.attr("src",arr[t.idx]);
            t.idx++;
        }
        t.timer=setTimeout(function(){
            t.play();
        },fps || 8)
    };
    t.stop=function(){
        clearTimeout(t.timer);
    }
};

/*表单验证*/
var ZXJSValidateForm=function(){
	var t=this;
	t.isMobile=function(s) {return (/^[1][3-8]\d{9}$/).test(s);};
	t.isEmail=function(s) {return (/^[-_A-Za-z0-9\.]+@([-_A-Za-z0-9]+\.)+[A-Za-z0-9]{2,4}$/).test(s);};
	t.isPhone=function(s){return (/^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/).test(s) || (/^[0][1-9]{2,3}-[0-9]{5,10}$/).test(s)};
	/*是否为空格*/
	t.isNull=function(s) {if (s == ""){ return true;};return (/^[ ]+$/).test(s);};
	t.isIP=function(s) {
		if (isNull(s)){return false;};
		var re = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/g;
		if (re.test(s)) {
			if (RegExp.$1 < 256 && RegExp.$2 < 256 && RegExp.$3 < 256 && RegExp.$4 < 256) {return true;}
		};
		return false;
	};
	/*是否为整个数字*/
	t.isInteger=function(s) {return (/^[-]{0,1}[0-9]{1,}$/).test(s);};
	/*是否只由数字，字母，下划线组成*/
	t.isNumberOr_Letter=function(s) {return (/^[0-9a-zA-Z\_]+$/).test(s);};
	/*是否为url格式*/
	t.isUrl=function(s){return (/^http|https|ftp:\/\/[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/).test(str);};
};
ZXJSValidateForm.prototype={constructor:ZXJSValidateForm};
/*字符串处理*/
var ZXJSString=function(){
	var t=this;
	t.trim=function(s){return s.replace(/(^\s*)|(\s*$)/g, "");};
	/*字符串长度，全角按两个字符算*/
	t.strLen=function(s){return s.replace(/[^\x00-\xff]/g,"aa").length;};
	/*将特殊字符替换为空格，特殊字符：将换页符/制表符/回车符/换行符。*/
	t.replaceToSpace=function(s){return s.replace(/[\f\n\r\t]/g," ");};
	/*将n格式化为带逗号的字符串，eg.formatNumToStr(1234567) -> 1,234,567*/
	t.formatNumToStr=function(n,len,sign) {
		var str = String(n);
		if(!len){len=3;};
		if(!sign){sign=",";};
		var r = str.length % len;
		var arr = new Array();
		for (var i = 0; i < len - r && r > 0; i++) {
			str = "0" + str;
		};
		arr.push(Number(str.substr(0,len)));
		for (var j = 1; j < str.length / len; j++) {
			arr.push(str.substr(j * len, len));
		};
		return (arr.join(sign));
	};
	/*将n格式化为时间格式00:00，仅限两段eg.formatNumToStr(80) -> 01:20*/
	t.formatNumToTime=function(n){
		n=parseInt(n);
		var m=Math.floor(n/60);
		var s=n%60;
		return [m>9 ? m : "0"+m,s>9 ? s : "0"+s].join(":");
	};
	/*将n格式化为指定位数的字符串，不足位数补0。eg.formatNumToLen(12,4) -> 0012*/
	t.formatNumToLen=function(n, len) {
		if(!len){len=3;};
		var str = String(n);
		var tlen = len - str.length;
		for (var i = 0; i < tlen; i++) {str = "0" + str;};
		return str;
	};
	t.strReplaceObj=function(templete,obj,regExp){
		if(!regExp){regExp=/%([a-zA-Z0-9_]+)%/g};
		var re=new RegExp(regExp);
		return templete.replace(re,function(m1,m2){return obj[m2];});
	};
	/*将字符串（类似：a=1&b=2&c=3）转换为对象*/
	t.makeVarsObj=function(url){
		var str=url;
		var theRequest = new Object();
		if (url.indexOf("?") != -1) {
			str = url.substr(url.indexOf("?")+1);//获取url中"#"符后的字串
		};
		if(url.indexOf("#")>-1){
			str=str.substr(0,str.lastIndexOf("#"));
		};
		if (str.indexOf("&") != -1) {
			strs = str.split("&");
			for (var i = 0; i < strs.length; i++) {
				theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
			}
		} else {
			var key = str.substring(0,str.indexOf("="));
			var value = str.substr(str.indexOf("=")+1);
			theRequest[key] = decodeURI(value);
		};
		return theRequest;
	};
};
ZXJSString.prototype={constructor:ZXJSString};
/*数值处理*/
var ZXJSMath=function(){
	var t=this;
	/*获取比例拉伸的比例值isInArea	【对象全显示在范围内还是铺满范围允许溢出】*/
	t.getScale=function(w, h, ow, oh, isInArea) {if(isInArea){if (w / ow > h / oh) {return ow / w;};return oh / h;}else {if (w / ow > h / oh) {return oh / h;};return ow / w;};};
	/*获取下N个索引,当前索引值(1~n)*/
	t.getNextNum=function(len,_idx,n) {if(!n){n=1;};var next=_idx+n;if (next<=len) {return next;};return next-len;};
	/*获取上N个索引,当前索引值(1~n)*/
	t.getPreNum=function(len,_idx,n) {if(!n){n=1;};var pre=_idx-n;if (pre>0) {return pre;};return len+pre;};
	/*求两点之间的角度(0~360)，最左边是为0(结束点在起始点正左侧)，顺时*/
	t.towPointAngle=function(x1,y1,x2,y2) {var t = (y1 - y2) / (x1 - x2);var a = Math.atan(t) * 180 / Math.PI;if (x1 < x2) {a = 180 + a;}else if (y1 < y2) {a = 360 + a;};return int(a);};
	/*角度->弧度*/
	t.deg2rad=function(degrees){return degrees * Math.PI /180;};
	/*弧度->角度*/
	t.rad2deg=function(radians){return radians * 180 / Math.PI;};
};
ZXJSMath.prototype={constructor:ZXJSMath};
/*数组处理*/
var ZXJSArray=function(){
	var t=this;
	/*数组顺序找法，从arr数组中查找数据key，返回数组下标。*/
	t.orderSearch=function(arr, key) {
		var n;arr.forEach(callback);
		function callback(element, i, arr) {if (element == key) {n = i + 1;return;}};
		return ((n > 0) ? n - 1 : -1);
	};
	/*数组二分查找法，从arr数组中查找数据key，返回数组下标。*/
	t.binarySearch=function(arr, key){
		var low=0, mid, high= arr.length - 1;
		while (low<=high){
			mid = low + (high - low) / 2;
			if(arr[mid] < key){low = mid + 1;}else if(arr[mid] > key){high = mid - 1;}else{return mid;};
		};
		return -1;
	};
	/*数组随机排序算法，生成新数组*/
	t.arrayRandSort=function(arr) {
		var tarr = arr.slice();
		var temp,indexA,indexB,i=tarr.length;
		while (i){
			indexA = i - 1;
			indexB = Math.floor(Math.random() * i);
			i--;
			if (indexA == indexB){continue;}
			temp = tarr[indexA];
			tarr[indexA] = tarr[indexB];
			tarr[indexB] = temp;
		};
		return tarr;
	};
	/*删除数组重复元素，改变原始数组。*/
	t.delRepeat=function(arr) {
		for (var i=0; i < arr.length-1; i++ ) {for (var j = i+1; j < arr.length; j++ ) {if (arr[i] == arr[j]) {arr.splice(j, 1);i = 0;};};}return arr;
	};
	/*两个数组绝对比较是否相同,返回true/false*/
	t.compare=function(arr1, arr2) {
		if (arr1.length != arr2.length) return false;
		for (var i=0; i < arr1.length; i++ ) {
			if (arr1[i] != arr2[i]) return false;
		};
		return true;
	};
	/*查看数组中最大的数*/
	t.searchMax=function(arr){
		var low=0,tnum=0,getNum;
		while (low < arr.length) {
			getNum=Number(arr[low]);
			if(getNum*0==0){if (getNum > tnum) tnum = getNum;};
			low++;
		};
		return tnum;
	};
	/*查看数组中最小的数*/
	t.searchMin=function(arr){
		var low=0,tnum=0,getNum;
		while (low < arr.length) {
			getNum=Number(arr[low]);
			if(getNum*0==0){if (getNum < tnum) tnum = getNum;}
			low++;
		};
		return tnum;
	};
	/*删除数组中指定索引的元素并返回一个新数组(n:0~n-1)*/
	t.delByIndex=function(n){if(n<0){return this;}else{return this.slice(0,n).concat(this.slice(n+1,this.length));}};
};
ZXJSArray.prototype = {constructor:ZXJSArray};
/*检测userAgent*/
var ZXJSBrowser=function(){
	var u = navigator.userAgent, app = navigator.appVersion;
	return {
		isPC: chkPC(),
		isIOS: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
		isAndroid: u.indexOf('Android') > -1,
		isWX: u.toLowerCase().indexOf('micromessenger') > -1,
		isYX: u.toLowerCase().indexOf('yixin') > -1,
		isWB: u.toLowerCase().indexOf('weibo') > -1,
		isPhone: u.indexOf('iPhone') > -1,
		isPad: u.indexOf('iPad') > -1,
		isWP:u.indexOf("Windows Phone") > -1,
		isSB: u.indexOf('SymbianOS') > -1,
		isPod: u.indexOf('iPod') > -1,
	};
	function chkPC(){
		var Agents = ["Android", "iPhone",
                "SymbianOS", "Windows Phone",
                "iPad", "iPod"];
		var flag = true;
		for (var v = 0; v < Agents.length; v++) {
			if (u.indexOf(Agents[v]) > 0) {
				flag = false;
				break;
			}
		};
		return flag;
	}
};
/*摇一摇*/
var ZXJSShake=function(cf){
	var t = this,
		defaults = {
			callback:null,
			shake_threshold:800,/*阈值*/
			rateTime:150/*频率*/
		};
	t.lastTime=0;
	t.la={x:0,y:0,z:0};
	t.ca={x:0,y:0,z:0};
	t.pc=null;
	t.apply(t,cf,defaults);
};
ZXJSShake.prototype = {
	start:function(){
		var t=this;
		if (window.DeviceMotionEvent && !t.isPC()) {
			window.ondevicemotion = function(e){t.onMotion(e);};
		}else{
			t.pc = setInterval(function(e){t.onMotion({accelerationIncludingGravity:{x:Math.random()*5000,y:Math.random()*5000,z:Math.random()*2500}});},500);
		}
	},
	onMotion:function(eventData){
		var t = this;
		var acceleration = eventData.accelerationIncludingGravity;
		var curTime = new Date().getTime();
		if(t.lastTime==0){
			t.lastTime = curTime;
			return false;
		};
		var diffTime = (curTime - t.lastTime);
		if (diffTime > t.rateTime) {
			t.lastTime = curTime;
			t.ca.x = acceleration.x;
			t.ca.y = acceleration.y;
			t.ca.z = acceleration.z;
			if((t.la.x==0 && t.la.y==0 && t.la.z==0)){
				t.la.x = t.ca.x;
				t.la.y = t.ca.y;
				t.la.z = t.ca.z;
				return;
			}
			var speed = Math.abs(t.ca.x+t.ca.y+t.ca.z-t.la.x-t.la.y-t.la.z) / diffTime * 10000;
			if (speed > t.shake_threshold) {
				t.callback(speed);
			};
			t.la.x = t.ca.x;
			t.la.y = t.ca.y;
			t.la.z = t.ca.z;
		}
	},
	stop:function(){
		if (window.DeviceMotionEvent) {	
			window.ondevicemotion = function(){};
		};
		if(this.pc){
			clearInterval(this.pc);
		}
	},
	isPC:function() {
		var userAgentInfo = navigator.userAgent;
		var Agents = ["Android", "iPhone",
					"SymbianOS", "Windows Phone",
					"iPad", "iPod"];
		var flag = true;
		for (var v = 0; v < Agents.length; v++) {
			if (userAgentInfo.indexOf(Agents[v]) > 0) {
				flag = false;
				break;
			}
		};
		return flag;
	},
	apply:function(o, c, defaults){
		if(defaults){
			this.apply(o, defaults);
		};
		if(o && c && typeof c == 'object'){
			for(var p in c){
				o[p] = c[p];
			}
		};
		return o;
	},
	constructor:ZXJSShake
};
/*cookie*/
var ZXJSCookie=function(){
	var t=this;
	/*取cookie*/
	t.get=function(key){return $.cookie(key);};
	/*写cookie*/
	t.set=function(key,value){$.cookie(key, value, { path: '/', expires: 1 });};
	/*清除cookie*/
	t.clear=function(key){$.cookie(key,null, { path: '/' });};
	/*写cookie,day为1表示生效时间到第二天0点为止*/
	t.setByDay = function(key, value, day) {
		if(!day){day=1;};
		var currentDate = new Date();
        expirationDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()+day, 0, 0, 0);
		$.cookie(key, value, { path: '/', expires: expirationDate});
	}
};
ZXJSCookie.prototype = {constructor:ZXJSCookie};
jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') {
        options = options || {};
        if (value === null) {value = '';options.expires = -1;};
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {date = new Date();date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));}else{date = options.expires;};
            expires = '; expires=' + date.toUTCString();
        };
        var path = options.path ? '; path=' + options.path : '';
        var domain = options.domain ? '; domain=' + options.domain : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) == (name + '=')) {cookieValue = decodeURIComponent(cookie.substring(name.length + 1));break;};
            };
        };
        return cookieValue;
    }
};
/*预加载，参数obj属性或string：
list:[{src:xxx}];
progress:加载时调用的方法,返回参数：idx:当前第几张,total:图片总数,precent:加载百分比,不带%号
end:加载完成*/
var ZXJSPreloadImg=function(obj){
	var arr=obj.list;
	var onprogress=obj.progress;
	var onend=obj.end;
	var idx=0,len=arr.length;
	var data=new Array();
	
	loadimg();
	function loadimg(){
		var img=new Image();
		img.onload=function(){
			data.push({img:img,path:arr[idx]});
			idx++;
			if(onprogress) onprogress({precent:Math.floor(idx/len*100),idx:idx,total:len});
			if(idx>=len){if(onend){onend(data);};}else{loadimg();};
		};
		img.src=(typeof(arr[idx])=="string") ? arr[idx] : arr[idx].src;
	}
};
ZXJSPreloadImg.prototype = {constructor:ZXJSPreloadImg};

/*提交数据*/
var ZXJSSubAPI=function(){};
ZXJSSubAPI.prototype = {
	init:function(subURL,mapping){
		var t=this;
		t.subURL=subURL;
		t.mapping=mapping;
		t.tobj={};
		t.tdata={};
		t.turl={}
	},
	makedata:function(fname,params){
		var t=this,url;
		var tobj=t.mapping[fname];
		if(tobj.action.indexOf("http://")==0){
			url=tobj.action;
		}else{
			url=t.subURL+tobj.action;
		};
		var tdata=new Object();
		for(var s in params){
			if(tobj.params[s]){
				tdata[tobj.params[s]]=params[s];
			}else{
				tdata[s]=params[s];
			}
		};
		t.turl[fname]=url;
		t.tobj[fname]=tobj;
		t.tdata[fname]=tdata;
	},
	postJSON:function(fname,params,callsuccess,callerror){
		var t=this;
		t.makedata(fname,params);
		if(_zx.isTest){
			callsuccess(t.tobj[fname].testdata);
		}else{
			$.ajax({
				url: t.turl[fname],
				type: 'POST',
				xhrFields:{withCredentials:true},
				crossDomain:true,
				data:t.tdata[fname],
				dataType: 'json',
				success: function(data){
					callsuccess(data);
				},
				error:function(data){
					if(callerror!=null){callerror(data);}
				}
			});
		};
	},
	getJSON:function(fname,params,callsuccess,callerror){
		var t=this;
		t.makedata(fname,params);
		if(_zx.isTest){
			callsuccess(t.tobj[fname].testdata);
		}else{
			$.ajax({
				url: t.turl[fname],
				type: 'GET',
				xhrFields:{withCredentials:true},
				crossDomain:true,
				data:t.tdata[fname],
				dataType: 'json',
				success: function(data){
					callsuccess(data);
				},
				error:function(data){
					if(callerror!=null){callerror(data);}
				}
			});
		};
	},
	constructor:ZXJSSubAPI
};

var ZxJs=function(){
	try{jQuery.support.cors = true;}catch(e){}
	var t=this;
	t.version=1.1;
		t.mousedown="touchstart";
		t.mouseup="touchend";
		t.mousemove="touchmove";
	
	t.init=function(tw,th,serverURL){
		if((document.ontouchstart==null && _zx.browser.isPC) || (!('ontouchstart' in window) && !_zx.browser.isPC)){
			mousedown="mousedown";mouseup="mouseup";mousemove="mousemove";
		};
		t.tw=tw,t.th=th,t.serverURL=serverURL;
		t.sw=$(window).width();
		t.sh=$(window).height();
		t.ssmin=_zx.gmath.getScale(t.tw,t.th,t.sw,t.sh,true);
		t.ssmax=_zx.gmath.getScale(t.tw,t.th,t.sw,t.sh,false);
		t.ssh=_zx.sh/_zx.th;
		t.ssw=_zx.sw/_zx.tw;
		if(location.href.indexOf("localhost")>-1 || location.href.indexOf("192.168.")>-1 || location.href.indexOf("127.0.0")>-1){
			t.isTest=true;
		}else{
			t.isTest=false;
		};
	};
	
	t.trace=function(){if (window.console && console.log) {console.log(arguments);}};
	t.traceObj=function(obj){if (window.console && console.log) {console.log(JSON.stringify(obj));}};
	t.getYMHasDay=function(y, m) {var mday = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31); if ((y % 40 == 0 && y % 100 != 0) || y % 400 == 0){mday[1] = 29;};return mday[m - 1];};
	t.getAges=function (str){var r=str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);if(r==null)return false;var birth=new Date(r[1],r[3]-1,r[4]);if(birth.getFullYear()==r[1]&&(birth.getMonth()+1)==r[3]&&birth.getDate()==r[4]){var today=new Date();var age=today.getFullYear()-r[1];if(today.getMonth()>birth.getMonth()){return age};if(today.getMonth()==birth.getMonth()){if(today.getDate()>=birth.getDate()){return age}else{return age-1}};if(today.getMonth()<birth.getMonth()){return age-1}}return false};
	
	t.zoomDom=function (dom,s,origin){
		if(!origin)	origin="center center";
		dom.css({"-webkit-transform":"scale("+s+")","-moz-transform":"scale("+s+")","-ms-transform":"scale("+s+")","-transform":"scale("+s+")","-webkit-transform-origin":origin,"-moz-transform-origin":origin,"-ms-transform-origin":origin,"-transform-origin":origin});
	};
	
	t.browser=t.chkBrowser();
	t.vform=new ZXJSValidateForm();
	t.gstring=new ZXJSString();
	t.garray=new ZXJSArray();
	t.gmath=new ZXJSMath();
	t.cookie=new ZXJSCookie();
	t.subAPI=new ZXJSSubAPI();
};
ZxJs.prototype = {
	Shake:ZXJSShake,
	PreloadImg:ZXJSPreloadImg,
	chkBrowser:function(){var t=this;if(!t.browser){t.browser=ZXJSBrowser()};return t.browser;},
	JSubAPI:ZXJSSubAPI,
	constructor:ZxJs
};
var _zx=new ZxJs();