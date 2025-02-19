	/*  Wizard */
	jQuery(function ($) {
		"use strict";
		// Chose here which method to send the email, available:
		// Simple phpmail text/plain > registration.php (default)
		// Phpmaimer text/html > phpmailer/registration_phpmailer.php
		// Phpmaimer text/html SMPT > phpmailer/registration_phpmailer_smpt.php
		// PHPmailer with html template > phpmailer/registration_phpmailer_template.php
		// PHPmailer with html template SMTP> phpmailer/registration_phpmailer_template_smtp.php
		$('form#wrapped').attr('action', 'successful.html');
		$("#wizard_container").wizard({
			stepsWrapper: "#wrapped",
			submit: ".submit",
			beforeSelect: function (event, state) {
				if ($('input#website').val().length != 0) {
					return false;
				}
				if (!state.isMovingForward)
					return true;
				var inputs = $(this).wizard('state').step.find(':input');
				return !inputs.length || !!inputs.valid();
			}
		}).validate({
			errorPlacement: function (error, element) {
				if (element.is(':radio') || element.is(':checkbox')) {
					error.insertBefore(element.next());
				} else {
					error.insertAfter(element);
				}
			}
		});
		//  progress bar
		$("#progressbar").progressbar();
		$("#wizard_container").wizard({
			afterSelect: function (event, state) {
				$("#progressbar").progressbar("value", state.percentComplete);
				$("#location").text("(" + state.stepsComplete + "/" + state.stepsPossible + ")");
			}
		});
		// Validate select and password match
		$('#wrapped').validate({
			ignore: [],
			rules: {
				select: {
					required: true
				},
				 password1: {
                	required: true,
                    minlength : 5
                },
                password2: {
                	required: true,
                    minlength : 5,
                    equalTo : "#password1"
                }
			},
			errorPlacement: function (error, element) {
				if (element.is('select:hidden')) {
					error.insertAfter(element.next('.nice-select'));
				} else {
					error.insertAfter(element);
				}
			}
		});
	});

	// Summary 
	function getVals(formControl, controlType) {
		switch (controlType) {

			case 'first_name':
				// Get the value for a input text
				var value = $(formControl).val();
				$("#first_name").text(value);
				break;

			case 'last_name':
				// Get the value for a input text
				var value = $(formControl).val();
				$("#last_name").text(value);
				break;

			case 'email':
				// Get the value for a input text
				var value = $(formControl).val();
				$("#email").text(value);
				break;

			 case 'country':
				// Get the value for a select
				var value = $(formControl).val();
				$("#country").text(value);
				break;

			case 'user_name':
				// Get the value for a input text
				var value = $(formControl).val();
				$("#user_name").text(value);
				break;

			case 'password':
				// Get the value for a input text
				var value = $(formControl).val();
				$("#password").text(value);
				break;
		}
	}