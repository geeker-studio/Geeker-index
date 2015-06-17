(function(ge){
    ge.slide=function(args) {
        if(!(this instanceof arguments.callee)) return new arguments.callee(args);
        this.index=0;
        this.auto=true;
        this.direct='marginLeft';//滚动方向，left,top,
        this.slidebox = "#ge_slide";
        this._init(args);

    };
    ge.slide.prototype._init=function(args){
        if(arguments.length<1) return;
        if(typeof arguments[0]=="object")
        {
            var obj=arguments[0];
            this.slidebox=obj.slidebox||this.slidebox;
            this.direct=obj.direct||this.direct;
            this.auto=obj.auto||this.auto;
            this.index=obj.index||this.index
        }
        var slidebox=document.querySelector(this.slidebox);
        var ul=slidebox.querySelector("ul");
        var slide_btn=slidebox.querySelectorAll(".ge_slide_btn a");
        var list_li=ul.querySelectorAll("li");
        var height=list_li[0].CSS("height");
        var width=document.body.clientWidth||document.documentElement.clientWidth;
        width=isNaN(width)?width.match(/[-.]*\d+/g)[0]:width;
        height=isNaN(height)?height.match(/[-.]*\d+/g)[0]:height;
        ul.CSS("width",width*list_li.length+"px");
        for(var i=0;i<list_li.length;i++){
            list_li[i].CSS("width",width+"px");
        }
        var that=this;
        var play=function() {
            that.timer = setInterval(function () {
                that.index++;
                if (that.index >= list_li.length)
                {
                    that.index = 0;
                }
                var width=document.body.clientWidth||document.documentElement.clientWidth;
                width=isNaN(width)?width.match(/[-.]*\d+/g)[0]:width;
                ge.animate(ul,{"marginLeft":-that.index*width+"px"});
                for(var i=0;i<slide_btn.length;i++) {
                    slide_btn[i].removeclass("active");
                }
                slide_btn[that.index].addclass("active");
            }, 5000)
        };
        if(this.auto) play();
        var hover=function(){
            for(var i=0;i<slide_btn.length;i++){
                slide_btn[i].index = i;
                slide_btn[i].onmouseover = function() {
                    for(var i=0;i<slide_btn.length;i++) {
                        slide_btn[i].removeclass("active");
                    }
                    slide_btn[this.index].addclass("active");
                    that.index=this.index;
                    if(that.timer) clearInterval(that.timer);
                    var width=document.body.clientWidth||document.documentElement.clientWidth;
                    width=isNaN(width)?width.match(/[-.]*\d+/g)[0]:width;
                    ge.animate(ul,{"marginLeft":-that.index*width});
                };
                slide_btn[i].onmouseout = function(){
                    play();
                }
            }
        };
        hover();

    };
    ge.slidecase=function(){
        var casebox=document.querySelector("#ge_case");
        var caseul=casebox.querySelector("ul");
        caseul.innerHTML+=caseul.innerHTML;
        var caseli=caseul.querySelectorAll("li");
        var aCLink = document.querySelectorAll(".casebox>a");

        caseul.CSS("width",(caseli[0].offsetWidth+20)*caseli.length+"px");
        var j = 0;
        aCLink[0].onclick = function(){
            if(j==(caseli.length/2))
            {
                j=0;
            }
            j++;
            ge.animate(caseul,{ left:-(parseInt(caseli[0].CSS('width'))+20)*j});
        };

        aCLink[1].onclick = function(){
            if(j==0)
            {
                j=(caseli.length/2)+1;
            }
            j--;
            ge.animate(caseul,{ left:-(caseli[0].offsetWidth+20)*j});
        };

    }
})(ge);
/**
 * Created by Administrator on 2015/6/11.
 */

