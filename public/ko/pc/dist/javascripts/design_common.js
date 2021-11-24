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
            // TweenMax.to($gnbPopup, .8, { left:"-1370px", opacity:0, ease: Power2.easeOut});
            TweenMax.to($(".menu_wrap"), 1, { width:0, ease: Power2.easeOut});
            TweenMax.to($dim, 1, { display:"none", opacity:0 });
        } else {
            _this.addClass("active");
            // TweenMax.to($gnbPopup, 1, { left:"0", opacity:1, ease:Power2.easeOut});
            TweenMax.to($(".menu_wrap"), 1, { width:"1370px", opacity:1, ease: Power2.easeOut});
            TweenMax.to($dim, 1, { display:"block", opacity:1 });
        }
    });
    $closeBtn.on("click",function(){
        $gnbBtn.removeClass("active");
        // TweenMax.to($gnbPopup, .8, { left:"-1370px", opacity:0, ease: Power2.easeOut});
        TweenMax.to($(".menu_wrap"), 1, { width:0, ease: Power2.easeOut});
        TweenMax.to($dim, 1, { display:"none", opacity:0 });
    });

    $dim.on("click",function(){
        $gnbBtn.removeClass("active");
        // TweenMax.to($gnbPopup, .8, { left:"-1370px", opacity:0, ease: Power2.easeOut});
        TweenMax.to($(".menu_wrap"), 1, { width:0, ease: Power2.easeOut});
        TweenMax.to($dim, 1, { display:"none", opacity:0 });
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
            // TweenMax.to($header, .5, { y:"0" })
        }
    });

    function wheelMotion() {
        /*window.addEventListener("wheel", function (e) {
            const data = e.deltaY;

            // 내릴 때
            if ( $header.hasClass("on") ) {
                if (data > 0) {
                    TweenMax.to($header, .5, { y:"-120px" })
                    $header.removeClass("on");
                    // console.log("아래로")
                }
            // 올릴 때
            } else {
                if (data < 0) {
                    TweenMax.to($header, .5, { y:"0" })
                    $header.addClass("on");
                    // console.log("위로")
                } 
            }
        });*/


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
    if ($(".container").hasClass("sub1")) {sub1();}
    if ($(".container").hasClass("main")) {main();}
    if ($(".container").hasClass("gallery")) {gallery();}

    function gallery() {
        const gallerySlider = new Swiper("#gallerySlide", {
            slidesPerView: "auto",
            spaceBetween: 75,
            grabCursor: true,
        });
    }

    function main() {
        // section 3 (slider)
        let currentIdx = 0;
        let motionControl = false;

        const $slideSection = $("#slideSection"),
            $txtLi = $slideSection.find(".txt_wrap li");
        const slideImg = $slideSection.find(".slide_img");

        const $slideBtn = $(".slide_btn"),
            $prevBtn = $slideBtn.find(".prev_btn"),
            $nextBtn = $slideBtn.find(".next_btn");

        const slideLength = $txtLi.length;

        $nextBtn.on("click", function () {
            if (motionControl === false) {
                motionControl = true;
                currentIdx++;
                currentIdx = currentIdx % slideLength;
                slidePlay(currentIdx);
            }
        });
        $prevBtn.on("click", function () {
            if (motionControl === false) {
                motionControl = true;
                currentIdx--;
                currentIdx = currentIdx % slideLength;
                if (currentIdx < 0) {
                    currentIdx = slideLength - 1;
                }
                slidePlay(currentIdx);
            }
        });
        
        // 첫번째
        /*function slidePlay(Idx) {
            TweenMax.to($txtLi, .5, {y: 0, opacity: 0});
            TweenMax.to(slideImg.find("ul li"), 1, {width:"100%", opacity: 0});
            TweenMax.to(slideImg.find("ul li img"), 1, {scale:1.2});

            TweenMax.to($txtLi.eq(Idx), .5, {
                y: "-20px", opacity: 1, delay: .5, onComplete: function () {motionControl = false;}
            });
            TweenMax.staggerTo(slideImg.find("ul li:nth-of-type(" + (currentIdx + 1) + ")"), 1, {opacity: 1}, .2);
            TweenMax.staggerTo(slideImg.find("ul li:nth-of-type(" + (currentIdx + 1) + ") img"), 1.3, {scale: 1}, .2);
            TweenMax.staggerTo(slideImg.find("ul li:nth-of-type(" + (currentIdx) + ")"), 1, {width: 0,}, .2);
        }*/


        function slidePlay(Idx) {
            TweenMax.to($txtLi, .5, {y: 0, opacity: 0});
            TweenMax.to(slideImg.find("ul li"), 1, {width:"100%", opacity: 0});
            TweenMax.to(slideImg.find("ul li img"), 1, {scale:1.2});

            TweenMax.to($txtLi.eq(Idx), .5, {
                y: "-20px", opacity: 1, delay: .5, onComplete: function () {motionControl = false;}
            });
            TweenMax.staggerTo(slideImg.find("ul li:nth-of-type(" + (currentIdx + 1) + ")"), 1, {opacity: 1}, .2);
            TweenMax.staggerTo(slideImg.find("ul li:nth-of-type(" + (currentIdx + 1) + ") img"), 1.3, {scale: 1}, .2);
            TweenMax.staggerTo(slideImg.find("ul li:nth-of-type(" + (currentIdx) + ")"), 1, {width: 0,}, .2);
        }














        // section 4 (tab menu)
        const $tabContain = $("#tabContain"),
            $tabMenuLi = $tabContain.find(".tab_menu li"),
            $tabWrapLi = $tabContain.find(".tab_wrap li");

        const $tabLine = $tabContain.find(".line i");
        const leftDat = [0, 297, 607, 891, 1222];

        $tabMenuLi.on("click", function () {
            let _this = $(this),
                _index = _this.index();

            $tabMenuLi.removeClass("active");
            $tabMenuLi.eq(_index).addClass("active");
            TweenMax.to($tabWrapLi, .3, {display: "none", opacity: 0});
            TweenMax.to($tabWrapLi.eq(_index), .3, {display: "block", opacity: 1});

            // 탭라인의 i 의 left 를 index 만큼 옮겨라
            TweenMax.to($tabLine, .5, {left: leftDat[_index]});
        });


        // section 5 (svg link)
        const $generation = $("#generation"),
            $svgLink = $generation.find(".svg_wrap a"),
            $svgSvg = $generation.find(".svg_wrap path"),
            $inSvg = $generation.find(".in_svg path"),
            infoLi = $generation.find(".info_wrap li");

        $svgLink.mouseenter(function () {
            let _this = $(this),
                _index = _this.index();
            infoLi.eq(_index).addClass("active");
            $inSvg.eq(_index).attr('class', "active path" + _index);
        });
        $svgLink.mouseleave(function () {
            let _this = $(this),
                _index = _this.index();
            infoLi.removeClass("active");
            $inSvg.attr('class', "path" + _index);
        });

        $window.scroll(function () {
            // let _pallPos = Math.ceil(winSc / 3);
            // let _pallPos1 = Math.ceil(winSc / 5);
            // TweenMax.to($("body"), .2, { y:-_pallPos1 /*,ease: Power2.easeOut*/ })
        });
    }

    function sub1() {
        $window.scroll(function () {
            let _pallPos = Math.ceil(winSc / 3);
            let _pallPos1 = Math.ceil(winSc / 5);

            TweenMax.to($("body"), .8, {y: -_pallPos/*,ease: Power2.easeOut*/})
            TweenMax.to($(".box1"), .8, {y: -_pallPos/*,ease: Power2.easeOut, */})
            TweenMax.to($(".box2"), .8, {y: -_pallPos1/*,ease: Power2.easeOut, */})
            // TweenMax.to($(".box img"), .5, { y:-_pallPos1/*,ease: Power2.easeOut, */})
        });
    }
}


