window.onload = function() {

	new fullpage('#fullpage', {
		anchors:['h', 'who'],
		licenseKey: "OPEN-SOURCE-GPLV3-LICENSE",
		autoScrolling: true,
		fitToSection: true
	});

	skrollr.init();
	slider();
	scrollProgress();

}
console.log('dfghd')

$(document).ready(function () {
    $(document).on("scroll", onScroll);

    //smoothscroll
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");

        $('a').each(function () {
            $(this).removeClass('active');
        })
        $(this).addClass('active');

        var target = this.hash,
            menu = target;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top+2
        }, 500, 'swing', function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
        });
    });
});

function onScroll(event){
    var scrollPos = $(document).scrollTop();
    $('#menu a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('#menu a').removeClass("active");
            currLink.addClass("active");
        }
        else{
            currLink.removeClass("active");
        }
    });
}

function scrollProgress(){
	var progressLine = document.getElementById("progress-line"),
		body = document.body,
		html = document.documentElement;

	var	viewportHeight = window.innerHeight;

	var documentHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);

	var scrollTopValue = function(){
		return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
	}

	window.addEventListener("scroll", function(){
		var scroll = scrollTopValue();
		var progress = (scroll / (documentHeight - viewportHeight)) * 100;
		progressLine.style.width = progress + "%";
	});

	window.addEventListener("resize", function(){
   		documentHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
  	});
}

function slider() {
	var bigpics = document.querySelectorAll(".big-pics > img");

	bigpics.forEach((el, i) => {
		el.style.opacity = 0;
		setTimeout(() => {
			el.style.display = 'none';
		}, 20);
	});

	setTimeout(() => {
		bigpics[0].style.display = 'block';
	}, 20);

	bigpics[0].style.opacity = 1;

	var buttons = document.querySelectorAll(".small-pics > button");

	var number = 0;
	border();

	buttons.forEach((el, i) => {
			el.addEventListener("click", function(d){
				bigpics.forEach((l) => {
					l.style.opacity = 0;
					setTimeout(() => {
						l.style.display = 'none';
					}, 20);
				});
				setTimeout(function(){
					number = i;
					border();
					bigpics[i].style.display = 'block';
					setTimeout(function(){
						bigpics[i].style.opacity = 1;
					}, 20);
				}, 20);

			});
	});

	setInterval(function(){
		bigpics.forEach((l) => {
			l.style.opacity = 0;
			setTimeout(() => {
				l.style.display = 'none';
			}, 20);
		});
		if (number === 9) number = 0;
		else number++;
		setTimeout(function(){
			border();
			bigpics[number].style.display = 'block';
			setTimeout(function(){
				bigpics[number].style.opacity = 1;
			}, 20);
		}, 20);
	}, 3000);

	function border() {
		buttons.forEach((j, i) =>{
			if(i !== number)
				buttons[i].style.border = "4px solid rgba(241, 194, 80, 0)";
		});
		buttons[number].style.border = "4px solid rgba(241, 194, 80, 1)";
	}
}
