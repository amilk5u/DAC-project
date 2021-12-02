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
          $closeBtn = $header.find(".close_btn"),
          $dim = $(".dim");

    TweenMax.to($header.find("#gnbBtn, #logo, .generation li"), 1.5, {opacity:1, delay:.2});

    $gnbBtn.on("click", function(){
        let _this = $(this);
        if ( _this.hasClass("active") ) {
            _this.removeClass("active");
            TweenMax.to($(".menu_wrap"), 1, { width:0, ease: Power2.easeOut});
            TweenMax.to($dim, .2, { display:"none", opacity:0 });
        } else {
            _this.addClass("active");
            TweenMax.to($(".menu_wrap"), 1, { width:"1370px", opacity:1, ease: Power2.easeOut});
            TweenMax.to($dim, 1, { display:"block", opacity:1 });
        }
    });
    $closeBtn.on("click",function(){
        $gnbBtn.removeClass("active");
        TweenMax.to($(".menu_wrap"), 1, { width:0, ease: Power2.easeOut});
        TweenMax.to($dim, .2, { display:"none", opacity:0 });
    });

    $dim.on("click",function(){
        $gnbBtn.removeClass("active");
        TweenMax.to($(".menu_wrap"), 1, { width:0, ease: Power2.easeOut});
        TweenMax.to($dim, .2, { display:"none", opacity:0 });
    });

    $window.scroll(function(){
        $(".top").text(winSc);
        if ( winSc < 120 ) {
            $header.removeClass("active");
            TweenMax.to($header, 0.01, { y:"0" })
        }
        // 섹션 1을 지났을 때 화면에 보여라
        if ( winSc > $(".sec1").height() ) {
            if ($header.hasClass("on") === false) {
                $header.addClass("on");
                $header.addClass("active");
                TweenMax.fromTo($header, .5, { y:"-120px" },{ y:"0" })
            }
        } else {
            if ($header.hasClass("on") === true) {
                TweenMax.fromTo($header, .5, { y:"0" },{ y:"-120px" })
                $header.removeClass("on");
            }
        }
    });
}

function main() {
    if ($(".container").hasClass("sub1")) {sub1();}
    if ($(".container").hasClass("main")) {main();}
    if ($(".container").hasClass("gallery")) {gallery();}
    if ($(".container").hasClass("household")) {household();}

    // content motion
    let $motionCont = $(".motion-cont"); // motion-content
    let _contTopArray = []; // content top array
    let playMotion = winH / 10 * 8; // start

    $motionCont.each(function (i) {
        let contH = Math.ceil(($motionCont.eq(i).offset().top) - playMotion);
        _contTopArray.push(contH);
    });

    function motionFun() {
        for (let i = 0; i < $motionCont.length; i++) {
            if (winSc >= _contTopArray[i]) {
                if ($motionCont.eq(i).hasClass("on") === false) {
                    $motionCont.eq(i).addClass("on");
                    TweenMax.to($motionCont.eq(i), .8, {transform: "translate(0,0)", opacity: 1, ease: Power1.easeOut});
                    TweenMax.staggerTo($motionCont.eq(i).find(".plus_btn"), .5, {
                        transform: "translate(0,0)", opacity: 1, display: "block"
                    }, .2);
                    TweenMax.staggerTo($motionCont.eq(i).find("button"), .5, {opacity: 1}, .05);
                    TweenMax.staggerTo($motionCont.eq(i).find(".small_tit i"), .5, {top: "0"}, .07);
                    TweenMax.staggerTo($motionCont.eq(i).find(".title_txt i"), .5, {top: "0"}, .07);
                }
            }
        }
    }

    $window.scroll(function () {
        motionFun();
    });
    motionFun();

    function household() {
        $("header").find("h1 a").eq(0).find("img").attr("src", "./images/common/logo_c.png");
        const $household = $(".household"),
              $selectWrap = $household.find(".select_wrap"),
              $selectLi = $selectWrap.find("li");

        const $filterWrap = $household.find(".filter_wrap"),
              $subBox = $filterWrap.find(".sb_box");

        $selectLi.on("click",function(){
            let _this = $(this),
                _index = _this.index();

            if ( _this.hasClass("active") === false ) {
                $selectLi.removeClass("active");
                TweenMax.to($subBox, .35, { transform:"translate(0,20px)", opacity:0, display:"none" });
                _this.addClass("active");
                TweenMax.to($subBox.eq(_index), .35, { transform:"translate(0,0)", opacity:1, display:"block" });
            } else {
                _this.removeClass("active");
                TweenMax.to($subBox, .35, { transform:"translate(0,20px)", opacity:0, display:"none" });
            }
        });
    }

    function gallery() {
        const $gallery = $(".gallery"),
              $galleryTitle = $gallery.find("h1");
        TweenMax.to($galleryTitle, 1, { transform: "translate(0,0)", opacity:1 });

        const gallerySlider = new Swiper("#gallerySlide", {
            slidesPerView: "auto",
            spaceBetween: 75,
            grabCursor: true,
        });

        // gallery logo 변경
        $("header").find("h1 a").eq(0).find("img").attr("src", "./images/common/logo_c.png");

        const $slidePopup = $("#slidePopup"),
            $imgSlideWrap = $slidePopup.find(".img_wrap"),
            $popClose = $slidePopup.find(".pop_close");
        const $gallerySlide = $(".gallery_slide"),
              SlideCursor = $(".cursor_item");
        let _slideNum = 0,
            PopMotion = false;
        const $popupWrap = $(".popup_wrap");
        let $activeSlide;

        $slidePopup.on("mousewheel", function (e) {
            const data = e.originalEvent.deltaY;
            if (PopMotion === false) {
                if (data > 0) {
                    // 숫자가 현재 텍스트 갯수의 -1 한 것보다 크거나 같을 때
                    if (_slideNum < $activeSlide.length - 1) {
                        PopMotion = true;
                        _slideNum++;
                    } else {
                        return false;
                    }
                } else {
                    // 숫자가 0 보다 작거나 같을 때
                    if (_slideNum > 0) {
                        PopMotion = true;
                        _slideNum--;
                    } else {
                        return false;
                    }
                }
                wheelMotion(_slideNum);
            }
        });

        function wheelMotion(popIdx) {
            let _popImgHeight = $imgSlideWrap.height() * (popIdx);
            TweenMax.to($(".transform_img"), .6, {
                y: -_popImgHeight,
                ease: Power1.easeOut,
                onComplete: () => PopMotion = false
            });
            TweenMax.to($activeSlide, .7, {display: "none", opacity: 0});
            TweenMax.to($activeSlide.eq(popIdx), 1, {display: "block", opacity: 1});
        }

        $gallerySlide.on("click", function () {
            let _this = $(this),
                _index = _this.index();

            $popupWrap.removeClass("active");
            $popupWrap.eq(_index).addClass("active");
            $activeSlide = $(".popup_wrap.active").find(".txt_wrap li");
            $("#wrap").css("margin", "0 17px 0 0");
            $("body").css("overflow", "hidden");
            TweenMax.to($(".pop_container"), .7, {width: "100%"})
            $popupWrap.css("display","none");
            TweenMax.to($popupWrap.eq(_index), .7, {display: "flex"});
            _slideNum = 0;
            $activeSlide.css("display","none");
            TweenMax.to($activeSlide.eq(_slideNum), 1, {display: "block", opacity: 1});
            TweenMax.to($(".transform_img"), 0.01, {
                y: -$imgSlideWrap.height() * _slideNum,
                onComplete: () => PopMotion = false
            });
        });

        // popup Close
        $popClose.on("click", function () {
            $("body").css("overflow", "visible");
            TweenMax.to($(".pop_container"), .7, {width: "0"})
            $("#wrap").css("margin", "0");
        });

        // Mouse Image Change
        $gallerySlide.mouseenter(function(){
            SlideCursor.addClass("active");
            TweenMax.to(SlideCursor, .2, { display:"block", opacity:1 })
            document.addEventListener("mousemove", function(e){
                let x = e.pageX;
                let y = e.pageY;
                SlideCursor.css("transform","translate(" + x + "px," + y + "px)");
            });
        });
        // Mouse Image Change
        $gallerySlide.mouseleave(function(){
            SlideCursor.removeClass("active");
            TweenMax.to(SlideCursor, .2, { display:"none", opacity:0 })
        });
    }

    function main() {
        const $sec1 = $(".sec1");
        const $titleSpan = $sec1.find("span"),
            $titleH1 = $sec1.find("h1");
        const introMotion = new TimelineMax();

        introMotion
            .to($titleSpan, 1, {transform: "translate(0,0)", opacity: 1, delay: .2})
            .to($titleH1, 1, {transform: "translate(0,0)", opacity: 1, delay: -.5})

        let secH = $(".sec1").height() + $(".sec2").height();

        function mouseScrollM() {
            let _pallPos = winSc - secH;

            // 인트로 타이틀 페럴럭스
            /*if ( winSc > 0 && winSc < winH ) {
                console.log(winSc)
                console.log(_pallPos/15)
                console.log("인트로")
                // TweenMax.to($(".title_box h1"), 1, {left: _pallPos/15, ease: Power2.easeOut})
            }*/

            // 중간 슬라이드 이미지 페럴럭스
            if (winSc > secH - winH && winSc < secH + winH) {
                TweenMax.to($(".image_2"), 1, {y: _pallPos / 10, ease: Power2.easeOut})
                TweenMax.to($(".image_3"), 1, {y: -_pallPos / 15, ease: Power2.easeOut})
                TweenMax.to($(".image_4"), 1, {y: -_pallPos / 12, ease: Power2.easeOut})
                TweenMax.to($(".image_5"), 1, {y: _pallPos / 8, ease: Power2.easeOut})
                TweenMax.to($(".small_tit"), 1, {y: -_pallPos / 10, ease: Power2.easeOut})
            }
        }

        $window.scroll(function () {
            mouseScrollM();
        });


        // section 3 (slider)
        let currentIdx = 0;
        let motionControl = false;
        const $slideSection = $("#slideSection"),
            $txtLi = $slideSection.find(".txt_wrap li");
        const slideImg = $slideSection.find(".slide_img"),
            slideUl = $slideSection.find(".image");
        const $slideBtn = $(".slide_btn"),
            $prevBtn = $slideBtn.find(".prev_btn"),
            $nextBtn = $slideBtn.find(".next_btn");
        const slideLength = $txtLi.length;
        const $slideVideo = $(".slide_video");

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

        $slideVideo[0].play();
        function slidePlay(Idx) {
            $txtLi.removeClass("active");
            $txtLi.eq(Idx).addClass("active");
            //default
            $slideVideo.each(function (i) {
                $slideVideo[i].pause();
            });
            if (Idx === slideLength - 1) {
                TweenMax.staggerTo(slideUl.find("li:eq(0)"), 1, {opacity: 0}, .15);
                TweenMax.staggerTo(slideUl.find("li:eq(0) *"), 1.5, {scale: 1.15}, .15);
            }
            TweenMax.to($txtLi, .75, {transform: "translate(20px,0)", display: "none", opacity: 0});
            TweenMax.staggerTo(slideUl.find("li:eq(" + (currentIdx - 1) + " )"), 1, {opacity: 0}, .15);
            TweenMax.staggerTo(slideUl.find("li:eq(" + (currentIdx + 1) + " )"), 1, {opacity: 0}, .15);
            TweenMax.staggerTo(slideUl.find("li:eq(" + (currentIdx - 1) + " ) *"), 1.5, {scale: 1.15}, .15);
            TweenMax.staggerTo(slideUl.find("li:eq(" + (currentIdx + 1) + " ) *"), 1.5, {scale: 1.15}, .15);

            // active
            $slideVideo[Idx].play();
            TweenMax.to($txtLi.eq(Idx), .8, {
                transform: "translate(0,0)", display: "block", opacity: 1, delay: .5, onComplete: function () {
                    motionControl = false;
                }
            });
            TweenMax.staggerTo(slideUl.find("li:eq(" + currentIdx + " )"), 1, {opacity: 1}, .15);
            TweenMax.staggerTo(slideUl.find("li:eq(" + currentIdx + " ) *"), 1.5, {scale: 1}, .15);
        }

        // section 4 (tab menu)
        const $tabContain = $("#tabContain"),
            $tabMenuLi = $tabContain.find(".tab_menu li"),
            $tabWrapLi = $tabContain.find(".tab_wrap li");
        const $videoMap = $("#videoMap");

        // const $tabLine = $tabContain.find(".line i");
        // const leftDat = [0, 297, 607, 891, 1222];

        $tabMenuLi.on("click", function () {
            let _this = $(this),
                _index = _this.index();

            $tabMenuLi.removeClass("active");
            $tabMenuLi.eq(_index).addClass("active");
            TweenMax.to($tabWrapLi, .3, {display: "none", opacity: 0});
            TweenMax.to($tabWrapLi.eq(_index), .3, {display: "block", opacity: 1});
            // TweenMax.to($tabLine, .5, {left: leftDat[_index]});
            $videoMap[0].pause();
            if (_index === 1) {
                $videoMap[0].play();
            }
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


