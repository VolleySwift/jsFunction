(function(){
	var xAlert=function(str,type){
		var option = window.xAlert.option;
		var timeout = option.timeout||3000;
		var hidetime = option.hidetime||200;
		var str = str.toString() || "";
		var type = type || "success";
		var style = '.x-alert-cover{top:0;right:0;max-height:100%;width:300px;position:fixed;overflow-x:hidden;overflow-y:auto;font-family:"Helvetica Neue","Hiragino Sans GB","Microsoft YaHei","\9ED1\4F53",Arial,sans-serif}.x-alert-cover::-webkit-scrollbar{width:0;height:0}.x-alert-cover .xAlert{color:#fff;margin:5px 0;font-size:14px;border-radius:3px;padding:15px;overflow:hidden;background-repeat:no-repeat;background-position:15px center}.x-alert-cover .xAlert.xAlert-success{background-color:#51a351}.x-alert-cover .xAlert.xAlert-error{background-color:#bd362f}';

		var body = document.querySelector("body");
		var styleDom = document.querySelector("#xalert-style");
		if (!styleDom) {
			styleDom = document.createElement("style");
			styleDom.setAttribute("id", "xalert-style");
			styleDom.innerHTML = style;
			body.appendChild(styleDom);
		}
		var alertCover = document.querySelector(".x-alert-cover");
		if (!alertCover) {
			alertCover = document.createElement("div");
			alertCover.className = "x-alert-cover";
			body.appendChild(alertCover);
			alertCover = document.querySelector(".x-alert-cover");
		}
		var FirstAlert = alertCover.querySelector(".xAlert");

		var newNode = document.createElement("div");
		newNode.innerHTML = str;
		newNode.className = "xAlert xAlert-"+type;
		alertCover.insertBefore(newNode, FirstAlert);

		newNode.style.transitionDuration=hidetime+"ms";
		function timeoutFn(){
			newNode.style.height = 0;
			newNode.style.paddingTop = 0;
			newNode.style.paddingBottom = 0;
			newNode.style.marginTop = 0;
			newNode.style.marginBottom =0;
			newNode.style.opacity = 0;
			setTimeout(function(){
				alertCover.removeChild(newNode);
			},hidetime);
		}
		var timer = setTimeout(function(){
			timeoutFn();
		},timeout);

		newNode.onmouseover = function(){
			clearTimeout(timer);
		}
		newNode.onmouseout = function(){
			timer = setTimeout(function(){
				timeoutFn();
			},timeout);
		}

		return this;
	};
	window.xAlert = xAlert;
})(window);
