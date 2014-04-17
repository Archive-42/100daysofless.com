var dolData = {
	month: 0
}

/* The way jQuery does hover on/off functions gets me all hot and bothered in the special parts. */
function createMetaHovers() {
	if (!($('#meta-links'))) return;
	
	$('#meta-links li').hover(
		function() {
			var hoverInfo = $('<span id="meta-hover"></span>');
			hoverInfo.addClass(this.id);
			hoverInfo.text($(this).text());
			hoverInfo.insertAfter('#meta-links');
		},
		function() {
			$('#meta-hover').remove();
		}
	);
}

function setupCalendar() {
	if (!($('#calendar'))) return;
	
	$('#wrapper').addClass('calendar-slide');
	$('#calendar').wrapInner('<div id="month-container"></div>');
	
	// Let's make some fuckin' arrows, wheeeeee.
	$('#calendar').append($('<a id="prev-month" href="#">Previous Month</a>'))
	$('#calendar').append($('<a id="next-month" href="#">Next Month</a>'))
	
	// Figure out what damn month should be in view.
	var day = $('#calendar .active:first');
	if (day.length) {
		var cur = day.parents().filter('table').get(0);
		var months = $('#calendar table');
		dolData.month = jQuery.inArray(cur, months);
	}
	else {
		var d = new Date();
		switch (d.getMonth()) {
			case 11:
				dolData.month = 1;
				break;
			case 0:
				dolData.month = 2;
				break;
			case 1:
				dolData.month = 3;
				break;
			default:
				dolData.month = 0;
		}
	}
	
	/* Get ur shit in order before the slide */
	$('#month-container').css('margin-left', -801*dolData.month);
	if (dolData.month == 0) {
		$('#prev-month').addClass('inactive');
		$('#prev-month').css('opacity', .1);
	}
	else if (dolData.month == 3) {
		$('#next-month').addClass('inactive');
		$('#next-month').css('opacity', .1);
	}
	$('#calendar caption').css('opacity', 0);
	$('#month-container caption:eq('+(dolData.month)+')').css('opacity', 1);
	
	// Slide zOMG squee -facedesk-
	$('#prev-month').click(function(e) {
		e.preventDefault();
		if ($(this).hasClass('inactive')) return;
		$(this).addClass('inactive');
		$(this).animate({opacity: .1}, 150);
		$('#next-month').addClass('inactive');
		$('#next-month').animate({opacity: .1}, 150);

		dolData.month--;
		$('#month-container caption:eq('+(dolData.month+1)+')').animate({opacity: 0}, 150, 'linear', function() {
			$('#month-container').animate({marginLeft: -801*dolData.month}, 400, 'swing', function() {
				if (dolData.month > 0) {
					$('#prev-month').removeClass('inactive');
					$('#prev-month').animate({opacity: 1}, 150);
				}
				$('#next-month').removeClass('inactive');
				$('#next-month').animate({opacity: 1}, 150);
				$('#month-container caption:eq('+(dolData.month)+')').animate({opacity: 1}, 150);
			});
		});		
	});
	
	$('#next-month').click(function(e) {
		e.preventDefault();
		if ($(this).hasClass('inactive')) return;
		$(this).addClass('inactive');
		$(this).animate({opacity: .1}, 150);
		$('#prev-month').addClass('inactive');
		$('#prev-month').animate({opacity: .1}, 150);
		
		dolData.month++;
		$('#month-container caption:eq('+(dolData.month-1)+')').animate({opacity: 0}, 150, 'linear', function() {
			$('#month-container').animate({marginLeft: -801*dolData.month}, 400, 'swing', function() {
				if (dolData.month < 3) {
					$('#next-month').removeClass('inactive');
					$('#next-month').animate({opacity: 1}, 150);
				}
				$('#prev-month').removeClass('inactive');
				$('#prev-month').animate({opacity: 1}, 150);
				$('#month-container caption:eq('+(dolData.month)+')').animate({opacity: 1}, 150);
			});
		});
		
	});
}

function createCalendarHovers() {
	if (!($('#calendar'))) return;
	
	$('#calendar').append($('<div id="cal-hover-wrap"><p id="cal-hover"></p></div>'));
	$('#calendar td a').hover(
		function() {
			$('#cal-hover').text($(this).attr('title'));
			$(this).attr('title', "");
			$('#cal-hover').addClass('cal-hover-active');
		},
		function() {
			$(this).attr('title', $('#cal-hover').text());
			$('#cal-hover').text("");
			$('#cal-hover').removeClass('cal-hover-active');
		}
	);
}

$(document).ready(function() {
	createMetaHovers();
	setupCalendar();
	createCalendarHovers();
});