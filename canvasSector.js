/**
 * 
 * @authors jsoncode (http://jsoncode.com)
 * @date    2015-07-09 15:11:40
 * @version $Id$
 */
CanvasRenderingContext2D.prototype.sector=function(x,y,r,sAngle,eAngle,color){
	this.moveTo(x,y);
	this.arc(x,y,r,sAngle,eAngle);
	this.lineTo(x,y);
	this.fillStyle=color;
	this.fill();
	this.save();
}
//example 
var bgcanvas = document.querySelector("#bgcanvas");
var ctx = bgcanvas.getContext("2d");
ctx.sector(250,250,200,0,2*Math.PI,"#fff");
//end  example
