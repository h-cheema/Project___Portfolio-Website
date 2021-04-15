loadingScreen();

function loadingScreen(){
	$(window).on("load", function(){
		// Callback function called right after first fadeOut finishes.
		$(".loader").fadeOut(1300, function(){ 
			$(".loader .inner").fadeOut(1300);
		});
	});
}



$(document).ready(function(){

	$('.show-details').click(function(){
		console.log($(this).find('.fa.fa-angle-down'));
		$(this).find('i')
			   .toggleClass('fa-angle-down fa-angle-up');
		
		$(this).siblings('.details')
			   .toggleClass('open')
			   .slideToggle('milliseconds');
	   });

	// Slideshow
	$('#slides').superslides({
		animation: 'fade',
		play: 5000
	});

	var pauseDelay = "^" + 500;
	var typed = new Typed(".typed", {
		strings: [	pauseDelay+"Software Developer",
					pauseDelay+"Student",
					pauseDelay+"Game Programmer"],
		typeSpeed: 50,
		loop: true,
		startDelay: 500,
		showCursor: false,
		backSpeed: 10,
		backDelay: 1500
	});

	$("#navigation li a").click(function(e){
		
		// Prevent default link behaviour.
		e.preventDefault();

		// Clicked item's href.
		var targetElement = $(this).attr("href");
		var targetPosition = $(targetElement).offset().top; //Gets the top position of the navigation item.

		// Navigates slightly higher than the section.
		$("html, body").animate({ scrollTop: targetPosition}, "slow");

	});

	// Sticky scroll navigation
	const nav = $("#navigation");
	const navTop = nav.offset().top; // Gets the position of the element on the screen.

	// Call stickyNavigation time the screen scrolls.
	$(window).on("scroll", stickyNavigation); 

	function stickyNavigation(){

		var body = $("body");

		if($(window).scrollTop() >= navTop){
			body.css("padding-top", nav.outerHeight() + "px");
			body.addClass("fixedNav");
		}else{
			body.css("padding-top", 0);
			body.removeClass("fixedNav");
		}

		//checkNavItem();

	}

	// Tooltip
	$('[data-toggle="tooltip"]').tooltip();

}); // End of document ready


$(function() {

	$("#contactForm input,#contactForm textarea").jqBootstrapValidation({
	  preventSubmit: true,
	  submitError: function($form, event, errors) {
		// additional error messages or events
	  },
	  submitSuccess: function($form, event) {
		event.preventDefault(); // prevent default submit behaviour
		// get values from FORM
		var name = $("input#name").val();
		var email = $("input#email").val();
		var phone = $("input#phone").val();
		var message = $("textarea#message").val();
		var firstName = name; // For Success/Failure Message
		// Check for white space in name for Success/Fail message
		if (firstName.indexOf(' ') >= 0) {
		  firstName = name.split(' ').slice(0, -1).join(' ');
		}
		$this = $("#sendMessageButton");
		$this.prop("disabled", true); // Disable submit button until AJAX call is complete to prevent duplicate messages
		$.ajax({
		  url: "./mail/contact_me.php",
		  type: "POST",
		  data: {
			name: name,
			phone: phone,
			email: email,
			message: message
		  },
		  cache: false,
		  success: function() {
			// Success message
			$('#success').html("<div class='alert alert-success'>");
			$('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
			  .append("</button>");
			$('#success > .alert-success')
			  .append("<strong>Your message has been sent. </strong>");
			$('#success > .alert-success')
			  .append('</div>');
			//clear all fields
			$('#contactForm').trigger("reset");
		  },
		  error: function() {
			// Fail message
			$('#success').html("<div class='alert alert-danger'>");
			$('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
			  .append("</button>");
			$('#success > .alert-danger').append($("<strong>").text("Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!"));
			$('#success > .alert-danger').append('</div>');
			//clear all fields
			$('#contactForm').trigger("reset");
		  },
		  complete: function() {
			setTimeout(function() {
			  $this.prop("disabled", false); // Re-enable submit button when AJAX call is complete
			}, 1000);
		  }
		});
	  },
	  filter: function() {
		return $(this).is(":visible");
	  },
	});
  
	$("a[data-toggle=\"tab\"]").click(function(e) {
	  e.preventDefault();
	  $(this).tab("show");
	});
  });
  
  /*When clicking on Full hide fail/success boxes */
  $('#name').focus(function() {
	$('#success').html('');
  });


function copyEmailAddress() {

	let copyText = document.getElementById("copyEmailAddressText");
	let elementText = copyText.textContent;

	navigator.clipboard.writeText(elementText);
}

