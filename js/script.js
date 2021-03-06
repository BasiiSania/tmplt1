/*"use strict";*/

$(document).ready(function(e) {
	
	var img_loaded = 0;
	var j_images = [];
	
	/*************************
	* = Controls active menu *
	* Hover text for the last slide
	*************************/
	$('#slide-2 img').each(function(index, element) {
		var time = new Date().getTime();
		var oldHref = $(this).attr('src');
		var myImg = $('<img />').attr('src', oldHref + '?' + time );
		
		myImg.load(function(e) {
			img_loaded += 1;;
			if ( img_loaded == $('#slide-2 img').length ) {
				$(function() {
					var pause = 10;
					$(document).scroll(function(e) {
						delay(function() {
							
							var tops = [];
							
							$('.story').each(function(index, element) {
								tops.push( $(element).offset().top - 200 );
							});
				
							var scroll_top = $(this).scrollTop();
							
							var lis = $('.nav > li');
							
							for ( var i=tops.length-1; i>=0; i-- ) {
								if ( scroll_top >= tops[i] ) {
									menu_focus( lis[i], i+1 );
									break;
								}
							}
						},
						pause);
					});
					$(document).scroll();
				});
			}
		});
	});
	
});

var delay = (function(){
	var timer = 0;
	return function(callback, ms){
		clearTimeout (timer);
		timer = setTimeout(callback, ms);
	};
})();

function menu_focus( element, i ) {
	if ( $(element).hasClass('active') ) {
		if ( i == 6 ) {
			if ( $('.navbar').hasClass('inv') == false )
				return;
		} else {
			return;
		}
	}
		
	if ( ( i == 1 )||( i == 5 ) )
		$('.navbar').removeClass('inv');
	else
		$('.navbar').addClass('inv');
	
	$('#nav-menu > li').removeClass('active');
	$(element).addClass('active');
	
	var icon = $(element).find('.icon');
	
	var left_pos = icon.offset().left - $('#nav-menu').offset().left;
	var el_width =  $(element).find('.text').width();
	
//	$('.active-menu').stop(false, false).animate(
//		{
//			left: left_pos,
//			width: el_width
//		},
//		0,
//		'easeInOutQuart'
//	);
    $('.active-menu').css({
        'transform': 'scaleX(0.01)',
//        'background-size': '100px',
//        'background-position': '-30px 0px',
        'opacity': '0'
        });
    setTimeout(function(){
        $('.active-menu').css({
            'left': left_pos,
            'width': el_width
        });    
    }, 400);
    if (i!=5){
        setTimeout(function(){
            $('.active-menu').css({
                'opacity': '1',
                'transform': 'scaleX(1)'
//                'background-size': '244px'
//                'background-position': '-5px 0px'
            });  
        }, 800); 
    }
    
//    delay(function(){
//        
//    },
//    400);
    
}


/*************
* = Parallax *
*************/
jQuery(document).ready(function ($) {
	//Cache some variables
	var links = $('#nav-menu').find('li');
	slide = $('.slide');
	button = $('.button');
	mywindow = $(window);
	htmlbody = $('html,body');
	
	//Create a function that will be passed a slide number and then will scroll to that slide using jquerys animate. The Jquery
	//easing plugin is also used, so we passed in the easing method of 'easeInOutQuint' which is available throught the plugin.
	function goToByScroll(dataslide) {
		var offset_top = ( dataslide == 1 ) ? '0px' : $('.slide[data-slide="' + dataslide + '"]').offset().top;
		
		htmlbody.stop(false, false).animate({
			scrollTop: offset_top
		}, 1000, 'easeInOutQuart');
	}
	
	//When the user clicks on the navigation links, get the data-slide attribute value of the link and pass that variable to the goToByScroll function
	links.click(function (e) {
		e.preventDefault();
		dataslide = $(this).attr('data-slide');
        if (dataslide!=5){
            ga('send', 'event', 'Всі дії', 'Меню: клік dataslide' + dataslide.toString());
            goToByScroll(dataslide);
        }
		$(".nav-collapse").collapse('hide');
	});
	
	//When the user clicks on the navigation links, get the data-slide attribute value of the link and pass that variable to the goToByScroll function
	$('.navigation-slide').click(function (e) {
		e.preventDefault();
		dataslide = $(this).attr('data-slide');
		if (dataslide!=5){
            ga('send', 'event', 'Всі дії', 'Меню: клік dataslide' + dataslide.toString());
            goToByScroll(dataslide);
        }
		$(".nav-collapse").collapse('hide');
	});
    
// clicks
    $("#zamovity_button").click(function(){
        ga('send', 'event', 'Всі дії', 'Головна: клік Замовити');
        goToByScroll(5);
    });
    $(".zamovyty-btn").click(function(){
        ga('send', 'event', 'Всі дії', 'Меню: клік Замовити');
        goToByScroll(5);
    });
    $(".zamovyty-btn3").click(function(){
        ga('send', 'event', 'Всі дії', 'Ціни та доставка: клік Замовити онлайн');
        goToByScroll(5);
    });
});

/******************
* = Arrows click  *
******************/
jQuery(document).ready(function ($) {
	var arrows = $('#arrows div');
	
	arrows.click(function(e) {
		e.preventDefault();
		
		if ( $(this).hasClass('disabled') )
			return;
		
		var slide = null;
		var datasheet = $('.nav > li.active').data('slide');
		var offset_top = false;
		var offset_left = false;
		
		
		switch( $(this).attr('id') ) {
			case 'arrow-up':
				offset_top = ( datasheet - 1 == 1 ) ? '0px' : $('.slide[data-slide="' + (datasheet-1) + '"]').offset().top;
				break;
			case 'arrow-down':
				offset_top = $('.slide[data-slide="' + (datasheet+1) + '"]').offset().top;
				break;
			case 'arrow-left':
				offset_left = $('#slide-3 .row').offset().left + 452;
				if ( offset_left > 0 ) {
					offset_left = '0px';
				}
				break;
			case 'arrow-right':
				offset_left = $('#slide-3 .row').offset().left - 452;
				if ( offset_left < $('body').width() - $('#slide-3 .row').width() ) {
					offset_left = $('body').width() - $('#slide-3 .row').width();
				}
				break;
		}
		
		if ( offset_top != false ) {
			htmlbody.stop(false, false).animate({
				scrollTop: offset_top
			}, 1500, 'easeInOutQuart');
		}
		
		if ( offset_left != false ) {
			if ( $('#slide-3 .row').width() != $('body').width() ) {
				$('#slide-3 .row').stop(false, false).animate({
					left: offset_left
				}, 1500, 'easeInOutQuart');
			}
		}
	});
    
    //
    var myform =  document.getElementById('mainform');
    var mail_part = 210;
    myform.setAttribute('action', 'https://formspree.io/' + 'bereg' + 'ovoi0' + mail_part.toString() + '@' + 'gmail' + '.' + 'com');
//    myform.setAttribute('action', 'https://formspree.io/' + 'ba' + 'syanya' + '@' + 'ukr' + '.' + 'net');
    myform =  document.getElementById('contactform');
    myform.setAttribute('action', 'https://formspree.io/' + 'bereg' + 'ovoi0' +mail_part.toString() + '@' + 'gmail' + '.' + 'com');
//    myform.setAttribute('action', 'https://formspree.io/' + 'ba' + 'syanya' + '@' + 'ukr' + '.' + 'net');
    
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10) {    dd = '0'+dd;} 
    if(mm<10) {    mm = '0'+mm;} 
    var today_txt = mm+'.'+dd+'.'+yyyy;
     $('#mydatepicker .input-group.date').datepicker({
            format: "MM dd - DD",
            startDate: today_txt,
            language: "uk",
            orientation: "bottom left",
            daysOfWeekDisabled: "0",
            autoclose: true,
            todayHighlight: true,
            showOnFocus: false
        });
     $('#mydatepicker .input-group.date').click(function(){
         ga('send', 'event', 'Всі дії', 'клік: Замовити: дата: datepicker');
     });
    
    $("#menu-zviazok").click(function(){ //  for ontop window -ЗВ'ЯЗОК-
        ga('send', 'event', 'Всі дії', 'клік: меню: Зв-язок');
        $('#zviazok-slide').attr('style', '');
        $('#zviazok-slide').css('display', 'block');
        $('.navbar-fixed-top').css('z-index', '10');
    });  
    $('#zviazok-slide').css('display', 'none');
    $("#zviazok-slide-close").click(function(){
        ga('send', 'event', 'Всі дії', 'клік: Зв-язок: close');
        $('#zviazok-slide').css({
            'display': 'none'});
        $('.navbar-fixed-top').attr('style', '');
    });


$(window).scroll(function() {
    //After scrolling 50px from the top...
    if ( $(window).scrollTop() >= 50 ) {
        ga('send', 'event', 'Всі дії', 'скрол >50px');
        $('#arrows').css({
            'opacity': '0'
        });
    }//else {$('#arrows').attr('style', '');}
});

//top
$("#to-translated").click(function(){
    ga('send', 'event', 'Всі дії', 'клік: зміна мови');
    var url =  $(this).attr("href").toString();
    location.href = url;
    // $("<a>").attr("href", url)[0].click();
    
});


//slide-2
$("#slide-2 img").click(function(){
    ga('send', 'event', 'Всі дії', 'Клік по фото в слайді 2');
    var $div = $("<div>", {"class": "img-show"});
    $div.click(function(){
        $(this).css({
            'display': 'none'
        });
    });
    $("body").append($div);
    $(".img-show").append($(this).clone());
});
    
//slide-3
$("#slide-3 a").click(function(){
    ga('send', 'event', 'Всі дії', 'клік: slide-3 лінк');
    var url =  $(this).attr("href").toString();
    // location.href = url;
    $("<a>").attr("href", url).attr("target", "_blank")[0].click();
    
});
$('.slide-3-row-1 .col-lg-3').on('mouseover', function() {
  $(this).find('svg').children().css('fill','#3AADE3');
});
$('.slide-3-row-1 .col-lg-3').on('mouseleave', function() {
  $(this).find('svg').children().attr('style', '');
});

//slide-4
$('.bottle svg').click(function(){
  var val = $(this).parent().find('svg').length;
    $('#number-tsina').attr('value', val.toString());
    zminaTsina(val);
    return true;
});


$('#mydatepicker .help-text-selector').click(function(){
    ga('send', 'event', 'Всі дії', 'клік: Замовлення: дата: текст днів');
    slctdday = new Date();
    var here = false;
    var this_txt = $(this).text();
    if (this_txt=='Сьогодні'){slctdday.setDate(slctdday.getDate()); here=true;}
    if (this_txt=='Завтра'){slctdday.setDate(slctdday.getDate()+1); here=true;}
    if (this_txt=='Післязавтра'){slctdday.setDate(slctdday.getDate()+2); here=true;}
    if ((this_txt=='Найближча субота')||(this_txt=='Субота')){
        for (i = 0; i < 7; i++) {
            slctdday.setDate(slctdday.getDate()+1); 
            if (slctdday.getDay()==6) { break; }    }    
        here=true;}
    if (here==true) {
        if (slctdday.getDay()==0) // IF slctdday is Sunday
        {slctdday.setDate(slctdday.getDate()+1);}
        $('#mydatepicker .input-group.date').datepicker('setDate', slctdday);}
    else {
        $(this).parent().find('input').attr('value',  this_txt);}
    
    return true;
});

$('#form-kilkist .input-group-addon').click(function(){
    ga('send', 'event', 'Всі дії', 'клік: Замовлення: кількість');
   var inputField = $(this).parent().find('input');
   var n = parseInt(inputField.val(),10);
   if (($(this).text()==='-') && (n>=2)){
       n = n-1;
       inputField.val(n); zminaZamovVartist(n);
   };
    if (($(this).text()==='+') && (n<=8)){
        n = (n+1);
        inputField.val(n); zminaZamovVartist(n);
    };
    return true;
});

//underfooter
$("#designer-s-link").click(function(){
    ga('send', 'event', 'Всі дії', 'клік: underfooter');
    var url =  $(this).attr("href").toString();
    location.href = url;
    // $("<a>").attr("href", url).attr("target", "_blank")[0].click();
    
});
    
});//end of jQuery(document).ready(function ($){

function zminaTsina(val) {
    var vartist_num = val*35;
    document.getElementById('textTsina').innerHTML = vartist_num.toString();
    $('.bottle svg').attr('style','');
    if (val<=8){
        $('.bottle svg:gt('+(8-val).toString()+')').css('fill', 'rgba(58,173,226,0.9)');
    }
    else {
      $('.bottle svg').css('fill', 'rgba(58,173,226,0.9)');  
    };
    return true;
};

function zminaZamovVartist(val) {
    var vartist_num = val*35;
    document.getElementById('zamov-vartist').innerHTML = vartist_num.toString();
};

function chasDostavky(currentDiv){
    ga('send', 'event', 'Всі дії', 'клік: Замовлення: час доставки');
    $('#slide-5 label').attr('style', '');
        
    $(currentDiv).css({
        'font-weight':'700',
        'color': '#333',
        'background-color':'#cef'
    });
    
    $(currentDiv).parent().find('input').attr('checked', true);

    return true;    
};

function contaktSend(){
    ga('send', 'event', 'Всі дії', 'клік: Зв-язок: Надіслати');
    var myform =  document.getElementById('contactform');
    var badInput = "none";
    if (myform["inputName2"].value=="") {
        badInput = "inputName2"; }
    else if (myform["inputContact2"].value=="" ) {
        badInput = "inputContact2"; };
        
    if (badInput != "none")
    {
        showErrorPicture(badInput);
        $('#contact-errors-message').css('display','block');
        $('#contact-errors-message').delay(13000).fadeOut('slow');
        return false;
    }
    else{
        myform.submit();
        return true;    
    }
};

function zamovlenniaSend()
  {
    ga('send', 'event', 'Всі дії', 'клік: Замовлення: Надіслати');
    var myform =  document.getElementById('mainform');
    var badInput = "none";
    if (myform["inputName"].value=="") {
        badInput = "inputName"; }
    else if (myform["inputPhone"].value=="" ) {
        badInput = "inputPhone"; };
    if (badInput != "none")
    {
        showErrorPicture(badInput);
        $('#zamovlennia-errors-message').css('display','block');
        $('#zamovlennia-errors-message').delay(13000).fadeOut('slow');
        return false;
    }
    else
    {
        myform.submit();
        return true;
    }
    
  };

function showErrorPicture(badInput)
{
    var badElement =  $('#'+badInput);
    if ( (badElement.offset().left+badElement.width()) < $('body').width()/2 )
    {
        badElement.parent().append('<div class="error-picture error-picture-left"></div>');
    } else
    {
        badElement.parent().append('<div class="error-picture error-picture-right"></div>');
    };
    $('.error-picture').delay(13000).fadeOut('slow');
};
