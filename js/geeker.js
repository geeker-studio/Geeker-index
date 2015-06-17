
var ge={
    animate:function(obj,opt,endfn){
    clearInterval(obj.itv);
    obj.itv=setInterval(function(){
        var bStop=true;
        for(var attr in opt){
            if(opt.hasOwnProperty(attr)){
                var cur,_attr=opt[attr],unit="px";
                if(isNaN(_attr)) {
                    _attr=_attr.match(/[-.]*\d+/g)[0];
                    unit=opt[attr].replace(/[-.]*\d+/g,"");
                }
                if(attr=='opacity')
                {
                    cur = Math.round(parseFloat(obj.CSS(attr))*100);
                }
                else
                {
                    cur = parseInt(obj.CSS(attr));
                }
                var speed=(_attr-cur)/6;
                speed=speed>0?Math.ceil(speed):Math.floor(speed);
                if(cur!=_attr){bStop=false;}

                if(attr=='opacity')
                {
                    obj.style.filter="alpha(opacity:"+(cur+speed)+")";
                    obj.style.opacity=(cur+speed)/100;
                }
                else{

                    if(obj.toString().indexOf("HTMLBody")>-1){
                        console.log(cur+speed);

                        obj[attr]=cur+speed;
                    }
                    else{
                        obj.style[attr]=cur+speed+unit;
                    }

                }
                if(bStop)
                {
                    clearInterval(obj.itv);
                    if(endfn) endfn;
                }
            }
        }
    },30);
   },
    menu_toggle:function(){
    var btn=document.getElementById("btn_toggle");
    var contain=document.getElementById("toggle_menu");
    if(btn.attachEvent){
        btn.attachEvent("onclick",function(){
            var cur_status=contain.CSS("display");
            if(cur_status=="none"){
                contain.style.display="block";
                document.body.style.marginLeft="-12.5rem";
            }
        });
        contain.attachEvent("onclick",function(){
            contain.style.display="none";
            document.body.style.marginLeft="0";
        })
    }
    if(btn.addEventListener){
        btn.addEventListener("click",function(){
            var cur_status=contain.CSS("display");
            if(cur_status=="none"){
                contain.style.display="block";
                document.body.style.marginLeft="-12.5rem";
            }
        },false);
        contain.addEventListener("click",function(){
            contain.style.display="none";
            document.body.style.marginLeft="0";
        },false)
    }
},
    backtotop:function(){
    var obj=document.querySelector("#backtotop");

        if(obj.attachEvent){
            obj.attachEvent("onclick",function(){
                ge.animate(document.body,{"scrollTop":0})
            })
        }
        if(obj.addEventListener){
            obj.addEventListener("click",function(){
                console.log(document.body.scrollTop)
                ge.animate(document.body,{"scrollTop":0})
            },false)
        }


}
};/**
 * Created by Administrator on 2015/6/9.
 */
Object.prototype.haveclass=function(cls){
    return this.className.indexOf(cls)>-1;
};

Object.prototype.addclass=function(cls){
    if(!this.haveclass(cls))
    {
        this.className+=" "+cls;
    }
};
Object.prototype.removeclass=function(cls){
    if(this.haveclass(cls)) {
        var cla = this.className, reg = "/\\s*" + cls + "\\b/g";
        this.className = cla ? cla.replace(eval(reg), '') : ''
    }
};
Object.prototype.CSS=function(attr,setvalue) {

    if(typeof setvalue!="undefined"){
        this.style[attr] =setvalue;
    }else{
        if(this.toString().indexOf("HTMLBody")>-1) {
        return this[attr];
        }
        else
        {
            return  typeof window.getComputedStyle != 'undefined' ? window.getComputedStyle(this,null)[attr] : this.currentStyle[attr];
        }

    }
};

window.onresize=function(){
    var slidebox=document.querySelector("#ge_slide");
    var ul=slidebox.querySelector("ul");
    var list_li=ul.querySelectorAll("li");
    var width=document.body.clientWidth||document.documentElement.clientWidth;
    width=isNaN(width)?width.match(/[-.]*\d+/g)[0]:width;
    ul.CSS("width",width*list_li.length+"px");
    for(var i=0;i<list_li.length;i++){
        list_li[i].CSS("width",width+"px");
    }
};
window.onload= function () {
    ge.menu_toggle();
    ge.slide();
    ge.slidecase();
    ge.backtotop();
};

