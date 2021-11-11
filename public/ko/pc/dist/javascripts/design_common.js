"use strict";
var winW;
var winH;
var esStep = "Expo.ease";
var esOut = "Expo.easeOut";
var $window = $(window);
var winSc = $(window).scrollTop();
var $header = $("#header");
var $html = $("html");
var navAni;
var controller = null;
//gnb
var $gnb = $("#gnb"),
    $navBtn = $gnb.find("button");

//배열 순차 더한 값
var triggerScrVar = [];

$window.load(function () {
    var _this =  $(this);
    winW = _this.width();
    winH = _this.height();
    winSc = _this.scrollTop();
    $window.on("resize", function () {
        winW = _this.width();
        winH = _this.height();
    });
    _this.trigger("resize");
    $(window).scroll(function () {
        winSc = _this.scrollTop();
    });
    layout();
    main();
});
function layout() {
    const $header = $("header"),
        $gnbBtn = $("#gnbBtn"),
        $gnbPopup = $("#gnbPopup"),
        $closeBtn = $header.find(".close_btn"),
        $dim = $(".dim");

    $gnbBtn.on("click", function(){
        let _this = $(this);
        if ( _this.hasClass("active") ) {
            _this.removeClass("active");
            TweenMax.to($gnbPopup, .8, { left:"-1370px", opacity:0, ease: Power2.easeOut});
            TweenMax.to($dim, .8, { display:"none", opacity:0 });
        } else {
            _this.addClass("active");
            TweenMax.to($gnbPopup, 1, { left:"0", opacity:1, ease:Power2.easeOut});
            TweenMax.to($dim, 1, { display:"block", opacity:1 });
        }
    });
    $closeBtn.on("click",function(){
        $gnbBtn.removeClass("active");
        TweenMax.to($gnbPopup, .8, { left:"-1370px", opacity:0, ease: Power2.easeOut});
        TweenMax.to($dim, .8, { display:"none", opacity:0 });
    });

    $dim.on("click",function(){
        $gnbBtn.removeClass("active");
        TweenMax.to($gnbPopup, .8, { left:"-1370px", opacity:0, ease: Power2.easeOut});
        TweenMax.to($dim, .8, { display:"none", opacity:0 });
    });

    $window.scroll(function(){
       /* if ( winSc > 120 && winSc < 300 ) {
            TweenMax.to($header, .2, { y:"-120px" })
        }*/
        if ( winSc > 500 ) {
            $("header").addClass("active");
            // TweenMax.to($header, .5, { y:"-120px" })
            wheelMotion();
        } else {

            $("header").removeClass("active");
            TweenMax.to($header, .5, { y:"0" })
        }
    });

    function wheelMotion() {
        window.addEventListener("wheel", function (e) {
            const data = e.deltaY;

            // 내릴 때
            if ( $header.hasClass("on") ) {
                if (data > 0) {
                    TweenMax.to($header, .5, { y:"-120px" })
                    $header.removeClass("on");
                    console.log("아래로")
                }
            // 올릴 때
            } else {
                if (data < 0) {
                    TweenMax.to($header, .5, { y:"0" })
                    $header.addClass("on");
                    console.log("위로")
                } 
            }
        });


    /*    let before = 0;
        window.addEventListener('scroll',function() {
            if (before < window.scrollY) {
                $header.removeClass("on");
                console.log("아래로")
            }
            before = window.scrollY;

            /!*if(before < window.scrollY) {
                TweenMax.to($header, .5, { y:"-120px" })
                $header.removeClass("on");
                console.log("아래로")
            } else {
                TweenMax.to($header, .5, { y:"0" })
                $header.addClass("on");
                console.log("위로")
            }
            before = window.scrollY;*!/
        });*/



    }
}

function main() {
    if ( $(".container").hasClass("sub1") ) {sub1();}
    if ( $(".container").hasClass("main") ) {main();}

    function main() {

        const $generation = $("#generation"),
            $generLi = $("#generation").find("li"),
            $generPath = $("#generation").find("path");

        console.log($generPath);

        $generPath.mouseenter(function(){
            let _this = $(this);
            _this.parents("li").addClass("active");
        });
        $generPath.mouseleave(function(){
            let _this = $(this);
            _this.parents("li").removeClass("active");
        });













        $window.scroll(function(){
            // let _pallPos = Math.ceil(winSc / 3);
            // let _pallPos1 = Math.ceil(winSc / 5);
            // TweenMax.to($("body"), .8, { y:-_pallPos1 /*,ease: Power2.easeOut*/ })
        });
    }
    function sub1() {
        $window.scroll(function(){
            let _pallPos = Math.ceil(winSc / 3);
            let _pallPos1 = Math.ceil(winSc / 5);

            TweenMax.to($("body"), .8, { y:-_pallPos/*,ease: Power2.easeOut*/ })
            TweenMax.to($(".box1"), .8, { y:-_pallPos/*,ease: Power2.easeOut, */})
            TweenMax.to($(".box2"), .8, { y:-_pallPos1/*,ease: Power2.easeOut, */})
            // TweenMax.to($(".box img"), .5, { y:-_pallPos1/*,ease: Power2.easeOut, */})
        });
    }
}


