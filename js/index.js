
function autoClock(){
    var today = new Date()
    var year = today.getFullYear()
    var month = today.getMonth()+1
    var date = today.getDate()
    var weekday = today.getDay()
    switch(weekday) {
        case 0 : weekday = "일"; break;
        case 1 : weekday = "월"; break;
        case 2 : weekday = "화"; break;
        case 3 : weekday = "수"; break;
        case 4 : weekday = "목"; break;
        case 5 : weekday = "금"; break;
        case 6 : weekday = "토"; break;
    }
    var hours = today.getHours()
    var minutes = today.getMinutes()
    var seconds = today.getSeconds()
    if (hours>=0 && hours<10) { hours = '0'+hours }
    if (minutes>=0 && minutes<10) { minutes = '0'+minutes }
    if (seconds>=0 && seconds<10) { seconds = '0'+seconds }
    $('.autoClock > span').eq(0).text(year)
    $('.autoClock > span').eq(1).text(month)
    $('.autoClock > span').eq(2).text(date)
    $('.autoClock > span').eq(3).text(weekday)
    $('.autoClock > span').eq(4).text(hours)
    $('.autoClock > span').eq(5).text(minutes)
    $('.autoClock > span').eq(6).text(seconds)
}
// 이름있는함수 호출
autoClock()

// setInterval(함수, 시간) : 시간간격마다 반복 실행되는 메서드(p.415)
var timer = setInterval(autoClock, 1000)

$('.autoClock').hover(
    function(){
        clearInterval(timer)
    },
    function(){
        timer = setInterval(autoClock, 1000)
    }
)


$('html, body').stop().animate({
    scrollTop : 0
}, 1000)

function count(jumsu, cname, time) {
    let count = 0
    let stop = setInterval(function(){
        count++
        if (count<=jumsu) {
            $(cname).find('.myscore').text(count+'%')
        } else {
            clearInterval(stop)
        }
    }, time)
}

$('#menu li').eq(0).addClass('on')
var cflag = false;
$('#menu li a').on('click', function(e){
    e.preventDefault()
    cflag = true;
    $(this).parent().addClass('on')
    $(this).parent().siblings().removeClass('on')
    var num = $(this).parent().index()

    if (num>=1 && !$('.sillContainer').hasClass('on')) {
        $('.skillContainer').addClass('on')
        count(70, '.html', 10)
        count(60, '.css', 20)
        count(80, '.script', 30)
        count(60, '.jquery', 40)
        count(50, '.react', 50)
    } else if (num<1 && $('.skillContainer').hasClass('on')){
        $('.skillContainer').removeClass('on')
    }

    if (num<2) {
        $('#sect3').removeClass('on')
        $('#sect3 ul li').css({ transitionDelay:'0s' })
    } else {
        for (let i=0; i<8; i++) {
            $('#sect3 ul li').eq(i).css({ transitionDelay:'1.'+i+'s' })    
        }
        $('#sect3').addClass('on')
    }
    var secDist = $('section').eq(num).offset().top
    $('html, body').stop().animate({
        scrollTop : secDist
    }, 1000, function(){
        cflag = false
    })
})





var sDist0 = $('#sect1').offset().top
var sDist1 = $('#sect2').offset().top
var sDist2 = $('#sect3').offset().top

// 마지막구간이 윈도우높이보다 클때
var lastSect = $('#sect4').offset().top             
// 마지막구간이 윈도우높이보다 작을때
// var lastSect = $('body').height() - $(window).height()
var sct=0;
$(window).on('scroll', function(){
    // var wh = $(this).height()
    sct = $(this).scrollTop()
    if ( sct>=sDist0 && sct<sDist1 && !cflag) {
        $('#menu li').eq(0).addClass('on')
        $('#menu li').eq(0).siblings().removeClass('on')
        $('.skillContainer').removeClass('on')
        $('.autoClock').removeClass('on2')
    } else if ( sct>=sDist1 && sct<sDist2 && !cflag) {
        $('#menu li').eq(1).addClass('on')
        $('#menu li').eq(1).siblings().removeClass('on')
        if ( !$('.skillContainer').hasClass('on') ) {
            $('.skillContainer').addClass('on')
            count(70, '.html', 10)
            count(60, '.css', 20)
            count(80, '.script', 30)
            count(60, '.jquery', 40)
            count(50, '.react', 50)
        }
        $('.autoClock').removeClass('on3').addClass('on2')
    } else if ( sct>=sDist2 && sct<lastSect && !cflag) {
        $('#menu li').eq(2).addClass('on')
        $('#menu li').eq(2).siblings().removeClass('on')
        $('.autoClock').removeClass('on2').addClass('on3')
    } else if ( sct>=lastSect && !cflag) {
        $('#menu li').eq(3).addClass('on')
        $('#menu li').eq(3).siblings().removeClass('on')
    } 

})


$('html, body').on('mousewheel DOMMouseScroll', 'section', function(event, delta){
    if (delta>0) {    // 마우스휠을 위로 굴리면 양수
        $('html, body').stop().animate({
            scrollTop: $(this).prev().offset().top
        }, 600)
    } else if (delta<0) {  // 마우스휠을 아래로 굴리면 음수
        $('html, body').stop().animate({
            scrollTop: $(this).next().offset().top
        }, 600)
    }
})


$('.slideInner').slick({
    autoplay:true,
    arrows:false,
    pauseOnHover:false,
    autoplaySpeed:4000,
    speed:600,
    dots:true,
    pauseOnFocus:false,
})

$('.slideOuter .plpa').on('click', function(){
    
    if ( $(this).find('i').hasClass('fa-pause') ) {
        $('.slideInner').slick('slickPause')
        $(this).find('i').removeClass('fa-pause').addClass('fa-play')
    } else {
        $('.slideInner').slick('slickPlay')
        $(this).find('i').removeClass('fa-play').addClass('fa-pause')
    }

})

