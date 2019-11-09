$(document).ready(function() {
		
	var scriptPrice = 97;
	var scriptCurrency = "GBP";
	/* Removing jabascript codes.	
	$(window).scroll(function() { 
	
		var currentScroll = $(window).scrollTop(); 
		if (currentScroll >= fixmeTop) {  
			$('#navbar').addClass('navbarfixed'); 
			$('.dock2').addClass('navbarcorrect'); 
		} else {                               
			$('#navbar').removeClass('navbarfixed');  
			$('.dock2').removeClass('navbarcorrect'); 
		}
	});
	*/
	$(".nicescroll").click(function(e) { 
		e.preventDefault(); 
		var dest = $(this).attr('href'); 
		console.log(dest); 
		$('html,body').animate({scrollTop: $(dest).offset().top - 80}, 'slow'); 
	});
	
	$(".faqshort h3").click(function(e) { 
		$(this).siblings('.answer').slideToggle( "slow", function() {});
		if ($(this).siblings('img').attr("src") == "/assets/faq_up.png") {
			$(this).siblings('img').attr("src","/assets/faq_down.png");
		} else {
			$(this).siblings('img').attr("src","/assets/faq_up.png");
		}
	});
	
	$(".faqshort img").click(function(e) { 
		$(this).siblings('.answer').slideToggle( "slow", function() {});
		if ($(this).attr("src") == "/assets/faq_up.png") {
			$(this).attr("src","/assets/faq_down.png");
		} else {
			$(this).attr("src","/assets/faq_up.png");
		}
	});
			
	$("#owl-demo").owlCarousel({
		navigation : true, 
		paginationSpeed : 400,
		singleItem:true,
		navigationText: ["<img src='assets/l_arrow.svg'>","<img src='assets/r_arrow.svg'>"]
	});
	
	$("#burger").click(function(e) { 
		$(this).children(".dropmenu").slideToggle( "slow", function() { });
	});
	
	var checkDisc = function() {
		var xmlhttp;
		xmlhttp=new XMLHttpRequest();
 
		xmlhttp.onreadystatechange=function() {
		  	if (xmlhttp.readyState==4 && xmlhttp.status==200) {
				newArray = xmlhttp.responseText;
				if (newArray.length >= 1) {
					if (scriptPrice-xmlhttp.responseText < 0) {
						$('#poplink').attr("href", "/90dayplan/payment.asp?type=one&dc=" + $('#disccode').val());
						$('#disccode').css({'background-color' : '#ecfaa5'});
						$('#theprice').html(0);	
					} else {
						var str = ((scriptPrice-xmlhttp.responseText)).toFixed(2);
						$('#poplink').attr("href", "/90dayplan/payment.asp?type=one&dc=" + $('#disccode').val());
						$('#disccode').css({'background-color' : '#ecfaa5'});
						$('#theprice').html(str);	
					}
				} else {
					$('#disccode').css({'background-color' : '#ffd6d0'});
					$('#poplink').attr("href", "/90dayplan/payment.asp?type=one");
					$('#theprice').html(scriptPrice);	
			
				}
			}
		}
		
		xmlhttp.open("POST","/scripts/disccheck.asp",true);
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlhttp.send("disccode=" + $('#disccode').val() + "&planis=90DAY&currency=" + scriptCurrency)
	};
	
	var checkGrad = function() {
		var xmlhttp;
		xmlhttp=new XMLHttpRequest();
		xmlhttp.onreadystatechange=function() {
		  	if (xmlhttp.readyState==4 && xmlhttp.status==200) {
				newArray = xmlhttp.responseText;
				if (newArray.length >= 1) {
					if (newArray == "CONFIRMED") {
						$('#gradcode').css({'background-color' : '#ecfaa5'});
						$('#gradlink').css({'display' : 'inline-block'});
						$('#gradlink').attr("href", "/graduates/payment.asp?ic=" + $('#gradcode').val());
						$('#theprice').html(67);	
					} else if (newArray == "FREECODE") {
						$('#theprice').html(0);	
						$('#gradcode').css({'background-color' : '#ecfaa5'});
						$('#gradlink').css({'display' : 'inline-block'});
						$('#gradlink').attr("href", "/graduates/payment.asp?ic=" + $('#gradcode').val());
					} else {
						$('#theprice').html(67);	
					}
				} else {
					$('#gradcode').css({'background-color' : '#ffffff'});
					$('#gradlink').css({'display' : 'none'});
					$('#gradlink').attr("href", "/graduates/payment.asp?ic=" + $('#gradcode').val());
					$('#theprice').html(67);	
				}
			}
		}
		
		xmlhttp.open("POST","/scripts/gradcheck.asp",true);
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlhttp.send("gradcode=" + $('#gradcode').val())
	};
	
	var loadMore = function() {
		var xmlhttp;
		xmlhttp=new XMLHttpRequest();
 
		xmlhttp.onreadystatechange=function() {
			if (xmlhttp.readyState==4 && xmlhttp.status==200) {
				$('#alltrans').append(xmlhttp.responseText);
				nextID = parseInt($('#lastid').val()) + 5;
				$('#lastid').val(nextID);
			}
		}

		if ($.isNumeric($('#lastid').val())) {
			lastID = $('#lastid').val()
		} else {
			lastID = 1
		}

		xmlhttp.open("POST","/scripts/getmoretransformation.asp",true);
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlhttp.send("lastid=" + $('#lastid').val() + "&sex=" + $('#transex').val() + "&age=" + $('#tranage').val())
	};
	
	$("div.videooverlay div.playbutton").click(function(e) { 
		if ($(this).parent().siblings('video').get(0).paused == false) {
			
		} else {
		  	$(this).parent().siblings('video').get(0).play();
		  	$(this).hide();
		}
	});
	
	$("video").click(function(e) { 
		if ($(this).get(0).paused == false) {
			$(this).get(0).pause();
			$(this).siblings("div.videooverlay").children("div.playbutton").show();
		}
	});
	
	$(".owl-theme .owl-controls .owl-buttons").click(function(e) { 
		$('video').each(function() {
			$(this).get(0).pause();
		});
	});
	
	$("#disccode").keyup(function(e) { 
		checkDisc();
	});
	
	$("#gradcode").keyup(function(e) { 
		checkGrad();
	});
	
	$("#disccode").on('paste', function () {
		setTimeout(function () {
			checkDisc();
		}, 100);
	});
	
	$("#gradcode").on('paste', function () {
		setTimeout(function () {
			checkGrad();
		}, 100);
	});
	
	$("#tranloadmore").click(function(e) { 
		loadMore();
	});
	
	$("#tagselect").click(function(e) { 
		if ($('#cats').is(':visible')) {
			$("#cats").slideToggle( "slow", function() {
				$("#tags").slideToggle( "slow", function() {
					if ($('#cats').is(':visible')) {
						$("#catselect").addClass("blogfilterhasline");	
					} else {
						$("#catselect").removeClass("blogfilterhasline");	
					}
					if ($('#tags').is(':visible')) {
						$("#tagselect").addClass("blogfilterhasline");	
					} else {
						$("#tagselect").removeClass("blogfilterhasline");	
					}	
				});
			});
		} else {
			$("#tags").slideToggle( "slow", function() {
				if ($('#cats').is(':visible')) {
					$("#catselect").addClass("blogfilterhasline");	
				} else {
					$("#catselect").removeClass("blogfilterhasline");	
				}
				if ($('#tags').is(':visible')) {
					$("#tagselect").addClass("blogfilterhasline");	
				} else {
					$("#tagselect").removeClass("blogfilterhasline");	
				}	
			});
		}		
	});
	
	$("#catselect").click(function(e) { 
		if ($('#tags').is(':visible')) {
			$("#tags").slideToggle( "slow", function() {
				$("#cats").slideToggle( "slow", function() {
					if ($('#cats').is(':visible')) {
						$("#catselect").addClass("blogfilterhasline");	
					} else {
						$("#catselect").removeClass("blogfilterhasline");	
					}
					if ($('#tags').is(':visible')) {
						$("#tagselect").addClass("blogfilterhasline");	
					} else {
						$("#tagselect").removeClass("blogfilterhasline");	
					}
				});
			});
		} else {
			$("#cats").slideToggle( "slow", function() {
				if ($('#cats').is(':visible')) {
					$("#catselect").addClass("blogfilterhasline");	
				} else {
					$("#catselect").removeClass("blogfilterhasline");	
				}
				if ($('#tags').is(':visible')) {
					$("#tagselect").addClass("blogfilterhasline");	
				} else {
					$("#tagselect").removeClass("blogfilterhasline");	
				}
			});
		}
	});
	
	
	if ($("#disccode").length) {
		/* checkDisc(); */
	};
	
});		

var reCapLoad = function() {
	if ($("#recap").length) {
		grecaptcha.render('recap', {'sitekey' : '6LfQXwgUAAAAAMvk2H6wq98TKFAZUzUj4UA49wFX','callback' : recapConf});
	}
};

function recapConf() {
	var gcapdone = $("#gcapdone").val('true');
};

function validateEmail(sEmail) {
	var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
	if (filter.test(sEmail)) {
		return true;
	}
	else {
		return false;
	}
}
	
function checkForm() {
	var firstname = $("#MC_fname").val();
	var surname = $("#MC_sname").val();
	var emailaddress = $("#MC_cemailaddress").val();
	var emailaddressconfirm = $("#MC_cemailaddressconfirm").val();
	var hasError = true;
		
	if ((firstname.length > 1) && (surname.length > 1) && (emailaddress.length > 1) && (emailaddressconfirm.length > 1) && ($("#agree").is(':checked')) && (validateEmail(emailaddress))) {
		hasError = false;
	}
		
	if (hasError) {
		$("#errortext").css('display','block');
		return false;
	} else {
		return true;
	}
}
