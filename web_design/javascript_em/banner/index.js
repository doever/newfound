function Banner(){
    this.bannerWidth = 798;
    this.bannerGroup = $("#banner-group");
    this.bannerul = $("#banner-ul");
    this.index = 1;
    this.liList = this.bannerul.children("li");
    this.bannerCount = this.liList.length;
    this.arrow = $(".arrow");
    this.leftArrow = $(".left-arrow");
    this.rightArrow = $(".right-arrow");
    this.pageControl = $(".page-control");
}

Banner.prototype.init = function () {
    console.log("running");
    var self = this;
    var firstBanner = self.bannerul.children("li").eq(0).clone();
    var lastBanner = self.bannerul.children("li").eq(self.bannerCount-1).clone();
    self.bannerul.append(firstBanner);
    self.bannerul.prepend(lastBanner);
    self.bannerul.css({"width":(self.bannerCount+2)*self.bannerWidth,"left":-self.bannerWidth});
};

Banner.prototype.initPageControl = function () {
    var self = this;
    for(var i=0;i<=self.bannerCount-1;i++){
        var pageLi = $("<li></li>");
        self.pageControl.append(pageLi);
        if(i===0){
            pageLi.addClass("active");
        }
    }
};

Banner.prototype.animate = function () {
    var self = this;
    var index = self.index;
    if(index===0){
        index = self.bannerCount-1;
    }else if(index===self.bannerCount+1){
        index = 0;
    }else{
        index = self.index-1;
    }
    self.bannerul.animate({"left":-798*self.index},500);

    self.pageControl.children("li").eq(index).addClass("active").siblings().removeClass("active");
};

Banner.prototype.loop = function () {
    // console.log("hah");
    var self = this;
    self.timer=setInterval(function () {
        // self.bannerCount=4
        if(self.index>=self.bannerCount+1){
            self.bannerul.css({"left":-self.bannerWidth});
            self.index=1;
            self.index++;
        }
        else{
            self.index++;
        }
        self.animate();
    },1000);
};

Banner.prototype.toggleArrow = function (isShow) {
    var self =this;
    if(isShow){
        self.arrow.show();
    }
    else{
        self.arrow.hide();
    }
};

Banner.prototype.listenMouseHover = function () {
    var self = this;
    self.bannerGroup.hover(
        function () {
            //鼠标移入时
            clearInterval(self.timer);
            self.toggleArrow(true);
        },
        function () {
            //鼠标移出时
            self.loop();
            self.toggleArrow(false);
        }
    );
};

Banner.prototype.listenArrowClick = function () {
    var self = this;
    self.leftArrow.click(function () {
        if(self.index===0){
            self.bannerul.css({"left":-4*self.bannerWidth});
            self.index=self.bannerCount-1;
        }else{
            self.index--;
        }
        self.animate();
    });
    self.rightArrow.click(function () {
        if(self.index===self.bannerCount+1){
            self.bannerul.css({"left":-self.bannerWidth});
            self.index=2;
        }
        else{
        self.index++;
        }
        self.animate();
    })
};

Banner.prototype.listenPageControlClick = function () {
    var self = this;
    self.pageControl.children("li").each(function (i,obj) {
        $(obj).click(function () {
            self.index = i+1;
            self.animate();
            $(obj).addClass("active").siblings().removeClass("active");
            // this.addClass("active");
        });
    });
};

Banner.prototype.run = function () {
    var self =this;
    self.init();
    self.initPageControl();
    self.loop();
    self.listenMouseHover();
    self.listenArrowClick();
    self.listenPageControlClick();
};

$(function () {
    var banner = new Banner();
    banner.run();
});