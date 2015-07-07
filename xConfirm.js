/**
 * 
 * @authors jsoncode http://jsoncode.com 
 * @date    2015-07-03 19:33:11
 * @version $Id$
 * @param	msg: string 必须 要提示的内容
 * @param	fn: function 必须 点击确定后的回调函数
 * 
 * 
 * xConfirm(msg,fn);
 */


var xConfirm=function(msg,fn){
	var dom ='<div class="confirm-window"><div class="confirm-heading">消息提示</div><div class="confirm-body"><div class="confirm-body-txt">'+msg+'</div></div><div class="confirm-footer"><div class="confirm-btn confirm-cancle-btn">取消</div><div class="confirm-btn confirm-confirm-btn">确定</div></div></div>';
	var style = '.confirm-cover{top:0;left:0;bottom:0;right:0;color:#555;font-size:13px;padding:10px;z-index:1100;box-sizing:border-box;position:fixed;overflow:hidden;background-color:rgba(0,0,0,.5)}.confirm-cover .confirm-window{background-color:#fff;border-radius:3px;overflow:hidden}.confirm-cover .confirm-heading{height:40px;line-height:40px;padding-left:10px;background-image:-webkit-linear-gradient(top,#fff,#eaeaea);background-image:linear-gradient(top,#fff,#eaeaea)}.confirm-cover .confirm-body{display:table;width:100%;height:140px;overflow-x:hidden;overflow-y:auto;padding:20px;box-sizing:border-box;word-break:break-all;word-wrap:break-word;}.confirm-cover .confirm-body .confirm-body-txt{display:table-cell;vertical-align:middle;text-align:center;}.confirm-cover .confirm-footer{height:50px;padding:0 20px;line-height:50px;text-align:center;background-image:-webkit-linear-gradient(bottom,#F9F9F9,#E4E4E4);background-image:linear-gradient(bottom,#F9F9F9,#E4E4E4)}.confirm-cover .confirm-footer .confirm-btn{display:inline-block;height:32px;margin:9px 5px;padding:0 20px;line-height:32px;text-align:center;border-radius:16px;cursor:pointer;}.confirm-footer .confirm-cancle-btn{background-color:#fff}.confirm-footer .confirm-cancle-btn:hover{background-color:#ddd}.confirm-footer .confirm-confirm-btn{background-color:#0988EA;color:#fff}.confirm-footer .confirm-confirm-btn:hover{background-color:#1075C3}@media (min-width:769px){.confirm-cover .confirm-window{width:400px;margin:100px auto}}@media (max-width:768px){.confirm-cover .confirm-window{width:100%;margin:30px auto}}';

	var body=document.querySelector("body");
	var confirmStyle=document.createElement("style");
	confirmStyle.id="confirm-style";
	confirmStyle.innerHTML = style;
	if (!document.querySelector("#confirm-style")) {
		body.appendChild(confirmStyle);
	}
	var confirmCover=document.createElement("div");
	confirmCover.className="confirm-cover";
	confirmCover.innerHTML = dom;
	if (document.querySelector(".confirm-cover")) {
		body.removeChild(document.querySelector(".confirm-cover"));
	}

	body.appendChild(confirmCover);

	document.querySelector(".confirm-cancle-btn").onclick=function(){
		body.removeChild(confirmCover);
	};
	document.querySelector(".confirm-confirm-btn").onclick=function(){
		fn();
		body.removeChild(confirmCover);
	};
};
