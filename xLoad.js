var xLoad = {
	style: "@-webkit-keyframes ball-scale-multiple{0%{-webkit-transform:scale(0);transform:scale(0);opacity:0}5%{opacity:1}100%{-webkit-transform:scale(1);transform:scale(1);opacity:0}}@keyframes ball-scale-multiple{0%{-webkit-transform:scale(0);transform:scale(0);opacity:0}5%{opacity:1}100%{-webkit-transform:scale(1);transform:scale(1);opacity:0}}.ball-scale-multiple{position:relative;-webkit-transform:translateY(-30px);-ms-transform:translateY(-30px);transform:translateY(-30px)}.ball-scale-multiple>div:nth-child(2){-webkit-animation-delay:.2s;animation-delay:.2s}.ball-scale-multiple>div:nth-child(3){-webkit-animation-delay:.5s;animation-delay:.5s}.ball-scale-multiple>div{background-color:#50B3D7;border-radius:100%;position:absolute;left:0;top:0;opacity:0;margin:0;width:200px;height:200px;-webkit-animation:ball-scale-multiple 1.5s 0s linear infinite;animation:ball-scale-multiple 1.5s 0s linear infinite}.loading-opacity-cover{position:fixed;top:0;left:0;width:100%;height:100%;z-index: 999999999;}.loader{margin: 0 auto;width: 200px;height: 200px;  position: absolute;top:50%;margin-top:-100px;left:50%;margin-left:-100px;}.loading-msg{position:absolute;bottom:0;left:0;width:100%;text-align:center;color:#50B3D7;}",
	html: "<div class='loader' id='loading'><div class='loader-inner ball-scale-multiple'><div></div><div></div><div></div></div></div>",
	load: function(msg, opacity) {
		if (document.querySelector(".loading-opacity-cover")) {
			document.querySelector(".loading-opacity-cover").parentNode.removeChild(document.querySelector(".loading-opacity-cover"))
		}
		var msg = msg || "";
		var opacity = opacity.toString() || "0";
		var div = document.createElement("div");
		div.className = "loading-opacity-cover";
		var style = document.createElement("style");
		document.querySelector("body").appendChild(style);
		document.querySelector("body").appendChild(div);
		div.innerHTML = this.html;
		style.innerHTML = this.style;
		div.style.backgroundColor = "rgba(255,255,255," + opacity + ")";
		var h4 = document.createElement("div");
		h4.className = "loading-msg";
		h4.innerHTML = msg;
		div.querySelector(".loader").appendChild(h4)
	},
	close: function() {
		if (document.querySelector(".loading-opacity-cover")) {
			document.querySelector(".loading-opacity-cover").parentNode.removeChild(document.querySelector(".loading-opacity-cover"))
		}
	}
};
window.xLoad = xLoad;
