$(document).ready(function() {
    
     $(window).on('scroll', function () {
        // 0) fade 효과
        let scrollY = $(this).scrollTop() + $(this).height() * 3/4; 
    
        $('.fade').each(function (idx) {
          if (scrollY > $(this).offset().top) {
            $(this).addClass('on');
          } else {
            $(this).removeClass('on');
          }
        });
        // 1) cnt2 카메라 움직임
        const $cnt2 = $('#cnt2').offset().top;

        if ( scrollY > $cnt2){
            $('#cnt2 ul li a').parent().addClass('on');
        } else $('#cnt2 ul li a').parent().removeClass('on');

        // 3-1) cnt4 scroller 누르고 있을땐 point_right 사라지게 ok but 왼쪽방향으로 움직일때 제어하기!!!!!!!!!!!!!
    
        // 3-2) 4pass 사진들 delay되면서 나오기
        scrollY = $(this).scrollTop() + $(this).height() * 1/3;         
        const $cnt4 = $('#cnt4').offset().top;
        const $passDelay = $('#cnt4 #pass_delaySlide .pass');
        if (scrollY > $cnt4 ) {
            $passDelay.each(function(i) {
              let topMove = 50 * i + 50;
                $(this).delay(200 * i + 200).animate({top: `${topMove}px`}).addClass('on');
            });
        }
        else {
          $passDelay.css({'top': 0}).removeClass('on');
          }
    });
    $(window).trigger('scroll');
    // 2-1) cnt3 카메라 출력 움직임 - pc
    // 2-2) cnt3 카메라 출력 움직임 - mobile
    const cnt3 = $('#cnt3 .tit_txt').offset().top;
    const cnt4 = $('#cnt4').offset().top;
    const $vanish = $('#cnt3 .vanish');
    let timer = 0;
    var isMobile = $(window).width() < 768 ? true : false;

    $(window).on('scroll resize', function () {
        clearTimeout(timer);

        timer = setTimeout(function () {
            if (window.matchMedia("(max-width: 767px)").matches) { //모바일
                // pc 스타일이 적용 되었다면 초기화 하기 추가(pc에서 모바일로 변경되는 순간 한번만 동작)
                if (isMobile === false) {
                    $vanish.removeClass('on').show().next().find('.img_m, .img_b').removeAttr('style');
                }

                if ($(this).scrollTop() > cnt3 -200 && $(this).scrollTop() < cnt4 - 200) {
                    // 대상 영역에 진입한 경우
                    $vanish.addClass('on').next().find('.img_m').delay(2000).stop().animate({right: '-30%',opacity: 1});
                } else {
                    // 대상 영역을 벗어난 경우 (대상영역의 위나 아래일 경우)
                    $vanish.removeClass('on').next().find('.img_m').stop().animate({right: '10%',opacity: 0});
                }
                isMobile = true;
            }  else { //pc
                //  모바일 스타일이 적용 되었다면 초기화 하기 추가(모바일에서 pc로 변경되는 순간 한번만 동작)
                if (isMobile == true) {
                    $vanish.removeClass('on').show().next().find('.img_m, .img_b').removeAttr('style');
                }

                if ($(this).scrollTop() > cnt3 -300 && $(this).scrollTop() < cnt4 - 300) {
                    // 대상 영역에 진입한 경우
                    // 2. 핸드폰 오른쪽 기울어지고 블루투스 깜빡
                    $vanish.addClass('on');
                    // 3. 카메라가 움직이기 전 작은 이미지 살짝 나옴
                    // 4. 핸드폰과 블루투스 사라짐
                    // 5. 카메라가 움직인 후 큰 이미지가 출력
                    $vanish.fadeOut(2000, function(){
                        $(this).next().find('.img_m').delay(1000).stop().animate({right: '-10%',opacity: 1},function(){
                            $(this).css('opacity',0).next().stop().animate({opacity: 1},'easeInOutQuint');
                        });
                    })
                } else {
                    // 대상 영역을 벗어난 경우 (대상영역의 위나 아래일 경우)
                    console.log('벗어남');
                    $vanish.removeClass('on').show().next().find('.img_m, .img_b').stop(true, false).removeAttr('style');
                }
                isMobile = false;
            }     
        });
    });
    $(window).trigger('resize');

    // 4-1) cnt5 이벤트 페이지 - pc 버전
    const $eventLi = $('#cnt5 .event_pc li');
        
    $eventLi.eq(1).find('.event_txt').show();
    $eventLi.find('.event_img').on('click', function () {
        $(this).parent().addClass('on').siblings().removeClass('on');
/*         // 초기화
        $(this).parent().siblings().removeClass('on').find('.event_txt').stop().slideUp('fast');
        // 클릭하면
        $(this).parent().addClass('on').find('.event_txt').delay(500).slideDown();
 */    
    });

    // 4-1) cnt5 이벤트 - mobile버전 (아코디언)
    const $acco = $('.accordion');
    const $eventAcco = $acco.children();

      // 1) 로딩시 초기 설정 아코디언 2번째는 열려있게, aria-expanded, aria-disabled / 나머지는 'aria-expanded'
      $eventAcco.eq(1).addClass('on').find('.acdnHeader').attr({'aria-expanded': true,'aria-disabled': true,tabIndex: -1}).parent().next().css('visibility','visible').stop().animate({maxHeight: '400px'}).attr('tabIndex', 0);
      $eventAcco.not('.on').find('.acdnHeader').attr({'aria-expanded': false});

      //2) 아코디언헤더(버튼)을 누르는 동안 keydown = 키보드 제어
      //방향키 : 상단38, 하단40, 홈36, end35, (enter13와 space bar32)
      $acco.find('.acdnHeader').on('keydown', function (e) {
        const key = e.keyCode;
        console.log(key);
        switch (key) {
          case 38: //상단 방향키
            if ($(this).hasClass('first')) $(this).closest('.accordion').find('.tit .last').focus();
            else $(this).parents('.event_accordion').prev('.acdnHeader').focus();
            break;
          case 40: //하단 방향키
            if ($(this).hasClass('last')) $(this).closest('.accordion').find('.tit .first').focus();
            else $(this).parents('.event_accordion').next('.acdnHeader').focus();
            break;
          case 36:    //home키
            e.preventDefault();
            $(this).closest('.accordion').find('.tit .first').focus();
            break;
          case 35:    //end키
            e.preventDefault();
            $(this).closest('.accordion').find('.tit .last').focus();
            break;
          }
        });

      //3) 아코디언헤더(버튼)을 click =마우스 제어
      $acco.find('.acdnHeader').on('click', function () {
        if ( !$(this).parents('.event_accordion').hasClass('on') ) { 
          // 현재 닫혀 있는 경우 : 열려져야 함
          // 클릭된 헤더 + 이벤트 아코디언에 on 붙이기 / 형제들은 그 반대로
          $(this).attr({'aria-expanded': true,'aria-disabled': true,tabIndex: -1}).parents('.event_accordion').addClass('on').siblings().removeClass('on').find('.acdnHeader').attr({'aria-expanded': false,tabIndex: 0}).removeAttr('aria-disabled');
          // 패널
          $(this).parent().next().css('visibility','visible').attr('tabIndex',0).stop().animate({maxHeight: 400}).closest('.event_accordion').siblings().find('.acdnPanel').attr({tabIndex: -1}).stop().animate({maxHeight: 0}, function() {
            $(this).css('visibility','hidden');
          });
        }
      });
});