<?php

	// Check for empty fields
	if( empty($_POST['name']) 
		|| empty($_POST['email']) 
		|| empty($_POST['phone']) 
		|| empty($_POST['message']) 
		|| !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) 
	{
	  http_response_code(500);
	  exit();
	}

	$name = strip_tags(htmlspecialchars($_POST['name']));
	$email = strip_tags(htmlspecialchars($_POST['email']));
	$phone = strip_tags(htmlspecialchars($_POST['phone']));
	$message = strip_tags(htmlspecialchars($_POST['message']));

	// Create the email and send the message.
	$to = "harjinder_c@hotmail.com";
	$subject = "harjindercheema.com:  $name";

	$body =
		"You have received a new message from your website contact form.\n\n".
		"Here are the details:\n\nName: $name\n\nEmail: $email\n\nPhone: $phone\n\nMessage:\n$message";

	// This is the email address the generated message will be from. 
	// We recommend using something like noreply@yourdomain.com.
	$header = "From: harjinder@harjindercheema.com\n";
	$header .= "Re: $email";

	if(!mail($to, $subject, $body, $header))
	  http_response_code(500);

?>