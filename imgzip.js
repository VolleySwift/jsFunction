/**
 * 
 * @authors jsoncode (http://jsoncode.com)
 * @date    2014-10-13 13:03:26
 * @version $Id$
 */

var jsoncode=(function(){
	/*	imgzip：图片压缩，
	*	json:
	*		file 	：必须。file类型的input按钮的选择器（#id,.class,input[type=file]...）
	*		fileStyle：可选。是否设置按钮的样式。默认为false
	*		widt 	：可选。被压缩后的图片宽度
	*		quality ：可选。被压缩后的图片质量
	*		type 	：可选。图片格式（仅支持png-无压缩，jpeg/jpg,可压缩）
	*		error 	：可选。错误信息
	*		success ：可选。成功信息，包图片流等。返回值是一个对象
	*	
		eg.
		imgzip({
			file 	:'#fileid',
			fileStyle:true,
			width 	:'100'|100|'50%',
			quality :'0.3'|0.3,
			error 	:function(error){
				console.log(error);
			},
			success :function(data){
				console.log(data);
			}
		});

		返回值：
		Object{
			name: "32",									原始图片的名称，不包含后缀
			nameSuffix: ".jpg",							原始图片的后缀名
			type: "image/jpeg",							原始图片类型
			size: 183844,								原始图片大小
			width: 590									原始图片宽度
			height: 470,								原始图片高度
			url: "data:image/jpeg;base64,...",			原始图片路径
			flow: "",									原始图片流
			img: imgDom,								原始图片（保存在img中）

			quality: 0.1,								图片压缩质量
			newType: "image/jpeg",						压缩后图片格式
			newWidth: 590,								压缩后图片高度
			newHeight: 470,								压缩后图片高度
			newUrl: "data:image/jpeg;base64,...",		压缩后图片路径
			newFlow: "",								压缩后图片流
			canvas: canvasDom							压缩后图片（保存在canvas中）
		}
	*/
	this.imgzip=function(obj){

		//获取file按钮
		if (obj.file) {
			imgzip.file=obj.file;
		}else{
			return console.log('selector is null');
		}

		//获取文件按钮对象
		var input=document.querySelector(imgzip.file);

			//给文件按钮添加accept属性值：image/*(表示只能选择图片类型的文件)
			input.setAttribute('accept','image/*');

		var file=null;
		//是否重置input样式
		imgzip.fileStyle=obj.fileStyle||false;

		if (!imgzip.fileStyle) {

			file=input;

		}else{
			//克隆input
			file=input.cloneNode(true);

			//创建父盒子模型
			var label=document.createElement('label');

			//获取属性placeholder的值，作为按钮名称
			var text=file.getAttribute('placeholder')||'选择图片';

				//创建文本节点
				textNode=document.createTextNode(text);

				//将克隆的input添加到盒子中
				label.appendChild(file);

				label.appendChild(textNode);
				
				//将原来的input替换为带有盒子div的input
				input.parentNode.replaceChild(label,input);

				//设置盒子class
				label.setAttribute('class','fileInput');

				//定义盒子样式
			var style=document.createElement('style');
				style.setAttribute('type','text/css');
				document.querySelector('head').appendChild(style);
				style.innerHTML='.fileInput{color:#fff;text-align:center;line-height:32px;font-size:14px;border-radius:2px;cursor:pointer;display:inline-block;width:100px;height:32px;background-color:rgb(56,121,217);}';
				style.innerHTML+='.fileInput input[type=file]{width:100%;display:none;}';
		}
		//接收错误信息
		imgzip.error=obj.error||function(){};

		//返回图片信息
		imgzip.success=obj.success||function(){};

		//获取用户图片格式
		if (/png/.test(obj.type)) {
			imgzip.type='image/png';
		}else{
			imgzip.type='image/jpeg';
		}

		//获取用户要设置的图片宽度
		imgzip.width=obj.width||null;

		//获取图片压缩比例
		if (parseFloat(obj.quality)) {
			imgzip.quality=parseFloat(obj.quality);
		}else{
			imgzip.quality=0.9;
		}

		//判断选择器是否正确
		if (file==null) {
			imgzip.error(fileSelector+' is null');
			return false;
		}else if(file.type!='file'){
			imgzip.error(fileSelector+' is not file');
			return false;
		}else{
			file.addEventListener('change',this.read,false);
		}
	}

	//读取文件流
	this.read=function(event){
		//读取到的文件
		var file=this.files[0];

		//当取消选择的图片时处理错误
		if (file===undefined)return false;

		//返回的文件对象
		var fileobj={};
		fileobj['this']=event.target;

		//获取图片类型
		fileobj.type=file.type;

		//获取图片名称
	    fileobj.name=file.name.substring(0,file.name.lastIndexOf('.'));

	    //后缀名
	    fileobj.nameSuffix=file.name.substring(file.name.lastIndexOf('.'),file.name.length);

	    //获取图片大小
	    fileobj.size=file.size;
	    
		//图片新格式
		fileobj.newType=imgzip.type;

		//获取图片压缩质量
		fileobj.quality=imgzip.quality;

	    //创建图片流对象
	    var reader = new FileReader();
    	reader.readAsDataURL(file);

    	reader.onerror=function(){
    		console.log(reader.error)
    	}
    	//图片加载完成时获取信息
	    reader.onload=function(e){

	    	//获取base64文件流
	        fileobj.url=reader.result;

	        //获取纯图片二进制流
	        fileobj.flow=reader.result.replace('data:'+fileobj.type+';base64,','');

	        //创建img对象
			var img=new Image();

			//获取img内容
			img.src=fileobj.url;
			fileobj.img=img;
			//获取图像大小
			fileobj.width=img.width;
			fileobj.height=img.height;

			//图片宽高比例 宽/高
			var scale=img.width/img.height;

			//图像新大小
			if (imgzip.width==null) {
				fileobj.newWidth=img.width;
				fileobj.newHeight=img.height;
			}else if (/%$/.test(imgzip.width)){
				var percent=parseInt(imgzip.width.replace(/%$/,''));
				fileobj.newWidth=(img.width*percent)/100;
				fileobj.newHeight=(img.width*percent)/(scale*100);
			}else{
				fileobj.newWidth=imgzip.width;
				fileobj.newHeight=imgzip.width/scale;
			}

			//创建画布
			var canvas=document.createElement('canvas');

			//确定画布的宽高
		    canvas.width=fileobj.newWidth;
		    canvas.height=fileobj.newHeight;

		    //创建二维空间
			var cxt=canvas.getContext('2d');
			
			//将图像画到画布上
		    cxt.drawImage(img, 0, 0, fileobj.newWidth, fileobj.newHeight);

		    fileobj.canvas=canvas;

		    //获取新图像的路径
		    fileobj.newUrl=canvas.toDataURL(fileobj.newType, fileobj.quality);

		    //获取新的图片流媒体
		    fileobj.newFlow=fileobj.newUrl.replace('data:'+fileobj.newType+';base64,','');

		    //返回fileobj对象
		    return imgzip.success(fileobj);
		}


	}
	return this;
})(jsoncode);
window.jsoncode=jsoncode;
