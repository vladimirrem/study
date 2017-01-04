/**
 * Created by user on 04.01.17.
 */
var start_num=1;    //Номер первого слайда при загрузке страницы
var auto_few=1;    //Автопрокрутка включена(1) или выключена(0) по умолчанию
var slidespeed=200;    //Время перехода от слайда к слайду(мсек)
var intervalspeed=3000;    //интервал автопрокрутки(мсек)

var num;    //Количество слайдов будет тут. Но его мы запишем, когда полностью загрузим документ
var i = start_num;    //В будущем будем хранить в i показываемый слайд
var intervalID;    //Интервал для автопрокрутки
var lock = 0;    //Не даем прокрутить сразу на несколько слайдов, чтобы не сбивалось

function change_title() {
    $('#slidecounter').html(i + '/' + num);    //обновление счетчика
    var title = $('img.slideimage#'+i).attr('data-title');    //Получим название слайда
    $('#slidetitle').html(title);    //Добавим название слайда
}

function few() {    //Прокрутка вперед
    if(lock == 0) {    //Не даем пройти нажатие во время анимации
        if(i>=num) {    //Проверим не уходит ли в пустоту слайдшоу, если нет, то просто сдвинем на длину слайда(то есть 500px), если же да, то тогда вернемся к первому слайду
            $('#slideimages').animate({'margin-left':'0'},slidespeed,function(){lock=0});
            i = 1;
        } else {
            $('#slideimages').animate({'margin-left': parseInt($('#slideimages').css('margin-left')) - 500 + 'px'},slidespeed,function(){lock=0});
            i++;
        }
    }
    lock = 1;
    change_title();
}

function rew() {
    if(lock == 0) {
        if(i<=1) {
            $('#slideimages').animate({'margin-left': parseInt($('#slideimages').css('margin-left')) - 500*(num-1) + 'px'},slidespeed,function(){lock=0});
            i = num;
        } else {
            $('#slideimages').animate({'margin-left': parseInt($('#slideimages').css('margin-left')) + 500 + 'px'},slidespeed,function(){lock=0});
            i--;
        }
    }
    lock = 1;
    change_title();
}

function play_pause() {
    if(auto_few == 0) {    //Выключена автопрокрутка?
        auto_few = 1;     //Если да, то включим ее
        $('#play-pause').removeClass('play').addClass('pause');    //Поменяем иконку
        few();    //Прокрутим один раз
        intervalID = setInterval(autofew, intervalspeed);    //Зададим инетрвал
    } else {
        auto_few = 0;    //Если нет, то выключим
        $('#play-pause').removeClass('pause').addClass('play');    //Поменяем иконку
        clearInterval(intervalID);    //Отключим интервал
    }
}

function stop_auto_few() {    //Даже комментарии излишни(см. выше)
    if(auto_few == 1) {
        auto_few = 0;
        $('#play-pause').removeClass('pause').addClass('play');
        clearInterval(intervalID);
    }
}

function autofew() {
    if(auto_few == 1) {
        few();
    }
}

$(document).ready(function() {
    num = $('.slideimage').length;
    $('#slideimages').css({'width': 500*num + 'px','margin-left': (-500)*(start_num-1) + 'px'});    //задаем блоку со слайдами длину и сдвинем к первому показываемому элементу
    change_title();    //Зададим значение названию слайда
    if(auto_few == 0) {    //Если автопрокрутка выключена, то изменим иконку
        $('#play-pause').removeClass('pause').addClass('play');
    } else {    //если нет, то зададим интервал
        intervalID = setInterval(autofew, intervalspeed);
    }
    $('#few').click(function() {    //сделаем же наконец кнопки кнопками
        few();    //Функция прокрутки вперед
        stop_auto_few();    //Если мы начали прокручивать "ручками", то автопрокрутка нам ни к чему
    });
    $('#rew').click(function() {
        rew();
        stop_auto_few();
    });
    $('#play-pause').click(function() {
        play_pause();
    });
    $('#slideshow').mouseenter(function() {    //Появление строчки с информацией
        $('#controlrow').stop().animate({'opacity':'1.0','filter': 'alpha(opacity=100)'},100);
    }).mouseleave(function() {
        $('#controlrow').stop().animate({'opacity':'0.0','filter': 'alpha(opacity=0)'},500);
    });
});